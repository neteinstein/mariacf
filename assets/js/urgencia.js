import { calcularCURB65, calcularWellsTVP, calcularWellsTEP, calcularQTc, calcularGlasgow, calcularHEART, calcularNEWS2 } from './urgencia-core.js';
import { calcularCRB65, calcularPERC, calcularOttawaTornozelo, calcularOttawaJoelho, calcularAlvarado, calcularIndiceChoque } from './urgencia2-core.js';

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
    const novo = (Number(alvo.value) || min) + Number(btn.dataset.step);
    alvo.value = Math.min(Math.max(novo, min), max);
    alvo.dispatchEvent(new Event('input', { bubbles: true }));
  });
});

/* ---------- Ações: email e impressão ---------- */

function ligarAcoes(sufixo, obterResumo, obterAssunto) {
  const btnEmail = $(`#btn-email-${sufixo}`);
  const btnPrint = $(`#btn-print-${sufixo}`);
  if (btnEmail) {
    btnEmail.addEventListener('click', () => {
      const corpo = obterResumo();
      if (!corpo) return;
      const assunto = obterAssunto();
      location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    });
  }
  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }
}

const RODAPE = ['', 'Informação de apoio — não substitui aconselhamento médico.', location.href];

/* ---------- CURB-65 ---------- */

const curbForm = $('#curb-form');
const curbResultado = $('#curb-resultado');

function atualizarCURB() {
  const r = calcularCURB65({
    confusao: $('#cu-confusao').checked,
    ureiaElevada: $('#cu-ureia').checked,
    freqRespiratoria: $('#cu-fr').checked,
    pressaoArterial: $('#cu-pa').checked,
    idade65: $('#cu-idade').checked,
  });
  curbResultado.dataset.nivel = r.nivel;
  $('#cu-pontos').textContent = r.pontos;
  $('#cu-recomendacao').textContent = r.recomendacao;
}
curbForm.addEventListener('change', atualizarCURB);
atualizarCURB();

