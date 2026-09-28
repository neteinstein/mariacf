import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularBishop, calcularApgar, calcularGlasgowPediatrico } from '../assets/js/parto-neonatal-core.js';

test('Bishop: todos no máximo → 13, favorável', () => {
  const r = calcularBishop({ dilatacao: 3, apagamento: 3, consistencia: 2, posicao: 2, altura: 3 });
  assert.equal(r.pontos, 13);
  assert.equal(r.nivel, 'baixo');
});

test('Bishop: todos no mínimo → 0, desfavorável', () => {
  const r = calcularBishop({ dilatacao: 0, apagamento: 0, consistencia: 0, posicao: 0, altura: 0 });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'alto');
});

test('Bishop: item em falta é inválido', () => {
  assert.equal(calcularBishop({ dilatacao: 1, apagamento: 1, consistencia: 1, posicao: 1 }).ok, false);
});

test('Apgar: 10 → normal', () => {
  const r = calcularApgar({ frequenciaCardiaca: 2, esforcoRespiratorio: 2, tonusMuscular: 2, irritabilidadeReflexa: 2, cor: 2 });
  assert.equal(r.pontos, 10);
  assert.equal(r.nivel, 'baixo');
});

test('Apgar: 0 → gravemente deprimido', () => {
  const r = calcularApgar({ frequenciaCardiaca: 0, esforcoRespiratorio: 0, tonusMuscular: 0, irritabilidadeReflexa: 0, cor: 0 });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'muito-alto');
});

test('Apgar: 5 → moderadamente deprimido', () => {
  const r = calcularApgar({ frequenciaCardiaca: 1, esforcoRespiratorio: 1, tonusMuscular: 1, irritabilidadeReflexa: 1, cor: 1 });
  assert.equal(r.pontos, 5);
  assert.equal(r.nivel, 'alto');
});

test('GCS pediátrico: 4+5+6 → 15, ligeiro', () => {
  const r = calcularGlasgowPediatrico(4, 5, 6);
  assert.equal(r.pontos, 15);
  assert.equal(r.nivel, 'baixo');
});

test('GCS pediátrico: 1+1+1 → 3, grave', () => {
  const r = calcularGlasgowPediatrico(1, 1, 1);
  assert.equal(r.pontos, 3);
  assert.equal(r.nivel, 'muito-alto');
});
