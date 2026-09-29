import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularAumentoPeso } from '../assets/js/gravidez-peso-core.js';

test('IMC normal (60 kg, 165 cm) → 11,5–16 kg', () => {
  const r = calcularAumentoPeso({ pesoPre: 60, alturaCm: 165 });
  assert.equal(r.imc, 22);
  assert.equal(r.categoriaId, 'normal');
  assert.deepEqual([r.totalMin, r.totalMax], [11.5, 16]);
  assert.equal(r.avaliacao, null);
});

test('obesidade → 5–9 kg; gemelar com IMC normal → 17–25 kg', () => {
  assert.equal(calcularAumentoPeso({ pesoPre: 95, alturaCm: 165 }).totalMax, 9);
  assert.equal(calcularAumentoPeso({ pesoPre: 60, alturaCm: 165, gemelar: true }).totalMin, 17);
  assert.equal(calcularAumentoPeso({ pesoPre: 45, alturaCm: 165, gemelar: true }).ok, false);
});

test('às 25 semanas com IMC normal: esperado 0,5 + 12×0,35 a 2 + 12×0,5', () => {
  const r = calcularAumentoPeso({ pesoPre: 60, alturaCm: 165, semanas: 25, pesoAtual: 67 });
  assert.equal(r.avaliacao.esperadoMin, 4.7);
  assert.equal(r.avaliacao.esperadoMax, 8);
  assert.equal(r.avaliacao.ganho, 7);
  assert.equal(r.avaliacao.nivel, 'baixo');
  assert.equal(calcularAumentoPeso({ pesoPre: 60, alturaCm: 165, semanas: 25, pesoAtual: 72 }).avaliacao.nivel, 'alto');
});

test('corredor de aumento de peso: coincide com a avaliação semana a semana e termina no total', async () => {
  const { calcularAumentoPeso, corredorAumentoPeso } = await import('../assets/js/gravidez-peso-core.js');
  const base = { pesoPre: 62, alturaCm: 165 };
  const c = corredorAumentoPeso(calcularAumentoPeso(base));
  assert.equal(c.length, 41);
  for (const s of [8, 13, 20, 30, 40]) {
    const r = calcularAumentoPeso({ ...base, semanas: s, pesoAtual: 70 });
    assert.equal(c[s].min, r.avaliacao.esperadoMin);
    assert.equal(c[s].max, r.avaliacao.esperadoMax);
  }
  assert.ok(c[40].max <= 16 && c[40].min <= 11.5);
  assert.equal(corredorAumentoPeso(calcularAumentoPeso({ ...base, gemelar: true })), null);
});
