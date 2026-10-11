import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularAPGARFamiliar, calcularEPDS, calcularZarit, calcularFagerstrom, calcularMorisky } from '../assets/js/familia-core.js';

test('APGAR familiar: 10 → função boa', () => {
  const r = calcularAPGARFamiliar(new Array(5).fill(2));
  assert.equal(r.pontos, 10);
  assert.equal(r.nivel, 'baixo');
});

test('APGAR familiar: 0 → disfunção acentuada', () => {
  const r = calcularAPGARFamiliar(new Array(5).fill(0));
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'alto');
});

test('APGAR familiar: respostas em falta são inválidas', () => {
  assert.equal(calcularAPGARFamiliar([1, 1]).ok, false);
});

test('EPDS: 0 → baixa probabilidade', () => {
  const r = calcularEPDS(new Array(10).fill(0));
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('EPDS: 30 → provável depressão, item 10 assinala risco', () => {
  const r = calcularEPDS(new Array(10).fill(3));
  assert.equal(r.pontos, 30);
  assert.equal(r.nivel, 'alto');
  assert.equal(r.itemRisco, true);
});

test('EPDS: item 10 = 0 não assinala risco mesmo com pontuação alta', () => {
  const respostas = new Array(10).fill(2);
  respostas[9] = 0;
  assert.equal(calcularEPDS(respostas).itemRisco, false);
});

test('Zarit: tudo «nunca» → 22, sem sobrecarga', () => {
  const r = calcularZarit(new Array(22).fill(1));
  assert.equal(r.pontos, 22);
  assert.equal(r.nivel, 'baixo');
});

test('Zarit: tudo «quase sempre» → 110, sobrecarga intensa', () => {
  const r = calcularZarit(new Array(22).fill(5));
  assert.equal(r.pontos, 110);
  assert.equal(r.nivel, 'alto');
});

test('Zarit (Sequeira): < 46 sem sobrecarga, 46–56 ligeira, > 56 intensa', () => {
  const comSoma = (n) => {
    let resto = n - 22;
    return calcularZarit(new Array(22).fill(1).map((v) => { const extra = Math.min(4, resto); resto -= extra; return v + extra; }));
  };
  assert.equal(comSoma(45).nivel, 'baixo');
  assert.equal(comSoma(46).nivel, 'moderado');
  assert.equal(comSoma(46).sobrecarga, 'Sobrecarga ligeira');
  assert.equal(comSoma(56).nivel, 'moderado');
  assert.equal(comSoma(57).nivel, 'alto');
  // Pontuação de 0 a 4 (outra versão) não é aceite: os cortes não se aplicam.
  assert.equal(calcularZarit(new Array(22).fill(0)).ok, false);
});

test('Fagerström: 0 → dependência muito baixa', () => {
  const r = calcularFagerstrom({
    primeiroCigarro: 0, dificilNaoFumar: 0, cigarroDificilRenunciar: 0,
    cigarrosPorDia: 0, maisDeManha: 0, fumaDoente: 0,
  });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Fagerström: 10 → dependência muito elevada', () => {
  const r = calcularFagerstrom({
    primeiroCigarro: 3, dificilNaoFumar: 1, cigarroDificilRenunciar: 1,
    cigarrosPorDia: 3, maisDeManha: 1, fumaDoente: 1,
  });
  assert.equal(r.pontos, 10);
  assert.equal(r.nivel, 'muito-alto');
});

test('Morisky: 0 → alta adesão', () => {
  const r = calcularMorisky({ esquecimento: 0, descuido: 0, paraQuandoBem: 0, paraQuandoMal: 0 });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Morisky: 4 → baixa adesão', () => {
  const r = calcularMorisky({ esquecimento: 1, descuido: 1, paraQuandoBem: 1, paraQuandoMal: 1 });
  assert.equal(r.pontos, 4);
  assert.equal(r.nivel, 'alto');
});
