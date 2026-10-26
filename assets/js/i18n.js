// Idioma do site (português / inglês). O conteúdo está escrito em português; em inglês, os textos são
// substituídos a partir do dicionário de i18n-en.js, que só é descarregado quando o inglês está ativo.
// O texto que ainda não tem tradução fica em português. Os textos acrescentados depois pelo JavaScript
// (pesquisa, cartões das doenças, resultados) são traduzidos à medida que aparecem.

const LANG_KEY = 'mcf-lang';
const ATRIBUTOS = ['aria-label', 'title', 'placeholder', 'alt'];
const IGNORAR = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'TEXTAREA', 'CODE']);

const root = document.documentElement;
const originais = new Map(); // nó de texto / elemento+atributo → texto original em português
let dicionario = null;
let observador = null;

function guardado() {
  try {
    const l = localStorage.getItem(LANG_KEY);
    return l === 'en' || l === 'pt' ? l : null;
  } catch {
    return null;
  }
}

export function idiomaAtual() {
  return root.lang === 'en' ? 'en' : 'pt';
}

const normalizar = (s) => s.replace(/\s+/g, ' ').trim();

// Traduz um texto (com o espaço em volta preservado). Devolve null se não houver tradução.
function traduzir(texto) {
  const chave = normalizar(texto);
  if (!chave) return null;
  const t = dicionario[chave];
  if (t === undefined) return null;
  const [, antes, depois] = texto.match(/^(\s*)[\s\S]*?(\s*)$/);
  return antes + t + depois;
}

function traduzirNo(no) {
  const antigo = originais.get(no);
  // Um nó já traduzido só volta a ser lido se o JavaScript lhe tiver posto texto novo.
  if (antigo !== undefined && antigo.traduzido === no.nodeValue) return;
  const t = traduzir(no.nodeValue);
  if (t !== null) originais.set(no, { original: no.nodeValue, traduzido: t });
  else if (antigo !== undefined) originais.delete(no);
  if (t !== null) no.nodeValue = t;
}

function traduzirAtributo(el, nome) {
  const valor = el.getAttribute(nome);
  if (valor === null) return;
  const chave = `${nome}`;
  const registo = originais.get(el) ?? {};
  if (registo[chave] && registo[chave].traduzido === valor) return;
  const t = traduzir(valor);
  if (t === null) return;
  registo[chave] = { original: valor, traduzido: t };
  originais.set(el, registo);
  el.setAttribute(nome, t);
}

function percorrer(no) {
  if (no.nodeType === Node.TEXT_NODE) {
    if (!IGNORAR.has(no.parentNode?.nodeName?.toUpperCase())) traduzirNo(no);
    return;
  }
  if (no.nodeType !== Node.ELEMENT_NODE || IGNORAR.has(no.nodeName.toUpperCase())) return;
  for (const nome of ATRIBUTOS) if (no.hasAttribute(nome)) traduzirAtributo(no, nome);
  for (const filho of no.childNodes) percorrer(filho);
}

function traduzirCabeca() {
  if (!originais.has(document)) {
    originais.set(document, { titulo: document.title });
  }
  const t = traduzir(originais.get(document).titulo);
  if (t !== null) document.title = t;
  for (const sel of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[property="og:title"]', 'meta[name="twitter:description"]', 'meta[name="twitter:title"]']) {
    const m = document.head.querySelector(sel);
    if (!m) continue;
    const registo = originais.get(m) ?? { original: m.content };
    originais.set(m, registo);
    const tr = traduzir(registo.original);
    if (tr !== null) m.content = tr;
  }
}

function restaurar() {
  for (const [alvo, reg] of originais) {
    if (alvo === document) document.title = reg.titulo;
    else if (alvo.nodeType === Node.TEXT_NODE) {
      if (alvo.nodeValue === reg.traduzido) alvo.nodeValue = reg.original;
    } else if (alvo.tagName === 'META') alvo.content = reg.original;
    else {
      for (const nome of ATRIBUTOS) {
        if (reg[nome] && alvo.getAttribute(nome) === reg[nome].traduzido) alvo.setAttribute(nome, reg[nome].original);
      }
    }
  }
  originais.clear();
}

function observar() {
  if (observador) return;
  observador = new MutationObserver((lista) => {
    observador.disconnect();
    for (const m of lista) {
      if (m.type === 'characterData') percorrer(m.target);
      else if (m.type === 'attributes') traduzirAtributo(m.target, m.attributeName);
      else m.addedNodes.forEach(percorrer);
    }
    ligar();
  });
  ligar();
}

function ligar() {
  observador.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATRIBUTOS });
}

async function aplicarIngles() {
  dicionario ??= (await import('./i18n-en.js')).EN;
  if (idiomaAtual() !== 'en') return;
  traduzirCabeca();
  percorrer(document.body);
  observar();
}

function aplicarPortugues() {
  observador?.disconnect();
  observador = null;
  restaurar();
}

const botoes = new Set();

function pintarBotoes() {
  const en = idiomaAtual() === 'en';
  for (const b of botoes) {
    b.textContent = en ? 'PT' : 'EN';
    b.setAttribute('aria-label', en ? 'Mudar para português' : 'Switch to English');
    b.title = en ? 'Português' : 'English';
    b.lang = en ? 'pt' : 'en';
  }
}

export async function definirIdioma(lang, guardar = true) {
  root.lang = lang === 'en' ? 'en' : 'pt-PT';
  if (guardar) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* armazenamento indisponível: o idioma vale só para esta visita */
    }
  }
  pintarBotoes();
  if (lang === 'en') await aplicarIngles();
  else aplicarPortugues();
  document.dispatchEvent(new CustomEvent('mcf-idioma', { detail: { lang } }));
}

// Cria o botão PT/EN ao lado do botão do tema.
export function iniciarIdioma() {
  const tema = document.querySelector('.site-header .theme-toggle');
  if (tema) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'icon-btn lang-toggle';
    botao.addEventListener('click', () => definirIdioma(idiomaAtual() === 'en' ? 'pt' : 'en'));
    tema.after(botao);
    botoes.add(botao);
  }
  pintarBotoes();
  if (guardado() === 'en') definirIdioma('en', false);
}
