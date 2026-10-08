// Lógica de cálculo de doses pediátricas (paracetamol, ibuprofeno e
// amoxicilina + ácido clavulânico, via oral).
// Sem dependências do DOM para poder ser testada em Node.
//
// Referências: RCM (INFARMED) de Ben-u-ron®, Brufen®, Nurofen®, Ib-u-ron® e Augmentin®.
//   Paracetamol: 15 mg/kg/toma, de 6/6h, máx. 60 mg/kg/dia (e 1 g/toma).
//   Ibuprofeno:  10 mg/kg/toma, de 8/8h, máx. 30 mg/kg/dia (e 400 mg/toma).
//   Amoxicilina + ácido clavulânico: dose diária de amoxicilina (habitual 45,
//     alta 80–90 mg/kg/dia) dividida de 12/12h (7:1 e 14:1) ou 8/8h (4:1);
//     ácido clavulânico até 10 mg/kg/dia (15 mg/kg/dia na 4:1); máx. 4 g/dia de amoxicilina.

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
  amoxiclav: {
    id: 'amoxiclav',
    nome: 'Amoxicilina + ácido clavulânico',
    marcas: 'Augmentin®, Clavamox®, genéricos',
    antibiotico: true,
    // A dose é diária (mg de amoxicilina/kg/dia), dividida pelas tomas do dia.
    doses: [
      { mgPorKgDia: 45, rotulo: '45 mg/kg/dia', detalhe: 'Dose habitual' },
      { mgPorKgDia: 90, rotulo: '90 mg/kg/dia', detalhe: 'Dose alta (ex.: otite, pneumonia)' },
    ],
    mgPorKgDiaMin: 20,
    mgPorKgDiaMax: 100,
    intervalos: [12, 8],
    maxMgDia: 4000,
    pesoMinimo: 3,
    // mgPorMl e clavPorMl: amoxicilina e ácido clavulânico por mL de suspensão.
    // A primeira é a predefinida.
    concentracoes: [
      { mgPorMl: 80, clavPorMl: 11.4, proporcao: '7:1', intervaloHoras: 12, maxClavMgKgDia: 10,
        rotulo: '400 + 57 mg/5 mL', detalhe: '7:1 · de 12/12 h' },
      { mgPorMl: 120, clavPorMl: 8.58, proporcao: '14:1', intervaloHoras: 12, maxClavMgKgDia: 10,
        rotulo: '600 + 42,9 mg/5 mL', detalhe: '14:1 (ES) · de 12/12 h' },
      { mgPorMl: 25, clavPorMl: 6.25, proporcao: '4:1', intervaloHoras: 8, maxClavMgKgDia: 15,
        rotulo: '125 + 31,25 mg/5 mL', detalhe: '4:1 · de 8/8 h' },
      { mgPorMl: 50, clavPorMl: 12.5, proporcao: '4:1', intervaloHoras: 8, maxClavMgKgDia: 15,
        rotulo: '250 + 62,5 mg/5 mL', detalhe: '4:1 · de 8/8 h' },
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
 * Nos antibióticos, `opcoes` indica a dose diária (mgPorKgDia) e o intervalo
 * (intervaloHoras); por omissão, a dose habitual e o intervalo da formulação.
 * Devolve { ok: false, motivo } se não for possível calcular com segurança.
 */
export function calcularDose(peso, medicamentoId, mgPorMl, opcoes = {}) {
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

  if (med.antibiotico) return calcularAntibiotico(med, p, c, opcoes);

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

function calcularAntibiotico(med, p, c, opcoes) {
  const formulacao = med.concentracoes.find((x) => x.mgPorMl === c) || null;
  const mgPorKgDia = Number(opcoes.mgPorKgDia ?? med.doses[0].mgPorKgDia);
  if (!Number.isFinite(mgPorKgDia) || mgPorKgDia < med.mgPorKgDiaMin || mgPorKgDia > med.mgPorKgDiaMax) {
    return {
      ok: false,
      motivo: `Indique a dose diária prescrita (${med.mgPorKgDiaMin}–${med.mgPorKgDiaMax} mg/kg/dia de amoxicilina).`,
    };
  }
  const intervaloHoras = Number(opcoes.intervaloHoras ?? formulacao?.intervaloHoras ?? med.intervalos[0]);
  if (!med.intervalos.includes(intervaloHoras)) {
    return { ok: false, motivo: 'Intervalo entre tomas inválido.' };
  }
  const tomasPorDia = 24 / intervaloHoras;

  const mgDiaCalculado = p * mgPorKgDia;
  const limitado = mgDiaCalculado > med.maxMgDia;
  const mgDia = Math.min(mgDiaCalculado, med.maxMgDia);
  const mgToma = mgDia / tomasPorDia;
  const ml = arred1(mgToma / c);

  // Ácido clavulânico: só se conhece a quantidade nas formulações da lista.
  const clavPorMl = Number(opcoes.clavPorMl ?? formulacao?.clavPorMl);
  const temClav = Number.isFinite(clavPorMl) && clavPorMl > 0;
  const clavMgToma = temClav ? ml * clavPorMl : null;
  const clavMgKgDia = temClav ? (clavMgToma * tomasPorDia) / p : null;
  const maxClavMgKgDia = formulacao?.maxClavMgKgDia ?? 10;

  return {
    ok: true,
    medicamento: med,
    formulacao,
    peso: p,
    mgPorMl: c,
    mgPorKgDia,
    mgToma: Math.round(mgToma),
    ml,
    limitado,
    intervaloHoras,
    tomasPorDia,
    mgMaxDia: Math.round(mgToma * tomasPorDia),
    mlMaxDia: arred1(ml * tomasPorDia),
    clavMgToma: temClav ? arred1(clavMgToma) : null,
    clavMgKgDia: temClav ? arred1(clavMgKgDia) : null,
    maxClavMgKgDia,
    clavExcessivo: temClav && clavMgKgDia > maxClavMgKgDia + 0.05,
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
