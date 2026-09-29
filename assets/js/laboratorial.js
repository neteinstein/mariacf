import { calcularLDLFriedewald, calcularSodioCorrigido, calcularCalcioCorrigido, calcularEAG, calcularAnionGap, calcularOsmolaridade, calcularDeficeAguaLivre, calcularHOMAIR, converterUnidade, ANALITOS } from './laboratorial-core.js';

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

/* ---------- Ações: email e impressão ---------- */

function resumoTexto(titulo, linhas) {
  return [titulo, ...linhas, '', 'Informação de apoio — não substitui aconselhamento médico.', location.href].join('\n');
}

function ligar({ prefixo, calcular, ler, escrever, titulo, resumo }) {
  const form = $(`#${prefixo}-form`);
  let resultadoAtual = null;

  function atualizar() {
    const r = calcular(...ler());
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
    escrever(r);
  }
  form.addEventListener('input', atualizar);

  const btnEmail = $(`#btn-email-${prefixo}`);
  const btnPrint = $(`#btn-print-${prefixo}`);
  if (btnEmail) {
    btnEmail.addEventListener('click', () => {
      if (!resultadoAtual) return;
      const corpo = resumo(resultadoAtual);
      location.href = `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(corpo)}`;
    });
  }
  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }

  atualizar();
}

ligar({
  prefixo: 'ldl',
  calcular: calcularLDLFriedewald,
  ler: () => [$('#ldl-ct').value.replace(',', '.'), $('#ldl-hdl').value.replace(',', '.'), $('#ldl-tg').value.replace(',', '.')],
  escrever: (r) => { $('#ldl-valor').textContent = r.ldl; },
  titulo: 'LDL calculado (Friedewald)',
  resumo: () => resumoTexto('LDL calculado (Friedewald)', [
    `Colesterol total: ${$('#ldl-ct').value} mg/dL`,
    `HDL: ${$('#ldl-hdl').value} mg/dL`,
    `Triglicéridos: ${$('#ldl-tg').value} mg/dL`,
    `LDL calculado: ${$('#ldl-valor').textContent} mg/dL`,
  ]),
});

ligar({
  prefixo: 'na',
  calcular: calcularSodioCorrigido,
  ler: () => [$('#na-medido').value.replace(',', '.'), $('#na-glicemia').value.replace(',', '.')],
  escrever: (r) => { $('#na-valor').textContent = r.sodioCorrigido.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); },
  titulo: 'Sódio corrigido (Katz)',
  resumo: () => resumoTexto('Sódio corrigido (Katz)', [
    `Sódio medido: ${$('#na-medido').value} mEq/L`,
    `Glicemia: ${$('#na-glicemia').value} mg/dL`,
    `Sódio corrigido: ${$('#na-valor').textContent} mEq/L`,
  ]),
});

ligar({
  prefixo: 'ca',
  calcular: calcularCalcioCorrigido,
  ler: () => [$('#ca-medido').value.replace(',', '.'), $('#ca-albumina').value.replace(',', '.')],
  escrever: (r) => { $('#ca-valor').textContent = r.calcioCorrigido.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); },
  titulo: 'Cálcio corrigido',
  resumo: () => resumoTexto('Cálcio corrigido', [
    `Cálcio medido: ${$('#ca-medido').value} mg/dL`,
    `Albumina: ${$('#ca-albumina').value} g/dL`,
    `Cálcio corrigido: ${$('#ca-valor').textContent} mg/dL`,
  ]),
});

ligar({
  prefixo: 'eag',
  calcular: calcularEAG,
  ler: () => [$('#eag-hba1c').value.replace(',', '.')],
  escrever: (r) => { $('#eag-valor').textContent = r.eag; },
  titulo: 'Glicemia média estimada (eAG)',
  resumo: () => resumoTexto('Glicemia média estimada (eAG)', [
    `HbA1c: ${$('#eag-hba1c').value} %`,
    `eAG: ${$('#eag-valor').textContent} mg/dL`,
  ]),
});

ligar({
  prefixo: 'ag',
  calcular: calcularAnionGap,
  ler: () => [$('#ag-sodio').value.replace(',', '.'), $('#ag-cloro').value.replace(',', '.'), $('#ag-bicarbonato').value.replace(',', '.')],
  escrever: (r) => {
    $('#ag-resultado').dataset.nivel = r.nivel;
    $('#ag-valor').textContent = r.gap.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  },
  titulo: 'Anion gap',
  resumo: () => resumoTexto('Anion gap', [
    `Sódio: ${$('#ag-sodio').value} mEq/L`,
    `Cloro: ${$('#ag-cloro').value} mEq/L`,
    `Bicarbonato: ${$('#ag-bicarbonato').value} mEq/L`,
    `Anion gap: ${$('#ag-valor').textContent} mEq/L`,
    'Intervalo de referência habitual: 8–16 mEq/L',
  ]),
});

