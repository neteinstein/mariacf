import {
  MEDICAMENTOS,
  PESO_MIN,
  PESO_MAX,
  calcularDose,
  proximasTomas,
  seringas,
} from './doses-core.js';

const $ = (sel) => document.querySelector(sel);
const nf = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 1 });
const nf1 = new Intl.NumberFormat('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmtHora = new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit' });

const pesoInput = $('#peso');
const slider = $('#peso-slider');
const chips = $('#conc-chips');
const resultado = $('#resultado');
const horaInput = $('#hora');

const estado = {
  peso: 12,
  med: 'paracetamol',
  conc: 40,
  custom: false,
};

/* ---------- Estado inicial a partir do URL (para partilhar) ---------- */

const params = new URLSearchParams(location.search);
if (params.has('peso')) estado.peso = parseFloat(params.get('peso').replace(',', '.'));
if (MEDICAMENTOS[params.get('med')]) estado.med = params.get('med');
if (params.has('c')) {
  const c = parseFloat(params.get('c'));
  if (c > 0) {
    estado.conc = c;
    estado.custom = !MEDICAMENTOS[estado.med].concentracoes.some((x) => x.mgPorMl === c);
  }
} else {
  estado.conc = MEDICAMENTOS[estado.med].concentracoes[0].mgPorMl;
}

document.querySelector(`input[name="med"][value="${estado.med}"]`).checked = true;
if (Number.isFinite(estado.peso)) pesoInput.value = estado.peso;

const agora = new Date();
horaInput.value = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;

/* ---------- Concentrações ---------- */

function desenharChips() {
  const med = MEDICAMENTOS[estado.med];
  chips.innerHTML = '';
  med.concentracoes.forEach((c, i) => {
    const id = `conc-${i}`;
    const div = document.createElement('div');
    div.className = 'chip';
    div.innerHTML = `
      <input type="radio" name="conc" id="${id}" value="${c.mgPorMl}">
      <label for="${id}"><strong>${c.rotulo}</strong><span>${c.detalhe}</span></label>`;
    const input = div.querySelector('input');
    input.checked = !estado.custom && c.mgPorMl === estado.conc;
    input.addEventListener('change', () => {
      estado.conc = c.mgPorMl;
      estado.custom = false;
      atualizar();
    });
    chips.append(div);
  });

  const outra = document.createElement('div');
  outra.className = 'chip';
  outra.innerHTML = `
    <input type="radio" name="conc" id="conc-outra" value="outra">
    <label for="conc-outra" class="custom-conc-label"><strong>Outra</strong><span>mg/mL</span></label>`;
  const outraRadio = outra.querySelector('input');
  outraRadio.checked = estado.custom;

  const campo = document.createElement('label');
  campo.className = 'custom-conc';
  campo.hidden = !estado.custom;
  campo.innerHTML = `<span>Concentração</span><input type="number" inputmode="decimal" min="1" max="500" step="any" aria-label="Concentração em mg/mL"><span>mg/mL</span>`;
  const campoInput = campo.querySelector('input');
  if (estado.custom) campoInput.value = estado.conc;

  outraRadio.addEventListener('change', () => {
    estado.custom = true;
    campo.hidden = false;
    campoInput.focus();
    estado.conc = parseFloat(campoInput.value) || NaN;
    atualizar();
  });
  campoInput.addEventListener('input', () => {
    estado.conc = parseFloat(campoInput.value.replace(',', '.'));
    atualizar();
  });

  chips.append(outra, campo);
}

/* ---------- Peso ---------- */

function pct(p) {
  const v = Math.min(Math.max(p, PESO_MIN), PESO_MAX);
  return ((v - PESO_MIN) / (PESO_MAX - PESO_MIN)) * 100;
}

function sincronizarSlider() {
  const p = parseFloat(pesoInput.value);
  if (Number.isFinite(p)) {
    slider.value = p;
    slider.style.setProperty('--pct', `${pct(p)}%`);
  }
}

pesoInput.addEventListener('input', () => {
  estado.peso = parseFloat(pesoInput.value.replace(',', '.'));
  sincronizarSlider();
  atualizar();
});

slider.addEventListener('input', () => {
  pesoInput.value = slider.value;
  estado.peso = parseFloat(slider.value);
  slider.style.setProperty('--pct', `${pct(estado.peso)}%`);
  atualizar();
});

