import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularCKDEPI2021, calcularCockcroftGault } from '../assets/js/funcao-renal-core.js';

test('CKD-EPI 2021: homem, 50 anos, creatinina 1,0 mg/dL', () => {
  const r = calcularCKDEPI2021(1.0, 50, false);
  assert.equal(r.ok, true);
  // scr/kappa = 1/0.9 = 1.111 > 1 → usa expoente -1.2 no ramo "max"
  assert.equal(r.egfr, Math.round(142 * (1 / 0.9) ** -1.2 * 0.9938 ** 50));
  assert.ok(r.egfr > 85 && r.egfr < 95);
});

test('CKD-EPI 2021: mulher, 60 anos, creatinina 0,6 mg/dL (abaixo de kappa)', () => {
  const r = calcularCKDEPI2021(0.6, 60, true);
  assert.equal(r.ok, true);
  // scr/kappa = 0.6/0.7 < 1 → usa expoente alpha no ramo "min"
  const esperado = Math.round(142 * (0.6 / 0.7) ** -0.241 * 0.9938 ** 60 * 1.012);
  assert.equal(r.egfr, esperado);
});

test('CKD-EPI 2021: classificação por estadio', () => {
  assert.equal(calcularCKDEPI2021(0.7, 30, false).estadio, 'G1');
  assert.equal(calcularCKDEPI2021(4.0, 70, false).estadio, 'G4');
});

test('CKD-EPI 2021: exige adulto', () => {
  assert.equal(calcularCKDEPI2021(1.0, 10, false).ok, false);
});

test('Cockcroft-Gault: homem 60 anos, 80 kg, creatinina 1,0 mg/dL', () => {
  const r = calcularCockcroftGault(1.0, 60, 80, false);
  // (140-60)*80 / (72*1.0) = 88.89
  assert.equal(r.crcl, 89);
});

test('Cockcroft-Gault: mulher aplica fator 0,85', () => {
  const mulher = calcularCockcroftGault(1.0, 60, 80, true);
  // (140-60)*80 / (72*1.0) * 0.85 = 75.56
  assert.equal(mulher.crcl, 76);
});

test('Cockcroft-Gault: valores em falta são inválidos', () => {
  assert.equal(calcularCockcroftGault('', 60, 80, false).ok, false);
  assert.equal(calcularCockcroftGault(1.0, '', 80, false).ok, false);
  assert.equal(calcularCockcroftGault(1.0, 60, '', false).ok, false);
});

import { estadiarKDIGO } from '../assets/js/funcao-renal-core.js';

test('KDIGO: TFG 50 e ACR 100 mg/g → G3a A2, risco elevado', () => {
  const r = estadiarKDIGO(50, 100);
  assert.equal(r.g, 'G3a');
  assert.equal(r.a, 'A2');
  assert.equal(r.nivel, 'alto');
  assert.equal(r.monitorizacao, '2');
  assert.equal(r.referenciar, false);
});

test('KDIGO: ACR em mg/mmol (40 mg/mmol ≈ 354 mg/g) → A3 e referenciar', () => {
  const r = estadiarKDIGO(95, 40, 'mg/mmol');
  assert.equal(r.g, 'G1');
  assert.equal(r.a, 'A3');
  assert.equal(r.referenciar, true);
});

test('KDIGO: limites G e validação', () => {
  assert.equal(estadiarKDIGO(90, 10).g, 'G1');
  assert.equal(estadiarKDIGO(89, 10).g, 'G2');
  assert.equal(estadiarKDIGO(14, 10).g, 'G5');
  assert.equal(estadiarKDIGO('', 10).ok, false);
});
