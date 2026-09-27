// Z-scores e percentis de crescimento infantil (peso, comprimento/altura,
// perímetro cefálico e peso-para-comprimento), 0–24 meses, segundo os
// padrões de crescimento infantil da OMS (2006), adotados pela DGS no
// Boletim de Saúde Infantil e Juvenil.
// Sem dependências do DOM para poder ser testado em Node.

import { PESO_M, PESO_F, COMP_M, COMP_F, PC_M, PC_F, PESOCOMP_M, PESOCOMP_F } from './crescimento-dados.js';

const TABELAS = {
  peso: { m: PESO_M, f: PESO_F },
  comprimento: { m: COMP_M, f: COMP_F },
  perimetroCefalico: { m: PC_M, f: PC_F },
  pesoComprimento: { m: PESOCOMP_M, f: PESOCOMP_F },
};

/** Interpola linearmente L, M, S para um dado x (idade em meses, ou comprimento em cm) numa tabela ordenada. */
function interpolarLMS(tabela, x) {
  if (x <= tabela[0][0]) return tabela[0].slice(1);
  const ultimo = tabela[tabela.length - 1];
  if (x >= ultimo[0]) return ultimo.slice(1);

  for (let i = 0; i < tabela.length - 1; i += 1) {
    const [x0, l0, m0, s0] = tabela[i];
    const [x1, l1, m1, s1] = tabela[i + 1];
    if (x >= x0 && x <= x1) {
      const f = (x - x0) / (x1 - x0);
      return [l0 + f * (l1 - l0), m0 + f * (m1 - m0), s0 + f * (s1 - s0)];
    }
  }
  return ultimo.slice(1);
}

function zscoreLMS(valor, l, m, s) {
  if (Math.abs(l) < 1e-9) return Math.log(valor / m) / s;
  return (Math.pow(valor / m, l) - 1) / (l * s);
}

// Aproximação da função erro para a normal padrão (Abramowitz & Stegun 7.1.26).
function erf(x) {
  const sinal = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * ax);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return sinal * y;
}

function percentilDeZ(z) {
  return 50 * (1 + erf(z / Math.SQRT2));
}

function classificarZ(z) {
  if (z < -3) return { nivel: 'muito-alto', descricao: 'Muito abaixo do esperado (< -3 DP)' };
  if (z < -2) return { nivel: 'alto', descricao: 'Abaixo do esperado (-3 a -2 DP)' };
  if (z <= 2) return { nivel: 'baixo', descricao: 'Dentro do esperado (-2 a +2 DP)' };
  if (z <= 3) return { nivel: 'alto', descricao: 'Acima do esperado (+2 a +3 DP)' };
  return { nivel: 'muito-alto', descricao: 'Muito acima do esperado (> +3 DP)' };
}

/**
 * indicador: 'peso' | 'comprimento' | 'perimetroCefalico' (x = idade em meses)
 * pesoComprimento é tratado à parte por usar o comprimento como eixo.
 */
export function calcularZScore(indicador, sexoFeminino, x, valor) {
  const tabela = TABELAS[indicador]?.[sexoFeminino ? 'f' : 'm'];
  if (!tabela) return { ok: false, motivo: 'Indicador desconhecido.' };

  const xNum = Number(x);
  const v = Number(valor);
  if (x === '' || !Number.isFinite(xNum) || xNum < 0) return { ok: false, motivo: 'Indique a idade.' };
  if (!Number.isFinite(v) || v <= 0) return { ok: false, motivo: 'Indique o valor medido.' };

  const [l, m, s] = interpolarLMS(tabela, xNum);
  const z = zscoreLMS(v, l, m, s);
  const percentil = percentilDeZ(z);

  return {
    ok: true,
    z: Math.round(z * 100) / 100,
    percentil: Math.round(Math.min(Math.max(percentil, 0.1), 99.9) * 10) / 10,
    mediana: Math.round(m * 100) / 100,
    ...classificarZ(z),
  };
}

export function calcularPesoComprimento(sexoFeminino, comprimentoCm, pesoKg) {
  return calcularZScore('pesoComprimento', sexoFeminino, comprimentoCm, pesoKg);
}
