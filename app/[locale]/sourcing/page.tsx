import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { RisingWords } from '@/components/brand-motifs';
import { InquiryForm } from '@/components/inquiry-form';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ScrollProgressLine } from '@/components/motion/scroll-effects';
import { BriefReadiness } from '@/components/sourcing/brief-readiness';
import { PhaseDial } from '@/components/sourcing/phase-dial';
import { inquiryFormCopy } from '@/lib/i18n/form-copy';
import { getDictionary, resolveLocale } from '@/lib/i18n/get-dictionary';
import { languageAlternates } from '@/lib/i18n/metadata';
import { getPhases, stageOffsets, stageRange } from '@/lib/sourcing';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return {
    title: meta.pages.sourcing.title,
    description: meta.pages.sourcing.description,
    alternates: languageAlternates(locale, '/sourcing'),
  };
}

export default async function SourcingPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  const copy = dict.sourcing;
  const phases = getPhases(dict);
  const offsets = stageOffsets(phases);
  const ranges = phases.map((_, index) => stageRange(phases, index, dict));

  return (
    <>
      {/* Hero — the process as a dial you can turn. */}
      <section
        aria-labelledby="sourcing-title"
        className="flex flex-col justify-center overflow-hidden bg-sand-soft pt-[calc(var(--header-height)+2.5rem)] pb-14 md:pb-16 lg:min-h-svh"
      >
        <div className="shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="min-w-0">
            <p className="eyebrow fade-in">{copy.hero.eyebrow}</p>
            <h1 id="sourcing-title" className="mt-6 font-serif text-[clamp(2.5rem,5.2vw,4.8rem)] leading-[0.98] tracking-[-0.02em]">
              <RisingWords text={copy.hero.titleLead} />{' '}
              <span className="text-gold-ink italic">
                <RisingWords text={copy.hero.titleAccent} offset={copy.hero.titleLead.split(' ').length} />
              </span>
            </h1>
            <p className="lede rise-in mt-6 max-w-lg text-stone" style={{ '--delay': '450ms' } as React.CSSProperties}>
              {copy.hero.lede}
            </p>
            <ol className="rise-in mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4" style={{ '--delay': '600ms' } as React.CSSProperties}>
              {phases.map((phase, index) => (
                <li key={phase.id}>
                  <a href={`#${phase.id}`} className="block rounded-2xl border border-forest/12 bg-white px-4 py-3 transition-colors hover:border-forest/40">
                    <span className="numeral text-gold-ink">{String(index + 1).padStart(2, '0')}</span>
                    <span className="mt-1 block font-serif text-xl leading-tight">{phase.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className="rise-in min-w-0" style={{ '--delay': '250ms' } as React.CSSProperties}>
            <PhaseDial phases={phases} ranges={ranges} copy={copy.dial} />
          </div>
        </div>
      </section>

      {/* Phases and their stages. */}
      <div className="py-12 md:py-20">
        {phases.map((phase, phaseIndex) => (
          <section
            key={phase.id}
            id={phase.id}
            aria-labelledby={`${phase.id}-title`}
            className="shell grid gap-10 border-b border-forest/10 py-14 last:border-b-0 md:py-20 lg:grid-cols-[0.75fr_1.25fr]"
          >
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">
                {copy.phase} {String(phaseIndex + 1).padStart(2, '0')} · {ranges[phaseIndex]}
              </p>
              <h2 id={`${phase.id}-title`} className="mt-5 font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-none">
                {phase.name}
              </h2>
              <p className="mt-5 max-w-sm text-stone">{phase.summary}</p>
            </Reveal>

            <ScrollProgressLine className="relative" trackClassName="absolute top-3 bottom-3 left-[17px] w-px bg-forest/12 rtl:right-[17px] rtl:left-auto">
              <ol className="m-0 list-none space-y-4 p-0">
                {phase.stages.map((stage, stageIndex) => (
                  <Reveal as="li" key={stage.title} className="relative ps-14">
                    <span className="numeral absolute top-6 left-0 grid size-9 place-items-center rounded-full border border-gold/60 bg-ivory text-gold-ink rtl:right-0 rtl:left-auto">
                      {String(offsets[phaseIndex] + stageIndex + 1).padStart(2, '0')}
                    </span>
                    <article className="rounded-2xl border border-forest/10 bg-white p-6 transition-shadow duration-500 hover:shadow-[0_20px_50px_-30px_rgb(15_42_30/0.4)] md:p-8">
                      <h3 className="font-serif text-[clamp(1.6rem,3vw,1.9rem)] leading-tight">{stage.title}</h3>
                      <p className="mt-3 text-stone">{stage.text}</p>
                      <p className="mt-5 rounded-xl bg-sand-soft px-4 py-3 text-sm">
                        <span className="font-bold text-gold-ink">{copy.outcome}</span> {stage.output}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </ol>
            </ScrollProgressLine>
          </section>
        ))}
      </div>

      {/* Commitments. */}
      <section aria-labelledby="commitments-title" className="defer-render bg-forest py-20 text-ivory md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow eyebrow-light">{copy.commitments.eyebrow}</p>
            <h2 id="commitments-title" className="headline mt-6">
              {copy.commitments.titleLead} <span className="text-sand italic">{copy.commitments.titleAccent}</span>
            </h2>
          </Reveal>
          <RevealGroup className="divide-y divide-ivory/12 border-y border-ivory/12">
            {copy.commitments.items.map((item) => (
              <RevealItem key={item} className="flex gap-5 py-5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-gold text-forest">
                  <Check size={15} strokeWidth={2} aria-hidden="true" />
                </span>
                <p className="text-[1.05rem] text-ivory/85">{item}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Readiness self-check. */}
      <section aria-labelledby="readiness-title" className="bg-sand-soft py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{copy.readiness.eyebrow}</p>
            <h2 id="readiness-title" className="headline mt-6">
              {copy.readiness.titleLead} <span className="text-gold-ink italic">{copy.readiness.titleAccent}</span>
            </h2>
            <p className="mt-6 text-stone">{copy.readiness.body}</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-12">
            <BriefReadiness copy={copy.readiness} />
          </Reveal>
        </div>
      </section>

      {/* Brief form. */}
      <section id="brief" aria-labelledby="brief-title" className="py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">{copy.brief.eyebrow}</p>
            <h2 id="brief-title" className="headline mt-6">
              {copy.brief.title}
            </h2>
            <p className="mt-6 max-w-md text-stone">{copy.brief.body}</p>
          </Reveal>
          <Reveal delay={0.08} className="min-w-0">
            <InquiryForm locale={locale} copy={inquiryFormCopy(dict)} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
