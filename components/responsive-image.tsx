import type { CSSProperties } from 'react';
import manifest from '@/lib/image-manifest.json';

type ManifestEntry = { width: number; height: number; widths: number[] };

const entries = manifest as Record<string, ManifestEntry>;

/**
 * Serves AVIF, then WebP, then the original JPG, at the smallest width that
 * fits `sizes`. Variants come from `npm run images` (scripts/optimize-images).
 */
export function ResponsiveImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  style,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const name = src.replace(/^.*\//, '').replace(/\.(jpe?g|png)$/, '');
  const entry = entries[name];
  const base = src.slice(0, src.lastIndexOf('/') + 1);
  const srcSet = (format: string) =>
    entry?.widths.map((width) => `${base}${name}-${width}.${format} ${width}w`).join(', ');

  return (
    <picture>
      {entry && <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />}
      {entry && <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={entry?.width}
        height={entry?.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  );
}
