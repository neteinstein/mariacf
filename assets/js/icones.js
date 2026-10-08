// Ícones de linha (SVG) dos cartões de doenças e de ferramentas.
// Desenhados numa grelha de 24×24, só com traço em «currentColor», para
// herdarem a cor do cartão no tema claro e no escuro. Sem DOM: a página de
// ferramentas tem os mesmos SVG escritos no HTML (testado em tests/icones.test.mjs).

const coracao =
  '<path d="M12 20.5 4.6 13.2A4.9 4.9 0 0 1 12 6.6a4.9 4.9 0 0 1 7.4 6.6z"/>';
const figado =
  '<path d="M3 9.5C3 7 5 6 8 6h10.5C20 6 21 7 21 8.5c0 3.2-4.2 6.6-9.5 10-1.8 1.1-3.6.4-4.6-1.1C5.2 15 3 12.6 3 9.5z"/><path d="M13 6c-.5 2.5-.3 5 1 7.5"/>';
const pulmoes =
  '<path d="M12 3v8M12 11c-.7 1-1.5 1.5-2.5 1.5M12 11c.7 1 1.5 1.5 2.5 1.5"/><path d="M9 6.5C6.5 6.5 4 10.5 4 16.5c0 2 .9 3 2.4 3 2 0 3.6-1.2 3.6-3.3V8a1.5 1.5 0 0 0-1-1.5z"/><path d="M15 6.5c2.5 0 5 4 5 10 0 2-.9 3-2.4 3-2 0-3.6-1.2-3.6-3.3V8a1.5 1.5 0 0 1 1-1.5z"/>';
const estomago =
  '<path d="M9 2.5v4c0 2-3 3.3-3 7.5a6.5 6.5 0 0 0 6.5 6.5c3 0 5.3-1.6 6.2-4 .8-2.3-.6-4.5-2.7-4.5-1.6 0-2.3 1-3.5 1S11 8.8 11 6.5v-4"/><path d="M12.5 20.5v1.5"/>';
const laco =
  '<path d="M12 11c-2.6-2.9-3.6-4.6-3-6.2.5-1.3 1.7-2 3-2s2.5.7 3 2c.6 1.6-.4 3.3-3 6.2z"/><path d="M10.4 9 6 20.5l2.8-.9 1.2 2.4 4.4-11.6M13.6 9 18 20.5l-2.8-.9-1.2 2.4-4.4-11.6"/>';
const mao =
  '<path d="M8 14V6.5a1.5 1.5 0 0 1 3 0V12M11 11.5V4.5a1.5 1.5 0 0 1 3 0V12M14 12V6.5a1.5 1.5 0 0 1 3 0V13"/><path d="M17 12.5V9.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.6a6 6 0 0 1-5-2.7l-2.8-4.2a1.5 1.5 0 0 1 2.4-1.8L8 14"/>';
const cara = '<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01"/>';
const virus =
  '<circle cx="12" cy="12" r="5"/><path d="M12 7V3.5M12 17v3.5M7 12H3.5M17 12h3.5M8.5 8.5 6 6M15.5 15.5 18 18M15.5 8.5 18 6M8.5 15.5 6 18"/><path d="M10.5 11h.01M13.5 13.5h.01"/>';
const rim =
  '<path d="M15.5 3.5c-3.5 0-6.5 3.5-6.5 8.5s3 8.5 6.5 8.5c2.6 0 4.5-1.9 4.5-4.4 0-2-1.6-3-3-4.1 1.4-1.1 3-2.1 3-4.1 0-2.5-1.9-4.4-4.5-4.4z"/><path d="M9.3 12H7a2 2 0 0 0-2 2v7"/>';
const gota = '<path d="M12 2.8c-3.3 4-5.5 7.3-5.5 10.2a5.5 5.5 0 0 0 11 0c0-2.9-2.2-6.2-5.5-10.2z"/>';
const osso =
  '<path d="M17 10c.7-.7 1.7 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .8.7 1.8 0 2.5l-7 7c-.7.7-1.7 0-2.5 0a2.5 2.5 0 0 0 0 5c.3 0 .5.2.5.5a2.5 2.5 0 1 0 5 0c0-.8-.7-1.8 0-2.5z"/>';

