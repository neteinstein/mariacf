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

test('azitromicina 40 mg/mL: 12 kg a 10 mg/kg/dia → 120 mg = 3 mL 1×/dia', () => {
  const r = calcularDose(12, 'azitromicina', 40);
  assert.equal(r.ok, true);
  assert.equal(r.mgPorKgDia, 10);
  assert.equal(r.intervaloHoras, 24);
  assert.equal(r.tomasPorDia, 1);
  assert.equal(r.mgToma, 120);
  assert.equal(r.ml, 3);
  assert.equal(r.clavMgToma, null);
});

test('azitromicina: amigdalite a 20 mg/kg/dia e limite de 500 mg/dia', () => {
  assert.equal(calcularDose(12, 'azitromicina', 40, { mgPorKgDia: 20 }).mgToma, 240);
  const max = calcularDose(30, 'azitromicina', 40, { mgPorKgDia: 20 });
  assert.equal(max.limitado, true);
  assert.equal(max.mgToma, 500);
  assert.equal(max.ml, 12.5);
  assert.equal(calcularDose(12, 'azitromicina', 40, { mgPorKgDia: 10, intervaloHoras: 12 }).ok, false);
  assert.match(calcularDose(12, 'azitromicina', 40, { mgPorKgDia: 45 }).motivo, /azitromicina/);
});

test('cefuroxima 25 mg/mL: 12 kg a 20 mg/kg/dia → 120 mg = 4,8 mL de 12/12h', () => {
  const r = calcularDose(12, 'cefuroxima', 25);
  assert.equal(r.ok, true);
  assert.equal(r.intervaloHoras, 12);
  assert.equal(r.tomasPorDia, 2);
  assert.equal(r.mgToma, 120);
  assert.equal(r.ml, 4.8);
});

test('cefuroxima: otite a 30 mg/kg/dia e máximo de 250 mg por toma', () => {
  const r = calcularDose(12, 'cefuroxima', 50, { mgPorKgDia: 30 });
  assert.equal(r.mgToma, 180);
  assert.equal(r.ml, 3.6);
  const max = calcularDose(20, 'cefuroxima', 50, { mgPorKgDia: 30 });
  assert.equal(max.limitado, true);
  assert.equal(max.mgToma, 250);
  assert.equal(max.ml, 5);
  assert.equal(calcularDose(4, 'cefuroxima', 25).ok, false);
});

test('prednisolona 3 mg/mL: 12 kg a 1 mg/kg/dia → 12 mg = 4 mL 1×/dia; máx. 40 mg/dia', () => {
  const r = calcularDose(12, 'prednisolona', 3);
  assert.equal(r.ok, true);
  assert.equal(r.mgToma, 12);
  assert.equal(r.ml, 4);
  assert.equal(r.tomasPorDia, 1);
  assert.equal(r.gotas, null);
  const max = calcularDose(25, 'prednisolona', 3, { mgPorKgDia: 2 });
  assert.equal(max.limitado, true);
  assert.equal(max.mgToma, 40);
});

test('deflazacorte em gotas: 1 gota = 1 mg; limitado a 48 mg/dia', () => {
  const r = calcularDose(12.4, 'deflazacorte', 22.75, { mgPorKgDia: 1.5 });
  assert.equal(r.mgToma, 18.6);
  assert.equal(r.gotas, 19);
  assert.equal(r.gotasMaxDia, 19);
  const max = calcularDose(40, 'deflazacorte', 22.75, { mgPorKgDia: 1.5 });
  assert.equal(max.limitado, true);
  assert.equal(max.gotas, 48);
  // Concentração personalizada: sem gotas, só mL.
  assert.equal(calcularDose(12, 'deflazacorte', 20).gotas, null);
});

test('domperidona: 0,25 mg/kg até 3×/dia; 10 mg a partir de 35 kg', () => {
  const r = calcularDose(12, 'domperidona', 1);
  assert.equal(r.mgToma, 3);
  assert.equal(r.ml, 3);
  assert.equal(r.tomasPorDia, 3);
  assert.equal(calcularDose(9, 'domperidona', 1).mgToma, 2.3);
  assert.equal(calcularDose(34, 'domperidona', 1).mgToma, 8.5);
  assert.equal(calcularDose(35, 'domperidona', 1).mgToma, 10);
});

test('metoclopramida: dose por escalão de peso e recusada abaixo de 10 kg', () => {
  assert.equal(calcularDose(9, 'metoclopramida', 1).ok, false);
  assert.equal(calcularDose(10, 'metoclopramida', 1).mgToma, 1);
  assert.equal(calcularDose(14.9, 'metoclopramida', 1).mgToma, 1);
  assert.equal(calcularDose(15, 'metoclopramida', 1).mgToma, 2);
  assert.equal(calcularDose(25, 'metoclopramida', 1).mgToma, 2.5);
  const r = calcularDose(45, 'metoclopramida', 1);
  assert.equal(r.mgToma, 5);
  assert.equal(r.ml, 5);
});

test('hidroxizina 2 mg/mL: 12 kg a 2 mg/kg/dia de 8/8h → 8 mg = 4 mL; máx. 100 mg/dia', () => {
  const r = calcularDose(12, 'hidroxizina', 2, { mgPorKgDia: 2, intervaloHoras: 8 });
  assert.equal(r.mgToma, 8);
  assert.equal(r.ml, 4);
  assert.equal(calcularDose(9, 'hidroxizina', 2).ok, false);
  assert.equal(calcularDose(60, 'hidroxizina', 2, { mgPorKgDia: 2 }).mgMaxDia, 100);
});

test('cetirizina: dose por idade, em mL ou gotas; exige a idade', () => {
  assert.equal(calcularDose(12, 'cetirizina', 1).ok, false);
  const r = calcularDose(null, 'cetirizina', 1, { idade: '6-11' });
  assert.equal(r.ok, true);
  assert.equal(r.mgToma, 5);
  assert.equal(r.ml, 5);
  assert.equal(r.intervaloHoras, 12);
  const g = calcularDose(null, 'cetirizina', 10, { idade: '2-5' });
  assert.equal(g.gotas, 5);
  assert.equal(g.gotasMaxDia, 10);
  const adolescente = calcularDose(null, 'cetirizina', 1, { idade: '12+' });
  assert.equal(adolescente.tomasPorDia, 1);
  assert.equal(adolescente.ml, 10);
});

test('desloratadina 0,5 mg/mL: 1 a 5 anos → 1,25 mg = 2,5 mL 1×/dia', () => {
  const r = calcularDose(null, 'desloratadina', 0.5, { idade: '1-5' });
  assert.equal(r.mgToma, 1.25);
  assert.equal(r.ml, 2.5);
  assert.equal(r.tomasPorDia, 1);
  assert.equal(calcularDose(null, 'desloratadina', 0.5, { idade: '2-5' }).ok, false);
});
