import { ArrowUpRight } from 'lucide-react';
import { whatsappHref } from '@/lib/business-profile';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { cn } from '@/lib/utils';

/**
 * The vertical WhatsApp tab on the page edge. It renders only once a number is
 * set in lib/business-profile.ts — in development it shows as a dashed
 * preview so the design can be reviewed before the number exists.
 */
export function WhatsAppTab({ copy }: { copy: Dictionary['whatsapp'] }) {
  const href = whatsappHref(copy.prefill);
  const preview = !href && process.env.NODE_ENV !== 'production';
  if (!href && !preview) return null;

  return (
    <a
      href={href ?? '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      aria-label={copy.ariaLabel}
      title={preview ? 'Preview — set `whatsapp` in lib/business-profile.ts to activate' : undefined}
      data-track-event="whatsapp_click"
      className={cn(
        'group fixed top-[58%] right-0 z-40 flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-xl bg-gold px-1.5 py-3.5 text-forest-deep shadow-[0_18px_40px_-18px_rgb(15_42_30/0.6)] transition-[padding,background-color] duration-300 hover:bg-sand hover:pr-3 md:top-1/2 md:gap-3 md:rounded-l-2xl md:px-3 md:py-6 md:hover:pr-4',
        'rtl:right-auto rtl:left-0 rtl:rounded-l-none rtl:rounded-r-2xl rtl:hover:pr-2.5 rtl:hover:pl-4',
        preview && 'outline-2 outline-offset-2 outline-forest/40 outline-dashed',
      )}
    >
      <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-[18px]" />
      <span className="text-xs font-bold tracking-[0.06em] [writing-mode:vertical-rl] md:text-sm">{copy.label}</span>
    </a>
  );
}
