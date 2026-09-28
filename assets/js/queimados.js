import { REGIOES, calcularRegraDosNove } from './queimados-core.js';

const $ = (sel) => document.querySelector(sel);

const form = $('#qu-form');
const resultado = $('#qu-resultado');

const ROTULOS_REGIOES = {
  cabecaPescoco: 'Cabeça e pescoço',
  membroSuperiorDireito: 'Membro superior direito',
  membroSuperiorEsquerdo: 'Membro superior esquerdo',
  troncoAnterior: 'Tronco anterior',
  troncoPosterior: 'Tronco posterior',
  membroInferiorDireito: 'Membro inferior direito',
  membroInferiorEsquerdo: 'Membro inferior esquerdo',
  perineo: 'Períneo',
};

let resultadoAtual = null;

function atualizar() {
  const regioesQueimadas = {};
  Object.keys(REGIOES).forEach((r) => { regioesQueimadas[r] = $(`#qu-${r}`).checked; });

  const r = calcularRegraDosNove(regioesQueimadas);
  resultado.dataset.nivel = r.nivel;
  $('#qu-pontos').textContent = r.pontos;
  $('#qu-gravidade').textContent = r.gravidade;
  resultadoAtual = { ...r, regioesQueimadas };
}
form.addEventListener('change', atualizar);

/* ---------- Ações: email e impressão ---------- */

function resumoTexto(r) {
  const regioes = Object.keys(REGIOES).filter((k) => r.regioesQueimadas[k]);
  const linhas = [
    'Regra dos 9 (Wallace) · Superfície corporal queimada',
    regioes.length
      ? `Regiões atingidas: ${regioes.map((k) => ROTULOS_REGIOES[k]).join(', ')}`
      : 'Regiões atingidas: nenhuma assinalada',
    `Superfície corporal queimada: ${r.pontos}%`,
    r.gravidade,
  ];
  linhas.push('', 'Informação de apoio — não substitui aconselhamento médico.', location.href);
  return linhas.join('\n');
}

$('#btn-email').addEventListener('click', () => {
  if (!resultadoAtual) return;
  const assunto = `Superfície corporal queimada — ${resultadoAtual.pontos}%`;
  const corpo = resumoTexto(resultadoAtual);
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
});

$('#btn-print').addEventListener('click', () => {
  window.print();
});

atualizar();
