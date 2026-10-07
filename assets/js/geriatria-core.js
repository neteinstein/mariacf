// Índice de Barthel, Escala de Morse, Escala de Braden, um interpretador
// de pontuação do MMSE/MoCA, e a Escala de Depressão Geriátrica (GDS-15) —
// avaliação geriátrica em cuidados primários.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Mahoney FI & Barthel DW, Md State Med J 1965 (Barthel);
// Morse JM et al., Can J Aging 1989 (Morse); Bergstrom N et al., Nurs Res
// 1987 (Braden); Folstein MF et al., J Psychiatr Res 1975 e Guerreiro M et
// al. (validação portuguesa), 1994 (MMSE); Nasreddine ZS et al., JAGS 2005
// (MoCA); Sheikh JI & Yesavage JA, Clin Gerontol 1986 (GDS-15); Charlson ME
// et al., J Chronic Dis 1987 (índice de comorbilidade de Charlson); Lawton
// MP & Brody EM, Gerontologist 1969 (AIVD); Rockwood K et al., CMAJ 2005 e
// Clinical Frailty Scale v2.0, 2020 (fragilidade); Podsiadlo D & Richardson
// S, JAGS 1991 e CDC STEADI (Timed Up and Go); Rubenstein LZ et al., J
// Gerontol 2001 e Kaiser MJ et al., J Nutr Health Aging 2009 (MNA-SF).
//
// Nota: o MMSE e o MoCA são instrumentos protegidos (o MMSE é comercial
// desde 2001). Esta calculadora não reproduz os itens dos testes — apenas
// classifica uma pontuação total já obtida pelo profissional com o
// instrumento oficial. O 6CIT (Brooke & Bullock, 1999) e o SPMSQ (Pfeiffer,
// 1975) são de acesso livre e incluem-se como alternativas, com as perguntas.

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

/**
 * 6CIT (Six-item Cognitive Impairment Test; Brooke & Bullock, Int J Geriatr Psychiatry 1999):
 * pontuação ponderada já somada, 0–28 (quanto maior, pior). 0–7 normal, 8–9 ligeiro, 10+ significativo.
 */
export function classificarSeisCIT(pontos) {
  const p = Number(pontos);
  if (!Number.isFinite(p) || p < 0 || p > 28) return { ok: false, motivo: 'Indique a pontuação do 6CIT (0–28).' };

  let nivel;
  let grau;
  if (p <= 7) { nivel = 'baixo'; grau = 'Dentro do esperado'; }
  else if (p <= 9) { nivel = 'moderado'; grau = 'Défice cognitivo ligeiro'; }
  else { nivel = 'alto'; grau = 'Défice cognitivo significativo'; }

  return { ok: true, pontos: p, nivel, grau, alterado: p >= 8 };
}

/**
 * SPMSQ (Short Portable Mental Status Questionnaire; Pfeiffer, JAGS 1975): número de erros, 0–10.
 * Com escolaridade primária ou inferior admite-se mais um erro; acima do secundário, menos um.
 */
