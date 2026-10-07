import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularCAT, calcularACT } from '../assets/js/respiratorio-core.js';

test('CAT: 0 → impacto baixo', () => {
  const r = calcularCAT(new Array(8).fill(0));
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('CAT: 40 → impacto muito alto', () => {
  const r = calcularCAT(new Array(8).fill(5));
  assert.equal(r.pontos, 40);
  assert.equal(r.nivel, 'muito-alto');
});

test('CAT: 15 → impacto médio', () => {
  const respostas = [2, 2, 2, 2, 2, 2, 2, 1];
  assert.equal(calcularCAT(respostas).pontos, 15);
  assert.equal(calcularCAT(respostas).nivel, 'moderado');
});

test('ACT: 25 → controlo total', () => {
  const r = calcularACT(new Array(5).fill(5));
  assert.equal(r.pontos, 25);
  assert.equal(r.controlo, 'Controlo total da asma');
});

test('ACT: 19 → não controlada', () => {
  const respostas = [4, 4, 4, 4, 3];
  assert.equal(calcularACT(respostas).pontos, 19);
  assert.equal(calcularACT(respostas).nivel, 'alto');
});
