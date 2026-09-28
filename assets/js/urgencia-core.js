// CURB-65, Wells (TVP e TEP), QTc, Glasgow, HEART e NEWS2 — avaliação de
// gravidade e risco agudo.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Lim WS et al., Thorax 2003 (CURB-65); Wells PS et al., Lancet
// 1997/NEJM 2003 (Wells TVP/TEP); Bazett HC, Heart 1920 e Fridericia LS,
// Acta Med Scand 1920 (correção do QT); Teasdale G & Jennett B, Lancet 1974
// (Escala de Coma de Glasgow); Six AJ, Backus BE & Kelder JC, Neth Heart J
// 2008 (HEART score); Royal College of Physicians, National Early Warning
// Score (NEWS) 2, 2017.

/** CURB-65: confusão, ureia, FR, PA, idade — cada 1 ponto. */
export function calcularCURB65(fatores = {}) {
  const pontos =
    (fatores.confusao ? 1 : 0) +
    (fatores.ureiaElevada ? 1 : 0) +
    (fatores.freqRespiratoria ? 1 : 0) +
    (fatores.pressaoArterial ? 1 : 0) +
    (fatores.idade65 ? 1 : 0);

  let nivel;
  let recomendacao;
  if (pontos <= 1) { nivel = 'baixo'; recomendacao = 'Risco baixo — tratamento ambulatório geralmente adequado.'; }
  else if (pontos === 2) { nivel = 'moderado'; recomendacao = 'Risco intermédio — considerar internamento de curta duração ou ambulatório vigiado de perto.'; }
  else if (pontos <= 4) { nivel = 'alto'; recomendacao = 'Risco elevado — internamento recomendado.'; }
  else { nivel = 'muito-alto'; recomendacao = 'Risco muito elevado — internamento urgente, considerar cuidados intensivos.'; }

  return { ok: true, pontos, max: 5, nivel, recomendacao };
}

/** Wells para TVP (versão de 2 níveis: provável se ≥ 2 pontos). */
export function calcularWellsTVP(fatores = {}) {
  const itens = [
    'cancroAtivo', 'paralisiaOuImobilizacao', 'acamado3diasOuCirurgia',
    'dorLocalizada', 'pernaTodaEdemaciada', 'edemaGemelar3cm',
    'edemaComFovea', 'veiasColaterais', 'tvpPrevia',
  ];
  const pontos = itens.reduce((acc, k) => acc + (fatores[k] ? 1 : 0), 0) - (fatores.diagnosticoAlternativo ? 2 : 0);

  const nivel = pontos >= 2 ? 'alto' : 'baixo';
  const recomendacao =
    pontos >= 2
      ? 'TVP provável — solicitar eco-doppler venoso.'
      : 'TVP improvável — considerar D-dímeros; se negativos, TVP excluída com razoável segurança.';

  return { ok: true, pontos, nivel, probabilidade: pontos >= 2 ? 'provável' : 'improvável', recomendacao };
}

/** Wells para TEP (versão de 2 níveis: provável se > 4 pontos). */
export function calcularWellsTEP(fatores = {}) {
  const pontos =
    (fatores.sinaisTVP ? 3 : 0) +
    (fatores.tepDiagnosticoMaisProvavel ? 3 : 0) +
    (fatores.frequenciaCardiaca100 ? 1.5 : 0) +
    (fatores.imobilizacaoOuCirurgia ? 1.5 : 0) +
    (fatores.tvpTepPrevio ? 1.5 : 0) +
    (fatores.hemoptises ? 1 : 0) +
    (fatores.neoplasia ? 1 : 0);

  const nivel = pontos > 4 ? 'alto' : 'baixo';
  const recomendacao =
    pontos > 4
      ? 'TEP provável — encaminhar para angio-TC pulmonar.'
      : 'TEP improvável — considerar D-dímeros; se negativos, TEP excluído com razoável segurança.';

  return { ok: true, pontos, nivel, probabilidade: pontos > 4 ? 'provável' : 'improvável', recomendacao };
}

function limiarQTc(sexoFeminino) {
  return sexoFeminino ? { normal: 460, limite: 480 } : { normal: 440, limite: 460 };
}

/** QTc pelas fórmulas de Bazett e Fridericia. qtMs em ms, freqCardiaca em bpm. */
export function calcularQTc(qtMs, freqCardiaca, sexoFeminino) {
  const qt = Number(qtMs);
  const fc = Number(freqCardiaca);

  if (!Number.isFinite(qt) || qt <= 0) return { ok: false, motivo: 'Indique o intervalo QT.' };
  if (!Number.isFinite(fc) || fc <= 0) return { ok: false, motivo: 'Indique a frequência cardíaca.' };

  const rrSeg = 60 / fc;
  const bazett = qt / Math.sqrt(rrSeg);
  const fridericia = qt / Math.cbrt(rrSeg);

  const limiares = limiarQTc(sexoFeminino);
  const valor = Math.round(bazett);
  let nivel;
  if (valor > 500) nivel = 'muito-alto';
  else if (valor > limiares.limite) nivel = 'alto';
  else if (valor > limiares.normal) nivel = 'moderado';
  else nivel = 'baixo';

  return {
    ok: true,
    bazett: Math.round(bazett),
    fridericia: Math.round(fridericia),
    nivel,
    limiarNormal: limiares.normal,
  };
}

