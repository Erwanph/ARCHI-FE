'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A soft light that follows the pointer across a card. Pointer moves only set
 * two CSS variables (rAF-throttled); the glow itself is a static gradient, so
 * nothing re-renders and only this card repaints.
 */
export function Spotlight({
  children,
  className,
  tone = 'light',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  return (
    <div
      ref={ref}
      className={cn('group/spot relative isolate', className)}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse') return;
        const node = ref.current;
        if (!node || frame.current) return;
        const { clientX, clientY } = event;
        frame.current = requestAnimationFrame(() => {
          frame.current = 0;
          const rect = node.getBoundingClientRect();
          node.style.setProperty('--spot-x', `${clientX - rect.left}px`);
          node.style.setProperty('--spot-y', `${clientY - rect.top}px`);
        });
      }}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100',
          tone === 'light'
            ? 'bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(182_146_91/0.16),transparent_65%)]'
            : 'bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(220_204_177/0.14),transparent_65%)]',
        )}
      />
      {children}
    </div>
  );
}
