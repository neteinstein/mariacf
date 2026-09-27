import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularPorDUM, calcularPorEcografia, paraISO, trimestre } from '../assets/js/dpp-core.js';

const HOJE = new Date(2026, 8, 27); // 2026-09-27

test('DUM com ciclo de 28 dias: DPP = DUM + 280 dias', () => {
  const r = calcularPorDUM('2026-01-01', 28, HOJE);
  assert.equal(r.ok, true);
  assert.equal(paraISO(r.dpp), '2026-10-08');
  assert.equal(r.idadeGestacionalDias, 269);
  assert.equal(r.semanas, 38);
  assert.equal(r.dias, 3);
  assert.equal(r.trimestre, 3);
  assert.equal(r.atrasada, false);
});

test('DUM com ciclo mais longo desloca a DPP para a frente', () => {
  const curto = calcularPorDUM('2026-01-01', 28, HOJE);
  const longo = calcularPorDUM('2026-01-01', 35, HOJE);
  assert.equal(paraISO(longo.dpp), '2026-10-15');
  assert.ok(longo.dpp > curto.dpp);
});

test('DUM no futuro é rejeitada', () => {
  const r = calcularPorDUM('2027-01-01', 28, HOJE);
  assert.equal(r.ok, false);
});

test('duração de ciclo fora do intervalo é rejeitada', () => {
  assert.equal(calcularPorDUM('2026-01-01', 10, HOJE).ok, false);
  assert.equal(calcularPorDUM('2026-01-01', 60, HOJE).ok, false);
});

test('data da DUM inválida é rejeitada', () => {
  assert.equal(calcularPorDUM('', 28, HOJE).ok, false);
  assert.equal(calcularPorDUM('não-é-uma-data', 28, HOJE).ok, false);
});

test('por ecografia: reconstrói a DUM equivalente', () => {
  const r = calcularPorEcografia('2026-06-01', 12, 3, HOJE);
  assert.equal(r.ok, true);
  assert.equal(paraISO(r.dpp), '2026-12-11');
  assert.equal(r.semanas, 29);
  assert.equal(r.dias, 2);
  assert.equal(r.trimestre, 3);
});

test('idade gestacional da ecografia fora do intervalo é rejeitada', () => {
  assert.equal(calcularPorEcografia('2026-06-01', 2, 0, HOJE).ok, false);
  assert.equal(calcularPorEcografia('2026-06-01', 45, 0, HOJE).ok, false);
});

test('ecografia no futuro é rejeitada', () => {
  assert.equal(calcularPorEcografia('2027-06-01', 12, 0, HOJE).ok, false);
});

test('trimestres', () => {
  assert.equal(trimestre(0), 1);
  assert.equal(trimestre(13 * 7 + 6), 1);
  assert.equal(trimestre(14 * 7), 2);
  assert.equal(trimestre(27 * 7 + 6), 2);
  assert.equal(trimestre(28 * 7), 3);
});
