// Ajuste de dose à função renal de alguns medicamentos frequentes em medicina geral e familiar.
// Sem dependências do DOM para poder ser testado em Node.
//
// Usa a eTFG (CKD-EPI 2021) ou a clearance de creatinina (Cockcroft-Gault, com o peso real),
// consoante o que pede o Resumo das Características do Medicamento (RCM) de cada fármaco.
// Referências: RCM aprovados pela EMA/INFARMED — Eliquis® (apixabano), Xarelto® (rivaroxabano),
// Lixiana® (edoxabano), Pradaxa® (dabigatrano), Januvia® (sitagliptina), Neurontin® (gabapentina),
// Lyrica® (pregabalina), Fosamax® (alendronato), Actonel® (risedronato); EMA, revisão do
// artigo 31.º sobre a metformina na insuficiência renal (2016).
// Nos anticoagulantes, as doses são as da fibrilhação auricular não valvular.

import { calcularCKDEPI2021, calcularCockcroftGault } from './funcao-renal-core.js';

// Cada regra recebe { egfr, crcl, idade, peso, creatinina } e devolve { nivel, dose, nota? }.
// nivel: 'normal' (dose habitual), 'ajustar' (dose reduzida), 'evitar' (contraindicado ou não recomendado).
export const FARMACOS = [
  {
    id: 'metformina',
    nome: 'Metformina',
    usa: 'egfr',
    regra: ({ egfr }) => {
      if (egfr >= 60) return { nivel: 'normal', dose: 'Dose habitual (máximo 3000 mg/dia).' };
      if (egfr >= 45) return { nivel: 'ajustar', dose: 'Máximo 2000 mg/dia; começar com metade da dose máxima, no máximo.' };
      if (egfr >= 30) return { nivel: 'ajustar', dose: 'Máximo 1000 mg/dia; começar com metade da dose máxima, no máximo.' };
      return { nivel: 'evitar', dose: 'Contraindicada (TFG < 30).' };
    },
    nota: 'Avaliar a função renal antes de começar e pelo menos uma vez por ano; com mais frequência (por exemplo, a cada 3–6 meses) nos idosos e quando há risco de agravamento.',
  },
  {
    id: 'sitagliptina',
    nome: 'Sitagliptina',
    usa: 'egfr',
    regra: ({ egfr }) => {
      if (egfr >= 45) return { nivel: 'normal', dose: '100 mg, uma vez por dia.' };
      if (egfr >= 30) return { nivel: 'ajustar', dose: '50 mg, uma vez por dia.' };
      return { nivel: 'ajustar', dose: '25 mg, uma vez por dia.' };
    },
  },
  {
    id: 'apixabano',
    nome: 'Apixabano (FA)',
    usa: 'crcl',
    regra: ({ crcl, idade, peso, creatinina }) => {
      if (crcl < 15) return { nivel: 'evitar', dose: 'Não recomendado (CrCl < 15 mL/min).' };
      if (crcl < 30) return { nivel: 'ajustar', dose: '2,5 mg, duas vezes por dia (CrCl 15–29 mL/min).' };
      const criterios = [idade >= 80, peso <= 60, creatinina >= 1.5].filter(Boolean).length;
      if (criterios >= 2) return { nivel: 'ajustar', dose: '2,5 mg, duas vezes por dia (2 ou mais de: idade ≥ 80 anos, peso ≤ 60 kg, creatinina ≥ 1,5 mg/dL).' };
      return { nivel: 'normal', dose: '5 mg, duas vezes por dia.' };
    },
  },
  {
    id: 'rivaroxabano',
    nome: 'Rivaroxabano (FA)',
    usa: 'crcl',
    regra: ({ crcl }) => {
      if (crcl < 15) return { nivel: 'evitar', dose: 'Não recomendado (CrCl < 15 mL/min).' };
      if (crcl < 50) return { nivel: 'ajustar', dose: '15 mg, uma vez por dia, com uma refeição.' };
      return { nivel: 'normal', dose: '20 mg, uma vez por dia, com uma refeição.' };
    },
  },
  {
    id: 'edoxabano',
    nome: 'Edoxabano (FA)',
    usa: 'crcl',
    regra: ({ crcl, peso }) => {
      if (crcl < 15) return { nivel: 'evitar', dose: 'Não recomendado (CrCl < 15 mL/min).' };
      if (crcl <= 50) return { nivel: 'ajustar', dose: '30 mg, uma vez por dia (CrCl 15–50 mL/min).' };
      if (peso <= 60) return { nivel: 'ajustar', dose: '30 mg, uma vez por dia (peso ≤ 60 kg).' };
      if (crcl > 95) return { nivel: 'normal', dose: '60 mg, uma vez por dia.', nota: 'Com CrCl > 95 mL/min a eficácia pode ser menor: usar só após avaliação cuidadosa.' };
      return { nivel: 'normal', dose: '60 mg, uma vez por dia.' };
    },
    nota: 'Também 30 mg com ciclosporina, dronedarona, eritromicina ou cetoconazol.',
  },
  {
    id: 'dabigatrano',
    nome: 'Dabigatrano (FA)',
    usa: 'crcl',
    regra: ({ crcl, idade }) => {
      if (crcl < 30) return { nivel: 'evitar', dose: 'Contraindicado (CrCl < 30 mL/min).' };
      if (idade >= 80) return { nivel: 'ajustar', dose: '110 mg, duas vezes por dia (idade ≥ 80 anos).' };
      if (crcl <= 50) return { nivel: 'ajustar', dose: '150 mg, duas vezes por dia; considerar 110 mg duas vezes por dia se o risco hemorrágico for elevado.' };
      return { nivel: 'normal', dose: '150 mg, duas vezes por dia.' };
    },
    nota: 'Entre os 75 e os 80 anos, considerar 110 mg duas vezes por dia se o risco hemorrágico for elevado.',
  },
  {
    id: 'gabapentina',
    nome: 'Gabapentina',
    usa: 'crcl',
    regra: ({ crcl }) => {
      if (crcl >= 80) return { nivel: 'normal', dose: '900–3600 mg/dia, em 3 tomas.' };
      if (crcl >= 50) return { nivel: 'ajustar', dose: '600–1800 mg/dia, em 3 tomas.' };
      if (crcl >= 30) return { nivel: 'ajustar', dose: '300–900 mg/dia, em 3 tomas.' };
      if (crcl >= 15) return { nivel: 'ajustar', dose: '150–600 mg/dia (150 mg/dia = 300 mg em dias alternados).' };
      return { nivel: 'ajustar', dose: '150–300 mg/dia (150 mg/dia = 300 mg em dias alternados).' };
    },
  },
  {
    id: 'pregabalina',
    nome: 'Pregabalina',
    usa: 'crcl',
    regra: ({ crcl }) => {
      if (crcl >= 60) return { nivel: 'normal', dose: '150–600 mg/dia, em 2 ou 3 tomas.' };
      if (crcl >= 30) return { nivel: 'ajustar', dose: '75–300 mg/dia, em 2 ou 3 tomas.' };
      if (crcl >= 15) return { nivel: 'ajustar', dose: '25–150 mg/dia, em 1 ou 2 tomas.' };
      return { nivel: 'ajustar', dose: '25–75 mg/dia, numa toma.' };
    },
  },
  {
    id: 'alendronato',
    nome: 'Ácido alendrónico',
    usa: 'crcl',
    regra: ({ crcl }) =>
      crcl < 35 ? { nivel: 'evitar', dose: 'Não recomendado (CrCl < 35 mL/min).' } : { nivel: 'normal', dose: '70 mg, uma vez por semana.' },
  },
  {
    id: 'risedronato',
    nome: 'Risedronato',
    usa: 'crcl',
    regra: ({ crcl }) =>
      crcl < 30 ? { nivel: 'evitar', dose: 'Contraindicado (CrCl < 30 mL/min).' } : { nivel: 'normal', dose: '35 mg, uma vez por semana.' },
  },
];

/** dados: { creatinina (mg/dL), idade, peso, sexoFeminino }. */
export function ajustarDoses({ creatinina, idade, peso, sexoFeminino } = {}) {
  const ckd = calcularCKDEPI2021(creatinina, idade, sexoFeminino);
  if (!ckd.ok) return ckd;
  const cg = calcularCockcroftGault(creatinina, idade, peso, sexoFeminino);
  if (!cg.ok) return cg;
  const ctx = { egfr: ckd.egfr, crcl: cg.crcl, idade: Number(idade), peso: Number(peso), creatinina: Number(creatinina) };
  const farmacos = FARMACOS.map((f) => {
    const r = f.regra(ctx);
    return { id: f.id, nome: f.nome, usa: f.usa, valor: ctx[f.usa], ...r, nota: [r.nota, f.nota].filter(Boolean).join(' ') };
  });
  return { ok: true, egfr: ckd.egfr, crcl: cg.crcl, farmacos };
}