function resumoCURB() {
  const r = calcularCURB65({
    confusao: $('#cu-confusao').checked,
    ureiaElevada: $('#cu-ureia').checked,
    freqRespiratoria: $('#cu-fr').checked,
    pressaoArterial: $('#cu-pa').checked,
    idade65: $('#cu-idade').checked,
  });
  return [
    'Calculadora de urgência · CURB-65 (gravidade de pneumonia)',
    `Pontuação: ${r.pontos} / 5`,
    r.recomendacao,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('curb65', resumoCURB, () => `CURB-65 — ${$('#cu-pontos').textContent} / 5 pontos`);

/* ---------- Wells TVP ---------- */

const tvpForm = $('#tvp-form');
const tvpResultado = $('#tvp-resultado');

function atualizarTVP() {
  const campos = [
    'cancroAtivo', 'paralisiaOuImobilizacao', 'acamado3diasOuCirurgia', 'dorLocalizada',
    'pernaTodaEdemaciada', 'edemaGemelar3cm', 'edemaComFovea', 'veiasColaterais', 'tvpPrevia',
  ];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#tvp-${c}`).checked; });
  fatores.diagnosticoAlternativo = $('#tvp-diagnosticoAlternativo').checked;

  const r = calcularWellsTVP(fatores);
  tvpResultado.dataset.nivel = r.nivel;
  $('#tvp-pontos').textContent = r.pontos;
  $('#tvp-probabilidade').textContent = `TVP ${r.probabilidade}`;
  $('#tvp-recomendacao').textContent = r.recomendacao;
}
tvpForm.addEventListener('change', atualizarTVP);
atualizarTVP();

function resumoTVP() {
  const campos = [
    'cancroAtivo', 'paralisiaOuImobilizacao', 'acamado3diasOuCirurgia', 'dorLocalizada',
    'pernaTodaEdemaciada', 'edemaGemelar3cm', 'edemaComFovea', 'veiasColaterais', 'tvpPrevia',
  ];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#tvp-${c}`).checked; });
  fatores.diagnosticoAlternativo = $('#tvp-diagnosticoAlternativo').checked;
  const r = calcularWellsTVP(fatores);
  return [
    'Calculadora de urgência · Wells (TVP)',
    `Pontuação: ${r.pontos} pontos — TVP ${r.probabilidade}`,
    r.recomendacao,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('tvp', resumoTVP, () => `Wells TVP — ${$('#tvp-probabilidade').textContent}`);

/* ---------- Wells TEP ---------- */

const tepForm = $('#tep-form');
const tepResultado = $('#tep-resultado');

function atualizarTEP() {
  const campos = [
    'sinaisTVP', 'tepDiagnosticoMaisProvavel', 'frequenciaCardiaca100',
    'imobilizacaoOuCirurgia', 'tvpTepPrevio', 'hemoptises', 'neoplasia',
  ];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#tep-${c}`).checked; });

  const r = calcularWellsTEP(fatores);
  tepResultado.dataset.nivel = r.nivel;
  $('#tep-pontos').textContent = r.pontos;
  $('#tep-probabilidade').textContent = `TEP ${r.probabilidade}`;
  $('#tep-recomendacao').textContent = r.recomendacao;
}
tepForm.addEventListener('change', atualizarTEP);
atualizarTEP();

function resumoTEP() {
  const campos = [
    'sinaisTVP', 'tepDiagnosticoMaisProvavel', 'frequenciaCardiaca100',
    'imobilizacaoOuCirurgia', 'tvpTepPrevio', 'hemoptises', 'neoplasia',
  ];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#tep-${c}`).checked; });
  const r = calcularWellsTEP(fatores);
  return [
    'Calculadora de urgência · Wells (TEP)',
    `Pontuação: ${r.pontos} pontos — TEP ${r.probabilidade}`,
    r.recomendacao,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('tep', resumoTEP, () => `Wells TEP — ${$('#tep-probabilidade').textContent}`);

/* ---------- QTc ---------- */

const qtcForm = $('#qtc-form');
const qtcResultado = $('#qtc-resultado');

let resultadoQTc = null;

function atualizarQTc() {
  const r = calcularQTc($('#qtc-qt').value, $('#qtc-fc').value, $('#qtc-sexo').checked);
  const ok = $('#qtc-ok');
  const vazio = $('#qtc-vazio');
  const acoes = $('#result-actions-qtc');
  if (!r.ok) {
    resultadoQTc = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#qtc-motivo').textContent = r.motivo;
    return;
  }
  resultadoQTc = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  qtcResultado.dataset.nivel = r.nivel;
  $('#qtc-bazett').textContent = r.bazett;
  $('#qtc-fridericia').textContent = r.fridericia;
  $('#qtc-limiar').textContent = `Limiar normal: < ${r.limiarNormal} ms`;
}
qtcForm.addEventListener('input', atualizarQTc);
qtcForm.addEventListener('change', atualizarQTc);
atualizarQTc();

function resumoQTc() {
  if (!resultadoQTc) return null;
  const r = resultadoQTc;
  return [
    'Calculadora de urgência · QTc',
    `QT: ${$('#qtc-qt').value} ms · Frequência cardíaca: ${$('#qtc-fc').value} bpm · Sexo feminino: ${$('#qtc-sexo').checked ? 'sim' : 'não'}`,
    `QTc (Bazett): ${r.bazett} ms`,
    `QTc (Fridericia): ${r.fridericia} ms`,
    `Limiar normal: < ${r.limiarNormal} ms`,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('qtc', resumoQTc, () => `QTc — ${resultadoQTc ? resultadoQTc.bazett : ''} ms (Bazett)`);

/* ---------- Glasgow ---------- */

const gcsForm = $('#gcs-form');
const gcsResultado = $('#gcs-resultado');

function atualizarGCS() {
  const r = calcularGlasgow(
    $('input[name="gcs-e"]:checked')?.value,
    $('input[name="gcs-v"]:checked')?.value,
    $('input[name="gcs-m"]:checked')?.value
  );
  gcsResultado.dataset.nivel = r.nivel;
  $('#gcs-pontos').textContent = r.pontos;
  $('#gcs-gravidade').textContent = r.gravidade;
}
gcsForm.addEventListener('change', atualizarGCS);
atualizarGCS();

function resumoGCS() {
  const r = calcularGlasgow(
    $('input[name="gcs-e"]:checked')?.value,
    $('input[name="gcs-v"]:checked')?.value,
    $('input[name="gcs-m"]:checked')?.value
  );
  if (!r.ok) return null;
  return [
    'Calculadora de urgência · Escala de Coma de Glasgow',
    `Pontuação: ${r.pontos} / 15`,
    r.gravidade,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('gcs', resumoGCS, () => `Glasgow — ${$('#gcs-pontos').textContent} / 15`);

/* ---------- HEART ---------- */

const heartForm = $('#heart-form');
const heartResultado = $('#heart-resultado');

function atualizarHEART() {
  const campos = ['historia', 'ecg', 'idade', 'fatoresRisco', 'troponina'];
  const pontuacoes = {};
  campos.forEach((c) => { pontuacoes[c] = $(`input[name="heart-${c}"]:checked`)?.value; });
  const r = calcularHEART(pontuacoes);
  heartResultado.dataset.nivel = r.nivel;
  $('#heart-pontos').textContent = r.pontos;
  $('#heart-risco').textContent = r.risco;
}
heartForm.addEventListener('change', atualizarHEART);
atualizarHEART();

function resumoHEART() {
  const campos = ['historia', 'ecg', 'idade', 'fatoresRisco', 'troponina'];
  const pontuacoes = {};
  campos.forEach((c) => { pontuacoes[c] = $(`input[name="heart-${c}"]:checked`)?.value; });
  const r = calcularHEART(pontuacoes);
  if (!r.ok) return null;
  return [
    'Calculadora de urgência · HEART score',
    `Pontuação: ${r.pontos} / 10`,
    r.risco,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('heart', resumoHEART, () => `HEART score — ${$('#heart-pontos').textContent} / 10`);

/* ---------- NEWS2 ---------- */

const newsForm = $('#news-form');
const newsResultado = $('#news-resultado');

let resultadoNEWS2 = null;

function dadosNEWS2() {
  return {
    freqRespiratoria: $('#news-fr').value,
    spo2: $('#news-spo2').value,
    oxigenioSuplementar: $('#news-o2').checked,
    pressaoSistolica: $('#news-pas').value,
    freqCardiaca: $('#news-fc').value,
    consciencia: $('input[name="news-consciencia"]:checked')?.value,
    temperatura: $('#news-temp').value.replace(',', '.'),
  };
}

function atualizarNEWS2() {
  const r = calcularNEWS2(dadosNEWS2());
  const ok = $('#news-ok');
  const vazio = $('#news-vazio');
  const acoes = $('#result-actions-news2');
  if (!r.ok) {
    resultadoNEWS2 = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#news-motivo').textContent = r.motivo;
    return;
  }
  resultadoNEWS2 = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  newsResultado.dataset.nivel = r.nivel;
  $('#news-pontos').textContent = r.pontos;
  $('#news-resposta').textContent = r.resposta;
}
newsForm.addEventListener('input', atualizarNEWS2);
newsForm.addEventListener('change', atualizarNEWS2);
atualizarNEWS2();

function resumoNEWS2() {
  if (!resultadoNEWS2) return null;
  const r = resultadoNEWS2;
  const d = dadosNEWS2();
  return [
    'Calculadora de urgência · NEWS2',
    `FR: ${d.freqRespiratoria}/min · SpO₂: ${d.spo2}% (${d.oxigenioSuplementar ? 'com' : 'sem'} O₂ suplementar) · PAS: ${d.pressaoSistolica} mmHg · FC: ${d.freqCardiaca} bpm · Temp.: ${d.temperatura} °C · Consciência: ${d.consciencia === 'alerta' ? 'alerta' : 'não alerta'}`,
    `Pontuação: ${r.pontos} / 20`,
    r.resposta,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('news2', resumoNEWS2, () => `NEWS2 — ${$('#news-pontos').textContent} / 20`);

/* ---------- CRB-65 ---------- */

const crbForm = $('#crb-form');
const crbResultado = $('#crb-resultado');

function atualizarCRB() {
  const r = calcularCRB65({
    confusao: $('#crb-confusao').checked,
    freqRespiratoria: $('#crb-fr').checked,
    pressaoArterial: $('#crb-pa').checked,
    idade65: $('#crb-idade').checked,
  });
  crbResultado.dataset.nivel = r.nivel;
  $('#crb-pontos').textContent = r.pontos;
  $('#crb-recomendacao').textContent = r.recomendacao;
}
crbForm.addEventListener('change', atualizarCRB);
atualizarCRB();

function resumoCRB() {
  const r = calcularCRB65({
    confusao: $('#crb-confusao').checked,
    freqRespiratoria: $('#crb-fr').checked,
    pressaoArterial: $('#crb-pa').checked,
    idade65: $('#crb-idade').checked,
  });
  return [
    'Calculadora de urgência · CRB-65 (gravidade de pneumonia, sem análises)',
    `Pontuação: ${r.pontos} / 4`,
    r.recomendacao,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('crb65', resumoCRB, () => `CRB-65 — ${$('#crb-pontos').textContent} / 4 pontos`);

/* ---------- PERC ---------- */

const percForm = $('#perc-form');
const percResultado = $('#perc-resultado');

function atualizarPERC() {
  const campos = ['idade50', 'fc100', 'spo295', 'edemaUnilateral', 'hemoptises', 'cirurgiaOuTrauma', 'tvpTepPrevio', 'hormonasExogenas'];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#perc-${c}`).checked; });
  const r = calcularPERC(fatores);
  percResultado.dataset.nivel = r.nivel;
  $('#perc-positivos').textContent = `${r.positivos} / 8 critérios presentes`;
  $('#perc-veredito').textContent = r.negativo ? 'PERC negativo' : 'PERC positivo';
  $('#perc-recomendacao').textContent = r.recomendacao;
}
percForm.addEventListener('change', atualizarPERC);
atualizarPERC();

function resumoPERC() {
  const campos = ['idade50', 'fc100', 'spo295', 'edemaUnilateral', 'hemoptises', 'cirurgiaOuTrauma', 'tvpTepPrevio', 'hormonasExogenas'];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#perc-${c}`).checked; });
  const r = calcularPERC(fatores);
  return [
    'Calculadora de urgência · Critérios PERC',
    `${r.positivos} / 8 critérios presentes — ${r.negativo ? 'PERC negativo' : 'PERC positivo'}`,
    r.recomendacao,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('perc', resumoPERC, () => `PERC — ${$('#perc-veredito').textContent}`);

/* ---------- Ottawa ---------- */

const ottawaForm = $('#ottawa-form');

function atualizarOttawa() {
  const tornozelo = calcularOttawaTornozelo({
    dorZonaMaleolar: $('#ot-dorZonaMaleolar').checked,
    dorMaleoloLateral: $('#ot-dorMaleoloLateral').checked,
    dorMaleoloMedial: $('#ot-dorMaleoloMedial').checked,
    dorZonaMedioPe: $('#ot-dorZonaMedioPe').checked,
    dor5Metatarso: $('#ot-dor5Metatarso').checked,
    dorNavicular: $('#ot-dorNavicular').checked,
    incapazSuportarPeso: $('#ot-incapazSuportarPesoTornozelo').checked,
  });
  const joelho = calcularOttawaJoelho({
    idade55: $('#ot-idade55').checked,
    dorCabecaPeroneo: $('#ot-dorCabecaPeroneo').checked,
    dorIsoladaPatela: $('#ot-dorIsoladaPatela').checked,
    incapazFletir90: $('#ot-incapazFletir90').checked,
    incapazSuportarPeso: $('#ot-incapazSuportarPesoJoelho').checked,
  });

  $('#ot-tornozelo-veredito').textContent = tornozelo.radiografiaTornozelo ? 'Radiografia do tornozelo indicada' : 'Radiografia do tornozelo não indicada';
  $('#ot-tornozelo-veredito').closest('.stat').dataset.nivel = tornozelo.radiografiaTornozelo ? 'alto' : 'baixo';
  $('#ot-pe-veredito').textContent = tornozelo.radiografiaPe ? 'Radiografia do pé indicada' : 'Radiografia do pé não indicada';
  $('#ot-pe-veredito').closest('.stat').dataset.nivel = tornozelo.radiografiaPe ? 'alto' : 'baixo';
  $('#ot-joelho-veredito').textContent = joelho.indicada ? 'Radiografia do joelho indicada' : 'Radiografia do joelho não indicada';
  $('#ot-joelho-veredito').closest('.stat').dataset.nivel = joelho.indicada ? 'alto' : 'baixo';
}
ottawaForm.addEventListener('change', atualizarOttawa);
atualizarOttawa();

/* ---------- Alvarado ---------- */

const alvaradoForm = $('#alvarado-form');
const alvaradoResultado = $('#alvarado-resultado');

function atualizarAlvarado() {
  const campos = ['migracaoDor', 'anorexia', 'nauseasVomitos', 'dorFID', 'reboundPositivo', 'febre', 'leucocitose', 'desvioEsquerdo'];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#al-${c}`).checked; });
  const r = calcularAlvarado(fatores);
  alvaradoResultado.dataset.nivel = r.nivel;
  $('#al-pontos').textContent = r.pontos;
  $('#al-recomendacao').textContent = r.recomendacao;
}
alvaradoForm.addEventListener('change', atualizarAlvarado);
atualizarAlvarado();

function resumoAlvarado() {
  const campos = ['migracaoDor', 'anorexia', 'nauseasVomitos', 'dorFID', 'reboundPositivo', 'febre', 'leucocitose', 'desvioEsquerdo'];
  const fatores = {};
  campos.forEach((c) => { fatores[c] = $(`#al-${c}`).checked; });
  const r = calcularAlvarado(fatores);
  return [
    'Calculadora de urgência · Score de Alvarado (apendicite)',
    `Pontuação: ${r.pontos} / 10`,
    r.recomendacao,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('alvarado', resumoAlvarado, () => `Score de Alvarado — ${$('#al-pontos').textContent} / 10`);

/* ---------- Índice de choque ---------- */

const icForm = $('#ic-form');
const icResultado = $('#ic-resultado');

let resultadoIndiceChoque = null;

function atualizarIndiceChoque() {
  const r = calcularIndiceChoque($('#ic-fc').value, $('#ic-pas').value);
  const ok = $('#ic-ok');
  const vazio = $('#ic-vazio');
  const acoes = $('#result-actions-choque');
  if (!r.ok) {
    resultadoIndiceChoque = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    return;
  }
  resultadoIndiceChoque = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  icResultado.dataset.nivel = r.nivel;
  $('#ic-valor').textContent = r.indice.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  $('#ic-interpretacao').textContent = r.interpretacao;
}
icForm.addEventListener('input', atualizarIndiceChoque);
atualizarIndiceChoque();

function resumoIndiceChoque() {
  if (!resultadoIndiceChoque) return null;
  const r = resultadoIndiceChoque;
  return [
    'Calculadora de urgência · Índice de choque',
    `Frequência cardíaca: ${$('#ic-fc').value} bpm · PA sistólica: ${$('#ic-pas').value} mmHg`,
    `Índice de choque: ${r.indice.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    r.interpretacao,
    ...RODAPE,
  ].join('\n');
}
ligarAcoes('choque', resumoIndiceChoque, () => `Índice de choque — ${$('#ic-valor').textContent}`);

const params = new URLSearchParams(location.search);
const validos = ['curb65', 'tvp', 'tep', 'qtc', 'gcs', 'heart', 'news2', 'crb65', 'perc', 'ottawa', 'alvarado', 'choque'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'curb65');
