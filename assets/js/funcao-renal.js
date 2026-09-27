import { calcularCKDEPI2021, calcularCockcroftGault } from './funcao-renal-core.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- Alternância entre calculadoras ---------- */

const tabs = $$('.tabbtn');
const paineis = $$('[data-painel]');

function selecionar(id) {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  history.replaceState(null, '', `?calc=${id}`);
}

tabs.forEach((t) => t.addEventListener('click', () => selecionar(t.dataset.tab)));

/* ---------- Steppers genéricos ---------- */

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

/* ---------- CKD-EPI 2021 ---------- */

const ckdForm = $('#ckd-form');
const ckdResultado = $('#ckd-resultado');

function atualizarCKD() {
  const r = calcularCKDEPI2021($('#ckd-creatinina').value.replace(',', '.'), $('#ckd-idade').value, $('#ckd-sexo').checked);
  const ok = $('#ckd-ok');
  const vazio = $('#ckd-vazio');
  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#ckd-motivo').textContent = r.motivo;
    return;
  }
  ok.hidden = false;
  vazio.hidden = true;
  ckdResultado.dataset.nivel = r.estadio <= 'G2' ? 'baixo' : r.estadio === 'G3a' || r.estadio === 'G3b' ? 'moderado' : 'alto';
  $('#ckd-valor').textContent = r.egfr;
  $('#ckd-estadio').textContent = `${r.estadio} — ${r.descricao}`;
}
ckdForm.addEventListener('input', atualizarCKD);
atualizarCKD();

/* ---------- Cockcroft-Gault ---------- */

const cgForm = $('#cg-form');
const cgResultado = $('#cg-resultado');

function atualizarCG() {
  const r = calcularCockcroftGault(
    $('#cg-creatinina').value.replace(',', '.'),
    $('#cg-idade').value,
    $('#cg-peso').value.replace(',', '.'),
    $('#cg-sexo').checked
  );
  const ok = $('#cg-ok');
  const vazio = $('#cg-vazio');
  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#cg-motivo').textContent = r.motivo;
    return;
  }
  ok.hidden = false;
  vazio.hidden = true;
  cgResultado.dataset.nivel = r.estadio <= 'G2' ? 'baixo' : r.estadio === 'G3a' || r.estadio === 'G3b' ? 'moderado' : 'alto';
  $('#cg-valor').textContent = r.crcl;
  $('#cg-estadio').textContent = `${r.estadio} — ${r.descricao}`;
}
cgForm.addEventListener('input', atualizarCG);
atualizarCG();

const params = new URLSearchParams(location.search);
selecionar(params.get('calc') === 'cockcroft' ? 'cockcroft' : 'ckdepi');
