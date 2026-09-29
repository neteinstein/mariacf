// SCORE2, SCORE2-OP e SCORE2-Diabetes — risco cardiovascular a 10 anos (ESC/DGS).
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências:
//   SCORE2 e SCORE2-OP: SCORE2 working group & ESC CV Risk Collaboration,
//   Eur Heart J 2021;42:2439-2454 (doi:10.1093/eurheartj/ehab309) e
//   Eur Heart J 2021;42:2455-2467 (doi:10.1093/eurheartj/ehab312).
//   SCORE2-Diabetes: SCORE2-Diabetes working group, Eur Heart J 2023;44:2544-2556
//   (doi:10.1093/eurheartj/ehad260).
// Portugal é classificado como região de risco moderado.

const CONVERSAO_COLESTEROL = 38.67; // mg/dL → mmol/L

export function mgDlParaMmolL(v) {
  return Number(v) / CONVERSAO_COLESTEROL;
}

const SCORE2_BASE_SURVIVAL = { m: 0.9605, f: 0.9776 };
const SCORE2_ESCALA_MODERADA = {
  m: { scale1: -0.1565, scale2: 0.8009 },
  f: { scale1: -0.3143, scale2: 0.7701 },
};
const SCORE2_COEF = {
  m: {
    cage: 0.3742, smoking: 0.6012, csbp: 0.2777, ctchol: 0.1458, chdl: -0.2698,
    smoking_cage: -0.0755, csbp_cage: -0.0255, ctchol_cage: -0.0281, chdl_cage: 0.0426,
  },
  f: {
    cage: 0.4648, smoking: 0.7744, csbp: 0.3131, ctchol: 0.1002, chdl: -0.2606,
    smoking_cage: -0.1088, csbp_cage: -0.0277, ctchol_cage: -0.0226, chdl_cage: 0.0613,
  },
};

const SCORE2OP_BASE_SURVIVAL = { m: 0.7576, f: 0.8082 };
const SCORE2OP_ESCALA_MODERADA = {
  m: { scale1: 0.01, scale2: 1.25 },
  f: { scale1: -0.1, scale2: 1.1 },
};
const SCORE2OP_COEF = {
  m: {
    cage: 0.0634, smoking: 0.3524, csbp: 0.0094, ctchol: 0.0850, chdl: -0.3564, diabetes: 0.4245,
    smoking_cage: -0.0247, csbp_cage: -0.0005, ctchol_cage: 0.0073, chdl_cage: 0.0091, diabetes_cage: -0.0174,
  },
  f: {
    cage: 0.0789, smoking: 0.4921, csbp: 0.0102, ctchol: 0.0605, chdl: -0.3040, diabetes: 0.6010,
    smoking_cage: -0.0255, csbp_cage: -0.0004, ctchol_cage: -0.0009, chdl_cage: 0.0154, diabetes_cage: -0.0107,
  },
};
const SCORE2OP_DESVIO_BASE = { m: -0.0929, f: -0.229 };

const SCORE2DM_COEF = {
  m: {
    cage: 0.5368, smoking: 0.4774, csbp: 0.1322, ctchol: 0.1102, chdl: -0.1087,
    smoking_cage: -0.0672, csbp_cage: -0.0268, ctchol_cage: -0.0181, chdl_cage: 0.0095,
    diabetes: 0.6457, diabetes_cage: -0.0983, diabetes_dage: -0.0998,
    chba1c: 0.0955, cegfr: -0.0591, cegfr_sq: 0.0058, chba1c_cage: -0.0134, cegfr_cage: 0.0115,
  },
  f: {
    cage: 0.6624, smoking: 0.6139, csbp: 0.1421, ctchol: 0.1127, chdl: -0.1568,
    smoking_cage: -0.1122, csbp_cage: -0.0167, ctchol_cage: -0.0200, chdl_cage: 0.0186,
    diabetes: 0.8096, diabetes_cage: -0.1272, diabetes_dage: -0.118,
    chba1c: 0.1173, cegfr: -0.0640, cegfr_sq: 0.0062, chba1c_cage: -0.0196, cegfr_cage: 0.0169,
  },
};

