// Score de Blatchford, Rockall pré-endoscópico e BISAP — gravidade de
// hemorragia digestiva alta e de pancreatite aguda.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Blatchford O et al., Lancet 2000 (Glasgow-Blatchford Score);
// Rockall TA et al., Gut 1996 (Rockall score); Wu BU et al., Gut 2008
// (BISAP).

function pontosUreia(ureiaMmol) {
  if (ureiaMmol < 6.5) return 0;
  if (ureiaMmol < 8.0) return 2;
  if (ureiaMmol < 10.0) return 3;
  if (ureiaMmol < 25.0) return 4;
  return 6;
}
function pontosHb(hb, sexoFeminino) {
  if (sexoFeminino) {
    if (hb >= 12) return 0;
    if (hb >= 10) return 1;
    return 6;
  }
  if (hb >= 13) return 0;
  if (hb >= 12) return 1;
  if (hb >= 10) return 3;
  return 6;
}
function pontosPAS(pas) {
  if (pas >= 110) return 0;
  if (pas >= 100) return 1;
  if (pas >= 90) return 2;
  return 3;
}

/** Score de Blatchford: risco de hemorragia digestiva alta. Ureia em mmol/L, Hb em g/dL. */
export function calcularBlatchford({ ureia, hemoglobina, sexoFeminino, pas, pulso100, melena, sincope, doencaHepatica, insuficienciaCardiaca }) {
  const ur = Number(ureia);
  const hb = Number(hemoglobina);
  const p = Number(pas);

  if (!Number.isFinite(ur) || ur < 0) return { ok: false, motivo: 'Indique a ureia.' };
  if (!Number.isFinite(hb) || hb <= 0) return { ok: false, motivo: 'Indique a hemoglobina.' };
  if (!Number.isFinite(p) || p <= 0) return { ok: false, motivo: 'Indique a pressão arterial sistólica.' };

  const pontos =
    pontosUreia(ur) +
    pontosHb(hb, !!sexoFeminino) +
    pontosPAS(p) +
    (pulso100 ? 1 : 0) +
    (melena ? 1 : 0) +
    (sincope ? 2 : 0) +
    (doencaHepatica ? 2 : 0) +
    (insuficienciaCardiaca ? 2 : 0);

  const nivel = pontos === 0 ? 'baixo' : pontos <= 5 ? 'moderado' : 'alto';
  const recomendacao =
    pontos === 0
      ? 'Risco muito baixo — considerar vigilância em ambulatório.'
      : 'Risco não desprezável — referenciar para avaliação hospitalar/endoscopia.';

  return { ok: true, pontos, nivel, recomendacao };
}

/** Rockall pré-endoscópico (score clínico, sem achados endoscópicos), máx. 7. */
export function calcularRockallPreEndoscopia({ idade, choque, comorbilidade }) {
  const a = Number(idade);
  if (!Number.isFinite(a) || a < 0) return { ok: false, motivo: 'Indique a idade.' };

  const pontosIdade = a >= 80 ? 2 : a >= 60 ? 1 : 0;
  const pontosChoque = choque === 'hipotensao' ? 2 : choque === 'taquicardia' ? 1 : 0;
  const pontosComorbilidade = comorbilidade === 'grave' ? 3 : comorbilidade === 'major' ? 2 : 0;

  const pontos = pontosIdade + pontosChoque + pontosComorbilidade;
  const nivel = pontos === 0 ? 'baixo' : pontos <= 2 ? 'moderado' : 'alto';

  return { ok: true, pontos, max: 7, nivel };
}

/** BISAP: gravidade de pancreatite aguda nas primeiras 24h, máx. 5. */
export function calcularBISAP(fatores = {}) {
  const pontos =
    (fatores.ureiaElevada ? 1 : 0) +
    (fatores.estadoMentalAlterado ? 1 : 0) +
    (fatores.sirs ? 1 : 0) +
    (fatores.idade60 ? 1 : 0) +
    (fatores.derramePleural ? 1 : 0);

  const nivel = pontos >= 3 ? 'alto' : 'baixo';
  const recomendacao =
    pontos >= 3
      ? 'Risco aumentado de gravidade e mortalidade — referenciar para avaliação hospitalar.'
      : 'Risco baixo de evolução grave.';

  return { ok: true, pontos, max: 5, nivel, recomendacao };
}
