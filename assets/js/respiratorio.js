import { calcularCAT, calcularACT } from './respiratorio-core.js';

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
let catAtual = null;

function atualizarCAT() {
  const r = calcularCAT(lerRespostas(catForm, 'cat', 8));
  const ok = $('#cat-ok');
  const vazio = $('#cat-vazio');
  const acoes = $('#result-actions-cat');
  if (!r.ok) {
    catAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    return;
  }
  catAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  catResultado.dataset.nivel = r.nivel;
  $('#cat-pontos').textContent = r.pontos;
  $('#cat-impacto').textContent = r.impacto;
}
catForm.addEventListener('change', atualizarCAT);
atualizarCAT();

function resumoCAT(r) {
  const linhas = [
    'CAT — COPD Assessment Test',
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.impacto,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-cat').addEventListener('click', () => {
  if (!catAtual) return;
  const assunto = `CAT — ${catAtual.pontos} / ${catAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoCAT(catAtual))}`;
});

$('#btn-print-cat').addEventListener('click', () => {
  window.print();
});

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
let actAtual = null;

function atualizarACT() {
  const r = calcularACT(lerRespostas(actForm, 'act', 5));
  const ok = $('#act-ok');
  const vazio = $('#act-vazio');
  const acoes = $('#result-actions-act');
  if (!r.ok) {
    actAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    return;
  }
  actAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  actResultado.dataset.nivel = r.nivel;
  $('#act-pontos').textContent = r.pontos;
  $('#act-controlo').textContent = r.controlo;
}
actForm.addEventListener('change', atualizarACT);
atualizarACT();

function resumoACT(r) {
  const linhas = [
    'ACT — Asthma Control Test',
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.controlo,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-act').addEventListener('click', () => {
  if (!actAtual) return;
  const assunto = `ACT — ${actAtual.pontos} / ${actAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoACT(actAtual))}`;
});

$('#btn-print-act').addEventListener('click', () => {
  window.print();
});

const params = new URLSearchParams(location.search);
const inicial = ['cat', 'act'].includes(params.get('calc')) ? params.get('calc') : 'cat';
selecionar(inicial);
