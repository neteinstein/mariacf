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
// Para mg: algumas doses fixas têm duas casas (desloratadina 1,25 mg).
const nfMg = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 2 });
const nf1 = new Intl.NumberFormat('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmtHora = new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit' });

const pesoInput = $('#peso');
const slider = $('#peso-slider');
const chips = $('#conc-chips');
const passoDose = $('#passo-dose');
const doseChips = $('#dose-chips');
const intervaloChips = $('#intervalo-chips');
const intervaloHint = $('#intervalo-hint');
const doseHint = $('#dose-hint');
const passoPeso = $('#passo-peso');
const passoIdade = $('#passo-idade');
const idadeChips = $('#idade-chips');
const idadeHint = $('#idade-hint');
const resultado = $('#resultado');
const horaInput = $('#hora');

const estado = {
  peso: 12,
  med: 'paracetamol',
  conc: 40,
  custom: false,
  // Só nas doses diárias (antibióticos, corticoides, hidroxizina): mg/kg/dia e intervalo (h).
  dose: 45,
  doseCustom: false,
  intervalo: 12,
  // Só nas doses por idade (cetirizina, desloratadina): id do escalão etário.
  idade: null,
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
{
  const med = MEDICAMENTOS[estado.med];
  if (med.porDia) {
    const d = parseFloat(params.get('dose'));
    if (d > 0) {
      estado.dose = d;
      estado.doseCustom = !med.doses.some((x) => x.mgPorKgDia === d);
    } else {
      estado.dose = med.doses[0].mgPorKgDia;
    }
    const h = Number(params.get('h'));
    estado.intervalo = med.intervalos.includes(h) ? h : intervaloDaFormulacao();
  }
  if (med.porIdade && med.escaloes.some((e) => e.id === params.get('idade'))) {
    estado.idade = params.get('idade');
  }
}

document.querySelector(`input[name="med"][value="${estado.med}"]`).checked = true;
if (Number.isFinite(estado.peso)) pesoInput.value = estado.peso;

const agora = new Date();
horaInput.value = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;

/* ---------- Concentrações ---------- */

function intervaloDaFormulacao() {
  const med = MEDICAMENTOS[estado.med];
  const f = med.concentracoes.find((x) => x.mgPorMl === estado.conc);
  return f?.intervaloHoras ?? med.intervalos?.[0];
}

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
      // Cada formulação tem o seu intervalo habitual (4:1 de 8/8 h; 7:1 e 14:1 de 12/12 h).
      if (c.intervaloHoras) {
        estado.intervalo = c.intervaloHoras;
        desenharDose();
      }
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
  const amox = med.porDia ? ` de ${med.substancia}` : '';
  campo.innerHTML = `<span>Concentração${amox}</span><input type="number" inputmode="decimal" min="1" max="500" step="any" aria-label="Concentração${amox} em mg/mL"><span>mg/mL</span>`;
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

/* ---------- Dose diária e intervalo (antibiótico) ---------- */

function chip(nome, id, rotulo, detalhe, marcado, aoMudar) {
  const div = document.createElement('div');
  div.className = 'chip';
  div.innerHTML = `
    <input type="radio" name="${nome}" id="${id}">
    <label for="${id}"><strong>${rotulo}</strong><span>${detalhe}</span></label>`;
  const input = div.querySelector('input');
  input.checked = marcado;
  input.addEventListener('change', aoMudar);
  return div;
}

function desenharDose() {
  const med = MEDICAMENTOS[estado.med];
  passoDose.hidden = !med.porDia;
  doseChips.innerHTML = '';
  intervaloChips.innerHTML = '';
  if (!med.porDia) return;

  doseHint.textContent = `Dose diária de ${med.substancia} indicada pelo médico, dividida pelas tomas do dia.`;
  // Com um só intervalo possível (ex.: azitromicina 1×/dia) não há nada a escolher.
  const umIntervalo = med.intervalos.length === 1;
  intervaloHint.hidden = umIntervalo;
  intervaloChips.hidden = umIntervalo;

  med.doses.forEach((d, i) => {
    doseChips.append(
      chip('dose', `dose-${i}`, d.rotulo, d.detalhe, !estado.doseCustom && d.mgPorKgDia === estado.dose, () => {
        estado.dose = d.mgPorKgDia;
        estado.doseCustom = false;
        campo.hidden = true;
        atualizar();
      })
    );
  });

  const campo = document.createElement('label');
  campo.className = 'custom-conc';
  campo.hidden = !estado.doseCustom;
  campo.innerHTML = `<span>Dose</span><input type="number" inputmode="decimal" min="${med.mgPorKgDiaMin}" max="${med.mgPorKgDiaMax}" step="any" aria-label="Dose diária em mg/kg/dia"><span>mg/kg/dia</span>`;
  const campoInput = campo.querySelector('input');
  if (estado.doseCustom) campoInput.value = estado.dose;
  campoInput.addEventListener('input', () => {
    estado.dose = parseFloat(campoInput.value.replace(',', '.'));
    atualizar();
  });

  doseChips.append(
    chip('dose', 'dose-outra', 'Outra', 'mg/kg/dia', estado.doseCustom, () => {
      estado.doseCustom = true;
      campo.hidden = false;
      campoInput.focus();
      estado.dose = parseFloat(campoInput.value) || NaN;
      atualizar();
    }),
    campo
  );

  med.intervalos.forEach((h) => {
    intervaloChips.append(
      chip('intervalo', `intervalo-${h}`, `${24 / h}× por dia`, `de ${h} em ${h} horas`, estado.intervalo === h, () => {
        estado.intervalo = h;
        atualizar();
      })
    );
  });
}

/* ---------- Idade (doses fixas por idade) ---------- */

function desenharIdade() {
  const med = MEDICAMENTOS[estado.med];
  passoPeso.hidden = !!med.porIdade;
  passoIdade.hidden = !med.porIdade;
  idadeChips.innerHTML = '';
  if (!med.porIdade) return;
  idadeHint.textContent = `A dose depende da idade, não do peso. ${med.idadeMinima}`;
  med.escaloes.forEach((e) => {
    idadeChips.append(
      chip('idade', `idade-${e.id}`, e.rotulo, `${nfMg.format(e.mgToma)} mg ${frequencia(e.intervaloHoras)}`, estado.idade === e.id, () => {
        estado.idade = e.id;
        atualizar();
      })
    );
  });
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
    const novo = Math.round((atual + parseFloat(btn.dataset.step)) * 10) / 10;
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
    // Cada medicamento tem as suas concentrações: nunca se herda a do anterior.
    estado.custom = false;
    estado.conc = med.concentracoes[0].mgPorMl;
    if (med.porDia) {
      estado.intervalo = intervaloDaFormulacao();
      estado.dose = med.doses[0].mgPorKgDia;
      estado.doseCustom = false;
    }
    if (med.porIdade && !med.escaloes.some((e) => e.id === estado.idade)) estado.idade = null;
    desenharChips();
    desenharDose();
    desenharIdade();
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
    medId === 'ibuprofeno'
      ? ['#fbc4ac', '#e2572f']
      : MEDICAMENTOS[medId]?.grupo === 'antibiotico'
        ? ['#b4dcec', '#05556f']
        : ['#9fdfc7', '#00a676'];
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
function animarNumero(el, alvo, fmt = nf1) {
  cancelAnimationFrame(anim);
  const de = mlMostrado;
  const t0 = performance.now();
  const dur = 550;
  const passo = (t) => {
    const k = Math.min((t - t0) / dur, 1);
    const e = 1 - Math.pow(1 - k, 3);
    const v = de + (alvo - de) * e;
    el.textContent = fmt.format(v);
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

const frequencia = (h) => (h === 24 ? '1 vez por dia' : `de ${h} em ${h} horas`);

/* ---------- Avisos ---------- */

function aviso(texto, tipo = '') {
  const icon = tipo === 'danger' ? '⚠️' : '💡';
  return `<div class="notice ${tipo}"><span class="ni" aria-hidden="true">${icon}</span><p>${texto}</p></div>`;
}

/* ---------- Atualizar ---------- */

let medAnterior = null;
let resultadoAtual = null;

function atualizar() {
  resultado.dataset.med = estado.med;
  const r = calcularDose(estado.peso, estado.med, estado.conc, {
    mgPorKgDia: estado.dose,
    intervaloHoras: estado.intervalo,
    idade: estado.idade,
  });
  const porDia = r.ok && r.medicamento.porDia;
  const porIdade = r.ok && r.medicamento.porIdade;
  // Regime fixo (dose diária ou por idade): mostram-se as tomas e o total do dia, não máximos.
  const regime = porDia || porIdade;

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

  // Nas gotas orais a dose conta-se em gotas e não há seringa.
  const emGotas = r.gotas !== null;
  animarNumero($('#res-ml'), emGotas ? r.gotas : r.ml, emGotas ? nf : nf1);
  $('#res-unid').textContent = emGotas ? (r.gotas === 1 ? 'gota' : 'gotas') : 'mL';
  $('#res-every').textContent = frequencia(r.intervaloHoras);
  const frasco = r.formulacao ? r.formulacao.rotulo : `${nf.format(r.mgPorMl)} mg/mL`;
  const quem = porIdade ? `criança de ${r.escalao.rotulo}` : `criança com ${nf.format(r.peso)} kg`;
  $('#res-sub').textContent = porDia
    ? `${r.medicamento.nome} ${frasco} · ${nf.format(r.mgPorKgDia)} mg/kg/dia · ${quem}`
    : `${r.medicamento.nome} ${frasco} · ${quem}`;

  $('#st-mg').innerHTML = `${nfMg.format(r.mgToma)} <small>mg</small>`;
  $('#st-tomas-k').textContent = regime ? 'Tomas por dia' : 'Máx. por dia';
  $('#st-max-k').textContent = regime ? 'Total em 24 h' : 'Máx. em 24 h';
  $('#st-tomas').innerHTML = `${r.tomasPorDia} <small>${r.tomasPorDia === 1 ? 'toma' : 'tomas'}</small>`;
  $('#st-max').innerHTML = emGotas
    ? `${nf.format(r.gotasMaxDia)} <small>gotas</small>`
    : `${nf.format(r.mlMaxDia)} <small>mL</small>`;

  $('#syringes').hidden = emGotas;
  if (!emGotas) desenharSeringas(r.ml, estado.med);
  desenharHorario(r);

  const avisos = [];
  if (r.limitado) {
    avisos.push(
      aviso(
        porDia
          ? `Dose limitada ao máximo de <strong>${nf.format(r.medicamento.maxMgDia)} mg de ${r.medicamento.substancia} por dia</strong>.`
          : `Dose limitada ao máximo de <strong>${nf.format(r.medicamento.maxMgPorToma)} mg por toma</strong>.`,
        'danger'
      )
    );
  }
  if (porDia && r.clavExcessivo) {
    avisos.push(
      aviso(
        `Esta dose dá <strong>${nf.format(r.clavMgKgDia)} mg/kg/dia de ácido clavulânico</strong> (acima de ${nf.format(r.maxClavMgKgDia)} mg/kg/dia), o que aumenta a diarreia. Prefira uma formulação com menos clavulanato (${r.formulacao?.proporcao === '4:1' ? '7:1 ou 14:1' : '14:1'}) ou associe amoxicilina simples, por indicação médica.`,
        'danger'
      )
    );
  } else if (porDia && r.clavMgToma !== null) {
    avisos.push(
      aviso(
        `Cada toma tem ${nf.format(r.mgToma)} mg de amoxicilina e ${nf.format(r.clavMgToma)} mg de ácido clavulânico (${nf.format(r.clavMgKgDia)} mg/kg/dia).`
      )
    );
  }
  if (porDia && r.formulacao?.proporcao && r.formulacao.proporcao !== '4:1' && r.peso < 5) {
    avisos.push(
      aviso('Nos bebés com menos de 2–3 meses, as formulações 7:1 e 14:1 não estão recomendadas: usa-se habitualmente a 4:1, de 8/8 h.')
    );
  }
  if (r.pesoAdulto && r.medicamento.doseAdulto) {
    avisos.push(
      aviso(`A partir de 40 kg usa-se a dose de adulto (${r.medicamento.doseAdulto}). Confirme com o médico.`)
    );
  } else if (r.pesoAdulto) {
    avisos.push(
      aviso('Acima de 40 kg, os comprimidos costumam ser mais práticos. Confirme a formulação com o médico ou farmacêutico.')
    );
  }
  if (estado.custom) {
    avisos.push(aviso('Está a usar uma concentração personalizada — confirme o valor no rótulo do frasco.'));
    if (estado.med === 'amoxiclav') {
      avisos.push(aviso('Sem a quantidade de ácido clavulânico do frasco não é possível confirmar o limite diário de clavulanato.'));
    }
  }
  if (r.medicamento.conselho) avisos.push(aviso(r.medicamento.conselho));
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
  const q = porIdade
    ? new URLSearchParams({ med: estado.med, c: String(r.mgPorMl), idade: r.escalao.id })
    : new URLSearchParams({ peso: String(r.peso), med: estado.med, c: String(r.mgPorMl) });
  if (porDia) {
    q.set('dose', String(r.mgPorKgDia));
    q.set('h', String(r.intervaloHoras));
  }
  history.replaceState(null, '', `?${q}`);
}

/* ---------- Ações: email e impressão ---------- */

function resumoTexto(r) {
  const linhas = [
    `Calculadora de doses · ${r.medicamento.nome} (${r.formulacao ? r.formulacao.rotulo : `${nf.format(r.mgPorMl)} mg/mL`})`,
    r.escalao ? `Idade da criança: ${r.escalao.rotulo}` : `Peso da criança: ${nf.format(r.peso)} kg`,
  ];
  const porToma = r.gotas !== null ? `${nf.format(r.gotas)} gotas` : `${nf1.format(r.ml)} mL`;
  const porDiaTxt = r.gotas !== null ? `${nf.format(r.gotasMaxDia)} gotas/dia` : `${nf.format(r.mlMaxDia)} mL/dia`;
  if (r.medicamento.porDia) {
    linhas.push(
      `Dose diária: ${nf.format(r.mgPorKgDia)} mg/kg/dia de ${r.medicamento.substancia}`,
      `Dar ${porToma} por toma (${nf.format(r.mgToma)} mg de ${r.medicamento.substancia}), ${frequencia(r.intervaloHoras)}`,
      `${r.tomasPorDia} ${r.tomasPorDia === 1 ? 'toma' : 'tomas'} por dia (${porDiaTxt})`
    );
    if (r.clavMgToma !== null) {
      linhas.push(`Ácido clavulânico: ${nf.format(r.clavMgToma)} mg por toma (${nf.format(r.clavMgKgDia)} mg/kg/dia)`);
    }
    if (r.limitado) linhas.push(`Dose limitada ao máximo de ${nf.format(r.medicamento.maxMgDia)} mg de ${r.medicamento.substancia} por dia.`);
    linhas.push('Cumprir todos os dias de tratamento indicados pelo médico.');
  } else if (r.escalao) {
    linhas.push(
      `Dar ${porToma} por toma (${nfMg.format(r.mgToma)} mg), ${frequencia(r.intervaloHoras)}`,
      `${r.tomasPorDia} ${r.tomasPorDia === 1 ? 'toma' : 'tomas'} por dia (${porDiaTxt})`
    );
  } else {
    linhas.push(
      `Dar ${porToma} por toma (${nfMg.format(r.mgToma)} mg), ${frequencia(r.intervaloHoras)}`,
      `Máximo de ${r.tomasPorDia} tomas em 24 horas (${porDiaTxt})`
    );
    if (r.limitado) linhas.push(`Dose limitada ao máximo de ${nf.format(r.medicamento.maxMgPorToma)} mg por toma.`);
  }
  linhas.push('', 'Informação de apoio — não substitui aconselhamento médico.', location.href);
  return linhas.join('\n');
}

$('#btn-email').addEventListener('click', () => {
  if (!resultadoAtual) return;
  const r = resultadoAtual;
  const assunto = `Dose de ${r.medicamento.nome} — ${r.escalao ? r.escalao.rotulo : `${nf.format(r.peso)} kg`}`;
  const corpo = resumoTexto(resultadoAtual);
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
});

$('#btn-print').addEventListener('click', () => {
  window.print();
});

desenharChips();
desenharDose();
desenharIdade();
sincronizarSlider();
atualizar();
