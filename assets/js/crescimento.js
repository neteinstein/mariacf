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

function ligarIndicador({ prefixo, indicador, campoIdade, campoValor, titulo, valorLabel, valorUnidade }) {
  const form = $(`#${prefixo}-form`);
  const resultado = $(`#${prefixo}-resultado`);
  let resultadoAtual = null;

  function resumoTexto(r) {
    const linhas = [
      `Crescimento infantil (OMS) · ${titulo}`,
      `Idade: ${$(campoIdade).value} meses`,
      `Sexo: ${$(`#${prefixo}-sexo`).checked ? 'feminino' : 'masculino'}`,
      `${valorLabel}: ${$(campoValor).value} ${valorUnidade}`,
      `Z-score: ${r.z.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' })} DP`,
      `Percentil: ${r.percentil.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}`,
      `Classificação: ${r.descricao}`,
      `Mediana OMS: ${r.mediana}`,
      '',
      'Informação de apoio — não substitui aconselhamento médico.',
      location.href,
    ];
    return linhas.join('\n');
  }

  function atualizar() {
    const r = calcularZScore(indicador, $(`#${prefixo}-sexo`).checked, $(campoIdade).value, $(campoValor).value.replace(',', '.'));
    const ok = $(`#${prefixo}-ok`);
    const vazio = $(`#${prefixo}-vazio`);
    const acoes = $(`#result-actions-${prefixo}`);
    if (!r.ok) {
      resultadoAtual = null;
      ok.hidden = true;
      vazio.hidden = false;
      if (acoes) acoes.hidden = true;
      $(`#${prefixo}-motivo`).textContent = r.motivo;
      return;
    }
    resultadoAtual = r;
    ok.hidden = false;
    vazio.hidden = true;
    if (acoes) acoes.hidden = false;
    resultado.dataset.nivel = r.nivel;
    $(`#${prefixo}-z`).textContent = r.z.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' });
    $(`#${prefixo}-percentil`).textContent = `Percentil ${r.percentil.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}`;
    $(`#${prefixo}-descricao`).textContent = r.descricao;
    $(`#${prefixo}-mediana`).textContent = r.mediana;
  }
  form.addEventListener('input', atualizar);
  form.addEventListener('change', atualizar);
  atualizar();

  $(`#btn-email-${prefixo}`)?.addEventListener('click', () => {
    if (!resultadoAtual) return;
    const assunto = `${titulo} — resultado`;
    location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoTexto(resultadoAtual))}`;
  });
  $(`#btn-print-${prefixo}`)?.addEventListener('click', () => window.print());
}

ligarIndicador({ prefixo: 'peso', indicador: 'peso', campoIdade: '#peso-idade', campoValor: '#peso-valor', titulo: 'Peso-para-idade', valorLabel: 'Peso', valorUnidade: 'kg' });
ligarIndicador({ prefixo: 'comp', indicador: 'comprimento', campoIdade: '#comp-idade', campoValor: '#comp-valor', titulo: 'Comprimento/altura-para-idade', valorLabel: 'Comprimento/altura', valorUnidade: 'cm' });
ligarIndicador({ prefixo: 'pc', indicador: 'perimetroCefalico', campoIdade: '#pc-idade', campoValor: '#pc-valor', titulo: 'Perímetro cefálico-para-idade', valorLabel: 'Perímetro cefálico', valorUnidade: 'cm' });

/* ---------- Peso-para-comprimento (eixo = comprimento, não idade) ---------- */

const wlForm = $('#wl-form');
const wlResultado = $('#wl-resultado');
let wlAtual = null;

function resumoWL(r) {
  const linhas = [
    'Crescimento infantil (OMS) · Peso-para-comprimento',
    `Sexo: ${$('#wl-sexo').checked ? 'feminino' : 'masculino'}`,
    `Comprimento: ${$('#wl-comprimento').value} cm`,
    `Peso: ${$('#wl-peso').value} kg`,
    `Z-score: ${r.z.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' })} DP`,
    `Percentil: ${r.percentil.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}`,
    `Classificação: ${r.descricao}`,
    `Mediana OMS: ${r.mediana}`,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
    location.href,
  ];
  return linhas.join('\n');
}

function atualizarWL() {
  const r = calcularPesoComprimento($('#wl-sexo').checked, $('#wl-comprimento').value, $('#wl-peso').value.replace(',', '.'));
  const ok = $('#wl-ok');
  const vazio = $('#wl-vazio');
  const acoes = $('#result-actions-wl');
  if (!r.ok) {
    wlAtual = null;
    ok.hidden = true;
    vazio.hidden = false;
    if (acoes) acoes.hidden = true;
    $('#wl-motivo').textContent = r.motivo;
    return;
  }
  wlAtual = r;
  ok.hidden = false;
  vazio.hidden = true;
  if (acoes) acoes.hidden = false;
  wlResultado.dataset.nivel = r.nivel;
  $('#wl-z').textContent = r.z.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' });
  $('#wl-percentil').textContent = `Percentil ${r.percentil.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}`;
  $('#wl-descricao').textContent = r.descricao;
  $('#wl-mediana').textContent = r.mediana;
}
wlForm.addEventListener('input', atualizarWL);
wlForm.addEventListener('change', atualizarWL);
atualizarWL();

$('#btn-email-wl')?.addEventListener('click', () => {
  if (!wlAtual) return;
  location.href = `mailto:?subject=${encodeURIComponent('Peso-para-comprimento — resultado')}&body=${encodeURIComponent(resumoWL(wlAtual))}`;
});
$('#btn-print-wl')?.addEventListener('click', () => window.print());

const params = new URLSearchParams(location.search);
const validos = ['peso', 'comp', 'pc', 'wl'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'peso');
