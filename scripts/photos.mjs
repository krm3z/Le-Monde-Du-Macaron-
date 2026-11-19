// Génère les images WebP du site à partir de assets/photos/.
//  - assets/photos/<nom>.jpg|png      -> public/photos/<nom>-600.webp et <nom>-1200.webp
//  - assets/photos/detourage/<nom>.jpg -> public/photos/detoure/<nom>.webp (fond transparent)
// Lancé automatiquement par « npm run build ». Ne refait que les images modifiées.
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'assets/photos');
const OUT = path.join(ROOT, 'public/photos');
const MANIFEST = path.join(ROOT, 'src/generated/photos.json');
const TAILLES = [600, 1200];
const EXT = /\.(jpe?g|png|webp)$/i;

let sharp;
try { sharp = (await import('sharp')).default; } catch {
  console.warn('[photos] sharp indisponible : images existantes conservées.');
}

const mtime = async (f) => { try { return (await fs.stat(f)).mtimeMs; } catch { return 0; } };
let manifest = {};
try { manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8')); } catch {}

await fs.mkdir(path.join(OUT, 'detoure'), { recursive: true });
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

// 1. Photos produits
for (const file of (await fs.readdir(SRC)).filter((f) => EXT.test(f))) {
  const name = file.replace(EXT, '');
  const src = path.join(SRC, file);
  const outs = TAILLES.map((w) => path.join(OUT, `${name}-${w}.webp`));
  const fresh = (await Promise.all(outs.map(mtime))).every((t) => t > 0) && (await mtime(src)) < Math.min(...(await Promise.all(outs.map(mtime))));
  if (fresh && manifest[name] || !sharp) continue;
  const meta = await sharp(src).metadata();
  const sizes = [];
  for (const [i, w] of TAILLES.entries()) {
    const info = await sharp(src).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: i ? 78 : 74, effort: 5 }).toFile(outs[i]);
    sizes.push({ w: info.width, h: info.height, src: `/photos/${name}-${w}.webp` });
  }
  manifest[name] = { ratio: meta.height / meta.width, sizes };
  console.log('[photos]', name);
}

// 2. Détourage (fond clair -> transparent)
//    Un pixel relié au bord est du « fond » s'il ressemble au fond de sa ligne (gère les dégradés)
//    ou s'il est gris neutre et clair (sol, reflet, ombre portée de la photo).
async function detoure(src, dest, largeur = 480) {
  const { data, info } = await sharp(src).resize(700).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const N = W * H;
  const rowBg = [];
  for (let y = 0; y < H; y++) {
    let r = 0, g = 0, b = 0;
    for (const x of [0, 1, 2, W - 3, W - 2, W - 1]) { const i = (y * W + x) * 3; r += data[i]; g += data[i + 1]; b += data[i + 2]; }
    rowBg.push([r / 6, g / 6, b / 6]);
  }
  const TOL = 30;
  const isBg = (p) => {
    const c = rowBg[(p / W) | 0];
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
    if (Math.hypot(r - c[0], g - c[1], b - c[2]) <= TOL) return true;
    return Math.max(r, g, b) - Math.min(r, g, b) < 20 && r * 0.3 + g * 0.59 + b * 0.11 > 125;
  };
  const bg = new Uint8Array(N);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
  while (stack.length) {
    const p = stack.pop();
    if (bg[p] || !isBg(p)) continue;
    bg[p] = 1;
    const x = p % W, y = (p / W) | 0;
    if (x > 0) stack.push(p - 1); if (x < W - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - W); if (y < H - 1) stack.push(p + W);
  }
  // masque : on garde le plus grand objet, bords adoucis
  const alpha = Buffer.alloc(N);
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let p = 0; p < N; p++) if (!bg[p]) {
    alpha[p] = 255; const x = p % W, y = (p / W) | 0;
    if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  // bords adoucis : flou 3x3 fait à la main
  const mask = Buffer.alloc(N);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    let s = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) s += alpha[(y + dy) * W + x + dx];
    mask[y * W + x] = s / 9;
  }
  const pad = 6;
  const left = Math.max(0, minX - pad), top = Math.max(0, minY - pad);
  const w = Math.min(W - left, maxX - minX + pad * 2), h = Math.min(H - top, maxY - minY + pad * 2);
  const rgba = Buffer.alloc(N * 4);
  for (let p = 0; p < N; p++) {
    rgba[p * 4] = data[p * 3]; rgba[p * 4 + 1] = data[p * 3 + 1]; rgba[p * 4 + 2] = data[p * 3 + 2]; rgba[p * 4 + 3] = mask[p];
  }
  const info2 = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .extract({ left, top, width: w, height: h })
    .resize({ width: largeur, withoutEnlargement: true })
    .webp({ quality: 80, alphaQuality: 90, effort: 5 })
    .toFile(dest);
  return { w: info2.width, h: info2.height };
}

// 3. Version détourée de chaque photo de macaron listée dans data/produits.json
//    -> public/photos/detoure/<photo>.webp (clé du manifeste : « detoure/<photo> »)
const produits = JSON.parse(await fs.readFile(path.join(ROOT, 'data/produits.json'), 'utf8')).produits;
for (const p of produits.filter((x) => x.famille === 'macaron' && x.photo)) {
  const file = (await fs.readdir(SRC)).find((f) => f.replace(EXT, '') === p.photo && EXT.test(f));
  if (!file) continue;
  const dest = path.join(OUT, 'detoure', `${p.photo}.webp`);
  const key = `detoure/${p.photo}`;
  if (!sharp || ((await mtime(dest)) > (await mtime(path.join(SRC, file))) && manifest[key])) continue;
  const s = await detoure(path.join(SRC, file), dest, 360);
  manifest[key] = { ratio: s.h / s.w, sizes: [{ ...s, src: `/photos/detoure/${p.photo}.webp` }] };
  console.log('[photos] détouré', p.photo);
}

const DET = path.join(SRC, 'detourage');
for (const file of (await fs.readdir(DET).catch(() => [])).filter((f) => EXT.test(f))) {
  const name = file.replace(EXT, '');
  const dest = path.join(OUT, 'detoure', `${name}.webp`);
  const key = `detoure/${name}`;
  if (!sharp || ((await mtime(dest)) > (await mtime(path.join(DET, file))) && manifest[key])) continue;
  const s = await detoure(path.join(DET, file), dest);
  manifest[key] = { ratio: s.h / s.w, sizes: [{ ...s, src: `/photos/detoure/${name}.webp` }] };
  console.log('[photos] détouré', name);
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 1) + '\n');
console.log('[photos] terminé :', Object.keys(manifest).length, 'images');
