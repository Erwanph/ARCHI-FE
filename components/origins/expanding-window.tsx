'use client';

import { useRef, type ReactNode } from 'react';
import * as m from 'motion/react-m';
import { useScroll, useTransform } from 'motion/react';

/**
 * A framed photograph that opens out as the page scrolls toward it. Only a
 * transform changes, so the image stays on one GPU layer and never re-rasters.
 */
export function ExpandingWindow({
  children,
  className,
  frameClassName,
}: {
  children: ReactNode;
  className?: string;
  /** Classes for the outer frame, e.g. to let the window fill a flex column. */
  frameClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 15%'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.84, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className={frameClassName}>
      <m.div
        className={className}
        style={{ scale, y, willChange: 'transform', transformOrigin: '50% 0%' }}
      >
        {children}
      </m.div>
    </div>
  );
}
