// LDL calculado (Friedewald), sódio corrigido, cálcio corrigido e glicemia
// média estimada (eAG) — fórmulas laboratoriais de uso frequente em MGF.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Friedewald WT et al., Clin Chem 1972; Katz MA, NEJM 1973
// (sódio corrigido); Payne RB et al., Br Med J 1973 (cálcio corrigido);
// Nathan DM et al. (grupo ADAG), Diabetes Care 2008 (eAG).

const arred = (n, casas = 0) => {
  const f = 10 ** casas;
  return Math.round(n * f) / f;
};

/** LDL pela fórmula de Friedewald (mg/dL). Inválida se triglicéridos ≥ 400 mg/dL. */
export function calcularLDLFriedewald(colTotal, hdl, triglicerideos) {
  const ct = Number(colTotal);
  const hd = Number(hdl);
  const tg = Number(triglicerideos);

  if (!Number.isFinite(ct) || ct <= 0) return { ok: false, motivo: 'Indique o colesterol total.' };
  if (!Number.isFinite(hd) || hd <= 0) return { ok: false, motivo: 'Indique o colesterol HDL.' };
  if (!Number.isFinite(tg) || tg <= 0) return { ok: false, motivo: 'Indique os triglicéridos.' };
  if (tg >= 400) return { ok: false, motivo: 'Fórmula inválida com triglicéridos ≥ 400 mg/dL — peça o LDL direto.' };

  const ldl = ct - hd - tg / 5;
  return { ok: true, ldl: arred(Math.max(ldl, 0)) };
}

/** Sódio corrigido para hiperglicemia (fórmula de Katz), em mEq/L. */
export function calcularSodioCorrigido(sodioMedido, glicemia) {
  const na = Number(sodioMedido);
  const gli = Number(glicemia);

  if (!Number.isFinite(na) || na <= 0) return { ok: false, motivo: 'Indique o sódio medido.' };
  if (!Number.isFinite(gli) || gli <= 0) return { ok: false, motivo: 'Indique a glicemia.' };

  const corrigido = na + 1.6 * ((gli - 100) / 100);
  return { ok: true, sodioCorrigido: arred(corrigido, 1) };
}

/** Cálcio corrigido pela albumina sérica (mg/dL). */
export function calcularCalcioCorrigido(calcioMedido, albumina) {
  const ca = Number(calcioMedido);
  const alb = Number(albumina);

  if (!Number.isFinite(ca) || ca <= 0) return { ok: false, motivo: 'Indique o cálcio medido.' };
  if (!Number.isFinite(alb) || alb <= 0) return { ok: false, motivo: 'Indique a albumina.' };

  const corrigido = ca + 0.8 * (4.0 - alb);
  return { ok: true, calcioCorrigido: arred(corrigido, 2) };
}

/** Glicemia média estimada (eAG, mg/dL) a partir da HbA1c (%). */
export function calcularEAG(hba1cPercent) {
  const a1c = Number(hba1cPercent);
  if (!Number.isFinite(a1c) || a1c <= 0) return { ok: false, motivo: 'Indique a HbA1c.' };

  const eag = 28.7 * a1c - 46.7;
  return { ok: true, eag: arred(Math.max(eag, 0)) };
}

/** Converte HbA1c de mmol/mol (IFCC) para % (NGSP/DCCT). */
export function hba1cMmolMolParaPercent(mmolMol) {
  return Number(mmolMol) / 10.929 + 2.15;
}
