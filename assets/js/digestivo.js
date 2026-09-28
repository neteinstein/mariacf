import { calcularBlatchford, calcularRockallPreEndoscopia, calcularBISAP } from './digestivo-core.js';

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

/* ---------- Blatchford ---------- */

const blForm = $('#bl-form');
const blResultado = $('#bl-resultado');

function atualizarBlatchford() {
  const r = calcularBlatchford({
    ureia: $('#bl-ureia').value.replace(',', '.'),
    hemoglobina: $('#bl-hb').value.replace(',', '.'),
    sexoFeminino: $('#bl-sexo').checked,
    pas: $('#bl-pas').value,
    pulso100: $('#bl-pulso').checked,
    melena: $('#bl-melena').checked,
    sincope: $('#bl-sincope').checked,
    doencaHepatica: $('#bl-hepatica').checked,
    insuficienciaCardiaca: $('#bl-icc').checked,
  });
  const ok = $('#bl-ok');
  const vazio = $('#bl-vazio');
  if (!r.ok) { ok.hidden = true; vazio.hidden = false; $('#bl-motivo').textContent = r.motivo; return; }
  ok.hidden = false;
  vazio.hidden = true;
  blResultado.dataset.nivel = r.nivel;
  $('#bl-pontos').textContent = r.pontos;
  $('#bl-recomendacao').textContent = r.recomendacao;
}
blForm.addEventListener('input', atualizarBlatchford);
blForm.addEventListener('change', atualizarBlatchford);
atualizarBlatchford();

/* ---------- Rockall pré-endoscópico ---------- */

const roForm = $('#ro-form');
const roResultado = $('#ro-resultado');

function atualizarRockall() {
  const r = calcularRockallPreEndoscopia({
    idade: $('#ro-idade').value,
    choque: $('input[name="ro-choque"]:checked')?.value,
    comorbilidade: $('input[name="ro-comorbilidade"]:checked')?.value,
  });
  const ok = $('#ro-ok');
  const vazio = $('#ro-vazio');
  if (!r.ok) { ok.hidden = true; vazio.hidden = false; return; }
  ok.hidden = false;
  vazio.hidden = true;
  roResultado.dataset.nivel = r.nivel;
  $('#ro-pontos').textContent = r.pontos;
}
roForm.addEventListener('input', atualizarRockall);
roForm.addEventListener('change', atualizarRockall);
atualizarRockall();

/* ---------- BISAP ---------- */

const biForm = $('#bi-form');
const biResultado = $('#bi-resultado');

function atualizarBISAP() {
  const r = calcularBISAP({
    ureiaElevada: $('#bi-ureia').checked,
    estadoMentalAlterado: $('#bi-mental').checked,
    sirs: $('#bi-sirs').checked,
    idade60: $('#bi-idade').checked,
    derramePleural: $('#bi-derrame').checked,
  });
  biResultado.dataset.nivel = r.nivel;
  $('#bi-pontos').textContent = r.pontos;
  $('#bi-recomendacao').textContent = r.recomendacao;
}
biForm.addEventListener('change', atualizarBISAP);
atualizarBISAP();

const params = new URLSearchParams(location.search);
const validos = ['blatchford', 'rockall', 'bisap'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'blatchford');
