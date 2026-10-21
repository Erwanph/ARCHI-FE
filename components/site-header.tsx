'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import * as m from 'motion/react-m';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { LanguageSwitcher } from '@/components/language-switcher';
import { localizePath, stripLocale, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { darkHeroRoutes, isActiveRoute, navItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

export type HeaderCopy = {
  nav: Dictionary['nav'];
  common: Dictionary['common'];
  language: Dictionary['language'];
};

export function SiteHeader({ locale, copy }: { locale: Locale; copy: HeaderCopy }) {
  const browserPath = usePathname();
  const pathname = stripLocale(browserPath);
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const href = (path: string) => localizePath(locale, path);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 24);
    // Hide while reading downwards; return as soon as the reader scrolls up.
    if (current > 320 && current > previous + 4) setHidden(true);
    else if (current < previous - 4 || current <= 320) setHidden(false);
  });

  // Reset menu and header visibility when the route changes (render-time
  // adjustment rather than an effect, so there is no extra render pass).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setHidden(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const root = document.documentElement;
    if (menuOpen && !dialog.open) {
      dialog.showModal();
      root.style.overflow = 'hidden';
    } else if (!menuOpen && dialog.open) {
      dialog.close();
    }
    if (!menuOpen) root.style.overflow = '';
  }, [menuOpen]);

  // Lets sticky toolbars and floating widgets react to the header's state.
  useEffect(() => {
    document.documentElement.dataset.headerHidden = String(hidden && !menuOpen);
  }, [hidden, menuOpen]);

  const overDarkHero = darkHeroRoutes.has(pathname) && !scrolled;

  return (
    <m.header
      className={cn(
        // Solid surfaces only: backdrop-filter re-blurs every frame while
        // content scrolls underneath, which is a common source of jank.
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-300',
        overDarkHero ? 'border-b border-transparent text-ivory' : 'border-b border-forest/10 bg-ivory/97 text-forest',
      )}
      animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease }}
    >
      {/* Three zones on desktop, aligned with the page content (.shell):
          wordmark left, navigation truly centred (equal 1fr columns either
          side), actions right. */}
      <div className="shell flex h-(--header-height) items-center gap-3 sm:gap-4 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <Link href={href('/')} aria-label={copy.common.homeLabel} className="shrink-0 xl:justify-self-start">
          <img
            src={overDarkHero ? '/brand/archi-wordmark-light-380.webp' : '/brand/archi-wordmark-green-380.webp'}
            width={380}
            height={96}
            alt="ARCHI"
            className="h-6 w-auto sm:h-7 md:h-8"
            decoding="async"
          />
        </Link>

        <nav aria-label={copy.common.primaryNavigation} className="hidden items-center xl:flex">
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.key}
                href={href(item.href)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative px-3 py-2 text-[0.95rem] whitespace-nowrap transition-opacity',
                  active ? 'font-bold opacity-100' : 'opacity-75 hover:opacity-100',
                )}
              >
                {copy.nav[item.key]}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold transition-transform duration-300',
                    active ? 'scale-100' : 'scale-0 group-hover:scale-100',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2 xl:ms-0 xl:justify-self-end">
          <LanguageSwitcher locale={locale} labels={copy.language} tone={overDarkHero ? 'dark' : 'light'} />
          <Link
            href={href('/contact')}
            className={cn('btn hidden min-h-11 px-5 text-[0.9rem] md:inline-flex', overDarkHero ? 'btn-sand' : 'btn-forest')}
            data-track-event="contact_cta_click"
            data-track-destination="header"
          >
            {copy.common.sendInquiry} <ArrowUpRight size={15} strokeWidth={1.6} className="rtl:-scale-x-100" />
          </Link>
          <button
            ref={triggerRef}
            type="button"
            className={cn(
              'grid size-11 shrink-0 place-items-center rounded-full border transition-colors xl:hidden',
              overDarkHero ? 'border-ivory/30' : 'border-forest/20',
            )}
            aria-label={copy.common.openNavigation}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Reading progress — a single gold hairline driven by a motion value. */}
      <m.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-gold rtl:origin-right"
        style={{ scaleX: scrollYProgress }}
      />

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-label={copy.common.mobileNavigation}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-forest p-0 text-ivory backdrop:bg-forest-deep/60"
        onCancel={(event) => {
          event.preventDefault();
          setMenuOpen(false);
        }}
        onClose={() => {
          setMenuOpen(false);
          requestAnimationFrame(() => triggerRef.current?.focus());
        }}
      >
        {menuOpen && (
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="shell flex h-(--header-height) shrink-0 items-center justify-between">
              <img src="/brand/archi-wordmark-light-380.webp" width={380} height={93} alt="ARCHI" className="h-7 w-auto" decoding="async" />
              <button
                type="button"
                autoFocus
                className="grid size-11 place-items-center rounded-full border border-ivory/30"
                aria-label={copy.common.closeNavigation}
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label={copy.common.mobileNavigation} className="shell mt-4">
              <ul className="m-0 list-none p-0">
                {navItems.map((item, index) => (
                  <m.li
                    key={item.key}
                    className="border-b border-ivory/12"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.06 + index * 0.05 }}
                  >
                    <Link
                      href={href(item.href)}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActiveRoute(pathname, item.href) ? 'page' : undefined}
                      className="flex items-baseline gap-5 py-3.5 font-serif text-[clamp(1.7rem,7vw,2.1rem)] leading-none aria-[current=page]:text-sand"
                    >
                      <span className="numeral w-6 text-gold-soft">{String(index + 1).padStart(2, '0')}</span>
                      {copy.nav[item.key]}
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>

            <m.div
              className="shell mt-8 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <LanguageSwitcher locale={locale} labels={copy.language} variant="list" />
              <Link href={href('/contact')} onClick={() => setMenuOpen(false)} className="btn btn-sand mt-8 w-full">
                {copy.common.startInquiry} <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />
              </Link>
              <p className="mt-5 text-center font-serif text-lg text-sand/80 italic">{copy.common.tagline}</p>
            </m.div>
          </div>
        )}
      </dialog>
    </m.header>
  );
}
