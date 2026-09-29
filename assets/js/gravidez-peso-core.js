// Aumento de peso recomendado na gravidez, segundo o IMC antes da gravidez.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referência: Institute of Medicine (IOM), Weight Gain During Pregnancy:
// Reexamining the Guidelines, 2009 — adotado pela DGS.

const arred = (n, casas = 1) => {
  const f = 10 ** casas;
  return Math.round(n * f) / f;
};

// total: aumento total recomendado (kg). semanal: ritmo no 2.º e 3.º trimestres (kg/semana).
// gemelar: aumento total na gravidez gemelar (sem recomendação para baixo peso).
const CATEGORIAS = [
  { max: 18.5, id: 'baixo-peso', nome: 'Baixo peso', total: [12.5, 18], semanal: [0.44, 0.58], gemelar: null },
  { max: 25, id: 'normal', nome: 'Peso normal', total: [11.5, 16], semanal: [0.35, 0.5], gemelar: [17, 25] },
  { max: 30, id: 'excesso-peso', nome: 'Excesso de peso', total: [7, 11.5], semanal: [0.23, 0.33], gemelar: [14, 23] },
  { max: Infinity, id: 'obesidade', nome: 'Obesidade', total: [5, 9], semanal: [0.17, 0.27], gemelar: [11, 19] },
];

// Aumento esperado no 1.º trimestre (até às 13 semanas), para todas as categorias.
const PRIMEIRO_TRIMESTRE = [0.5, 2];

/**
 * Intervalo de aumento de peso esperado numa dada semana: até às 13 semanas,
 * 0–2 kg; depois, 0,5–2 kg mais o ritmo semanal da categoria, sem ultrapassar
 * o total recomendado.
 */
function esperadoNaSemana(s, semanal, total) {
  let min;
  let max;
  if (s <= 13) {
    min = 0;
    max = PRIMEIRO_TRIMESTRE[1];
  } else {
    min = PRIMEIRO_TRIMESTRE[0] + (s - 13) * semanal[0];
    max = PRIMEIRO_TRIMESTRE[1] + (s - 13) * semanal[1];
  }
  return [Math.min(min, total[0]), Math.min(max, total[1])];
}

/**
 * Corredor de aumento de peso esperado semana a semana (0–40), para desenhar
 * o gráfico. Recebe o resultado de calcularAumentoPeso; na gravidez gemelar
 * (sem ritmo semanal definido) devolve null.
 */
export function corredorAumentoPeso(resultado) {
  if (!resultado?.ok || resultado.semanalMin == null) return null;
  const semanal = [resultado.semanalMin, resultado.semanalMax];
  const total = [resultado.totalMin, resultado.totalMax];
  return Array.from({ length: 41 }, (_, s) => {
    const [min, max] = esperadoNaSemana(s, semanal, total);
    return { semanas: s, min: arred(min), max: arred(max) };
  });
}

/**
 * pesoPre (kg), alturaCm, semanas (idade gestacional atual, opcional) e
 * pesoAtual (kg, opcional). Devolve o IMC pré-gravidez, o intervalo total
 * recomendado e, se houver peso atual, se o aumento está dentro do esperado.
 */
export function calcularAumentoPeso({ pesoPre, alturaCm, semanas, pesoAtual, gemelar = false }) {
  const p = Number(pesoPre);
  const a = Number(alturaCm);
  if (!Number.isFinite(p) || p < 30 || p > 250) return { ok: false, motivo: 'Indique o peso antes da gravidez (30–250 kg).' };
  if (!Number.isFinite(a) || a < 120 || a > 220) return { ok: false, motivo: 'Indique a altura (120–220 cm).' };

  const imc = p / (a / 100) ** 2;
  const cat = CATEGORIAS.find((c) => imc < c.max);
  const total = gemelar ? cat.gemelar : cat.total;
  if (!total) return { ok: false, motivo: 'Não há recomendação do IOM para gravidez gemelar com baixo peso — discutir com o obstetra.' };

  const resultado = {
    ok: true,
    imc: arred(imc),
    categoria: cat.nome,
    categoriaId: cat.id,
    totalMin: total[0],
    totalMax: total[1],
    semanalMin: gemelar ? null : cat.semanal[0],
    semanalMax: gemelar ? null : cat.semanal[1],
    avaliacao: null,
  };

  const s = Number(semanas);
  const atual = Number(pesoAtual);
  if (semanas === '' || pesoAtual === '' || !Number.isFinite(s) || !Number.isFinite(atual) || atual <= 0 || gemelar) return resultado;
  if (s < 1 || s > 42) return resultado;

  const [esperadoMin, esperadoMax] = esperadoNaSemana(s, cat.semanal, total);

  const ganho = atual - p;
  let nivel;
  let texto;
  if (ganho < esperadoMin) { nivel = 'moderado'; texto = 'Abaixo do esperado para esta fase da gravidez'; }
  else if (ganho > esperadoMax) { nivel = 'alto'; texto = 'Acima do esperado para esta fase da gravidez'; }
  else { nivel = 'baixo'; texto = 'Dentro do esperado para esta fase da gravidez'; }

  resultado.avaliacao = {
    semanas: s,
    ganho: arred(ganho),
    esperadoMin: arred(esperadoMin),
    esperadoMax: arred(esperadoMax),
    nivel,
    texto,
  };
  return resultado;
}
