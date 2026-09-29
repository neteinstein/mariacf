// Plano de rastreios e prevenção por idade e sexo, segundo os programas de
// rastreio de base populacional do SNS e as normas da DGS, com algumas
// recomendações internacionais assinaladas como tal.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Programas de rastreio oncológico do SNS (colo do útero,
// mama, cólon e reto); Recomendação do Conselho da UE sobre rastreio do
// cancro (2022/C 473/01); DGS, Norma 005/2013 (avaliação do risco
// cardiovascular SCORE); DGS, Norma 002/2011 (diagnóstico e classificação
// da diabetes); DGS, Norma 058/2011 (diagnóstico da infeção por VIH);
// ESVS 2024 (aneurisma da aorta abdominal); Programa Nacional para a Saúde
// da Visão (retinopatia diabética).

/**
 * Cada rastreio: quem (sexo, idades, condição), a periodicidade e, quando
 * existe, a calculadora do site que ajuda a fazê-lo.
 */
export const RASTREIOS = [
  {
    id: 'colo-utero',
    titulo: 'Cancro do colo do útero',
    exame: 'Teste de HPV (colheita cervical)',
    periodicidade: 'De 5 em 5 anos',
    sexo: 'f',
    idadeMin: 25,
    idadeMax: 60,
    fonte: 'Programa de rastreio do SNS',
  },
  {
    id: 'mama',
    titulo: 'Cancro da mama',
    exame: 'Mamografia',
    periodicidade: 'De 2 em 2 anos',
    sexo: 'f',
    idadeMin: 45,
    idadeMax: 74,
    nota: 'O programa foi alargado dos 50–69 para os 45–74 anos; o convite pode ainda não ter chegado a todas as regiões.',
    fonte: 'Programa de rastreio do SNS',
  },
  {
    id: 'colorretal',
    titulo: 'Cancro do cólon e reto',
    exame: 'Pesquisa de sangue oculto nas fezes (teste imunoquímico)',
    periodicidade: 'De 2 em 2 anos',
    idadeMin: 50,
    idadeMax: 74,
    fonte: 'Programa de rastreio do SNS',
  },
  {
    id: 'risco-cv',
    titulo: 'Risco cardiovascular',
    exame: 'Pressão arterial, colesterol e cálculo do SCORE2',
    periodicidade: 'Pelo menos de 5 em 5 anos (mais vezes se risco elevado)',
    idadeMinPorSexo: { m: 40, f: 50 },
    idadeMax: 89,
    nota: 'Nas mulheres, também a partir da menopausa, se antes dos 50 anos.',
    calculadora: 'calculadora-risco-cardiovascular/',
    fonte: 'DGS',
  },
  {
    id: 'pressao-arterial',
    titulo: 'Hipertensão arterial',
    exame: 'Medição da pressão arterial',
    periodicidade: 'Pelo menos uma vez por ano',
    idadeMin: 18,
    fonte: 'DGS',
  },
  {
    id: 'diabetes',
    titulo: 'Diabetes tipo 2',
    exame: 'Questionário FINDRISC e glicemia em jejum ou HbA1c se risco elevado',
    periodicidade: 'Pelo menos de 3 em 3 anos (anual se risco elevado)',
    idadeMin: 18,
    calculadora: 'calculadora-rastreio/?calc=findrisc',
    fonte: 'DGS',
  },
  {
    id: 'vih-hepatites',
    titulo: 'VIH e hepatites B e C',
    exame: 'Análises ao sangue',
    periodicidade: 'Pelo menos uma vez na vida (repetir se houver exposição de risco)',
    idadeMin: 18,
    idadeMax: 64,
    fonte: 'DGS',
  },
  {
    id: 'alcool',
    titulo: 'Consumo de álcool',
    exame: 'Questionário AUDIT-C',
    periodicidade: 'Anual, nas consultas de rotina',
    idadeMin: 18,
    calculadora: 'calculadora-saude-mental/?calc=audit',
    fonte: 'DGS',
  },
  {
    id: 'osteoporose',
    titulo: 'Osteoporose',
    exame: 'Avaliação dos fatores de risco de fratura e densitometria (DXA) se indicado',
    periodicidade: 'A partir dos 65 anos, ou antes se houver fatores de risco',
    sexo: 'f',
    idadeMin: 65,
    calculadora: 'calculadora-rastreio/?calc=fratura',
    fonte: 'Recomendação internacional',
  },
  {
    id: 'aaa',
    titulo: 'Aneurisma da aorta abdominal',
    exame: 'Ecografia abdominal (uma única vez)',
    periodicidade: 'Uma vez',
    sexo: 'm',
    idadeMin: 65,
    idadeMax: 75,
    requer: 'fumador',
    nota: 'Recomendada em homens fumadores ou ex-fumadores; não é um programa organizado do SNS.',
    fonte: 'Recomendação internacional',
  },
  {
    id: 'retinopatia',
    titulo: 'Retinopatia diabética',
    exame: 'Retinografia',
    periodicidade: 'Anual',
    idadeMin: 12,
    requer: 'diabetes',
    fonte: 'Programa de rastreio do SNS',
  },
  {
    id: 'pe-diabetico',
    titulo: 'Pé diabético',
    exame: 'Observação dos pés e teste de sensibilidade (monofilamento)',
    periodicidade: 'Pelo menos anual',
    idadeMin: 12,
    requer: 'diabetes',
    fonte: 'DGS',
  },
  {
    id: 'rim-diabetes',
    titulo: 'Doença renal (na diabetes ou hipertensão)',
    exame: 'Creatinina (TFG estimada) e albuminúria',
    periodicidade: 'Anual',
    idadeMin: 18,
    requer: 'diabetesOuHipertensao',
    calculadora: 'calculadora-funcao-renal/?calc=kdigo',
    fonte: 'KDIGO',
  },
  {
    id: 'prostata',
    titulo: 'Cancro da próstata',
    exame: 'PSA — só após conversa sobre benefícios e riscos',
    periodicidade: 'Decisão partilhada com o médico',
    sexo: 'm',
    idadeMin: 50,
    idadeMax: 69,
    nota: 'Não é um rastreio de base populacional em Portugal: o PSA deve ser uma decisão informada.',
    fonte: 'Recomendação do Conselho da UE (2022)',
  },
];

