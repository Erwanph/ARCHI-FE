import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------------------
   Brand motifs from the ARCHI visual language: thin layered waves for the
   currents between islands, and organic island forms. Both are decorative
   and always aria-hidden; the archipelago is simplified, not a formal map.
--------------------------------------------------------------------------- */

type WaveTone = 'light' | 'dark';

const waveStrokes: Record<WaveTone, [string, string]> = {
  light: ['#163829', '#b6925b'],
  dark: ['#b6925b', 'rgba(251, 249, 243, 0.55)'],
};

function wavePath(y: number, amplitude: number) {
  const a = amplitude;
  return `M-40 ${y} C 160 ${y - a} 320 ${y - a * 1.15} 480 ${y - a * 0.35} S 820 ${y + a} 980 ${y + a * 0.55} S 1180 ${y - a * 0.3} 1280 ${y - a * 0.1}`;
}

export function WaveLines({
  className,
  lines = 4,
  tone = 'light',
  gap = 14,
  amplitude = 34,
  animate = false,
  strokeWidth = 1,
}: {
  className?: string;
  lines?: number;
  tone?: WaveTone;
  gap?: number;
  amplitude?: number;
  animate?: boolean;
  strokeWidth?: number;
}) {
  const [primary, secondary] = waveStrokes[tone];
  const height = 80 + gap * lines + amplitude * 2;
  return (
    <svg
      aria-hidden="true"
      className={cn('wave-lines', animate && 'draw-in', className)}
      viewBox={`0 0 1240 ${height}`}
      preserveAspectRatio="none"
      fill="none"
    >
      {Array.from({ length: lines }, (_, index) => (
        <path
          key={index}
          d={wavePath(40 + amplitude + index * gap, amplitude)}
          pathLength={1}
          stroke={index % 2 === 0 ? primary : secondary}
          strokeWidth={strokeWidth}
          style={{ '--i': index } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/* Deterministic organic blob: Catmull-Rom through jittered polar points. */
function blobPath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  seed: number,
  points = 8,
) {
  const random = (n: number) => {
    const x = Math.sin(seed * 9301 + n * 49297) * 233280;
    return x - Math.floor(x);
  };
  const vertices = Array.from({ length: points }, (_, i) => {
    const angle = (i / points) * Math.PI * 2;
    const wobble = 0.78 + random(i) * 0.36;
    return [cx + Math.cos(angle) * rx * wobble, cy + Math.sin(angle) * ry * wobble];
  });
  const at = (i: number) => vertices[(i + points) % points];
  let d = `M${at(0)[0].toFixed(1)} ${at(0)[1].toFixed(1)}`;
  for (let i = 0; i < points; i += 1) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d}Z`;
}

type Island = [cx: number, cy: number, rx: number, ry: number, rotate: number];

// A loose, west-to-east impression of the archipelago in a 1000×360 frame.
const islands: Island[] = [
  [168, 148, 104, 28, 38],
  [372, 272, 98, 15, 5],
  [492, 286, 14, 8, 0],
  [522, 289, 12, 7, 0],
  [560, 292, 20, 7, 4],
  [604, 296, 16, 6, 0],
  [408, 138, 78, 66, 0],
  [575, 150, 15, 52, 12],
  [606, 118, 38, 11, -14],
  [612, 184, 34, 9, 22],
  [690, 152, 12, 9, 0],
  [706, 204, 14, 8, 0],
  [664, 230, 9, 7, 0],
  [858, 196, 112, 44, 8],
];

const islandDots: Array<[number, number, number]> = [
  [262, 96, 3],
  [300, 210, 2.5],
  [520, 216, 3],
  [646, 112, 2.5],
  [742, 168, 3],
  [760, 250, 2.5],
  [456, 232, 2],
];

export function Archipelago({
  className,
  fill = '#dcccb1',
  float = false,
  ...svgProps
}: {
  className?: string;
  fill?: string;
  float?: boolean;
} & Omit<React.SVGProps<SVGSVGElement>, 'fill'>) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 1000 360"
      fill={fill}
      {...svgProps}
    >
      {islands.map(([cx, cy, rx, ry, rotate], index) => (
        <g
          key={index}
          transform={rotate ? `rotate(${rotate} ${cx} ${cy})` : undefined}
        >
          <path
            d={blobPath(cx, cy, rx, ry, index + 3, rx > 40 ? 10 : 7)}
            style={
              float
                ? {
                    animation: `float-island ${6 + (index % 4)}s ease-in-out ${index * -0.7}s infinite`,
                  }
                : undefined
            }
          />
        </g>
      ))}
      {islandDots.map(([cx, cy, r], index) => (
        <circle key={index} cx={cx} cy={cy} r={r} />
      ))}
    </svg>
  );
}

/** Splits a heading into words that rise in sequence — CSS only, no JS. */
export function RisingWords({
  text,
  offset = 0,
  className,
}: {
  text: string;
  offset?: number;
  className?: string;
}) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            className={cn('word-rise', className)}
            style={{ '--i': index + offset } as CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}
