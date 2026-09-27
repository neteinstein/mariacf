import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularDose, seringas, proximasTomas } from '../assets/js/doses-core.js';

test('paracetamol 40 mg/mL: 10 kg → 150 mg = 3,8 mL de 6/6h', () => {
  const r = calcularDose(10, 'paracetamol', 40);
  assert.equal(r.ok, true);
  assert.equal(r.mgToma, 150);
  assert.equal(r.ml, 3.8);
  assert.equal(r.intervaloHoras, 6);
  assert.equal(r.mgMaxDia, 600);
});

test('ibuprofeno 20 mg/mL: 12 kg → 120 mg = 6 mL de 8/8h', () => {
  const r = calcularDose(12, 'ibuprofeno', 20);
  assert.equal(r.mgToma, 120);
  assert.equal(r.ml, 6);
  assert.equal(r.intervaloHoras, 8);
  assert.equal(r.mgMaxDia, 360);
});

test('ibuprofeno 40 mg/mL: metade do volume da de 20 mg/mL', () => {
  assert.equal(calcularDose(12, 'ibuprofeno', 40).ml, 3);
});

test('limita à dose máxima por toma', () => {
  const p = calcularDose(61, 'paracetamol', 40);
  assert.equal(p.ok, false); // acima de 60 kg
  const r = calcularDose(50, 'paracetamol', 40);
  assert.equal(r.limitado, false);
  assert.equal(r.mgToma, 750);
  const i = calcularDose(45, 'ibuprofeno', 20);
  assert.equal(i.limitado, true);
  assert.equal(i.mgToma, 400);
  assert.equal(i.ml, 20);
});

test('ibuprofeno recusado abaixo de 5 kg', () => {
  const r = calcularDose(4, 'ibuprofeno', 20);
  assert.equal(r.ok, false);
  assert.match(r.motivo, /5 kg/);
});

test('peso inválido', () => {
  assert.equal(calcularDose('', 'paracetamol', 40).ok, false);
  assert.equal(calcularDose(2, 'paracetamol', 40).ok, false);
});

test('seringas', () => {
  assert.deepEqual(seringas(3.8), [{ capacidade: 5, volume: 3.8 }]);
  assert.deepEqual(seringas(0.8), [{ capacidade: 1, volume: 0.8 }]);
  assert.deepEqual(seringas(25), [
    { capacidade: 20, volume: 20 },
    { capacidade: 5, volume: 5 },
  ]);
});

test('próximas tomas', () => {
  const t = proximasTomas(new Date('2026-01-01T08:00:00'), 6, 4);
  assert.deepEqual(t.map((d) => d.getHours()), [8, 14, 20, 2]);
});
