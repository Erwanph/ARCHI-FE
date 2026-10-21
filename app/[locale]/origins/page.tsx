import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Archipelago, RisingWords, WaveLines } from '@/components/brand-motifs';
import { Reveal } from '@/components/motion/reveal';
import { ExpandingWindow } from '@/components/origins/expanding-window';
import { OriginLenses } from '@/components/origins/origin-lenses';
import { ResponsiveImage } from '@/components/responsive-image';
import { localizePath } from '@/lib/i18n/config';
import { getDictionary, resolveLocale } from '@/lib/i18n/get-dictionary';
import { languageAlternates } from '@/lib/i18n/metadata';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return {
    title: meta.pages.origins.title,
    description: meta.pages.origins.description,
    alternates: languageAlternates(locale, '/origins'),
  };
}

export default async function OriginsPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  const copy = dict.origins;

  return (
    <>
      {/* Hero — centred type, then a framed photograph that opens on scroll.
          On tablet and up the photograph fills the rest of the first screen. */}
      <section
        aria-labelledby="origins-title"
        className="flex flex-col pt-[calc(var(--header-height)+3rem)] md:min-h-svh md:pt-[calc(var(--header-height)+3.5rem)] md:pb-(--gutter)"
      >
        <div className="shell text-center">
          <p className="eyebrow fade-in justify-center">{copy.hero.eyebrow}</p>
          <h1
            id="origins-title"
            className="mx-auto mt-6 max-w-[15ch] font-serif text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.98] tracking-[-0.02em]"
          >
            <RisingWords text={copy.hero.titleLead} />{' '}
            <span className="text-gold-ink italic">
              <RisingWords text={copy.hero.titleAccent} offset={copy.hero.titleLead.split(' ').length} />
            </span>
          </h1>
          <p className="lede rise-in mx-auto mt-7 max-w-xl text-stone" style={{ '--delay': '500ms' } as React.CSSProperties}>
            {copy.hero.lede}
          </p>
        </div>

        <ExpandingWindow
          frameClassName="mt-12 md:flex md:min-h-0 md:flex-1 md:flex-col"
          className="relative mx-auto aspect-[4/5] w-[calc(100%-2*var(--gutter))] overflow-hidden rounded-[22px] sm:aspect-[16/9] md:aspect-auto md:min-h-[18rem] md:flex-1"
        >
          <ResponsiveImage
            src="/images/hero-indonesia-coast.jpg"
            alt={copy.hero.imageAlt}
            sizes="100vw"
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-[linear-gradient(0deg,rgb(15_42_30/0.7),transparent)] p-6 pt-24 text-ivory md:p-10">
            <p className="max-w-sm font-serif text-2xl leading-snug italic md:text-3xl">{copy.hero.caption}</p>
            <p className="media-credit hidden text-ivory/75 sm:block">{copy.hero.credit}</p>
          </div>
        </ExpandingWindow>
      </section>

      {/* The name — typographic breakdown of ARCHI / archipelago. */}
      <section aria-labelledby="name-title" className="overflow-hidden py-24 md:py-36">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.name.eyebrow}</p>
            <h2 id="name-title" className="sr-only">
              {copy.name.srTitle}
            </h2>
            <p aria-hidden="true" dir="ltr" className="mt-8 font-serif text-[clamp(3.6rem,17vw,15rem)] leading-[0.85] tracking-[-0.03em] rtl:text-right">
              Archi<span className="text-sand italic">pelago</span>
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-[0.35fr_1fr_1fr]">
            <Reveal>
              <span className="block h-px w-16 bg-gold" />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-serif text-[clamp(1.45rem,2.4vw,1.75rem)] leading-snug">{copy.name.lead}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-stone">{copy.name.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The story — rooted in Indonesia, connected to the world. */}
      <section aria-labelledby="story-title" className="defer-render bg-sand-soft py-24 md:py-32">
        <div className="shell grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{copy.story.eyebrow}</p>
            <h2 id="story-title" className="headline mt-6">
              {copy.story.titleLead} <span className="text-gold-ink italic">{copy.story.titleAccent}</span>
            </h2>
            <p className="mt-8 font-serif text-[1.45rem] leading-snug">{copy.story.lead}</p>
            <p className="mt-6 max-w-xl text-stone">{copy.story.body}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-3xl bg-ivory p-8 md:p-12">
              <Archipelago className="w-full" float />
              <WaveLines lines={2} gap={10} amplitude={28} strokeWidth={1.6} className="-mt-10 h-24 w-full" animate />
              <p className="eyebrow mt-6">{copy.story.narrativeLabel}</p>
              <p className="mt-3 font-serif text-[2.2rem] leading-tight italic">{copy.story.narrative}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Four lenses — interactive. */}
      <section aria-labelledby="lenses-title" className="defer-render bg-forest py-24 text-ivory md:py-32">
        <div className="shell">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="eyebrow eyebrow-light">{copy.lenses.eyebrow}</p>
              <h2 id="lenses-title" className="headline mt-6">
                {copy.lenses.titleLead} <span className="text-sand italic">{copy.lenses.titleAccent}</span>
              </h2>
            </div>
            <p className="max-w-md text-ivory/72 md:justify-self-end">{copy.lenses.body}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <OriginLenses copy={copy.lenses} />
          </Reveal>
        </div>
      </section>

      {/* The premise — a quiet typographic moment. */}
      <section aria-labelledby="premise-title" className="defer-render relative overflow-hidden py-28 md:py-40">
        <WaveLines lines={5} className="pointer-events-none absolute inset-x-0 top-1/2 h-48 w-full -translate-y-1/2 opacity-30" />
        <Reveal className="shell relative text-center">
          <p className="eyebrow justify-center">{copy.premise.eyebrow}</p>
          <h2 id="premise-title" className="sr-only">
            {copy.premise.srTitle}
          </h2>
          <blockquote className="m-0 mt-8">
            <p className="font-serif text-[clamp(2.4rem,7vw,6rem)] leading-[0.98]">
              {copy.premise.quoteLead} <em className="block text-gold-ink">{copy.premise.quoteAccent}</em>
            </p>
          </blockquote>
          <p className="mx-auto mt-8 max-w-lg text-stone">{copy.premise.body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={localizePath(locale, '/products')} className="btn btn-forest">
              {copy.premise.primary} <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />
            </Link>
            <Link href={localizePath(locale, '/about')} className="btn btn-outline">
              {copy.premise.secondary}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
