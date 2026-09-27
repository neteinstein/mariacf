import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularSCORE2, calcularSCORE2Diabetes, mgDlParaMmolL } from '../assets/js/risco-cardiovascular-core.js';

test('mgDlParaMmolL: 200 mg/dL ≈ 5,17 mmol/L', () => {
  assert.ok(Math.abs(mgDlParaMmolL(200) - 5.17) < 0.01);
});

test('SCORE2: homem 60 anos, não fumador, PAS 140, CT 5,5, HDL 1,3 → risco moderado plausível', () => {
  const r = calcularSCORE2({ idade: 60, sexoFeminino: false, fumador: false, sbp: 140, colTotalMmol: 5.5, hdlMmol: 1.3 });
  assert.equal(r.ok, true);
  assert.equal(r.modelo, 'SCORE2');
  assert.ok(r.risco > 5 && r.risco < 20, `risco fora do plausível: ${r.risco}`);
});

test('SCORE2: fumar e PAS mais alta aumentam sempre o risco', () => {
  const base = calcularSCORE2({ idade: 55, sexoFeminino: false, fumador: false, sbp: 120, colTotalMmol: 5, hdlMmol: 1.3 });
  const fumador = calcularSCORE2({ idade: 55, sexoFeminino: false, fumador: true, sbp: 120, colTotalMmol: 5, hdlMmol: 1.3 });
  const hipertenso = calcularSCORE2({ idade: 55, sexoFeminino: false, fumador: false, sbp: 170, colTotalMmol: 5, hdlMmol: 1.3 });
  assert.ok(fumador.risco > base.risco);
  assert.ok(hipertenso.risco > base.risco);
});

test('SCORE2: idade ≥70 usa o modelo SCORE2-OP', () => {
  const r = calcularSCORE2({ idade: 75, sexoFeminino: false, fumador: false, sbp: 140, colTotalMmol: 5.5, hdlMmol: 1.3 });
  assert.equal(r.ok, true);
  assert.equal(r.modelo, 'SCORE2-OP');
});

test('SCORE2: mulher tem risco diferente de homem, mesmos fatores', () => {
  const homem = calcularSCORE2({ idade: 60, sexoFeminino: false, fumador: true, sbp: 150, colTotalMmol: 6, hdlMmol: 1.2 });
  const mulher = calcularSCORE2({ idade: 60, sexoFeminino: true, fumador: true, sbp: 150, colTotalMmol: 6, hdlMmol: 1.2 });
  assert.notEqual(homem.risco, mulher.risco);
});

test('SCORE2: valores em falta são inválidos', () => {
  assert.equal(calcularSCORE2({ idade: '', sexoFeminino: false, fumador: false, sbp: 120, colTotalMmol: 5, hdlMmol: 1.3 }).ok, false);
  assert.equal(calcularSCORE2({ idade: 30, sexoFeminino: false, fumador: false, sbp: 120, colTotalMmol: 5, hdlMmol: 1.3 }).ok, false);
});

test('SCORE2-Diabetes: risco sempre calculável para diabético 55 anos', () => {
  const r = calcularSCORE2Diabetes({
    idade: 55, sexoFeminino: false, fumador: false, sbp: 140, colTotalMmol: 5.2, hdlMmol: 1.2,
    idadeDiagnostico: 48, hba1c: 53, egfr: 85,
  });
  assert.equal(r.ok, true);
  assert.equal(r.modelo, 'SCORE2-Diabetes');
  assert.ok(r.risco > 0 && r.risco < 100);
});

test('SCORE2-Diabetes: eGFR mais baixa aumenta o risco', () => {
  const rimNormal = calcularSCORE2Diabetes({
    idade: 55, sexoFeminino: false, fumador: false, sbp: 140, colTotalMmol: 5.2, hdlMmol: 1.2,
    idadeDiagnostico: 48, hba1c: 53, egfr: 90,
  });
  const rimReduzido = calcularSCORE2Diabetes({
    idade: 55, sexoFeminino: false, fumador: false, sbp: 140, colTotalMmol: 5.2, hdlMmol: 1.2,
    idadeDiagnostico: 48, hba1c: 53, egfr: 40,
  });
  assert.ok(rimReduzido.risco > rimNormal.risco);
});

test('SCORE2-Diabetes: idade de diagnóstico não pode exceder a idade atual', () => {
  const r = calcularSCORE2Diabetes({
    idade: 50, sexoFeminino: false, fumador: false, sbp: 140, colTotalMmol: 5.2, hdlMmol: 1.2,
    idadeDiagnostico: 55, hba1c: 53, egfr: 85,
  });
  assert.equal(r.ok, false);
});
