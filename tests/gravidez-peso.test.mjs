import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularAumentoPeso } from '../assets/js/gravidez-peso-core.js';

test('IMC normal (60 kg, 165 cm) → 11,5–16 kg', () => {
  const r = calcularAumentoPeso({ pesoPre: 60, alturaCm: 165 });
  assert.equal(r.imc, 22);
  assert.equal(r.categoriaId, 'normal');
  assert.deepEqual([r.totalMin, r.totalMax], [11.5, 16]);
  assert.equal(r.avaliacao, null);
});

test('obesidade → 5–9 kg; gemelar com IMC normal → 17–25 kg', () => {
  assert.equal(calcularAumentoPeso({ pesoPre: 95, alturaCm: 165 }).totalMax, 9);
  assert.equal(calcularAumentoPeso({ pesoPre: 60, alturaCm: 165, gemelar: true }).totalMin, 17);
  assert.equal(calcularAumentoPeso({ pesoPre: 45, alturaCm: 165, gemelar: true }).ok, false);
});

test('às 25 semanas com IMC normal: esperado 0,5 + 12×0,35 a 2 + 12×0,5', () => {
  const r = calcularAumentoPeso({ pesoPre: 60, alturaCm: 165, semanas: 25, pesoAtual: 67 });
  assert.equal(r.avaliacao.esperadoMin, 4.7);
  assert.equal(r.avaliacao.esperadoMax, 8);
  assert.equal(r.avaliacao.ganho, 7);
  assert.equal(r.avaliacao.nivel, 'baixo');
  assert.equal(calcularAumentoPeso({ pesoPre: 60, alturaCm: 165, semanas: 25, pesoAtual: 72 }).avaliacao.nivel, 'alto');
});
