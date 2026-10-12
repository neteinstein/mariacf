// Teste de acessibilidade (axe-core) das páginas do site, num Chromium sem interface.
// Corre à parte dos testes rápidos: npm run test:a11y (precisa do browser do Playwright).
// Falha com problemas «sérios» ou «críticos» das regras WCAG 2.1 A/AA, no tema claro e no escuro.

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { readdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const raiz = new URL('../..', import.meta.url).pathname;
const axeFonte = await readFile(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml',
};

let servidor;
let base;
let browser;

before(async () => {
  servidor = createServer(async (req, res) => {
    let caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (caminho.endsWith('/')) caminho += 'index.html';
    const ficheiro = join(raiz, caminho);
    try {
      if (!ficheiro.startsWith(raiz) || !(await stat(ficheiro)).isFile()) throw new Error();
      res.writeHead(200, { 'content-type': TIPOS[extname(ficheiro)] || 'application/octet-stream' });
      res.end(await readFile(ficheiro));
    } catch {
      res.writeHead(404, { 'content-type': TIPOS['.html'] });
      res.end(await readFile(join(raiz, '404.html')));
    }
  });
  await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${servidor.address().port}/`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  servidor?.close();
});

const seccoes = readdirSync(raiz)
  .filter((d) => !d.startsWith('.') && d !== 'node_modules' && existsSync(join(raiz, d, 'index.html')))
  .sort();
// Todas as secções e calculadoras, a página 404 e algumas doenças (todas usam o mesmo molde).
const paginas = ['', ...seccoes.map((d) => `${d}/`), '404.html', 'doencas/diabetes/', 'doencas/asma/?idade=3-5', 'doencas/otite/?idade=65%2B'];

async function verificar(url, tema) {
  const contexto = await browser.newContext({ colorScheme: tema, reducedMotion: 'reduce', serviceWorkers: 'block' });
  const pagina = await contexto.newPage();
  // Sem contagem de visitas (pedido externo) durante os testes.
  await pagina.route(/gc\.zgo\.at/, (r) => r.abort());
  await pagina.addInitScript(() => sessionStorage.setItem('mcf-entrada', '1'));
  await pagina.goto(base + url, { waitUntil: 'load' });
  // Os elementos que surgem ao rolar ficam visíveis, para o contraste ser medido como o utilizador o vê.
  await pagina.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in')));
  await pagina.waitForTimeout(300);
  await pagina.addScriptTag({ content: axeFonte });
  const resultado = await pagina.evaluate(() =>
    window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })
  );
  await contexto.close();
  return resultado.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join('\n    ')}`);
}

for (const url of paginas) {
  for (const tema of ['light', 'dark']) {
    test(`/${url} — tema ${tema === 'light' ? 'claro' : 'escuro'}`, async () => {
      const problemas = await verificar(url, tema);
      assert.deepEqual(problemas, [], `\n  ${problemas.join('\n  ')}`);
    });
  }
}
