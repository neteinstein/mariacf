import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularCURB65, calcularWellsTVP, calcularWellsTEP, calcularQTc } from '../assets/js/urgencia-core.js';

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
