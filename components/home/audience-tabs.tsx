'use client';

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import * as m from 'motion/react-m';
import { localizePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { cn } from '@/lib/utils';

const audienceTypes = ['buyer', 'supplier', 'general'] as const;

/** WAI-ARIA tabs with roving focus and a sliding indicator. */
export function AudienceTabs({ locale, copy }: { locale: Locale; copy: Dictionary['home']['audience'] }) {
  const audiences = copy.tabs.map((tab, index) => ({
    ...tab,
    value: audienceTypes[index],
    href: localizePath(locale, `/contact?type=${audienceTypes[index]}`),
  }));
  // Static ids: useId differs between the RSC-rendered HTML and the client
  // in this router, and the component appears once per page.
  const id = 'audience';
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabRefs.current[active];
      if (tab) setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = audiences.length - 1;
    const next =
      event.key === 'ArrowRight' ? (active === last ? 0 : active + 1)
      : event.key === 'ArrowLeft' ? (active === 0 ? last : active - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const audience = audiences[active];

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label={copy.tablistLabel}
        className="relative flex w-full gap-1 overflow-x-auto rounded-full border border-forest/12 bg-white p-1.5 [scrollbar-width:none] md:w-fit"
      >
        <span
          aria-hidden="true"
          className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-forest transition-[translate,width] duration-500 ease-(--ease-archi)"
          style={{ translate: `${indicator.left}px 0`, width: indicator.width }}
        />
        {audiences.map((item, index) => (
          <button
            key={item.value}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`${id}-tab-${item.value}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
            className={cn(
              'relative z-10 min-h-11 shrink-0 cursor-pointer rounded-full px-5 text-[0.85rem] font-bold whitespace-nowrap transition-colors duration-300',
              active === index ? 'text-ivory' : 'text-forest/65 hover:text-forest',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${audience.value}`}
        tabIndex={0}
        className="outline-none"
      >
        <m.div
          key={audience.value}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-forest/12 bg-forest/12 lg:grid-cols-[1.1fr_1fr_1fr]"
        >
          <div className="flex flex-col justify-between gap-10 bg-forest p-7 text-ivory md:p-10">
            <div>
              <p className="eyebrow eyebrow-light">{copy.who}</p>
              <h3 className="mt-4 font-serif text-[clamp(1.7rem,3vw,2.1rem)] leading-tight">{audience.who}</h3>
            </div>
            <Link href={audience.href} className="btn btn-sand w-fit">
              {audience.cta} <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />
            </Link>
          </div>
          <div className="bg-white p-8 md:p-10">
            <p className="eyebrow">{copy.whatMatters}</p>
            <p className="mt-4 font-serif text-[1.55rem] leading-snug">{audience.need}</p>
            <p className="eyebrow mt-10">{copy.howWeRespond}</p>
            <p className="mt-4 text-stone">{audience.approach}</p>
          </div>
          <div className="bg-sand-soft p-8 md:p-10">
            <p className="eyebrow">{copy.firstSteps}</p>
            <ol className="mt-5 list-none p-0">
              {audience.steps.map((step, index) => (
                <li key={step} className="flex gap-4 border-b border-forest/10 py-4 last:border-b-0">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold text-[0.7rem] font-bold text-forest">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </m.div>
      </div>
    </div>
  );
}
