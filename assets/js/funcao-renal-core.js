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

/* ---------- Estadiamento KDIGO (G e A) ---------- */

const CATEGORIAS_G = [
  { min: 90, id: 'G1', nome: 'Normal ou elevada' },
  { min: 60, id: 'G2', nome: 'Ligeiramente diminuída' },
  { min: 45, id: 'G3a', nome: 'Ligeira a moderadamente diminuída' },
  { min: 30, id: 'G3b', nome: 'Moderada a gravemente diminuída' },
  { min: 15, id: 'G4', nome: 'Gravemente diminuída' },
  { min: 0, id: 'G5', nome: 'Falência renal' },
];

const CATEGORIAS_A = [
  { max: 30, id: 'A1', nome: 'Normal a ligeiramente aumentada (< 30 mg/g)' },
  { max: 300, id: 'A2', nome: 'Moderadamente aumentada (30–300 mg/g)' },
  { max: Infinity, id: 'A3', nome: 'Gravemente aumentada (> 300 mg/g)' },
];

// Mapa de risco KDIGO 2012/2024: linhas G1…G5, colunas A1…A3.
export const RISCO_KDIGO = {
  G1: ['baixo', 'moderado', 'alto'],
  G2: ['baixo', 'moderado', 'alto'],
  G3a: ['moderado', 'alto', 'muito-alto'],
  G3b: ['alto', 'muito-alto', 'muito-alto'],
  G4: ['muito-alto', 'muito-alto', 'muito-alto'],
  G5: ['muito-alto', 'muito-alto', 'muito-alto'],
};

// Número de avaliações por ano recomendado (KDIGO 2012).
const MONITORIZACAO = {
  G1: ['1 (se DRC)', '1', '2'],
  G2: ['1 (se DRC)', '1', '2'],
  G3a: ['1', '2', '3'],
  G3b: ['2', '3', '3'],
  G4: ['3', '3', '4 ou mais'],
  G5: ['4 ou mais', '4 ou mais', '4 ou mais'],
};

const RISCO_NOME = { baixo: 'Risco baixo', moderado: 'Risco moderadamente aumentado', alto: 'Risco elevado', 'muito-alto': 'Risco muito elevado' };

/**
 * Categoria G (TFG em mL/min/1,73 m²) e A (albuminúria, razão albumina/creatinina
 * urinária), com o risco do mapa KDIGO e a frequência de monitorização.
 * unidadeACR: 'mg/g' ou 'mg/mmol' (1 mg/mmol ≈ 8,84 mg/g).
 */
export function estadiarKDIGO(tfg, acr, unidadeACR = 'mg/g') {
  const t = Number(tfg);
  const a = Number(acr);
  if (tfg === '' || !Number.isFinite(t) || t < 0 || t > 200) return { ok: false, motivo: 'Indique a TFG (0–200 mL/min/1,73 m²).' };
  if (acr === '' || !Number.isFinite(a) || a < 0) return { ok: false, motivo: 'Indique a albuminúria (razão albumina/creatinina).' };

  const acrMgG = unidadeACR === 'mg/mmol' ? a * 8.84 : a;
  const g = CATEGORIAS_G.find((c) => t >= c.min);
  const iA = CATEGORIAS_A.findIndex((c) => acrMgG < c.max);
  const cat = CATEGORIAS_A[iA];
  const nivel = RISCO_KDIGO[g.id][iA];

  const referenciar = g.id === 'G4' || g.id === 'G5' || cat.id === 'A3';

  return {
    ok: true,
    g: g.id,
    gNome: g.nome,
    a: cat.id,
    aNome: cat.nome,
    nivel,
    risco: RISCO_NOME[nivel],
    monitorizacao: MONITORIZACAO[g.id][iA],
    referenciar,
    acrMgG: Math.round(acrMgG),
  };
}
