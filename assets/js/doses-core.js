// Lógica de cálculo de doses pediátricas por via oral: analgésicos/antipiréticos,
// antibióticos, corticoides, antieméticos e anti-histamínicos.
// Sem dependências do DOM para poder ser testada em Node.
//
// Referências: RCM (INFARMED) de Ben-u-ron®, Brufen®, Nurofen®, Ib-u-ron®, Augmentin®,
// Zithromax®, Zinnat®, Zamene®, Motilium®, Primperan®, Atarax®, Zyrtec® e Aerius®;
// recomendações da EMA (domperidona 2014, metoclopramida 2013, hidroxizina 2015).
//   Paracetamol: 15 mg/kg/toma, de 6/6h, máx. 60 mg/kg/dia (e 1 g/toma).
//   Ibuprofeno:  10 mg/kg/toma, de 8/8h, máx. 30 mg/kg/dia (e 400 mg/toma).
//   Amoxicilina + ácido clavulânico: dose diária de amoxicilina (habitual 45,
//     alta 80–90 mg/kg/dia) dividida de 12/12h (7:1 e 14:1) ou 8/8h (4:1);
//     ácido clavulânico até 10 mg/kg/dia (15 mg/kg/dia na 4:1); máx. 4 g/dia de amoxicilina.
//   Azitromicina: 10 mg/kg/dia, 1×/dia, 3 dias (ou 10 mg/kg no 1.º dia e 5 mg/kg
//     do 2.º ao 5.º); amigdalite estreptocócica 20 mg/kg/dia, 3 dias; máx. 500 mg/dia.
//   Cefuroxima (axetil): 10 mg/kg de 12/12h (otite média: 15 mg/kg); máx. 250 mg/toma.
//   Prednisolona: 1–2 mg/kg/dia, 1×/dia, máx. 40 mg/dia (crise de asma, laringite).
//   Deflazacorte: 0,25–1,5 mg/kg/dia, 1×/dia; gotas a 22,75 mg/mL (1 gota = 1 mg);
//     limitado a 48 mg/dia (equivalente a 40 mg de prednisolona).
//   Domperidona: 0,25 mg/kg até 3×/dia (máx. 0,75 mg/kg/dia); 10 mg/toma a partir de 35 kg.
//   Metoclopramida: a partir de 1 ano, até 3×/dia, dose por escalão de peso
//     (10–14 kg 1 mg; 15–19 kg 2 mg; 20–29 kg 2,5 mg; 30–60 kg 5 mg).
//   Hidroxizina: a partir de 1 ano, 1–2 mg/kg/dia divididos (máx. 2 mg/kg/dia até 40 kg).
//   Cetirizina e desloratadina: dose fixa por idade (ver `escaloes`).
//
// Tipos de cálculo:
//   - por toma (mgPorKg ou escaloesPeso), com intervalo fixo;
//   - porDia: dose diária em mg/kg/dia, dividida pelas tomas do dia;
//   - porIdade: dose fixa por escalão etário (o peso não entra).
// Formulações com `mgPorGota` dão também a dose em gotas.