export function classificarSPMSQ(erros, anosEscolaridade) {
  const e = Number(erros);
  const anos = Number(anosEscolaridade);
  if (!Number.isFinite(e) || e < 0 || e > 10) return { ok: false, motivo: 'Indique o número de erros do SPMSQ (0–10).' };
  if (!Number.isFinite(anos) || anos < 0) return { ok: false, motivo: 'Indique os anos de escolaridade.' };

  const ajuste = anos <= 4 ? -1 : anos > 12 ? 1 : 0;
  const ajustados = Math.min(Math.max(e + ajuste, 0), 10);

  let nivel;
  let grau;
  if (ajustados <= 2) { nivel = 'baixo'; grau = 'Função intelectual preservada'; }
  else if (ajustados <= 4) { nivel = 'moderado'; grau = 'Défice ligeiro'; }
  else if (ajustados <= 7) { nivel = 'alto'; grau = 'Défice moderado'; }
  else { nivel = 'muito-alto'; grau = 'Défice grave'; }

  return { ok: true, erros: e, errosAjustados: ajustados, nivel, grau, alterado: ajustados >= 3 };
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

const PONTOS_COMORBILIDADE_CHARLSON = {
  enfarteMiocardio: 1, icc: 1, doencaVascularPeriferica: 1, doencaCerebrovascular: 1,
  demencia: 1, doencaPulmonarCronica: 1, doencaTecidoConjuntivo: 1, ulceraPeptica: 1,
  doencaHepaticaLigeira: 1, diabetesSemComplicacoes: 1,
  hemiplegia: 2, doencaRenalModeradaGrave: 2, diabetesComComplicacoes: 2,
  tumorSemMetastase: 2, leucemia: 2, linfoma: 2,
  doencaHepaticaModeradaGrave: 3,
  tumorMetastatico: 6, sida: 6,
};

function pontosIdadeCharlson(idade) {
  if (idade < 50) return 0;
  if (idade < 60) return 1;
  if (idade < 70) return 2;
  if (idade < 80) return 3;
  if (idade < 90) return 4;
  return 5;
}

/** Índice de comorbilidade de Charlson, com ajuste pela idade. */
export function calcularCharlson(comorbilidades = {}, idade) {
  const a = Number(idade);
  if (idade === '' || !Number.isFinite(a) || a < 0) return { ok: false, motivo: 'Indique a idade.' };

  const pontosComorbilidades = Object.entries(PONTOS_COMORBILIDADE_CHARLSON).reduce(
    (acc, [chave, pts]) => acc + (comorbilidades[chave] ? pts : 0),
    0
  );
  const pontosIdade = pontosIdadeCharlson(a);
  const pontos = pontosComorbilidades + pontosIdade;

  // Sobrevivência estimada a 10 anos (Charlson et al., 1987): 0,983^(e^(0,9 × índice)).
  const sobrevivencia10Anos = Math.pow(0.983, Math.exp(0.9 * pontos));

  let nivel;
  if (pontos <= 1) nivel = 'baixo';
  else if (pontos <= 3) nivel = 'moderado';
  else if (pontos <= 5) nivel = 'alto';
  else nivel = 'muito-alto';

  return {
    ok: true,
    pontosComorbilidades,
    pontosIdade,
    pontos,
    nivel,
    sobrevivencia10Anos: Math.round(sobrevivencia10Anos * 1000) / 10,
  };
}

/**
 * Escala de Lawton-Brody (atividades instrumentais da vida diária): 8 itens,
 * 1 ponto por item em que a pessoa é (suficientemente) autónoma. Total 0–8.
 */
export function calcularLawton(itens = {}) {
  const campos = ['telefone', 'compras', 'refeicoes', 'lida', 'roupa', 'transportes', 'medicacao', 'dinheiro'];
  const valores = campos.map((c) => Number(itens[c]));
  const pontos = soma(valores);
  if (pontos === null) return { ok: false, motivo: 'Preencha todos os itens.' };

  let nivel;
  let grau;
  if (pontos === 8) { nivel = 'baixo'; grau = 'Independente'; }
  else if (pontos >= 6) { nivel = 'moderado'; grau = 'Dependência ligeira'; }
  else if (pontos >= 4) { nivel = 'alto'; grau = 'Dependência moderada'; }
  else if (pontos >= 2) { nivel = 'muito-alto'; grau = 'Dependência grave'; }
  else { nivel = 'muito-alto'; grau = 'Dependência total'; }

  return { ok: true, pontos, max: 8, nivel, grau };
}

const NIVEIS_CFS = {
  1: ['baixo', 'Muito em forma'],
  2: ['baixo', 'Em forma'],
  3: ['baixo', 'Gere bem as suas doenças'],
  4: ['moderado', 'Vive com fragilidade muito ligeira'],
  5: ['moderado', 'Vive com fragilidade ligeira'],
  6: ['alto', 'Vive com fragilidade moderada'],
  7: ['muito-alto', 'Vive com fragilidade grave'],
  8: ['muito-alto', 'Vive com fragilidade muito grave'],
  9: ['muito-alto', 'Doente terminal'],
};

/** Clinical Frailty Scale (Rockwood), níveis 1–9. */
export function classificarCFS(nivelCFS) {
  const n = Number(nivelCFS);
  if (!Number.isInteger(n) || !NIVEIS_CFS[n]) return { ok: false, motivo: 'Escolha o nível que melhor descreve a pessoa.' };
  const [nivel, descricao] = NIVEIS_CFS[n];
  return { ok: true, pontos: n, nivel, descricao, fragil: n >= 5 };
}

/** Timed Up and Go (segundos para levantar, andar 3 m, voltar e sentar). */
export function classificarTUG(segundos) {
  const s = Number(segundos);
  if (segundos === '' || !Number.isFinite(s) || s <= 0 || s > 300) return { ok: false, motivo: 'Indique o tempo em segundos.' };
  if (s < 12) return { ok: true, segundos: s, nivel: 'baixo', descricao: 'Mobilidade normal — sem aumento do risco de queda' };
  if (s < 20) return { ok: true, segundos: s, nivel: 'moderado', descricao: 'Risco de queda aumentado (≥ 12 s) — avaliar marcha, equilíbrio e medicação' };
  if (s < 30) return { ok: true, segundos: s, nivel: 'alto', descricao: 'Mobilidade limitada (≥ 20 s) — provável necessidade de apoio na marcha' };
  return { ok: true, segundos: s, nivel: 'muito-alto', descricao: 'Mobilidade muito limitada (≥ 30 s) — dependência provável nas deslocações' };
}

/** MNA-SF (Mini Nutritional Assessment, versão curta): 6 itens, total 0–14. */
export function calcularMNASF(itens = {}) {
  const campos = ['ingestao', 'perdaPeso', 'mobilidade', 'stress', 'neuropsicologico', 'imcOuPerna'];
  const valores = campos.map((c) => Number(itens[c]));
  const pontos = soma(valores);
  if (pontos === null) return { ok: false, motivo: 'Preencha todos os itens.' };

  let nivel;
  let estado;
  if (pontos >= 12) { nivel = 'baixo'; estado = 'Estado nutricional normal'; }
  else if (pontos >= 8) { nivel = 'moderado'; estado = 'Risco de desnutrição'; }
  else { nivel = 'alto'; estado = 'Desnutrição'; }

  return { ok: true, pontos, max: 14, nivel, estado };
}
