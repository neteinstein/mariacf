// Bishop score, índice de Apgar neonatal e Escala de Coma de Glasgow
// pediátrica — avaliação do parto, do recém-nascido e da criança pequena.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Bishop EH, Obstet Gynecol 1964 (Bishop score); Apgar V,
// Curr Res Anesth Analg 1953 (índice de Apgar); Teasdale G & Jennett B,
// Lancet 1974, com adaptação pediátrica (James HE, 1986).

/** Bishop score: favorabilidade do colo para indução do parto, máx. 13. */
export function calcularBishop({ dilatacao, apagamento, consistencia, posicao, altura }) {
  const campos = { dilatacao, apagamento, consistencia, posicao, altura };
  const valores = Object.values(campos).map(Number);
  if (valores.some((v) => !Number.isFinite(v))) return { ok: false, motivo: 'Preencha todos os itens.' };

  const pontos = valores.reduce((a, b) => a + b, 0);
  const nivel = pontos >= 8 ? 'baixo' : pontos >= 6 ? 'moderado' : 'alto';
  const recomendacao =
    pontos >= 8
      ? 'Colo favorável — probabilidade de indução bem-sucedida semelhante à do trabalho de parto espontâneo.'
      : pontos >= 6
      ? 'Colo intermédio — considerar reavaliação.'
      : 'Colo desfavorável — considerar métodos de preparação cervical antes da indução.';

  return { ok: true, pontos, max: 13, nivel, recomendacao };
}

/** Índice de Apgar: 5 itens, cada um 0–2, avaliado ao 1.º e 5.º minuto. */
export function calcularApgar(respostas = {}) {
  const campos = ['frequenciaCardiaca', 'esforcoRespiratorio', 'tonusMuscular', 'irritabilidadeReflexa', 'cor'];
  const valores = campos.map((c) => Number(respostas[c]));
  if (valores.some((v) => !Number.isFinite(v))) return { ok: false, motivo: 'Preencha todos os itens.' };

  const pontos = valores.reduce((a, b) => a + b, 0);
  let nivel;
  let gravidade;
  if (pontos >= 7) { nivel = 'baixo'; gravidade = 'Normal'; }
  else if (pontos >= 4) { nivel = 'alto'; gravidade = 'Moderadamente deprimido'; }
  else { nivel = 'muito-alto'; gravidade = 'Gravemente deprimido — pode necessitar de reanimação'; }

  return { ok: true, pontos, max: 10, nivel, gravidade };
}

/** GCS pediátrico (resposta verbal adaptada para crianças pequenas). */
export function calcularGlasgowPediatrico(aberturaOcular, respostaVerbal, respostaMotora) {
  const e = Number(aberturaOcular);
  const v = Number(respostaVerbal);
  const m = Number(respostaMotora);

  if (!Number.isFinite(e) || e < 1 || e > 4) return { ok: false, motivo: 'Indique a abertura ocular.' };
  if (!Number.isFinite(v) || v < 1 || v > 5) return { ok: false, motivo: 'Indique a resposta verbal.' };
  if (!Number.isFinite(m) || m < 1 || m > 6) return { ok: false, motivo: 'Indique a resposta motora.' };

  const pontos = e + v + m;
  let nivel;
  let gravidade;
  if (pontos >= 13) { nivel = 'baixo'; gravidade = 'Traumatismo crânio-encefálico ligeiro'; }
  else if (pontos >= 9) { nivel = 'alto'; gravidade = 'Traumatismo crânio-encefálico moderado'; }
  else { nivel = 'muito-alto'; gravidade = 'Traumatismo crânio-encefálico grave — considerar proteção da via aérea'; }

  return { ok: true, pontos, max: 15, nivel, gravidade };
}
