// FINDRISC, MUST e fatores de risco de fratura osteoporótica — rastreio
// preventivo em cuidados de saúde primários.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Lindström J & Tuomilehto J, Diabetes Care 2003 (FINDRISC);
// BAPEN, "MUST" Malnutrition Universal Screening Tool, 2003.
//
// Nota sobre fratura osteoporótica: esta calculadora NÃO reproduz o
// algoritmo FRAX® (Universidade de Sheffield), que é proprietário e
// calibrado com dados epidemiológicos não públicos. Apresenta antes uma
// checklist dos principais fatores de risco clínico, para apoiar a decisão
// de pedir densitometria óssea (DXA) ou calcular o FRAX oficial.

/** FINDRISC: risco de diabetes tipo 2 a 10 anos. */
export function calcularFINDRISC(respostas = {}) {
  let pontos = 0;

  const idade = Number(respostas.idade);
  if (!Number.isFinite(idade)) return { ok: false, motivo: 'Indique a idade.' };
  if (idade >= 65) pontos += 4;
  else if (idade >= 55) pontos += 3;
  else if (idade >= 45) pontos += 2;

  const imc = Number(respostas.imc);
  if (!Number.isFinite(imc)) return { ok: false, motivo: 'Indique o IMC.' };
  if (imc > 30) pontos += 3;
  else if (imc >= 25) pontos += 1;

  const cintura = Number(respostas.cintura);
  const sexoFeminino = !!respostas.sexoFeminino;
  if (!Number.isFinite(cintura)) return { ok: false, motivo: 'Indique o perímetro da cintura.' };
  const limites = sexoFeminino ? [80, 88] : [94, 102];
  if (cintura > limites[1]) pontos += 4;
  else if (cintura >= limites[0]) pontos += 3;

  if (!respostas.atividadeFisica) pontos += 2;
  if (!respostas.fruitasVegetais) pontos += 1;
  if (respostas.antiHipertensores) pontos += 2;
  if (respostas.glicemiaElevadaPrevia) pontos += 5;
  if (respostas.historiaFamiliar === 'primeiro-grau') pontos += 5;
  else if (respostas.historiaFamiliar === 'segundo-grau') pontos += 3;

  let nivel;
  let risco;
  if (pontos < 7) { nivel = 'baixo'; risco = '~1%'; }
  else if (pontos <= 11) { nivel = 'baixo'; risco = '~4%'; }
  else if (pontos <= 14) { nivel = 'moderado'; risco = '~17%'; }
  else if (pontos <= 20) { nivel = 'alto'; risco = '~33%'; }
  else { nivel = 'muito-alto'; risco = '~50%'; }

  return { ok: true, pontos, max: 26, nivel, risco };
}

/** MUST: rastreio de desnutrição. imc em kg/m², perdaPesoPercent em %. */
export function calcularMUST({ imc, perdaPesoPercent, doencaAguda }) {
  const i = Number(imc);
  const p = Number(perdaPesoPercent);

  if (!Number.isFinite(i) || i <= 0) return { ok: false, motivo: 'Indique o IMC.' };
  if (!Number.isFinite(p) || p < 0) return { ok: false, motivo: 'Indique a percentagem de perda de peso.' };

  let pontosIMC;
  if (i >= 20) pontosIMC = 0;
  else if (i >= 18.5) pontosIMC = 1;
  else pontosIMC = 2;

  let pontosPerda;
  if (p < 5) pontosPerda = 0;
  else if (p <= 10) pontosPerda = 1;
  else pontosPerda = 2;

  const pontosDoenca = doencaAguda ? 2 : 0;
  const pontos = pontosIMC + pontosPerda + pontosDoenca;

  let nivel;
  let recomendacao;
  if (pontos === 0) { nivel = 'baixo'; recomendacao = 'Risco baixo — reavaliação de rotina.'; }
  else if (pontos === 1) { nivel = 'moderado'; recomendacao = 'Risco médio — observar e documentar a ingestão nutricional 3 dias.'; }
  else { nivel = 'alto'; recomendacao = 'Risco alto — referenciar para nutrição e iniciar plano de intervenção nutricional.'; }

  return { ok: true, pontos, max: 6, nivel, recomendacao };
}

/** Checklist de fatores de risco de fratura osteoporótica (não substitui o FRAX). */
export function calcularRiscoFratura(fatores = {}) {
  const chave = [
    'fraturaFragilidadePrevia', 'fraturaAncaPais', 'imcBaixo', 'fumador',
    'alcoolExcessivo', 'corticoterapia', 'artriteReumatoide', 'causaSecundaria',
  ];
  const pontos = chave.reduce((acc, k) => acc + (fatores[k] ? 1 : 0), 0) + (fatores.idadeRisco ? 1 : 0);

  let nivel;
  let recomendacao;
  if (pontos === 0) { nivel = 'baixo'; recomendacao = 'Sem fatores major identificados — seguir recomendações gerais de saúde óssea.'; }
  else if (pontos <= 2) { nivel = 'moderado'; recomendacao = 'Considerar calcular o FRAX oficial (com ou sem DXA) para estimar o risco a 10 anos.'; }
  else { nivel = 'alto'; recomendacao = 'Vários fatores de risco — referenciar para densitometria óssea (DXA) e calcular o FRAX oficial.'; }

  return { ok: true, pontos, nivel, recomendacao };
}
