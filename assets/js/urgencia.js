import { calcularCURB65, calcularWellsTVP, calcularWellsTEP, calcularQTc } from './urgencia-core.js';

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

const params = new URLSearchParams(location.search);
const validos = ['curb65', 'tvp', 'tep', 'qtc'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'curb65');
