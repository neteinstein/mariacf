// APGAR familiar, EPDS, Escala de Zarit, Teste de Fagerström e Teste de
// Morisky — instrumentos de avaliação psicossocial e familiar frequentes
// em MGF.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Smilkstein G, J Fam Pract 1978 (APGAR familiar); Cox JL,
// Holden JM & Sagovsky R, Br J Psychiatry 1987, e Areias ME et al.
// (validação portuguesa), 1996 (EPDS); Zarit SH, Reever KE & Bach-Peterson
// J, Gerontologist 1980, e Sequeira C (validação portuguesa), 2010 (Zarit);
// Heatherton TF et al., Br J Addict 1991 (Fagerström/FTND); Morisky DE,
// Green LW & Levine DM, Med Care 1986 (escala original de 4 itens de
// adesão à terapêutica).
//
// Nota: o EPDS e a Escala de Zarit podem ser reproduzidos livremente para
// uso clínico e de investigação, desde que citados os autores originais.

function soma(respostas, n) {
  const vals = respostas.slice(0, n).map(Number);
  if (vals.length < n || vals.some((v) => !Number.isFinite(v))) return null;
  return vals.reduce((a, b) => a + b, 0);
}

/** APGAR familiar: 5 itens, cada um 0–2. */
export function calcularAPGARFamiliar(respostas = []) {
  const pontos = soma(respostas, 5);
  if (pontos === null) return { ok: false, motivo: 'Responda a todas as perguntas.' };

  let nivel;
  let funcao;
  if (pontos >= 7) { nivel = 'baixo'; funcao = 'Função familiar boa'; }
  else if (pontos >= 4) { nivel = 'moderado'; funcao = 'Disfunção familiar moderada'; }
  else { nivel = 'alto'; funcao = 'Disfunção familiar acentuada'; }

  return { ok: true, pontos, max: 10, nivel, funcao };
}

/** EPDS: 10 itens, cada um 0–3. */
export function calcularEPDS(respostas = []) {
  const pontos = soma(respostas, 10);
  if (pontos === null) return { ok: false, motivo: 'Responda a todas as perguntas.' };

  let nivel;
  let gravidade;
  if (pontos < 10) { nivel = 'baixo'; gravidade = 'Baixa probabilidade de depressão'; }
  else if (pontos < 13) { nivel = 'moderado'; gravidade = 'Possível depressão ligeira — considerar reavaliação'; }
  else { nivel = 'alto'; gravidade = 'Provável depressão — recomendada avaliação clínica'; }

  const itemRisco = Number(respostas[9]) > 0;

  return { ok: true, pontos, max: 30, nivel, gravidade, itemRisco };
}

/** Escala de Zarit (22 itens), cada um 0–4. */
export function calcularZarit(respostas = []) {
  const pontos = soma(respostas, 22);
  if (pontos === null) return { ok: false, motivo: 'Responda a todas as perguntas.' };

  let nivel;
  let sobrecarga;
  if (pontos <= 46) { nivel = 'baixo'; sobrecarga = 'Sem sobrecarga'; }
  else if (pontos <= 55) { nivel = 'moderado'; sobrecarga = 'Sobrecarga moderada'; }
  else { nivel = 'alto'; sobrecarga = 'Sobrecarga intensa'; }

  return { ok: true, pontos, max: 88, nivel, sobrecarga };
}

/** Teste de Fagerström (FTND): 6 itens com pontuações específicas. */
export function calcularFagerstrom(respostas = {}) {
  const campos = ['primeiroCigarro', 'dificilNaoFumar', 'cigarroDificilRenunciar', 'cigarrosPorDia', 'maisDeManha', 'fumaDoente'];
  const valores = campos.map((c) => Number(respostas[c]));
  const pontos = soma(valores, 6);
  if (pontos === null) return { ok: false, motivo: 'Responda a todas as perguntas.' };

  let nivel;
  let dependencia;
  if (pontos <= 2) { nivel = 'baixo'; dependencia = 'Dependência muito baixa'; }
  else if (pontos <= 4) { nivel = 'baixo'; dependencia = 'Dependência baixa'; }
  else if (pontos === 5) { nivel = 'moderado'; dependencia = 'Dependência moderada'; }
  else if (pontos <= 7) { nivel = 'alto'; dependencia = 'Dependência elevada'; }
  else { nivel = 'muito-alto'; dependencia = 'Dependência muito elevada'; }

  return { ok: true, pontos, max: 10, nivel, dependencia };
}

/** Teste de Morisky (versão original de 4 itens, 1986): adesão à terapêutica. */
export function calcularMorisky(respostas = {}) {
  const campos = ['esquecimento', 'descuido', 'paraQuandoBem', 'paraQuandoMal'];
  const valores = campos.map((c) => Number(respostas[c]));
  const pontos = soma(valores, 4);
  if (pontos === null) return { ok: false, motivo: 'Responda a todas as perguntas.' };

  let nivel;
  let adesao;
  if (pontos === 0) { nivel = 'baixo'; adesao = 'Alta adesão'; }
  else if (pontos <= 2) { nivel = 'moderado'; adesao = 'Adesão média'; }
  else { nivel = 'alto'; adesao = 'Baixa adesão'; }

  return { ok: true, pontos, max: 4, nivel, adesao };
}
