import { calcularFINDRISC, calcularMUST, calcularRiscoFratura } from './rastreio-core.js';

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

$$('.stepper').forEach((btn) => {
  btn.addEventListener('click', () => {
    const alvo = document.getElementById(btn.dataset.alvo);
    const min = Number(alvo.min) || 0;
    const max = Number(alvo.max) || Infinity;
    const casas = alvo.step && alvo.step.includes('.') ? alvo.step.split('.')[1].length : 0;
    const f = 10 ** casas;
    const novo = Math.round(((Number(alvo.value) || min) + Number(btn.dataset.step)) * f) / f;
    alvo.value = Math.min(Math.max(novo, min), max);
    alvo.dispatchEvent(new Event('input', { bubbles: true }));
  });
});

/* ---------- FINDRISC ---------- */

const frForm = $('#fr-form');
const frResultado = $('#fr-resultado');
let frAtual = null;

function atualizarFINDRISC() {
  const historia = $('input[name="fr-historia"]:checked')?.value ?? 'nenhuma';
  const r = calcularFINDRISC({
    idade: $('#fr-idade').value,
    imc: $('#fr-imc').value.replace(',', '.'),
    cintura: $('#fr-cintura').value,
    sexoFeminino: $('#fr-sexo').checked,
    atividadeFisica: $('#fr-atividade').checked,
    fruitasVegetais: $('#fr-dieta').checked,
    antiHipertensores: $('#fr-antihta').checked,
    glicemiaElevadaPrevia: $('#fr-glicemia').checked,
    historiaFamiliar: historia,
  });
  const ok = $('#fr-ok');
  const vazio = $('#fr-vazio');
  const acoes = $('#result-actions-findrisc');
  if (!r.ok) {
    frAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#fr-motivo').textContent = r.motivo;
    return;
  }
  frAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  frResultado.dataset.nivel = r.nivel;
  $('#fr-pontos').textContent = r.pontos;
  $('#fr-risco').textContent = `Risco estimado a 10 anos: ${r.risco}`;
}
frForm.addEventListener('input', atualizarFINDRISC);
frForm.addEventListener('change', atualizarFINDRISC);
atualizarFINDRISC();

function resumoFINDRISC(r) {
  const linhas = [
    'FINDRISC — risco de diabetes tipo 2 a 10 anos',
    `Pontuação: ${r.pontos} / ${r.max}`,
    `Risco estimado a 10 anos: ${r.risco}`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-findrisc').addEventListener('click', () => {
  if (!frAtual) return;
  const assunto = `FINDRISC — ${frAtual.pontos} / ${frAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoFINDRISC(frAtual))}`;
});

$('#btn-print-findrisc').addEventListener('click', () => {
  window.print();
});

/* ---------- MUST ---------- */

const mustForm = $('#must-form');
const mustResultado = $('#must-resultado');
let mustAtual = null;

function atualizarMUST() {
  const r = calcularMUST({
    imc: $('#must-imc').value.replace(',', '.'),
    perdaPesoPercent: $('#must-perda').value.replace(',', '.'),
    doencaAguda: $('#must-doenca').checked,
  });
  const ok = $('#must-ok');
  const vazio = $('#must-vazio');
  const acoes = $('#result-actions-must');
  if (!r.ok) {
    mustAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#must-motivo').textContent = r.motivo;
    return;
  }
  mustAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  mustResultado.dataset.nivel = r.nivel;
  $('#must-pontos').textContent = r.pontos;
  $('#must-recomendacao').textContent = r.recomendacao;
}
mustForm.addEventListener('input', atualizarMUST);
mustForm.addEventListener('change', atualizarMUST);
atualizarMUST();

function resumoMUST(r) {
  const linhas = [
    'MUST — rastreio de desnutrição',
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.recomendacao,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-must').addEventListener('click', () => {
  if (!mustAtual) return;
  const assunto = `MUST — ${mustAtual.pontos} / ${mustAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoMUST(mustAtual))}`;
});

$('#btn-print-must').addEventListener('click', () => {
  window.print();
});

/* ---------- Risco de fratura ---------- */

const fxForm = $('#fx-form');
const fxResultado = $('#fx-resultado');

let fxAtual = null;

function atualizarFratura() {
  const campos = [
    'idadeRisco', 'fraturaFragilidadePrevia', 'fraturaAncaPais', 'imcBaixo',
    'fumador', 'alcoolExcessivo', 'corticoterapia', 'artriteReumatoide', 'causaSecundaria',
  ];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#fx-${c}`).checked; });

  const r = calcularRiscoFratura(fatores);
  fxResultado.dataset.nivel = r.nivel;
  $('#fx-pontos').textContent = r.pontos;
  $('#fx-recomendacao').textContent = r.recomendacao;
  fxAtual = r;
}
fxForm.addEventListener('change', atualizarFratura);
atualizarFratura();

function resumoFratura(r) {
  const linhas = [
    'Fatores de risco de fratura osteoporótica',
    `Fatores identificados: ${r.pontos}`,
    r.recomendacao,
    '',
    'Esta checklist não é o FRAX® — é uma triagem simples dos principais fatores de risco clínico.',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-fratura').addEventListener('click', () => {
  if (!fxAtual) return;
  const assunto = `Risco de fratura — ${fxAtual.pontos} fatores`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoFratura(fxAtual))}`;
});

$('#btn-print-fratura').addEventListener('click', () => {
  window.print();
});

const params = new URLSearchParams(location.search);
const validos = ['findrisc', 'must', 'fratura'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'findrisc');
