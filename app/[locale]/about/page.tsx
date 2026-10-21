import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FloatingCards } from '@/components/about/floating-cards';
import { Leadership } from '@/components/about/leadership';
import { Manifesto } from '@/components/about/manifesto';
import { RisingWords, WaveLines } from '@/components/brand-motifs';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ResponsiveImage } from '@/components/responsive-image';
import { verifiedBusinessProfile } from '@/lib/business-profile';
import { localizePath } from '@/lib/i18n/config';
import { getDictionary, resolveLocale } from '@/lib/i18n/get-dictionary';
import { languageAlternates } from '@/lib/i18n/metadata';
import { getProducts } from '@/lib/products';
import { cn } from '@/lib/utils';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return {
    title: meta.pages.about.title,
    description: meta.pages.about.description,
    alternates: languageAlternates(locale, '/about'),
  };
}

const palette = [
  ['bg-forest-raised', '40%'],
  ['bg-gold', '20%'],
  ['bg-ivory', '30%'],
  ['bg-sand', '10%'],
] as const;

const arrow = <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />;

export default async function AboutPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  const copy = dict.about;
  const products = getProducts(dict);
  const team = verifiedBusinessProfile.team ?? [];

  return (
    <>
      {/* Hero — short statement beside the wordmark. */}
      <section
        aria-labelledby="about-title"
        className="relative flex flex-col justify-center overflow-hidden bg-forest pt-[calc(var(--header-height)+2.5rem)] pb-14 text-ivory md:pb-20 lg:min-h-svh"
      >
        <WaveLines tone="dark" lines={4} animate className="pointer-events-none absolute top-24 right-[-20%] h-48 w-[90%] opacity-30" />
        <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow eyebrow-light fade-in">{copy.hero.eyebrow}</p>
            <h1 id="about-title" className="mt-6 font-serif text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.98] tracking-[-0.02em]">
              <RisingWords text={copy.hero.titleLead} />{' '}
              <span className="block text-sand italic">
                <RisingWords text={copy.hero.titleAccent} offset={copy.hero.titleLead.split(' ').length} />
              </span>
            </h1>
            <p className="lede rise-in mt-7 max-w-md text-ivory/78" style={{ '--delay': '500ms' } as React.CSSProperties}>
              {copy.hero.lede}
            </p>
          </div>

          <div className="rise-in" style={{ '--delay': '350ms' } as React.CSSProperties}>
            <div className="relative overflow-hidden rounded-[28px] border border-ivory/10 bg-forest-raised/60 p-8 md:p-12">
              <img
                src="/brand/archi-lockup-light-700.webp"
                width={700}
                height={228}
                alt={copy.hero.lockupAlt}
                className="clip-in mx-auto w-full max-w-sm"
                style={{ '--delay': '500ms' } as React.CSSProperties}
              />
              <WaveLines tone="dark" lines={2} gap={10} amplitude={18} animate className="mt-6 h-12 w-full opacity-70" />
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-gold/30 pt-8">
                {copy.hero.glance.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm text-gold-soft">{item.label}</dt>
                    <dd className="m-0 mt-1.5 font-serif text-xl leading-tight">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex h-1.5 overflow-hidden rounded-full" aria-hidden="true">
                {palette.map(([color, width]) => (
                  <span key={color} className={color} style={{ width }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto — a single line that lights up as it is read. */}
      <section aria-label={copy.hero.eyebrow} className="py-24 md:py-36">
        <div className="shell">
          <Manifesto
            text={copy.manifesto}
            className="mx-auto max-w-[24ch] text-center font-serif text-[clamp(2rem,4.6vw,4rem)] leading-[1.12] tracking-[-0.01em]"
          />
        </div>
      </section>

      {/* What ARCHI stands for — a tidy bento that drifts with the pointer. */}
      <section aria-labelledby="stands-title" className="overflow-hidden bg-sand-soft py-24 md:py-32">
        <div className="shell">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <p className="eyebrow">{copy.standsFor.eyebrow}</p>
              <h2 id="stands-title" className="headline mt-6">
                {copy.standsFor.title}
              </h2>
            </div>
            <p className="max-w-lg text-stone md:justify-self-end">{copy.standsFor.body}</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-12">
            <FloatingCards cards={copy.standsFor.cards} />
          </Reveal>
        </div>
      </section>

      {/* Leadership. */}
      {team.length > 0 && (
        <section aria-labelledby="leadership-title" className="py-24 md:py-32">
          <div className="shell">
            <Reveal className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-end">
              <div>
                <p className="eyebrow">{copy.leadership.eyebrow}</p>
                <h2 id="leadership-title" className="headline mt-6">
                  {copy.leadership.title}
                </h2>
              </div>
              <p className="max-w-lg text-stone md:justify-self-end">{copy.leadership.body}</p>
            </Reveal>
            <div className="mt-12">
              <Leadership team={team} copy={copy.leadership} />
            </div>
          </div>
        </section>
      )}

      {/* Purpose, vision, mission. */}
      <section aria-labelledby="direction-title" className="defer-render bg-sand-soft py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.direction.eyebrow}</p>
            <h2 id="direction-title" className="headline mt-6">
              {copy.direction.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal className="rounded-3xl bg-forest p-8 text-ivory md:p-12">
              <p className="eyebrow eyebrow-light">{copy.direction.purposeLabel}</p>
              <p className="mt-6 font-serif text-[clamp(1.6rem,2.6vw,2.3rem)] leading-snug">{copy.direction.purpose}</p>
            </Reveal>
            <Reveal delay={0.08} className="rounded-3xl border border-forest/10 bg-ivory p-8 md:p-12">
              <p className="eyebrow">{copy.direction.visionLabel}</p>
              <p className="mt-6 font-serif text-[clamp(1.6rem,2.6vw,2.3rem)] leading-snug">{copy.direction.vision}</p>
            </Reveal>
          </div>
          <p className="eyebrow mt-16">{copy.direction.missionLabel}</p>
          <RevealGroup className="mt-6 grid gap-8 md:grid-cols-3">
            {copy.direction.missions.map((mission, index) => (
              <RevealItem key={mission.title} className="border-t border-gold pt-6">
                <p className="numeral text-gold-ink">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-serif text-[2rem] font-medium leading-none">{mission.title}</h3>
                <p className="mt-4 text-stone">{mission.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Approach — four connected steps. */}
      <section aria-labelledby="approach-title" className="defer-render py-24 md:py-32">
        <div className="shell">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <p className="eyebrow">{copy.approach.eyebrow}</p>
              <h2 id="approach-title" className="headline mt-6">
                {copy.approach.title}
              </h2>
            </div>
            <p className="max-w-lg text-stone md:justify-self-end">{copy.approach.body}</p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.approach.steps.map((step, index) => {
              const last = index === copy.approach.steps.length - 1;
              return (
                <RevealItem
                  key={step.title}
                  className={cn('relative flex min-h-60 flex-col rounded-2xl p-7', last ? 'bg-forest text-ivory' : 'border border-forest/10 bg-white')}
                >
                  {!last && (
                    <span aria-hidden="true" className="absolute top-1/2 -right-5 hidden h-px w-5 bg-gold lg:block rtl:right-auto rtl:-left-5">
                      <span className="absolute top-1/2 left-1/2 size-1.5 -translate-1/2 rounded-full bg-gold" />
                    </span>
                  )}
                  <p className={cn('numeral', last ? 'text-gold-soft' : 'text-gold-ink')}>{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-12 font-serif text-[clamp(2rem,3vw,2.3rem)] font-medium leading-none">{step.title}</h3>
                  <p className={cn('mt-4', last ? 'text-sand' : 'text-stone')}>{step.text}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <Link href={localizePath(locale, '/sourcing')} className="link-arrow mt-10">
            {copy.approach.link} {arrow}
          </Link>
        </div>
      </section>

      {/* Four pillars — hover to read. */}
      <section aria-labelledby="pillars-title" className="defer-render bg-forest py-24 text-ivory md:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow eyebrow-light">{copy.pillars.eyebrow}</p>
            <h2 id="pillars-title" className="headline mt-6">
              {copy.pillars.titleLead} <span className="text-sand italic">{copy.pillars.titleAccent}</span>
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.pillars.items.map((pillar, index) => (
              <RevealItem key={pillar.title}>
                <article className="group relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-ivory/12 p-7 transition-colors duration-500 hover:border-gold/60 hover:bg-forest-raised">
                  <p className="numeral text-gold-soft">{String(index + 1).padStart(2, '0')}</p>
                  <div className="mt-8 flex items-center" aria-hidden="true">
                    <span className="size-7 rounded-full bg-gold transition-transform duration-500 group-hover:scale-110" />
                    <span className="h-px flex-1 origin-left scale-x-50 bg-ivory/25 transition-transform duration-700 ease-(--ease-archi) group-hover:scale-x-100 rtl:origin-right" />
                  </div>
                  <h3 className="mt-8 font-serif text-[clamp(2rem,3vw,2.3rem)] leading-none">{pillar.title}</h3>
                  <p className="mt-4 text-ivory/72">{pillar.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Current focus + audiences. */}
      <section aria-labelledby="focus-title" className="defer-render py-24 md:py-32">
        <div className="shell grid gap-16 lg:grid-cols-2">
          <div className="min-w-0">
            <Reveal>
              <p className="eyebrow">{copy.focus.eyebrow}</p>
              <h2 id="focus-title" className="headline mt-6">
                {copy.focus.title}
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-4">
              {products.map((product) => (
                <RevealItem key={product.slug}>
                  <Link
                    href={localizePath(locale, `/products/${product.slug}`)}
                    className="group grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-2xl border border-forest/10 bg-white p-3 pe-5 transition-colors hover:border-forest/30 sm:grid-cols-[96px_1fr_auto] sm:gap-5"
                  >
                    <span className="block aspect-square overflow-hidden rounded-xl">
                      <ResponsiveImage src={product.image} alt="" sizes="96px" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow">{product.categoryLabel}</span>
                      <span className="mt-1 block font-serif text-[1.6rem] leading-tight">{product.shortName}</span>
                    </span>
                    <ArrowUpRight size={18} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="min-w-0">
            <Reveal>
              <p className="eyebrow">{copy.audiences.eyebrow}</p>
              <h2 className="headline mt-6">{copy.audiences.title}</h2>
            </Reveal>
            <RevealGroup className="mt-10 divide-y divide-forest/10 border-y border-forest/10">
              {copy.audiences.items.map((audience, index) => (
                <RevealItem key={audience.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
                  <span className="numeral text-gold-ink">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-serif text-[1.7rem] leading-none">{audience.title}</h3>
                    <p className="mt-1 text-sm text-stone">{audience.who}</p>
                    <p className="mt-3">{audience.text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Commercial responsibility. */}
      <section aria-labelledby="trust-title" className="defer-render bg-sand-soft py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">{copy.trust.eyebrow}</p>
            <h2 id="trust-title" className="headline mt-6">
              {copy.trust.titleLead} <span className="text-gold-ink italic">{copy.trust.titleAccent}</span>
            </h2>
            <p className="mt-6 max-w-md text-stone">{copy.trust.body}</p>
          </Reveal>
          <div>
            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {copy.trust.points.map((point, index) => (
                <RevealItem key={point} className="rounded-2xl bg-white p-6">
                  <p className="numeral text-gold-ink">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-4">{point}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-6 text-sm text-stone">{copy.trust.note}</p>
          </div>
        </div>
      </section>

      {/* Close. */}
      <section aria-labelledby="about-close-title" className="defer-render py-24 md:py-28">
        <Reveal className="shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow">{copy.close.eyebrow}</p>
            <h2 id="about-close-title" className="headline mt-6 max-w-[18ch]">
              {copy.close.title}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href={localizePath(locale, '/contact?type=buyer')} className="btn btn-forest">
              {copy.close.primary} {arrow}
            </Link>
            <Link href={localizePath(locale, '/contact?type=supplier')} className="btn btn-outline">
              {copy.close.secondary}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
