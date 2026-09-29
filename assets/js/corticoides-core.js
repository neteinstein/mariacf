// Equivalência de doses de corticosteroides sistémicos (potência
// anti-inflamatória/glicocorticoide), para trocar de fármaco ou de via.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Liu D et al., Allergy Asthma Clin Immunol 2013; BNF,
// «Corticosteroids, general use» (equivalências anti-inflamatórias);
// Resumos das Características do Medicamento (deflazacorte).

// dose: dose equivalente a 5 mg de prednisolona. mineralo: potência
// mineralocorticoide relativa à hidrocortisona. duracao: ação biológica.
export const CORTICOIDES = [
  { id: 'hidrocortisona', nome: 'Hidrocortisona', dose: 20, mineralo: 'Elevada (1)', duracao: 'Curta (8–12 h)' },
  { id: 'cortisona', nome: 'Cortisona', dose: 25, mineralo: 'Elevada (0,8)', duracao: 'Curta (8–12 h)' },
  { id: 'prednisolona', nome: 'Prednisolona', dose: 5, mineralo: 'Baixa (0,8)', duracao: 'Intermédia (12–36 h)' },
  { id: 'prednisona', nome: 'Prednisona', dose: 5, mineralo: 'Baixa (0,8)', duracao: 'Intermédia (12–36 h)' },
  { id: 'metilprednisolona', nome: 'Metilprednisolona', dose: 4, mineralo: 'Mínima (0,5)', duracao: 'Intermédia (12–36 h)' },
  { id: 'triancinolona', nome: 'Triancinolona', dose: 4, mineralo: 'Nula', duracao: 'Intermédia (12–36 h)' },
  { id: 'deflazacorte', nome: 'Deflazacorte', dose: 6, mineralo: 'Mínima', duracao: 'Intermédia (12–36 h)' },
  { id: 'dexametasona', nome: 'Dexametasona', dose: 0.75, mineralo: 'Nula', duracao: 'Longa (36–72 h)' },
  { id: 'betametasona', nome: 'Betametasona', dose: 0.75, mineralo: 'Nula', duracao: 'Longa (36–72 h)' },
];

const arredDose = (mg) => {
  if (mg >= 10) return Math.round(mg * 2) / 2;
  if (mg >= 1) return Math.round(mg * 10) / 10;
  return Math.round(mg * 100) / 100;
};

/**
 * Converte uma dose diária (mg) de um corticosteroide nas doses equivalentes
 * dos restantes. Assinala doses que podem suprimir o eixo hipotálamo-hipófise-suprarrenal.
 */
export function converterCorticoide(origemId, doseMg) {
  const origem = CORTICOIDES.find((c) => c.id === origemId);
  if (!origem) return { ok: false, motivo: 'Escolha o corticosteroide de origem.' };
  const d = Number(doseMg);
  if (doseMg === '' || !Number.isFinite(d) || d <= 0) return { ok: false, motivo: 'Indique a dose diária.' };

  const prednisolona = (d / origem.dose) * 5;
  if (prednisolona > 2000) return { ok: false, motivo: 'Dose fora do intervalo plausível.' };

  const equivalentes = CORTICOIDES.map((c) => ({
    ...c,
    equivalente: arredDose((prednisolona / 5) * c.dose),
    origem: c.id === origem.id,
  }));

  let nivel;
  let nota;
  if (prednisolona < 5) {
    nivel = 'baixo';
    nota = 'Abaixo da dose fisiológica de substituição (≈ 5 mg/dia de prednisolona).';
  } else if (prednisolona < 20) {
    nivel = 'moderado';
    nota = 'Se mantida mais de 3 semanas, pode suprimir o eixo suprarrenal — suspender de forma gradual.';
  } else if (prednisolona < 40) {
    nivel = 'alto';
    nota = 'Dose moderada a alta: se mantida mais de 3 semanas, reduzir de forma gradual; considerar proteção gástrica e óssea.';
  } else {
    nivel = 'muito-alto';
    nota = 'Dose alta (≥ 40 mg de prednisolona): mesmo após 1 semana, a suspensão deve ser gradual.';
  }

  return {
    ok: true,
    prednisolona: arredDose(prednisolona),
    equivalentes,
    nivel,
    nota,
  };
}
