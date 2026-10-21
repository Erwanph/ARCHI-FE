'use client';

import { useLayoutEffect, useRef } from 'react';

// Re-mounts on every navigation. The first mount (the server-rendered page)
// paints untouched; later mounts are client-side navigations and get a soft
// rise, applied before paint so there is no flash.
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.navigated !== undefined) {
      ref.current?.classList.add('page-enter');
    }
    root.dataset.navigated = '';
  }, []);

  return <div ref={ref}>{children}</div>;
}
