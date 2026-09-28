import { REGIOES, calcularRegraDosNove } from './queimados-core.js';

const $ = (sel) => document.querySelector(sel);

const form = $('#qu-form');
const resultado = $('#qu-resultado');

function atualizar() {
  const regioesQueimadas = {};
  Object.keys(REGIOES).forEach((r) => { regioesQueimadas[r] = $(`#qu-${r}`).checked; });

  const r = calcularRegraDosNove(regioesQueimadas);
  resultado.dataset.nivel = r.nivel;
  $('#qu-pontos').textContent = r.pontos;
  $('#qu-gravidade').textContent = r.gravidade;
}
form.addEventListener('change', atualizar);
atualizar();
