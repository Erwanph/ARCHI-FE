import type { Metadata } from 'next';
import { CircleCheck } from 'lucide-react';
import { Archipelago, RisingWords } from '@/components/brand-motifs';
import { InquiryForm } from '@/components/inquiry-form';
import { inquiryFormCopy } from '@/lib/i18n/form-copy';
import { getDictionary, resolveLocale } from '@/lib/i18n/get-dictionary';
import { languageAlternates } from '@/lib/i18n/metadata';
import { productRecords } from '@/lib/products';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<'type' | 'product' | 'market', string | string[] | undefined>>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return {
    title: meta.pages.contact.title,
    description: meta.pages.contact.description,
    alternates: languageAlternates(locale, '/contact'),
  };
}

export default async function ContactPage({ params, searchParams }: ContactPageProps) {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  const copy = dict.contact;
  const query = await searchParams;
  const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? '';
  const requestedType = first(query.type);
  // Values arrive from the homepage route planner; only known options pass.
  const productOptions = new Set([...productRecords.map((product) => product.name), 'Other / not listed']);
  const defaultProduct = productOptions.has(first(query.product)) ? first(query.product) : '';
  const defaultMarket = first(query.market).slice(0, 60);
  const defaultInquiryType = requestedType === 'supplier' || requestedType === 'general' ? requestedType : 'buyer';

  return (
    <section aria-labelledby="contact-title" className="pt-(--header-height)">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="relative overflow-hidden bg-forest text-ivory">
          <Archipelago fill="#1e4635" className="pointer-events-none absolute -bottom-10 -left-20 w-[140%] max-w-none" float />
          <div className="relative px-5 py-14 md:px-12 md:py-20 lg:sticky lg:top-(--header-height) lg:px-14 xl:ps-[max(var(--gutter),calc((100vw-var(--shell-max))/2))]">
            <p className="eyebrow eyebrow-light fade-in">{copy.eyebrow}</p>
            <h1 id="contact-title" className="mt-6 font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.02em]">
              <RisingWords text={copy.titleLead} />{' '}
              <span className="text-sand italic">
                <RisingWords text={copy.titleAccent} offset={copy.titleLead.split(' ').length} />
              </span>
            </h1>
            <p className="lede rise-in mt-6 max-w-md text-ivory/78" style={{ '--delay': '400ms' } as React.CSSProperties}>
              {copy.lede}
            </p>

            <div className="rise-in mt-12" style={{ '--delay': '560ms' } as React.CSSProperties}>
              <p className="eyebrow eyebrow-light">{copy.checklistTitle}</p>
              <ul className="mt-5 list-none space-y-3 p-0">
                {copy.checklist.map((item) => (
                  <li key={item} className="flex gap-3 text-ivory/85">
                    <CircleCheck size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold-soft" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rise-in mt-12 border-t border-ivory/14 pt-8" style={{ '--delay': '680ms' } as React.CSSProperties}>
              <p className="eyebrow eyebrow-light">{copy.nextTitle}</p>
              <ol className="mt-5 grid list-none gap-5 p-0 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {copy.next.map((step, index) => (
                  <li key={step.title}>
                    <span className="numeral text-gold-soft">{String(index + 1).padStart(2, '0')}</span>
                    <p className="mt-2 font-serif text-[1.5rem] leading-none">{step.title}</p>
                    <p className="mt-2 text-sm text-ivory/65">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>

        <div className="min-w-0 bg-sand-soft px-4 py-12 sm:px-5 md:px-12 md:py-20 lg:px-14 xl:pe-[max(var(--gutter),calc((100vw-var(--shell-max))/2))]">
          <div className="rise-in mx-auto max-w-2xl lg:mx-0" style={{ '--delay': '300ms' } as React.CSSProperties}>
            <InquiryForm
              locale={locale}
              copy={inquiryFormCopy(dict)}
              defaultInquiryType={defaultInquiryType}
              defaultProduct={defaultProduct}
              defaultMarket={defaultMarket}
            />
            <p className="mt-6 text-center text-sm text-stone lg:text-start">{copy.sensitiveNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
