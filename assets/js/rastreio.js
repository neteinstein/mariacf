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
  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#fr-motivo').textContent = r.motivo;
    return;
  }
  ok.hidden = false;
  vazio.hidden = true;
  frResultado.dataset.nivel = r.nivel;
  $('#fr-pontos').textContent = r.pontos;
  $('#fr-risco').textContent = `Risco estimado a 10 anos: ${r.risco}`;
}
frForm.addEventListener('input', atualizarFINDRISC);
frForm.addEventListener('change', atualizarFINDRISC);
atualizarFINDRISC();

/* ---------- MUST ---------- */

const mustForm = $('#must-form');
const mustResultado = $('#must-resultado');

function atualizarMUST() {
  const r = calcularMUST({
    imc: $('#must-imc').value.replace(',', '.'),
    perdaPesoPercent: $('#must-perda').value.replace(',', '.'),
    doencaAguda: $('#must-doenca').checked,
  });
  const ok = $('#must-ok');
  const vazio = $('#must-vazio');
  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#must-motivo').textContent = r.motivo;
    return;
  }
  ok.hidden = false;
  vazio.hidden = true;
  mustResultado.dataset.nivel = r.nivel;
  $('#must-pontos').textContent = r.pontos;
  $('#must-recomendacao').textContent = r.recomendacao;
}
mustForm.addEventListener('input', atualizarMUST);
mustForm.addEventListener('change', atualizarMUST);
atualizarMUST();

/* ---------- Risco de fratura ---------- */

const fxForm = $('#fx-form');
const fxResultado = $('#fx-resultado');

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
}
fxForm.addEventListener('change', atualizarFratura);
atualizarFratura();

const params = new URLSearchParams(location.search);
const validos = ['findrisc', 'must', 'fratura'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'findrisc');
