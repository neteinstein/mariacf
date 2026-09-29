import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularFIB4, calcularNFS, calcularAPRI, calcularChildPugh, calcularMELD } from '../assets/js/hepatica-core.js';

test('FIB-4: 50 anos, AST 40, ALT 36, plaquetas 200 → 1,67 (indeterminado)', () => {
  const r = calcularFIB4(50, 40, 36, 200);
  assert.equal(r.fib4, 1.67);
  assert.equal(r.nivel, 'moderado');
});

test('FIB-4: limiar baixo passa a 2,0 a partir dos 65 anos', () => {
  const r = calcularFIB4(70, 30, 36, 250); // 70×30/(250×6) = 1,4
  assert.equal(r.fib4, 1.4);
  assert.equal(r.limiarBaixo, 2);
  assert.equal(r.nivel, 'baixo');
});

test('FIB-4: > 2,67 é alto risco; < 35 anos tem aviso', () => {
  assert.equal(calcularFIB4(60, 80, 25, 100).nivel, 'alto');
  assert.ok(calcularFIB4(30, 30, 30, 250).aviso);
  assert.equal(calcularFIB4(50, '', 36, 200).ok, false);
});

test('NAFLD fibrosis score: valor calculado à mão', () => {
  const r = calcularNFS({ idade: 50, imc: 30, diabetes: true, ast: 40, alt: 40, plaquetas: 200, albumina: 4 });
  // −1,675 + 1,85 + 2,82 + 1,13 + 0,99 − 2,6 − 2,64 = −0,125
  assert.equal(r.nfs, -0.12);
  assert.equal(r.nivel, 'moderado');
});

test('APRI: AST 80 (LSN 40), plaquetas 100 → 2,0 (cirrose provável)', () => {
  const r = calcularAPRI(80, 40, 100);
  assert.equal(r.apri, 2);
  assert.equal(r.nivel, 'muito-alto');
});

test('Child-Pugh: 5 → A, 8 → B, 12 → C', () => {
  assert.equal(calcularChildPugh({ bilirrubina: 1, albumina: 1, inr: 1, ascite: 1, encefalopatia: 1 }).classe, 'A');
  assert.equal(calcularChildPugh({ bilirrubina: 2, albumina: 2, inr: 2, ascite: 1, encefalopatia: 1 }).classe, 'B');
  assert.equal(calcularChildPugh({ bilirrubina: 3, albumina: 3, inr: 2, ascite: 2, encefalopatia: 2 }).classe, 'C');
  assert.equal(calcularChildPugh({ bilirrubina: 1 }).ok, false);
});

test('MELD: valores mínimos → 6; diálise conta como creatinina 4', () => {
  assert.equal(calcularMELD({ bilirrubina: 0.5, inr: 1, creatinina: 0.8 }).meld, 6);
  const d = calcularMELD({ bilirrubina: 1, inr: 1, creatinina: 1, dialise: true });
  assert.equal(d.meld, Math.round(9.57 * Math.log(4) + 6.43));
});

test('MELD-Na: bili 3, INR 1,8, creat 1,5, Na 130', () => {
  const r = calcularMELD({ bilirrubina: 3, inr: 1.8, creatinina: 1.5, sodio: 130 });
  // MELD = 3,78·ln3 + 11,2·ln1,8 + 9,57·ln1,5 + 6,43 = 21,1
  assert.equal(r.meld, 21);
  // MELD-Na = 21,1 + 1,32×7 − 0,033×21,1×7 = 25,4
  assert.equal(r.meldNa, 25);
  assert.equal(r.nivel, 'alto');
});
