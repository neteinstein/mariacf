import { calcularZScore, calcularPesoComprimento, calcularIMCIdade, calcularAlturaIdade, calcularIdadeCorrigida, calcularAlturaAlvo } from './crescimento-core.js';

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

/* ---------- 2 aos 19 anos: IMC-para-idade e altura-para-idade ---------- */

const fmtZ = (z) => z.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' });
const fmtP = (p) => `Percentil ${p.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}`;
const idadeEmMeses = (prefixo) => {
  const anos = $(`#${prefixo}-anos`).value;
  if (anos === '') return '';
  return Number(anos) * 12 + (Number($(`#${prefixo}-meses`).value) || 0);
};
const idadeTexto = (prefixo) => `${$(`#${prefixo}-anos`).value} anos e ${$(`#${prefixo}-meses`).value || 0} meses`;

function ligarSimples({ prefixo, calcular, escrever, assunto, linhas }) {
  const form = $(`#${prefixo}-form`);
  const resultado = $(`#${prefixo}-resultado`);
  let atual = null;

  function atualizar() {
    const r = calcular();
    const ok = $(`#${prefixo}-ok`);
    const vazio = $(`#${prefixo}-vazio`);
    const acoes = $(`#result-actions-${prefixo}`);
    if (!r.ok) {
      atual = null;
      ok.hidden = true;
      vazio.hidden = false;
      if (acoes) acoes.hidden = true;
      $(`#${prefixo}-motivo`).textContent = r.motivo;
      return;
    }
    atual = r;
    ok.hidden = false;
    vazio.hidden = true;
    if (acoes) acoes.hidden = false;
    if (r.nivel) resultado.dataset.nivel = r.nivel;
    escrever(r);
  }
  form.addEventListener('input', atualizar);
  form.addEventListener('change', atualizar);
  atualizar();

  $(`#btn-email-${prefixo}`)?.addEventListener('click', () => {
    if (!atual) return;
    const corpo = [...linhas(atual), '', 'Informação de apoio — não substitui aconselhamento médico.', location.href].join('\n');
    location.href = `mailto:?subject=${encodeURIComponent(assunto(atual))}&body=${encodeURIComponent(corpo)}`;
  });
  $(`#btn-print-${prefixo}`)?.addEventListener('click', () => window.print());
}

ligarSimples({
  prefixo: 'imc',
  calcular: () => calcularIMCIdade($('#imc-sexo').checked, idadeEmMeses('imc'), $('#imc-peso').value.replace(',', '.'), $('#imc-altura').value.replace(',', '.')),
  escrever: (r) => {
    $('#imc-z').textContent = fmtZ(r.z);
    $('#imc-sub').textContent = fmtP(r.percentil);
    $('#imc-valor').innerHTML = `${r.imc.toLocaleString('pt-PT')} <small>kg/m²</small>`;
    $('#imc-mediana').innerHTML = `${r.mediana.toLocaleString('pt-PT')} <small>kg/m²</small>`;
    $('#imc-descricao').textContent = r.descricao;
  },
  assunto: (r) => `IMC-para-idade — ${r.descricao}`,
  linhas: (r) => [
    'Crescimento (OMS) · IMC-para-idade',
    `Idade: ${idadeTexto('imc')} · Sexo: ${$('#imc-sexo').checked ? 'feminino' : 'masculino'}`,
    `Peso: ${$('#imc-peso').value} kg · Altura: ${$('#imc-altura').value} cm · IMC: ${r.imc.toLocaleString('pt-PT')} kg/m²`,
    `Z-score: ${fmtZ(r.z)} DP · ${fmtP(r.percentil)}`,
    `Classificação: ${r.descricao}`,
  ],
});

