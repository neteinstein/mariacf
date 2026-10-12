import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { gerar, obsoletos } from '../scripts/gerar.mjs';

const raiz = new URL('..', import.meta.url).pathname;

test('as páginas das doenças e o sitemap estão atualizados (npm run gerar)', () => {
  for (const [caminho, conteudo] of Object.entries(gerar())) {
    assert.ok(existsSync(join(raiz, caminho)), `${caminho} não existe — corra «npm run gerar»`);
    assert.ok(readFileSync(join(raiz, caminho), 'utf8') === conteudo, `${caminho} está desatualizado — corra «npm run gerar»`);
  }
  assert.deepEqual(obsoletos(), [], 'há páginas de doenças que já não existem nos dados — corra «npm run gerar»');
});

test('cada página de doença tem os cinco grupos, título próprio e ligações que existem', () => {
  for (const [caminho, html] of Object.entries(gerar())) {
    if (!caminho.startsWith('doencas/')) continue;
    assert.equal(html.match(/role="tabpanel"/g).length, 5, caminho);
    assert.ok(!html.includes('<title>Doenças explicadas'), `${caminho}: título da grelha`);
    for (const [, href] of html.matchAll(/(?:href|src)="(\.\.\/[^"#?]*)/g)) {
      const alvo = join(raiz, caminho, '..', href);
      assert.ok(existsSync(href.endsWith('/') ? join(alvo, 'index.html') : alvo), `${caminho}: ${href} não existe`);
    }
  }
});
