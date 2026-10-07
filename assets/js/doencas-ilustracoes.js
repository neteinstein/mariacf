// Ilustrações animadas (SVG) das páginas de doenças.
// Cada ilustração é desenhada numa grelha de 200×150 e anima-se só com CSS
// (classes «an-*» em styles.css). As cores vêm de classes «c-*» ligadas às
// variáveis do tema, para funcionarem no tema claro e no escuro.
// Regra: um elemento animado nunca tem atributo transform (a animação CSS
// substituí-lo-ia); quando é preciso rodar ou deslocar, usa-se um <g> por fora.
// Elementos com a classe «rv» rodam à volta de um ponto da grelha
// (style="transform-origin: Xpx Ypx"); os restantes, à volta do próprio centro.

const n = (v) => Math.round(v * 10) / 10;

function cara(cx, cy, r, humor = 'feliz') {
  const ex = r * 0.36;
  const ey = cy - r * 0.08;
  let olhos;
  if (humor === 'dormir') {
    olhos = `<path d="M${n(cx - ex - r * 0.14)} ${n(ey)}q${n(r * 0.14)} ${n(r * 0.12)} ${n(r * 0.28)} 0M${n(cx + ex - r * 0.14)} ${n(ey)}q${n(r * 0.14)} ${n(r * 0.12)} ${n(r * 0.28)} 0"/>`;
  } else if (humor === 'doente') {
    olhos = `<path d="M${n(cx - ex - r * 0.13)} ${n(ey)}h${n(r * 0.26)}M${n(cx + ex - r * 0.13)} ${n(ey)}h${n(r * 0.26)}"/>`;
  } else {
    const er = n(Math.max(1.6, r * 0.09));
    olhos = `<circle class="c-tinta sem" cx="${n(cx - ex)}" cy="${n(ey)}" r="${er}"/><circle class="c-tinta sem" cx="${n(cx + ex)}" cy="${n(ey)}" r="${er}"/>`;
  }
  const my = cy + r * 0.32;
  const mw = r * 0.3;
  let boca;
  if (humor === 'triste') boca = `<path d="M${n(cx - mw)} ${n(my + r * 0.12)}q${n(mw)} ${n(-r * 0.2)} ${n(mw * 2)} 0"/>`;
  else if (humor === 'doente') boca = `<ellipse class="c-tinta sem" cx="${n(cx)}" cy="${n(my + r * 0.05)}" rx="${n(r * 0.1)}" ry="${n(r * 0.13)}"/>`;
  else if (humor === 'neutro') boca = `<path d="M${n(cx - mw * 0.7)} ${n(my + r * 0.04)}h${n(mw * 1.4)}"/>`;
  else boca = `<path d="M${n(cx - mw)} ${n(my)}q${n(mw)} ${n(r * 0.26)} ${n(mw * 2)} 0"/>`;
  const bochechas =
    humor === 'feliz' || humor === 'dormir'
      ? `<circle class="c-bochecha sem" cx="${n(cx - r * 0.58)}" cy="${n(cy + r * 0.22)}" r="${n(r * 0.14)}"/><circle class="c-bochecha sem" cx="${n(cx + r * 0.58)}" cy="${n(cy + r * 0.22)}" r="${n(r * 0.14)}"/>`
      : '';
  return `<g class="fino">${olhos}${boca}</g>${bochechas}`;
}

function cabeca(cx, cy, r, { humor = 'feliz', pele = 'c-pele', cabelo = 'c-cabelo', oculos = false } = {}) {
  const cab = cabelo
    ? `<path class="${cabelo}" d="M${n(cx - r)} ${n(cy)}A${r} ${r} 0 0 1 ${n(cx + r)} ${n(cy)}Q${n(cx + r * 0.25)} ${n(cy - r * 0.62)} ${n(cx - r * 0.35)} ${n(cy - r * 0.42)}Q${n(cx - r * 0.8)} ${n(cy - r * 0.3)} ${n(cx - r)} ${n(cy)}Z"/>`
    : '';
  const ocl = oculos
    ? `<g class="fino"><circle cx="${n(cx - r * 0.36)}" cy="${n(cy - r * 0.08)}" r="${n(r * 0.25)}"/><circle cx="${n(cx + r * 0.36)}" cy="${n(cy - r * 0.08)}" r="${n(r * 0.25)}"/><path d="M${n(cx - r * 0.11)} ${n(cy - r * 0.08)}h${n(r * 0.22)}"/></g>`
    : '';
  return `<circle class="${pele}" cx="${n(cx)}" cy="${n(cy)}" r="${r}"/>${cab}${cara(cx, cy, r, humor)}${ocl}`;
}

// Figura de pé, de frente. Devolve o SVG e os pontos úteis para acrescentar braços.
function pessoa(cx, y, o = {}) {
  const { r = 15, cor = 'c-cor', alt = 38, bracos = 'baixo', pele = 'c-pele', ...resto } = o;
  const cy = y + r;
  const t = cy + r + 3;
  const w = r * 0.95;
  const b = t + alt;
  const tronco = `<path class="${cor}" d="M${n(cx - w)} ${n(b)}V${n(t + 10)}Q${n(cx - w)} ${n(t)} ${n(cx)} ${n(t)}Q${n(cx + w)} ${n(t)} ${n(cx + w)} ${n(t + 10)}V${n(b)}Z"/>`;
  const pernas = `<path d="M${n(cx - w * 0.45)} ${n(b)}v18M${n(cx + w * 0.45)} ${n(b)}v18"/>`;
  const ombroE = [cx - w, t + 8];
  const ombroD = [cx + w, t + 8];
  const mao = (x, yy) => `<circle class="${pele}" cx="${n(x)}" cy="${n(yy)}" r="4"/>`;
  const braco = (p, dx, dy) => `<path d="M${n(p[0])} ${n(p[1])}l${dx} ${dy}"/>${mao(p[0] + dx, p[1] + dy)}`;
  let br = '';
  if (bracos === 'baixo') br = braco(ombroE, -7, 24) + braco(ombroD, 7, 24);
  else if (bracos === 'cima') br = braco(ombroE, -12, -22) + braco(ombroD, 12, -22);
  else if (bracos === 'acenar') {
    br =
      braco(ombroE, -7, 24) +
      `<g class="an-acenar rv" style="transform-origin:${n(ombroD[0])}px ${n(ombroD[1])}px">${braco(ombroD, 12, -20)}</g>`;
  }
  return {
    svg: pernas + tronco + br + cabeca(cx, cy, r, { pele, ...resto }),
    cy,
    t,
    w,
    b,
    ombroE,
    ombroD,
    mao,
  };
}

function estrela(cx, cy, s, cls = 'c-sol', extra = '') {
  return `<path class="${cls} sem ${extra}" d="M${cx} ${cy - s}Q${cx} ${cy} ${cx + s} ${cy}Q${cx} ${cy} ${cx} ${cy + s}Q${cx} ${cy} ${cx - s} ${cy}Q${cx} ${cy} ${cx} ${cy - s}Z"/>`;
}

function coracaoPeq(cx, cy, s, cls = 'c-coral') {
  return `<path class="${cls}" d="M${n(cx)} ${n(cy + s * 0.9)}C${n(cx - s * 1.3)} ${n(cy + s * 0.1)} ${n(cx - s * 1)} ${n(cy - s * 1)} ${n(cx)} ${n(cy - s * 0.35)}C${n(cx + s * 1)} ${n(cy - s * 1)} ${n(cx + s * 1.3)} ${n(cy + s * 0.1)} ${n(cx)} ${n(cy + s * 0.9)}Z"/>`;
}

function germe(cx, cy, r, cls = 'c-coral') {
  let espinhos = '';
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    espinhos += `M${n(cx + Math.cos(a) * r)} ${n(cy + Math.sin(a) * r)}L${n(cx + Math.cos(a) * (r + 5))} ${n(cy + Math.sin(a) * (r + 5))}`;
  }
  const e = r * 0.35;
  return (
    `<path d="${espinhos}"/><circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/>` +
    `<circle class="c-tinta sem" cx="${n(cx - e)}" cy="${n(cy - r * 0.15)}" r="1.8"/><circle class="c-tinta sem" cx="${n(cx + e)}" cy="${n(cy - r * 0.15)}" r="1.8"/>` +
    `<path class="fino" d="M${n(cx - e)} ${n(cy + r * 0.35)}l${n(e / 2)} -2l${n(e / 2)} 2l${n(e / 2)} -2l${n(e / 2)} 2"/>`
  );
}

// Pequeno distintivo «menos» (menos sal, menos fritos…)
function menos(cx, cy) {
  return `<g class="an-pulsar"><circle class="c-coral" cx="${cx}" cy="${cy}" r="14"/><path class="t-branco grosso" d="M${cx - 6} ${cy}h12"/></g>`;
}

// Vaso sanguíneo com partículas a correr (glóbulos, açúcar, gordura).
function vaso(conteudo, placas = '') {
  return `<rect class="c-coral-s sem" x="0" y="48" width="200" height="60"/>${placas}<g>${conteudo}</g><path class="grosso" d="M0 48H200M0 108H200"/>`;
}

const globulo = (atraso, y = 78) =>
  `<g class="an-deslizar ${atraso}"><ellipse class="c-vermelho" cx="100" cy="${y}" rx="11" ry="7"/><ellipse class="c-vermelho-e sem" cx="100" cy="${y}" rx="5" ry="2.5"/></g>`;

// Contornos partilhados por várias ilustrações (e pelas miniaturas dos cartões).
const TRAQUEIA = 'M100 18V56M100 56L90 66M100 56L110 66';
const PULMAO_E = 'M88 48C66 38 42 60 40 94C38 120 56 132 76 126C86 123 90 112 90 102V62Z';
const PULMAO_D = 'M112 48C134 38 158 60 160 94C162 120 144 132 124 126C114 123 110 112 110 102V62Z';
const CEREBRO =
  'M58 92C44 90 40 74 48 66C42 54 52 40 66 42C70 30 88 26 98 34C108 24 128 28 132 40C146 38 158 50 154 62C164 70 160 88 148 92C148 104 134 112 122 106C114 116 96 116 90 108C80 114 64 108 64 98C60 98 58 96 58 92Z';
const CEREBRO_SULCOS = 'M66 58Q74 52 82 58M104 42Q110 50 120 48M136 58Q140 66 148 66M60 80Q66 74 72 80M128 98Q134 92 142 96M96 104Q100 98 108 102';
const ESTOMAGO = 'M84 44C62 46 50 70 56 94C62 118 94 130 122 120C146 112 156 90 148 74C142 62 128 60 120 68C114 74 106 70 104 60C102 50 96 44 84 44Z';
const ESOFAGO = 'M80 8Q80 28 86 46';
const DUODENO = 'M146 80Q164 78 168 90Q170 102 162 110';
const CORACAO = 'M100 128C58 102 40 78 50 54C60 32 88 32 100 52C112 32 140 32 150 54C160 78 142 102 100 128Z';
const FIGADO = 'M30 64C30 44 54 34 86 36C120 38 158 34 172 48C182 58 172 70 156 78C136 88 118 100 96 110C76 118 52 112 40 98C32 88 30 76 30 64Z';

