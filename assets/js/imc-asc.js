import { PESO_MIN, PESO_MAX, ALTURA_MIN, ALTURA_MAX, calcularIMC, avaliarCintura } from './imc-asc-core.js';

const $ = (sel) => document.querySelector(sel);
const nf1 = new Intl.NumberFormat('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const pesoInput = $('#peso');
const alturaInput = $('#altura');
const pesoSlider = $('#peso-slider');
const alturaSlider = $('#altura-slider');
const resultado = $('#resultado');

const LIMITES = {
  peso: { min: PESO_MIN, max: PESO_MAX },
  altura: { min: ALTURA_MIN, max: ALTURA_MAX },
};

const CAMPOS = {
  peso: { input: pesoInput, slider: pesoSlider },
  altura: { input: alturaInput, slider: alturaSlider },
};

/* ---------- Estado inicial a partir do URL (para partilhar) ---------- */

const params = new URLSearchParams(location.search);
if (params.has('peso')) pesoInput.value = params.get('peso').replace(',', '.');
if (params.has('altura')) alturaInput.value = params.get('altura').replace(',', '.');

function pct(v, { min, max }) {
  const c = Math.min(Math.max(v, min), max);
  return ((c - min) / (max - min)) * 100;
}

function sincronizarSlider(campo) {
  const { input, slider } = CAMPOS[campo];
  const v = parseFloat(input.value);
  if (Number.isFinite(v)) {
    slider.value = v;
    slider.style.setProperty('--pct', `${pct(v, LIMITES[campo])}%`);
  }
}

Object.keys(CAMPOS).forEach((campo) => {
  const { input, slider } = CAMPOS[campo];
  input.addEventListener('input', () => {
    sincronizarSlider(campo);
    atualizar();
  });
  slider.addEventListener('input', () => {
    input.value = slider.value;
    slider.style.setProperty('--pct', `${pct(parseFloat(slider.value), LIMITES[campo])}%`);
    atualizar();
  });
});

// Botões −/+ (mantendo premido repete)
document.querySelectorAll('.stepper').forEach((btn) => {
  let timer;
  let repete;
  const campo = btn.dataset.alvo;
  const { input, slider, min, max } = { ...CAMPOS[campo], ...LIMITES[campo] };
  const passo = () => {
    const atual = parseFloat(input.value) || min;
    const casas = campo === 'peso' ? 1 : 0;
    const f = 10 ** casas;
    const novo = Math.round((atual + parseFloat(btn.dataset.step)) * f) / f;
    input.value = Math.min(Math.max(novo, min), max);
    sincronizarSlider(campo);
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

/* ---------- Gauge de IMC ---------- */

// Escala visual do mostrador: 15 a 45 kg/m², cobrindo todas as categorias.
const GAUGE_MIN = 15;
const GAUGE_MAX = 45;

function posicionarMarcador(imc) {
  const marcador = $('#imc-marker');
  const c = Math.min(Math.max(imc, GAUGE_MIN), GAUGE_MAX);
  const p = ((c - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100;
  marcador.style.left = `${p}%`;
}

/* ---------- Número animado ---------- */

let imcMostrado = 0;
let anim;
function animarNumero(el, alvo) {
  cancelAnimationFrame(anim);
  const de = imcMostrado;
  const t0 = performance.now();
  const dur = 550;
  const passo = (t) => {
    const k = Math.min((t - t0) / dur, 1);
    const e = 1 - Math.pow(1 - k, 3);
    const v = de + (alvo - de) * e;
    el.textContent = nf1.format(v);
    imcMostrado = v;
    if (k < 1) anim = requestAnimationFrame(passo);
    else imcMostrado = alvo;
  };
  anim = requestAnimationFrame(passo);
}

/* ---------- Atualizar ---------- */

let resultadoAtual = null;

function atualizar() {
  const r = calcularIMC(pesoInput.value.replace(',', '.'), alturaInput.value.replace(',', '.'));

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

  resultadoAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;

  resultado.dataset.categoria = r.categoria.id;
  animarNumero($('#res-imc'), r.imc);
  $('#res-badge').textContent = r.categoria.nome;
  $('#res-sub').textContent = `${nf1.format(r.peso)} kg · ${r.altura} cm`;

  $('#st-mosteller').innerHTML = `${nf2.format(r.ascMosteller)} <small>m²</small>`;
  $('#st-dubois').innerHTML = `${nf2.format(r.ascDuBois)} <small>m²</small>`;

  posicionarMarcador(r.imc);
  atualizarCintura(r);

  // Guarda no URL para partilhar
  const q = new URLSearchParams({ peso: String(r.peso), altura: String(r.altura) });
  history.replaceState(null, '', `?${q}`);
}

/* ---------- Perímetro abdominal (opcional) ---------- */

const cinturaInput = $('#cintura');
const cinturaSexo = $('#cintura-sexo');

function atualizarCintura(r) {
  const c = cinturaInput.value.trim() === '' ? null : avaliarCintura(cinturaInput.value.replace(',', '.'), r.altura, cinturaSexo.checked);
  r.cintura = c && c.ok ? c : null;
  $('#cintura-stats').hidden = !r.cintura;
  if (!r.cintura) return;
  $('#st-cintura-box').dataset.nivel = c.riscoCintura.nivel;
  $('#st-cintura').innerHTML = `${c.perimetro} <small>cm · ${c.riscoCintura.nome.toLowerCase()}</small>`;
  $('#st-razao-box').dataset.nivel = c.riscoRazao.nivel;
  $('#st-razao').innerHTML = `${nf2.format(c.razao)} <small>${c.riscoRazao.nome.toLowerCase()}</small>`;
}
cinturaInput.addEventListener('input', atualizar);
cinturaSexo.addEventListener('change', atualizar);

/* ---------- Ações: email e impressão ---------- */

function resumoTexto(r) {
  const linhas = [
    'Calculadora de IMC e ASC',
    `Peso: ${nf1.format(r.peso)} kg · Altura: ${r.altura} cm`,
    `IMC: ${nf1.format(r.imc)} kg/m² — ${r.categoria.nome}`,
    `Área de superfície corporal (Mosteller): ${nf2.format(r.ascMosteller)} m²`,
    `Área de superfície corporal (Du Bois): ${nf2.format(r.ascDuBois)} m²`,
    ...(r.cintura
      ? [
          `Perímetro abdominal: ${r.cintura.perimetro} cm — ${r.cintura.riscoCintura.nome} (limiares ${r.cintura.limiar1}/${r.cintura.limiar2} cm)`,
          `Razão cintura/altura: ${nf2.format(r.cintura.razao)} — ${r.cintura.riscoRazao.nome}`,
        ]
      : []),
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

$('#btn-email').addEventListener('click', () => {
  if (!resultadoAtual) return;
  const assunto = `IMC ${nf1.format(resultadoAtual.imc)} kg/m² — ${resultadoAtual.categoria.nome}`;
  const corpo = resumoTexto(resultadoAtual);
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
});

$('#btn-print').addEventListener('click', () => {
  window.print();
});

sincronizarSlider('peso');
sincronizarSlider('altura');
atualizar();
