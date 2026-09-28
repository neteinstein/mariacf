// Regra dos 9 (Wallace) — estimativa da superfície corporal queimada em
// adultos.
// Sem dependências do DOM para poder ser testado em Node.
//
// Referência: Wallace AB, Lancet 1951.
//
// Nota: só é válida para adultos. Em crianças as proporções corporais são
// muito diferentes (cabeça maior, membros inferiores menores) e exigem uma
// tabela própria (ex. Lund-Browder), não reproduzida aqui.

export const REGIOES = {
  cabecaPescoco: 9,
  membroSuperiorDireito: 9,
  membroSuperiorEsquerdo: 9,
  troncoAnterior: 18,
  troncoPosterior: 18,
  membroInferiorDireito: 18,
  membroInferiorEsquerdo: 18,
  perineo: 1,
};

/** Soma a percentagem de superfície corporal queimada (adulto), a partir das regiões assinaladas. */
export function calcularRegraDosNove(regioesQueimadas = {}) {
  const pontos = Object.entries(REGIOES).reduce((acc, [regiao, pct]) => acc + (regioesQueimadas[regiao] ? pct : 0), 0);

  let nivel;
  let gravidade;
  if (pontos < 10) { nivel = 'baixo'; gravidade = 'Queimadura de pequena extensão'; }
  else if (pontos < 20) { nivel = 'moderado'; gravidade = 'Extensão moderada — considerar referenciação'; }
  else { nivel = 'alto'; gravidade = 'Grande queimado — referenciar a centro de queimados'; }

  return { ok: true, pontos, max: 100, nivel, gravidade };
}
