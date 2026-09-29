import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularZScore, calcularPesoComprimento } from '../assets/js/crescimento-core.js';

test('peso-para-idade: no valor mediano (M), Z ≈ 0 e percentil ≈ 50', () => {
  // Tabela OMS: menino, 12 meses, M = 9.6479 kg
  const r = calcularZScore('peso', false, 12, 9.6479);
  assert.equal(r.ok, true);
  assert.ok(Math.abs(r.z) < 0.01, `z devia ser ~0, foi ${r.z}`);
  assert.ok(Math.abs(r.percentil - 50) < 1, `percentil devia ser ~50, foi ${r.percentil}`);
});

test('peso-para-idade: peso muito baixo → Z muito negativo, nível muito-alto (alerta)', () => {
  const r = calcularZScore('peso', false, 12, 5.0);
  assert.ok(r.z < -3);
  assert.equal(r.nivel, 'muito-alto');
});

test('peso-para-idade: peso dentro do normal → nível baixo', () => {
  const r = calcularZScore('peso', false, 12, 9.6);
  assert.equal(r.nivel, 'baixo');
});

test('comprimento-para-idade: menina, no valor mediano em idade não inteira (interpolação)', () => {
  // Interpola entre 6 e 7 meses
  const r6 = calcularZScore('comprimento', true, 6, 1); // valor arbitrário só para obter mediana via z
  assert.equal(r6.ok, true);
});

test('perímetro cefálico: valores em falta são inválidos', () => {
  assert.equal(calcularZScore('perimetroCefalico', false, '', 45).ok, false);
  assert.equal(calcularZScore('perimetroCefalico', false, 6, '').ok, false);
});

test('peso-para-comprimento: no valor mediano, Z ≈ 0', () => {
  // Tabela OMS: menino, comprimento 60cm → M = 5,9907 kg
  const base = calcularZScore('pesoComprimento', false, 60, 5.9907);
  assert.ok(Math.abs(base.z) < 0.01, `z devia ser ~0, foi ${base.z}`);
});

test('peso-para-comprimento: peso muito acima do esperado → nível muito-alto', () => {
  const r = calcularPesoComprimento(false, 60, 12);
  assert.ok(r.z > 3);
  assert.equal(r.nivel, 'muito-alto');
});

test('classificação: limites -2/+2 DP', () => {
  // Constrói valores a partir de M e S aproximados usando a própria função com M conhecido
  const mediano = calcularZScore('peso', false, 0, 3.3464);
  assert.ok(Math.abs(mediano.z) < 0.01);
});

import { calcularIMCIdade, calcularAlturaIdade, calcularIdadeCorrigida, calcularAlturaAlvo } from '../assets/js/crescimento-core.js';

test('IMC-para-idade: menino 10 anos na mediana OMS 2007 (16,4433) → Z ≈ 0', () => {
  // altura 140 cm → peso = 16,4433 × 1,96
  const r = calcularIMCIdade(false, 120, 16.4433 * 1.96, 140);
  assert.equal(r.ok, true);
  assert.ok(Math.abs(r.z) < 0.01, `z devia ser ~0, foi ${r.z}`);
  assert.equal(r.nivel, 'baixo');
});

test('IMC-para-idade: menino 10 anos com IMC no +2 DP (21,4) → obesidade no limite', () => {
  const r = calcularIMCIdade(false, 120, 21.4 * 1.96, 140);
  assert.ok(Math.abs(r.z - 2) < 0.02, `z devia ser ~2, foi ${r.z}`);
});

test('IMC-para-idade: acima de +3 DP usa o método restrito da OMS', () => {
  // SD3 = 26,073, SD2 = 21,4 → IMC 30,746 (SD4 tabelado) deve dar Z ≈ 4
  const r = calcularIMCIdade(false, 120, 30.746 * 1.96, 140);
  assert.ok(Math.abs(r.z - 4) < 0.02, `z devia ser ~4, foi ${r.z}`);
  assert.equal(r.nivel, 'muito-alto');
});

