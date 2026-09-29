// PHQ-9, GAD-7 e AUDIT / AUDIT-C — rastreio de depressão, ansiedade e consumo de álcool.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Kroenke & Spitzer (PHQ-9, 2001); Spitzer et al. (GAD-7, 2006);
// Babor et al., AUDIT — The Alcohol Use Disorders Identification Test, OMS (2001).

function soma(respostas, n) {
  const vals = respostas.slice(0, n).map(Number);
  if (vals.length < n || vals.some((v) => !Number.isFinite(v))) return null;
  return vals.reduce((a, b) => a + b, 0);
}

/** PHQ-9: 9 respostas, cada uma 0–3. */
export function calcularPHQ9(respostas = []) {
  const pontos = soma(respostas, 9);
  if (pontos === null) return { ok: false, motivo: 'Responda a todas as perguntas.' };

  let nivel;
  let gravidade;
  if (pontos <= 4) { nivel = 'baixo'; gravidade = 'Sintomas mínimos'; }
  else if (pontos <= 9) { nivel = 'baixo'; gravidade = 'Depressão ligeira'; }
  else if (pontos <= 14) { nivel = 'moderado'; gravidade = 'Depressão moderada'; }
  else if (pontos <= 19) { nivel = 'alto'; gravidade = 'Depressão moderadamente grave'; }
  else { nivel = 'muito-alto'; gravidade = 'Depressão grave'; }

  const itemRisco = Number(respostas[8]) > 0;

  return { ok: true, pontos, max: 27, nivel, gravidade, itemRisco };
}

/** GAD-7: 7 respostas, cada uma 0–3. */
export function calcularGAD7(respostas = []) {
  const pontos = soma(respostas, 7);
  if (pontos === null) return { ok: false, motivo: 'Responda a todas as perguntas.' };

  let nivel;
  let gravidade;
  if (pontos <= 4) { nivel = 'baixo'; gravidade = 'Ansiedade mínima'; }
  else if (pontos <= 9) { nivel = 'baixo'; gravidade = 'Ansiedade ligeira'; }
  else if (pontos <= 14) { nivel = 'moderado'; gravidade = 'Ansiedade moderada'; }
  else { nivel = 'alto'; gravidade = 'Ansiedade grave'; }

  return { ok: true, pontos, max: 21, nivel, gravidade };
}

/** AUDIT: 10 respostas. Itens 1–8: 0–4. Itens 9–10: 0, 2 ou 4. */
export function calcularAUDIT(respostas = [], sexoFeminino = false) {
  const pontos = soma(respostas, 10);
  if (pontos === null) return { ok: false, motivo: 'Responda a todas as perguntas.' };

  const auditC = soma(respostas, 3);

  let nivel;
  let gravidade;
  if (pontos <= 7) { nivel = 'baixo'; gravidade = 'Baixo risco'; }
  else if (pontos <= 15) { nivel = 'moderado'; gravidade = 'Consumo de risco'; }
  else if (pontos <= 19) { nivel = 'alto'; gravidade = 'Consumo nocivo'; }
  else { nivel = 'muito-alto'; gravidade = 'Possível dependência do álcool'; }

  const cutoffC = sexoFeminino ? 3 : 4;
  const auditCPositivo = auditC >= cutoffC;

  return { ok: true, pontos, max: 40, nivel, gravidade, auditC, auditCPositivo, cutoffC };
}

/**
 * ASRS v1.1 (parte A, rastreio): 6 respostas de 0 (nunca) a 4 (muito frequentemente).
 * Nos itens 1–3 conta a partir de «às vezes» (2); nos itens 4–6 a partir de
 * «frequentemente» (3). 4 ou mais itens assinalados → sintomas compatíveis
 * com PHDA no adulto, justificando avaliação mais detalhada.
 * Referência: Kessler RC et al., Psychol Med 2005 (OMS).
 */
export function calcularASRS(respostas = []) {
  const vals = respostas.slice(0, 6).map(Number);
  if (vals.length < 6 || vals.some((v) => !Number.isFinite(v))) return { ok: false, motivo: 'Responda a todas as perguntas.' };

  const assinalados = vals.filter((v, i) => v >= (i < 3 ? 2 : 3)).length;
  const positivo = assinalados >= 4;
  return {
    ok: true,
    assinalados,
    max: 6,
    positivo,
    nivel: positivo ? 'alto' : 'baixo',
    interpretacao: positivo
      ? 'Rastreio positivo — sintomas compatíveis com PHDA no adulto; justifica avaliação clínica detalhada'
      : 'Rastreio negativo — sintomas pouco sugestivos de PHDA no adulto',
  };
}
