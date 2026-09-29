// Cálculo da data provável de parto (DPP) e da idade gestacional.
// Sem dependências do DOM para poder ser testado em Node.
//
// Método da última menstruação: regra de Naegele (DUM + 280 dias),
// corrigida para a duração real do ciclo (referência de 28 dias).
// Método da ecografia: reconstrói a DUM equivalente a partir da idade
// gestacional medida numa data de exame, e aplica a mesma regra.

export const DURACAO_CICLO_MIN = 21;
export const DURACAO_CICLO_MAX = 45;
export const DURACAO_CICLO_REF = 28;
export const DIAS_GESTACAO = 280; // 40 semanas

export const IDADE_ECO_MIN_DIAS = 35; // 5 semanas
export const IDADE_ECO_MAX_DIAS = 294; // 42 semanas

const pad = (n) => String(n).padStart(2, '0');

/** Constrói uma data local (sem fuso horário) a partir de "AAAA-MM-DD". */
export function paraData(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso ?? ''));
  if (!m) return null;
  const [, ano, mes, dia] = m.map(Number);
  const d = new Date(ano, mes - 1, dia);
  if (d.getFullYear() !== ano || d.getMonth() !== mes - 1 || d.getDate() !== dia) return null;
  return d;
}

/** Formata uma data como "AAAA-MM-DD" (sem fuso horário). */
export function paraISO(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function adicionarDias(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function diferencaDias(de, ate) {
  const a = new Date(de.getFullYear(), de.getMonth(), de.getDate());
  const b = new Date(ate.getFullYear(), ate.getMonth(), ate.getDate());
  return Math.round((b - a) / 86400000);
}

/** Devolve o trimestre (1, 2 ou 3) a partir da idade gestacional em dias. */
export function trimestre(idadeGestacionalDias) {
  if (idadeGestacionalDias < 14 * 7) return 1;
  if (idadeGestacionalDias < 28 * 7) return 2;
  return 3;
}

function resultadoComum(dumEquivalente, hoje) {
  const dpp = adicionarDias(dumEquivalente, DIAS_GESTACAO);
  const idadeGestacionalDias = Math.max(0, diferencaDias(dumEquivalente, hoje));
  const semanas = Math.floor(idadeGestacionalDias / 7);
  const dias = idadeGestacionalDias % 7;
  const diasRestantes = diferencaDias(hoje, dpp);

  return {
    ok: true,
    dpp,
    idadeGestacionalDias,
    semanas,
    dias,
    trimestre: trimestre(idadeGestacionalDias),
    diasRestantes,
    atrasada: diasRestantes < 0,
  };
}

/**
 * Calcula a DPP a partir da data da última menstruação (DUM) e da duração
 * habitual do ciclo (dias). `hoje` é opcional, para permitir testes.
 */
export function calcularPorDUM(dumIso, duracaoCiclo = DURACAO_CICLO_REF, hoje = new Date()) {
  const dum = dumIso instanceof Date ? dumIso : paraData(dumIso);
  if (!dum) return { ok: false, motivo: 'Indique a data da última menstruação.' };

  const ciclo = Number(duracaoCiclo);
  if (!Number.isFinite(ciclo) || ciclo < DURACAO_CICLO_MIN || ciclo > DURACAO_CICLO_MAX) {
    return {
      ok: false,
      motivo: `Duração do ciclo fora do intervalo suportado (${DURACAO_CICLO_MIN}–${DURACAO_CICLO_MAX} dias).`,
    };
  }

  const hojeData = hoje instanceof Date ? hoje : new Date(hoje);
  if (dum > hojeData) {
    return { ok: false, motivo: 'A data da última menstruação não pode ser no futuro.' };
  }

  const ajuste = ciclo - DURACAO_CICLO_REF;
  const dumCorrigida = adicionarDias(dum, ajuste);
  return resultadoComum(dumCorrigida, hojeData);
}

/**
 * Calcula a DPP a partir de uma ecografia: a data do exame e a idade
 * gestacional medida nessa data (semanas + dias).
 */
export function calcularPorEcografia(dataEcoIso, semanasEco, diasEco, hoje = new Date()) {
  const dataEco = dataEcoIso instanceof Date ? dataEcoIso : paraData(dataEcoIso);
  if (!dataEco) return { ok: false, motivo: 'Indique a data da ecografia.' };

  const s = Number(semanasEco);
  const d = Number(diasEco);
  if (!Number.isFinite(s) || !Number.isFinite(d) || d < 0 || d > 6) {
    return { ok: false, motivo: 'Indique a idade gestacional medida na ecografia.' };
  }

  const idadeEcoDias = Math.round(s) * 7 + Math.round(d);
  if (idadeEcoDias < IDADE_ECO_MIN_DIAS || idadeEcoDias > IDADE_ECO_MAX_DIAS) {
    return {
      ok: false,
      motivo: `Idade gestacional na ecografia fora do intervalo suportado (${Math.floor(IDADE_ECO_MIN_DIAS / 7)}–${Math.floor(IDADE_ECO_MAX_DIAS / 7)} semanas).`,
    };
  }

  const hojeData = hoje instanceof Date ? hoje : new Date(hoje);
  if (dataEco > hojeData) {
    return { ok: false, motivo: 'A data da ecografia não pode ser no futuro.' };
  }

  const dumEquivalente = adicionarDias(dataEco, -idadeEcoDias);
  return resultadoComum(dumEquivalente, hojeData);
}

/**
 * Marcos da vigilância da gravidez de baixo risco, com as datas de cada janela
 * calculadas a partir da DPP. Janelas em dias de idade gestacional.
 * Referência: DGS, Programa Nacional para a Vigilância da Gravidez de Baixo Risco (2015).
 */
export const MARCOS_GRAVIDEZ = [
  { de: 0, ate: 12 * 7 + 6, titulo: '1.ª consulta de vigilância pré-natal', detalhe: 'Idealmente até às 12 semanas, com análises do 1.º trimestre.' },
  { de: 11 * 7, ate: 13 * 7 + 6, titulo: 'Ecografia do 1.º trimestre e rastreio combinado', detalhe: 'Datação da gravidez, translucência da nuca e análises do rastreio de aneuploidias.' },
  { de: 20 * 7, ate: 22 * 7 + 6, titulo: 'Ecografia morfológica (2.º trimestre)', detalhe: 'Avaliação detalhada da anatomia fetal.' },
  { de: 20 * 7, ate: 36 * 7 + 6, titulo: 'Vacina contra a tosse convulsa (Tdpa)', detalhe: 'Idealmente até às 32 semanas, para proteger o bebé nos primeiros meses.' },
  { de: 24 * 7, ate: 28 * 7 + 6, titulo: 'Prova de tolerância à glicose oral (PTGO 75 g)', detalhe: 'Rastreio da diabetes gestacional, se a glicemia do 1.º trimestre foi normal.' },
  { de: 28 * 7, ate: 28 * 7 + 6, titulo: 'Imunoglobulina anti-D (só se Rh negativo)', detalhe: 'Profilaxia nas grávidas Rh negativo não sensibilizadas.' },
  { de: 30 * 7, ate: 32 * 7 + 6, titulo: 'Ecografia do 3.º trimestre', detalhe: 'Crescimento fetal, placenta e líquido amniótico.' },
  { de: 35 * 7, ate: 37 * 7 + 6, titulo: 'Pesquisa de Streptococcus do grupo B', detalhe: 'Zaragatoa vaginal e retal.' },
  { de: 37 * 7, ate: 37 * 7, titulo: 'Gravidez de termo', detalhe: 'A partir das 37 semanas.' },
  { de: DIAS_GESTACAO, ate: DIAS_GESTACAO, titulo: 'Data provável de parto', detalhe: '40 semanas.' },
  { de: 41 * 7, ate: 41 * 7, titulo: 'Avaliação às 41 semanas', detalhe: 'Vigilância do bem-estar fetal e discussão da indução do trabalho de parto.' },
];

/** Calcula as datas de cada marco a partir da DPP e indica se já passou, está a decorrer ou é futuro. */
export function marcosGravidez(dpp, hoje = new Date()) {
  const inicio = adicionarDias(dpp, -DIAS_GESTACAO);
  return MARCOS_GRAVIDEZ.map((m) => {
    const de = adicionarDias(inicio, m.de);
    const ate = adicionarDias(inicio, m.ate);
    let estado;
    if (diferencaDias(hoje, ate) < 0) estado = 'passada';
    else if (diferencaDias(hoje, de) <= 0) estado = 'agora';
    else estado = 'futura';
    return { ...m, dataInicio: de, dataFim: ate, estado };
  });
}
