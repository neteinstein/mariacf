// Efeitos visuais partilhados pelas calculadoras (carregado por site.js).
// Tudo é declarativo: as páginas só acrescentam atributos data-* ao HTML e
// este módulo trata de dar vida ao resultado.
//
//  · Números grandes e estatísticas contam até ao valor quando mudam.
//  · Pontuações «x / N» ganham um anel de progresso no cabeçalho.
//  · .fx-escala[data-src][data-min][data-max][data-faixas] desenha uma escala
//    por faixas coloridas com um marcador animado.
//  · .fx-degraus[data-src][data-max] desenha níveis em escada (CFS…).
//  · .fx-pessoas[data-src] desenha 100 pessoas e destaca o risco (em %).
//  · .fx-icones[data-src] desenha um ícone por unidade (maços-ano, bebidas).
//  · .fx-gauss[data-src] desenha a curva normal e marca o desvio-padrão (Z).
//  · .fx-acronimo acende as letras de um acrónimo (STOP-BANG, CURB-65…).
//  · Questionários (.qitem) ganham barra de progresso, marcação das perguntas
//    respondidas e um gráfico com os pontos de cada pergunta.
//
// Nada disto é necessário para a calculadora funcionar: sem JavaScript ou com
// «reduzir movimento» ativo, os valores aparecem de imediato.

const SVG = 'http://www.w3.org/2000/svg';
const movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)');

const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- Números ---------- */

const RE_NUM = /^([+\-−]?)(\d{1,3}(?:[ \u00a0\u202f]\d{3})+|\d+)(?:,(\d+))?$/;

/** Lê um número escrito em pt-PT («1 234,5», «−1,2», «+0,8»). */
export function lerNumero(texto) {
  const t = String(texto ?? '').trim();
  const m = RE_NUM.exec(t);
  if (!m) return null;
  const inteiro = m[2].replace(/[ \u00a0\u202f]/g, '');
  let valor = Number(`${inteiro}.${m[3] || '0'}`);
  if (m[1] === '-' || m[1] === '−') valor = -valor;
  return { valor, casas: m[3] ? m[3].length : 0, sinal: m[1], agrupar: /[ \u00a0\u202f]/.test(m[2]), texto: t };
}

function escreverNumero(v, f) {
  const arred = Number(v.toFixed(f.casas));
  const s = Math.abs(arred).toLocaleString('pt-PT', {
    minimumFractionDigits: f.casas,
    maximumFractionDigits: f.casas,
    useGrouping: f.agrupar,
  });
  if (arred < 0) return (f.sinal === '−' ? '−' : '-') + s;
  if (f.sinal === '+' && arred > 0) return `+${s}`;
  return s;
}

function primeiroTexto(el) {
  for (const n of el.childNodes) {
    if (n.nodeType === Node.TEXT_NODE && n.nodeValue.trim()) return n;
  }
  return null;
}

const visivel = (el) => (el.checkVisibility ? el.checkVisibility() : el.offsetParent !== null);

// Estado de cada número vigiado: valor-alvo, valor mostrado e o último texto
// escrito por nós (para ignorar as nossas próprias alterações).
const numeros = new Map();

function vigiarNumero(el) {
  if (numeros.has(el)) return numeros.get(el);
  const estado = { alvo: null, mostrado: 0, formato: null, escrito: null, raf: 0, terminar: null, ouvintes: new Set(), contar: !el.closest('[data-fx-sem-contagem]') };
  numeros.set(el, estado);
  lerAlvo(el, estado, false);
  new MutationObserver(() => lerAlvo(el, estado, true)).observe(el, { childList: true, characterData: true, subtree: true });
  return estado;
}

function lerAlvo(el, estado, animar) {
  if (el.textContent === estado.escrito) return;
  // Textos compridos no número grande (datas, classificações) usam letra mais pequena.
  const big = el.parentElement?.classList.contains('dose-big') ? el.parentElement : null;
  if (big) big.classList.toggle('fx-longo', el.textContent.trim().length > 9 && !lerNumero(el.textContent));
  cancelAnimationFrame(estado.raf);
  estado.terminar = null;
  const no = primeiroTexto(el);
  const n = no && lerNumero(no.nodeValue);
  const anterior = estado.alvo;
  if (!n) {
    estado.alvo = null;
    estado.escrito = el.textContent;
  } else {
    const de = anterior == null ? 0 : estado.mostrado;
    estado.alvo = n.valor;
    estado.formato = n;
    if (animar && estado.contar && de !== n.valor && !movimentoReduzido.matches && visivel(el)) contar(el, estado, no, de);
    else {
      estado.mostrado = n.valor;
      estado.escrito = el.textContent;
    }
  }
  if (anterior !== estado.alvo) estado.ouvintes.forEach((f) => f(estado.alvo));
}

