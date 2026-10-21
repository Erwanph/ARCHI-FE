import Anthropic from '@anthropic-ai/sdk';
import { env } from 'cloudflare:workers';
import { fallbackReply } from '@/lib/assistant/fallback';
import { SYSTEM_PROMPT } from '@/lib/assistant/knowledge';
import { modelList, openStream, textDeltas } from '@/lib/assistant/openrouter';
import { defaultLocale, isLocale, localeMeta, localizePath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';

/*
 * Nusa — streaming concierge endpoint (serverless, same deployment as the
 * site). The browser only ever talks to /api/assistant, so this handler can
 * later proxy to a shared ARCHI backend without any frontend change.
 *
 * Provider order: OpenRouter (free models) when OPENROUTER_API_KEY is set,
 * otherwise Anthropic when ANTHROPIC_API_KEY is set, otherwise — or whenever
 * the live models are unavailable — the offline quick answers.
 */

const ANTHROPIC_MODEL = 'claude-opus-5-5';
const MAX_MESSAGES = 12;
const MAX_CHARS = 1200;

// Best-effort, per-instance throttle. Production traffic should also be
// protected by a platform rate-limit rule (Cloudflare WAF / Vercel firewall).
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;
const recent = new Map<string, number[]>();

function throttled(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_REQUESTS_PER_WINDOW;
}

type IncomingMessage = { role?: unknown; content?: unknown };

function sanitize(messages: unknown): Anthropic.MessageParam[] | null {
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const cleaned = (messages as IncomingMessage[])
    .slice(-MAX_MESSAGES)
    .filter(
      (message): message is { role: 'user' | 'assistant'; content: string } =>
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0,
    )
    .map((message) => ({ role: message.role, content: message.content.slice(0, MAX_CHARS) }));
  // The conversation must start with the visitor and end with their question.
  while (cleaned.length && cleaned[0].role !== 'user') cleaned.shift();
  if (!cleaned.length || cleaned[cleaned.length - 1].role !== 'user') return null;
  return cleaned;
}

const textHeaders = (mode: 'live' | 'offline') => ({
  'content-type': 'text/plain; charset=utf-8',
  'cache-control': 'no-store',
  'x-nusa-mode': mode,
});

export async function POST(request: Request) {
  let body: { locale?: unknown; messages?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return new Response('Invalid request.', { status: 400 });
  }

  const locale = typeof body.locale === 'string' && isLocale(body.locale) ? body.locale : defaultLocale;
  const messages = sanitize(body.messages);
  if (!messages) return new Response('Invalid conversation.', { status: 400 });

  const dict = await getDictionary(locale);
  const visitor = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for') ?? 'anonymous';
  if (throttled(visitor)) {
    return new Response(dict.nusa.rateLimited, { status: 429, headers: textHeaders('live') });
  }

  const question = messages[messages.length - 1].content as string;
  const offline = () => new Response(fallbackReply(question, dict), { headers: textHeaders('offline') });
  const encoder = new TextEncoder();
  const visitorContext = `Visitor context: the site language is ${localeMeta[locale].english} (${locale}). Prefix internal links with "${localizePath(locale, '/').replace(/\/$/, '')}" (for example ${localizePath(locale, '/sourcing')}).`;

  const openRouterKey = env.OPENROUTER_API_KEY?.trim();
  if (openRouterKey) {
    const opened = await openStream(openRouterKey, modelList(env.OPENROUTER_MODELS), [
      { role: 'system', content: `${SYSTEM_PROMPT}\n\n${visitorContext}` },
      ...messages.map((message) => ({ role: message.role, content: message.content as string })),
    ]);
    if (!opened) return offline();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let sent = false;
        try {
          for await (const text of textDeltas(opened.body)) {
            sent = true;
            controller.enqueue(encoder.encode(text));
          }
          if (!sent) controller.enqueue(encoder.encode(fallbackReply(question, dict)));
        } catch (error) {
          console.error('Nusa stream failed', { model: opened.model, error: String(error) });
          controller.enqueue(encoder.encode(sent ? `\n\n${dict.nusa.error}` : fallbackReply(question, dict)));
        } finally {
          controller.close();
        }
      },
    });
    return new Response(stream, { headers: textHeaders('live') });
  }

  const apiKey = env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) return offline();

  const client = new Anthropic({ apiKey });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const response = client.beta.messages.stream({
          model: ANTHROPIC_MODEL,
          max_tokens: 2048,
          // Concierge chat: short, factual answers do well at low effort.
          output_config: { effort: 'low' },
          // If the model declines, Anthropic retries on its recommended fallback.
          betas: ['server-side-fallback-2026-07-01'],
          fallbacks: 'default',
          system: [
            // Stable prefix — cached across visitors.
            { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
            { type: 'text', text: visitorContext },
          ],
          messages,
        });

        for await (const event of response) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await response.finalMessage();
        if (final.stop_reason === 'refusal') {
          controller.enqueue(encoder.encode(`\n\n${dict.nusa.fallback.default}`));
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          controller.enqueue(encoder.encode(dict.nusa.rateLimited));
        } else if (error instanceof Anthropic.APIError) {
          console.error('Nusa model request failed', { status: error.status });
          controller.enqueue(encoder.encode(dict.nusa.error));
        } else {
          console.error('Nusa stream failed', error);
          controller.enqueue(encoder.encode(dict.nusa.error));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: textHeaders('live') });
}
