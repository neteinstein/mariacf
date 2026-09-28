import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularCURB65, calcularWellsTVP, calcularWellsTEP, calcularQTc, calcularGlasgow, calcularHEART, calcularNEWS2 } from '../assets/js/urgencia-core.js';

test('CURB-65: sem fatores → 0, baixo', () => {
  const r = calcularCURB65({});
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('CURB-65: 5 fatores → máximo, muito-alto', () => {
  const r = calcularCURB65({ confusao: true, ureiaElevada: true, freqRespiratoria: true, pressaoArterial: true, idade65: true });
  assert.equal(r.pontos, 5);
  assert.equal(r.nivel, 'muito-alto');
});

test('CURB-65: 2 pontos → moderado', () => {
  const r = calcularCURB65({ confusao: true, idade65: true });
  assert.equal(r.pontos, 2);
  assert.equal(r.nivel, 'moderado');
});

test('Wells TVP: sem fatores → improvável', () => {
  assert.equal(calcularWellsTVP({}).nivel, 'baixo');
});

test('Wells TVP: 2 fatores → provável', () => {
  const r = calcularWellsTVP({ cancroAtivo: true, pernaTodaEdemaciada: true });
  assert.equal(r.pontos, 2);
  assert.equal(r.nivel, 'alto');
});

test('Wells TVP: diagnóstico alternativo subtrai 2', () => {
  const r = calcularWellsTVP({ cancroAtivo: true, pernaTodaEdemaciada: true, diagnosticoAlternativo: true });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('Wells TEP: sinais de TVP + diagnóstico mais provável → alto', () => {
  const r = calcularWellsTEP({ sinaisTVP: true, tepDiagnosticoMaisProvavel: true });
  assert.equal(r.pontos, 6);
  assert.equal(r.nivel, 'alto');
});

test('Wells TEP: sem fatores → baixo', () => {
  assert.equal(calcularWellsTEP({}).nivel, 'baixo');
});

test('QTc: 400ms a 60bpm → Bazett = Fridericia = QT (RR=1s)', () => {
  const r = calcularQTc(400, 60, false);
  assert.equal(r.bazett, 400);
  assert.equal(r.fridericia, 400);
  assert.equal(r.nivel, 'baixo');
});

test('QTc: QT longo a taquicardia → prolongado', () => {
  const r = calcularQTc(460, 100, false);
  // RR = 0.6s; bazett = 460/sqrt(0.6) = 593.9
  assert.ok(r.bazett > 500);
  assert.equal(r.nivel, 'muito-alto');
});

test('QTc: valores em falta são inválidos', () => {
  assert.equal(calcularQTc('', 60, false).ok, false);
  assert.equal(calcularQTc(400, '', false).ok, false);
});

test('Glasgow: 4+5+6 → 15, ligeiro', () => {
  const r = calcularGlasgow(4, 5, 6);
  assert.equal(r.pontos, 15);
  assert.equal(r.nivel, 'baixo');
});

test('Glasgow: 1+1+1 → 3, grave', () => {
  const r = calcularGlasgow(1, 1, 1);
  assert.equal(r.pontos, 3);
  assert.equal(r.nivel, 'muito-alto');
});

test('Glasgow: 2+3+4 → 9, moderado', () => {
  const r = calcularGlasgow(2, 3, 4);
  assert.equal(r.pontos, 9);
  assert.equal(r.nivel, 'alto');
});

test('Glasgow: valores fora do intervalo são inválidos', () => {
  assert.equal(calcularGlasgow(5, 5, 6).ok, false);
});

test('HEART: todos 0 → baixo risco', () => {
  const r = calcularHEART({ historia: 0, ecg: 0, idade: 0, fatoresRisco: 0, troponina: 0 });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('HEART: todos 2 → 10, alto risco', () => {
  const r = calcularHEART({ historia: 2, ecg: 2, idade: 2, fatoresRisco: 2, troponina: 2 });
  assert.equal(r.pontos, 10);
  assert.equal(r.nivel, 'alto');
});

test('HEART: item em falta é inválido', () => {
  assert.equal(calcularHEART({ historia: 1, ecg: 1, idade: 1, fatoresRisco: 1 }).ok, false);
});

test('NEWS2: parâmetros normais → 0', () => {
  const r = calcularNEWS2({
    freqRespiratoria: 16, spo2: 98, oxigenioSuplementar: false,
    pressaoSistolica: 120, freqCardiaca: 70, consciencia: 'alerta', temperatura: 37,
  });
  assert.equal(r.pontos, 0);
  assert.equal(r.nivel, 'baixo');
});

test('NEWS2: doente crítico → pontuação alta, risco muito-alto', () => {
  const r = calcularNEWS2({
    freqRespiratoria: 30, spo2: 88, oxigenioSuplementar: true,
    pressaoSistolica: 80, freqCardiaca: 140, consciencia: 'nao-alerta', temperatura: 35,
  });
  assert.ok(r.pontos >= 7);
  assert.equal(r.nivel, 'muito-alto');
});

test('NEWS2: um único parâmetro muito alterado eleva o nível mesmo com total baixo', () => {
  const r = calcularNEWS2({
    freqRespiratoria: 6, spo2: 98, oxigenioSuplementar: false,
    pressaoSistolica: 120, freqCardiaca: 70, consciencia: 'alerta', temperatura: 37,
  });
  assert.equal(r.pontos, 3);
  assert.equal(r.nivel, 'alto');
});
