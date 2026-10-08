import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ICONES, icone } from '../assets/js/icones.js';
import { DOENCAS } from '../assets/js/doencas-dados.js';

const raiz = new URL('..', import.meta.url).pathname;
const ler = (p) => readFileSync(join(raiz, p), 'utf8');
const emoji = /\p{Extended_Pictographic}/u;

test('cada doença tem um ícone SVG da biblioteca', () => {
  for (const d of DOENCAS) {
    assert.ok(ICONES[d.icone], `${d.id}: ícone «${d.icone}» não existe`);
    assert.ok(!('emoji' in d), `${d.id}: ainda tem emoji`);
  }
});

test('os ícones são SVG de traço, sem cores fixas', () => {
  for (const [nome, corpo] of Object.entries(ICONES)) {
    assert.ok(!emoji.test(corpo), `${nome}: tem emoji`);
    assert.ok(!/(fill|stroke)="#/.test(corpo), `${nome}: cor fixa`);
    assert.match(icone(nome), /^<svg [^>]*viewBox="0 0 24 24"[^>]*>.*<\/svg>$/s);
  }
  assert.throws(() => icone('nao-existe'));
});

test('os cartões e etiquetas das páginas usam os SVG da biblioteca, sem emoji', () => {
  for (const pagina of ['index.html', 'ferramentas/index.html']) {
    const html = ler(pagina);
    const icones = [...html.matchAll(/<span class="(?:tool-icon|ico)"[^>]*>(.*?)<\/span>/gs)];
    assert.ok(icones.length > 0, `${pagina}: sem ícones`);
    for (const [span, corpo] of icones) {
      const nome = span.match(/data-icone="([^"]+)"/)?.[1];
      assert.ok(nome, `${pagina}: ícone sem data-icone: ${span.slice(0, 80)}`);
      const tamanho = Number(corpo.match(/width="(\d+)"/)?.[1]);
      assert.equal(corpo, icone(nome, tamanho), `${pagina}: o SVG de «${nome}» não coincide com a biblioteca`);
    }
  }
});
