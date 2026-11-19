# « Derrière la vitrine » : proposition de direction artistique et de mouvement

## 0. Point de départ

J'ai vérifié chacun de ces points dans les fichiers et les captures.

- **Un site propre mais construit en blocs identiques.** Chaque page suit le même schéma : un titre, un paragraphe, puis une grille de carrés gris (le fond gris-bleu des packshots). On y trouve aussi tout ce qui fait « modèle » :
  - un label « eyebrow » sur presque chaque page (« LA CARTE », « SUR MESURE », « NOUS TROUVER ») ;
  - des `<em>` dans les h1, neutralisés par le CSS ;
  - des cartes à angles de 6 px avec bordure, partout.
- **Le mouvement est uniforme.** Il y a un seul effet par page. Toutes les apparitions utilisent le même `[data-reveal]` : fondu, montée de 12 px, 350 ms.
- **Les 8 détourés actuels ne tiennent pas sur fond sombre.** Ils gardent une « galette » grise sous le macaron (l'ombre de la photo d'origine) et un liseré clair. C'est invisible sur blanc. Sur `#1B1A19` c'est rédhibitoire : je les ai composés sur ce fond pour le vérifier.
- **Le matériel photo est petit** : packshots de 1000 px, calissons de 294 × 316 px, logo de 500 × 116 px (le PNG source a la même taille). On ne peut donc pas mettre de photo en pleine largeur. La richesse devra venir de la mise en scène, pas de l'agrandissement.
- **Deux écarts avec le cahier des charges et l'accessibilité :**
  - le bandeau qui défile n'a pas de bouton pause (critère WCAG 2.2.2, niveau A) ;
  - le texte qui se « remplit » sur Coffrets part du fuchsia (`.fill-text`), alors que le cahier des charges demande une couleur claire.
- **Préchargement inutile.** Playfair 500 italique est préchargée dans `Base.astro`, mais aucun texte ne s'affiche en italique. Ce sont 23 Ko de perdus sur le chemin critique.
- **Nos macarons sur téléphone** : une carte par ligne, soit environ 40 000 px de défilement pour 94 produits. Le filtre « Calissons » est coupé à 375 px.
- **Captures périmées** : celles de coffrets, mentions légales et 404 datent de l'ancienne palette crème et olive. Il faut les refaire avant de montrer quoi que ce soit.
- **Résidus à nettoyer :**
  - `var(--choco-doux)` n'est pas définie (`la-boutique.astro`) ;
  - `.section--beige` n'a pas de style ;
  - la liste des macarons de la vitrine d'accueil est codée en dur dans `index.astro`, au lieu de lire `mis_en_avant`.

## 1. Nom et idée directrice

