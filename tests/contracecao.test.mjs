import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CONDICOES, METODOS, POS_PARTO, avaliarContracecao } from '../assets/js/contracecao-core.js';

// Valores conferidos com a tabela-resumo e as tabelas de cada método da OMS (MEC, 6.ª edição, 2025).
const cat = (dados) => Object.fromEntries(avaliarContracecao(dados).metodos.map((m) => [m.id, m.inicio === m.continuacao ? m.inicio : `${m.inicio}/${m.continuacao}`]));
const base = { idade: 30 };

test('sem condições, aos 30 anos, todos os métodos são categoria 1', () => {
  assert.deepEqual(cat(base), { chc: 1, pop: 1, dmpa: 1, implante: 1, cu: 1, lng: 1 });
});

test('idade: combinados 2 a partir dos 40; DIU 2 antes dos 20; injetável 2 antes dos 18 e depois dos 45', () => {
  assert.deepEqual(cat({ idade: 16 }), { chc: 1, pop: 1, dmpa: 2, implante: 1, cu: 2, lng: 2 });
  assert.deepEqual(cat({ idade: 42 }), { chc: 2, pop: 1, dmpa: 1, implante: 1, cu: 1, lng: 1 });
  assert.equal(cat({ idade: 47 }).dmpa, 2);
  assert.equal(avaliarContracecao({ idade: '' }).ok, false);
});

test('tabaco depende da idade e do número de cigarros', () => {
  assert.equal(cat({ idade: 30, tabaco: 'mais15' }).chc, 2);
  assert.equal(cat({ idade: 36, tabaco: 'menos15' }).chc, 3);
  assert.equal(cat({ idade: 36, tabaco: 'mais15' }).chc, 4);
  assert.equal(cat({ idade: 36, tabaco: 'mais15' }).pop, 1);
});

test('enxaqueca: início e continuação', () => {
  assert.deepEqual(cat({ ...base, enxaqueca: 'com-aura' }), { chc: 4, pop: '2/3', dmpa: '2/3', implante: '2/3', cu: 1, lng: '2/3' });
  assert.deepEqual(cat({ idade: 30, enxaqueca: 'sem-aura' }), { chc: '2/3', pop: '1/2', dmpa: 2, implante: 2, cu: 1, lng: 2 });
  assert.equal(cat({ idade: 38, enxaqueca: 'sem-aura' }).chc, '3/4');
});

test('hipertensão e tromboembolismo', () => {
  assert.deepEqual(cat({ ...base, hta: 'grave' }), { chc: 4, pop: 2, dmpa: 3, implante: 2, cu: 1, lng: 2 });
  assert.deepEqual(cat({ ...base, condicoes: ['tev-aguda'] }), { chc: 4, pop: 3, dmpa: 3, implante: 3, cu: 1, lng: 3 });
  assert.deepEqual(cat({ ...base, condicoes: ['cardiopatia'] }), { chc: 4, pop: '2/3', dmpa: 3, implante: '2/3', cu: 1, lng: '2/3' });
  assert.deepEqual(cat({ ...base, condicoes: ['avc'] }), { chc: 4, pop: '2/3', dmpa: 3, implante: '2/3', cu: 1, lng: 2 });
  assert.equal(cat({ ...base, condicoes: ['fatores-cv'] }).chc, '3/4');
});

test('pós-parto e amamentação', () => {
  assert.deepEqual(cat({ ...base, posParto: 'am-48h' }), { chc: 4, pop: 2, dmpa: 2, implante: 2, cu: 1, lng: 2 });
  assert.deepEqual(cat({ ...base, posParto: 'am-4s' }), { chc: 4, pop: 2, dmpa: 2, implante: 2, cu: 3, lng: 3 });
  assert.deepEqual(cat({ ...base, posParto: 'am-6m' }), { chc: 3, pop: 1, dmpa: 1, implante: 1, cu: 1, lng: 1 });
  assert.equal(cat({ ...base, posParto: 'na-21d' }).chc, 3);
  assert.equal(cat({ ...base, posParto: 'na-21d', tevPosParto: true }).chc, 4);
  assert.equal(cat({ ...base, posParto: 'na-6s', tevPosParto: true }).chc, 3);
  assert.equal(cat({ ...base, posParto: 'na-mais', tevPosParto: true }).chc, 1);
});

test('cancro, infeções pélvicas e medicamentos', () => {
  assert.deepEqual(cat({ ...base, condicoes: ['mama-atual'] }), { chc: 4, pop: 4, dmpa: 4, implante: 4, cu: 1, lng: 4 });
  assert.deepEqual(cat({ ...base, condicoes: ['dip'] }), { chc: 1, pop: 1, dmpa: 1, implante: 1, cu: '4/2', lng: '4/2' });
  assert.deepEqual(cat({ ...base, condicoes: ['anticonvulsivantes'] }), { chc: 3, pop: 3, dmpa: 1, implante: 2, cu: 1, lng: 1 });
  assert.deepEqual(cat({ ...base, condicoes: ['les-apl'] }), { chc: 4, pop: 3, dmpa: 3, implante: 3, cu: 1, lng: 3 });
});

test('com várias condições conta a mais alta, e as razões vêm da mais à menos restritiva', () => {
  const r = avaliarContracecao({ idade: 42, tabaco: 'menos15', condicoes: ['obesidade', 'tev-historia'] });
  const chc = r.metodos.find((m) => m.id === 'chc');
  assert.equal(chc.inicio, 4);
  assert.equal(chc.razoes[0].texto, 'Antecedentes de TVP ou TEP');
  assert.deepEqual(chc.razoes.map((x) => x.inicio), [4, 3, 2, 2]);
});

test('todas as condições têm uma categoria para os seis métodos', () => {
  const validos = new Set([1, 2, 3, 4, '3/4']);
  const ok = (v) => (Array.isArray(v) ? v.every((x) => validos.has(x)) : validos.has(v));
  for (const c of [...CONDICOES.filter((x) => x.cat), ...POS_PARTO.filter((x) => x.cat)]) {
    for (const m of METODOS) assert.ok(ok(c.cat[m.id]), `${c.id || c.texto}/${m.id}`);
  }
});
