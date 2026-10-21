import { HomeHero } from '@/components/home/home-hero';
import {
  ApproachSection,
  AudienceSection,
  BrandMarquee,
  ClosingCta,
  InformationSection,
  PortfolioSection,
  PremiseSection,
} from '@/components/home/home-sections';
import { getDictionary, resolveLocale } from '@/lib/i18n/get-dictionary';

// Keep the root route explicit and statically addressable in production builds.
export const dynamic = 'force-static';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  return (
    <>
      <HomeHero locale={locale} dict={dict} />
      <BrandMarquee dict={dict} />
      <PremiseSection locale={locale} dict={dict} />
      <PortfolioSection locale={locale} dict={dict} />
      <ApproachSection locale={locale} dict={dict} />
      <AudienceSection locale={locale} dict={dict} />
      <InformationSection dict={dict} />
      <ClosingCta locale={locale} dict={dict} />
    </>
  );
}
