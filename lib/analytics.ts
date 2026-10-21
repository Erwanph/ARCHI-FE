'use client';

export type AnalyticsValue = string | number | boolean | undefined;
export type AnalyticsProperties = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    ARCHI_ANALYTICS?: {
      track: (event: string, properties?: AnalyticsProperties) => void;
    };
  }
}

export function trackEvent(event: string, properties: AnalyticsProperties = {}) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('archi:analytics', {
      detail: { event, properties },
    }),
  );
  window.ARCHI_ANALYTICS?.track(event, properties);
}