function contar(el, estado, no, de) {
  const alvo = estado.alvo;
  const f = estado.formato;
  const [, antes, , depois] = /^(\s*)(.*?)(\s*)$/s.exec(no.nodeValue);
  const t0 = performance.now();
  const dur = 750;
  const passo = (t) => {
    const k = Math.min((t - t0) / dur, 1);
    const e = 1 - Math.pow(1 - k, 3);
    const v = de + (alvo - de) * e;
    estado.mostrado = v;
    no.nodeValue = antes + (k < 1 ? escreverNumero(v, f) : f.texto) + depois;
    estado.escrito = el.textContent;
    if (k < 1) estado.raf = requestAnimationFrame(passo);
    else estado.terminar = null;
  };
  estado.terminar = () => {
    cancelAnimationFrame(estado.raf);
    passo(t0 + dur);
  };
  passo(t0);
}

// Algumas páginas leem o número do ecrã para o email ou a impressão: antes
// disso, qualquer contagem em curso salta para o valor final.
function terminarContagens() {
  numeros.forEach((estado) => estado.terminar?.());
}

/** Recomeça do zero a contagem de um número (ao mostrar um separador). */
function recontar(el) {
  const estado = numeros.get(el);
  if (!estado || estado.alvo == null || !estado.contar || movimentoReduzido.matches) return;
  const no = primeiroTexto(el);
  if (!no) return;
  cancelAnimationFrame(estado.raf);
  contar(el, estado, no, 0);
}

/** Valor numérico atual de um elemento-fonte (data-valor tem prioridade sobre o texto). */
function valorDe(el) {
  if (!el) return null;
  if (el.dataset.valor !== undefined && el.dataset.valor !== '') {
    const v = Number(el.dataset.valor);
    return Number.isFinite(v) ? v : null;
  }
  return vigiarNumero(el).alvo;
}

/** Chama f(valor) agora e sempre que o valor do elemento-fonte mudar. */
function aoMudar(el, f) {
  if (!el) return;
  if (el.hasAttribute('data-valor')) {
    new MutationObserver(() => f(valorDe(el))).observe(el, { attributes: true, attributeFilter: ['data-valor'] });
  } else {
    vigiarNumero(el).ouvintes.add(() => f(valorDe(el)));
  }
  f(valorDe(el));
}

const fonte = (comp) => {
  const src = comp.dataset.src;
  return src ? document.querySelector(src) : comp;
};

/* ---------- Repetir animações ao mostrar ---------- */

// Cada componente regista uma função que o põe a zero e anima até ao valor.
// O mesmo elemento não repete duas vezes seguidas (separador + entrada no ecrã).
const repeticoes = new Set();
const ultimaVez = new WeakMap();

function podeRepetir(el) {
  const agora = performance.now();
  if (agora - (ultimaVez.get(el) ?? -1e9) < 400 || !visivel(el)) return false;
  ultimaVez.set(el, agora);
  return true;
}

function repetirEm(contentor) {
  numeros.forEach((_, el) => {
    if (contentor.contains(el) && podeRepetir(el)) recontar(el);
  });
  repeticoes.forEach(({ el, f }) => {
    if (contentor.contains(el) && podeRepetir(el)) f();
  });
}

function aoRepetir(el, f) {
  repeticoes.add({ el, f });
}

/* ---------- Anel das pontuações «x / N» ---------- */

const ICONES = {
  baixo: '<path d="M36 51l9 9 19-20"/>',
  moderado: '<path d="M50 34v18"/><circle cx="50" cy="63" r="1.5"/>',
  alto: '<path d="M50 34v18"/><circle cx="50" cy="63" r="1.5"/>',
  'muito-alto': '<path d="M43 34v18M57 34v18"/><circle cx="43" cy="63" r="1.5"/><circle cx="57" cy="63" r="1.5"/>',
};

function montarAnel(head) {
  const big = head.querySelector('.dose-big');
  const num = big?.querySelector('span:not(.u)');
  const u = big?.querySelector('.u');
  const m = u && /^\/\s*(\d+)/.exec(u.textContent.trim());
  if (!num || !m || head.querySelector('.fx-anel')) return;
  const max = Number(m[1]);
  const resultado = head.closest('.result');
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('class', 'fx-anel');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `
    <circle class="fx-anel-fundo" cx="50" cy="50" r="42"/>
    <circle class="fx-anel-valor" cx="50" cy="50" r="42" pathLength="100"/>
    <g class="fx-anel-icone"></g>`;
  head.append(svg);
  head.classList.add('fx-com-anel');
  const arco = svg.querySelector('.fx-anel-valor');
  const icone = svg.querySelector('.fx-anel-icone');

  const pintar = (v) => {
    const frac = v == null ? 0 : Math.min(Math.max(v / max, 0), 1);
    arco.style.strokeDashoffset = String(100 - frac * 100);
  };
  const pintarIcone = () => {
    icone.innerHTML = ICONES[resultado?.dataset.nivel] || '';
  };
  aoMudar(num, pintar);
  pintarIcone();
  if (resultado) new MutationObserver(pintarIcone).observe(resultado, { attributes: true, attributeFilter: ['data-nivel'] });
  aoRepetir(svg, () => {
    arco.style.transition = 'none';
    arco.style.strokeDashoffset = '100';
    arco.getBoundingClientRect();
    arco.style.transition = '';
    pintar(valorDe(num));
  });
}

