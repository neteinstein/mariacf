import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DOENCAS, GRUPOS, encontrarDoenca, grupoValido } from '../assets/js/doencas-dados.js';
import { ILUSTRACOES, ilustracao } from '../assets/js/doencas-ilustracoes.js';

const raiz = new URL('..', import.meta.url).pathname;
const palavras = (s) => s.trim().split(/\s+/).length;

test('há as oito doenças pedidas, cada uma com um id único', () => {
  assert.deepEqual(
    DOENCAS.map((d) => d.id),
    ['diabetes', 'cancro-mama', 'hipertensao', 'artroses', 'depressao', 'dislipidemia', 'amiotrofia', 'pneumonia']
  );
});

test('os cinco grupos etários estão pela ordem certa', () => {
  assert.deepEqual(
    GRUPOS.map((g) => g.id),
    ['3-5', '5-12', '13-17', '18-65', '65+']
  );
});

test('cada doença tem conteúdo para todos os grupos etários', () => {
  for (const d of DOENCAS) {
    assert.ok(d.nome && d.resumo && d.emoji && d.categoria, `${d.id}: faltam dados do cartão`);
    for (const g of GRUPOS) assert.ok(d.grupos[g.id], `${d.id}: falta o grupo ${g.id}`);
    assert.deepEqual(Object.keys(d.grupos).sort(), GRUPOS.map((g) => g.id).sort(), `${d.id}: grupos a mais`);
  }
});

test('todas as ilustrações referidas existem e desenham um SVG', () => {
  for (const d of DOENCAS) {
    assert.ok(ILUSTRACOES[d.heroi], `${d.id}: ilustração principal ${d.heroi} não existe`);
    for (const [id, g] of Object.entries(d.grupos)) {
      for (const [nome, legenda] of g.imagens || []) {
        assert.ok(ILUSTRACOES[nome], `${d.id}/${id}: ilustração ${nome} não existe`);
        assert.ok(legenda.trim(), `${d.id}/${id}: ${nome} sem legenda`);
      }
    }
  }
  for (const nome of Object.keys(ILUSTRACOES)) {
    const svg = ilustracao(nome);
    assert.match(svg, /^<svg class="il" viewBox="0 0 200 150"[^>]*>[\s\S]+<\/svg>$/, nome);
    assert.ok(!svg.includes('NaN') && !svg.includes('undefined'), `${nome}: coordenadas inválidas`);
  }
});

test('os elementos animados não têm atributo transform (a animação CSS apagá-lo-ia)', () => {
  for (const nome of Object.keys(ILUSTRACOES)) {
    for (const [tag] of ilustracao(nome).matchAll(/<[^>]+>/g)) {
      if (/class="[^"]*\ban-/.test(tag)) assert.ok(!/\stransform="/.test(tag), `${nome}: ${tag}`);
    }
  }
});

test('3–5 anos: só imagens com legendas curtas', () => {
  for (const d of DOENCAS) {
    const g = d.grupos['3-5'];
    assert.deepEqual(Object.keys(g), ['imagens'], `${d.id}: o grupo 3–5 deve ter só imagens`);
    assert.ok(g.imagens.length >= 5, `${d.id}: poucas imagens para os 3–5 anos`);
    for (const [, legenda] of g.imagens) assert.ok(palavras(legenda) <= 10, `${d.id}: legenda longa «${legenda}»`);
  }
});

test('5–12 anos: imagens, explicações e uma curiosidade', () => {
  for (const d of DOENCAS) {
    const g = d.grupos['5-12'];
    assert.ok(g.intro && g.curiosidade, d.id);
    assert.ok(g.imagens.length >= 3, d.id);
    assert.ok(g.seccoes.length >= 3, d.id);
  }
});

test('adolescentes, adultos e séniores: imagens, texto e quando procurar ajuda', () => {
  for (const d of DOENCAS) {
    for (const id of ['13-17', '18-65', '65+']) {
      const g = d.grupos[id];
      assert.ok(g.intro, `${d.id}/${id}: falta a introdução`);
      assert.ok(g.imagens?.length >= 2, `${d.id}/${id}: faltam imagens`);
      assert.ok(g.seccoes?.length >= 3, `${d.id}/${id}: faltam secções`);
      assert.ok(g.alerta?.lista.length, `${d.id}/${id}: falta o alerta`);
      for (const s of g.seccoes) assert.ok(s.texto || s.lista?.length, `${d.id}/${id}: secção vazia «${s.titulo}»`);
    }
    assert.ok(d.grupos['13-17'].mitos.length >= 3, `${d.id}: faltam mitos para adolescentes`);
    // Os séniores têm mais imagens do que os adultos.
    assert.ok(d.grupos['65+'].imagens.length > d.grupos['18-65'].imagens.length, `${d.id}: séniores com poucas imagens`);
  }
});

test('as ligações para calculadoras apontam para páginas que existem', () => {
  for (const d of DOENCAS) {
    for (const g of Object.values(d.grupos)) {
      for (const l of g.ligacoes || []) {
        const pasta = l.href.split('?')[0];
        assert.ok(existsSync(join(raiz, pasta, 'index.html')), `${d.id}: ${l.href} não existe`);
      }
    }
  }
});

test('encontrar doença e validar grupo', () => {
  assert.equal(encontrarDoenca('pneumonia').nome, 'Pneumonia');
  assert.equal(encontrarDoenca('gripe'), null);
  assert.equal(encontrarDoenca(null), null);
  assert.ok(grupoValido('65+'));
  assert.ok(!grupoValido('99'));
  assert.ok(!grupoValido(null));
});
