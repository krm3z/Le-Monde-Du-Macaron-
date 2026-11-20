// Mentions légales : la section en cours est signalée dans le sommaire.
export default function init({ ScrollTrigger, $$ }) {
  const liens = $$('[data-ancre]');
  liens.forEach((a) => {
    ScrollTrigger.create({
      trigger: `#${a.dataset.ancre}`, start: 'top 45%', end: 'bottom 45%',
      onToggle: (s) => { if (s.isActive) liens.forEach((l) => l.classList.toggle('actif', l === a)); },
    });
  });
}