// Muda a escala de um contorno feito só de pares «x y» absolutos (M, L, C, Q).
const escalar = (d, s, dx, dy) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${n(x * s + dx)} ${n(y * s + dy)}`);

// Tubo com contorno (esófago, intestino, endoscópio…): traço grosso escuro e, por cima, a cor.
function tubo(d, cor, fora = 13, dentro = 8) {
  return `<path style="stroke-width:${fora}" d="${d}"/><path class="${cor}" style="stroke-width:${dentro}" d="${d}"/>`;
}

function pecaPuzzle(x, y, s) {
  const k = n(s * 0.15);
  return `M${x} ${y}h${n(s * 0.35)}a${k} ${k} 0 0 1 ${n(s * 0.3)} 0h${n(s * 0.35)}v${n(s * 0.35)}a${k} ${k} 0 0 1 0 ${n(s * 0.3)}v${n(s * 0.35)}h${-s}Z`;
}

function contornoEngrenagem(cx, cy, r) {
  const dentes = 8;
  const meia = Math.PI / dentes / 2.4;
  const pts = [];
  for (let i = 0; i < dentes * 2; i++) {
    const a = (i * Math.PI) / dentes;
    const rr = i % 2 ? r * 0.74 : r;
    pts.push(`${n(cx + Math.cos(a - meia) * rr)} ${n(cy + Math.sin(a - meia) * rr)}`, `${n(cx + Math.cos(a + meia) * rr)} ${n(cy + Math.sin(a + meia) * rr)}`);
  }
  return `M${pts.join('L')}Z`;
}

const engrenagem = (cx, cy, r) =>
  `<path class="c-sol" d="${contornoEngrenagem(cx, cy, r)}"/><circle class="c-figado" cx="${cx}" cy="${cy}" r="${n(r * 0.32)}"/>`;

// Helicobacter pylori: bactéria em espiral, com flagelos.
const helicobacter = (x, y, rot) =>
  `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="t-verde" style="stroke-width:6" d="M-12 0q4 -6 8 0t8 0t8 0"/><path class="fino" d="M12 0l7 -4M12 0l8 1M12 0l6 5"/></g>`;

// Bacilo de Koch: um pauzinho.
const bacilo = (x, y, rot, atraso = '') =>
  `<g class="an-flutuar ${atraso}"><g transform="translate(${x} ${y}) rotate(${rot})"><rect class="c-vermelho" x="-9" y="-3.5" width="18" height="7" rx="3.5"/></g></g>`;

const nota = (x, y, atraso) =>
  `<g class="an-subir ${atraso}"><ellipse class="c-cor sem" cx="${x}" cy="${y}" rx="5.5" ry="4.2"/><path class="t-cor grosso" d="M${x + 5} ${y}V${y - 22}q6 4 8 10"/></g>`;

function desenharPes() {
  const pe = `
    <path class="c-pele" d="M70 136C56 136 54 112 56 92C58 68 62 50 76 50C90 50 92 70 90 92C88 112 86 136 70 136Z"/>
    <circle class="c-pele" cx="64" cy="44" r="5"/><circle class="c-pele" cx="73" cy="38" r="4.5"/><circle class="c-pele" cx="81" cy="38" r="4"/><circle class="c-pele" cx="88" cy="42" r="3.5"/>`;
  return `${pe}<g transform="translate(200 0) scale(-1 1)">${pe}</g>`;
}

export const ILUSTRACOES = {
  coracao: () => `
    <path class="an-fluir fraco" stroke-dasharray="4 10" d="M8 76H44M156 76H192"/>
    <g class="an-bater">
      <path class="c-coral" d="${CORACAO}"/>
      ${cara(100, 80, 26)}
    </g>
    ${estrela(36, 40, 6, 'c-sol', 'an-piscar')}${estrela(166, 112, 5, 'c-sol', 'an-piscar d2')}`,

  pulmoes: () => `
    <path class="an-fluir fraco" stroke-dasharray="4 10" d="M100 0V20"/>
    <g class="an-respirar">
      <path class="grosso" d="M100 18V56M100 56L90 66M100 56L110 66"/>
      <path class="c-suave" d="M88 48C66 38 42 60 40 94C38 120 56 132 76 126C86 123 90 112 90 102V62Z"/>
      <path class="c-suave" d="M112 48C134 38 158 60 160 94C162 120 144 132 124 126C114 123 110 112 110 102V62Z"/>
      <path class="fino fraco" d="M66 70C62 82 64 96 70 106M134 70C138 82 136 96 130 106"/>
    </g>`,

  'germes-pulmoes': () => `
    <g class="an-respirar">
      <path class="grosso" d="M100 14V52M100 52L90 62M100 52L110 62"/>
      <path class="c-coral-s" d="M88 44C66 34 42 56 40 90C38 116 56 128 76 122C86 119 90 108 90 98V58Z"/>
      <path class="c-coral-s" d="M112 44C134 34 158 56 160 90C162 116 144 128 124 122C114 119 110 108 110 98V58Z"/>
    </g>
    <g class="an-flutuar">${germe(66, 86, 9)}</g>
    <g class="an-flutuar d2">${germe(132, 96, 8, 'c-sol')}</g>
    <g class="an-flutuar d1">${germe(176, 34, 7, 'c-verde')}</g>
    <g class="an-flutuar d3">${germe(26, 30, 6)}</g>`,

  tosse: () => {
    const p = pessoa(72, 26, { humor: 'doente', bracos: 'nenhum', cor: 'c-suave' });
    const [ox, oy] = p.ombroD;
    return `${p.svg}
      <path d="M${n(p.ombroE[0])} ${n(p.ombroE[1])}l-7 24"/>${p.mao(p.ombroE[0] - 7, p.ombroE[1] + 24)}
      <path d="M${n(ox)} ${n(oy)}Q${n(ox + 12)} ${n(oy - 4)} 84 ${n(p.cy + 8)}"/>${p.mao(84, p.cy + 8)}
      <g class="c-azul-s">
        <circle class="an-espalhar" cx="98" cy="${n(p.cy + 2)}" r="4"/>
        <circle class="an-espalhar d1" cx="98" cy="${n(p.cy + 10)}" r="3"/>
        <circle class="an-espalhar d2" cx="96" cy="${n(p.cy - 6)}" r="3.5"/>
        <circle class="an-espalhar d3" cx="98" cy="${n(p.cy + 16)}" r="2.5"/>
      </g>
      <path class="an-piscar fino fraco" d="M112 30l8 -6M114 40h10M112 50l8 6"/>`;
  },

  cotovelo: () => {
    const p = pessoa(92, 26, { humor: 'feliz', bracos: 'nenhum', cor: 'c-cor', pele: 'c-pele2' });
    const [ox, oy] = p.ombroD;
    const manga = `M${n(ox)} ${n(oy)}L${n(ox + 6)} ${n(p.cy + 16)}L${n(p.ombroE[0] - 2)} ${n(p.cy + 9)}`;
    return `${p.svg}
      <path d="M${n(p.ombroE[0])} ${n(p.ombroE[1])}l-7 24"/>${p.mao(p.ombroE[0] - 7, p.ombroE[1] + 24)}
      <path style="stroke-width:11" d="${manga}"/>
      <path class="t-cor" style="stroke-width:6" d="${manga}"/>
      <g class="an-pulsar"><circle class="c-verde" cx="150" cy="40" r="15"/><path class="t-branco grosso" d="M143 40l5 5 9 -10"/></g>
      ${estrela(150, 92, 6, 'c-sol', 'an-piscar')}${estrela(36, 50, 5, 'c-sol', 'an-piscar d2')}`;
  },

  termometro: () => `
    <path class="an-subir fino c-nada" d="M54 98q-6 -8 0 -16t0 -16"/>
    <path class="an-subir d2 fino c-nada" d="M146 98q-6 -8 0 -16t0 -16"/>
    <rect class="c-branco" x="86" y="12" width="28" height="100" rx="14"/>
    <g class="an-mercurio rv" style="transform-origin:100px 118px"><rect class="c-coral sem" x="94" y="30" width="12" height="88" rx="6"/></g>
    <circle class="c-coral" cx="100" cy="120" r="20"/>
    <path class="fino" d="M114 32h8M114 48h5M114 64h8M114 80h5M114 96h8"/>
    <g class="an-cair d1"><path class="c-azul-s" d="M150 40c0 0 -6 8 -6 12a6 6 0 0 0 12 0c0 -4 -6 -12 -6 -12Z"/></g>`,

  'lavar-maos': () => `
    <path class="grosso" d="M40 14H96Q108 14 108 26V32"/>
    <rect class="c-cor" x="56" y="8" width="16" height="10" rx="3"/>
    <path class="c-azul sem an-cair" d="M108 38c0 0 -4 6 -4 9a4 4 0 0 0 8 0c0 -3 -4 -9 -4 -9Z"/>
    <path class="c-azul sem an-cair d2" d="M108 38c0 0 -4 6 -4 9a4 4 0 0 0 8 0c0 -3 -4 -9 -4 -9Z"/>
    <rect class="c-cor" x="74" y="122" width="24" height="28" rx="4"/>
    <rect class="c-coral" x="102" y="122" width="24" height="28" rx="4"/>
    <g class="an-esfregar-v">
      <path class="c-pele" d="M76 124V86Q76 70 88 70Q100 70 100 86V124Z"/>
      <path class="c-pele" d="M77 106Q64 104 64 94Q64 86 72 88L77 92"/>
    </g>
    <g class="an-esfregar-v inv">
      <path class="c-pele2" d="M100 124V86Q100 70 112 70Q124 70 124 86V124Z"/>
      <path class="c-pele2" d="M123 106Q136 104 136 94Q136 86 128 88L123 92"/>
    </g>
    <circle class="c-branco an-subir" cx="58" cy="84" r="7"/>
    <circle class="c-branco an-subir d1" cx="146" cy="78" r="9"/>
    <circle class="c-branco an-subir d2" cx="140" cy="116" r="6"/>
    <circle class="c-branco an-subir d3" cx="56" cy="114" r="5"/>
    <circle class="c-branco an-subir d4" cx="100" cy="64" r="4"/>`,

  vacina: () => `
    <g class="an-pulsar">
      <path class="c-suave" d="M100 20L142 34V68C142 98 124 116 100 128C76 116 58 98 58 68V34Z"/>
      <path class="t-cor muito-grosso" d="M80 72L95 87L122 56"/>
    </g>
    <g class="an-flutuar d2"><g transform="rotate(-40 40 54)">
      <rect class="c-branco" x="18" y="47" width="44" height="14" rx="3"/>
      <rect class="c-azul sem" x="22" y="50" width="22" height="8" rx="2"/>
      <path d="M62 54H80M18 54H10M10 46V62"/>
    </g></g>
    ${estrela(166, 34, 8, 'c-sol', 'an-piscar')}${estrela(160, 112, 6, 'c-sol', 'an-piscar d2')}${estrela(30, 112, 5, 'c-sol', 'an-piscar d1')}`,

  caneta: () => `
    <g class="an-flutuar"><g transform="rotate(-18 100 75)">
      <rect class="c-branco" x="34" y="64" width="112" height="22" rx="9"/>
      <rect class="c-suave" x="72" y="69" width="26" height="12" rx="3"/>
      <rect class="c-cor" x="146" y="62" width="20" height="26" rx="6"/>
      <path class="fino" d="M152 62v26M158 62v26"/>
      <path d="M34 75H20"/>
      <path class="c-azul sem an-gotejar" d="M14 70c0 0 -4 5 -4 8a4 4 0 0 0 8 0c0 -3 -4 -8 -4 -8Z"/>
    </g></g>
    ${estrela(150, 28, 7, 'c-sol', 'an-piscar')}${estrela(44, 120, 5, 'c-sol', 'an-piscar d2')}`,

  comprimido: () => `
    <g class="an-flutuar"><g transform="rotate(-30 76 72)">
      <path class="c-coral" d="M46 60H76V84H46A12 12 0 0 1 46 60Z"/>
      <path class="c-branco" d="M76 60H106A12 12 0 0 1 106 84H76Z"/>
    </g></g>
    <path class="c-azul-s" d="M120 76L126 136H158L164 76Z"/>
    <path class="fraco fino" d="M122 92H162"/>
    <circle class="c-branco" cx="156" cy="38" r="22"/>
    <path class="fino" d="M156 38V26"/>
    <g class="an-girar rv" style="transform-origin:156px 38px"><path class="t-coral" d="M156 38L170 38"/></g>
    <circle class="c-tinta sem" cx="156" cy="38" r="2.5"/>`,

  agua: () => `
    <path class="c-azul sem an-cair" d="M100 6c0 0 -6 8 -6 12a6 6 0 0 0 12 0c0 -4 -6 -12 -6 -12Z"/>
    <g class="an-nivel rv" style="transform-origin:100px 128px"><path class="c-azul-s sem" d="M73 62L78 128H122L127 62Z"/></g>
    <path d="M70 34L78 130H122L130 34"/>
    <circle class="c-branco an-subir" cx="92" cy="116" r="3"/>
    <circle class="c-branco an-subir d1" cx="108" cy="120" r="2.5"/>
    <circle class="c-branco an-subir d2" cx="100" cy="112" r="2"/>
    ${estrela(154, 40, 7, 'c-sol', 'an-piscar')}${estrela(44, 100, 5, 'c-sol', 'an-piscar d2')}`,

  prato: () => `
    <path class="fino" d="M26 40V124M20 40V56Q20 64 26 64Q32 64 32 56V40"/>
    <path class="fino" d="M174 124V40Q184 52 182 76H174"/>
    <circle class="c-branco" cx="100" cy="84" r="52"/>
    <circle class="fraco fino" cx="100" cy="84" r="42"/>
    <circle class="c-verde" cx="78" cy="72" r="12"/><circle class="c-verde" cx="92" cy="62" r="10"/><circle class="c-verde" cx="76" cy="94" r="10"/>
    <path class="c-laranja" d="M90 108L108 82L114 88Z"/>
    <path class="c-coral-s" d="M112 94C120 84 136 86 142 94C136 102 120 104 112 94ZM142 94L150 88V100Z"/>
    <ellipse class="c-sol-s" cx="122" cy="66" rx="16" ry="10"/>
    <g class="an-saltar"><circle class="c-coral" cx="160" cy="26" r="12"/><path class="c-verde" d="M160 14Q166 6 172 10Q166 16 160 14Z"/></g>`,

  correr: () => `
    <path class="an-fluir fraco" stroke-dasharray="12 10" d="M14 60H62M6 82H58M20 104H64"/>
    <path class="fraco" d="M40 132H180"/>
    <g class="an-saltar">
      <path d="M102 92L92 112L76 114"/>
      <path d="M114 92L130 106L126 126"/>
      <path class="c-cor" d="M104 56Q114 50 122 54L118 92Q108 96 98 92Z"/>
      <path d="M106 62L90 74L84 66"/>
      <path d="M120 60L132 76L146 70"/>
      ${cabeca(120, 38, 13, { pele: 'c-pele2' })}
    </g>`,

  sono: () => `
    <g class="an-embalar">
      <path class="c-sol" d="M139.3 51A46 46 0 1 0 101.4 121A40 40 0 1 1 139.3 51Z"/>
      <g class="fino"><path d="M58 68q5 4 10 0"/><path d="M62 88q6 5 12 0"/></g>
      <circle class="c-bochecha sem" cx="62" cy="79" r="4"/>
    </g>
    <text class="il-z an-z" x="150" y="78">z</text>
    <text class="il-z an-z d1" x="164" y="58">z</text>
    <text class="il-z an-z d2" x="178" y="38">z</text>
    ${estrela(30, 30, 6, 'c-sol', 'an-piscar')}${estrela(160, 120, 5, 'c-sol', 'an-piscar d2')}${estrela(36, 130, 4, 'c-sol', 'an-piscar d1')}`,

  cama: () => `
    <path class="grosso" d="M20 128V64M20 108H180V128M180 108V86"/>
    <rect class="c-branco" x="20" y="90" width="160" height="18" rx="4"/>
    <ellipse class="c-branco" cx="50" cy="84" rx="22" ry="10"/>
    ${cabeca(54, 72, 14, { humor: 'dormir', pele: 'c-pele2' })}
    <g class="an-respirar"><path class="c-suave" d="M66 98Q66 72 96 74H170Q180 74 180 86V100H66Z"/></g>
    <text class="il-z an-z" x="80" y="40">z</text>
    <text class="il-z an-z d1" x="94" y="26">z</text>
    <text class="il-z an-z d2" x="108" y="14">z</text>`,

  medico: () => {
    const p = pessoa(96, 18, { cor: 'c-branco', bracos: 'acenar', pele: 'c-pele2', alt: 44 });
    return `${p.svg}
      <path class="fino" d="M87 ${n(p.t + 1)}Q88 ${n(p.t + 24)} 96 ${n(p.t + 26)}Q104 ${n(p.t + 24)} 105 ${n(p.t + 1)}"/>
      <circle class="c-cor" cx="96" cy="${n(p.t + 28)}" r="4"/>
      <path class="t-coral grosso" d="M104 ${n(p.t + 18)}h8M108 ${n(p.t + 14)}v8"/>
      <g class="an-flutuar">${coracaoPeq(156, 40, 10)}</g>
      ${estrela(40, 34, 6, 'c-sol', 'an-piscar')}`;
  },

  abraco: () => {
    const a = pessoa(80, 34, { cor: 'c-cor', bracos: 'nenhum' });
    const b = pessoa(120, 40, { cor: 'c-coral', bracos: 'nenhum', pele: 'c-pele2', r: 13, alt: 32 });
    return `${b.svg}${a.svg}
      <path d="M${n(a.ombroD[0])} ${n(a.ombroD[1])}Q112 ${n(a.t + 18)} 132 ${n(b.t + 12)}"/>
      <path d="M${n(b.ombroE[0])} ${n(b.ombroE[1])}Q92 ${n(b.t + 22)} 70 ${n(a.t + 18)}"/>
      <g class="an-bater">${coracaoPeq(100, 18, 10)}</g>
      ${estrela(40, 30, 6, 'c-sol', 'an-piscar')}${estrela(164, 26, 5, 'c-sol', 'an-piscar d2')}`;
  },

  conversa: () => {
    const a = pessoa(52, 60, { cor: 'c-cor', r: 14, alt: 32 });
    const b = pessoa(148, 60, { cor: 'c-sol', pele: 'c-pele2', r: 14, alt: 32, oculos: true, cabelo: 'c-cabelo-b' });
    return `${a.svg}${b.svg}
      <g class="an-piscar-lento">
        <path class="c-branco" d="M30 8H96Q104 8 104 16V34Q104 42 96 42H64L54 52V42H30Q22 42 22 34V16Q22 8 30 8Z"/>
        <circle class="c-tinta sem" cx="48" cy="25" r="3"/><circle class="c-tinta sem" cx="63" cy="25" r="3"/><circle class="c-tinta sem" cx="78" cy="25" r="3"/>
      </g>
      <g class="an-piscar-lento d2">
        <path class="c-suave" d="M104 20H170Q178 20 178 28V44Q178 52 170 52H146V62L136 52H104Q96 52 96 44V28Q96 20 104 20Z"/>
        ${coracaoPeq(137, 36, 8)}
      </g>`;
  },

  telefone: () => `
    <rect class="c-branco" x="74" y="16" width="52" height="104" rx="10"/>
    <rect class="c-suave" x="80" y="28" width="40" height="72" rx="4"/>
    <path class="fino" d="M94 110h12"/>
    <g class="an-bater">${coracaoPeq(100, 56, 12)}</g>
    <text class="il-txt" x="100" y="90">24</text>
    <path class="an-pulsar-onda" d="M62 50Q52 68 62 86"/><path class="an-pulsar-onda d1" d="M48 40Q32 68 48 96"/>
    <path class="an-pulsar-onda" d="M138 50Q148 68 138 86"/><path class="an-pulsar-onda d1" d="M152 40Q168 68 152 96"/>`,

  'nuvem-sol': () => `
    <g class="an-girar rv" style="transform-origin:132px 50px">
      <path class="t-sol grosso" d="M132 14V22M132 78V86M96 50H104M160 50H168M107 25L112 30M152 70L157 75M107 75L112 70M152 30L157 25"/>
    </g>
    <circle class="c-sol" cx="132" cy="50" r="20"/>
    ${cara(136, 46, 16)}
    <g class="an-flutuar-x">
      <path class="c-nuvem" d="M34 100H114A20 20 0 0 0 110 61A28 28 0 0 0 58 56A20 20 0 0 0 34 100Z"/>
      ${cara(74, 80, 14, 'neutro')}
    </g>
    <g class="c-azul sem">
      <path class="an-cair" d="M50 108c0 0 -4 6 -4 9a4 4 0 0 0 8 0c0 -3 -4 -9 -4 -9Z"/>
      <path class="an-cair d1" d="M74 110c0 0 -4 6 -4 9a4 4 0 0 0 8 0c0 -3 -4 -9 -4 -9Z"/>
      <path class="an-cair d2" d="M98 108c0 0 -4 6 -4 9a4 4 0 0 0 8 0c0 -3 -4 -9 -4 -9Z"/>
    </g>
    <g class="an-piscar-lento d2 fino">
      <path class="t-coral" d="M140 140A34 34 0 0 1 200 124"/>
      <path class="t-sol" d="M146 142A28 28 0 0 1 196 130"/>
      <path class="t-azul" d="M152 144A22 22 0 0 1 192 136"/>
    </g>`,

  sal: () => `
    <g transform="rotate(-28 92 80)">
      <path class="c-branco" d="M70 62Q70 46 92 46Q114 46 114 62V122Q114 128 108 128H76Q70 128 70 122Z"/>
      <path class="c-cor" d="M74 46Q74 30 92 30Q110 30 110 46Z"/>
      <circle class="c-tinta sem" cx="86" cy="38" r="1.6"/><circle class="c-tinta sem" cx="94" cy="36" r="1.6"/><circle class="c-tinta sem" cx="100" cy="40" r="1.6"/>
      <path class="fino fraco" d="M76 88H108"/>
    </g>
    <g class="c-branco fino">
      <rect class="an-cair" x="60" y="40" width="5" height="5"/>
      <rect class="an-cair d1" x="52" y="46" width="4" height="4"/>
      <rect class="an-cair d2" x="64" y="50" width="4" height="4"/>
      <rect class="an-cair d3" x="56" y="38" width="5" height="5"/>
    </g>
    <path class="fraco" d="M30 136H170"/>
    ${menos(156, 36)}`,

  tensiometro: () => `
    <path class="c-pele" d="M0 92H120Q134 92 134 106Q134 120 120 120H0Z"/>
    <rect class="c-cor" x="34" y="84" width="54" height="44" rx="8"/>
    <path class="fino fraco" d="M44 92V120M78 92V120"/>
    <path d="M62 84Q66 56 118 54"/>
    <circle class="c-branco" cx="146" cy="52" r="30"/>
    <path class="t-verde grosso" d="M124 52A22 22 0 0 1 135 33"/>
    <path class="t-sol grosso" d="M135 33A22 22 0 0 1 157 33"/>
    <path class="t-coral grosso" d="M157 33A22 22 0 0 1 168 52"/>
    <g class="an-ponteiro rv" style="transform-origin:146px 52px"><path class="grosso" d="M146 52V32"/></g>
    <circle class="c-tinta sem" cx="146" cy="52" r="4"/>
    <text class="il-txt" x="146" y="72">mmHg</text>`,

  arteria: () =>
    vaso(
      globulo('') + globulo('d1') + globulo('d2') + globulo('d3') +
        '<g class="an-deslizar d4"><circle class="c-sol" cx="100" cy="74" r="5"/></g>' +
        '<g class="an-deslizar d5"><circle class="c-sol" cx="100" cy="84" r="4"/></g>',
      '<path class="c-sol" d="M78 48Q104 74 130 48Z"/><path class="c-sol" d="M88 108Q112 88 138 108Z"/><circle class="c-sol-s sem" cx="100" cy="56" r="3"/><circle class="c-sol-s sem" cx="114" cy="100" r="3"/>'
    ),

  'acucar-sangue': () =>
    vaso(
      globulo('') + globulo('d2', 86) + globulo('d4', 70) +
        '<g class="an-deslizar d1"><rect class="c-branco" x="94" y="66" width="12" height="12" rx="2"/></g>' +
        '<g class="an-deslizar d3"><rect class="c-branco" x="94" y="82" width="11" height="11" rx="2"/></g>' +
        '<g class="an-deslizar d5"><rect class="c-branco" x="94" y="72" width="10" height="10" rx="2"/></g>'
    ),

  batatas: () => `
    <g class="an-flutuar">
      <g class="c-sol"><rect x="78" y="36" width="9" height="48" rx="3"/><rect x="92" y="28" width="9" height="56" rx="3"/><rect x="106" y="34" width="9" height="50" rx="3"/><rect x="118" y="42" width="9" height="42" rx="3"/></g>
      <path class="c-coral" d="M68 66L78 132H122L132 66Q100 78 68 66Z"/>
      <circle class="c-branco sem" cx="100" cy="102" r="10"/>
    </g>
    <path class="fraco" d="M40 136H160"/>
    ${menos(156, 40)}`,

  analise: () => `
    <path class="c-azul sem an-cair" d="M100 2c0 0 -5 7 -5 10a5 5 0 0 0 10 0c0 -3 -5 -10 -5 -10Z"/>
    <path class="c-vermelho sem" d="M88 66V112A12 12 0 0 0 112 112V66Z"/>
    <path class="grosso" d="M86 24V112A14 14 0 0 0 114 112V24M80 24H120"/>
    <rect class="c-branco" x="86" y="40" width="28" height="18"/>
    <path class="fino" d="M92 46H108M92 52H102"/>
    <circle class="c-coral-s sem an-subir" cx="96" cy="108" r="3"/>
    <circle class="c-coral-s sem an-subir d2" cx="104" cy="112" r="2.5"/>
    <g class="an-flutuar d1">
      <rect class="c-branco" x="134" y="54" width="44" height="58" rx="6"/>
      <path class="fino t-cor" d="M142 100L152 86L160 92L170 70"/>
      <path class="fino fraco" d="M142 66H170M142 74H162"/>
    </g>`,

  joelho: () => `
    <path class="an-fluir fraco" stroke-dasharray="4 10" d="M150 128A50 50 0 0 0 158 92"/>
    <rect class="c-branco" x="16" y="46" width="88" height="24" rx="12"/>
    <circle class="c-branco" cx="104" cy="58" r="16"/>
    <g class="an-dobrar rv" style="transform-origin:104px 62px">
      <ellipse class="c-sol" cx="104" cy="78" rx="16" ry="5"/>
      <rect class="c-branco" x="94" y="84" width="20" height="54" rx="10"/>
      <ellipse class="c-branco" cx="104" cy="88" rx="17" ry="8"/>
    </g>
    ${estrela(60, 26, 6, 'c-sol', 'an-piscar')}${estrela(150, 34, 5, 'c-sol', 'an-piscar d2')}`,

  cartilagem: () => `
    <g>
      <path class="c-branco" d="M30 12H74V44Q74 56 52 56Q30 56 30 44Z"/>
      <ellipse class="c-sol an-respirar" cx="52" cy="64" rx="24" ry="7"/>
      <path class="c-branco" d="M30 138H74V86Q74 74 52 74Q30 74 30 86Z"/>
      ${cara(52, 108, 14)}
    </g>
    <g>
      <path class="c-branco" d="M126 12H170V44Q170 58 148 58Q126 58 126 44Z"/>
      <path class="c-sol" d="M128 64Q138 61 144 64L140 67Q132 67 128 64ZM152 63Q162 61 168 64Q160 67 154 66Z"/>
      <path class="c-branco" d="M126 138H170V84Q170 70 148 70Q126 70 126 84Z"/>
      <path class="c-branco" d="M126 52l-6 4 6 2M170 52l6 4 -6 2"/>
      ${cara(148, 108, 14, 'triste')}
      <path class="an-piscar t-coral grosso" d="M184 50l-8 10h8l-8 10"/>
    </g>`,

  bengala: () => {
    const p = pessoa(88, 22, { cor: 'c-coral-s', cabelo: 'c-cabelo-b', oculos: true, bracos: 'nenhum', alt: 42 });
    const [ox, oy] = p.ombroD;
    return `<path class="fraco" d="M30 128H170"/>
      <g class="an-passo">
        ${p.svg}
        <path d="M${n(p.ombroE[0])} ${n(p.ombroE[1])}l-6 26"/>${p.mao(p.ombroE[0] - 6, p.ombroE[1] + 26)}
        <path class="c-madeira-t muito-grosso" d="M${n(ox + 16)} ${n(oy + 22)}V126M${n(ox + 16)} ${n(oy + 22)}Q${n(ox + 16)} ${n(oy + 12)} ${n(ox + 6)} ${n(oy + 14)}"/>
        <path d="M${n(ox)} ${n(oy)}L${n(ox + 14)} ${n(oy + 20)}"/>${p.mao(ox + 15, oy + 21)}
      </g>
      ${estrela(150, 36, 6, 'c-sol', 'an-piscar')}`;
  },

  nadar: () => `
    <circle class="c-sol" cx="164" cy="28" r="14"/>
    ${cabeca(88, 84, 14, { pele: 'c-pele', cabelo: 'c-coral' })}
    <rect class="c-branco" x="77" y="76" width="22" height="6" rx="3"/>
    <g class="an-bracada rv" style="transform-origin:104px 96px"><path class="grosso" d="M104 96Q116 66 138 74"/><circle class="c-pele" cx="138" cy="74" r="5"/></g>
    <rect class="c-azul-s sem" x="0" y="96" width="200" height="54"/>
    <g class="an-ondular"><path class="t-azul grosso" d="M-40 96q15 -10 30 0t30 0t30 0t30 0t30 0t30 0t30 0t30 0"/></g>
    <g class="an-ondular inv"><path class="t-azul fino" d="M-40 118q15 -8 30 0t30 0t30 0t30 0t30 0t30 0t30 0t30 0"/></g>
    <circle class="c-branco an-subir" cx="60" cy="116" r="3"/><circle class="c-branco an-subir d2" cx="120" cy="124" r="2.5"/>`,

  calor: () => `
    <path class="c-pele sem" d="M0 100H100L136 150H96L76 120H0Z"/>
    <path d="M0 100H100L136 150M96 150L76 120H0"/>
    <g class="an-flutuar"><rect class="c-coral" x="62" y="80" width="56" height="34" rx="12"/>
      <path class="fino t-branco" d="M74 88v18M86 88v18M98 88v18M110 88v18"/></g>
    <path class="an-subir t-coral fino" d="M76 70q-6 -8 0 -16t0 -16"/>
    <path class="an-subir d1 t-coral fino" d="M92 66q-6 -8 0 -16t0 -16"/>
    <path class="an-subir d2 t-coral fino" d="M108 70q-6 -8 0 -16t0 -16"/>`,

  musculo: () => `
    <rect class="c-cor" x="8" y="80" width="28" height="44" rx="8"/>
    <path class="c-pele" d="M30 86H96Q116 86 116 104Q116 120 96 120H30Z"/>
    <path class="c-pele" d="M90 102L98 46H124L116 106Z"/>
    <circle class="c-pele" cx="111" cy="38" r="16"/>
    <path class="fino" d="M102 32h14M102 40h14"/>
    <g class="an-crescer rv" style="transform-origin:68px 88px"><path class="c-pele" d="M44 90Q66 50 92 90"/></g>
    ${estrela(60, 40, 7, 'c-sol', 'an-piscar')}${estrela(150, 70, 6, 'c-sol', 'an-piscar d2')}${estrela(40, 60, 4, 'c-sol', 'an-piscar d1')}`,

  halteres: () => {
    const p = pessoa(84, 22, { cor: 'c-cor', bracos: 'nenhum', pele: 'c-pele2', cabelo: 'c-cabelo-b', alt: 40 });
    const [ox, oy] = p.ombroD;
    const ex = ox + 6;
    const ey = oy + 22;
    return `${p.svg}
      <path d="M${n(p.ombroE[0])} ${n(p.ombroE[1])}l-7 24"/>${p.mao(p.ombroE[0] - 7, p.ombroE[1] + 24)}
      <path d="M${n(ox)} ${n(oy)}L${n(ex)} ${n(ey)}"/>
      <g class="an-levantar rv" style="transform-origin:${n(ex)}px ${n(ey)}px">
        <path d="M${n(ex)} ${n(ey)}H${n(ex + 26)}"/>
        <path class="t-coral muito-grosso" d="M${n(ex + 28)} ${n(ey - 12)}V${n(ey + 12)}"/>
        <rect class="c-coral" x="${n(ex + 22)}" y="${n(ey - 14)}" width="7" height="28" rx="3"/>
        <rect class="c-coral" x="${n(ex + 33)}" y="${n(ey - 14)}" width="7" height="28" rx="3"/>
        ${p.mao(ex + 28, ey)}
      </g>
      ${estrela(160, 30, 6, 'c-sol', 'an-piscar')}`;
  },

  'cadeira-rodas': () => `
    <path class="fraco" d="M20 142H180"/>
    <path class="grosso" d="M66 54V98H140M66 54L60 50M140 98L148 132"/>
    <path class="c-azul-s" d="M86 86H136V100H86Z"/>
    <path class="c-azul-s" d="M122 98H136V128H122Z"/>
    <path class="c-cor" d="M76 92V64Q76 52 92 52Q108 52 108 64V92Z"/>
    ${cabeca(92, 36, 14, { pele: 'c-pele2' })}
    <g class="an-acenar rv" style="transform-origin:106px 62px"><path d="M106 62L122 44"/><circle class="c-pele2" cx="122" cy="44" r="4"/></g>
    <circle class="grosso" cx="90" cy="112" r="28"/>
    <g class="an-girar rv" style="transform-origin:90px 112px"><path class="fino" d="M90 86V138M64 112H116M72 94L108 130M108 94L72 130"/></g>
    <circle class="c-tinta sem" cx="90" cy="112" r="4"/>
    <circle class="c-branco" cx="148" cy="134" r="7"/>
    ${estrela(160, 40, 6, 'c-sol', 'an-piscar')}`,

  nervo: () => `
    <path class="c-coral-s" d="M26 62C18 44 36 28 50 36C56 24 78 26 80 40C92 44 90 64 78 68C76 80 58 84 50 76C40 82 22 76 26 62Z"/>
    <path class="fino" d="M42 50Q50 46 54 54M58 40Q66 44 64 54M64 62Q72 60 74 66M40 64Q46 70 52 64"/>
    ${cara(54, 58, 16)}
    <path class="grosso fraco" d="M76 72C108 72 104 116 140 106"/>
    <path class="an-impulso t-sol muito-grosso" stroke-dasharray="8 22" d="M76 72C108 72 104 116 140 106"/>
    <g class="an-pulsar d2">
      <ellipse class="c-coral" cx="160" cy="104" rx="28" ry="16"/>
      <path class="fino t-branco" d="M144 100Q160 96 176 100M142 108Q160 112 178 108"/>
    </g>`,

  celulas: () => `
    ${[
      [44, 46], [76, 34], [108, 46], [40, 82], [72, 70], [104, 82], [60, 110], [92, 116],
    ]
      .map(([x, y]) => `<circle class="c-suave" cx="${x}" cy="${y}" r="15"/><circle class="c-cor sem" cx="${x + 2}" cy="${y - 1}" r="5"/>`)
      .join('')}
    <g class="an-crescer"><circle class="c-coral-s" cx="140" cy="76" r="17"/><circle class="c-coral sem" cx="142" cy="74" r="6"/></g>
    <g class="an-crescer d1"><circle class="c-coral-s" cx="164" cy="102" r="15"/><circle class="c-coral sem" cx="166" cy="101" r="5"/></g>
    <g class="an-crescer d2"><circle class="c-coral-s" cx="132" cy="112" r="13"/><circle class="c-coral sem" cx="133" cy="111" r="4.5"/></g>
    <g class="an-crescer d3"><circle class="c-coral-s" cx="166" cy="56" r="11"/><circle class="c-coral sem" cx="167" cy="55" r="4"/></g>`,

  fita: () => `
    <g class="an-balancar rv" style="transform-origin:100px 20px">
      <path class="c-rosa" d="M100 78L70 130L86 134L108 90Z"/>
      <path class="c-rosa" d="M100 78L130 130L114 134L92 90Z"/>
      <path class="c-rosa" fill-rule="evenodd" d="M100 80C84 64 76 48 78 36C80 22 90 16 100 16C110 16 120 22 122 36C124 48 116 64 100 80ZM100 62C93 52 90 44 91 38C92 31 96 28 100 28C104 28 108 31 109 38C110 44 107 52 100 62Z"/>
    </g>
    ${estrela(40, 40, 8, 'c-sol', 'an-piscar')}${estrela(160, 54, 7, 'c-sol', 'an-piscar d1')}${estrela(150, 120, 5, 'c-sol', 'an-piscar d2')}${estrela(50, 112, 5, 'c-sol', 'an-piscar d3')}`,

  cabelo: () => `
    <circle class="c-pele" cx="100" cy="84" r="36"/>
    ${cara(100, 90, 32)}
    <g class="t-cabelo grosso">
      <path class="an-brotar" d="M82 54q-4 -8 0 -16"/>
      <path class="an-brotar d1" d="M91 50q-2 -9 2 -16"/>
      <path class="an-brotar d2" d="M100 48q0 -9 4 -16"/>
      <path class="an-brotar d3" d="M109 50q2 -9 6 -14"/>
      <path class="an-brotar d4" d="M118 54q4 -8 8 -12"/>
    </g>
    <g class="an-flutuar"><path class="c-verde" d="M164 126V100M164 110Q150 104 148 92Q160 92 164 104M164 104Q176 96 182 86Q182 102 164 110"/></g>
    <circle class="c-sol" cx="34" cy="34" r="12"/>`,

  mamografia: () => `
    <rect class="c-branco" x="128" y="10" width="28" height="132" rx="8"/>
    <rect class="c-suave" x="134" y="20" width="16" height="22" rx="3"/>
    <path class="fino t-cor" d="M137 31l4 4 6 -8"/>
    <rect class="c-branco" x="58" y="14" width="72" height="20" rx="6"/>
    <path class="an-fluir fino fraco" stroke-dasharray="4 10" d="M76 36V56M94 36V56M112 36V56"/>
    <g class="an-apertar"><rect class="c-suave" x="52" y="58" width="78" height="9" rx="3"/></g>
    <rect class="c-cor" x="52" y="92" width="78" height="12" rx="3"/>
    <path class="fino" d="M128 98H140"/>
    <g class="an-pulsar d2"><circle class="c-rosa" cx="40" cy="120" r="14"/><path class="t-branco grosso" d="M33 120l5 5 9 -10"/></g>`,

  autoexame: () => `
    <circle class="c-pele" cx="100" cy="30" r="18"/>
    ${cara(100, 32, 16)}
    <path class="c-cabelo" d="M82 30A18 18 0 0 1 118 30Q108 18 92 20Q84 22 82 30Z"/>
    <path class="c-suave" d="M48 150V100Q48 70 76 64L90 60H110L124 64Q152 70 152 100V150Z"/>
    <path class="fino fraco" d="M66 102q14 12 28 0M106 102q14 12 28 0"/>
    <circle class="fino fraco" cx="80" cy="96" r="16" stroke-dasharray="3 5"/>
    <g class="an-girar-lento rv" style="transform-origin:80px 96px"><circle class="c-pele2" cx="80" cy="80" r="7"/></g>
    ${estrela(170, 40, 6, 'c-sol', 'an-piscar')}`,

  'chave-celula': () => `
    <circle class="c-suave" cx="140" cy="76" r="48"/>
    <circle class="c-cor sem" cx="152" cy="70" r="12"/>
    <rect class="c-cor" x="86" y="60" width="16" height="32" rx="3"/>
    <circle class="c-tinta sem" cx="94" cy="72" r="3"/><path class="fino" d="M94 74v8"/>
    <g class="an-chave">
      <circle class="c-sol" cx="22" cy="76" r="12"/><circle class="c-suave sem" cx="22" cy="76" r="4"/>
      <path class="t-sol muito-grosso" d="M34 76H74M64 76v9M72 76v7"/>
    </g>
    <g class="c-branco fino">
      <rect class="an-entrar" x="52" y="40" width="11" height="11" rx="2"/>
      <rect class="an-entrar d1" x="46" y="102" width="10" height="10" rx="2"/>
      <rect class="an-entrar d2" x="60" y="118" width="9" height="9" rx="2"/>
    </g>
    ${cara(140, 100, 14)}`,

  glucometro: () => `
    <path class="c-pele" d="M0 62H54Q68 62 68 74Q68 86 54 86H0Z"/>
    <path class="fino" d="M50 64Q60 66 60 74"/>
    <g class="an-gotejar"><path class="c-vermelho" d="M72 72c0 0 -5 7 -5 10a5 5 0 0 0 10 0c0 -3 -5 -10 -5 -10Z"/></g>
    <rect class="c-sol" x="76" y="96" width="30" height="9" rx="2"/>
    <rect class="c-branco" x="104" y="30" width="66" height="96" rx="14"/>
    <rect class="c-suave" x="114" y="42" width="46" height="34" rx="5"/>
    <text class="il-num an-piscar-lento" x="137" y="66">98</text>
    <circle class="c-cor" cx="126" cy="98" r="7"/><circle class="c-cor" cx="148" cy="98" r="7"/>`,

  pes: () => `${desenharPes()}
    <g class="an-lupa"><circle class="c-vidro grosso" cx="100" cy="86" r="22"/><path class="muito-grosso" d="M116 102L134 120"/></g>`,

  cigarro: () => `
    <path class="an-subir fino fraco" d="M150 64q-6 -8 0 -16t0 -16"/>
    <path class="an-subir d2 fino fraco" d="M160 60q-6 -8 0 -16t0 -16"/>
    <rect class="c-branco" x="40" y="70" width="104" height="16" rx="3"/>
    <rect class="c-laranja" x="40" y="70" width="26" height="16" rx="3"/>
    <rect class="c-coral an-piscar" x="140" y="70" width="8" height="16" rx="2"/>
    <g class="an-pulsar"><circle class="t-coral muito-grosso" cx="96" cy="78" r="58"/><path class="t-coral muito-grosso" d="M55 37L137 119"/></g>`,

  brincar: () => {
    const a = pessoa(64, 30, { cor: 'c-cor', r: 14, alt: 32, bracos: 'nenhum' });
    const b = pessoa(136, 30, { cor: 'c-sol', pele: 'c-pele2', r: 14, alt: 32, bracos: 'nenhum', cabelo: 'c-coral' });
    return `<path class="fraco" d="M24 134H176"/>
      <g class="an-saltar">${a.svg}<path d="M${n(a.ombroE[0])} ${n(a.ombroE[1])}l-12 -20"/>${a.mao(a.ombroE[0] - 12, a.ombroE[1] - 20)}<path d="M${n(a.ombroD[0])} ${n(a.ombroD[1])}L98 ${n(a.ombroD[1] + 14)}"/></g>
      <g class="an-saltar d2">${b.svg}<path d="M${n(b.ombroD[0])} ${n(b.ombroD[1])}l12 -20"/>${b.mao(b.ombroD[0] + 12, b.ombroD[1] - 20)}<path d="M${n(b.ombroE[0])} ${n(b.ombroE[1])}L102 ${n(b.ombroE[1] + 14)}"/></g>
      <circle class="c-pele" cx="100" cy="${n(a.ombroD[1] + 14)}" r="5"/>
      <g class="an-flutuar">${coracaoPeq(100, 22, 9)}</g>`;
  },

  balanca: () => `
    <rect class="c-branco" x="46" y="64" width="108" height="68" rx="16"/>
    <path class="c-suave" d="M76 96A24 24 0 0 1 124 96Z"/>
    <path class="fino" d="M80 92l4 2M100 74v4M120 92l-4 2"/>
    <g class="an-ponteiro rv" style="transform-origin:100px 96px"><path class="t-coral grosso" d="M100 96V78"/></g>
    <circle class="c-tinta sem" cx="100" cy="96" r="3"/>
    <path class="c-suave" d="M62 108h30v14h-30zM108 108h30v14h-30z"/>
    <g class="an-flutuar"><path class="t-verde muito-grosso" d="M100 18V48M88 36L100 48L112 36"/></g>`,

  // ---------- AVC ----------
  cerebro: () => `
    <path class="an-pulsar-onda t-cor" d="M30 92Q18 76 30 60"/>
    <path class="an-pulsar-onda d2 t-cor" d="M170 92Q182 76 170 60"/>
    <g class="an-pulsar-lento">
      <path class="c-coral-s" d="${CEREBRO}"/>
      <path class="fino fraco" d="${CEREBRO_SULCOS}"/>
      ${cara(100, 76, 20)}
    </g>
    ${estrela(30, 30, 7, 'c-sol', 'an-piscar')}${estrela(172, 28, 6, 'c-sol', 'an-piscar d2')}${estrela(170, 128, 5, 'c-sol', 'an-piscar d1')}`,

  'cerebro-avc': () => `
    <path class="c-coral-s" d="${CEREBRO}"/>
    <path class="fino fraco" d="${CEREBRO_SULCOS}"/>
    <g class="an-piscar-lento"><ellipse class="c-zona" cx="134" cy="64" rx="24" ry="20"/></g>
    <path class="t-vermelho grosso" d="M100 150V112M100 112Q86 100 70 96M100 112V88M100 112Q112 102 120 88Q128 76 140 70"/>
    <g class="an-pulsar"><circle class="c-vermelho-e" cx="120" cy="88" r="7"/></g>
    <g class="an-pulsar d2"><circle class="c-sol" cx="170" cy="28" r="14"/><text class="il-num" x="170" y="36">!</text></g>`,

  'cara-torta': () => `
    <circle class="c-pele" cx="100" cy="74" r="46"/>
    <path class="c-cabelo-b" d="M54 74A46 46 0 0 1 146 74Q122 42 94 48Q68 52 54 74Z"/>
    <circle class="c-tinta sem" cx="84" cy="72" r="3.5"/><circle class="c-tinta sem" cx="116" cy="72" r="3.5"/>
    <g class="fino"><circle cx="84" cy="72" r="11"/><circle cx="116" cy="72" r="11"/><path d="M95 72h10"/></g>
    <g class="an-troca"><path class="grosso" d="M80 96q20 16 40 0"/></g>
    <g class="an-troca inv"><path class="grosso" d="M80 96q12 8 24 6q10 -2 16 12"/><path class="grosso" d="M107 67q9 5 18 0"/></g>
    <g class="an-troca inv"><path class="t-coral grosso" d="M160 124L128 112M128 112l5.7 6.9M128 112l8.9 -1.5"/></g>`,

  'braco-cai': () => {
    const p = pessoa(100, 34, { bracos: 'nenhum', humor: 'neutro', cabelo: 'c-cabelo-b', oculos: true, cor: 'c-coral-s', alt: 40 });
    const braco = (o, dx, dy) => `<path d="M${n(o[0])} ${n(o[1])}l${dx} ${dy}"/>${p.mao(o[0] + dx, o[1] + dy)}`;
    const [ox, oy] = p.ombroD;
    return `${p.svg}${braco(p.ombroE, -28, -4)}
      <path class="fino fraco" stroke-dasharray="3 5" d="M${n(ox + 28)} ${n(oy - 4)}Q${n(ox + 34)} ${n(oy + 16)} ${n(ox + 18)} ${n(oy + 22)}"/>
      <g class="an-descair rv" style="transform-origin:${n(ox)}px ${n(oy)}px">${braco(p.ombroD, 28, -4)}</g>
      <g class="an-pulsar d2"><circle class="c-sol" cx="170" cy="30" r="14"/><text class="il-num" x="170" y="38">!</text></g>`;
  },

  fala: () => `
    ${cabeca(54, 88, 30, { humor: 'neutro', cabelo: 'c-cabelo-b', oculos: true })}
    <path class="c-branco" d="M100 18H180Q190 18 190 28V74Q190 84 180 84H118L92 98L104 84H100Q90 84 90 74V28Q90 18 100 18Z"/>
    <g class="an-tremer"><path class="t-coral grosso" d="M104 40q5 -8 10 0t10 0t10 0"/></g>
    <g class="an-tremer d1"><path class="t-cor grosso" d="M144 40h12M162 40h14"/></g>
    <g class="an-tremer d2"><path class="t-sol grosso" d="M104 60h18M130 60q5 -8 10 0t10 0"/></g>
    <text class="il-num an-piscar" x="174" y="70">?</text>`,

  'ligar-112': () => `
    <rect class="c-branco" x="72" y="14" width="56" height="112" rx="11"/>
    <rect class="c-coral-s" x="78" y="26" width="44" height="80" rx="5"/>
    <path class="fino" d="M94 116h12"/>
    <g class="an-bater"><path class="t-coral" style="stroke-width:7" d="M91 40q-4 10 4 18q8 8 18 4"/></g>
    <text class="il-num txt-coral" x="100" y="98">112</text>
    <path class="an-pulsar-onda" d="M60 48Q50 66 60 84"/><path class="an-pulsar-onda d1" d="M46 38Q30 66 46 94"/>
    <path class="an-pulsar-onda" d="M140 48Q150 66 140 84"/><path class="an-pulsar-onda d1" d="M154 38Q170 66 154 94"/>`,

  relogio: () => `
    <path class="an-fluir fraco" stroke-dasharray="12 10" d="M10 58H44M4 78H40M12 98H46"/>
    <path class="grosso" d="M98 18h24M110 18v8"/>
    <circle class="c-branco" cx="110" cy="76" r="48"/>
    <path class="fino" d="M110 34v8M110 110v8M68 76h8M144 76h8"/>
    <g class="an-horas rv" style="transform-origin:110px 76px"><path class="muito-grosso" d="M110 76V56"/></g>
    <g class="an-girar rv" style="transform-origin:110px 76px"><path class="t-coral grosso" d="M110 76H142"/></g>
    <circle class="c-tinta sem" cx="110" cy="76" r="4"/>`,

  // ---------- Estômago e intestino ----------
  estomago: () => `
    ${tubo(ESOFAGO, 't-coral-s')}${tubo(DUODENO, 't-coral-s')}
    <g class="an-mexer">
      <path class="c-coral-s" d="${ESTOMAGO}"/>
      <g class="an-girar-lento rv" style="transform-origin:96px 96px">
        <circle class="c-sol" cx="96" cy="74" r="4"/><circle class="c-verde" cx="115" cy="107" r="3.5"/><circle class="c-laranja" cx="74" cy="100" r="3.5"/>
      </g>
      ${cara(96, 96, 14)}
    </g>`,

  'estomago-bacteria': () => `
    ${tubo(ESOFAGO, 't-coral-s')}${tubo(DUODENO, 't-coral-s')}
    <path class="c-coral-s" d="${ESTOMAGO}"/>
    ${cara(96, 100, 14, 'triste')}
    <g class="an-flutuar"><g class="an-balancar">${helicobacter(80, 70, -20)}</g></g>
    <g class="an-flutuar d2"><g class="an-balancar d1">${helicobacter(128, 90, 30)}</g></g>
    <g class="an-flutuar d1"><g class="an-balancar d2">${helicobacter(110, 114, 6)}</g></g>`,

  enchidos: () => {
    const chourico = (x, cls, atraso) => `
      <g class="an-balancar ${atraso} rv" style="transform-origin:${x}px 22px">
        <path class="fino" d="M${x} 22V34"/>
        <rect class="${cls}" x="${x - 8}" y="34" width="16" height="58" rx="8"/>
        <path class="fino" d="M${x - 8} 42h16M${x - 8} 84h16"/>
        <circle class="c-branco sem" cx="${x - 2}" cy="54" r="1.8"/><circle class="c-branco sem" cx="${x + 3}" cy="66" r="1.6"/><circle class="c-branco sem" cx="${x - 3}" cy="76" r="1.8"/>
      </g>`;
    return `<path class="c-madeira-t muito-grosso" d="M24 22H176"/>
      ${chourico(60, 'c-vermelho-e', '')}${chourico(96, 'c-coral', 'd2')}${chourico(132, 'c-vermelho-e', 'd1')}
      <path class="an-subir fino fraco" d="M62 140q-6 -8 0 -16t0 -16"/>
      <path class="an-subir d2 fino fraco" d="M98 140q-6 -8 0 -16t0 -16"/>
      <path class="an-subir d1 fino fraco" d="M134 140q-6 -8 0 -16t0 -16"/>
      ${menos(168, 112)}`;
  },

  endoscopia: () => `
    <path class="fraco" d="${ESTOMAGO}"/>
    ${tubo('M6 16C40 14 60 30 72 46C82 58 86 70 88 82', 't-cinza')}
    <g class="an-piscar-lento"><path class="c-sol-s sem" d="M90 86L122 102L106 118Z"/></g>
    <circle class="c-sol an-piscar" cx="88" cy="84" r="5"/>
    <rect class="c-branco" x="138" y="12" width="52" height="40" rx="6"/>
    <circle class="c-coral-s" cx="164" cy="32" r="12"/>
    <g class="an-pulsar"><circle class="c-coral" cx="168" cy="35" r="4"/></g>
    <path class="fino" d="M164 52v8M152 60h24"/>`,

  sopa: () => `
    <path class="an-subir fino fraco" d="M76 62q-6 -8 0 -16t0 -16"/>
    <path class="an-subir d2 fino fraco" d="M100 58q-6 -8 0 -16t0 -16"/>
    <path class="an-subir d1 fino fraco" d="M124 62q-6 -8 0 -16t0 -16"/>
    <ellipse class="c-suave" cx="100" cy="132" rx="74" ry="9"/>
    <path class="c-branco" d="M38 80H162C162 112 136 130 100 130C64 130 38 112 38 80Z"/>
    <ellipse class="c-verde" cx="100" cy="80" rx="62" ry="10"/>
    <path class="fino t-verde-e" d="M70 78l7 -2M92 83l8 1M112 77l7 -2M136 82l6 2"/>
    <g class="an-flutuar"><circle class="c-coral" cx="82" cy="79" r="4"/></g>
    <g class="an-flutuar d2"><circle class="c-coral" cx="120" cy="81" r="4"/></g>
    <g class="an-balancar rv" style="transform-origin:150px 76px"><path class="grosso" d="M150 76L172 42"/><ellipse class="c-branco" cx="175" cy="36" rx="7" ry="10" transform="rotate(32 175 36)"/></g>`,

  intestino: () => {
    const colon = 'M64 122V50Q64 36 78 36H124Q138 36 138 50V108Q138 124 122 126L108 128';
    const delgado = 'M84 58H116Q124 58 124 67Q124 76 116 76H86Q78 76 78 85Q78 94 86 94H116Q124 94 124 103Q124 112 116 112H90';
    return `${tubo(delgado, 't-rosa-s', 9, 5)}${tubo(colon, 't-coral-s', 18, 13)}
      <path class="an-fluir t-castanho" style="stroke-width:5" stroke-dasharray="4 10" d="${colon}"/>
      ${estrela(30, 40, 6, 'c-sol', 'an-piscar')}${estrela(170, 120, 5, 'c-sol', 'an-piscar d2')}`;
  },

  fibra: () => `
    <path class="c-pao" d="M22 122C18 96 34 80 60 80C86 80 102 96 98 122Z"/>
    <path class="fino" d="M42 92l8 10M58 88l8 10M74 90l8 10"/>
    <g class="c-castanho"><ellipse cx="58" cy="134" rx="7" ry="5"/><ellipse cx="74" cy="136" rx="7" ry="5"/><ellipse cx="90" cy="133" rx="7" ry="5"/></g>
    <g class="an-balancar rv" style="transform-origin:134px 130px">
      <path class="c-verde-s" d="M128 130L131 100H137L140 130Z"/>
      <circle class="c-verde" cx="120" cy="94" r="13"/><circle class="c-verde" cx="148" cy="94" r="12"/><circle class="c-verde" cx="134" cy="80" r="14"/><circle class="c-verde" cx="134" cy="100" r="11"/>
    </g>
    <g class="an-saltar"><circle class="c-coral" cx="170" cy="40" r="13"/><path class="c-verde" d="M170 27Q176 19 182 23Q176 29 170 27Z"/></g>
    ${estrela(40, 40, 6, 'c-sol', 'an-piscar')}`,

  polipo: () => `
    <path class="c-coral-s" d="M0 112Q25 100 50 112T100 112T150 112T200 112V150H0Z"/>
    <path class="fino fraco" d="M20 130q10 -6 20 0M70 136q10 -6 20 0M130 132q10 -6 20 0"/>
    <g class="an-crescer rv" style="transform-origin:90px 114px">
      <path class="c-coral" d="M85 115V94H95V115Z"/>
      <ellipse class="c-coral" cx="90" cy="88" rx="17" ry="13"/>
    </g>
    ${tubo('M204 14C178 14 160 26 150 44', 't-cinza')}
    <g class="an-piscar-lento"><path class="c-sol-s sem" d="M148 48L106 78L124 90Z"/></g>
    <circle class="c-sol an-piscar" cx="150" cy="46" r="5"/>
    ${estrela(40, 40, 6, 'c-sol', 'an-piscar d2')}`,

  'teste-fezes': () => `
    <g class="an-flutuar">
      <rect class="c-branco" x="54" y="44" width="30" height="86" rx="9"/>
      <path class="fino" d="M69 50V112"/>
      <rect class="c-suave" x="58" y="80" width="22" height="26" rx="3"/>
      <path class="fino" d="M62 88h14M62 96h10"/>
      <rect class="c-cor" x="50" y="26" width="38" height="22" rx="5"/>
    </g>
    <g class="an-flutuar d2">
      <rect class="c-branco" x="108" y="66" width="68" height="46" rx="5"/>
      <path class="fino" d="M108 68L142 92L176 68"/>
    </g>
    <g class="an-pulsar d1"><circle class="c-verde" cx="170" cy="40" r="14"/><path class="t-branco grosso" d="M163 40l5 5 9 -10"/></g>`,

  // ---------- Paramiloidose ----------
  'pes-formigueiro': () => `${desenharPes()}
    <g class="grosso">
      <path class="t-sol an-piscar" d="M40 34l7 -6v8l7 -6"/>
      <path class="t-coral an-piscar d2" d="M146 28l7 -6v8l7 -6"/>
      <path class="t-sol an-piscar d1" d="M34 96l-8 4 7 3 -8 4"/>
      <path class="t-coral an-piscar d3" d="M166 100l8 4 -7 3 8 4"/>
      <path class="t-sol an-piscar d4" d="M100 70l-5 8h7l-5 8"/>
    </g>`,

  adn: () => {
    const onda = (y) => Math.sin(((y - 8) / 134) * Math.PI * 2.5);
    const A = [];
    const B = [];
    for (let y = 8; y <= 142; y += 2) {
      A.push(`${n(100 + 32 * onda(y))} ${y}`);
      B.push(`${n(100 - 32 * onda(y))} ${y}`);
    }
    const cores = ['t-coral', 't-sol', 't-verde', 't-azul'];
    let degraus = '';
    let i = 0;
    for (let y = 16; y <= 136; y += 12, i++) {
      const f = onda(y);
      if (Math.abs(f) < 0.15) continue;
      const cor = y === 76 ? 't-vermelho' : cores[i % 4];
      degraus += `<path class="${cor} grosso an-piscar-lento d${(i % 5) + 1}" d="M${n(100 + 30 * f)} ${y}H${n(100 - 30 * f)}"/>`;
    }
    return `${degraus}<path class="t-cor grosso" d="M${A.join('L')}"/><path class="t-cinza grosso" d="M${B.join('L')}"/>
      <g class="an-pulsar"><circle class="grosso" cx="100" cy="76" r="24"/><path class="muito-grosso" d="M117 93L132 108"/></g>`;
  },

  proteina: () => {
    const fita = (x, y, cls, atraso) =>
      `<g class="an-juntar ${atraso}" style="--dx:${n(100 - x)}px;--dy:${n(80 - y)}px"><path class="${cls}" style="stroke-width:5" d="M${x - 16} ${y}q4 -7 8 0t8 0t8 0t8 0"/></g>`;
    return `<path class="fino fraco" d="M10 136C60 128 140 144 190 134"/>
      ${fita(34, 30, 't-cor', '')}${fita(166, 34, 't-coral', 'd2')}${fita(40, 120, 't-sol', 'd1')}${fita(160, 116, 't-azul', 'd3')}
      <g class="an-crescer"><path class="c-sol-s" d="M84 64C92 54 112 56 116 66C128 68 128 90 116 92C112 104 90 104 86 94C72 92 72 70 84 64Z"/>
        <path class="fino" d="M86 74q6 -6 12 0t12 0M88 86q6 -6 12 0t10 0"/></g>`;
  },

  barco: () => `
    <circle class="c-sol" cx="164" cy="28" r="14"/>
    <g class="an-balancar rv" style="transform-origin:100px 106px">
      <path class="grosso" d="M100 100V26"/>
      <path class="c-branco" d="M103 32L142 88H103Z"/>
      <path class="c-coral" d="M100 26L82 31L100 36Z"/>
      <path class="c-coral" d="M42 94H158L144 118H56Z"/>
      <path class="t-branco grosso" d="M52 104H148"/>
    </g>
    <rect class="c-azul-s sem" x="0" y="112" width="200" height="38"/>
    <g class="an-ondular"><path class="t-azul grosso" d="M-40 112q15 -10 30 0t30 0t30 0t30 0t30 0t30 0t30 0t30 0"/></g>
    <g class="an-ondular inv"><path class="t-azul fino" d="M-40 132q15 -8 30 0t30 0t30 0t30 0t30 0t30 0t30 0t30 0"/></g>`,

  familia: () => {
    const no = (x, y, o = {}) => cabeca(x, y, 11, o);
    const anel = (x, y, d) => `<circle class="an-pulsar-onda ${d} t-coral grosso" cx="${x}" cy="${y}" r="17"/>`;
    return `<path class="fino" d="M61 30H69M131 30H139M65 30V67M135 30V67M76 78H124M100 78V100M70 100H130M70 100V113M100 100V113M130 100V113"/>
      ${anel(50, 30, '')}${anel(65, 78, 'd1')}${anel(100, 124, 'd2')}
      ${no(50, 30, { cabelo: 'c-cabelo-b', oculos: true })}${no(80, 30, { cabelo: 'c-cabelo-b', pele: 'c-pele2' })}
      ${no(120, 30, { cabelo: 'c-cabelo-b' })}${no(150, 30, { cabelo: 'c-cabelo-b', oculos: true, pele: 'c-pele2' })}
      ${no(65, 78)}${no(135, 78, { cabelo: 'c-coral', pele: 'c-pele2' })}
      ${no(70, 124, { pele: 'c-pele2' })}${no(100, 124, { cabelo: 'c-sol' })}${no(130, 124)}`;
  },

  // ---------- DPOC e cancro do pulmão ----------
  'pulmoes-cinza': () => `
    <g class="an-respirar-lento">
      <path class="grosso" d="${TRAQUEIA}"/>
      <path class="c-cinza" d="${PULMAO_E}"/><path class="c-cinza" d="${PULMAO_D}"/>
      <g class="c-cinza-e sem"><circle cx="62" cy="88" r="4"/><circle cx="74" cy="108" r="3"/><circle cx="56" cy="104" r="2.5"/><circle cx="136" cy="84" r="4"/><circle cx="146" cy="104" r="3"/><circle cx="128" cy="112" r="2.5"/></g>
    </g>
    <path class="an-subir fino fraco" d="M24 146q-6 -8 0 -16t0 -16"/>
    <path class="an-subir d2 fino fraco" d="M176 146q-6 -8 0 -16t0 -16"/>
    <path class="an-subir d1 fino fraco" d="M100 150q-6 -8 0 -16t0 -16"/>`,

  inalador: () => `
    <g class="an-apertar"><rect class="c-cor" x="66" y="12" width="26" height="76" rx="6"/></g>
    <path class="c-branco" d="M60 48H98V108H138V134H60Z"/>
    <path class="fino fraco" d="M66 60H92"/>
    <g class="c-azul-s">
      <circle class="an-espalhar" cx="148" cy="120" r="7"/>
      <circle class="an-espalhar d1" cx="152" cy="112" r="5"/>
      <circle class="an-espalhar d2" cx="150" cy="128" r="6"/>
    </g>
    ${estrela(170, 50, 6, 'c-sol', 'an-piscar')}${estrela(36, 36, 5, 'c-sol', 'an-piscar d2')}`,

  escadas: () => {
    const p = pessoa(100, 27, { r: 10, alt: 22, cor: 'c-coral', cabelo: 'c-cabelo-b', humor: 'neutro' });
    return `<path class="c-suave" d="M10 140V130H50V110H80V90H120V70H150V50H190V140Z"/>
      <g class="an-passo">${p.svg}</g>
      <g class="c-azul-s">
        <circle class="an-espalhar" cx="114" cy="40" r="4"/>
        <circle class="an-espalhar d2" cx="114" cy="44" r="3"/>
      </g>
      <path class="c-azul sem an-cair" d="M88 24c0 0 -3 5 -3 7a3 3 0 0 0 6 0c0 -2 -3 -7 -3 -7Z"/>`;
  },

  oxigenio: () => `
    <path d="M56 28Q58 8 96 10Q136 12 142 58"/>
    <rect class="c-azul-s" x="36" y="40" width="40" height="98" rx="18"/>
    <rect class="c-cinza" x="48" y="26" width="16" height="16" rx="3"/>
    <text class="il-num" x="56" y="98">O<tspan font-size="14" dy="5">2</tspan></text>
    <circle class="c-branco an-subir" cx="48" cy="126" r="3"/>
    <circle class="c-branco an-subir d2" cx="62" cy="122" r="2.5"/>
    ${cabeca(148, 84, 26, { cabelo: 'c-cabelo-b' })}
    <path class="t-azul" d="M122 86Q148 94 174 86"/>`,

  janela: () => `
    <rect class="c-azul-s" x="52" y="24" width="96" height="102"/>
    <circle class="c-sol" cx="124" cy="50" r="12"/>
    <path class="c-nuvem" d="M64 98H98A10 10 0 0 0 94 80A14 14 0 0 0 70 82A9 9 0 0 0 64 98Z"/>
    <path class="an-fluir t-azul" stroke-dasharray="12 10" d="M60 64Q100 52 140 70M60 104Q100 92 140 110"/>
    <g class="an-abrir rv" style="transform-origin:52px 75px"><rect class="c-vidro" x="52" y="24" width="48" height="102"/><path class="fino" d="M76 24V126M52 75H100"/></g>
    <g class="an-abrir rv" style="transform-origin:148px 75px"><rect class="c-vidro" x="100" y="24" width="48" height="102"/><path class="fino" d="M124 24V126M100 75H148"/></g>
    <rect class="grosso" x="52" y="24" width="96" height="102" rx="2"/>
    <path class="c-branco" d="M42 126H158V136H42Z"/>`,

  'pulmao-mancha': () => `
    <g class="an-respirar">
      <path class="grosso" d="${TRAQUEIA}"/>
      <path class="c-coral-s" d="${PULMAO_E}"/><path class="c-coral-s" d="${PULMAO_D}"/>
      <circle class="an-pulsar-onda t-coral grosso" cx="134" cy="90" r="18"/>
      <g class="an-pulsar"><circle class="c-vermelho-e" cx="134" cy="90" r="8"/></g>
    </g>`,

  'casa-radao': () => {
    const pintas = [[14, 128], [34, 140], [58, 126], [82, 142], [118, 130], [146, 142], [172, 126], [190, 140]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`)
      .join('');
    return `<rect class="c-cinza sem" x="0" y="116" width="200" height="34"/>
      <g class="c-cinza-e sem">${pintas}</g>
      <path class="c-branco" d="M52 116V68L100 34L148 68V116Z"/>
      <path class="c-coral" d="M40 72L100 26L160 72H146L100 40L54 72Z"/>
      <rect class="c-cor" x="86" y="84" width="24" height="32" rx="3"/>
      <rect class="c-azul-s" x="118" y="76" width="22" height="20"/>
      <g class="c-sol">
        <circle class="an-subir" cx="64" cy="110" r="3.5"/><circle class="an-subir d1" cx="76" cy="104" r="3"/>
        <circle class="an-subir d2" cx="128" cy="110" r="3"/><circle class="an-subir d3" cx="30" cy="118" r="3.5"/>
        <circle class="an-subir d4" cx="176" cy="118" r="3"/>
      </g>
      <path class="an-fluir t-azul" stroke-dasharray="12 10" d="M140 86H186"/>
      <path class="t-azul" d="M180 80L188 86L180 92"/>`;
  },

  tac: () => `
    <circle class="c-branco" cx="120" cy="68" r="48"/>
    <circle class="c-suave" cx="120" cy="68" r="24"/>
    <g class="an-girar rv" style="transform-origin:120px 68px"><circle class="t-cor fino" cx="120" cy="68" r="36" stroke-dasharray="10 12"/></g>
    <path class="c-cinza" d="M106 114H134V138H106Z"/>
    <g class="an-deslizar-x">
      <rect class="c-cor" x="8" y="74" width="144" height="10" rx="4"/>
      ${cabeca(36, 64, 10, { humor: 'dormir' })}
      <path class="c-azul-s" d="M48 74V66Q48 58 56 58H128Q134 58 134 66V74Z"/>
    </g>`,

  'raio-x': () => `
    <rect class="c-escuro" x="34" y="8" width="132" height="134" rx="10"/>
    <g class="claro fino">
      <path class="fraco" d="M100 22V132"/>
      <path class="fraco" d="M98 40Q70 36 56 50M98 54Q68 50 54 66M98 68Q68 64 54 82M98 82Q70 80 58 96M102 40Q130 36 144 50M102 54Q132 50 146 66M102 68Q132 64 146 82M102 82Q130 80 142 96"/>
      <path d="${PULMAO_E}"/><path d="${PULMAO_D}"/>
    </g>
    <g class="an-pulsar"><circle class="c-sol" cx="132" cy="86" r="6"/></g>
    <g class="an-varrer-y"><rect class="c-azul sem" x="36" y="16" width="128" height="3"/></g>`,

  // ---------- Fígado ----------
  figado: () => `
    <ellipse class="c-verde" cx="98" cy="114" rx="8" ry="11"/>
    <path class="c-verde sem an-gotejar" d="M98 128c0 0 -3 5 -3 7a3 3 0 0 0 6 0c0 -2 -3 -7 -3 -7Z"/>
    <g class="an-respirar">
      <path class="c-figado" d="${FIGADO}"/>
      ${cara(74, 74, 22)}
    </g>
    <g class="an-girar rv" style="transform-origin:136px 58px">${engrenagem(136, 58, 14)}</g>
    <g class="an-girar-inv rv" style="transform-origin:155px 66px">${engrenagem(155, 66, 9)}</g>
    ${estrela(28, 30, 6, 'c-sol', 'an-piscar')}${estrela(176, 110, 5, 'c-sol', 'an-piscar d2')}`,

  'figado-doente': () => {
    const mini = (tx, cls) => `<g class="ns" transform="translate(${tx} 38) scale(.5)"><path class="${cls}" d="${FIGADO}"/></g>`;
    const nodulos = [[150, 62], [164, 64], [176, 64], [156, 76], [146, 86], [138, 92]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2"/>`)
      .join('');
    return `${mini(-3, 'c-figado')}${cara(27, 76, 10)}
      <path class="an-fluir fraco" stroke-dasharray="12 10" d="M88 76H104"/><path d="M100 70L108 76L100 82"/>
      <g class="an-encolher">${mini(97, 'c-figado-d')}<g class="c-figado-e an-piscar-lento">${nodulos}</g>${cara(127, 76, 10, 'triste')}</g>
      <text class="il-txt" x="48" y="118">saudável</text><text class="il-txt" x="148" y="118">cirrose</text>`;
  },

  alcool: () => `
    <g class="an-balancar rv" style="transform-origin:70px 128px">
      <path class="c-vermelho-e" d="M48 58H92Q90 84 70 90Q50 84 48 58Z"/>
      <path d="M46 30H94Q96 80 70 90Q44 80 46 30Z"/>
      <path d="M70 90V124M54 126H86"/>
    </g>
    <path class="grosso" d="M148 72H158Q166 72 166 82V102Q166 112 158 112H148"/>
    <rect class="c-sol" x="104" y="56" width="44" height="72" rx="6"/>
    <path class="c-branco" d="M100 62Q102 46 116 50Q122 40 134 48Q148 42 152 58V64H100Z"/>
    <circle class="c-branco sem an-subir" cx="118" cy="116" r="2.5"/>
    <circle class="c-branco sem an-subir d2" cx="132" cy="110" r="2"/>
    <g class="an-pulsar"><circle class="c-coral" cx="168" cy="28" r="18"/><text class="il-txt txt-branco" x="168" y="32">18+</text></g>`,

  // ---------- Obesidade infantil ----------
  refrigerante: () => {
    const cubo = (x, y) => `<rect class="c-branco" x="${x}" y="${y}" width="14" height="14" rx="2"/>`;
    return `<rect class="c-coral" x="44" y="34" width="50" height="96" rx="10"/>
      <ellipse class="c-cinza" cx="69" cy="36" rx="23" ry="6"/>
      <path class="c-branco fino" d="M44 74Q69 64 94 74V90Q69 80 44 90Z"/>
      <path class="fino" d="M64 33h10"/>
      ${cubo(112, 116)}${cubo(128, 116)}${cubo(144, 116)}${cubo(160, 116)}${cubo(120, 100)}${cubo(136, 100)}
      <g class="an-cair-cubo">${cubo(152, 74)}</g>
      ${menos(170, 36)}`;
  },

  ecra: () => `
    <rect class="c-escuro" x="24" y="30" width="118" height="82" rx="8"/>
    <rect class="c-azul-s sem" x="32" y="38" width="102" height="66" rx="3"/>
    <path class="c-verde sem" d="M32 88Q58 78 82 88T134 86V104H32Z"/>
    <g class="an-saltar"><circle class="c-coral" cx="70" cy="76" r="6"/></g>
    <path class="grosso" d="M83 112V122M60 124H106"/>
    <circle class="c-branco" cx="164" cy="42" r="22"/>
    <path class="fino" d="M164 24v4M164 56v4M146 42h4M178 42h4"/>
    <g class="an-girar rv" style="transform-origin:164px 42px"><path class="t-coral grosso" d="M164 42V27"/></g>
    <circle class="c-tinta sem" cx="164" cy="42" r="3"/>`,

  bicicleta: () => {
    const roda = (cx) =>
      `<circle class="grosso" cx="${cx}" cy="110" r="24"/><g class="an-girar-rapido rv" style="transform-origin:${cx}px 110px"><path class="fino" d="M${cx} 86V134M${cx - 24} 110H${cx + 24}M${cx - 17} 93L${cx + 17} 127M${cx + 17} 93L${cx - 17} 127"/></g>`;
    return `<path class="an-fluir fraco" stroke-dasharray="12 10" d="M2 64H28M0 86H22"/>
      <path class="fraco" d="M24 136H190"/>
      ${roda(56)}${roda(150)}
      <path class="t-cor grosso" d="M56 110L82 76H128L150 110M82 76L100 110L128 76M56 110H100"/>
      <path class="grosso" d="M82 76V70M74 70H90M128 76L124 60M118 60H132"/>
      <g class="an-girar-rapido rv" style="transform-origin:100px 110px"><path class="grosso" d="M92 104L108 116"/></g>
      <path d="M86 70L106 88L100 110"/>
      <path class="c-coral" d="M80 70L96 44Q104 40 110 46L96 72Z"/>
      <path d="M104 50L124 60"/><circle class="c-pele2" cx="124" cy="60" r="4"/>
      ${cabeca(106, 32, 12, { pele: 'c-pele2', cabelo: null })}
      <path class="c-cor" d="M93 30A13 13 0 0 1 119 30Z"/>`;
  },

  // ---------- Osteoporose ----------
  ossos: () => {
    const furos = (cx, lista, cls) =>
      lista.map(([dx, dy, r]) => `<circle class="${cls}" cx="${cx + dx}" cy="${66 + dy}" r="${r}"/>`).join('');
    const corte = (cx, buracos, humor) =>
      `<circle class="c-branco" style="stroke-width:6" cx="${cx}" cy="66" r="40"/>${buracos}${cara(cx, 84, 12, humor)}`;
    const sao = furos(52, [[-20, -18, 2.4], [-8, -26, 2.4], [6, -22, 2.4], [18, -14, 2.4], [-26, -4, 2.4], [-12, -10, 2.4], [2, -10, 2.4], [16, -2, 2.4], [26, 6, 2.4], [-28, 10, 2.4], [-6, -36, 2], [22, -26, 2]], 'c-sol-s fino');
    const poroso = [[-16, -16, 9], [10, -24, 7], [22, -4, 8], [-26, 4, 6], [0, -4, 6]]
      .map((f, i) => `<g class="an-crescer${i ? ` d${i}` : ''}">${furos(148, [f], 'c-suave fino')}</g>`)
      .join('');
    return `${corte(52, sao, 'feliz')}${corte(148, poroso, 'triste')}
      <text class="il-txt" x="52" y="124">saudável</text><text class="il-txt" x="148" y="124">osteoporose</text>`;
  },

  leite: () => `
    <path class="c-branco" d="M36 38L51 26L66 38Z"/>
    <path class="c-branco" d="M26 56L36 38H66L76 56V132H26Z"/>
    <path class="c-azul" d="M26 60H76V76H26Z"/>
    <path class="fino" d="M36 38L46 56M66 38L56 56"/>
    <path class="c-branco an-cair" d="M110 44c0 0 -5 7 -5 10a5 5 0 0 0 10 0c0 -3 -5 -10 -5 -10Z"/>
    <path class="c-branco sem" d="M93.6 86L96 132H124L126.4 86Z"/>
    <path class="fino" d="M93.6 86H126.4"/>
    <path d="M92 66L96 132H124L128 66"/>
    <path class="c-sol" d="M138 132V106L192 98V126Z"/>
    <g class="c-sol-s"><circle cx="152" cy="116" r="3.5"/><circle cx="170" cy="112" r="4"/><circle cx="182" cy="120" r="2.5"/></g>
    <g class="an-balancar"><path class="c-azul-s" d="M144 72C154 60 178 60 186 72C178 84 154 84 144 72Z"/><path class="c-azul-s" d="M144 72L132 64V80Z"/><circle class="c-tinta sem" cx="178" cy="70" r="1.8"/><path class="fino" d="M168 64Q164 72 168 80"/></g>`,

  'sol-vitamina': () => {
    const p = pessoa(64, 64, { r: 13, alt: 30, bracos: 'cima', cor: 'c-cor', pele: 'c-pele2' });
    return `<g class="an-girar rv" style="transform-origin:138px 46px"><path class="t-sol grosso" d="M138 6V16M138 76V86M98 46H108M168 46H178M110 18L117 25M159 67L166 74M110 74L117 67M159 25L166 18"/></g>
      <circle class="c-sol" cx="138" cy="46" r="22"/>${cara(138, 46, 18)}
      <path class="fraco" d="M20 141H120"/>
      ${p.svg}
      <g class="an-pulsar"><circle class="c-laranja" cx="168" cy="112" r="16"/><text class="il-num txt-branco" x="168" y="120">D</text></g>`;
  },

  'luz-noite': () => `
    <rect class="c-noite sem" x="0" y="0" width="200" height="150" rx="14"/>
    <g class="claro">
      <circle class="c-sol" cx="40" cy="34" r="13"/><circle class="c-noite sem" cx="47" cy="29" r="12"/>
      <rect class="c-porta" x="138" y="36" width="44" height="104" rx="3"/>
      <circle class="c-sol sem" cx="146" cy="90" r="3"/>
      <path class="c-branco" d="M8 104H72V122H8Z"/><path class="c-branco" d="M8 96H30V104H8Z"/>
      <path d="M8 122V136M72 122V136"/>
      <path class="an-fluir t-sol fraco" stroke-dasharray="4 10" d="M72 134Q106 142 138 132"/>
      <rect class="c-branco" x="102" y="112" width="12" height="16" rx="3"/>
    </g>
    <circle class="c-sol sem an-pulsar" cx="108" cy="114" r="6"/>
    <circle class="an-pulsar-onda t-sol" cx="108" cy="114" r="16"/>
    <circle class="an-pulsar-onda d2 t-sol" cx="108" cy="114" r="26"/>
    ${estrela(80, 24, 4, 'c-sol', 'an-piscar')}${estrela(110, 44, 3, 'c-sol', 'an-piscar d2')}${estrela(20, 70, 3, 'c-sol', 'an-piscar d1')}`,

  quedas: () => {
    const p = pessoa(100, 50, { r: 13, alt: 34, bracos: 'cima', humor: 'doente', cor: 'c-cor', cabelo: 'c-cabelo-b' });
    return `<path class="c-coral" d="M30 134H84Q92 118 102 134H176V142H30Z"/>
      <g class="an-balancar rv" style="transform-origin:100px 130px"><g transform="rotate(-16 100 130)">${p.svg}</g></g>
      <g class="an-pulsar d2"><path class="c-sol" d="M164 18L188 58H140Z"/><text class="il-num" x="164" y="54">!</text></g>`;
  },

  densitometria: () => `
    <path class="grosso" d="M40 110V136M160 110V136"/>
    <rect class="c-cinza" x="20" y="96" width="160" height="14" rx="4"/>
    ${cabeca(42, 84, 10, { humor: 'dormir' })}
    <path class="c-azul-s" d="M54 96V86Q54 78 62 78H152Q160 78 160 86V96Z"/>
    <g class="an-lupa-x">
      <path class="an-fluir t-cor" stroke-dasharray="4 10" d="M100 46V76M110 46V76M120 46V76"/>
      <rect class="c-branco" x="88" y="22" width="44" height="20" rx="5"/>
      <path class="grosso" d="M110 22V8"/>
    </g>`,

  // ---------- Demência ----------
  'puzzle-cerebro': () => `
    <path class="c-coral-s" d="${CEREBRO}"/>
    <path class="fino" d="M100 34V58a6 6 0 0 1 0 12V110M50 76H72a6 6 0 0 0 12 0H156"/>
    <path class="c-suave fino" stroke-dasharray="3 4" d="${pecaPuzzle(112, 42, 28)}"/>
    ${cara(76, 94, 12)}
    <g class="an-encaixar"><path class="c-coral" d="${pecaPuzzle(112, 42, 28)}"/></g>
    ${estrela(170, 24, 6, 'c-sol', 'an-piscar')}`,

  calendario: () => {
    let dias = '';
    for (let l = 0; l < 4; l++) {
      for (let c = 0; c < 6; c++) dias += `<rect class="c-suave sem" x="${44 + c * 17}" y="${56 + l * 17}" width="11" height="11" rx="2"/>`;
    }
    return `<rect class="c-branco" x="34" y="26" width="112" height="106" rx="8"/>
      <path class="c-coral" d="M34 34Q34 26 42 26H138Q146 26 146 34V46H34Z"/>
      <path class="grosso" d="M60 18V34M120 18V34"/>
      ${dias}
      <g class="an-pulsar"><circle class="t-coral grosso" cx="100.5" cy="78.5" r="10"/></g>
      <g class="an-balancar rv" style="transform-origin:171px 70px"><rect class="c-sol" x="152" y="70" width="38" height="38" rx="3"/><path class="fino" d="M158 82h26M158 90h20M158 98h24"/></g>`;
  },

  musica: () => `
    <path class="grosso" d="M48 60L82 28"/>
    <rect class="c-laranja" x="28" y="60" width="112" height="70" rx="12"/>
    <g class="an-pulsar"><circle class="c-castanho" cx="64" cy="95" r="20"/><circle class="c-tinta sem" cx="64" cy="95" r="5"/></g>
    <rect class="c-branco" x="96" y="74" width="34" height="14" rx="3"/>
    <path class="t-coral fino" d="M104 74v14"/>
    <circle class="c-branco" cx="104" cy="108" r="6"/><circle class="c-branco" cx="122" cy="108" r="6"/>
    ${nota(152, 56, '')}${nota(172, 36, 'd2')}${nota(146, 28, 'd1')}`,

  cuidar: () => {
    const a = pessoa(68, 34, { cor: 'c-cor', bracos: 'nenhum', pele: 'c-pele2' });
    const b = pessoa(128, 38, { cor: 'c-coral-s', bracos: 'nenhum', cabelo: 'c-cabelo-b', oculos: true, r: 14, alt: 36 });
    const mx = 99;
    const my = n(a.t + 26);
    const [bx, by] = b.ombroD;
    return `<path class="fraco" d="M24 124H176"/>
      ${a.svg}${b.svg}
      <path d="M${n(a.ombroE[0])} ${n(a.ombroE[1])}l-7 24"/>${a.mao(a.ombroE[0] - 7, a.ombroE[1] + 24)}
      <path d="M${n(a.ombroD[0])} ${n(a.ombroD[1])}L${mx} ${my}M${n(b.ombroE[0])} ${n(b.ombroE[1])}L${mx} ${my}"/>
      <circle class="c-pele2" cx="${mx}" cy="${my}" r="4.5"/>
      <path class="c-madeira-t muito-grosso" d="M${n(bx + 14)} ${n(by + 22)}V122M${n(bx + 14)} ${n(by + 22)}Q${n(bx + 14)} ${n(by + 12)} ${n(bx + 5)} ${n(by + 14)}"/>
      <path d="M${n(bx)} ${n(by)}L${n(bx + 13)} ${n(by + 20)}"/>${b.mao(bx + 14, by + 21)}
      <g class="an-bater">${coracaoPeq(99, 20, 10)}</g>`;
  },

  // ---------- Tuberculose ----------
  'pulmoes-bacilos': () => `
    <g class="an-respirar">
      <path class="grosso" d="${TRAQUEIA}"/>
      <path class="c-coral-s" d="${PULMAO_E}"/><path class="c-coral-s" d="${PULMAO_D}"/>
      ${bacilo(64, 86, 30)}${bacilo(72, 108, -20, 'd2')}${bacilo(134, 90, -40, 'd1')}${bacilo(142, 110, 15, 'd3')}
    </g>
    ${bacilo(28, 40, 20, 'd2')}${bacilo(172, 34, -30, 'd1')}${bacilo(176, 128, 40, 'd4')}`,

  pastilheiro: () => {
    const dias = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
    let caixas = '';
    dias.forEach((dia, i) => {
      const x = 16 + i * 24;
      const tampa = `<rect class="${i % 2 ? 'c-suave' : 'c-cor'}" x="${x}" y="58" width="24" height="16" rx="3"/><text class="il-txt" x="${x + 12}" y="70">${dia}</text>`;
      caixas += `<rect class="c-branco" x="${x}" y="74" width="24" height="40" rx="3"/>`;
      if (i === 3) {
        caixas += `<circle class="c-coral sem" cx="${x + 8}" cy="96" r="4"/><circle class="c-sol sem" cx="${x + 16}" cy="102" r="4"/>`;
        caixas += `<g class="an-tampa rv" style="transform-origin:${x}px 74px">${tampa}</g>`;
      } else {
        caixas += tampa;
      }
      if (i < 3) caixas += `<path class="t-verde grosso an-piscar-lento d${i + 1}" d="M${x + 6} 44l4 4 8 -9"/>`;
    });
    return `${caixas}<text class="il-txt" x="100" y="136">6 meses, todos os dias</text>`;
  },

  // ---------- Asma ----------
  'bronquio-asma': () => `
    <circle class="c-coral-s" cx="54" cy="70" r="38"/>
    <circle class="c-branco" cx="54" cy="70" r="28"/>
    <path class="an-fluir t-azul fino" stroke-dasharray="4 8" d="M36 64H72M36 76H72"/>
    <circle class="t-coral fino" stroke-dasharray="6 4" cx="146" cy="70" r="44"/>
    <circle class="c-coral" cx="146" cy="70" r="38"/>
    <circle class="c-coral-s" cx="146" cy="70" r="28"/>
    <g class="an-crescer"><circle class="c-branco" cx="146" cy="70" r="14"/></g>
    <ellipse class="c-sol-s fino" cx="140" cy="62" rx="5" ry="3.5"/>
    <text class="il-txt" x="54" y="130">normal</text>
    <text class="il-txt" x="146" y="132">na crise</text>`,

  alergenos: () => `
    <path class="t-verde-e grosso" d="M44 136V82M44 112Q30 104 26 92Q40 94 44 104"/>
    <g class="an-balancar rv" style="transform-origin:44px 82px">
      <circle class="c-sol" cx="44" cy="58" r="9"/><circle class="c-sol" cx="60" cy="68" r="9"/><circle class="c-sol" cx="54" cy="86" r="9"/>
      <circle class="c-sol" cx="34" cy="86" r="9"/><circle class="c-sol" cx="28" cy="68" r="9"/><circle class="c-coral" cx="44" cy="73" r="8"/>
    </g>
    <circle class="c-sol-s an-flutuar" cx="78" cy="48" r="3.5"/><circle class="c-sol-s an-flutuar d2" cx="92" cy="30" r="3"/>
    <circle class="c-sol-s an-flutuar d1" cx="70" cy="24" r="2.5"/><circle class="c-sol-s an-flutuar d3" cx="98" cy="58" r="2.5"/>
    <ellipse class="c-cinza" cx="140" cy="116" rx="32" ry="17"/>
    <g class="an-balancar rv" style="transform-origin:110px 112px"><path class="c-nada grosso" d="M110 112Q94 104 100 84"/></g>
    <path class="c-cinza" d="M156 82L158 60L170 72ZM184 82L182 60L170 72Z"/>
    <circle class="c-cinza" cx="170" cy="88" r="17"/>
    ${cara(170, 90, 15)}
    <path class="fino fraco" d="M150 92h-10M150 98l-9 3M190 92h10M190 98l9 3"/>
    <circle class="c-cinza-e sem an-flutuar d2" cx="128" cy="30" r="2.5"/><circle class="c-cinza-e sem an-flutuar d4" cx="146" cy="20" r="2"/><circle class="c-cinza-e sem an-flutuar d1" cx="120" cy="50" r="2"/>`,

  // ---------- Enfarte do miocárdio ----------
  'coracao-enfarte': () => `
    <g class="an-bater">
      <path class="c-coral" d="${CORACAO}"/>
      <g class="an-piscar-lento"><ellipse class="c-vermelho-e sem" cx="80" cy="104" rx="14" ry="10"/></g>
      <path class="t-vermelho grosso" d="M100 50Q94 64 84 74Q76 82 74 94M100 50Q110 64 124 70Q136 76 144 70M124 70Q126 86 118 100"/>
      <g class="an-pulsar"><circle class="c-sol" cx="84" cy="74" r="6"/></g>
    </g>
    <g class="an-pulsar d2"><circle class="c-sol" cx="170" cy="30" r="14"/><text class="il-num" x="170" y="38">!</text></g>`,

  'dor-peito': () => {
    const p = pessoa(96, 26, { humor: 'doente', bracos: 'nenhum', cor: 'c-suave', cabelo: 'c-cabelo-b' });
    const [ox, oy] = p.ombroD;
    return `${p.svg}
      <path d="M${n(p.ombroE[0])} ${n(p.ombroE[1])}l-7 24"/>${p.mao(p.ombroE[0] - 7, p.ombroE[1] + 24)}
      <g class="an-pulsar">${coracaoPeq(90, p.t + 14, 7)}</g>
      <path d="M${n(ox)} ${n(oy)}Q${n(ox + 2)} ${n(oy + 14)} ${n(ox - 12)} ${n(oy + 10)}"/>${p.mao(ox - 12, oy + 10)}
      <g class="an-piscar"><path class="t-coral grosso" d="M62 62l-10 -6M60 74h-12M62 86l-10 6"/></g>
      <path class="c-azul sem an-cair" d="M122 24c0 0 -4 6 -4 9a4 4 0 0 0 8 0c0 -3 -4 -9 -4 -9Z"/>
      <g class="an-pulsar d2"><circle class="c-sol" cx="166" cy="40" r="14"/><text class="il-num" x="166" y="48">!</text></g>`;
  },

  // ---------- Fibrilhação auricular ----------
  'ecg-irregular': () => {
    const traco = 'M30 76q4 -3 8 0t8 0l4 -30l5 44l4 -14q4 -3 8 0t8 0t8 0l4 -30l5 44l4 -14q4 -3 8 0l4 -30l5 44l4 -14q4 -3 8 0t8 0t8 0t8 0l4 -30l5 44l4 -14q4 -3 8 0';
    return `<rect class="c-escuro" x="18" y="26" width="164" height="90" rx="10"/>
      <path class="t-verde fraco fino" d="M26 56H174M26 96H174"/>
      <path class="t-verde grosso" d="${traco}"/>
      <path class="t-branco grosso an-fluir" stroke-dasharray="8 300" d="${traco}"/>
      <g class="an-bater">${coracaoPeq(172, 26, 11)}</g>
      <text class="il-txt" x="100" y="138">ritmo irregular</text>`;
  },

  pulso: () => `
    <path class="c-pele" d="M0 92H128Q150 92 156 104Q150 116 128 116H0Z"/>
    <path class="fino fraco" d="M120 98q8 6 0 12"/>
    <path class="c-pele2" d="M80 8H132Q136 30 126 48H90Q80 30 80 8Z"/>
    <rect class="c-pele2" x="92" y="40" width="13" height="56" rx="6.5"/>
    <rect class="c-pele2" x="108" y="44" width="13" height="52" rx="6.5"/>
    <path class="an-pulsar-onda t-coral" d="M132 70Q142 84 132 98"/><path class="an-pulsar-onda d2 t-coral" d="M144 62Q160 84 144 106"/>
    <circle class="c-branco" cx="40" cy="44" r="24"/>
    <path class="fino" d="M40 24v4M40 60v4M20 44h4M56 44h4"/>
    <g class="an-girar rv" style="transform-origin:40px 44px"><path class="t-coral grosso" d="M40 44V28"/></g>
    <circle class="c-tinta sem" cx="40" cy="44" r="3"/>
    <text class="il-txt" x="40" y="84">1 minuto</text>`,

  // ---------- Insuficiência cardíaca ----------
  'coracao-cansado': () => `
    <path class="an-fluir fraco" stroke-dasharray="4 10" d="M8 76H44M156 76H192"/>
    <g class="an-pulsar-lento">
      <path class="c-coral-s" d="${CORACAO}"/>
      ${cara(100, 80, 26, 'neutro')}
    </g>
    <path class="c-azul sem an-cair" d="M62 26c0 0 -5 7 -5 10a5 5 0 0 0 10 0c0 -3 -5 -10 -5 -10Z"/>
    <rect class="c-branco" x="144" y="16" width="38" height="22" rx="4"/>
    <path class="grosso" d="M185 23v8"/>
    <g class="an-piscar-lento"><rect class="c-coral sem" x="148" y="20" width="9" height="14" rx="2"/></g>`,

  'pernas-inchadas': () => `
    <path class="c-pele" d="M52 8H76V100Q76 112 86 116H102Q114 118 112 128Q110 136 100 136H50Q44 136 46 126L52 100Z"/>
    <g class="an-pulsar-lento"><path class="c-pele" d="M126 8H152Q160 60 162 94Q164 108 174 112H182Q194 116 192 128Q190 136 180 136H124Q112 136 116 120Q124 96 120 60Z"/></g>
    <ellipse class="c-coral-s fino" cx="174" cy="118" rx="5" ry="3"/>
    <g class="an-apertar"><rect class="c-pele2" x="168" y="74" width="12" height="32" rx="6"/></g>
    <path class="c-azul-s sem an-cair" d="M136 30c0 0 -4 6 -4 9a4 4 0 0 0 8 0c0 -3 -4 -9 -4 -9Z"/>
    <path class="c-azul-s sem an-cair d2" d="M146 52c0 0 -4 6 -4 9a4 4 0 0 0 8 0c0 -3 -4 -9 -4 -9Z"/>`,

  // ---------- Doença renal crónica ----------
  rins: () => {
    const rim = 'M60 22C40 22 30 40 30 58C30 78 42 94 60 94C72 94 76 86 72 76C68 68 68 52 72 44C76 32 72 22 60 22Z';
    const gota = (x, y, atraso) => `<path class="c-sol sem an-cair ${atraso}" d="M${x} ${y}c0 0 -3 5 -3 7a3 3 0 0 0 6 0c0 -2 -3 -7 -3 -7Z"/>`;
    return `<path class="t-vermelho grosso" d="M100 4V100M100 54H72M100 54H128"/>
      <path class="grosso" d="M70 66Q88 84 92 112M130 66Q112 84 108 112"/>
      <g class="an-pulsar-lento">
        <path class="c-figado" d="${rim}"/><g transform="translate(200 0) scale(-1 1)"><path class="c-figado" d="${rim}"/></g>
        ${cara(52, 60, 13)}${cara(148, 60, 13)}
      </g>
      ${gota(80, 76, '')}${gota(120, 80, 'd2')}
      <path class="c-sol-s" d="M78 114Q78 106 100 106Q122 106 122 114Q122 138 100 140Q78 138 78 114Z"/>
      <g class="an-nivel rv" style="transform-origin:100px 140px"><path class="c-sol sem" d="M82 124H118Q116 136 100 137Q84 136 82 124Z"/></g>`;
  },

  // ---------- Cancro da próstata ----------
  prostata: () => `
    <path class="c-sol-s" d="M56 58Q56 16 100 16Q144 16 144 58Q144 82 118 88H82Q56 82 56 58Z"/>
    <g class="an-nivel rv" style="transform-origin:100px 86px"><path class="c-sol sem" d="M62 64H138Q134 82 116 84H84Q66 82 62 64Z"/></g>
    <g class="an-pulsar-lento"><ellipse class="c-coral" cx="100" cy="100" rx="26" ry="17"/></g>
    <path style="stroke-width:8" d="M100 86V146"/><path class="t-sol" style="stroke-width:3" d="M100 86V146"/>
    <path class="fino fraco" d="M126 102H146"/><text class="il-txt" x="172" y="106">próstata</text>
    <path class="fino fraco" d="M144 44H150"/><text class="il-txt" x="174" y="48">bexiga</text>`,

  bigode: () => `
    ${cabeca(100, 74, 46, { cabelo: 'c-cabelo' })}
    <g class="an-balancar rv" style="transform-origin:100px 86px"><path class="c-cabelo" d="M100 82C92 74 80 76 72 84C66 90 56 88 54 82C56 94 70 98 82 92C90 88 96 86 100 88C104 86 110 88 118 92C130 98 144 94 146 82C144 88 134 90 128 84C120 76 108 74 100 82Z"/></g>
    <g class="an-flutuar"><path class="c-azul" d="M172 40C162 30 160 20 164 14C167 9 170 8 172 8C174 8 177 9 180 14C184 20 182 30 172 40ZM168 34L160 52M176 34L184 52"/></g>
    ${estrela(28, 30, 6, 'c-sol', 'an-piscar')}${estrela(176, 126, 5, 'c-sol', 'an-piscar d2')}`,

  // ---------- Cancro da pele ----------
  'sinal-pele': () => `
    <rect class="c-pele" x="10" y="18" width="180" height="114" rx="18"/>
    <circle class="c-castanho sem" cx="44" cy="48" r="5"/><circle class="c-castanho sem" cx="160" cy="108" r="4"/><circle class="c-castanho sem" cx="62" cy="92" r="3.5"/>
    <path class="c-escuro sem" d="M104 64c8 -6 18 -2 20 6c4 10 -4 12 -2 20c2 8 -10 12 -16 6c-6 -6 -14 -2 -14 -12c0 -10 6 -14 12 -20Z"/>
    <circle class="c-castanho sem" cx="112" cy="76" r="5"/><circle class="c-vermelho-e sem" cx="104" cy="88" r="3"/>
    <g class="an-lupa"><circle class="c-vidro grosso" cx="110" cy="78" r="26"/><path class="muito-grosso" d="M129 97L150 118"/></g>
    <text class="il-txt" x="54" y="124">A B C D E</text>`,

  protetor: () => `
    <g class="an-girar rv" style="transform-origin:44px 40px">
      <path class="t-sol grosso" d="M44 10V18M44 62V70M14 40H22M66 40H74M23 19L28 24M60 56L65 61M23 61L28 56M60 24L65 19"/>
    </g>
    <circle class="c-sol" cx="44" cy="40" r="16"/>
    ${cara(44, 40, 13)}
    <rect class="c-branco" x="90" y="46" width="40" height="80" rx="10"/>
    <rect class="c-coral" x="98" y="30" width="24" height="18" rx="4"/>
    <text class="il-txt" x="110" y="86">FPS</text><text class="il-num" x="110" y="110">50</text>
    <g class="an-gotejar"><path class="c-branco" d="M110 14c0 0 -5 7 -5 10a5 5 0 0 0 10 0c0 -3 -5 -10 -5 -10Z"/></g>
    <path class="c-sol" d="M156 118Q158 96 170 96Q182 96 184 118Z"/>
    <path class="c-sol-s" d="M138 120Q170 110 200 120Q194 130 170 130Q146 130 138 120Z"/>
    ${estrela(170, 40, 5, 'c-sol', 'an-piscar d2')}`,

  // ---------- Ansiedade ----------
  'respirar-calmo': () => {
    const p = pessoa(100, 32, { humor: 'dormir', cor: 'c-cor' });
    return `<g class="an-respirar-lento"><circle class="c-suave" cx="100" cy="70" r="58"/></g>
      ${p.svg}
      <path class="an-subir fino t-cor" d="M124 46q6 -4 12 0t12 0"/><path class="an-subir d3 fino t-cor" d="M126 58q6 -4 12 0t12 0"/>
      <text class="il-txt" x="100" y="144">inspirar 4 · expirar 6</text>`;
  },

  pensamentos: () => `
    ${cabeca(68, 106, 30, { humor: 'triste' })}
    <circle class="c-branco" cx="102" cy="78" r="4"/><circle class="c-branco" cx="112" cy="64" r="6"/>
    <g transform="translate(80 -38)"><path class="c-nuvem" d="M34 100H114A20 20 0 0 0 110 61A28 28 0 0 0 58 56A20 20 0 0 0 34 100Z"/></g>
    <g class="an-tremer"><path class="t-coral fino" d="M134 30c8 -14 20 4 10 10s-18 -10 -2 -14s20 10 8 14s-14 -8 0 -10s14 6 18 0"/></g>
    <text class="il-txt" x="156" y="56">e se…?</text>
    <g class="an-bater">${coracaoPeq(28, 40, 9)}</g>`,

  // ---------- Doença de Parkinson ----------
  'mao-tremor': () => `
    <path class="an-piscar fino" d="M46 40q-6 8 0 16M36 34q-10 14 0 28M156 40q6 8 0 16M166 34q10 14 0 28"/>
    <path class="c-cor" d="M82 116H124V150H82Z"/>
    <g class="an-tremer">
      <rect class="c-pele" x="80" y="26" width="11" height="52" rx="5.5"/>
      <rect class="c-pele" x="93" y="16" width="11" height="60" rx="5.5"/>
      <rect class="c-pele" x="106" y="20" width="11" height="56" rx="5.5"/>
      <rect class="c-pele" x="119" y="32" width="10" height="46" rx="5"/>
      <path class="c-pele" d="M84 100Q64 96 60 80Q58 72 64 72Q70 72 74 82Q78 90 84 88Z"/>
      <rect class="c-pele" x="78" y="64" width="52" height="56" rx="16"/>
    </g>`,

  // ---------- Lombalgia ----------
  coluna: () => {
    const desvio = [0, 4, 7, 8, 7, 4, 0, -4, -7, -8];
    let ossos = '';
    desvio.forEach((dx, i) => {
      const w = 26 + i * 1.8;
      const y = 12 + i * 12;
      if (i) ossos += `<ellipse class="c-azul-s fino" cx="${100 + dx}" cy="${y - 1.5}" rx="${n(w / 2 - 3)}" ry="2"/>`;
      ossos += `<rect class="c-branco" x="${n(100 + dx - w / 2)}" y="${y}" width="${n(w)}" height="9" rx="3"/>`;
    });
    return `${ossos}
      <path class="c-branco" d="M62 138Q100 126 138 138L128 148H72Z"/>
      <g class="an-piscar-lento"><ellipse class="c-zona" cx="94" cy="110" rx="30" ry="20"/></g>
      <g class="an-piscar"><path class="t-coral grosso" d="M52 100l-10 -5M50 112h-12M52 124l-10 5M140 100l10 -5M142 112h12M140 124l10 5"/></g>`;
  },

  'levantar-peso': () => `
    <path class="fraco" d="M40 132H160"/>
    <path d="M93 92L80 110L90 128M107 92L120 110L110 128"/>
    <path class="c-cor" d="M86 94V66Q86 56 100 56Q114 56 114 66V94Z"/>
    ${cabeca(100, 40, 14)}
    <g class="an-flutuar">
      <rect class="c-pao" x="78" y="76" width="44" height="30" rx="3"/>
      <path class="fino fraco" d="M78 88H122"/>
      <path d="M87 64L80 84M113 64L120 84"/>
      <circle class="c-pele" cx="80" cy="86" r="4"/><circle class="c-pele" cx="120" cy="86" r="4"/>
    </g>
    <g class="an-pulsar"><circle class="c-verde" cx="160" cy="36" r="15"/><path class="t-branco grosso" d="M153 36l5 5 9 -10"/></g>`,

  // ---------- Infeções (gripe, constipação, COVID-19, varicela, sarampo) ----------
  virus: () => {
    let picos = '';
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      const ponta = (r) => `${n(100 + Math.cos(a) * r)} ${n(72 + Math.sin(a) * r)}`;
      const [px, py] = ponta(54).split(' ');
      picos += `<path class="grosso" d="M${ponta(38)}L${ponta(50)}"/><circle class="c-coral" cx="${px}" cy="${py}" r="5"/>`;
    }
    return `<g class="an-girar rv" style="transform-origin:100px 72px">${picos}</g>
      <circle class="c-coral-s" cx="100" cy="72" r="40"/>
      <circle class="c-coral sem" cx="74" cy="56" r="4"/><circle class="c-coral sem" cx="128" cy="92" r="5"/><circle class="c-coral sem" cx="122" cy="50" r="3"/>
      ${cara(100, 76, 26, 'neutro')}
      <g class="an-flutuar"><circle class="c-azul-s" cx="26" cy="30" r="6"/></g>
      <g class="an-flutuar d2"><circle class="c-azul-s" cx="178" cy="122" r="5"/></g>
      <g class="an-flutuar d1"><circle class="c-azul-s" cx="172" cy="24" r="4"/></g>`;
  },

  lenco: () => {
    const p = pessoa(84, 26, { humor: 'doente', bracos: 'nenhum', cor: 'c-azul-s' });
    const [ox, oy] = p.ombroD;
    return `${p.svg}
      <path d="M${n(p.ombroE[0])} ${n(p.ombroE[1])}l-7 24"/>${p.mao(p.ombroE[0] - 7, p.ombroE[1] + 24)}
      <circle class="c-vermelho sem" cx="84" cy="${n(p.cy + 2)}" r="3.5"/>
      <path d="M${n(ox)} ${n(oy)}Q${n(ox + 16)} ${n(oy - 2)} 104 ${n(p.cy + 12)}"/>${p.mao(104, p.cy + 12)}
      <g class="an-tremer"><path class="c-branco" d="M86 ${n(p.cy - 4)}L108 ${n(p.cy - 8)}L112 ${n(p.cy + 12)}L90 ${n(p.cy + 16)}Z"/></g>
      <g class="an-piscar"><text class="il-txt" x="154" y="34">atchim!</text></g>
      <path class="an-piscar d2 fino fraco" d="M124 50l8 -4M126 60h10M124 70l8 4"/>`;
  },

  borbulhas: () => {
    const pinta = (x, y, r, atraso) =>
      `<g class="an-pulsar ${atraso}"><circle class="c-vermelho" cx="${x}" cy="${y}" r="${r}"/><circle class="c-coral-s sem" cx="${n(x - r * 0.3)}" cy="${n(y - r * 0.3)}" r="${n(r * 0.35)}"/></g>`;
    return `${cabeca(82, 78, 46, { humor: 'neutro' })}
      ${pinta(54, 92, 4.5, '')}${pinta(110, 94, 4.5, 'd2')}${pinta(64, 110, 4, 'd1')}${pinta(100, 112, 4, 'd3')}${pinta(82, 118, 3, 'd2')}
      <rect class="c-pele" x="148" y="54" width="24" height="96" rx="12"/>
      ${pinta(158, 76, 4, 'd1')}${pinta(164, 100, 4.5, '')}${pinta(156, 124, 3.5, 'd3')}
      <g class="an-piscar"><path class="t-coral grosso" d="M182 84l10 -6M184 98h12M182 112l10 6"/></g>`;
  },

  mascara: () => `
    ${cabeca(100, 74, 46, { humor: 'feliz' })}
    <path class="grosso" d="M58 82Q50 70 56 62M142 82Q150 70 144 62"/>
    <path class="c-azul-s" d="M62 78Q100 68 138 78V100Q100 124 62 100Z"/>
    <path class="fino fraco" d="M68 86Q100 78 132 86M70 96Q100 108 130 96"/>
    <g class="an-flutuar">${germe(24, 40, 7)}</g>
    <g class="an-flutuar d2">${germe(178, 112, 6, 'c-verde')}</g>
    ${estrela(170, 30, 6, 'c-sol', 'an-piscar')}`,
};

