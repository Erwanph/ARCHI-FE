'use client';

import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type SyntheticEvent } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUp, ArrowUpRight, MessageCircle, X } from 'lucide-react';
import { NusaMark } from '@/components/nusa/nusa-mark';
import type { NusaCopy } from '@/components/nusa/nusa-launcher';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const STORAGE_KEY = 'nusa-conversation';
const MAX_INPUT = 1200;

export default function NusaPanel({
  open,
  onClose,
  locale,
  copy,
  whatsappHref,
  contactHref,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  copy: NusaCopy;
  whatsappHref: string | null;
  contactHref: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ChatMessage[]) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Keep the conversation across full page loads within the session.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      // Ignore storage failures; the chat still works in memory.
    }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (event: globalThis.KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (text: string) => {
    const content = text.trim().slice(0, MAX_INPUT);
    if (!content || busy) return;
    const history: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const appendToReply = (chunk: string) =>
      setMessages((current) => {
        const next = [...current];
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: last.content + chunk };
        return next;
      });

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ locale, messages: history.slice(-12) }),
        signal: controller.signal,
      });
      setOffline(response.headers.get('x-nusa-mode') === 'offline');
      if (response.status === 429) {
        appendToReply(copy.rateLimited);
        return;
      }
      if (!response.ok || !response.body) throw new Error(`status ${response.status}`);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let finished = false;
      while (!finished) {
        const chunk = await reader.read();
        finished = chunk.done;
        if (chunk.value) appendToReply(decoder.decode(chunk.value, { stream: true }));
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') appendToReply(copy.error);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const onSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    void send(input);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void send(input);
    }
  };

  const showSuggestions = messages.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <m.dialog
          open
          id="nusa-panel"
          aria-labelledby="nusa-title"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, transition: { duration: 0.18 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'fixed inset-0 z-[60] m-0 flex h-dvh max-h-none w-full max-w-none flex-col overflow-hidden border-0 bg-ivory p-0 text-forest',
            'sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(40rem,calc(100dvh-8rem))] sm:w-[25rem] sm:rounded-[28px] sm:border sm:border-forest/10 sm:shadow-[0_40px_100px_-40px_rgb(15_42_30/0.6)]',
            'sm:rtl:right-auto sm:rtl:left-6',
          )}
        >
          {/* Header */}
          <header className="flex items-center gap-3 bg-forest px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 text-ivory sm:pt-4">
            <span className="grid size-11 place-items-center rounded-full bg-forest-raised ring-1 ring-gold/50">
              <NusaMark className="size-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p id="nusa-title" className="font-serif text-2xl leading-none">
                {copy.name}
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs text-ivory/70">
                <span className={cn('size-1.5 rounded-full', offline ? 'bg-sand' : 'bg-[#7fbf8f]')} aria-hidden="true" />
                {offline ? copy.offlineNotice : copy.role}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.close}
              className="grid size-10 place-items-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory/10"
            >
              <X size={18} strokeWidth={1.6} />
            </button>
          </header>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5" aria-live="polite">
            <Bubble from="assistant">{copy.greeting}</Bubble>
            {messages.map((message, index) => (
              <Bubble key={index} from={message.role}>
                {message.content ? (
                  message.role === 'assistant' ? <RichText text={message.content} /> : message.content
                ) : (
                  <Typing label={copy.thinking} />
                )}
              </Bubble>
            ))}

            {showSuggestions && (
              <div className="pt-1">
                <p className="mb-2 text-xs text-stone">{copy.suggestionsLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {copy.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void send(suggestion)}
                      className="cursor-pointer rounded-full border border-forest/15 bg-white px-3.5 py-2 text-start text-sm transition-colors hover:border-forest/40"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hand-off to a person */}
          <div className="flex flex-wrap items-center gap-2 border-t border-forest/10 px-5 py-3 text-sm">
            <span className="text-stone">{copy.handoffTitle}</span>
            <a href={contactHref} className="inline-flex items-center gap-1 font-bold underline decoration-gold underline-offset-4">
              {copy.handoffInquiry} <ArrowUpRight size={14} strokeWidth={1.8} className="rtl:-scale-x-100" />
            </a>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold underline decoration-gold underline-offset-4"
              >
                <MessageCircle size={14} strokeWidth={1.8} /> {copy.handoffWhatsapp}
              </a>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={onSubmit} className="border-t border-forest/10 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex items-end gap-2 rounded-2xl border border-forest/15 bg-ivory p-1.5 focus-within:border-forest">
              <label htmlFor="nusa-input" className="sr-only">
                {copy.placeholder}
              </label>
              <textarea
                ref={inputRef}
                id="nusa-input"
                rows={1}
                value={input}
                maxLength={MAX_INPUT}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder={copy.placeholder}
                className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-[0.95rem] outline-none [field-sizing:content] placeholder:text-stone/80"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={copy.send}
                className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl bg-forest text-ivory transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp size={18} strokeWidth={1.8} />
              </button>
            </div>
            <p className="mt-2 text-[0.72rem] leading-snug text-stone">{copy.disclaimer}</p>
          </form>
        </m.dialog>
      )}
    </AnimatePresence>
  );
}

function Bubble({ from, children }: { from: ChatMessage['role']; children: ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex', from === 'user' ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed',
          from === 'user'
            ? 'rounded-br-md bg-forest text-ivory rtl:rounded-br-2xl rtl:rounded-bl-md'
            : 'rounded-bl-md border border-forest/10 bg-white rtl:rounded-bl-2xl rtl:rounded-br-md',
        )}
      >
        {children}
      </div>
    </m.div>
  );
}

function Typing({ label }: { label: string }) {
  return (
    <output className="inline-flex items-center gap-1.5" aria-label={label}>
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="size-1.5 animate-pulse rounded-full bg-gold"
          style={{ animationDelay: `${dot * 160}ms` }}
        />
      ))}
    </output>
  );
}

/**
 * Minimal, safe formatting for assistant replies: paragraphs, "- " lists,
 * **bold**, and [links](/internal-path). External links are shown as text.
 */
function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="space-y-2.5">
      {blocks.map((block, blockIndex) => {
        const lines = block.split('\n');
        if (lines.every((line) => /^\s*[-•]\s+/.test(line))) {
          return (
            <ul key={blockIndex} className="list-disc space-y-1 ps-5 marker:text-gold">
              {lines.map((line, index) => (
                <li key={index}>{inline(line.replace(/^\s*[-•]\s+/, ''))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={blockIndex}>
            {lines.map((line, index) => (
              <Fragment key={index}>
                {index > 0 && <br />}
                {inline(line)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={index}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith('/') && !href.startsWith('//')) {
        return (
          <a key={index} href={href} className="font-bold underline decoration-gold underline-offset-4">
            {label}
          </a>
        );
      }
      return <Fragment key={index}>{label}</Fragment>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}
