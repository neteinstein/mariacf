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

test('cada calculadora tem um cartão na página de ferramentas', () => {
  const ferramentas = ler('ferramentas/index.html');
  for (const c of calculadoras) {
    assert.ok(ferramentas.includes(`href="../${c}/"`), `${c} não aparece na página de ferramentas`);
  }
});

test('as páginas das calculadoras voltam para a página de ferramentas', () => {
  for (const c of calculadoras) {
    assert.ok(ler(`${c}/index.html`).includes('href="../ferramentas/"'), `${c} não liga às ferramentas`);
  }
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

// O favicon e a cor da barra do browser acompanham o logótipo do cabeçalho (tokens --brand-* de cada paleta).
const css = ler('assets/css/styles.css');
const tokensDoBloco = (seletor) => {
  const i = css.indexOf(`${seletor} {`);
  assert.ok(i >= 0, `bloco ${seletor} não encontrado em styles.css`);
  const bloco = css.slice(i, css.indexOf('}', i));
  return Object.fromEntries([...bloco.matchAll(/--(brand-[abc]):\s*(#[0-9a-f]{6})/g)].map((m) => [m[1], m[2]]));
};

test('o favicon tem as cores do logótipo da paleta predefinida', () => {
  const marca = tokensDoBloco(':root');
  const paragens = [...ler('assets/img/favicon.svg').matchAll(/stop-color="(#[0-9a-f]{6})"/g)].map((m) => m[1]);
  assert.deepEqual(paragens, [marca['brand-b'], marca['brand-a'], marca['brand-c']]);
});

test('a cor da barra do browser de cada paleta é a cor de marca dessa paleta', () => {
  const site = ler('assets/js/site.js');
  const paletas = [...site.matchAll(/\{ id: '(\w+)', nome: '[^']+', cores: \['(#[0-9a-f]{6})'/g)].map((m) => [m[1], m[2]]);
  assert.ok(paletas.length >= 2, 'lista PALETAS não encontrada em site.js');
  const [predefinida] = paletas[0];
  for (const [id, cor] of paletas) {
    const marca = tokensDoBloco(id === predefinida ? ':root' : `:root[data-palette='${id}']`);
    assert.equal(cor, marca['brand-a'], `${id}: a primeira cor em site.js devia ser --brand-a`);
  }
  for (const p of paginas) {
    assert.ok(ler(`${p}/index.html`).includes(`<meta name="theme-color" content="${paletas[0][1]}">`), `${p}: theme-color diferente da predefinida`);
  }
});

test('a página inicial tem um cartão por secção e números certos', async () => {
  const { DOENCAS } = await import('../assets/js/doencas-dados.js');
  const inicio = ler('index.html');
  for (const s of ['doencas', 'ferramentas', 'usf', 'sns', 'sobre']) {
    assert.ok(inicio.match(new RegExp(`<a class="tool[^"]*" href="${s}/"`)), `falta o cartão de ${s}`);
  }
  assert.ok(inicio.includes(`data-contar="${DOENCAS.length}"`), 'o número de doenças na página inicial está desatualizado');
  assert.ok(inicio.includes(`data-contar="${calculadoras.length}"`), 'o número de ferramentas na página inicial está desatualizado');
});
