import { calcularPorDUM, calcularPorEcografia, paraData, paraISO, marcosGravidez } from './dpp-core.js';

const $ = (sel) => document.querySelector(sel);
const fmtData = new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
const fmtCurta = new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long' });

const form = $('#calc-form');
const dumInput = $('#dum');
const cicloInput = $('#ciclo');
const cicloSlider = $('#ciclo-slider');
const dataEcoInput = $('#data-eco');
const semanasEcoInput = $('#semanas-eco');
const diasEcoInput = $('#dias-eco');
const passoDum = $('#passo-dum');
const passoEco = $('#passo-eco');
const resultado = $('#resultado');

const hoje = new Date();
const hojeISO = paraISO(hoje);

function estadoMetodo() {
  return form.querySelector('input[name="metodo"]:checked').value;
}

/* ---------- Estado inicial a partir do URL (para partilhar) ---------- */

const params = new URLSearchParams(location.search);
const metodoUrl = params.get('metodo');
if (metodoUrl === 'eco') {
  $('#met-eco').checked = true;
} else {
  $('#met-dum').checked = true;
}

dumInput.value = params.get('dum') || hojeISO;
dumInput.max = hojeISO;
if (params.has('ciclo')) cicloInput.value = params.get('ciclo');

dataEcoInput.value = params.get('data-eco') || hojeISO;
dataEcoInput.max = hojeISO;
if (params.has('semanas-eco')) semanasEcoInput.value = params.get('semanas-eco');
if (params.has('dias-eco')) diasEcoInput.value = params.get('dias-eco');

function mostrarPasso() {
  const metodo = estadoMetodo();
  passoDum.hidden = metodo !== 'dum';
  passoEco.hidden = metodo !== 'eco';
}

form.querySelectorAll('input[name="metodo"]').forEach((r) => {
  r.addEventListener('change', () => {
    mostrarPasso();
    atualizar();
  });
});

/* ---------- Ciclo (peso/slider) ---------- */

function pct(v, min, max) {
  const c = Math.min(Math.max(v, min), max);
  return ((c - min) / (max - min)) * 100;
}

function sincronizarCiclo() {
  const v = parseFloat(cicloInput.value);
  if (Number.isFinite(v)) {
    cicloSlider.value = v;
    cicloSlider.style.setProperty('--pct', `${pct(v, 21, 45)}%`);
  }
}

cicloInput.addEventListener('input', () => {
  sincronizarCiclo();
  atualizar();
});
cicloSlider.addEventListener('input', () => {
  cicloInput.value = cicloSlider.value;
  cicloSlider.style.setProperty('--pct', `${pct(parseFloat(cicloSlider.value), 21, 45)}%`);
  atualizar();
});

document.querySelectorAll('.stepper[data-alvo="ciclo"]').forEach((btn) => {
  let timer;
  let repete;
  const passo = () => {
    const atual = parseFloat(cicloInput.value) || 28;
    const novo = Math.min(Math.max(atual + parseFloat(btn.dataset.step), 21), 45);
    cicloInput.value = novo;
    sincronizarCiclo();
    atualizar();
  };
  const parar = () => {
    clearTimeout(timer);
    clearInterval(repete);
  };
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    passo();
    timer = setTimeout(() => (repete = setInterval(passo, 90)), 400);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, parar));
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      passo();
    }
  });
});

[dumInput, dataEcoInput, semanasEcoInput, diasEcoInput].forEach((el) => {
  el.addEventListener('input', () => atualizar());
});

/* ---------- Atualizar ---------- */

const NOME_TRIMESTRE = { 1: '1.º trimestre', 2: '2.º trimestre', 3: '3.º trimestre' };

let resultadoAtual = null;

