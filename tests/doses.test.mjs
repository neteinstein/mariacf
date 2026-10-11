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

test('concentração tão alta que a dose arredonda para 0 mL é recusada', () => {
  const r = calcularDose(10, 'metoclopramida', 500);
  assert.equal(r.ok, false);
  assert.match(r.motivo, /0,1 mL/);
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
  // Máximo de 3 g/dia de amoxicilina (DGS 007/2012).
  const max = calcularDose(55, 'amoxiclav', 120, { mgPorKgDia: 90 });
  assert.equal(max.limitado, true);
  assert.equal(max.mgMaxDia, 3000);
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

test('azitromicina: amigdalite a 12 mg/kg/dia durante 5 dias', () => {
  const r = calcularDose(15, 'azitromicina', 40, { mgPorKgDia: 12 });
  assert.equal(r.mgToma, 180);
  assert.equal(r.ml, 4.5);
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

test('cefuroxima: dose habitual até 125 mg por toma; escrita à mão usa o máximo geral', () => {
  const r = calcularDose(20, 'cefuroxima', 25, { mgPorKgDia: 20 });
  assert.equal(r.limitado, true);
  assert.equal(r.maxMgDia, 250);
  assert.equal(r.mgToma, 125);
  assert.equal(r.ml, 5);
  const p = calcularDose(20, 'cefuroxima', 25, { mgPorKgDia: 20, personalizada: true });
  assert.equal(p.limitado, false);
  assert.equal(p.mgToma, 200);
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

test('prednisolona em comprimidos de 5 mg (Portugal): arredonda ao comprimido inteiro', () => {
  const r = calcularDose(12, 'prednisolona', 5);
  assert.equal(r.ok, true);
  assert.equal(r.formulacao.mgPorComprimido, 5);
  assert.equal(r.mgCalculado, 12);
  assert.equal(r.comprimidos, 2);
  assert.equal(r.mgToma, 10);
  assert.equal(r.ml, null);
  assert.equal(r.tomasPorDia, 1);
  // 2 mg/kg/dia a 12 kg = 24 mg: 25 mg passaria o máximo, por isso 20 mg (4 comprimidos).
  const alta = calcularDose(12, 'prednisolona', 5, { mgPorKgDia: 2 });
  assert.equal(alta.comprimidos, 4);
  assert.equal(alta.mgToma, 20);
  // Máximo de 40 mg/dia.
  const max = calcularDose(25, 'prednisolona', 5, { mgPorKgDia: 2 });
  assert.equal(max.limitado, true);
  assert.equal(max.mgToma, 40);
  assert.equal(max.comprimidos, 8);
});

test('prednisolona em comprimidos de 20 mg: meios comprimidos; recusa se o arredondamento for grosseiro', () => {
  const r = calcularDose(15, 'prednisolona', 20, { mgPorKgDia: 2 });
  assert.equal(r.comprimidos, 1.5);
  assert.equal(r.mgToma, 30);
  // 6 kg a 1 mg/kg/dia = 6 mg: o mais próximo seria ½ comprimido (10 mg), longe demais.
  const bebe = calcularDose(6, 'prednisolona', 20);
  assert.equal(bebe.ok, false);
  assert.match(bebe.motivo, /6 mg/);
  // 3 kg a 1 mg/kg/dia = 3 mg: nem com o comprimido de 5 mg.
  assert.equal(calcularDose(3, 'prednisolona', 5).ok, false);
});

test('prednisolona em solução manipulada (concentração escrita à mão), em mL', () => {
  const r = calcularDose(12, 'prednisolona', 3);
  assert.equal(r.ok, true);
  assert.equal(r.comprimidos, null);
  assert.equal(r.mgToma, 12);
  assert.equal(r.ml, 4);
  // Uma solução de 5 mg/mL escrita à mão não se confunde com o comprimido de 5 mg.
  const s = calcularDose(12, 'prednisolona', 5, { concPersonalizada: true });
  assert.equal(s.comprimidos, null);
  assert.equal(s.ml, 2.4);
});

test('deflazacorte em gotas: 1 gota = 1 mg; limitado a 48 mg/dia', () => {
  const r = calcularDose(12.4, 'deflazacorte', 22.75, { mgPorKgDia: 1 });
  assert.equal(r.gotas, 12);
  assert.equal(r.mgToma, 12);
  assert.equal(r.gotasMaxDia, 12);
  // Na dose máxima, a gota inteira arredonda para baixo para não passar 1,5 mg/kg/dia.
  assert.equal(calcularDose(12.4, 'deflazacorte', 22.75, { mgPorKgDia: 1.5 }).gotas, 18);
  assert.equal(calcularDose(3, 'deflazacorte', 22.75, { mgPorKgDia: 1.5 }).gotas, 4);
  assert.equal(calcularDose(12, 'deflazacorte', 22.75, { mgPorKgDia: 1.5 }).gotas, 18);
  const max = calcularDose(40, 'deflazacorte', 22.75, { mgPorKgDia: 1.5 });
  assert.equal(max.limitado, true);
  assert.equal(max.gotas, 48);
  // Concentração personalizada: sem gotas, só mL.
  assert.equal(calcularDose(12, 'deflazacorte', 20).gotas, null);
});

test('domperidona: só a partir de 35 kg (e 12 anos), 10 mg até 3×/dia', () => {
  // EMA/CMDh 2019: sem eficácia demonstrada abaixo dos 12 anos ou dos 35 kg.
  const crianca = calcularDose(12, 'domperidona', 1);
  assert.equal(crianca.ok, false);
  assert.match(crianca.motivo, /12 anos e 35 kg/);
  assert.equal(calcularDose(34.9, 'domperidona', 1).ok, false);
  const r = calcularDose(35, 'domperidona', 1);
  assert.equal(r.mgToma, 10);
  assert.equal(r.ml, 10);
  assert.equal(r.tomasPorDia, 3);
  assert.equal(r.mgMaxDia, 30);
  assert.equal(calcularDose(60, 'domperidona', 1).mgToma, 10);
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

test('amoxicilina na amigdalite: 50 mg/kg/dia até 1 g/dia (DGS 020/2012)', () => {
  const r = calcularDose(30, 'amoxicilina', 100, { mgPorKgDia: 50 });
  assert.equal(r.limitado, true);
  assert.equal(r.maxMgDia, 1000);
  assert.equal(r.mgToma, 500);
  assert.equal(r.ml, 5);
});

test('amoxicilina 50 mg/mL: 12 kg a 50 mg/kg/dia → 300 mg = 6 mL de 12/12h', () => {
  const r = calcularDose(12, 'amoxicilina', 50);
  assert.equal(r.ok, true);
  assert.equal(r.mgPorKgDia, 50);
  assert.equal(r.intervaloHoras, 12);
  assert.equal(r.mgToma, 300);
  assert.equal(r.ml, 6);
  assert.equal(r.clavMgToma, null);
  assert.equal(r.clavExcessivo, false);
});

test('amoxicilina 100 mg/mL: dose alta de 8/8h e limite de 4 g/dia', () => {
  const r = calcularDose(12, 'amoxicilina', 100, { mgPorKgDia: 90, intervaloHoras: 8 });
  assert.equal(r.tomasPorDia, 3);
  assert.equal(r.mgToma, 360);
  assert.equal(r.ml, 3.6);
  const max = calcularDose(50, 'amoxicilina', 100, { mgPorKgDia: 90 });
  assert.equal(max.limitado, true);
  assert.equal(max.mgMaxDia, 3000);
  assert.equal(max.mgToma, 1500);
  assert.equal(calcularDose(12, 'amoxicilina', 50, { mgPorKgDia: 10 }).ok, false);
});
