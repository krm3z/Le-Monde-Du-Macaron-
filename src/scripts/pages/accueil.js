// Accueil : relief de la vitrine au défilement, bandeau, aperçu au curseur.
export default function init({ gsap, reduce, $, $$ }) {
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
    // hors écran : on arrête la boucle (économie de batterie)
    new IntersectionObserver(([e]) => { if (!arret) boucle[e.isIntersecting ? 'resume' : 'pause'](); }).observe(bandeau);
  }

  // Aperçu flottant d'un macaron au survol de l'index (ordinateur seulement)
  const box = $('[data-apercu-box]');
  if (!reduce && box && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const img = $('img', box);
    const x = gsap.quickTo(box, 'x', { duration: 0.45, ease: 'power3' });
    const y = gsap.quickTo(box, 'y', { duration: 0.45, ease: 'power3' });
    let dernierX = 0;
    gsap.set(box, { xPercent: -50, yPercent: -60, scale: 0.6 });
    addEventListener('pointermove', (e) => {
      x(e.clientX); y(e.clientY);
      gsap.to(box, { rotation: gsap.utils.clamp(-8, 8, (e.clientX - dernierX) * 0.6), duration: 0.4 });
      dernierX = e.clientX;
    }, { passive: true });
    $$('[data-apercu]').forEach((a) => {
      const montrer = () => {
        if (!a.dataset.apercu) return;
        if (img.getAttribute('src') !== a.dataset.apercu) img.src = a.dataset.apercu;
        gsap.to(box, { opacity: 1, scale: 1, duration: 0.35, ease: 'maison', overwrite: 'auto' });
      };
      const cacher = () => gsap.to(box, { opacity: 0, scale: 0.6, duration: 0.25, overwrite: 'auto' });
      a.addEventListener('pointerenter', montrer);
      a.addEventListener('pointerleave', cacher);
    });
  }
}
