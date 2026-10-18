// Gera os ficheiros do site que derivam de outros: uma página estática por doença
// (doencas/<id>/index.html, a partir de assets/js/doencas-dados.js), os dados estruturados
// (JSON-LD) das restantes páginas e o sitemap.xml.
// O site continua sem passo de build: os ficheiros gerados ficam no repositório e o
// teste tests/gerado.test.mjs falha se estiverem desatualizados.
//
//   npm run gerar

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import qrcode from 'qrcode-generator';
import { DOENCAS, GRUPOS } from '../assets/js/doencas-dados.js';
import { esc, emails, vistaDoenca } from '../assets/js/doencas-vista.js';

export const SITE = 'https://mariacf.pt/';
const raiz = fileURLToPath(new URL('..', import.meta.url));
const ler = (p) => readFileSync(join(raiz, p), 'utf8');

// JSON dentro de <script>: «</» não pode aparecer tal e qual.
const jsonScript = (obj, indent) => JSON.stringify(obj, null, indent).replace(/<\//g, '<\\/');

// Código QR (SVG, um único <path>) para o folheto impresso de cada grupo etário.
export function qrSvg(texto) {
  const qr = qrcode(0, 'M');
  qr.addData(texto);
  qr.make();
  const n = qr.getModuleCount();
  const margem = 4;
  let d = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) if (qr.isDark(y, x)) d += `M${x + margem} ${y + margem}h1v1h-1z`;
  }
  const lado = n + 2 * margem;
  return `<svg class="folheto-qr-codigo" viewBox="0 0 ${lado} ${lado}" width="96" height="96" role="img" aria-label="Código QR" shape-rendering="crispEdges"><rect width="${lado}" height="${lado}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
}

// Quem escreve e revê o conteúdo, e o site de que cada página faz parte (o mesmo @id da página inicial
// e da página Sobre, repetido aqui porque os motores de pesquisa não seguem @id entre páginas).
const MARIA = {
  '@type': 'Person',
  '@id': `${SITE}sobre/#maria`,
  name: 'Maria Cortês Ferreira',
  honorificPrefix: 'Dra.',
  jobTitle: 'Médica de Medicina Geral e Familiar',
  url: `${SITE}sobre/`,
};
const SITE_LD = { '@type': 'WebSite', '@id': `${SITE}#site`, name: 'Saúde em Família', url: SITE };

// Caminho de migalhas (BreadcrumbList) a partir da página inicial: [[nome, caminho relativo à raiz], …].
function migalhas(url, passos) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#migalhas`,
    itemListElement: [['Início', ''], ...passos].map(([name, caminho], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE}${caminho}`,
    })),
  };
}

const ldScript = (ld, extra = '') => `<script type="application/ld+json"${extra}>
  ${jsonScript(ld, 2).replace(/\n/g, '\n  ')}
  </script>`;

function paginaDoenca(d, i, molde) {
  const url = `${SITE}doencas/${d.id}/`;
  const titulo = `${d.nome}: explicação para todas as idades · Saúde em Família`;
  const descricao = `${d.resumo} Explicado para crianças, adolescentes, adultos e séniores, pela Dra. Maria Cortês Ferreira, médica de família.`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': url,
        name: titulo,
        url,
        inLanguage: 'pt-PT',
        description: d.resumo,
        about: { '@type': 'MedicalCondition', name: d.nome, ...(d.alias ? { alternateName: d.alias } : {}) },
        audience: GRUPOS.map((g) => ({ '@type': 'PeopleAudience', audienceType: `${g.nome} (${g.idade})` })),
        author: MARIA,
        reviewedBy: MARIA,
        isPartOf: SITE_LD,
        breadcrumb: { '@id': `${url}#migalhas` },
      },
      migalhas(url, [['Doenças', 'doencas/'], [d.nome, `doencas/${d.id}/`]]),
    ],
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
  ${ldScript(ld)}`
    );
  return `${cabeca}<main>
    ${vistaDoenca(d, i, '../../', (g) => folheto(`${url}?idade=${encodeURIComponent(g)}`))}
  </main>
  <script type="application/json" id="doenca-emails">${jsonScript(emails(d))}</script>
