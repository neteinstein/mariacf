import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcularLDLFriedewald,
  calcularSodioCorrigido,
  calcularCalcioCorrigido,
  calcularEAG,
  hba1cMmolMolParaPercent,
} from '../assets/js/laboratorial-core.js';

test('LDL Friedewald: CT 200, HDL 50, TG 100 → LDL 130', () => {
  const r = calcularLDLFriedewald(200, 50, 100);
  assert.equal(r.ok, true);
  assert.equal(r.ldl, 130);
});

test('LDL Friedewald: inválido com TG ≥ 400', () => {
  assert.equal(calcularLDLFriedewald(200, 50, 400).ok, false);
});

test('Sódio corrigido: Na 130, glicemia 100 → sem correção', () => {
  const r = calcularSodioCorrigido(130, 100);
  assert.equal(r.sodioCorrigido, 130);
});

test('Sódio corrigido: Na 130, glicemia 500 → +6.4', () => {
  const r = calcularSodioCorrigido(130, 500);
  assert.equal(r.sodioCorrigido, 136.4);
});

test('Cálcio corrigido: Ca 8.0, albumina 4.0 → sem correção', () => {
  const r = calcularCalcioCorrigido(8.0, 4.0);
  assert.equal(r.calcioCorrigido, 8.0);
});

test('Cálcio corrigido: Ca 8.0, albumina 2.0 → +1.6', () => {
  const r = calcularCalcioCorrigido(8.0, 2.0);
  assert.equal(r.calcioCorrigido, 9.6);
});

test('eAG: HbA1c 7% → 154 mg/dL (fórmula ADAG)', () => {
  const r = calcularEAG(7);
  assert.equal(r.eag, arredEsperado(7));
  function arredEsperado(a1c) { return Math.round(28.7 * a1c - 46.7); }
});

test('conversão HbA1c mmol/mol → %: 53 mmol/mol ≈ 7,0%', () => {
  assert.ok(Math.abs(hba1cMmolMolParaPercent(53) - 7.0) < 0.05);
});

test('valores em falta são inválidos', () => {
  assert.equal(calcularLDLFriedewald('', 50, 100).ok, false);
  assert.equal(calcularSodioCorrigido(130, '').ok, false);
  assert.equal(calcularCalcioCorrigido('', 4).ok, false);
  assert.equal(calcularEAG('').ok, false);
});
