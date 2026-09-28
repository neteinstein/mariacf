import { calcularBarthel, calcularMorse, calcularBraden, classificarMMSE, classificarMoCA, calcularGDS15, calcularCharlson } from './geriatria-core.js';

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
  opcoes.forEach(([texto2, pts]) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    const inputId = `${id}-${pts}`;
    chip.innerHTML = `<input type="radio" name="${id}" id="${inputId}" value="${pts}"><label for="${inputId}"><strong>${texto2}</strong><span>${pts} pontos</span></label>`;
    chips.appendChild(chip);
  });
  fieldset.appendChild(chips);
  return fieldset;
}

function montar(container, itens, prefixo) {
  itens.forEach(([campo, texto, opcoes], i) => {
    container.appendChild(criarPergunta(`${prefixo}-${campo}`, i + 1, texto, opcoes));
  });
}

function ler(form, itens, prefixo) {
  const valores = {};
  itens.forEach(([campo]) => {
    const marcado = form.querySelector(`input[name="${prefixo}-${campo}"]:checked`);
    valores[campo] = marcado ? Number(marcado.value) : NaN;
  });
  return valores;
}

const tabs = $$('.tabbtn');
const paineis = $$('[data-painel]');
function selecionar(id) {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  history.replaceState(null, '', `?calc=${id}`);
}
tabs.forEach((t) => t.addEventListener('click', () => selecionar(t.dataset.tab)));

/* ---------- Índice de Barthel ---------- */

const BARTHEL_ITENS = [
  ['alimentacao', 'Alimentação', [['Dependente', 0], ['Precisa de ajuda', 5], ['Independente', 10]]],
  ['banho', 'Banho', [['Dependente', 0], ['Independente', 5]]],
  ['higiene', 'Higiene pessoal', [['Dependente', 0], ['Independente', 5]]],
  ['vestir', 'Vestir-se', [['Dependente', 0], ['Precisa de ajuda', 5], ['Independente', 10]]],
  ['intestino', 'Controlo intestinal', [['Incontinente', 0], ['Acidente ocasional', 5], ['Continente', 10]]],
  ['bexiga', 'Controlo vesical', [['Incontinente', 0], ['Acidente ocasional', 5], ['Continente', 10]]],
  ['wc', 'Uso do WC', [['Dependente', 0], ['Precisa de ajuda', 5], ['Independente', 10]]],
  ['transferencias', 'Transferências (cama-cadeira)', [['Incapaz', 0], ['Grande ajuda', 5], ['Pequena ajuda', 10], ['Independente', 15]]],
  ['mobilidade', 'Mobilidade', [['Imóvel', 0], ['Cadeira de rodas independente', 5], ['Anda com ajuda', 10], ['Independente', 15]]],
  ['escadas', 'Escadas', [['Incapaz', 0], ['Precisa de ajuda', 5], ['Independente', 10]]],
];

const barthelForm = $('#barthel-form');
montar($('#barthel-perguntas'), BARTHEL_ITENS, 'ba');
const barthelResultado = $('#barthel-resultado');

let resultadoBarthel = null;