export const MEDICAMENTOS = {
  paracetamol: {
    id: 'paracetamol',
    nome: 'Paracetamol',
    // Cartões «Como dar» e «Intervalos e limites» (só para este medicamento).
    comoDar: [
      'Pode dar-se com ou sem alimentos.',
    ],
    limites: [
      '<strong>15 mg/kg</strong> por toma, de 6/6 h.',
      'Máximo de <strong>4 tomas em 24 h</strong> (60 mg/kg/dia) e 1 g por toma.',
      'Não ultrapasse as tomas diárias, mesmo que a febre volte.',
    ],
    marcas: 'Ben-u-ron®, Panasorb®, genéricos',
    grupo: 'febre',
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
    comoDar: [
      'Dar de preferência com ou após alimentos.',
      'Agite o frasco antes de cada toma.',
    ],
    limites: [
      '<strong>10 mg/kg</strong> por toma, de 8/8 h.',
      'Máximo de <strong>3 tomas em 24 h</strong> (30 mg/kg/dia) e 400 mg por toma.',
      'Não usar abaixo de 5 kg sem indicação médica.',
      'Não ultrapasse as tomas diárias, mesmo que a febre volte.',
    ],
    marcas: 'Brufen®, Ib-u-ron®, Nurofen®, genéricos',
    grupo: 'febre',
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
    comoDar: [
      'Dar no início das refeições.',
      'Agite o frasco antes de cada toma; depois de preparado, guarde-o no frigorífico.',
    ],
    limites: [
      '<strong>45 mg/kg/dia</strong> de amoxicilina (dose alta 80–90), de 12/12 h nas formulações 7:1 e 14:1 ou de 8/8 h na 4:1.',
      'Ácido clavulânico até 10 mg/kg/dia (15 mg/kg/dia na 4:1); máximo de 4 g/dia de amoxicilina.',
      'Cumpra todos os dias de tratamento indicados, mesmo que a criança melhore.',
    ],
    marcas: 'Augmentin®, Clavamox®, genéricos',
    grupo: 'antibiotico',
    antibiotico: true,
    porDia: true,
    substancia: 'amoxicilina',
    doseAdulto: 'habitualmente comprimidos de 875 + 125 mg de 12/12 h',
    conselho:
      'Antibiótico só com receita médica. Dar no início das refeições e cumprir todos os dias indicados, mesmo que a criança melhore. Agitar antes de cada toma; depois de preparado, guardar no frigorífico (em geral dura 7 dias — veja o folheto).',
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
  azitromicina: {
    id: 'azitromicina',
    nome: 'Azitromicina',
    comoDar: [
      'Uma toma por dia, sempre à mesma hora, com ou sem alimentos.',
      'Agite o frasco antes de cada toma.',
    ],
    limites: [
      '<strong>10 mg/kg 1×/dia</strong> durante 3 dias (ou 10 mg/kg no 1.º dia e 5 mg/kg do 2.º ao 5.º).',
      'Amigdalite estreptocócica: 20 mg/kg/dia durante 3 dias.',
      'Máximo de <strong>500 mg por dia</strong>.',
    ],
    marcas: 'Zithromax®, genéricos',
    grupo: 'antibiotico',
    antibiotico: true,
    porDia: true,
    substancia: 'azitromicina',
    doses: [
      { mgPorKgDia: 10, rotulo: '10 mg/kg/dia', detalhe: 'Dose habitual · 3 dias' },
      { mgPorKgDia: 20, rotulo: '20 mg/kg/dia', detalhe: 'Amigdalite estreptocócica · 3 dias' },
    ],
    mgPorKgDiaMin: 5,
    mgPorKgDiaMax: 20,
    intervalos: [24],
    maxMgDia: 500,
    pesoMinimo: 5,
    doseAdulto: 'habitualmente 500 mg 1×/dia durante 3 dias',
    conselho:
      'Antibiótico só com receita médica. Uma toma por dia, sempre à mesma hora, com ou sem alimentos. O tratamento é curto porque o efeito se prolonga: habitualmente 3 dias (ou 10 mg/kg no 1.º dia e 5 mg/kg do 2.º ao 5.º). Agitar antes de cada toma. Pouca experiência abaixo dos 6 meses.',
    concentracoes: [
      { mgPorMl: 40, intervaloHoras: 24, rotulo: '200 mg/5 mL', detalhe: 'Suspensão oral · 1×/dia' },
    ],
  },
  cefuroxima: {
    id: 'cefuroxima',
    nome: 'Cefuroxima',
    comoDar: [
      'Dar com alimentos (melhora a absorção).',
      'Agite o frasco antes de cada toma; depois de preparado, guarde-o no frigorífico.',
    ],
    limites: [
      '<strong>10 mg/kg de 12/12 h</strong>; na otite média, 15 mg/kg de 12/12 h.',
      'Máximo de <strong>250 mg por toma</strong> (500 mg/dia).',
      'Cumpra todos os dias de tratamento indicados, mesmo que a criança melhore.',
    ],
    marcas: 'Zinnat®, genéricos',
    grupo: 'antibiotico',
    antibiotico: true,
    porDia: true,
    substancia: 'cefuroxima',
    doses: [
      { mgPorKgDia: 20, rotulo: '20 mg/kg/dia', detalhe: 'Dose habitual (10 mg/kg por toma)' },
      { mgPorKgDia: 30, rotulo: '30 mg/kg/dia', detalhe: 'Otite média (15 mg/kg por toma)' },
    ],
    mgPorKgDiaMin: 10,
    mgPorKgDiaMax: 30,
    intervalos: [12],
    maxMgDia: 500,
    pesoMinimo: 5,
    doseAdulto: 'habitualmente comprimidos de 250–500 mg de 12/12 h',
    conselho:
      'Antibiótico só com receita médica. Dar com alimentos (melhora a absorção) e cumprir todos os dias indicados, mesmo que a criança melhore. Agitar antes de cada toma; depois de preparado, guardar no frigorífico (veja no folheto quantos dias dura). Não está estudada abaixo dos 3 meses.',
    concentracoes: [
      { mgPorMl: 25, intervaloHoras: 12, rotulo: '125 mg/5 mL', detalhe: 'Suspensão oral · de 12/12 h' },
      { mgPorMl: 50, intervaloHoras: 12, rotulo: '250 mg/5 mL', detalhe: 'Suspensão oral · de 12/12 h' },
    ],
  },
  prednisolona: {
    id: 'prednisolona',
    nome: 'Prednisolona',
    comoDar: [
      'Dar de manhã, com alimentos.',
    ],
    limites: [
      '<strong>1–2 mg/kg/dia</strong>, 1×/dia, habitualmente durante 3 a 5 dias.',
      'Máximo de <strong>40 mg por dia</strong> nas crianças.',
    ],
    marcas: 'Prelone®, genéricos',
    grupo: 'corticoide',
    porDia: true,
    substancia: 'prednisolona',
    doses: [
      { mgPorKgDia: 1, rotulo: '1 mg/kg/dia', detalhe: 'Laringite, crise de asma ligeira' },
      { mgPorKgDia: 2, rotulo: '2 mg/kg/dia', detalhe: 'Crise de asma' },
    ],
    mgPorKgDiaMin: 0.5,
    mgPorKgDiaMax: 2,
    intervalos: [24],
    maxMgDia: 40,
    pesoMinimo: 3,
    doseAdulto: 'habitualmente 40–50 mg 1×/dia',
    conselho:
      'Corticoide só com receita médica. Dar de manhã, com alimentos. Nos tratamentos curtos (3 a 5 dias) pode parar-se sem reduzir a dose, salvo indicação médica. Nas crianças não se ultrapassam 40 mg por dia.',
    concentracoes: [
      { mgPorMl: 3, intervaloHoras: 24, rotulo: '15 mg/5 mL', detalhe: 'Solução oral (ex.: Prelone®)' },
      { mgPorMl: 1, intervaloHoras: 24, rotulo: '5 mg/5 mL', detalhe: 'Solução oral' },
    ],
  },
  deflazacorte: {
    id: 'deflazacorte',
    nome: 'Deflazacorte',
    comoDar: [
      'Conte as gotas para uma colher com um pouco de água ou sumo (1 gota = 1 mg).',
      'Dar de manhã, com alimentos.',
    ],
    limites: [
      '<strong>0,25–1,5 mg/kg/dia</strong>, 1×/dia.',
      'Nesta calculadora, limitado a 48 mg/dia (equivalente a 40 mg de prednisolona).',
    ],
    marcas: 'Zamene®, genéricos',
    grupo: 'corticoide',
    porDia: true,
    substancia: 'deflazacorte',
    doses: [
      { mgPorKgDia: 1, rotulo: '1 mg/kg/dia', detalhe: 'Dose habitual' },
      { mgPorKgDia: 1.5, rotulo: '1,5 mg/kg/dia', detalhe: 'Dose máxima habitual' },
    ],
    mgPorKgDiaMin: 0.25,
    mgPorKgDiaMax: 1.5,
    intervalos: [24],
    // Sem máximo pediátrico no RCM: limita-se ao equivalente a 40 mg de prednisolona.
    maxMgDia: 48,
    pesoMinimo: 3,
    conselho:
      'Corticoide só com receita médica. Dar de manhã, com alimentos. Conte as gotas (1 gota = 1 mg) para uma colher com um pouco de água ou sumo. Cerca de 6 mg de deflazacorte equivalem a 5 mg de prednisolona.',
    concentracoes: [
      { mgPorMl: 22.75, mgPorGota: 1, intervaloHoras: 24, rotulo: '22,75 mg/mL', detalhe: 'Gotas orais · 1 gota = 1 mg' },
    ],
  },
  domperidona: {
    id: 'domperidona',
    nome: 'Domperidona',
    comoDar: [
      'Dar 15–30 minutos antes das refeições.',
      'Agite o frasco antes de cada toma.',
    ],
    limites: [
      '<strong>0,25 mg/kg</strong> por toma, até 3×/dia (máx. 0,75 mg/kg/dia).',
      'A partir de 35 kg: 10 mg por toma (máx. 30 mg/dia).',
      'No máximo <strong>1 semana</strong> de tratamento.',
    ],
    marcas: 'Motilium®, genéricos',
    grupo: 'nauseas',
    mgPorKg: 0.25,
    intervaloHoras: 8,
    tomasPorDia: 3,
    maxMgPorToma: 10,
    // A partir de 35 kg usa-se a dose de adulto (10 mg por toma).
    doseFixaAPartirDe: 35,
    pesoMinimo: 3,
    conselho:
      'Só com receita médica. Dar 15–30 minutos antes das refeições. Usar a dose mais baixa durante o menor tempo possível (no máximo 1 semana). Evitar com outros medicamentos que prolonguem o intervalo QT.',
    concentracoes: [
      { mgPorMl: 1, rotulo: '1 mg/mL', detalhe: 'Suspensão oral (5 mg em 5 mL)' },
    ],
  },
  metoclopramida: {
    id: 'metoclopramida',
    nome: 'Metoclopramida',
    comoDar: [
      'Dar antes das refeições.',
    ],
    limites: [
      'Só a partir de <strong>1 ano</strong> (10 kg).',
      'Por toma: 10–14 kg 1 mg; 15–19 kg 2 mg; 20–29 kg 2,5 mg; 30–60 kg 5 mg — até 3×/dia.',
      'No máximo <strong>5 dias</strong> de tratamento.',
    ],
    marcas: 'Primperan®, genéricos',
    grupo: 'nauseas',
    // Dose por toma segundo o peso (EMA 2013), até 3 vezes por dia.
    escaloesPeso: [
      { min: 10, mg: 1 },
      { min: 15, mg: 2 },
      { min: 20, mg: 2.5 },
      { min: 30, mg: 5 },
    ],
    intervaloHoras: 8,
    tomasPorDia: 3,
    maxMgPorToma: 10,
    pesoMinimo: 10,
    conselho:
      'Só com receita médica. Contraindicada abaixo de 1 ano. Nas crianças é uma opção de segunda linha (náuseas após cirurgia ou quimioterapia), não para os vómitos da gastroenterite. No máximo 5 dias. Se surgirem movimentos involuntários, pare e contacte o médico.',
    concentracoes: [
      { mgPorMl: 1, rotulo: '1 mg/mL', detalhe: 'Solução oral (5 mg em 5 mL)' },
    ],
  },
  cetirizina: {
    id: 'cetirizina',
    nome: 'Cetirizina',
    comoDar: [
      'Pode dar-se com ou sem alimentos.',
      'Nas gotas, conte-as para uma colher (20 gotas = 10 mg).',
    ],
    limites: [
      '2 a 5 anos: <strong>2,5 mg de 12/12 h</strong>.',
      '6 a 11 anos: <strong>5 mg de 12/12 h</strong>.',
      '12 anos ou mais: <strong>10 mg 1×/dia</strong>.',
      'Não recomendada abaixo dos 2 anos.',
    ],
    marcas: 'Zyrtec®, genéricos',
    grupo: 'alergia',
    porIdade: true,
    escaloes: [
      { id: '2-5', rotulo: '2 a 5 anos', mgToma: 2.5, intervaloHoras: 12 },
      { id: '6-11', rotulo: '6 a 11 anos', mgToma: 5, intervaloHoras: 12 },
      { id: '12+', rotulo: '12 anos ou mais', mgToma: 10, intervaloHoras: 24 },
    ],
    idadeMinima: 'Não recomendada abaixo dos 2 anos.',
    conselho: 'Pode dar-se com ou sem alimentos. Pode causar alguma sonolência. Não recomendada abaixo dos 2 anos.',
    concentracoes: [
      { mgPorMl: 1, rotulo: '1 mg/mL', detalhe: 'Solução oral (5 mg em 5 mL)' },
      { mgPorMl: 10, mgPorGota: 0.5, rotulo: '10 mg/mL', detalhe: 'Gotas orais · 20 gotas = 10 mg' },
    ],
  },
  desloratadina: {
    id: 'desloratadina',
    nome: 'Desloratadina',
    comoDar: [
      'Uma toma por dia, com ou sem alimentos.',
    ],
    limites: [
      '1 a 5 anos: <strong>1,25 mg</strong> (2,5 mL) 1×/dia.',
      '6 a 11 anos: <strong>2,5 mg</strong> (5 mL) 1×/dia.',
      '12 anos ou mais: <strong>5 mg</strong> (10 mL) 1×/dia.',
      'Não recomendada abaixo de 1 ano.',
    ],
    marcas: 'Aerius®, genéricos',
    grupo: 'alergia',
    porIdade: true,
    escaloes: [
      { id: '1-5', rotulo: '1 a 5 anos', mgToma: 1.25, intervaloHoras: 24 },
      { id: '6-11', rotulo: '6 a 11 anos', mgToma: 2.5, intervaloHoras: 24 },
      { id: '12+', rotulo: '12 anos ou mais', mgToma: 5, intervaloHoras: 24 },
    ],
    idadeMinima: 'Não recomendada abaixo de 1 ano.',
    conselho: 'Uma toma por dia, com ou sem alimentos. Raramente causa sonolência. Não recomendada abaixo de 1 ano.',
    concentracoes: [
      { mgPorMl: 0.5, rotulo: '0,5 mg/mL', detalhe: 'Solução oral (2,5 mg em 5 mL)' },
    ],
  },
  hidroxizina: {
    id: 'hidroxizina',
    nome: 'Hidroxizina',
    comoDar: [
      'Pode dar-se com ou sem alimentos.',
    ],
    limites: [
      '<strong>1–2 mg/kg/dia</strong>, divididos em 2 ou 3 tomas.',
      'Até 40 kg, não ultrapassar 2 mg/kg/dia; acima, máximo de 100 mg/dia.',
      'Só a partir de 1 ano.',
    ],
    marcas: 'Atarax®, genéricos',
    grupo: 'alergia',
    porDia: true,
    substancia: 'hidroxizina',
    doses: [
      { mgPorKgDia: 1, rotulo: '1 mg/kg/dia', detalhe: 'Dose habitual' },
      { mgPorKgDia: 2, rotulo: '2 mg/kg/dia', detalhe: 'Dose máxima' },
    ],
    mgPorKgDiaMin: 0.5,
    mgPorKgDiaMax: 2,
    intervalos: [12, 8],
    maxMgDia: 100,
    pesoMinimo: 10,
    conselho:
      'Só com receita médica; a partir de 1 ano. Causa sonolência: atenção na escola e em atividades que exijam concentração. Evitar com outros medicamentos que prolonguem o intervalo QT.',
    concentracoes: [
      { mgPorMl: 2, rotulo: '10 mg/5 mL', detalhe: 'Xarope (ex.: Atarax®)' },
    ],
  },
};

export const PESO_MIN = 3;
export const PESO_MAX = 60;
// Acima deste peso as formulações em comprimido são geralmente mais práticas.
export const PESO_ADULTO = 40;

const arred1 = (n) => Math.round(n * 10) / 10;
const gotasDe = (mg, formulacao) => (formulacao?.mgPorGota ? Math.round(mg / formulacao.mgPorGota) : null);

/**
 * Calcula a dose para um peso (kg), medicamento e concentração (mg/mL).
 * Nos antibióticos, `opcoes` indica a dose diária (mgPorKgDia) e o intervalo
 * (intervaloHoras); por omissão, a dose habitual e o intervalo da formulação.
 * Devolve { ok: false, motivo } se não for possível calcular com segurança.
 */
export function calcularDose(peso, medicamentoId, mgPorMl, opcoes = {}) {
  const med = MEDICAMENTOS[medicamentoId];
  if (!med) return { ok: false, motivo: 'Medicamento desconhecido.' };
  if (med.porIdade) return calcularPorIdade(med, mgPorMl, opcoes);

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

  if (med.porDia) return calcularPorDia(med, p, c, opcoes);

  const formulacao = med.concentracoes.find((x) => x.mgPorMl === c) || null;
  let mgCalculado;
  if (med.escaloesPeso) {
    mgCalculado = med.escaloesPeso.filter((e) => p >= e.min).at(-1).mg;
  } else if (med.doseFixaAPartirDe && p >= med.doseFixaAPartirDe) {
    mgCalculado = med.maxMgPorToma;
  } else {
    mgCalculado = p * med.mgPorKg;
  }
  const limitado = mgCalculado > med.maxMgPorToma;
  const mgToma = Math.min(mgCalculado, med.maxMgPorToma);
  const ml = arred1(mgToma / c);
  const gotas = gotasDe(mgToma, formulacao);

  return {
    ok: true,
    medicamento: med,
    formulacao,
    peso: p,
    mgPorMl: c,
    // Doses pequenas (antieméticos) precisam de uma casa decimal.
    mgToma: arred1(mgToma) >= 100 ? Math.round(mgToma) : arred1(mgToma),
    ml,
    gotas,
    gotasMaxDia: gotas === null ? null : gotas * med.tomasPorDia,
    limitado,
    intervaloHoras: med.intervaloHoras,
    tomasPorDia: med.tomasPorDia,
    mgMaxDia: arred1(mgToma * med.tomasPorDia),
    mlMaxDia: arred1(ml * med.tomasPorDia),
    pesoAdulto: p >= PESO_ADULTO,
  };
}

function calcularPorIdade(med, mgPorMl, opcoes) {
  const escalao = med.escaloes.find((e) => e.id === opcoes.idade);
  if (!escalao) {
    return { ok: false, motivo: `Escolha a idade da criança. ${med.idadeMinima}` };
  }
  const c = Number(mgPorMl);
  if (!Number.isFinite(c) || c <= 0) {
    return { ok: false, motivo: 'Concentração inválida.' };
  }
  const formulacao = med.concentracoes.find((x) => x.mgPorMl === c) || null;
  const tomasPorDia = 24 / escalao.intervaloHoras;
  const ml = arred1(escalao.mgToma / c);
  const gotas = gotasDe(escalao.mgToma, formulacao);
  return {
    ok: true,
    medicamento: med,
    formulacao,
    escalao,
    peso: null,
    mgPorMl: c,
    mgToma: escalao.mgToma,
    ml,
    gotas,
    gotasMaxDia: gotas === null ? null : gotas * tomasPorDia,
    limitado: false,
    intervaloHoras: escalao.intervaloHoras,
    tomasPorDia,
    mgMaxDia: escalao.mgToma * tomasPorDia,
    mlMaxDia: arred1(ml * tomasPorDia),
    pesoAdulto: false,
  };
}

function calcularPorDia(med, p, c, opcoes) {
  const formulacao = med.concentracoes.find((x) => x.mgPorMl === c) || null;
  const mgPorKgDia = Number(opcoes.mgPorKgDia ?? med.doses[0].mgPorKgDia);
  if (!Number.isFinite(mgPorKgDia) || mgPorKgDia < med.mgPorKgDiaMin || mgPorKgDia > med.mgPorKgDiaMax) {
    return {
      ok: false,
      motivo: `Indique a dose diária prescrita (${med.mgPorKgDiaMin}–${med.mgPorKgDiaMax} mg/kg/dia de ${med.substancia}).`,
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
  const gotas = gotasDe(mgToma, formulacao);

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
    mgToma: arred1(mgToma) >= 100 ? Math.round(mgToma) : arred1(mgToma),
    ml,
    gotas,
    gotasMaxDia: gotas === null ? null : gotas * tomasPorDia,
    limitado,
    intervaloHoras,
    tomasPorDia,
    mgMaxDia: arred1(mgToma * tomasPorDia),
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
