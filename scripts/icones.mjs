// Génère favicon PNG, icône Apple et image de partage (og.jpg) — à relancer si le logo change.
// Usage : node scripts/icones.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const pub = (f) => path.join(ROOT, 'public', f);
const svg = await fs.readFile(pub('favicon.svg'));
await sharp(svg, { density: 300 }).resize(32, 32).png().toFile(pub('favicon-32.png'));
await sharp(svg, { density: 600 }).resize(180, 180).png().toFile(pub('apple-touch-icon.png'));

// Image de partage 1200x630 : macarons détourés posés sur le beige
const dir = path.join(ROOT, 'public/photos/detoure');
const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.webp'));
const spots = [[90, 120, 260], [380, 60, 230], [650, 140, 270], [930, 70, 220], [210, 360, 240], [520, 380, 250], [800, 350, 260], [-40, 420, 200]];
const layers = await Promise.all(files.slice(0, spots.length).map(async (f, i) => ({
  input: await sharp(path.join(dir, f)).resize(spots[i][2]).rotate((i % 2 ? 1 : -1) * (6 + i * 2), { background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer(),
  left: Math.max(0, spots[i][0]), top: spots[i][1],
})));
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#FAFAFA' } })
  .composite(layers).jpeg({ quality: 82, mozjpeg: true }).toFile(pub('og.jpg'));
console.log('icônes et og.jpg générés');