export const ICONES = {
  // Doenças
  glucometro:
    '<rect x="6" y="2.5" width="12" height="19" rx="3"/><rect x="8.8" y="5.5" width="6.4" height="4.2" rx="1"/><path d="M12 12.6c-1.2 1.5-1.9 2.6-1.9 3.4a1.9 1.9 0 0 0 3.8 0c0-.8-.7-1.9-1.9-3.4z"/>',
  laco,
  tensiometro:
    '<circle cx="10" cy="10" r="6.5"/><path d="M10 10l3-2.5M10 5.5v1M5.5 10h1M14.5 10h-1"/><path d="M14.6 14.6 17 17"/><rect x="16.5" y="16.5" width="4.5" height="5" rx="2.2"/>',
  articulacao:
    '<path d="M9 2v7.5a3 3 0 0 0 6 0V2M9 22v-6.5a3 3 0 0 1 6 0V22"/><path d="M4 12h2M18 12h2M5 8.5l1.5 1M19 8.5l-1.5 1"/>',
  nuvem:
    '<path d="M7 15a4 4 0 1 1 .8-7.9A5 5 0 0 1 17.4 8 3.5 3.5 0 0 1 17.5 15z"/><path d="M8.5 18 7.5 20.5M12.5 18l-1 2.5M16.5 18l-1 2.5"/>',
  arteria: '<path d="M3 7.5h18M3 16.5h18"/><path d="M7 16.5c0-3 2.2-4.5 5-4.5s5 1.5 5 4.5"/><path d="M10 14.5h.01M13.5 14h.01"/>',
  haltere: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
  pulmoes,
  pulmoesInfecao: `${pulmoes}<path d="M6.5 14.5h.01M7.5 11.5h.01M17 13.5h.01"/>`,
  cerebro:
    '<path d="M12 5a3 3 0 0 0-5.7 1.3A3.2 3.2 0 0 0 4 10a3 3 0 0 0 1.1 4.6A3.2 3.2 0 0 0 8.2 19a3 3 0 0 0 3.8.4z"/><path d="M12 5a3 3 0 0 1 5.7 1.3A3.2 3.2 0 0 1 20 10a3 3 0 0 1-1.1 4.6 3.2 3.2 0 0 1-3.1 4.4 3 3 0 0 1-3.8.4z"/><path d="M12 5v14.4M8 9.5a2 2 0 0 1 2 1.5M16 9.5a2 2 0 0 0-2 1.5"/>',
  estomago,
  intestino:
    '<path d="M5 21V7.5A3.5 3.5 0 0 1 8.5 4h7A3.5 3.5 0 0 1 19 7.5v9a3.5 3.5 0 0 1-3.5 3.5H13"/><path d="M9 8h6M9 8a2 2 0 0 0 0 4h6a2 2 0 0 1 0 4h-5"/>',
  pe:
    '<path d="M9.5 21C7 21 5.5 18.8 5.5 15.5c0-4 1.6-7.5 4.4-7.5 2.6 0 3.6 2.5 3.6 5.5 0 3.3-1.3 7.5-4 7.5z"/><path d="M9 4.5h.01M12 3.5h.01M14.8 4.8h.01M16.5 7.5h.01"/><path d="M17 15.5l2.5-.5M16.5 19l2.5 1"/>',
  proibidoFumar:
    '<circle cx="12" cy="12" r="9.5"/><path d="M5.3 5.3 18.7 18.7"/><path d="M6.5 13h8.5v2.5H6.5zM17 13v2.5M17.5 9.5c0-1.2 1.5-1.3 1.5-2.5"/>',
  radiografia: `<rect x="2.5" y="3" width="19" height="18" rx="2.5"/><g transform="translate(4.2 4.2) scale(.65)">${pulmoes}</g>`,
  figado,
  maca:
    '<path d="M12 7.5c-1-1.4-3-1.9-4.6-1.3C5 7 4 9.6 4.5 12.6c.6 3.9 3 7.9 5.4 7.9 1 0 1.4-.5 2.1-.5s1.1.5 2.1.5c2.4 0 4.8-4 5.4-7.9.5-3-.5-5.6-2.9-6.4-1.6-.6-3.6-.1-4.6 1.3z"/><path d="M12 7.5c0-2 .8-3.6 2.8-4.5"/>',
  osso,
  puzzle:
    '<path d="M4 8h3.5a2 2 0 1 1 4 0H15v3.5a2 2 0 1 1 0 4V19h-3.5a2 2 0 1 0-4 0H4v-3.5a2 2 0 1 0 0-4z"/>',
  bacterias:
    '<rect x="3" y="5" width="10" height="5" rx="2.5" transform="rotate(-20 8 7.5)"/><rect x="11" y="10" width="10" height="5" rx="2.5" transform="rotate(25 16 12.5)"/><rect x="4" y="15" width="8" height="4.5" rx="2.25"/><path d="M6.5 8h.01M15 12.5h.01M7.5 17.2h.01"/>',
  inalador:
    '<path d="M9 9h7v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h4z"/><path d="M10.5 9V3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V9"/><path d="M2 12.5h.01M3.5 10h.01"/>',
  coracaoPartido: `${coracao}<path d="M12 6.6 10.6 10l2.6 2-1.8 3.6"/>`,
  ecg: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M5 12h2l1-2.5 1.5 5 1-3.5 1 1.5 1.3-4 1.4 6.5 1-3h3.8"/>',
  coracaoFraco: `${coracao}<path d="M12 9.5v5M9.8 12.5 12 14.7l2.2-2.2"/>`,
  rim,
  masculino: '<circle cx="10" cy="14" r="6"/><path d="M14.3 9.7 20 4M15 4h5v5"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  espiral: '<path d="M12 12a1.5 1.5 0 1 1 1.5 1.5A3 3 0 0 1 10.5 10.5 4.5 4.5 0 0 1 15 6a6 6 0 0 1 6 6 7.5 7.5 0 0 1-7.5 7.5A9 9 0 0 1 4.5 10.5"/>',
  maoTremor: `${mao}<path d="M3 5.5 4.5 7M2.5 9.5h2M6 2.5l.8 1.8"/>`,
  coluna:
    '<rect x="8.5" y="2" width="7" height="3.6" rx="1.2"/><rect x="9.2" y="7.2" width="7" height="3.6" rx="1.2"/><rect x="8.5" y="12.4" width="7" height="3.6" rx="1.2"/><rect x="7.8" y="17.6" width="7" height="3.6" rx="1.2"/><path d="M4 9.5l1.5 1M4 14.5l1.5-1M20 13l-1.5.5"/>',
  termometro:
    '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7.5"/><path d="M17.5 5h2M17.5 8h1.5M17.5 11h2"/>',
  lencos:
    '<path d="M4 12h16v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20z"/><path d="M9 12c0-3 .8-5.5 3-8.5 1 2.2 3 3.5 3 8.5"/><path d="M4 16h16"/>',
  mascara:
    '<path d="M5 8.5c4.5-1.5 9.5-1.5 14 0v5c0 3-3.3 5.5-7 5.5s-7-2.5-7-5.5z"/><path d="M5 10H3.5a1.5 1.5 0 0 0 0 4c.6 0 1.1-.1 1.6-.3M19 10h1.5a1.5 1.5 0 0 1 0 4c-.6 0-1.1-.1-1.6-.3"/><path d="M8.5 11.5h7M8.5 14.5h7"/>',
  estomagoNausea: `${estomago}<path d="M19.5 4.5c-1 .7-1 1.5 0 2.2s1 1.5 0 2.2"/>`,
  bolhas:
    '<circle cx="7" cy="8" r="3"/><circle cx="16.5" cy="7" r="2.2"/><circle cx="14" cy="16" r="3.5"/><circle cx="6" cy="17" r="1.8"/><path d="M7 8h.01M16.5 7h.01M14 16h.01"/>',
  caraManchas: `${cara}<path d="M9 15.5c1.8 1.2 4.2 1.2 6 0"/><path d="M6.5 13.5h.01M17.5 13.5h.01M7.5 6h.01M16 5.5h.01M12 4.5h.01M5.5 9.5h.01M18.5 9.5h.01"/>`,
  maoManchas: `${mao}<path d="M11.5 16h.01M14.5 17h.01M13 18.8h.01"/>`,
  boca: `${cara}<ellipse cx="12" cy="15.5" rx="3" ry="2.5"/><path d="M12 13v1.3"/>`,
  morango:
    '<path d="M12 7.5c4.5 0 7.5 1.5 7.5 4.5 0 4.5-4.5 9-7.5 9s-7.5-4.5-7.5-9c0-3 3-4.5 7.5-4.5z"/><path d="M8.5 5.5c1.2.5 2.4.6 3.5 0 1.1.6 2.3.5 3.5 0M12 5.5V3"/><path d="M9 12h.01M15 12h.01M12 14.5h.01M10 17h.01M14 17h.01"/>',
  figadoVirus: `${figado}<circle cx="18.5" cy="18.5" r="2.5"/><path d="M18.5 15v1M18.5 21v1M15 18.5h1M21 18.5h1"/>`,
  escudo: '<path d="M12 2.5 4.5 5.5v6c0 4.6 3.2 8.4 7.5 10 4.3-1.6 7.5-5.4 7.5-10v-6z"/><path d="m8.8 12 2.3 2.3 4.2-4.6"/>',

  // Ferramentas
  coracaoPulso: `${coracao}<path d="M3.5 12h4l1.5-2.5 2 5 1.5-3h2"/>`,
  perna: '<path d="M9.5 2v10l-1.3 6.5A2 2 0 0 0 10.2 21H18a1.5 1.5 0 0 0 0-3h-4l-.8-6V2"/><path d="M5 8h2M5 11h2"/>',
  coracao,
  balaoQuimico: '<path d="M10 2.5v7L4.6 18.8A1.8 1.8 0 0 0 6.2 21.5h11.6a1.8 1.8 0 0 0 1.6-2.7L14 9.5v-7M8.5 2.5h7"/><path d="M7 16h10"/>',
  gota,
  gotaSangue: `${gota}<path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/>`,
  bexiga:
    '<path d="M6 8.5C6 5.5 8.7 4 12 4s6 1.5 6 4.5c0 4-2.5 7.5-6 7.5s-6-3.5-6-7.5z"/><path d="M12 16v2.5"/><path d="M12 21h.01M9.5 19.5h.01M14.5 19.5h.01"/>',
  idoso:
    '<circle cx="10" cy="4" r="2"/><path d="M10 7c-1.3 2.8-1.4 5.3-.4 8.2L7.5 21.5M9.6 15.2l2.4 6.3M9.8 9.5l4.7 2.5"/><path d="M14.5 12v9.5M14.5 12c0-1 .8-1.5 1.5-1"/>',
  tubos:
    '<path d="M6 3h5M7 3v14.5a2 2 0 0 0 3 0V3M13 3h5M14 3v14.5a2 2 0 0 0 3 0V3"/><path d="M7 11h3M14 13h3"/>',
  regua: '<rect x="2" y="7" width="20" height="10" rx="1.5"/><path d="M6 7v3M10 7v4.5M14 7v3M18 7v4.5"/>',
  balanca: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8.5 9a5 5 0 0 1 7 0"/><path d="M12 9.5l1.2-1.8"/>',
  bebe:
    '<circle cx="12" cy="13" r="8"/><path d="M12 5c0-1.5 1.3-2.5 2.5-2"/><path d="M9 12h.01M15 12h.01M10 16c1.2.9 2.8.9 4 0"/>',
  calendarioCoracao:
    '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M12 18.5l-2.6-2.5a1.6 1.6 0 0 1 2.6-1.9 1.6 1.6 0 0 1 2.6 1.9z"/>',
  capsula:
    '<rect x="2.5" y="8" width="19" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="M9.2 9.2l5.6 5.6"/>',
  seringa:
    '<path d="M18 2.5 21.5 6M19.8 4.2l-3.6 3.6M17.5 6.5l-9.8 9.8-2.4.4.4-2.4L15.5 4.5z"/><path d="M5.7 18.3 2.5 21.5M11 9l1.5 1.5M8.5 11.5 10 13"/>',
  graficoCrescimento:
    '<path d="M3.5 3.5v17h17"/><path d="M6.5 17c3-.5 5-2.5 7-6s3.5-5 6-5.5"/><path d="M6.5 13.5c3-.5 5-2.5 6.5-5s2.5-3.5 4-4"/>',
  estetoscopio:
    '<path d="M5 3H4v5a5 5 0 0 0 10 0V3h-1"/><path d="M9 13v2.5a5 5 0 0 0 10 0V13"/><circle cx="19" cy="11" r="2"/>',
  pranchetaVisto:
    '<rect x="5" y="4" width="14" height="17.5" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><path d="m9 13 2.2 2.2L15.5 11"/>',
  cigarroCopo:
    '<path d="M2.5 15h9v3h-9zM13 15v3M13.5 11.5c0-1.2 1.5-1.3 1.5-2.5"/><path d="M15.5 3h6l-.8 6a2.2 2.2 0 0 1-4.4 0z"/><path d="M18.5 11.5v9.5M16.5 21h4"/>',
  lua: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/><path d="M15 3h3.5L15 7h3.5"/>',
  familia:
    '<circle cx="7" cy="5.5" r="2.2"/><circle cx="17" cy="5.5" r="2.2"/><circle cx="12" cy="11.5" r="1.8"/><path d="M3.5 20v-6.5A3.5 3.5 0 0 1 7 10a3.5 3.5 0 0 1 2.5 1M20.5 20v-6.5A3.5 3.5 0 0 0 17 10a3.5 3.5 0 0 0-2.5 1M9 20v-3a3 3 0 0 1 6 0v3"/>',
  cabeca:
    '<path d="M15.5 21v-3h2a2 2 0 0 0 2-2v-2.5l1.5-.6-1.5-3A7.5 7.5 0 1 0 7 15.2V21"/><path d="M12 12.5l-2-1.9a1.3 1.3 0 0 1 2-1.6 1.3 1.3 0 0 1 2 1.6z"/>',
  ambulancia:
    '<path d="M2.5 17V7a1.5 1.5 0 0 1 1.5-1.5h10V17M14 9h3.8l3.7 4v4H14"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/><path d="M8.2 8.5v4.5M6 10.8h4.5"/>',
  chama:
    '<path d="M12 21.5c-3.8 0-6.5-2.6-6.5-6.2 0-3.3 2.3-5.4 3.5-8.3.6 1.4 1.4 2.4 2.5 2.8C11.8 6.8 12.6 4.3 14.5 2.5c.4 3 4 6.2 4 11.2 0 4.4-2.7 7.8-6.5 7.8z"/><path d="M12 21.5a2.8 2.8 0 0 1-2.8-2.9c0-1.8 1.6-2.8 2.8-4.6 1.2 1.8 2.8 2.8 2.8 4.6a2.8 2.8 0 0 1-2.8 2.9z"/>',

  // Grupos etários (etiquetas decorativas da página inicial)
  urso:
    '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="13" r="7.5"/><ellipse cx="12" cy="15.5" rx="3" ry="2.3"/><path d="M9 11h.01M15 11h.01M12 14.8h.01"/>',
  auscultadores:
    '<path d="M3.5 18v-5a8.5 8.5 0 0 1 17 0v5"/><rect x="2.5" y="14" width="5" height="7" rx="1.8"/><rect x="16.5" y="14" width="5" height="7" rx="1.8"/>',
  folha:
    '<path d="M5 19C5 10 10 4.5 20 4c-.5 10-6 15-15 15z"/><path d="M5 19c3.5-5 6.5-8 10-10"/>'
};

export function icone(nome, tamanho = 28) {
  const corpo = ICONES[nome];
  if (!corpo) throw new Error(`Ícone desconhecido: ${nome}`);
  return `<svg width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${corpo}</svg>`;
}
