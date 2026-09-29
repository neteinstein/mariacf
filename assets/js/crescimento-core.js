// Z-scores e percentis de crescimento infantil (peso, comprimento/altura,
// perímetro cefálico e peso-para-comprimento), 0–24 meses, segundo os
// padrões de crescimento infantil da OMS (2006), adotados pela DGS no
// Boletim de Saúde Infantil e Juvenil. Dos 2 aos 19 anos: IMC-para-idade e
// altura-para-idade (padrões OMS 2006 até aos 5 anos, referência OMS 2007
// dos 5 aos 19 anos). Inclui ainda a idade corrigida do prematuro e a
// altura-alvo familiar.
// Sem dependências do DOM para poder ser testado em Node.

import { PESO_M, PESO_F, COMP_M, COMP_F, PC_M, PC_F, PESOCOMP_M, PESOCOMP_F } from './crescimento-dados.js';
import { IMC_M, IMC_F, ALTURA_M, ALTURA_F } from './crescimento-dados-2-19.js';

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

/* ---------- 2 aos 19 anos ---------- */

export const IDADE_MIN_2_19 = 24; // meses
export const IDADE_MAX_2_19 = 228; // 19 anos

function valorDeZ(z, l, m, s) {
  if (Math.abs(l) < 1e-9) return m * Math.exp(s * z);
  return m * Math.pow(1 + l * s * z, 1 / l);
}

// Para indicadores de peso (IMC), a OMS restringe o modelo LMS além de ±3 DP:
// a distância entre -3/-2 e +2/+3 DP é usada como unidade fixa (WHO 2006, cap. 7).
function zscoreLMSRestrito(valor, l, m, s) {
  const z = zscoreLMS(valor, l, m, s);
  if (z > 3) {
    const sd3 = valorDeZ(3, l, m, s);
    const sd2 = valorDeZ(2, l, m, s);
    return 3 + (valor - sd3) / (sd3 - sd2);
  }
  if (z < -3) {
    const sd3 = valorDeZ(-3, l, m, s);
    const sd2 = valorDeZ(-2, l, m, s);
    return -3 - (sd3 - valor) / (sd2 - sd3);
  }
  return z;
}

function arredondarResultado(z, m) {
  return {
    z: Math.round(z * 100) / 100,
    percentil: Math.round(Math.min(Math.max(percentilDeZ(z), 0.1), 99.9) * 10) / 10,
    mediana: Math.round(m * 100) / 100,
  };
}

function validarIdade2a19(idadeMeses) {
  const idade = Number(idadeMeses);
  if (idadeMeses === '' || !Number.isFinite(idade)) return { ok: false, motivo: 'Indique a idade.' };
  if (idade < IDADE_MIN_2_19 || idade > IDADE_MAX_2_19) {
    return { ok: false, motivo: 'Esta curva aplica-se dos 2 aos 19 anos. Para idades inferiores, use os separadores dos 0 aos 24 meses.' };
  }
  return { ok: true, idade };
}

/** Classificação do IMC-para-idade: critérios da OMS (diferentes antes e depois dos 5 anos). */
function classificarIMCIdade(z, idadeMeses) {
  const ate5 = idadeMeses <= 60;
  if (z < -3) return { nivel: 'muito-alto', descricao: ate5 ? 'Emagrecimento grave (< -3 DP)' : 'Magreza grave (< -3 DP)' };
  if (z < -2) return { nivel: 'alto', descricao: ate5 ? 'Emagrecimento (-3 a -2 DP)' : 'Magreza (-3 a -2 DP)' };
  if (ate5) {
    if (z > 3) return { nivel: 'muito-alto', descricao: 'Obesidade (> +3 DP)' };
    if (z > 2) return { nivel: 'alto', descricao: 'Excesso de peso (+2 a +3 DP)' };
    if (z > 1) return { nivel: 'moderado', descricao: 'Risco de excesso de peso (+1 a +2 DP)' };
  } else {
    if (z > 2) return { nivel: 'muito-alto', descricao: 'Obesidade (> +2 DP)' };
    if (z > 1) return { nivel: 'alto', descricao: 'Excesso de peso (+1 a +2 DP)' };
  }
  return { nivel: 'baixo', descricao: 'IMC adequado para a idade (-2 a +1 DP)' };
}

/** IMC-para-idade dos 2 aos 19 anos (OMS). Idade em meses, peso em kg, altura em cm. */
export function calcularIMCIdade(sexoFeminino, idadeMeses, pesoKg, alturaCm) {
  const v = validarIdade2a19(idadeMeses);
  if (!v.ok) return v;
  const peso = Number(pesoKg);
  const altura = Number(alturaCm);
  if (!Number.isFinite(peso) || peso <= 0) return { ok: false, motivo: 'Indique o peso.' };
  if (!Number.isFinite(altura) || altura <= 0) return { ok: false, motivo: 'Indique a altura.' };

  const imc = peso / (altura / 100) ** 2;
  const [l, m, s] = interpolarLMS(sexoFeminino ? IMC_F : IMC_M, v.idade);
  const z = zscoreLMSRestrito(imc, l, m, s);
  return {
    ok: true,
    imc: Math.round(imc * 10) / 10,
    ...arredondarResultado(z, m),
    ...classificarIMCIdade(z, v.idade),
  };
}

function classificarAlturaIdade(z) {
  if (z < -3) return { nivel: 'muito-alto', descricao: 'Baixa estatura acentuada (< -3 DP)' };
  if (z < -2) return { nivel: 'alto', descricao: 'Baixa estatura (-3 a -2 DP)' };
  if (z <= 2) return { nivel: 'baixo', descricao: 'Dentro do esperado (-2 a +2 DP)' };
  if (z <= 3) return { nivel: 'moderado', descricao: 'Alta estatura (+2 a +3 DP)' };
  return { nivel: 'alto', descricao: 'Alta estatura acentuada (> +3 DP)' };
}