**« Derrière la vitrine ».** On visite le site comme la boutique du 885 rue Nationale : on passe devant la vitrine noire où l'on dépose les macarons, on s'arrête au présentoir où chaque parfum a son étiquette, on regarde plier le papier de soie et nouer le ruban, puis on repart par la porte, avec la pancarte et le plan de la rue. Chaque animation est un geste réel du métier (déposer à la pince, ranger, plier, nouer, retourner l'étiquette), fait avec la retenue d'une vendeuse : aucun rebond, aucun effet qui ne raconte rien. Rien n'y est générique : les objets sont les vrais macarons du catalogue, détourés ; les couleurs sont celles de l'enseigne du réseau (noir de la vitrine, blanc de la boîte, fuchsia du ruban) ; la typographie suit les règles françaises (espaces fines, « 8 h – 19 h ») ; même le plan est tracé d'après les vraies rues de Villefranche.

## 2. Système visuel global

### 2.1 Grille et mise en page

La grille fait 12 colonnes et peut déborder jusqu'aux bords de l'écran, grâce à des lignes nommées :

```css
:root { --marge: clamp(1.25rem, 5vw, 3.5rem); --gout: clamp(.75rem, 1.8vw, 1.5rem); --section: clamp(4.5rem, 3rem + 7vw, 9rem); }
.grille {
  display: grid; column-gap: var(--gout);
  grid-template-columns:
    [plein-debut] minmax(calc(var(--marge) - var(--gout)), 1fr)
    [contenu-debut] repeat(12, [col] minmax(0, 5.5rem)) [contenu-fin]
    minmax(calc(var(--marge) - var(--gout)), 1fr) [plein-fin];
}
/* exemples : .lettrage { grid-column: col 1 / span 8 }  .deborde-d { grid-column: col 7 / plein-fin } */
```

La largeur de contenu va jusqu'à 1320 px. À 375 px, il reste 20 px de marge de chaque côté et 12 colonnes de 17 px.

Règles de composition :

1. **Pas de héros centré.** Le texte s'aligne sur `col 1` et les objets débordent d'un côté (`col 7 / plein-fin`). Deux sections qui se suivent ne sont jamais construites pareil.
2. **L'étagère.** Un objet est toujours posé sur une ligne. Sur blanc, c'est 1 px `rgba(50,44,41,.18)`. Sur noir, c'est une arête de verre : 1 px blanc à 28 %, plus un dégradé de 12 px qui va du blanc à 22 % au transparent. Les titres et les macarons s'alignent sur cette ligne de base.
3. **Une superposition par section, pas plus** : le nom peint sur la vitre, l'étiquette sur l'angle d'une photo, la pancarte sur le bloc des horaires.
4. **Angles de 2 px** partout, comme du carton coupé. Les pilules sont réservées à la navigation et au filtre. Aucune « carte arrondie + ombre ».
5. **Rythme vertical** : l'espace entre sections vaut `--section`. Au-dessus d'un titre, on laisse 1,5 fois l'espace de dessous.
6. **Fonds** :
   - blanc par défaut ;
   - noir pour la vitrine, le menu mobile, le pied de page et le dos des cartes ;
   - gris `#F4F4F2` pour les zones « comptoir » ;
   - jamais deux sections noires ou deux sections grises qui se suivent.

### 2.2 Typographie

- **Fichiers** : Playfair 400, 500 et 400 italique ; Inter 400 et 600. Cela fait 5 fichiers, environ 118 Ko.
- **Chargement** : par l'API Fonts d'Astro 7 (`fonts: [{ provider: fontProviders.local(), name: 'Playfair Display', cssVariable: '--serif', options: { variants: [...] } }]`), avec comme source `@fontsource/playfair-display/files/*.woff2`. L'API génère des polices de repli aux métriques ajustées, ce qui limite le CLS au remplacement de la police.
- **Préchargement** : `<Font cssVariable="--serif" preload />`, uniquement pour Playfair 400 et Inter 400. On supprime le préchargement de 500 italique.

| Rôle | Police | Taille (375 → 1440 px) | Interligne | Notes |
|---|---|---|---|---|
| Lettrage de la vitrine (h1 accueil) | Playfair 400 | `clamp(3rem, 1.6rem + 6vw, 7.25rem)` (48 → 112 px) | .94 | `letter-spacing: -.015em`, blanc sur noir |
| h1 des pages | Playfair 400 | `clamp(2.6rem, 1.7rem + 4vw, 5.25rem)` (42 → 84) | 1 | `text-wrap: balance` |
| « 885 » (La boutique) | Playfair 400 | `clamp(5.5rem, 3rem + 11vw, 12rem)` | .85 | `font-variant-numeric: lining-nums` |
| h2 | Playfair 500 | `clamp(1.9rem, 1.4rem + 2.2vw, 3.25rem)` (31 → 52) | 1.06 | |
| h3 | Playfair 500 | `clamp(1.35rem, 1.15rem + .9vw, 1.9rem)` (22 → 30) | 1.15 | |
| Étiquette (parfums, événements, pancarte) | Playfair 400 *italique* | `clamp(1.05rem, 1rem + .3vw, 1.25rem)` | 1.2 | toujours brun ou blanc, jamais en couleur |
| Chapô | Inter 400 | `clamp(1.125rem, 1.05rem + .35vw, 1.3125rem)` | 1.55 | 38ch max, `#5F5955` |
| Texte courant | Inter 400 | 1.0625rem (17 px) | 1.65 | 62ch max, `text-wrap: pretty` |
| Interface (boutons, filtres, navigation) | Inter 600 | .9375rem | 1 | |
| Micro-capitales | Inter 600 | .72rem, `letter-spacing: .12em` | 1 | **2 usages seulement** : titres de colonnes du pied de page et « Allergènes » au dos des cartes. Plus aucun eyebrow. |

**L'italique Playfair, c'est l'écriture de la vendeuse.** On ne l'emploie que pour :

- les étiquettes et la pancarte ;
- les légendes ;
- la ligne « à Villefranche-sur-Saône » sous le lettrage.

Aucun mot en italique coloré dans un titre, et on retire les `<em>` des h1.

**Typographie française.** On ajoute une fonction `typo()` dans `src/lib/site.js`, appliquée à tous les textes JSON au moment du build :

- espace fine insécable (U+202F) avant `; : ! ?` et à l'intérieur des « » ;
- `plage()` affiche « 8 h – 19 h » (U+00A0 avant « h ») ;
- U+00A0 entre les paires de chiffres du téléphone ;
- chiffres tabulaires dans les horaires.

Le JSON reste simple pour l'étudiant.

### 2.3 Traitement des photos

1. **Détourage v2 de tout le catalogue** (79 macarons), dans `scripts/photos.mjs`, à partir des sources de 1000 px. Étapes :
   - modèle du fond calculé ligne par ligne en Lab (le fond est un dégradé gris-bleu) ;
   - suppression de l'ombre par la chroma : l'ombre est neutre, le macaron est coloré ;
   - colonne par colonne, on retire depuis le bas les pixels lisses et clairs (le reflet sous le pied) ;
   - on rebouche les trous ;
   - on lisse le contour (flou 5×5 puis seuil) et on l'érode d'1 px ;
   - on décontamine la couleur des bords : `(C − (1−α)·fond) / α`.

   **Je l'ai prototypé sur 8 photos**, sans toucher au projet. La galette grise disparaît et le résultat est net sur noir comme sur blanc. Il reste 2 à 6 px de coulure sous le pied sur 2 photos sur 8 : l'ombre ou le reflet CSS les masquent.

   Sorties : `public/photos/detoure/<nom>-360.webp` et `<nom>.webp` à la taille native (400 à 580 px), plus une **planche de contrôle** `captures/planche-detourage.jpg` (chaque macaron sur noir et sur blanc) régénérée à chaque `npm run photos`. Si un détourage est raté, on supprime le fichier et le site reprend tout seul la photo carrée.

2. **Ombres.** Jamais de `filter: drop-shadow` ni de `box-shadow` sur un objet.
   - Sur clair : chaque macaron a un vrai élément `<span class="ombre">` (ellipse de 70 % × 9 %, `radial-gradient(closest-side, rgba(27,26,25,.30), transparent)`). On peut l'animer à part : elle rétrécit quand le macaron est soulevé.
   - Sur noir : pas d'ombre, mais un **reflet dans le verre** : un second `<img alt="">` avec la même source, `scaleY(-1)`, opacité .14, `mask-image: linear-gradient(#000, transparent 55%)`.

3. **Packshots carrés** (fond gris) : uniquement en recadrage serré « au ras de la coque » (`object-fit: cover; scale: 1.25; object-position: 50% 54%`), dans des cadres 4:5 ou 5:4. Révélés par clip-path, jamais en grille de carrés identiques.

4. **Calissons** : photos telles quelles dans des « écrins » noirs. Elles ne sont jamais agrandies.

5. **Logo** : uniquement sur noir.

**Tailles maximales**, à écrire dans `MASTER.md` :

| Image | Largeur CSS maximale |
|---|---|
| Détouré v2 | 290 px |
| Recadrage carré | 480 px |
| Calisson | 160 px |
| Logo | 250 px |
| Photo en pleine largeur | interdite |

### 2.4 Éléments graphiques maison

Ce sont des SVG inline dans un sprite de `Base.astro`, en `aria-hidden`. Chacun a un seul rôle.

| Élément | Dessin | Rôle | Où |
|---|---|---|---|
| Étagère | filet ou arête de verre (§2.1) | ligne de base des objets | partout |
| Rampe lumineuse | 1 px blanc à 70 %, plus le halo `radial-gradient(60% 45% at 50% 0, rgba(255,255,255,.10), transparent 70%)` | « allumer » la vitrine | accueil, 404 |
| Étiquette | carte blanche, coins gauches chanfreinés (`clip-path: polygon(8px 0,100% 0,100% 100%,8px 100%,0 calc(100% - 8px),0 8px)`), œillet (masque radial de 3 px), ficelle (chemin de 1 px brun) | nommer | vitrine, cartes, coffrets |
| Pancarte | étiquette agrandie, suspendue à deux fils depuis un clou | Ouvert / Fermé | accueil, boutique, menu mobile |
| Ruban | bande fuchsia `#D72688` de 16 px (10 px sur téléphone), deux lisérés de 1,5 px en `#B01E6F` ; le nœud = 2 boucles et 2 pans | relier et conclure | Coffrets ; en segment de 2 px pour l'indicateur de page active |
| Papier de soie | feuille blanche, plis en dégradés à arête nette (`linear-gradient(115deg, transparent 38%, rgba(50,44,41,.035) 38.2% 52%, transparent 52.2%)`, deux fois) ; rabats à 86 % d'opacité, on devine les macarons dessous | emballer | Coffrets |
| Pince | deux bras au trait de 1,25 px, blanc à 75 %, bouts plats | prendre, chercher | survol de la vitrine (ordinateur), 404 |
| Coffret ouvert | boîte vue de face, couvercle relevé, 5 alvéoles | la case vide | 404 |
| Anses de sac (facultatif) | 2 arcs de 1,5 px, blanc à 40 %, qui dépassent du haut du pied de page | « on repart avec le sac » | pied de page |
| Repère macaron | le `#macaron-mark` existant | épingle du plan | boutique |

### 2.5 Où va chaque couleur

| Couleur | Où elle va | Où elle ne va jamais | Contraste |
|---|---|---|---|
| `#FFFFFF` | fond des pages, faces des cartes, papier, étiquettes, texte sur noir | — | 17,4:1 sur noir |
| `#F4F4F2` | zones « comptoir » (Venir à la boutique, avis, fond du plan, sommaire des mentions) | sous un texte fuchsia (4,2:1, insuffisant) | — |
| `#D72688` | fond des boutons (texte blanc, 4,64:1), ruban et nœud, indicateur de page active, anneau de focus, trait « aujourd'hui », étoiles, `::selection` (texte blanc) | texte sur noir (3,7:1) ou sur gris ; aplat de plus de 10 % d'un écran | 4,64:1 (blanc sur fuchsia) |
| `#B01E6F` | survol des boutons, lisérés du ruban, liens en texte sur gris | — | 6,4:1 sur blanc, 5,9:1 sur gris |
| `#1B1A19` | vitrine, navigation, menu mobile, pied de page, dos des cartes, écrins des calissons, 404 | — | — |
| `#322C29` | tout le texte sur fond clair, étagères (à 18 %), état final du texte rempli | — | 13,7:1 |
| `#5F5955` | chapôs, légendes, catégories | sur noir | 6,9:1 sur blanc, 6,3:1 sur gris |

- **Texte secondaire sur noir** : `rgba(255,255,255,.72)` (environ 9,4:1). Il remplace le `#D6D1CD`, qui est hors palette.
- **Règle du fuchsia** : au plus deux touches fuchsia par écran, en comptant le bouton « Appeler » de la navigation.
- **Dégradés** : uniquement du blanc ou du brun en transparence (verre, plis).

## 3. Système de mouvement global

### 3.1 Courbes et durées

Toutes les courbes sont dans un seul fichier, `src/scripts/core/courbes.js`. Je les ai échantillonnées dans Node pour vérifier leur forme.

```js
CustomEase.create('pose',   'M0,0 C0.12,0.55 0.3,0.92 0.55,0.955 C0.66,0.962 0.78,0.962 0.84,0.962 C0.9,0.962 0.95,0.985 1,1');
CustomEase.create('glisse', 'M0,0 C0.33,0 0.15,1 1,1');   // ranger, tiroirs, Flip
CustomEase.create('plie',   'M0,0 C0.7,0 0.3,1 1,1');     // papier, retourner
CustomEase.create('noue',   'M0,0 C0.25,0 0.3,1.1 0.6,1.04 C0.78,1 0.86,0.995 1,1'); // serrer : dépasse de 4 % puis revient
CustomEase.create('trace',  'M0,0 C0.2,0.6 0.35,1 1,1');  // filets, ficelles, rues
```

**« pose », c'est le geste de la pince.** Le macaron parcourt 95,5 % de la distance en 55 % du temps. Il reste ensuite presque immobile jusqu'à 84 % du temps : la vendeuse ajuste. Les 4 derniers pour cent tombent : elle lâche. Il n'y a **aucun rebond** (Kerem l'avait retiré au tour précédent).

