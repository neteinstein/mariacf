import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularIPSS } from '../assets/js/urologia-core.js';

test('IPSS: 0 → sintomas ligeiros', () => {
  const r = calcularIPSS(new Array(7).fill(0), 0);
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('IPSS: 35 → sintomas graves', () => {
  const r = calcularIPSS(new Array(7).fill(5), 6);
  assert.equal(r.pontos, 35);
  assert.equal(r.nivel, 'alto');
  assert.equal(r.qualidadeVida, 6);
});

test('IPSS: 10 → sintomas moderados', () => {
  const respostas = [2, 2, 1, 1, 1, 1, 2];
  assert.equal(calcularIPSS(respostas, 3).pontos, 10);
  assert.equal(calcularIPSS(respostas, 3).nivel, 'moderado');
});

test('IPSS: respostas em falta são inválidas', () => {
  assert.equal(calcularIPSS([1, 1, 1], 2).ok, false);
});