function calibrar(riscoNaoCalibrado, scale1, scale2) {
  const r = Math.min(Math.max(riscoNaoCalibrado, 1e-9), 1 - 1e-9);
  const lnNegLn = Math.log(-Math.log(1 - r));
  return 1 - Math.exp(-Math.exp(scale1 + scale2 * lnNegLn));
}

/** Limiares de risco (%) do SCORE2/SCORE2-OP por idade (ESC 2021). */
export function limiaresPorIdade(idade) {
  if (idade < 50) return { baixo: 2.5, alto: 7.5 };
  if (idade < 70) return { baixo: 5, alto: 10 };
  return { baixo: 7.5, alto: 15 };
}

function categorizar(riscoPct, limiares) {
  if (riscoPct < limiares.baixo) return 'baixo';
  if (riscoPct < limiares.alto) return 'moderado';
  if (riscoPct < limiares.alto * 2) return 'alto';
  return 'muito-alto';
}

/**
 * SCORE2 (40-69 anos, sem diabetes) e SCORE2-OP (≥70 anos), região moderada.
 * colTotalMmol, hdlMmol em mmol/L; sbp em mmHg.
 */
export function calcularSCORE2({ idade, sexoFeminino, fumador, sbp, colTotalMmol, hdlMmol, diabetes = false }) {
  const a = Number(idade);
  const s = Number(sbp);
  const tc = Number(colTotalMmol);
  const hdl = Number(hdlMmol);

  if (!Number.isFinite(a) || a < 40 || a > 89) return { ok: false, motivo: 'Indique a idade (40–89 anos).' };
  if (!Number.isFinite(s) || s < 80 || s > 240) return { ok: false, motivo: 'Indique a pressão arterial sistólica.' };
  if (!Number.isFinite(tc) || tc <= 0) return { ok: false, motivo: 'Indique o colesterol total.' };
  if (!Number.isFinite(hdl) || hdl <= 0) return { ok: false, motivo: 'Indique o colesterol HDL.' };

  const sexo = sexoFeminino ? 'f' : 'm';
  const fumo = fumador ? 1 : 0;

  let riscoPct;
  let modelo;

  if (a < 70) {
    const coef = SCORE2_COEF[sexo];
    const cage = (a - 60) / 5;
    const csbp = (s - 120) / 20;
    const ctchol = tc - 6;
    const chdl = (hdl - 1.3) / 0.5;

    const linPred =
      coef.cage * cage +
      coef.smoking * fumo +
      coef.csbp * csbp +
      coef.ctchol * ctchol +
      coef.chdl * chdl +
      coef.smoking_cage * fumo * cage +
      coef.csbp_cage * csbp * cage +
      coef.ctchol_cage * ctchol * cage +
      coef.chdl_cage * chdl * cage;

    const naoCalibrado = 1 - SCORE2_BASE_SURVIVAL[sexo] ** Math.exp(linPred);
    riscoPct = calibrar(naoCalibrado, SCORE2_ESCALA_MODERADA[sexo].scale1, SCORE2_ESCALA_MODERADA[sexo].scale2) * 100;
    modelo = 'SCORE2';
  } else {
    const coef = SCORE2OP_COEF[sexo];
    const cage = a - 73;
    const csbp = s - 150;
    const ctchol = tc - 6;
    const chdl = hdl - 1.4;
    const dm = diabetes ? 1 : 0;

    const linPred =
      coef.cage * cage +
      coef.smoking * fumo +
      coef.csbp * csbp +
      coef.ctchol * ctchol +
      coef.chdl * chdl +
      coef.diabetes * dm +
      coef.smoking_cage * fumo * cage +
      coef.csbp_cage * csbp * cage +
      coef.ctchol_cage * ctchol * cage +
      coef.chdl_cage * chdl * cage +
      coef.diabetes_cage * dm * cage +
      SCORE2OP_DESVIO_BASE[sexo];

    const naoCalibrado = 1 - SCORE2OP_BASE_SURVIVAL[sexo] ** Math.exp(linPred);
    riscoPct = calibrar(naoCalibrado, SCORE2OP_ESCALA_MODERADA[sexo].scale1, SCORE2OP_ESCALA_MODERADA[sexo].scale2) * 100;
    modelo = 'SCORE2-OP';
  }

  riscoPct = Math.min(Math.max(riscoPct, 0), 100);
  const limiares = limiaresPorIdade(a);

  return {
    ok: true,
    modelo,
    risco: Math.round(riscoPct * 10) / 10,
    nivel: categorizar(riscoPct, limiares),
  };
}

