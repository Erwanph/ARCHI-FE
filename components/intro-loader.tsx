import { WaveLines } from '@/components/brand-motifs';

// Runs before first paint: skip the intro on repeat visits in this session
// and for visitors who prefer reduced motion.
const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem('archi-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='skip'}else{sessionStorage.setItem('archi-intro','1')}}catch(e){document.documentElement.dataset.intro='skip'}`;

/** The ARCHI wordmark, written once — then the page lifts in. Pure CSS. */
export function IntroLoader({ label }: { label: string }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <div className="intro" role="presentation" aria-hidden="true" data-label={label}>
        <div className="intro-mark">
          <img
            src="/brand/archi-lockup-light-700.webp"
            width={700}
            height={228}
            alt=""
            fetchPriority="high"
            className="intro-logo w-full"
          />
          <span className="intro-pen" />
          <WaveLines tone="dark" lines={2} gap={10} amplitude={20} animate className="mt-4 h-10 w-full opacity-70 [--delay:1100ms]" />
        </div>
      </div>
    </>
  );
}
