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
  const doencas = readdirSync(join(raiz, 'doencas'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => `doencas/${e.name}/`);
  const esperado = ['./', 'manifest.webmanifest', ...paginas.map((d) => `${d}/`), ...doencas, ...ficheirosEm('assets')];
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

test('cada calculadora diz as suas fontes e quando foram revistas', () => {
  for (const c of calculadoras) {
    const html = ler(`${c}/index.html`);
    const seccao = html.match(/<section class="fontes[^"]*"[\s\S]*?<\/section>/)?.[0];
    assert.ok(seccao, `${c}: falta a secção «Fontes»`);
    assert.ok((seccao.match(/<li>/g) || []).length >= 1, `${c}: secção «Fontes» vazia`);
    const data = seccao.match(/<time datetime="(\d{4}-\d{2}-\d{2})">/)?.[1];
    assert.ok(data && !Number.isNaN(Date.parse(data)), `${c}: falta a data de revisão`);
    assert.ok(new Date(data) <= new Date(), `${c}: data de revisão no futuro`);
  }
});

test('os tipos de letra são do próprio site (sem pedidos ao Google Fonts)', () => {
  const htmls = ['index.html', '404.html', ...paginas.map((d) => `${d}/index.html`), ...ficheirosEm('doencas').filter((f) => f.endsWith('.html'))];
  for (const f of htmls) assert.ok(!/fonts\.(googleapis|gstatic)\.com/.test(ler(f)), `${f} ainda carrega tipos de letra do Google`);
  for (const [, url] of css.matchAll(/url\('\.\.\/(fonts\/[^']+)'\)/g)) {
    assert.ok(existsSync(join(raiz, 'assets', url)), `${url} não existe`);
  }
});

test('SEO: cada página tem título único, descrição, canonical e dados estruturados válidos', () => {
  const doencas = readdirSync(join(raiz, 'doencas'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => `doencas/${e.name}`);
  const titulos = new Map();
  for (const p of ['', ...paginas, ...doencas]) {
    const f = p ? `${p}/index.html` : 'index.html';
    const html = ler(f);
    const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1];
    assert.ok(titulo, `${f}: falta o <title>`);
    assert.ok(!titulos.has(titulo), `${f}: o título repete o de ${titulos.get(titulo)}`);
    titulos.set(titulo, f);
    const descricao = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
    assert.ok(descricao.length >= 70, `${f}: descrição curta demais para os resultados de pesquisa`);
    assert.ok(html.includes(`<link rel="canonical" href="https://mariacf.pt/${p ? `${p}/` : ''}">`), `${f}: canonical errado`);
    const grafo = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => {
      const ld = JSON.parse(m[1]);
      return ld['@graph'] || [ld];
    });
    const tipos = grafo.map((n) => n['@type']);
    if (p) assert.ok(tipos.includes('BreadcrumbList'), `${f}: faltam as migalhas (BreadcrumbList)`);
    if (p.startsWith('calculadora-')) assert.ok(tipos.includes('WebApplication'), `${f}: falta a WebApplication`);
  }
});
