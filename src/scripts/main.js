// Animations et interactions du site.
// Règle : une grosse animation par page, le reste discret.
// Si l'utilisateur préfère réduire les animations : simples fondus, pas de défilement doux.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, Flip);
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Défilement fluide ---------- */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.11, anchors: { offset: -100 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Menu téléphone (plein écran) ---------- */
const toggle = $('[data-menu-toggle]');
const menu = $('[data-menu]');
const nav = $('[data-nav]');
function setMenu(open) {
  if (!menu) return;
  toggle.setAttribute('aria-expanded', String(open));
  $('.nav__burger-label', toggle).textContent = open ? 'Fermer' : 'Menu';
  document.documentElement.style.overflow = open ? 'hidden' : '';
  if (open) {
    menu.hidden = false;
    lenis?.stop();
    gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    if (!reduce) gsap.fromTo($$('li a', menu), { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.06, ease: 'expo.out' });
    $('a', menu)?.focus();
  } else {
    lenis?.start();
    gsap.to(menu, { opacity: 0, duration: 0.25, onComplete: () => { menu.hidden = true; } });
  }
}
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
});
$$('a', menu || document.createElement('div')).forEach((a) => a.addEventListener('click', () => setMenu(false)));

/* La pilule se cache quand on descend, revient quand on remonte */
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (toggle?.getAttribute('aria-expanded') !== 'true') nav?.classList.toggle('is-hidden', y > lastY && y > 300);
  lastY = y;
}, { passive: true });
nav?.addEventListener('focusin', () => nav.classList.remove('is-hidden'));

/* ---------- Jour actuel dans les horaires ---------- */
const code = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][new Date().getDay()];
$$(`[data-horaires] [data-jour="${code}"]`).forEach((l) => l.classList.add('is-today'));

/* ---------- Apparitions douces au défilement ---------- */
$$('[data-reveal]').forEach((el) => {
  gsap.fromTo(el, { opacity: 0, y: reduce ? 0 : 14 }, {
    opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
  });
});

/* ---------- Accueil : les macarons tombent et se posent, puis le nom apparaît ---------- */
const macs = $$('[data-hero-mac] img');
if (macs.length) {
  const lines = [];
  const fades = $$('[data-hero-fade]');
  gsap.set($$('[data-hero-mac]'), { opacity: 1 });
  if (reduce) {
    gsap.fromTo([...macs, ...lines, ...fades], { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.04 });
  } else {
    // les macarons se posent un par un dans la vitrine, puis le nom apparaît
    gsap.timeline({ delay: 0.15 })
      .fromTo(macs, { opacity: 0, y: -28 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.09 })
      .fromTo(fades, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, '-=0.2');
  }
}

/* Bandeau : défile en continu (CSS), ralentit au survol ou au toucher */
const zone = $('[data-marquee]');
if (zone && !reduce) {
  const track = $('.marquee__track', zone);
  const speed = { r: 1 };
  const go = (r) => gsap.to(speed, {
    r, duration: 0.8, ease: 'power2.out', overwrite: true,
    onUpdate: () => { const a = track.getAnimations?.()[0]; if (a) a.playbackRate = speed.r; },
  });
  zone.addEventListener('pointerenter', () => go(0.18));
  zone.addEventListener('pointerleave', () => go(1));
  zone.addEventListener('touchstart', () => go(0.18), { passive: true });
  zone.addEventListener('touchend', () => go(1), { passive: true });
}

/* ---------- Nos macarons : filtre + cartes qui se retournent ---------- */
const grid = $('[data-grid]');
if (grid) {
  const cards = $$('.card', grid);
  const count = $('[data-count]');
  $$('[data-filters] button').forEach((btn) => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    $$('[data-filters] button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const state = Flip.getState(cards);
    let n = 0;
    cards.forEach((c) => { const show = f === 'tout' || c.dataset.cat === f; c.hidden = !show; if (show) n++; });
    count.textContent = `${n} produit${n > 1 ? 's' : ''} affiché${n > 1 ? 's' : ''}`;
    if (reduce) {
      gsap.fromTo(cards.filter((c) => !c.hidden), { opacity: 0 }, { opacity: 1, duration: 0.4 });
    } else {
      Flip.from(state, {
        duration: 0.65, ease: 'power3.inOut', absolute: true, stagger: 0.012, nested: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, x: -60, duration: 0.4 }),
      });
    }
    ScrollTrigger.refresh();
  }));

  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-flip]');
    if (!b) return;
    const on = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(on));
    $('.card__back', b).setAttribute('aria-hidden', String(!on));
    $('.card__front', b).setAttribute('aria-hidden', String(on));
  });

  // arrivée depuis l'accueil (#parfum) : on met la carte en évidence
  const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  if (target?.classList.contains('card')) {
    setTimeout(() => {
      lenis ? lenis.scrollTo(target, { offset: -160 }) : target.scrollIntoView({ block: 'center' });
      gsap.fromTo(target, { scale: 0.94 }, { scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.5)', delay: 0.6 });
    }, 200);
  }
}

/* ---------- Coffrets : le texte se remplit, les photos glissent ---------- */
const fill = $('[data-fill]');
if (fill) {
  const words = $$('.w', fill);
  if (reduce) gsap.set(words, { backgroundPosition: '0% 0' });
  else gsap.to(words, {
    backgroundPosition: '0% 0', ease: 'none', stagger: 0.08,
    scrollTrigger: { trigger: fill, start: 'top 82%', end: 'bottom 40%', scrub: 0.6 },
  });
}
$$('[data-slide]').forEach((row) => {
  if (reduce) return;
  const dir = Number(row.dataset.slide);
  gsap.fromTo(row, { xPercent: dir > 0 ? -18 : 0 }, {
    xPercent: dir > 0 ? 0 : -18, ease: 'none',
    scrollTrigger: { trigger: row.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
  });
});

/* ---------- La boutique : le compteur d'avis, le plan en fondu ---------- */
$$('[data-count-to]').forEach((el) => {
  const to = Number(el.dataset.countTo);
  if (reduce || !to) return;
  const o = { n: 0 };
  el.textContent = '0';
  gsap.to(o, {
    n: to, duration: 2.2, ease: 'power2.out',
    onUpdate: () => { el.textContent = Math.round(o.n).toLocaleString('fr-FR'); },
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
  });
});
const map = $('[data-map]');
if (map) {
  gsap.to(map, { opacity: 1, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: map, start: 'top 92%', once: true } });
  // le plan OpenStreetMap n'est chargé qu'au clic (aucune requête tierce avant)
  $('[data-map-load]', map)?.addEventListener('click', (e) => {
    const b = e.currentTarget;
    const f = Object.assign(document.createElement('iframe'), { src: b.dataset.src, title: b.dataset.title });
    f.style.opacity = '0';
    const show = () => gsap.to(f, { opacity: 1, duration: 1.2, ease: 'power2.out' });
    f.addEventListener('load', show);
    setTimeout(show, 2500); // au cas où l'événement « load » tarde
    map.prepend(f);
    map.classList.add('is-loaded');
    f.focus();
  });
}

/* ---------- 404 : le macaron roule ---------- */
const lost = $('[data-lost]');
if (lost && !reduce) gsap.fromTo(lost, { rotation: -6 }, { rotation: 6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });

window.addEventListener('load', () => ScrollTrigger.refresh());
