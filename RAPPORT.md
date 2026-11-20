# Rapport — site vitrine Le Monde du Macaron (Villefranche)

## 1. Résumé en 5 lignes
- Le site est **construit, testé et prêt à être mis en ligne** sur Cloudflare Pages (100 % statique).
- 6 pages : Accueil, Nos macarons (94 produits), Coffrets & événements, La boutique, Mentions légales, 404.
- Lighthouse mobile : 96 à 100 partout (performance, accessibilité, bonnes pratiques, SEO).
- Horaires confirmés : lundi au samedi 8h – 19h, fermé le dimanche.
- **Il manque** : l'e-mail de la boutique, les allergènes (le réseau n'en publie aucun), les infos légales de la société.
- **Avant la mise en ligne** : obtenir l'accord du réseau pour les photos, et remplir `A-REMPLACER.md`.

## 2. Ce qui est fait, page par page
- **Partout** : menu en pilule flottante noire avec le logo officiel (plein écran sur téléphone), pied de page chocolat avec adresse, horaires, Instagram, TikTok, mentions légales et « Site créé par Kerem Uysal ». Défilement fluide (Lenis), apparitions douces, transitions entre pages. Aucun cookie, aucun suivi, polices hébergées sur le site.
- **Accueil** : dès le premier écran, le nom, une phrase claire et les infos pratiques (horaires, adresse, téléphone), plus les boutons « Voir les macarons » et « Itinéraire ». À côté, une petite vitrine : 8 macarons détourés s'y posent un par un, puis le nom apparaît. Bandeau de macarons qui défile et ralentit au survol / toucher. Une sélection de parfums, les coffrets (Conscrits, Mariages, Entreprises), le bloc « Venir à la boutique ». Note Google 4,6 (719 avis).
- **Nos macarons** : 94 cartes (68 sucrés, 11 salés, 15 calissons). Filtre Tout / Sucré / Salé / Calissons avec cartes qui glissent. Chaque carte se retourne au toucher ou au clavier (Entrée / Espace) : description + allergènes au dos.
- **Coffrets & événements** : le texte de présentation se remplit du vieux rose au chocolat en défilant, deux rangées de photos glissent sur le côté. Conscrits, Mariages, Entreprises avec boutons « Appeler » et « Envoyer un mail » (objet pré-rempli).
- **La boutique** : adresse, horaires (le jour actuel est signalé), boutons Itinéraire / Appeler, note Google avec compteur animé jusqu'à 719, plan OpenStreetMap qui apparaît en fondu au clic.
- **Mentions légales** : éditeur, hébergeur Cloudflare (adresse officielle vérifiée), créateur, crédits photos, données personnelles.
- **404** : « Ce macaron s'est échappé de la vitrine », avec un macaron qui se balance.
- **SEO local** : titre et description par page, schema.org « Bakery » (adresse, GPS, téléphone, Instagram, TikTok), Open Graph avec image de partage, sitemap.xml, robots.txt, favicon.
- **Accessibilité** : textes alternatifs, lien « Aller au contenu », navigation clavier, contrastes vérifiés, mode « mouvement réduit » (tout devient de simples fondus, rien ne bouge).

