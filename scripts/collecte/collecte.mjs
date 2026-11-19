// Script de collecte (à usage unique, déjà exécuté le 19/11/2026).
// Télécharge les photos du réseau, crée data/produits.json et SOURCES-PHOTOS.md.
// Usage : node scripts/collecte/collecte.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const raw = JSON.parse(await fs.readFile(path.join(import.meta.dirname, 'raw.json'), 'utf8'));
const tsv = await fs.readFile(path.join(import.meta.dirname, 'desc.tsv'), 'utf8');
const desc = new Map(tsv.trim().split('\n').map((l) => { const [s, n, d] = l.split('\t'); return [s, { nom: n, description: d.trim() }]; }));

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
const photosDir = path.join(ROOT, 'assets/photos');
await fs.mkdir(path.join(photosDir, 'detourage'), { recursive: true });

// Macarons choisis pour l'animation d'accueil (photo « seule », à détourer)
const HERO = ['framboise', 'pistache', 'citron', 'myrtille', 'chocolat', 'mangue-passion', 'violette', 'vanille'];

async function download(url, dest) {
  try { await fs.access(dest); return true; } catch {}
  const r = await fetch(url, { headers: UA });
  if (!r.ok) { console.warn('ÉCHEC', r.status, url); return false; }
  await fs.writeFile(dest, Buffer.from(await r.arrayBuffer()));
  return true;
}

const produits = [];
const sources = [];
for (const p of raw) {
  const d = desc.get(p.slug);
  if (!d) continue; // hors périmètre (nougats, chocolats Weiss, anciens parfums du site .com)
  const famille = p.fam_fr.startsWith('macarons') ? 'macaron' : 'calisson';
  const categorie = p.fam_fr === 'macarons_sucres-sales' ? 'salé' : famille === 'macaron' ? 'sucré' : 'autre';
  const cleanSlug = p.slug.replace(/-\d{4}$/, '').replace(/^rhm-/, 'rhum-');
  const base = famille === 'macaron' ? `macaron-${cleanSlug}` : cleanSlug;
  const url = p.img_fr;
  const ok = await download(url, path.join(photosDir, `${base}.jpg`));
  if (ok) sources.push([`assets/photos/${base}.jpg`, url, d.nom]);
  produits.push({
    id: cleanSlug,
    nom: d.nom,
    nom_origine: p.nom_origine || p.nom_fr,
    famille,
    categorie,
    description: d.description,
    allergenes: '[ALLERGÈNES À VÉRIFIER]',
    prix: null,
    photo: ok ? base : null,
    mis_en_avant: HERO.includes(p.slug),
    source: p.url_fr,
  });
}

// Photos « macaron seul » pour l'animation d'accueil
for (const slug of HERO) {
  const p = raw.find((r) => r.slug === slug);
  const html = await (await fetch(p.url_fr, { headers: UA })).text();
  const imgs = [...html.matchAll(/https:[^"']*\/media\/catalog\/product\/cache\/1\/thumbnail\/[^"']+\.jpg/g)].map((m) => m[0]);
  const single = imgs.map((u) => u.replace(/\/cache\/1\/thumbnail\/\d+x\d+\/[0-9a-f]+/, '')).find((u) => !/duo/i.test(u));
  if (!single) { console.warn('Pas de photo seule pour', slug); continue; }
  const dest = `assets/photos/detourage/macaron-${slug}-seul.jpg`;
  if (await download(single, path.join(ROOT, dest))) sources.push([dest, single, `${desc.get(slug).nom} (macaron seul, animation d'accueil)`]);
}

await fs.mkdir(path.join(ROOT, 'data'), { recursive: true });
await fs.writeFile(path.join(ROOT, 'data/produits.json'), JSON.stringify({
  _lisez_moi: "Liste des produits affichés sur le site. Pour modifier un produit : changez le texte entre guillemets. categorie = 'sucré', 'salé', 'coffret' ou 'autre'. prix : null (non affiché) ou un texte comme \"1,90 €\". photo = nom du fichier dans assets/photos (sans .jpg). mis_en_avant = true pour l'afficher sur l'accueil.",
  produits,
}, null, 2) + '\n');

const md = ['# Sources des photos', '',
  "Toutes les photos viennent du site du réseau Le Monde du Macaron (mondedumacaron.fr). **Accord du réseau en attente** : ne pas mettre le site en ligne avec ces photos sans cet accord.", '',
  '**Pour remplacer une photo** : déposez un nouveau fichier .jpg (ou .png) portant exactement le même nom dans `assets/photos/`, puis lancez `npm run photos` (ou simplement `npm run build`). Les versions WebP sont recréées automatiquement.', '',
  '| Fichier | URL d’origine | Produit |', '|---|---|---|',
  ...sources.map(([f, u, n]) => `| ${f} | ${u} | ${n} |`), ''];
await fs.writeFile(path.join(ROOT, 'SOURCES-PHOTOS.md'), md.join('\n'));
console.log(produits.length, 'produits,', sources.length, 'photos');
