function generatePassword() {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?/';

  let charset = '';
  if (document.getElementById('useLower').checked) charset += lower;
  if (document.getElementById('useUpper').checked) charset += upper;
  if (document.getElementById('useNumbers').checked) charset += numbers;
  if (document.getElementById('useSymbols').checked) charset += symbols;

  const length = parseInt(document.getElementById('passLength').value);
  document.getElementById('lengthDisplay').textContent = length;

  if (charset === '' || isNaN(length)) {
    document.getElementById('passwordOutput').textContent = 'Select at least one character type.';
    updateStrength('', length);
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  document.getElementById('passwordOutput').textContent = password;
  updateStrength(password, length);
}

// 🧠 Strength Estimator
function updateStrength(pwd, len) {
  let score = 0;
  if (/[a-z]/.test(pwd)) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/\d/.test(pwd)) score += 1;
  if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;
  if (len >= 12) score += 1;

  const meter = document.getElementById('strengthBar');
  const label = document.getElementById('strengthLabel');

  let width = score * 20;
  meter.style.width = width + '%';

  const descriptions = ['Weak', 'Fair', 'Moderate', 'Strong', 'Excellent', 'Elite'];
  const colors = ['red', 'orange', 'yellow', 'lime', 'cyan', 'accent2'];
  meter.style.backgroundColor = colors[Math.min(score, 5)];
  label.textContent = `Strength: ${descriptions[Math.min(score, 5)]}`;
}

// 📋 Copy to Clipboard
function copyPassword() {
  const text = document.getElementById('passwordOutput').textContent;
  if (!text || text.includes('appear here')) return;

  navigator.clipboard.writeText(text).then(() => {
    document.getElementById('passwordOutput').textContent = '✅ Copied to clipboard!';
    setTimeout(generatePassword, 800);
  }).catch(() => {
    document.getElementById('passwordOutput').textContent = '❌ Failed to copy.';
  });
}
