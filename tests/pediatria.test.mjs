import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularHollidaySegar, calcularCDS, classificarMCHAT } from '../assets/js/pediatria-core.js';

test('Holliday-Segar: 8 kg → 800 mL/dia; 15 kg → 1250; 30 kg → 1700', () => {
  assert.equal(calcularHollidaySegar(8).mlDia, 800);
  assert.equal(calcularHollidaySegar(15).mlDia, 1250);
  const r = calcularHollidaySegar(30);
  assert.equal(r.mlDia, 1700);
  assert.equal(r.mlHora, 70.8);
});

test('Holliday-Segar: limitado a 2400 mL/dia', () => {
  const r = calcularHollidaySegar(80);
  assert.equal(r.mlDia, 2400);
  assert.equal(r.limitado, true);
  assert.equal(calcularHollidaySegar('').ok, false);
});

test('CDS: 0 sem desidratação, 3 ligeira, 6 moderada a grave', () => {
  assert.equal(calcularCDS({ aspeto: 0, olhos: 0, mucosas: 0, lagrimas: 0 }).nivel, 'baixo');
  assert.equal(calcularCDS({ aspeto: 1, olhos: 1, mucosas: 1, lagrimas: 0 }).nivel, 'moderado');
  assert.equal(calcularCDS({ aspeto: 2, olhos: 2, mucosas: 1, lagrimas: 1 }).nivel, 'muito-alto');
  assert.equal(calcularCDS({ aspeto: 1 }).ok, false);
});

test('M-CHAT-R/F: 0–2 baixo, 3–7 médio, 8–20 elevado', () => {
  assert.equal(classificarMCHAT(2, 18).nivel, 'baixo');
  assert.equal(classificarMCHAT(3, 18).nivel, 'moderado');
  assert.equal(classificarMCHAT(8, 18).nivel, 'alto');
  assert.ok(classificarMCHAT(1, 36).aviso);
  assert.equal(classificarMCHAT(21, 18).ok, false);
});