export function ilustracao(nome) {
  const desenhar = ILUSTRACOES[nome];
  if (!desenhar) throw new Error(`Ilustração desconhecida: ${nome}`);
  return `<svg class="il" viewBox="0 0 200 150" aria-hidden="true" focusable="false">${desenhar()}</svg>`;
}

// ---------- Miniaturas animadas no canto dos cartões de doenças ----------
// O mesmo traço das ilustrações dos cartões das ferramentas (.tool-deco.mini,
// em 120×90, a cor atual): as animações vivem em styles.css (classes «deco-*»).

function adnMini() {
  const onda = (y) => Math.sin(((y - 6) / 78) * Math.PI * 2);
  const A = [];
  const B = [];
  for (let y = 6; y <= 84; y += 3) {
    A.push(`${n(60 + 18 * onda(y))} ${y}`);
    B.push(`${n(60 - 18 * onda(y))} ${y}`);
  }
  let degraus = '';
  let i = 0;
  for (let y = 12; y <= 80; y += 8, i++) {
    const f = onda(y);
    if (Math.abs(f) > 0.2) degraus += `<path class="d-degrau d-p${(i % 5) + 1}" d="M${n(60 + 16 * f)} ${y}H${n(60 - 16 * f)}"/>`;
  }
  return `${degraus}<path d="M${A.join('L')}"/><path d="M${B.join('L')}"/>`;
}

