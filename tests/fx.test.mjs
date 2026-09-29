import { test } from 'node:test';
import assert from 'node:assert/strict';

// fx.js é um módulo de interface: basta simular o mínimo do browser para o importar.
globalThis.matchMedia = () => ({ matches: false });
globalThis.document = { readyState: 'loading', addEventListener() {} };
globalThis.addEventListener = () => {};
const { lerNumero, normalCDF } = await import('../assets/js/fx.js');

test('lerNumero: lê números escritos em pt-PT, com sinal, decimais e separador de milhares', () => {
  assert.deepEqual(
    [lerNumero('24,2').valor, lerNumero('-0,04').valor, lerNumero('+1,25').valor, lerNumero('−1,2').valor],
    [24.2, -0.04, 1.25, -1.2]
  );
  assert.equal(lerNumero('12 345,5').valor, 12345.5);
  assert.equal(lerNumero('12 345,5').agrupar, true);
  assert.equal(lerNumero('0,82').casas, 2);
});

test('lerNumero: textos que não são só um número ficam de fora da contagem animada', () => {
  for (const t of ['4.5', '<1', 'Classe B', '11,5–16', '']) assert.equal(lerNumero(t), null, t);
});

test('normalCDF: percentis da distribuição normal', () => {
  assert.ok(Math.abs(normalCDF(0) - 0.5) < 1e-6);
  assert.ok(Math.abs(normalCDF(1.96) - 0.975) < 1e-3);
  assert.ok(Math.abs(normalCDF(-2) - 0.0228) < 1e-3);
});
