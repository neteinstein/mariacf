import { calcularITB, calcularPesoIdealAjustado } from './vascular-core.js';

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

/* ---------- ITB ---------- */

const itbForm = $('#itb-form');
const itbResultado = $('#itb-resultado');
let itbAtual = null;

function atualizarITB() {
  const r = calcularITB({
    braçoDireito: $('#itb-bd').value,
    braçoEsquerdo: $('#itb-be').value,
    tornozeloDireito: $('#itb-td').value,
    tornozeloEsquerdo: $('#itb-te').value,
  });
  const ok = $('#itb-ok');
  const vazio = $('#itb-vazio');
  const acoes = $('#result-actions-itb');
  if (!r.ok) {
    itbAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#itb-motivo').textContent = r.motivo;
    return;
  }
  itbAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  const piorNivel = ['baixo', 'moderado', 'alto', 'muito-alto'];
  const nivel = piorNivel[Math.max(piorNivel.indexOf(r.direito.nivel), piorNivel.indexOf(r.esquerdo.nivel))];
  itbResultado.dataset.nivel = nivel;
  $('#itb-direito').textContent = r.itbDireito.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  $('#itb-esquerdo').textContent = r.itbEsquerdo.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  $('#itb-descricao-direito').textContent = `Direito: ${r.direito.descricao}`;
  $('#itb-descricao-esquerdo').textContent = `Esquerdo: ${r.esquerdo.descricao}`;
}
itbForm.addEventListener('input', atualizarITB);
atualizarITB();

function resumoITB(r) {
  const linhas = [
    'Índice tornozelo-braço (ITB)',
    `Direito: ${r.itbDireito.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} — ${r.direito.descricao}`,
    `Esquerdo: ${r.itbEsquerdo.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} — ${r.esquerdo.descricao}`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-itb').addEventListener('click', () => {
  if (!itbAtual) return;
  const assunto = `Índice tornozelo-braço — D ${itbAtual.itbDireito} / E ${itbAtual.itbEsquerdo}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoITB(itbAtual))}`;
});

$('#btn-print-itb').addEventListener('click', () => {
  window.print();
});

/* ---------- Peso ideal / ajustado ---------- */

const piForm = $('#pi-form');
const piResultado = $('#pi-resultado');
let piAtual = null;

function atualizarPesoIdeal() {
  const r = calcularPesoIdealAjustado($('#pi-altura').value, $('#pi-sexo').checked, $('#pi-peso').value.replace(',', '.'));
  const ok = $('#pi-ok');
  const vazio = $('#pi-vazio');
  const acoes = $('#result-actions-peso-ideal');
  if (!r.ok) {
    piAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#pi-motivo').textContent = r.motivo;
    return;
  }
  piAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  $('#pi-ideal').textContent = r.pesoIdeal.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  $('#pi-ajustado').textContent = r.pesoAjustado.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  piAtual.nota = r.usarAjustado
    ? 'Peso real > 120% do peso ideal — considere usar o peso ajustado para dosear fármacos hidrofílicos.'
    : 'Peso real próximo do ideal — o peso ajustado raramente é necessário aqui.';
  $('#pi-nota').textContent = piAtual.nota;
}
piForm.addEventListener('input', atualizarPesoIdeal);
piForm.addEventListener('change', atualizarPesoIdeal);
atualizarPesoIdeal();

function resumoPesoIdeal(r) {
  const linhas = [
    'Peso ideal e ajustado (fórmula de Devine)',
    `Peso ideal: ${r.pesoIdeal.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg`,
    `Peso ajustado: ${r.pesoAjustado.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg`,
    r.nota,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-peso-ideal').addEventListener('click', () => {
  if (!piAtual) return;
  const assunto = `Peso ideal/ajustado — ${piAtual.pesoIdeal} kg`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoPesoIdeal(piAtual))}`;
});

$('#btn-print-peso-ideal').addEventListener('click', () => {
  window.print();
});

const params = new URLSearchParams(location.search);
selecionar(params.get('calc') === 'peso-ideal' ? 'peso-ideal' : 'itb');
