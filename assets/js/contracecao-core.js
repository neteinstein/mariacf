// Critérios médicos de elegibilidade para o uso de contracetivos (MEC) da OMS, 6.ª edição (2025).
// Sem dependências do DOM para poder ser testado em Node.
//
// Referência: World Health Organization. Medical eligibility criteria for contraceptive use,
// sixth edition. Geneva: WHO; 2025 — tabela-resumo (secção 5.12) e tabelas de cada método
// (secção 5), de onde vêm as categorias de início (I) e continuação (C).
//
// Categorias: 1 — sem restrições; 2 — as vantagens geralmente superam os riscos;
// 3 — os riscos geralmente superam as vantagens; 4 — risco inaceitável.
// «3/4» quer dizer 3 ou 4 consoante a gravidade (por exemplo, o número de fatores de risco).
// Com várias condições, conta a categoria mais alta de cada método.

export const METODOS = [
  { id: 'chc', nome: 'Contraceção hormonal combinada', detalhe: 'Pílula combinada, adesivo ou anel vaginal' },
  { id: 'pop', nome: 'Pílula só com progestativo', detalhe: 'Por exemplo, desogestrel' },
  { id: 'dmpa', nome: 'Injetável trimestral', detalhe: 'Acetato de medroxiprogesterona (DMPA)' },
  { id: 'implante', nome: 'Implante', detalhe: 'Etonogestrel, no braço' },
  { id: 'cu', nome: 'DIU de cobre', detalhe: 'Dispositivo intrauterino sem hormonas' },
  { id: 'lng', nome: 'SIU de levonorgestrel', detalhe: 'Sistema intrauterino com hormona' },
];

export const SIGNIFICADO = {
  1: 'Sem restrições',
  2: 'Vantagens geralmente superam os riscos',
  3: 'Riscos geralmente superam as vantagens',
  4: 'Risco inaceitável',
};

// c(chc, pop, dmpa, implante, cu, lng): cada valor é 1–4, '3/4', ou [início, continuação].
const c = (chc, pop, dmpa, implante, cu, lng) => ({ chc, pop, dmpa, implante, cu, lng });