/* ---------- Escala por faixas ---------- */

// data-faixas="0~7:baixo:Normal|8~9:moderado:Ligeira|…" (da esquerda para a direita).
// Com data-continuo, as faixas são intervalos contínuos e o valor posiciona-se
// linearmente entre data-min e data-max.
function lerFaixas(texto) {
  return texto.split('|').map((f) => {
    const [intervalo, nivel, ...rotulo] = f.split(':');
    const [de, ate] = intervalo.split('~').map(Number);
    return { de, ate, nivel: nivel.trim(), rotulo: rotulo.join(':').trim() };
  });
}

const fmtN = (n) => String(n).replace('.', ',');
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function montarEscala(comp) {
  if (comp.dataset.fxPronto) return;
  comp.dataset.fxPronto = '1';
  const src = fonte(comp);
  let desenho = construirEscala(comp);
  aoMudar(src, (v) => desenho.pintar(v));
  // As faixas podem mudar (por ex. o ponto de corte depende da escolaridade).
  new MutationObserver(() => {
    desenho = construirEscala(comp);
    desenho.pintar(valorDe(src));
  }).observe(comp, { attributes: true, attributeFilter: ['data-faixas', 'data-min', 'data-max'] });
  aoRepetir(comp, () => desenho.repetir(valorDe(src)));
}

function construirEscala(comp) {
  const min = Number(comp.dataset.min);
  const max = Number(comp.dataset.max);
  const continuo = comp.hasAttribute('data-continuo');
  // data-inclusivo: nas escalas contínuas, o limite superior de cada faixa pertence-lhe (≤).
  const inclusivo = comp.hasAttribute('data-inclusivo');
  const faixas = lerFaixas(comp.dataset.faixas);
  const total = continuo ? max - min : max - min + 1;
  const largura = (f) => (continuo ? f.ate - f.de : f.ate - f.de + 1) / total;
  const pos = (v) => {
    const p = continuo ? (v - min) / (max - min) : (v - min + 0.5) / total;
    return Math.min(Math.max(p, 0.005), 0.995) * 100;
  };

  comp.setAttribute('aria-hidden', 'true');
  const titulo = comp.dataset.titulo ? `<div class="fx-titulo">${esc(comp.dataset.titulo)}</div>` : '';
  let acumulado = 0;
  const marcas = [];
  const segmentos = faixas
    .map((f) => {
      const inicio = acumulado;
      acumulado += largura(f);
      marcas.push({ p: inicio * 100, t: f.de });
      return `<span class="fx-faixa" data-nivel="${f.nivel}" style="flex:${largura(f)}"></span>`;
    })
    .join('');
  marcas.push({ p: 100, t: faixas[faixas.length - 1].ate, rotulo: comp.dataset.maxRotulo });
  // Esconde as marcas demasiado próximas da anterior para não se sobreporem.
  let ultima = -100;
  const marcasHtml = marcas
    .filter((m, i) => {
      if (!Number.isFinite(m.t)) return false;
      const ok = m.p - ultima >= 7 || i === marcas.length - 1;
      if (ok) ultima = m.p;
      return ok;
    })
    .map((m) => `<span style="left:${m.p}%">${m.rotulo || fmtN(Math.round(m.t * 100) / 100)}</span>`)
    .join('');
  const legenda = faixas.map((f, i) => `<li data-nivel="${esc(f.nivel)}" data-i="${i}"><i></i>${esc(f.rotulo)}</li>`).join('');

  comp.innerHTML = `${titulo}
    <div class="fx-escala-barra">${segmentos}<div class="fx-marcador"><b></b></div></div>
    <div class="fx-escala-marcas">${marcasHtml}</div>
    <ul class="fx-escala-legenda">${legenda}</ul>`;

  const marcador = comp.querySelector('.fx-marcador');
  const segs = $$('.fx-faixa', comp);
  const itens = $$('.fx-escala-legenda li', comp);
  const faixaDe = (v) => {
    const i = faixas.findIndex((f, j) =>
      continuo
        ? inclusivo
          ? (v > f.de || j === 0) && (v <= f.ate || j === faixas.length - 1)
          : (v >= f.de || j === 0) && (v < f.ate || j === faixas.length - 1)
        : v >= f.de && v <= f.ate
    );
    if (i >= 0) return i;
    return v < faixas[0].de ? 0 : faixas.length - 1;
  };

  const pintar = (v) => {
    const ok = v != null && Number.isFinite(v);
    comp.classList.toggle('fx-sem-valor', !ok);
    if (!ok) return;
    marcador.style.left = `${pos(v)}%`;
    const i = faixaDe(v);
    segs.forEach((s, j) => s.classList.toggle('atual', j === i));
    itens.forEach((s, j) => s.classList.toggle('atual', j === i));
    marcador.dataset.nivel = faixas[i]?.nivel || '';
  };
  const repetir = (v) => {
    marcador.style.transition = 'none';
    marcador.style.left = '0%';
    marcador.getBoundingClientRect();
    marcador.style.transition = '';
    pintar(v);
  };
  return { pintar, repetir };
}

