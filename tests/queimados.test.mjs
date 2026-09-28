import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularRegraDosNove } from '../assets/js/queimados-core.js';

test('Regra dos 9: nenhuma região → 0', () => {
  const r = calcularRegraDosNove({});
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Regra dos 9: ambos os membros superiores + cabeça → 27%', () => {
  const r = calcularRegraDosNove({ cabecaPescoco: true, membroSuperiorDireito: true, membroSuperiorEsquerdo: true });
  assert.equal(r.pontos, 27);
  assert.equal(r.nivel, 'alto');
});

test('Regra dos 9: corpo inteiro → 100%', () => {
  const r = calcularRegraDosNove({
    cabecaPescoco: true, membroSuperiorDireito: true, membroSuperiorEsquerdo: true,
    troncoAnterior: true, troncoPosterior: true, membroInferiorDireito: true,
    membroInferiorEsquerdo: true, perineo: true,
  });
  assert.equal(r.pontos, 100);
});

test('Regra dos 9: tronco anterior isolado → 18%, moderado', () => {
  const r = calcularRegraDosNove({ troncoAnterior: true });
  assert.equal(r.pontos, 18);
  assert.equal(r.nivel, 'moderado');
});
