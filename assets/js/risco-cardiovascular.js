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
let s2Atual = null;

function resumoSCORE2(r) {
  const idade = s2Idade.value;
  const linhas = [
    `${r.modelo} — risco cardiovascular a 10 anos`,
    `Idade: ${idade} anos`,
    `Sexo: ${$('#s2-sexo').checked ? 'feminino' : 'masculino'}`,
    `PA sistólica: ${$('#s2-pas').value} mmHg`,
    `Colesterol total: ${$('#s2-colesterol').value} mg/dL`,
    `Colesterol HDL: ${$('#s2-hdl').value} mg/dL`,
    `Fumador(a) atual: ${$('#s2-fumador').checked ? 'sim' : 'não'}`,
  ];
  if (Number(idade) >= 70) linhas.push(`Diabetes: ${$('#s2-diabetes').checked ? 'sim' : 'não'}`);
  linhas.push(
    `Risco estimado a 10 anos: ${r.risco.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`,
    `Modelo: ${r.modelo} (região de risco moderado)`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href
  );
  return linhas.join('\n');
}

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
  const acoes = $('#result-actions-s2');
  if (!r.ok) {
    s2Atual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#score2-motivo').textContent = r.motivo;
    return;
  }
  s2Atual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  s2Resultado.dataset.nivel = r.nivel;
  $('#s2-risco').textContent = r.risco.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  $('#s2-modelo').textContent = `Modelo: ${r.modelo} (região de risco moderado)`;
}
s2Form.addEventListener('input', atualizarSCORE2);
s2Form.addEventListener('change', atualizarSCORE2);
atualizarSCORE2();

$('#btn-email-s2')?.addEventListener('click', () => {
  if (!s2Atual) return;
  const assunto = `${s2Atual.modelo} — risco a 10 anos: ${s2Atual.risco.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoSCORE2(s2Atual))}`;
});
$('#btn-print-s2')?.addEventListener('click', () => window.print());

/* ---------- SCORE2-Diabetes ---------- */

const dmForm = $('#dm-form');
const dmResultado = $('#dm-resultado');
let dmAtual = null;

function resumoDM(r) {
  const linhas = [
    'SCORE2-Diabetes — risco cardiovascular a 10 anos',
    `Idade: ${$('#dm-idade').value} anos`,
    `Idade de diagnóstico da diabetes: ${$('#dm-idade-diag').value} anos`,
    `Sexo: ${$('#dm-sexo').checked ? 'feminino' : 'masculino'}`,
    `PA sistólica: ${$('#dm-pas').value} mmHg`,
    `HbA1c: ${$('#dm-hba1c').value} mmol/mol`,
    `Colesterol total: ${$('#dm-colesterol').value} mg/dL`,
    `Colesterol HDL: ${$('#dm-hdl').value} mg/dL`,
    `eTFG: ${$('#dm-egfr').value} mL/min/1,73m²`,
    `Fumador(a) atual: ${$('#dm-fumador').checked ? 'sim' : 'não'}`,
    `Risco estimado a 10 anos: ${r.risco.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`,
    'Modelo: SCORE2-Diabetes (região de risco moderado)',
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

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
  const acoes = $('#result-actions-dm');
  if (!r.ok) {
    dmAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#dm-motivo').textContent = r.motivo;
    return;
  }
  dmAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  dmResultado.dataset.nivel = r.nivel;
  $('#dm-risco').textContent = r.risco.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
dmForm.addEventListener('input', atualizarDM);
dmForm.addEventListener('change', atualizarDM);
atualizarDM();

$('#btn-email-dm')?.addEventListener('click', () => {
  if (!dmAtual) return;
  const assunto = `SCORE2-Diabetes — risco a 10 anos: ${dmAtual.risco.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoDM(dmAtual))}`;
});
$('#btn-print-dm')?.addEventListener('click', () => window.print());

const params = new URLSearchParams(location.search);
selecionar(params.get('calc') === 'diabetes' ? 'diabetes' : 'score2');
