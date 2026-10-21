import type { Metadata } from 'next';
import Link from 'next/link';
import { localizePath } from '@/lib/i18n/config';
import { getDictionary, resolveLocale } from '@/lib/i18n/get-dictionary';
import { languageAlternates } from '@/lib/i18n/metadata';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return {
    title: meta.pages.privacy.title,
    description: meta.pages.privacy.description,
    alternates: languageAlternates(locale, '/privacy'),
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { privacy: copy } = await getDictionary(locale);

  return (
    <article className="shell pt-32 pb-24 md:pt-44 md:pb-32">
      <header className="max-w-3xl">
        <p className="eyebrow fade-in">{copy.eyebrow}</p>
        <h1 className="rise-in mt-6 font-serif text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.02] tracking-[-0.02em]">{copy.title}</h1>
        <p className="mt-6 text-sm font-bold text-stone">{copy.updated}</p>
      </header>

      <div className="mt-16 grid gap-12 lg:grid-cols-[16rem_1fr]">
        <nav aria-label={copy.onThisPage} className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{copy.onThisPage}</p>
          <ol className="mt-4 list-none space-y-1 border-s border-forest/12 p-0">
            {copy.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="-ms-px block border-s border-transparent py-1.5 ps-4 text-stone transition-colors hover:border-gold hover:text-forest"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-2xl divide-y divide-forest/10">
          {copy.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="py-8 first:pt-0">
              <p className="numeral text-gold-ink">{String(index + 1).padStart(2, '0')}</p>
              <h2 className="mt-3 font-serif text-[2rem] leading-tight">{section.title}</h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-stone">{section.body}</p>
              {section.id === 'contact' && (
                <Link href={localizePath(locale, '/contact?type=general')} className="link-arrow mt-4">
                  {copy.contactLink}
                </Link>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
