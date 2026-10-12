// Pesquisa global: um botão no cabeçalho (e os atalhos Ctrl/⌘+K ou «/») abre uma caixa que procura
// ao mesmo tempo nas ferramentas, nas doenças e nas secções do site. O índice (pesquisa-indice.js,
// gerado por scripts/gerar.mjs) só é carregado quando a caixa abre pela primeira vez.

export const normalizar = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

// Todas as palavras têm de aparecer; o título vale mais do que a descrição.
export function procurar(indice, termo, limite = 8) {
  const palavras = normalizar(termo).split(/\s+/).filter(Boolean);
  if (!palavras.length) return [];
  const resultados = [];
  for (const item of indice) {
    const titulo = normalizar(item.titulo);
    const resto = normalizar(`${item.texto} ${item.palavras}`);
    let pontos = 0;
    for (const p of palavras) {
      if (titulo.startsWith(p)) pontos += 6;
      else if (titulo.split(/[\s(/-]+/).some((w) => w.startsWith(p))) pontos += 4;
      else if (titulo.includes(p)) pontos += 3;
      else if (resto.includes(p)) pontos += 1;
      else {
        pontos = 0;
        break;
      }
    }
    if (pontos) resultados.push({ item, pontos });
  }
  return resultados
    .sort((a, b) => b.pontos - a.pontos || a.item.titulo.localeCompare(b.item.titulo, 'pt'))
    .slice(0, limite)
    .map((r) => r.item);
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const lupa =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>';

export function iniciarPesquisa(raiz) {
  const acoes = document.querySelector('.site-header .header-actions');
  if (!acoes || typeof HTMLDialogElement === 'undefined') return;

  const mac = /Mac|iPhone|iPad/.test(navigator.platform);
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'icon-btn pesquisa-btn';
  botao.setAttribute('aria-label', `Pesquisar no site (${mac ? '⌘' : 'Ctrl'}+K)`);
  botao.title = `Pesquisar (${mac ? '⌘' : 'Ctrl'}+K)`;
  botao.setAttribute('aria-haspopup', 'dialog');
  botao.innerHTML = lupa;
  acoes.insertBefore(botao, acoes.querySelector('.theme-toggle'));

  const caixa = document.createElement('dialog');
  caixa.className = 'pesquisa';
  caixa.setAttribute('aria-label', 'Pesquisar no site');
  caixa.innerHTML = `
    <form method="dialog" class="pesquisa-form" role="search">
      ${lupa}
      <input type="search" class="pesquisa-input" placeholder="Procurar doença, calculadora ou sintoma…" aria-label="Pesquisar no site"
        role="combobox" aria-expanded="false" aria-controls="pesquisa-lista" aria-autocomplete="list" autocomplete="off" enterkeyhint="go">
      <button type="button" class="pesquisa-fechar" aria-label="Fechar">Esc</button>
    </form>
    <ul class="pesquisa-lista" id="pesquisa-lista" role="listbox" aria-label="Resultados"></ul>
    <p class="pesquisa-dica" aria-live="polite"></p>`;
  document.body.append(caixa);

  const input = caixa.querySelector('input');
  const lista = caixa.querySelector('ul');
  const dica = caixa.querySelector('.pesquisa-dica');
  let indice = null;
  let ativo = -1;
  let itens = [];

  async function carregar() {
    if (indice) return indice;
    ({ INDICE: indice } = await import('./pesquisa-indice.js'));
    return indice;
  }

  function marcar(i) {
    const opcoes = lista.querySelectorAll('[role="option"]');
    ativo = opcoes.length ? (i + opcoes.length) % opcoes.length : -1;
    opcoes.forEach((o, j) => o.setAttribute('aria-selected', String(j === ativo)));
    if (ativo >= 0) {
      input.setAttribute('aria-activedescendant', opcoes[ativo].id);
      opcoes[ativo].scrollIntoView({ block: 'nearest' });
    } else input.removeAttribute('aria-activedescendant');
  }

  async function atualizar() {
    const termo = input.value.trim();
    if (!termo) {
      itens = [];
      lista.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
      dica.textContent = 'Escreva, por exemplo, «febre», «diabetes» ou «CURB-65».';
      return;
    }
    itens = procurar(await carregar(), termo);
    if (termo !== input.value.trim()) return; // entretanto, o texto mudou
    lista.innerHTML = itens
      .map(
        (it, i) => `
        <li role="option" id="pesquisa-op-${i}" aria-selected="false">
          <a href="${esc(new URL(it.url, raiz).href)}">
            <span class="pesquisa-tipo">${esc(it.tipo)}</span>
            <strong>${esc(it.titulo)}</strong>
            <span class="pesquisa-texto">${esc(it.texto)}</span>
          </a>
        </li>`
      )
      .join('');
    input.setAttribute('aria-expanded', String(itens.length > 0));
    dica.textContent = itens.length ? `${itens.length} resultado${itens.length > 1 ? 's' : ''}` : 'Sem resultados. Experimente outra palavra.';
    marcar(0);
  }

  function abrir() {
    if (caixa.open) return;
    caixa.showModal();
    input.select();
    atualizar();
  }

  botao.addEventListener('click', abrir);
  caixa.querySelector('.pesquisa-fechar').addEventListener('click', () => caixa.close());
  // Clicar fora da caixa (no fundo escurecido) fecha-a.
  caixa.addEventListener('click', (e) => {
    if (e.target === caixa) caixa.close();
  });
  caixa.addEventListener('close', () => botao.focus());
  input.addEventListener('input', atualizar);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') marcar(ativo + 1);
    else if (e.key === 'ArrowUp') marcar(ativo - 1);
    else if (e.key === 'Enter') {
      const a = lista.querySelectorAll('[role="option"] a')[ativo];
      if (a) location.href = a.href;
    } else return;
    e.preventDefault();
  });

  document.addEventListener('keydown', (e) => {
    const aEscrever = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      abrir();
    } else if (e.key === '/' && !aEscrever && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      abrir();
    }
  });
}
