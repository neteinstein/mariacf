import { REGIOES, calcularRegraDosNove } from './queimados-core.js';

const $ = (sel) => document.querySelector(sel);

const form = $('#qu-form');
const resultado = $('#qu-resultado');

const ROTULOS_REGIOES = {
  cabecaPescoco: 'Cabeça e pescoço',
  membroSuperiorDireito: 'Membro superior direito',
  membroSuperiorEsquerdo: 'Membro superior esquerdo',
  troncoAnterior: 'Tronco anterior',
  troncoPosterior: 'Tronco posterior',
  membroInferiorDireito: 'Membro inferior direito',
  membroInferiorEsquerdo: 'Membro inferior esquerdo',
  perineo: 'Períneo',
};

let resultadoAtual = null;

/* ---------- Corpo: frente e costas, com as regiões da regra dos 9 ---------- */

// Formas de uma figura com 120 × 256 unidades. «esq»/«dir» referem-se ao lado de quem olha.
const FORMAS = {
  cabeca: '<ellipse cx="60" cy="23" rx="15" ry="18"/><rect x="53" y="38" width="14" height="12" rx="4"/>',
  tronco: '<path d="M36 52Q60 45 84 52L86 96Q84 122 82 138H38Q36 122 34 96Z"/>',
  bracoEsq: '<path d="M34 54Q25 56 23 67L13 136Q12 146 19 147Q26 148 27 139L37 82Z"/>',
  bracoDir: '<path d="M86 54Q95 56 97 67L107 136Q108 146 101 147Q94 148 93 139L83 82Z"/>',
  pernaEsq: '<path d="M38 138H59L57 244Q57 252 49 252H45Q39 252 40 244Z"/>',
  pernaDir: '<path d="M61 138H82L80 244Q81 252 75 252H71Q63 252 63 244Z"/>',
  perineo: '<path d="M51 134H69L60 150Z"/>',
};

// Na vista de frente, o lado direito da pessoa fica à esquerda de quem olha.
const VISTAS = {
  frente: [
    ['cabecaPescoco', 'cabeca', [60, 26]],
    ['troncoAnterior', 'tronco', [60, 98]],
    ['membroSuperiorDireito', 'bracoEsq', [22, 110]],
    ['membroSuperiorEsquerdo', 'bracoDir', [98, 110]],
    ['membroInferiorDireito', 'pernaEsq', [49, 200]],
    ['membroInferiorEsquerdo', 'pernaDir', [71, 200]],
    ['perineo', 'perineo', [60, 128]],
  ],
  costas: [
    ['cabecaPescoco', 'cabeca', [60, 26]],
    ['troncoPosterior', 'tronco', [60, 98]],
    ['membroSuperiorEsquerdo', 'bracoEsq', [22, 110]],
    ['membroSuperiorDireito', 'bracoDir', [98, 110]],
    ['membroInferiorEsquerdo', 'pernaEsq', [49, 200]],
    ['membroInferiorDireito', 'pernaDir', [71, 200]],
  ],
};

// Percentagem mostrada em cada vista: as regiões que aparecem nas duas mostram metade em cada.
const PCT_VISTA = (regiao, vista) => {
  const total = REGIOES[regiao];
  const emAmbas = VISTAS.frente.some(([r]) => r === regiao) && VISTAS.costas.some(([r]) => r === regiao);
  return emAmbas ? total / 2 : total;
};

function montarCorpo() {
  const el = $('#qu-corpo');
  const figura = (vista, dx) =>
    `<g transform="translate(${dx} 0)">${VISTAS[vista]
      .map(([regiao, forma, [x, y]]) => `<g class="qu-regiao" data-regiao="${regiao}"><title>${ROTULOS_REGIOES[regiao]} · ${REGIOES[regiao]}%</title>${FORMAS[forma]}<text x="${x}" y="${y}">${String(PCT_VISTA(regiao, vista)).replace('.', ',')}%</text></g>`)
      .join('')}<text class="qu-vista" x="60" y="272">${vista === 'frente' ? 'Frente' : 'Costas'}</text></g>`;
  el.innerHTML = `<svg viewBox="0 0 280 280" aria-hidden="true"><defs><linearGradient id="qu-fogo" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e2572f"/><stop offset="1" stop-color="#ecab2e"/></linearGradient></defs>${figura('frente', 10)}${figura('costas', 150)}</svg>`;
  el.addEventListener('click', (e) => {
    const g = e.target.closest('.qu-regiao');
    if (!g) return;
    const caixa = $(`#qu-${g.dataset.regiao}`);
    caixa.checked = !caixa.checked;
    caixa.dispatchEvent(new Event('change', { bubbles: true }));
  });
  el.addEventListener('pointerover', (e) => {
    const regiao = e.target.closest('.qu-regiao')?.dataset.regiao;
    el.querySelectorAll('.qu-regiao').forEach((g) => g.classList.toggle('realce', g.dataset.regiao === regiao));
  });
  el.addEventListener('pointerleave', () => el.querySelectorAll('.realce').forEach((g) => g.classList.remove('realce')));
}

function pintarCorpo(regioesQueimadas) {
  $('#qu-corpo').querySelectorAll('.qu-regiao').forEach((g) => g.classList.toggle('queimada', Boolean(regioesQueimadas[g.dataset.regiao])));
}

function atualizar() {
  const regioesQueimadas = {};
  Object.keys(REGIOES).forEach((r) => { regioesQueimadas[r] = $(`#qu-${r}`).checked; });

  const r = calcularRegraDosNove(regioesQueimadas);
  resultado.dataset.nivel = r.nivel;
  $('#qu-pontos').textContent = r.pontos;
  $('#qu-gravidade').textContent = r.gravidade;
  resultadoAtual = { ...r, regioesQueimadas };
  pintarCorpo(regioesQueimadas);
}
form.addEventListener('change', atualizar);

/* ---------- Ações: email e impressão ---------- */

function resumoTexto(r) {
  const regioes = Object.keys(REGIOES).filter((k) => r.regioesQueimadas[k]);
  const linhas = [
    'Regra dos 9 (Wallace) · Superfície corporal queimada',
    regioes.length
      ? `Regiões atingidas: ${regioes.map((k) => ROTULOS_REGIOES[k]).join(', ')}`
      : 'Regiões atingidas: nenhuma assinalada',
    `Superfície corporal queimada: ${r.pontos}%`,
    r.gravidade,
  ];
  linhas.push('', 'Informação de apoio — não substitui aconselhamento médico.', location.href);
  return linhas.join('\n');
}

$('#btn-email').addEventListener('click', () => {
  if (!resultadoAtual) return;
  const assunto = `Superfície corporal queimada — ${resultadoAtual.pontos}%`;
  const corpo = resumoTexto(resultadoAtual);
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
});

$('#btn-print').addEventListener('click', () => {
  window.print();
});

montarCorpo();
atualizar();
