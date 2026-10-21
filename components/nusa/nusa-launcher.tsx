'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { X } from 'lucide-react';
import { NusaMark } from '@/components/nusa/nusa-mark';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { cn } from '@/lib/utils';

// The chat panel (messages, streaming, formatting) loads only when opened.
const NusaPanel = lazy(() => import('@/components/nusa/nusa-panel'));

const TEASER_KEY = 'nusa-teaser-seen';

export type NusaCopy = Dictionary['nusa'];

export function NusaLauncher({
  locale,
  copy,
  whatsappHref,
  contactHref,
}: {
  locale: Locale;
  copy: NusaCopy;
  whatsappHref: string | null;
  contactHref: string;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [teaser, setTeaser] = useState(false);

  // A single, dismissible hello on the first visit of a session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => setTeaser(true), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, '1');
    } catch {
      // Storage may be unavailable; the teaser simply returns next visit.
    }
  };

  const toggle = () => {
    dismissTeaser();
    setLoaded(true);
    setOpen((value) => !value);
  };

  return (
    <>
      <div
        className={cn(
          'fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-end gap-3 md:right-6 md:bottom-6',
          'rtl:right-auto rtl:left-4 md:rtl:left-6',
          open && 'max-sm:hidden',
        )}
      >
        <AnimatePresence>
          {teaser && !open && (
            <m.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-2 max-w-[15rem] rounded-2xl rounded-br-md border border-forest/10 bg-white p-4 pr-9 text-sm shadow-[0_20px_50px_-24px_rgb(15_42_30/0.5)] rtl:rounded-br-2xl rtl:rounded-bl-md rtl:pr-4 rtl:pl-9"
            >
              <button type="button" onClick={toggle} className="text-start text-forest">
                {copy.teaser}
              </button>
              <button
                type="button"
                onClick={dismissTeaser}
                aria-label={copy.dismissTeaser}
                className="absolute top-2 right-2 grid size-7 place-items-center rounded-full text-stone hover:bg-sand-soft rtl:right-auto rtl:left-2"
              >
                <X size={14} strokeWidth={1.8} />
              </button>
            </m.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={toggle}
          onPointerEnter={() => setLoaded(true)}
          aria-label={open ? copy.close : copy.open}
          aria-expanded={open}
          aria-controls="nusa-panel"
          className="group relative grid size-14 shrink-0 cursor-pointer place-items-center rounded-full bg-forest text-ivory shadow-[0_18px_40px_-14px_rgb(15_42_30/0.7)] transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-gold/60 ring-offset-2 ring-offset-ivory transition-opacity group-hover:opacity-100" />
          {open ? <X size={22} strokeWidth={1.6} /> : <NusaMark className="size-7" />}
        </button>
      </div>

      {loaded && (
        <Suspense fallback={null}>
          <NusaPanel
            open={open}
            onClose={() => setOpen(false)}
            locale={locale}
            copy={copy}
            whatsappHref={whatsappHref}
            contactHref={contactHref}
          />
        </Suspense>
      )}
    </>
  );
}
