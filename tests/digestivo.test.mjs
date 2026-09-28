import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularBlatchford, calcularRockallPreEndoscopia, calcularBISAP } from '../assets/js/digestivo-core.js';

test('Blatchford: valores normais → 0, baixo risco', () => {
  const r = calcularBlatchford({ ureia: 5, hemoglobina: 14, sexoFeminino: false, pas: 120 });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Blatchford: anemia grave + ureia alta + choque → pontuação alta', () => {
  const r = calcularBlatchford({ ureia: 30, hemoglobina: 8, sexoFeminino: false, pas: 85, pulso100: true, melena: true, sincope: true });
  // ureia:6 + hb:6 + pas:3 + pulso:1 + melena:1 + sincope:2 = 19
  assert.equal(r.pontos, 19);
  assert.equal(r.nivel, 'alto');
});

test('Blatchford: hemoglobina usa limites diferentes por sexo', () => {
  const homem = calcularBlatchford({ ureia: 5, hemoglobina: 11, sexoFeminino: false, pas: 120 });
  const mulher = calcularBlatchford({ ureia: 5, hemoglobina: 11, sexoFeminino: true, pas: 120 });
  assert.equal(homem.pontos, 3);
  assert.equal(mulher.pontos, 1);
});

test('Rockall pré-endoscópico: jovem sem choque nem comorbilidade → 0', () => {
  const r = calcularRockallPreEndoscopia({ idade: 40, choque: 'nenhum', comorbilidade: 'nenhuma' });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Rockall pré-endoscópico: idoso com hipotensão e comorbilidade grave → máximo', () => {
  const r = calcularRockallPreEndoscopia({ idade: 85, choque: 'hipotensao', comorbilidade: 'grave' });
  assert.equal(r.pontos, 7);
  assert.equal(r.nivel, 'alto');
});

test('BISAP: sem critérios → baixo', () => {
  assert.equal(calcularBISAP({}).nivel, 'baixo');
});

test('BISAP: 3 critérios → alto', () => {
  const r = calcularBISAP({ ureiaElevada: true, sirs: true, idade60: true });
  assert.equal(r.pontos, 3);
  assert.equal(r.nivel, 'alto');
});
