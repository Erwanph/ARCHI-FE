import type { Dictionary } from '@/lib/i18n/dictionaries/en';

export const navItems: Array<{ key: keyof Dictionary['nav']; href: string }> = [
  { key: 'home', href: '/' },
  { key: 'origins', href: '/origins' },
  { key: 'products', href: '/products' },
  { key: 'sourcing', href: '/sourcing' },
  { key: 'company', href: '/about' },
  { key: 'contact', href: '/contact' },
];

// Routes whose first screen is dark, so the header starts in its light-on-dark
// treatment and switches to the solid ivory bar once the page scrolls.
// Paths are locale-free (see stripLocale).
export const darkHeroRoutes = new Set(['/about']);

export function isActiveRoute(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}
