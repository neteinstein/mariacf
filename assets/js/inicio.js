// Página inicial: entrada animada, números que contam e cartões das secções que surgem ao chegar ao ecrã.
// A coreografia vive em styles.css (secção «Página inicial»); aqui só se trata do que depende do tempo e do rato.

const root = document.documentElement;
const semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const entrada = document.querySelector('.entrada');

// A entrada só aparece na primeira visita de cada sessão (ver o <script> no <head>).
try {
  sessionStorage.setItem('mcf-entrada', '1');
} catch {
  /* armazenamento indisponível: a entrada repete-se em cada visita */
}

// Duração da entrada até a cortina subir (igual a --entrada em styles.css).
const ENTRADA_MS = root.classList.contains('sem-entrada') || semMovimento ? 0 : 1900;

// Um clique ou uma tecla salta a entrada.
function saltar() {
  root.classList.add('sem-entrada');
}
if (entrada && ENTRADA_MS) {
  entrada.addEventListener('click', saltar);
  addEventListener('keydown', saltar, { once: true });
}

// Números: contam do zero até ao valor quando aparecem.
function contar(el) {
  const fim = Number(el.dataset.contar);
  if (semMovimento || !fim) return;
  const dur = 1400;
  let t0;
  const passo = (t) => {
    t0 ??= t;
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(fim * (1 - Math.pow(1 - p, 4)));
    if (p < 1) requestAnimationFrame(passo);
  };
  el.textContent = '0';
  requestAnimationFrame(passo);
}

// Os cartões e o título das secções surgem ao entrar no ecrã, mas nunca antes de a cortina subir.
const surgem = document.querySelectorAll('.inicio-cartao, .inicio-surge');
const numeros = document.querySelectorAll('[data-contar]');
const inicio = performance.now();

function mostrar(el, atrasoExtra = 0) {
  const saltada = root.classList.contains('sem-entrada');
  const falta = saltada ? 0 : Math.max(0, ENTRADA_MS - (performance.now() - inicio));
  setTimeout(() => {
    if (el.dataset.contar) contar(el);
    else el.classList.add('visto');
  }, falta + atrasoExtra);
}

if ('IntersectionObserver' in window && !semMovimento) {
  const io = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        // Na página, os números entram com o resto do herói: esperam pela sua vez na coreografia.
        mostrar(e.target, e.target.dataset.contar && !root.classList.contains('sem-entrada') ? 900 : 0);
      });
    },
    { threshold: 0.15 }
  );
  surgem.forEach((el) => io.observe(el));
  numeros.forEach((el) => io.observe(el));
} else {
  surgem.forEach((el) => el.classList.add('visto'));
}

// Inclinação 3D suave dos cartões, a seguir o rato.
if (!semMovimento && matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.inicio-cartao').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
    });
  });
}
