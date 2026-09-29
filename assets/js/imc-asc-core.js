// Cálculo do Índice de Massa Corporal (IMC) e da Área de Superfície Corporal (ASC), em adultos.
// Sem dependências do DOM para poder ser testado em Node.
//
// IMC = peso (kg) / altura (m)².
// Categorias de IMC segundo a Organização Mundial de Saúde.
// ASC pelas fórmulas de Mosteller (raiz quadrada) e de Du Bois & Du Bois.

export const PESO_MIN = 20;
export const PESO_MAX = 300;
export const ALTURA_MIN = 100;
export const ALTURA_MAX = 250;

const CATEGORIAS = [
  { max: 18.5, id: 'baixo-peso', nome: 'Baixo peso' },
  { max: 25, id: 'normal', nome: 'Peso normal' },
  { max: 30, id: 'excesso-peso', nome: 'Excesso de peso' },
  { max: 35, id: 'obesidade-1', nome: 'Obesidade grau I' },
  { max: 40, id: 'obesidade-2', nome: 'Obesidade grau II' },
  { max: Infinity, id: 'obesidade-3', nome: 'Obesidade grau III' },
];

const arred = (n, casas) => {
  const f = 10 ** casas;
  return Math.round(n * f) / f;
};

/** Devolve a categoria de IMC (OMS) para um valor de IMC. */
export function classificarIMC(imc) {
  return CATEGORIAS.find((c) => imc < c.max) ?? CATEGORIAS[CATEGORIAS.length - 1];
}

/**
 * Calcula o IMC e a ASC a partir do peso (kg) e altura (cm).
 * Devolve { ok: false, motivo } se os valores estiverem fora do intervalo suportado.
 */
export function calcularIMC(pesoKg, alturaCm) {
  const p = Number(pesoKg);
  const a = Number(alturaCm);

  if (!Number.isFinite(p) || p <= 0) {
    return { ok: false, motivo: 'Indique o peso.' };
  }
  if (!Number.isFinite(a) || a <= 0) {
    return { ok: false, motivo: 'Indique a altura.' };
  }
  if (p < PESO_MIN || p > PESO_MAX) {
    return { ok: false, motivo: `Peso fora do intervalo suportado (${PESO_MIN}–${PESO_MAX} kg).` };
  }
  if (a < ALTURA_MIN || a > ALTURA_MAX) {
    return { ok: false, motivo: `Altura fora do intervalo suportado (${ALTURA_MIN}–${ALTURA_MAX} cm).` };
  }

  const alturaM = a / 100;
  const imc = p / (alturaM * alturaM);
  const categoria = classificarIMC(imc);

  const ascMosteller = Math.sqrt((a * p) / 3600);
  const ascDuBois = 0.007184 * a ** 0.725 * p ** 0.425;

  return {
    ok: true,
    peso: p,
    altura: a,
    imc: arred(imc, 1),
    categoria,
    ascMosteller: arred(ascMosteller, 2),
    ascDuBois: arred(ascDuBois, 2),
  };
}

/**
 * Perímetro abdominal (cm) e razão cintura/altura. Limiares da OMS para a
 * população europeia (homens ≥ 94/102 cm, mulheres ≥ 80/88 cm) e razão
 * cintura/altura ≥ 0,5 (risco aumentado) e ≥ 0,6 (risco elevado).
 */
export function avaliarCintura(perimetroCm, alturaCm, sexoFeminino) {
  const c = Number(perimetroCm);
  const a = Number(alturaCm);
  if (perimetroCm === '' || !Number.isFinite(c) || c < 40 || c > 250) return { ok: false, motivo: 'Indique o perímetro abdominal (40–250 cm).' };
  if (!Number.isFinite(a) || a < ALTURA_MIN || a > ALTURA_MAX) return { ok: false, motivo: 'Indique a altura.' };

  const [limiar1, limiar2] = sexoFeminino ? [80, 88] : [94, 102];
  let riscoCintura;
  if (c >= limiar2) riscoCintura = { nivel: 'alto', nome: 'Risco muito aumentado' };
  else if (c >= limiar1) riscoCintura = { nivel: 'moderado', nome: 'Risco aumentado' };
  else riscoCintura = { nivel: 'baixo', nome: 'Sem risco aumentado' };

  const razao = c / a;
  let riscoRazao;
  if (razao >= 0.6) riscoRazao = { nivel: 'alto', nome: 'Risco elevado' };
  else if (razao >= 0.5) riscoRazao = { nivel: 'moderado', nome: 'Risco aumentado' };
  else riscoRazao = { nivel: 'baixo', nome: 'Sem risco aumentado' };

  return { ok: true, perimetro: c, limiar1, limiar2, riscoCintura, razao: arred(razao, 2), riscoRazao };
}
