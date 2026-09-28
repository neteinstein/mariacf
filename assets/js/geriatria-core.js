// Índice de Barthel, Escala de Morse, Escala de Braden, um interpretador
// de pontuação do MMSE/MoCA, e a Escala de Depressão Geriátrica (GDS-15) —
// avaliação geriátrica em cuidados primários.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Mahoney FI & Barthel DW, Md State Med J 1965 (Barthel);
// Morse JM et al., Can J Aging 1989 (Morse); Bergstrom N et al., Nurs Res
// 1987 (Braden); Folstein MF et al., J Psychiatr Res 1975 e Guerreiro M et
// al. (validação portuguesa), 1994 (MMSE); Nasreddine ZS et al., JAGS 2005
// (MoCA); Sheikh JI & Yesavage JA, Clin Gerontol 1986 (GDS-15).
//
// Nota: o MMSE e o MoCA são instrumentos protegidos (o MMSE é comercial
// desde 2001). Esta calculadora não reproduz os itens dos testes — apenas
// classifica uma pontuação total já obtida pelo profissional com o
// instrumento oficial.

function soma(valores) {
  if (valores.some((v) => !Number.isFinite(v))) return null;
  return valores.reduce((a, b) => a + b, 0);
}

/** Índice de Barthel: 10 itens (valores conforme a escala oficial), total 0–100. */
export function calcularBarthel(itens = {}) {
  const campos = [
    'alimentacao', 'banho', 'higiene', 'vestir', 'intestino',
    'bexiga', 'wc', 'transferencias', 'mobilidade', 'escadas',
  ];
  const valores = campos.map((c) => Number(itens[c]));
  const pontos = soma(valores);
  if (pontos === null) return { ok: false, motivo: 'Preencha todos os itens.' };

  let nivel;
  let grau;
  if (pontos === 100) { nivel = 'baixo'; grau = 'Independente'; }
  else if (pontos >= 91) { nivel = 'baixo'; grau = 'Dependência ligeira'; }
  else if (pontos >= 61) { nivel = 'moderado'; grau = 'Dependência moderada'; }
  else if (pontos >= 21) { nivel = 'alto'; grau = 'Dependência grave'; }
  else { nivel = 'muito-alto'; grau = 'Dependência total'; }

  return { ok: true, pontos, max: 100, nivel, grau };
}

/** Escala de Morse: risco de queda, total 0–125. */
export function calcularMorse(itens = {}) {
  const campos = ['historiaQuedas', 'diagnosticoSecundario', 'apoioDeambulacao', 'terapiaEV', 'marcha', 'estadoMental'];
  const valores = campos.map((c) => Number(itens[c]));
  const pontos = soma(valores);
  if (pontos === null) return { ok: false, motivo: 'Preencha todos os itens.' };

  let nivel;
  let risco;
  if (pontos < 25) { nivel = 'baixo'; risco = 'Risco baixo'; }
  else if (pontos <= 50) { nivel = 'moderado'; risco = 'Risco moderado'; }
  else { nivel = 'alto'; risco = 'Risco elevado'; }

  return { ok: true, pontos, max: 125, nivel, risco };
}

/** Escala de Braden: risco de úlcera de pressão, total 6–23 (quanto menor, maior o risco). */
export function calcularBraden(itens = {}) {
  const campos = ['percepcaoSensorial', 'humidade', 'atividade', 'mobilidade', 'nutricao', 'friccao'];
  const valores = campos.map((c) => Number(itens[c]));
  const pontos = soma(valores);
  if (pontos === null) return { ok: false, motivo: 'Preencha todos os itens.' };

  let nivel;
  let risco;
  if (pontos <= 9) { nivel = 'muito-alto'; risco = 'Risco muito elevado'; }
  else if (pontos <= 12) { nivel = 'alto'; risco = 'Risco elevado'; }
  else if (pontos <= 14) { nivel = 'moderado'; risco = 'Risco moderado'; }
  else if (pontos <= 18) { nivel = 'baixo'; risco = 'Risco baixo'; }
  else { nivel = 'baixo'; risco = 'Sem risco significativo'; }

  return { ok: true, pontos, min: 6, max: 23, nivel, risco };
}

/** Classifica uma pontuação de MMSE já obtida, com os cortes validados para a população portuguesa (Guerreiro, 1994). */
export function classificarMMSE(pontos, anosEscolaridade) {
  const p = Number(pontos);
  const anos = Number(anosEscolaridade);
  if (!Number.isFinite(p) || p < 0 || p > 30) return { ok: false, motivo: 'Indique a pontuação do MMSE (0–30).' };
  if (!Number.isFinite(anos) || anos < 0) return { ok: false, motivo: 'Indique os anos de escolaridade.' };

  let corte;
  if (anos === 0) corte = 15;
  else if (anos <= 11) corte = 22;
  else corte = 27;

  const alterado = p <= corte;
  return { ok: true, pontos: p, corte, nivel: alterado ? 'alto' : 'baixo', alterado };
}

/** Classifica uma pontuação de MoCA já obtida (corte < 26; +1 se escolaridade ≤ 12 anos). */
export function classificarMoCA(pontos, anosEscolaridade) {
  const p = Number(pontos);
  const anos = Number(anosEscolaridade);
  if (!Number.isFinite(p) || p < 0 || p > 30) return { ok: false, motivo: 'Indique a pontuação do MoCA (0–30).' };
  if (!Number.isFinite(anos) || anos < 0) return { ok: false, motivo: 'Indique os anos de escolaridade.' };

  const ajustado = anos <= 12 ? Math.min(p + 1, 30) : p;
  const alterado = ajustado < 26;

  return { ok: true, pontos: p, pontosAjustados: ajustado, nivel: alterado ? 'alto' : 'baixo', alterado };
}

/** GDS-15 (Escala de Depressão Geriátrica, versão curta): 15 itens, 1 ponto cada quando a resposta é "patológica". */
export function calcularGDS15(respostas = []) {
  const valores = respostas.slice(0, 15).map(Number);
  if (valores.length < 15 || valores.some((v) => !Number.isFinite(v))) {
    return { ok: false, motivo: 'Responda a todas as perguntas.' };
  }
  const pontos = valores.reduce((a, b) => a + b, 0);

  let nivel;
  let gravidade;
  if (pontos <= 4) { nivel = 'baixo'; gravidade = 'Sem sintomas depressivos significativos'; }
  else if (pontos <= 8) { nivel = 'moderado'; gravidade = 'Depressão ligeira'; }
  else if (pontos <= 11) { nivel = 'alto'; gravidade = 'Depressão moderada'; }
  else { nivel = 'muito-alto'; gravidade = 'Depressão grave'; }

  return { ok: true, pontos, max: 15, nivel, gravidade };
}
