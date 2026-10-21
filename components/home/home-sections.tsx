import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Archipelago, WaveLines } from '@/components/brand-motifs';
import { AudienceTabs } from '@/components/home/audience-tabs';
import { StatusExplorer } from '@/components/home/status-explorer';
import { CountUp } from '@/components/motion/count-up';
import { ImageReveal, Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ScrollProgressLine } from '@/components/motion/scroll-effects';
import { Spotlight } from '@/components/motion/spotlight';
import { ResponsiveImage } from '@/components/responsive-image';
import { StatusChip } from '@/components/status-chip';
import { localizePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { getProducts } from '@/lib/products';
import { cn } from '@/lib/utils';

type SectionProps = { locale: Locale; dict: Dictionary };

const arrow = <ArrowUpRight size={15} strokeWidth={1.6} className="rtl:-scale-x-100" />;

/* --------------------------------------------------------------------------- */

export function BrandMarquee({ dict }: { dict: Dictionary }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="m-0 flex shrink-0 list-none items-center gap-10 p-0 pe-10">
      {dict.home.marquee.map((word) => (
        <li key={word} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-serif text-[1.7rem] leading-[1.25] text-forest italic md:text-[2.1rem]">{word}</span>
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label={dict.home.marqueeLabel}
      dir="ltr"
      className="marquee flex h-(--marquee-h) items-center overflow-hidden border-y border-forest/10 bg-sand-soft"
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */

const factValues = [
  { value: 17000, suffix: '+' },
  { value: 4, suffix: '' },
  { value: 11, suffix: '' },
];

export function PremiseSection({ locale, dict }: SectionProps) {
  const copy = dict.home.premise;
  return (
    <section aria-labelledby="premise-title" className="relative overflow-hidden py-24 md:py-32">
      <div className="shell grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="premise-title" className="headline mt-6">
            {copy.titleLead} <span className="text-gold-ink italic">{copy.titleAccent}</span>
          </h2>
          <p className="lede mt-8 max-w-xl text-stone">{copy.body}</p>
          <Link href={localizePath(locale, '/origins')} className="link-arrow mt-8 text-forest">
            {copy.link} {arrow}
          </Link>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-3xl bg-sand-soft px-6 pt-14 pb-8 md:px-10">
            <Archipelago className="relative z-10 w-full" float />
            <WaveLines lines={4} gap={12} amplitude={26} className="-mt-16 h-32 w-full md:-mt-24" animate />
            <div className="mt-2 flex items-center justify-between text-sm text-gold-ink">
              <span>{copy.mapFrom}</span>
              <span className="mx-6 hidden h-px flex-1 bg-gold/40 sm:block" />
              <span>{copy.mapTo}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <RevealGroup className="shell mt-20 grid gap-px overflow-hidden rounded-2xl border border-forest/10 bg-forest/10 md:grid-cols-3">
        {copy.facts.map((fact, index) => (
          <RevealItem key={fact.unit} className="bg-ivory p-8">
            <p className="font-serif text-[clamp(2.8rem,6vw,3.75rem)] leading-none">
              <CountUp value={factValues[index].value} suffix={factValues[index].suffix} />{' '}
              <span className="text-2xl text-gold-ink italic">{fact.unit}</span>
            </p>
            <p className="mt-4 max-w-xs text-stone">{fact.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* --------------------------------------------------------------------------- */

export function PortfolioSection({ locale, dict }: SectionProps) {
  const copy = dict.home.portfolio;
  const products = getProducts(dict);
  return (
    <section aria-labelledby="portfolio-title" className="defer-render bg-white py-24 md:py-32">
      <div className="shell">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="portfolio-title" className="headline mt-6 max-w-[16ch]">
              {copy.title}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-stone">{copy.body}</p>
            <Link href={localizePath(locale, '/products')} className="link-arrow mt-6">
              {copy.link} {arrow}
            </Link>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <RevealItem key={product.slug} as="article">
              <Spotlight className="h-full rounded-2xl">
                <Link
                  href={localizePath(locale, `/products/${product.slug}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest/10 bg-ivory transition-[box-shadow,transform] duration-500 ease-(--ease-archi) hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgb(15_42_30/0.45)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ResponsiveImage
                      src={product.image}
                      alt={product.imageAlt}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-(--ease-archi) group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-ivory/95 px-3 py-1.5 text-[0.8rem] font-bold rtl:right-4 rtl:left-auto">
                      {String(index + 1).padStart(2, '0')} · {product.categoryLabel}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-serif text-[2rem] leading-tight">{product.shortName}</h3>
                    <dl className="mt-5 flex-1 divide-y divide-forest/10 border-y border-forest/10">
                      {product.information.slice(0, 2).map((item) => (
                        <div key={item.label} className="flex flex-col gap-2 py-3">
                          <dt className="text-sm text-stone">{item.label}</dt>
                          <dd className="m-0">
                            <StatusChip status={item.status} label={dict.status[item.status].label} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <span className="link-arrow mt-6 w-fit">
                      {dict.common.viewDataSheet} {arrow}
                    </span>
                  </div>
                </Link>
              </Spotlight>
            </RevealItem>
          ))}

          <RevealItem as="article" className="md:col-span-2 lg:col-span-1">
            <Spotlight tone="dark" className="h-full rounded-2xl">
              <Link
                href={localizePath(locale, '/contact?type=buyer')}
                data-track-event="buyer_inquiry_click"
                data-track-destination="portfolio_other"
                className="group relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-2xl bg-forest p-8 text-ivory lg:min-h-[420px]"
              >
                <Archipelago
                  fill="#4a503e"
                  className="pointer-events-none absolute -right-20 -bottom-6 w-[150%] max-w-none opacity-70 transition-transform duration-[1.2s] ease-(--ease-archi) group-hover:-translate-x-6"
                />
                <span className="relative grid size-12 place-items-center rounded-full border border-ivory/25 transition-colors group-hover:bg-sand group-hover:text-forest">
                  <Plus size={20} strokeWidth={1.5} />
                </span>
                <div className="relative">
                  <p className="eyebrow eyebrow-light">{copy.notListedEyebrow}</p>
                  <h3 className="mt-4 font-serif text-[2rem] leading-tight">{copy.notListedTitle}</h3>
                  <span className="link-arrow mt-6 text-sand">
                    {copy.notListedLink} {arrow}
                  </span>
                </div>
              </Link>
            </Spotlight>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */

export function ApproachSection({ locale, dict }: SectionProps) {
  const copy = dict.home.approach;
  return (
    <section aria-labelledby="approach-title" className="relative bg-forest py-24 text-ivory md:py-32">
      <div className="shell grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow eyebrow-light">{copy.eyebrow}</p>
            <h2 id="approach-title" className="headline mt-6">
              {copy.titleLead} <span className="text-sand italic">{copy.titleAccent}</span>
            </h2>
            <p className="lede mt-8 max-w-md text-ivory/72">{copy.body}</p>
            <Link href={localizePath(locale, '/sourcing')} className="link-arrow mt-8 text-sand">
              {copy.link} {arrow}
            </Link>
          </Reveal>
        </div>

        <ScrollProgressLine className="relative" trackClassName="absolute top-2 bottom-2 left-[19px] w-px bg-ivory/14 rtl:right-[19px] rtl:left-auto">
          <ol className="m-0 list-none space-y-5 p-0">
            {copy.steps.map((step, index) => {
              const last = index === copy.steps.length - 1;
              return (
                <Reveal as="li" key={step.title} className="relative ps-16">
                  <span className="numeral absolute top-7 left-0 grid size-10 place-items-center rounded-full border border-gold/60 bg-forest text-gold-soft rtl:right-0 rtl:left-auto">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className={cn('rounded-2xl p-7 md:p-10', last ? 'bg-sand text-forest' : 'border border-ivory/12 bg-forest-raised/50')}>
                    <h3 className="font-serif text-[clamp(2rem,4vw,2.4rem)] leading-none">{step.title}</h3>
                    <p className={cn('mt-4', last ? 'text-forest/80' : 'text-ivory/72')}>{step.text}</p>
                    <p className={cn('mt-6 border-t pt-4 text-sm', last ? 'border-forest/15 text-gold-ink' : 'border-ivory/12 text-gold-soft')}>
                      <span className="font-bold">{copy.outcome}</span> {step.output}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </ScrollProgressLine>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */

export function AudienceSection({ locale, dict }: SectionProps) {
  const copy = dict.home.audience;
  return (
    <section aria-labelledby="audience-title" className="defer-render py-24 md:py-32">
      <div className="shell">
        <Reveal className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="audience-title" className="headline mt-6">
              {copy.titleLead} <span className="text-gold-ink italic">{copy.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-md text-stone md:justify-self-end">{copy.body}</p>
        </Reveal>
        <AudienceTabs locale={locale} copy={copy} />
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */

export function InformationSection({ dict }: { dict: Dictionary }) {
  const copy = dict.home.information;
  return (
    <section aria-labelledby="information-title" className="defer-render bg-sand-soft py-24 md:py-32">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="information-title" className="headline mt-6">
            {copy.titleLead} <span className="text-gold-ink italic">{copy.titleAccent}</span>
          </h2>
          <p className="lede mt-8 text-stone">{copy.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <StatusExplorer copy={copy} status={dict.status} />
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */

export function ClosingCta({ locale, dict }: SectionProps) {
  const copy = dict.home.closing;
  return (
    <section aria-labelledby="closing-title" className="defer-render py-20 md:py-28">
      <div className="shell">
        <ImageReveal className="relative isolate overflow-hidden rounded-[28px] bg-forest text-ivory">
          <Archipelago fill="#4a503e" className="pointer-events-none absolute top-8 right-[-8%] -z-10 w-[52%] opacity-60" float />
          <WaveLines tone="dark" lines={3} className="pointer-events-none absolute right-[-10%] -bottom-6 -z-10 h-32 w-[70%] opacity-45" />
          <div className="grid gap-10 px-6 py-14 sm:px-8 md:px-16 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow eyebrow-light">{copy.eyebrow}</p>
              <h2 id="closing-title" className="display mt-6 max-w-[13ch] text-[clamp(2.4rem,6vw,5.4rem)]">
                {copy.titleLead} <span className="text-sand italic">{copy.titleAccent}</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <Link
                href={localizePath(locale, '/contact?type=buyer')}
                className="btn btn-sand"
                data-track-event="buyer_inquiry_click"
                data-track-destination="homepage"
              >
                {copy.primary} <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />
              </Link>
              <Link
                href={localizePath(locale, '/contact?type=supplier')}
                className="btn btn-outline-light"
                data-track-event="supplier_inquiry_click"
                data-track-destination="homepage"
              >
                {copy.secondary}
              </Link>
            </div>
          </div>
        </ImageReveal>
      </div>
    </section>
  );
}
