import type { MetadataRoute } from 'next';
import { localeMeta, localizePath, locales } from '@/lib/i18n/config';
import { productSlugs } from '@/lib/products';
import { SITE_ORIGIN } from '@/lib/site';

const pages: Array<[path: string, priority: number]> = [
  ['/', 1],
  ['/products', 0.9],
  ['/origins', 0.7],
  ['/sourcing', 0.7],
  ['/about', 0.7],
  ['/contact', 0.7],
  ['/privacy', 0.3],
  ...productSlugs.map((slug): [string, number] => [`/products/${slug}`, 0.8]),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(([path, priority]) =>
    locales.map((locale) => ({
      url: `${SITE_ORIGIN}${localizePath(locale, path)}`,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((option) => [localeMeta[option].htmlLang, `${SITE_ORIGIN}${localizePath(option, path)}`]),
        ),
      },
    })),
  );
}
