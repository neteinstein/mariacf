// Ferramentas favoritas e usadas recentemente, guardadas só neste browser (localStorage).
// Em cada calculadora: botão «Guardar nos favoritos» e registo da visita.
// Na página de ferramentas: atalhos para as favoritas e as recentes, e uma estrela nos cartões favoritos.

const FAV_KEY = 'mcf-favoritos';
const REC_KEY = 'mcf-recentes';
const MAX_RECENTES = 6;

function lerLista(chave) {
  try {
    const v = JSON.parse(localStorage.getItem(chave) || '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string' && /^calculadora-[a-z0-9-]+$/.test(x)) : [];
  } catch {
    return [];
  }
}

function guardarLista(chave, lista) {
  try {
    localStorage.setItem(chave, JSON.stringify(lista));
    return true;
  } catch {
    return false; // sem armazenamento (navegação privada, por exemplo)
  }
}

export function registarVisita(lista, id, max = MAX_RECENTES) {
  return [id, ...lista.filter((x) => x !== id)].slice(0, max);
}

export function alternarFavorito(lista, id) {
  return lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id];
}

const estrela = (cheia) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="${cheia ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3l-5.5 2.9 1-6.2L3 9.6l6.2-.9z"/></svg>`;

function paginaDeCalculadora(raiz) {
  const id = new URL('.', location.href).pathname.slice(raiz.pathname.length).replace(/\/$/, '');
  return /^calculadora-[a-z0-9-]+$/.test(id) ? id : null;
}

function iniciarNaCalculadora(id) {
  guardarLista(REC_KEY, registarVisita(lerLista(REC_KEY), id));

  const hero = document.querySelector('.page-hero');
  if (!hero) return;
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'action-btn favorito-btn';
  const pintar = () => {
    const fav = lerLista(FAV_KEY).includes(id);
    botao.setAttribute('aria-pressed', String(fav));
    botao.innerHTML = `${estrela(fav)} ${fav ? 'Nos favoritos' : 'Guardar nos favoritos'}`;
  };
  botao.addEventListener('click', () => {
    guardarLista(FAV_KEY, alternarFavorito(lerLista(FAV_KEY), id));
    pintar();
  });
  pintar();
  hero.append(botao);
}

function iniciarNasFerramentas(raiz) {
  const grelha = document.getElementById('tools-grid');
  if (!grelha) return;
  const cartoes = new Map(
    [...grelha.querySelectorAll('a.tool')].map((a) => [new URL(a.href).pathname.slice(raiz.pathname.length).replace(/\/$/, ''), a])
  );
  const favoritos = lerLista(FAV_KEY).filter((id) => cartoes.has(id));
  const recentes = lerLista(REC_KEY).filter((id) => cartoes.has(id));

  for (const id of favoritos) {
    const topo = cartoes.get(id).querySelector('.tool-top');
    topo?.insertAdjacentHTML('beforeend', `<span class="tool-favorito" title="Nos favoritos">${estrela(true)}<span class="sr-only">Nos favoritos</span></span>`);
  }

  if (!favoritos.length && !recentes.length) return;
  const atalhos = (titulo, ids) =>
    ids.length
      ? `<div class="atalhos-grupo"><h3>${titulo}</h3><div class="atalhos-lista">${ids
          .map((id) => {
            const a = cartoes.get(id);
            const nome = a.querySelector('.tool-title')?.textContent.trim() || id;
            return `<a class="atalho" href="${a.getAttribute('href')}">${nome.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])}</a>`;
          })
          .join('')}</div></div>`
      : '';
  const seccao = document.createElement('div');
  seccao.className = 'atalhos-ferramentas';
  seccao.innerHTML = atalhos(`${estrela(true)} Favoritas`, favoritos) + atalhos('Usadas recentemente', recentes.filter((id) => !favoritos.includes(id)).slice(0, 4));
  document.querySelector('.tools-toolbar')?.before(seccao);
}

export function iniciarFavoritos(raiz) {
  const id = paginaDeCalculadora(raiz);
  if (id) iniciarNaCalculadora(id);
  else iniciarNasFerramentas(raiz);
}
