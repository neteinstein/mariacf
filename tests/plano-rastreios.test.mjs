import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planoRastreios } from '../assets/js/plano-rastreios-core.js';

const ids = (lista) => lista.map((r) => r.id);

test('mulher de 30 anos: colo do útero agora; mama e cólon no futuro', () => {
  const r = planoRastreios(30, 'f');
  assert.equal(r.ok, true);
  assert.ok(ids(r.agora).includes('colo-utero'));
  assert.ok(!ids(r.agora).includes('mama'));
  const mama = r.futuros.find((x) => x.id === 'mama');
  assert.equal(mama.aPartirDe, 45);
  assert.equal(mama.faltamAnos, 15);
  assert.ok(ids(r.futuros).includes('colorretal'));
});

test('homem de 55 anos: cólon, risco CV e PSA partilhado; nunca colo do útero nem mama', () => {
  const r = planoRastreios(55, 'm');
  assert.ok(ids(r.agora).includes('colorretal'));
  assert.ok(ids(r.agora).includes('risco-cv'));
  assert.ok(ids(r.agora).includes('prostata'));
  const todos = [...r.agora, ...r.futuros, ...r.terminados].map((x) => x.id);
  assert.ok(!todos.includes('colo-utero'));
  assert.ok(!todos.includes('mama'));
});

test('risco cardiovascular: homens a partir dos 40, mulheres a partir dos 50', () => {
  assert.ok(ids(planoRastreios(42, 'm').agora).includes('risco-cv'));
  assert.ok(!ids(planoRastreios(42, 'f').agora).includes('risco-cv'));
});

test('condições: aneurisma só em fumadores; retinopatia só na diabetes', () => {
  assert.ok(!ids(planoRastreios(68, 'm').agora).includes('aaa'));
  assert.ok(ids(planoRastreios(68, 'm', { fumador: true }).agora).includes('aaa'));
  assert.ok(ids(planoRastreios(40, 'f', { diabetes: true }).agora).includes('retinopatia'));
  assert.ok(ids(planoRastreios(40, 'f', { hipertensao: true }).agora).includes('rim-diabetes'));
});

test('mulher de 80 anos: rastreios oncológicos terminados', () => {
  const r = planoRastreios(80, 'f');
  assert.ok(ids(r.terminados).includes('mama'));
  assert.ok(ids(r.terminados).includes('colorretal'));
  assert.ok(ids(r.agora).includes('osteoporose'));
});

test('validação', () => {
  assert.equal(planoRastreios(10, 'f').ok, false);
  assert.equal(planoRastreios(40, '').ok, false);
});
