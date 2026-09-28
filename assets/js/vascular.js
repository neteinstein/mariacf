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

function atualizarITB() {
  const r = calcularITB({
    braçoDireito: $('#itb-bd').value,
    braçoEsquerdo: $('#itb-be').value,
    tornozeloDireito: $('#itb-td').value,
    tornozeloEsquerdo: $('#itb-te').value,
  });
  const ok = $('#itb-ok');
  const vazio = $('#itb-vazio');
  if (!r.ok) { ok.hidden = true; vazio.hidden = false; $('#itb-motivo').textContent = r.motivo; return; }
  ok.hidden = false;
  vazio.hidden = true;
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

/* ---------- Peso ideal / ajustado ---------- */

const piForm = $('#pi-form');
const piResultado = $('#pi-resultado');

function atualizarPesoIdeal() {
  const r = calcularPesoIdealAjustado($('#pi-altura').value, $('#pi-sexo').checked, $('#pi-peso').value.replace(',', '.'));
  const ok = $('#pi-ok');
  const vazio = $('#pi-vazio');
  if (!r.ok) { ok.hidden = true; vazio.hidden = false; $('#pi-motivo').textContent = r.motivo; return; }
  ok.hidden = false;
  vazio.hidden = true;
  $('#pi-ideal').textContent = r.pesoIdeal.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  $('#pi-ajustado').textContent = r.pesoAjustado.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  $('#pi-nota').textContent = r.usarAjustado
    ? 'Peso real > 120% do peso ideal — considere usar o peso ajustado para dosear fármacos hidrofílicos.'
    : 'Peso real próximo do ideal — o peso ajustado raramente é necessário aqui.';
}
piForm.addEventListener('input', atualizarPesoIdeal);
piForm.addEventListener('change', atualizarPesoIdeal);
atualizarPesoIdeal();

const params = new URLSearchParams(location.search);
selecionar(params.get('calc') === 'peso-ideal' ? 'peso-ideal' : 'itb');
