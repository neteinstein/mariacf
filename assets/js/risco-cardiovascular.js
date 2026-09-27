import { calcularSCORE2, calcularSCORE2Diabetes, mgDlParaMmolL } from './risco-cardiovascular-core.js';

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
    const novo = (Number(alvo.value) || min) + Number(btn.dataset.step);
    alvo.value = Math.min(Math.max(novo, min), max);
    alvo.dispatchEvent(new Event('input', { bubbles: true }));
  });
});

/* ---------- SCORE2 / SCORE2-OP ---------- */

const s2Form = $('#score2-form');
const s2Resultado = $('#score2-resultado');
const s2Idade = $('#s2-idade');

function atualizarSCORE2() {
  const idade = Number(s2Idade.value);
  $('#s2-diabetes-linha').hidden = idade < 70;

  const r = calcularSCORE2({
    idade,
    sexoFeminino: $('#s2-sexo').checked,
    fumador: $('#s2-fumador').checked,
    sbp: $('#s2-pas').value,
    colTotalMmol: mgDlParaMmolL($('#s2-colesterol').value),
    hdlMmol: mgDlParaMmolL($('#s2-hdl').value),
    diabetes: $('#s2-diabetes').checked,
  });

  const ok = $('#score2-ok');
  const vazio = $('#score2-vazio');
  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#score2-motivo').textContent = r.motivo;
    return;
  }
  ok.hidden = false;
  vazio.hidden = true;
  s2Resultado.dataset.nivel = r.nivel;
  $('#s2-risco').textContent = r.risco.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  $('#s2-modelo').textContent = `Modelo: ${r.modelo} (região de risco moderado)`;
}
s2Form.addEventListener('input', atualizarSCORE2);
s2Form.addEventListener('change', atualizarSCORE2);
atualizarSCORE2();

/* ---------- SCORE2-Diabetes ---------- */

const dmForm = $('#dm-form');
const dmResultado = $('#dm-resultado');

function atualizarDM() {
  const r = calcularSCORE2Diabetes({
    idade: $('#dm-idade').value,
    sexoFeminino: $('#dm-sexo').checked,
    fumador: $('#dm-fumador').checked,
    sbp: $('#dm-pas').value,
    colTotalMmol: mgDlParaMmolL($('#dm-colesterol').value),
    hdlMmol: mgDlParaMmolL($('#dm-hdl').value),
    idadeDiagnostico: $('#dm-idade-diag').value,
    hba1c: $('#dm-hba1c').value,
    egfr: $('#dm-egfr').value,
  });

  const ok = $('#dm-ok');
  const vazio = $('#dm-vazio');
  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#dm-motivo').textContent = r.motivo;
    return;
  }
  ok.hidden = false;
  vazio.hidden = true;
  dmResultado.dataset.nivel = r.nivel;
  $('#dm-risco').textContent = r.risco.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
dmForm.addEventListener('input', atualizarDM);
dmForm.addEventListener('change', atualizarDM);
atualizarDM();

const params = new URLSearchParams(location.search);
selecionar(params.get('calc') === 'diabetes' ? 'diabetes' : 'score2');
