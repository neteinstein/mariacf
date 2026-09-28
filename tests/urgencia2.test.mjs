import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcularCRB65,
  calcularPERC,
  calcularOttawaTornozelo,
  calcularOttawaJoelho,
  calcularAlvarado,
  calcularIndiceChoque,
} from '../assets/js/urgencia2-core.js';

test('CRB-65: sem fatores → 0, baixo', () => {
  const r = calcularCRB65({});
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('CRB-65: 4 fatores → máximo, alto', () => {
  const r = calcularCRB65({ confusao: true, freqRespiratoria: true, pressaoArterial: true, idade65: true });
  assert.equal(r.pontos, 4);
  assert.equal(r.nivel, 'alto');
});

test('PERC: tudo ausente → negativo', () => {
  const r = calcularPERC({});
  assert.equal(r.negativo, true);
  assert.equal(r.nivel, 'baixo');
});

test('PERC: um fator presente → positivo', () => {
  const r = calcularPERC({ fc100: true });
  assert.equal(r.negativo, false);
  assert.equal(r.positivos, 1);
  assert.equal(r.nivel, 'alto');
});

test('Ottawa tornozelo: dor maleolar + dor óssea → indica radiografia', () => {
  const r = calcularOttawaTornozelo({ dorZonaMaleolar: true, dorMaleoloLateral: true });
  assert.equal(r.radiografiaTornozelo, true);
  assert.equal(r.indicada, true);
});

test('Ottawa tornozelo: sem dor na zona → não indica', () => {
  const r = calcularOttawaTornozelo({ dorMaleoloLateral: true });
  assert.equal(r.radiografiaTornozelo, false);
  assert.equal(r.indicada, false);
});

test('Ottawa tornozelo: dor no médio-pé + incapacidade de suportar peso → radiografia do pé', () => {
  const r = calcularOttawaTornozelo({ dorZonaMedioPe: true, incapazSuportarPeso: true });
  assert.equal(r.radiografiaPe, true);
});

test('Ottawa joelho: idade ≥ 55 → indica radiografia', () => {
  assert.equal(calcularOttawaJoelho({ idade55: true }).indicada, true);
});

test('Ottawa joelho: sem critérios → não indica', () => {
  assert.equal(calcularOttawaJoelho({}).indicada, false);
});

test('Alvarado: sem fatores → baixa probabilidade', () => {
  const r = calcularAlvarado({});
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Alvarado: todos os fatores → 10, muito-alto', () => {
  const r = calcularAlvarado({
    migracaoDor: true, anorexia: true, nauseasVomitos: true, dorFID: true,
    reboundPositivo: true, febre: true, leucocitose: true, desvioEsquerdo: true,
  });
  assert.equal(r.pontos, 10);
  assert.equal(r.nivel, 'muito-alto');
});

test('Índice de choque: FC 80, PAS 120 → 0.67, normal', () => {
  const r = calcularIndiceChoque(80, 120);
  assert.equal(r.indice, 0.67);
  assert.equal(r.nivel, 'baixo');
});

test('Índice de choque: FC 130, PAS 90 → 1.44, sugestivo de choque', () => {
  const r = calcularIndiceChoque(130, 90);
  assert.equal(r.indice, 1.44);
  assert.equal(r.nivel, 'alto');
});

test('Índice de choque: valores em falta são inválidos', () => {
  assert.equal(calcularIndiceChoque('', 120).ok, false);
});
