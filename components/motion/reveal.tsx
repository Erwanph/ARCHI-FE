'use client';

import type { ReactNode } from 'react';
import * as m from 'motion/react-m';
import { stagger, type Variants } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, margin: '0px 0px -12% 0px' } as const;

const elements = {
  div: m.div,
  section: m.section,
  li: m.li,
  article: m.article,
  figure: m.figure,
  header: m.header,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'figure' | 'header';
};

/**
 * Fades and lifts content as it enters the viewport. Use below the fold only:
 * hero content animates with CSS so it paints before hydration.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
}: RevealProps) {
  const Component = elements[as];
  return (
    <Component
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Component>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(0.08, { startDelay: 0.05 }) } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function RevealGroup({
  children,
  className,
  as = 'div',
}: Omit<RevealProps, 'delay' | 'y'>) {
  const Component = elements[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={groupVariants}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: Omit<RevealProps, 'delay' | 'y'>) {
  const Component = elements[as];
  return (
    <Component className={className} data-reveal="" variants={itemVariants}>
      {children}
    </Component>
  );
}

/** Clip-path wipe for photography — reads as a window opening onto origin. */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      className={className}
      data-reveal=""
      initial={{ clipPath: 'inset(8% 8% 8% 8% round 18px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 14px)', opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 1.2, ease, delay }}
    >
      {children}
    </m.div>
  );
}
