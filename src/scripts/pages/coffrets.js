// Coffrets : texte qui se remplit (fuchsia → brun-noir), photos qui glissent sur le côté, ruban de progression.
export default function init({ gsap, reduce, $, $$ }) {
  const mots = $$('[data-remplir] .w');
  if (reduce) { gsap.set(mots, { backgroundPosition: '0% 0' }); return; }
  gsap.to(mots, {
    backgroundPosition: '0% 0', ease: 'none', stagger: 0.1,
    scrollTrigger: { trigger: '[data-remplir]', start: 'top 75%', end: 'bottom 40%', scrub: 0.6 },
  });
  $$('[data-glisse]').forEach((piste, i) => {
    gsap.fromTo(piste, { xPercent: i % 2 ? -22 : 6 }, {
      xPercent: i % 2 ? 4 : -26, ease: 'none',
      scrollTrigger: { trigger: piste.closest('.chapitre'), start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
    $$('.triptyque__img', piste).forEach((c, k) => {
      gsap.fromTo(c, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1.2, delay: k * 0.12, ease: 'rideau', scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
    });
  });
  gsap.to('[data-ruban]', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
}
