import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularITB, calcularPesoIdealAjustado } from '../assets/js/vascular-core.js';

test('ITB: pressões iguais em tudo → 1.0, normal', () => {
  const r = calcularITB({ braçoDireito: 120, braçoEsquerdo: 120, tornozeloDireito: 120, tornozeloEsquerdo: 120 });
  assert.equal(r.ok, true);
  assert.equal(r.itbDireito, 1);
  assert.equal(r.direito.nivel, 'baixo');
});

test('ITB: tornozelo muito baixo → doença arterial periférica grave', () => {
  const r = calcularITB({ braçoDireito: 120, braçoEsquerdo: 120, tornozeloDireito: 40, tornozeloEsquerdo: 120 });
  assert.equal(r.itbDireito, 0.33);
  assert.equal(r.direito.nivel, 'muito-alto');
});

test('ITB: usa o maior valor entre os dois braços', () => {
  const r = calcularITB({ braçoDireito: 100, braçoEsquerdo: 130, tornozeloDireito: 130, tornozeloEsquerdo: 130 });
  assert.equal(r.itbDireito, 1);
});

test('ITB: valores em falta são inválidos', () => {
  assert.equal(calcularITB({ braçoDireito: 120, braçoEsquerdo: 120, tornozeloDireito: '', tornozeloEsquerdo: 120 }).ok, false);
});

test('Peso ideal: homem 180 cm → ~74,6 kg', () => {
  const r = calcularPesoIdealAjustado(180, false, 80);
  // 50 + 2.3 * (27.6/2.54) = 50 + 2.3*10.866 = 74.99
  assert.ok(Math.abs(r.pesoIdeal - 75.0) < 0.2);
});

test('Peso ideal: mulher 160 cm', () => {
  const r = calcularPesoIdealAjustado(160, true, 70);
  // 45.5 + 2.3*(7.6/2.54) = 45.5 + 6.88 = 52.4
  assert.ok(Math.abs(r.pesoIdeal - 52.4) < 0.2);
});

test('Peso ajustado: obesidade marcada sinaliza uso do peso ajustado', () => {
  const r = calcularPesoIdealAjustado(170, false, 140);
  assert.equal(r.usarAjustado, true);
  assert.ok(r.pesoAjustado < 140 && r.pesoAjustado > r.pesoIdeal);
});

test('Peso ideal: altura abaixo de 152,4 cm é inválida', () => {
  assert.equal(calcularPesoIdealAjustado(140, false, 60).ok, false);
});
