// Nos macarons : filtre qui fait glisser les fiches (Flip), retournement 3D, compteur.
import { Flip } from 'gsap/Flip';

export default function init({ gsap, ScrollTrigger, lenis, reduce, $, $$ }) {
  gsap.registerPlugin(Flip);
  const grille = $('[data-nuancier]');
  const fiches = $$('.fiche', grille);
  const boutons = $$('[data-filtres] button');
  const trait = $('[data-trait]');
  const compte = $('[data-compte]');
  const annonce = $('[data-annonce]');

  const placerTrait = (b, anim = true) => {
    const r = b.getBoundingClientRect(), p = b.parentElement.getBoundingClientRect();
    trait.style.transition = anim ? '' : 'none';
    trait.style.width = `${r.width - 32}px`;
    trait.style.transform = `translateX(${r.left - p.left + b.parentElement.scrollLeft + 16}px)`;
  };

  function filtrer(f, anim = true) {
    const b = boutons.find((x) => x.dataset.filtre === f) || boutons[0];
    boutons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    placerTrait(b, anim);
    const visibles = (c) => f === 'tout' || c.dataset.cat === f;
    const etat = anim && !reduce ? Flip.getState(fiches.filter((c) => !c.hidden && c.getBoundingClientRect().top < innerHeight * 1.5)) : null;
    let n = 0;
    fiches.forEach((c) => { c.hidden = !visibles(c); if (!c.hidden) n++; });
    const avant = Number(compte.textContent);
    if (anim && !reduce) {
      const o = { v: avant };
      gsap.to(o, { v: n, duration: 0.5, ease: 'power2.out', onUpdate: () => { compte.textContent = Math.round(o.v); } });
      Flip.from(etat, {
        duration: 0.75, ease: 'rideau', absolute: true, prune: true, stagger: 0.012,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, x: 48 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.25, stagger: 0.02, ease: 'maison' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, y: 12, duration: 0.3, ease: 'power2.in' }),
        onComplete: () => { ScrollTrigger.refresh(); lenis?.resize(); },
      });
      if (grille.getBoundingClientRect().top < 0) lenis ? lenis.scrollTo(grille, { offset: -140 }) : grille.scrollIntoView();
    } else {
      compte.textContent = n;
      if (anim) gsap.fromTo(fiches.filter((c) => !c.hidden), { opacity: 0 }, { opacity: 1, duration: 0.4 });
    }
    annonce.textContent = `${n} produit${n > 1 ? 's' : ''} affiché${n > 1 ? 's' : ''}`;
    const url = new URL(location.href);
    if (f === 'tout') url.searchParams.delete('filtre'); else url.searchParams.set('filtre', f);
    history.replaceState(null, '', url);
  }
  boutons.forEach((b) => b.addEventListener('click', () => filtrer(b.dataset.filtre)));
  const initial = new URL(location.href).searchParams.get('filtre');
  filtrer(initial || 'tout', false);
  addEventListener('resize', () => placerTrait(boutons.find((x) => x.getAttribute('aria-pressed') === 'true'), false));

  // Retournement 3D (clic, Entrée, Espace : c'est un vrai bouton)
  grille.addEventListener('click', (e) => {
    const b = e.target.closest('[data-fiche]');
    if (!b) return;
    const on = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(on));
    $('.fiche__verso', b).setAttribute('aria-hidden', String(!on));
    $('.fiche__recto', b).setAttribute('aria-hidden', String(on));
    if (reduce) return;
    gsap.to(b, { rotationY: on ? 180 : 0, transformPerspective: 1200, duration: 0.8, ease: 'rideau' });
    gsap.fromTo(b, { z: 0 }, { z: 60, duration: 0.4, yoyo: true, repeat: 1, ease: 'power1.inOut' });
  });

  // Fiches « posées » par lots
  if (!reduce) {
    ScrollTrigger.batch(fiches, { start: 'top 92%', once: true, onEnter: (els) => gsap.from(els, { opacity: 0, y: -10, duration: 0.6, stagger: 0.06, ease: 'maison' }) });
  }

  // Arrivée depuis l'accueil (#parfum) : la fiche est mise en valeur
  const cible = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  if (cible?.classList.contains('fiche')) {
    if (cible.hidden) filtrer('tout', false);
    setTimeout(() => {
      lenis ? lenis.scrollTo(cible, { offset: -160 }) : cible.scrollIntoView({ block: 'center' });
      gsap.fromTo(cible, { boxShadow: 'inset 0 0 0 2px #D72688' }, { boxShadow: 'inset 0 0 0 0px #D72688', duration: 2.4, delay: 0.8 });
    }, 250);
  }
}
