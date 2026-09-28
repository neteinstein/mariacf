import { calcularLDLFriedewald, calcularSodioCorrigido, calcularCalcioCorrigido, calcularEAG, calcularAnionGap, calcularOsmolaridade, calcularDeficeAguaLivre, calcularHOMAIR } from './laboratorial-core.js';

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
    const casas = alvo.step && alvo.step.includes('.') ? alvo.step.split('.')[1].length : 0;
    const f = 10 ** casas;
    const novo = Math.round(((Number(alvo.value) || min) + Number(btn.dataset.step)) * f) / f;
    alvo.value = Math.min(Math.max(novo, min), max);
    alvo.dispatchEvent(new Event('input', { bubbles: true }));
  });
});

function ligar({ prefixo, calcular, ler, escrever }) {
  const form = $(`#${prefixo}-form`);
  function atualizar() {
    const r = calcular(...ler());
    const ok = $(`#${prefixo}-ok`);
    const vazio = $(`#${prefixo}-vazio`);
    if (!r.ok) {
      ok.hidden = true;
      vazio.hidden = false;
      $(`#${prefixo}-motivo`).textContent = r.motivo;
      return;
    }
    ok.hidden = false;
    vazio.hidden = true;
    escrever(r);
  }
  form.addEventListener('input', atualizar);
  atualizar();
}

ligar({
  prefixo: 'ldl',
  calcular: calcularLDLFriedewald,
  ler: () => [$('#ldl-ct').value.replace(',', '.'), $('#ldl-hdl').value.replace(',', '.'), $('#ldl-tg').value.replace(',', '.')],
  escrever: (r) => { $('#ldl-valor').textContent = r.ldl; },
});

ligar({
  prefixo: 'na',
  calcular: calcularSodioCorrigido,
  ler: () => [$('#na-medido').value.replace(',', '.'), $('#na-glicemia').value.replace(',', '.')],
  escrever: (r) => { $('#na-valor').textContent = r.sodioCorrigido.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); },
});

ligar({
  prefixo: 'ca',
  calcular: calcularCalcioCorrigido,
  ler: () => [$('#ca-medido').value.replace(',', '.'), $('#ca-albumina').value.replace(',', '.')],
  escrever: (r) => { $('#ca-valor').textContent = r.calcioCorrigido.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); },
});

ligar({
  prefixo: 'eag',
  calcular: calcularEAG,
  ler: () => [$('#eag-hba1c').value.replace(',', '.')],
  escrever: (r) => { $('#eag-valor').textContent = r.eag; },
});

ligar({
  prefixo: 'ag',
  calcular: calcularAnionGap,
  ler: () => [$('#ag-sodio').value.replace(',', '.'), $('#ag-cloro').value.replace(',', '.'), $('#ag-bicarbonato').value.replace(',', '.')],
  escrever: (r) => {
    $('#ag-resultado').dataset.nivel = r.nivel;
    $('#ag-valor').textContent = r.gap.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  },
});

ligar({
  prefixo: 'osm',
  calcular: calcularOsmolaridade,
  ler: () => [$('#osm-sodio').value.replace(',', '.'), $('#osm-glicemia').value.replace(',', '.'), $('#osm-ureia').value.replace(',', '.')],
  escrever: (r) => {
    $('#osm-resultado').dataset.nivel = r.nivel;
    $('#osm-valor').textContent = r.osmolaridade;
  },
});

ligar({
  prefixo: 'agua',
  calcular: (peso, na) => calcularDeficeAguaLivre(peso, na, $('#agua-sexo').checked),
  ler: () => [$('#agua-peso').value.replace(',', '.'), $('#agua-sodio').value.replace(',', '.')],
  escrever: (r) => {
    $('#agua-valor').textContent = r.defice.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    $('#agua-tbw').textContent = `Água corporal total estimada: ${r.aguaCorporalTotal.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L`;
  },
});
$('#agua-sexo').addEventListener('change', () => $('#agua-form').dispatchEvent(new Event('input', { bubbles: true })));

ligar({
  prefixo: 'homa',
  calcular: calcularHOMAIR,
  ler: () => [$('#homa-glicemia').value.replace(',', '.'), $('#homa-insulina').value.replace(',', '.')],
  escrever: (r) => {
    $('#homa-resultado').dataset.nivel = r.nivel;
    $('#homa-valor').textContent = r.homa.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },
});

const params = new URLSearchParams(location.search);
const validos = ['ldl', 'na', 'ca', 'eag', 'ag', 'osm', 'agua', 'homa'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'ldl');