// Condições de sim/não, agrupadas como na tabela da OMS.
export const CONDICOES = [
  { grupo: 'Pessoais', id: 'nulipara', texto: 'Nunca teve filhos (nulípara)', cat: c(1, 1, 1, 1, 2, 2) },
  { grupo: 'Pessoais', id: 'obesidade', texto: 'IMC ≥ 30 kg/m²', cat: null }, // depende da idade (ver avaliar)
  { grupo: 'Cardiovascular', id: 'fatores-cv', texto: 'Vários fatores de risco cardiovascular (idade, tabaco, diabetes, hipertensão, dislipidemia)', cat: c('3/4', 2, 3, 2, 1, 2) },
  { grupo: 'Cardiovascular', id: 'hta-gravidez', texto: 'Hipertensão numa gravidez anterior (tensão atual normal)', cat: c(2, 1, 1, 1, 1, 1) },
  { grupo: 'Cardiovascular', id: 'cardiopatia', texto: 'Doença cardíaca isquémica (atual ou passada)', cat: c(4, [2, 3], 3, [2, 3], 1, [2, 3]) },
  { grupo: 'Cardiovascular', id: 'avc', texto: 'AVC (antecedentes)', cat: c(4, [2, 3], 3, [2, 3], 1, 2) },
  { grupo: 'Cardiovascular', id: 'dislipidemia', texto: 'Dislipidemia conhecida, sem outros fatores de risco', cat: c(2, 2, 2, 2, 1, 2) },
  { grupo: 'Cardiovascular', id: 'valvulopatia', texto: 'Doença valvular complicada (hipertensão pulmonar, risco de FA, endocardite)', cat: c(4, 1, 1, 1, 2, 2) },
  { grupo: 'Tromboembolismo', id: 'tev-historia', texto: 'Antecedentes de TVP ou TEP', cat: c(4, 2, 2, 2, 1, 2) },
  { grupo: 'Tromboembolismo', id: 'tev-aguda', texto: 'TVP ou TEP aguda', cat: c(4, 3, 3, 3, 1, 3) },
  { grupo: 'Tromboembolismo', id: 'tev-anticoagulada', texto: 'TVP ou TEP, sob anticoagulação estabelecida', cat: c(4, 2, 2, 2, 1, 2) },
  { grupo: 'Tromboembolismo', id: 'tev-familiar', texto: 'TVP ou TEP num familiar em 1.º grau', cat: c(2, 1, 1, 1, 1, 1) },
  { grupo: 'Tromboembolismo', id: 'cirurgia', texto: 'Cirurgia major com imobilização prolongada', cat: c(4, 2, 2, 2, 1, 2) },
  { grupo: 'Tromboembolismo', id: 'trombofilia', texto: 'Mutação trombogénica conhecida (fator V de Leiden, protrombina, défice de proteína C, S ou antitrombina)', cat: c(4, 2, 2, 2, 1, 2) },
  { grupo: 'Tromboembolismo', id: 'tvs', texto: 'Trombose venosa superficial', cat: c(2, 1, 1, 1, 1, 1) },
  { grupo: 'Doenças reumáticas', id: 'les-apl', texto: 'Lúpus com anticorpos antifosfolípidos positivos ou desconhecidos', cat: c(4, 3, 3, 3, 1, 3) },
  { grupo: 'Ginecológicas', id: 'hemorragia', texto: 'Hemorragia vaginal inexplicada, ainda por avaliar', cat: c(2, 2, 3, 3, [4, 2], [4, 2]) },
  { grupo: 'Ginecológicas', id: 'miomas', texto: 'Miomas ou anomalia que distorcem a cavidade uterina', cat: c(1, 1, 1, 1, 4, 4) },
  { grupo: 'Ginecológicas', id: 'dip', texto: 'Doença inflamatória pélvica atual', cat: c(1, 1, 1, 1, [4, 2], [4, 2]) },
  { grupo: 'Ginecológicas', id: 'ist', texto: 'Cervicite purulenta, clamídia ou gonorreia atuais', cat: c(1, 1, 1, 1, [4, 2], [4, 2]) },
  { grupo: 'Ginecológicas', id: 'cancro-colo', texto: 'Cancro do colo do útero (a aguardar tratamento)', cat: c(2, 1, 2, 2, [4, 2], [4, 2]) },
  { grupo: 'Ginecológicas', id: 'cancro-endometrio', texto: 'Cancro do endométrio', cat: c(1, 1, 1, 1, [4, 2], [4, 2]) },
  { grupo: 'Ginecológicas', id: 'mama-atual', texto: 'Cancro da mama atual', cat: c(4, 4, 4, 4, 1, 4) },
  { grupo: 'Ginecológicas', id: 'mama-passado', texto: 'Cancro da mama no passado, sem doença há 5 anos', cat: c(3, 3, 3, 3, 1, 3) },
  { grupo: 'Endócrinas e digestivas', id: 'diabetes', texto: 'Diabetes sem doença vascular', cat: c(2, 2, 2, 2, 1, 2) },
  { grupo: 'Endócrinas e digestivas', id: 'diabetes-vascular', texto: 'Diabetes com nefropatia, retinopatia, neuropatia, outra doença vascular ou com mais de 20 anos', cat: c('3/4', 2, 3, 2, 1, 2) },
  { grupo: 'Endócrinas e digestivas', id: 'vesicula', texto: 'Doença da vesícula sintomática, atual ou com tratamento médico', cat: c(3, 2, 2, 2, 1, 2) },
  { grupo: 'Endócrinas e digestivas', id: 'colestase-coc', texto: 'Colestase associada a contracetivo combinado no passado', cat: c(3, 2, 2, 2, 1, 2) },
  { grupo: 'Endócrinas e digestivas', id: 'hepatite-aguda', texto: 'Hepatite viral aguda ou agudização', cat: c(['3/4', 2], 1, 1, 1, 1, 1) },
  { grupo: 'Endócrinas e digestivas', id: 'cirrose', texto: 'Cirrose descompensada', cat: c(4, 3, 3, 3, 1, 3) },
  { grupo: 'Endócrinas e digestivas', id: 'tumor-hepatico', texto: 'Adenoma hepatocelular ou carcinoma hepatocelular', cat: c(4, 3, 3, 3, 1, 3) },
  { grupo: 'Medicamentos', id: 'anticonvulsivantes', texto: 'Fenitoína, carbamazepina, barbitúricos, primidona, topiramato ou oxcarbazepina', cat: c(3, 3, 1, 2, 1, 1) },
  { grupo: 'Medicamentos', id: 'lamotrigina', texto: 'Lamotrigina', cat: c(3, 1, 1, 1, 1, 1) },
  { grupo: 'Medicamentos', id: 'rifampicina', texto: 'Rifampicina ou rifabutina', cat: c(3, 3, 1, 2, 1, 1) },
];

