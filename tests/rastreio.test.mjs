import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularFINDRISC, calcularMUST, calcularRiscoFratura } from '../assets/js/rastreio-core.js';

test('FINDRISC: perfil de baixo risco', () => {
  const r = calcularFINDRISC({
    idade: 30, imc: 22, cintura: 75, sexoFeminino: true,
    atividadeFisica: true, fruitasVegetais: true,
  });
  assert.equal(r.ok, true);
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('FINDRISC: perfil de alto risco', () => {
  const r = calcularFINDRISC({
    idade: 68, imc: 33, cintura: 105, sexoFeminino: false,
    atividadeFisica: false, fruitasVegetais: false,
    antiHipertensores: true, glicemiaElevadaPrevia: true, historiaFamiliar: 'primeiro-grau',
  });
  // 4 (idade) + 3 (imc) + 4 (cintura) + 2 + 1 + 2 + 5 + 5 = 26
  assert.equal(r.pontos, 26);
  assert.equal(r.nivel, 'muito-alto');
});

test('FINDRISC: cintura usa limites diferentes por sexo', () => {
  const homem = calcularFINDRISC({ idade: 30, imc: 22, cintura: 96, sexoFeminino: false, atividadeFisica: true, fruitasVegetais: true });
  const mulher = calcularFINDRISC({ idade: 30, imc: 22, cintura: 96, sexoFeminino: true, atividadeFisica: true, fruitasVegetais: true });
  assert.equal(homem.pontos, 3);
  assert.equal(mulher.pontos, 4);
});

test('MUST: sem risco', () => {
  const r = calcularMUST({ imc: 24, perdaPesoPercent: 2, doencaAguda: false });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('MUST: risco alto por IMC baixo + perda de peso + doença aguda', () => {
  const r = calcularMUST({ imc: 17, perdaPesoPercent: 12, doencaAguda: true });
  assert.equal(r.pontos, 6);
  assert.equal(r.nivel, 'alto');
});

test('Risco de fratura: sem fatores → baixo', () => {
  assert.equal(calcularRiscoFratura({}).nivel, 'baixo');
});

test('Risco de fratura: 3 fatores → alto', () => {
  const r = calcularRiscoFratura({ fraturaFragilidadePrevia: true, fumador: true, corticoterapia: true });
  assert.equal(r.pontos, 3);
  assert.equal(r.nivel, 'alto');
});
