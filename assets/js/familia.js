import { calcularAPGARFamiliar, calcularEPDS, calcularZarit, calcularFagerstrom, calcularMorisky } from './familia-core.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function criarPergunta(id, numero, texto, opcoes) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'step qitem';
  const legend = document.createElement('legend');
  legend.className = 'step-label';
  legend.innerHTML = `<span class="step-num">${numero}</span> ${texto}`;
  fieldset.appendChild(legend);

  const chips = document.createElement('div');
  chips.className = 'chips';
  opcoes.forEach(([texto2, pts], i) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    const inputId = `${id}-op${i}`;
    chip.innerHTML = `<input type="radio" name="${id}" id="${inputId}" value="${pts}"><label for="${inputId}"><strong>${texto2}</strong><span>${pts} ponto${pts === 1 ? '' : 's'}</span></label>`;
    chips.appendChild(chip);
  });
  fieldset.appendChild(chips);
  return fieldset;
}

function montar(container, perguntas, prefixo) {
  perguntas.forEach((texto, i) => {
    const opcoes = typeof texto === 'string' ? null : texto.opcoes;
    const rotulo = typeof texto === 'string' ? texto : texto.texto;
    container.appendChild(criarPergunta(`${prefixo}-q${i + 1}`, i + 1, rotulo, opcoes));
  });
}

function ler(form, prefixo, n) {
  const respostas = [];
  for (let i = 1; i <= n; i += 1) {
    const marcado = form.querySelector(`input[name="${prefixo}-q${i}"]:checked`);
    respostas.push(marcado ? Number(marcado.value) : NaN);
  }
  return respostas;
}

const tabs = $$('.tabbtn');
const paineis = $$('[data-painel]');
function selecionar(id) {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  history.replaceState(null, '', `?calc=${id}`);
}
tabs.forEach((t) => t.addEventListener('click', () => selecionar(t.dataset.tab)));

/* ---------- APGAR familiar ---------- */

const OPCOES_APGAR = [['Quase nunca', 0], ['Às vezes', 1], ['Quase sempre', 2]];
const APGAR_PERGUNTAS = [
  'Estou satisfeito(a) com a ajuda que recebo da minha família quando alguma coisa me preocupa.',
  'Estou satisfeito(a) com o modo como a minha família discute assuntos de interesse comum e partilha comigo a resolução de problemas.',
  'Estou satisfeito(a) por a minha família aceitar e apoiar os meus desejos de iniciar novas atividades ou mudar o meu estilo de vida.',
  'Estou satisfeito(a) com o modo como a minha família manifesta afeto e reage aos meus sentimentos, como tristeza, amor ou raiva.',
  'Estou satisfeito(a) com o tempo que passamos juntos, em família.',
].map((texto) => ({ texto, opcoes: OPCOES_APGAR }));

const apgarForm = $('#apgar-form');
montar($('#apgar-perguntas'), APGAR_PERGUNTAS, 'ap');
const apgarResultado = $('#apgar-resultado');

let apgarAtual = null;

