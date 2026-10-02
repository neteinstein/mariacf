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

export const ILUSTRACOES = {
  coracao: () => `
    <path class="an-fluir fraco" stroke-dasharray="4 10" d="M8 76H44M156 76H192"/>
    <g class="an-bater">
      <path class="c-coral" d="M100 128C58 102 40 78 50 54C60 32 88 32 100 52C112 32 140 32 150 54C160 78 142 102 100 128Z"/>
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

  pes: () => {
    const pe = (dx) => `
      <path class="c-pele" d="M${70 + dx} 136C${56 + dx} 136 ${54 + dx} 112 ${56 + dx} 92C${58 + dx} 68 ${62 + dx} 50 ${76 + dx} 50C${90 + dx} 50 ${92 + dx} 70 ${90 + dx} 92C${88 + dx} 112 ${86 + dx} 136 ${70 + dx} 136Z"/>
      <circle class="c-pele" cx="${64 + dx}" cy="44" r="5"/><circle class="c-pele" cx="${73 + dx}" cy="38" r="4.5"/><circle class="c-pele" cx="${81 + dx}" cy="38" r="4"/><circle class="c-pele" cx="${88 + dx}" cy="42" r="3.5"/>`;
    return `${pe(0)}<g transform="translate(200 0) scale(-1 1)">${pe(0)}</g>
      <g class="an-lupa"><circle class="c-vidro grosso" cx="100" cy="86" r="22"/><path class="muito-grosso" d="M116 102L134 120"/></g>`;
  },

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
};

export function ilustracao(nome) {
  const desenhar = ILUSTRACOES[nome];
  if (!desenhar) throw new Error(`Ilustração desconhecida: ${nome}`);
  return `<svg class="il" viewBox="0 0 200 150" aria-hidden="true" focusable="false">${desenhar()}</svg>`;
}
