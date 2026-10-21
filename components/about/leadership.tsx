import { GraduationCap, Mail } from 'lucide-react';
import { Archipelago, WaveLines } from '@/components/brand-motifs';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ResponsiveImage } from '@/components/responsive-image';
import type { TeamMember } from '@/lib/business-profile';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { format } from '@/lib/i18n/format';

/**
 * Founder cards. Only the fields set in lib/business-profile.ts are shown —
 * until a photo exists, an initial on a forest panel stands in for it.
 */
export function Leadership({ team, copy }: { team: TeamMember[]; copy: Dictionary['about']['leadership'] }) {
  return (
    <RevealGroup className="grid gap-6 lg:grid-cols-2">
      {team.map((member, index) => (
        <RevealItem key={member.name} as="article">
          <div className="group grid h-full overflow-hidden rounded-3xl border border-forest/10 bg-white sm:grid-cols-[0.85fr_1.15fr] lg:grid-cols-1 xl:grid-cols-[0.85fr_1.15fr]">
            <div className="relative aspect-[4/5] overflow-hidden bg-forest sm:aspect-auto sm:min-h-80 lg:aspect-[16/10] lg:min-h-0 xl:aspect-auto xl:min-h-80">
              {member.photo ? (
                <ResponsiveImage
                  src={member.photo}
                  alt={member.name}
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-(--ease-archi) group-hover:scale-105"
                />
              ) : (
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <Archipelago fill="#1e4635" className="absolute top-6 left-1/2 w-[160%] max-w-none -translate-x-1/2" />
                  <span className="relative font-serif text-[clamp(6rem,14vw,9rem)] leading-none text-sand">
                    {member.name.charAt(0)}
                  </span>
                  <WaveLines tone="dark" lines={3} className="absolute inset-x-0 bottom-6 h-20 w-full opacity-60" />
                </div>
              )}
              <span className="numeral absolute top-5 left-5 rounded-full bg-ivory/95 px-3 py-1.5 text-forest rtl:right-5 rtl:left-auto">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="flex flex-col justify-end p-7 md:p-9">
              <p className="eyebrow">{copy.roles[member.role]}</p>
              <h3 className="mt-4 font-serif text-[clamp(2.4rem,4vw,3.2rem)] leading-none">{member.name}</h3>
              {member.biography && <p className="mt-5 text-stone">{member.biography}</p>}
              {(member.education || member.email) && (
                <dl className="mt-6 grid gap-5 border-t border-forest/10 pt-6">
                  {member.education && (
                    <div className="flex gap-3.5">
                      <GraduationCap size={20} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0 text-gold-ink" />
                      <div className="min-w-0">
                        <dt className="text-sm text-gold-ink">{copy.educationLabel}</dt>
                        <dd className="m-0 mt-1 font-serif text-xl leading-tight">{member.education}</dd>
                        <dd className="m-0 mt-1 text-sm text-stone">{copy.schoolNote}</dd>
                      </div>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex gap-3.5">
                      <Mail size={20} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0 text-gold-ink" />
                      <div className="min-w-0">
                        <dt className="text-sm text-gold-ink">{copy.emailLabel}</dt>
                        <dd className="m-0 mt-1">
                          <a
                            href={`mailto:${member.email}`}
                            className="break-all text-forest underline decoration-gold/60 underline-offset-4 transition-colors hover:decoration-forest"
                            data-track-event="founder_email_click"
                          >
                            {member.email}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={format(copy.linkedin, { name: member.name })}
                  className="mt-6 grid size-11 place-items-center rounded-full border border-forest/20 transition-colors hover:bg-forest hover:text-ivory"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.13v5.42h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-4v-11Z" />
                  </svg>
                </a>
              )}
              <span aria-hidden="true" className="mt-8 block h-px w-16 origin-left bg-gold transition-transform duration-700 ease-(--ease-archi) group-hover:scale-x-[1.75] rtl:origin-right" />
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
