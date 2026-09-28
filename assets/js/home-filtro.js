// Pesquisa e filtro por categoria das ferramentas na página inicial.

const grid = document.getElementById('tools-grid');
const busca = document.getElementById('busca-ferramentas');
const filtros = document.getElementById('filtros-categoria');
const vazio = document.getElementById('tools-vazio');
const contagem = document.getElementById('tools-contagem');

if (grid && busca && filtros) {
  const cartas = Array.from(grid.querySelectorAll('.tool'));
  const titulos = Array.from(grid.querySelectorAll('.tools-section-title'));
  const botoes = Array.from(filtros.querySelectorAll('.tabbtn'));
  const totalFerramentas = cartas.length;

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
    let visiveis = 0;

    titulos.forEach((titulo) => {
      const cat = titulo.dataset.categoria;
      const cartasDaSeccao = cartas.filter((c) => c.dataset.categoria === cat);
      let seccaoVisivel = false;

      cartasDaSeccao.forEach((carta) => {
        const combinaCategoria = categoriaAtiva === 'todas' || categoriaAtiva === cat;
        const combinaTexto = !termo || textoCarta.get(carta).includes(termo);
        const visivel = combinaCategoria && combinaTexto;
        carta.hidden = !visivel;
        if (visivel) {
          seccaoVisivel = true;
          algumVisivel = true;
          visiveis += 1;
        }
      });

      titulo.hidden = !seccaoVisivel;
    });

    vazio.hidden = algumVisivel;
    if (contagem) {
      contagem.textContent = visiveis === totalFerramentas ? `(${totalFerramentas})` : `(${visiveis} de ${totalFerramentas})`;
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