function atualizarAPGAR() {
  const r = calcularAPGARFamiliar(ler(apgarForm, 'ap', 5));
  const ok = $('#apgar-ok');
  const vazio = $('#apgar-vazio');
  const acoes = $('#result-actions-apgar');
  if (!r.ok) { apgarAtual = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  apgarAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  apgarResultado.dataset.nivel = r.nivel;
  $('#ap-pontos').textContent = r.pontos;
  $('#ap-funcao').textContent = r.funcao;
}
apgarForm.addEventListener('change', atualizarAPGAR);
atualizarAPGAR();

function resumoAPGAR(r) {
  return [
    `APGAR familiar — ${r.pontos} / 10`,
    r.funcao,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ].join('\n');
}

$('#btn-email-apgar').addEventListener('click', () => {
  if (!apgarAtual) return;
  const assunto = `APGAR familiar — ${apgarAtual.pontos} / 10`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoAPGAR(apgarAtual))}`;
});

$('#btn-print-apgar').addEventListener('click', () => window.print());

/* ---------- EPDS ---------- */

const EPDS_PERGUNTAS = [
  { texto: 'Tenho sido capaz de rir e ver o lado divertido das coisas', opcoes: [['Tanto como sempre', 0], ['Menos do que costumava', 1], ['Muito menos do que costumava', 2], ['Nada', 3]] },
  { texto: 'Tenho tido esperança e prazer em relação ao futuro', opcoes: [['Tanto como sempre', 0], ['Um pouco menos do que costumava', 1], ['Muito menos do que costumava', 2], ['Quase nada', 3]] },
  { texto: 'Tenho-me culpado sem necessidade quando as coisas correm mal', opcoes: [['Não, nunca', 0], ['Raramente', 1], ['Sim, algumas vezes', 2], ['Sim, a maior parte das vezes', 3]] },
  { texto: 'Tenho estado ansiosa ou preocupada sem motivo', opcoes: [['Não, nunca', 0], ['Quase nunca', 1], ['Sim, por vezes', 2], ['Sim, muitas vezes', 3]] },
  { texto: 'Tenho-me sentido assustada ou em pânico sem motivo', opcoes: [['Não, nunca', 0], ['Não, muito raramente', 1], ['Sim, por vezes', 2], ['Sim, muitas vezes', 3]] },
  { texto: 'Tenho sentido que as coisas são demais para mim', opcoes: [['Não, tenho lidado tão bem com elas como sempre', 0], ['Não, a maior parte das vezes tenho lidado bem com elas', 1], ['Sim, por vezes não tenho conseguido lidar com elas tão bem como habitualmente', 2], ['Sim, a maior parte das vezes não tenho conseguido lidar com elas', 3] ] },
  { texto: 'Tenho-me sentido tão infeliz que tenho tido dificuldade em dormir', opcoes: [['Não, nunca', 0], ['Raramente', 1], ['Sim, por vezes', 2], ['Sim, a maior parte das vezes', 3]] },
  { texto: 'Tenho-me sentido triste ou muito infeliz', opcoes: [['Não, nunca', 0], ['Raramente', 1], ['Sim, muitas vezes', 2], ['Sim, quase sempre', 3]] },
  { texto: 'Tenho-me sentido tão infeliz que tenho chorado', opcoes: [['Não, nunca', 0], ['Só ocasionalmente', 1], ['Sim, muitas vezes', 2], ['Sim, quase sempre', 3]] },
  { texto: 'Tive ideias de fazer mal a mim mesma', opcoes: [['Nunca', 0], ['Muito raramente', 1], ['Por vezes', 2], ['Sim, muitas vezes', 3]] },
];

const epdsForm = $('#epds-form');
montar($('#epds-perguntas'), EPDS_PERGUNTAS, 'ep');
const epdsResultado = $('#epds-resultado');

let epdsAtual = null;

function atualizarEPDS() {
  const r = calcularEPDS(ler(epdsForm, 'ep', 10));
  const ok = $('#epds-ok');
  const vazio = $('#epds-vazio');
  const acoes = $('#result-actions-epds');
  if (!r.ok) { epdsAtual = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  epdsAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  epdsResultado.dataset.nivel = r.nivel;
  $('#ep-pontos').textContent = r.pontos;
  $('#ep-gravidade').textContent = r.gravidade;
  $('#ep-alerta').hidden = !r.itemRisco;
}
epdsForm.addEventListener('change', atualizarEPDS);
atualizarEPDS();

function resumoEPDS(r) {
  const linhas = [
    `EPDS (rastreio de depressão pós-parto) — ${r.pontos} / 30`,
    r.gravidade,
  ];
  if (r.itemRisco) linhas.push('Assinalou ideias de fazer mal a si mesma — avalie o risco de suicídio e considere referenciação urgente.');
  linhas.push('', 'Informação de apoio — não substitui aconselhamento médico.', location.href);
  return linhas.join('\n');
}

$('#btn-email-epds').addEventListener('click', () => {
  if (!epdsAtual) return;
  const assunto = `EPDS — ${epdsAtual.pontos} / 30`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoEPDS(epdsAtual))}`;
});

$('#btn-print-epds').addEventListener('click', () => window.print());

/* ---------- Zarit ---------- */

