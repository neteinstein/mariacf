import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularCalendarioPNV, adicionarMeses, ESQUEMA_PNV } from '../assets/js/vacinas-core.js';

test('adicionarMeses: ajusta ao último dia do mês', () => {
  const d = adicionarMeses(new Date(2026, 0, 31), 1);
  assert.equal(d.getMonth(), 1);
  assert.equal(d.getDate(), 28);
});

test('PNV: bebé com 1 mês → VHB 1 passada, próxima dose aos 2 meses', () => {
  const r = calcularCalendarioPNV('2026-01-15', new Date(2026, 1, 15));
  assert.equal(r.ok, true);
  assert.equal(r.doses[0].estado, 'passada');
  assert.equal(r.proxima.idade, '2 meses');
  assert.equal(r.proxima.dataIso, '2026-03-15');
  assert.equal(r.proxima.estado, 'proxima');
});

test('PNV: no dia dos 2 meses as vacinas estão «para já»', () => {
  const r = calcularCalendarioPNV('2026-01-15', new Date(2026, 2, 15));
  assert.equal(r.proxima.idade, '2 meses');
  assert.equal(r.proxima.estado, 'agora');
});

test('PNV: esquema inclui MenB aos 2, 4 e 12 meses e HPV aos 10 anos', () => {
  const vacinas = ESQUEMA_PNV.flatMap((e) => e.vacinas.map((v) => `${e.meses}:${v}`));
  assert.ok(vacinas.includes('2:MenB 1'));
  assert.ok(vacinas.includes('4:MenB 2'));
  assert.ok(vacinas.includes('12:MenB 3'));
  assert.ok(vacinas.includes('120:HPV 1'));
});

test('PNV: adulto de 70 anos → próximo reforço de Td aos 75', () => {
  const r = calcularCalendarioPNV('1956-06-01', new Date(2026, 5, 2));
  assert.equal(r.idadeAnos, 70);
  assert.equal(r.proxima.idade, '75 anos');
  assert.ok(r.proxima.vacinas.includes('Td (reforço)'));
});

test('PNV: validação', () => {
  assert.equal(calcularCalendarioPNV('').ok, false);
  assert.equal(calcularCalendarioPNV('2030-01-01', new Date(2026, 0, 1)).ok, false);
});