function idadeMinima(r, sexo) {
  return r.idadeMinPorSexo ? r.idadeMinPorSexo[sexo] : r.idadeMin;
}

function cumpreCondicao(r, condicoes) {
  if (!r.requer) return true;
  if (r.requer === 'diabetesOuHipertensao') return condicoes.diabetes || condicoes.hipertensao;
  return Boolean(condicoes[r.requer]);
}

/**
 * Devolve os rastreios aplicáveis agora, os que se aplicarão no futuro
 * (com a idade de início) e os que já não se aplicam pela idade.
 * sexo: 'm' | 'f'. condicoes: { diabetes, hipertensao, fumador }.
 */
export function planoRastreios(idadeAnos, sexo, condicoes = {}) {
  const idade = Number(idadeAnos);
  if (idadeAnos === '' || !Number.isFinite(idade) || idade < 18 || idade > 100) {
    return { ok: false, motivo: 'Indique uma idade entre 18 e 100 anos.' };
  }
  if (sexo !== 'm' && sexo !== 'f') return { ok: false, motivo: 'Indique o sexo.' };

  const agora = [];
  const futuros = [];
  const terminados = [];

  RASTREIOS.forEach((r) => {
    if (r.sexo && r.sexo !== sexo) return;
    if (!cumpreCondicao(r, condicoes)) return;
    const min = idadeMinima(r, sexo);
    const max = r.idadeMax ?? Infinity;
    if (idade < min) futuros.push({ ...r, aPartirDe: min, faltamAnos: Math.ceil(min - idade) });
    else if (idade > max) terminados.push(r);
    else agora.push(r);
  });

  futuros.sort((a, b) => a.aPartirDe - b.aPartirDe);
  return { ok: true, agora, futuros, terminados };
}
