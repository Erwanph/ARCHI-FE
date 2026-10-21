// Responsive image pipeline.
//
// Source photographs live in public/images as single high-resolution JPGs.
// This script derives AVIF and WebP variants at fixed widths and writes a
// manifest that <ResponsiveImage> reads to build `srcset`, so pages only ever
// download the smallest file that fits the layout.
//
// Usage: npm run images
import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGE_DIR = 'public/images';
const MANIFEST = 'lib/image-manifest.json';
const WIDTHS = [480, 800, 1200, 1600, 2400];

// Only photographs that the site renders. Add a name here after dropping a
// new JPG into public/images.
const SOURCES = [
  'bintan-origin',
  'hero-bali-rice-fields-poster',
  'hero-indonesia-coast',
  'kratom',
  'patchouli',
];

const FORMATS = {
  avif: (pipeline) => pipeline.avif({ quality: 52, effort: 5 }),
  webp: (pipeline) => pipeline.webp({ quality: 74, effort: 5 }),
};

async function isFresh(output, sourceTime) {
  try {
    return (await stat(output)).mtimeMs >= sourceTime;
  } catch {
    return false;
  }
}

const manifest = {};

for (const name of SOURCES) {
  const source = path.join(IMAGE_DIR, `${name}.jpg`);
  const input = await readFile(source);
  const sourceTime = (await stat(source)).mtimeMs;
  const { width, height } = await sharp(input).metadata();
  const widths = WIDTHS.filter((candidate) => candidate < width);
  if (!widths.includes(width) && width <= WIDTHS.at(-1)) widths.push(width);

  for (const target of widths) {
    for (const [format, encode] of Object.entries(FORMATS)) {
      const output = path.join(IMAGE_DIR, `${name}-${target}.${format}`);
      if (await isFresh(output, sourceTime)) continue;
      await encode(sharp(input).resize({ width: target })).toFile(output);
      console.log(`  wrote ${output}`);
    }
  }

  manifest[name] = { width, height, widths };
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Manifest written to ${MANIFEST}`);
