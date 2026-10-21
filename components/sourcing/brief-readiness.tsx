'use client';

import { useState } from 'react';
import * as m from 'motion/react-m';
import { ArrowDown, Check } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { cn } from '@/lib/utils';

// Thresholds (ticked items) for each readiness level, in dictionary order.
const levelThresholds = [0, 2, 4, 6];

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** A light self-check before sending a brief — useful, and a little satisfying. */
export function BriefReadiness({ copy }: { copy: Dictionary['sourcing']['readiness'] }) {
  const items = copy.items;
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const done = checked.filter(Boolean).length;
  const progress = done / items.length;
  const levelIndex = levelThresholds.reduce((found, min, index) => (done >= min ? index : found), 0);
  const level = copy.levels[levelIndex];

  return (
    <div className="grid items-center gap-10 rounded-3xl border border-forest/10 bg-white p-7 md:p-10 lg:grid-cols-[0.7fr_1.3fr]">
      <div className="flex flex-col items-center text-center">
        <div className="relative size-40">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90 rtl:scale-x-[-1]" aria-hidden="true">
            <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#f1ebdf" strokeWidth="8" />
            <m.circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="#b6925b"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - progress) }}
              initial={false}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            />
          </svg>
          <p className="absolute inset-0 grid place-items-center font-serif text-4xl" aria-live="polite">
            <span>
              {done}
              <span className="text-xl text-stone">/{items.length}</span>
            </span>
          </p>
        </div>
        <p className="mt-5 font-serif text-[1.8rem] leading-none">{level.title}</p>
        <p className="mt-3 max-w-xs text-sm text-stone">{level.text}</p>
        <a href="#brief" className="btn btn-forest mt-6">
          {copy.cta} <ArrowDown size={16} strokeWidth={1.6} />
        </a>
      </div>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="eyebrow mb-4">{copy.legend}</legend>
        <ul className="m-0 list-none space-y-2 p-0">
          {items.map((item, index) => {
            const on = checked[index];
            return (
              <li key={item}>
                <label
                  className={cn(
                    'flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold',
                    on ? 'border-forest/25 bg-sand-soft' : 'border-forest/10 hover:border-forest/30',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() =>
                      setChecked((current) => current.map((value, i) => (i === index ? !value : value)))
                    }
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid size-7 shrink-0 place-items-center rounded-full border transition-colors duration-300',
                      on ? 'border-forest bg-forest text-ivory' : 'border-forest/25',
                    )}
                  >
                    {on && (
                      <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                        <Check size={15} strokeWidth={2.2} />
                      </m.span>
                    )}
                  </span>
                  <span className={cn('transition-colors', on ? 'text-forest' : 'text-forest/80')}>{item}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </div>
  );
}
