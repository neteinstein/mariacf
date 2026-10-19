// Terapêutica hormonal (TH) da menopausa: elegibilidade, escolha do regime e doses equivalentes.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências:
// - Sociedade Portuguesa de Ginecologia, Secção Portuguesa de Menopausa. Consenso Nacional sobre
//   Menopausa 2021 — cap. 2 (contraindicações absolutas e relativas, p. 30–31; vias preferenciais,
//   p. 24 e 29; quadro 2 das doses, p. 25; regimes e progesterona micronizada, p. 29 e 43;
//   quadro 4 do risco cardiovascular e de cancro da mama, p. 42), cap. 4 (estrogénios locais na
//   SGUM, p. 88–89) e cap. 6 (IOP, p. 120–121).
// - British Menopause Society. HRT – Practical prescribing (Tool for Clinicians), 2026 — regime
//   sequencial na perimenopausa e contínuo combinado na pós-menopausa.
// - The Menopause Society (NAMS). The 2022 hormone therapy position statement. Menopause
//   2022;29(7):767-794 — relação benefício/risco favorável antes dos 60 anos ou nos primeiros
//   10 anos após a menopausa.

// Contraindicações absolutas (SPG 2021, p. 30–31). Qualquer uma impede a TH sistémica.
export const ABSOLUTAS = [
  { id: 'hemorragia', texto: 'Hemorragia genital não esclarecida' },
  { id: 'gravidez', texto: 'Suspeita de gravidez' },
  { id: 'cancro-hormonal', texto: 'Cancro da mama, do endométrio ou outra neoplasia hormonodependente (atual ou no passado)' },
  { id: 'tev', texto: 'Tromboembolismo venoso: TVP, embolia pulmonar ou trombose das veias retinianas (atual ou no passado)' },
  { id: 'arterial', texto: 'Doença trombótica arterial: enfarte, AIT ou AVC (atual ou no passado)' },
  { id: 'hepatica-aguda', texto: 'Doença hepática aguda ou alteração da função hepática' },
  { id: 'trombofilia', texto: 'Trombofilia conhecida (défice de proteína C, S ou antitrombina, ou outra)' },
  { id: 'hta-nc', texto: 'Hipertensão arterial não controlada' },
  { id: 'neuro-oftalmica', texto: 'Doença neuro-oftalmológica vascular' },
  { id: 'hipersensibilidade', texto: 'Hipersensibilidade à substância ativa ou aos excipientes' },
];

// Contraindicações relativas (SPG 2021, p. 31). «oral»: contraindica só a via oral.
// «transdermica»: a SPG recomenda a via transdérmica (p. 24 e 29).
export const RELATIVAS = [
  { id: 'diabetes', texto: 'Diabetes', transdermica: true },
  { id: 'trigliceridos', texto: 'Hipertrigliceridemia (> 400 mg/dL)', oral: true, transdermica: true },
  { id: 'vesicula', texto: 'Doença da vesícula biliar', oral: true, transdermica: true },
  { id: 'enxaqueca-aura', texto: 'Enxaqueca com aura', oral: true, transdermica: true },
  { id: 'hipoparatiroidismo', texto: 'Hipoparatiroidismo (risco de hipocalcemia)' },
  { id: 'meningioma', texto: 'Meningioma benigno (sobretudo com progestativo)' },
  { id: 'cardiaca', texto: 'Risco elevado de doença cardíaca' },
  { id: 'porfiria', texto: 'Porfíria' },
  { id: 'imobilizacao', texto: 'Imobilização (risco acrescido de tromboembolismo)', transdermica: true },
  { id: 'insuf-hepatica', texto: 'Insuficiência hepática' },
];

// Outras situações em que a SPG prefere a via transdérmica (p. 24 e 29); não são contraindicações.
export const VIA_TRANSDERMICA = [
  { id: 'hta', texto: 'Hipertensão arterial controlada' },
  { id: 'risco-te', texto: 'Outros fatores de risco de tromboembolismo (obesidade, idade, hipocoagulação)' },
  { id: 'epilepsia', texto: 'Epilepsia' },
  { id: 'polimedicada', texto: 'Polimedicação' },
];

// Quadro 4 (SPG 2021, p. 42): risco cardiovascular a 10 anos (calculadora ACC/AHA)
// e risco de cancro da mama a 5 anos (NCI ou IBIS).
export const RISCO_CV = [
  { id: 'baixo', texto: 'Baixo (< 5 %)' },
  { id: 'moderado', texto: 'Moderado (5–10 %)' },
  { id: 'elevado', texto: 'Elevado (> 10 %) ou doença CV conhecida' },
  { id: 'desconhecido', texto: 'Não calculado' },
];

export const RISCO_MAMA = [
  { id: 'baixo', texto: 'Baixo (< 1,67 %)' },
  { id: 'moderado', texto: 'Moderado (1,67–5 %)' },
  { id: 'elevado', texto: 'Elevado (> 5 %)' },
  { id: 'desconhecido', texto: 'Não calculado' },
];

