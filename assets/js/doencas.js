// Página «Doenças»: grelha de cartões, com pesquisa e filtro por área. Cada cartão leva à
// página da doença (doencas/<id>/, gerada por scripts/gerar.mjs). O estado da grelha vive no
// URL (?q=…&cat=…) para se poder partilhar; as ligações antigas «?d=<doença>&idade=<grupo>»
// seguem para a página da doença (ver o <script> do <head> de doencas/index.html).

import { CATEGORIAS, DOENCAS, encontrarDoenca } from './doencas-dados.js';
import { cartao, esc } from './doencas-vista.js';

const grelha = document.getElementById('doencas-grid');
const contagem = document.getElementById('doencas-contagem');
const busca = document.getElementById('busca-doencas');
const filtros = document.getElementById('filtros-doencas');
const vazio = document.getElementById('doencas-vazio');

const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

// ---------- Grelha: pesquisa e filtro por área ----------

let categoriaAtiva = 'todas';
const textoPesquisa = new Map(
  DOENCAS.map((d) => [
    d.id,
    normalizar([d.nome, d.alias, d.resumo, d.categoria, ...(d.tambem || []), d.palavras, d.eviccao && 'evicção escolar'].filter(Boolean).join(' ')),
  ])
);

function urlGrelha() {
  const p = new URLSearchParams();
  const q = busca?.value.trim();
  if (q) p.set('q', q);
  if (categoriaAtiva !== 'todas') p.set('cat', categoriaAtiva);
  const s = p.toString();
  return s ? `?${s}` : location.pathname;
}

function aplicarFiltros({ atualizarUrl = true } = {}) {
  const termo = busca ? normalizar(busca.value.trim()) : '';
  let visiveis = 0;
  grelha.querySelectorAll('.tool').forEach((carta) => {
    const d = encontrarDoenca(carta.dataset.doenca);
    const naArea = categoriaAtiva === 'todas' || d.categoria === categoriaAtiva || (d.tambem || []).includes(categoriaAtiva);
    const visivel = naArea && (!termo || textoPesquisa.get(d.id).includes(termo));
    carta.hidden = !visivel;
    if (visivel) visiveis += 1;
  });
  if (vazio) vazio.hidden = visiveis > 0;
  if (contagem) {
    contagem.textContent = visiveis === DOENCAS.length ? `(${DOENCAS.length})` : `(${visiveis} de ${DOENCAS.length})`;
  }
  if (atualizarUrl) history.replaceState(null, '', urlGrelha());
}

function escolherCategoria(cat) {
  categoriaAtiva = cat;
  filtros?.querySelectorAll('.tabbtn').forEach((b) => {
    const ativo = b.dataset.categoria === cat;
    b.setAttribute('aria-pressed', String(ativo));
    // Em ecrãs estreitos as áreas deslizam na horizontal: centrar a escolhida.
    if (ativo) filtros.scrollLeft = b.offsetLeft - (filtros.clientWidth - b.offsetWidth) / 2;
  });
}

if (grelha) {
  const porNome = [...DOENCAS].sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));
  grelha.innerHTML = porNome.map(cartao).join('');

  if (filtros) {
    filtros.innerHTML = ['todas', ...CATEGORIAS]
      .map(
        (c) =>
          `<button class="tabbtn" type="button" data-categoria="${esc(c)}" aria-pressed="${c === 'todas'}">${c === 'todas' ? 'Todas' : esc(c)}</button>`
      )
      .join('');
    filtros.addEventListener('click', (e) => {
      const b = e.target.closest('.tabbtn');
      if (!b) return;
      escolherCategoria(b.dataset.categoria);
      aplicarFiltros();
    });
  }
  busca?.addEventListener('input', () => aplicarFiltros());

  const p = new URLSearchParams(location.search);
  if (busca) busca.value = p.get('q') || '';
  escolherCategoria(CATEGORIAS.includes(p.get('cat')) ? p.get('cat') : 'todas');
  aplicarFiltros({ atualizarUrl: false });
}
