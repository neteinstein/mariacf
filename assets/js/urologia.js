import { calcularIPSS } from './urologia-core.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);

const OPCOES_FREQ = ['Nunca', 'Menos de 1 vez em 5', 'Menos de metade das vezes', 'Cerca de metade das vezes', 'Mais de metade das vezes', 'Quase sempre'];
const OPCOES_NICTURIA = ['Nenhuma vez', '1 vez', '2 vezes', '3 vezes', '4 vezes', '5 ou mais vezes'];
const OPCOES_QV = ['Ótimo(a)', 'Satisfeito(a)', 'Mais satisfeito(a) que insatisfeito(a)', 'Indiferente', 'Mais insatisfeito(a) que satisfeito(a)', 'Infeliz', 'Muito mau'];

const IPSS_PERGUNTAS = [
  'Nos últimos 30 dias, com que frequência teve a sensação de não esvaziar completamente a bexiga depois de urinar?',
  'Nos últimos 30 dias, com que frequência teve de urinar novamente menos de 2 horas depois de ter urinado?',
  'Nos últimos 30 dias, com que frequência parou e recomeçou várias vezes enquanto urinava?',
  'Nos últimos 30 dias, com que frequência achou difícil adiar a micção?',
  'Nos últimos 30 dias, com que frequência teve um jato urinário fraco?',
  'Nos últimos 30 dias, com que frequência teve de fazer força para começar a urinar?',
];

function criarPergunta(id, numero, texto, opcoes) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'step qitem';
  const legend = document.createElement('legend');
  legend.className = 'step-label';
  legend.innerHTML = `<span class="step-num">${numero}</span> ${texto}`;
  fieldset.appendChild(legend);

  const chips = document.createElement('div');
  chips.className = 'chips';
  opcoes.forEach((opcao, i) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    const inputId = `${id}-op${i}`;
    chip.innerHTML = `<input type="radio" name="${id}" id="${inputId}" value="${i}"><label for="${inputId}"><strong>${opcao}</strong><span>${i} ponto${i === 1 ? '' : 's'}</span></label>`;
    chips.appendChild(chip);
  });
  fieldset.appendChild(chips);
  return fieldset;
}

const ipssForm = $('#ipss-form');
IPSS_PERGUNTAS.forEach((texto, i) => {
  $('#ipss-perguntas').appendChild(criarPergunta(`ip-q${i + 1}`, i + 1, texto, OPCOES_FREQ));
});
$('#ipss-perguntas').appendChild(criarPergunta('ip-q7', 7, 'Nas últimas 4 semanas, quantas vezes, em média, se levantou para urinar desde que se deitou até se levantar de manhã?', OPCOES_NICTURIA));
$('#ipss-qv').appendChild(criarPergunta('ip-qv', 'QV', 'Se tivesse de passar o resto da vida a urinar tal como faz atualmente, como se sentiria?', OPCOES_QV));

const ipssResultado = $('#ipss-resultado');

function atualizar() {
  const respostas = [];
  for (let i = 1; i <= 7; i += 1) {
    const marcado = ipssForm.querySelector(`input[name="ip-q${i}"]:checked`);
    respostas.push(marcado ? Number(marcado.value) : NaN);
  }
  const qv = ipssForm.querySelector('input[name="ip-qv"]:checked')?.value;

  const r = calcularIPSS(respostas, qv);
  const ok = $('#ipss-ok');
  const vazio = $('#ipss-vazio');
  if (!r.ok) { ok.hidden = true; vazio.hidden = false; return; }
  ok.hidden = false;
  vazio.hidden = true;
  ipssResultado.dataset.nivel = r.nivel;
  $('#ip-pontos').textContent = r.pontos;
  $('#ip-gravidade').textContent = r.gravidade;
  $('#ip-qv').textContent = r.qualidadeVida === null ? '' : `Qualidade de vida: ${r.qualidadeVida} / 6`;
}
ipssForm.addEventListener('change', atualizar);
atualizar();
