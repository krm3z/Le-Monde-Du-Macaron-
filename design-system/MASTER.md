# Design system — Le Monde du Macaron (Villefranche)

Règles du site, à respecter pour toute nouvelle page. Les valeurs vivent dans `src/styles/site.css` (bloc `:root`).
Méthode : skill **ui-ux-pro-max** (requête « bakery patisserie local shop elegant », réglages variance 3, motion 3, density 3), filtrée par le cahier des charges du client, qui reste prioritaire.

## Style
- **Minimalisme posé** (famille « Minimalism & Swiss Style » du skill) : grille alignée à gauche, beaucoup d'espace, filets fins, peu d'ombres, angles de 6 px.
- **Écarté** : la recommandation du skill pour « Bakery/Cafe » (style vif en blocs, claymorphism), contraire à la demande d'un site sérieux et mature.
- Pas d'italiques décoratives dans les titres, pas de numéros « 01 / 02 », pas d'emoji.

## Couleurs (palette officielle du réseau, relevée sur mondedumacaron.fr le 19/11/2026)
| Rôle | Valeur | Usage |
|---|---|---|
| Fond | `#FFFFFF` blanc | fond principal, cartes |
| Sections | `#F4F4F2` gris clair | bandes alternées, bandeau de macarons |
| Action | `#D72688` rose fuchsia | boutons (texte blanc, 4,65:1), liens actifs, filets. En texte : seulement sur blanc |
| Action survol | `#B01E6F` | survol des boutons |
| Bandeau | `#1B1A19` noir | pilule de navigation, pied de page (comme l'en-tête du réseau) |
| Texte | `#322C29` brun-noir | texte et titres (13,5:1) ; bloc « Venir à la boutique » |
| Texte secondaire | `#5F5955` | légendes (6,8:1 sur blanc) |

Logo officiel (blanc, avec drapeau tricolore) : `public/logo-monde-du-macaron.webp`, posé uniquement sur fond noir.
La première palette du cahier des charges (crème, olive, vieux rose) a été remplacée à la demande de Kerem.

## Typographie (imposée)
- Titres : Playfair Display 500. Texte : Inter 400 / 600. Polices hébergées sur le site.
- Échelle : h1 2,4 → 4,6 rem ; h2 1,8 → 2,6 rem ; texte 17 px, interligne 1,7.
- `text-wrap: balance` sur les titres.

## Mouvement (réglage « subtil » du skill)
- Survols : 200 ms (`--dur-fast`). Apparitions au défilement : 350 ms, décalage 12 px, `power1.out`.
- Une seule animation marquante par page (accueil : macarons qui se posent dans la vitrine).
- `prefers-reduced-motion` : simples fondus, rien ne bouge.

## Interaction et accessibilité (checklist du skill)
- Cibles tactiles ≥ 44 px, 8 px minimum entre deux boutons.
- Boutons à bascule avec `aria-pressed` (filtres, cartes allergènes).
- Focus visible, page active signalée dans le menu, contraste ≥ 4,5:1.
- Vérifié en 375, 768, 1024 et 1440 px.
