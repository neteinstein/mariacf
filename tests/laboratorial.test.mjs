import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcularLDLFriedewald,
  calcularSodioCorrigido,
  calcularCalcioCorrigido,
  calcularEAG,
  hba1cMmolMolParaPercent,
  calcularAnionGap,
  calcularOsmolaridade,
  calcularDeficeAguaLivre,
  calcularHOMAIR,
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

test('Anion gap: Na 140, Cl 104, HCO3 24 → 12 (normal)', () => {
  const r = calcularAnionGap(140, 104, 24);
  assert.equal(r.gap, 12);
  assert.equal(r.nivel, 'baixo');
});

test('Anion gap: elevado sinaliza acidose de anion gap aumentado', () => {
  const r = calcularAnionGap(140, 95, 10);
  assert.equal(r.gap, 35);
  assert.equal(r.nivel, 'alto');
});

test('Osmolaridade: Na 140, glicemia 90, ureia 28 → normal', () => {
  const r = calcularOsmolaridade(140, 90, 28);
  // 2*140 + 90/18 + 28/2.8 = 280 + 5 + 10 = 295
  assert.equal(r.osmolaridade, 295);
  assert.equal(r.nivel, 'baixo');
});

test('Osmolaridade: hiperglicemia grave eleva a osmolaridade', () => {
  const r = calcularOsmolaridade(140, 600, 28);
  assert.ok(r.osmolaridade > 295);
  assert.equal(r.nivel, 'alto');
});

test('Défice de água livre: homem 70kg, Na 160 → défice positivo', () => {
  const r = calcularDeficeAguaLivre(70, 160, false);
  // TBW = 70*0.6 = 42; défice = 42*(160/140-1) = 42*0.142857 = 6.0
  assert.equal(r.aguaCorporalTotal, 42);
  assert.equal(r.defice, 6);
});

test('Défice de água livre: só válido em hipernatremia', () => {
  assert.equal(calcularDeficeAguaLivre(70, 138, false).ok, false);
});

test('HOMA-IR: glicemia 90, insulina 10 → 2.22, sem resistência', () => {
  const r = calcularHOMAIR(90, 10);
  assert.equal(r.homa, 2.22);
  assert.equal(r.nivel, 'baixo');
});

test('HOMA-IR: valores elevados → resistência à insulina', () => {
  const r = calcularHOMAIR(120, 25);
  // 120*25/405 = 7.41
  assert.equal(r.nivel, 'alto');
});
