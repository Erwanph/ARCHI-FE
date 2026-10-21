'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Archipelago, WaveLines } from '@/components/brand-motifs';
import { localizePath } from '@/lib/i18n/config';
import { useBoundaryCopy } from '@/components/boundary-copy';

export default function NotFound() {
  const { locale, notFound: copy } = useBoundaryCopy();
  return (
    <section aria-labelledby="not-found-title" className="relative flex min-h-[86svh] items-center overflow-hidden bg-forest pt-32 pb-20 text-ivory">
      <Archipelago fill="#1e4635" className="pointer-events-none absolute top-24 right-[-10%] w-[70%] opacity-90" float />
      <WaveLines tone="dark" lines={4} animate className="pointer-events-none absolute bottom-10 left-0 h-40 w-full opacity-50" />
      <div className="shell relative">
        <p className="eyebrow eyebrow-light">{copy.eyebrow}</p>
        <h1 id="not-found-title" className="display mt-6 max-w-[14ch]">
          {copy.titleLead} <span className="text-sand italic">{copy.titleAccent}</span>
        </h1>
        <p className="lede mt-6 max-w-lg text-ivory/75">{copy.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="btn btn-sand" href={localizePath(locale, '/')}>
            <ArrowLeft size={16} strokeWidth={1.6} className="rtl:-scale-x-100" /> {copy.home}
          </Link>
          <Link className="btn btn-outline-light" href={localizePath(locale, '/products')}>
            {copy.products} <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