/* ---------- Degraus (níveis 1…N, por ex. a Clinical Frailty Scale) ---------- */

function montarDegraus(comp) {
  if (comp.dataset.fxPronto) return;
  comp.dataset.fxPronto = '1';
  const min = Number(comp.dataset.min || 1);
  const max = Number(comp.dataset.max);
  const n = max - min + 1;
  comp.setAttribute('aria-hidden', 'true');
  let degraus = '';
  for (let i = 0; i < n; i++) degraus += `<span style="--k:${i};--h:${18 + (i / (n - 1)) * 82}%"><b>${min + i}</b></span>`;
  comp.innerHTML = `${comp.dataset.titulo ? `<div class="fx-titulo">${esc(comp.dataset.titulo)}</div>` : ''}<div class="fx-degraus-grelha" style="--n:${n}">${degraus}</div>`;
  const spans = $$('.fx-degraus-grelha > span', comp);
  const src = fonte(comp);
  const pintar = (v) => {
    spans.forEach((s, i) => {
      s.classList.toggle('on', v != null && min + i <= v);
      s.classList.toggle('atual', v != null && min + i === Math.round(v));
    });
  };
  aoMudar(src, pintar);
  aoRepetir(comp, () => {
    spans.forEach((s) => s.classList.remove('on', 'atual'));
    comp.getBoundingClientRect();
    requestAnimationFrame(() => pintar(valorDe(src)));
  });
}

/* ---------- 100 pessoas (risco em %) ---------- */

const PESSOA = 'M5 2.2a2.2 2.2 0 1 1 0 4.4a2.2 2.2 0 1 1 0-4.4zM1.4 13.6v-3.3c0-1.8 1.4-3.1 3.6-3.1s3.6 1.3 3.6 3.1v3.3z';

function montarPessoas(comp) {
  if (comp.dataset.fxPronto) return;
  comp.dataset.fxPronto = '1';
  const colunas = 20;
  let pessoas = '';
  for (let i = 0; i < 100; i++) {
    const x = (i % colunas) * 11;
    const y = Math.floor(i / colunas) * 16;
    pessoas += `<path d="${PESSOA}" transform="translate(${x} ${y})" style="--i:${i}"/>`;
  }
  comp.innerHTML = `${comp.dataset.titulo ? `<div class="fx-titulo">${esc(comp.dataset.titulo)}</div>` : ''}
    <svg class="fx-pessoas-svg" viewBox="0 0 ${colunas * 11 - 1} 80" aria-hidden="true">${pessoas}</svg>
    <p class="fx-legenda"></p>`;
  const paths = $$('path', comp);
  const legenda = comp.querySelector('.fx-legenda');
  const src = fonte(comp);
  const pintar = (v) => {
    const ok = v != null && Number.isFinite(v);
    const n = ok ? Math.min(Math.round(v), 100) : 0;
    paths.forEach((p, i) => p.classList.toggle('on', i < n));
    if (!ok) {
      legenda.textContent = '';
      return;
    }
    const quantos = v < 0.5 ? 'menos de 1' : String(n);
    legenda.innerHTML = esc(comp.dataset.legenda || 'Em cada 100 pessoas, {n}.').replace('{n}', `<strong>${quantos}</strong>`);
  };
  aoMudar(src, pintar);
  aoRepetir(comp, () => {
    paths.forEach((p) => p.classList.remove('on'));
    comp.getBoundingClientRect();
    pintar(valorDe(src));
  });
}

/* ---------- Ícones contados (maços-ano, bebidas-padrão…) ---------- */

// <div class="fx-icones" data-src data-icone="maco|copo" data-max="60" data-marca="20"
//      data-legenda="{n} …" data-rotulo-dentro="…" data-rotulo-alem="…">
// Um ícone por unidade (arredondada). Os que passam data-marca ficam a vermelho.
const ICONES_CONTAGEM = {
  maco: '<svg viewBox="0 0 16 20"><rect class="c" x="4" y="1" width="2.2" height="5" rx="1"/><rect class="c" x="7" y="0" width="2.2" height="6" rx="1"/><rect class="c" x="10" y="1.5" width="2.2" height="4.5" rx="1"/><rect class="b" x="2" y="5" width="12" height="14" rx="2"/><rect class="f" x="2" y="10" width="12" height="3"/></svg>',
  copo: '<svg viewBox="0 0 16 20"><path class="b" d="M3 1h10l-1.2 7.5a3.8 3.8 0 0 1-7.6 0zM7 12h2v5h3v2H4v-2h3z"/><path class="f" d="M3.6 4.5h8.8l-.7 4a3.7 3.7 0 0 1-7.4 0z"/></svg>',
};

