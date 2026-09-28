import { calcularPHQ9, calcularGAD7, calcularAUDIT } from './saude-mental-core.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const OPCOES_FREQ4 = ['Nunca', 'Vários dias', 'Mais de metade dos dias', 'Quase todos os dias'];

const PHQ9_PERGUNTAS = [
  'Pouco interesse ou prazer em fazer as coisas',
  'Sentir-se em baixo, deprimido(a) ou sem esperança',
  'Dificuldade em adormecer, manter o sono ou dormir demais',
  'Sentir-se cansado(a) ou com pouca energia',
  'Falta de apetite ou comer demais',
  'Sentir-se mal consigo mesmo(a) — ou que é um fracasso ou desiludiu a família',
  'Dificuldade em concentrar-se, por exemplo a ler ou a ver televisão',
  'Lentidão a falar/mover-se percetível a outros, ou o oposto — estar tão agitado(a) que se mexe muito mais que o habitual',
  'Pensamentos de que estaria melhor morto(a) ou de se magoar de alguma forma',
];

const GAD7_PERGUNTAS = [
  'Sentir-se nervoso(a), ansioso(a) ou muito tenso(a)',
  'Não conseguir parar ou controlar a preocupação',
  'Preocupar-se muito com diversas coisas',
  'Dificuldade em relaxar',
  'Estar tão inquieto(a) que é difícil estar parado(a)',
  'Ficar facilmente irritado(a) ou irritável',
  'Sentir medo, como se algo terrível fosse acontecer',
];

const FREQ5 = ['Nunca', 'Menos de uma vez por mês', 'Mensalmente', 'Semanalmente', 'Diariamente ou quase'];
const SIM_NAO3 = ['Não', 'Sim, mas não no último ano', 'Sim, no último ano'];

const AUDIT_PERGUNTAS = [
  { texto: 'Com que frequência consome bebidas alcoólicas?', opcoes: ['Nunca', 'Uma vez por mês ou menos', '2 a 4 vezes por mês', '2 a 3 vezes por semana', '4 ou mais vezes por semana'] },
  { texto: 'Quantas bebidas com álcool consome num dia típico em que bebe?', opcoes: ['1 ou 2', '3 ou 4', '5 ou 6', '7 a 9', '10 ou mais'] },
  { texto: 'Com que frequência toma 6 ou mais bebidas numa única ocasião?', opcoes: FREQ5 },
  { texto: 'Nos últimos 12 meses, com que frequência não conseguiu parar de beber depois de começar?', opcoes: FREQ5 },
  { texto: 'Nos últimos 12 meses, com que frequência deixou de fazer o que era esperado de si por causa da bebida?', opcoes: FREQ5 },
  { texto: 'Nos últimos 12 meses, com que frequência precisou de beber logo de manhã para "curar a ressaca"?', opcoes: FREQ5 },
  { texto: 'Nos últimos 12 meses, com que frequência teve sentimento de culpa ou remorso depois de beber?', opcoes: FREQ5 },
  { texto: 'Nos últimos 12 meses, com que frequência foi incapaz de se lembrar do que aconteceu na noite anterior por ter bebido?', opcoes: FREQ5 },
  { texto: 'Alguma vez se magoou, ou alguém se magoou, por ter bebido?', opcoes: SIM_NAO3, pontosPersonalizados: [0, 2, 4] },
  { texto: 'Algum familiar, amigo, médico ou profissional de saúde já manifestou preocupação com o seu consumo ou sugeriu que reduzisse?', opcoes: SIM_NAO3, pontosPersonalizados: [0, 2, 4] },
];

function criarPergunta({ id, numero, texto, opcoes, pontos }) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'step qitem';
  const legend = document.createElement('legend');
  legend.className = 'step-label';
  legend.innerHTML = `<span class="step-num">${numero}</span> ${texto}`;
  fieldset.appendChild(legend);

  const chips = document.createElement('div');
  chips.className = 'chips';
  opcoes.forEach((opcao, i) => {
    const p = pontos ? pontos[i] : i;
    const chip = document.createElement('div');
    chip.className = 'chip';
    const inputId = `${id}-op${i}`;
    chip.innerHTML = `<input type="radio" name="${id}" id="${inputId}" value="${p}"><label for="${inputId}"><strong>${opcao}</strong><span>${p} ponto${p === 1 ? '' : 's'}</span></label>`;
    chips.appendChild(chip);
  });
  fieldset.appendChild(chips);
  return fieldset;
}

