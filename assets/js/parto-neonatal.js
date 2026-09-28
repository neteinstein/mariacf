import { calcularBishop, calcularApgar, calcularGlasgowPediatrico } from './parto-neonatal-core.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const tabs = $$('.tabbtn');
const paineis = $$('[data-painel]');
function selecionar(id) {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  history.replaceState(null, '', `?calc=${id}`);
}
tabs.forEach((t) => t.addEventListener('click', () => selecionar(t.dataset.tab)));

function criarPergunta(id, numero, texto, opcoes) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'step qitem';
  const legend = document.createElement('legend');
  legend.className = 'step-label';
  legend.innerHTML = `<span class="step-num">${numero}</span> ${texto}`;
  fieldset.appendChild(legend);

  const chips = document.createElement('div');
  chips.className = 'chips';
  opcoes.forEach(([texto2, pts]) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    const inputId = `${id}-${pts}`;
    chip.innerHTML = `<input type="radio" name="${id}" id="${inputId}" value="${pts}"><label for="${inputId}"><strong>${texto2}</strong><span>${pts} pontos</span></label>`;
    chips.appendChild(chip);
  });
  fieldset.appendChild(chips);
  return fieldset;
}

/* ---------- Bishop ---------- */

const BISHOP_ITENS = [
  ['dilatacao', 'Dilatação', [['0 cm', 0], ['1–2 cm', 1], ['3–4 cm', 2], ['≥ 5 cm', 3]]],
  ['apagamento', 'Apagamento', [['0–30%', 0], ['40–50%', 1], ['60–70%', 2], ['≥ 80%', 3]]],
  ['consistencia', 'Consistência', [['Firme', 0], ['Média', 1], ['Mole', 2]]],
  ['posicao', 'Posição', [['Posterior', 0], ['Média', 1], ['Anterior', 2]]],
  ['altura', 'Altura da apresentação (plano)', [['-3', 0], ['-2', 1], ['-1 / 0', 2], ['+1 / +2', 3]]],
];

const bishopForm = $('#bishop-form');
BISHOP_ITENS.forEach(([campo, texto, opcoes], i) => {
  $('#bishop-perguntas').appendChild(criarPergunta(`bi-${campo}`, i + 1, texto, opcoes));
});
const bishopResultado = $('#bishop-resultado');
let bishopAtual = null;

function atualizarBishop() {
  const valores = {};
  BISHOP_ITENS.forEach(([campo]) => {
    const marcado = bishopForm.querySelector(`input[name="bi-${campo}"]:checked`);
    valores[campo] = marcado ? Number(marcado.value) : NaN;
  });
  const r = calcularBishop(valores);
  const ok = $('#bishop-ok');
  const vazio = $('#bishop-vazio');
  const acoes = $('#result-actions-bishop');
  if (!r.ok) {
    bishopAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    return;
  }
  bishopAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  bishopResultado.dataset.nivel = r.nivel;
  $('#bi-pontos').textContent = r.pontos;
  $('#bi-recomendacao').textContent = r.recomendacao;
}
bishopForm.addEventListener('change', atualizarBishop);
atualizarBishop();

function resumoBishop(r) {
  const linhas = [
    'Bishop score (favorabilidade do colo para indução)',
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.recomendacao,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-bishop').addEventListener('click', () => {
  if (!bishopAtual) return;
  const assunto = `Bishop score — ${bishopAtual.pontos} / ${bishopAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoBishop(bishopAtual))}`;
});

$('#btn-print-bishop').addEventListener('click', () => {
  window.print();
});

/* ---------- Apgar ---------- */

const APGAR_ITENS = [
  ['frequenciaCardiaca', 'Frequência cardíaca', [['Ausente', 0], ['< 100/min', 1], ['≥ 100/min', 2]]],
  ['esforcoRespiratorio', 'Esforço respiratório', [['Ausente', 0], ['Fraco/irregular', 1], ['Choro forte', 2]]],
  ['tonusMuscular', 'Tónus muscular', [['Flácido', 0], ['Alguma flexão', 1], ['Movimento ativo', 2]]],
  ['irritabilidadeReflexa', 'Irritabilidade reflexa', [['Sem resposta', 0], ['Careta', 1], ['Choro/tosse/espirro', 2]]],
  ['cor', 'Cor', [['Cianose/palidez central', 0], ['Cianose das extremidades', 1], ['Rosado', 2]]],
];

const apgarForm = $('#apgar-form');
APGAR_ITENS.forEach(([campo, texto, opcoes], i) => {
  $('#apgar-perguntas').appendChild(criarPergunta(`ap-${campo}`, i + 1, texto, opcoes));
});
const apgarResultado = $('#apgar-resultado');
let apgarAtual = null;

function atualizarApgar() {
  const valores = {};
  APGAR_ITENS.forEach(([campo]) => {
    const marcado = apgarForm.querySelector(`input[name="ap-${campo}"]:checked`);
    valores[campo] = marcado ? Number(marcado.value) : NaN;
  });
  const r = calcularApgar(valores);
  const ok = $('#apgar-ok');
  const vazio = $('#apgar-vazio');
  const acoes = $('#result-actions-apgar');
  if (!r.ok) {
    apgarAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    return;
  }
  apgarAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  apgarResultado.dataset.nivel = r.nivel;
  $('#ap-pontos').textContent = r.pontos;
  $('#ap-gravidade').textContent = r.gravidade;
}
apgarForm.addEventListener('change', atualizarApgar);
atualizarApgar();

function resumoApgar(r) {
  const linhas = [
    'Índice de Apgar neonatal',
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.gravidade,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-apgar').addEventListener('click', () => {
  if (!apgarAtual) return;
  const assunto = `Índice de Apgar — ${apgarAtual.pontos} / ${apgarAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoApgar(apgarAtual))}`;
});

$('#btn-print-apgar').addEventListener('click', () => {
  window.print();
});

/* ---------- GCS pediátrico ---------- */

const gcsForm = $('#gcsp-form');
const gcsResultado = $('#gcsp-resultado');

let gcspAtual = null;

function atualizarGCSPediatrico() {
  const r = calcularGlasgowPediatrico(
    $('input[name="gcsp-e"]:checked')?.value,
    $('input[name="gcsp-v"]:checked')?.value,
    $('input[name="gcsp-m"]:checked')?.value
  );
  gcsResultado.dataset.nivel = r.nivel;
  $('#gcsp-pontos').textContent = r.pontos;
  $('#gcsp-gravidade').textContent = r.gravidade;
  gcspAtual = r.ok === false ? null : r;
}
gcsForm.addEventListener('change', atualizarGCSPediatrico);
atualizarGCSPediatrico();

function resumoGCSP(r) {
  const linhas = [
    'Escala de Coma de Glasgow pediátrica',
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.gravidade,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-gcsp').addEventListener('click', () => {
  if (!gcspAtual) return;
  const assunto = `Glasgow pediátrico — ${gcspAtual.pontos} / ${gcspAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoGCSP(gcspAtual))}`;
});

$('#btn-print-gcsp').addEventListener('click', () => {
  window.print();
});

const params = new URLSearchParams(location.search);
const validos = ['bishop', 'apgar', 'gcsp'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'bishop');
