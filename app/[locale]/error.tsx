'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { localizePath } from '@/lib/i18n/config';
import { useBoundaryCopy } from '@/components/boundary-copy';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { locale, error: copy } = useBoundaryCopy();

  useEffect(() => {
    console.error('ARCHI page render failed', { digest: error.digest });
  }, [error.digest]);

  return (
    <section className="flex min-h-[80svh] items-center bg-forest pt-32 pb-20 text-ivory">
      <div className="shell">
        <p className="eyebrow eyebrow-light">{copy.eyebrow}</p>
        <h1 className="display mt-6 max-w-[14ch]">
          {copy.titleLead} <span className="text-sand italic">{copy.titleAccent}</span>
        </h1>
        <p className="lede mt-6 max-w-lg text-ivory/75">{copy.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button className="btn btn-sand" type="button" onClick={reset}>
            <RotateCcw size={16} strokeWidth={1.6} /> {copy.retry}
          </button>
          <Link className="btn btn-outline-light" href={localizePath(locale, '/')}>
            {copy.home} <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
