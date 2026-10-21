'use client';

import { useEffect, useRef } from 'react';

/**
 * Counts up once when scrolled into view. Writes straight to the DOM from a
 * single rAF loop — no React re-render per frame. The final value is server
 * rendered, so the number is correct without JavaScript.
 */
export function CountUp({
  value,
  suffix = '',
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const format = (n: number) => `${Math.round(n).toLocaleString('en-US')}${suffix}`;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          node.textContent = format(value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        node.textContent = format(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, suffix, value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
