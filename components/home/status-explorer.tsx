'use client';

import { useState } from 'react';
import { StatusChip } from '@/components/status-chip';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { statusOrder, type StatusKey } from '@/lib/products';
import { cn } from '@/lib/utils';

const sampleStatuses: StatusKey[] = ['pending', 'onRequest', 'onRequest', 'unpublished', 'verified'];

/**
 * Pick a status to see where it appears on an example data sheet. A small
 * "learn by doing" moment that explains how every product page reads.
 */
export function StatusExplorer({
  copy,
  status,
}: {
  copy: Dictionary['home']['information'];
  status: Dictionary['status'];
}) {
  const [focus, setFocus] = useState<StatusKey | null>(null);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div>
        <p className="text-stone">{copy.explorerHint}</p>
        <ul className="mt-5 list-none space-y-2 p-0">
          {statusOrder.map((key) => {
            const active = focus === key;
            return (
              <li key={key}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFocus(active ? null : key)}
                  onPointerEnter={(event) => event.pointerType === 'mouse' && setFocus(key)}
                  className={cn(
                    'flex w-full cursor-pointer flex-col items-start gap-2 rounded-2xl border p-4 text-start transition-colors duration-300 sm:flex-row sm:items-center sm:gap-5',
                    active ? 'border-forest/30 bg-white' : 'border-transparent hover:bg-white/60',
                  )}
                >
                  <StatusChip status={key} label={status[key].label} className="sm:min-w-[15.5rem]" />
                  <span className="text-sm text-stone">{status[key].description}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="rounded-3xl border border-forest/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgb(15_42_30/0.35)] md:p-10"
        onPointerLeave={() => setFocus(null)}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">{copy.sheetLabel}</p>
          <span className="rounded-full bg-sand-soft px-3 py-1 text-[0.8rem] text-stone">{copy.illustrative}</span>
        </div>
        <p className="mt-5 border-b border-forest/12 pb-5 font-serif text-[2.4rem] leading-none">{copy.productName}</p>
        <dl className="m-0 divide-y divide-forest/10">
          {copy.rows.map((row, index) => {
            const key = sampleStatuses[index];
            const dimmed = focus !== null && focus !== key;
            return (
              <div
                key={row.label}
                className={cn(
                  'grid gap-2 py-4 transition-[opacity,transform] duration-500 sm:grid-cols-[0.8fr_1.2fr] sm:items-center',
                  dimmed ? 'opacity-25' : 'opacity-100',
                  focus === key && 'translate-x-1 rtl:-translate-x-1',
                )}
              >
                <dt className="font-bold">{row.label}</dt>
                <dd className="m-0 flex flex-col gap-1.5">
                  <StatusChip status={key} label={status[key].label} />
                  <span className="text-sm text-stone">{row.note}</span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
