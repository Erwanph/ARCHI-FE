'use client';

import { createContext, useContext } from 'react';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import type { Locale } from '@/lib/i18n/config';

export type BoundaryCopy = {
  locale: Locale;
  error: Dictionary['error'];
  notFound: Dictionary['notFound'];
};

// The [locale] layout wraps the error and not-found boundaries, so it hands
// them their copy here. This keeps every dictionary out of the client bundle.
const BoundaryCopyContext = createContext<BoundaryCopy | null>(null);

export function BoundaryCopyProvider({ value, children }: { value: BoundaryCopy; children: React.ReactNode }) {
  return <BoundaryCopyContext value={value}>{children}</BoundaryCopyContext>;
}

export function useBoundaryCopy(): BoundaryCopy {
  const copy = useContext(BoundaryCopyContext);
  if (!copy) throw new Error('useBoundaryCopy must be used inside BoundaryCopyProvider');
  return copy;
}
