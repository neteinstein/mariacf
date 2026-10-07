// Service worker: permite usar as calculadoras sem rede (por exemplo, num
// consultório com má ligação) e instalar o site como aplicação.
// Estratégia «rede primeiro»: com ligação, serve sempre a versão mais recente
// e atualiza a cache; sem ligação, usa a última versão guardada.
// A lista PRECACHE é verificada pelos testes (tests/site.test.mjs).

const CACHE = 'mcf-v14';

const PRECACHE = [
  './',
  'calculadora-anticoagulacao/',
  'calculadora-corticoides/',
  'calculadora-crescimento/',
  'calculadora-digestivo/',
  'calculadora-doses/',
  'calculadora-dpp/',
  'calculadora-familia/',
  'calculadora-funcao-renal/',
  'calculadora-geriatria/',
  'calculadora-gravidez-peso/',
  'calculadora-habitos/',
  'calculadora-hepatica/',
  'calculadora-imc-asc/',
  'calculadora-laboratorial/',
  'calculadora-parto-neonatal/',
  'calculadora-pediatria/',
  'calculadora-plano-rastreios/',
  'calculadora-queimados/',
  'calculadora-rastreio/',
  'calculadora-respiratoria/',
  'calculadora-risco-cardiovascular/',
  'calculadora-saude-mental/',
  'calculadora-sono/',
  'calculadora-urgencia/',
  'calculadora-urologia/',
  'calculadora-vacinas/',
  'calculadora-vascular/',
  'ferramentas/',
  'sns/',
  'sobre/',
  'usf/',
  'manifest.webmanifest',
  'assets/css/styles.css',
  'assets/img/favicon.svg',
  'assets/img/icon-180.png',
  'assets/img/icon-192.png',
  'assets/img/icon-512.png',
  'assets/img/icon-maskable-512.png',
  'assets/img/maria.jpg',
  'assets/js/anticoagulacao-core.js',
  'assets/js/anticoagulacao.js',
  'assets/js/calc-ui.js',
  'assets/js/corticoides-core.js',
  'assets/js/corticoides.js',
  'assets/js/crescimento-core.js',
  'assets/js/crescimento-dados-2-19.js',
  'assets/js/crescimento-dados.js',
  'assets/js/crescimento-grafico.js',
  'assets/js/crescimento.js',
  'assets/js/digestivo-core.js',
  'assets/js/digestivo.js',
  'assets/js/doencas-dados.js',
  'assets/js/doencas-ilustracoes.js',
  'assets/js/doencas.js',
  'assets/js/doses-core.js',
  'assets/js/doses.js',
  'assets/js/dpp-core.js',
  'assets/js/dpp.js',
  'assets/js/familia-core.js',
  'assets/js/familia.js',
  'assets/js/fx.js',
  'assets/js/funcao-renal-core.js',
  'assets/js/funcao-renal.js',
  'assets/js/geriatria-core.js',
  'assets/js/geriatria.js',
  'assets/js/gravidez-peso-core.js',
  'assets/js/gravidez-peso.js',
  'assets/js/habitos-core.js',
  'assets/js/habitos.js',
  'assets/js/hepatica-core.js',
  'assets/js/hepatica.js',
  'assets/js/home-filtro.js',
  'assets/js/imc-asc-core.js',
  'assets/js/imc-asc.js',
  'assets/js/laboratorial-core.js',
  'assets/js/laboratorial.js',
  'assets/js/parto-neonatal-core.js',
  'assets/js/parto-neonatal.js',
  'assets/js/pediatria-core.js',
  'assets/js/pediatria.js',
  'assets/js/plano-rastreios-core.js',
  'assets/js/plano-rastreios.js',
  'assets/js/queimados-core.js',
  'assets/js/queimados.js',
  'assets/js/rastreio-core.js',
  'assets/js/rastreio.js',
  'assets/js/respiratorio-core.js',
  'assets/js/respiratorio.js',
  'assets/js/risco-cardiovascular-core.js',
  'assets/js/risco-cardiovascular.js',
  'assets/js/saude-mental-core.js',
  'assets/js/saude-mental.js',
  'assets/js/site.js',
  'assets/js/sono-core.js',
  'assets/js/sono.js',
  'assets/js/urgencia-core.js',
  'assets/js/urgencia.js',
  'assets/js/urgencia2-core.js',
  'assets/js/urologia-core.js',
  'assets/js/urologia.js',
  'assets/js/vacinas-core.js',
  'assets/js/vacinas.js',
  'assets/js/vascular-core.js',
  'assets/js/vascular.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

const FONTES = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];

self.addEventListener('fetch', (event) => {
  const pedido = event.request;
  if (pedido.method !== 'GET') return;
  const url = new URL(pedido.url);

  // Tipos de letra: cache primeiro (não mudam).
  if (FONTES.includes(url.origin)) {
    event.respondWith(
      caches.match(pedido).then(
        (guardada) =>
          guardada ||
          fetch(pedido).then((resposta) => {
            const copia = resposta.clone();
            caches.open(CACHE).then((cache) => cache.put(pedido, copia));
            return resposta;
          })
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Rede primeiro, com a cache como alternativa sem ligação.
  event.respondWith(
    fetch(pedido)
      .then((resposta) => {
        if (resposta.ok) {
          const copia = resposta.clone();
          caches.open(CACHE).then((cache) => cache.put(pedido, copia));
        }
        return resposta;
      })
      .catch(() =>
        caches.match(pedido, { ignoreSearch: true }).then((guardada) => {
          if (guardada || pedido.mode !== 'navigate') return guardada;
          return caches.match('./');
        })
      )
  );
});