ligar({
  prefixo: 'osm',
  calcular: calcularOsmolaridade,
  ler: () => [$('#osm-sodio').value.replace(',', '.'), $('#osm-glicemia').value.replace(',', '.'), $('#osm-ureia').value.replace(',', '.')],
  escrever: (r) => {
    $('#osm-resultado').dataset.nivel = r.nivel;
    $('#osm-valor').textContent = r.osmolaridade;
  },
  titulo: 'Osmolaridade sérica calculada',
  resumo: () => resumoTexto('Osmolaridade sérica calculada', [
    `Sódio: ${$('#osm-sodio').value} mEq/L`,
    `Glicemia: ${$('#osm-glicemia').value} mg/dL`,
    `Ureia: ${$('#osm-ureia').value} mg/dL`,
    `Osmolaridade calculada: ${$('#osm-valor').textContent} mOsm/kg`,
    'Intervalo normal habitual: 275–295 mOsm/kg',
  ]),
});

ligar({
  prefixo: 'agua',
  calcular: (peso, na) => calcularDeficeAguaLivre(peso, na, $('#agua-sexo').checked),
  ler: () => [$('#agua-peso').value.replace(',', '.'), $('#agua-sodio').value.replace(',', '.')],
  escrever: (r) => {
    $('#agua-valor').textContent = r.defice.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    $('#agua-tbw').textContent = `Água corporal total estimada: ${r.aguaCorporalTotal.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L`;
  },
  titulo: 'Défice de água livre',
  resumo: () => resumoTexto('Défice de água livre', [
    `Peso: ${$('#agua-peso').value} kg`,
    `Sódio atual: ${$('#agua-sodio').value} mEq/L`,
    `Sexo feminino: ${$('#agua-sexo').checked ? 'Sim' : 'Não'}`,
    `Défice de água livre: ${$('#agua-valor').textContent} L`,
    $('#agua-tbw').textContent,
  ]),
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
  titulo: 'HOMA-IR',
  resumo: () => resumoTexto('HOMA-IR', [
    `Glicemia em jejum: ${$('#homa-glicemia').value} mg/dL`,
    `Insulina em jejum: ${$('#homa-insulina').value} µU/mL`,
    `HOMA-IR: ${$('#homa-valor').textContent}`,
    '≥ 2,5 sugere insulinorresistência.',
  ]),
});

/* ---------- Conversão de unidades ---------- */

const analito = () => $('input[name="conv-analito"]:checked')?.value;
const direcao = () => $('input[name="conv-direcao"]:checked')?.value;

function atualizarUnidadesConversao() {
  const a = ANALITOS[analito()];
  if (!a) return;
  $('label[for="conv-direcao-paraSI"] strong').textContent = `${a.convencional} → ${a.si}`;
  $('label[for="conv-direcao-paraConvencional"] strong').textContent = `${a.si} → ${a.convencional}`;
  $('#conv-unidade').textContent = direcao() === 'paraConvencional' ? a.si : a.convencional;
}
$('#conv-form').addEventListener('change', atualizarUnidadesConversao);
atualizarUnidadesConversao();

ligar({
  prefixo: 'conv',
  calcular: converterUnidade,
  ler: () => [analito(), $('#conv-valor').value.replace(',', '.'), direcao()],
  escrever: (r) => {
    $('#conv-resultado-valor').textContent = r.convertido.toLocaleString('pt-PT', { minimumFractionDigits: r.casas, maximumFractionDigits: r.casas });
    $('#conv-resultado-unidade').textContent = r.unidadeDestino;
    $('#conv-sub').textContent = `${r.nome}: ${r.valor.toLocaleString('pt-PT')} ${r.unidadeOrigem}`;
  },
  titulo: 'Conversão de unidades',
  resumo: () => resumoTexto('Conversão de unidades', [$('#conv-sub').textContent, `= ${$('#conv-resultado-valor').textContent} ${$('#conv-resultado-unidade').textContent}`]),
});

const params = new URLSearchParams(location.search);
const validos = ['ldl', 'na', 'ca', 'eag', 'ag', 'osm', 'agua', 'homa', 'conv'];
selecionar(validos.includes(params.get('calc')) ? params.get('calc') : 'ldl');
