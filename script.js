function initThemeToggle() {
  const btn = document.getElementById('themeBtn');
  const root = document.documentElement;
  let mode = localStorage.getItem('themeMode') || 'light';

  applyMode(mode);
  if (btn) btn.textContent = mode === 'dark' ? '☀️' : '🌙';

  btn?.addEventListener('click', () => {
    mode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', mode);
    applyMode(mode);
    btn.textContent = mode === 'dark' ? '☀️' : '🌙';
  });

  function applyMode(m) {
    root.classList.toggle('dark', m === 'dark');
  }
}

function initProjectAnimations() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length || !window.IntersectionObserver) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('opacity-100', 'translate-y-0');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => io.observe(c));
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initProjectAnimations();
});