// Pós-parto: o tempo desde o parto e a amamentação mudam a categoria dos combinados e dos DIU.
// «tev» indica as linhas em que outros fatores de risco de TEV (sem amamentar) sobem a categoria dos combinados.
export const POS_PARTO = [
  { id: '', texto: 'Não se aplica (mais de 6 meses, ou sem parto recente)', cat: null },
  { id: 'am-48h', texto: 'A amamentar, menos de 48 horas após o parto', cat: c(4, 2, 2, 2, 1, 2) },
  { id: 'am-4s', texto: 'A amamentar, 48 horas a 4 semanas', cat: c(4, 2, 2, 2, 3, 3) },
  { id: 'am-6s', texto: 'A amamentar, 4 a 6 semanas', cat: c(4, 2, 2, 2, 1, 1) },
  { id: 'am-6m', texto: 'A amamentar, 6 semanas a 6 meses', cat: c(3, 1, 1, 1, 1, 1) },
  { id: 'am-mais', texto: 'A amamentar, 6 meses ou mais', cat: c(2, 1, 1, 1, 1, 1) },
  { id: 'na-48h', texto: 'Sem amamentar, menos de 48 horas após o parto', cat: c(3, 1, 1, 1, 1, 1), tev: 4 },
  { id: 'na-21d', texto: 'Sem amamentar, 48 horas a 21 dias', cat: c(3, 1, 1, 1, 3, 3), tev: 4 },
  { id: 'na-4s', texto: 'Sem amamentar, 21 dias a 4 semanas', cat: c(2, 1, 1, 1, 3, 3), tev: 3 },
  { id: 'na-6s', texto: 'Sem amamentar, 4 a 6 semanas', cat: c(2, 1, 1, 1, 1, 1), tev: 3 },
  { id: 'na-mais', texto: 'Sem amamentar, mais de 6 semanas', cat: c(1, 1, 1, 1, 1, 1) },
];

export const HTA = [
  { id: '', texto: 'Sem hipertensão', cat: null },
  { id: 'controlada', texto: 'Hipertensão controlada (tensão medida)', cat: c(3, 1, 2, 1, 1, 1) },
  { id: 'ligeira', texto: 'Tensão 140–159 / 90–99 mmHg', cat: c(3, 1, 2, 1, 1, 1) },
  { id: 'grave', texto: 'Tensão ≥ 160 / ≥ 100 mmHg', cat: c(4, 2, 3, 2, 1, 2) },
  { id: 'vascular', texto: 'Hipertensão com doença vascular', cat: c(4, 2, 3, 2, 1, 2) },
];

export const ENXAQUECA = [
  { id: '', texto: 'Sem enxaqueca' },
  { id: 'sem-aura', texto: 'Enxaqueca sem aura' },
  { id: 'com-aura', texto: 'Enxaqueca com aura' },
];

export const TABACO = [
  { id: '', texto: 'Não fuma' },
  { id: 'menos15', texto: 'Fuma menos de 15 cigarros por dia' },
  { id: 'mais15', texto: 'Fuma 15 ou mais cigarros por dia' },
];

// Valor numérico para comparar categorias: '3/4' fica entre 3 e 4.
const peso = (v) => (v === '3/4' ? 3.5 : v);
const inicio = (v) => (Array.isArray(v) ? v[0] : v);
const continuacao = (v) => (Array.isArray(v) ? v[1] : v);

function porIdade(idade) {
  return c(idade >= 40 ? 2 : 1, 1, idade < 18 || idade > 45 ? 2 : 1, 1, idade < 20 ? 2 : 1, idade < 20 ? 2 : 1);
}