function montarFormulario(container, perguntas, prefixo) {
  perguntas.forEach((p, i) => {
    container.appendChild(
      criarPergunta({
        id: `${prefixo}-q${i + 1}`,
        numero: i + 1,
        texto: typeof p === 'string' ? p : p.texto,
        opcoes: typeof p === 'string' ? OPCOES_FREQ4 : p.opcoes,
        pontos: typeof p === 'string' ? null : p.pontosPersonalizados,
      })
    );
  });
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

/* ---------- PHQ-9 ---------- */

const phqForm = $('#phq9-form');
montarFormulario($('#phq9-perguntas'), PHQ9_PERGUNTAS, 'phq');
const phqResultado = $('#phq9-resultado');
let phqAtual = null;

function atualizarPHQ() {
  const r = calcularPHQ9(lerRespostas(phqForm, 'phq', 9));
  const ok = $('#phq9-ok');
  const vazio = $('#phq9-vazio');
  const acoes = $('#result-actions-phq9');
  if (!r.ok) {
    phqAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    return;
  }
  phqAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  phqResultado.dataset.nivel = r.nivel;
  $('#phq-pontos').textContent = r.pontos;
  $('#phq-gravidade').textContent = r.gravidade;
  $('#phq-alerta').hidden = !r.itemRisco;
}

phqForm.addEventListener('change', atualizarPHQ);
atualizarPHQ();

function resumoPHQ(r) {
  const linhas = [
    'PHQ-9 — rastreio de depressão',
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.gravidade,
  ];
  if (r.itemRisco) {
    linhas.push('Assinalou pensamentos de morte ou de se magoar — avalie o risco de suicídio e considere referenciação urgente.');
  }
  linhas.push('', 'Este questionário é um instrumento de rastreio, não de diagnóstico.', 'Informação de apoio — não substitui aconselhamento médico.', location.href);
  return linhas.join('\n');
}

$('#btn-email-phq9').addEventListener('click', () => {
  if (!phqAtual) return;
  const assunto = `PHQ-9 — ${phqAtual.pontos} / ${phqAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoPHQ(phqAtual))}`;
});

$('#btn-print-phq9').addEventListener('click', () => {
  window.print();
});

/* ---------- GAD-7 ---------- */

const gadForm = $('#gad7-form');
montarFormulario($('#gad7-perguntas'), GAD7_PERGUNTAS, 'gad');
const gadResultado = $('#gad7-resultado');
let gadAtual = null;

function atualizarGAD() {
  const r = calcularGAD7(lerRespostas(gadForm, 'gad', 7));
  const ok = $('#gad7-ok');
  const vazio = $('#gad7-vazio');
  const acoes = $('#result-actions-gad7');
  if (!r.ok) {
    gadAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    return;
  }
  gadAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  gadResultado.dataset.nivel = r.nivel;
  $('#gad-pontos').textContent = r.pontos;
  $('#gad-gravidade').textContent = r.gravidade;
}

gadForm.addEventListener('change', atualizarGAD);
atualizarGAD();

function resumoGAD(r) {
  const linhas = [
    'GAD-7 — rastreio de ansiedade',
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.gravidade,
    '',
    'Este questionário é um instrumento de rastreio, não de diagnóstico.',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-gad7').addEventListener('click', () => {
  if (!gadAtual) return;
  const assunto = `GAD-7 — ${gadAtual.pontos} / ${gadAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoGAD(gadAtual))}`;
});

$('#btn-print-gad7').addEventListener('click', () => {
  window.print();
});

/* ---------- AUDIT ---------- */

const auditForm = $('#audit-form');
montarFormulario($('#audit-perguntas'), AUDIT_PERGUNTAS, 'audit');
const auditResultado = $('#audit-resultado');
let auditAtual = null;

function atualizarAUDIT() {
  const sexoFeminino = $('#audit-sexo').checked;
  const r = calcularAUDIT(lerRespostas(auditForm, 'audit', 10), sexoFeminino);
  const ok = $('#audit-ok');
  const vazio = $('#audit-vazio');
  const acoes = $('#result-actions-audit');
  if (!r.ok) {
    auditAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    return;
  }
  auditAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  auditResultado.dataset.nivel = r.nivel;
  $('#audit-pontos').textContent = r.pontos;
  $('#audit-gravidade').textContent = r.gravidade;
  $('#audit-c').textContent = `${r.auditC} / 12${r.auditCPositivo ? ' — positivo' : ''} (limiar ${r.cutoffC})`;
}

auditForm.addEventListener('change', atualizarAUDIT);
atualizarAUDIT();

function resumoAUDIT(r) {
  const linhas = [
    'AUDIT — rastreio de consumo de risco de álcool',
    `Pontuação: ${r.pontos} / ${r.max}`,
    r.gravidade,
    `AUDIT-C (1.ªs 3 perguntas): ${r.auditC} / 12${r.auditCPositivo ? ' — positivo' : ''} (limiar ${r.cutoffC})`,
    '',
    'Este questionário é um instrumento de rastreio, não de diagnóstico.',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-audit').addEventListener('click', () => {
  if (!auditAtual) return;
  const assunto = `AUDIT — ${auditAtual.pontos} / ${auditAtual.max}`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoAUDIT(auditAtual))}`;
});

$('#btn-print-audit').addEventListener('click', () => {
  window.print();
});

const params = new URLSearchParams(location.search);
const inicial = ['phq9', 'gad7', 'audit'].includes(params.get('calc')) ? params.get('calc') : 'phq9';
selecionar(inicial);
