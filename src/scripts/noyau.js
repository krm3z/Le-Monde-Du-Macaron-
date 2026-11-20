// Noyau commun : défilement fluide, menu, apparitions, puis module de la page (body[data-page]).
// Mouvement réduit : pas de Lenis, pas de découpage de texte, uniquement des fondus.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
CustomEase.create('maison', 'M0,0 C0.22,1 0.36,1 1,1');
CustomEase.create('rideau', 'M0,0 C0.76,0 0.24,1 1,1');

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, anchors: { offset: -90 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* Menu plein écran (téléphone) */
const toggle = $('[data-menu-toggle]');
const menu = $('[data-menu]');
const nav = $('[data-nav]');
const autour = $$('main, footer');
function setMenu(open) {
  if (!menu) return;
  toggle.setAttribute('aria-expanded', String(open));
  $('.nav__burger-label', toggle).textContent = open ? 'Fermer' : 'Menu';
  document.documentElement.style.overflow = open ? 'hidden' : '';
  autour.forEach((el) => { el.inert = open; });
  if (open) {
    menu.hidden = false;
    lenis?.stop();
    gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    if (!reduce) gsap.fromTo($$('li a', menu), { yPercent: 105 }, { yPercent: 0, duration: 0.8, stagger: 0.06, ease: 'maison' });
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

/* La pilule se cache en descendant, revient en remontant */
let dernierY = scrollY;
addEventListener('scroll', () => {
  const y = scrollY;
  if (toggle?.getAttribute('aria-expanded') !== 'true') nav?.classList.toggle('is-hidden', y > dernierY && y > 400);
  dernierY = y;
}, { passive: true });
nav?.addEventListener('focusin', () => nav.classList.remove('is-hidden'));

/* Jour actuel (heure de Paris) dans les horaires */
const codes = { Mon: 'Mo', Tue: 'Tu', Wed: 'We', Thu: 'Th', Fri: 'Fr', Sat: 'Sa', Sun: 'Su' };
const jourParis = codes[new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'Europe/Paris' }).format(new Date())];
$$(`[data-horaires] [data-jour="${jourParis}"]`).forEach((l) => l.classList.add('is-today'));

/* Pancarte ouvert / fermé (calculée depuis les horaires du JSON, à l'heure de Paris) */
const statut = $$('[data-statut]');
if (statut.length) {
  const horaires = JSON.parse(statut[0].dataset.statut);
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Paris' }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  const code = codes[p.weekday];
  const min = Number(p.hour) * 60 + Number(p.minute);
  const m = (t) => { const [h, mi] = t.split(':').map(Number); return h * 60 + mi; };
  const h = (t) => t.replace(':00', 'h').replace(':', 'h').replace(/^0/, '');
  const jour = horaires.find((j) => j.code === code);
  let texte;
  if (jour && !jour.ferme && /^\d/.test(jour.ouverture) && min >= m(jour.ouverture) && min < m(jour.fermeture)) texte = `Ouvert jusqu’à ${h(jour.fermeture)}`;
  else {
    const ordre = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const i = ordre.indexOf(code);
    let prochain = null;
    for (let k = 0; k < 8 && !prochain; k++) {
      const j = horaires.find((x) => x.code === ordre[(i + k) % 7]);
      if (j && !j.ferme && /^\d/.test(j.ouverture) && (k > 0 || min < m(j.ouverture))) prochain = { j, k };
    }
    texte = prochain ? `Fermé · ouvre ${prochain.k === 0 ? 'aujourd’hui' : prochain.k === 1 ? 'demain' : prochain.j.jour.toLowerCase()} à ${h(prochain.j.ouverture)}` : 'Fermé';
  }
  statut.forEach((el) => { el.textContent = texte; });
}

/* Apparitions, une par type de bloc */
function apparitions() {
  $$('[data-reveal]').forEach((el) => {
    const type = el.dataset.reveal;
    el.style.animation = 'none';
    const st = { trigger: el, start: 'top 85%', once: true };
    if (reduce) { gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, scrollTrigger: st }); return; }
    if (type === 'lignes') {
      gsap.set(el, { opacity: 1 });
      const s = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: (self) => gsap.from(self.lines, { yPercent: 105, duration: 1.1, stagger: 0.09, ease: 'maison', scrollTrigger: st }) });
      return s;
    }
    if (type === 'mots') {
      gsap.set(el, { opacity: 1 });
      SplitText.create(el, { type: 'words', autoSplit: true, onSplit: (self) => gsap.from(self.words, { opacity: 0, y: '0.25em', duration: 0.8, stagger: 0.018, ease: 'maison', scrollTrigger: st }) });
      return;
    }
    if (type === 'image') {
      const img = $('img', el);
      gsap.set(el, { opacity: 1 });
      gsap.fromTo(el, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1.2, ease: 'rideau', scrollTrigger: st });
      if (img) gsap.fromTo(img, { scale: 1.55 }, { scale: 1.32, duration: 1.6, ease: 'maison', scrollTrigger: st });
      return;
    }
    if (type === 'chiffres') {
      gsap.set(el, { opacity: 1 });
      gsap.from($$('.c', el), { yPercent: 105, duration: 1.2, stagger: 0.07, ease: 'maison', scrollTrigger: st });
      return;
    }
    if (type === 'filet') {
      gsap.set(el, { opacity: 1 });
      const tl = gsap.timeline({ scrollTrigger: st });
      tl.from($('.filet__losange', el), { scale: 0, transformOrigin: '50% 50%', duration: 0.35, ease: 'maison' })
        .from($$('.filet__trait', el), { attr: { x2: 120 }, duration: 0.8, ease: 'maison' }, '-=0.1');
      return;
    }
    if (type === 'pose') {
      gsap.set(el, { opacity: 1 });
      gsap.from(el.children, { opacity: 0, y: -10, duration: 0.6, stagger: 0.08, ease: 'maison', scrollTrigger: st });
      return;
    }
    if (type === 'liste') {
      gsap.set(el, { opacity: 1 });
      gsap.from(el.children, { opacity: 0, duration: 0.5, stagger: 0.05, scrollTrigger: st });
      return;
    }
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out', scrollTrigger: st });
  });
}

const page = document.body.dataset.page;
const modules = {
  accueil: () => import('./pages/accueil.js'),
  macarons: () => import('./pages/macarons.js'),
  coffrets: () => import('./pages/coffrets.js'),
  boutique: () => import('./pages/boutique.js'),
  mentions: () => import('./pages/mentions.js'),
};
document.fonts.ready.then(async () => {
  apparitions();
  if (modules[page]) {
    const m = await modules[page]();
    m.default({ gsap, ScrollTrigger, SplitText, lenis, reduce, $, $$ });
  }
  ScrollTrigger.refresh();
});
addEventListener('load', () => ScrollTrigger.refresh());
