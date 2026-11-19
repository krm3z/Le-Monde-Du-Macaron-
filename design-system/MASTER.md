# Design system — Le Monde du Macaron (Villefranche)

Règles du site, à respecter pour toute nouvelle page. Les valeurs vivent dans `src/styles/site.css` (bloc `:root`).
Méthode : skill **ui-ux-pro-max** (requête « bakery patisserie local shop elegant », réglages variance 3, motion 3, density 3), filtrée par le cahier des charges du client, qui reste prioritaire.

## Style
- **Minimalisme posé** (famille « Minimalism & Swiss Style » du skill) : grille alignée à gauche, beaucoup d'espace, filets fins, peu d'ombres, angles de 6 px.
- **Écarté** : la recommandation du skill pour « Bakery/Cafe » (style vif en blocs, claymorphism), contraire à la demande d'un site sérieux et mature.
- Pas d'italiques décoratives dans les titres, pas de numéros « 01 / 02 », pas d'emoji.

## Couleurs (imposées par le client)
| Rôle | Valeur | Usage |
|---|---|---|
| Fond | `#F4EDE3` crème | fond principal |
| Sections | `#E8DCCB` beige | bandes alternées, bandeau |
| Action | `#646B3F` olive | boutons principaux, accents (texte OK sur crème : 4,9:1) |
| Détail | `#C98C88` vieux rose | filets, puces, survols — jamais de texte |
| Texte | `#3A2A22` chocolat | texte et titres (12,9:1) ; fond du bloc « Venir à la boutique » et du pied de page |
| Texte secondaire | `#5C4A40` | légendes (7,6:1) |

Le skill proposait noir + or et Cormorant/Montserrat : non retenu, la charte du client prime.

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
