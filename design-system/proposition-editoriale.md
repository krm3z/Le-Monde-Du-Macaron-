# « Pièce par pièce » : direction artistique et mouvement

**Point de départ (relevé dans le code et sur les captures)**
- **Mise en page.** Toutes les pages empilent des blocs construits de la même façon : héro en 2 colonnes, bande grise, grille 4 × 2 de carrés gris, liste d'événements, encadré brun arrondi. Chaque titre porte des capitales espacées au-dessus, et la navigation est une pilule floutée. C'est cet ensemble qui donne l'effet « gabarit ». Les captures `coffrets-*` montrent encore l'ancienne palette crème/olive et sont à refaire.
- **Photos disponibles.**
  - 77 macarons en 1000 × 1000 sur un dégradé gris-bleu. Le macaron n'occupe qu'environ 570 px de large, il reste donc net jusqu'à environ 280 px CSS sur écran Retina.
  - 15 calissons en 294 × 316 seulement, sur ardoise.
  - Litchi et rose n'ont pas de vraie photo.
- **Détourés actuels.** Les 8 macarons détourés font au plus 416 px. Posés sur #1B1A19, ils gardent l'ombre grise du studio et un liseré clair (vérifié sur une planche d'essai). Tels quels, ils sont inutilisables sur fond noir.
- **JavaScript.** 59,6 Ko gzip (GSAP, ScrollTrigger, Flip, Lenis) sont chargés sur toutes les pages, pour un seul petit effet par page.

---

## 1. Nom et idée directrice

**« Pièce par pièce »** (vitrine de nuit, carnet de jour).

Un macaron se vend à la pièce et se range un par un : tout le site suit ce geste. Les macarons, les lettres, les rues du plan et les fiches arrivent l'un après l'autre et se *posent*, sans être projetés ni rebondir. La mise en page alterne :
- la « vitrine de nuit » : pleines pages noires, le noir de l'en-tête du réseau, où les macarons détourés ressortent comme derrière la vitrine éclairée de la rue Nationale ;
- le « carnet de jour » : pages blanches composées comme un magazine de haute pâtisserie, avec un Playfair immense, des légendes en italique, un index et de vrais chiffres.

Le fuchsia du réseau n'est jamais une surface : c'est le fil qui relie les pièces (bouton, losange du filet, ruban, repère du plan).

---

## 2. Système visuel global

### 2.1 Grille et mise en page

```css
:root { --marge: clamp(1.25rem, 4.5vw, 4.5rem); --gout: clamp(1rem, 1.8vw, 2rem); --rayon: 0; }
.grille {
  display: grid; column-gap: var(--gout);
  grid-template-columns:
    [plein-debut] minmax(calc(var(--marge) - var(--gout)), 1fr)
    [contenu-debut] repeat(var(--cols, 4), minmax(0, 5.5rem))
    [contenu-fin] minmax(calc(var(--marge) - var(--gout)), 1fr) [plein-fin];
}
@media (min-width: 768px)  { .grille { --cols: 8; } }
@media (min-width: 1024px) { .grille { --cols: 12; } }   /* contenu max ≈ 1408 px */
```

**Règles de composition**
1. **Rien n'est centré**, sauf le losange du filet.
   - Le texte courant tient sur 6 colonnes au plus (environ 62 caractères) et part de la colonne 1 ou 2.
   - Les titres et les chiffres occupent de 8 à 12 colonnes. Ils sont décalés de −0,04 em à gauche pour que l'empattement s'aligne optiquement.