const OPCOES_ZARIT = [['Nunca', 0], ['Raramente', 1], ['Algumas vezes', 2], ['Muitas vezes', 3], ['Quase sempre', 4]];
const ZARIT_PERGUNTAS = [
  'Sente que o seu familiar pede mais ajuda do que aquela de que realmente necessita?',
  'Sente que, por causa do tempo que dedica ao seu familiar, já não tem tempo suficiente para si?',
  'Sente-se numa situação difícil entre cuidar do seu familiar e cumprir outras responsabilidades (trabalho, família)?',
  'Sente-se envergonhado(a) com o comportamento do seu familiar?',
  'Sente-se irritado(a) quando está perto do seu familiar?',
  'Sente que o seu familiar afeta negativamente a sua relação com outros familiares ou amigos?',
  'Sente receio quanto ao futuro do seu familiar?',
  'Sente que o seu familiar depende de si?',
  'Sente-se tenso(a) quando está perto do seu familiar?',
  'Sente que a sua saúde tem sido afetada por cuidar do seu familiar?',
  'Sente que não tem tanta privacidade quanto gostaria, por causa do seu familiar?',
  'Sente que a sua vida social tem sido prejudicada por cuidar do seu familiar?',
  'Sente-se pouco à vontade para receber visitas em casa, por causa do seu familiar?',
  'Sente que o seu familiar espera que cuide dele(a) como se fosse a única pessoa de quem pode depender?',
  'Sente que não tem dinheiro suficiente para cuidar do seu familiar, tendo em conta as outras despesas?',
  'Sente que não vai conseguir cuidar do seu familiar por muito mais tempo?',
  'Sente que perdeu o controlo da sua vida desde a doença do seu familiar?',
  'Gostaria de poder entregar os cuidados do seu familiar a outra pessoa?',
  'Sente-se inseguro(a) sobre o que fazer pelo seu familiar?',
  'Sente que deveria fazer mais pelo seu familiar?',
  'Sente que poderia cuidar melhor do seu familiar?',
  'De um modo geral, sente-se muito sobrecarregado(a) por cuidar do seu familiar?',
].map((texto) => ({ texto, opcoes: OPCOES_ZARIT }));

const zaritForm = $('#zarit-form');
montar($('#zarit-perguntas'), ZARIT_PERGUNTAS, 'za');
const zaritResultado = $('#zarit-resultado');

let zaritAtual = null;

function atualizarZarit() {
  const r = calcularZarit(ler(zaritForm, 'za', 22));
  const ok = $('#zarit-ok');
  const vazio = $('#zarit-vazio');
  const acoes = $('#result-actions-zarit');
  if (!r.ok) { zaritAtual = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  zaritAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  zaritResultado.dataset.nivel = r.nivel;
  $('#za-pontos').textContent = r.pontos;
  $('#za-sobrecarga').textContent = r.sobrecarga;
}
zaritForm.addEventListener('change', atualizarZarit);
atualizarZarit();

function resumoZarit(r) {
  return [
    `Escala de Zarit (sobrecarga do cuidador) — ${r.pontos} / 88`,
    r.sobrecarga,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ].join('\n');
}

$('#btn-email-zarit').addEventListener('click', () => {
  if (!zaritAtual) return;
  const assunto = `Escala de Zarit — ${zaritAtual.pontos} / 88`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoZarit(zaritAtual))}`;
});

$('#btn-print-zarit').addEventListener('click', () => window.print());

/* ---------- Fagerström ---------- */

const FAGERSTROM_PERGUNTAS = [
  { campo: 'primeiroCigarro', texto: 'Quanto tempo depois de acordar fuma o primeiro cigarro?', opcoes: [['Mais de 60 minutos', 0], ['31 a 60 minutos', 1], ['6 a 30 minutos', 2], ['Menos de 5 minutos', 3]] },
  { campo: 'dificilNaoFumar', texto: 'Acha difícil não fumar em locais proibidos?', opcoes: [['Não', 0], ['Sim', 1]] },
  { campo: 'cigarroDificilRenunciar', texto: 'A que cigarro custa mais renunciar?', opcoes: [['A outro qualquer', 0], ['Ao primeiro da manhã', 1]] },
  { campo: 'cigarrosPorDia', texto: 'Quantos cigarros fuma por dia?', opcoes: [['10 ou menos', 0], ['11 a 20', 1], ['21 a 30', 2], ['31 ou mais', 3]] },
  { campo: 'maisDeManha', texto: 'Fuma mais nas primeiras horas da manhã do que no resto do dia?', opcoes: [['Não', 0], ['Sim', 1]] },
  { campo: 'fumaDoente', texto: 'Fuma mesmo estando doente, a maior parte do dia acamado(a)?', opcoes: [['Não', 0], ['Sim', 1]] },
];

const fagForm = $('#fag-form');
FAGERSTROM_PERGUNTAS.forEach((p, i) => {
  $('#fag-perguntas').appendChild(criarPergunta(`fag-${p.campo}`, i + 1, p.texto, p.opcoes));
});
const fagResultado = $('#fag-resultado');

let fagAtual = null;

function atualizarFagerstrom() {
  const respostas = {};
  FAGERSTROM_PERGUNTAS.forEach((p) => {
    const marcado = fagForm.querySelector(`input[name="fag-${p.campo}"]:checked`);
    respostas[p.campo] = marcado ? Number(marcado.value) : NaN;
  });
  const r = calcularFagerstrom(respostas);
  const ok = $('#fag-ok');
  const vazio = $('#fag-vazio');
  const acoes = $('#result-actions-fag');
  if (!r.ok) { fagAtual = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  fagAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  fagResultado.dataset.nivel = r.nivel;
  $('#fa-pontos').textContent = r.pontos;
  $('#fa-dependencia').textContent = r.dependencia;
}
fagForm.addEventListener('change', atualizarFagerstrom);
atualizarFagerstrom();

function resumoFagerstrom(r) {
  return [
    `Teste de Fagerström (dependência da nicotina) — ${r.pontos} / 10`,
    r.dependencia,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ].join('\n');
}

$('#btn-email-fag').addEventListener('click', () => {
  if (!fagAtual) return;
  const assunto = `Teste de Fagerström — ${fagAtual.pontos} / 10`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoFagerstrom(fagAtual))}`;
});