function montarIcones(comp) {
  if (comp.dataset.fxPronto) return;
  comp.dataset.fxPronto = '1';
  const max = Number(comp.dataset.max || 50);
  const icone = ICONES_CONTAGEM[comp.dataset.icone] || ICONES_CONTAGEM.maco;
  comp.setAttribute('aria-hidden', 'true');
  let html = '';
  for (let i = 0; i < max; i++) html += `<span class="fx-ic" style="--k:${i}">${icone}</span>`;
  comp.innerHTML = `${comp.dataset.titulo ? `<div class="fx-titulo">${esc(comp.dataset.titulo)}</div>` : ''}
    <div class="fx-icones-grelha">${html}<b class="fx-ic-mais"></b></div>
    <p class="fx-legenda"></p>
    <ul class="fx-icones-chave"><li><i></i></li><li class="alem"><i></i></li></ul>`;
  const ics = $$('.fx-ic', comp);
  const mais = comp.querySelector('.fx-ic-mais');
  const legenda = comp.querySelector('.fx-legenda');
  const src = fonte(comp);
  const pintar = (v) => {
    const ok = v != null && Number.isFinite(v);
    const n = ok ? Math.round(v) : 0;
    const marca = Number(comp.dataset.marca || Infinity);
    ics.forEach((ic, i) => {
      ic.classList.toggle('on', i < n);
      ic.classList.toggle('alem', i >= marca);
    });
    mais.textContent = n > max ? `+${n - max}` : '';
    const fmtV = ok ? (v % 1 ? fmtN(Math.round(v * 10) / 10) : String(v)) : '—';
    const texto = (t) => esc(t || '').replaceAll('{marca}', fmtN(marca));
    legenda.innerHTML = ok ? texto(comp.dataset.legenda || '{n}').replaceAll('{n}', `<strong>${fmtV}</strong>`) : '';
    comp.querySelector('.fx-icones-chave li:first-child').innerHTML = `<i></i>${texto(comp.dataset.rotuloDentro)}`;
    comp.querySelector('.fx-icones-chave li.alem').innerHTML = `<i></i>${texto(comp.dataset.rotuloAlem)}`;
  };
  aoMudar(src, pintar);
  new MutationObserver(() => pintar(valorDe(src))).observe(comp, { attributes: true, attributeFilter: ['data-marca'] });
  aoRepetir(comp, () => {
    ics.forEach((ic) => ic.classList.remove('on'));
    comp.getBoundingClientRect();
    requestAnimationFrame(() => pintar(valorDe(src)));
  });
}

/* ---------- Curva normal (Z-score) ---------- */

// Função de distribuição normal (aproximação de Abramowitz-Stegun, erro < 1e-7).
export function normalCDF(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1 - p : p;
}

let contadorGauss = 0;

function montarGauss(comp) {
  if (comp.dataset.fxPronto) return;
  comp.dataset.fxPronto = '1';
  const clip = `fx-gauss-${(contadorGauss += 1)}`;
  const W = 380;
  const H = 96;
  const zx = (z) => ((z + 4) / 8) * W;
  const zy = (z) => H - 12 - Math.exp((-z * z) / 2) * (H - 26);
  let curva = `M0 ${zy(-4)}`;
  for (let z = -4; z <= 4.001; z += 0.1) curva += ` L${zx(z).toFixed(1)} ${zy(z).toFixed(1)}`;
  const faixa = (a, b, cls) => {
    let d = `M${zx(a)} ${H - 12}`;
    for (let z = a; z <= b + 0.001; z += 0.05) d += ` L${zx(z).toFixed(1)} ${zy(z).toFixed(1)}`;
    return `<path class="${cls}" d="${d} L${zx(b)} ${H - 12} Z"/>`;
  };
  const eixo = [-3, -2, -1, 0, 1, 2, 3]
    .map((z) => `<line class="fx-g-grelha" x1="${zx(z)}" x2="${zx(z)}" y1="${H - 12}" y2="${H - 7}"/><text x="${zx(z)}" y="${H}" text-anchor="middle">${z > 0 ? '+' : z < 0 ? '−' : ''}${Math.abs(z)}</text>`)
    .join('');
  comp.setAttribute('aria-hidden', 'true');
  comp.innerHTML = `${comp.dataset.titulo ? `<div class="fx-titulo">${esc(comp.dataset.titulo)}</div>` : ''}
    <svg class="fx-gauss-svg" viewBox="0 -14 ${W} ${H + 16}">
      <defs><clipPath id="${clip}"><rect class="fx-g-corte" x="0" y="-14" width="${W}" height="${H + 16}"/></clipPath></defs>
      ${faixa(-4, -2, 'fx-g-extremo')}${faixa(2, 4, 'fx-g-extremo')}${faixa(-2, 2, 'fx-g-normal')}
      <path class="fx-g-area" d="${curva} L${W} ${H - 12} L0 ${H - 12} Z" clip-path="url(#${clip})"/>
      <path class="fx-g-curva" d="${curva}"/>
      <line class="fx-g-base" x1="0" x2="${W}" y1="${H - 12}" y2="${H - 12}"/>
      ${eixo}
      <g class="fx-g-marca"><line x1="0" x2="0" y1="-2" y2="${H - 12}"/><circle cx="0" cy="-2" r="4.5"/><text class="fx-g-p" x="0" y="-9" text-anchor="middle"></text></g>
    </svg>`;
  const corte = comp.querySelector('.fx-g-corte');
  const marca = comp.querySelector('.fx-g-marca');
  const rotulo = comp.querySelector('.fx-g-p');
  const src = fonte(comp);
  const pintar = (z) => {
    const ok = z != null && Number.isFinite(z);
    comp.classList.toggle('fx-sem-valor', !ok);
    if (!ok) return;
    const zc = Math.min(Math.max(z, -3.9), 3.9);
    const x = zx(zc);
    corte.style.transform = `scaleX(${x / W})`;
    marca.style.transform = `translateX(${x}px)`;
    const p = normalCDF(z) * 100;
    rotulo.textContent = p < 0.1 ? 'P < 0,1' : p > 99.9 ? 'P > 99,9' : `P${fmtN(p < 1 || p > 99 ? p.toFixed(1) : Math.round(p))}`;
    rotulo.setAttribute('text-anchor', x < 30 ? 'start' : x > W - 30 ? 'end' : 'middle');
  };
  aoMudar(src, pintar);
  aoRepetir(comp, () => {
    corte.style.transition = marca.style.transition = 'none';
    corte.style.transform = 'scaleX(0)';
    marca.style.transform = 'translateX(0px)';
    comp.getBoundingClientRect();
    corte.style.transition = marca.style.transition = '';
    pintar(valorDe(src));
  });
}

