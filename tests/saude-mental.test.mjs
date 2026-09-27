import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularPHQ9, calcularGAD7, calcularAUDIT } from '../assets/js/saude-mental-core.js';

test('PHQ-9: todas as respostas em falta → inválido', () => {
  assert.equal(calcularPHQ9([]).ok, false);
});

test('PHQ-9: todas 0 → mínimo', () => {
  const r = calcularPHQ9(new Array(9).fill(0));
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
  assert.equal(r.itemRisco, false);
});

test('PHQ-9: 27 → grave', () => {
  const r = calcularPHQ9(new Array(9).fill(3));
  assert.equal(r.pontos, 27);
  assert.equal(r.nivel, 'muito-alto');
});

test('PHQ-9: item 9 > 0 assinala risco', () => {
  const respostas = new Array(9).fill(0);
  respostas[8] = 1;
  assert.equal(calcularPHQ9(respostas).itemRisco, true);
});

test('PHQ-9: 12 → moderada', () => {
  const respostas = [2, 2, 1, 1, 1, 1, 1, 1, 2];
  assert.equal(calcularPHQ9(respostas).pontos, 12);
  assert.equal(calcularPHQ9(respostas).nivel, 'moderado');
});

test('GAD-7: 21 → grave', () => {
  const r = calcularGAD7(new Array(7).fill(3));
  assert.equal(r.pontos, 21);
  assert.equal(r.nivel, 'alto');
});

test('GAD-7: 3 → mínima', () => {
  const respostas = [1, 1, 1, 0, 0, 0, 0];
  assert.equal(calcularGAD7(respostas).pontos, 3);
  assert.equal(calcularGAD7(respostas).nivel, 'baixo');
});

test('AUDIT: 40 → possível dependência', () => {
  const r = calcularAUDIT(new Array(10).fill(4));
  assert.equal(r.pontos, 40);
  assert.equal(r.nivel, 'muito-alto');
  assert.equal(r.auditC, 12);
});

test('AUDIT: AUDIT-C usa cutoff por sexo', () => {
  const respostas = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
  assert.equal(calcularAUDIT(respostas, false).auditCPositivo, false);
  assert.equal(calcularAUDIT(respostas, true).auditCPositivo, true);
});

test('AUDIT: 8 → consumo de risco', () => {
  const respostas = [2, 2, 2, 2, 0, 0, 0, 0, 0, 0];
  assert.equal(calcularAUDIT(respostas).pontos, 8);
  assert.equal(calcularAUDIT(respostas).nivel, 'moderado');
});