2. **Une seule image par section** sort de la grille, jusqu'au bord (`plein-debut` ou `plein-fin`), en changeant de côté d'une section à l'autre.
3. **Superpositions contrôlées.** Un titre #322C29 peut mordre de 1 à 2 colonnes sur le fond clair d'une photo studio (contraste ≥ 7:1). Jamais sur un macaron, jamais sur une zone sombre.
4. **Deux natures de section.**
   - `.nuit` (#1B1A19) et `.jour` (#FFF).
   - Marges verticales asymétriques : `padding-block: clamp(6rem, 13vw, 11rem) clamp(4rem, 8vw, 7rem)`.
   - Le gris #F4F4F2 ne sert plus de bande de section, sauf comme « papier » du plan.
5. **Chaque section a sa propre construction** : pile, bande, chiffre + index, colonnes décalées, chiffre + tableau, section épinglée, plan.
6. **Plus de cartes ni de capitales espacées.**
   - Angles vifs (`--rayon: 0`), filets de 1 px, aucune `box-shadow`, aucun `backdrop-filter`.
   - On supprime `.eyebrow`, `.footer__h`, `.card__label` et `.head-row`, ainsi que les `<em>` des H1.
   - Un titre se présente seul ; l'information secondaire vient après, en légende.
7. **Navigation.** On remplace la pilule par une bande noire pleine largeur de 64 px, comme l'en-tête du réseau :
   - le logo officiel à gauche, les liens en Inter 500 et un bouton fuchsia « Appeler · 04 74 67 68 35 » ;
   - la page active est signalée par un trait fuchsia de 2 px (`.nav__repere`) ;
   - la bande se masque quand on descend et revient quand on remonte (par `transform`) ;
   - sur téléphone : logo + « Appeler » + « Menu ».

### 2.2 Typographie

| Jeton | Usage | Police | Taille | Interl. | Approche |
|---|---|---|---|---|---|
| `--t-mega` | vrais chiffres : 79, 885, 8h–19h, 4,6, téléphone du pied | Playfair 400 | `clamp(5.5rem, 3.5rem + 14vw, 17rem)` | 0,82 | −0,04 em |
| `--t-titre` | H1 | Playfair 400 | `clamp(2.9rem, 1.4rem + 7vw, 9.5rem)` | 0,92 | −0,03 em |
| `--t-h2` | titres de section | Playfair 400 | `clamp(2.25rem, 1.4rem + 3.8vw, 5.25rem)` | 1 | −0,02 em |
| `--t-h3` | événements, noms des fiches | Playfair 500 | `clamp(1.35rem, 1.1rem + 1.2vw, 2.25rem)` | 1,1 | −0,01 em |
| `--t-chapeau` | phrase d'entrée (JSON) | Playfair 400 italique | `clamp(1.25rem, 1rem + 1.1vw, 1.9rem)` | 1,3 | 0 |
| `--t-bandeau` | noms du bandeau | Playfair 400 | `clamp(2rem, 1rem + 4.4vw, 4.75rem)` | 1 | −0,02 em |
| `--t-index` | index des 79 parfums | Playfair 400 | `clamp(1.15rem, .95rem + 1vw, 2rem)` | 1,35 | 0 |
| `--t-texte` | texte courant | Inter 400 | `clamp(1rem, .96rem + .2vw, 1.125rem)` | 1,65 | 0, 62 ch max |
| `--t-ui` | menu, boutons, filtres | Inter 500/600 | `.875rem` | 1 | +0,01 em |
| `--t-legende` | légendes photos et chiffres | Playfair 400 italique | `.95rem` | 1,35 | 0 |
| `--t-meta` | dates, crédits, compteurs | Inter 500 | `.8125rem` | 1,4 | chiffres tabulaires |

Vérifications de largeur :
- À 375 px, le H1 fait 48,6 px : « du Macaron » tient sur 216 px à côté de la pile, et `--t-mega` (108 px) affiche « 885 » sur environ 190 px.
- À 1440 px, `--t-mega` fait 258 px : « 8h — 19h » tient sur environ 1160 px.

**L'italique Playfair est une voix, pas un accent.** Il est toujours de la couleur du romain, jamais fuchsia, et ne sert jamais à souligner un mot. Il a cinq usages, pas un de plus :
1. les chapeaux ;
2. les légendes ;
3. les macarons salés dans l'index et le bandeau, dans un groupe titré « Salés » pour que l'italique ne soit pas le seul signal ;
4. l'esperluette de « Coffrets & événements » ;
5. le « du » du nom, plus petit (0,5 em), comme dans le logotype officiel où « du » est réduit.

**Typographie française à la compilation.** Une fonction `typo()` dans `src/lib/site.js`, appliquée à tout texte venu du JSON :
- espace fine insécable (U+202F) avant ; : ! ? et à l'intérieur des « » ;
- apostrophe typographique ’ ;
- tiret demi-cadratin dans les plages horaires.

**Polices chargées.**
- Fichiers : Playfair 400, 400 italique et 500 ; Inter 400, 500 et 600. Cela fait 6 fichiers, environ 140 Ko.
- Seules Playfair 400 et Inter 400 sont préchargées.
- Une police de repli aux métriques ajustées (`size-adjust`, `ascent-override`) évite que le passage Georgia → Playfair décale la page. Les valeurs se calculent avec Capsize ou fontaine, elles ne se devinent pas.

### 2.3 Traitement des photos

**Trois familles, trois traitements**

| Famille | Où | Traitement |
|---|---|---|
| **Détourés v2** (77 macarons) | pile de la vitrine, nuancier, bandeau, aperçu au curseur, 404 | Fond transparent. Sur blanc, ombre de contact en CSS ; sur noir, pas d'ombre, et un reflet sur l'étagère. Sorties 280w et 560w (≤ 20 Ko). |
| **Tirages studio** (fond gris-bleu) | événements, défilé des coffrets | Cadres rectangulaires 2:3 ou 4:5, `object-fit: cover`, `object-position: 50% 52%`, légende italique à côté. Largeur ≤ 560 px CSS pour rester nets en DPR 2. |
| **Calissons** (ardoise, 294 px) | fiches du nuancier | Jamais plus de 294 px. Toujours sur #1B1A19, avec `mask-image: radial-gradient(closest-side, #000 70%, transparent)` qui fond l'ardoise dans le noir. |

Litchi et rose : pas de fausse image. La cellule reçoit le filet-losange et la mention « Photo à venir ».

**Détourage v2 dans `scripts/photos.mjs`**
1. Travailler sur l'original de 1000 px : supprimer le `resize(700)`. Sorties `detoure/<nom>-280.webp` et `-560.webp`.
2. Retirer l'ombre du studio. On calcule, colonne par colonne, le bas de la coque colorée ; en dessous, les pixels neutres (écart RVB ≤ 16) reliés au fond deviennent transparents.
3. Supprimer le liseré :
   - éroder le masque de 2 px, puis le flouter d'1 px ;
   - donner aux pixels semi-transparents la couleur de leur voisin opaque, sinon un halo clair apparaît sur le noir.
4. Prévoir des réglages par photo dans `scripts/detourage.json` (`tolerance`, `ombre` en % de hauteur coupée, `exclure`). C'est indispensable : sur mon essai de 10 photos, une règle unique nettoie bien framboise, coco, chocolat blanc et guimauve, mais abîme violette (violet peu saturé).
5. Générer à chaque build une planche de contrôle (`captures/planche-detourage.jpg`) où chaque macaron apparaît sur blanc et sur #1B1A19, et la valider à l'œil.
6. Les 8 pièces de la vitrine de nuit peuvent être retouchées à la main (gomme sur l'ombre). C'est du détourage, pas de la création d'image.
7. Si un détourage échoue : on revient au tirage studio en cadre.

**Ombres et reflets**
- Sur blanc : ombre de contact en `::after`, `radial-gradient(closest-side, rgb(50 44 41 / .2), transparent)`, d'une hauteur de 8 % du macaron.
- Sur noir : `-webkit-box-reflect: below 0 linear-gradient(transparent 70%, rgb(255 255 255 / .14))`, sur la pile seulement, retiré sous 600 px.
- Aucun `filter: drop-shadow`, trop coûteux sur 94 images.

**Masques**
- Un seul masque géométrique : le rectangle.
- Les révélations se font en `clip-path: inset()`, depuis le côté où se trouve le texte.
- L'image intérieure fait un contre-zoom de 1,15 à 1.

### 2.4 Éléments graphiques maison

- **Le filet-losange.** Il vient du logo officiel : un trait fin coupé d'un losange pointé.
  - Forme : composant SVG `<Filet />`, deux traits de 1 px de part et d'autre d'un losange de 9 px (contour + point central).
  - Rôles : clore chaque H1 (sur 3 colonnes), servir de tiret entre « 8h » et « 19h », séparer les blocs du pied de page.
  - Couleurs : traits #322C29 (blanc à 40 % sur fond noir), losange fuchsia.
  - Apparition : le losange grandit de 0 à 1 en 0,35 s, puis les deux traits partent du centre (DrawSVG, 0,8 s).
- **L'étagère.** Filet blanc à 22 % qui traverse la vitrine de la colonne 1 jusqu'au bord droit. Le nom et la pile sont posés sur cette même ligne de base. Elle se trace de gauche à droite au chargement.
- **Le ruban.** Trait fuchsia de 2 px en bas du défilé des coffrets, qui avance avec le défilement. Ses 3 repères cliquables (Conscrits, Mariages, Entreprises) en font à la fois une barre de progression et un sommaire.
- **Le plan dessiné.** Les rues du quartier, tracées à partir des données OpenStreetMap (voir 4.4).
- **Le repère macaron.** Le symbole `#macaron-mark` existant, réservé au plan et au favicon.
- **Les étoiles au dixième.** 5 étoiles SVG remplies par un `clipPath` à note/5, soit 92 % pour 4,6, calculé depuis le JSON.
- **Rien d'autre** : ni motif, ni grain, ni dégradé de couleur, ni forme organique.

### 2.5 Couleurs

| Couleur | Où | Jamais |
|---|---|---|
| #FFFFFF | pages « jour », recto des fiches, titres sur fond noir | — |
| #F4F4F2 | texte courant sur fond noir (15,8:1), « papier » du plan, cellules « Photo à venir » | bandes de section grises |
| #D72688 | fond des boutons avec texte blanc (4,65:1) ; losange des filets, ruban, repère du plan, étoiles, page active du menu ; anneau de focus sur blanc ; « Allergènes au dos » sur blanc | texte sur gris (4,2:1) ou sur noir (3,74:1) ; aplats ou sections fuchsia ; dégradés |
| #B01E6F | survol et appui des boutons fuchsia | décor |
| #1B1A19 | pages « nuit » (vitrine, événements, défilé, horaires, pied, 404), barre de navigation, menu, verso des fiches de macarons | texte sur blanc |
| #322C29 | tout le texte sur blanc (≈ 13,7:1), fin du remplissage, rue Nationale, filets | fonds |
| #5F5955 | légendes et méta sur blanc (6,9:1) | sur noir |
| Teintes dérivées | filets `rgb(50 44 41 / .16)` ; texte secondaire sur noir `rgb(244 244 242 / .72)` (8,6:1) ; début du remplissage #8E8B89 (brun-noir à 55 %, 3,4:1, autorisé car le texte fait ≥ 28 px) | toute autre teinte |

---

## 3. Système de mouvement

### 3.1 Principe et courbes

Deux principes :
- **Posé, jamais projeté.** Pas de rebond élastique, pas de déformation au défilement, pas de boucle infinie.
- **Règle de performance (LCP).** Tout ce qui est visible au premier écran s'anime en CSS dès le premier rendu, sans attendre le JS. GSAP ne gère que ce qui est plus bas, ou ce que l'utilisateur déclenche.

```js
CustomEase.create('maison', 'M0,0 C0.22,1 0.36,1 1,1');            // arrivées : départ franc, longue pose
CustomEase.create('rideau', 'M0,0 C0.76,0 0.24,1 1,1');            // volets, retournements, épinglage
CustomEase.create('pose',   'M0,0 C0.18,0.42 0.36,0.98 0.58,1.03 C0.72,1.06 0.84,1 1,1'); // tassement de 4 %
```
```css
--ease-maison: cubic-bezier(.22, 1, .36, 1);
--ease-rideau: cubic-bezier(.76, 0, .24, 1);
--ease-pose: linear(0, .5 14%, .86 28%, 1.02 46%, 1.04 58%, 1.01 76%, 1);
```

### 3.2 Durées et décalages

| Usage | Durée | Courbe |
|---|---|---|
| Survols (couleur, fond) | 180 ms | `ease-out` |
| Soulignement des liens | 300 ms | maison |
| Interface (menu, filtre, repère, compteur) | 450 ms | maison / rideau |
| Pose d'un macaron | 0,62 s, décalage 0,11 s | pose (verticale) + maison (horizontale) |
| Lettres et mots des H1 | 0,9 s, décalage 22 ms par lettre ou 60 ms par mot | maison |
| Lignes des H2 | 1,1 s, décalage 0,09 s | maison |
| Chiffres géants | 1,2 s, décalage 0,07 s | maison |
| Images en cadre | `clip-path` 1,2 s + image 1,6 s | rideau / maison |
| Filets | 0,35 s + 0,8 s | maison |
| Retournement de fiche | 0,8 s | rideau |
| Transition de page | sortie 0,45 s, entrée 0,7 s | rideau / maison |
| Effets liés au défilement | `scrub: .6` | `none` |

### 3.3 Apparitions, une par type de bloc

Chaque apparition ne joue qu'une fois (`once: true`) et démarre à `start: 'top 82%'`.

| Bloc | Effet | Outil |
|---|---|---|
| H1 (premier écran) | mots qui montent derrière un masque (`translate 0 105% → 0`) | découpage fait à la compilation par un composant Astro `<Lettres>` ; animation CSS |
| H2 `data-reveal="lignes"` | lignes qui montent derrière un masque | SplitText `{type:'lines', mask:'lines', autoSplit:true, aria:'none'}`, puis `revert()` |
| Chapeau `mots` | mots en fondu, `y .25em → 0`, décalage 18 ms | SplitText words |
| Image `image` | volet `inset(0 0 0 100%) → inset(0)` depuis le côté du texte + contre-zoom | ScrollTrigger |
| Chiffre géant `chiffres` | chiffres qui montent un à un derrière un masque | `<span>` posés à la compilation, animés par GSAP |
| Filet `filet` | losange, puis traits du centre vers l'extérieur | DrawSVG |
| Liste `liste` (horaires, pied) | lignes en fondu seul, 50 ms d'écart, sans mouvement | `ScrollTrigger.batch` |
| Texte et boutons `fondu` | opacité seule, 0,6 s, 0,15 s après le titre | ScrollTrigger |
| Fiches du nuancier | « posées » : `y −10 → 0` + fondu, par lots | `ScrollTrigger.batch` |

**Filet de sécurité.** `.js [data-reveal] { animation: secours 0s 3s forwards }` rend tout visible au bout de 3 s si le JS ne s'est pas chargé. GSAP retire cette animation dès qu'il prend la main.

### 3.4 Transitions entre pages

On garde un site multi-page natif, sans routeur client. Ce sont les View Transitions du navigateur qui assurent la continuité : chaque page démarre propre, sans ScrollTrigger à démonter.

```css
@view-transition { navigation: auto; }
.nav { view-transition-name: nav; }                 /* la barre ne bouge pas */
.nav__repere { view-transition-name: nav-repere; }  /* le trait fuchsia glisse d'un lien à l'autre */
::view-transition-group(nav-repere) { animation: .6s var(--ease-maison) both; }
::view-transition-old(root) { animation: .45s var(--ease-rideau) both sortie; }
::view-transition-new(root) { animation: .7s var(--ease-maison) both entree; }
@keyframes sortie { to { opacity: .5; transform: translateY(-4vh) scale(.985); } }
@keyframes entree { from { clip-path: inset(100% 0 0 0); } }   /* la page suivante monte comme un rideau */
```

- **Macaron partagé (Accueil → Nos macarons).**
  - Au clic sur un parfum de l'index, `pageswap` donne `view-transition-name: macaron-choisi` à l'aperçu flottant.
  - Sur la page d'arrivée, `pagereveal` donne le même nom à l'image de la fiche `#id`, puis l'efface sur `viewTransition.finished` : le macaron vole du curseur jusqu'à sa fiche.
  - L'écouteur `pagereveal` doit être posé dans un script inline du `<head>`, sinon il arrive trop tard.
- **Préchargement des pages internes** : `<script type="speculationrules">{"prefetch":[{"where":{"href_matches":"/*"},"eagerness":"moderate"}]}</script>`. C'est le même domaine, et on fait bien du prefetch, pas du prerender, pour ne pas lancer les intros cachées.
- **Navigateurs sans View Transitions** : navigation normale ; l'entrée du H1 en CSS assure la continuité.

### 3.5 Curseur et survols

- **Curseur système conservé** : pas de curseur personnalisé, pas de boutons « magnétiques ».
- **Liens** : un trait de 1 px se dessine de gauche à droite (`background-size 0 → 100%`, 300 ms) et repart vers la droite quand on sort.
- **Boutons** : #D72688 → #B01E6F, et la flèche avance de 4 px.
- **Fiches** : le macaron monte de 6 px et son ombre se resserre (`scale .85`, opacité .6), comme si on le soulevait de l'étagère.
- **Index des parfums** : aperçu flottant (voir 4.1).
- Tout cela n'existe que sous `@media (hover: hover)`.

### 3.6 Code, plugins et budget

```
src/scripts/main.js                → noyau + import() du module de la page (body[data-page])
src/scripts/noyau/mouvement.js     → plugins, courbes, Lenis (lerp .1, anchors), gsap.matchMedia, drapeau reduce
src/scripts/noyau/apparitions.js   → data-reveal
src/scripts/noyau/nav.js           → barre, menu (inert sur main/footer), repère
src/scripts/noyau/transitions.js   → pageswap
src/scripts/pages/{accueil,macarons,coffrets,boutique,erreur}.js
```

| Lot JS (gzip) | Contenu | Poids |
|---|---|---|
| Noyau, toutes les pages | gsap 28,4 + ScrollTrigger 18 + Lenis 5,4 + SplitText 3,7 + CustomEase 3,7 + DrawSVG 2,2 + code ~7 | ≈ 68 Ko |
| Nos macarons | + Flip 9,7 + code | + 13 Ko |
| Autres pages | code seul | + 2 à 5 Ko |

Plugins écartés, et pourquoi :
- Draggable et Inertia : 17 Ko, effet gadget.
- MorphSVG et Observer : inutiles ici.
- ScrollSmoother : il ferait doublon avec Lenis, et en transformant le conteneur il casse `position: sticky` et les View Transitions.

### 3.7 Mouvement réduit (`prefers-reduced-motion: reduce`)

- Pas de Lenis, pas de SplitText, pas d'épinglage, pas de `clip-path`, pas de transformation.
- Toutes les apparitions deviennent `opacity 0 → 1` en 0,4 s.
- Vitrine : les macarons apparaissent en fondu un par un (même décalage), puis le nom en fondu.
- Bandeau : arrêté, il devient une liste qui défile à la main.
- Filtre : fondu sortie/entrée. Fiches : fondu croisé recto/verso (comme aujourd'hui).
- 719 et le plan s'affichent directement, en fondu.
- View Transitions ramenées à un fondu croisé de 200 ms.
- L'aperçu au curseur est désactivé.

---

## 4. Page par page

### 4.1 Accueil

**Structure**
1. **`.vitrine.nuit`** (100svh, minimum 600 px)
   - La pile de 8 macarons à droite (colonnes 9 à 11).
   - Le nom en bas à gauche (colonnes 1 à 8), posé sur l'étagère.
   - Sous l'étagère, colonnes 1 à 7 : le chapeau (`textes.accroche`, en italique) et la bande d'infos (« Aujourd'hui, jeudi : 8h – 19h · 885 rue Nationale · 04 74 67 68 35 ») avec le bouton « Voir les macarons ».
   - Le reflet occupe la zone sous la pile.
2. **`.bandeau.jour`**, entre deux filets.
   - 12 macarons détourés (88 px) et leurs noms, avec les salés en italique, séparés par un petit losange fuchsia.
   - Un bouton « Mettre en pause ».
3. **`.parfums.jour`**
   - « 79 » en chiffre géant (colonnes 1 à 5), légendé « parfums à la carte : 68 sucrés, 11 salés, et 15 calissons ». Tous ces nombres sont calculés depuis `produits.json`.
   - Dessous, l'**index** : les 79 noms composés en texte continu, en deux paragraphes « Sucrés » (romain) et « Salés » (italique), chaque nom renvoyant vers `/nos-macarons/#id`.
   - Légende : `textes.intro_accueil`.
4. **`.evenements.nuit`**
   - Trois colonnes à hauteurs décalées (0, +8rem, +4rem) : tirage 3:4, titre, sous-titre en italique.
   - Lien vers la page Coffrets & événements.
5. **`.venir.jour`**
   - « 8h — 19h » en chiffre géant, le filet-losange servant de tiret.
   - À droite : le jour en cours, l'adresse, les boutons Itinéraire et Appeler, la ligne « 4,6/5 · 719 avis Google ».
6. **Pied `.nuit`**
   - Le téléphone en Playfair géant (`clamp(2.5rem, 1rem + 7vw, 7.5rem)`), sous forme de lien `tel:`.
   - Logo, adresse, horaires, réseaux, « Aucun cookie, aucun suivi », crédit.

**Grosse animation : « La pile »**

C'est du CSS pur, lancé au premier rendu. Les 8 pièces viennent de `boutique.json` (liste `accueil.pile`, du bas vers le haut).

| Temps | Ce qui se passe |
|---|---|
| 0,00 s | L'étagère se trace de gauche à droite : `scaleX 0 → 1`, 0,6 s, courbe maison. |
| 0,20 s | Première pièce, posée en arc grâce à deux mouvements combinés : `.vitrine__mac` va de `translate 28px → var(--dx)` (maison) pendant que l'image descend de `−64px` à 0 avec une rotation de `−5° → 0` (courbe pose, 0,62 s). Le dépassement de la courbe donne le tassement à l'impact. |
| +0,11 s par pièce | `--delai: calc(.2s + var(--i) * .11s)`. Chaque pièce a un décalage déterministe `--dx` de ±3 px, pour un empilement fait main. La 8ᵉ est posée vers 1,6 s. |
| 1,45 s | Le nom : 19 lettres dans 4 masques de mots (`padding-block: .1em` compensé), de `translate 0 105% → 0`, 0,9 s, 22 ms d'écart. Le « du » est en italique à 0,5 em. Fin vers 2,75 s. |
| 2,05 s | Le chapeau : les mots apparaissent en fondu (0,8 s). |
| 2,30 s | La bande d'infos : filet supérieur tracé (0,7 s), puis textes en fondu. |
| Au défilement (GSAP) | En quittant la vitrine, la pile monte à 0,85 fois la vitesse du défilement et le nom à 0,94 fois (`scrub`). Il n'y a pas de conflit : GSAP agit sur le conteneur, le CSS sur les pièces. |

**Retour vers l'accueil depuis une autre page du site.** Un script inline du `<head>` compare `document.referrer` à `location.origin`. Si on vient du site, il pose `.intro-courte` : les pièces arrivent à 40 ms d'écart et tout est fini en 0,9 s. Aucun stockage n'est utilisé.

**Accessibilité de la vitrine.**
- Le `h1` porte un `aria-label`, et les lettres sont en `aria-hidden`.
- La pile est une `figure` avec `role="img"` et `aria-label="Pile de huit macarons : chocolat, pistache…"`.
- Préchargement de Playfair 400 et `fetchpriority="high"` sur les 3 premières pièces.

**Micro-interactions**
- **Bandeau** : boucle GSAP (`xPercent −50`, 60 s, `ease none`).
  - Au survol ou au toucher, `timeScale` descend à 0,15 en 0,6 s, et remonte à 1 en 0,9 s quand on sort.
  - La vitesse de défilement peut l'accélérer jusqu'à ×2,5, toujours de droite à gauche.
  - Il se met en pause hors écran (`onToggle`).
  - Le bouton Pause répond au critère WCAG 2.2.2, qui manque aujourd'hui.
- **Aperçu au curseur** (seulement sous `(hover: hover) and (pointer: fine)`, et hors mouvement réduit) :
  - `.apercu` est fixe, fait 220 px, est en `aria-hidden` et utilise deux calques d'image A et B.
  - Suivi : `gsap.quickTo(x|y, {duration: .45, ease: 'power3'})`.
  - Inclinaison : rotation de ±8° selon la vitesse horizontale.
  - Apparition : `scale .6 → 1` en 0,35 s.
  - Changement de parfum : fondu croisé de 0,2 s après `img.decode()`. Images 280w/560w chargées à la demande et gardées en cache.
  - Au clavier, l'aperçu apparaît aussi au `focus`, accroché à droite du lien.
- **Événements** : au survol, la légende en italique glisse de 8 px et l'image passe de 1 à 1,03.

**Sur téléphone**
- Vitrine : pile à droite (`clamp(80px, 22vw, 110px)`, environ 350 px de haut), nom sur 2 lignes à gauche, pas de reflet. Les infos et les boutons « Appeler » (fuchsia) et « Itinéraire » passent avant le chapeau.
- Bandeau à 2rem, macarons de 56 px.
- Index à 1,15rem, sans aperçu.
- Événements empilés, tirages 4:5 alternés à gauche et à droite (80 % de la largeur).
- « 8h », le filet, puis « 19h » sur trois lignes.

### 4.2 Nos macarons

**Structure**
1. **En-tête (jour)** : H1 « Nos macarons » (mots en CSS), filet, texte `intro_macarons` en Inter sur 6 colonnes. Beaucoup d'air à droite.
2. **Barre de filtres collante** sous la navigation, en ligne typographique : « Tout 94 · Sucré 68 · Salé 11 · Calissons 15 ».
   - La catégorie active est soulignée par un trait fuchsia de 2 px.
   - Un compteur visible s'anime, et une région `aria-live` séparée n'annonce que la valeur finale.
3. **Le nuancier** (`ul.nuancier`)
   - Cellules à angles vifs. Les filets sont faits avec `outline: 1px`, pas avec un fond visible entre les cellules : ainsi ils suivent les fiches pendant le Flip.
   - **Recto** : macaron détouré + ombre de contact, nom en `--t-h3`, famille en `--t-meta` #5F5955, « Allergènes au dos » en fuchsia sur blanc.
   - **Calissons** : cellule #1B1A19, photo fondue par le masque radial, textes blancs.
   - **Verso = inverse du recto** (noir pour les macarons, blanc pour les calissons) : nom en italique, description, allergènes (la marque « [À VÉRIFIER] » est conservée), « Un doute ? Demandez conseil en boutique ».
4. **`aussi_en_boutique`** et un filet pour finir.

**Grosse animation : filtre qui fait glisser les fiches, et retournement**

*Au clic sur « Salé » :*
- Le trait fuchsia glisse sous « Salé » (0,45 s) et le compteur passe de 94 à 11 (0,5 s, par pas de 1).
- On capture `Flip.getState(fiches)`, puis on masque les fiches filtrées (`hidden`).
- Les fiches qui partent disparaissent : opacité 0, `scale .92`, `y 12`, 0,3 s, `power2.in`.
- Les fiches qui restent glissent à leur nouvelle place : `Flip.from(etat, {duration: .75, ease: 'rideau', absolute: true, prune: true, targets: fichesVisibles, stagger: .012})`.
  - Seules les fiches à l'écran (`IntersectionObserver`) sont animées ; les autres sautent directement à leur place.
- Les fiches qui arrivent glissent depuis `x 48px` en fondu, avec 0,25 s de retard et 0,02 s d'écart entre elles.
- À la fin :
  - si la grille est remontée au-dessus de l'écran, `lenis.scrollTo(grille, {offset: -140})` ;
  - puis `ScrollTrigger.refresh()` et `lenis.resize()` ;
  - l'adresse devient `?filtre=sale` (`replaceState`), pour pouvoir la partager.

*Au retournement d'une fiche (clic, Entrée ou Espace sur le bouton `aria-pressed`) :*
- `rotationY 0 → 180` en 0,8 s, courbe rideau, `transformPerspective 1200`.
- En même temps, un soulèvement `z 0 → 60 → 0` (0,4 s aller-retour).
- Les faces s'échangent par `backface-visibility`, et leurs `aria-hidden` s'inversent.

*Arrivée depuis l'accueil (`#id`) :*
- Le macaron fait le trajet depuis l'accueil grâce à la View Transition.
- Sans View Transition, un filet fuchsia d'1 px fait le tour de la fiche (DrawSVG sur un `rect`, 0,9 s).
- La fiche visée est exclue de l'état caché du départ.

**Micro-interactions** : soulèvement au survol ; les fiches apparaissent « posées », par lots de 4 à 8.

**Sur téléphone**
- 2 colonnes, fiches 2:3.
- Le texte du verso s'adapte à la largeur de la fiche : `container-type: inline-size; font-size: clamp(.75rem, 6.5cqi, .9rem)`.
- La barre de filtres défile horizontalement (`data-lenis-prevent`).
- Flip limité aux fiches visibles.

### 4.3 Coffrets & événements

**Structure**
1. **En-tête (jour)** : H1 « Coffrets & événements » avec l'esperluette en italique, et un filet.
2. **Texte qui se remplit (jour)** : `intro_coffrets` en Playfair 400 `clamp(1.75rem, 1rem + 3.2vw, 3.75rem)`, sur 9 colonnes.
   - Les mots sont découpés par SplitText (`words`, `aria:'none'`).
   - Chaque mot passe de #8E8B89 (posé en CSS sous `.js`) à #322C29, de `top 75%` à `bottom 45%`, avec `scrub .6` et 0,1 s d'écart.
3. **Le défilé (nuit)** : 3 chapitres, un par événement.
   - Un panneau texte (40vw) : titre `clamp(3rem, 1.5rem + 5vw, 6.5rem)`, sous-titre en italique, texte, boutons Appeler et Envoyer un mail avec objet pré-rempli.
   - Puis le triptyque des 3 photos de l'événement (`evenements[].photos`) : cadres 2:3 de 18vw (le premier en 24vw), à hauteurs décalées (0, 6svh, 3svh).
   - Le ruban en bas.
4. **Commander (jour)** : `textes.contact` (texte existant déplacé dans le JSON), boutons tél. et mail, marque « [À REMPLACER] e-mail ».

**Grosse animation : « Le défilé »**

Elle n'est active que sous `gsap.matchMedia('(min-width:1024px) and (min-height:640px) and (prefers-reduced-motion:no-preference)')`.
- **Déclencheur** : le haut de la section atteint le haut de l'écran.
  - `pin: true`, `scrub .6`, `end: () => '+=' + (piste.scrollWidth - innerWidth)` (environ 3 hauteurs d'écran), `invalidateOnRefresh`.
  - La piste se déplace avec `x: () => -(scrollWidth - innerWidth)`, `ease none`.
- **Chaque photo** :
  - elle s'ouvre de `inset(0 0 0 100%)` à `inset(0)` en 1,2 s (rideau), au point `left 85%` (`containerAnimation`) ;
  - l'image, à 116 % de largeur, glisse de `xPercent −8` à `8` pendant toute sa traversée (parallaxe inverse).
- **Titre de chaque chapitre** : ses lignes montent (SplitText) à son passage, toujours via `containerAnimation`.
- **Ruban** : `scaleX` suit la progression. Le repère de l'événement en cours passe en blanc plein, et un clic sur un repère amène au chapitre.
- **Clavier** : si le focus entre dans un panneau, `lenis.scrollTo` amène à la position correspondante.
- **Ancres `#conscrits`, `#mariages`, `#entreprises`** venues de l'accueil : la bonne position dans la section épinglée est calculée au chargement.

**Sur téléphone et tablette en portrait**
- Pas d'épinglage : chaque événement est un bloc vertical.
- Ses 3 photos sont alignées en rangée (cadres de 62vw) et glissent sur le côté au défilement : `xPercent 6 → −28`, `scrub`. L'effet demandé est conservé sans détourner le défilement.

### 4.4 La boutique

**Structure**
1. **En-tête (jour)**
   - H1 « La boutique » et chapeau `textes.intro_boutique` (phrase actuelle, déplacée dans le JSON).
   - L'adresse en chiffre géant : « 885 », puis « rue Nationale / 69400 Villefranche-sur-Saône » en italique, à partir de `adresse.numero` et `adresse.voie`.
   - Boutons Itinéraire et Appeler, téléphone, e-mail.
2. **Horaires (nuit)**
   - « 8h — 19h » en chiffre géant, « du lundi au samedi » en italique, « dimanche : fermé ».
   - Le tableau des 7 jours. Le jour en cours, calculé en heure de Paris (`Intl.DateTimeFormat`, `timeZone: 'Europe/Paris'`), porte un filet blanc et la mention « aujourd'hui » en italique.
3. **Le plan** (fond #F4F4F2)
4. **Avis (jour)**
   - « 4,6 » et « /5 », les étoiles au dixième.
   - Le compteur « 719 avis Google » et « relevé le 19 novembre 2026 ».
   - Le lien vers les avis.
5. **Contact (jour)**

**Grosse animation : « La rue se dessine »**
- **Données.** Un nouveau script `scripts/plan.mjs`, lancé à la compilation :
  - il lit un extrait OpenStreetMap enregistré une fois pour toutes (`assets/plan/quartier.geojson`, export Overpass d'environ 700 × 450 m centré sur `geo`) ;
  - projette en Mercator, simplifie les tracés (Douglas-Peucker), classe les voies et isole « Rue Nationale », orientée de gauche à droite pour que le libellé ne soit pas à l'envers ;
  - calcule la position du repère depuis `boutique.geo` ;
  - écrit `src/generated/plan.json`, affiché en SVG inline par `<Plan />`. Aucune requête tierce, et le crédit « © contributeurs OpenStreetMap » est affiché.
- **Déroulé.** La timeline démarre à `top 70%` et ne joue qu'une fois ; elle n'est pas liée au défilement, pour toujours aller au bout.

| Temps | Ce qui se passe |
|---|---|
| 0,0 s | Le plan apparaît en fondu (`autoAlpha 0 → 1`, 0,6 s). |
| 0,2 s | Les rues secondaires (1,2 px, brun-noir à 35 %) se dessinent, DrawSVG 0,9 s, 0,02 s d'écart, de la plus proche à la plus éloignée du repère. |
| 0,9 s | La rue Nationale (3 px, #322C29) se dessine d'un bout à l'autre, 1,1 s, rideau. |
| 1,6 s | Le libellé « Rue Nationale » apparaît le long de la rue (`textPath`, `startOffset` animé + fondu). |
| 2,0 s | Le repère macaron se pose (`y −36 → 0`, courbe pose), et un anneau fuchsia unique s'élargit (`scale .4 → 2.2`, fondu, 0,9 s). |
| 2,3 s | L'étiquette « 885 » apparaît. |

- **Au clic sur « Afficher le plan interactif »** : l'iframe OpenStreetMap n'est créé qu'à ce moment. Elle apparaît en fondu (1 s) quand elle est chargée, avec un secours à 2,5 s. Le plan dessiné s'efface et le focus passe sur l'iframe.

**Animations discrètes**
- Compteur 0 → 719 (`textContent`, `snap 1`, 1,8 s, `power3.out`). Sa largeur est figée sur le nombre final avant le comptage.
- Remplissage des étoiles de 0 à 92 % (1,2 s).
- Filet-losange de « 8h — 19h ».

**Sur téléphone** : plan en 4:5 centré sur la boutique (`xMidYMid slice` ; la zone exportée est centrée sur `geo`), « 885 » à 7rem, horaires sur trois lignes.

### 4.5 Mentions légales

- Page de respiration, sobre comme un colophon : H1 et filet.
- À partir de 1024 px, deux colonnes :
  - à gauche, un sommaire collant de 6 ancres en Inter, avec un trait fuchsia sur la section en cours (bascule de classe par ScrollTrigger) ;
  - à droite, le contenu en `dl` sous forme de grille.
- Les marques « [À REMPLACER] » sont conservées.
- Aucune autre animation que la transition de page et l'entrée du H1. Sur téléphone, le sommaire disparaît.

### 4.6 404

- Pleine page nuit : une étagère avec 7 macarons détourés et une place vide, marquée par un contour pointillé.
- « 404 » en chiffre géant blanc (`aria-hidden`), H1 « Page introuvable », la phrase `textes.erreur_404` (existante, déplacée dans le JSON), boutons Accueil et Nos macarons.
- **Grosse animation**, même grammaire que l'accueil, en CSS :
  - les 7 pièces sont posées une par une (0,09 s d'écart) ;
  - le contour de la place vide se dessine (DrawSVG, 0,8 s) et clignote une seule fois en opacité ;
  - pas de boucle.
- Sur téléphone : 5 pièces et la place vide.

---

## 5. Risques et parades

**Performance sur un téléphone moyen**
- **LCP de l'accueil** (le nom apparaît après la pile).
  - Parades : intro en CSS dès le premier rendu, nom lancé à 1,45 s, Playfair 400 préchargée, police de repli aux métriques ajustées.
  - Objectif : LCP < 2,5 s en Lighthouse mobile.
  - Si on dépasse : décalage réduit à 0,08 s, nom lancé dès la 6ᵉ pièce.
  - Les H1 des pages intérieures sont eux aussi découpés à la compilation et animés en CSS.
- **JS** : environ 68 Ko de noyau, Flip chargé seulement sur Nos macarons. Mesure à faire : aucune tâche longue de plus de 50 ms au chargement (DevTools, CPU ralenti ×4).
- **Images**
  - Détourés ≤ 20 Ko, tout en `lazy` sauf la pile, `sizes` exacts.
  - Aperçu au curseur chargé à la demande.
  - Une visite complète de Nos macarons pèse environ 1,3 Mo, mais tout en `lazy`.
- **Coût d'affichage** (compositing)
  - On n'anime que `transform`, `opacity` et `clip-path` : ni `filter`, ni `backdrop-filter`.
  - `box-reflect` est retiré sous 600 px.
  - Le bandeau se met en pause hors écran.
  - L'épinglage n'existe qu'à partir de 1024 px.
  - Au plus 12 éléments animés en même temps.

**Accessibilité**
- **Contrastes** : selon le tableau 2.5. Le fuchsia n'apparaît jamais en texte ailleurs que sur blanc.
- **Découpage du texte.**
  - Pour les mots et les lignes, SplitText avec `aria:'none'`, puis `revert()` une fois l'animation finie.
  - Pour les lettres (nom, chiffres géants), découpage à la compilation : texte lisible (`aria-label` sur le `h1`, `sr-only` ailleurs) + version visuelle en `aria-hidden`.
  - Cela évite de poser un `aria-label` sur des `<p>`, ce que Lighthouse et axe signalent.
- **Défilé épinglé** : l'ordre du DOM suit l'ordre de lecture, le focus est ramené à l'écran, les ancres sont gérées, et rien n'est épinglé en mouvement réduit.
- **Bandeau** : bouton Pause et copie dupliquée en `aria-hidden`.
- **Menu** : `inert` sur le contenu quand il est ouvert, fermeture par Échap, focus rendu au bouton.
- **Focus visible** : fuchsia sur blanc, blanc sur noir. Cibles ≥ 44 px, sauf les liens dans le texte de l'index (exception « en ligne » prévue par les règles).

**Décalages de mise en page (CLS < 0,1)**
- `width`/`height` et `aspect-ratio` sur toutes les images.
- Police de repli aux métriques ajustées.
- Masques de lignes à hauteur constante : `padding-block` compensé par une marge négative.
- Compteur à largeur figée ; barre de filtres collante à hauteur fixe.
- Section épinglée créée sous la ligne de flottaison, puis `ScrollTrigger.refresh()` après `document.fonts.ready` et `load`.

**Maintenance par un étudiant**
- **Peu de règles à retenir** : 9 types d'apparition, 3 courbes, un module par page, des attributs `data-*` comme mode d'emploi. Le tout est documenté dans `design-system/MASTER.md`, à réécrire (jetons, tableau des apparitions, règles nuit/jour).
- **Composants Astro** : `<Lettres>`, `<Filet>`, `<Mega>`, `<Pile>`, `<Bandeau>`, `<IndexParfums>`, `<Fiche>`, `<Defile>`, `<Plan>`, `<Etoiles>`. On supprime les `style=""` inline des pages.
- **Nouvelles clés JSON**, toutes factuelles :
  - `adresse.numero` et `adresse.voie` ;
  - `textes.intro_boutique`, `textes.contact`, `textes.venir_titre`, `textes.erreur_404` (phrases existantes, déplacées) ;
  - `accueil.pile` et `accueil.bandeau` (listes d'identifiants de produits) ;
  - `plan.date_export`.
- **Les réglages techniques restent hors des JSON de contenu** : `scripts/detourage.json`.
- **Tous les chiffres sont calculés** depuis les JSON (79, 68/11/15, plage horaire, 885, 4,6, 719). Si un jour les horaires diffèrent d'un jour à l'autre, le chiffre géant affiche « Aujourd'hui… » au lieu d'une plage commune.

**Respect strict des contraintes**
- Palette, polices, site vitrine sans commerce : rien d'ajouté.
- Aucune image inventée : seulement des détourages, des recadrages et des compositions à partir des photos existantes.
- Aucune requête tierce au chargement : polices et GSAP sont locaux, OpenStreetMap ne se charge qu'au clic, le préchargement reste sur le même domaine.
- Aucun cookie, aucun stockage local : l'intro courte se décide par le `referrer`.
- **À faire confirmer par la gérante** : que « 79 parfums à la carte » (la carte du réseau) corresponde bien à la carte de la boutique. Les allergènes restent marqués « à vérifier ».

**Ordre de réalisation conseillé**
1. Jetons, grille, navigation, pied de page, typographie, filet.
2. Détourage v2 et planche de contrôle.
3. Accueil.
4. Nos macarons.
5. Coffrets & événements.
6. La boutique, avec `plan.mjs`.
7. 404, mentions légales, transitions et mouvement réduit.
8. Contrôles : Lighthouse mobile sur chaque page, 375/768/1024/1440 px, clavier, captures.

---

## 6. Les 5 idées les plus fortes, classées

1. **« La pile » de la vitrine de nuit.** Huit vrais macarons détourés s'empilent un par un en arc, puis le nom se pose sur la même étagère. C'est propre à ce sujet, mémorable, et réalisé en CSS dès le premier rendu, donc sans pénalité sur le LCP.
2. **Le nuancier détouré.** Les 77 macarons sont détourés par script, avec une planche de contrôle et des réglages par photo. Ils sont présentés sur une grille de filets à angles vifs, avec les calissons fondus dans le noir, un Flip qui glisse et un retournement 3D soulevé dont le verso est l'inverse du recto. C'est la page la plus consultée qui gagne le plus en qualité.
3. **L'index des 79 avec le macaron qui suit le curseur.** Typographie de magazine (sucrés en romain, salés en italique), chiffre géant réel, et un macaron qui vole jusqu'à sa fiche lors du changement de page (View Transition partagée). C'est le moment le plus technique et le plus étonnant, sans gadget.
4. **« La rue se dessine ».** Un vrai plan du quartier issu d'OpenStreetMap, tracé avec DrawSVG, avec le repère posé grâce aux coordonnées du JSON et la carte interactive chargée seulement au clic. C'est à la fois local, exact, respectueux de la vie privée et spectaculaire.
5. **Le défilé des coffrets et son ruban.** Une section épinglée en défilement horizontal, avec des triptyques révélés en `clip-path` et un ruban fuchsia qui sert à la fois de barre de progression et de sommaire, accessible au clavier. Sur téléphone, il garde l'effet « photos qui glissent » sans détourner le défilement.

*L'essai de détourage a été fait hors du projet, rien n'a été modifié dans le dossier.* Fichiers dans `C:\Users\kerem\AppData\Local\Temp\claude\1dc6ab7c800065bb\724a563b-ea14-40d1-bc47-5811419e6e68\scratchpad\` :
- `detoures-sur-noir.png` : les détourés actuels sur fond noir ;
- `v2-noir.png` et `v2-blanc.png` : le prototype v2 ;
- `v3-noir.png` : la règle unique qui abîme violette ;
- `detour-v2-test.cjs` : le script de l'essai.