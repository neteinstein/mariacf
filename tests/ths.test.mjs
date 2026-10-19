import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ABSOLUTAS, ESTROGENIOS, avaliarElegibilidade, equivalentes, escolherRegime } from '../assets/js/ths-core.js';

// Valores conferidos com o Consenso Nacional sobre Menopausa 2021 (SPG): contraindicações (p. 30–31),
// quadro 2 das doses (p. 25), quadro 4 do risco (p. 42) e regimes (p. 29 e 43).
const base = { idade: 52, anosMenopausa: 1, riscoCV: 'baixo', riscoMama: 'baixo' };
const eleg = (d) => avaliarElegibilidade({ ...base, ...d });

test('mulher de 52 anos, sem contraindicações e riscos baixos, pode iniciar por qualquer via', () => {
  const r = eleg({});
  assert.equal(r.decisao, 'pode');
  assert.equal(r.nivel, 'baixo');
  assert.equal(r.via, 'qualquer');
  assert.equal(r.riscosPorCalcular, 0);
});

test('qualquer contraindicação absoluta impede a TH sistémica', () => {
  for (const c of ABSOLUTAS) {
    const r = eleg({ absolutas: [c.id] });
    assert.equal(r.decisao, 'contraindicada', c.id);
    assert.equal(r.via, null);
  }
});

test('quadro 4: risco cardiovascular e de cancro da mama', () => {
  assert.equal(eleg({ riscoCV: 'elevado' }).decisao, 'evitar');
  assert.equal(eleg({ riscoMama: 'elevado' }).decisao, 'evitar');
  assert.equal(eleg({ riscoMama: 'moderado' }).decisao, 'precaucao');
  const moderado = eleg({ riscoCV: 'moderado' });
  assert.equal(moderado.decisao, 'pode');
  assert.equal(moderado.via, 'transdermica');
});

test('contraindicações relativas: precaução, e algumas contraindicam só a via oral', () => {
  const r = eleg({ relativas: ['enxaqueca-aura'] });
  assert.equal(r.decisao, 'precaucao');
  assert.equal(r.via, 'transdermica');
  assert.equal(r.viaOralContraindicada, true);
  const meningioma = eleg({ relativas: ['meningioma'] });
  assert.equal(meningioma.via, 'qualquer');
  assert.equal(meningioma.viaOralContraindicada, false);
});

test('a hipertensão controlada e o risco de tromboembolismo pedem a via transdérmica, sem mudar a decisão', () => {
  const r = eleg({ transdermica: ['hta', 'risco-te'] });
  assert.equal(r.decisao, 'pode');
  assert.equal(r.via, 'transdermica');
  assert.equal(r.motivosVia.length, 2);
});

test('início depois dos 60 anos ou mais de 10 anos após a menopausa', () => {
  assert.equal(eleg({ idade: 61 }).decisao, 'precaucao');
  assert.equal(eleg({ anosMenopausa: 11 }).decisao, 'precaucao');
  assert.equal(eleg({ anosMenopausa: 10 }).decisao, 'pode');
  assert.equal(eleg({ anosMenopausa: '' }).decisao, 'pode');
});

test('a razão mais grave vem primeiro e a idade é validada', () => {
  const r = eleg({ relativas: ['diabetes'], absolutas: ['tev'] });
  assert.equal(r.razoes[0].decisao, 'contraindicada');
  assert.equal(eleg({ idade: '' }).ok, false);
  assert.equal(eleg({ anosMenopausa: 70 }).ok, false);
  assert.equal(eleg({ idade: 38 }).iop, true);
  assert.equal(eleg({ riscoCV: 'desconhecido', riscoMama: '' }).riscosPorCalcular, 2);
});

const regime = (d) => escolherRegime(d).opcoes.map((o) => o.titulo);

test('escolha do regime', () => {
  assert.deepEqual(regime({ sintomas: 'sgum', utero: 'sim' })[0], 'Estrogénio vaginal');
  assert.deepEqual(regime({ sintomas: 'sistemicos', utero: 'nao' }), ['Estrogénio isolado']);
  assert.deepEqual(regime({ sintomas: 'sistemicos', utero: 'endometriose' }), ['Estrogénio + progestativo']);
  assert.deepEqual(regime({ sintomas: 'sistemicos', utero: 'sim', fase: 'peri' }), ['Estrogénio + progestativo, regime sequencial']);
  assert.deepEqual(regime({ sintomas: 'sistemicos', utero: 'sim', fase: 'pos' }), ['Estrogénio + progestativo, regime contínuo combinado', 'Tibolona 2,5 mg/dia']);
  assert.equal(regime({ sintomas: 'sistemicos', utero: 'sim', fase: 'pos', siu: true })[0], 'Estrogénio isolado + SIU de levonorgestrel 52 mg');
  assert.equal(escolherRegime({ sintomas: 'sistemicos', utero: 'sim' }).ok, false);
  assert.equal(escolherRegime({}).ok, false);
});

test('progesterona micronizada: 200 mg 10–14 dias no sequencial, 100 mg no contínuo', () => {
  const seq = escolherRegime({ sintomas: 'sistemicos', utero: 'sim', fase: 'peri' }).opcoes[0].notas[0];
  const cont = escolherRegime({ sintomas: 'sistemicos', utero: 'sim', fase: 'pos' }).opcoes[0].notas[0];
  assert.match(seq, /200 mg\/dia durante 10–14 dias/);
  assert.match(cont, /100 mg\/dia/);
});

test('doses equivalentes do quadro 2', () => {
  const r = equivalentes('e2-oral', 'padrao');
  assert.equal(r.dose, '2 mg');
  assert.deepEqual(Object.fromEntries(r.outras.map((o) => [o.nome, o.dose])), {
    '17β-estradiol transdérmico (adesivo)': '50 µg',
    '17β-estradiol transdérmico (spray)': '40 µg (3 doses)',
    'Valerato de estradiol oral': '2 mg',
    'Estrogénios equinos conjugados': '0,625 mg',
  });
  assert.equal(equivalentes('e2-adesivo', 'baixa').outras.find((o) => o.nome === '17β-estradiol oral').dose, '1 mg');
  assert.equal(equivalentes('e2-oral', 'ultrabaixa').outras.find((o) => o.nome === 'Estrogénios equinos conjugados').dose, null);
  assert.equal(equivalentes('eec', 'ultrabaixa').ok, false);
  for (const e of ESTROGENIOS) assert.ok(e.doses.padrao && e.doses.baixa, e.id);
});
