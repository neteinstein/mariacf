// Comportamento partilhado: tema claro/escuro, animações de entrada e brilho dos cartões.

const root = document.documentElement;
const THEME_KEY = 'mcf-theme';

function guardado() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

const inicial = guardado();
if (inicial === 'light' || inicial === 'dark') root.dataset.theme = inicial;

function temaAtual() {
  if (root.dataset.theme) return root.dataset.theme;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

document.querySelectorAll('.theme-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const novo = temaAtual() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = novo;
    try {
      localStorage.setItem(THEME_KEY, novo);
    } catch {
      /* armazenamento indisponível: o tema vale só para esta visita */
    }
  });
});

// Revelar elementos ao entrar no ecrã
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
    io.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Brilho que segue o rato nos cartões
document.querySelectorAll('.tool').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();
