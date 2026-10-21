import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { RisingWords } from '@/components/brand-motifs';
import { RoutePlanner } from '@/components/home/route-planner';
import { localizePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';

/*
 * Split hero: the promise on the left, a working route preview on the right.
 * Fills the first screen minus the brand marquee (--marquee-h), with the content
 * centred in that space so the marquee sits just below it on any laptop.
 */
export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.home.hero;
  const leadWords = copy.titleLead.split(' ').length;
  return (
    <section aria-labelledby="hero-title" className="relative flex flex-col overflow-hidden pt-(--header-height) lg:min-h-[calc(100svh-var(--marquee-h))]">
      <div className="shell grid flex-1 items-center gap-10 py-10 md:py-14 lg:grid-cols-[0.95fr_1.1fr] lg:gap-16 lg:py-8 xl:gap-24">
        <div className="min-w-0">
          <p className="eyebrow fade-in">{copy.eyebrow}</p>
          <h1 id="hero-title" className="mt-6 font-serif text-[clamp(2.6rem,5.2vw,5rem)] leading-[0.98] tracking-[-0.02em]">
            <RisingWords text={copy.titleLead} />{' '}
            <span className="font-medium text-gold-ink italic">
              <RisingWords text={copy.titleAccent} offset={leadWords} />
            </span>
          </h1>
          <p className="lede rise-in mt-6 max-w-lg text-stone" style={{ '--delay': '450ms' } as React.CSSProperties}>
            {copy.lede}
          </p>
          <div className="rise-in mt-8 flex flex-wrap items-center gap-3" style={{ '--delay': '600ms' } as React.CSSProperties}>
            <Link href={localizePath(locale, '/products')} className="btn btn-forest">
              {copy.primaryCta} <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />
            </Link>
            <Link href={localizePath(locale, '/sourcing')} className="btn btn-outline">
              {copy.secondaryCta}
            </Link>
          </div>
          <p className="rise-in mt-8 text-sm text-stone" style={{ '--delay': '750ms' } as React.CSSProperties}>
            {copy.supplierPrompt}{' '}
            <Link
              href={localizePath(locale, '/contact?type=supplier')}
              className="font-bold text-forest underline decoration-gold underline-offset-4 hover:decoration-forest"
              data-track-event="supplier_inquiry_click"
              data-track-destination="homepage_hero"
            >
              {copy.supplierLink}
            </Link>
          </p>
        </div>

        {/* min-w-0: the pill rows scroll inside the panel instead of widening it. */}
        <div className="rise-in min-w-0" style={{ '--delay': '300ms' } as React.CSSProperties}>
          <RoutePlanner locale={locale} copy={dict.home.planner} />
        </div>
      </div>
    </section>
  );
}
