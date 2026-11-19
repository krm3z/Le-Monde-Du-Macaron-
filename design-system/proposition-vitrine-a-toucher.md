# « Vitrine à toucher » : proposition de refonte visuelle et de mouvement

Le Monde du Macaron, Villefranche-sur-Saône. Phase de proposition : je n'ai rien modifié dans le projet. Les chemins sont relatifs à `C:\Users\kerem\Documents\Le-Monde-Du-Macaron`.

## 0. D'où on part (relevé dans les fichiers et les captures)

- **Les photos rendent le site plat.** Les 77 photos de macarons ont leur propre fond dégradé gris-bleu, qui n'est ni #FFFFFF ni #F4F4F2. Le site les agrandit de `scale(1.25)` à `scale(1.5)` pour cacher ce fond, sans y arriver : on voit des carrés gris partout.
- **Les 8 détourés sont trop petits et gardent leur ombre.** L'ombre de la photo reste visible sous vanille et violette. Ils ne font que 305 à 416 px de large, parce que `detoure()` réduit l'image à 700 px puis à 480 px au maximum, alors que les sources font 1000 px.
- **Calissons** : les photos font 294 × 316 px, sur ardoise sombre. On ne peut pas les afficher à plus de 150 à 200 px CSS, et sur fond blanc elles font des trous noirs.
- **Litchi et Rose** n'ont pas de photo : le réseau n'a fourni que son logo.
- **Accueil** : la vitrine est une figure encadrée de 8 petits macarons, posée à côté d'une colonne de texte classique. Les 8 mêmes parfums (`mis_en_avant`) sont répétés juste en dessous dans « Quelques parfums ».
- **Nos macarons sur téléphone** :
  - une carte par ligne : la capture fait **42 283 px** de haut ;
  - toute la carte est un `<button>` qui contient le recto et le verso, donc son nom lu par les lecteurs d'écran est très long ;
  - la barre de filtres collante utilise `backdrop-filter: blur()`, qui coûte cher au défilement.
- **La boutique** :
  - l'encart du plan dessine des **rues inventées** avec l'étiquette « Rue Nationale » : c'est une fausse carte ;
  - `Math.round(4.6)` affiche 5 étoiles pleines.
- **Bandeau** : animation CSS de 70 s **sans bouton pause**, alors que le critère WCAG 2.2.2 en demande un. Les vignettes rondes sont découpées dans les photos à fond gris.
- **Restes des versions précédentes** :
  - la classe `section--beige` n'existe pas dans le CSS ;
  - la variable `var(--choco-doux)` n'existe pas ;
  - `h1 em` est neutralisé ;
  - des labels « eyebrow » en capitales sont sur chaque page ;
  - des textes sont écrits en dur dans les pages (chapô et note du plan de La boutique, 404, mentions), alors qu'ils devraient être dans `boutique.json`.
- **Captures** : celles de Coffrets, 404 et Mentions datent de l'ancienne palette crème/olive. Il faudra les refaire.

## 1. Nom et idée directrice

**« Vitrine à toucher ».** Le site reprend ce qu'on voit en entrant au 885 rue Nationale : des macarons rangés sur des étagères de verre, une étiquette par parfum, un comptoir où on vous les montre. La différence, c'est qu'ici on peut les prendre, les faire glisser et les retourner. Toute la mise en page repose sur une seule ligne, l'étagère, où les objets se posent et les textes s'alignent ; la seule couleur qui change vient des macarons eux-mêmes, mesurée dans leurs photos et jamais inventée. Ce concept ne se transpose pas à un autre commerce : un macaron est un petit objet rond qu'on choisit à l'œil, d'après sa couleur, derrière une vitre, et cette boutique est d'abord une vitrine de centre-ville, pas une marque abstraite.

## 2. Système visuel global

### 2.1 Grille et mise en page
- **Grille**
  - 12 colonnes à partir de 1024 px : contenu de 1320 px au maximum, marges `clamp(20px, 4.5vw, 72px)`, gouttière de 24 px.
  - 8 colonnes de 640 à 1023 px : gouttière de 20 px.
  - 4 colonnes sous 640 px : gouttière de 16 px, marges de 20 px.
  - Rythme vertical sur une base de 8 px : sections `padding-block: clamp(72px, 10vw, 160px)`, étiquette à 12 px sous l'étagère, 32 px entre deux rangées.
- **Règle de l'étagère** : chaque objet (macaron, calisson) est posé sur un filet et son pied touche la ligne. Les rangées d'objets s'alignent par le bas (`align-items: end`), jamais au centre d'une case. Les titres de page sont posés sur la même ligne (filet à 0,1 em sous la ligne de base).
- **Le texte n'est jamais centré.** Il commence en colonne 1 (colonne 2 pour un chapô en retrait) et s'arrête à 62 caractères (62 ch) pour le texte courant, 34 ch pour un chapô.
- **Asymétrie par alternance** : une section sur deux, les objets débordent jusqu'au bord droit de l'écran, pendant que le texte reste dans la grille.
- **Superposition** : un objet peut chevaucher la limite entre deux sections (les macarons du comptoir sont posés sur la frontière blanc/gris). Un texte, jamais.
- **Plus de boîtes** : on supprime les cartes à bordure et les ombres de boîte, et on regroupe avec des filets et de l'espace. Rayon de 2 px sur les boutons et les champs, 0 ailleurs (au lieu de 6 px partout).
- **Cadrages** : les rangées d'objets peuvent être coupées par le bord de l'écran (bandeau, réglette) pour faire sentir qu'il y en a d'autres. Les photos carrées d'origine ne s'affichent plus avec leur fond gris.

### 2.2 Typographie

