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

let chadsAtual = null;

function atualizarChads() {
  // A idade ≥75 anos torna o item 65-74 automaticamente indisponível.
  $('#c-idade65').disabled = $('#c-idade75').checked;
  if ($('#c-idade75').checked) $('#c-idade65').checked = false;

  const r = calcularCHA2DS2VASc(lerFatoresChads());
  chadsAtual = r;
  chadsResultado.dataset.nivel = r.nivel;
  $('#cv-pontos', chadsResultado).textContent = r.pontos;
  $('#cv-recomendacao', chadsResultado).textContent = r.recomendacao;
}

chadsForm.addEventListener('change', atualizarChads);
atualizarChads();

function resumoChads(r) {
  const f = r.fatores;
  const marcados = [
    f.icc && 'Insuficiência cardíaca / disfunção do VE',
    f.hipertensao && 'Hipertensão arterial',
    f.idade75 && 'Idade ≥ 75 anos',
    f.diabetes && 'Diabetes mellitus',
    f.avc && 'AVC, AIT ou tromboembolismo prévio',
    f.vascular && 'Doença vascular',
    f.idade65_74 && 'Idade 65–74 anos',
    f.sexoFeminino && 'Sexo feminino',
  ].filter(Boolean);

  const linhas = [
    `CHA₂DS₂-VASc — ${r.pontos} / 9`,
    r.recomendacao,
    '',
    marcados.length ? `Fatores assinalados: ${marcados.join(', ')}.` : 'Sem fatores de risco assinalados.',
    'A anticoagulação é sempre uma decisão individualizada — o ponto isolado do sexo feminino não a indica por si só.',
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-chadsvasc').addEventListener('click', () => {
  if (!chadsAtual) return;
  const assunto = `CHA₂DS₂-VASc — ${chadsAtual.pontos} / 9`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoChads(chadsAtual))}`;
});

$('#btn-print-chadsvasc').addEventListener('click', () => window.print());

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

let hasbledAtual = null;

function atualizarHasbled() {
  const r = calcularHASBLED(lerFatoresHasbled());
  hasbledAtual = r;
  hasbledResultado.dataset.nivel = r.nivel;
  $('#hb-pontos', hasbledResultado).textContent = r.pontos;
  $('#hb-recomendacao', hasbledResultado).textContent = r.recomendacao;
}

hasbledForm.addEventListener('change', atualizarHasbled);
atualizarHasbled();

function resumoHasbled(r) {
  const f = r.fatores;
  const marcados = [
    f.hipertensao && 'Hipertensão não controlada',
    f.renal && 'Função renal alterada',
    f.hepatica && 'Função hepática alterada',
    f.avc && 'AVC prévio',
    f.hemorragia && 'Hemorragia prévia ou predisposição',
    f.inrLabil && 'INR lábil',
    f.idoso && 'Idade > 65 anos',
    f.farmacos && 'Fármacos predisponentes',
    f.alcool && 'Consumo excessivo de álcool',
  ].filter(Boolean);

  const linhas = [
    `HAS-BLED — ${r.pontos} / 9`,
    r.recomendacao,
    '',
    marcados.length ? `Fatores assinalados: ${marcados.join(', ')}.` : 'Sem fatores de risco assinalados.',
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-hasbled').addEventListener('click', () => {
  if (!hasbledAtual) return;
  const assunto = `HAS-BLED — ${hasbledAtual.pontos} / 9`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoHasbled(hasbledAtual))}`;
});

$('#btn-print-hasbled').addEventListener('click', () => window.print());
