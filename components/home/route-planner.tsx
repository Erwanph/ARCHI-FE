'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import * as m from 'motion/react-m';
import { localizePath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import routeMap from '@/lib/route-map.json';
import { cn } from '@/lib/utils';

/*
 * Route preview on a dotted world map centred on the archipelago. The map is
 * precomputed (scripts/generate-route-map.mjs) into two SVG paths, so the
 * browser draws ~3,000 dots with two DOM nodes and no map library.
 */

type DestinationId = keyof Dictionary['home']['planner']['destinations'];
type ProductId = keyof Dictionary['home']['planner']['products'];

const productValues: Record<ProductId, string> = {
  patchouli: 'Indonesian Patchouli Oil',
  kratom: 'Indonesian Kratom',
  other: 'Other / not listed',
};

const destinationOrder: DestinationId[] = ['europe', 'middle-east', 'africa', 'south-asia', 'east-asia', 'americas', 'oceania'];

// Which side of the marker its label sits on, to keep labels from colliding.
const labelSide: Record<DestinationId, 'left' | 'right' | 'below'> = {
  'east-asia': 'right',
  'south-asia': 'below',
  'middle-east': 'left',
  africa: 'left',
  europe: 'left',
  americas: 'left',
  oceania: 'right',
};

const { width: W, height: H, pins } = routeMap;
const origin = pins.origin;

function lane(id: DestinationId) {
  const target = pins[id];
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const distance = Math.hypot(dx, dy) || 1;
  // Bow each lane away from the straight line, like a great-circle arc.
  const lift = Math.min(18, distance * 0.35);
  const nx = -dy / distance;
  const ny = dx / distance;
  const direction = ny > 0 ? -1 : 1;
  const cx = (origin.x + target.x) / 2 + nx * lift * direction;
  const cy = (origin.y + target.y) / 2 + ny * lift * direction;
  return `M${origin.x} ${origin.y} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${target.x} ${target.y}`;
}

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

export function RoutePlanner({ locale, copy }: { locale: Locale; copy: Dictionary['home']['planner'] }) {
  const [product, setProduct] = useState<ProductId>('patchouli');
  const [destination, setDestination] = useState<DestinationId>('europe');
  const [touched, setTouched] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Tour the lanes until the visitor takes over. Pauses off screen, on hover,
  // in background tabs, and never runs for reduced-motion users.
  useEffect(() => {
    if (touched || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const panel = panelRef.current;
    if (!panel) return;
    let visible = true;
    let hovered = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(panel);
    const enter = () => (hovered = true);
    const leave = () => (hovered = false);
    panel.addEventListener('pointerenter', enter);
    panel.addEventListener('pointerleave', leave);
    const timer = window.setInterval(() => {
      if (!visible || hovered || document.hidden) return;
      setDestination((current) => destinationOrder[(destinationOrder.indexOf(current) + 1) % destinationOrder.length]);
    }, 3600);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      panel.removeEventListener('pointerenter', enter);
      panel.removeEventListener('pointerleave', leave);
    };
  }, [touched]);

  const choose = (id: DestinationId) => {
    setTouched(true);
    setDestination(id);
  };

  const path = lane(destination);
  const destinationLabel = copy.destinations[destination];
  const href = `${localizePath(locale, '/contact')}?type=buyer&product=${encodeURIComponent(productValues[product])}&market=${encodeURIComponent(destinationLabel)}`;

  return (
    <div
      ref={panelRef}
      className="relative overflow-hidden rounded-[28px] bg-forest-deep text-ivory shadow-[0_40px_90px_-50px_rgb(15_42_30/0.9)]"
      onFocusCapture={() => setTouched(true)}
    >
      <div className="flex items-center justify-between gap-4 px-5 pt-5 md:px-7">
        <p className="text-sm text-ivory/65">{copy.title}</p>
        <p className="truncate font-serif text-lg text-sand" aria-live="polite">
          {copy.from} <span className="text-gold-soft rtl:inline-block rtl:-scale-x-100">→</span> {destinationLabel}
        </p>
      </div>

      {/* Map — always laid out left-to-right; it is geography, not text. */}
      <div dir="ltr" className="relative mx-auto mt-2 w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d={routeMap.land} stroke="rgb(251 249 243 / 0.2)" strokeWidth={0.42} strokeLinecap="round" fill="none" />
          <path d={routeMap.archipelago} stroke="#c9a874" strokeWidth={0.55} strokeLinecap="round" fill="none" />

          {destinationOrder.map((id) => (
            <path
              key={id}
              d={lane(id)}
              fill="none"
              stroke="rgb(251 249 243 / 0.16)"
              strokeWidth={1}
              strokeDasharray="2 5"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Active lane: a soft under-glow, the drawn route, and a vessel dot. */}
          <path d={path} fill="none" stroke="#b6925b" strokeOpacity={0.18} strokeWidth={6} vectorEffect="non-scaling-stroke" />
          <m.path
            key={`${destination}-${product}`}
            d={path}
            fill="none"
            stroke="#c9a874"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <circle key={`vessel-${destination}-${product}`} r={0.85} fill="#fbf9f3">
            <animateMotion dur="1.4s" fill="freeze" path={path} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.22 1 0.36 1" />
          </circle>

          <circle cx={origin.x} cy={origin.y} r={2.4} fill="none" stroke="#c9a874" strokeWidth={0.3} className="origin-pulse" />
          <circle cx={origin.x} cy={origin.y} r={1} fill="#c9a874" />
        </svg>

        {/* Destination markers are real buttons, positioned over the map. */}
        {destinationOrder.map((id) => {
          const pin = pins[id];
          const active = id === destination;
          return (
            <button
              key={id}
              type="button"
              onClick={() => choose(id)}
              aria-label={copy.destinations[id]}
              aria-pressed={active}
              className="group absolute size-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: pct(pin.x, W), top: pct(pin.y, H) }}
            >
              <span
                className={cn(
                  'absolute top-1/2 left-1/2 size-2.5 -translate-1/2 rounded-full border transition-all duration-300',
                  active ? 'scale-125 border-gold-soft bg-gold-soft' : 'border-ivory/70 bg-forest-deep group-hover:border-gold-soft',
                )}
              />
              <span
                className={cn(
                  'pointer-events-none absolute rounded-full px-2 py-0.5 text-[0.7rem] whitespace-nowrap transition-colors duration-300 md:text-xs',
                  labelSide[id] === 'left' && 'top-1/2 right-[70%] -translate-y-1/2',
                  labelSide[id] === 'right' && 'top-1/2 left-[70%] -translate-y-1/2',
                  labelSide[id] === 'below' && 'top-[80%] left-1/2 -translate-x-1/2',
                  active ? 'bg-gold-soft font-bold text-forest-deep' : 'text-ivory/75 max-sm:hidden',
                )}
              >
                {copy.destinations[id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Two numbered questions, then the note and the call to action. The
          wrapper owns the spacing (fieldsets reset their own margins). */}
      <div className="flex flex-col gap-5 border-t border-ivory/10 px-5 pt-5 pb-5 md:px-7 md:pt-6 md:pb-6">
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <Question number={1}>{copy.productQuestion}</Question>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(copy.products) as ProductId[]).map((id) => (
              <Pill
                key={id}
                active={id === product}
                onClick={() => {
                  setTouched(true);
                  setProduct(id);
                }}
              >
                {copy.products[id]}
              </Pill>
            ))}
          </div>
        </fieldset>
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <Question number={2}>{copy.destinationQuestion}</Question>
          <div className="flex flex-wrap gap-2">
            {destinationOrder.map((id) => (
              <Pill key={id} active={id === destination} onClick={() => choose(id)}>
                {copy.destinations[id]}
              </Pill>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-4 border-t border-ivory/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs text-xs leading-relaxed text-ivory/55">{copy.note}</p>
          <Link
            href={href}
            className="btn btn-sand shrink-0"
            data-track-event="route_planner_cta"
            data-track-product={product}
            data-track-destination={destination}
          >
            {copy.cta} <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Question({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <legend className="mb-2.5 flex items-baseline gap-2.5 p-0 text-sm text-ivory/75">
      <span className="numeral text-xs text-gold-soft">{String(number).padStart(2, '0')}</span>
      {children}
    </legend>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'min-h-10 shrink-0 cursor-pointer rounded-full border px-3.5 text-[0.85rem] whitespace-nowrap transition-colors duration-300 sm:px-4 sm:text-sm lg:min-h-9',
        active ? 'border-sand bg-sand font-bold text-forest' : 'border-ivory/20 text-ivory/80 hover:border-ivory/50 hover:text-ivory',
      )}
    >
      {children}
    </button>
  );
}