const NIVEIS = { pode: 'baixo', precaucao: 'moderado', evitar: 'alto', contraindicada: 'muito-alto' };
const ORDEM = ['pode', 'precaucao', 'evitar', 'contraindicada'];
const pior = (a, b) => (ORDEM.indexOf(b) > ORDEM.indexOf(a) ? b : a);

export const TITULOS = {
  pode: 'A TH pode ser iniciada',
  precaucao: 'TH possível, com precaução',
  evitar: 'Evitar a TH',
  contraindicada: 'TH sistémica contraindicada',
};

/**
 * Avalia se a TH sistémica pode ser iniciada.
 * dados: { idade, anosMenopausa (vazio na perimenopausa), absolutas[], relativas[], transdermica[], riscoCV, riscoMama }
 * Devolve { ok, decisao, nivel, titulo, razoes[{ texto, decisao }], via, motivosVia[], iop }.
 */
export function avaliarElegibilidade(d) {
  const idade = Number(String(d.idade ?? '').replace(',', '.'));
  if (!d.idade || !Number.isFinite(idade) || idade < 18 || idade > 90) return { ok: false, motivo: 'Indique a idade (18 a 90 anos).' };
  const anosTxt = String(d.anosMenopausa ?? '').replace(',', '.');
  const anos = anosTxt === '' ? null : Number(anosTxt);
  if (anos !== null && (!Number.isFinite(anos) || anos < 0 || anos > 60)) return { ok: false, motivo: 'Os anos desde a menopausa devem estar entre 0 e 60.' };

  const absolutas = ABSOLUTAS.filter((c) => d.absolutas?.includes(c.id));
  const relativas = RELATIVAS.filter((c) => d.relativas?.includes(c.id));
  const outras = VIA_TRANSDERMICA.filter((c) => d.transdermica?.includes(c.id));
  const razoes = [];
  let decisao = 'pode';
  const juntar = (texto, nova) => {
    razoes.push({ texto, decisao: nova });
    decisao = pior(decisao, nova);
  };

  absolutas.forEach((c) => juntar(c.texto, 'contraindicada'));

  if (d.riscoCV === 'elevado') juntar('Risco cardiovascular a 10 anos elevado (> 10 %)', 'evitar');
  if (d.riscoMama === 'elevado') juntar('Risco de cancro da mama a 5 anos elevado (> 5 %)', 'evitar');
  if (d.riscoMama === 'moderado') juntar('Risco de cancro da mama a 5 anos moderado (1,67–5 %)', 'precaucao');
  relativas.forEach((c) => juntar(`${c.texto}${c.oral ? ' — contraindica a via oral' : ''}`, 'precaucao'));

  // Os benefícios são maiores se a TH começar antes dos 60 anos ou nos primeiros 10 anos após a menopausa.
  const tardia = idade >= 60 || (anos !== null && anos > 10);
  if (tardia) juntar('Início depois dos 60 anos ou mais de 10 anos após a menopausa: a relação benefício/risco é menos favorável', 'precaucao');

  const motivosVia = [
    ...(d.riscoCV === 'moderado' ? ['Risco cardiovascular moderado (5–10 %)'] : []),
    ...relativas.filter((c) => c.transdermica).map((c) => c.texto),
    ...outras.map((c) => c.texto),
    ...(tardia ? ['Início tardio (doses baixas)'] : []),
  ];
  const viaOralContraindicada = relativas.some((c) => c.oral);
  const via = decisao === 'contraindicada' || decisao === 'evitar' ? null : motivosVia.length ? 'transdermica' : 'qualquer';

  return {
    ok: true,
    decisao,
    nivel: NIVEIS[decisao],
    titulo: TITULOS[decisao],
    razoes: razoes.sort((a, b) => ORDEM.indexOf(b.decisao) - ORDEM.indexOf(a.decisao)),
    via,
    viaOralContraindicada,
    motivosVia,
    // Insuficiência ovárica prematura: menopausa antes dos 40 anos (SPG 2021, cap. 6).
    iop: idade < 40,
    riscosPorCalcular: [d.riscoCV, d.riscoMama].filter((r) => !r || r === 'desconhecido').length,
  };
}

// ---------- Escolha do regime ----------

export const UTERO = [
  { id: 'sim', texto: 'Tem útero' },
  { id: 'nao', texto: 'Histerectomizada' },
  { id: 'endometriose', texto: 'Histerectomizada, com endometriose' },
];

export const FASE = [
  { id: 'peri', texto: 'Perimenopausa', detalhe: 'Ainda menstrua ou < 12 meses sem menstruação' },
  { id: 'pos', texto: 'Pós-menopausa', detalhe: '≥ 12 meses sem menstruação' },
];

export const SINTOMAS = [
  { id: 'sistemicos', texto: 'Afrontamentos ou outros sintomas gerais' },
  { id: 'sgum', texto: 'Só sintomas genitourinários', detalhe: 'Secura vaginal, dor nas relações, sintomas urinários' },
];

// Progesterona micronizada para proteger o endométrio (SPG 2021, p. 29 e 43),
// para doses de estradiol até 2 mg oral ou 50 µg transdérmico.
export const PROGESTERONA = {
  sequencial: 'Progesterona micronizada 200 mg/dia durante 10–14 dias por mês',
  continuo: 'Progesterona micronizada 100 mg/dia, todos os dias',
};

