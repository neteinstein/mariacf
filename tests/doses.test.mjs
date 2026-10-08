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

test('amoxicilina + clavulânico 7:1: 12 kg a 45 mg/kg/dia → 270 mg = 3,4 mL de 12/12h', () => {
  const r = calcularDose(12, 'amoxiclav', 80, { mgPorKgDia: 45 });
  assert.equal(r.ok, true);
  assert.equal(r.intervaloHoras, 12);
  assert.equal(r.tomasPorDia, 2);
  assert.equal(r.mgToma, 270);
  assert.equal(r.ml, 3.4);
  assert.equal(r.clavExcessivo, false);
  assert.equal(r.clavMgKgDia, 6.5);
});

test('amoxicilina + clavulânico 4:1: intervalo de 8/8h por omissão', () => {
  const r = calcularDose(12, 'amoxiclav', 50, { mgPorKgDia: 45 });
  assert.equal(r.intervaloHoras, 8);
  assert.equal(r.tomasPorDia, 3);
  assert.equal(r.mgToma, 180);
  assert.equal(r.ml, 3.6);
  assert.equal(r.clavMgToma, 45);
});

test('amoxicilina + clavulânico: dose alta assinala excesso de clavulanato na 7:1 mas não na 14:1', () => {
  const r7 = calcularDose(12, 'amoxiclav', 80, { mgPorKgDia: 90 });
  assert.equal(r7.mgToma, 540);
  assert.equal(r7.ml, 6.8);
  assert.equal(r7.clavExcessivo, true);
  const r14 = calcularDose(12, 'amoxiclav', 120, { mgPorKgDia: 90 });
  assert.equal(r14.ml, 4.5);
  assert.equal(r14.clavExcessivo, false);
});

test('amoxicilina + clavulânico: intervalo escolhido e limite diário', () => {
  const r = calcularDose(12, 'amoxiclav', 80, { mgPorKgDia: 45, intervaloHoras: 8 });
  assert.equal(r.tomasPorDia, 3);
  assert.equal(r.mgToma, 180);
  const max = calcularDose(55, 'amoxiclav', 120, { mgPorKgDia: 90 });
  assert.equal(max.limitado, true);
  assert.equal(max.mgMaxDia, 4000);
  assert.equal(max.pesoAdulto, true);
});

test('amoxicilina + clavulânico: concentração personalizada sem clavulanato conhecido', () => {
  const r = calcularDose(10, 'amoxiclav', 70, { mgPorKgDia: 50 });
  assert.equal(r.ok, true);
  assert.equal(r.intervaloHoras, 12);
  assert.equal(r.clavMgToma, null);
  assert.equal(r.clavExcessivo, false);
});

test('amoxicilina + clavulânico: dose diária ou intervalo inválidos', () => {
  assert.equal(calcularDose(10, 'amoxiclav', 80, { mgPorKgDia: 5 }).ok, false);
  assert.equal(calcularDose(10, 'amoxiclav', 80, { mgPorKgDia: NaN }).ok, false);
  assert.equal(calcularDose(10, 'amoxiclav', 80, { mgPorKgDia: 45, intervaloHoras: 6 }).ok, false);
});
