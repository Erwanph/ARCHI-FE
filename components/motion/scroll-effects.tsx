'use client';

import { useRef, type ReactNode } from 'react';
import * as m from 'motion/react-m';
import { useScroll, useSpring, useTransform } from 'motion/react';

/**
 * Scroll-linked drift for hero layers. Only transform and opacity change, so
 * the work stays on the compositor and never triggers layout.
 */
export function ScrollParallax({
  children,
  className,
  y = 0,
  scale,
  fade = false,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: [number, number];
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [0, y]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], fade ? [1, 0] : [1, 1]);

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ y: translateY, scale: scaleValue, opacity }}
    >
      {children}
    </m.div>
  );
}

/** A vertical line that fills as its container scrolls through the viewport. */
export function ScrollProgressLine({
  className,
  trackClassName,
  children,
}: {
  className?: string;
  trackClassName?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className={className}>
      <div aria-hidden="true" className={trackClassName}>
        <m.div className="h-full w-full origin-top bg-gold" style={{ scaleY }} />
      </div>
      {children}
    </div>
  );
}
