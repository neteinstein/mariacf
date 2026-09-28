import { calcularCURB65, calcularWellsTVP, calcularWellsTEP, calcularQTc, calcularGlasgow, calcularHEART, calcularNEWS2 } from './urgencia-core.js';
import { calcularCRB65, calcularPERC, calcularOttawaTornozelo, calcularOttawaJoelho, calcularAlvarado } from './urgencia2-core.js';

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

/* ---------- QTc ---------- */

const qtcForm = $('#qtc-form');
const qtcResultado = $('#qtc-resultado');

function atualizarQTc() {
  const r = calcularQTc($('#qtc-qt').value, $('#qtc-fc').value, $('#qtc-sexo').checked);
  const ok = $('#qtc-ok');
  const vazio = $('#qtc-vazio');
  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#qtc-motivo').textContent = r.motivo;
    return;
  }
  ok.hidden = false;
  vazio.hidden = true;
  qtcResultado.dataset.nivel = r.nivel;
  $('#qtc-bazett').textContent = r.bazett;
  $('#qtc-fridericia').textContent = r.fridericia;
  $('#qtc-limiar').textContent = `Limiar normal: < ${r.limiarNormal} ms`;
}
qtcForm.addEventListener('input', atualizarQTc);
qtcForm.addEventListener('change', atualizarQTc);
atualizarQTc();

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

/* ---------- NEWS2 ---------- */

const newsForm = $('#news-form');
const newsResultado = $('#news-resultado');

function atualizarNEWS2() {
  const r = calcularNEWS2({
    freqRespiratoria: $('#news-fr').value,
    spo2: $('#news-spo2').value,
    oxigenioSuplementar: $('#news-o2').checked,
    pressaoSistolica: $('#news-pas').value,
    freqCardiaca: $('#news-fc').value,
    consciencia: $('input[name="news-consciencia"]:checked')?.value,
    temperatura: $('#news-temp').value.replace(',', '.'),
  });
  const ok = $('#news-ok');
  const vazio = $('#news-vazio');
  if (!r.ok) { ok.hidden = true; vazio.hidden = false; $('#news-motivo').textContent = r.motivo; return; }
  ok.hidden = false;
  vazio.hidden = true;
  newsResultado.dataset.nivel = r.nivel;
  $('#news-pontos').textContent = r.pontos;
  $('#news-resposta').textContent = r.resposta;
}
newsForm.addEventListener('input', atualizarNEWS2);
newsForm.addEventListener('change', atualizarNEWS2);
atualizarNEWS2();

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

const params = new URLSearchParams(location.search);
const validos = ['curb65', 'tvp', 'tep', 'qtc', 'gcs', 'heart', 'news2', 'crb65', 'perc', 'ottawa', 'alvarado'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'curb65');
