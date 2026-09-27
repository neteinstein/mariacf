import { calcularCHA2DS2VASc, calcularHASBLED } from './anticoagulacao-core.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- Alternância entre as duas calculadoras ---------- */

const tabs = $$('.tabbtn');
const paineis = $$('[data-painel]');

function selecionar(id) {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  history.replaceState(null, '', `?calc=${id}`);
}

tabs.forEach((t) => t.addEventListener('click', () => selecionar(t.dataset.tab)));

const params = new URLSearchParams(location.search);
selecionar(params.get('calc') === 'hasbled' ? 'hasbled' : 'chadsvasc');

/* ---------- CHA₂DS₂-VASc ---------- */

const chadsForm = $('#chadsvasc-form');
const chadsResultado = $('#chadsvasc-resultado');

function lerFatoresChads() {
  return {
    icc: $('#c-icc').checked,
    hipertensao: $('#c-hta').checked,
    idade75: $('#c-idade75').checked,
    diabetes: $('#c-dm').checked,
    avc: $('#c-avc').checked,
    vascular: $('#c-vasc').checked,
    idade65_74: $('#c-idade65').checked,
    sexoFeminino: $('#c-sexo').checked,
  };
}

function atualizarChads() {
  // A idade ≥75 anos torna o item 65-74 automaticamente indisponível.
  $('#c-idade65').disabled = $('#c-idade75').checked;
  if ($('#c-idade75').checked) $('#c-idade65').checked = false;

  const r = calcularCHA2DS2VASc(lerFatoresChads());
  chadsResultado.dataset.nivel = r.nivel;
  $('#cv-pontos', chadsResultado).textContent = r.pontos;
  $('#cv-recomendacao', chadsResultado).textContent = r.recomendacao;
}

chadsForm.addEventListener('change', atualizarChads);
atualizarChads();

/* ---------- HAS-BLED ---------- */

const hasbledForm = $('#hasbled-form');
const hasbledResultado = $('#hasbled-resultado');

function lerFatoresHasbled() {
  return {
    hipertensao: $('#h-hta').checked,
    renal: $('#h-renal').checked,
    hepatica: $('#h-hepatica').checked,
    avc: $('#h-avc').checked,
    hemorragia: $('#h-hemorragia').checked,
    inrLabil: $('#h-inr').checked,
    idoso: $('#h-idoso').checked,
    farmacos: $('#h-farmacos').checked,
    alcool: $('#h-alcool').checked,
  };
}

function atualizarHasbled() {
  const r = calcularHASBLED(lerFatoresHasbled());
  hasbledResultado.dataset.nivel = r.nivel;
  $('#hb-pontos', hasbledResultado).textContent = r.pontos;
  $('#hb-recomendacao', hasbledResultado).textContent = r.recomendacao;
}

hasbledForm.addEventListener('change', atualizarHasbled);
atualizarHasbled();
