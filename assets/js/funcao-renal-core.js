// CKD-EPI 2021 (creatinina, sem coeficiente racial) e Cockcroft-Gault.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Inker LA et al., "New Creatinine- and Cystatin C-Based Equations
// to Estimate GFR without Race", NEJM 2021 (CKD-EPI 2021); Cockcroft DW & Gault MH,
// Nephron 1976.

const arred = (n, casas = 0) => {
  const f = 10 ** casas;
  return Math.round(n * f) / f;
};

function classificarDRC(egfr) {
  if (egfr >= 90) return { estadio: 'G1', descricao: 'Função renal normal ou alta' };
  if (egfr >= 60) return { estadio: 'G2', descricao: 'Ligeiramente diminuída' };
  if (egfr >= 45) return { estadio: 'G3a', descricao: 'Ligeira a moderadamente diminuída' };
  if (egfr >= 30) return { estadio: 'G3b', descricao: 'Moderada a gravemente diminuída' };
  if (egfr >= 15) return { estadio: 'G4', descricao: 'Gravemente diminuída' };
  return { estadio: 'G5', descricao: 'Falência renal' };
}

/**
 * CKD-EPI 2021 (creatinina). eTFG em mL/min/1,73 m².
 * creatininaMgDl: creatinina sérica em mg/dL. idade em anos.
 */
export function calcularCKDEPI2021(creatininaMgDl, idade, sexoFeminino) {
  const scr = Number(creatininaMgDl);
  const a = Number(idade);

  if (!Number.isFinite(scr) || scr <= 0) return { ok: false, motivo: 'Indique a creatinina sérica.' };
  if (!Number.isFinite(a) || a <= 0) return { ok: false, motivo: 'Indique a idade.' };
  if (a < 18) return { ok: false, motivo: 'A fórmula CKD-EPI 2021 destina-se a adultos (≥ 18 anos).' };

  const kappa = sexoFeminino ? 0.7 : 0.9;
  const alpha = sexoFeminino ? -0.241 : -0.302;
  const fatorSexo = sexoFeminino ? 1.012 : 1;

  const scrKappa = scr / kappa;
  const egfr =
    142 *
    Math.min(scrKappa, 1) ** alpha *
    Math.max(scrKappa, 1) ** -1.2 *
    0.9938 ** a *
    fatorSexo;

  const valor = arred(egfr, 0);
  return { ok: true, egfr: valor, ...classificarDRC(valor) };
}

/**
 * Cockcroft-Gault. Clearance de creatinina estimada, em mL/min.
 * Usa peso corporal total; em obesidade considere peso ajustado/ideal (não calculado aqui).
 */
export function calcularCockcroftGault(creatininaMgDl, idade, pesoKg, sexoFeminino) {
  const scr = Number(creatininaMgDl);
  const a = Number(idade);
  const p = Number(pesoKg);

  if (!Number.isFinite(scr) || scr <= 0) return { ok: false, motivo: 'Indique a creatinina sérica.' };
  if (!Number.isFinite(a) || a <= 0) return { ok: false, motivo: 'Indique a idade.' };
  if (!Number.isFinite(p) || p <= 0) return { ok: false, motivo: 'Indique o peso.' };
  if (a < 18) return { ok: false, motivo: 'A fórmula de Cockcroft-Gault destina-se a adultos (≥ 18 anos).' };

  let crcl = ((140 - a) * p) / (72 * scr);
  if (sexoFeminino) crcl *= 0.85;

  const valor = arred(crcl, 0);
  return { ok: true, crcl: valor, ...classificarDRC(valor) };
}
