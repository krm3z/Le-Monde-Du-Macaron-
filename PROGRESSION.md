# Progression — site vitrine Le Monde du Macaron (Villefranche)

> Si la session redémarre : relire ce fichier et RAPPORT.md, puis reprendre à la première case non cochée.

## Étape 0 — Mise en route
- [x] Vérifier Node.js et Git → Git 2.45 OK, Python 3.14 OK, Chrome OK, **Node.js absent**.
- [x] Préparer un Node.js portable dans `.tools/` (dans le dossier du projet, non versionné).

## Étape 1 — Collecte
- [x] Parcourir nos-produits.html + pagination
- [x] Parcourir les pages coffrets + page boutique Villefranche
- [x] Télécharger les photos (assets/photos/) + WebP 600/1200 + SOURCES-PHOTOS.md
- [x] Infos boutique (horaires, tél, mail, réseaux, avis Google) avec sources
- [x] data/produits.json + data/boutique.json (descriptions réécrites)
- [x] Commit « Collecte du contenu »

## Étape 2 — Construction
- [x] Projet Astro statique, polices locales, GSAP/ScrollTrigger/Lenis
- [x] Pages : accueil, macarons, coffrets & événements, boutique, mentions légales, 404
- [x] SEO : titles, descriptions, schema.org, OG, sitemap, robots, favicon
- [x] A-REMPLACER.md
- [x] Commit « Construction du site »

## Étape 3 — Vérification
- [x] Build + serveur local
- [x] 375 / 768 / 1440 px, console, liens, menu, filtre, cartes, boutons
- [x] Lighthouse mobile ≥ 90 sur chaque page
- [x] Relecture des textes
- [x] Captures dans captures/ + regard critique
- [x] Commit « Vérification et corrections »

## Étape 4 — Déploiement (préparation)
- [x] Build compatible Cloudflare Pages, .gitignore

## Étape 5 — Rapport
- [x] RAPPORT.md + commit « Rapport »

## Journal (une ligne par action)
- Création du suivi. Node.js manquant : décision → Node portable dans `.tools/` (voir RAPPORT.md).
- Étape 1 finie : 94 produits (79 macarons + 15 calissons), 102 photos, 8 macarons détourés, boutique.json avec sources.
- Étape 2 finie : Astro 7 statique, 6 pages + sitemap/robots, animations GSAP/Lenis, menu, filtre, cartes testés. Photos Litchi/Rose = logo du réseau → retirées.
- Étape 3 finie : Lighthouse mobile 92-100 (a11y/BP/SEO 100), 0 débordement, 0 erreur console, 0 lien cassé. Plan OSM passé « au clic ».
- Étape 4 finie : build `npm run build` → `dist/`, .node-version=24, _headers (cache/sécurité), .gitignore. Rien envoyé en ligne.
- Étape 5 finie : RAPPORT.md réécrit (version téléphone), serveur local arrêté. Mission terminée.
- Retour de Kerem : horaires 8h-19h confirmés ; refonte du style en plus sobre et mature (site.css). Lighthouse 96-100. Captures refaites.
- Skill ui-ux-pro-max appliqué (motion tokens, cibles tactiles, contrôle 1024 px, design-system/MASTER.md). Lighthouse 95-100.
- Palette officielle du réseau appliquée (noir, blanc, fuchsia #D72688, brun #322C29) + logo officiel. Lighthouse a11y 100.

## Refonte « Pièce par pièce » (en cours — limite d'utilisation atteinte le 20/11/2026)
- [x] Atelier de conception : 3 propositions (design-system/proposition-*.md), cahier des charges final design-system/DIRECTION.md (+ IDENTITE-VILLEFRANCHE.md qui prime).
- [x] Nom « Le Monde du Macaron Villefranche » + salon de thé dans data/boutique.json.
- [x] Détourage amélioré de 77 macarons (scripts/photos.mjs, public/photos/detoure/).
- [x] Outils de contrôle : .tools/qa/pellicule.mjs (captures d'animation), serveur dev (.claude/launch.json « dev », port 4330).
- [x] Refonte réalisée : maison.css, noyau.js + modules par page, 6 pages refaites. Lighthouse mobile 91-100 (a11y/BP/SEO 100), 0 débordement, 0 erreur. Plan dessiné = schéma stylisé (pas l'extrait OSM réel), défilé épinglé et transition partagée non faits.
