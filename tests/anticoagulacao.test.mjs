import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularCHA2DS2VASc, calcularHASBLED } from '../assets/js/anticoagulacao-core.js';

test('CHA2DS2-VASc: sem fatores → 0, risco baixo', () => {
  const r = calcularCHA2DS2VASc({});
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('CHA2DS2-VASc: apenas sexo feminino → 1 ponto mas risco baixo', () => {
  const r = calcularCHA2DS2VASc({ sexoFeminino: true });
  assert.equal(r.pontos, 1);
  assert.equal(r.nivel, 'baixo');
});

test('CHA2DS2-VASc: homem hipertenso + diabetes → 2, risco alto', () => {
  const r = calcularCHA2DS2VASc({ hipertensao: true, diabetes: true });
  assert.equal(r.pontos, 2);
  assert.equal(r.nivel, 'alto');
});

test('CHA2DS2-VASc: idade ≥75 conta 2 e anula o ponto de 65-74', () => {
  const r = calcularCHA2DS2VASc({ idade75: true, idade65_74: true });
  assert.equal(r.pontos, 2);
});

test('CHA2DS2-VASc: todos os fatores → 9 (máximo)', () => {
  const r = calcularCHA2DS2VASc({
    icc: true,
    hipertensao: true,
    idade75: true,
    diabetes: true,
    avc: true,
    vascular: true,
    sexoFeminino: true,
  });
  assert.equal(r.pontos, 9);
  assert.equal(r.nivel, 'alto');
});

test('HAS-BLED: sem fatores → 0, risco baixo', () => {
  const r = calcularHASBLED({});
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('HAS-BLED: 3 fatores → risco alto', () => {
  const r = calcularHASBLED({ hipertensao: true, renal: true, hepatica: true });
  assert.equal(r.pontos, 3);
  assert.equal(r.nivel, 'alto');
});

test('HAS-BLED: máximo 9 pontos', () => {
  const r = calcularHASBLED({
    hipertensao: true,
    renal: true,
    hepatica: true,
    avc: true,
    hemorragia: true,
    inrLabil: true,
    idoso: true,
    farmacos: true,
    alcool: true,
  });
  assert.equal(r.pontos, 9);
});