/** Altura-para-idade dos 2 aos 19 anos (OMS). */
export function calcularAlturaIdade(sexoFeminino, idadeMeses, alturaCm) {
  const v = validarIdade2a19(idadeMeses);
  if (!v.ok) return v;
  const altura = Number(alturaCm);
  if (!Number.isFinite(altura) || altura <= 0) return { ok: false, motivo: 'Indique a altura.' };

  const [l, m, s] = interpolarLMS(sexoFeminino ? ALTURA_F : ALTURA_M, v.idade);
  const z = zscoreLMS(altura, l, m, s);
  return { ok: true, ...arredondarResultado(z, m), ...classificarAlturaIdade(z) };
}

/* ---------- Idade corrigida do prematuro ---------- */

function paraDataLocal(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso ?? ''));
  if (!m) return null;
  const [, ano, mes, dia] = m.map(Number);
  const d = new Date(ano, mes - 1, dia);
  if (d.getFullYear() !== ano || d.getMonth() !== mes - 1 || d.getDate() !== dia) return null;
  return d;
}

function diasEntre(de, ate) {
  const a = Date.UTC(de.getFullYear(), de.getMonth(), de.getDate());
  const b = Date.UTC(ate.getFullYear(), ate.getMonth(), ate.getDate());
  return Math.round((b - a) / 86400000);
}

/** Converte dias numa idade em meses e dias (mês médio de 30,4375 dias). */
function mesesEDias(totalDias) {
  const meses = Math.floor(totalDias / 30.4375);
  const dias = Math.round(totalDias - meses * 30.4375);
  return { meses, dias, totalDias, mesesDecimais: Math.round((totalDias / 30.4375) * 10) / 10 };
}

/**
 * Idade cronológica e corrigida de um prematuro. A correção subtrai as semanas
 * que faltaram até às 40 semanas e usa-se habitualmente até aos 24 meses.
 */
export function calcularIdadeCorrigida(nascimentoIso, semanasGestacao, diasGestacao = 0, hoje = new Date()) {
  const nascimento = nascimentoIso instanceof Date ? nascimentoIso : paraDataLocal(nascimentoIso);
  if (!nascimento) return { ok: false, motivo: 'Indique a data de nascimento.' };
  const sem = Number(semanasGestacao);
  const dias = Number(diasGestacao) || 0;
  if (!Number.isFinite(sem) || sem < 22 || sem > 42 || dias < 0 || dias > 6) {
    return { ok: false, motivo: 'Indique a idade gestacional ao nascer (22–42 semanas).' };
  }
  const hojeData = hoje instanceof Date ? hoje : new Date(hoje);
  const cronologicaDias = diasEntre(nascimento, hojeData);
  if (cronologicaDias < 0) return { ok: false, motivo: 'A data de nascimento não pode ser no futuro.' };

  const idadeGestacionalDias = sem * 7 + dias;
  const prematuridadeDias = Math.max(0, 280 - idadeGestacionalDias);
  const corrigidaDias = cronologicaDias - prematuridadeDias;
  const prematuro = idadeGestacionalDias < 37 * 7;

  let nota;
  if (!prematuro) nota = 'Nasceu de termo (≥ 37 semanas): não é necessário corrigir a idade.';
  else if (corrigidaDias < 0) nota = 'Ainda não atingiu as 40 semanas de idade pós-menstrual — use a idade gestacional corrigida.';
  else if (cronologicaDias > 24 * 30.4375) nota = 'Após os 24 meses de idade cronológica, a correção deixa habitualmente de ser usada.';
  else nota = 'Use a idade corrigida para avaliar o crescimento e o desenvolvimento até aos 24 meses.';

  return {
    ok: true,
    prematuro,
    prematuridadeSemanas: Math.round((prematuridadeDias / 7) * 10) / 10,
    cronologica: mesesEDias(cronologicaDias),
    corrigida: corrigidaDias >= 0 ? mesesEDias(corrigidaDias) : null,
    idadePosMenstrual: corrigidaDias < 0 ? { semanas: Math.floor((280 + corrigidaDias) / 7), dias: (280 + corrigidaDias) % 7 } : null,
    nota,
  };
}

/* ---------- Altura-alvo familiar ---------- */

/**
 * Altura-alvo (método de Tanner, altura média parental ± 6,5 cm consoante o
 * sexo), com o intervalo de ± 8,5 cm, e o percentil que representa aos 19 anos
 * na referência OMS 2007.
 */
export function calcularAlturaAlvo(sexoFeminino, alturaPaiCm, alturaMaeCm) {
  const pai = Number(alturaPaiCm);
  const mae = Number(alturaMaeCm);
  if (!Number.isFinite(pai) || pai < 120 || pai > 230) return { ok: false, motivo: 'Indique a altura do pai (120–230 cm).' };
  if (!Number.isFinite(mae) || mae < 120 || mae > 230) return { ok: false, motivo: 'Indique a altura da mãe (120–230 cm).' };

  const alvo = (pai + mae + (sexoFeminino ? -13 : 13)) / 2;
  const [l, m, s] = interpolarLMS(sexoFeminino ? ALTURA_F : ALTURA_M, IDADE_MAX_2_19);
  const z = zscoreLMS(alvo, l, m, s);
  return {
    ok: true,
    alvo: Math.round(alvo * 10) / 10,
    minimo: Math.round((alvo - 8.5) * 10) / 10,
    maximo: Math.round((alvo + 8.5) * 10) / 10,
    ...arredondarResultado(z, m),
  };
}
