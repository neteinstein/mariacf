// Avaliação hepática: FIB-4, NAFLD fibrosis score e APRI (fibrose), e
// Child-Pugh e MELD/MELD-Na (gravidade da cirrose).
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Sterling RK et al., Hepatology 2006 (FIB-4); McPherson S et
// al., Am J Gastroenterol 2017 (limiar de 2,0 a partir dos 65 anos); Angulo
// P et al., Hepatology 2007 (NAFLD fibrosis score); Wai CT et al.,
// Hepatology 2003 (APRI); EASL-EASD-EASO 2024 (MASLD); Pugh RN et al., Br J
// Surg 1973 (Child-Pugh); Kamath PS et al., Hepatology 2001 e Kim WR et al.,
// NEJM 2008 (MELD e MELD-Na, fórmula UNOS até 2016).

const arred = (n, casas = 2) => {
  const f = 10 ** casas;
  return Math.round(n * f) / f;
};

const num = (v) => (v === '' || v === null || v === undefined ? NaN : Number(v));

/** FIB-4 = idade × AST / (plaquetas × √ALT). Plaquetas em 10⁹/L. */
export function calcularFIB4(idade, ast, alt, plaquetas) {
  const i = num(idade);
  const a = num(ast);
  const l = num(alt);
  const p = num(plaquetas);
  if (!Number.isFinite(i) || i < 18 || i > 100) return { ok: false, motivo: 'Indique a idade (18–100 anos).' };
  if (!Number.isFinite(a) || a <= 0) return { ok: false, motivo: 'Indique a AST.' };
  if (!Number.isFinite(l) || l <= 0) return { ok: false, motivo: 'Indique a ALT.' };
  if (!Number.isFinite(p) || p <= 0) return { ok: false, motivo: 'Indique as plaquetas.' };

  const fib4 = (i * a) / (p * Math.sqrt(l));
  const limiarBaixo = i >= 65 ? 2.0 : 1.3;
  let nivel;
  let descricao;
  if (fib4 < limiarBaixo) {
    nivel = 'baixo';
    descricao = 'Baixo risco de fibrose avançada — reavaliar em 1–3 anos';
  } else if (fib4 <= 2.67) {
    nivel = 'moderado';
    descricao = 'Indeterminado — segundo teste (elastografia ou ELF)';
  } else {
    nivel = 'alto';
    descricao = 'Alto risco de fibrose avançada — referenciar à hepatologia';
  }

  return {
    ok: true,
    fib4: arred(fib4),
    nivel,
    descricao,
    limiarBaixo,
    aviso: i < 35 ? 'O FIB-4 é pouco fiável abaixo dos 35 anos.' : null,
  };
}

/**
 * NAFLD fibrosis score = −1,675 + 0,037 × idade + 0,094 × IMC + 1,13 × (glicemia
 * alterada ou diabetes) + 0,99 × AST/ALT − 0,013 × plaquetas − 0,66 × albumina (g/dL).
 */
export function calcularNFS({ idade, imc, diabetes, ast, alt, plaquetas, albumina }) {
  const i = num(idade);
  const b = num(imc);
  const a = num(ast);
  const l = num(alt);
  const p = num(plaquetas);
  const alb = num(albumina);
  if (!Number.isFinite(i) || i < 18) return { ok: false, motivo: 'Indique a idade.' };
  if (!Number.isFinite(b) || b <= 0) return { ok: false, motivo: 'Indique o IMC.' };
  if (!Number.isFinite(a) || a <= 0) return { ok: false, motivo: 'Indique a AST.' };
  if (!Number.isFinite(l) || l <= 0) return { ok: false, motivo: 'Indique a ALT.' };
  if (!Number.isFinite(p) || p <= 0) return { ok: false, motivo: 'Indique as plaquetas.' };
  if (!Number.isFinite(alb) || alb <= 0) return { ok: false, motivo: 'Indique a albumina.' };

  const nfs = -1.675 + 0.037 * i + 0.094 * b + 1.13 * (diabetes ? 1 : 0) + 0.99 * (a / l) - 0.013 * p - 0.66 * alb;
  let nivel;
  let descricao;
  if (nfs < -1.455) {
    nivel = 'baixo';
    descricao = 'Fibrose avançada improvável (F0–F2)';
  } else if (nfs <= 0.676) {
    nivel = 'moderado';
    descricao = 'Indeterminado — considerar elastografia';
  } else {
    nivel = 'alto';
    descricao = 'Fibrose avançada provável (F3–F4)';
  }
  return { ok: true, nfs: arred(nfs), nivel, descricao };
}

