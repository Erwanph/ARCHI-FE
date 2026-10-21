'use client';

import { useRef } from 'react';
import * as m from 'motion/react-m';
import { useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { cn } from '@/lib/utils';

// A tidy bento: aligned edges, alternating widths, each card at its own depth.
const layout = [
  { tone: 'forest', span: 'md:col-span-7', depth: 10 },
  { tone: 'white', span: 'md:col-span-5', depth: 16 },
  { tone: 'sand', span: 'md:col-span-5', depth: 14 },
  { tone: 'white', span: 'md:col-span-7', depth: 8 },
] as const;

/**
 * Brand cards that drift a few pixels with the pointer. Pointer position feeds
 * motion values only — no React renders on move, and nothing moves on touch.
 */
export function FloatingCards({ cards }: { cards: Dictionary['about']['standsFor']['cards'] }) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 70, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 70, damping: 20 });

  return (
    <div
      ref={ref}
      className="grid gap-4 md:grid-cols-12 md:gap-5"
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse' || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
        pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      {cards.map((card, index) => (
        <FloatingCard key={card.label} card={card} index={index} x={x} y={y} />
      ))}
    </div>
  );
}

function FloatingCard({
  card,
  index,
  x,
  y,
}: {
  card: { label: string; value: string };
  index: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const { tone, span, depth } = layout[index % layout.length];
  const translateX = useTransform(x, [-1, 1], [-depth, depth]);
  const translateY = useTransform(y, [-1, 1], [-depth * 0.6, depth * 0.6]);

  return (
    <m.article
      style={{ x: translateX, y: translateY }}
      className={cn(
        'flex min-h-56 flex-col justify-between rounded-3xl p-8 shadow-[0_30px_70px_-50px_rgb(15_42_30/0.6)] transition-colors duration-500 md:min-h-64 md:p-10',
        span,
        tone === 'forest' && 'bg-forest text-ivory',
        tone === 'white' && 'border border-forest/10 bg-white hover:border-gold/60',
        tone === 'sand' && 'bg-sand',
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className={cn('eyebrow', tone === 'forest' && 'eyebrow-light')}>{card.label}</p>
        <span className={cn('numeral', tone === 'forest' ? 'text-gold-soft' : 'text-gold-ink')}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p className="mt-8 font-serif text-[clamp(1.7rem,2.8vw,2.4rem)] leading-snug">{card.value}</p>
    </m.article>
  );
}
