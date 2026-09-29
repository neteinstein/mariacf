// Carga tabágica (unidades maço-ano) e consumo de álcool em gramas e
// bebidas-padrão — quantificação de hábitos em consulta.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: DGS, Programa Nacional para a Prevenção e Controlo do
// Tabagismo; USPSTF 2021 (rastreio do cancro do pulmão, ≥ 20 UMA); DGS e
// SICAD (bebida-padrão = 10 g de álcool puro; densidade do etanol 0,79 g/mL);
// OMS, Declaração de 2023 (não existe nível de consumo seguro).

const arred = (n, casas = 1) => {
  const f = 10 ** casas;
  return Math.round(n * f) / f;
};

/** Unidades maço-ano = (cigarros por dia ÷ 20) × anos de consumo. */
export function calcularUMA(cigarrosDia, anos) {
  const c = Number(cigarrosDia);
  const a = Number(anos);
  if (cigarrosDia === '' || !Number.isFinite(c) || c <= 0 || c > 200) return { ok: false, motivo: 'Indique quantos cigarros fuma (ou fumava) por dia.' };
  if (anos === '' || !Number.isFinite(a) || a <= 0 || a > 90) return { ok: false, motivo: 'Indique há quantos anos fuma (ou fumou).' };

  const uma = (c / 20) * a;
  let nivel;
  let descricao;
  if (uma < 10) { nivel = 'moderado'; descricao = 'Carga tabágica baixa — mas qualquer consumo aumenta o risco'; }
  else if (uma < 20) { nivel = 'alto'; descricao = 'Carga tabágica moderada — considerar espirometria se houver sintomas respiratórios'; }
  else { nivel = 'muito-alto'; descricao = 'Carga tabágica elevada (≥ 20 UMA) — risco aumentado de DPOC e cancro do pulmão'; }

  return { ok: true, uma: arred(uma), nivel, descricao };
}

// Bebidas mais comuns em Portugal: volume por unidade (mL) e teor alcoólico (% vol).
export const BEBIDAS = [
  { id: 'cerveja', nome: 'Cerveja (imperial ou mini)', volume: 200, teor: 5 },
  { id: 'cervejaGarrafa', nome: 'Cerveja (garrafa ou lata)', volume: 330, teor: 5 },
  { id: 'vinho', nome: 'Copo de vinho', volume: 125, teor: 13 },
  { id: 'porto', nome: 'Cálice de vinho do Porto', volume: 60, teor: 20 },
  { id: 'destilada', nome: 'Bebida destilada (aguardente, whisky…)', volume: 40, teor: 40 },
];

const DENSIDADE_ETANOL = 0.79;
const GRAMAS_BEBIDA_PADRAO = 10;

/** Gramas de álcool puro numa bebida = volume (mL) × teor (%) × 0,79. */
export function gramasAlcool(volumeMl, teorPercent) {
  return volumeMl * (teorPercent / 100) * DENSIDADE_ETANOL;
}

/**
 * Consumo semanal a partir do número de bebidas de cada tipo por semana.
 * Limites de baixo risco usados pela DGS: até 2 bebidas-padrão/dia (20 g) no
 * homem e 1 (10 g) na mulher, com pelo menos 2 dias por semana sem álcool.
 */
export function calcularConsumoAlcool(porSemana = {}, sexoFeminino = false) {
  let gramas = 0;
  let algum = false;
  for (const b of BEBIDAS) {
    const n = Number(porSemana[b.id] ?? 0);
    if (!Number.isFinite(n) || n < 0) return { ok: false, motivo: 'Indique números válidos de bebidas.' };
    if (n > 0) algum = true;
    gramas += n * gramasAlcool(b.volume, b.teor);
  }
  if (!algum) return { ok: true, gramasSemana: 0, gramasDia: 0, bebidasPadraoSemana: 0, nivel: 'baixo', descricao: 'Sem consumo de álcool', limiteSemana: sexoFeminino ? 70 : 140 };

  const gramasDia = gramas / 7;
  const limiteDia = sexoFeminino ? 10 : 20;
  let nivel;
  let descricao;
  if (gramasDia <= limiteDia) {
    nivel = 'moderado';
    descricao = 'Dentro do limite de baixo risco — mas nenhum consumo é isento de risco';
  } else if (gramasDia <= limiteDia * 2) {
    nivel = 'alto';
    descricao = 'Consumo de risco — acima do limite de baixo risco';
  } else {
    nivel = 'muito-alto';
    descricao = 'Consumo nocivo — mais do dobro do limite de baixo risco';
  }

  return {
    ok: true,
    gramasSemana: arred(gramas, 0),
    gramasDia: arred(gramasDia),
    bebidasPadraoSemana: arred(gramas / GRAMAS_BEBIDA_PADRAO),
    limiteSemana: limiteDia * 7,
    nivel,
    descricao,
  };
}