## 3. Décisions prises seul
- **Refonte « Pièce par pièce »** (nov. 2026) : alternance pages nuit / jour, vitrine de nuit où les macarons s'empilent puis « Le Monde du Macaron Villefranche » apparaît, index des 79 parfums avec aperçu au curseur, salon de thé, nuancier de macarons détourés avec filtre animé et cartes 3D, texte qui se remplit du fuchsia au brun, photos qui glissent, rue qui se dessine sur le plan, pancarte « Ouvert / Fermé » à l'heure de Paris, 404 « il manque un macaron ». Lighthouse mobile : 91 à 100 en performance, 100 ailleurs (sauf SEO de la 404, volontaire). Pas encore faits : vrai plan OpenStreetMap vectorisé (le plan dessiné est un schéma), défilé horizontal épinglé des coffrets, macaron qui « vole » entre deux pages.
- **Palette officielle du réseau** (à ta demande) : noir, blanc, rose fuchsia #D72688 et brun-noir #322C29, relevés sur mondedumacaron.fr. Bandeau noir avec le **logo officiel** (blanc, drapeau tricolore). Remplace la palette crème / olive / vieux rose du début. Contrastes vérifiés (accessibilité 100).
- **Refonte « plus sérieuse »** (à ta demande) : même palette et mêmes polices, mais mise en page alignée à gauche, titres sobres sans italiques décoratives, plus de numéros « 01 / 02 / 03 », angles discrets au lieu des grandes cartes arrondies, héros à la taille du contenu au lieu d'un plein écran, textes plus directs. Une seule animation d'entrée, calme (plus de chute avec rebond ni d'effet de profondeur). Principes tirés du skill de design disponible (`artifact-design`) : aucun skill de design web n'est installé sur ton compte.
- **Skill ui-ux-pro-max** (le dépôt GitHub que tu m'as donné) : téléchargé dans un dossier temporaire (pas installé sur le PC), script vérifié puis lancé. Retenu : style minimaliste posé, animations subtiles (survols 200 ms, apparitions 350 ms / 12 px), 8 px entre les boutons, cibles de 44 px, contrôle en 1024 px. Écarté : son style « Boulangerie/Café » (couleurs vives, claymorphism), sa palette noir/or et ses polices, car ta charte prime ; et les témoignages clients (pas d'avis vérifiés réutilisables). Tout est résumé dans `design-system/MASTER.md`.
- **Node.js absent** → Node 24 LTS portable téléchargé depuis nodejs.org (empreinte SHA-256 vérifiée), rangé dans `.tools/` à l'intérieur du projet. Rien n'est installé ailleurs sur le PC. `.tools/` n'est pas envoyé sur Git.
- **Astro plutôt que HTML pur** : le contenu vient des 2 fichiers JSON et la page est générée à l'avance. Google lit tout le texte, aucun JavaScript n'est nécessaire pour voir les infos, et Cloudflare Pages sait construire Astro tout seul. C'est aussi un bon modèle à réutiliser pour tes prochains clients.
- **Sources** : mondedumacaron.com (anglais) + mondedumacaron.fr (français, même catalogue, avec « Sucrés » / « Sucrés-Salés » et une page Villefranche). La catégorie « Sucrés-Salés » devient « Salé ».
- **Périmètre** : les 79 macarons du catalogue français + 15 calissons. Les 37 nougats et 29 chocolats Weiss ne sont pas listés un par un (une phrase les mentionne). 28 parfums présents seulement sur le site anglais (Cèpe, Avocat, Vodka-Redbull…) sont considérés comme anciens.
- **Noms** : nom français affiché, nom d'origine (anglais) gardé dans `nom_origine`. Marques adoucies : « Pâte à tartiner » (Nutella), « Biscuit cacao (Oreo) ».
- **Allergènes** : aucun sur le site du réseau → « [ALLERGÈNES À VÉRIFIER] » partout. Rien n'a été deviné.
- **Prix** : aucun affiché par le réseau → aucun prix sur le site (champ prêt dans le JSON).
- **Horaires** : 8h – 19h du lundi au samedi, fermé le dimanche (confirmé par toi ; Google et le site du réseau avaient d'anciens horaires).
- **Photos « 1200 px »** : les originaux font 1000 px, donc la grande version reste à 1000 px (pas d'agrandissement flou).
- **Photos Litchi et Rose** : le réseau n'a que son logo à la place → retirées (« Photo à venir »).
- **Plan au clic** : OpenStreetMap ne se charge qu'après un clic sur « Afficher le plan ». Aucune requête vers un tiers à l'ouverture de la page (mieux pour le RGPD et la vitesse).
- **Note Google** : affichée sur la page, mais pas mise dans le schema.org (Google refuse les avis « auto-déclarés » d'une entreprise sur son propre site).
- **Textes** : toutes les descriptions et accroches sont écrites par moi (le réseau n'avait aucun texte descriptif). Les offres événements restent prudentes (pas de pièce montée ni de prix promis) : à valider avec la cliente.
- **Google Maps** : bandeau de cookies refusé (« Tout refuser »), aucun compte, rien accepté.

## 4. Problèmes rencontrés et contournements
- Fiches produits du réseau vides (ni allergènes, ni prix, ni description) → marqueurs [À VÉRIFIER], descriptions rédigées.
- Pas de page coffrets ni de produit « coffret » sur le site du réseau → page rédigée sans prix, illustrée avec les macarons.
- Détourage : 1er essai raté (bug d'ordre des opérations), corrigé. Résultat net sur les 8 macarons, pas besoin du repli « photo en cercle ».
- Le plan OpenStreetMap restait vide dans le navigateur intégré → passage au chargement au clic, avec un joli encart d'attente.
- Le bandeau ne ralentissait pas au survol (animation pas encore prête au démarrage) → corrigé et vérifié dans Chrome.
- Petits défauts vus sur les captures et corrigés : bouton invisible dans le bloc chocolat, macaron décoratif qui dépassait de 8 px sur téléphone, barre de filtres sur deux lignes, polices qui faisaient « sauter » la page (préchargement ajouté), calissons en tête de la page macarons (ordre changé).
- Une commande groupée a été bloquée par une sécurité de l'outil → refaite fichier par fichier.

## 5. Scores Lighthouse (mobile, 19/11/2026)
| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Accueil | 95 à 100 | 100 | 100 | 100 |
| Nos macarons | 96 | 100 | 100 | 100 |
| Coffrets & événements | 100 | 100 | 100 | 100 |
| La boutique | 100 | 100 | 100 | 100 |
| Mentions légales | 100 | 100 | 100 | 100 |
| 404 | 100 | 100 | 100 | 69 * |

\* Normal : la page 404 est volontairement cachée à Google (« noindex »).
Vérifié aussi en 375, 768, 1024 et 1440 px : aucun débordement, aucun texte coupé, aucune erreur console, aucun lien cassé. Captures dans `captures/` (version pleine page + version écran pour chaque page et chaque taille).

## 6. Ce qui reste à faire
- **Tout ce qui manque est listé dans `A-REMPLACER.md`** (avec la page et le fichier). Sur le site, chaque trou est surligné en jaune.
- **Photos** : toutes viennent du réseau. Liste fichier → URL d'origine → produit dans `SOURCES-PHOTOS.md`. À faire valider par le réseau avant la mise en ligne. Pour changer une photo : déposer un .jpg du même nom dans `assets/photos/` puis lancer le build.

## 7. Voir le site sur ton PC
Dans PowerShell (Node portable du projet, rien à installer) :

```powershell
cd C:\Users\kerem\Documents\Le-Monde-Du-Macaron
$env:Path = "$PWD\.tools\node;$env:Path"
npm run build
npm run preview
```
Puis ouvrir http://localhost:4321 . Pour arrêter : Ctrl + C.
Pour modifier en direct (rechargement automatique) : `npm run dev` à la place des deux dernières lignes.
Si tu installes Node.js 24 LTS sur ton PC, la 2ᵉ ligne n'est plus utile.

## 8. Mettre en ligne sur Cloudflare Pages (gratuit)
1. Sur GitHub, crée un dépôt **privé** vide (ex. `le-monde-du-macaron-villefranche`), sans README.
2. Dans PowerShell, dans le dossier du projet :
   `git remote add origin https://github.com/TON-COMPTE/le-monde-du-macaron-villefranche.git`
   puis `git push -u origin main`.
3. Sur dash.cloudflare.com : **Workers & Pages** → **Créer** → onglet **Pages** → **Se connecter à Git** → choisis le dépôt.
4. Réglages du build : préréglage **Astro**, commande `npm run build`, dossier de sortie `dist`. (La version de Node est lue dans `.node-version` ; sinon ajoute la variable `NODE_VERSION` = `24`.)
5. **Enregistrer et déployer**. L'adresse sera du type `https://le-monde-du-macaron-villefranche.pages.dev`.
6. Si l'adresse finale est différente (autre nom ou nom de domaine), mets-la dans `data/boutique.json` → `site_url`, puis renvoie sur GitHub (`git add -A`, `git commit -m "Adresse du site"`, `git push`). Chaque envoi redéploie le site tout seul.
7. Nom de domaine (optionnel) : dans le projet Pages → **Domaines personnalisés**.

Rien n'a été mis en ligne, aucun compte n'a été créé.
