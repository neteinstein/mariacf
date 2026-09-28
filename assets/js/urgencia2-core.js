// CRB-65, PERC, regras de Ottawa (tornozelo/joelho), score de Alvarado e
// índice de choque — decisão de referenciação, exames de imagem, exclusão
// de TEP e triagem de instabilidade hemodinâmica.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Lim WS et al., Thorax 2003 (CRB-65); Kline JA et al., J
// Thromb Haemost 2004 (PERC); Stiell IG et al., BMJ 1995/JAMA 1993 (regras
// de Ottawa); Alvarado A, Ann Emerg Med 1986 (score de Alvarado); Allgöwer
// M & Burri C, Chirurg 1967 (índice de choque).

/** CRB-65: confusão, FR, PA, idade — sem análises. */
export function calcularCRB65(fatores = {}) {
  const pontos =
    (fatores.confusao ? 1 : 0) +
    (fatores.freqRespiratoria ? 1 : 0) +
    (fatores.pressaoArterial ? 1 : 0) +
    (fatores.idade65 ? 1 : 0);

  let nivel;
  let recomendacao;
  if (pontos === 0) { nivel = 'baixo'; recomendacao = 'Risco baixo — tratamento em ambulatório geralmente adequado.'; }
  else if (pontos <= 2) { nivel = 'moderado'; recomendacao = 'Risco intermédio — considerar avaliação hospitalar.'; }
  else { nivel = 'alto'; recomendacao = 'Risco elevado — referenciar ao hospital com urgência.'; }

  return { ok: true, pontos, max: 4, nivel, recomendacao };
}

/** PERC: só é válida assumindo probabilidade pré-teste já baixa. Todos ausentes → negativo. */
export function calcularPERC(fatores = {}) {
  const itens = [
    'idade50', 'fc100', 'spo295', 'edemaUnilateral', 'hemoptises',
    'cirurgiaOuTrauma', 'tvpTepPrevio', 'hormonasExogenas',
  ];
  const positivos = itens.filter((k) => fatores[k]).length;

  const negativo = positivos === 0;
  return {
    ok: true,
    positivos,
    negativo,
    nivel: negativo ? 'baixo' : 'alto',
    recomendacao: negativo
      ? 'PERC negativo — se a probabilidade clínica já era baixa, TEP pode ser excluído sem mais exames.'
      : 'PERC positivo — prosseguir a investigação (D-dímeros ou imagem), não exclui TEP.',
  };
}

/** Regras de Ottawa para o tornozelo/pé. */
export function calcularOttawaTornozelo(fatores = {}) {
  const radiografiaTornozelo = !!(
    fatores.dorZonaMaleolar &&
    (fatores.dorMaleoloLateral || fatores.dorMaleoloMedial || fatores.incapazSuportarPeso)
  );
  const radiografiaPe = !!(
    fatores.dorZonaMedioPe &&
    (fatores.dor5Metatarso || fatores.dorNavicular || fatores.incapazSuportarPeso)
  );

  return {
    ok: true,
    radiografiaTornozelo,
    radiografiaPe,
    indicada: radiografiaTornozelo || radiografiaPe,
    nivel: radiografiaTornozelo || radiografiaPe ? 'alto' : 'baixo',
  };
}

/** Regras de Ottawa para o joelho. */
export function calcularOttawaJoelho(fatores = {}) {
  const indicada = !!(
    fatores.idade55 ||
    fatores.dorCabecaPeroneo ||
    fatores.dorIsoladaPatela ||
    fatores.incapazFletir90 ||
    fatores.incapazSuportarPeso
  );

  return { ok: true, indicada, nivel: indicada ? 'alto' : 'baixo' };
}

/** Score de Alvarado: apendicite aguda. */
export function calcularAlvarado(fatores = {}) {
  const pontos =
    (fatores.migracaoDor ? 1 : 0) +
    (fatores.anorexia ? 1 : 0) +
    (fatores.nauseasVomitos ? 1 : 0) +
    (fatores.dorFID ? 2 : 0) +
    (fatores.reboundPositivo ? 1 : 0) +
    (fatores.febre ? 1 : 0) +
    (fatores.leucocitose ? 2 : 0) +
    (fatores.desvioEsquerdo ? 1 : 0);

  let nivel;
  let recomendacao;
  if (pontos <= 4) { nivel = 'baixo'; recomendacao = 'Baixa probabilidade de apendicite.'; }
  else if (pontos <= 6) { nivel = 'moderado'; recomendacao = 'Possível apendicite — observação clínica e reavaliação.'; }
  else if (pontos <= 8) { nivel = 'alto'; recomendacao = 'Provável apendicite — considerar avaliação cirúrgica.'; }
  else { nivel = 'muito-alto'; recomendacao = 'Muito provável apendicite — referenciar para cirurgia com urgência.'; }

  return { ok: true, pontos, max: 10, nivel, recomendacao };
}

/** Índice de choque = frequência cardíaca / PA sistólica. Normal ~0,5–0,7. */
export function calcularIndiceChoque(freqCardiaca, pressaoSistolica) {
  const fc = Number(freqCardiaca);
  const pas = Number(pressaoSistolica);

  if (!Number.isFinite(fc) || fc <= 0) return { ok: false, motivo: 'Indique a frequência cardíaca.' };
  if (!Number.isFinite(pas) || pas <= 0) return { ok: false, motivo: 'Indique a pressão arterial sistólica.' };

  const indice = fc / pas;
  let nivel;
  let interpretacao;
  if (indice < 0.7) { nivel = 'baixo'; interpretacao = 'Normal'; }
  else if (indice < 1.0) { nivel = 'moderado'; interpretacao = 'Limítrofe — vigiar de perto'; }
  else { nivel = 'alto'; interpretacao = 'Sugestivo de instabilidade hemodinâmica/choque'; }

  return { ok: true, indice: Math.round(indice * 100) / 100, nivel, interpretacao };
}
