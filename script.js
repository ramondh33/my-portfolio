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
const skills = [
  'Python',
  'JavaScript',
  'Linux',
  'Windows',
  'Networking',
  'DevOps',
  'Bilingual (EN/ES)',
  'Tailwind CSS',
  'Bootstrap',
  'System Administration'
];

function renderSkills() {
  const container = document.getElementById('skills-list');
  if (!container) return;

  container.innerHTML = skills.map(skill => `
    <span class="block px-4 py-2 text-center font-medium
                 bg-cardBG border border-border rounded
                 dark:bg-darkCard dark:border-darkBorder">
      ${skill}
    </span>
  `).join('');
}

// Invoke this in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
});

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
