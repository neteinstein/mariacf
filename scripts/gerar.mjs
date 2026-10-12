// Gera os ficheiros do site que derivam de outros: uma página estática por doença
// (doencas/<id>/index.html, a partir de assets/js/doencas-dados.js) e o sitemap.xml.
// O site continua sem passo de build: os ficheiros gerados ficam no repositório e o
// teste tests/gerado.test.mjs falha se estiverem desatualizados.
//
//   npm run gerar

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DOENCAS, GRUPOS } from '../assets/js/doencas-dados.js';
import { esc, emails, vistaDoenca } from '../assets/js/doencas-vista.js';

export const SITE = 'https://mariacf.pt/';
const raiz = fileURLToPath(new URL('..', import.meta.url));
const ler = (p) => readFileSync(join(raiz, p), 'utf8');

// JSON dentro de <script>: «</» não pode aparecer tal e qual.
const jsonScript = (obj, indent) => JSON.stringify(obj, null, indent).replace(/<\//g, '<\\/');

function paginaDoenca(d, i, molde) {
  const url = `${SITE}doencas/${d.id}/`;
  const titulo = `${d.nome} · Doenças · Saúde em Família`;
  const descricao = `${d.resumo} Explicado para crianças, adolescentes, adultos e séniores, pela Dra. Maria Cortês Ferreira, médica de família.`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: titulo,
    url,
    inLanguage: 'pt-PT',
    description: d.resumo,
    about: { '@type': 'MedicalCondition', name: d.nome, ...(d.alias ? { alternateName: d.alias } : {}) },
    audience: GRUPOS.map((g) => ({ '@type': 'PeopleAudience', audienceType: `${g.nome} (${g.idade})` })),
    author: { '@type': 'Person', name: 'Maria Cortês Ferreira', url: `${SITE}sobre/` },
    isPartOf: { '@type': 'WebSite', name: 'Saúde em Família', url: SITE },
  };
  const grupos = JSON.stringify(GRUPOS.map((g) => g.id));
  const cabeca = molde.cabeca
    .replace(/<title>.*?<\/title>/, `<title>${esc(titulo)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(descricao)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(titulo)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(d.resumo)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(
      /<script>\s*\/\/ Cada doença tem agora[\s\S]*?<\/script>/,
      `<script>
    // Idade a mostrar, escolhida antes de desenhar a página (sem piscar): ?idade=, ou a última escolhida.
    // Sem JavaScript, vêem-se todos os grupos.
    (function () {
      var grupos = ${grupos}, g = new URLSearchParams(location.search).get('idade');
      if (g) g = g.replace(' ', '+');
      if (grupos.indexOf(g) < 0) { try { g = localStorage.getItem('mcf-doencas-idade'); } catch (e) {} }
      document.documentElement.dataset.idade = grupos.indexOf(g) < 0 ? grupos[0] : g;
      document.documentElement.classList.add('com-doenca');
    })();
  </script>
  <script type="application/ld+json">
  ${jsonScript(ld, 2).replace(/\n/g, '\n  ')}
  </script>`
    );
  return `${cabeca}<main>
    ${vistaDoenca(d, i, '../../')}
  </main>
  <script type="application/json" id="doenca-emails">${jsonScript(emails(d))}</script>
${molde.rodape}`;
}

// O molde das páginas das doenças é a própria página da grelha (doencas/index.html), um nível abaixo.
function molde() {
  const html = ler('doencas/index.html').replace(/(href|src)="\.\.\//g, '$1="../../').replace('<a href="./" aria-current="page">', '<a href="../" aria-current="page">');
  const [cabeca, resto] = html.split('<main>');
  const rodape = resto
    .split('</main>')[1]
    .replace(/^\s*\n/, '\n')
    .replace('<script src="../../assets/js/doencas.js" type="module"></script>', '<script src="../../assets/js/doenca.js" type="module"></script>');
  return { cabeca, rodape: rodape.replace(/^\n/, '') };
}

function sitemap(paginas) {
  const urls = paginas.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// Devolve { caminho: conteúdo } de tudo o que é gerado.
export function gerar() {
  const ficheiros = {};
  const m = molde();
  DOENCAS.forEach((d, i) => {
    ficheiros[`doencas/${d.id}/index.html`] = paginaDoenca(d, i, m);
  });
  const seccoes = readdirSync(raiz)
    .filter((d) => !d.startsWith('.') && existsSync(join(raiz, d, 'index.html')))
    .sort();
  ficheiros['sitemap.xml'] = sitemap(['', ...seccoes.map((s) => `${s}/`), ...DOENCAS.map((d) => `doencas/${d.id}/`)]);
  return ficheiros;
}

// Pastas de doenças que já não existem nos dados.
export function obsoletos() {
  const ids = new Set(DOENCAS.map((d) => d.id));
  return readdirSync(join(raiz, 'doencas'), { withFileTypes: true })
    .filter((e) => e.isDirectory() && !ids.has(e.name))
    .map((e) => `doencas/${e.name}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [caminho, conteudo] of Object.entries(gerar())) {
    mkdirSync(join(raiz, caminho, '..'), { recursive: true });
    writeFileSync(join(raiz, caminho), conteudo);
  }
  for (const pasta of obsoletos()) rmSync(join(raiz, pasta), { recursive: true });
  console.log(`Gerado: ${DOENCAS.length} páginas de doenças e sitemap.xml`);
}
