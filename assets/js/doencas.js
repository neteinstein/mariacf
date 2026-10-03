// Página inicial «Doenças»: grelha de cartões (com pesquisa e filtro por área)
// e, ao escolher uma doença, a explicação em separadores por idade, com os
// botões de email e impressão das ferramentas. O estado vive no URL —
// ?q=…&cat=… na grelha, ?d=<doença>&idade=<grupo> numa doença — para se poder
// partilhar e usar o botão «voltar».

import { CATEGORIAS, DOENCAS, GRUPOS, encontrarDoenca, grupoValido, resumoDoenca } from './doencas-dados.js';
import { ilustracao, miniatura } from './doencas-ilustracoes.js';

const raiz = document.documentElement;
const grelha = document.getElementById('doencas-grid');
const vista = document.getElementById('doenca');
const contagem = document.getElementById('doencas-contagem');
const busca = document.getElementById('busca-doencas');
const filtros = document.getElementById('filtros-doencas');
const vazio = document.getElementById('doencas-vazio');
const GRUPO_KEY = 'mcf-doencas-idade';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

const seta =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

const iconeEmail =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>';

const iconeImprimir =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>';

function cartao(d, i) {
  const tint = i % 2 ? ' tint-coral' : '';
  return `
    <a class="tool reveal destaque${tint}" href="?d=${d.id}" data-doenca="${d.id}">
      ${miniatura(d.deco)}
      <div class="tool-top"><span class="tool-icon" aria-hidden="true">${d.emoji}</span></div>
      <div class="tool-title">${esc(d.nome)}${d.alias ? `<small class="tool-alias">${esc(d.alias)}</small>` : ''}</div>
      <p class="tool-desc">${esc(d.resumo)}</p>
      <div class="tags"><span class="tag">${esc(d.categoria)}</span></div>
      <span class="go">Conhecer a doença ${seta}</span>
    </a>`;
}

function figuras(imagens) {
  return `<div class="figuras">${imagens
    .map(
      ([nome, legenda], i) => `
        <figure class="figura" style="--i:${i}">
          <div class="figura-arte">${ilustracao(nome)}</div>
          <figcaption>${esc(legenda)}</figcaption>
        </figure>`
    )
    .join('')}</div>`;
}