${molde.rodape}`;
}

// No papel: o código QR e o endereço, para voltar à explicação completa (com imagens animadas).
function folheto(endereco) {
  return `<div class="folheto-qr">${qrSvg(endereco)}<p>Aponte a câmara do telemóvel para o código para ver esta explicação com imagens animadas, ou abra <strong>${esc(endereco.replace(/^https:\/\//, '').replace(/\?.*$/, ''))}</strong>.</p></div>`;
}

// O molde das páginas das doenças é a própria página da grelha (doencas/index.html), um nível abaixo.
function molde() {
  const html = semDadosGerados(ler('doencas/index.html')).replace(/(href|src)="\.\.\//g, '$1="../../').replace('<a href="./" aria-current="page">', '<a href="../" aria-current="page">');
  const [cabeca, resto] = html.split('<main>');
  const rodape = resto
    .split('</main>')[1]
    .replace(/^\s*\n/, '\n')
    .replace('<script src="../../assets/js/doencas.js" type="module"></script>', '<script src="../../assets/js/doenca.js" type="module"></script>');
  return { cabeca, rodape: rodape.replace(/^\n/, '') };
}

// Índice da pesquisa global (assets/js/pesquisa.js): ferramentas, doenças e secções do site.
// Os URLs são relativos à raiz do site.
const limpar = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function indicePesquisa() {
  const ferramentas = [...ler('ferramentas/index.html').matchAll(/<a class="tool[^"]*" href="\.\.\/([^"]+)">([\s\S]*?)<\/a>/g)].map(([, url, corpo]) => ({
    tipo: 'Ferramenta',
    titulo: limpar(corpo.match(/<div class="tool-title">([\s\S]*?)<\/div>/)[1]),
    texto: limpar(corpo.match(/<p class="tool-desc">([\s\S]*?)<\/p>/)[1]),
    // As etiquetas do cartão e os nomes dos separadores da calculadora (CURB-65, Wells, …).
    palavras: [
      ...[...corpo.matchAll(/<span class="tag">([^<]+)<\/span>/g)].map((m) => m[1]),
      ...[...ler(`${url}index.html`).matchAll(/role="tab"[^>]*>([^<]+)</g)].map((m) => m[1].trim()),
    ].join(' '),
    url,
  }));
  const doencas = DOENCAS.map((d) => ({
    tipo: 'Doença',
    titulo: d.nome,
    texto: d.resumo,
    palavras: [d.alias, d.categoria, ...(d.tambem || []), d.palavras].filter(Boolean).join(' '),
    url: `doencas/${d.id}/`,
  }));
  const paginas = [
    { tipo: 'Página', titulo: 'USF Nova Saúde', texto: 'Contactos, horário, morada, como marcar consulta e renovar receitas.', palavras: 'centro de saúde marcar consulta receitas telefone horário mapa', url: 'usf/' },
    { tipo: 'Página', titulo: 'Contactos úteis do SNS', texto: '112, SNS 24 e outras linhas de ajuda.', palavras: 'emergência 112 sns 24 linha telefone antivenenos saúde mental', url: 'sns/' },
    { tipo: 'Página', titulo: 'Sobre a Dra. Maria', texto: 'Percurso e artigos da Dra. Maria Cortês Ferreira, médica de família.', palavras: 'médica de família percurso artigos', url: 'sobre/' },
  ];
  const itens = [...ferramentas, ...doencas, ...paginas];
  return `// Gerado por scripts/gerar.mjs (npm run gerar) — não editar à mão.\n// Índice da pesquisa global: ferramentas, doenças e secções do site (URLs relativos à raiz).\n\nexport const INDICE = ${JSON.stringify(itens, null, 1)};\n`;
}

// Dados estruturados (JSON-LD) das páginas escritas à mão, num bloco próprio antes de </head>:
// migalhas em todas, a calculadora (WebApplication) e a data de revisão em cada ferramenta, e a lista
// de itens nas páginas de ferramentas e de doenças. Tudo sai do que a própria página já diz.
const BLOCO_LD = /\n  <script type="application\/ld\+json" data-gerado>[\s\S]*?<\/script>(?=\n<\/head>)/;
const semDadosGerados = (html) => html.replace(BLOCO_LD, '');
const nomeDaPagina = (html) => html.match(/<meta property="og:title" content="([^"]*)"/)[1].replace(/ · Saúde em Família$/, '');
const descricaoDaPagina = (html) => html.match(/<meta name="description" content="([^"]*)"/)[1];
const desfazer = (t) => t.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

// Data em que as fórmulas de uma calculadora foram revistas (secção «Fontes»).
const revisao = (html) => html.match(/<p class="fontes-data">[\s\S]*?<time datetime="(\d{4}-\d{2}-\d{2})">/)?.[1];

const NOMES_SECCOES = { doencas: 'Doenças', ferramentas: 'Ferramentas', sns: 'Contactos do SNS', sobre: 'Sobre', usf: 'USF Nova Saúde' };

function dadosEstruturados(pasta, html) {
  const url = `${SITE}${pasta}/`;
  const nome = desfazer(nomeDaPagina(html));
  const descricao = desfazer(descricaoDaPagina(html));
  const pagina = { '@id': url, url, name: nome, description: descricao, inLanguage: 'pt-PT', isPartOf: SITE_LD, breadcrumb: { '@id': `${url}#migalhas` } };
  let grafo;
  if (pasta.startsWith('calculadora-')) {
    grafo = [
      { '@type': 'MedicalWebPage', ...pagina, lastReviewed: revisao(html), reviewedBy: MARIA, mainEntity: { '@id': `${url}#calculadora` } },
      {
        '@type': 'WebApplication',
        '@id': `${url}#calculadora`,
        name: nome,
        description: descricao,
        url,
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web',
        browserRequirements: 'Requer JavaScript',
        inLanguage: 'pt-PT',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        author: MARIA,
      },
      migalhas(url, [['Ferramentas', 'ferramentas/'], [nome, `${pasta}/`]]),
    ];
  } else if (pasta === 'ferramentas' || pasta === 'doencas') {
    const itens = pasta === 'ferramentas'
      ? [...html.matchAll(/<a class="tool[^"]*" href="\.\.\/([^"]+)">[\s\S]*?<div class="tool-title">([\s\S]*?)<\/div>/g)].map(([, c, t]) => [desfazer(limpar(t)), c])
      : DOENCAS.map((d) => [d.nome, `doencas/${d.id}/`]);
    grafo = [
      { '@type': 'CollectionPage', ...pagina, mainEntity: { '@id': `${url}#lista` } },
      {
        '@type': 'ItemList',
        '@id': `${url}#lista`,
        numberOfItems: itens.length,
        itemListElement: itens.map(([name, caminho], i) => ({ '@type': 'ListItem', position: i + 1, name, url: `${SITE}${caminho}` })),
      },
      migalhas(url, [[NOMES_SECCOES[pasta], `${pasta}/`]]),
    ];
  } else {
    // Sobre e USF já descrevem a página e a pessoa ou a unidade no seu próprio bloco: aqui só as migalhas.
    grafo = [migalhas(url, [[NOMES_SECCOES[pasta] || nome, `${pasta}/`]])];
  }
  const ld = ldScript({ '@context': 'https://schema.org', '@graph': grafo }, ' data-gerado');
  return semDadosGerados(html).replace('\n</head>', `\n  ${ld}\n</head>`);
}

function sitemap(paginas) {
  const urls = paginas
    .map(({ caminho, data }) => `  <url><loc>${SITE}${caminho}</loc>${data ? `<lastmod>${data}</lastmod>` : ''}</url>`)
    .join('\n');
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
  for (const s of seccoes) ficheiros[`${s}/index.html`] = dadosEstruturados(s, ficheiros[`${s}/index.html`] ?? ler(`${s}/index.html`));
  ficheiros['assets/js/pesquisa-indice.js'] = indicePesquisa();
  ficheiros['sitemap.xml'] = sitemap([
    { caminho: '' },
    ...seccoes.map((s) => ({ caminho: `${s}/`, data: revisao(ficheiros[`${s}/index.html`]) })),
    ...DOENCAS.map((d) => ({ caminho: `doencas/${d.id}/` })),
  ]);
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
  console.log(`Gerado: ${DOENCAS.length} páginas de doenças, índice da pesquisa e sitemap.xml`);
}
