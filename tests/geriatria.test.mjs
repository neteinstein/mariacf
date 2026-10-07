import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularBarthel, calcularMorse, calcularBraden, classificarMMSE, classificarMoCA, classificarSeisCIT, classificarSPMSQ, calcularGDS15, calcularCharlson } from '../assets/js/geriatria-core.js';

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

test('6CIT: 7 → dentro do esperado; 8 → ligeiro; 10 → significativo', () => {
  assert.equal(classificarSeisCIT(7).alterado, false);
  assert.equal(classificarSeisCIT(8).grau, 'Défice cognitivo ligeiro');
  assert.equal(classificarSeisCIT(10).nivel, 'alto');
  assert.equal(classificarSeisCIT(29).ok, false);
});

test('SPMSQ: 3 erros com 8 anos → ligeiro; com 4 anos admite mais um erro → preservada', () => {
  assert.equal(classificarSPMSQ(3, 8).grau, 'Défice ligeiro');
  const r = classificarSPMSQ(3, 4);
  assert.equal(r.errosAjustados, 2);
  assert.equal(r.alterado, false);
  assert.equal(classificarSPMSQ(2, 15).errosAjustados, 3);
  assert.equal(classificarSPMSQ(9, 8).nivel, 'muito-alto');
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

import { calcularLawton, classificarCFS, classificarTUG, calcularMNASF } from '../assets/js/geriatria-core.js';

test('Lawton-Brody: 8 → independente; 5 → dependência moderada', () => {
  const tudo = { telefone: 1, compras: 1, refeicoes: 1, lida: 1, roupa: 1, transportes: 1, medicacao: 1, dinheiro: 1 };
  assert.equal(calcularLawton(tudo).grau, 'Independente');
  assert.equal(calcularLawton({ ...tudo, compras: 0, refeicoes: 0, lida: 0 }).grau, 'Dependência moderada');
  assert.equal(calcularLawton({ telefone: 1 }).ok, false);
});

test('CFS: 5 é frágil; nível inválido', () => {
  assert.equal(classificarCFS(5).fragil, true);
  assert.equal(classificarCFS(3).fragil, false);
  assert.equal(classificarCFS(10).ok, false);
});

test('TUG: 10 s normal, 14 s risco de queda, 25 s mobilidade limitada', () => {
  assert.equal(classificarTUG(10).nivel, 'baixo');
  assert.equal(classificarTUG(14).nivel, 'moderado');
  assert.equal(classificarTUG(25).nivel, 'alto');
  assert.equal(classificarTUG('').ok, false);
});

test('MNA-SF: 14 normal, 10 risco, 4 desnutrição', () => {
  const base = { ingestao: 2, perdaPeso: 3, mobilidade: 2, stress: 2, neuropsicologico: 2, imcOuPerna: 3 };
  assert.equal(calcularMNASF(base).estado, 'Estado nutricional normal');
  assert.equal(calcularMNASF({ ...base, perdaPeso: 1, imcOuPerna: 1 }).estado, 'Risco de desnutrição');
  assert.equal(calcularMNASF({ ...base, ingestao: 0, perdaPeso: 0, stress: 0, imcOuPerna: 0 }).pontos, 4);
});