function atualizar() {
  const metodo = estadoMetodo();
  const r =
    metodo === 'eco'
      ? calcularPorEcografia(dataEcoInput.value, semanasEcoInput.value, diasEcoInput.value, hoje)
      : calcularPorDUM(dumInput.value, cicloInput.value, hoje);

  const ok = $('#res-ok');
  const vazio = $('#res-empty');
  const acoes = $('#result-actions');

  if (!r.ok) {
    resultadoAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#res-motivo').textContent = r.motivo;
    return;
  }

  resultadoAtual = { ...r, metodo };
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;

  $('#res-dpp').textContent = fmtData.format(r.dpp);
  $('#res-sub').textContent =
    metodo === 'eco'
      ? `A partir da ecografia de ${fmtData.format(paraData(dataEcoInput.value))}`
      : `A partir da última menstruação em ${fmtData.format(paraData(dumInput.value))}`;

  $('#st-idade').innerHTML = `${r.semanas} <small>sem</small> ${r.dias} <small>d</small>`;
  $('#st-trimestre').textContent = NOME_TRIMESTRE[r.trimestre] || '—';

  const restamK = $('#st-restam-k');
  const restam = $('#st-restam');
  if (r.atrasada) {
    restamK.textContent = 'Após a DPP';
    restam.innerHTML = `${Math.abs(r.diasRestantes)} <small>dias</small>`;
  } else {
    restamK.textContent = 'Faltam';
    restam.innerHTML = `${r.diasRestantes} <small>dias</small>`;
  }

  const avisos = [];
  if (r.atrasada) {
    avisos.push(
      `<div class="notice"><span class="ni" aria-hidden="true">💡</span><p>A DPP já passou. Confirme a evolução da gravidez com o seu obstetra.</p></div>`
    );
  }
  $('#notices').innerHTML = avisos.join('');
  mostrarMarcos(r.dpp);

  const q = new URLSearchParams({ metodo });
  if (metodo === 'eco') {
    q.set('data-eco', dataEcoInput.value);
    q.set('semanas-eco', semanasEcoInput.value);
    q.set('dias-eco', diasEcoInput.value);
  } else {
    q.set('dum', dumInput.value);
    q.set('ciclo', cicloInput.value);
  }
  history.replaceState(null, '', `?${q}`);
}

/* ---------- Calendário da vigilância ---------- */

const ETIQUETA_MARCO = { passada: 'Já passou', agora: 'Agora', futura: null };

function periodo(m) {
  const mesmoDia = m.dataInicio.getTime() === m.dataFim.getTime();
  return mesmoDia ? fmtCurta.format(m.dataInicio) : `${fmtCurta.format(m.dataInicio)} – ${fmtCurta.format(m.dataFim)}`;
}

function mostrarMarcos(dpp) {
  const lista = $('#marcos');
  lista.replaceChildren(...marcosGravidez(dpp, hoje).map((m) => {
    const li = document.createElement('li');
    li.className = 'agenda-item';
    li.dataset.estado = m.estado;
    li.innerHTML = '<div class="agenda-quando"></div><div class="agenda-corpo"><strong></strong><span></span></div>';
    li.querySelector('.agenda-quando').textContent = periodo(m);
    li.querySelector('strong').textContent = m.titulo;
    li.querySelector('span').textContent = m.detalhe;
    if (ETIQUETA_MARCO[m.estado]) {
      const e = document.createElement('span');
      e.className = 'agenda-etiqueta';
      e.textContent = ETIQUETA_MARCO[m.estado];
      li.appendChild(e);
    }
    return li;
  }));
}

/* ---------- Ações: email e impressão ---------- */

function resumoTexto(r) {
  const linhas = [
    'Calculadora da Data Provável de Parto',
    r.metodo === 'eco'
      ? `A partir da ecografia de ${fmtData.format(paraData(dataEcoInput.value))}`
      : `A partir da última menstruação em ${fmtData.format(paraData(dumInput.value))}`,
    `Data provável de parto: ${fmtData.format(r.dpp)}`,
    `Idade gestacional: ${r.semanas} semanas e ${r.dias} dias (${NOME_TRIMESTRE[r.trimestre] || '—'})`,
    r.atrasada
      ? `Após a DPP: ${Math.abs(r.diasRestantes)} dias`
      : `Faltam: ${r.diasRestantes} dias`,
  ];
  if (r.atrasada) linhas.push('A DPP já passou. Confirme a evolução da gravidez com o seu obstetra.');
  linhas.push('', 'Calendário da vigilância:', ...marcosGravidez(r.dpp, hoje).map((m) => `${periodo(m)}: ${m.titulo}`));
  linhas.push('', 'Informação de apoio — não substitui aconselhamento médico.', location.href);
  return linhas.join('\n');
}

$('#btn-email').addEventListener('click', () => {
  if (!resultadoAtual) return;
  const assunto = `Data provável de parto — ${fmtData.format(resultadoAtual.dpp)}`;
  const corpo = resumoTexto(resultadoAtual);
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
});

$('#btn-print').addEventListener('click', () => {
  window.print();
});

mostrarPasso();
sincronizarCiclo();
atualizar();