// Botões −/+ (mantendo premido repete)
document.querySelectorAll('.stepper').forEach((btn) => {
  let timer;
  let repete;
  const passo = () => {
    const atual = Number.isFinite(estado.peso) ? estado.peso : 12;
    const novo = Math.round((atual + parseFloat(btn.dataset.step)) * 2) / 2;
    estado.peso = Math.min(Math.max(novo, PESO_MIN), PESO_MAX);
    pesoInput.value = estado.peso;
    sincronizarSlider();
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

/* ---------- Medicamento ---------- */

document.querySelectorAll('input[name="med"]').forEach((r) => {
  r.addEventListener('change', () => {
    estado.med = r.value;
    const med = MEDICAMENTOS[estado.med];
    if (!estado.custom || !Number.isFinite(estado.conc)) {
      estado.custom = false;
      estado.conc = med.concentracoes[0].mgPorMl;
    }
    desenharChips();
    atualizar();
  });
});

horaInput.addEventListener('input', () => atualizar());

/* ---------- Seringa ---------- */

const SVG_NS = 'http://www.w3.org/2000/svg';
const X0 = 34; // início do corpo da seringa (lado do bico)
const L = 190; // comprimento útil da escala
// Largura total: com a seringa cheia o êmbolo fica puxado um comprimento L para fora.
const VB_W = X0 + 2 * L + 42;

function escala(capacidade) {
  if (capacidade <= 1) return { passo: 0.1, rotulo: 0.5 };
  if (capacidade <= 2.5) return { passo: 0.1, rotulo: 0.5 };
  if (capacidade <= 5) return { passo: 0.2, rotulo: 1 };
  if (capacidade <= 10) return { passo: 0.5, rotulo: 2 };
  return { passo: 1, rotulo: 5 };
}

function criarSeringa(capacidade, idx) {
  const gradId = `liq-${idx}`;
  const { passo, rotulo } = escala(capacidade);
  let ticks = '';
  const n = Math.round(capacidade / passo);
  for (let i = 0; i <= n; i++) {
    const v = Math.round(i * passo * 100) / 100;
    const x = X0 + (v / capacidade) * L;
    const grande = Math.abs(v / rotulo - Math.round(v / rotulo)) < 1e-6;
    ticks += `<line class="tick" x1="${x}" x2="${x}" y1="20" y2="${grande ? 32 : 27}" stroke-width="${grande ? 1.4 : 0.8}"/>`;
    if (grande && v > 0) {
      ticks += `<text class="tick-label" x="${x}" y="14" text-anchor="middle">${nf.format(v)}</text>`;
    }
  }

  const wrap = document.createElement('div');
  wrap.className = 'syringe-wrap';
  wrap.innerHTML = `
    <div class="syringe-cap"><span class="vol"></span><span>Seringa de ${nf.format(capacidade)} mL</span></div>
    <svg class="syringe" viewBox="0 0 ${VB_W} 64">
      <defs>
        <linearGradient id="${gradId}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" class="liq-a"/>
          <stop offset="1" class="liq-b"/>
        </linearGradient>
      </defs>
      <path d="M${X0} 30 H14 l-10 4 l10 4 H${X0} z" class="barrel" stroke-width="1.5"/>
      <rect x="${X0}" y="19" width="${L + 6}" height="30" rx="6" class="barrel" stroke-width="1.5"/>
      <rect class="liquid" x="${X0 + 1}" y="21" width="${L}" height="26" rx="4" fill="url(#${gradId})"
        style="transform-box: fill-box; transform-origin: left center; transform: scaleX(0); transition: transform 1s cubic-bezier(.22,1,.36,1)"/>
      ${ticks}
      <g class="plunger-group" style="transform: translateX(0px)">
        <rect class="plunger" x="${X0}" y="20" width="7" height="28" rx="2"/>
        <rect class="plunger-rod" x="${X0 + 7}" y="30" width="${L + 18}" height="8" rx="2"/>
        <rect class="plunger" x="${X0 + L + 25}" y="14" width="8" height="40" rx="3"/>
      </g>
      <rect x="${X0 + L + 6}" y="12" width="6" height="44" rx="2" class="barrel" stroke-width="1.5"/>
    </svg>`;
  return wrap;
}

let assinaturaSeringas = '';

function desenharSeringas(ml, medId) {
  const cont = $('#syringes');
  const lista = seringas(ml);
  const assinatura = lista.map((s) => s.capacidade).join('|');
  if (assinatura !== assinaturaSeringas) {
    cont.innerHTML = '';
    lista.forEach((s, i) => cont.append(criarSeringa(s.capacidade, i)));
    assinaturaSeringas = assinatura;
    // Força o estado inicial vazio antes de animar
    cont.getBoundingClientRect();
  }
  const cores =
    medId === 'ibuprofeno' ? ['#ffb3a6', '#f2705e'] : ['#8ff0de', '#19c2a8'];
  [...cont.children].forEach((wrap, i) => {
    const s = lista[i];
    const frac = Math.min(s.volume / s.capacidade, 1);
    wrap.querySelector('.vol').textContent = `${nf1.format(s.volume)} mL`;
    wrap.querySelector('.liq-a').setAttribute('stop-color', cores[0]);
    wrap.querySelector('.liq-b').setAttribute('stop-color', cores[1]);
    requestAnimationFrame(() => {
      wrap.querySelector('.liquid').style.transform = `scaleX(${frac})`;
      wrap.querySelector('.plunger-group').style.transform = `translateX(${frac * L}px)`;
    });
  });
}

/* ---------- Número animado ---------- */

let mlMostrado = 0;
let anim;
function animarNumero(el, alvo) {
  cancelAnimationFrame(anim);
  const de = mlMostrado;
  const t0 = performance.now();
  const dur = 550;
  const passo = (t) => {
    const k = Math.min((t - t0) / dur, 1);
    const e = 1 - Math.pow(1 - k, 3);
    const v = de + (alvo - de) * e;
    el.textContent = nf1.format(v);
    mlMostrado = v;
    if (k < 1) anim = requestAnimationFrame(passo);
    else mlMostrado = alvo;
  };
  anim = requestAnimationFrame(passo);
}

/* ---------- Horário ---------- */

function desenharHorario(r) {
  const tl = $('#timeline');
  const [h, m] = (horaInput.value || '08:00').split(':').map(Number);
  const inicio = new Date();
  inicio.setHours(h, m, 0, 0);
  const hoje = new Date(inicio);
  hoje.setHours(0, 0, 0, 0);
  const tomas = proximasTomas(inicio, r.intervaloHoras, r.tomasPorDia);
  tl.style.gridTemplateColumns = `repeat(${tomas.length}, 1fr)`;
  tl.innerHTML = tomas
    .map((d, i) => {
      const dia = Math.floor((d - hoje) / 86400000);
      const rotulo = dia === 0 ? 'hoje' : dia === 1 ? 'amanhã' : `+${dia} dias`;
      return `<li><span class="node">${i + 1}.ª</span><time>${fmtHora.format(d)}</time><span class="day">${rotulo}</span></li>`;
    })
    .join('');
}

/* ---------- Avisos ---------- */

function aviso(texto, tipo = '') {
  const icon = tipo === 'danger' ? '⚠️' : '💡';
  return `<div class="notice ${tipo}"><span class="ni" aria-hidden="true">${icon}</span><p>${texto}</p></div>`;
}

/* ---------- Atualizar ---------- */

let medAnterior = null;

function atualizar() {
  resultado.dataset.med = estado.med;
  const r = calcularDose(estado.peso, estado.med, estado.conc);

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

  animarNumero($('#res-ml'), r.ml);
  $('#res-every').textContent = `de ${r.intervaloHoras} em ${r.intervaloHoras} horas`;
  $('#res-sub').textContent = `${r.medicamento.nome} ${nf.format(r.mgPorMl)} mg/mL · criança com ${nf.format(r.peso)} kg`;

  $('#st-mg').innerHTML = `${nf.format(r.mgToma)} <small>mg</small>`;
  $('#st-tomas').innerHTML = `${r.tomasPorDia} <small>tomas</small>`;
  $('#st-max').innerHTML = `${nf.format(r.mlMaxDia)} <small>mL</small>`;

  desenharSeringas(r.ml, estado.med);
  desenharHorario(r);

  const avisos = [];
  if (r.limitado) {
    avisos.push(
      aviso(
        `Dose limitada ao máximo de <strong>${nf.format(r.medicamento.maxMgPorToma)} mg por toma</strong>.`,
        'danger'
      )
    );
  }
  if (r.pesoAdulto) {
    avisos.push(
      aviso('Acima de 40 kg, os comprimidos costumam ser mais práticos. Confirme a formulação com o médico ou farmacêutico.')
    );
  }
  if (estado.custom) {
    avisos.push(aviso('Está a usar uma concentração personalizada — confirme o valor no rótulo do frasco.'));
  }
  if (estado.med === 'ibuprofeno') {
    avisos.push(
      aviso('Dar com ou após alimentos. Evite se a criança estiver desidratada (vómitos/diarreia) ou com varicela, salvo indicação médica.')
    );
  }
  $('#notices').innerHTML = avisos.join('');

  if (medAnterior !== estado.med) {
    const head = resultado.querySelector('.result-head');
    head.classList.remove('pop');
    void head.offsetWidth;
    head.classList.add('pop');
    medAnterior = estado.med;
  }

  // Guarda no URL para partilhar
  const q = new URLSearchParams({ peso: String(r.peso), med: estado.med, c: String(r.mgPorMl) });
  history.replaceState(null, '', `?${q}`);
}

desenharChips();
sincronizarSlider();
atualizar();
