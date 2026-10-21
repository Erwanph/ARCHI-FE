'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { format } from '@/lib/i18n/format';
import type { Phase } from '@/lib/sourcing';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: 'spring', stiffness: 70, damping: 16 } as const;

/**
 * The four sourcing phases on a dial. Turning it brings a phase to the top
 * and into the centre. It turns itself slowly until the visitor takes over.
 */
export function PhaseDial({
  phases,
  ranges,
  copy,
}: {
  phases: Phase[];
  /** Pre-formatted stage ranges, e.g. "Stages 03–06". */
  ranges: string[];
  copy: Dictionary['sourcing']['dial'];
}) {
  // `step` keeps counting past 3 so the dial always turns the short way round.
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = phases.length;
  const active = ((step % count) + count) % count;
  const phase = phases[active];

  useEffect(() => {
    if (touched || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;
    let visible = true;
    let hovered = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(root);
    const enter = () => (hovered = true);
    const leave = () => (hovered = false);
    root.addEventListener('pointerenter', enter);
    root.addEventListener('pointerleave', leave);
    const timer = window.setInterval(() => {
      if (visible && !hovered && !document.hidden) setStep((current) => current + 1);
    }, 4200);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      root.removeEventListener('pointerenter', enter);
      root.removeEventListener('pointerleave', leave);
    };
  }, [touched]);

  const goTo = (index: number) => {
    setTouched(true);
    let delta = index - active;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    setStep((current) => current + delta);
  };
  const turn = (direction: 1 | -1) => {
    setTouched(true);
    setStep((current) => current + direction);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      turn(1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      turn(-1);
    }
  };

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-[540px]">
      <fieldset className="@container relative m-0 aspect-square min-w-0 border-0 p-0">
        <legend className="sr-only">{copy.legend}</legend>
        {/* Static ring and the gold "you are here" marker at twelve o'clock. */}
        <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-dashed border-forest/25" />
        <div aria-hidden="true" className="absolute inset-[3%] rounded-full border border-forest/8" />
        <span aria-hidden="true" className="absolute top-[1.5%] left-1/2 h-[6%] w-px -translate-x-1/2 bg-gold" />

        <m.div className="absolute inset-0" animate={{ rotate: step * -90 }} transition={spring}>
          {phases.map((item, index) => {
            const selected = index === active;
            return (
              <div
                key={item.id}
                className="absolute top-1/2 left-1/2 size-0"
                style={{ transform: `rotate(${index * 90}deg) translateY(-41cqw)` }}
              >
                <m.button
                  type="button"
                  aria-pressed={selected}
                  aria-label={format(copy.phaseLabel, { number: index + 1, name: item.name })}
                  onClick={() => goTo(index)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    'absolute top-0 left-0 grid size-20 -translate-1/2 cursor-pointer place-items-center rounded-full border px-1 text-center transition-colors duration-500 md:size-24',
                    selected
                      ? 'border-forest bg-forest text-ivory'
                      : 'border-forest/20 bg-ivory text-forest hover:border-forest/50',
                  )}
                  animate={{ rotate: step * 90 - index * 90 }}
                  transition={spring}
                >
                  <span>
                    <span className={cn('numeral block', selected ? 'text-gold-soft' : 'text-gold-ink')}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-1 block font-serif text-[0.95rem] leading-none md:text-[1.05rem]">{item.name}</span>
                  </span>
                </m.button>
              </div>
            );
          })}
        </m.div>

        {/* Centre: the phase in focus. */}
        <div className="absolute inset-[24%] grid place-items-center rounded-full bg-white text-center shadow-[0_30px_70px_-40px_rgb(15_42_30/0.45)]">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={phase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              transition={{ duration: 0.45, ease }}
              className="px-4 @md:px-6"
              aria-live="polite"
            >
              <p className="numeral text-gold-ink">{ranges[active]}</p>
              <p className="mt-2 font-serif text-[clamp(1.8rem,4.6vw,2.6rem)] leading-none">{phase.name}</p>
              {/* On a narrow dial the summary would spill past the white circle;
                  it is repeated in the stage list below, so hide it there. */}
              <p className="mx-auto mt-3 max-w-[15rem] text-sm text-stone @max-md:hidden">{phase.summary}</p>
              <a href={`#${phase.id}`} className="link-arrow mt-3 text-sm">
                {copy.seeStages} <ArrowDown size={14} strokeWidth={1.8} />
              </a>
            </m.div>
          </AnimatePresence>
        </div>
      </fieldset>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => turn(-1)}
          aria-label={copy.previous}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-forest/20 transition-colors hover:bg-forest hover:text-ivory"
        >
          <ChevronLeft size={18} strokeWidth={1.6} className="rtl:-scale-x-100" />
        </button>
        <p className="min-w-32 text-center text-sm text-stone">
          {touched ? copy.turn : copy.turning}
        </p>
        <button
          type="button"
          onClick={() => turn(1)}
          aria-label={copy.next}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-forest/20 transition-colors hover:bg-forest hover:text-ivory"
        >
          <ChevronRight size={18} strokeWidth={1.6} className="rtl:-scale-x-100" />
        </button>
      </div>
    </div>
  );
}
