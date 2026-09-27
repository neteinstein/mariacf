import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularCAT, calcularACT, calcularCentor } from '../assets/js/respiratorio-core.js';

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

test('Centor/McIsaac: adulto 30 anos sem critérios → ≤0, baixa probabilidade', () => {
  const r = calcularCentor({}, 30);
  assert.equal(r.pontos, 0);
  assert.equal(r.ajusteIdade, 0);
});

test('Centor/McIsaac: criança 8 anos com todos os critérios → 4+1=5', () => {
  const r = calcularCentor(
    { febre: true, semTosse: true, exsudadoAmigdalino: true, adenopatiaDolorosa: true },
    8
  );
  assert.equal(r.pontosCentor, 4);
  assert.equal(r.ajusteIdade, 1);
  assert.equal(r.pontos, 5);
  assert.equal(r.nivel, 'alto');
});

test('Centor/McIsaac: adulto 60 anos com 2 critérios → 2-1=1', () => {
  const r = calcularCentor({ febre: true, exsudadoAmigdalino: true }, 60);
  assert.equal(r.pontos, 1);
  assert.equal(r.nivel, 'baixo');
});

test('Centor/McIsaac: menos de 3 anos não é válido', () => {
  assert.equal(calcularCentor({}, 2).ok, false);
});
