import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react';
import { TrackView } from '@/components/analytics-runtime';
import { InquiryForm } from '@/components/inquiry-form';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ResponsiveImage } from '@/components/responsive-image';
import { StatusChip } from '@/components/status-chip';
import { localizePath, locales } from '@/lib/i18n/config';
import { getDictionary, resolveLocale } from '@/lib/i18n/get-dictionary';
import { languageAlternates } from '@/lib/i18n/metadata';
import { getProduct, getProducts, productSlugs } from '@/lib/products';
import { SITE_NAME, SITE_ORIGIN } from '@/lib/site';
import { inquiryFormCopy } from '@/lib/i18n/form-copy';

type ProductPageProps = { params: Promise<{ locale: string; slug: string }> };

const retiredProductSlugs = new Set(['indonesian-coffee', 'spirulina', 'other-indonesian-origin-products']);

export function generateStaticParams() {
  return locales.flatMap((locale) => productSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  const product = getProduct(slug, dict);
  if (!product) return { title: dict.meta.pages.notFound.title };
  const imageUrl = `${SITE_ORIGIN}${product.image}`;
  return {
    title: product.displayName,
    description: product.description,
    alternates: languageAlternates(locale, `/products/${product.slug}`),
    openGraph: {
      title: product.displayName,
      description: product.description,
      url: localizePath(locale, `/products/${product.slug}`),
      type: 'website',
      images: [{ url: imageUrl, width: product.imageWidth, height: product.imageHeight, alt: product.imageAlt }],
    },
    twitter: { card: 'summary_large_image', title: product.displayName, description: product.description, images: [imageUrl] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  const copy = dict.productDetail;
  const product = getProduct(slug, dict);
  if (!product && retiredProductSlugs.has(slug)) permanentRedirect(localizePath(locale, '/products'));
  if (!product) notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.displayName,
    description: product.description,
    image: [`${SITE_ORIGIN}${product.image}`],
    category: product.categoryLabel,
    countryOfOrigin: { '@type': 'Country', name: 'Indonesia' },
    brand: { '@type': 'Brand', name: SITE_NAME },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy.products, item: `${SITE_ORIGIN}${localizePath(locale, '/products')}` },
      { '@type': 'ListItem', position: 2, name: product.displayName, item: `${SITE_ORIGIN}${localizePath(locale, `/products/${product.slug}`)}` },
    ],
  };

  const sheet = [...product.information, ...product.documentation];
  const verifiedDetails = Object.entries(product.verifiedDetails ?? {});
  const verifiedCount = sheet.filter((item) => item.status === 'verified').length + verifiedDetails.length;
  const totalCount = sheet.length + verifiedDetails.length;
  const related = getProducts(dict).filter((item) => item.slug !== product.slug);

  return (
    <>
      <TrackView event="product_page_view" product={product.slug} />

      {/* Product hero — split data-sheet layout. */}
      <section aria-labelledby="product-title" className="pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="shell">
          <nav aria-label={copy.breadcrumb} className="fade-in">
            <ol className="flex list-none items-center gap-2 p-0 text-sm text-stone">
              <li>
                <Link href={localizePath(locale, '/products')} className="hover:text-forest">
                  {copy.products}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} strokeWidth={1.8} className="rtl:-scale-x-100" />
              </li>
              <li aria-current="page" className="font-bold text-forest">
                {product.shortName}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div className="min-w-0 lg:sticky lg:top-28">
              <p className="eyebrow fade-in">{product.categoryLabel}</p>
              <h1 id="product-title" className="rise-in mt-5 font-serif text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[0.95] tracking-[-0.02em]">
                {product.displayName}
              </h1>
              <p className="rise-in mt-6 text-sm font-bold text-gold-ink" style={{ '--delay': '280ms' } as React.CSSProperties}>
                {product.origin}
              </p>
              <p className="lede rise-in mt-5 max-w-xl text-stone" style={{ '--delay': '340ms' } as React.CSSProperties}>
                {product.description}
              </p>

              <div className="rise-in mt-8 rounded-2xl border border-forest/10 bg-white p-5" style={{ '--delay': '420ms' } as React.CSSProperties}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-bold">{copy.confirmed}</p>
                  <p className="font-serif text-2xl">
                    {verifiedCount}
                    <span className="text-base text-stone"> / {totalCount}</span>
                  </p>
                </div>
                <progress
                  className="mt-3 block h-1.5 w-full appearance-none overflow-hidden rounded-full bg-sand-soft [&::-moz-progress-bar]:bg-forest [&::-webkit-progress-bar]:bg-sand-soft [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-forest"
                  aria-label={copy.progressLabel}
                  max={Math.max(totalCount, 1)}
                  value={verifiedCount}
                />
                <p className="mt-3 text-sm text-stone">{product.verificationSummary}</p>
              </div>

              <div className="rise-in mt-8 flex flex-wrap gap-3" style={{ '--delay': '500ms' } as React.CSSProperties}>
                <a className="btn btn-forest" href="#product-inquiry" data-track-event="product_inquiry_click" data-track-product={product.slug}>
                  {copy.inquireCta} <ArrowDown size={16} strokeWidth={1.6} />
                </a>
                <a className="btn btn-outline" href="#data-sheet">
                  {copy.sheetCta}
                </a>
              </div>
            </div>

            <div className="clip-in relative aspect-[4/5] overflow-hidden rounded-[14px] sm:aspect-[5/4] lg:aspect-[4/5]">
              <ResponsiveImage
                src={product.image}
                alt={product.imageAlt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="h-full w-full object-cover"
              />
              <p className="media-credit absolute right-4 bottom-4 left-4 text-end text-ivory/85 [text-shadow:0_1px_8px_rgb(0_0_0/0.4)]">
                {product.imageCredit}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data sheet — every field carries its status. */}
      <section id="data-sheet" aria-labelledby="sheet-title" className="bg-sand-soft py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{copy.sheet.eyebrow}</p>
            <h2 id="sheet-title" className="headline mt-6">
              {copy.sheet.titleLead} <span className="text-gold-ink italic">{copy.sheet.titleAccent}</span>
            </h2>
            <p className="mt-6 max-w-md text-stone">{copy.sheet.body}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-forest/10 bg-white p-6 md:p-10">
              <p className="border-b border-forest/12 pb-5 font-serif text-[2rem] leading-none">{product.displayName}</p>
              <dl className="m-0 divide-y divide-forest/10">
                {sheet.map((item) => (
                  <div key={item.label} className="grid gap-3 py-5 md:grid-cols-[0.9fr_1.1fr]">
                    <dt className="font-bold">{item.label}</dt>
                    <dd className="m-0 flex flex-col gap-2">
                      <StatusChip status={item.status} label={dict.status[item.status].label} />
                      <span className="text-sm text-stone">{item.note}</span>
                    </dd>
                  </div>
                ))}
                {verifiedDetails.map(([label, value]) => (
                  <div key={label} className="grid gap-3 py-5 md:grid-cols-[0.9fr_1.1fr]">
                    <dt className="font-bold capitalize">{label.replace(/([A-Z])/g, ' $1').toLowerCase()}</dt>
                    <dd className="m-0 flex flex-col gap-2">
                      <StatusChip status="verified" label={dict.status.verified.label} />
                      <span className="text-sm">{value}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What happens after an inquiry + form. */}
      <section id="product-inquiry" aria-labelledby="inquiry-title" className="py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">{copy.inquiry.eyebrow}</p>
            <h2 id="inquiry-title" className="headline mt-6">
              {copy.inquiry.title}
            </h2>
            <p className="mt-6 max-w-md text-stone">{copy.inquiry.body}</p>
            <ol className="mt-10 list-none p-0">
              {copy.inquiry.steps.map((step, index) => (
                <li key={step.title} className="flex gap-5 border-t border-forest/10 py-5">
                  <span className="numeral grid size-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold-ink">{index + 1}</span>
                  <div>
                    <p className="font-serif text-[1.5rem] leading-none">{step.title}</p>
                    <p className="mt-2 text-sm text-stone">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.08} className="min-w-0">
            <InquiryForm locale={locale} copy={inquiryFormCopy(dict)} defaultProduct={product.name} />
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="defer-render border-t border-forest/10 py-20 md:py-24">
          <div className="shell">
            <Reveal className="flex items-end justify-between gap-6">
              <h2 id="related-title" className="font-serif text-[clamp(2rem,4vw,2.4rem)] leading-none">
                {copy.related}
              </h2>
              <Link href={localizePath(locale, '/products')} className="link-arrow hidden sm:inline-flex">
                {dict.common.allProducts} <ArrowUpRight size={15} strokeWidth={1.6} className="rtl:-scale-x-100" />
              </Link>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <RevealItem key={item.slug}>
                  <Link
                    href={localizePath(locale, `/products/${item.slug}`)}
                    className="group grid grid-cols-[96px_1fr] items-center gap-5 overflow-hidden rounded-2xl border border-forest/10 bg-white p-3 pe-6 transition-colors hover:border-forest/30 sm:grid-cols-[160px_1fr] sm:gap-6"
                  >
                    <span className="block aspect-square overflow-hidden rounded-xl">
                      <ResponsiveImage src={item.image} alt="" sizes="160px" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow">{item.categoryLabel}</span>
                      <span className="mt-2 block font-serif text-[clamp(1.5rem,3vw,1.8rem)] leading-tight">{item.displayName}</span>
                      <span className="link-arrow mt-3">
                        {dict.common.viewDataSheet} <ArrowUpRight size={15} strokeWidth={1.6} className="rtl:-scale-x-100" />
                      </span>
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productJsonLd, breadcrumbJsonLd]).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
