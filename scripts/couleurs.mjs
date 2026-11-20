// Mesure la couleur dominante de chaque macaron détouré (pixels opaques) et écrit src/generated/couleurs.json.
// Sert à ranger le « mur de macarons » de l'accueil en dégradé. Lancé par « npm run build ».
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'src/generated/couleurs.json');
let sharp;
try { sharp = (await import('sharp')).default; } catch { console.warn('[couleurs] sharp indisponible : fichier existant conservé.'); process.exit(0); }

const produits = JSON.parse(await fs.readFile(path.join(ROOT, 'data/produits.json'), 'utf8')).produits;
const res = {};
for (const p of produits.filter((x) => x.famille === 'macaron' && x.photo)) {
  const f = path.join(ROOT, 'public/photos/detoure', `${p.photo}.webp`);
  try { await fs.access(f); } catch { continue; }
  const { data } = await sharp(f).resize(80).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  // Teinte dominante des pixels vraiment colorés (la crème beige du centre est ignorée)
  const hsl = (r, g, b) => {
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
    let h = 0;
    if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [((h * 60) + 360) % 360, d ? d / (1 - Math.abs(2 * l - 1)) : 0, l];
  };
  // beige / caramel / chocolat = teinte 15–55° peu saturée : ce n'est pas une « couleur » de coque
  const beige = (h, s) => h >= 15 && h <= 55 && s < 0.55;
  const bins = new Array(36).fill(0);
  let n = 0, nCouleur = 0, lum = 0, sr = 0, sg = 0, sb = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 220) continue;
    const [h, s, l] = hsl(data[i] / 255, data[i + 1] / 255, data[i + 2] / 255);
    n++; lum += l;
    if (s > 0.14 && l > 0.14 && l < 0.9 && !beige(h, s)) { bins[Math.floor(h / 10) % 36] += s; nCouleur++; sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; }
  }
  if (!n) continue;
  const part = nCouleur / n;
  let pic = 0;
  for (let k = 0; k < 36; k++) {
    const v = bins[k] + 0.5 * (bins[(k + 35) % 36] + bins[(k + 1) % 36]);
    if (v > bins[pic] + 0.5 * (bins[(pic + 35) % 36] + bins[(pic + 1) % 36])) pic = k;
  }
  const hex = nCouleur ? '#' + [sr, sg, sb].map((x) => Math.round(x / nCouleur).toString(16).padStart(2, '0')).join('') : '#cbbfae';
  res[p.id] = { h: pic * 10 + 5, part: +part.toFixed(3), l: +(lum / n).toFixed(3), colore: part > 0.2, hex };
}
await fs.writeFile(OUT, JSON.stringify(res, null, 1) + '\n');
console.log('[couleurs]', Object.keys(res).length, 'macarons mesurés');