function seccoes(lista) {
  return `<div class="doenca-seccoes">${lista
    .map(
      (s, i) => `
        <article class="doenca-seccao" style="--i:${i}">
          <h3><span class="doenca-seccao-ico" aria-hidden="true">${s.ico}</span> ${esc(s.titulo)}</h3>
          ${s.texto ? `<p>${esc(s.texto)}</p>` : ''}
          ${s.lista ? `<ul>${s.lista.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}
        </article>`
    )
    .join('')}</div>`;
}

function conteudoGrupo(g, grupoId) {
  let html = '';
  if (g.intro) html += `<p class="doenca-intro">${esc(g.intro)}</p>`;
  if (g.imagens) html += figuras(g.imagens);
  if (grupoId === '3-5') {
    html += '<p class="doenca-pais"><span aria-hidden="true">👨‍👩‍👧</span> Para os pais: leia as legendas em voz alta e deixe a criança apontar e contar o que vê em cada imagem.</p>';
  }
  if (g.seccoes) html += seccoes(g.seccoes);
  if (g.curiosidade) {
    html += `<aside class="doenca-curiosidade"><span class="doenca-curiosidade-ico" aria-hidden="true">💡</span><div><strong>Sabias que…</strong><p>${esc(g.curiosidade)}</p></div></aside>`;
  }
  if (g.mitos) {
    html += `<section class="doenca-mitos" aria-label="Mitos e factos"><h3>Mitos e factos</h3>${g.mitos
      .map(
        ([mito, facto]) => `
          <div class="mito">
            <p class="mito-q"><span class="mito-tag">Mito</span> «${esc(mito)}»</p>
            <p class="mito-a"><span class="mito-tag facto">Facto</span> ${esc(facto)}</p>
          </div>`
      )
      .join('')}</section>`;
  }
  if (g.alerta) {
    html += `<aside class="doenca-alerta"><h3><span aria-hidden="true">🚨</span> ${esc(g.alerta.titulo)}</h3><ul>${g.alerta.lista
      .map((l) => `<li>${esc(l)}</li>`)
      .join('')}</ul></aside>`;
  }
  if (g.ligacoes) {
    html += `<div class="doenca-ligacoes">${g.ligacoes
      .map((l) => `<a class="about-link" href="${l.href}">${esc(l.texto)} ${seta}</a>`)
      .join('')}</div>`;
  }
  // Como nas ferramentas: enviar por email ou imprimir o que está no ecrã.
  html += `<div class="result-actions doenca-acoes">
      <button class="action-btn" type="button" data-acao="email">${iconeEmail} Enviar por email</button>
      <button class="action-btn" type="button" data-acao="imprimir">${iconeImprimir} Imprimir</button>
    </div>`;
  return html;
}

function grupoGuardado() {
  try {
    const g = localStorage.getItem(GRUPO_KEY);
    return grupoValido(g) ? g : null;
  } catch {
    return null;
  }
}

function guardarGrupo(g) {
  try {
    localStorage.setItem(GRUPO_KEY, g);
  } catch {
    /* sem armazenamento: a idade escolhida vale só para esta visita */
  }
}

function urlDoenca(doenca, grupo) {
  const p = new URLSearchParams({ d: doenca });
  if (grupo) p.set('idade', grupo);
  return `?${p}`;
}

// ---------- Uma doença ----------

let atual = null; // { d, grupoId } da doença aberta

function mostrarGrupo(d, grupoId, { focar = false } = {}) {
  atual = { d, grupoId };
  const painel = vista.querySelector('.doenca-painel');
  const grupo = GRUPOS.find((g) => g.id === grupoId);
  vista.querySelectorAll('[role="tab"]').forEach((t) => {
    const ativo = t.dataset.grupo === grupoId;
    t.setAttribute('aria-selected', String(ativo));
    t.tabIndex = ativo ? 0 : -1;
    if (!ativo) return;
    if (focar) t.focus();
    // Em ecrãs estreitos os separadores deslizam na horizontal: centrar o escolhido.
    const barra = t.parentElement;
    barra.scrollLeft = t.offsetLeft - (barra.clientWidth - t.offsetWidth) / 2;
  });
  // Na impressão os separadores desaparecem: esta linha diz para que idade é a folha.
  vista.querySelector('.doenca-grupo-impressao').textContent = `${grupo.emoji} Explicação para ${grupo.nome.toLowerCase()} (${grupo.idade})`;
  painel.className = `doenca-painel grupo-${grupoId.replace('+', 'mais')}`;
  painel.setAttribute('aria-labelledby', `tab-${grupoId}`);
  painel.innerHTML = conteudoGrupo(d.grupos[grupoId], grupoId);
}

function mostrarDoenca(d, grupoId) {
  const i = DOENCAS.indexOf(d);
  vista.className = `wrap doenca${i % 2 ? ' tint-coral' : ''}`;
  vista.innerHTML = `
    <a class="back-link doenca-voltar" href="./">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 19l-7-7 7-7"/></svg>
      Todas as doenças
    </a>
    <header class="doenca-cab">
      <div>
        <span class="eyebrow"><span class="dot"></span> ${esc(d.categoria)}</span>
        <h1 class="display" id="doenca-titulo" tabindex="-1">${esc(d.nome)}${d.alias ? ` <em>${esc(d.alias.toLowerCase())}</em>` : ''}</h1>
        <p class="lead">${esc(d.resumo)}</p>
      </div>
      <div class="doenca-cab-arte">${ilustracao(d.heroi)}</div>
    </header>
    <p class="doenca-escolha" id="doenca-escolha">Escolha a idade de quem vai ler:</p>
    <div class="idade-tabs" role="tablist" aria-labelledby="doenca-escolha">
      ${GRUPOS.map(
        (g) => `
        <button class="idade-tab" type="button" role="tab" id="tab-${g.id}" data-grupo="${g.id}" aria-controls="doenca-painel" aria-selected="false" tabindex="-1">
          <span class="idade-emoji" aria-hidden="true">${g.emoji}</span>
          <span class="idade-txt"><strong>${g.nome}</strong><small>${g.idade}</small></span>
        </button>`
      ).join('')}
    </div>
    <p class="doenca-grupo-impressao"></p>
    <div class="doenca-painel" id="doenca-painel" role="tabpanel" tabindex="0"></div>
    <p class="disclaimer">Informação geral de apoio. Não substitui uma consulta — em caso de dúvida, fale com o seu médico ou ligue SNS 24 (808 24 24 24). Em emergência, ligue 112.</p>`;

  mostrarGrupo(d, grupoId);
  document.title = `${d.nome} · Doenças · Dra. Maria Cortês Ferreira`;

  const tabs = Array.from(vista.querySelectorAll('[role="tab"]'));
  tabs.forEach((t, idx) => {
    t.addEventListener('click', () => escolherGrupo(d, t.dataset.grupo));
    t.addEventListener('keydown', (e) => {
      let alvo = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') alvo = tabs[(idx + 1) % tabs.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') alvo = tabs[(idx - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') alvo = tabs[0];
      else if (e.key === 'End') alvo = tabs[tabs.length - 1];
      if (!alvo) return;
      e.preventDefault();
      escolherGrupo(d, alvo.dataset.grupo, true);
    });
  });
  vista.querySelector('.doenca-voltar').addEventListener('click', (e) => {
    e.preventDefault();
    navegar(null);
  });
}

function escolherGrupo(d, grupoId, focar = false) {
  guardarGrupo(grupoId);
  history.replaceState({ d: d.id, idade: grupoId }, '', urlDoenca(d.id, grupoId));
  mostrarGrupo(d, grupoId, { focar });
}

function enviarEmail() {
  if (!atual) return;
  const { assunto, linhas } = resumoDoenca(atual.d, atual.grupoId);
  const corpo = [
    ...linhas,
    'Explicação completa, com imagens:',
    location.href,
    '',
    'Informação de apoio — não substitui aconselhamento médico.',
  ].join('\n');
  location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
}

// ---------- Grelha: pesquisa e filtro por área ----------

let categoriaAtiva = 'todas';
let ultimaGrelha = ''; // pesquisa da grelha, para voltar a ela ao sair de uma doença
const textoPesquisa = new Map(
  DOENCAS.map((d) => [
    d.id,
    normalizar([d.nome, d.alias, d.resumo, d.categoria, ...(d.tambem || []), d.palavras].filter(Boolean).join(' ')),
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
    b.setAttribute('aria-selected', String(ativo));
    // Em ecrãs estreitos as áreas deslizam na horizontal: centrar a escolhida.
    if (ativo) filtros.scrollLeft = b.offsetLeft - (filtros.clientWidth - b.offsetWidth) / 2;
  });
}

// ---------- Navegação ----------

let ultimaPosicao = 0;

function render({ rolar = false } = {}) {
  const p = new URLSearchParams(location.search);
  const d = encontrarDoenca(p.get('d'));
  if (d) {
    const pedido = p.get('idade');
    const grupoId = grupoValido(pedido) ? pedido : grupoGuardado() || GRUPOS[0].id;
    raiz.classList.add('com-doenca');
    vista.hidden = false;
    mostrarDoenca(d, grupoId);
    if (rolar) window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    atual = null;
    raiz.classList.remove('com-doenca');
    vista.hidden = true;
    vista.innerHTML = '';
    document.title = 'Doenças explicadas para todas as idades · Dra. Maria Cortês Ferreira';
    if (busca) busca.value = p.get('q') || '';
    escolherCategoria(CATEGORIAS.includes(p.get('cat')) ? p.get('cat') : 'todas');
    aplicarFiltros({ atualizarUrl: false });
    if (rolar) window.scrollTo({ top: ultimaPosicao, behavior: 'instant' });
  }
}

function navegar(id) {
  if (id) {
    ultimaPosicao = window.scrollY;
    ultimaGrelha = location.search;
  }
  history.pushState({ d: id }, '', id ? urlDoenca(id) : ultimaGrelha || location.pathname);
  render({ rolar: true });
  if (id) vista.querySelector('h1')?.focus({ preventScroll: true });
}

if (grelha && vista) {
  grelha.innerHTML = DOENCAS.map(cartao).join('');

  if (filtros) {
    filtros.innerHTML = ['todas', ...CATEGORIAS]
      .map(
        (c) =>
          `<button class="tabbtn" type="button" data-categoria="${esc(c)}" aria-selected="${c === 'todas'}">${c === 'todas' ? 'Todas' : esc(c)}</button>`
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

  grelha.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-doenca]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navegar(a.dataset.doenca);
  });

  vista.addEventListener('click', (e) => {
    const acao = e.target.closest('[data-acao]')?.dataset.acao;
    if (acao === 'email') enviarEmail();
    else if (acao === 'imprimir') window.print();
  });

  window.addEventListener('popstate', () => render({ rolar: true }));
  render();
}
