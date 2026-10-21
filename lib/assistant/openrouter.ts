import { SITE_ORIGIN } from '@/lib/site';

/*
 * OpenRouter client for Nusa. Free models are tried in order: if one is busy,
 * over quota or retired, the next one answers. Only when every model fails
 * does the route fall back to the offline quick answers.
 */

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

/*
 * Free models in the order they are tried. Probed on 2026-10-22: MiniMax
 * answered reliably; the Gemma 4 free endpoints were often rate-limited (429);
 * a refusal costs well under a second before the next model is tried.
 */
export const DEFAULT_FREE_MODELS = [
  'minimax/minimax-m3.1-flash:free',
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'openrouter/free',
];

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

/** `OPENROUTER_MODELS` (comma-separated) overrides the default list. */
export function modelList(override?: string) {
  const custom = override
    ?.split(',')
    .map((model) => model.trim())
    .filter(Boolean);
  return custom?.length ? custom : DEFAULT_FREE_MODELS;
}

/**
 * Opens a streaming completion with the first model that accepts the request.
 * Returns null when every model refused (rate limit, quota, outage, removed).
 */
export async function openStream(apiKey: string, models: string[], messages: ChatMessage[]) {
  for (const model of models) {
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${apiKey}`,
          'content-type': 'application/json',
          // Optional attribution shown in OpenRouter's dashboard.
          'http-referer': SITE_ORIGIN,
          'x-title': 'ARCHI - Nusa',
        },
        body: JSON.stringify({
          model,
          messages,
          stream: true,
          // Reasoning tokens count toward max_tokens, so leave headroom.
          max_tokens: 1500,
          temperature: 0.4,
          // Concierge answers are short; keep any thinking light and hidden.
          reasoning: { effort: 'low', exclude: true },
        }),
      });
      if (response.ok && response.body) return { model, body: response.body };
      // A bad or revoked key fails the same way for every model. (403 is
      // not included: some free models return it for model-specific limits.)
      if (response.status === 401) {
        console.error('OpenRouter rejected the API key; check OPENROUTER_API_KEY', { status: response.status });
        return null;
      }
      console.warn('Nusa model unavailable, trying the next one', { model, status: response.status });
    } catch (error) {
      console.warn('Nusa model request failed, trying the next one', { model, error: String(error) });
    }
  }
  return null;
}

/**
 * Reads OpenRouter's server-sent events and yields the answer text. Comment
 * lines (": OPENROUTER PROCESSING") keep the connection alive and are skipped.
 */
export async function* textDeltas(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finished = false;

  while (!finished) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newline = buffer.indexOf('\n');
    while (newline !== -1) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      newline = buffer.indexOf('\n');

      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') {
        finished = true;
        break;
      }
      try {
        const event = JSON.parse(data) as {
          error?: { message?: string; code?: number | string };
          choices?: Array<{ delta?: { content?: string | null } }>;
        };
        if (event.error) throw new Error(`OpenRouter stream error: ${event.error.code ?? ''} ${event.error.message ?? ''}`);
        const text = event.choices?.[0]?.delta?.content;
        if (text) yield text;
      } catch (error) {
        if (error instanceof SyntaxError) continue; // partial or non-JSON line
        throw error;
      }
    }
  }
  await reader.cancel().catch(() => undefined);
}