function atualizarBarthel() {
  const r = calcularBarthel(ler(barthelForm, BARTHEL_ITENS, 'ba'));
  const ok = $('#barthel-ok');
  const vazio = $('#barthel-vazio');
  const acoes = $('#result-actions-ba');
  if (!r.ok) { resultadoBarthel = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  resultadoBarthel = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  barthelResultado.dataset.nivel = r.nivel;
  $('#ba-pontos').textContent = r.pontos;
  $('#ba-grau').textContent = r.grau;
}
barthelForm.addEventListener('change', atualizarBarthel);
atualizarBarthel();

function resumoTextoBarthel(r) {
  const linhas = [
    'Índice de Barthel',
    `Pontuação: ${r.pontos} / 100`,
    `Classificação: ${r.grau}`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-ba').addEventListener('click', () => {
  if (!resultadoBarthel) return;
  const assunto = `Índice de Barthel — ${resultadoBarthel.pontos}/100 (${resultadoBarthel.grau})`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoTextoBarthel(resultadoBarthel))}`;
});
$('#btn-print-ba').addEventListener('click', () => window.print());

/* ---------- Escala de Morse ---------- */

const MORSE_ITENS = [
  ['historiaQuedas', 'História de quedas nos últimos 3 meses', [['Não', 0], ['Sim', 25]]],
  ['diagnosticoSecundario', 'Tem 2 ou mais diagnósticos médicos', [['Não', 0], ['Sim', 15]]],
  ['apoioDeambulacao', 'Apoio na deambulação', [['Nenhum, acamado, cadeira de rodas ou ajuda de enfermeiro', 0], ['Muletas, bengala ou andarilho', 15], ['Apoia-se no mobiliário', 30]]],
  ['terapiaEV', 'Terapia endovenosa ou heparina', [['Não', 0], ['Sim', 20]]],
  ['marcha', 'Marcha', [['Normal, acamado ou imóvel', 0], ['Fraca', 10], ['Comprometida', 20]]],
  ['estadoMental', 'Estado mental', [['Orienta-se quanto às suas capacidades', 0], ['Esquece as suas limitações', 15]]],
];

const morseForm = $('#morse-form');
montar($('#morse-perguntas'), MORSE_ITENS, 'mo');
const morseResultado = $('#morse-resultado');

let resultadoMorse = null;

function atualizarMorse() {
  const r = calcularMorse(ler(morseForm, MORSE_ITENS, 'mo'));
  const ok = $('#morse-ok');
  const vazio = $('#morse-vazio');
  const acoes = $('#result-actions-mo');
  if (!r.ok) { resultadoMorse = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  resultadoMorse = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  morseResultado.dataset.nivel = r.nivel;
  $('#mo-pontos').textContent = r.pontos;
  $('#mo-risco').textContent = r.risco;
}
morseForm.addEventListener('change', atualizarMorse);
atualizarMorse();

function resumoTextoMorse(r) {
  const linhas = [
    'Escala de Morse — Risco de queda',
    `Pontuação: ${r.pontos} / 125`,
    `Classificação: ${r.risco}`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-mo').addEventListener('click', () => {
  if (!resultadoMorse) return;
  const assunto = `Escala de Morse — ${resultadoMorse.pontos}/125 (${resultadoMorse.risco})`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoTextoMorse(resultadoMorse))}`;
});
$('#btn-print-mo').addEventListener('click', () => window.print());

/* ---------- Escala de Braden ---------- */

const BRADEN_ITENS = [
  ['percepcaoSensorial', 'Perceção sensorial', [['Completamente limitada', 1], ['Muito limitada', 2], ['Ligeiramente limitada', 3], ['Nenhuma limitação', 4]]],
  ['humidade', 'Humidade da pele', [['Constantemente húmida', 1], ['Muito húmida', 2], ['Ocasionalmente húmida', 3], ['Raramente húmida', 4]]],
  ['atividade', 'Atividade', [['Acamado(a)', 1], ['Confinado(a) à cadeira', 2], ['Anda ocasionalmente', 3], ['Anda frequentemente', 4]]],
  ['mobilidade', 'Mobilidade', [['Completamente imóvel', 1], ['Muito limitada', 2], ['Ligeiramente limitada', 3], ['Nenhuma limitação', 4]]],
  ['nutricao', 'Nutrição', [['Muito pobre', 1], ['Provavelmente inadequada', 2], ['Adequada', 3], ['Excelente', 4]]],
  ['friccao', 'Fricção e forças de deslizamento', [['Problema', 1], ['Problema potencial', 2], ['Sem problema aparente', 3]]],
];

const bradenForm = $('#braden-form');
montar($('#braden-perguntas'), BRADEN_ITENS, 'br');
const bradenResultado = $('#braden-resultado');

let resultadoBraden = null;