$('#btn-print-fag').addEventListener('click', () => window.print());

/* ---------- Morisky ---------- */

const MORISKY_PERGUNTAS = [
  { campo: 'esquecimento', texto: 'Alguma vez se esqueceu de tomar os seus medicamentos?' },
  { campo: 'descuido', texto: 'Às vezes é descuidado(a) quanto ao horário de tomar os medicamentos?' },
  { campo: 'paraQuandoBem', texto: 'Quando se sente bem, alguma vez deixa de tomar os medicamentos?' },
  { campo: 'paraQuandoMal', texto: 'Quando se sente mal com os medicamentos, alguma vez para de os tomar?' },
];
const OPCOES_SIM_NAO = [['Não', 0], ['Sim', 1]];

const morForm = $('#mor-form');
MORISKY_PERGUNTAS.forEach((p, i) => {
  $('#mor-perguntas').appendChild(criarPergunta(`mor-${p.campo}`, i + 1, p.texto, OPCOES_SIM_NAO));
});
const morResultado = $('#mor-resultado');

let morAtual = null;

function atualizarMorisky() {
  const respostas = {};
  MORISKY_PERGUNTAS.forEach((p) => {
    const marcado = morForm.querySelector(`input[name="mor-${p.campo}"]:checked`);
    respostas[p.campo] = marcado ? Number(marcado.value) : NaN;
  });
  const r = calcularMorisky(respostas);
  const ok = $('#mor-ok');
  const vazio = $('#mor-vazio');
  const acoes = $('#result-actions-mor');
  if (!r.ok) { morAtual = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  morAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  morResultado.dataset.nivel = r.nivel;
  $('#mo-pontos').textContent = r.pontos;
  $('#mo-adesao').textContent = r.adesao;
}
morForm.addEventListener('change', atualizarMorisky);
atualizarMorisky();

function resumoMorisky(r) {
  return [
    `Teste de Morisky (adesão à terapêutica) — ${r.pontos} / 4`,
    r.adesao,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ].join('\n');
}

$('#btn-email-mor').addEventListener('click', () => {
  if (!morAtual) return;
  const assunto = `Teste de Morisky — ${morAtual.pontos} / 4`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoMorisky(morAtual))}`;
});

$('#btn-print-mor').addEventListener('click', () => window.print());

const params = new URLSearchParams(location.search);
const validos = ['apgar', 'epds', 'zarit', 'fagerstrom', 'morisky'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'apgar');
