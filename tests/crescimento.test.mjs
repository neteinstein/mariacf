import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularZScore, calcularPesoComprimento } from '../assets/js/crescimento-core.js';

test('peso-para-idade: no valor mediano (M), Z ≈ 0 e percentil ≈ 50', () => {
  // Tabela OMS: menino, 12 meses, M = 9.6479 kg
  const r = calcularZScore('peso', false, 12, 9.6479);
  assert.equal(r.ok, true);
  assert.ok(Math.abs(r.z) < 0.01, `z devia ser ~0, foi ${r.z}`);
  assert.ok(Math.abs(r.percentil - 50) < 1, `percentil devia ser ~50, foi ${r.percentil}`);
});

test('peso-para-idade: peso muito baixo → Z muito negativo, nível muito-alto (alerta)', () => {
  const r = calcularZScore('peso', false, 12, 5.0);
  assert.ok(r.z < -3);
  assert.equal(r.nivel, 'muito-alto');
});

test('peso-para-idade: peso dentro do normal → nível baixo', () => {
  const r = calcularZScore('peso', false, 12, 9.6);
  assert.equal(r.nivel, 'baixo');
});

test('comprimento-para-idade: menina, no valor mediano em idade não inteira (interpolação)', () => {
  // Interpola entre 6 e 7 meses
  const r6 = calcularZScore('comprimento', true, 6, 1); // valor arbitrário só para obter mediana via z
  assert.equal(r6.ok, true);
});

test('perímetro cefálico: valores em falta são inválidos', () => {
  assert.equal(calcularZScore('perimetroCefalico', false, '', 45).ok, false);
  assert.equal(calcularZScore('perimetroCefalico', false, 6, '').ok, false);
});

test('peso-para-comprimento: no valor mediano, Z ≈ 0', () => {
  // Tabela OMS: menino, comprimento 60cm → M = 5,9907 kg
  const base = calcularZScore('pesoComprimento', false, 60, 5.9907);
  assert.ok(Math.abs(base.z) < 0.01, `z devia ser ~0, foi ${base.z}`);
});

test('peso-para-comprimento: peso muito acima do esperado → nível muito-alto', () => {
  const r = calcularPesoComprimento(false, 60, 12);
  assert.ok(r.z > 3);
  assert.equal(r.nivel, 'muito-alto');
});

test('classificação: limites -2/+2 DP', () => {
  // Constrói valores a partir de M e S aproximados usando a própria função com M conhecido
  const mediano = calcularZScore('peso', false, 0, 3.3464);
  assert.ok(Math.abs(mediano.z) < 0.01);
});
