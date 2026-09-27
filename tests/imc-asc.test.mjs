import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularIMC, classificarIMC } from '../assets/js/imc-asc-core.js';

test('70 kg, 175 cm → IMC 22,9 (peso normal)', () => {
  const r = calcularIMC(70, 175);
  assert.equal(r.ok, true);
  assert.equal(r.imc, 22.9);
  assert.equal(r.categoria.id, 'normal');
});

test('categorias de IMC (OMS)', () => {
  assert.equal(classificarIMC(17).id, 'baixo-peso');
  assert.equal(classificarIMC(18.5).id, 'normal');
  assert.equal(classificarIMC(24.9).id, 'normal');
  assert.equal(classificarIMC(25).id, 'excesso-peso');
  assert.equal(classificarIMC(32).id, 'obesidade-1');
  assert.equal(classificarIMC(37).id, 'obesidade-2');
  assert.equal(classificarIMC(45).id, 'obesidade-3');
});

test('área de superfície corporal (Mosteller e Du Bois)', () => {
  const r = calcularIMC(70, 175);
  assert.equal(r.ascMosteller, 1.84);
  assert.equal(r.ascDuBois, 1.85);
});

test('peso ou altura fora do intervalo', () => {
  assert.equal(calcularIMC(70, 40).ok, false);
  assert.equal(calcularIMC(10, 175).ok, false);
  assert.equal(calcularIMC(70, 300).ok, false);
});

test('valores inválidos', () => {
  assert.equal(calcularIMC('', 175).ok, false);
  assert.equal(calcularIMC(70, '').ok, false);
  assert.equal(calcularIMC(-5, 175).ok, false);
});
