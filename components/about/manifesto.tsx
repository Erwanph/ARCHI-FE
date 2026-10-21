'use client';

import { useRef } from 'react';
import * as m from 'motion/react-m';
import { useScroll, useTransform, type MotionValue } from 'motion/react';

/**
 * A statement that lights up word by word as it is read. Each word's opacity
 * is a motion value bound to scroll — the DOM updates without re-rendering.
 */
export function Manifesto({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 45%'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      <m.span style={{ opacity }}>{children}</m.span>{' '}
    </>
  );
}
