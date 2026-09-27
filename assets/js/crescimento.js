import { calcularZScore, calcularPesoComprimento } from './crescimento-core.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- Alternância entre indicadores ---------- */

const tabs = $$('.tabbtn');
const paineis = $$('[data-painel]');

function selecionar(id) {
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
  history.replaceState(null, '', `?calc=${id}`);
}
tabs.forEach((t) => t.addEventListener('click', () => selecionar(t.dataset.tab)));

/* ---------- Steppers genéricos ---------- */

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

function ligarIndicador({ prefixo, indicador, campoIdade, campoValor }) {
  const form = $(`#${prefixo}-form`);
  const resultado = $(`#${prefixo}-resultado`);

  function atualizar() {
    const r = calcularZScore(indicador, $(`#${prefixo}-sexo`).checked, $(campoIdade).value, $(campoValor).value.replace(',', '.'));
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
    resultado.dataset.nivel = r.nivel;
    $(`#${prefixo}-z`).textContent = r.z.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' });
    $(`#${prefixo}-percentil`).textContent = `Percentil ${r.percentil.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}`;
    $(`#${prefixo}-descricao`).textContent = r.descricao;
    $(`#${prefixo}-mediana`).textContent = r.mediana;
  }
  form.addEventListener('input', atualizar);
  form.addEventListener('change', atualizar);
  atualizar();
}

ligarIndicador({ prefixo: 'peso', indicador: 'peso', campoIdade: '#peso-idade', campoValor: '#peso-valor' });
ligarIndicador({ prefixo: 'comp', indicador: 'comprimento', campoIdade: '#comp-idade', campoValor: '#comp-valor' });
ligarIndicador({ prefixo: 'pc', indicador: 'perimetroCefalico', campoIdade: '#pc-idade', campoValor: '#pc-valor' });

/* ---------- Peso-para-comprimento (eixo = comprimento, não idade) ---------- */

const wlForm = $('#wl-form');
const wlResultado = $('#wl-resultado');

function atualizarWL() {
  const r = calcularPesoComprimento($('#wl-sexo').checked, $('#wl-comprimento').value, $('#wl-peso').value.replace(',', '.'));
  const ok = $('#wl-ok');
  const vazio = $('#wl-vazio');
  if (!r.ok) {
    ok.hidden = true;
    vazio.hidden = false;
    $('#wl-motivo').textContent = r.motivo;
    return;
  }
  ok.hidden = false;
  vazio.hidden = true;
  wlResultado.dataset.nivel = r.nivel;
  $('#wl-z').textContent = r.z.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' });
  $('#wl-percentil').textContent = `Percentil ${r.percentil.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}`;
  $('#wl-descricao').textContent = r.descricao;
  $('#wl-mediana').textContent = r.mediana;
}
wlForm.addEventListener('input', atualizarWL);
wlForm.addEventListener('change', atualizarWL);
atualizarWL();

const params = new URLSearchParams(location.search);
const validos = ['peso', 'comp', 'pc', 'wl'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'peso');
