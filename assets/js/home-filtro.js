// Pesquisa e filtro por categoria das ferramentas na página inicial.

const grid = document.getElementById('tools-grid');
const busca = document.getElementById('busca-ferramentas');
const filtros = document.getElementById('filtros-categoria');
const vazio = document.getElementById('tools-vazio');
const contagem = document.getElementById('tools-contagem');

if (grid && busca && filtros) {
  // A mesma ferramenta pode aparecer em várias categorias; a contagem usa o href.
  const cartas = Array.from(grid.querySelectorAll('.tool'));
  const seccoes = Array.from(grid.querySelectorAll('.tools-section'));
  const botoes = Array.from(filtros.querySelectorAll('.tabbtn'));
  const totalFerramentas = new Set(cartas.map((c) => c.getAttribute('href'))).size;

  const normalizar = (s) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');

  const textoCarta = new WeakMap();
  cartas.forEach((c) => textoCarta.set(c, normalizar(c.textContent)));

  let categoriaAtiva = 'todas';

  function aplicar() {
    const termo = normalizar(busca.value.trim());
    let algumVisivel = false;
    const visiveis = new Set();

    seccoes.forEach((seccao) => {
      const cartasDaSeccao = Array.from(seccao.querySelectorAll('.tool'));
      const combinaCategoria = categoriaAtiva === 'todas' || categoriaAtiva === seccao.dataset.categoria;
      let visiveisNaSeccao = 0;

      cartasDaSeccao.forEach((carta) => {
        const combinaTexto = !termo || textoCarta.get(carta).includes(termo);
        const visivel = combinaCategoria && combinaTexto;
        carta.hidden = !visivel;
        if (visivel) {
          visiveisNaSeccao += 1;
          algumVisivel = true;
          visiveis.add(carta.getAttribute('href'));
        }
      });

      seccao.hidden = visiveisNaSeccao === 0;
      seccao.classList.toggle('multi', visiveisNaSeccao > 1);
    });

    vazio.hidden = algumVisivel;
    if (contagem) {
      contagem.textContent =
        visiveis.size === totalFerramentas ? `(${totalFerramentas})` : `(${visiveis.size} de ${totalFerramentas})`;
    }

    const params = new URLSearchParams(location.search);
    if (termo) params.set('q', busca.value.trim());
    else params.delete('q');
    if (categoriaAtiva !== 'todas') params.set('cat', categoriaAtiva);
    else params.delete('cat');
    const query = params.toString();
    history.replaceState(null, '', query ? `?${query}` : location.pathname);
  }

  botoes.forEach((btn) => {
    btn.addEventListener('click', () => {
      categoriaAtiva = btn.dataset.categoria;
      botoes.forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
      aplicar();
    });
  });

  busca.addEventListener('input', aplicar);

  const params = new URLSearchParams(location.search);
  if (params.get('q')) busca.value = params.get('q');
  const catInicial = params.get('cat');
  if (catInicial && botoes.some((b) => b.dataset.categoria === catInicial)) {
    categoriaAtiva = catInicial;
    botoes.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.categoria === catInicial)));
  }

  aplicar();
}
