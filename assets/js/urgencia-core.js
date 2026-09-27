// CURB-65, Wells (TVP e TEP) e QTc — avaliação de gravidade e risco agudo.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Lim WS et al., Thorax 2003 (CURB-65); Wells PS et al., Lancet
// 1997/NEJM 2003 (Wells TVP/TEP); Bazett HC, Heart 1920 e Fridericia LS,
// Acta Med Scand 1920 (correção do QT).

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
