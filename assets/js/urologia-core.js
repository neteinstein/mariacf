// IPSS (International Prostate Symptom Score) — sintomas do trato urinário
// inferior / hiperplasia benigna da próstata.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referência: Barry MJ et al., J Urol 1992 (AUA Symptom Index / IPSS).

/** IPSS: 7 sintomas, cada um 0–5. Devolve também a pontuação de qualidade de vida (0–6), que não soma ao total. */
export function calcularIPSS(respostas = [], qualidadeVida) {
  const vals = respostas.slice(0, 7).map(Number);
  if (vals.length < 7 || vals.some((v) => !Number.isFinite(v))) {
    return { ok: false, motivo: 'Responda a todas as perguntas.' };
  }

  const pontos = vals.reduce((a, b) => a + b, 0);

  let nivel;
  let gravidade;
  if (pontos <= 7) { nivel = 'baixo'; gravidade = 'Sintomas ligeiros'; }
  else if (pontos <= 19) { nivel = 'moderado'; gravidade = 'Sintomas moderados'; }
  else { nivel = 'alto'; gravidade = 'Sintomas graves'; }

  const qv = Number(qualidadeVida);
  const qualidadeVidaValida = Number.isFinite(qv) && qv >= 0 && qv <= 6;

  return { ok: true, pontos, max: 35, nivel, gravidade, qualidadeVida: qualidadeVidaValida ? qv : null };
}
