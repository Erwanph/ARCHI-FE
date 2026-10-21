'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ResponsiveImage } from '@/components/responsive-image';
import { StatusChip } from '@/components/status-chip';
import { trackEvent } from '@/lib/analytics';
import { localizePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { format } from '@/lib/i18n/format';
import type { CategoryKey, Product } from '@/lib/products';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

function confirmedCount(product: Product) {
  const items = [...product.information, ...product.documentation];
  return { verified: items.filter((item) => item.status === 'verified').length, total: items.length };
}

/**
 * Catalogue as an index: names on one side, the product in focus on the
 * other. Hovering or focusing a row brings its photograph forward.
 */
export function ProductIndex({
  locale,
  products,
  copy,
  categories,
  status,
}: {
  locale: Locale;
  products: Product[];
  copy: Dictionary['products']['hero'];
  categories: Dictionary['categories'];
  status: Dictionary['status'];
}) {
  const [category, setCategory] = useState<CategoryKey | 'all'>('all');
  const filtered = useMemo(
    () => products.filter((product) => category === 'all' || product.category === category),
    [category, products],
  );
  const [activeSlug, setActiveSlug] = useState(products[0]?.slug);
  const active = filtered.find((product) => product.slug === activeSlug) ?? filtered[0];
  const categoryKeys = ['all', ...Array.from(new Set(products.map((product) => product.category)))] as Array<CategoryKey | 'all'>;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div className="min-w-0">
        <fieldset className="m-0 flex min-w-0 flex-wrap gap-2 border-0 p-0">
          <legend className="sr-only">{copy.filterLabel}</legend>
          {categoryKeys.map((key) => {
            const selected = key === category;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setCategory(key);
                  trackEvent('product_category_filter', { category: key });
                }}
                className={cn(
                  'min-h-10 cursor-pointer rounded-full border px-4 text-sm transition-colors duration-300',
                  selected ? 'border-forest bg-forest font-bold text-ivory' : 'border-forest/15 text-forest/80 hover:border-forest/40',
                )}
              >
                {categories[key]}
              </button>
            );
          })}
        </fieldset>

        <ol className="mt-8 list-none border-t border-forest/12 p-0">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((product, index) => {
              const { verified, total } = confirmedCount(product);
              const selected = active?.slug === product.slug;
              return (
                <m.li
                  key={product.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.5, ease, delay: index * 0.05 }}
                  className="border-b border-forest/12"
                >
                  <Link
                    href={localizePath(locale, `/products/${product.slug}`)}
                    onPointerEnter={() => setActiveSlug(product.slug)}
                    onFocus={() => setActiveSlug(product.slug)}
                    className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-6 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-4 sm:py-7"
                  >
                    <span className={cn('numeral transition-colors', selected ? 'text-gold-ink' : 'text-stone/70')}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          'block font-serif text-[clamp(2rem,4.4vw,3.8rem)] leading-none transition-[color,translate] duration-500 ease-(--ease-archi)',
                          selected ? 'translate-x-2 text-forest rtl:-translate-x-2' : 'text-forest/45 group-hover:text-forest/80',
                        )}
                      >
                        {product.shortName}
                      </span>
                      <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone">
                        <span>{product.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{format(copy.confirmed, { verified, total })}</span>
                      </span>
                    </span>
                    <span
                      className={cn(
                        'grid size-11 place-items-center rounded-full border transition-all duration-300',
                        selected ? 'border-forest bg-forest text-ivory' : 'border-forest/20',
                      )}
                    >
                      <ArrowUpRight size={17} strokeWidth={1.6} className="rtl:-scale-x-100" />
                    </span>
                  </Link>
                </m.li>
              );
            })}
          </AnimatePresence>
        </ol>

        <Link
          href={localizePath(locale, '/contact?type=buyer')}
          data-track-event="buyer_inquiry_click"
          data-track-destination="catalogue_other"
          className="group mt-8 flex items-center gap-4 text-stone transition-colors hover:text-forest"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-dashed border-forest/30 transition-colors group-hover:border-forest">
            <Plus size={18} strokeWidth={1.6} />
          </span>
          <span>
            <span className="block font-bold text-forest">{copy.otherTitle}</span>
            <span className="text-sm">{copy.otherText}</span>
          </span>
        </Link>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-sand-soft sm:aspect-[5/4] lg:aspect-auto lg:h-[min(56svh,40rem)]">
          <AnimatePresence initial={false} mode="popLayout">
            {active && (
              <m.div
                key={active.slug}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
                className="absolute inset-0"
              >
                <ResponsiveImage
                  src={active.image}
                  alt={active.imageAlt}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                  className="h-full w-full object-cover"
                />
              </m.div>
            )}
          </AnimatePresence>
          {active && (
            <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-ivory/96 p-4 sm:inset-x-4 sm:bottom-4 sm:p-5 md:inset-x-6 md:bottom-6 md:p-6">
              <p className="font-serif text-[1.6rem] leading-none">{active.displayName}</p>
              <ul className="mt-4 list-none space-y-2 p-0">
                {active.information.slice(0, 2).map((item) => (
                  <li key={item.label} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-stone">{item.label}</span>
                    <StatusChip status={item.status} label={status[item.status].label} />
                  </li>
                ))}
              </ul>
              <p className="media-credit mt-4 text-stone">{active.imageCredit}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
