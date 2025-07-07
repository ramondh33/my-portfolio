// 1) Skills Data & Renderer
const skills = [
  'Python',
  'JavaScript',
  'Linux',
  'Windows',
  'Networking',
  'DevOps',
  'Bilingual (EN/ES)'
];

function renderSkills() {
  const list = document.getElementById('skills-list');
  if (!list) return;
  list.innerHTML = skills
    .map(skill => `<span class="block bg-soft px-4 py-2 rounded text-center font-medium">
                     ${skill}
                   </span>`)
    .join('');
}

// 2) Password Generator & Strength Meter
function generatePassword() {
  const lower   = 'abcdefghijklmnopqrstuvwxyz';
  const upper   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?/';
  let charset = '';
  if (document.getElementById('useLower').checked)   charset += lower;
  if (document.getElementById('useUpper').checked)   charset += upper;
  if (document.getElementById('useNumbers').checked) charset += numbers;
  if (document.getElementById('useSymbols').checked) charset += symbols;

  const length = parseInt(document.getElementById('passLength').value, 10);
  document.getElementById('lengthDisplay').textContent = length;

  if (!charset || isNaN(length)) {
    document.getElementById('passwordOutput').textContent = 'Select at least one character type.';
    updateStrength('', length);
    return;
  }

  let pwd = '';
  for (let i = 0; i < length; i++) {
    pwd += charset[Math.floor(Math.random() * charset.length)];
  }

  document.getElementById('passwordOutput').textContent = pwd;
  updateStrength(pwd, length);
}

function updateStrength(pwd, len) {
  let score = 0;
  if (/[a-z]/.test(pwd))              score++;
  if (/[A-Z]/.test(pwd))              score++;
  if (/\d/.test(pwd))                 score++;
  if (/[^a-zA-Z0-9]/.test(pwd))       score++;
  if (len >= 12)                      score++;

  const meter = document.getElementById('strengthBar');
  const label = document.getElementById('strengthLabel');
  const pct   = Math.min(score * 20, 100);

  meter.style.width = pct + '%';

  const descs  = ['Weak', 'Fair', 'Moderate', 'Strong', 'Excellent', 'Elite'];
  const colors = ['red','orange','yellow','lime','cyan','accent2'];
  meter.style.backgroundColor = colors[Math.min(score, 5)];
  label.textContent = `Strength: ${descs[Math.min(score, 5)]}`;
}

// 3) Copy to Clipboard
function copyPassword() {
  const out  = document.getElementById('passwordOutput');
  const text = out.textContent || '';
  if (!text || text.includes('appear here')) return;

  navigator.clipboard.writeText(text).then(() => {
    out.textContent = '✅ Copied!';
    setTimeout(generatePassword, 800);
  }).catch(() => {
    out.textContent = '❌ Copy failed';
  });
}

// 4) Theme Toggle
function initThemeToggle() {
  const btn  = document.getElementById('themeBtn');
  const lbl  = document.getElementById('themeLabel');
  const root = document.documentElement;
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
    if (root.classList.contains('dark')) {
      lbl.textContent = 'Dark Mode';
      btn.textContent = '☀️';
    } else {
      lbl.textContent = 'Light Mode';
      btn.textContent = '🌙';
    }
  }
}

// 5) Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  initThemeToggle();
});