// Vírus com espículas (gripe, COVID-19, constipação).
function virusMini() {
  let picos = '';
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const x = (r) => n(60 + Math.cos(a) * r);
    const y = (r) => n(45 + Math.sin(a) * r);
    picos += `<path d="M${x(20)} ${y(20)}L${x(30)} ${y(30)}"/><circle class="d-cheio" cx="${x(32)}" cy="${y(32)}" r="3"/>`;
  }
  return `<g class="d-virus"><circle class="d-cheio-suave" cx="60" cy="45" r="20"/>${picos}</g>`;
}

// Eletrocardiograma irregular (fibrilhação auricular) da miniatura.
const RITMO = 'M6 50q3 -2 6 0t6 0l3 -22l4 32l3 -10q3 -2 6 0t6 0t6 0l3 -22l4 32l3 -10q3 -2 6 0l3 -22l4 32l3 -10q3 -2 6 0t6 0l3 -22l4 32l3 -10q3 -2 6 0';

const MINI = {
  gota: `
      <path class="d-gota" d="M60 6C60 6 46 26 46 36A14 14 0 0 0 74 36C74 26 60 6 60 6Z"/>
      <ellipse class="d-onda" cx="60" cy="80" rx="26" ry="6"/>
      <ellipse class="d-onda d-onda2" cx="60" cy="80" rx="26" ry="6"/>`,
  laco: `
      <g class="d-laco">
        <path d="M54 44L38 84M66 44L82 84"/>
        <path class="d-cheio-suave" d="M60 50C48 38 44 26 47 18C50 10 56 7 60 7C64 7 70 10 73 18C76 26 72 38 60 50Z"/>
      </g>`,
  manometro: `
      <path d="M18 72A42 42 0 0 1 102 72"/>
      <path class="d-fraco" d="M30 72A30 30 0 0 1 90 72"/>
      <path class="d-ponteiro" d="M60 72L60 40"/>
      <circle class="d-cheio" cx="60" cy="72" r="5"/>`,
  joelho: `
      <path class="d-osso" d="M30 28H56"/>
      <circle class="d-cheio" cx="66" cy="28" r="8"/>
      <g class="d-perna"><path class="d-osso" d="M66 40V78"/><path d="M66 82H82"/></g>`,
  nuvem: `
      <g class="d-raios"><path d="M92 6V12M92 44V50M70 28H76M108 28H114M77 13L81 17M103 39L107 43M77 43L81 39M103 17L107 13"/></g>
      <circle cx="92" cy="28" r="10"/>
      <path class="d-cheio-suave" d="M14 62H70A13 13 0 0 0 66 37A18 18 0 0 0 32 34A13 13 0 0 0 14 62Z"/>
      <path class="d-chuva" d="M26 70v8"/><path class="d-chuva d-chuva2" d="M42 70v8"/><path class="d-chuva d-chuva3" d="M58 70v8"/>`,
  arteria: `
      <path d="M20 26H116M20 66H116"/>
      <path class="d-cheio-suave" d="M44 26Q60 40 76 26ZM50 66Q64 56 80 66Z"/>
      <circle class="d-glob d-cheio" cx="22" cy="46" r="5"/>
      <circle class="d-glob d-glob2 d-cheio" cx="22" cy="46" r="4"/>
      <circle class="d-glob d-glob3 d-cheio" cx="22" cy="46" r="5"/>`,
  braco: `
      <path class="d-membro" d="M10 70H62L84 30"/>
      <circle class="d-cheio" cx="88" cy="22" r="8"/>
      <path class="d-biceps d-cheio-suave" d="M24 66Q40 40 58 66"/>`,
  pulmoes: `
      <g class="d-respirar">
        <path d="M60 6V34M60 34L50 44M60 34L70 44"/>
        <path d="M52 28C38 22 22 36 20 58C18 74 30 82 44 78C52 76 54 68 54 60V40Z"/>
        <path d="M68 28C82 22 98 36 100 58C102 74 90 82 76 78C68 76 66 68 66 60V40Z"/>
      </g>
      <g class="d-germe"><circle cx="106" cy="16" r="5"/><path d="M106 7v3M106 22v3M97 16h3M112 16h3"/></g>`,
  cerebro: `
      <path class="d-cheio-suave" d="${escalar(CEREBRO, 0.58, 1.4, 4.8)}"/>
      <path d="M60 88V72M60 72Q66 64 72 56"/>
      <circle class="d-alerta d-cheio" cx="72" cy="56" r="5"/>
      <circle class="d-alerta-onda" cx="72" cy="56" r="9"/>`,
  estomago: `
      <path d="M46 4Q46 14 50 22"/>
      <g class="d-mexer"><path class="d-cheio-suave" d="${escalar(ESTOMAGO, 0.62, -2, -6)}"/></g>
      <path d="M90 42Q100 42 102 50Q103 58 98 62"/>`,
  intestino: `
      <path class="d-fraco" d="M46 28H72Q78 28 78 34Q78 40 72 40H50Q44 40 44 46Q44 52 50 52H72"/>
      <path class="d-fraco" d="M36 78V22Q36 12 46 12H74Q84 12 84 22V68Q84 78 74 79L64 80"/>
      <path class="d-linha" d="M36 78V22Q36 12 46 12H74Q84 12 84 22V68Q84 78 74 79L64 80" pathLength="1"/>`,
  adn: adnMini(),
  inalador: `
      <rect class="d-lata" x="40" y="6" width="16" height="44" rx="4"/>
      <path class="d-cheio-suave" d="M36 30H60V66H84V82H36Z"/>
      <circle class="d-sopro" cx="94" cy="74" r="6"/><circle class="d-sopro d-sopro2" cx="104" cy="68" r="5"/><circle class="d-sopro d-sopro3" cx="102" cy="82" r="4"/>`,
  mancha: `
      <path d="M60 6V34M60 34L50 44M60 34L70 44"/>
      <path d="M52 28C38 22 22 36 20 58C18 74 30 82 44 78C52 76 54 68 54 60V40Z"/>
      <path d="M68 28C82 22 98 36 100 58C102 74 90 82 76 78C68 76 66 68 66 60V40Z"/>
      <circle class="d-alerta d-cheio" cx="84" cy="56" r="5"/>
      <circle class="d-alerta-onda" cx="84" cy="56" r="10"/>`,
  figado: `
      <path class="d-cheio-suave" d="${escalar(FIGADO, 0.62, -10, 2)}"/>
      <path class="d-engrenagem" d="${contornoEngrenagem(76, 42, 10)}"/>`,
  bicicleta: `
      <circle cx="30" cy="62" r="18"/><circle cx="92" cy="62" r="18"/>
      <path class="d-raios" d="M30 46V78M14 62H46"/><path class="d-raios" d="M92 46V78M76 62H108"/>
      <path d="M30 62L46 38H78L92 62M46 38L58 62L78 38M30 62H58M46 38V32M40 32H52M78 38L76 28M70 28H82"/>`,
  osso: `
      <path class="d-cheio-suave" d="M32 38H88A11 11 0 1 1 100 45A11 11 0 1 1 88 52H32A11 11 0 1 1 20 45A11 11 0 1 1 32 38Z"/>
      <circle class="d-furo" cx="48" cy="45" r="3"/><circle class="d-furo d-furo2" cx="62" cy="44" r="2.5"/><circle class="d-furo d-furo3" cx="76" cy="46" r="3"/>`,
  puzzle: `
      <path d="${pecaPuzzle(30, 30, 26)}"/>
      <path d="${pecaPuzzle(56, 30, 26)}"/>
      <path d="${pecaPuzzle(30, 56, 26)}"/>
      <path class="d-peca d-cheio-suave" d="${pecaPuzzle(56, 56, 26)}"/>`,
  bacilo: `
      <rect class="d-bac d-cheio-suave" x="30" y="24" width="26" height="10" rx="5"/>
      <rect class="d-bac d-bac2 d-cheio-suave" x="66" y="44" width="26" height="10" rx="5"/>
      <rect class="d-bac d-bac3 d-cheio-suave" x="38" y="62" width="22" height="9" rx="4.5"/>`,
  bronquio: `
      <circle cx="60" cy="45" r="36"/>
      <circle class="d-fraco" cx="60" cy="45" r="28"/>
      <circle class="d-lumen d-cheio-suave" cx="60" cy="45" r="20"/>`,
  enfarte: `
      <path class="d-bat d-cheio-suave" d="${escalar(CORACAO, 0.62, -2, -10)}"/>
      <circle class="d-alerta d-cheio" cx="46" cy="40" r="5"/>
      <circle class="d-alerta-onda" cx="46" cy="40" r="10"/>`,
  ritmo: `
      <path class="d-fraco" d="${RITMO}"/>
      <path class="d-linha" d="${RITMO}" pathLength="1"/>`,
  bateria: `
      <rect x="18" y="26" width="78" height="40" rx="7"/>
      <path d="M102 38V54"/>
      <rect class="d-nivel d-cheio" x="26" y="34" width="62" height="24" rx="3"/>`,
  rim: `
      <path class="d-cheio-suave" d="M52 8C32 8 22 26 22 44C22 64 34 80 52 80C64 80 68 72 64 62C60 54 60 38 64 30C68 18 64 8 52 8Z"/>
      <path d="M64 46Q80 50 84 62"/>
      <path class="d-gota-r d-cheio" d="M90 40C90 40 84 48 84 52A6 6 0 0 0 96 52C96 48 90 40 90 40Z"/>`,
  bigode: `
      <path class="d-bigode d-cheio" d="${escalar('M100 82C92 74 80 76 72 84C66 90 56 88 54 82C56 94 70 98 82 92C90 88 96 86 100 88C104 86 110 88 118 92C130 98 144 94 146 82C144 88 134 90 128 84C120 76 108 74 100 82Z', 1.1, -50, -50)}"/>`,
  sol: `
      <g class="d-raios"><path d="M60 6V16M60 74V84M21 45H31M89 45H99M32 17L39 24M81 66L88 73M32 73L39 66M81 24L88 17"/></g>
      <circle class="d-cheio-suave" cx="60" cy="45" r="18"/>`,
  respiro: `
      <circle class="d-fraco" cx="60" cy="45" r="38"/>
      <circle class="d-bola d-cheio-suave" cx="60" cy="45" r="30"/>
      <circle class="d-cheio" cx="60" cy="45" r="4"/>`,
  mao: `
      <g class="d-tremer">
        <path d="M44 82V50M44 50V16M56 50V8M68 50V12M80 54V24M44 50Q32 42 28 52L44 70M44 82H80V54"/>
      </g>
      <path class="d-fraco" d="M18 20q-6 8 0 16M102 20q6 8 0 16"/>`,
  coluna: `
      <rect x="44" y="4" width="26" height="9" rx="3"/>
      <rect x="47" y="17" width="28" height="9" rx="3"/>
      <rect x="49" y="30" width="30" height="9" rx="3"/>
      <rect x="47" y="43" width="32" height="10" rx="3"/>
      <rect x="42" y="57" width="34" height="10" rx="3"/>
      <rect x="37" y="71" width="36" height="11" rx="3"/>
      <circle class="d-alerta d-cheio" cx="88" cy="70" r="5"/>
      <circle class="d-alerta-onda" cx="88" cy="70" r="10"/>`,
  virus: virusMini(),
  pintas: `
      <circle cx="60" cy="45" r="36"/>
      <circle class="d-pinta d-cheio" cx="44" cy="30" r="4"/>
      <circle class="d-pinta d-p2 d-cheio" cx="76" cy="28" r="3.5"/>
      <circle class="d-pinta d-p3 d-cheio" cx="40" cy="58" r="3.5"/>
      <circle class="d-pinta d-p2 d-cheio" cx="80" cy="60" r="4"/>
      <circle class="d-pinta d-cheio" cx="60" cy="70" r="3"/>
      <circle class="d-pinta d-p3 d-cheio" cx="62" cy="44" r="3"/>`,
};

export const MINIATURAS = Object.keys(MINI);

export function miniatura(nome) {
  if (!MINI[nome]) throw new Error(`Miniatura desconhecida: ${nome}`);
  return `<svg class="tool-deco mini deco-${nome}" viewBox="0 0 120 90" aria-hidden="true">${MINI[nome]}</svg>`;
}
