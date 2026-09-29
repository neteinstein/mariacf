import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularUMA, calcularConsumoAlcool, gramasAlcool } from '../assets/js/habitos-core.js';

test('UMA: 20 cigarros/dia durante 20 anos → 20 UMA', () => {
  const r = calcularUMA(20, 20);
  assert.equal(r.uma, 20);
  assert.equal(r.nivel, 'muito-alto');
  assert.equal(calcularUMA(10, 10).uma, 5);
  assert.equal(calcularUMA('', 10).ok, false);
});

test('gramas de álcool: copo de vinho de 125 mL a 13% ≈ 12,8 g', () => {
  assert.ok(Math.abs(gramasAlcool(125, 13) - 12.84) < 0.01);
});

test('álcool: sem consumo → 0; 14 copos de vinho/semana num homem → dentro do limite', () => {
  assert.equal(calcularConsumoAlcool({}).gramasSemana, 0);
  const r = calcularConsumoAlcool({ vinho: 14 });
  assert.equal(r.gramasDia, 25.7);
  assert.equal(r.nivel, 'alto');
  const m = calcularConsumoAlcool({ vinho: 7 });
  assert.equal(m.nivel, 'moderado');
  assert.equal(calcularConsumoAlcool({ vinho: 7 }, true).nivel, 'alto');
});
