// Desenho (em HTML, sem DOM) dos cartões da grelha e da página de cada doença.
// Usado no browser pela grelha (doencas.js) e por scripts/gerar.mjs, que escreve
// uma página estática por doença em doencas/<id>/ — com todos os grupos etários,
// para se ler sem JavaScript e para os motores de busca.

import { EVICCAO_NOTA, GRUPOS, resumoDoenca } from './doencas-dados.js';
import { ilustracao, miniatura } from './doencas-ilustracoes.js';
import { icone } from './icones.js';

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const seta =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

const iconeEmail =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>';

const iconeImprimir =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>';

// Cartão da grelha: liga à página da doença (doencas/<id>/).
export function cartao(d, i) {
  const tint = i % 2 ? ' tint-coral' : '';
  return `
    <a class="tool reveal destaque cartao-doenca${tint}" href="${d.id}/" data-doenca="${d.id}">
      <div class="tool-top"><span class="tool-icon" aria-hidden="true">${icone(d.icone)}</span>${miniatura(d.deco)}</div>
      <div class="tool-title">${esc(d.nome)}${d.alias ? `<small class="tool-alias">${esc(d.alias)}</small>` : ''}</div>
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

// Conteúdo de um grupo etário. «raiz» é o caminho relativo até à raiz do site.
export function conteudoGrupo(d, grupoId, raiz) {
  const g = d.grupos[grupoId];
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
  if (d.eviccao) {
    html += `<aside class="doenca-eviccao"><h3><span aria-hidden="true">🏫</span> Evicção escolar obrigatória</h3><p>${esc(d.eviccao)}</p><p class="doenca-eviccao-nota">${esc(EVICCAO_NOTA)}</p></aside>`;
  }
  if (g.ligacoes) {
    html += `<div class="doenca-ligacoes">${g.ligacoes
      .map((l) => `<a class="about-link" href="${raiz}${l.href}">${esc(l.texto)} ${seta}</a>`)
      .join('')}</div>`;
  }
  // Como nas ferramentas: enviar por email ou imprimir o separador escolhido.
  html += `<div class="result-actions doenca-acoes">
      <button class="action-btn" type="button" data-acao="email">${iconeEmail} Enviar por email</button>
      <button class="action-btn" type="button" data-acao="imprimir">${iconeImprimir} Imprimir folheto</button>
    </div>`;
  return html;
}

// Texto do email de cada separador, já pronto (a página não precisa de carregar os dados todos).
export function emails(d) {
  return Object.fromEntries(GRUPOS.map((g) => [g.id, resumoDoenca(d, g.id)]));
}

// O corpo da página de uma doença: cabeçalho, separadores por idade e um painel por grupo.
// Sem JavaScript vêem-se todos os painéis; com JavaScript (data-idade no <html>), só o escolhido.
// «folheto(grupoId)» devolve o HTML que só aparece na impressão (o código QR desse grupo).
export function vistaDoenca(d, i, raiz, folheto = () => '') {
  return `<section class="wrap doenca${i % 2 ? ' tint-coral' : ''}" id="doenca" aria-labelledby="doenca-titulo">
    <a class="back-link doenca-voltar" href="../">
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
      <a class="idade-tab" href="#painel-${g.id}" role="tab" id="tab-${g.id}" data-grupo="${g.id}" aria-controls="painel-${g.id}">
        <span class="idade-emoji" aria-hidden="true">${g.emoji}</span>
        <span class="idade-txt"><strong>${g.nome}</strong><small>${g.idade}</small></span>
      </a>`
      ).join('')}
    </div>
    ${GRUPOS.map(
      (g) => `
    <div class="doenca-painel grupo-${g.id.replace('+', 'mais')}" id="painel-${g.id}" data-grupo="${g.id}" role="tabpanel" aria-labelledby="tab-${g.id}" tabindex="0">
      <h2 class="doenca-grupo-impressao">${g.emoji} Explicação para ${g.nome.toLowerCase()} (${g.idade})</h2>
      ${conteudoGrupo(d, g.id, raiz)}
      ${folheto(g.id)}
    </div>`
    ).join('')}
    <p class="disclaimer">Informação geral de apoio. Não substitui uma consulta — em caso de dúvida, fale com o seu médico ou ligue SNS 24 (808 24 24 24). Em emergência, ligue 112.</p>
  </section>`;
}
