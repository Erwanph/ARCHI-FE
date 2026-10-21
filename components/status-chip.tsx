import { CircleCheck, CircleDashed, Clock3, MessageSquareText } from 'lucide-react';
import type { StatusKey } from '@/lib/products';
import { cn } from '@/lib/utils';

// Status is always carried by icon + label, never by color alone.
const statusStyles: Record<StatusKey, { icon: typeof CircleCheck; className: string }> = {
  verified: { icon: CircleCheck, className: 'bg-forest text-ivory border-forest' },
  onRequest: { icon: MessageSquareText, className: 'bg-sand/60 text-forest border-sand' },
  pending: { icon: Clock3, className: 'bg-white text-forest border-gold/50' },
  unpublished: { icon: CircleDashed, className: 'bg-transparent text-stone border-forest/20' },
};

export function StatusChip({
  status,
  label,
  className,
}: {
  status: StatusKey;
  label: string;
  className?: string;
}) {
  const { icon: Icon, className: tone } = statusStyles[status];
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.8rem] leading-tight font-bold',
        tone,
        className,
      )}
    >
      <Icon aria-hidden="true" size={13} strokeWidth={2} className="shrink-0" />
      {label}
    </span>
  );
}
