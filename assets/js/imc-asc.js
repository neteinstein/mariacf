import { PESO_MIN, PESO_MAX, ALTURA_MIN, ALTURA_MAX, calcularIMC } from './imc-asc-core.js';

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

function atualizar() {
  const r = calcularIMC(pesoInput.value.replace(',', '.'), alturaInput.value.replace(',', '.'));

  const ok = $('#res-ok');
  const vazio = $('#res-empty');

  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#res-motivo').textContent = r.motivo;
    return;
  }

  ok.hidden = false;
  vazio.hidden = true;

  resultado.dataset.categoria = r.categoria.id;
  animarNumero($('#res-imc'), r.imc);
  $('#res-badge').textContent = r.categoria.nome;
  $('#res-sub').textContent = `${nf1.format(r.peso)} kg · ${r.altura} cm`;

  $('#st-mosteller').innerHTML = `${nf2.format(r.ascMosteller)} <small>m²</small>`;
  $('#st-dubois').innerHTML = `${nf2.format(r.ascDuBois)} <small>m²</small>`;

  posicionarMarcador(r.imc);

  // Guarda no URL para partilhar
  const q = new URLSearchParams({ peso: String(r.peso), altura: String(r.altura) });
  history.replaceState(null, '', `?${q}`);
}

sincronizarSlider('peso');
sincronizarSlider('altura');
atualizar();
