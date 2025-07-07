const projects = [
  {
    title: 'Password Generator GUI',
    desc:  'Desktop tool with customizable settings built in Python and Tkinter.',
    tech:  'Python · Tkinter'
  },
  {
    title: 'Responsive Contact Form',
    desc:  'Frontend form with live validation and accessibility focus.',
    tech:  'HTML · CSS · JS · Bootstrap'
  },
  {
    title: 'Shell Automation Toolkit',
    desc:  'Bash scripts for auditing, backups, and diagnostics.',
    tech:  'Bash · crontab'
  }
];

const skills = [
  'Python', 'JavaScript', 'Linux', 'Windows',
  'Networking', 'DevOps', 'Bilingual (EN/ES)'
];

// Render Projects
function renderProjects() {
  const container = document.getElementById('projects-container');
  container.innerHTML = projects.map(p => `
    <div class="bg-soft p-6 rounded-lg shadow hover:shadow-lg transition">
      <h3 class="text-2xl font-semibold mb-1">${p.title}</h3>
      <p class="text-text/90 mb-2">${p.desc}</p>
      <span class="text-sm text-mint">${p.tech}</span>
    </div>
  `).join('');
}

// Render Skills
function renderSkills() {
  const list = document.getElementById('skills-list');
  list.innerHTML = skills.map(s => `
    <span class="block bg-soft px-4 py-2 rounded text-center font-medium">${s}</span>
  `).join('');
}

// Theme Toggle
function initThemeToggle() {
  const btn = document.getElementById('themeBtn');
  const lbl = document.getElementById('themeLabel');
  const root = document.documentElement;

  // Load saved mode
  let mode = localStorage.getItem('mode') || 'dark';
  if (mode === 'dark') root.classList.add('dark');

  updateLabel();

  btn.addEventListener('click', () => {
    root.classList.toggle('dark');
    mode = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('mode', mode);
    updateLabel();
  });

  function updateLabel() {
    lbl.textContent = root.classList.contains('dark') ? 'Dark Mode' : 'Light Mode';
    btn.textContent   = root.classList.contains('dark') ? '☀️' : '🌙';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSkills();
  initThemeToggle();
});