/* ---------- Acrónimos que acendem ---------- */

// <div class="fx-acronimo"><span data-campo="id-ou-name">S</span>…</div>
// A letra acende quando a caixa está marcada ou quando a opção escolhida vale
// mais do que zero (data-campo aceita vários campos separados por espaço, e
// data-exceto apaga a letra quando outro campo está ativo). Com
// data-mostrar-valor, mostra também os pontos.
function valorCampo(campo) {
  const el = document.getElementById(campo);
  if (el && el.type === 'checkbox') return el.checked ? 1 : 0;
  if (el && el.tagName === 'SELECT') return Number(el.value) || 0;
  const marcado = document.querySelector(`input[name="${campo}"]:checked`);
  if (marcado) return Number(marcado.value) || 0;
  if (el) return Number(String(el.value).replace(',', '.')) || 0;
  return null;
}

function montarAcronimo(comp) {
  if (comp.dataset.fxPronto) return;
  comp.dataset.fxPronto = '1';
  comp.setAttribute('aria-hidden', 'true');
  const letras = $$('[data-campo]', comp);
  const mostrar = comp.hasAttribute('data-mostrar-valor');
  letras.forEach((l) => {
    if (mostrar) l.insertAdjacentHTML('beforeend', '<sup></sup>');
  });
  const pintar = () => {
    letras.forEach((l) => {
      const campos = l.dataset.campo.split(' ');
      // data-pontos: quanto vale uma caixa marcada (por omissão, 1).
      const valores = campos.map((c) => {
        const v = valorCampo(c);
        return document.getElementById(c)?.type === 'checkbox' && v ? Number(l.dataset.pontos || 1) : v;
      });
      const excluido = l.dataset.exceto && valorCampo(l.dataset.exceto) > 0;
      const soma = excluido ? 0 : valores.reduce((a, b) => a + (b || 0), 0);
      const respondido = valores.some((v) => v !== null);
      const on = soma > 0;
      if (l.classList.contains('on') !== on) {
        l.classList.toggle('on', on);
        if (on) {
          l.classList.remove('fx-salto');
          void l.offsetWidth;
          l.classList.add('fx-salto');
        }
      }
      // Nas perguntas de escolha mostra sempre os pontos (mesmo 0); nas caixas, só quando contam.
      const escolha = campos.some((c) => document.querySelector(`input[name="${c}"]`)?.type === 'radio');
      if (mostrar) l.querySelector('sup').textContent = (escolha && respondido) || soma > 0 ? String(soma) : '';
    });
  };
  document.addEventListener('change', pintar);
  document.addEventListener('input', pintar);
  pintar();
}

/* ---------- Questionários: progresso, perguntas respondidas e gráfico ---------- */

// Perguntas visíveis e obrigatórias (as que estão dentro de [data-fx-opcional] não contam).
function perguntasDe(form) {
  return $$('.qitem', form).filter((q) => {
    for (let p = q; p && p !== form; p = p.parentElement) if (p.hidden || p.hasAttribute('data-fx-opcional')) return false;
    return q.querySelector('input[type="radio"]');
  });
}

function respostaDe(q) {
  const radios = $$('input[type="radio"]', q);
  const valores = radios.map((r) => Number(r.value));
  const marcado = radios.find((r) => r.checked);
  const numerico = valores.every(Number.isFinite);
  return {
    respondida: Boolean(marcado),
    valor: marcado ? Number(marcado.value) : null,
    min: numerico ? Math.min(...valores) : 0,
    max: numerico ? Math.max(...valores) : 0,
    numerico,
    texto: q.querySelector('legend')?.textContent.replace(/^\s*\S+\s+/, '').trim() || '',
    rotulo: marcado ? q.querySelector(`label[for="${marcado.id}"] strong`)?.textContent || '' : '',
  };
}

