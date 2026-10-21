import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_COOKIE, defaultLocale, isLocale } from '@/lib/i18n/config';

/*
 * Locale routing:
 *   /products            → rendered as /en/products (URL unchanged)
 *   /en/products         → 308 to /products (one canonical English URL)
 *   /id/products         → served as is
 * A visitor who picked a language keeps it: the cookie redirects unprefixed
 * URLs to their language. Search engines (no cookie) always get English.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const [, first] = pathname.split('/');

  if (first === defaultLocale) {
    const target = pathname.slice(defaultLocale.length + 1) || '/';
    return NextResponse.redirect(new URL(`${target}${search}`, request.url), 308);
  }

  if (isLocale(first)) return NextResponse.next();

  const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(preferred) && preferred !== defaultLocale) {
    const target = pathname === '/' ? `/${preferred}` : `/${preferred}${pathname}`;
    return NextResponse.redirect(new URL(`${target}${search}`, request.url), 307);
  }

  const rewritten = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(new URL(`${rewritten}${search}`, request.url));
}

export const config = {
  // Everything except API routes, framework assets and files with extensions.
  matcher: ['/((?!api|_next|_vinext|.*\\..*).*)'],
};
