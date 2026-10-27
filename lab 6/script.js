const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Цэс хаах' : 'Цэс нээх');
});

nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const themeLabel = themeBtn.querySelector('.theme-label');
const media = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  const dark = theme === 'dark';
  themeBtn.setAttribute('aria-pressed', dark);
  themeBtn.setAttribute('aria-label', dark ? 'Гэгээлэг горимыг асаах' : 'Харанхуй горимыг асаах');
  themeLabel.textContent = dark ? 'Гэгээлэг' : 'Харанхуй';
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) { }
applyTheme(saved || (media.matches ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) { }
});

function setFlipped(card, flipped) {
  card.classList.toggle('is-flipped', flipped);
  card.querySelector('.flip-btn').setAttribute('aria-pressed', flipped);
  card.querySelector('.front').setAttribute('aria-hidden', flipped);
  card.querySelector('.back').setAttribute('aria-hidden', !flipped);
}

document.querySelectorAll('.flip').forEach(card => {
  card.querySelector('.flip-btn').addEventListener('click', () => {
    setFlipped(card, !card.classList.contains('is-flipped'));
    const section = card.closest('section');
    const btn = section.querySelector('[data-flip-all]');
    if (btn) syncFlipAll(btn, section);
  });
});

function syncFlipAll(btn, section) {
  const cards = section.querySelectorAll('.flip');
  const all = [...cards].every(c => c.classList.contains('is-flipped'));
  btn.setAttribute('aria-pressed', all);
  btn.textContent = all ? 'Бүгдийг буцаах' : 'Бүгдийг эргүүлэх';
}

document.querySelectorAll('[data-flip-all]').forEach(btn => {
  const section = btn.closest('section');
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('aria-pressed') !== 'true';
    section.querySelectorAll('.flip').forEach(c => setFlipped(c, target));
    syncFlipAll(btn, section);
  });
});