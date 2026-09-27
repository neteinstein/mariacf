import { calcularCAT, calcularACT, calcularCentor } from './respiratorio-core.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const CAT_PERGUNTAS = [
  ['Nunca tusso', 'Tusso sempre'],
  ['Não tenho nenhuma secreção (expetoração) nos pulmões', 'Os meus pulmões estão cheios de secreção (expetoração)'],
  ['Não sinto nenhum aperto no peito', 'Sinto muito aperto no peito'],
  ['Não sinto falta de ar ao subir uma ladeira ou um lanço de escadas', 'Sinto-me com muita falta de ar ao subir uma ladeira ou um lanço de escadas'],
  ['Não sinto qualquer limitação nas minhas atividades em casa', 'Sinto-me muito limitado(a) nas minhas atividades em casa'],
  ['Sinto-me confiante para sair de casa, apesar da minha doença pulmonar', 'Não me sinto nada confiante para sair de casa, por causa da minha doença pulmonar'],
  ['Durmo profundamente', 'Não durmo profundamente por causa da minha doença pulmonar'],
  ['Tenho muita energia', 'Não tenho nenhuma energia'],
];

const ACT_PERGUNTAS = [
  { texto: 'Nas últimas 4 semanas, com que frequência a asma o(a) impediu de fazer tanto quanto gostaria no trabalho, na escola ou em casa?', opcoes: ['Sempre', 'Muitas vezes', 'Algumas vezes', 'Raramente', 'Nunca'] },
  { texto: 'Nas últimas 4 semanas, com que frequência sentiu falta de ar?', opcoes: ['Mais de uma vez por dia', 'Uma vez por dia', '3 a 6 vezes por semana', '1 a 2 vezes por semana', 'Nunca'] },
  { texto: 'Nas últimas 4 semanas, com que frequência os sintomas de asma (tosse, pieira, aperto no peito) o(a) acordaram de noite ou mais cedo do que o costume?', opcoes: ['4 ou mais noites por semana', '2 a 3 noites por semana', 'Uma vez por semana', '1 a 2 vezes', 'Nunca'] },
  { texto: 'Nas últimas 4 semanas, com que frequência usou o inalador de alívio rápido (SOS)?', opcoes: ['3 ou mais vezes por dia', '1 a 2 vezes por dia', '2 a 3 vezes por semana', 'Uma vez por semana ou menos', 'Nunca'] },
  { texto: 'Como classificaria o controlo da sua asma nas últimas 4 semanas?', opcoes: ['Nada controlada', 'Pouco controlada', 'Razoavelmente controlada', 'Bem controlada', 'Totalmente controlada'] },
];

function criarPerguntaEscala({ id, numero, texto, opcoes, valores }) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'step qitem';
  const legend = document.createElement('legend');
  legend.className = 'step-label';
  legend.innerHTML = `<span class="step-num">${numero}</span> ${texto}`;
  fieldset.appendChild(legend);

  const chips = document.createElement('div');
  chips.className = 'chips';
  opcoes.forEach((opcao, i) => {
    const v = valores[i];
    const chip = document.createElement('div');
    chip.className = 'chip';
    const inputId = `${id}-op${i}`;
    chip.innerHTML = `<input type="radio" name="${id}" id="${inputId}" value="${v}"><label for="${inputId}"><strong>${opcao}</strong><span>${v} ponto${v === 1 ? '' : 's'}</span></label>`;
    chips.appendChild(chip);
  });
  fieldset.appendChild(chips);
  return fieldset;
}

function lerRespostas(form, prefixo, n) {
  const respostas = [];
  for (let i = 1; i <= n; i += 1) {
    const marcado = form.querySelector(`input[name="${prefixo}-q${i}"]:checked`);
    respostas.push(marcado ? Number(marcado.value) : NaN);
  }
  return respostas;
}

/* ---------- Alternância entre calculadoras ---------- */

const tabs = $$('.tabbtn');
const paineis = $$('[data-painel]');

function selecionar(id) {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  history.replaceState(null, '', `?calc=${id}`);
}

tabs.forEach((t) => t.addEventListener('click', () => selecionar(t.dataset.tab)));

/* ---------- CAT ---------- */

const catForm = $('#cat-form');
const catContainer = $('#cat-perguntas');
CAT_PERGUNTAS.forEach((par, i) => {
  catContainer.appendChild(
    criarPerguntaEscala({
      id: `cat-q${i + 1}`,
      numero: i + 1,
      texto: `${par[0]} <span class="step-hint" style="margin:2px 0 0">— ${par[1]}</span>`,
      opcoes: ['0', '1', '2', '3', '4', '5'],
      valores: [0, 1, 2, 3, 4, 5],
    })
  );
});
const catResultado = $('#cat-resultado');

function atualizarCAT() {
  const r = calcularCAT(lerRespostas(catForm, 'cat', 8));
  const ok = $('#cat-ok');
  const vazio = $('#cat-vazio');
  if (!r.ok) { ok.hidden = true; vazio.hidden = false; return; }
  ok.hidden = false;
  vazio.hidden = true;
  catResultado.dataset.nivel = r.nivel;
  $('#cat-pontos').textContent = r.pontos;
  $('#cat-impacto').textContent = r.impacto;
}
catForm.addEventListener('change', atualizarCAT);
atualizarCAT();

/* ---------- ACT ---------- */

const actForm = $('#act-form');
const actContainer = $('#act-perguntas');
ACT_PERGUNTAS.forEach((p, i) => {
  actContainer.appendChild(
    criarPerguntaEscala({
      id: `act-q${i + 1}`,
      numero: i + 1,
      texto: p.texto,
      opcoes: p.opcoes,
      valores: [1, 2, 3, 4, 5],
    })
  );
});
const actResultado = $('#act-resultado');

function atualizarACT() {
  const r = calcularACT(lerRespostas(actForm, 'act', 5));
  const ok = $('#act-ok');
  const vazio = $('#act-vazio');
  if (!r.ok) { ok.hidden = true; vazio.hidden = false; return; }
  ok.hidden = false;
  vazio.hidden = true;
  actResultado.dataset.nivel = r.nivel;
  $('#act-pontos').textContent = r.pontos;
  $('#act-controlo').textContent = r.controlo;
}
actForm.addEventListener('change', atualizarACT);
atualizarACT();

/* ---------- Centor / McIsaac ---------- */

const centorForm = $('#centor-form');
const centorResultado = $('#centor-resultado');
const centorIdade = $('#centor-idade');

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

function atualizarCentor() {
  const criterios = {
    febre: $('#ce-febre').checked,
    semTosse: $('#ce-tosse').checked,
    exsudadoAmigdalino: $('#ce-exsudado').checked,
    adenopatiaDolorosa: $('#ce-adenopatia').checked,
  };
  const r = calcularCentor(criterios, centorIdade.value);
  const ok = $('#centor-ok');
  const vazio = $('#centor-vazio');
  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#centor-motivo').textContent = r.motivo;
    return;
  }
  ok.hidden = false;
  vazio.hidden = true;
  centorResultado.dataset.nivel = r.nivel;
  $('#centor-pontos').textContent = r.pontos;
  $('#centor-risco').textContent = `Risco estimado de estreptococo: ${r.risco}`;
  $('#centor-recomendacao').textContent = r.recomendacao;
}
centorForm.addEventListener('change', atualizarCentor);
centorIdade.addEventListener('input', atualizarCentor);
atualizarCentor();

const params = new URLSearchParams(location.search);
const inicial = ['cat', 'act', 'centor'].includes(params.get('calc')) ? params.get('calc') : 'cat';
selecionar(inicial);
