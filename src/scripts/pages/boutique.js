// La boutique : la rue se dessine, le repère se pose, compteur d'avis, étoiles, plan interactif au clic.
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

export default function init({ gsap, reduce, $, $$ }) {
  gsap.registerPlugin(DrawSVGPlugin);
  const plan = $('[data-plan]');
  const rues = $$('[data-rues] path');
  const st = { trigger: plan, start: 'top 75%', once: true };
  if (reduce) {
    gsap.fromTo(plan, { opacity: 0 }, { opacity: 1, duration: 0.6, scrollTrigger: st });
  } else {
    gsap.timeline({ scrollTrigger: st })
      .from(plan, { autoAlpha: 0, duration: 0.6 })
      .from(rues.filter((r) => !r.classList.contains('plan__nationale')), { drawSVG: 0, duration: 0.9, stagger: 0.06, ease: 'maison' }, 0.2)
      .from('.plan__nationale', { drawSVG: 0, duration: 1.1, ease: 'rideau' }, 0.9)
      .from('[data-rues] text', { opacity: 0, duration: 0.5 }, 1.7)
      .from('[data-pin]', { y: -36, opacity: 0, duration: 0.6, ease: 'maison' }, 2)
      .from('.plan__btn, .plan__note', { opacity: 0, y: 8, duration: 0.5, stagger: 0.1 }, 2.2);
  }
  $('[data-plan-charger]')?.addEventListener('click', (e) => {
    const b = e.currentTarget;
    const f = Object.assign(document.createElement('iframe'), { src: b.dataset.src, title: b.dataset.title });
    f.style.opacity = '0';
    const montrer = () => gsap.to(f, { opacity: 1, duration: 1, ease: 'power2.out' });
    f.addEventListener('load', montrer);
    setTimeout(montrer, 2500);
    plan.prepend(f);
    plan.classList.add('is-loaded');
    f.focus();
  });

  // Compteur 0 → 719 (largeur figée) et étoiles
  const c = $('[data-compteur]');
  if (c && !reduce) {
    const fin = Number(c.dataset.compteur);
    c.style.display = 'inline-block';
    c.style.minWidth = `${c.offsetWidth}px`;
    const o = { v: 0 };
    c.textContent = '0';
    gsap.to(o, { v: fin, duration: 1.8, ease: 'power3.out', onUpdate: () => { c.textContent = Math.round(o.v).toLocaleString('fr-FR'); }, scrollTrigger: { trigger: c, start: 'top 90%', once: true } });
    gsap.from('.etoiles__rect', { attr: { width: 0 }, duration: 1.2, ease: 'maison', scrollTrigger: { trigger: c, start: 'top 90%', once: true } });
  }
}
