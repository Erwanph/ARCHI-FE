import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { WaveLines } from '@/components/brand-motifs';
import { localizePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { getProducts } from '@/lib/products';

// Forest 40 · Gold 20 · Ivory 30 · Sand 10 — the restrained color system.
const paletteBar = [
  ['bg-forest-raised', '40%'],
  ['bg-gold', '20%'],
  ['bg-ivory', '30%'],
  ['bg-sand', '10%'],
] as const;

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const href = (path: string) => localizePath(locale, path);
  const copy = dict.footer;
  const products = getProducts(dict);

  return (
    <footer className="defer-render relative overflow-hidden bg-forest text-ivory">
      <WaveLines tone="dark" lines={3} className="pointer-events-none absolute -top-6 right-[-10%] h-36 w-[80%] opacity-50" />

      <div className="shell relative pt-24 pb-28 md:pt-32 md:pb-10">
        <div className="grid gap-12 border-b border-ivory/12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.9fr]">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <img
              src="/brand/archi-lockup-light-700.webp"
              width={700}
              height={228}
              loading="lazy"
              decoding="async"
              alt={copy.taglineLong}
              className="w-56"
            />
            <p className="mt-7 text-[0.95rem] leading-relaxed text-ivory/72">{copy.blurb}</p>
          </div>

          <FooterColumn title={copy.portfolio}>
            {products.map((product) => (
              <FooterLink key={product.slug} href={href(`/products/${product.slug}`)}>
                {product.shortName}
              </FooterLink>
            ))}
            <FooterLink href={href('/products')}>{copy.allCategories}</FooterLink>
          </FooterColumn>

          <FooterColumn title={copy.company}>
            <FooterLink href={href('/origins')}>{copy.originsLink}</FooterLink>
            <FooterLink href={href('/sourcing')}>{copy.sourcingLink}</FooterLink>
            <FooterLink href={href('/about')}>{copy.profileLink}</FooterLink>
            <FooterLink href={href('/privacy')}>{copy.privacyLink}</FooterLink>
          </FooterColumn>

          <FooterColumn title={copy.beginConversation}>
            <FooterLink href={href('/contact?type=buyer')}>{copy.buyerInquiry}</FooterLink>
            <FooterLink href={href('/contact?type=supplier')}>{copy.supplierIntroduction}</FooterLink>
            <FooterLink href={href('/contact?type=general')}>{copy.strategicPartnership}</FooterLink>
            <li className="mt-4">
              <Link
                href={href('/contact')}
                className="btn btn-sand w-fit"
                data-track-event="contact_cta_click"
                data-track-destination="footer"
              >
                {dict.common.sendInquiry} <ArrowUpRight size={15} strokeWidth={1.6} className="rtl:-scale-x-100" />
              </Link>
            </li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-xl text-sand italic">{copy.taglineLong}</p>
          <div className="flex items-center gap-6 text-sm text-ivory/60">
            <span>© {new Date().getFullYear()} ARCHI</span>
            <span aria-hidden="true">/</span>
            <span>{copy.location}</span>
          </div>
        </div>

        <div className="mt-8 flex h-1.5 overflow-hidden rounded-full" aria-hidden="true">
          {paletteBar.map(([color, width]) => (
            <span key={color} className={color} style={{ width }} />
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow eyebrow-light">{title}</p>
      <ul className="mt-5 flex list-none flex-col gap-1 p-0">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-9 items-center text-[0.95rem] text-ivory/78 transition-colors hover:text-ivory">
        {children}
      </Link>
    </li>
  );
}
