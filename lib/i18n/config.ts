/*
 * Supported languages. English is served without a prefix (/products);
 * every other language lives under its code (/id/products, /ja/products).
 * `country` picks the flag shown in the language menu.
 */
export const locales = [
  'en',
  'id',
  'zh',
  'ja',
  'ko',
  'ar',
  'hi',
  'es',
  'fr',
  'de',
  'nl',
  'pt',
  'tr',
  'ru',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const LOCALE_COOKIE = 'NEXT_LOCALE';

type LocaleMeta = {
  /** The language's own name, shown in the menu. */
  label: string;
  /** English name, used for screen-reader context and docs. */
  english: string;
  /** ISO 3166 country for the flag. */
  country: string;
  dir: 'ltr' | 'rtl';
  /** BCP 47 tag for <html lang> and hreflang. */
  htmlLang: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { label: 'English', english: 'English', country: 'GB', dir: 'ltr', htmlLang: 'en' },
  id: { label: 'Bahasa Indonesia', english: 'Indonesian', country: 'ID', dir: 'ltr', htmlLang: 'id' },
  zh: { label: '简体中文', english: 'Chinese (Simplified)', country: 'CN', dir: 'ltr', htmlLang: 'zh-Hans' },
  ja: { label: '日本語', english: 'Japanese', country: 'JP', dir: 'ltr', htmlLang: 'ja' },
  ko: { label: '한국어', english: 'Korean', country: 'KR', dir: 'ltr', htmlLang: 'ko' },
  ar: { label: 'العربية', english: 'Arabic', country: 'SA', dir: 'rtl', htmlLang: 'ar' },
  hi: { label: 'हिन्दी', english: 'Hindi', country: 'IN', dir: 'ltr', htmlLang: 'hi' },
  es: { label: 'Español', english: 'Spanish', country: 'ES', dir: 'ltr', htmlLang: 'es' },
  fr: { label: 'Français', english: 'French', country: 'FR', dir: 'ltr', htmlLang: 'fr' },
  de: { label: 'Deutsch', english: 'German', country: 'DE', dir: 'ltr', htmlLang: 'de' },
  nl: { label: 'Nederlands', english: 'Dutch', country: 'NL', dir: 'ltr', htmlLang: 'nl' },
  pt: { label: 'Português', english: 'Portuguese', country: 'BR', dir: 'ltr', htmlLang: 'pt-BR' },
  tr: { label: 'Türkçe', english: 'Turkish', country: 'TR', dir: 'ltr', htmlLang: 'tr' },
  ru: { label: 'Русский', english: 'Russian', country: 'RU', dir: 'ltr', htmlLang: 'ru' },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Builds a link for a locale: `/products` (en) or `/id/products`. */
export function localizePath(locale: Locale, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Strips a locale prefix from a browser pathname: `/id/products` → `/products`. */
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split('/');
  if (isLocale(first)) return `/${rest.join('/')}`.replace(/\/$/, '') || '/';
  return pathname || '/';
}
