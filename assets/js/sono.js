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

function atualizarEpworth() {
  const respostas = [];
  for (let i = 1; i <= 8; i += 1) {
    const marcado = epForm.querySelector(`input[name="ep-q${i}"]:checked`);
    respostas.push(marcado ? Number(marcado.value) : NaN);
  }
  const r = calcularEpworth(respostas);
  const ok = $('#ep-ok');
  const vazio = $('#ep-vazio');
  if (!r.ok) { ok.hidden = true; vazio.hidden = false; return; }
  ok.hidden = false;
  vazio.hidden = true;
  epResultado.dataset.nivel = r.nivel;
  $('#ep-pontos').textContent = r.pontos;
  $('#ep-gravidade').textContent = r.gravidade;
}
epForm.addEventListener('change', atualizarEpworth);
atualizarEpworth();

/* ---------- STOP-BANG ---------- */

const sbForm = $('#sb-form');
const sbResultado = $('#sb-resultado');

function atualizarSB() {
  const campos = ['ressonar', 'cansaco', 'apneiaObservada', 'pressaoArterial', 'imc35', 'idade50', 'pescoco40', 'sexoMasculino'];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#sb-${c}`).checked; });
  const r = calcularSTOPBANG(fatores);
  sbResultado.dataset.nivel = r.nivel;
  $('#sb-pontos').textContent = r.pontos;
  $('#sb-risco').textContent = r.risco;
}
sbForm.addEventListener('change', atualizarSB);
atualizarSB();

const params = new URLSearchParams(location.search);
selecionar(params.get('calc') === 'stopbang' ? 'stopbang' : 'epworth');
