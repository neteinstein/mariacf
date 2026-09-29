import { test } from 'node:test';
import assert from 'node:assert/strict';
import { converterCorticoide } from '../assets/js/corticoides-core.js';

const eq = (r, id) => r.equivalentes.find((c) => c.id === id).equivalente;

test('prednisolona 20 mg → metilprednisolona 16, dexametasona 3, hidrocortisona 80', () => {
  const r = converterCorticoide('prednisolona', 20);
  assert.equal(eq(r, 'metilprednisolona'), 16);
  assert.equal(eq(r, 'dexametasona'), 3);
  assert.equal(eq(r, 'hidrocortisona'), 80);
  assert.equal(eq(r, 'deflazacorte'), 24);
  assert.equal(r.nivel, 'alto');
});

test('dexametasona 4 mg ≈ 26,5 mg de prednisolona', () => {
  const r = converterCorticoide('dexametasona', 4);
  assert.equal(r.prednisolona, 26.5);
});

test('validação', () => {
  assert.equal(converterCorticoide('xpto', 5).ok, false);
  assert.equal(converterCorticoide('prednisolona', '').ok, false);
});