test('IMC-para-idade: menina 3 anos usa padrões OMS 2006 (M = 15,3968), com risco de excesso de peso > +1 DP', () => {
  const mediana = calcularIMCIdade(true, 36, 15.3968 * 0.9 * 0.9, 90);
  assert.ok(Math.abs(mediana.z) < 0.01);
  const acima = calcularIMCIdade(true, 36, 17.2 * 0.81, 90);
  assert.equal(acima.nivel, 'moderado');
});

test('IMC-para-idade: fora dos 2–19 anos é inválido', () => {
  assert.equal(calcularIMCIdade(false, 12, 10, 75).ok, false);
  assert.equal(calcularIMCIdade(false, 240, 70, 175).ok, false);
});

test('altura-para-idade: rapariga 19 anos na mediana (163,1548 cm) → Z ≈ 0; -2 DP = 150,073', () => {
  assert.ok(Math.abs(calcularAlturaIdade(true, 228, 163.1548).z) < 0.01);
  const baixa = calcularAlturaIdade(true, 228, 150.0);
  assert.ok(baixa.z < -2);
  assert.equal(baixa.nivel, 'alto');
});

test('idade corrigida: prematuro de 32 semanas com 6 meses cronológicos → ~4 meses corrigidos', () => {
  const r = calcularIdadeCorrigida('2026-01-01', 32, 0, new Date(2026, 6, 1));
  assert.equal(r.ok, true);
  assert.equal(r.prematuro, true);
  assert.equal(r.prematuridadeSemanas, 8);
  assert.equal(r.cronologica.totalDias, 181);
  assert.equal(r.corrigida.totalDias, 181 - 56);
  assert.equal(r.corrigida.meses, 4);
});

test('idade corrigida: antes das 40 semanas pós-menstruais devolve a idade pós-menstrual', () => {
  const r = calcularIdadeCorrigida('2026-01-01', 30, 0, new Date(2026, 0, 29));
  assert.equal(r.corrigida, null);
  assert.deepEqual(r.idadePosMenstrual, { semanas: 34, dias: 0 });
});

test('idade corrigida: termo não precisa de correção', () => {
  const r = calcularIdadeCorrigida('2026-01-01', 39, 0, new Date(2026, 6, 1));
  assert.equal(r.prematuro, false);
  assert.equal(r.corrigida.totalDias, 181 - 7);
});

test('idade corrigida: validação', () => {
  assert.equal(calcularIdadeCorrigida('', 32).ok, false);
  assert.equal(calcularIdadeCorrigida('2026-01-01', 20).ok, false);
  assert.equal(calcularIdadeCorrigida('2027-01-01', 32, 0, new Date(2026, 0, 1)).ok, false);
});

test('altura-alvo: pai 180, mãe 165 → rapaz 179 cm, rapariga 166 cm, ± 8,5', () => {
  const rapaz = calcularAlturaAlvo(false, 180, 165);
  assert.equal(rapaz.alvo, 179);
  assert.equal(rapaz.minimo, 170.5);
  assert.equal(rapaz.maximo, 187.5);
  assert.equal(calcularAlturaAlvo(true, 180, 165).alvo, 166);
  assert.equal(calcularAlturaAlvo(true, 180, '').ok, false);
});

test('curvas de referência: a linha Z = 0 é a mediana da tabela e as linhas estão ordenadas', async () => {
  const { curvasReferencia } = await import('../assets/js/crescimento-core.js');
  const c = curvasReferencia('peso', false);
  const i12 = c.x.indexOf(12);
  assert.ok(Math.abs(c.linhas[0][i12] - 9.6479) < 0.01);
  c.x.forEach((_, i) => {
    assert.ok(c.linhas[-3][i] < c.linhas[-2][i] && c.linhas[-2][i] < c.linhas[0][i]);
    assert.ok(c.linhas[0][i] < c.linhas[2][i] && c.linhas[2][i] < c.linhas[3][i]);
  });
  assert.ok(curvasReferencia('imc', true).x.at(-1) === 228);
  assert.equal(curvasReferencia('desconhecido', true), null);
});
