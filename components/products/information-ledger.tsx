'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { StatusChip } from '@/components/status-chip';
import { localizePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { format } from '@/lib/i18n/format';
import { statusOrder, type Product, type StatusKey } from '@/lib/products';
import { cn } from '@/lib/utils';

/** Every published detail, filterable by its status. */
export function InformationLedger({
  locale,
  products,
  copy,
  status,
}: {
  locale: Locale;
  products: Product[];
  copy: Dictionary['products']['ledger'];
  status: Dictionary['status'];
}) {
  const [filter, setFilter] = useState<StatusKey | 'all'>('all');
  const options: Array<StatusKey | 'all'> = ['all', ...statusOrder];
  const allRows = products.flatMap((product) => [...product.information, ...product.documentation]);

  return (
    <div>
      <fieldset className="m-0 flex min-w-0 flex-wrap gap-2 border-0 p-0">
        <legend className="mb-3 text-sm text-stone">{copy.filterLabel}</legend>
        {options.map((option) => {
          const selected = option === filter;
          const count = option === 'all' ? null : allRows.filter((item) => item.status === option).length;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(option)}
              className={cn(
                'inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300',
                selected ? 'border-forest bg-forest font-bold text-ivory' : 'border-forest/15 bg-white hover:border-forest/40',
              )}
            >
              {option === 'all' ? copy.everything : status[option].label}
              {count !== null && <span className={cn('numeral', selected ? 'text-sand' : 'text-stone')}>{count}</span>}
            </button>
          );
        })}
      </fieldset>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {products.map((product) => {
          const rows = [...product.information, ...product.documentation];
          return (
            <article key={product.slug} className="rounded-3xl border border-forest/10 bg-white p-6 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="eyebrow">{product.categoryLabel}</p>
                  <h3 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.2rem)] leading-none">{product.displayName}</h3>
                </div>
                <Link
                  href={localizePath(locale, `/products/${product.slug}`)}
                  aria-label={format(copy.openSheet, { name: product.displayName })}
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-forest/20 transition-colors hover:bg-forest hover:text-ivory"
                >
                  <ArrowUpRight size={17} strokeWidth={1.6} className="rtl:-scale-x-100" />
                </Link>
              </div>
              <dl className="mt-6 divide-y divide-forest/10 border-t border-forest/10">
                {rows.map((item) => {
                  const dimmed = filter !== 'all' && item.status !== filter;
                  return (
                    <div
                      key={item.label}
                      className={cn(
                        'grid gap-2 py-4 transition-opacity duration-500 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6',
                        dimmed && 'opacity-25',
                      )}
                    >
                      <dt>
                        <span className="font-bold">{item.label}</span>
                        <span className="mt-1 block text-sm text-stone">{item.note}</span>
                      </dt>
                      <dd className="m-0">
                        <StatusChip status={item.status} label={status[item.status].label} />
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}
