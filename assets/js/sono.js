import { calcularEpworth, calcularSTOPBANG } from './sono-core.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const OPCOES = ['Nunca cochilaria', 'Pouca probabilidade', 'Probabilidade moderada', 'Grande probabilidade'];

const EPWORTH_PERGUNTAS = [
  'Sentado(a) a ler',
  'A ver televisão',
  'Sentado(a), inativo(a), em local público (teatro, reunião)',
  'Como passageiro(a) de carro, durante 1 hora sem paragem',
  'Deitado(a) a descansar a meio da tarde',
  'Sentado(a) a conversar com alguém',
  'Sentado(a) calmamente depois de um almoço sem álcool',
  'No carro, parado no trânsito por alguns minutos',
];

function criarPergunta(id, numero, texto) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'step qitem';
  const legend = document.createElement('legend');
  legend.className = 'step-label';
  legend.innerHTML = `<span class="step-num">${numero}</span> ${texto}`;
  fieldset.appendChild(legend);

  const chips = document.createElement('div');
  chips.className = 'chips';
  OPCOES.forEach((opcao, i) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    const inputId = `${id}-op${i}`;
    chip.innerHTML = `<input type="radio" name="${id}" id="${inputId}" value="${i}"><label for="${inputId}"><strong>${opcao}</strong><span>${i} ponto${i === 1 ? '' : 's'}</span></label>`;
    chips.appendChild(chip);
  });
  fieldset.appendChild(chips);
  return fieldset;
}

const tabs = $$('.tabbtn');
const paineis = $$('[data-painel]');
function selecionar(id) {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  history.replaceState(null, '', `?calc=${id}`);
}
tabs.forEach((t) => t.addEventListener('click', () => selecionar(t.dataset.tab)));

/* ---------- Epworth ---------- */

const epForm = $('#ep-form');
EPWORTH_PERGUNTAS.forEach((texto, i) => {
  $('#ep-perguntas').appendChild(criarPergunta(`ep-q${i + 1}`, i + 1, texto));
});
const epResultado = $('#ep-resultado');

let epAtual = null;

function atualizarEpworth() {
  const respostas = [];
  for (let i = 1; i <= 8; i += 1) {
    const marcado = epForm.querySelector(`input[name="ep-q${i}"]:checked`);
    respostas.push(marcado ? Number(marcado.value) : NaN);
  }
  const r = calcularEpworth(respostas);
  const ok = $('#ep-ok');
  const vazio = $('#ep-vazio');
  const acoes = $('#result-actions-epworth');
  if (!r.ok) { epAtual = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  epAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  epResultado.dataset.nivel = r.nivel;
  $('#ep-pontos').textContent = r.pontos;
  $('#ep-gravidade').textContent = r.gravidade;
}
epForm.addEventListener('change', atualizarEpworth);
atualizarEpworth();

function resumoEpworth(r) {
  return [
    `Escala de sonolência de Epworth — ${r.pontos} / 24`,
    r.gravidade,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ].join('\n');
}

$('#btn-email-epworth').addEventListener('click', () => {
  if (!epAtual) return;
  const assunto = `Escala de Epworth — ${epAtual.pontos} / 24`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoEpworth(epAtual))}`;
});

$('#btn-print-epworth').addEventListener('click', () => window.print());

/* ---------- STOP-BANG ---------- */

const sbForm = $('#sb-form');
const sbResultado = $('#sb-resultado');
const SB_CAMPOS = ['ressonar', 'cansaco', 'apneiaObservada', 'pressaoArterial', 'imc35', 'idade50', 'pescoco40', 'sexoMasculino'];
const SB_ROTULOS = {
  ressonar: 'Ressona alto',
  cansaco: 'Cansaço, fadiga ou sonolência diurna frequentes',
  apneiaObservada: 'Pausas respiratórias observadas durante o sono',
  pressaoArterial: 'Hipertensão arterial, tratada ou não',
  imc35: 'IMC > 35 kg/m²',
  idade50: 'Idade > 50 anos',
  pescoco40: 'Perímetro do pescoço > 40 cm',
  sexoMasculino: 'Sexo masculino',
};

let sbAtual = null;

function atualizarSB() {
  const fatores = {};
  SB_CAMPOS.forEach((c) => { fatores[c] = $(`#sb-${c}`).checked; });
  const r = calcularSTOPBANG(fatores);
  sbAtual = { ...r, fatores };
  sbResultado.dataset.nivel = r.nivel;
  $('#sb-pontos').textContent = r.pontos;
  $('#sb-risco').textContent = r.risco;
}
sbForm.addEventListener('change', atualizarSB);
atualizarSB();

function resumoSB(r) {
  const marcados = SB_CAMPOS.filter((c) => r.fatores[c]).map((c) => SB_ROTULOS[c]);
  const linhas = [
    `STOP-BANG — ${r.pontos} / 8`,
    r.risco,
    '',
    marcados.length ? `Fatores assinalados: ${marcados.join(', ')}.` : 'Sem fatores de risco assinalados.',
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-stopbang').addEventListener('click', () => {
  if (!sbAtual) return;
  const assunto = `STOP-BANG — ${sbAtual.pontos} / 8`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoSB(sbAtual))}`;
});

$('#btn-print-stopbang').addEventListener('click', () => window.print());

const params = new URLSearchParams(location.search);
selecionar(params.get('calc') === 'stopbang' ? 'stopbang' : 'epworth');
