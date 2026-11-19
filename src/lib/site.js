// Accès aux données du site (data/*.json) + petites fonctions d'aide.
import boutique from '../../data/boutique.json';
import data from '../../data/produits.json';
import photos from '../generated/photos.json';

export { boutique };
export const produits = data.produits;

export const TODO = '[À REMPLACER]';
/** Vrai si la valeur est vide ou contient encore un repère « À REMPLACER / À VÉRIFIER ». */
export const isTodo = (v) => v == null || v === '' || /À (REMPLACER|VÉRIFIER)/i.test(String(v));

export const photo = (name) => (name ? photos[name] ?? null : null);

export const telHref = `tel:${boutique.telephone_international}`;
export const mailHref = (objet = boutique.objet_mail_general) =>
  `mailto:${isTodo(boutique.email) ? '' : boutique.email}?subject=${encodeURIComponent(objet)}`;

const hh = (t) => (isTodo(t) ? TODO : t.replace(':', 'h').replace(/h00$/, 'h').replace(/^0/, ''));
/** Horaires d'un jour en texte : « 8h30 – 19h », « Fermé »… */
export const plage = (j) => (j.ferme ? 'Fermé' : `${hh(j.ouverture)} – ${hh(j.fermeture)}`);

/** Regroupe les jours qui ont les mêmes horaires (« Lundi – Samedi »). */
export function horairesGroupes() {
  const out = [];
  for (const j of boutique.horaires) {
    const last = out.at(-1);
    if (last && last.plage === plage(j)) last.fin = j.jour;
    else out.push({ debut: j.jour, fin: null, plage: plage(j) });
  }
  return out.map((g) => ({ jours: g.fin ? `${g.debut} – ${g.fin}` : g.debut, plage: g.plage }));
}

export const adresseLigne = `${boutique.adresse.rue}, ${boutique.adresse.code_postal} ${boutique.adresse.ville}`;
export const noteFr = (n) => String(n).replace('.', ',');
export const nbProduits = (cat) => produits.filter((p) => p.categorie === cat).length;