function atualizarBraden() {
  const r = calcularBraden(ler(bradenForm, BRADEN_ITENS, 'br'));
  const ok = $('#braden-ok');
  const vazio = $('#braden-vazio');
  const acoes = $('#result-actions-br');
  if (!r.ok) { resultadoBraden = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  resultadoBraden = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  bradenResultado.dataset.nivel = r.nivel;
  $('#br-pontos').textContent = r.pontos;
  $('#br-risco').textContent = r.risco;
}
bradenForm.addEventListener('change', atualizarBraden);
atualizarBraden();

function resumoTextoBraden(r) {
  const linhas = [
    'Escala de Braden — Risco de úlcera de pressão',
    `Pontuação: ${r.pontos} / 23`,
    `Classificação: ${r.risco}`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-br').addEventListener('click', () => {
  if (!resultadoBraden) return;
  const assunto = `Escala de Braden — ${resultadoBraden.pontos}/23 (${resultadoBraden.risco})`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoTextoBraden(resultadoBraden))}`;
});
$('#btn-print-br').addEventListener('click', () => window.print());

/* ---------- MMSE / MoCA (interpretador de pontuação) ---------- */

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

const cogForm = $('#cog-form');
const cogResultado = $('#cog-resultado');

let resultadoCognitivo = null;

function atualizarCognitivo() {
  const instrumento = $('input[name="cog-instrumento"]:checked')?.value ?? 'mmse';
  const pontos = $('#cog-pontos').value;
  const anos = $('#cog-escolaridade').value;
  const r = instrumento === 'mmse' ? classificarMMSE(pontos, anos) : classificarMoCA(pontos, anos);

  const ok = $('#cog-ok');
  const vazio = $('#cog-vazio');
  const acoes = $('#result-actions-cog');
  if (!r.ok) {
    resultadoCognitivo = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#cog-motivo').textContent = r.motivo;
    return;
  }
  resultadoCognitivo = { ...r, instrumento, anosEscolaridade: anos };
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  cogResultado.dataset.nivel = r.nivel;
  $('#cog-classificacao').textContent = r.alterado ? 'Sugestivo de défice cognitivo' : 'Dentro do esperado para a escolaridade';
  $('#cog-detalhe').textContent =
    instrumento === 'mmse'
      ? `Pontuação ${r.pontos}/30 · corte de referência ${r.corte} (cortes validados para a população portuguesa, Guerreiro 1994)`
      : `Pontuação ${r.pontos}/30 (ajustada: ${r.pontosAjustados}) · corte de referência 26`;
}
cogForm.addEventListener('input', atualizarCognitivo);
cogForm.addEventListener('change', atualizarCognitivo);
atualizarCognitivo();

function resumoTextoCognitivo(r) {
  const classificacao = r.alterado ? 'Sugestivo de défice cognitivo' : 'Dentro do esperado para a escolaridade';
  const detalhe =
    r.instrumento === 'mmse'
      ? `Pontuação ${r.pontos}/30 · corte de referência ${r.corte} (cortes validados para a população portuguesa, Guerreiro 1994)`
      : `Pontuação ${r.pontos}/30 (ajustada: ${r.pontosAjustados}) · corte de referência 26`;
  const linhas = [
    `Classificação de pontuação ${r.instrumento === 'mmse' ? 'MMSE' : 'MoCA'}`,
    `Anos de escolaridade: ${r.anosEscolaridade}`,
    `Classificação: ${classificacao}`,
    detalhe,
    'Esta ferramenta não reproduz os itens do MMSE ou do MoCA — apenas classifica uma pontuação já obtida com o teste oficial.',
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-cog').addEventListener('click', () => {
  if (!resultadoCognitivo) return;
  const nome = resultadoCognitivo.instrumento === 'mmse' ? 'MMSE' : 'MoCA';
  const assunto = `Classificação ${nome} — ${resultadoCognitivo.pontos}/30`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoTextoCognitivo(resultadoCognitivo))}`;
});
$('#btn-print-cog').addEventListener('click', () => window.print());

/* ---------- GDS-15 ---------- */

const OPCOES_SIM_NAO = [['Não', 0], ['Sim', 1]];
const GDS15_PERGUNTAS = [
  ['Está satisfeito(a) com a sua vida?', [['Sim', 0], ['Não', 1]]],
  ['Abandonou muitas das suas atividades e interesses?', OPCOES_SIM_NAO],
  ['Sente que a sua vida está vazia?', OPCOES_SIM_NAO],
  ['Sente-se muitas vezes aborrecido(a)?', OPCOES_SIM_NAO],
  ['Está bem-disposto(a) a maior parte do tempo?', [['Sim', 0], ['Não', 1]]],
  ['Tem medo que algo de mau lhe vá acontecer?', OPCOES_SIM_NAO],
  ['Sente-se feliz a maior parte do tempo?', [['Sim', 0], ['Não', 1]]],
  ['Sente-se muitas vezes desamparado(a)?', OPCOES_SIM_NAO],
  ['Prefere ficar em casa em vez de sair e fazer coisas novas?', OPCOES_SIM_NAO],
  ['Sente que tem mais problemas de memória do que a maioria das pessoas?', OPCOES_SIM_NAO],
  ['Acha que é maravilhoso estar vivo(a) neste momento?', [['Sim', 0], ['Não', 1]]],
  ['Sente-se um pouco inútil, tal como está agora?', OPCOES_SIM_NAO],
  ['Sente-se cheio(a) de energia?', [['Sim', 0], ['Não', 1]]],
  ['Sente que a sua situação é sem esperança?', OPCOES_SIM_NAO],
  ['Acha que a maioria das pessoas está melhor do que você?', OPCOES_SIM_NAO],
];

