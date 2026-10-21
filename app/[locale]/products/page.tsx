import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/reveal';
import { InformationLedger } from '@/components/products/information-ledger';
import { ProductIndex } from '@/components/products/product-index';
import { getDictionary, resolveLocale } from '@/lib/i18n/get-dictionary';
import { languageAlternates } from '@/lib/i18n/metadata';
import { getProducts } from '@/lib/products';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return {
    title: meta.pages.products.title,
    description: meta.pages.products.description,
    alternates: languageAlternates(locale, '/products'),
  };
}

export default async function ProductsPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  const copy = dict.products;
  const products = getProducts(dict);

  return (
    <>
      {/* Hero — the catalogue itself, as an index. */}
      <section aria-labelledby="products-title" className="pt-[calc(var(--header-height)+2.5rem)] pb-20 md:pt-[calc(var(--header-height)+3.5rem)] md:pb-28">
        <div className="shell">
          <div className="flex flex-col justify-between gap-6 border-b border-forest/12 pb-10 md:flex-row md:items-end">
            <div>
              <p className="eyebrow fade-in">{copy.hero.eyebrow}</p>
              <h1 id="products-title" className="rise-in mt-5 font-serif text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.015em]">
                {copy.hero.titleLead} <span className="text-gold-ink italic">{copy.hero.titleAccent}</span>
              </h1>
            </div>
            <p className="rise-in max-w-sm text-stone" style={{ '--delay': '250ms' } as React.CSSProperties}>
              {copy.hero.lede}
            </p>
          </div>
          <div className="rise-in mt-10" style={{ '--delay': '350ms' } as React.CSSProperties}>
            <ProductIndex locale={locale} products={products} copy={copy.hero} categories={dict.categories} status={dict.status} />
          </div>
        </div>
      </section>

      {/* Information ledger — filter every detail by status. */}
      <section aria-labelledby="ledger-title" className="defer-render bg-sand-soft py-20 md:py-28">
        <div className="shell">
          <Reveal className="grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="eyebrow">{copy.ledger.eyebrow}</p>
              <h2 id="ledger-title" className="headline mt-6">
                {copy.ledger.titleLead} <span className="text-gold-ink italic">{copy.ledger.titleAccent}</span>
              </h2>
            </div>
            <p className="max-w-md text-stone md:justify-self-end">{copy.ledger.body}</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-12">
            <InformationLedger locale={locale} products={products} copy={copy.ledger} status={dict.status} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="availability-title" className="defer-render bg-forest py-20 text-ivory md:py-24">
        <Reveal className="shell grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="eyebrow eyebrow-light">{copy.availability.eyebrow}</p>
            <h2 id="availability-title" className="headline mt-6">
              {copy.availability.titleLead} <span className="text-sand italic">{copy.availability.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-md text-ivory/72 md:justify-self-end">{copy.availability.body}</p>
        </Reveal>
      </section>
    </>
  );
}