/**
 * dados: { utero, fase, sintomas, siu } → { ok, opcoes[{ titulo, detalhe, notas[] }] }.
 * A primeira opção é a recomendada; as seguintes são alternativas.
 */
export function escolherRegime(d) {
  if (!d.sintomas) return { ok: false, motivo: 'Escolha os sintomas a tratar.' };
  if (d.sintomas === 'sgum') {
    return {
      ok: true,
      opcoes: [
        {
          titulo: 'Estrogénio vaginal',
          detalhe: 'Primeira escolha na síndrome genitourinária da menopausa: estradiol 10 µg em comprimido vaginal ou estriol em creme ou gel, 2 vezes por semana.',
          notas: ['A absorção sistémica é desprezável: não precisa de progestativo, mesmo com útero.', 'Não trata os afrontamentos.'],
        },
        {
          titulo: 'Hidratantes e lubrificantes vaginais',
          detalhe: 'Alternativa ou complemento, sem hormonas.',
          notas: [],
        },
      ],
    };
  }
  if (!d.utero) return { ok: false, motivo: 'Indique se tem útero.' };
  if (d.utero === 'nao') {
    return {
      ok: true,
      opcoes: [{ titulo: 'Estrogénio isolado', detalhe: 'Sem útero não é preciso progestativo.', notas: ['Os estrogénios isolados são a formulação com menor risco de cancro da mama.'] }],
    };
  }
  if (d.utero === 'endometriose') {
    return {
      ok: true,
      opcoes: [{ titulo: 'Estrogénio + progestativo', detalhe: 'Na mulher histerectomizada com endometriose, a associação com progestativo é a escolha preferencial.', notas: [] }],
    };
  }
  if (!d.fase) return { ok: false, motivo: 'Indique se está na perimenopausa ou na pós-menopausa.' };
  const opcoes = [];
  if (d.siu) {
    opcoes.push({ titulo: 'Estrogénio isolado + SIU de levonorgestrel 52 mg', detalhe: 'O SIU já colocado protege o endométrio.', notas: [] });
  }
  if (d.fase === 'peri') {
    opcoes.push({
      titulo: 'Estrogénio + progestativo, regime sequencial',
      detalhe: 'Estrogénio todos os dias e progestativo 10–14 dias por mês.',
      notas: [PROGESTERONA.sequencial, 'Hemorragia de privação mensal em cerca de 80 % das mulheres.'],
    });
  } else {
    opcoes.push({
      titulo: 'Estrogénio + progestativo, regime contínuo combinado',
      detalhe: 'Estrogénio e progestativo todos os dias.',
      notas: [PROGESTERONA.continuo, 'A maioria das mulheres fica sem menstruação.'],
    });
    opcoes.push({ titulo: 'Tibolona 2,5 mg/dia', detalhe: 'Alternativa, idealmente após 12 meses sem menstruação.', notas: [] });
  }
  return { ok: true, opcoes };
}

// ---------- Doses equivalentes (SPG 2021, quadro 2) ----------

export const DOSES_NIVEIS = [
  { id: 'padrao', texto: 'Padrão' },
  { id: 'baixa', texto: 'Baixa' },
  { id: 'ultrabaixa', texto: 'Ultrabaixa' },
];

export const ESTROGENIOS = [
  { id: 'e2-oral', nome: '17β-estradiol oral', doses: { padrao: '2 mg', baixa: '1 mg', ultrabaixa: '0,5 mg' } },
  { id: 'e2-adesivo', nome: '17β-estradiol transdérmico (adesivo)', doses: { padrao: '50 µg', baixa: '25 µg', ultrabaixa: '14 µg' } },
  { id: 'e2-spray', nome: '17β-estradiol transdérmico (spray)', doses: { padrao: '40 µg (3 doses)', baixa: '29 µg (2 doses)', ultrabaixa: '21 µg (1 dose)' } },
  { id: 've-oral', nome: 'Valerato de estradiol oral', doses: { padrao: '2 mg', baixa: '1 mg', ultrabaixa: null } },
  { id: 'eec', nome: 'Estrogénios equinos conjugados', doses: { padrao: '0,625 mg', baixa: '0,45 mg', ultrabaixa: null } },
];

/** Dada uma preparação e uma dose, devolve o nível e as doses equivalentes das outras preparações. */
export function equivalentes(prepId, nivelId) {
  const prep = ESTROGENIOS.find((e) => e.id === prepId);
  const nivel = DOSES_NIVEIS.find((n) => n.id === nivelId);
  if (!prep || !nivel || !prep.doses[nivel.id]) return { ok: false, motivo: 'Escolha a preparação e a dose.' };
  return {
    ok: true,
    prep,
    nivel,
    dose: prep.doses[nivel.id],
    outras: ESTROGENIOS.filter((e) => e.id !== prep.id).map((e) => ({ nome: e.nome, dose: e.doses[nivel.id] })),
  };
}