ligarSimples({
  prefixo: 'alt',
  calcular: () => calcularAlturaIdade($('#alt-sexo').checked, idadeEmMeses('alt'), $('#alt-valor').value.replace(',', '.')),
  escrever: (r) => {
    $('#alt-z').textContent = fmtZ(r.z);
    $('#alt-sub').textContent = fmtP(r.percentil);
    $('#alt-mediana').innerHTML = `${r.mediana.toLocaleString('pt-PT')} <small>cm</small>`;
    $('#alt-descricao').textContent = r.descricao;
  },
  assunto: (r) => `Altura-para-idade — ${r.descricao}`,
  linhas: (r) => [
    'Crescimento (OMS) · Altura-para-idade',
    `Idade: ${idadeTexto('alt')} · Sexo: ${$('#alt-sexo').checked ? 'feminino' : 'masculino'}`,
    `Altura: ${$('#alt-valor').value} cm`,
    `Z-score: ${fmtZ(r.z)} DP · ${fmtP(r.percentil)}`,
    `Classificação: ${r.descricao}`,
  ],
});

/* ---------- Idade corrigida do prematuro ---------- */

const mesesDias = (x) => `${x.meses} ${x.meses === 1 ? 'mês' : 'meses'} e ${x.dias} ${x.dias === 1 ? 'dia' : 'dias'}`;

ligarSimples({
  prefixo: 'ic',
  calcular: () => calcularIdadeCorrigida($('#ic-nascimento').value, $('#ic-semanas').value, $('#ic-dias').value),
  escrever: (r) => {
    $('#ic-corrigida').textContent = r.corrigida
      ? mesesDias(r.corrigida)
      : `${r.idadePosMenstrual.semanas} sem. + ${r.idadePosMenstrual.dias} d`;
    $('#ic-sub').textContent = r.corrigida ? `≈ ${r.corrigida.mesesDecimais.toLocaleString('pt-PT')} meses de idade corrigida` : 'Idade pós-menstrual';
    $('#ic-cronologica').textContent = mesesDias(r.cronologica);
    $('#ic-prematuridade').textContent = r.prematuro ? `${r.prematuridadeSemanas.toLocaleString('pt-PT')} semanas` : 'Termo';
    $('#ic-nota').textContent = r.nota;
  },
  assunto: (r) => `Idade corrigida — ${r.corrigida ? mesesDias(r.corrigida) : 'pré-termo'}`,
  linhas: (r) => [
    'Idade corrigida do prematuro',
    `Idade gestacional ao nascer: ${$('#ic-semanas').value} semanas e ${$('#ic-dias').value || 0} dias`,
    `Idade cronológica: ${mesesDias(r.cronologica)}`,
    r.corrigida ? `Idade corrigida: ${mesesDias(r.corrigida)}` : `Idade pós-menstrual: ${r.idadePosMenstrual.semanas} semanas e ${r.idadePosMenstrual.dias} dias`,
    r.nota,
  ],
});

/* ---------- Altura-alvo familiar ---------- */

ligarSimples({
  prefixo: 'aa',
  calcular: () => calcularAlturaAlvo($('#aa-sexo').checked, $('#aa-pai').value.replace(',', '.'), $('#aa-mae').value.replace(',', '.')),
  escrever: (r) => {
    $('#aa-alvo').textContent = r.alvo.toLocaleString('pt-PT');
    $('#aa-sub').textContent = `Criança do sexo ${$('#aa-sexo').checked ? 'feminino' : 'masculino'}`;
    $('#aa-intervalo').innerHTML = `${r.minimo.toLocaleString('pt-PT')}–${r.maximo.toLocaleString('pt-PT')} <small>cm</small>`;
    $('#aa-percentil').textContent = `P${Math.round(r.percentil)} (${fmtZ(r.z)} DP)`;
  },
  assunto: (r) => `Altura-alvo — ${r.alvo} cm`,
  linhas: (r) => [
    'Altura-alvo familiar (Tanner)',
    `Pai: ${$('#aa-pai').value} cm · Mãe: ${$('#aa-mae').value} cm · Criança: sexo ${$('#aa-sexo').checked ? 'feminino' : 'masculino'}`,
    `Altura-alvo: ${r.alvo.toLocaleString('pt-PT')} cm (intervalo ${r.minimo.toLocaleString('pt-PT')}–${r.maximo.toLocaleString('pt-PT')} cm)`,
    `Percentil aos 19 anos (OMS 2007): P${Math.round(r.percentil)}`,
  ],
});

const params = new URLSearchParams(location.search);
const validos = ['peso', 'comp', 'pc', 'wl', 'imc', 'alt', 'ic', 'aa'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'peso');
