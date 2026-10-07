// CAT e ACT — DPOC e asma.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: COPD Assessment Test (CAT, GSK/GOLD); Asthma Control Test
// (ACT, QualityMetric/GINA).

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
