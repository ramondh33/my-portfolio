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

// Strength Meter
function updateStrength(pwd, len) {
  let score = 0;
  if (/[a-z]/.test(pwd)) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/\d/.test(pwd
