'use client';

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { Hand, Leaf, MapPin, Ship } from 'lucide-react';
import { Archipelago, WaveLines } from '@/components/brand-motifs';
import { ResponsiveImage } from '@/components/responsive-image';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { cn } from '@/lib/utils';

const lensMedia = [
  { icon: MapPin, image: '/images/hero-bali-rice-fields-poster.jpg' },
  { icon: Hand, image: null },
  { icon: Leaf, image: '/images/patchouli.jpg' },
  { icon: Ship, image: '/images/bintan-origin.jpg' },
];

/** Four lenses on "origin": choose one to bring it into focus. */
export function OriginLenses({ copy }: { copy: Dictionary['origins']['lenses'] }) {
  const [active, setActive] = useState(0);
  const lenses = copy.items.map((item, index) => ({ ...item, ...lensMedia[index] }));
  const lens = lenses[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      <ul className="m-0 list-none space-y-3 p-0">
        {lenses.map(({ icon: Icon, title, text }, index) => {
          const selected = index === active;
          return (
            <li key={title}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(index)}
                onPointerEnter={(event) => event.pointerType === 'mouse' && setActive(index)}
                className={cn(
                  'group flex w-full cursor-pointer items-start gap-5 rounded-2xl border p-5 text-start transition-colors duration-300 md:p-6',
                  selected ? 'border-gold/50 bg-forest-raised' : 'border-ivory/10 hover:border-ivory/25',
                )}
              >
                <span
                  className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-300',
                    selected ? 'bg-gold text-forest' : 'bg-ivory/8 text-gold-soft',
                  )}
                >
                  <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="flex items-baseline gap-3">
                    <span className="numeral text-ivory/45">{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-serif text-[1.9rem] leading-none">{title}</span>
                  </span>
                  <span className="mt-2 block text-ivory/70">{text}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="relative min-h-[380px] overflow-hidden rounded-3xl bg-forest-raised lg:min-h-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.div
            key={lens.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {lens.image ? (
              <ResponsiveImage
                src={lens.image}
                alt={lens.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-10">
                <Archipelago fill="#4a503e" className="w-full" float />
                <WaveLines tone="dark" lines={3} className="absolute inset-x-0 bottom-16 h-28 w-full opacity-60" />
              </div>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(15_42_30/0.92)_0%,rgb(15_42_30/0.2)_55%,transparent_100%)]" />
          </m.div>
        </AnimatePresence>
        <div className="relative flex h-full min-h-[380px] flex-col justify-end p-8 md:p-10" aria-live="polite">
          <p className="numeral text-gold-soft">
            {copy.counter} {String(active + 1).padStart(2, '0')} / {String(lenses.length).padStart(2, '0')}
          </p>
          <p className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">{lens.detail}</p>
        </div>
      </div>
    </div>
  );
}
