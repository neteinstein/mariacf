import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularBarthel, calcularMorse, calcularBraden, classificarMMSE, classificarMoCA, calcularGDS15, calcularCharlson } from '../assets/js/geriatria-core.js';

const barthelIndependente = {
  alimentacao: 10, banho: 5, higiene: 5, vestir: 10, intestino: 10,
  bexiga: 10, wc: 10, transferencias: 15, mobilidade: 15, escadas: 10,
};

test('Barthel: todos os itens no máximo → 100, independente', () => {
  const r = calcularBarthel(barthelIndependente);
  assert.equal(r.pontos, 100);
  assert.equal(r.grau, 'Independente');
});

test('Barthel: todos os itens a 0 → dependência total', () => {
  const zeros = Object.fromEntries(Object.keys(barthelIndependente).map((k) => [k, 0]));
  const r = calcularBarthel(zeros);
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'muito-alto');
});

test('Barthel: item em falta é inválido', () => {
  const { escadas, ...incompleto } = barthelIndependente;
  assert.equal(calcularBarthel(incompleto).ok, false);
});

test('Morse: sem fatores → risco baixo', () => {
  const r = calcularMorse({ historiaQuedas: 0, diagnosticoSecundario: 0, apoioDeambulacao: 0, terapiaEV: 0, marcha: 0, estadoMental: 0 });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Morse: pontuação máxima → risco elevado', () => {
  const r = calcularMorse({ historiaQuedas: 25, diagnosticoSecundario: 15, apoioDeambulacao: 30, terapiaEV: 20, marcha: 20, estadoMental: 15 });
  assert.equal(r.pontos, 125);
  assert.equal(r.nivel, 'alto');
});

test('Braden: pontuação máxima (23) → sem risco significativo', () => {
  const r = calcularBraden({ percepcaoSensorial: 4, humidade: 4, atividade: 4, mobilidade: 4, nutricao: 4, friccao: 3 });
  assert.equal(r.pontos, 23);
  assert.equal(r.nivel, 'baixo');
});

test('Braden: pontuação mínima (6) → risco muito elevado', () => {
  const r = calcularBraden({ percepcaoSensorial: 1, humidade: 1, atividade: 1, mobilidade: 1, nutricao: 1, friccao: 1 });
  assert.equal(r.pontos, 6);
  assert.equal(r.nivel, 'muito-alto');
});

test('MMSE: 20 pontos com 6 anos de escolaridade → alterado (corte 22)', () => {
  const r = classificarMMSE(20, 6);
  assert.equal(r.corte, 22);
  assert.equal(r.alterado, true);
});

test('MMSE: 29 pontos com 12 anos de escolaridade → normal (corte 27)', () => {
  const r = classificarMMSE(29, 12);
  assert.equal(r.corte, 27);
  assert.equal(r.alterado, false);
});

test('MoCA: 24 pontos, 9 anos de escolaridade → ajustado a 25, alterado', () => {
  const r = classificarMoCA(24, 9);
  assert.equal(r.pontosAjustados, 25);
  assert.equal(r.alterado, true);
});

test('MoCA: 26 pontos, 15 anos de escolaridade → sem ajuste, normal', () => {
  const r = classificarMoCA(26, 15);
  assert.equal(r.pontosAjustados, 26);
  assert.equal(r.alterado, false);
});

test('GDS-15: 0 → sem sintomas', () => {
  const r = calcularGDS15(new Array(15).fill(0));
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('GDS-15: 15 → depressão grave', () => {
  const r = calcularGDS15(new Array(15).fill(1));
  assert.equal(r.pontos, 15);
  assert.equal(r.nivel, 'muito-alto');
});

test('GDS-15: respostas em falta são inválidas', () => {
  assert.equal(calcularGDS15([1, 1, 1]).ok, false);
});

test('Charlson: jovem sem comorbilidades → 0, baixo', () => {
  const r = calcularCharlson({}, 45);
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Charlson: idade soma pontos por década acima de 40', () => {
  assert.equal(calcularCharlson({}, 55).pontosIdade, 1);
  assert.equal(calcularCharlson({}, 75).pontosIdade, 3);
  assert.equal(calcularCharlson({}, 95).pontosIdade, 5);
});

test('Charlson: tumor metastático + SIDA → 12 pontos de comorbilidade', () => {
  const r = calcularCharlson({ tumorMetastatico: true, sida: true }, 45);
  assert.equal(r.pontosComorbilidades, 12);
  assert.equal(r.pontos, 12);
  assert.equal(r.nivel, 'muito-alto');
});

test('Charlson: idade em falta é inválida', () => {
  assert.equal(calcularCharlson({}, '').ok, false);
});
