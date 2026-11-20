// Accueil : relief de la vitrine au défilement, bandeau, mur de macarons.
import { Flip } from 'gsap/Flip';

export default function init(ctx) {
  const { gsap, reduce, $ } = ctx;
  // Retour depuis une autre page du site : intro plus courte (décidé par le referrer, aucun stockage)
  const vitrine = $('[data-vitrine]');
  if (document.referrer.startsWith(location.origin)) vitrine?.classList.add('intro-courte');

  if (!reduce && vitrine) {
    gsap.to('[data-pile]', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: vitrine, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.vitrine__titre', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: vitrine, start: 'top top', end: 'bottom top', scrub: true } });
  }

  // Bandeau : boucle droite → gauche, ralentit au survol / toucher, pause accessible
  const bandeau = $('[data-bandeau]');
  const piste = $('.bandeau__piste', bandeau);
  const pause = $('[data-pause]', bandeau);
  if (reduce) {
    bandeau.style.overflowX = 'auto';
    pause.hidden = true;
  } else {
    const boucle = gsap.to(piste, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 });
    let arret = false;
    const vitesse = (v, d) => { if (!arret) gsap.to(boucle, { timeScale: v, duration: d, overwrite: true }); };
    bandeau.addEventListener('pointerenter', () => vitesse(0.15, 0.6));
    bandeau.addEventListener('pointerleave', () => vitesse(1, 0.9));
    bandeau.addEventListener('touchstart', () => vitesse(0.15, 0.6), { passive: true });
    bandeau.addEventListener('touchend', () => vitesse(1, 0.9), { passive: true });
    pause.addEventListener('click', () => {
      arret = !arret;
      pause.setAttribute('aria-pressed', String(arret));
      pause.textContent = arret ? 'Reprendre' : 'Mettre en pause';
      gsap.to(boucle, { timeScale: arret ? 0 : 1, duration: 0.5, overwrite: true });
    });
    new IntersectionObserver(([e]) => { if (!arret) boucle[e.isIntersecting ? 'resume' : 'pause'](); }).observe(bandeau);
  }

  mur(ctx);
}

// Mur de macarons rangé par couleur : pose par rangées, onglets Sucrés/Salés (Flip), « voir les 79 » sur téléphone
function mur({ gsap, ScrollTrigger, reduce, $, $$ }) {
  gsap.registerPlugin(Flip);
  const liste = $('[data-mur]');
  if (!liste) return;
  const items = $$('.mur__item', liste);
  if (!reduce) {
    ScrollTrigger.batch(items, {
      start: 'top 92%', once: true,
      onEnter: (els) => gsap.fromTo(els.map((e) => e.querySelector('img') || e), { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'maison', overwrite: true }),
    });
  }
  const boutons = $$('[data-mur-filtre]');
  boutons.forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.murFiltre;
    boutons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    const etat = reduce ? null : Flip.getState(items);
    items.forEach((it) => { it.hidden = !(f === 'tout' || it.dataset.cat === f); });
    if (etat) {
      Flip.from(etat, {
        duration: 0.6, ease: 'rideau', absolute: true, stagger: 0.008,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.45 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.8, duration: 0.3 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    }
  }));
  const plus = $('[data-mur-plus]');
  plus?.addEventListener('click', () => {
    const ouvert = liste.classList.toggle('mur--ouvert');
    plus.setAttribute('aria-expanded', String(ouvert));
    plus.textContent = ouvert ? 'Voir moins' : `Voir les ${items.length} parfums`;
    if (!ouvert) liste.scrollIntoView({ block: 'start' });
    ScrollTrigger.refresh();
  });
}
