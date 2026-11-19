# Rapport — brouillon de travail (sera réécrit à l'étape 5)

## Décisions prises seul (au fil de l'eau)
- Node.js absent du PC → Node 24 LTS portable téléchargé depuis nodejs.org (somme SHA-256 vérifiée) dans `.tools/node`, à l'intérieur du projet, non versionné. Cache npm aussi dans `.tools/`. Rien n'est installé ailleurs sur le PC.
- Site source : mondedumacaron.com (anglais) + mondedumacaron.fr (français, même catalogue, avec catégories « Sucrés » / « Sucrés-Salés » et une page Villefranche).
- Aucun allergène, aucun prix, aucune description sur les fiches du réseau → tous les produits ont « [ALLERGÈNES À VÉRIFIER] » et pas de prix.
- Périmètre : les 79 macarons du catalogue français actuel (68 sucrés, 11 sucrés-salés) + 15 calissons. Les 37 nougats et 29 chocolats Weiss ne sont pas listés un par un (cité en « aussi en boutique ») pour garder un site centré sur les macarons. 28 parfums présents seulement sur le site anglais (ex. Cèpe, Avocat, Vodka-Redbull) sont considérés comme anciens et écartés.
- Catégorie « Sucrés-Salés » du réseau → « salé » dans les données.
- Les photos d'origine font 1000 × 1000 px : la version « 1200 » est donc en 1000 px (pas d'agrandissement, pour ne pas flouter).
- Pas de page coffrets ni de produits « coffret » sur le site du réseau → page Coffrets & événements rédigée sans prix, avec photos de macarons.
- Horaires : sources contradictoires sur l'heure d'ouverture (Google 8h00 en semaine / 8h30 le samedi, Instagram 8h, site du réseau 8h30) → ouverture en [À REMPLACER], fermeture 19h et dimanche fermé conservés (concordants).
- E-mail de la boutique introuvable → [À REMPLACER] (l'adresse du siège n'est pas utilisée).
- Google Maps : bandeau de consentement refusé (« Tout refuser »), rien accepté.

## Problèmes rencontrés
- Détourage : 1er essai raté (bug d'ordre des opérations dans sharp), corrigé. Résultat propre sur les 8 macarons.
