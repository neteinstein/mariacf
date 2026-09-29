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

/* ---------- Conversão de unidades ---------- */

// Fatores de conversão: valor SI = valor convencional × fator.
// HbA1c usa a equação IFCC–NGSP (mmol/mol = (% − 2,15) × 10,929), que não é um fator simples.
export const ANALITOS = {
  glicose: { nome: 'Glicose', convencional: 'mg/dL', si: 'mmol/L', fator: 1 / 18.016, casas: [0, 1] },
  colesterol: { nome: 'Colesterol (total, LDL, HDL)', convencional: 'mg/dL', si: 'mmol/L', fator: 1 / 38.67, casas: [0, 2] },
  trigliceridos: { nome: 'Triglicéridos', convencional: 'mg/dL', si: 'mmol/L', fator: 1 / 88.57, casas: [0, 2] },
  creatinina: { nome: 'Creatinina', convencional: 'mg/dL', si: 'µmol/L', fator: 88.42, casas: [2, 0] },
  ureia: { nome: 'Ureia', convencional: 'mg/dL', si: 'mmol/L', fator: 1 / 6.006, casas: [0, 1] },
  acidoUrico: { nome: 'Ácido úrico', convencional: 'mg/dL', si: 'µmol/L', fator: 59.48, casas: [1, 0] },
  bilirrubina: { nome: 'Bilirrubina', convencional: 'mg/dL', si: 'µmol/L', fator: 17.1, casas: [1, 0] },
  calcio: { nome: 'Cálcio', convencional: 'mg/dL', si: 'mmol/L', fator: 1 / 4.008, casas: [1, 2] },
  hemoglobina: { nome: 'Hemoglobina', convencional: 'g/dL', si: 'g/L', fator: 10, casas: [1, 0] },
  albumina: { nome: 'Albumina', convencional: 'g/dL', si: 'g/L', fator: 10, casas: [1, 0] },
  ferro: { nome: 'Ferro', convencional: 'µg/dL', si: 'µmol/L', fator: 0.1791, casas: [0, 1] },
  vitaminaD: { nome: '25-OH vitamina D', convencional: 'ng/mL', si: 'nmol/L', fator: 2.496, casas: [0, 0] },
  hba1c: { nome: 'HbA1c', convencional: '% (NGSP)', si: 'mmol/mol (IFCC)', casas: [1, 0] },
};

/**
 * Converte um valor entre a unidade convencional e a SI.
 * direcao: 'paraSI' (convencional → SI) ou 'paraConvencional'.
 */
export function converterUnidade(analito, valor, direcao = 'paraSI') {
  const a = ANALITOS[analito];
  if (!a) return { ok: false, motivo: 'Escolha a análise.' };
  const v = Number(valor);
  if (valor === '' || !Number.isFinite(v) || v <= 0) return { ok: false, motivo: 'Indique o valor a converter.' };

  const paraSI = direcao !== 'paraConvencional';
  let convertido;
  if (analito === 'hba1c') {
    convertido = paraSI ? (v - 2.15) * 10.929 : v / 10.929 + 2.15;
    if (convertido <= 0) return { ok: false, motivo: 'Valor de HbA1c fora do intervalo plausível.' };
  } else {
    convertido = paraSI ? v * a.fator : v / a.fator;
  }

  const casas = paraSI ? a.casas[1] : a.casas[0];
  return {
    ok: true,
    nome: a.nome,
    valor: v,
    unidadeOrigem: paraSI ? a.convencional : a.si,
    convertido: arred(convertido, casas),
    casas,
    unidadeDestino: paraSI ? a.si : a.convencional,
  };
}