Seules les étiquettes, qui pendent à une ficelle, ont le droit d'osciller : `elastic.out(1, .55)`, avec une amplitude de 7° au plus.

**Les mêmes courbes côté CSS** :

- `--ease-glisse: cubic-bezier(.33,0,.15,1)`
- `--ease-plie: cubic-bezier(.7,0,.3,1)`
- `--ease-trace: cubic-bezier(.2,.6,.35,1)`
- `--ease-pose: linear(0, .167 4%, .309 8%, .43 12%, .532 16%, .62 20%, .711 25%, .785 30%, .844 35%, .889 40%, .921 45%, .943 50%, .955 55%, .96 65%, .962 75%, .962 84%, .965 88%, .974 92%, .987 96%, 1)`

La valeur `linear()` est obtenue en échantillonnant la CustomEase : la page et les transitions bougent avec les mêmes gestes.

**Durées** (jetons communs au JS et au CSS) :

| Jeton | Valeur | Usage |
|---|---|---|
| survol | 160 ms | |
| état | 320 ms | filtres, sorties |
| apparition | 600 ms | |
| geste | 900 ms | poser, plier, tracer |
| page | 480 ms | transition entre pages |

Règles : 60 à 90 ms de décalage entre deux objets ; jamais deux gestes en même temps dans le même écran ; rien ne tourne en boucle, sauf le bandeau.

### 3.2 Transitions entre pages

On garde les **View Transitions natives entre documents** (`@view-transition { navigation: auto }`, déjà en place) et un site multipage, sans `ClientRouter`. Il n'y a donc aucun script à réinitialiser.

- **Par défaut** :
  - l'ancienne page fait `opacity → 0, translateY(-8px)` en 220 ms ;
  - la nouvelle fait `opacity 0 → 1, translateY(18px → 0)` en 480 ms `--ease-glisse`, avec 60 ms de délai ;
  - `.nav__pill { view-transition-name: nav }` : la pilule reste en place et passe en fondu de l'état transparent (sur la vitrine) à l'état noir.
- **« La pince » (élément partagé)** :
  - au clic sur un macaron de la vitrine, on pose `img.style.viewTransitionName = 'macaron'` et `sessionStorage.vtMacaron = id` ;
  - sur Nos macarons, un script **inline classique dans le `<head>`** injecte `<style>#ID .produit__img{view-transition-name:macaron}</style>` avant le premier rendu ;
  - `::view-transition-group(macaron)` anime le trajet en 620 ms `--ease-glisse` : le macaron vole de la vitrine jusqu'à sa carte ;
  - au `viewTransition.finished`, on retire le style et on joue un petit « pose » sur la carte ;
  - si la carte n'est pas dans l'écran, on ne nomme rien et la transition par défaut s'applique ;
  - on nettoie au `pageshow` (retour par le cache).
- **Mouvement réduit** : simple fondu de 200 ms, et `::view-transition-group(*)` dure 0 s.
- **Navigateurs sans transitions entre pages** (Firefox selon la version) : une classe `sans-vt` est posée dans le `<head>` si `!('onpagereveal' in window)`, ce qui déclenche une animation CSS d'entrée sur `main`.
- **Préchargement** : `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` dans `astro.config.mjs`. Les pages sont déjà en cache au moment du clic, donc la transition ne passe jamais par un écran blanc.

### 3.3 Survols et curseur

Pas de curseur personnalisé : ce serait gadget et moins accessible. Tout est sous `@media (hover: hover) and (pointer: fine)`.

