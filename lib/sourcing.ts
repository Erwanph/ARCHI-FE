import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { format } from '@/lib/i18n/format';

export const phaseIds = ['discover', 'structure', 'connect', 'coordinate'] as const;

export type PhaseId = (typeof phaseIds)[number];

export function getPhases(dict: Dictionary) {
  return phaseIds.map((id) => ({ id, ...dict.sourcing.phases[id] }));
}

export type Phase = ReturnType<typeof getPhases>[number];

/** Stage numbers run continuously across phases (01–11). */
export function stageOffsets(phases: Phase[]) {
  return phases.reduce<number[]>(
    (offsets, _phase, index) => [
      ...offsets,
      index === 0 ? 0 : offsets[index - 1] + phases[index - 1].stages.length,
    ],
    [],
  );
}

export function stageRange(phases: Phase[], index: number, dict: Dictionary) {
  const offsets = stageOffsets(phases);
  const start = offsets[index] + 1;
  const end = offsets[index] + phases[index].stages.length;
  const pad = (n: number) => String(n).padStart(2, '0');
  return start === end
    ? format(dict.sourcing.stage, { number: pad(start) })
    : format(dict.sourcing.stages, { start: pad(start), end: pad(end) });
}
