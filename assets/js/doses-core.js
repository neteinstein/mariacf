// Lógica de cálculo de doses pediátricas (paracetamol e ibuprofeno, via oral).
// Sem dependências do DOM para poder ser testada em Node.
//
// Referências: RCM (INFARMED) de Ben-u-ron®, Brufen®, Nurofen® e Ib-u-ron®.
//   Paracetamol: 15 mg/kg/toma, de 6/6h, máx. 60 mg/kg/dia (e 1 g/toma).
//   Ibuprofeno:  10 mg/kg/toma, de 8/8h, máx. 30 mg/kg/dia (e 400 mg/toma).

export const MEDICAMENTOS = {
  paracetamol: {
    id: 'paracetamol',
    nome: 'Paracetamol',
    marcas: 'Ben-u-ron®, Panasorb®, genéricos',
    mgPorKg: 15,
    intervaloHoras: 6,
    tomasPorDia: 4,
    maxMgPorToma: 1000,
    pesoMinimo: 3,
    concentracoes: [
      { mgPorMl: 40, rotulo: '40 mg/mL', detalhe: 'Xarope / solução oral (200 mg em 5 mL)' },
    ],
  },
  ibuprofeno: {
    id: 'ibuprofeno',
    nome: 'Ibuprofeno',
    marcas: 'Brufen®, Ib-u-ron®, Nurofen®, genéricos',
    mgPorKg: 10,
    intervaloHoras: 8,
    tomasPorDia: 3,
    maxMgPorToma: 400,
    pesoMinimo: 5,
    concentracoes: [
      { mgPorMl: 20, rotulo: '20 mg/mL', detalhe: 'Suspensão oral (100 mg em 5 mL)' },
      { mgPorMl: 40, rotulo: '40 mg/mL', detalhe: 'Suspensão oral forte (200 mg em 5 mL)' },
    ],
  },
};

export const PESO_MIN = 3;
export const PESO_MAX = 60;
// Acima deste peso as formulações em comprimido são geralmente mais práticas.
export const PESO_ADULTO = 40;

const arred1 = (n) => Math.round(n * 10) / 10;

/**
 * Calcula a dose para um peso (kg), medicamento e concentração (mg/mL).
 * Devolve { ok: false, motivo } se não for possível calcular com segurança.
 */
export function calcularDose(peso, medicamentoId, mgPorMl) {
  const med = MEDICAMENTOS[medicamentoId];
  if (!med) return { ok: false, motivo: 'Medicamento desconhecido.' };

  const p = Number(peso);
  if (!Number.isFinite(p) || p <= 0) {
    return { ok: false, motivo: 'Indique o peso da criança.' };
  }
  if (p < PESO_MIN || p > PESO_MAX) {
    return { ok: false, motivo: `Peso fora do intervalo suportado (${PESO_MIN}–${PESO_MAX} kg).` };
  }
  if (p < med.pesoMinimo) {
    return {
      ok: false,
      motivo: `${med.nome} não está indicado abaixo de ${med.pesoMinimo} kg sem indicação médica.`,
    };
  }

  const c = Number(mgPorMl);
  if (!Number.isFinite(c) || c <= 0) {
    return { ok: false, motivo: 'Concentração inválida.' };
  }

  const mgCalculado = p * med.mgPorKg;
  const limitado = mgCalculado > med.maxMgPorToma;
  const mgToma = Math.min(mgCalculado, med.maxMgPorToma);
  const ml = arred1(mgToma / c);

  return {
    ok: true,
    medicamento: med,
    peso: p,
    mgPorMl: c,
    mgToma: Math.round(mgToma),
    ml,
    limitado,
    intervaloHoras: med.intervaloHoras,
    tomasPorDia: med.tomasPorDia,
    mgMaxDia: Math.round(mgToma * med.tomasPorDia),
    mlMaxDia: arred1(ml * med.tomasPorDia),
    pesoAdulto: p >= PESO_ADULTO,
  };
}

/** Horas das próximas tomas a partir de uma data (inclui a toma inicial). */
export function proximasTomas(inicio, intervaloHoras, n) {
  const tomas = [];
  for (let i = 0; i < n; i++) {
    tomas.push(new Date(inicio.getTime() + i * intervaloHoras * 3600 * 1000));
  }
  return tomas;
}

/** Seringas necessárias para medir um volume: a menor que chegue, ou várias de 20 mL. */
export function seringas(ml) {
  const tamanhos = [1, 2.5, 5, 10, 20];
  const escolhida = tamanhos.find((t) => ml <= t);
  if (escolhida) return [{ capacidade: escolhida, volume: ml }];
  const res = [];
  let resto = ml;
  while (resto > 20) {
    res.push({ capacidade: 20, volume: 20 });
    resto = arred1(resto - 20);
  }
  if (resto > 0) res.push(...seringas(resto));
  return res;
}
