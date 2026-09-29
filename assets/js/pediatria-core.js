// Fluidos de manutenção (Holliday-Segar), escala clínica de desidratação
// (CDS) e interpretação do M-CHAT-R/F — pediatria em cuidados primários.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referências: Holliday MA & Segar WE, Pediatrics 1957; Friedman JN et
// al., J Pediatr 2004 e Goldman RD et al., Pediatrics 2008 (Clinical
// Dehydration Scale); Robins DL et al., Pediatrics 2014 (M-CHAT-R/F).
//
// Nota: o M-CHAT-R/F é um instrumento protegido por direitos de autor. Esta
// calculadora não reproduz os itens — apenas classifica a pontuação total
// obtida com o questionário oficial (mchatscreen.com).

const arred = (n, casas = 0) => {
  const f = 10 ** casas;
  return Math.round(n * f) / f;
};

/**
 * Fluidos de manutenção pela regra de Holliday-Segar:
 * 100 mL/kg/dia nos primeiros 10 kg, 50 mL/kg/dia dos 10 aos 20 kg e
 * 20 mL/kg/dia acima dos 20 kg (equivalente horário: regra 4-2-1).
 * Limitado ao máximo habitual do adulto (2400 mL/dia, 100 mL/h).
 */
export function calcularHollidaySegar(pesoKg) {
  const p = Number(pesoKg);
  if (pesoKg === '' || !Number.isFinite(p) || p <= 0) return { ok: false, motivo: 'Indique o peso.' };
  if (p < 2 || p > 120) return { ok: false, motivo: 'Peso fora do intervalo suportado (2–120 kg).' };

  const diario = Math.min(p, 10) * 100 + Math.min(Math.max(p - 10, 0), 10) * 50 + Math.max(p - 20, 0) * 20;
  const limitado = diario > 2400;
  const mlDia = Math.min(diario, 2400);
  return {
    ok: true,
    mlDia: arred(mlDia),
    mlHora: arred(mlDia / 24, 1),
    limitado,
  };
}

/**
 * Clinical Dehydration Scale: 4 itens (aspeto geral, olhos, mucosas,
 * lágrimas), cada um de 0 a 2. Total 0–8.
 */
export function calcularCDS(itens = {}) {
  const campos = ['aspeto', 'olhos', 'mucosas', 'lagrimas'];
  const valores = campos.map((c) => Number(itens[c]));
  if (valores.some((v) => !Number.isFinite(v))) return { ok: false, motivo: 'Preencha todos os itens.' };
  const pontos = valores.reduce((a, b) => a + b, 0);

  if (pontos === 0) return { ok: true, pontos, max: 8, nivel: 'baixo', grau: 'Sem desidratação', conduta: 'Manter a alimentação habitual e oferecer líquidos com frequência.' };
  if (pontos <= 4) return { ok: true, pontos, max: 8, nivel: 'moderado', grau: 'Desidratação ligeira (< 5%)', conduta: 'Solução de reidratação oral (SRO) em pequenos volumes frequentes; reavaliar.' };
  return { ok: true, pontos, max: 8, nivel: 'muito-alto', grau: 'Desidratação moderada a grave (≥ 6%)', conduta: 'Avaliação médica urgente: pode precisar de reidratação por sonda ou endovenosa.' };
}

/**
 * M-CHAT-R/F: classificação da pontuação total (0–20) do questionário
 * oficial, para crianças dos 16 aos 30 meses.
 */
export function classificarMCHAT(pontos, idadeMeses) {
  const p = Number(pontos);
  const idade = Number(idadeMeses);
  if (pontos === '' || !Number.isInteger(p) || p < 0 || p > 20) return { ok: false, motivo: 'Indique a pontuação total (0–20).' };
  if (idadeMeses === '' || !Number.isFinite(idade)) return { ok: false, motivo: 'Indique a idade da criança.' };

  const foraIdade = idade < 16 || idade > 30;
  let nivel;
  let risco;
  let conduta;
  if (p <= 2) {
    nivel = 'baixo';
    risco = 'Risco baixo';
    conduta = idade < 24
      ? 'Sem necessidade de mais avaliação; repetir o rastreio aos 24 meses.'
      : 'Sem necessidade de mais avaliação, salvo preocupação clínica ou dos pais.';
  } else if (p <= 7) {
    nivel = 'moderado';
    risco = 'Risco médio';
    conduta = 'Aplicar a entrevista de seguimento (Follow-Up). Se a pontuação se mantiver ≥ 2, referenciar para avaliação do desenvolvimento e intervenção precoce.';
  } else {
    nivel = 'alto';
    risco = 'Risco elevado';
    conduta = 'Referenciar logo para avaliação diagnóstica e intervenção precoce (a entrevista de seguimento pode ser dispensada).';
  }

  return {
    ok: true,
    pontos: p,
    max: 20,
    nivel,
    risco,
    conduta,
    aviso: foraIdade ? 'O M-CHAT-R/F está validado dos 16 aos 30 meses.' : null,
  };
}
