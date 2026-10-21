'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/** Delegated click tracking for any element carrying `data-track-event`. */
export function AnalyticsRuntime() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        '[data-track-event]',
      );
      if (!target) return;
      trackEvent(target.dataset.trackEvent || 'interaction', {
        product: target.dataset.trackProduct,
        destination: target.dataset.trackDestination,
      });
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

/** Fires once per mount, so it also runs on client-side navigations. */
export function TrackView({
  event,
  product,
}: {
  event: string;
  product?: string;
}) {
  useEffect(() => {
    trackEvent(event, { product });
  }, [event, product]);

  return null;
}
