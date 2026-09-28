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
let blAtual = null;

function resumoBlatchford(r, dados) {
  const linhas = [
    'Score de Blatchford — risco de hemorragia digestiva alta',
    `Ureia: ${dados.ureia} mmol/L`,
    `Hemoglobina: ${dados.hemoglobina} g/dL`,
    `PA sistólica: ${dados.pas} mmHg`,
    `Sexo feminino: ${dados.sexoFeminino ? 'sim' : 'não'}`,
    `Pulso ≥ 100/min: ${dados.pulso100 ? 'sim' : 'não'}`,
    `Melenas: ${dados.melena ? 'sim' : 'não'}`,
    `Síncope: ${dados.sincope ? 'sim' : 'não'}`,
    `Doença hepática conhecida: ${dados.doencaHepatica ? 'sim' : 'não'}`,
    `Insuficiência cardíaca: ${dados.insuficienciaCardiaca ? 'sim' : 'não'}`,
    `Pontuação: ${r.pontos}`,
    r.recomendacao,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

function atualizarBlatchford() {
  const dados = {
    ureia: $('#bl-ureia').value.replace(',', '.'),
    hemoglobina: $('#bl-hb').value.replace(',', '.'),
    sexoFeminino: $('#bl-sexo').checked,
    pas: $('#bl-pas').value,
    pulso100: $('#bl-pulso').checked,
    melena: $('#bl-melena').checked,
    sincope: $('#bl-sincope').checked,
    doencaHepatica: $('#bl-hepatica').checked,
    insuficienciaCardiaca: $('#bl-icc').checked,
  };
  const r = calcularBlatchford(dados);
  const ok = $('#bl-ok');
  const vazio = $('#bl-vazio');
  const acoes = $('#result-actions-bl');
  if (!r.ok) {
    blAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#bl-motivo').textContent = r.motivo;
    return;
  }
  blAtual = { r, dados };
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  blResultado.dataset.nivel = r.nivel;
  $('#bl-pontos').textContent = r.pontos;
  $('#bl-recomendacao').textContent = r.recomendacao;
}
blForm.addEventListener('input', atualizarBlatchford);
blForm.addEventListener('change', atualizarBlatchford);
atualizarBlatchford();

$('#btn-email-bl')?.addEventListener('click', () => {
  if (!blAtual) return;
  const assunto = `Score de Blatchford — ${blAtual.r.pontos} pontos`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoBlatchford(blAtual.r, blAtual.dados))}`;
});
$('#btn-print-bl')?.addEventListener('click', () => window.print());

/* ---------- Rockall pré-endoscópico ---------- */

const roForm = $('#ro-form');
const roResultado = $('#ro-resultado');
let roAtual = null;

const ROCKALL_CHOQUE_LABEL = { nenhum: 'sem choque', taquicardia: 'taquicardia (PAS ≥ 100, FC ≥ 100)', hipotensao: 'hipotensão (PAS < 100)' };
const ROCKALL_COMORBILIDADE_LABEL = { nenhuma: 'nenhuma major', major: 'ICC/cardiopatia isquémica ou outra comorbilidade major', grave: 'insuficiência renal/hepática ou neoplasia disseminada' };

function resumoRockall(r, dados) {
  const linhas = [
    'Rockall pré-endoscópico — risco de hemorragia digestiva alta',
    `Idade: ${dados.idade} anos`,
    `Estado hemodinâmico: ${ROCKALL_CHOQUE_LABEL[dados.choque] || dados.choque}`,
    `Comorbilidades: ${ROCKALL_COMORBILIDADE_LABEL[dados.comorbilidade] || dados.comorbilidade}`,
    `Pontuação: ${r.pontos} / ${r.max}`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

function atualizarRockall() {
  const dados = {
    idade: $('#ro-idade').value,
    choque: $('input[name="ro-choque"]:checked')?.value,
    comorbilidade: $('input[name="ro-comorbilidade"]:checked')?.value,
  };
  const r = calcularRockallPreEndoscopia(dados);
  const ok = $('#ro-ok');
  const vazio = $('#ro-vazio');
  const acoes = $('#result-actions-ro');
  if (!r.ok) {
    roAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    return;
  }
  roAtual = { r, dados };
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  roResultado.dataset.nivel = r.nivel;
  $('#ro-pontos').textContent = r.pontos;
}
roForm.addEventListener('input', atualizarRockall);
roForm.addEventListener('change', atualizarRockall);
atualizarRockall();

$('#btn-email-ro')?.addEventListener('click', () => {
  if (!roAtual) return;
  const assunto = `Rockall pré-endoscópico — ${roAtual.r.pontos}/${roAtual.r.max} pontos`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoRockall(roAtual.r, roAtual.dados))}`;
});
$('#btn-print-ro')?.addEventListener('click', () => window.print());

/* ---------- BISAP ---------- */

const biForm = $('#bi-form');
const biResultado = $('#bi-resultado');
let biAtual = null;

function resumoBISAP(r, dados) {
  const linhas = [
    'BISAP — gravidade de pancreatite aguda (primeiras 24h)',
    `Ureia elevada (> 25 mg/dL / > 9 mmol/L): ${dados.ureiaElevada ? 'sim' : 'não'}`,
    `Estado mental alterado: ${dados.estadoMentalAlterado ? 'sim' : 'não'}`,
    `SIRS: ${dados.sirs ? 'sim' : 'não'}`,
    `Idade > 60 anos: ${dados.idade60 ? 'sim' : 'não'}`,
    `Derrame pleural: ${dados.derramePleural ? 'sim' : 'não'}`,
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.recomendacao,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

function atualizarBISAP() {
  const dados = {
    ureiaElevada: $('#bi-ureia').checked,
    estadoMentalAlterado: $('#bi-mental').checked,
    sirs: $('#bi-sirs').checked,
    idade60: $('#bi-idade').checked,
    derramePleural: $('#bi-derrame').checked,
  };
  const r = calcularBISAP(dados);
  biAtual = { r, dados };
  biResultado.dataset.nivel = r.nivel;
  $('#bi-pontos').textContent = r.pontos;
  $('#bi-recomendacao').textContent = r.recomendacao;
}
biForm.addEventListener('change', atualizarBISAP);
atualizarBISAP();

$('#btn-email-bi')?.addEventListener('click', () => {
  if (!biAtual) return;
  const assunto = `BISAP — ${biAtual.r.pontos}/${biAtual.r.max} pontos`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoBISAP(biAtual.r, biAtual.dados))}`;
});
$('#btn-print-bi')?.addEventListener('click', () => window.print());

const params = new URLSearchParams(location.search);
const validos = ['blatchford', 'rockall', 'bisap'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'blatchford');
