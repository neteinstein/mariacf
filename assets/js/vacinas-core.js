// Calendário do Programa Nacional de Vacinação (PNV) a partir da data de
// nascimento: que vacinas correspondem a cada idade, com a data prevista e o
// estado (em atraso/para já/a seguir), mais os reforços de Td na idade adulta.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referência: DGS, Norma n.º 018/2020 — Programa Nacional de Vacinação 2020
// (esquema recomendado), incluindo a MenB e a vacina HPV para ambos os sexos.
// Não inclui vacinas para grupos de risco (BCG, rotavírus, etc.), nem as
// campanhas sazonais (gripe, COVID-19, VSR), que dependem da norma de cada ano.

import { paraData, paraISO, diferencaDias } from './dpp-core.js';

/**
 * Esquema recomendado: idade em meses (ou anos × 12) e vacinas nessa idade.
 * Siglas como no Boletim Individual de Saúde.
 */
export const ESQUEMA_PNV = [
  { meses: 0, idade: 'Nascimento', vacinas: ['VHB 1'] },
  { meses: 2, idade: '2 meses', vacinas: ['DTPaHibVIPVHB 1 (hexavalente)', 'Pn13 1', 'MenB 1'] },
  { meses: 4, idade: '4 meses', vacinas: ['DTPaHibVIP 2 (pentavalente)', 'Pn13 2', 'MenB 2'] },
  { meses: 6, idade: '6 meses', vacinas: ['DTPaHibVIPVHB 3 (hexavalente)'] },
  { meses: 12, idade: '12 meses', vacinas: ['MenC', 'VASPR 1', 'Pn13 3', 'MenB 3'] },
  { meses: 18, idade: '18 meses', vacinas: ['DTPaHibVIP 4 (pentavalente)'] },
  { meses: 60, idade: '5 anos', vacinas: ['DTPaVIP 5 (tetravalente)', 'VASPR 2'] },
  { meses: 120, idade: '10 anos', vacinas: ['HPV 1', 'Td'] },
  { meses: 126, idade: '10 anos e 6 meses', vacinas: ['HPV 2'] },
  { meses: 25 * 12, idade: '25 anos', vacinas: ['Td (reforço)'] },
  { meses: 45 * 12, idade: '45 anos', vacinas: ['Td (reforço)'] },
  { meses: 65 * 12, idade: '65 anos', vacinas: ['Td (reforço)'] },
];

export const SIGLAS = {
  VHB: 'Hepatite B',
  DTPa: 'Difteria, tétano e tosse convulsa (pertussis acelular)',
  Hib: 'Haemophilus influenzae tipo b',
  VIP: 'Poliomielite (inativada)',
  Pn13: 'Pneumococos (13 serotipos)',
  MenB: 'Meningococo B',
  MenC: 'Meningococo C',
  VASPR: 'Sarampo, parotidite epidémica e rubéola',
  HPV: 'Vírus do papiloma humano',
  Td: 'Tétano e difteria (dose de adulto)',
};

/** Soma meses a uma data, ajustando ao último dia do mês quando necessário (ex.: 31/01 + 1 mês → 28/02). */
export function adicionarMeses(data, meses) {
  const ano = data.getFullYear();
  const mes = data.getMonth() + meses;
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  return new Date(ano, mes, Math.min(data.getDate(), ultimoDia));
}

// Janela durante a qual uma dose ainda é considerada «para já» (antes de passar a «em atraso»).
const TOLERANCIA_DIAS = 30;

function estadoDaDose(data, hoje) {
  const d = diferencaDias(hoje, data);
  if (d > 60) return 'futura';
  if (d > 0) return 'proxima';
  if (d >= -TOLERANCIA_DIAS) return 'agora';
  return 'passada';
}

/**
 * Calendário a partir da data de nascimento. As doses passadas são marcadas
 * como «passada» (já deviam ter sido dadas — confirmar no boletim).
 * Depois dos 65 anos acrescenta os reforços de Td de 10 em 10 anos.
 */
export function calcularCalendarioPNV(nascimentoIso, hoje = new Date()) {
  const nascimento = nascimentoIso instanceof Date ? nascimentoIso : paraData(nascimentoIso);
  if (!nascimento) return { ok: false, motivo: 'Indique a data de nascimento.' };
  const hojeData = hoje instanceof Date ? hoje : new Date(hoje);
  if (nascimento > hojeData) return { ok: false, motivo: 'A data de nascimento não pode ser no futuro.' };
  const idadeAnos = diferencaDias(nascimento, hojeData) / 365.25;
  if (idadeAnos > 110) return { ok: false, motivo: 'Verifique a data de nascimento.' };

  const esquema = [...ESQUEMA_PNV];
  // Reforços de Td a cada 10 anos depois dos 65, até à idade atual + 10 anos.
  for (let anos = 75; anos <= Math.max(75, Math.ceil(idadeAnos) + 10); anos += 10) {
    esquema.push({ meses: anos * 12, idade: `${anos} anos`, vacinas: ['Td (reforço)'] });
  }

  const doses = esquema.map((e) => {
    const data = adicionarMeses(nascimento, e.meses);
    return { ...e, data, dataIso: paraISO(data), estado: estadoDaDose(data, hojeData) };
  });

  const proxima = doses.find((d) => d.estado !== 'passada') ?? null;

  return {
    ok: true,
    idadeAnos: Math.floor(idadeAnos),
    idadeMeses: Math.floor(diferencaDias(nascimento, hojeData) / 30.4375),
    doses,
    proxima,
  };
}