const gdsForm = $('#gds-form');
GDS15_PERGUNTAS.forEach(([texto, opcoes], i) => {
  $('#gds-perguntas').appendChild(criarPergunta(`gds-q${i + 1}`, i + 1, texto, opcoes));
});
const gdsResultado = $('#gds-resultado');

let resultadoGDS = null;

function atualizarGDS() {
  const respostas = [];
  for (let i = 1; i <= 15; i += 1) {
    const marcado = gdsForm.querySelector(`input[name="gds-q${i}"]:checked`);
    respostas.push(marcado ? Number(marcado.value) : NaN);
  }
  const r = calcularGDS15(respostas);
  const ok = $('#gds-ok');
  const vazio = $('#gds-vazio');
  const acoes = $('#result-actions-gds');
  if (!r.ok) { resultadoGDS = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  resultadoGDS = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  gdsResultado.dataset.nivel = r.nivel;
  $('#gds-pontos').textContent = r.pontos;
  $('#gds-gravidade').textContent = r.gravidade;
}
gdsForm.addEventListener('change', atualizarGDS);
atualizarGDS();

function resumoTextoGDS(r) {
  const linhas = [
    'Escala de Depressão Geriátrica (GDS-15)',
    `Pontuação: ${r.pontos} / 15`,
    `Classificação: ${r.gravidade}`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-gds').addEventListener('click', () => {
  if (!resultadoGDS) return;
  const assunto = `GDS-15 — ${resultadoGDS.pontos}/15 (${resultadoGDS.gravidade})`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoTextoGDS(resultadoGDS))}`;
});
$('#btn-print-gds').addEventListener('click', () => window.print());

/* ---------- Charlson ---------- */

const CHARLSON_CAMPOS = [
  'enfarteMiocardio', 'icc', 'doencaVascularPeriferica', 'doencaCerebrovascular',
  'demencia', 'doencaPulmonarCronica', 'doencaTecidoConjuntivo', 'ulceraPeptica',
  'doencaHepaticaLigeira', 'diabetesSemComplicacoes', 'hemiplegia', 'doencaRenalModeradaGrave',
  'diabetesComComplicacoes', 'tumorSemMetastase', 'leucemia', 'linfoma',
  'doencaHepaticaModeradaGrave', 'tumorMetastatico', 'sida',
];

const charlsonForm = $('#charlson-form');
const charlsonResultado = $('#charlson-resultado');

let resultadoCharlson = null;

function atualizarCharlson() {
  const comorbilidades = {};
  CHARLSON_CAMPOS.forEach((c) => { comorbilidades[c] = $(`#ch-${c}`).checked; });
  const r = calcularCharlson(comorbilidades, $('#ch-idade').value);
  const ok = $('#charlson-ok');
  const vazio = $('#charlson-vazio');
  const acoes = $('#result-actions-ch');
  if (!r.ok) { resultadoCharlson = null; ok.hidden = true; vazio.hidden = false; if (acoes) acoes.hidden = true; return; }
  resultadoCharlson = { ...r, idade: $('#ch-idade').value };
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  charlsonResultado.dataset.nivel = r.nivel;
  $('#ch-pontos').textContent = r.pontos;
  $('#ch-sobrevivencia').textContent = `Sobrevivência estimada a 10 anos: ~${r.sobrevivencia10Anos}% (estimativa aproximada)`;
}
charlsonForm.addEventListener('input', atualizarCharlson);
charlsonForm.addEventListener('change', atualizarCharlson);
atualizarCharlson();

function resumoTextoCharlson(r) {
  const linhas = [
    'Índice de comorbilidade de Charlson',
    `Idade: ${r.idade} anos`,
    `Pontuação: ${r.pontos} (comorbilidades: ${r.pontosComorbilidades} · idade: ${r.pontosIdade})`,
    `Sobrevivência estimada a 10 anos: ~${r.sobrevivencia10Anos}% (estimativa aproximada)`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email-ch').addEventListener('click', () => {
  if (!resultadoCharlson) return;
  const assunto = `Índice de Charlson — ${resultadoCharlson.pontos} pontos`;
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoTextoCharlson(resultadoCharlson))}`;
});
$('#btn-print-ch').addEventListener('click', () => window.print());

const params = new URLSearchParams(location.search);
const validos = ['barthel', 'morse', 'braden', 'cognitivo', 'gds15', 'charlson'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'barthel');