/** Escala de Coma de Glasgow. abertura ocular (1-4), resposta verbal (1-5), resposta motora (1-6). */
export function calcularGlasgow(aberturaOcular, respostaVerbal, respostaMotora) {
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

/** HEART score: história, ECG, idade, fatores de risco, troponina — cada 0-2. */
export function calcularHEART(pontuacoes = {}) {
  const campos = ['historia', 'ecg', 'idade', 'fatoresRisco', 'troponina'];
  const valores = campos.map((c) => Number(pontuacoes[c]));
  if (valores.some((v) => !Number.isFinite(v) || v < 0 || v > 2)) {
    return { ok: false, motivo: 'Preencha todos os itens.' };
  }
  const pontos = valores.reduce((a, b) => a + b, 0);

  let nivel;
  let risco;
  if (pontos <= 3) { nivel = 'baixo'; risco = 'Risco baixo (~2% de eventos cardíacos major a 6 semanas)'; }
  else if (pontos <= 6) { nivel = 'moderado'; risco = 'Risco moderado (~17% de eventos cardíacos major a 6 semanas)'; }
  else { nivel = 'alto'; risco = 'Risco elevado (~50% de eventos cardíacos major a 6 semanas)'; }

  return { ok: true, pontos, max: 10, nivel, risco };
}

function pontosRespiracao(fr) {
  if (fr <= 8) return 3;
  if (fr <= 11) return 1;
  if (fr <= 20) return 0;
  if (fr <= 24) return 2;
  return 3;
}
function pontosSpO2(spo2) {
  if (spo2 <= 91) return 3;
  if (spo2 <= 93) return 2;
  if (spo2 <= 95) return 1;
  return 0;
}
function pontosPAS(pas) {
  if (pas <= 90) return 3;
  if (pas <= 100) return 2;
  if (pas <= 110) return 1;
  if (pas <= 219) return 0;
  return 3;
}
function pontosFC(fc) {
  if (fc <= 40) return 3;
  if (fc <= 50) return 1;
  if (fc <= 90) return 0;
  if (fc <= 110) return 1;
  if (fc <= 130) return 2;
  return 3;
}
function pontosTemp(temp) {
  if (temp <= 35.0) return 3;
  if (temp <= 36.0) return 1;
  if (temp <= 38.0) return 0;
  if (temp <= 39.0) return 1;
  return 2;
}

/**
 * NEWS2 (escala 1, para doentes sem risco de insuficiência respiratória
 * hipercápnica). Devolve a pontuação total e o nível de resposta clínica.
 */
export function calcularNEWS2({ freqRespiratoria, spo2, oxigenioSuplementar, pressaoSistolica, freqCardiaca, consciencia, temperatura }) {
  const fr = Number(freqRespiratoria);
  const spo2n = Number(spo2);
  const pas = Number(pressaoSistolica);
  const fc = Number(freqCardiaca);
  const temp = Number(temperatura);

  if (!Number.isFinite(fr)) return { ok: false, motivo: 'Indique a frequência respiratória.' };
  if (!Number.isFinite(spo2n)) return { ok: false, motivo: 'Indique a saturação de oxigénio.' };
  if (!Number.isFinite(pas)) return { ok: false, motivo: 'Indique a pressão arterial sistólica.' };
  if (!Number.isFinite(fc)) return { ok: false, motivo: 'Indique a frequência cardíaca.' };
  if (!Number.isFinite(temp)) return { ok: false, motivo: 'Indique a temperatura.' };

  const partes = {
    respiracao: pontosRespiracao(fr),
    spo2: pontosSpO2(spo2n),
    oxigenio: oxigenioSuplementar ? 2 : 0,
    pas: pontosPAS(pas),
    fc: pontosFC(fc),
    consciencia: consciencia === 'alerta' ? 0 : 3,
    temperatura: pontosTemp(temp),
  };

  const pontos = Object.values(partes).reduce((a, b) => a + b, 0);
  const algumParametroCritico = Object.values(partes).some((p) => p === 3);

  let nivel;
  let resposta;
  if (pontos >= 7) { nivel = 'muito-alto'; resposta = 'Risco alto — resposta clínica de emergência.'; }
  else if (pontos >= 5 || algumParametroCritico) { nivel = 'alto'; resposta = 'Risco médio — resposta clínica urgente.'; }
  else if (pontos >= 1) { nivel = 'moderado'; resposta = 'Risco baixo — reavaliação de rotina, mais frequente se agravar.'; }
  else { nivel = 'baixo'; resposta = 'Risco baixo — vigilância de rotina.'; }

  return { ok: true, pontos, max: 20, nivel, resposta, partes };
}
