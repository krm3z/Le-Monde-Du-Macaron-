# Ce qu'il reste à remplir

Sur le site, chaque valeur manquante s'affiche **surlignée en jaune** (`[À REMPLACER]`). On ne touche jamais au code : tout se change dans les deux fichiers `data/`. Après modification : `npm run build` (ou un simple envoi sur GitHub si le site est relié à Cloudflare Pages).

| # | À remplir | Où ça s'affiche | Fichier à modifier | Ce que j'ai trouvé |
|---|---|---|---|---|
| 3 | **Allergènes** de chaque produit | Nos macarons (dos des cartes) | `data/produits.json` → `allergenes` (94 produits) | Le réseau n'affiche aucun allergène. À recopier depuis la fiche allergènes de la boutique. |
| 4 | Prix (facultatif) | Nos macarons (dos des cartes) | `data/produits.json` → `prix` (ex. `"1,90 €"`) | Aucun prix sur le site du réseau. Laisser `null` pour ne rien afficher. |
| 5 | Raison sociale, forme juridique, capital, SIRET, RCS, TVA | Mentions légales | `data/boutique.json` → `mentions_legales` | À demander à la gérante (extrait Kbis). |
| 6 | Responsable de la publication | Mentions légales | `data/boutique.json` → `mentions_legales.responsable_publication` | En général la gérante. |
| 7 | Accord du réseau pour les photos | Mentions légales (crédits) | `src/pages/mentions-legales.astro` (retirer la mention jaune une fois l'accord reçu) | Accord en attente. Voir `SOURCES-PHOTOS.md`. |
| 8 | Photos manquantes : **Litchi** et **Rose** | Nos macarons | Déposer `assets/photos/macaron-litchi.jpg` et `macaron-rose.jpg`, puis remettre `"photo": "macaron-litchi"` / `"macaron-rose"` dans `data/produits.json` | Le réseau n'a que son logo à la place de ces photos. |
| 9 | Adresse définitive du site | Balises SEO, sitemap, partage | `data/boutique.json` → `site_url` | Provisoire : `https://le-monde-du-macaron-villefranche.pages.dev`. |

## À relire avec la cliente (pas des « trous », mais à valider)
- Les textes des événements (Conscrits, Mariages, Entreprises) et les accroches : `data/boutique.json` → `textes` et `evenements`.
- Les descriptions des 94 produits (rédigées par moi) : `data/produits.json` → `description`.
- La note Google (4,6) et le nombre d'avis (719), relevés le 19/11/2026 : `data/boutique.json` → `google`.
- La liste des parfums vendus à Villefranche : le catalogue vient du réseau, la boutique n'a peut-être pas tout. Retirer un produit = supprimer son bloc dans `data/produits.json`.
| 10 | **Vraies photos du salon de thé** (crêpes, gaufres, milk-shakes, boissons, glaces, pâtisseries) | Accueil (salon de thé), Nos macarons (filtre Salon de thé) | Déposer `assets/photos/salon-<nom>.jpg` (même nom), puis retirer `"photo_illustration": true` et `credit_photo` dans `data/produits.json` | Photos d'illustration libres de droits (Wikimedia Commons) en attendant. |
