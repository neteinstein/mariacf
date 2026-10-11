// CHA₂DS₂-VASc e HAS-BLED — risco tromboembólico e hemorrágico na fibrilhação auricular.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: ESC Guidelines for the diagnosis and management of atrial
// fibrillation (2020/2024) — CHA₂DS₂-VASc (Lip et al., 2010) e HAS-BLED
// (Pisters et al., 2010).

const arred1 = (n) => Math.round(n * 10) / 10;

/**
 * CHA₂DS₂-VASc.
 * fatores: { icc, hipertensao, idade75, diabetes, avc, vascular, idade65_74, sexoFeminino }
 */
export function calcularCHA2DS2VASc(fatores = {}) {
  const f = {
    icc: !!fatores.icc,
    hipertensao: !!fatores.hipertensao,
    idade75: !!fatores.idade75,
    diabetes: !!fatores.diabetes,
    avc: !!fatores.avc,
    vascular: !!fatores.vascular,
    idade65_74: !!fatores.idade65_74 && !fatores.idade75,
    sexoFeminino: !!fatores.sexoFeminino,
  };

  const pontos =
    (f.icc ? 1 : 0) +
    (f.hipertensao ? 1 : 0) +
    (f.idade75 ? 2 : 0) +
    (f.diabetes ? 1 : 0) +
    (f.avc ? 2 : 0) +
    (f.vascular ? 1 : 0) +
    (f.idade65_74 ? 1 : 0) +
    (f.sexoFeminino ? 1 : 0);

  // O sexo feminino é um modificador de risco, não um fator por si só: a decisão
  // usa a pontuação sem esse ponto (homem 1 = mulher 2; homem ≥ 2 = mulher ≥ 3),
  // como no CHA₂DS₂-VA da ESC 2024.
  const semSexo = pontos - (f.sexoFeminino ? 1 : 0);

  let nivel;
  let recomendacao;
  if (semSexo === 0) {
    nivel = 'baixo';
    recomendacao = 'Risco baixo — hipocoagulação geralmente não recomendada.';
  } else if (semSexo === 1) {
    nivel = 'moderado';
    recomendacao = 'Risco intermédio — considerar hipocoagulação oral, individualizando a decisão.';
  } else {
    nivel = 'alto';
    recomendacao = 'Risco elevado — hipocoagulação oral geralmente recomendada.';
  }

  return { ok: true, pontos, max: 9, nivel, recomendacao, fatores: f };
}

/**
 * HAS-BLED.
 * fatores: { hipertensao, renal, hepatica, avc, hemorragia, inrLabil, idoso, farmacos, alcool }
 */
export function calcularHASBLED(fatores = {}) {
  const f = {
    hipertensao: !!fatores.hipertensao,
    renal: !!fatores.renal,
    hepatica: !!fatores.hepatica,
    avc: !!fatores.avc,
    hemorragia: !!fatores.hemorragia,
    inrLabil: !!fatores.inrLabil,
    idoso: !!fatores.idoso,
    farmacos: !!fatores.farmacos,
    alcool: !!fatores.alcool,
  };

  const pontos =
    (f.hipertensao ? 1 : 0) +
    (f.renal ? 1 : 0) +
    (f.hepatica ? 1 : 0) +
    (f.avc ? 1 : 0) +
    (f.hemorragia ? 1 : 0) +
    (f.inrLabil ? 1 : 0) +
    (f.idoso ? 1 : 0) +
    (f.farmacos ? 1 : 0) +
    (f.alcool ? 1 : 0);

  const nivel = pontos >= 3 ? 'alto' : 'baixo';
  const recomendacao =
    pontos >= 3
      ? 'Risco hemorrágico elevado — não contraindica a anticoagulação, mas reforça a necessidade de corrigir fatores modificáveis e vigilância mais próxima.'
      : 'Risco hemorrágico baixo a moderado.';

  return { ok: true, pontos, max: 9, nivel, recomendacao, fatores: f };
}

export { arred1 };