/** APRI = (AST / limite superior do normal da AST) × 100 / plaquetas (10⁹/L). */
export function calcularAPRI(ast, astLSN, plaquetas) {
  const a = num(ast);
  const lsn = num(astLSN);
  const p = num(plaquetas);
  if (!Number.isFinite(a) || a <= 0) return { ok: false, motivo: 'Indique a AST.' };
  if (!Number.isFinite(lsn) || lsn <= 0) return { ok: false, motivo: 'Indique o limite superior do normal da AST.' };
  if (!Number.isFinite(p) || p <= 0) return { ok: false, motivo: 'Indique as plaquetas.' };

  const apri = ((a / lsn) * 100) / p;
  let nivel;
  let descricao;
  if (apri < 0.5) { nivel = 'baixo'; descricao = 'Fibrose significativa improvável'; }
  else if (apri <= 1.5) { nivel = 'moderado'; descricao = 'Indeterminado'; }
  else if (apri < 2) { nivel = 'alto'; descricao = 'Fibrose significativa provável'; }
  else { nivel = 'muito-alto'; descricao = 'Cirrose provável'; }
  return { ok: true, apri: arred(apri), nivel, descricao };
}

/**
 * Child-Pugh: 5 itens de 1 a 3 pontos (bilirrubina, albumina, INR, ascite,
 * encefalopatia). Classe A 5–6, B 7–9, C 10–15.
 */
export function calcularChildPugh(itens = {}) {
  const campos = ['bilirrubina', 'albumina', 'inr', 'ascite', 'encefalopatia'];
  const valores = campos.map((c) => Number(itens[c]));
  if (valores.some((v) => !Number.isFinite(v) || v < 1 || v > 3)) return { ok: false, motivo: 'Preencha todos os itens.' };
  const pontos = valores.reduce((a, b) => a + b, 0);

  if (pontos <= 6) return { ok: true, pontos, classe: 'A', nivel: 'baixo', descricao: 'Doença bem compensada · sobrevida a 1 ano ~100%, a 2 anos ~85%' };
  if (pontos <= 9) return { ok: true, pontos, classe: 'B', nivel: 'alto', descricao: 'Compromisso funcional significativo · sobrevida a 1 ano ~80%, a 2 anos ~60%' };
  return { ok: true, pontos, classe: 'C', nivel: 'muito-alto', descricao: 'Doença descompensada · sobrevida a 1 ano ~45%, a 2 anos ~35%' };
}

function mortalidadeMELD(meld) {
  if (meld < 10) return '~2%';
  if (meld < 20) return '~6%';
  if (meld < 30) return '~20%';
  if (meld < 40) return '~53%';
  return '~71%';
}

/**
 * MELD (UNOS) e MELD-Na. Bilirrubina e creatinina em mg/dL, sódio em mmol/L.
 * Valores < 1 contam como 1; creatinina máxima 4 (ou 4 se diálise ≥ 2×/semana);
 * sódio limitado a 125–137; resultado máximo 40.
 */
export function calcularMELD({ bilirrubina, inr, creatinina, sodio, dialise = false }) {
  const bili = num(bilirrubina);
  const i = num(inr);
  const cr = num(creatinina);
  const na = num(sodio);
  if (!Number.isFinite(bili) || bili <= 0) return { ok: false, motivo: 'Indique a bilirrubina total.' };
  if (!Number.isFinite(i) || i <= 0) return { ok: false, motivo: 'Indique o INR.' };
  if (!dialise && (!Number.isFinite(cr) || cr <= 0)) return { ok: false, motivo: 'Indique a creatinina.' };

  const b = Math.max(bili, 1);
  const inrC = Math.max(i, 1);
  const c = dialise ? 4 : Math.min(Math.max(cr, 1), 4);
  let meld = 3.78 * Math.log(b) + 11.2 * Math.log(inrC) + 9.57 * Math.log(c) + 6.43;
  meld = Math.min(Math.round(meld * 10) / 10, 40);

  let meldNa = null;
  if (Number.isFinite(na) && na > 0) {
    const naC = Math.min(Math.max(na, 125), 137);
    meldNa = meld > 11 ? meld + 1.32 * (137 - naC) - 0.033 * meld * (137 - naC) : meld;
    meldNa = Math.min(Math.round(meldNa), 40);
  }
  const final = meldNa ?? Math.round(meld);

  let nivel;
  if (final < 10) nivel = 'baixo';
  else if (final < 20) nivel = 'moderado';
  else if (final < 30) nivel = 'alto';
  else nivel = 'muito-alto';

  return {
    ok: true,
    meld: Math.round(meld),
    meldNa,
    nivel,
    mortalidade90d: mortalidadeMELD(final),
  };
}
