// Índice tornozelo-braço (ITB) e peso ideal/ajustado (fórmula de Devine) —
// avaliação vascular e antropométrica para ajuste de dose de fármacos.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Aboyans V et al., Circulation 2012 (ITB); Devine BJ, Drug
// Intell Clin Pharm 1974 (peso ideal).

const arred = (n, casas = 0) => {
  const f = 10 ** casas;
  return Math.round(n * f) / f;
};

function classificarITB(valor) {
  if (valor > 1.4) return { nivel: 'moderado', descricao: 'Incompressível/calcificado — resultado não interpretável, considerar outro exame' };
  if (valor >= 1.0) return { nivel: 'baixo', descricao: 'Normal' };
  if (valor >= 0.91) return { nivel: 'moderado', descricao: 'Limítrofe' };
  if (valor >= 0.41) return { nivel: 'alto', descricao: 'Doença arterial periférica ligeira a moderada' };
  return { nivel: 'muito-alto', descricao: 'Doença arterial periférica grave' };
}

/** Índice tornozelo-braço, para cada perna. Pressões sistólicas em mmHg. */
export function calcularITB({ braçoDireito, braçoEsquerdo, tornozeloDireito, tornozeloEsquerdo }) {
  const bd = Number(braçoDireito);
  const be = Number(braçoEsquerdo);
  const td = Number(tornozeloDireito);
  const te = Number(tornozeloEsquerdo);

  if (!Number.isFinite(bd) || bd <= 0) return { ok: false, motivo: 'Indique a PAS do braço direito.' };
  if (!Number.isFinite(be) || be <= 0) return { ok: false, motivo: 'Indique a PAS do braço esquerdo.' };
  if (!Number.isFinite(td) || td <= 0) return { ok: false, motivo: 'Indique a PAS do tornozelo direito.' };
  if (!Number.isFinite(te) || te <= 0) return { ok: false, motivo: 'Indique a PAS do tornozelo esquerdo.' };

  const braçoMaior = Math.max(bd, be);
  const itbDireito = td / braçoMaior;
  const itbEsquerdo = te / braçoMaior;

  return {
    ok: true,
    itbDireito: arred(itbDireito, 2),
    itbEsquerdo: arred(itbEsquerdo, 2),
    direito: classificarITB(itbDireito),
    esquerdo: classificarITB(itbEsquerdo),
  };
}

/** Peso ideal (Devine) e peso ajustado, a partir da altura (cm), sexo e peso real (kg). */
export function calcularPesoIdealAjustado(alturaCm, sexoFeminino, pesoReal) {
  const altura = Number(alturaCm);
  const peso = Number(pesoReal);

  if (!Number.isFinite(altura) || altura <= 0) return { ok: false, motivo: 'Indique a altura.' };
  if (!Number.isFinite(peso) || peso <= 0) return { ok: false, motivo: 'Indique o peso real.' };
  if (altura < 152.4) return { ok: false, motivo: 'A fórmula de Devine aplica-se a alturas ≥ 152,4 cm (5 pés).' };

  const base = sexoFeminino ? 45.5 : 50;
  const pesoIdeal = base + 2.3 * ((altura - 152.4) / 2.54);
  const pesoAjustado = pesoIdeal + 0.4 * (peso - pesoIdeal);

  return {
    ok: true,
    pesoIdeal: arred(pesoIdeal, 1),
    pesoAjustado: arred(pesoAjustado, 1),
    usarAjustado: peso > pesoIdeal * 1.2,
  };
}
