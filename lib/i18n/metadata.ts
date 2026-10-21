import type { Metadata } from 'next';
import { defaultLocale, localeMeta, localizePath, locales, type Locale } from './config';

/** Canonical URL plus hreflang alternates for every language. */
export function languageAlternates(locale: Locale, path: string): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const option of locales) {
    languages[localeMeta[option].htmlLang] = localizePath(option, path);
  }
  languages['x-default'] = localizePath(defaultLocale, path);
  return { canonical: localizePath(locale, path), languages };
}