function montarQuestionario(form) {
  if (form.dataset.fxQuestionario) return;
  const calc = form.closest('.calc');
  const resultado = calc?.querySelector('.result');
  if (perguntasDe(form).length < 3) return;
  form.dataset.fxQuestionario = '1';

  // Barra de progresso fixa no topo do formulário
  const prog = document.createElement('div');
  prog.className = 'fx-progresso';
  prog.innerHTML = `
    <div class="fx-progresso-txt"><span class="fx-p-n"></span><button type="button" class="fx-p-ir" hidden>Ver resultado ${'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>'}</button></div>
    <div class="fx-progresso-barra"><span></span></div>`;
  form.prepend(prog);
  const txt = prog.querySelector('.fx-p-n');
  const barra = prog.querySelector('.fx-progresso-barra span');
  const ir = prog.querySelector('.fx-p-ir');
  ir.addEventListener('click', () => resultado?.scrollIntoView({ behavior: movimentoReduzido.matches ? 'auto' : 'smooth', block: 'start' }));

  // Anel de progresso à volta do emoji do estado vazio
  const vazio = resultado?.querySelector('.empty');
  const emoji = vazio?.querySelector('.big-emoji');
  let anelVazio = null;
  let faltam = null;
  if (emoji) {
    const w = document.createElement('div');
    w.className = 'fx-vazio-anel';
    w.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="fx-anel-fundo" cx="50" cy="50" r="44"/><circle class="fx-anel-valor" cx="50" cy="50" r="44" pathLength="100"/></svg>`;
    emoji.replaceWith(w);
    w.append(emoji);
    anelVazio = w.querySelector('.fx-anel-valor');
    faltam = document.createElement('p');
    faltam.className = 'fx-faltam';
    vazio.append(faltam);
  }

  // Gráfico de pontos por pergunta, no corpo do resultado
  let grafico = null;
  const perguntas0 = perguntasDe(form).map(respostaDe);
  const comGrafico = !form.hasAttribute('data-fx-sem-grafico') && perguntas0.every((p) => p.numerico) && resultado;
  if (comGrafico) {
    const corpo = corpoDoResultado(resultado);
    if (corpo) {
      grafico = document.createElement('div');
      grafico.className = 'fx-barras';
      grafico.setAttribute('aria-hidden', 'true');
      grafico.innerHTML = `<div class="fx-titulo">${esc(form.dataset.fxGraficoTitulo || 'Pontos por pergunta')}</div><div class="fx-barras-grelha"></div>`;
      const antes = corpo.querySelector('.notices, .result-actions');
      corpo.insertBefore(grafico, antes || null);
    }
  }

  const atualizar = () => {
    const qs = perguntasDe(form);
    const rs = qs.map(respostaDe);
    const feitas = rs.filter((r) => r.respondida).length;
    const n = rs.length;
    qs.forEach((q, i) => q.classList.toggle('fx-respondida', rs[i].respondida));
    const completo = feitas === n;
    txt.innerHTML = completo
      ? `<strong>Completo</strong> · ${n} de ${n} respondidas`
      : `<strong>${feitas}</strong> de ${n} respondidas`;
    barra.style.width = `${(feitas / n) * 100}%`;
    prog.classList.toggle('completo', completo);
    ir.hidden = !completo;
    if (anelVazio) anelVazio.style.strokeDashoffset = String(100 - (feitas / n) * 100);
    if (faltam) {
      const f = n - feitas;
      faltam.textContent = f === 0 ? '' : f === 1 ? 'Falta 1 pergunta' : `Faltam ${f} de ${n} perguntas`;
    }
    if (grafico) {
      const grelha = grafico.querySelector('.fx-barras-grelha');
      if (grelha.children.length !== n) {
        grelha.innerHTML = rs.map((_, i) => `<div class="fx-barra" style="--k:${i}"><span><i></i></span><b>${i + 1}</b></div>`).join('');
        grelha.style.setProperty('--n', n);
      }
      rs.forEach((r, i) => {
        const el = grelha.children[i];
        const frac = r.respondida && r.max > r.min ? (r.valor - r.min) / (r.max - r.min) : 0;
        el.style.setProperty('--h', `${Math.max(frac * 100, r.respondida ? 4 : 0)}%`);
        el.classList.toggle('vazia', !r.respondida);
        el.title = `${i + 1}. ${r.texto}${r.respondida ? ` — ${r.rotulo} (${fmtN(r.valor)})` : ''}`;
      });
    }
  };
  form.addEventListener('change', atualizar);
  form.addEventListener('input', atualizar);
  // Alguns formulários são limpos por código (botão «limpar»); o evento reset chega antes.
  form.addEventListener('reset', () => setTimeout(atualizar));
  atualizar();
  if (grafico) {
    aoRepetir(grafico, () => {
      grafico.classList.remove('fx-entrar');
      void grafico.offsetWidth;
      grafico.classList.add('fx-entrar');
    });
  }
}

/** Devolve (criando se preciso) o .result-body do painel de resultado. */
function corpoDoResultado(resultado) {
  const head = resultado.querySelector('.result-head');
  if (!head) return null;
  const irmao = head.nextElementSibling;
  if (irmao?.classList.contains('result-body')) return irmao;
  const corpo = document.createElement('div');
  corpo.className = 'result-body';
  while (head.nextSibling) corpo.append(head.nextSibling);
  head.after(corpo);
  return corpo;
}

/* ---------- Cabeçalho do resultado: brilho e salto ao mudar ---------- */

function animarCabecalho(resultado) {
  const head = resultado.querySelector('.result-head');
  if (!head) return;
  // Enquanto o brilho está a passar não recomeça (ao arrastar um cursor, por exemplo).
  const brilho = () => {
    if (head.classList.contains('fx-brilho')) return;
    head.classList.add('fx-brilho');
  };
  head.addEventListener('animationend', (e) => {
    if (e.animationName === 'fx-brilho') head.classList.remove('fx-brilho');
  });
  const num = head.querySelector('.dose-big span:not(.u)');
  if (num && !num.closest('[data-fx-sem-contagem]')) {
    let primeira = true;
    vigiarNumero(num).ouvintes.add(() => {
      if (primeira) {
        primeira = false;
        return;
      }
      if (visivel(head)) brilho();
    });
  }
  let nivel = resultado.dataset.nivel;
  new MutationObserver(() => {
    if (resultado.dataset.nivel === nivel) return;
    nivel = resultado.dataset.nivel;
    if (!visivel(head)) return;
    head.classList.remove('pop');
    void head.offsetWidth;
    head.classList.add('pop');
  }).observe(resultado, { attributes: true, attributeFilter: ['data-nivel'] });
}

/* ---------- Brilho que segue o rato nos painéis ---------- */

function brilhoNosPaineis() {
  if (!matchMedia('(hover: hover)').matches) return;
  document.addEventListener('pointermove', (e) => {
    const p = e.target.closest?.('.panel');
    if (!p) return;
    const r = p.getBoundingClientRect();
    p.style.setProperty('--mx', `${e.clientX - r.left}px`);
    p.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
}

/* ---------- Arranque ---------- */

function iniciar() {
  const resultados = $$('.result');
  resultados.forEach((r) => {
    // Resultados sem .result-body: arruma as ações num corpo com margens.
    if (r.querySelector('.result-head + .result-actions, .result-head + .notices')) corpoDoResultado(r);
  });

  $$('.result .dose-big > span:not(.u), .result .stat .v').forEach(vigiarNumero);
  $$('.result-head').forEach(montarAnel);
  $$('.fx-escala').forEach(montarEscala);
  $$('.fx-degraus').forEach(montarDegraus);
  $$('.fx-pessoas').forEach(montarPessoas);
  $$('.fx-icones').forEach(montarIcones);
  $$('.fx-gauss').forEach(montarGauss);
  $$('.fx-acronimo').forEach(montarAcronimo);
  $$('.calc form').forEach(montarQuestionario);
  resultados.forEach(animarCabecalho);
  brilhoNosPaineis();
  document.addEventListener('click', (e) => {
    if (e.target.closest?.('.result button, .result a')) terminarContagens();
  }, true);
  addEventListener('beforeprint', terminarContagens);

  // Novas estatísticas criadas mais tarde (por ex. tabelas geradas por código)
  resultados.forEach((r) => {
    new MutationObserver(() => $$('.stat .v', r).forEach(vigiarNumero)).observe(r, { childList: true, subtree: true });
  });

  // Ao mostrar um separador, as animações recomeçam do zero.
  $$('[data-painel]').forEach((p) => {
    new MutationObserver(() => {
      if (!p.hidden) requestAnimationFrame(() => repetirEm(p));
    }).observe(p, { attributes: true, attributeFilter: ['hidden'] });
  });
  // Ao aparecer o resultado (dados completos), idem.
  $$('.result [id$="-ok"]').forEach((ok) => {
    new MutationObserver(() => {
      if (!ok.hidden) requestAnimationFrame(() => repetirEm(ok));
    }).observe(ok, { attributes: true, attributeFilter: ['hidden'] });
  });
  // Primeira vez que cada resultado entra no ecrã: conta desde zero.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          repetirEm(e.target);
        });
      },
      { threshold: 0.25 }
    );
    resultados.forEach((r) => io.observe(r));
  }
}

// As páginas constroem as perguntas nos seus próprios módulos, que correm
// depois deste (mas antes de DOMContentLoaded); esperamos por eles.
let iniciado = false;
function iniciarUmaVez() {
  if (iniciado) return;
  iniciado = true;
  iniciar();
}
if (document.readyState === 'complete') iniciarUmaVez();
else {
  document.addEventListener('DOMContentLoaded', iniciarUmaVez);
  addEventListener('load', iniciarUmaVez);
}
