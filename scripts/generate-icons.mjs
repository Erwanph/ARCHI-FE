/**
 * Builds the site icons from the "A" of the ARCHI wordmark: the letter and its
 * gold arc, lifted out of the light wordmark by connected-component analysis
 * (the A is the first glyph, so nothing of the R comes along), then set on a
 * forest tile.
 *
 *   npm run icons
 *
 * Writes public/favicon.ico (16/32/48), public/icon-192.png, public/icon-512.png
 * and public/apple-touch-icon.png.
 */
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'public/brand/archi-wordmark-light.png';
const FOREST = { r: 22, g: 56, b: 41 };
const ALPHA_MIN = 24;

/** Returns the first glyph (left-most connected component) as an RGBA crop. */
async function extractA() {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const seen = new Uint8Array(w * h);

  let seed = -1;
  for (let x = 0; x < w && seed < 0; x++) {
    for (let y = 0; y < h; y++) {
      if (data[(y * w + x) * 4 + 3] >= ALPHA_MIN) {
        seed = y * w + x;
        break;
      }
    }
  }

  const pixels = [];
  let minX = w, minY = h, maxX = 0, maxY = 0;
  const stack = [seed];
  seen[seed] = 1;
  while (stack.length) {
    const p = stack.pop();
    const x = p % w;
    const y = (p / w) | 0;
    pixels.push(p);
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const q = ny * w + nx;
        if (!seen[q] && data[q * 4 + 3] >= ALPHA_MIN) {
          seen[q] = 1;
          stack.push(q);
        }
      }
    }
  }

  // Keep the soft anti-aliased edge: include faint pixels touching the glyph.
  const cw = maxX - minX + 3;
  const ch = maxY - minY + 3;
  const out = Buffer.alloc(cw * ch * 4);
  const keep = new Uint8Array(w * h);
  for (const p of pixels) keep[p] = 1;
  for (let y = Math.max(0, minY - 1); y <= Math.min(h - 1, maxY + 1); y++) {
    for (let x = Math.max(0, minX - 1); x <= Math.min(w - 1, maxX + 1); x++) {
      const p = y * w + x;
      const near = keep[p] || (data[p * 4 + 3] > 0 && [-1, 1, -w, w].some((o) => keep[p + o]));
      if (!near) continue;
      const o = ((y - minY + 1) * cw + (x - minX + 1)) * 4;
      data.copy(out, o, p * 4, p * 4 + 4);
    }
  }
  return { buffer: out, width: cw, height: ch };
}

/** Grows the glyph by `radius` px so hairlines survive tiny sizes. */
function thicken({ buffer, width, height }, radius) {
  const pad = radius;
  const w = width + pad * 2;
  const h = height + pad * 2;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let best = -1;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy > radius * radius) continue;
          const sx = x - pad + dx;
          const sy = y - pad + dy;
          if (sx < 0 || sy < 0 || sx >= width || sy >= height) continue;
          const i = (sy * width + sx) * 4;
          if (best < 0 || buffer[i + 3] > buffer[best + 3]) best = i;
        }
      }
      if (best >= 0) buffer.copy(out, (y * w + x) * 4, best, best + 4);
    }
  }
  return { buffer: out, width: w, height: h };
}

async function tile(glyph, size, { rounded = true, scale = 0.7 } = {}) {
  const box = Math.round(size * scale);
  const letter = await sharp(glyph.buffer, { raw: { width: glyph.width, height: glyph.height, channels: 4 } })
    .resize(box, box, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
    .png()
    .toBuffer();
  const radius = rounded ? Math.round(size * 0.22) : 0;
  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="rgb(${FOREST.r},${FOREST.g},${FOREST.b})"/></svg>`,
  );
  const offset = Math.round((size - box) / 2);
  return sharp(background)
    .composite([{ input: letter, left: offset, top: offset }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** ICO container holding PNG images (supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.png)]);
}

const glyph = await extractA();

// Tab-bar sizes: the smaller the icon, the heavier the stroke and the larger
// the letter, so the hairline left leg of the A stays visible.
const tabSizes = [
  { size: 16, weight: 11, scale: 0.9 },
  { size: 32, weight: 7, scale: 0.84 },
  { size: 48, weight: 5, scale: 0.8 },
];
const small = await Promise.all(
  tabSizes.map(async ({ size, weight, scale }) => ({ size, png: await tile(thicken(glyph, weight), size, { scale }) })),
);
await writeFile('public/favicon.ico', ico(small));
await writeFile('public/icon-192.png', await tile(glyph, 192));
await writeFile('public/icon-512.png', await tile(glyph, 512));
// iOS applies its own mask, so the touch icon is a full square.
await writeFile('public/apple-touch-icon.png', await tile(glyph, 180, { rounded: false, scale: 0.66 }));

console.log(`A glyph ${glyph.width}×${glyph.height}px → favicon.ico, icon-192.png, icon-512.png, apple-touch-icon.png`);