| Rôle | Police | Taille (375 → 1440 px) | Interlignage, approche |
|---|---|---|---|
| Enseigne (h1 de l'accueil) | Playfair Display 500 | `clamp(3.1rem, 1.6rem + 6.4vw, 8.25rem)`, de 50 à 118 px environ | 0,95 ; −0,025em ; une ligne dès 1024 px |
| Titre de page (h1) | Playfair 500 | `clamp(2.6rem, 1.9rem + 3.6vw, 5.25rem)`, de 44 à 82 px | 1,0 ; −0,02em |
| Titre de section (h2) | Playfair 500 | `clamp(1.9rem, 1.5rem + 1.9vw, 3.25rem)`, de 31 à 51 px | 1,08 ; −0,015em |
| Texte « encre » (Coffrets) | Playfair 500 | `clamp(1.6rem, 1.2rem + 2vw, 3rem)` | 1,22 |
| Nom de parfum | Playfair **400 italique** | `clamp(1.0625rem, .95rem + .45vw, 1.375rem)` | 1,15 |
| Chapô | Inter 400 | `clamp(1.0625rem, 1rem + .35vw, 1.25rem)` | 1,6 ; #322C29 ; 34 ch |
| Texte | Inter 400 | 1,0625rem (17 px) | 1,65 ; 62 ch ; `text-wrap: pretty` |
| Méta (catégorie, « relevé le ») | Inter 400 | 0,8125rem | 1,4 ; #5F5955 |
| Boutons, filtres | Inter 600 | 0,9375rem | 1 ; +0,005em |
| Chiffres | Inter `tabular-nums` pour les horaires et le téléphone ; Playfair `lining-nums` pour 4,6 et 719 | | |

- **L'italique Playfair n'a qu'un sens : c'est un nom de parfum.** On le trouve sur les étiquettes, dans le bandeau, au verso des cartes et dans la liste des salés. Jamais dans un titre, jamais en couleur.
- **Suppressions** : plus aucun label en capitales espacées, et `text-wrap: balance` sur tous les titres.
- **Fichiers de police** : 4 woff2 en latin (Playfair 500 et 400 italique, Inter 400 et 600). On remplace le `latin-500-italic` actuel et on ne précharge que Playfair 500 et Inter 400.
- **Polices de repli** : l'API `fonts` d'Astro 7 (fournisseur `local` sur les woff2 de `@fontsource`, option `optimizedFallbacks`) génère des polices de repli Georgia et Arial recalées sur les vraies, ce qui limite le saut au chargement. Les détails sont à caler sur la doc de la version installée.

### 2.3 Photos : une chaîne de fabrication d'« objets »

**Au build, dans `scripts/photos.mjs`, à partir des sources de 1000 px :**
1. **Détourage des 77 macarons photographiés**, et non plus 8 seulement. On garde le remplissage depuis les bords qui existe déjà, mais à la taille d'origine.
2. **Retrait de l'ombre de la photo.** Sous la ligne du pied, les pixels gris peu saturés (chroma OKLCH < 0,035, L > 0,55) reliés au fond deviennent transparents.
3. **Anti-halo.** Sur les pixels semi-transparents du bord, on remplace la couleur par la moyenne des pixels opaques voisins (rayon de 2 px). Sinon, un liseré blanc apparaît sur le noir.
4. **Recadrage au ras du pied** : 0 px sous le macaron, 4 px ailleurs. Posé sur un filet, il le touche vraiment.
5. **Fichiers produits** : `public/photos/objets/<nom>-{160,320,480,640}.webp`, qualité 80, `alphaQuality` 90, de 4 à 18 Ko environ.
6. **Mesure de la couleur.** On fait un histogramme des teintes OKLCH sur les pixels opaques (0,2 < L < 0,95), pondéré par la chroma. On en tire :
   - `teinte` : la couleur dominante ;
   - `voile` : la même teinte en très pâle (L 0,965, C ≤ 0,03), pour les fonds ;
   - `ombre` : la même teinte en foncé (L 0,32, C ≤ 0,05, alpha 0,3). Une vraie ombre près d'un objet coloré est légèrement colorée ;
   - `h`, `c`, `l` : les valeurs numériques, pour trier.

   Tout est écrit dans `src/generated/photos.json`. On peut corriger une couleur à la main avec un champ `couleur` facultatif dans `produits.json`.
7. **Planche de contrôle** : `scripts/planche-detourage.html`, non publiée, montre chaque détouré sur blanc, sur gris et sur noir, avec sa pastille de couleur.
   - Les réglages au cas par cas (tolérance, « garder l'ombre », exclusion) vont dans `assets/photos/reglages.json`.
   - Si un détourage échoue, on revient à la photo en cercle.

**Traitement à l'écran**
- **Détourés** : posés sur blanc, sur gris ou sur leur voile.
  - L'ombre de contact est faite en CSS (`.objet__ombre` : ellipse `radial-gradient(closest-side, var(--ombre), transparent)`, 80 % de la largeur, 12 % de la hauteur, centrée sous le pied).
  - Elle rétrécit et pâlit quand on soulève l'objet.
  - Jamais de `filter: drop-shadow`, trop coûteux sur 94 images.
- **Calissons** : uniquement sur l'ardoise (#1B1A19), à 200 px CSS au plus, avec un masque `mask-image: radial-gradient(closest-side, #000 70%, transparent)` qui fond le fond d'ardoise de la photo dans le noir.
- **Litchi et Rose** : profil de macaron dessiné au trait (SVG, 1,5 px, #5F5955) avec la mention « Photo à venir ».
- **Révélations d'images** : par `clip-path: inset()`, jamais de flou.

### 2.4 Éléments graphiques maison

| Élément | Dessin | Rôle |
|---|---|---|
| L'étagère | Élément réel `.etagere__verre` : filet de 1 px #D7D3CF, avec en dessous un dégradé de 6 px `rgb(50 44 41 / .07)` (le chant d'une tablette de verre) | Structure toutes les pages ; les objets et les titres s'y posent |
| L'étiquette | Nom en Playfair italique et une ligne en Inter 13 px #5F5955, alignés sur le bord gauche de l'objet, sans cadre | Nommer un parfum, de la même façon partout |
| Le fil | Trait fuchsia de 2 px sous le mot | Seul indicateur d'état actif : menu, filtre, sommaire des mentions |
| Le macaron-repère | `#macaron-mark` redessiné en profil : deux coques, la ganache, la collerette en petit zigzag | Repère du plan, favicon, image « Photo à venir » |
| Le semainier | 7 barres d'horaires sur un axe de 7h à 20h | Lire les horaires d'un coup d'œil |
| Le plan | Vraies rues autour du 885, figées en SVG depuis OpenStreetMap | Remplace la fausse carte |
| La réglette | Macarons détourés tournés de 90° et serrés côte à côte (une boîte longue vue de dessus) | Évoquer le coffret sans dessiner d'emballage ni promettre de format |

Refusés : grain sur la page, rubans décoratifs, touches tricolores hors du logo, chiffres décoratifs, formes organiques.

### 2.5 Couleurs : où va quoi

| Couleur | Où | Jamais |
|---|---|---|
| #FFFFFF blanc | Fond principal, recto des cartes, la « nappe » de Mariages | — |
| #F4F4F2 gris | Le comptoir de l'accueil, les bandes alternées, la valeur de repos de `--voile` | Texte fuchsia posé dessus (4,2:1) : prendre #B01E6F (5,9:1) |
| #D72688 fuchsia | Boutons principaux (texte blanc, 4,65:1), fil actif, anneau de focus, soulignement des liens au survol, barre « aujourd'hui » et trait « maintenant » du semainier, repère et étoiles, indice « Allergènes » sur fond blanc | Grands aplats ; texte sur gris, sur noir ou sur une zone teintée |
| #B01E6F fuchsia foncé | Survol et appui des boutons ; texte fuchsia quand le fond n'est pas blanc | — |
| #1B1A19 noir | Toutes les surfaces sombres : en-tête, menu, pied de page, verso des cartes, bande ardoise des calissons | Le texte |
| #322C29 brun-noir | Tout le texte et les titres sur fond clair, la fin du remplissage « encre », les barres du semainier | Les surfaces : on n'empile plus deux noirs différents |
| #5F5955 | Méta, légendes, « relevé le… », profil « Photo à venir » | — |
| Couleurs des parfums (mesurées) | `--voile` en fond de section : #322C29 y garde au moins 12:1, #5F5955 au moins 6:1. `--ombre` sous l'objet | Texte, boutons, filets ; ce ne sont jamais des couleurs de marque |

- **Sur noir** : texte #FFFFFF et #D6D1CD (11,5:1).
- **Filets** : `rgb(50 44 41 / .14)` sur fond clair, `rgb(255 255 255 / .14)` sur noir.
- **Focus** : anneau fuchsia de 2 px, décalé de 3 px. Sur noir il fait 3,7:1, au-dessus du 3:1 demandé pour un élément qui n'est pas du texte. Sur l'ardoise, on le passe en blanc pour plus de netteté.

## 3. Système de mouvement global

### 3.1 Principe
**Au repos, la page est immobile. Elle ne bouge qu'en réponse au visiteur.**
- Seul le bandeau (demandé) bouge sans qu'on le touche.
- Tout le reste répond à un geste : défilement, survol, toucher, glisser.
- Une seule signature par page, au moment où elle a un sens.
- Les micro-interactions sont physiques (soulever, poser, retourner, freiner) et jamais décoratives : pas de flottement permanent, pas de pulsation.

### 3.2 Courbes et durées
```js
// src/scripts/socle/mouvement.js
CustomEase.create('pose',   'M0,0 C0.18,0.62 0.3,1.04 0.52,1.016 0.7,0.996 0.84,1 1,1'); // se pose : dépasse de 1,6 % puis se stabilise
CustomEase.create('glisse', 'M0,0 C0.12,0.72 0.22,1 1,1');  // glisse sur le verre et freine longtemps
CustomEase.create('rideau', 'M0,0 C0.7,0 0.2,1 1,1');       // ouvre et ferme : masques, clip-path, lignes de titre
```
```css
--e-pose: linear(0, .42 12%, .78 24%, .96 36%, 1.016 50%, 1.004 68%, 1); /* approximation de « pose » */
--e-glisse: cubic-bezier(.12,.72,.22,1);
--e-rideau: cubic-bezier(.7,0,.2,1);
--e-souffle: cubic-bezier(.4,0,.2,1);   /* couleurs, fondus */
--t-appui: 120ms; --t-survol: 220ms; --t-ui: 420ms; --t-apparition: 700ms; --t-titre: 950ms; --t-teinte: 700ms;
```
- Rien ne dure plus de 1,2 s, sauf les signatures (2,4 s au plus).
- Décalages entre éléments : de 40 à 110 ms.
- Tous les réglages (durées, vitesses, résistances) sont regroupés dans `src/scripts/socle/reglages.js`.

### 3.3 Apparitions selon le type de bloc
Toutes se déclenchent avec `ScrollTrigger.batch(sel, { start: 'top 85%', once: true })`.

| Bloc | Sélecteur | Mouvement | Durée, courbe, décalage |
|---|---|---|---|
| Titres h1, h2 | `[data-titre]` | `SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit })` ; les lignes montent de yPercent 105 à 0 | 950 ms `rideau`, 80 ms par ligne |
| Étagères | `.etagere__verre` | scaleX de 0 à 1 depuis la gauche | 800 ms `rideau` |
| Objets | `[data-objet]` | y de −24 à 0, rotation de ±4° à 0 ; ombre scaleX de 0,5 à 1, opacité de 0 à 0,3 | 600 ms `pose`, 70 ms |
| Textes | `[data-texte]` | opacité de 0 à 1, y de 8 à 0 | 700 ms `glisse`, 60 ms |
| Images, bandes | `[data-rideau]` | `clip-path` de `inset(0 0 100% 0)` à `inset(0)` ; l'image passe de scale 1,06 à 1 | 1 000 ms `rideau` |
| Listes (horaires, sommaire) | `[data-liste] > *` | opacité seule | 400 ms `souffle`, 40 ms |
| Rangées « défilé » et « rangement » | `[data-defile]` | x de −48 à 0 (ou de +24 à 0) | 800 ms `glisse`, 120 ms (ou 50 ms) |

### 3.4 Curseur, toucher, physique
- **Relief** (seulement avec un pointeur fin, via `gsap.matchMedia`)
  - Sur `pointermove`, on calcule la position du pointeur sur l'objet (nx, ny entre −1 et 1).
  - Inclinaison en `quickTo` (0,45 s, `power3`) : `rotationY = nx × 10°`, `rotationX = −ny × 8°`, `transformPerspective: 700`.
  - Un reflet `.objet__eclat` suit le pointeur (`--hx`, `--hy`). C'est un dégradé radial blanc à 40 %, en `mix-blend-mode: soft-light`, masqué par le détouré lui-même (`mask-image: var(--src)`) : la lumière glisse sur la coque.
  - L'ombre se décale de −nx × 4 px.
  - Quand le pointeur sort, tout revient en 600 ms (`pose`).
- **Couleur d'ambiance**
  - On déclare `@property --voile { syntax: '<color>'; inherits: true; initial-value: #F4F4F2 }`.
  - Survol (après 120 ms d'arrêt), focus ou glisser : la section prend le `voile` de l'objet, avec une transition CSS de 700 ms (`souffle`), sans JavaScript à chaque image.
  - Au départ du pointeur, la section revient à son fond après 400 ms, pour éviter le clignotement.
- **Appui au toucher** : `pointerdown` soulève l'objet (scale 1,04, y −4 px, ombre à 80 %, 120 ms) ; il se repose en 500 ms (`pose`).
- **Lancer** : Draggable + InertiaPlugin, avec `cursor: 'grab'`, `activeCursor: 'grabbing'`, `edgeResistance: .85`, `throwResistance` élevé (environ 2400, à régler), `maxDuration: 1.2` et une limite (`bounds`) toujours définie. Le détail est en 4.1.
- **Poids** : pendant le défilement, les objets des étagères visibles se balancent légèrement.
  - `self.getVelocity()` → variable `--balancement` (au plus ±3°, `quickTo` sur 0,5 s), écrite sur l'étagère et non sur `:root`.
  - Chaque objet a une enveloppe `.objet__balance { rotate: calc(var(--balancement) * var(--poids)) }`, avec `--poids` entre 0,6 et 1,2.
- **Liens et boutons** : le soulignement de 1 px se trace de gauche à droite en fuchsia (`background-size` de 0 à 100 %, 220 ms). Les boutons passent de #D72688 à #B01E6F et descendent de 1 px à l'appui.
- **Refusés** : curseur personnalisé, boutons « magnétiques », grain, effets de parallaxe gratuits, écran de chargement.

### 3.5 Transitions entre pages
Le site reste multipage. On utilise les View Transitions natives entre documents (`@view-transition { navigation: auto }`, déjà en place) plutôt que le `ClientRouter` d'Astro : chaque page reste indépendante et on n'a aucune réinitialisation de GSAP à gérer.
```css
.entete            { view-transition-name: entete; }   /* la bande ne clignote pas */
.entete__fil       { view-transition-name: fil; }      /* le trait fuchsia glisse vers le nouveau lien */
.page-tete h1      { view-transition-name: titre; }
.page-tete .objet  { view-transition-name: temoin; }   /* le macaron de l'en-tête se transforme d'une page à l'autre */
::view-transition-old(root) { animation: 180ms var(--e-rideau) both vt-sortie; } /* fondu et 8 px vers le haut */
::view-transition-new(root) { animation: 320ms var(--e-glisse) 60ms both vt-entree; }
::view-transition-new(titre){ animation: 520ms var(--e-glisse) both titre-monte; } /* translateY(24px) → 0 */
::view-transition-group(fil)    { animation: 420ms var(--e-glisse); }
::view-transition-group(temoin) { animation: 650ms var(--e-pose); }
```
- **Le macaron témoin** : sur `pageswap`, le macaron choisi dans la vitrine de l'accueil reçoit `view-transition-name: temoin`. Il vole jusqu'à l'en-tête de la page suivante.
  - En option : vers sa propre carte, si l'URL vise `#parfum` et que la carte est visible au premier rendu (réglage sur `pagereveal`).
  - Environ 30 lignes de code.
- **Navigateurs** : fonctionne sur Chrome et Edge 126+ et Safari 18.2+ ; ailleurs, navigation normale.
- **Préchargement** : `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` dans `astro.config.mjs`, sur le même domaine uniquement. La page est prête quand on clique, ce qui donne des transitions instantanées.

### 3.6 Chargement et organisation du code
```
src/scripts/main.js            point d'entrée : socle, puis module de la page via import() selon body[data-page]
src/scripts/socle/             mouvement.js (gsap, ScrollTrigger, CustomEase, SplitText, Lenis, gsap.matchMedia)
                               apparitions.js · teinte.js · relief.js · horaires.js · entete.js · transitions.js · reglages.js
                               objets.js (Draggable + Inertia), chargé en requestIdleCallback ou au premier pointerdown
src/scripts/pages/             accueil.js · macarons.js (+ Flip) · coffrets.js · boutique.js (+ DrawSVG) · erreur.js
src/components/                Objet · Etagere · Etiquette · Bandeau · Carte · Semainier · Statut · Plan (.astro)
```
- **Budget JS** (gzip, valeurs approximatives à vérifier sur `dist/_astro`) :
  - socle : environ 60 Ko (gsap 27, ScrollTrigger 18, SplitText 4, CustomEase 3, Lenis 4, code du site 5) ;
  - Flip : environ 8 Ko ;
  - Draggable et Inertia : environ 20 Ko ;
  - DrawSVG : environ 2 Ko.
  - Règle : 70 Ko au plus avant toute interaction, 95 Ko au plus ensuite.
- **Plugins écartés volontairement** : ScrollSmoother (Lenis fait déjà le défilement doux), MorphSVG, Physics2D (Inertia suffit), Observer en fichier séparé (on passe par `ScrollTrigger.observe`).
- **Débogage** : `?reperes` affiche les repères de ScrollTrigger en développement.

### 3.7 prefers-reduced-motion
Tout est déclaré dans `gsap.matchMedia()` avec deux conditions, `mouvement` et `reduit`. Si le réglage change, tout est annulé et reconstruit automatiquement.

| Élément | Mouvement normal | Mouvement réduit |
|---|---|---|
| Lenis | actif (`lerp: .1`) | désactivé |
| Apparitions | selon le type de bloc | opacité de 0 à 1 en 400 ms |
| Arrivée de l'accueil | arc, pose, puis le nom se lève | macarons puis nom en fondu (400 ms, 40 ms d'écart), dans le même ordre |
| Glisser, lancer, relief, balancement | actifs | désactivés ; sélection au clic et au clavier |
| Bandeau | défile, ralentit | immobile ; liste qu'on fait défiler au doigt ou au clavier |
| Couleur d'ambiance | 700 ms | 200 ms |
| Filtre (Flip) | les cartes glissent | fondu de 300 ms |
| Retournement de carte | rotation 3D | fondu croisé recto/verso de 300 ms |
| Mise en boîte | scène collante pilotée par le défilement | réglette finale, fixe |
| Texte « encre » | se remplit au défilement | déjà rempli en #322C29 |
| Compteur, plan | compte jusqu'à 719 ; tracé | 719 affiché ; plan en fondu de 400 ms |
| View Transitions | titre, fil, témoin | fondu de 150 ms sur la page seulement |

## 4. Page par page

### 4.0 Commun : en-tête, menu, pied de page, statut
- **En-tête `.entete`** (remplace la pilule flottante, motif typique des modèles tout faits) :
  - bande noire pleine largeur de 64 px (56 px sous 960 px), comme le bandeau du site du réseau ;
  - logo blanc de 34 px de haut ; liens en Inter 400, blanc à 80 % ;
  - lien actif marqué par `.entete__fil` ;
  - à droite, un bouton fuchsia avec le numéro « 04 74 67 68 35 » ; sous 960 px, un bouton icône « Appeler » de 44 × 44 et « Menu » ;
  - la bande disparaît quand on descend (après 240 px) et revient quand on remonte (300 ms `glisse`).
- **Menu téléphone** :
  - panneau noir plein écran, qui s'ouvre de `clip-path: inset(0 0 100% 0)` à `inset(0)` (450 ms `rideau`) ;
  - liens en Playfair 2,2rem blancs qui montent depuis un masque (600 ms, 50 ms d'écart) ;
  - en bas : statut, adresse et bouton « Appeler » ;
  - pendant l'ouverture, `inert` sur `main` et `footer` ; Échap ferme le menu et le focus revient au bouton.
- **Pied de page `.pied`** :
  - noir ; son bord supérieur est la dernière étagère du site ;
  - les 8 macarons de la vitrine, en miniature de 36 px, s'y posent une fois (`pose`, 60 ms d'écart) ;
  - 4 colonnes : adresse et statut, horaires, réseaux, liens légaux ;
  - on garde « Aucun cookie, aucun suivi. » et le crédit.
- **Statut du jour** (`socle/horaires.js`) :
  - calcul : heure de Paris (`Intl.DateTimeFormat` avec `timeZone: 'Europe/Paris'`) et horaires de `boutique.json` ;
  - priorités :
    1. une date listée dans `fermetures_exceptionnelles` affiche son propre texte ;
    2. un jour férié (11 dates calculées, Pâques par l'algorithme de Meeus) affiche « Jour férié : horaires à confirmer par téléphone » ;
    3. sinon : « Ouvert · ferme à 19h », « Ferme bientôt · 19h » ou « Fermé · ouvre lundi à 8h » ;
  - sans JavaScript, la page affiche les horaires groupés ;
  - la ligne a une hauteur fixe et se met à jour chaque minute quand l'onglet est visible ;
  - les modèles de phrases sont dans `textes.statut`.

### 4.1 Accueil
**Sections, dans l'ordre**
1. **Le comptoir** (héros, `section.comptoir`)
   - `h1.comptoir__enseigne` affiche `boutique.nom`.
   - Une étagère en `role="tablist"` porte 8 `button.objet[role=tab]` (les produits `mis_en_avant`), en 480w, avec ombre et reflet. Sans JavaScript, c'est une simple liste de liens.
   - Sous l'étagère, le plan de travail gris en pleine largeur, en 3 colonnes :
     - l'étiquette du parfum choisi (`role=tabpanel`) : nom en italique, description, lien « Description et allergènes » vers `/nos-macarons/#id` ;
     - le statut, l'adresse et le téléphone ;
     - les boutons « Voir les macarons » et « Itinéraire », et la ligne « 4,6/5 sur Google · 719 avis, relevé le 19 novembre 2026 ».
2. **Le bandeau** (demandé)
   - Tous les macarons photographiés, **rangés par couleur** (`h` mesuré), défilent de droite à gauche sur une étagère, chacun suivi de son nom en italique.
   - Les éléments ne sont pas focusables ; un lien « Toute la carte » suit le bandeau.
   - Bouton pause à droite.
3. **Sucrés, salés et calissons** : trois bandes-liens.
   - Sucrés : sur blanc, 4 détourés.
   - Salés : sur gris, les 11 noms en italique à la suite, plus 2 détourés.
   - Calissons : sur l'ardoise, 3 photos masquées.
   - Les comptes (68, 11, 15) sont calculés. Les liens `/nos-macarons/#sucres`, `#sales` et `#calissons` présélectionnent le filtre.
4. **Coffrets et commandes** (fond gris) : la réglette de 12 macarons en pleine largeur, puis `intro_coffrets` et les 3 événements en grands liens (titre et sous-titre).
5. **Venir à la boutique** (fond blanc) : adresse en Playfair, statut, semainier compact, boutons Itinéraire et Appeler. Le titre est déplacé dans `boutique.json`.

**Signature : « La vitrine se garnit »**. Démarre au chargement, sans attendre `load`. On attend `document.fonts.ready` 400 ms au plus avant de découper l'enseigne.

| Temps | Ce qui se passe | Détail | Outil |
|---|---|---|---|
| 0 ms | État de départ | Le comptoir et ses textes sont déjà affichés ; les macarons sont cachés juste au-dessus de leur place ; l'enseigne est cachée dans ses lignes masquées | CSS `.js` |
| 0 → 500 | Le verre de l'étagère se trace | `.etagere__verre` scaleX de 0 à 1, `rideau` | gsap |
| 150 + 110 × i | Le macaron i arrive, de gauche à droite | En arc, sur 620 ms : x de +60 à 0 (`glisse`), y de −90 à 0 (`pose`), rotation de −12° à 0 (`glisse`), opacité de 0 à 1 (150 ms). Donner une courbe différente à x et à y suffit à courber la trajectoire, sans MotionPathPlugin | gsap, CustomEase |
| Contact (environ +340 ms) | Il se pose | scaleY 0,97 et scaleX 1,015 pendant 80 ms, puis retour en 220 ms (`pose`). L'ombre s'est resserrée pendant la descente (scaleX de 0,4 à 1, opacité de 0 à 0,3) | gsap |
| Environ 1 300 | Le nom apparaît, après le 8e contact (environ 1 260 ms) | SplitText en lignes masquées, yPercent de 105 à 0, 950 ms `rideau` | SplitText |
| Environ 1 500 | Le comptoir se remplit | statut, adresse, boutons : opacité de 0 à 1, y de 10 à 0, 600 ms `glisse`, 70 ms d'écart | gsap |
| Environ 2 100 | La vitrine s'éclaire | Le premier onglet est sélectionné ; `--voile` passe du gris à la teinte pâle de ce parfum en 700 ms | CSS `@property` |
| Environ 2 400 | Repos | `objets.js` se charge en tâche de fond ; plus rien ne bouge tout seul | `import()` |

**Micro-interactions**
- **Survol** : le macaron se soulève de 6 px, avec relief, reflet et couleur d'ambiance.
- **Sélection** : par clic, Entrée ou flèches. La vitrine se comporte comme des onglets : un seul arrêt de tabulation, flèches pour passer d'un macaron à l'autre, Début et Fin. L'ancienne étiquette sort (opacité, y −4, 160 ms) et la nouvelle entre (y de 6 à 0, 260 ms).
- **Glisser** : en x et y sur ordinateur (`bounds` = le comptoir), en x seulement sur téléphone (le geste vertical reste au défilement).
  - Pendant le glisser, l'inclinaison suit la vitesse (`InertiaPlugin.getVelocity`, ±12° au plus).
  - Au lâcher, l'élan le fait glisser sur le comptoir et `snap: { y: () => 0 }` le fait retomber sur l'étagère.
  - Après 1,5 s sans contact, il revient à sa place (800 ms `glisse`). L'ordre du code ne change jamais.
- **Bandeau**
  - Au survol ou au toucher, `timeScale` passe de 1 à 0,15 en 600 ms, et revient en 900 ms.
  - On peut l'attraper et le lancer : un Draggable sur un élément fantôme, avec inertie, pilote `progress()` de la boucle.
  - Le geste horizontal du trackpad le fait avancer (`ScrollTrigger.observe({ type: 'wheel', onChangeX })`).
  - Il accélère brièvement avec la vitesse de défilement de la page (×3 au plus, retour en 800 ms).
  - Il se met en pause hors de l'écran ; le parfum survolé teinte le bandeau.
  - La boucle utilise le helper `horizontalLoop` de GSAP : chaque élément boucle seul, sans piste géante à faire composer par la carte graphique.
- **Familles** : les bandes s'ouvrent en `clip-path` et leurs objets se posent ; au survol, la bande prend la couleur de l'objet.
- **Réglette** : « rangement » à l'apparition.

**Téléphone**
- Deux étagères de 4 macarons de 74 px.
- L'enseigne sur deux lignes (environ 50 px).
- Le comptoir sur une colonne, boutons en pleine largeur : le tout tient dans 812 px.
- Pas de relief : on se contente de l'appui.
- Bandeau : objets de 64 px, 24 px/s.
- Sucrés : défilement horizontal en `scroll-snap`.

### 4.2 Nos macarons
**Sections, dans l'ordre**
1. **Tête de page** : h1, macaron témoin (`temoins.macarons`), chapô `intro_macarons`, comptes.
2. **Barre de tri** collante sous l'en-tête, fond blanc à 96 %, sans flou :
   - filtres segmentés : Tout 94, Sucré 68, Salé 11, Calissons 15 ;
   - ordre : « A → Z » ou « Par couleur » ;
   - champ « Chercher un parfum », qui ignore accents et majuscules ;
   - compte en `aria-live="polite"`.
3. **Catalogue** en trois sections titrées (« Macarons sucrés · 68 », etc.) :
   - étiquettes posées sur des étagères continues : 4 colonnes à partir de 1024 px, 3 en tablette, **2 sur téléphone** ;
   - calissons sur une bande ardoise en pleine largeur.
4. **`aussi_en_boutique`**.

**Structure d'une carte**
- `article.carte__corps` en grille : le recto et le verso occupent la même cellule. La carte prend la hauteur de la face la plus haute, donc une liste d'allergènes réelle ne débordera jamais.
- Le recto contient l'objet, le `h3.carte__nom` en italique et la méta.
- Le verso (#1B1A19) contient la description, « Allergènes » et sa valeur (`<Val>`).
- `button.carte__retourner[aria-expanded][aria-controls]` est placé hors de la partie qui tourne. Son `::after` couvre toute la carte : la toucher n'importe où la retourne.
- Sans JavaScript, le verso s'affiche sous le recto.

**Signature : « Le tri »** (clic sur un filtre ou un ordre, ou saisie avec 120 ms d'attente)

| Temps | Ce qui se passe | Détail | Outil |
|---|---|---|---|
| 0 ms | Capture | `Flip.getState('.carte, .famille__titre')`. On repère les cartes à moins de 200 px de l'écran, avant ou après le changement : seules elles seront animées, les autres sont placées directement | Flip |
| 0 → 420 | Le fil passe sous le nouveau segment | Flip sur `.tri__fil`, `glisse` | Flip |
| 0 → 360 | Les cartes qui partent | x −40, opacité 0, scale 0,96, `power2.in`, 12 ms d'écart | `onLeave` |
| 120 → 780 | Les cartes qui restent changent de place | `Flip.from(state, { targets: proches, duration: .66, ease: 'glisse', stagger: .01, prune: true, absoluteOnLeave: true })` | Flip |
| 240 → 900 | Les nouvelles sont « distribuées » | x de +56 à 0, rotation de 2° à 0, opacité de 0 à 1 ; 600 ms `glisse`, 18 ms d'écart | `onEnter` |
| 0 → 600 | Le compte défile | Nombre animé (`snap: 1`, `aria-hidden`) ; le texte lu par les lecteurs d'écran n'est mis à jour qu'à la fin | gsap |
| Filtre « Calissons » | La vitrine passe à l'ardoise | `data-ambiance="ardoise"` sur `.catalogue` : fond de #FFF à #1B1A19, texte de #322C29 à #FFF, en 500 ms | CSS |
| 900 | Fin | `ScrollTrigger.refresh()`. Si la grille est sortie de l'écran par le haut : `lenis.scrollTo(grille, { offset: -120, duration: .8 })` | Lenis |

« Par couleur » utilise le même Flip. Les cartes se rangent par `h` (chroma > 0,04), puis les bruns et beiges par `l`. La carte devient un dégradé de vrais macarons, utile pour assortir un mariage.

**Micro-interactions**
- **Survol** (120 ms d'arrêt) : relief de ±6°, objet soulevé de 4 px, le fond de la carte prend son voile. La couleur reste locale à la carte : sur 94 cartes, une couleur de page clignoterait.
- **Retournement** (Entrée, Espace, clic ou toucher), timeline de 750 ms :
  - la carte se soulève (scale 1,035, 180 ms) ;
  - rotationY de 0 à ±180° en 720 ms `pose`, dont le léger dépassement la fait « retomber » ;
  - à 90°, son ombre s'étire (scaleX 1,15, opacité 0,18) ;
  - elle tourne du côté où on l'a touchée ; Échap la remet à l'endroit.
- **Glisser pour retourner**
  - Au premier `pointerdown`, un Draggable `type: 'x'` est créé pour cette carte seulement, puis `startDrag(e)`.
  - dx pilote rotationY (dx / largeur × 180°).
  - Au lâcher, au-delà de 300 px/s la carte fait un demi-tour ; sinon elle retombe du côté le plus proche.
  - Le défilement vertical reste natif.
- **Arrivée depuis l'accueil (`#pistache`)** : défilement natif vers la carte (`scroll-margin-top: 140px`) ; les autres cartes passent à 35 % d'opacité pendant 1,2 s ; la carte visée se pose.
- **« Photo à venir »** : le profil se trace à l'apparition (DrawSVG, 900 ms).

**Téléphone**
- Deux colonnes avec un objet de 120 px : la page fait environ 10 000 px de haut au lieu de 42 283.
- La recherche est sur sa propre ligne et n'est pas collante.
- Flip n'anime qu'une dizaine de cartes.
- Pas de relief ; on retourne les cartes d'un glissé.

### 4.3 Coffrets & événements
**Sections, dans l'ordre**
1. **Tête de page** : h1 et témoin.
2. **Texte « encre »** (demandé) : `intro_coffrets`, découpé en mots `.w` côté serveur.
   - Dégradé `linear-gradient(90deg, #322C29 45%, #948C87 55%)`, `background-size: 225%`, qui passe de `background-position` 100 % à 0 %.
   - Piloté par le défilement (`scrub: .6`), de `top 80%` à `bottom 45%`, 0,08 d'écart entre les mots.
   - La couleur de départ #948C87 fait 3,3:1 sur blanc : le texte (au moins 24 px) reste lisible avant d'être rempli.
   - En contraste forcé : `.encre .w { color: CanvasText; background: none }`.
3. **La mise en boîte** : signature, qui contient les photos qui glissent (demandé).
4. **Les trois événements**, chacun dans une composition différente :
   - **Conscrits** : titre très grand en colonnes 1 à 7 ; les trois macarons du JSON entrent l'un après l'autre par la gauche (« défilé »), clin d'œil au défilé des classes ; texte et boutons en colonnes 9 à 12.
   - **Mariages** : bande grise, texte à gauche ; à droite, une « nappe » blanche bordée d'un filet qui s'ouvre depuis le centre (`clip-path` de `inset(0 50%)` à `inset(0)`, 900 ms `rideau`), puis les macarons s'y posent.
   - **Entreprises** : sobre, deux colonnes strictes, simple fondu.
   - Pour chacun : « Appeler » (`tel:`) et « Envoyer un mail » (objet `objet_mail`). Le repère « [À REMPLACER] » de l'adresse e-mail n'apparaît qu'une fois, en bas de page.

**Signature : « La mise en boîte »**
- La section fait 260svh (200svh sur téléphone).
- `.mise-en-boite__scene` est collante (`position: sticky; top: 0; height: 100svh`).
- ScrollTrigger avec `scrub: .8`.

| Défilement | Ce qui se passe | Détail | Outil |
|---|---|---|---|
| 0 → 45 % | Les deux rangs glissent sur le côté (demandé) | Rang A (10 objets de 120 px, au fond) : xPercent de +8 à −40. Rang B (10 objets de 160 px, devant) : de −40 à +8. `ease: 'none'`, filets fixes | ScrollTrigger |
| 30 → 70 % | 12 macarons quittent leur rang | x et y vers leur case de réglette (fonctions de l'index, `invalidateOnRefresh: true`), rotation de 0 à 90° (ils se mettent debout), scale 0,9 ; `rideau`, `stagger: { amount: .12, from: 'center' }`. Les autres sortent (x ±15vw, opacité 0) | gsap |
| 62 → 80 % | La réglette se resserre | Écart ×0,94 ; filets du haut et du bas tracés depuis le centre (`drawSVG` de `'50% 50%'` à `'0% 100%'`) | DrawSVG |
| 80 → 100 % | Légende | 3 liens vers `#conscrits`, `#mariages`, `#entreprises` : opacité de 0 à 1, y de 12 à 0 | gsap |

- Les 12 macarons de la réglette sont choisis dans `coffrets.reglette`.
- La scène est décorative (`aria-hidden`), sauf les liens de la légende.
- Le texte « encre » reste un effet discret, pas une deuxième signature.

**Téléphone** : rangs de 6 objets (90 et 120 px), réglette de 8 objets de 44 px qui peut être coupée par le bord droit, une seule colonne pour les événements.

**« Composer une boîte » : mon avis.** C'est à la limite du périmètre ; je ne le mets pas dans le socle.
- Je l'accepte en phase 2, sous le nom « Préparer une demande », **seulement sur Coffrets**, et à ces conditions :
  1. aucun prix, aucune quantité, aucun total, aucun format de boîte ;
  2. aucun pictogramme de panier, aucun compteur dans l'en-tête, rien qui persiste (l'état reste en mémoire et se perd en quittant la page) ;
  3. trois sorties seulement : « Appeler », « Envoyer un mail » (objet de l'événement choisi, liste des parfums dans le corps, modèles dans `boutique.json`) ou « Copier la liste » ;
  4. la phrase « Ceci n'est pas une commande : appelez ou écrivez à la boutique avec cette liste. » ;
  5. l'e-mail de la boutique doit être renseigné.
- Fonctionnement : on choisit l'événement (3 boutons), puis on touche des macarons sur une étagère qui défile (`aria-pressed`). Ils volent vers le plateau (Flip) ; on les touche à nouveau pour les retirer.
- Sur Nos macarons, ce serait un panier déguisé : non.

### 4.4 La boutique
**Sections, dans l'ordre**
1. **Tête de page** : h1, témoin, chapô (`textes.intro_boutique`, sorti du code de la page).
2. **Accès** : adresse en Playfair `clamp(1.8rem, 1.4rem + 1.6vw, 2.6rem)`, statut, boutons Itinéraire (fuchsia), Appeler et Écrire.
3. **Semainier** : un vrai `<table>` légendé « Horaires d'ouverture ».
   - À partir de 768 px : 7 colonnes, pistes verticales de 180 px pour l'axe 7h → 20h, barre #322C29 de 8h à 19h, le jour en cours en fuchsia, dimanche en pointillés « Fermé ».
   - Un trait « maintenant » fuchsia de 1 px traverse le jour en cours s'il est ouvert.
   - Sous 768 px : 7 lignes horizontales.
4. **Avis Google**
   - « 4,6 » en Playfair `clamp(3rem, 2rem + 4vw, 5.5rem)`.
   - 5 étoiles SVG **remplies à 92 %** (note / 5, via `clipPath`) : on n'arrondit plus 4,6 à 5 étoiles.
   - « 719 avis Google » compte (demandé) ; « Relevé le 19 novembre 2026 » ; lien vers les avis.
5. **Plan** : signature.
6. **`textes.contact_boutique`**, sorti du code de la page.

**Le plan réel**
- `scripts/plan.mjs` est lancé à la main une seule fois, hors du build. Environ 80 lignes :
  1. requête Overpass `way(around:420, lat, lon)[highway]; out geom;` ;
  2. projection locale ;
  3. simplification Douglas-Peucker (1,2 px) ;
  4. écriture de `src/generated/plan.svg`, un `<path>` par rue. Épaisseur selon le type : 7 px pour les grands axes, 4 px pour les rues résidentielles, 2 px en tirets pour les voies piétonnes.
- `.plan__nationale` est repérée par son nom et le repère est placé à `boutique.geo`.
- Le SVG est inséré dans la page (import `?raw`). Mention « © les contributeurs d'OpenStreetMap » (licence ODbL).
- Si le fichier manque, on affiche un cadre neutre avec le bouton, **jamais de fausses rues**.

**Signature : « Le plan se trace »** (déclencheur `top 75%`, une seule fois)

| Temps | Ce qui se passe | Détail | Outil |
|---|---|---|---|
| 0 ms | Le cadre apparaît en fondu (demandé) | opacité de 0 à 1, 600 ms | gsap |
| 100 → 1 300 | Les rues voisines se tracent | DrawSVG de 0 à 100 %, 900 ms `glisse`, 25 ms d'écart, trait #D7D3CF | DrawSVG |
| 700 → 1 700 | La rue Nationale se trace d'ouest en est | 4 px #322C29, 1 000 ms `rideau` ; son nom suit le tracé (`<textPath>`) en fondu | DrawSVG |
| 1 600 → 2 100 | Le repère se pose au 885 | y de −40 à 0, 500 ms `pose` ; un anneau s'ouvre une seule fois (r de 0 à 28, opacité de 0,5 à 0, 900 ms) | gsap |
| 2 000 → 2 400 | Le bouton « Afficher le plan interactif » et la note apparaissent | opacité | gsap |
| Au clic | Plan interactif | L'iframe OpenStreetMap est créée seulement maintenant. À `load` (ou au bout de 2,5 s au plus), elle passe de l'opacité 0 à 1 en 1 200 ms par-dessus le tracé, et le focus va sur elle | gsap |

**Micro-interactions**
- **Compteur** (déclencheur `top 85%`) : de 0 à 719 en 1 600 ms `glisse`, `snap: 1`. Le nombre animé est superposé à un « fantôme » invisible de 719 dans la même cellule de grille : la largeur ne bouge pas, rien ne tremble, aucun décalage de mise en page. Il est `aria-hidden`, avec un texte `sr-only` pour les lecteurs d'écran.
- **Étoiles** : contours tracés en 500 ms, puis remplissage de 0 à 92 % en 600 ms.
- **Semainier** : les barres grandissent (scaleY de 0 à 1, 700 ms `glisse`, 50 ms d'écart).

**Téléphone** : plan au format 4:5 (rayon de 300 m), boutons en pleine largeur, semainier en lignes.

### 4.5 Mentions légales
- h1 en lignes masquées.
- À partir de 1024 px, deux colonnes : un sommaire collant (6 entrées) dont le fil fuchsia suit la section en cours de lecture (ScrollTrigger `onToggle`, 300 ms `glisse`), et le texte sur 62 caractères de large. Sous 1024 px, le sommaire est dans un `<details>`.
- **Pas de signature**, pas d'objet, pas de couleur d'ambiance : c'est une page de lecture.
- Les textes passent dans `mentions_legales.textes` ; les repères « [À REMPLACER] » restent visibles.

### 4.6 404
- **Composition** : « 4 [macaron] 4 » en Playfair `clamp(5rem, 3rem + 10vw, 11rem)`. Le 0 est la pistache détourée, posée sur une étagère. Les textes passent dans `textes.erreur_404`.
- **Signature : « Le macaron échappé »**
  - Au chargement, la pistache revient en culbutant depuis la droite : x de +55vw à 0, rotation de 420° à 0, 1 100 ms `glisse`, puis `pose`.
  - On peut la lancer : Draggable et Inertia, `bounds` = la section.
  - En vol, sa rotation suit la distance parcourue (environ 0,6° par px), comme un objet qui culbute.
  - 1,5 s après l'arrêt, elle revient à sa place (900 ms).
  - Elle est décorative (`aria-hidden`) : les deux boutons restent la vraie sortie.
- **Téléphone** : lancer en x seulement.

## 5. Risques et parades

### Performance sur un téléphone moyen

| Risque | Parade |
|---|---|
| JavaScript trop lourd | Code découpé par page (3.6) ; Draggable et Inertia chargés à la demande ; Flip et DrawSVG seulement sur leur page ; mesure en gzip de `dist/_astro` à chaque étape |
| Nombre d'images | `srcset` en 160/320/480/640 avec des `sizes` exacts. `loading="lazy"` partout, sauf les 4 premiers macarons du comptoir (`fetchpriority="high"` et préchargement). Environ 150 Ko d'images au premier écran de l'accueil. Le catalogue se charge au fil du défilement (8 à 12 Ko par carte en 320w) |
| Compositing (calques, mémoire GPU) | Uniquement `transform` et `opacity`. `will-change` posé par GSAP pendant l'animation seulement. Aucun `backdrop-filter`, aucun `filter` animé, ombres en dégradé. Moins de 40 calques, vérifié dans le panneau Layers de DevTools |
| Thread principal | Rien ne tourne à chaque image au repos. Le bandeau se met en pause hors de l'écran et quand l'onglet est caché. Relief en `quickTo` sur `pointermove` seulement ; balancement seulement pour les étagères visibles. `ScrollTrigger.batch` ; SplitText sur les titres seulement |
| Scène collante sur téléphone | CSS `sticky` en unités `svh` plutôt que `pin` ; `ScrollTrigger.config({ ignoreMobileResize: true })` ; positions calculées en fonctions avec `invalidateOnRefresh` |
| LCP (le nom doit attendre les macarons) | Séquence serrée : nom visible dès 1,3 s ; pas d'attente de `load` ; détourés préchargés. Si le LCP mobile dépasse 2,5 s : variante « filigrane » où le nom est affiché dès le départ en #EEECEA puis s'encre en 900 ms, ce qui fixe le LCP au premier rendu |

### Accessibilité

| Risque | Parade |
|---|---|
| Interactions réservées au glisser | Glisser n'est jamais nécessaire : la vitrine est une liste d'onglets, chaque carte a un bouton, tout l'essentiel est en liens |
| Mouvement automatique | Bouton pause sur le bandeau (WCAG 2.2.2), pause hors écran, `prefers-reduced-motion` (3.7) |
| Contrastes | Texte fuchsia sur blanc uniquement ; départ de l'« encre » à 3,3:1 sur du texte d'au moins 24 px ; voiles à L 0,965 ; règles de focus (2.5) ; repli en contraste forcé |
| Sémantique | Onglets (vitrine), bouton `aria-expanded` (cartes), `<table>` (semainier), compteurs `aria-hidden` avec texte `sr-only`, `inert` pour le menu, SplitText en `aria: 'auto'`, ordre du code identique à l'ordre visuel |

### Décalages de mise en page (CLS)
- `width`, `height` et `aspect-ratio`, tirés du manifeste, sur toutes les images.
- Polices de repli recalées ; SplitText après `document.fonts.ready` (et `autoSplit`).
- Compteur avec fantôme ; ligne de statut sur une seule ligne de hauteur fixe.
- Les animations Flip ne suivent qu'un clic (exclues du calcul du CLS) ; aucune bannière injectée.
- Objectif : moins de 0,02.

### Maintenance par un étudiant
- **Code** : un fichier par sujet, commentaires en français. En tête de chaque module : ce qu'il fait, où, et ce qui se passe en mouvement réduit. Tous les réglages dans `reglages.js`.
- **Documentation** : `design-system/MASTER.md` reprend les tableaux 2.2, 2.5, 3.2 et 3.3.
- **Dépendances** : aucune ajoutée côté navigateur. La conversion OKLCH s'écrit à la main (environ 20 lignes), ou avec `culori` uniquement au build.
- **Détourages ratés** : la planche de contrôle, `reglages.json` et le repli en cercle.
- **Fonctions récentes** (View Transitions entre documents, `@property`, `linear()`, `mask`) : toutes en amélioration progressive. Sans elles : fondu simple, couleur sans transition, `cubic-bezier`, image sans reflet.
- **Ordre de réalisation**, chaque étape testable seule :
  1. socle (jetons CSS, typographie, en-tête et pied, apparitions, mouvement réduit) ;
  2. chaîne photo (détourage, couleurs, planche) ;
  3. Accueil ;
  4. Nos macarons ;
  5. Coffrets ;
  6. La boutique, avec `plan.mjs` ;
  7. transitions, 404, Mentions, nouvelles captures, Lighthouse ;
  8. en option : « Préparer une demande ».

### Respect strict des contraintes
- **Rien d'inventé** :
  - le statut tient compte des jours fériés et de `fermetures_exceptionnelles`, avec des formulations prudentes ;
  - la note Google est datée ; aucun prix ;
  - le plan vient de données réelles ; la réglette n'indique aucun format ;
  - tous les textes, anciens et nouveaux, sont dans le JSON.
- **Aucun tiers** :
  - le plan est figé au build, depuis un script lancé une fois à la main ;
  - l'iframe OpenStreetMap ne se charge qu'au clic ;
  - polices locales ; préchargement des pages sur le même domaine seulement.
- **Pas de débordement horizontal** : `overflow-x: clip` sur les scènes et le bandeau, `bounds` sur chaque Draggable, et le test `document.documentElement.scrollWidth === innerWidth` à 375, 768, 1024 et 1440 px.
- **Nouveaux champs JSON**
  - `boutique.json` :
    - textes : `textes.intro_boutique`, `textes.venir_titre`, `textes.familles_titre`, `textes.carte_conseil`, `textes.recherche_vide`, `textes.bandeau_pause` et `textes.bandeau_reprendre`, `textes.plan_bouton` et `textes.plan_note`, `textes.contact_boutique`, `textes.erreur_404`, `textes.statut.*`, `mentions_legales.textes` ;
    - données : `fermetures_exceptionnelles: []`, `accueil.familles.{sucres, sales, calissons}`, `coffrets.reglette`, `temoins.{macarons, coffrets, boutique, 404}`.
  - `produits.json` : `couleur` et `objet: false`, tous deux facultatifs.
  - Fichiers générés : `photos.json` (champ `objet`) et `plan.svg`.
- **Ce qu'aucune animation ne remplacera** : de vraies photos de la façade et du salon de thé, l'e-mail de la boutique et la liste des allergènes. C'est à demander à la gérante.

## 6. Les 5 idées les plus fortes, classées

1. **La chaîne « objet »** : 77 macarons détourés proprement (ombre retirée, sans liseré, recadrés au ras du pied), avec leur couleur mesurée. Les carrés gris disparaissent, chaque macaron devient un objet qu'on peut poser, soulever et lancer, et la couleur des parfums pilote l'ambiance sans qu'on invente une seule couleur.
2. **Le comptoir de l'accueil** : les macarons arrivent en arc et se posent avec leur ombre, puis l'enseigne se lève. Ensuite on peut les prendre et les lancer : ils retombent sur l'étagère, reviennent à leur place, et le comptoir prend la couleur du parfum choisi.
3. **Nos macarons** : une carte en étiquettes sur étagères, environ 4 fois plus courte sur téléphone, triable par couleur (un dégradé de vrais macarons). Les cartes se retournent du côté où on les touche, ou d'un glissé avec élan. Les calissons sont présentés sur ardoise.
4. **La mise en boîte (Coffrets)** : les rangs de macarons glissent sur le côté comme demandé, puis se rangent debout en réglette. C'est l'image d'un coffret, sans dessiner d'emballage ni promettre de format.
5. **La boutique, vraie** : un plan tracé depuis les vraies rues d'OpenStreetMap à la place de la fausse carte, un semainier avec un statut « ouvert/fermé » qui gère les jours fériés, des étoiles exactes (4,6) et un compteur 719 qui ne tremble pas. En prime, le macaron témoin passe d'une page à l'autre grâce aux View Transitions.