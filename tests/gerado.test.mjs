import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { gerar, obsoletos } from '../scripts/gerar.mjs';

const raiz = new URL('..', import.meta.url).pathname;

test('as páginas das doenças, os dados estruturados e o sitemap estão atualizados (npm run gerar)', () => {
  for (const [caminho, conteudo] of Object.entries(gerar())) {
    assert.ok(existsSync(join(raiz, caminho)), `${caminho} não existe — corra «npm run gerar»`);
    assert.ok(readFileSync(join(raiz, caminho), 'utf8') === conteudo, `${caminho} está desatualizado — corra «npm run gerar»`);
  }
  assert.deepEqual(obsoletos(), [], 'há páginas de doenças que já não existem nos dados — corra «npm run gerar»');
});

test('cada página de doença tem os cinco grupos, título próprio e ligações que existem', () => {
  for (const [caminho, html] of Object.entries(gerar())) {
    if (!caminho.startsWith('doencas/') || caminho === 'doencas/index.html') continue;
    assert.equal(html.match(/role="tabpanel"/g).length, 5, caminho);
    assert.ok(!html.includes('<title>Doenças explicadas'), `${caminho}: título da grelha`);
    for (const [, href] of html.matchAll(/(?:href|src)="(\.\.\/[^"#?]*)/g)) {
      const alvo = join(raiz, caminho, '..', href);
      assert.ok(existsSync(href.endsWith('/') ? join(alvo, 'index.html') : alvo), `${caminho}: ${href} não existe`);
    }
  }
});

test('o código QR do folheto lê-se e leva à doença e à idade certas', async () => {
  const { default: jsQR } = await import('jsqr');
  const { qrSvg } = await import('../scripts/gerar.mjs');
  const url = 'https://mariacf.pt/doencas/diabetes/?idade=65%2B';
  const svg = qrSvg(url);
  const lado = Number(svg.match(/viewBox="0 0 (\d+)/)[1]);
  const escala = 4;
  const w = lado * escala;
  const px = new Uint8ClampedArray(w * w * 4).fill(255);
  for (const [, x, y] of svg.matchAll(/M(\d+) (\d+)h1v1h-1z/g)) {
    for (let dy = 0; dy < escala; dy++)
      for (let dx = 0; dx < escala; dx++) {
        const i = ((+y * escala + dy) * w + (+x * escala + dx)) * 4;
        px[i] = px[i + 1] = px[i + 2] = 0;
      }
  }
  assert.equal(jsQR(px, w, w)?.data, url);
});
