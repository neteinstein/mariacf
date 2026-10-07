// Comportamento partilhado: tema claro/escuro, paletas de cor, animações de entrada e brilho dos cartões.
// Os efeitos visuais dos resultados das calculadoras vivem em fx.js.

import './fx.js';

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

// Paletas de cor: um círculo por paleta no rodapé. A escolha fica guardada e vale para todo o site.
// As cores de cada paleta vivem em styles.css (:root[data-palette=…]); 'azul' (Azul sereno) é a predefinida.
// Uma paleta guardada que já não existe (turquesa, lavanda, orquidea) volta à predefinida.
const PALETTE_KEY = 'mcf-palette';
const PALETAS = [
  { id: 'azul', nome: 'Azul sereno', cores: ['#125a98', '#049fd6', '#c4d2e5'] },
  { id: 'verde', nome: 'Verde natural', cores: ['#266739', '#37a885', '#e8cd9d'] },
  { id: 'petroleo', nome: 'Azul-petróleo', cores: ['#00627a', '#35a3af', '#7ee9c9'] },
  { id: 'pastel', nome: 'Pastel', cores: ['#8c3653', '#d16b9b', '#eed055'] },
];

function paletaGuardada() {
  try {
    return localStorage.getItem(PALETTE_KEY);
  } catch {
    return null;
  }
}

// Ícone do separador com as cores de marca da paleta ativa: o mesmo gradiente do logótipo do cabeçalho
// (--brand-b → --brand-a → --brand-c), lido do CSS para nunca divergir. O desenho é o de favicon.svg.
const iconeSeparador = document.querySelector('link[rel="icon"]');

function pintarIcone() {
  if (!iconeSeparador) return;
  const css = getComputedStyle(root);
  const [a, b, c] = ['--brand-a', '--brand-b', '--brand-c'].map((k) => css.getPropertyValue(k).trim());
  if (!a || !b || !c) return;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${b}"/><stop offset=".55" stop-color="${a}"/><stop offset="1" stop-color="${c}"/>` +
    `</linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g)"/>` +
    `<path d="M32 18v28M18 32h28" stroke="#fff" stroke-width="8" stroke-linecap="round"/></svg>`;
  iconeSeparador.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function aplicarPaleta(id) {
  const paleta = PALETAS.find((p) => p.id === id) ?? PALETAS[0];
  if (paleta.id === 'azul') delete root.dataset.palette;
  else root.dataset.palette = paleta.id;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', paleta.cores[0]);
  pintarIcone();
  document.querySelectorAll('.paleta').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.paleta === paleta.id));
  });
}

const rodape = document.querySelector('.site-footer .wrap');
if (rodape) {
  const grupo = document.createElement('div');
  grupo.className = 'paletas';
  grupo.setAttribute('role', 'group');
  grupo.setAttribute('aria-label', 'Cores do site');
  const titulo = document.createElement('span');
  titulo.className = 'paletas-titulo';
  titulo.textContent = 'Cores:';
  titulo.setAttribute('aria-hidden', 'true');
  grupo.append(titulo);
  for (const p of PALETAS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'paleta';
    b.dataset.paleta = p.id;
    b.title = p.nome;
    b.setAttribute('aria-label', p.nome);
    b.style.setProperty('--p1', p.cores[0]);
    b.style.setProperty('--p2', p.cores[1]);
    b.style.setProperty('--p3', p.cores[2]);
    b.addEventListener('click', () => {
      aplicarPaleta(p.id);
      try {
        localStorage.setItem(PALETTE_KEY, p.id);
      } catch {
        /* armazenamento indisponível: a paleta vale só para esta visita */
      }
    });
    grupo.append(b);
  }
  rodape.append(grupo);
}
aplicarPaleta(paletaGuardada());

// Mostrar o URL absoluto do site no cabeçalho apenas na impressão (o domínio nunca é fixo no código).
const brand = document.querySelector('.site-header .brand');
const brandText = brand?.querySelector('.brand-text');
if (brand && brandText) {
  const home = new URL(brand.getAttribute('href'), document.baseURI).href;
  const printUrl = document.createElement('span');
  printUrl.className = 'print-url';
  printUrl.textContent = home;
  brandText.appendChild(printUrl);
}

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

// Funcionamento sem rede e instalação como aplicação (o service worker vive na raiz do site).
if ('serviceWorker' in navigator && brand) {
  const raiz = new URL(brand.getAttribute('href'), document.baseURI);
  navigator.serviceWorker.register(new URL('sw.js', raiz), { scope: raiz.pathname }).catch(() => {
    /* sem service worker: o site continua a funcionar normalmente com rede */
  });
}

const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();
