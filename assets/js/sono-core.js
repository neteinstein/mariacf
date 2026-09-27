// Escala de sonolência de Epworth e STOP-BANG — sonolência diurna e
// rastreio de apneia obstrutiva do sono.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Johns MW, Sleep 1991 (Epworth); Chung F et al.,
// Anesthesiology 2008 (STOP-BANG).

function soma(respostas, n) {
  const vals = respostas.slice(0, n).map(Number);
  if (vals.length < n || vals.some((v) => !Number.isFinite(v))) return null;
  return vals.reduce((a, b) => a + b, 0);
}

/** Epworth: 8 itens, cada um 0–3. */
export function calcularEpworth(respostas = []) {
  const pontos = soma(respostas, 8);
  if (pontos === null) return { ok: false, motivo: 'Responda a todos os itens.' };

  let nivel;
  let gravidade;
  if (pontos <= 7) { nivel = 'baixo'; gravidade = 'Sonolência diurna normal'; }
  else if (pontos <= 9) { nivel = 'moderado'; gravidade = 'Sonolência diurna ligeiramente elevada'; }
  else if (pontos <= 15) { nivel = 'alto'; gravidade = 'Sonolência diurna moderadamente elevada'; }
  else { nivel = 'muito-alto'; gravidade = 'Sonolência diurna elevada'; }

  return { ok: true, pontos, max: 24, nivel, gravidade };
}

/** STOP-BANG: 8 itens sim/não, 1 ponto cada. */
export function calcularSTOPBANG(fatores = {}) {
  const chave = ['ressonar', 'cansaco', 'apneiaObservada', 'pressaoArterial', 'imc35', 'idade50', 'pescoco40', 'sexoMasculino'];
  const pontos = chave.reduce((acc, k) => acc + (fatores[k] ? 1 : 0), 0);

  let nivel;
  let risco;
  if (pontos <= 2) { nivel = 'baixo'; risco = 'Risco baixo de apneia obstrutiva do sono.'; }
  else if (pontos <= 4) { nivel = 'moderado'; risco = 'Risco intermédio — considerar estudo do sono.'; }
  else { nivel = 'alto'; risco = 'Risco elevado — referenciar para estudo do sono.'; }

  return { ok: true, pontos, max: 8, nivel, risco };
}
