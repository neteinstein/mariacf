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

let resultadoCKD = null;

function atualizarCKD() {
  const r = calcularCKDEPI2021($('#ckd-creatinina').value.replace(',', '.'), $('#ckd-idade').value, $('#ckd-sexo').checked);
  const ok = $('#ckd-ok');
  const vazio = $('#ckd-vazio');
  const acoes = $('#result-actions-ckd');
  if (!r.ok) {
    resultadoCKD = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#ckd-motivo').textContent = r.motivo;
    return;
  }
  resultadoCKD = {
    ...r,
    creatinina: $('#ckd-creatinina').value.replace(',', '.'),
    idade: $('#ckd-idade').value,
    sexoFeminino: $('#ckd-sexo').checked,
  };
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  ckdResultado.dataset.nivel = r.estadio <= 'G2' ? 'baixo' : r.estadio === 'G3a' || r.estadio === 'G3b' ? 'moderado' : 'alto';
  $('#ckd-valor').textContent = r.egfr;
  $('#ckd-estadio').textContent = `${r.estadio} — ${r.descricao}`;
}
ckdForm.addEventListener('input', atualizarCKD);
atualizarCKD();

/* ---------- Cockcroft-Gault ---------- */

const cgForm = $('#cg-form');
const cgResultado = $('#cg-resultado');

let resultadoCG = null;

function atualizarCG() {
  const r = calcularCockcroftGault(
    $('#cg-creatinina').value.replace(',', '.'),
    $('#cg-idade').value,
    $('#cg-peso').value.replace(',', '.'),
    $('#cg-sexo').checked
  );
  const ok = $('#cg-ok');
  const vazio = $('#cg-vazio');
  const acoes = $('#result-actions-cg');
  if (!r.ok) {
    resultadoCG = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#cg-motivo').textContent = r.motivo;
    return;
  }
  resultadoCG = {
    ...r,
    creatinina: $('#cg-creatinina').value.replace(',', '.'),
    idade: $('#cg-idade').value,
    peso: $('#cg-peso').value.replace(',', '.'),
    sexoFeminino: $('#cg-sexo').checked,
  };
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  cgResultado.dataset.nivel = r.estadio <= 'G2' ? 'baixo' : r.estadio === 'G3a' || r.estadio === 'G3b' ? 'moderado' : 'alto';
  $('#cg-valor').textContent = r.crcl;
  $('#cg-estadio').textContent = `${r.estadio} — ${r.descricao}`;
}
cgForm.addEventListener('input', atualizarCG);
atualizarCG();

/* ---------- Ações: email e impressão ---------- */

function resumoTextoCKD(r) {
  const linhas = [
    'CKD-EPI 2021 — Taxa de filtração glomerular estimada',
    `Creatinina sérica: ${r.creatinina} mg/dL`,
    `Idade: ${r.idade} anos · Sexo: ${r.sexoFeminino ? 'feminino' : 'masculino'}`,
    `eTFG: ${r.egfr} mL/min/1,73m²`,
    `Estadiamento: ${r.estadio} — ${r.descricao}`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

function resumoTextoCG(r) {
  const linhas = [
    'Cockcroft-Gault — Clearance de creatinina',
    `Creatinina sérica: ${r.creatinina} mg/dL`,
    `Idade: ${r.idade} anos · Peso: ${r.peso} kg · Sexo: ${r.sexoFeminino ? 'feminino' : 'masculino'}`,
    `CrCl: ${r.crcl} mL/min`,
    `Estadiamento: ${r.estadio} — ${r.descricao}`,
    'Usa o peso corporal total. Em obesidade ou baixo peso, considere o peso ajustado ou ideal.',
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-ckd').addEventListener('click', () => {
  if (!resultadoCKD) return;
  const assunto = `eTFG (CKD-EPI 2021) — ${resultadoCKD.egfr} mL/min/1,73m²`;
  const corpo = resumoTextoCKD(resultadoCKD);
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
});

$('#btn-print-ckd').addEventListener('click', () => {
  window.print();
});

$('#btn-email-cg').addEventListener('click', () => {
  if (!resultadoCG) return;
  const assunto = `Clearance de creatinina (Cockcroft-Gault) — ${resultadoCG.crcl} mL/min`;
  const corpo = resumoTextoCG(resultadoCG);
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
});

$('#btn-print-cg').addEventListener('click', () => {
  window.print();
});

const params = new URLSearchParams(location.search);
selecionar(params.get('calc') === 'cockcroft' ? 'cockcroft' : 'ckdepi');
