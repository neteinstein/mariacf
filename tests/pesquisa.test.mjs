import { test } from 'node:test';
import assert from 'node:assert/strict';
import { procurar } from '../assets/js/pesquisa.js';
import { INDICE } from '../assets/js/pesquisa-indice.js';
import { alternarFavorito, registarVisita } from '../assets/js/favoritos.js';

const titulos = (termo) => procurar(INDICE, termo).map((r) => r.titulo);

test('a pesquisa global encontra ferramentas, doenças e secções', () => {
  assert.equal(titulos('diabetes')[0], 'Diabetes');
  assert.ok(titulos('curb')[0].startsWith('CURB-65'));
  assert.ok(titulos('usf').includes('USF Nova Saúde'));
  assert.ok(titulos('febre').includes('Gripe'));
});

test('a pesquisa ignora acentos e maiúsculas e exige todas as palavras', () => {
  assert.deepEqual(titulos('AVC'), titulos('avc'));
  assert.ok(titulos('pneumonia').length > 0);
  assert.deepEqual(titulos('pneumonia xyzabc'), []);
  assert.deepEqual(titulos('   '), []);
  assert.ok(procurar(INDICE, 'a').length <= 8);
});

test('cada entrada do índice aponta para uma página do site', () => {
  for (const it of INDICE) assert.match(it.url, /^[a-z0-9-]+\/([a-z0-9-]+\/)?$/, it.titulo);
});

test('recentes: o mais recente primeiro, sem repetidos e no máximo seis', () => {
  let r = [];
  for (const id of ['a', 'b', 'c', 'a', 'd', 'e', 'f', 'g']) r = registarVisita(r, id);
  assert.deepEqual(r, ['g', 'f', 'e', 'd', 'a', 'c']);
});

test('favoritos: marcar e desmarcar', () => {
  assert.deepEqual(alternarFavorito([], 'x'), ['x']);
  assert.deepEqual(alternarFavorito(['x', 'y'], 'x'), ['y']);
});
