import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularEpworth, calcularSTOPBANG } from '../assets/js/sono-core.js';

test('Epworth: todas 0 → normal', () => {
  const r = calcularEpworth(new Array(8).fill(0));
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Epworth: 24 → elevada', () => {
  const r = calcularEpworth(new Array(8).fill(3));
  assert.equal(r.pontos, 24);
  assert.equal(r.nivel, 'muito-alto');
});

test('Epworth: respostas em falta são inválidas', () => {
  assert.equal(calcularEpworth([1, 1, 1]).ok, false);
});

test('STOP-BANG: sem fatores → baixo', () => {
  assert.equal(calcularSTOPBANG({}).nivel, 'baixo');
});

test('STOP-BANG: 5 fatores → alto', () => {
  const r = calcularSTOPBANG({ ressonar: true, cansaco: true, apneiaObservada: true, pressaoArterial: true, imc35: true });
  assert.equal(r.pontos, 5);
  assert.equal(r.nivel, 'alto');
});

test('Epworth: categorias de Johns (≤ 10 normal; 11–12 ligeira; 13–15 moderada; ≥ 16 grave)', () => {
  const comSoma = (n) => calcularEpworth(new Array(8).fill(0).map((_, i) => Math.min(3, Math.max(0, n - i * 3))));
  assert.equal(comSoma(10).nivel, 'baixo');
  assert.equal(comSoma(11).nivel, 'moderado');
  assert.equal(comSoma(13).nivel, 'alto');
  assert.equal(comSoma(16).nivel, 'muito-alto');
});