- **Liens texte** : un souligné fuchsia de 1 px pousse depuis la gauche (`background-size: 0 1px → 100% 1px`, 320 ms `glisse`).
- **Boutons** : `#D72688 → #B01E6F` en 160 ms, sans changement d'échelle ni ombre.
- **Macarons détourés** (cartes, bandeau) : ils se soulèvent (`y: -6`, ombre `scale .82` et opacité .6, 320 ms `pose`). C'est « pris à la pince ».
- **Vitrine, sur ordinateur** :
  - au survol d'un macaron, les bouts de la pince descendent de 14 px et se referment de 3 px autour de lui ;
  - la parallaxe au pointeur est limitée à ±4 px pour le gradin arrière et ±8 px pour l'avant (`gsap.quickTo`, 600 ms) ;
  - c'est coupé sur téléphone.
- **Étiquettes des événements** : elles se balancent de ±2° en 600 ms.
- **Navigation** : le segment de ruban de 2 px glisse sous le lien survolé (quickTo sur x et width, 350 ms), puis revient à la page active.

### 3.4 Apparitions

Elles varient selon le type de bloc, avec un attribut `data-apparition="…"`. Toutes se déclenchent à `start: "top 85%"`, une seule fois.

| Type | Mouvement | Durée et courbe | Outil |
|---|---|---|---|
| titre (h2, h1 des pages) | les lignes montent de leur masque | 800 ms `expo.out`, décalage 70 ms | `SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true, onSplit: s => gsap.from(s.lines, { yPercent: 105 }) })` (son `aria: "auto"` garde le texte lisible par les lecteurs d'écran) |
| texte | opacité seule | 600 ms `power1.out` | — |
| objet (macaron détouré) | descend de 28 px ; l'ombre passe de `scale .5`/opacité 0 à 1 | 600 ms `pose` | `ScrollTrigger.batch`, décalage 60 ms |
| photo (recadrage) | `clip-path: inset(100% 0 0 0) → inset(0)`, l'image intérieure passe de `scale 1.12` à 1 | 900 ms et 1 200 ms `glisse` | — |
| filet | `scaleX 0 → 1` depuis la gauche | 900 ms `trace` | — |
| liste (horaires) | lignes décalées de 45 ms, opacité et `x -8 → 0` | 450 ms | — |
| étiquette | rotation de −7° à 0 autour de l'œillet, `y -10 → 0` | 1 100 ms `elastic.out(1,.55)` | — |

### 3.5 Mouvement réduit

Tout passe par `gsap.matchMedia()`, avec les conditions `{ mouvement: "(prefers-reduced-motion: no-preference)", reduit: "(prefers-reduced-motion: reduce)", large: "(min-width: 900px)" }`. Le retour en arrière est automatique si l'utilisateur change son réglage.

En mode `reduit` :

- Lenis est coupé ;
- toutes les apparitions deviennent un fondu de 300 ms ;
- accueil : les macarons apparaissent en fondu (40 ms d'écart), puis le nom ;
- le bandeau est arrêté et se fait défiler à la main (`overflow-x: auto`) ;
- filtre : fondu enchaîné de 250 ms ; cartes : fondu entre les deux faces ;
- Coffrets : pas de sticky (`height: auto`), la scène est affichée immobile et le texte directement dans sa couleur finale ;
- plan : fondu seul ; 404 : immobile ; transitions de page : fondu de 200 ms.

En plus :

- `prefers-contrast: more` désactive le texte rempli ;
- un **interrupteur** `boutique.json → options.animations: false` pose `<html data-animations="off">` et bascule sur le même chemin. C'est utile si un téléphone pose problème après la mise en ligne.

### 3.6 Architecture JS et budget

- **`main.js`** charge `core/` (GSAP, ScrollTrigger, CustomEase, SplitText, Lenis, navigation, apparitions, pancarte, transitions) : environ 65 Ko gzip. Aujourd'hui, le bundle unique fait 59,6 Ko gzip.
- **Un module par page**, chargé par `import()` dynamique selon `body.dataset.page` :

| Module | Plugins en plus | Poids ajouté (gzip) |
|---|---|---|
| `pages/accueil.js` | DrawSVG | 2,2 Ko |
| `pages/macarons.js` | Flip | 9,7 Ko |
| `pages/coffrets.js` | DrawSVG | 2,2 Ko |
| `pages/boutique.js` | DrawSVG | 2,2 Ko |
| `pages/404.js` | DrawSVG, Draggable, Inertia | 2,2 + 13,5 + 3,3 Ko |

- **Budget** : 80 Ko gzip de JS au plus sur les 4 pages principales.
- **Plugins non utilisés** (inutiles ici, ils alourdiraient) : MorphSVG (9,6 Ko), ScrollSmoother (Lenis fait ce travail), MotionPath, Physics.
- **Lenis** : `new Lenis({ lerp: .1, autoRaf: false, anchors: { offset: -100 } })`, piloté par `gsap.ticker` comme aujourd'hui. `syncTouch` reste à false, donc le défilement est natif au doigt sur téléphone. On ajoute `ScrollTrigger.config({ ignoreMobileResize: true })`.

## 4. Page par page

### Accueil

**Structure, dans l'ordre :**

1. **La vitrine** : section noire en plein cadre (`min-height: min(100svh, 880px)`, `max(88svh, 600px)` sur téléphone).
   - **Ordre du DOM** : h1, accroche, boutons, infos, puis `<ul class="vitrine">` (8 liens vers `/nos-macarons/#id`). Visuellement, la vitrine passe au-dessus grâce à `grid-template-areas`. Les lecteurs d'écran entendent donc le nom en premier.
   - **Composition sur ordinateur** :
     - rampe lumineuse à 9 % de la hauteur ;
     - gradin arrière (verre) à 34 %, avec 4 macarons à `scale .82` (`col 4 / col 12`) ;
     - gradin avant à 56 %, avec 4 macarons de 168 px décalés d'une demi-place (`col 3 / col 11`), et des étiquettes blanches dessous à partir de 600 px de large ;
     - le lettrage (`col 1 / span 8`) chevauche l'arête du verre avant de 10 px ;
     - colonne d'infos `col 10 / contenu-fin` : la pancarte « Aujourd'hui », l'adresse, le téléphone, séparés par des filets blancs à 20 %.
   - **Données** : `produits.filter(p => p.mis_en_avant)`, avec le détouré v2 quand il existe.
2. **Le bandeau qui défile** (imposé) :
   - fond blanc, hauteur 150 px (116 px sur téléphone) ;
   - macarons détourés de 112 px (84 px sur téléphone) posés sur une étagère continue, nom en Playfair italique dessous ;
   - liste des parfums dans `boutique.json → accueil.bandeau` ;
   - 40 px/s ;
   - **bouton pause de 44 px** (`aria-pressed`) en bout de bande.
3. **« La carte »** : les trois familles, chacune construite différemment :
   - **Sucrés** : recadrage 4:5 en `col 1 / span 5`, texte en `col 7 / span 4`, avec le h3, « 68 macarons sucrés » et un lien vers `/nos-macarons/?filtre=sucre#sucres` ;
   - **Salés** : texte en `col 2 / span 4`, recadrage 5:4 en `col 7 / span 5` ;
   - **Calissons** : écrin noir de 2 × 2 photos en `col 1 / span 5`, texte à droite ;
   - les nombres sont calculés depuis les données ; les photos sont choisies dans `accueil.familles`.
4. **Coffrets et événements** : une guirlande.
   - `intro_coffrets` à gauche ;
   - une ficelle (chemin SVG de 1 px, brun à 60 %) traverse `col 5 / plein-fin` ;
   - 3 étiquettes y pendent (titre et sous-titre tirés du JSON), qui sont des liens vers `/coffrets-evenements/#id`.
5. **Venir à la boutique** : sur fond `#F4F4F2`, la pancarte en direct, l'adresse, les horaires regroupés, les boutons « Itinéraire » et « Appeler ».
6. **Pied de page** noir, avec les anses de sac en option.

**Grosse animation : « La mise en vitrine ».** Elle utilise GSAP et CustomEase. Elle démarre au chargement, après `Promise.race([document.fonts.ready, délai de 600 ms])` et le `decode()` des 4 premières images (délai maximal 400 ms).

| Temps | Ce qu'on voit | Réglages |
|---|---|---|
| 0,00 s | vitrine noire, arêtes de verre visibles, rampe à 35 % | les macarons attendent au-dessus du cadre (`y` = −hauteur du gradin − 40 px ; la vitrine est en `overflow: clip`) ; les reflets attendent au même écart, en dessous |
| 0,00–0,40 | la rampe s'allume | opacité .35 → 1, halo 0 → 1, `power2.out` |
| 0,10–1,32 | **les 8 macarons descendent un par un et se posent** : gradin arrière de gauche à droite, puis gradin avant de gauche à droite | `y → 0` en 620 ms `pose`, décalage 85 ms ; le reflet fait le trajet inverse (il monte vers le verre) et passe de 0 à .14 d'opacité ; macaron et reflet se touchent au même instant |
| 1,20–2,10 | **puis un reflet balaie la vitre et révèle le lettrage « Le Monde du Macaron »** | `.vitrine__reflet` va de x −40 % à 140 % (900 ms `glisse`) ; le h1 anime `--lettrage` de −12 % à 112 % dans `mask-image: linear-gradient(100deg, #000 var(--lettrage), transparent calc(var(--lettrage) + 12%))`, avec aussi `-webkit-mask-image` (850 ms) |
| 1,80–2,30 | « à Villefranche-sur-Saône » en italique ; étiquettes sous le gradin avant | opacité en 400 ms ; étiquettes de −5° à 0, `elastic.out(1,.55)`, décalage 40 ms |
| 1,95–2,45 | accroche et boutons | opacité et `y 10 → 0`, 500 ms, décalage 60 ms |
| 2,10–2,80 | bande d'infos | filets `scaleX 0 → 1` (700 ms `trace`), puis les textes |

- **Téléphone** : 6 macarons (3 + 3), 75 ms d'écart, 550 ms par macaron. Le nom démarre vers 1,0 s.
- **Deuxième passage dans la même session** (repère dans `sessionStorage`) : version courte de 0,9 s (40 ms d'écart, 380 ms par macaron). Ce sont toujours les macarons d'abord, puis le nom.
- **LCP** : le h1 est masqué, il n'est jamais en `opacity: 0`. Il devrait donc être peint dès le premier rendu. À vérifier dans Lighthouse.

**Micro-interactions :**

- **Vitrine** : survol avec la pince ; au clic, la transition « pince » vers la carte.
- **Bandeau** :
  - au `pointerenter` ou `touchstart`, il ralentit à .15 en 800 ms (`anim.updatePlaybackRate()` sur l'animation CSS : moins saccadé que changer `playbackRate`) ;
  - il est mis en pause hors de l'écran (IntersectionObserver).
- **Guirlande** : la ficelle se trace (DrawSVG, 900 ms `trace`), puis les étiquettes tombent et se balancent.
- **Pancarte** : elle se balance une fois quand elle apparaît.

**Sur téléphone :**

- pas d'étiquettes sous la vitrine ni de parallaxe ;
- bande d'infos sur une colonne ;
- bandeau à 30 px/s ;
- familles : la photo puis le texte, sur une colonne ;
- guirlande verticale : la ficelle longe le bord gauche, les étiquettes pendent à droite.

### Nos macarons

**Structure :**

1. **En-tête** : h1, `intro_macarons`, et une phrase calculée : « 68 macarons sucrés, 11 salés, 15 calissons ».
2. **Filtre** : un `role="group"` de boutons `aria-pressed` (identifiants `sucre`, `sale`, `calisson`), avec une pilule noire qui glisse sous le bouton actif.
   - Sur ordinateur : collé sous la navigation.
   - Sur téléphone : **fixé en bas** (`inset: auto 12px max(12px, env(safe-area-inset-bottom))`), visible seulement quand la grille est à l'écran. Dans le DOM, il reste avant la grille.
   - Le filtre se lit dans l'URL (`?filtre=sale`).
3. **Le présentoir** : trois étages (`<section>` Sucrés, Salés, Calissons), chacun avec un h2, son nombre et un double filet. Grille de 4 colonnes à partir de 1200 px, 3 colonnes à partir de 600 px.
   - **Face** : blanche, sans bordure. Le détouré occupe 74 % de la largeur, posé sur son étagère avec son ombre. Dessous, l'étiquette :
     - nom en Playfair italique ;
     - catégorie en Inter .8rem `#5F5955` ;
     - « Allergènes au dos » en fuchsia 600 sur blanc.
   - **Dos** : noir, avec le nom, la description, « Allergènes » en micro-capitales, les allergènes en Inter 600, puis « Un doute ? Demandez conseil en boutique. »
   - **Calissons** : couleurs inversées (face en écrin noir avec une photo de 160 px maximum, dos blanc).
   - **Accessibilité** : on garde `button[aria-pressed]` et l'échange d'`aria-hidden`, et on ajoute `aria-describedby="dos-<id>"` : la description et les allergènes sont lus dès le focus, sans retourner la carte. On ajoute aussi `scroll-margin-top: 7rem`.
4. **`aussi_en_boutique`**.

**Grosse animation : « Le changement de plateau »** (Flip et CustomEase), au clic sur un filtre :

| Temps | Geste |
|---|---|
| 0 | si le haut du présentoir est au-dessus de l'écran, `lenis.scrollTo(présentoir, { offset: -110, duration: .6 })` ; puis `Flip.getState()` des 3 étages, **des cartes visibles seulement** (écran ± 1 hauteur) et de l'indicateur |
| 0 | mise à jour du DOM (`hidden` sur les étages), du compteur `aria-live` et de l'URL (`history.replaceState`) |
| 0–0,75 | `Flip.from(state, { duration: .75, ease: "glisse", absolute: true, nested: true })` : les étages restants remontent, l'indicateur glisse sous le nouveau bouton (500 ms) |
| 0–0,30 | `onLeave` : les cartes qui partent filent à gauche comme un plateau qu'on retire (`x → −48`, opacité → 0, `power2.in`, 8 ms d'écart en partant de la fin) |
| 0,20–0,90 | `onEnter` : les nouvelles cartes arrivent de la droite (`x 72 → 0`, 600 ms `glisse`, 25 ms d'écart) ; chaque macaron finit par un « pose » de 10 px |
| 0–0,35 | le nombre affiché roule : l'ancien monte, le nouveau arrive par en dessous |

Les cartes hors de l'écran changent sans animation, ce qui garde l'INP bas sur téléphone.

**Retourner une carte** (interaction, pas la grosse animation) : une timeline GSAP de 700 ms.

- `rotationY 0 → 90` avec `z 0 → 36` (350 ms `power2.in`), puis `90 → 180` avec `z → 0` (350 ms `power2.out`) : on soulève l'étiquette, puis on la retourne.
- Entrée et Espace fonctionnent nativement sur le bouton.
- Au chargement, les macarons de la première rangée se posent un par un (type « objet », 60 ms d'écart).
- En venant de la vitrine : la transition « pince », puis l'étiquette se balance.

**Sur téléphone, la carte devient une étiquette horizontale :**

- une ligne par produit, 128 px de haut ;
- le macaron à gauche (120 px), le nom et la catégorie à droite ;
- elle se retourne de haut en bas (`rotationX`) ;
- le dos tient 5 lignes à environ 45 caractères par ligne : description, allergènes et note, lisibles sans couper.

C'est une vraie carte de boutique qu'on lit d'un coup d'œil, sans texte écrasé dans 160 px.

### Coffrets & événements

**Structure :**

1. **En-tête** :
   - le h1 ;
   - `intro_coffrets` en **texte rempli** (`col 1 / span 9`, Playfair 500 `clamp(1.5rem, 1.1rem + 1.8vw, 2.5rem)`, interligne 1.3) :
     - SplitText découpe en mots ;
     - chaque mot a le fond `linear-gradient(90deg, #322C29 50%, rgba(50,44,41,.2) 50%) 100% 0 / 200% 100%`, avec `background-clip: text` et `color: transparent` ;
     - le défilement pousse `backgroundPosition` à `0%` (décalage .08, `start: "top 80%"`, `end: "bottom 45%"`, `scrub: .6`) ;
     - on passe ainsi du clair au brun-noir, comme demandé ;
     - on garde `background-clip` plutôt que `color` pour que l'audit de contraste de Lighthouse ne lise pas l'état clair au chargement.
2. **L'emballage** (grosse animation) : `section.emballage { height: 260svh }` (220svh sur téléphone), avec `.emballage__scene { position: sticky; top: 0; height: 100svh }`.
   - C'est un **sticky CSS piloté par ScrollTrigger, sans pin** : pas d'espace de pin ajouté, donc zéro CLS, et le tout est robuste avec Lenis.
   - La scène est en `aria-hidden` : aucune information n'existe que dans l'animation.
3. **Trois événements**, chacun construit différemment :
   - **Conscrits** : texte en `col 1 / span 5` ; trois macarons sur une étagère en `col 7 / plein-fin`, avec l'étiquette « Conscrits » qui pend au-dessus.
   - **Mariages** : en miroir ; les trois macarons en petite pyramide (2 + 1) sur un carré de papier de soie, en `col 1 / span 5`.
   - **Entreprises** : texte en `col 1 / span 7`, puis un plateau (cadre de 1 px brun à 20 %) qui porte les trois macarons en ligne.
   - Chaque événement a :
     - le titre en h2 et le sous-titre en Inter 600 `#5F5955` (on retire le fuchsia de ce texte) ;
     - le texte ;
     - les boutons « Appeler » (`tel:`) et « Écrire » (`mailto:` avec `objet_mail`) ;
     - la mention « [À REMPLACER] » tant que l'e-mail manque.
4. **Fin** : le téléphone en Playfair 500 `clamp(2rem, 1.5rem + 2vw, 3rem)`, en lien `tel:`, et le bouton e-mail.

**Déroulé de l'emballage** (ScrollTrigger `scrub: .6`, DrawSVG, CustomEase), selon la progression du défilement dans la section :

| Progression | Geste | Réglages |
|---|---|---|
| 0–0,08 | la feuille de soie est là, la scène s'éclaircit | opacité .4 → 1 |
| 0,05–0,40 | **Glisser : ce sont les « photos qui glissent sur le côté » imposées.** Deux rangées de macarons détourés (les photos des 3 événements : 9 sur ordinateur, 6 sur téléphone) arrivent en sens opposés, la rangée 1 depuis la droite (`x 60vw → 0`), la rangée 2 depuis la gauche, puis se posent (`y −10 → 0`) ; leurs ombres apparaissent | `glisse` puis `pose`, décalage .03 |
| 0,40–0,62 | **Plier** : le rabat gauche, puis le rabat droit, se referment par-dessus | `rotationY 178 → 2` depuis le bord extérieur, `transformPerspective: 1400`, `plie` ; rabat droit décalé de .08 ; à 86 % d'opacité, on devine les couleurs dessous |
| 0,62–0,84 | **Nouer** : bande horizontale, puis verticale, puis les deux boucles ; le nœud se serre | DrawSVG `0% → 100%` (`trace`), nœud `scale .6 → 1` (`noue`), pans de 8° à 0 |
| à partir de 0,84 | **Étiqueter** : l'étiquette « Conscrits · Mariages · Entreprises » (titres du JSON) tombe du nœud et se balance | **pas lié au défilement** : animation déclenchée (`onEnter`, avec retour arrière à `onLeaveBack`), `y −20 → 0`, rotation de −16° à 0, 1,1 s `elastic.out(1,.55)`. Une oscillation collée à la barre de défilement ferait élastique. |
| 0,84–1 | la scène tient, puis se décolle naturellement à la fin du sticky | — |

- **Téléphone** : colis de 340 × 260, ruban de 10 px, perspective 1000.
- **Mouvement réduit** : la scène s'affiche immobile, avec les macarons rangés sur le papier ouvert, le ruban posé en travers et l'étiquette visible.

### La boutique

**Structure :**

1. **En-tête** : h1 et chapô (le chapô passe dans le JSON).
2. **La porte** :
   - à gauche (`col 1 / span 7`) :
     - « 885 » en grand, au format `--fs-885` ;
     - « rue Nationale » et « 69400 Villefranche-sur-Saône » en Playfair 500 ;
     - les boutons « Itinéraire » et « Appeler », puis le téléphone et l'e-mail ;
   - à droite (`col 9 / span 4`) : la **pancarte**, qui chevauche de 24 px le haut du bloc des horaires, et les horaires de la semaine, avec aujourd'hui marqué par un filet fuchsia de 2 px.
   - Les chiffres du « 885 » montent de leur masque (SplitText en caractères avec masque, décalage 80 ms, 900 ms `expo.out`), comme un numéro peint sur l'imposte. Ce n'est pas un compteur : seul 719 compte.
3. **Avis** : sur `#F4F4F2`.
   - « 4,6 » en Playfair 400 de 4rem ;
   - 5 étoiles SVG, remplies en fuchsia à 92 % (4,6 sur 5) ;
   - « 719 avis Google », « Relevé le 19 novembre 2026 » et le lien.
4. **Le plan** (grosse animation).
5. **La phrase de contact** (`mailto:`), déplacée dans le JSON.

**La pancarte** est un composant partagé, `Pancarte.astro` avec `core/pancarte.js`.

- Elle calcule l'heure **de Paris** : `Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Paris', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })`. Le jour « Mon » donne « Mo », c'est-à-dire directement les codes du JSON.
- Elle affiche « Ouvert · jusqu'à 19 h », « Fermé · ouvre à 8 h » ou « Fermé · réouverture lundi à 8 h », avec en petit « selon les horaires habituels ».
- Elle respecte `fermetures_exceptionnelles: []` (nouveau champ, vide par défaut).
- Le HTML servi contient les horaires normaux : c'est ce que voient Google et les visiteurs sans JS. La boîte a une hauteur minimale fixe, donc pas de CLS.

**Grosse animation : « Le plan se trace ».**

Préalable : un script `scripts/plan.mjs`, lancé une seule fois sur le poste du développeur, dont le résultat est versionné. Les visiteurs ne contactent jamais Overpass.

- Il interroge l'API Overpass autour de `geo` (rayon de 420 m, voies `highway`).
- Il projette les voies dans un viewBox de 800 × 600 centré sur la boutique et les simplifie (Douglas-Peucker, tolérance 1,5).
- Il écrit `src/generated/plan.json` : les tracés par type de voie et par nom, plus le point de la boutique.
- Le plan s'affiche en SVG inline, crédité « © contributeurs OpenStreetMap (ODbL) ».

Déroulé (ScrollTrigger, une seule fois, à `top 80%`) :

| Temps | Geste |
|---|---|
| 0–0,8 s | le bloc du plan apparaît en fondu sur `#F4F4F2` : c'est le fondu imposé |
| 0,2–1,6 | les rues se tracent : la rue Nationale d'abord (DrawSVG, 1 s `trace`, trait blanc de 10 px bordé de brun à 18 %), puis les rues voisines (40 ms d'écart, 600 ms) |
| 1,2–1,8 | l'épingle `#macaron-mark` est posée « à la pince » au 885 (`y −60 → 0`, `pose`, avec ombre) ; un anneau fuchsia passe une seule fois de `scale .6` à 1.4 et de .6 à 0 d'opacité (800 ms) |
| 1,6–2,0 | l'étiquette « 885 rue Nationale » arrive ; le bouton « Afficher le plan interactif » apparaît |
| au clic | l'iframe OpenStreetMap est créée comme aujourd'hui ; elle passe de 0 à 1 d'opacité en 1,2 s après `load` (2,5 s maximum) et le plan dessiné s'efface dessous. Aucune requête tierce avant le clic. |

**Compteur d'avis** (imposé, discret) :

- de 0 à 719 en 1,8 s `power3.out`, avec `toLocaleString('fr-FR')` ;
- `font-variant-numeric: tabular-nums` et `min-width: 3ch`, pour que la largeur ne bouge pas ;
- les étoiles se remplissent en même temps (`clip-path` de `inset(0 100% 0 0)` à `inset(0 8% 0 0)`).

**Sur téléphone** : le « 885 » en 5,5rem, la pancarte sous l'adresse (sans chevauchement), un plan en 4:3.

### Mentions légales

C'est la page calme : **pas de grosse animation**.

- **À partir de 1024 px** :
  - sommaire collant en `col 1 / span 3`, sur `#F4F4F2`, avec les 6 ancres ;
  - la section en cours est marquée par un filet fuchsia de 2 px qui glisse (ScrollTrigger `onToggle` sur chaque h2) ;
  - texte en `col 5 / span 7`, 66ch maximum.
- **Sur téléphone** : le sommaire est une simple liste en haut.
- **Mouvement** : h2 par lignes, textes en fondu seul.
- **Données** : les textes codés en dur (hébergeur, données personnelles, informations produits) passent dans `mentions_legales.textes`.

### 404

**Structure :**

- une bande noire de 360 px (300 px sur téléphone) ;
- dedans, un coffret ouvert, couvercle relevé, avec 5 alvéoles : 4 macarons et une case vide (une ellipse pointillée, l'ombre du macaron absent) ;
- dessous : le h1 « Page introuvable », « Erreur 404 » en petit, le texte actuel et les 2 boutons.

**Grosse animation : « La case vide ».** Elle utilise DrawSVG et CustomEase. Draggable et Inertia sont chargés uniquement sur cette page.

| Temps | Geste |
|---|---|
| 0–0,4 s | la rampe s'allume |
| 0,4–1,3 | la pince descend dans la case vide (`y −160 → 0`, `pose`) |
| 1,3–1,55 | elle s'ouvre (bras à ±6°, 250 ms), puis se referme sur rien (200 ms) |
| 1,6–2,2 | elle remonte (`power2.in`), avec un petit arrêt incliné à −4° |
| ensuite | le macaron pistache est tombé sur le comptoir sous la boîte. On peut le **remettre en vitrine** : en le faisant glisser (`Draggable.create(mac, { type: "x,y", bounds: scène, inertia: true, snap: { points: [case], radius: 48 } })`), ou avec le bouton « Remettre le macaron en vitrine » au clavier. Il se pose (`pose`) et le couvercle se referme (`rotationX`, 700 ms `plie`). |

En mouvement réduit, tout est immobile et seul le bouton reste disponible. Sur téléphone, le glisser fonctionne au doigt (`touch-action: none` uniquement sur le macaron).

## 5. Risques et parades

| Risque | Parade |
|---|---|
| **Performance sur un téléphone moyen : le JS** | `core` à environ 65 Ko gzip, chaque module de page à 15 Ko au plus (17 Ko pour la 404) ; import dynamique ; ce qui est sous la ligne de flottaison s'initialise sur `requestIdleCallback` (repli `setTimeout`) ; tester avec le processeur bridé ×4 dans DevTools et sur un vrai Android d'entrée de gamme |
| **Performance : les images** | vitrine : 6 à 8 détourés en 360 px (environ 10 Ko chacun), dont 4 en `fetchpriority="high"` ; tout le reste en `loading="lazy" decoding="async"` ; au plus 12 images dans le premier écran ; les 94 cartes de Nos macarons se chargent au fil du défilement |
| **Performance : le rendu** | n'animer que `transform` et `opacity` ; `clip-path` et `mask` seulement sur des animations courtes déclenchées (jamais liées au défilement sur téléphone) ; jamais de `filter`, `box-shadow` ou `backdrop-filter` animé ; les ombres sont des éléments à part ; 20 éléments animés en même temps au plus, sauf le bandeau (animation CSS, gérée par le compositeur, en pause hors de l'écran) ; Flip limité aux cartes visibles (INP) ; moins de 14 nœuds par carte (taille du DOM) |
| **LCP** | h1 masqué, jamais en opacité 0 ; Playfair 400 et Inter 400 préchargées ; nom affiché à 1,0 s au plus sur téléphone ; mesurer après chaque page |
| **CLS sous 0,1** | sticky CSS au lieu du pin ; `width`/`height` et `aspect-ratio` partout ; polices de repli aux métriques de l'API Fonts ; SplitText en `autoSplit` ; pancarte et compteur à taille fixe ; le Flip est déclenché par l'utilisateur, donc exclu du CLS |
| **Débordement horizontal** | on garde `html { overflow-x: clip }` ; `overflow: clip` sur la vitrine, le bandeau et la scène d'emballage (les entrées partent de ±60vw) ; vérification à 375, 768, 1024 et 1440 px |
| **Accessibilité : contrastes** | table du §2.5 ; texte rempli en `background-clip` ; `prefers-contrast: more` ; focus fuchsia de 2 px (3,7:1 sur noir, donc au-dessus de 3:1) |
| **Accessibilité : mouvement** | bouton pause sur le bandeau (WCAG 2.2.2) ; `gsap.matchMedia` ; rien ne clignote ; aucune animation de plus de 5 s, sauf le bandeau qu'on peut arrêter |
| **Accessibilité : clavier et ARIA** | cartes avec `aria-pressed` et `aria-describedby` ; menu mobile en `inert` sur `main` et le pied de page (piège de focus), Échap pour fermer, retour du focus sur le bouton ; scène d'emballage en `aria-hidden` ; bouton de remplacement du glisser sur la 404 ; h1 avant la vitrine et filtre avant la grille dans le DOM |
| **Détourage raté sur un parfum** | planche de contrôle à chaque `npm run photos` ; supprimer le fichier fait revenir la photo carrée automatiquement |
| **Photos en basse définition** | tableau des tailles maximales (§2.3) écrit dans `MASTER.md` |
| **Maintenance par un étudiant** | composants `Objet.astro` (image, ombre, reflet, étiquette), `Etiquette.astro`, `Pancarte.astro`, `Plan.astro` ; un module par page avec une fonction `init()` ; courbes et durées dans un seul fichier, plus les jetons CSS ; `design-system/MOUVEMENT.md` qui décrit chaque animation (déclencheur, durée, plugin), utile aussi pour son portfolio ; l'interrupteur `options.animations` ; commentaires en français |
| **Contenu inventé** | aucun texte nouveau à part des libellés neutres dans le JSON (exemple après ce tableau) ; la pancarte est un simple calcul sur les horaires du JSON, avec « selon les horaires habituels » ; le plan vient de données OpenStreetMap réelles ; aucune allusion à un produit (pas de « coffret de 12 », pas de prix) |
| **Contraintes strictes** | aucun tiers au chargement (OpenStreetMap au clic, Overpass seulement sur le poste du développeur) ; aucun cookie ni traceur ; pas de panier ni de commande ; contact par `tel:` et `mailto:` ; palette et deux familles de polices uniquement |
| **Navigateurs** | View Transitions : Chrome, Edge, Safari 18.2+ (iOS compris), avec un repli CSS ailleurs ; `linear()` est partout supporté ; `mask` avec le préfixe `-webkit-` |
| **Ordre du chantier** | jetons et typographie, puis détourage v2, puis accueil, Nos macarons, Coffrets, La boutique, et enfin 404 et mentions ; Lighthouse et captures après chaque page |

**Ajouts au JSON**, avec de vrais identifiants de produits :

```json
"options": { "animations": true },
"fermetures_exceptionnelles": [],
"accueil": {
  "bandeau": ["cafe","champagne","citron-vert-cactus","figue","framboise-myrtille-violette","caramel-beurre-sale","chocolat-blanc","yuzu","fraise-tagada","noix-de-coco","speculoos","menthe-glaciale","pain-d-epices","tiramisu"],
  "familles": { "sucré": "creme-brulee", "salé": "chevre-basilic", "autre": ["calisson-mirabelle","calisson-orange","calisson-cassis","calisson-nature"] }
},
"interface": {
  "titres": { "carte": "La carte", "coffrets": "Coffrets et événements", "venir": "Venir à la boutique", "avis": "Avis Google", "plan": "Plan" },
  "libelles": { "ouvert": "Ouvert", "ferme": "Fermé", "habituels": "selon les horaires habituels", "pause": "Mettre en pause le défilement", "lecture": "Reprendre le défilement", "plan": "Afficher le plan interactif", "remettre": "Remettre le macaron en vitrine" }
}
```

## 6. Les 5 idées les plus fortes, classées

1. **La vitrine noire à gradins.** Sur l'accueil, les macarons sont déposés un par un selon la courbe « pose », leur reflet monte à leur rencontre dans le verre, puis un reflet de vitre révèle le nom peint sur la vitrine. Elle reprend le noir et le logo blanc du réseau et elle est physiquement crédible : c'est ce dont le visiteur se souviendra.
2. **Le détourage v2 de tout le catalogue.** Le pipeline sharp a été testé. Il transforme 94 carrés gris en objets posés sur des étagères (présentoir, bandeau, cartes, coffret). Sans lui, aucune autre idée ne tient ; avec lui, le site cesse d'avoir l'air d'un modèle.
3. **L'emballage au défilement**, sur Coffrets. On fait glisser les photos (l'animation imposée), on plie le papier de soie, on noue le ruban, l'étiquette se balance. Le tout en sticky CSS lié au défilement, sans pin, donc sans CLS.
4. **La pince entre deux pages.** Une View Transition entre documents avec un élément partagé : le macaron touché dans la vitrine vole jusqu'à sa carte sur Nos macarons. C'est rare techniquement, et ça a du sens : un bon argument pour le portfolio de Kerem.
5. **La porte de la rue Nationale.** Le « 885 » peint, la pancarte Ouvert / Fermé calculée à l'heure de Paris depuis le JSON, et un plan tracé à partir des vraies rues (OpenStreetMap, vectorisé une fois) avant que le plan interactif n'apparaisse en fondu au clic. C'est utile à celui qui cherche les horaires, sans aucune requête tierce.

## Annexe : prototypes réalisés pendant l'analyse

Rien n'a été modifié dans le projet. Tous les fichiers sont dans `C:\Users\kerem\AppData\Local\Temp\claude\1dc6ab7c800065bb\724a563b-ea14-40d1-bc47-5811419e6e68\scratchpad\essai\` :

- `detour2.mjs` : le prototype de détourage v2, réutilisable pour la phase suivante ;
- `v2-*.webp` : ses 8 sorties ;
- `planche-v2-noir.jpg` et `planche-v2-blanc.jpg` : le résultat v2 sur noir et sur blanc ;
- `planche-noir.jpg` : les détourés actuels sur noir, avec la galette grise ;
- `courbes.mjs` : l'échantillonnage des CustomEase qui donne la valeur `linear()` de « pose ».