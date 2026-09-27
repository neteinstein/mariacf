// CAT, ACT e Centor/McIsaac — DPOC, asma e faringite estreptocócica.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: COPD Assessment Test (CAT, GSK/GOLD); Asthma Control Test
// (ACT, QualityMetric/GINA); Centor (1981) modificado por McIsaac et al. (1998, 2004).

function soma(respostas, n) {
  const vals = respostas.slice(0, n).map(Number);
  if (vals.length < n || vals.some((v) => !Number.isFinite(v))) return null;
  return vals.reduce((a, b) => a + b, 0);
}

/** CAT: 8 itens, cada um 0–5. */
export function calcularCAT(respostas = []) {
  const pontos = soma(respostas, 8);
  if (pontos === null) return { ok: false, motivo: 'Responda a todos os itens.' };

  let nivel;
  let impacto;
  if (pontos < 10) { nivel = 'baixo'; impacto = 'Impacto baixo'; }
  else if (pontos <= 20) { nivel = 'moderado'; impacto = 'Impacto médio'; }
  else if (pontos <= 30) { nivel = 'alto'; impacto = 'Impacto alto'; }
  else { nivel = 'muito-alto'; impacto = 'Impacto muito alto'; }

  return { ok: true, pontos, max: 40, nivel, impacto };
}

/** ACT: 5 itens, cada um 1–5. */
export function calcularACT(respostas = []) {
  const pontos = soma(respostas, 5);
  if (pontos === null) return { ok: false, motivo: 'Responda a todos os itens.' };

  let nivel;
  let controlo;
  if (pontos >= 25) { nivel = 'baixo'; controlo = 'Controlo total da asma'; }
  else if (pontos >= 20) { nivel = 'baixo'; controlo = 'Asma bem controlada'; }
  else { nivel = 'alto'; controlo = 'Asma não controlada'; }

  return { ok: true, pontos, max: 25, nivel, controlo };
}

/**
 * Centor/McIsaac.
 * criterios: { febre, semTosse, exsudadoAmigdalino, adenopatiaDolorosa }, idade em anos.
 */
export function calcularCentor(criterios = {}, idade) {
  const idadeNum = Number(idade);
  if (!Number.isFinite(idadeNum) || idadeNum < 0) {
    return { ok: false, motivo: 'Indique a idade.' };
  }

  const c = {
    febre: !!criterios.febre,
    semTosse: !!criterios.semTosse,
    exsudadoAmigdalino: !!criterios.exsudadoAmigdalino,
    adenopatiaDolorosa: !!criterios.adenopatiaDolorosa,
  };

  const pontosCentor =
    (c.febre ? 1 : 0) + (c.semTosse ? 1 : 0) + (c.exsudadoAmigdalino ? 1 : 0) + (c.adenopatiaDolorosa ? 1 : 0);

  let ajusteIdade;
  if (idadeNum < 3) ajusteIdade = null; // McIsaac não se aplica < 3 anos
  else if (idadeNum <= 14) ajusteIdade = 1;
  else if (idadeNum <= 44) ajusteIdade = 0;
  else ajusteIdade = -1;

  if (ajusteIdade === null) {
    return { ok: false, motivo: 'A pontuação de McIsaac não se aplica a crianças com menos de 3 anos.' };
  }

  const pontos = pontosCentor + ajusteIdade;

  let risco;
  let recomendacao;
  if (pontos <= 0) { risco = '1–2,5%'; recomendacao = 'Baixa probabilidade — não testar nem tratar com antibiótico.'; }
  else if (pontos === 1) { risco = '5–10%'; recomendacao = 'Baixa probabilidade — geralmente não testar nem tratar.'; }
  else if (pontos === 2) { risco = '11–17%'; recomendacao = 'Probabilidade intermédia — considerar teste rápido/cultura antes de decidir antibiótico.'; }
  else if (pontos === 3) { risco = '28–35%'; recomendacao = 'Probabilidade intermédia-alta — considerar teste rápido/cultura antes de decidir antibiótico.'; }
  else { risco = '51–53%'; recomendacao = 'Alta probabilidade — considerar tratamento antibiótico empírico ou teste rápido/cultura.'; }

  const nivel = pontos <= 1 ? 'baixo' : pontos <= 3 ? 'moderado' : 'alto';

  return { ok: true, pontosCentor, ajusteIdade, pontos, risco, recomendacao, nivel };
}
