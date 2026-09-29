import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const raiz = new URL('..', import.meta.url).pathname;
const ler = (p) => readFileSync(join(raiz, p), 'utf8');

const paginas = readdirSync(raiz)
  .filter((d) => !d.startsWith('.') && existsSync(join(raiz, d, 'index.html')))
  .sort();
const calculadoras = paginas.filter((d) => d.startsWith('calculadora-'));

function ficheirosEm(dir) {
  return readdirSync(join(raiz, dir)).flatMap((f) => {
    if (f.startsWith('.')) return [];
    const p = `${dir}/${f}`;
    return statSync(join(raiz, p)).isDirectory() ? ficheirosEm(p) : [p];
  });
}

const precache = [...ler('sw.js').matchAll(/^\s+'([^']+)',$/gm)].map((m) => m[1]);

test('cada calculadora tem um cartão na página inicial', () => {
  const inicio = ler('index.html');
  for (const c of calculadoras) assert.ok(inicio.includes(`href="${c}/"`), `${c} não aparece na página inicial`);
});

test('o service worker guarda todas as páginas e ficheiros do site', () => {
  const esperado = ['./', 'manifest.webmanifest', ...paginas.map((d) => `${d}/`), ...ficheirosEm('assets')];
  for (const f of esperado) assert.ok(precache.includes(f), `${f} falta na lista PRECACHE de sw.js`);
});

test('todas as entradas do service worker existem', () => {
  for (const f of precache) {
    const caminho = f === './' ? 'index.html' : f.endsWith('/') ? `${f}index.html` : f;
    assert.ok(existsSync(join(raiz, caminho)), `${f} está em PRECACHE mas não existe`);
  }
});

test('todas as páginas ligam o manifesto e os scripts que referem existem', () => {
  for (const pagina of ['index.html', ...paginas.map((d) => `${d}/index.html`)]) {
    const html = ler(pagina);
    assert.ok(html.includes('rel="manifest"'), `${pagina} não liga o manifesto`);
    const base = pagina.includes('/') ? pagina.split('/')[0] : '.';
    for (const [, src] of html.matchAll(/<script src="([^"]+)"/g)) {
      assert.ok(existsSync(join(raiz, base, src)), `${pagina}: script ${src} não existe`);
    }
  }
});