/**
 * SCORE2-Diabetes (40-69 anos, diabetes tipo 2), região moderada.
 * idadeDiagnostico em anos, hba1c em mmol/mol (IFCC), egfr em mL/min/1,73 m².
 */
export function calcularSCORE2Diabetes({ idade, sexoFeminino, fumador, sbp, colTotalMmol, hdlMmol, idadeDiagnostico, hba1c, egfr }) {
  const a = Number(idade);
  const s = Number(sbp);
  const tc = Number(colTotalMmol);
  const hdl = Number(hdlMmol);
  const idDiag = Number(idadeDiagnostico);
  const a1c = Number(hba1c);
  const tfg = Number(egfr);

  if (!Number.isFinite(a) || a < 40 || a > 69) return { ok: false, motivo: 'A fórmula SCORE2-Diabetes destina-se a adultos dos 40 aos 69 anos.' };
  if (!Number.isFinite(s) || s < 80 || s > 240) return { ok: false, motivo: 'Indique a pressão arterial sistólica.' };
  if (!Number.isFinite(tc) || tc <= 0) return { ok: false, motivo: 'Indique o colesterol total.' };
  if (!Number.isFinite(hdl) || hdl <= 0) return { ok: false, motivo: 'Indique o colesterol HDL.' };
  if (!Number.isFinite(idDiag) || idDiag <= 0 || idDiag > a) return { ok: false, motivo: 'Indique a idade de diagnóstico da diabetes.' };
  if (!Number.isFinite(a1c) || a1c <= 0) return { ok: false, motivo: 'Indique a HbA1c.' };
  if (!Number.isFinite(tfg) || tfg <= 0) return { ok: false, motivo: 'Indique a taxa de filtração glomerular estimada.' };

  const sexo = sexoFeminino ? 'f' : 'm';
  const fumo = fumador ? 1 : 0;
  const coef = SCORE2DM_COEF[sexo];

  const cage = (a - 60) / 5;
  const csbp = (s - 120) / 20;
  const ctchol = tc - 6;
  const chdl = (hdl - 1.3) / 0.5;
  const cdage = (idDiag - 50) / 5;
  const chba1c = (a1c - 31) / 9.34;
  const cegfr = (Math.log(tfg) - 4.5) / 0.15;

  const linPred =
    coef.cage * cage +
    coef.smoking * fumo +
    coef.csbp * csbp +
    coef.ctchol * ctchol +
    coef.chdl * chdl +
    coef.smoking_cage * fumo * cage +
    coef.csbp_cage * csbp * cage +
    coef.ctchol_cage * ctchol * cage +
    coef.chdl_cage * chdl * cage +
    coef.diabetes * 1 +
    coef.diabetes_cage * cage +
    coef.diabetes_dage * cdage +
    coef.chba1c * chba1c +
    coef.cegfr * cegfr +
    coef.cegfr_sq * cegfr ** 2 +
    coef.chba1c_cage * chba1c * cage +
    coef.cegfr_cage * cegfr * cage;

  const naoCalibrado = 1 - SCORE2_BASE_SURVIVAL[sexo] ** Math.exp(linPred);
  let riscoPct = calibrar(naoCalibrado, SCORE2_ESCALA_MODERADA[sexo].scale1, SCORE2_ESCALA_MODERADA[sexo].scale2) * 100;
  riscoPct = Math.min(Math.max(riscoPct, 0), 100);

  // ESC 2023 (diabetes): limiares fixos, independentes da idade.
  const nivel = riscoPct < 5 ? 'baixo' : riscoPct < 10 ? 'moderado' : riscoPct < 20 ? 'alto' : 'muito-alto';

  return { ok: true, modelo: 'SCORE2-Diabetes', risco: Math.round(riscoPct * 10) / 10, nivel };
}
