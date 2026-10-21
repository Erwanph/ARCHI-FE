import { cn } from '@/lib/utils';

/** Nusa's mark: two currents and an island — the ARCHI motif, condensed. */
export function NusaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-6', className)} fill="none">
      <path d="M5 18.5c3.2-3.4 6.4-3.4 9.6 0s6.4 3.4 9.6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 23c2.6-2.6 5.2-2.6 7.8 0s5.2 2.6 7.8 0" stroke="#b6925b" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20.5" cy="10" r="3.2" fill="#b6925b" />
    </svg>
  );
}
