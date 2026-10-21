import 'server-only';
import type { Dictionary } from './dictionaries/en';
import { defaultLocale, isLocale, type Locale } from './config';

// Each language is its own module, so a page only ever loads one dictionary.
const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import('./dictionaries/en'),
  id: () => import('./dictionaries/id'),
  zh: () => import('./dictionaries/zh'),
  ja: () => import('./dictionaries/ja'),
  ko: () => import('./dictionaries/ko'),
  ar: () => import('./dictionaries/ar'),
  hi: () => import('./dictionaries/hi'),
  es: () => import('./dictionaries/es'),
  fr: () => import('./dictionaries/fr'),
  de: () => import('./dictionaries/de'),
  nl: () => import('./dictionaries/nl'),
  pt: () => import('./dictionaries/pt'),
  tr: () => import('./dictionaries/tr'),
  ru: () => import('./dictionaries/ru'),
};

export async function getDictionary(locale: string): Promise<Dictionary> {
  const key = isLocale(locale) ? locale : defaultLocale;
  return (await loaders[key]()).default;
}

/** Resolves the `[locale]` route param, falling back to English. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : defaultLocale;
}

export { format } from './format';
