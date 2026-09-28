// LDL calculado (Friedewald), sódio corrigido, cálcio corrigido, glicemia
// média estimada (eAG), anion gap, osmolaridade sérica calculada, défice
// de água livre e HOMA-IR — fórmulas laboratoriais de uso frequente em MGF.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Friedewald WT et al., Clin Chem 1972; Katz MA, NEJM 1973
// (sódio corrigido); Payne RB et al., Br Med J 1973 (cálcio corrigido);
// Nathan DM et al. (grupo ADAG), Diabetes Care 2008 (eAG); Emmett M &
// Narins RG, Medicine 1977 (anion gap); Smithline N & Gardner KD, JAMA
// 1976 (osmolaridade calculada); Adrogué HJ & Madias NE, N Engl J Med 2000
// (défice de água livre); Matthews DR et al., Diabetologia 1985 (HOMA-IR).

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

/** Anion gap (mEq/L), sem potássio. Intervalo de referência habitual: 8–16 mEq/L. */
export function calcularAnionGap(sodio, cloro, bicarbonato) {
  const na = Number(sodio);
  const cl = Number(cloro);
  const hco3 = Number(bicarbonato);

  if (!Number.isFinite(na) || na <= 0) return { ok: false, motivo: 'Indique o sódio.' };
  if (!Number.isFinite(cl) || cl <= 0) return { ok: false, motivo: 'Indique o cloro.' };
  if (!Number.isFinite(hco3) || hco3 <= 0) return { ok: false, motivo: 'Indique o bicarbonato.' };

  const gap = na - (cl + hco3);
  const nivel = gap > 16 ? 'alto' : gap < 8 ? 'moderado' : 'baixo';

  return { ok: true, gap: arred(gap, 1), nivel };
}

/** Osmolaridade sérica calculada (mOsm/kg). Glicemia e ureia em mg/dL. Intervalo normal: ~275–295 mOsm/kg. */
export function calcularOsmolaridade(sodio, glicemia, ureia) {
  const na = Number(sodio);
  const gli = Number(glicemia);
  const ur = Number(ureia);

  if (!Number.isFinite(na) || na <= 0) return { ok: false, motivo: 'Indique o sódio.' };
  if (!Number.isFinite(gli) || gli <= 0) return { ok: false, motivo: 'Indique a glicemia.' };
  if (!Number.isFinite(ur) || ur <= 0) return { ok: false, motivo: 'Indique a ureia.' };

  const osm = 2 * na + gli / 18 + ur / 2.8;
  const nivel = osm > 295 ? 'alto' : osm < 275 ? 'moderado' : 'baixo';

  return { ok: true, osmolaridade: arred(osm, 0), nivel };
}

/** Défice de água livre (L), para correção de hipernatremia. Peso em kg, sódio atual em mEq/L. */
export function calcularDeficeAguaLivre(pesoKg, sodioAtual, sexoFeminino) {
  const peso = Number(pesoKg);
  const na = Number(sodioAtual);

  if (!Number.isFinite(peso) || peso <= 0) return { ok: false, motivo: 'Indique o peso.' };
  if (!Number.isFinite(na) || na <= 0) return { ok: false, motivo: 'Indique o sódio atual.' };
  if (na <= 140) return { ok: false, motivo: 'Esta fórmula aplica-se a hipernatremia (sódio > 140 mEq/L).' };

  const fatorAgua = sexoFeminino ? 0.5 : 0.6;
  const aguaCorporalTotal = peso * fatorAgua;
  const defice = aguaCorporalTotal * (na / 140 - 1);

  return { ok: true, defice: arred(defice, 1), aguaCorporalTotal: arred(aguaCorporalTotal, 1) };
}

/** HOMA-IR: resistência à insulina. Glicemia em jejum (mg/dL), insulina em jejum (µU/mL). */
export function calcularHOMAIR(glicemiaJejum, insulinaJejum) {
  const gli = Number(glicemiaJejum);
  const ins = Number(insulinaJejum);

  if (!Number.isFinite(gli) || gli <= 0) return { ok: false, motivo: 'Indique a glicemia em jejum.' };
  if (!Number.isFinite(ins) || ins <= 0) return { ok: false, motivo: 'Indique a insulina em jejum.' };

  const homa = (gli * ins) / 405;
  const nivel = homa >= 2.5 ? 'alto' : 'baixo';

  return { ok: true, homa: arred(homa, 2), nivel };
}
