// Página inicial «Doenças»: grelha de cartões e, ao escolher uma doença, a
// explicação em separadores por idade. O estado vive no URL
// (?d=<doença>&idade=<grupo>), para se poder partilhar e usar o botão «voltar».

import { DOENCAS, GRUPOS, encontrarDoenca, grupoValido } from './doencas-dados.js';
import { ilustracao } from './doencas-ilustracoes.js';

const raiz = document.documentElement;
const grelha = document.getElementById('doencas-grid');
const vista = document.getElementById('doenca');
const contagem = document.getElementById('doencas-contagem');
const GRUPO_KEY = 'mcf-doencas-idade';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const seta =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

// Ilustrações pequenas e animadas no canto de cada cartão (o mesmo traço das
// ilustrações dos cartões das ferramentas).
const DECOS = {
  gota: `<svg class="tool-deco mini deco-gota" viewBox="0 0 120 90" aria-hidden="true">
      <path class="d-gota" d="M60 6C60 6 46 26 46 36A14 14 0 0 0 74 36C74 26 60 6 60 6Z"/>
      <ellipse class="d-onda" cx="60" cy="80" rx="26" ry="6"/>
      <ellipse class="d-onda d-onda2" cx="60" cy="80" rx="26" ry="6"/>
    </svg>`,
  laco: `<svg class="tool-deco mini deco-laco" viewBox="0 0 120 90" aria-hidden="true">
      <g class="d-laco">
        <path d="M54 44L38 84M66 44L82 84"/>
        <path class="d-cheio-suave" d="M60 50C48 38 44 26 47 18C50 10 56 7 60 7C64 7 70 10 73 18C76 26 72 38 60 50Z"/>
      </g>
    </svg>`,
  manometro: `<svg class="tool-deco mini deco-manometro" viewBox="0 0 120 90" aria-hidden="true">
      <path d="M18 72A42 42 0 0 1 102 72"/>
      <path class="d-fraco" d="M30 72A30 30 0 0 1 90 72"/>
      <path class="d-ponteiro" d="M60 72L60 40"/>
      <circle class="d-cheio" cx="60" cy="72" r="5"/>
    </svg>`,
  joelho: `<svg class="tool-deco mini deco-joelho" viewBox="0 0 120 90" aria-hidden="true">
      <path class="d-osso" d="M30 28H56"/>
      <circle class="d-cheio" cx="66" cy="28" r="8"/>
      <g class="d-perna"><path class="d-osso" d="M66 40V78"/><path d="M66 82H82"/></g>
    </svg>`,
  nuvem: `<svg class="tool-deco mini deco-nuvem" viewBox="0 0 120 90" aria-hidden="true">
      <g class="d-raios"><path d="M92 6V12M92 44V50M70 28H76M108 28H114M77 13L81 17M103 39L107 43M77 43L81 39M103 17L107 13"/></g>
      <circle cx="92" cy="28" r="10"/>
      <path class="d-cheio-suave" d="M14 62H70A13 13 0 0 0 66 37A18 18 0 0 0 32 34A13 13 0 0 0 14 62Z"/>
      <path class="d-chuva" d="M26 70v8"/><path class="d-chuva d-chuva2" d="M42 70v8"/><path class="d-chuva d-chuva3" d="M58 70v8"/>
    </svg>`,
  arteria: `<svg class="tool-deco mini deco-arteria" viewBox="0 0 120 90" aria-hidden="true">
      <path d="M20 26H116M20 66H116"/>
      <path class="d-cheio-suave" d="M44 26Q60 40 76 26ZM50 66Q64 56 80 66Z"/>
      <circle class="d-glob d-cheio" cx="22" cy="46" r="5"/>
      <circle class="d-glob d-glob2 d-cheio" cx="22" cy="46" r="4"/>
      <circle class="d-glob d-glob3 d-cheio" cx="22" cy="46" r="5"/>
    </svg>`,
  braco: `<svg class="tool-deco mini deco-braco" viewBox="0 0 120 90" aria-hidden="true">
      <path class="d-membro" d="M10 70H62L84 30"/>
      <circle class="d-cheio" cx="88" cy="22" r="8"/>
      <path class="d-biceps d-cheio-suave" d="M24 66Q40 40 58 66"/>
    </svg>`,
  pulmoes: `<svg class="tool-deco mini deco-pulmoes" viewBox="0 0 120 90" aria-hidden="true">
      <g class="d-respirar">
        <path d="M60 6V34M60 34L50 44M60 34L70 44"/>
        <path d="M52 28C38 22 22 36 20 58C18 74 30 82 44 78C52 76 54 68 54 60V40Z"/>
        <path d="M68 28C82 22 98 36 100 58C102 74 90 82 76 78C68 76 66 68 66 60V40Z"/>
      </g>
      <g class="d-germe"><circle cx="106" cy="16" r="5"/><path d="M106 7v3M106 22v3M97 16h3M112 16h3"/></g>
    </svg>`,
};

function cartao(d, i) {
  const tint = i % 2 ? ' tint-coral' : '';
  return `
    <a class="tool reveal destaque${tint}" href="?d=${d.id}" data-doenca="${d.id}">
      ${DECOS[d.deco] || ''}
      <div class="tool-top"><span class="tool-icon" aria-hidden="true">${d.emoji}</span></div>
      <div class="tool-title">${esc(d.nome)}${d.alias ? `<small class="tool-alias">${esc(d.alias)}</small>` : ''}</div>
      <p class="tool-desc">${esc(d.resumo)}</p>
      <div class="tags"><span class="tag">${esc(d.categoria)}</span><span class="tag">5 idades</span></div>
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

function urlPara(doenca, grupo) {
  const p = new URLSearchParams();
  if (doenca) p.set('d', doenca);
  if (doenca && grupo) p.set('idade', grupo);
  const q = p.toString();
  return q ? `?${q}` : location.pathname;
}

function mostrarGrupo(d, grupoId, { focar = false } = {}) {
  const painel = vista.querySelector('.doenca-painel');
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
  history.replaceState({ d: d.id, idade: grupoId }, '', urlPara(d.id, grupoId));
  mostrarGrupo(d, grupoId, { focar });
}

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
    raiz.classList.remove('com-doenca');
    vista.hidden = true;
    vista.innerHTML = '';
    document.title = 'Doenças explicadas para todas as idades · Dra. Maria Cortês Ferreira';
    if (rolar) window.scrollTo({ top: ultimaPosicao, behavior: 'instant' });
  }
}

function navegar(id) {
  if (id) ultimaPosicao = window.scrollY;
  history.pushState({ d: id }, '', urlPara(id, null));
  render({ rolar: true });
  if (id) vista.querySelector('h1')?.focus({ preventScroll: true });
}

if (grelha && vista) {
  grelha.innerHTML = DOENCAS.map(cartao).join('');
  if (contagem) contagem.textContent = DOENCAS.length;

  grelha.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-doenca]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navegar(a.dataset.doenca);
  });

  window.addEventListener('popstate', () => render({ rolar: true }));
  render();
}