/**
 * dados: { idade, posParto, tevPosParto, tabaco, hta, enxaqueca, condicoes: [ids] }.
 * Devolve { ok, metodos: [{ id, nome, detalhe, inicio, continuacao, pior, razoes: [{ texto, inicio, continuacao }] }] },
 * com as razões ordenadas da mais à menos restritiva (só as de categoria ≥ 2).
 */
export function avaliarContracecao(dados = {}) {
  const idade = Number(dados.idade);
  if (!Number.isFinite(idade) || idade < 10 || idade > 60) {
    return { ok: false, motivo: 'Indique a idade (entre 10 e 60 anos).' };
  }
  const linhas = [{ texto: `Idade: ${idade} anos`, cat: porIdade(idade) }];

  const pp = POS_PARTO.find((p) => p.id === (dados.posParto || ''));
  if (pp?.cat) {
    const cat = { ...pp.cat };
    if (dados.tevPosParto && pp.tev) cat.chc = pp.tev;
    linhas.push({ texto: pp.texto + (dados.tevPosParto && pp.tev ? ', com outros fatores de risco de TEV' : ''), cat });
  }

  if (dados.tabaco) {
    const chc = idade < 35 ? 2 : dados.tabaco === 'mais15' ? 4 : 3;
    const t = TABACO.find((x) => x.id === dados.tabaco);
    linhas.push({ texto: `${t.texto}${idade >= 35 ? ' (35 anos ou mais)' : ' (menos de 35 anos)'}`, cat: c(chc, 1, 1, 1, 1, 1) });
  }

  const hta = HTA.find((h) => h.id === (dados.hta || ''));
  if (hta?.cat) linhas.push({ texto: hta.texto, cat: hta.cat });

  if (dados.enxaqueca === 'sem-aura') {
    linhas.push({
      texto: `Enxaqueca sem aura (${idade < 35 ? 'menos de 35 anos' : '35 anos ou mais'})`,
      cat: c(idade < 35 ? [2, 3] : [3, 4], [1, 2], 2, 2, 1, 2),
    });
  } else if (dados.enxaqueca === 'com-aura') {
    linhas.push({ texto: 'Enxaqueca com aura', cat: c(4, [2, 3], [2, 3], [2, 3], 1, [2, 3]) });
  }

  for (const id of dados.condicoes || []) {
    const cond = CONDICOES.find((x) => x.id === id);
    if (!cond) continue;
    if (id === 'obesidade') linhas.push({ texto: cond.texto, cat: c(2, 1, idade < 18 ? 2 : 1, 1, 1, 1) });
    else linhas.push({ texto: cond.texto, cat: cond.cat });
  }

  const metodos = METODOS.map((m) => {
    const razoes = linhas
      .map((l) => ({ texto: l.texto, inicio: inicio(l.cat[m.id]), continuacao: continuacao(l.cat[m.id]) }))
      .filter((r) => peso(r.inicio) >= 2 || peso(r.continuacao) >= 2)
      .sort((a, b) => peso(b.inicio) - peso(a.inicio) || peso(b.continuacao) - peso(a.continuacao));
    const pior = (f) => linhas.map((l) => f(l.cat[m.id])).reduce((a, b) => (peso(b) > peso(a) ? b : a), 1);
    const i = pior(inicio);
    const cont = pior(continuacao);
    return { ...m, inicio: i, continuacao: cont, pior: peso(cont) > peso(i) ? cont : i, razoes };
  });

  return { ok: true, metodos };
}

/** Nível de cor para a categoria (para o cartão de cada método). */
export function nivelCategoria(cat) {
  const p = peso(cat);
  return p >= 4 ? 'muito-alto' : p >= 3 ? 'alto' : p >= 2 ? 'moderado' : 'baixo';
}

export const significado = (cat) => (cat === '3/4' ? 'Categoria 3 ou 4, consoante a gravidade' : SIGNIFICADO[cat]);

export const textoCategoria = (inicioCat, contCat) =>
  inicioCat === contCat ? `Categoria ${inicioCat}` : `Início ${inicioCat} · continuação ${contCat}`;
