'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, ChevronDown } from 'lucide-react';
import { BR, CN, DE, ES, FR, GB, ID, IN, JP, KR, NL, RU, SA, TR } from 'country-flag-icons/react/3x2';
import {
  LOCALE_COOKIE,
  localeMeta,
  localizePath,
  locales,
  stripLocale,
  type Locale,
} from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { cn } from '@/lib/utils';

const flags: Record<string, typeof GB> = { GB, ID, CN, JP, KR, SA, IN, ES, FR, DE, NL, BR, TR, RU };

/*
 * Warms a language page as soon as the visitor shows intent (hover, focus or
 * touch), so the full page load that follows feels instant. Chrome and Edge
 * also prerender these links via the speculation rules in the layout; this
 * prefetch covers other browsers. English targets are unprefixed and depend
 * on the language cookie, so they are never fetched ahead of the click.
 */
const warmed = new Set<string>();
function warm(href: string, option: Locale) {
  if (option === 'en' || warmed.has(href)) return;
  warmed.add(href);
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = 'document';
  document.head.appendChild(link);
}

/** Remembers the visitor's choice so unprefixed URLs open in that language. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function Flag({ locale, className }: { locale: Locale; className?: string }) {
  const Icon = flags[localeMeta[locale].country];
  return (
    <Icon
      aria-hidden="true"
      className={cn('h-3.5 w-[1.3125rem] shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgb(22_56_41/0.12)]', className)}
    />
  );
}

/**
 * Language menu. Choosing a language stores it in a cookie and does a full
 * navigation, because the document language and direction change too.
 */
export function LanguageSwitcher({
  locale,
  labels,
  tone = 'light',
  variant = 'compact',
}: {
  locale: Locale;
  labels: Dictionary['language'];
  tone?: 'light' | 'dark';
  variant?: 'compact' | 'list';
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const basePath = stripLocale(pathname);

  const options = locales.map((option) => {
    const query = typeof window === 'undefined' ? '' : window.location.search;
    const href = `${localizePath(option, basePath)}${query}`;
    const prepare = option === locale ? undefined : () => warm(href, option);
    return (
      <li key={option}>
        <a
          href={href}
          onPointerEnter={prepare}
          onFocus={prepare}
          onTouchStart={prepare}
          hrefLang={localeMeta[option].htmlLang}
          lang={localeMeta[option].htmlLang}
          aria-current={option === locale ? 'true' : undefined}
          onClick={() => rememberLocale(option)}
          className={cn(
            'flex min-h-11 items-center gap-3 rounded-xl px-3 text-[0.95rem] transition-colors',
            variant === 'list'
              ? 'text-ivory/85 hover:bg-ivory/8 aria-[current=true]:text-sand'
              : 'text-forest hover:bg-sand-soft aria-[current=true]:bg-sand-soft aria-[current=true]:font-bold',
          )}
        >
          <Flag locale={option} />
          <span className="flex-1">{localeMeta[option].label}</span>
          {option === locale && <Check size={16} strokeWidth={2} aria-hidden="true" />}
        </a>
      </li>
    );
  });

  if (variant === 'list') {
    return (
      <nav aria-label={labels.choose}>
        <p className="mb-2 text-sm text-ivory/60">{labels.label}</p>
        <ul className="m-0 grid list-none grid-cols-2 gap-1 p-0">{options}</ul>
      </nav>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${labels.label}: ${localeMeta[locale].label}`}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3 text-sm font-bold transition-colors',
          tone === 'dark'
            ? 'border-ivory/30 text-ivory hover:border-ivory/60'
            : 'border-forest/15 text-forest hover:border-forest/40',
        )}
      >
        <Flag locale={locale} />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          size={15}
          strokeWidth={1.8}
          aria-hidden="true"
          className={cn('transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+0.6rem)] right-0 z-50 w-64 origin-top-right animate-in rounded-2xl border border-forest/10 bg-ivory p-2 shadow-[0_24px_60px_-24px_rgb(15_42_30/0.45)] fade-in zoom-in-95 duration-200 rtl:right-auto rtl:left-0">
          <p className="px-3 pt-2 pb-1.5 text-xs text-stone">{labels.choose}</p>
          <ul className="m-0 max-h-[min(70vh,26rem)] list-none overflow-y-auto p-0">{options}</ul>
        </div>
      )}
    </div>
  );
}
