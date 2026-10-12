import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ajustarDoses } from '../assets/js/ajuste-renal-core.js';

const doses = (d) => Object.fromEntries(ajustarDoses(d).farmacos.map((f) => [f.id, f]));

test('função renal normal: doses habituais', () => {
  const r = ajustarDoses({ creatinina: 0.9, idade: 50, peso: 75, sexoFeminino: false });
  assert.ok(r.ok && r.egfr >= 90 && r.crcl >= 90);
  for (const f of r.farmacos) assert.equal(f.nivel, 'normal', f.id);
});

test('metformina e sitagliptina seguem a eTFG', () => {
  // Homem de 70 anos com creatinina 1,5 mg/dL: eTFG ≈ 49.
  const d = doses({ creatinina: 1.5, idade: 70, peso: 80, sexoFeminino: false });
  assert.match(d.metformina.dose, /2000 mg/);
  assert.equal(d.sitagliptina.nivel, 'normal');
  const g = doses({ creatinina: 2.0, idade: 70, peso: 80, sexoFeminino: false }); // eTFG ≈ 35
  assert.match(g.metformina.dose, /1000 mg/);
  assert.match(g.sitagliptina.dose, /^50 mg/);
  const h = doses({ creatinina: 3.5, idade: 70, peso: 80, sexoFeminino: false }); // eTFG < 30
  assert.equal(h.metformina.nivel, 'evitar');
  assert.match(h.sitagliptina.dose, /^25 mg/);
});

test('anticoagulantes diretos na FA seguem a clearance de creatinina', () => {
  // Mulher de 82 anos, 58 kg, creatinina 1,2: CrCl ≈ 35 mL/min.
  const d = doses({ creatinina: 1.2, idade: 82, peso: 58, sexoFeminino: true });
  assert.match(d.apixabano.dose, /^2,5 mg/); // idade ≥ 80 e peso ≤ 60
  assert.match(d.rivaroxabano.dose, /^15 mg/);
  assert.match(d.edoxabano.dose, /^30 mg/);
  assert.match(d.dabigatrano.dose, /^110 mg/);
  // CrCl < 15
  const e = doses({ creatinina: 4, idade: 80, peso: 60, sexoFeminino: true });
  for (const id of ['apixabano', 'rivaroxabano', 'edoxabano', 'dabigatrano']) assert.equal(e[id].nivel, 'evitar', id);
});

test('apixabano: só um critério não reduz a dose', () => {
  const d = doses({ creatinina: 0.9, idade: 81, peso: 75, sexoFeminino: false });
  assert.match(d.apixabano.dose, /^5 mg/);
});

test('bifosfonatos e gabapentinoides', () => {
  const d = doses({ creatinina: 1.6, idade: 78, peso: 60, sexoFeminino: true }); // CrCl ≈ 26
  assert.equal(d.alendronato.nivel, 'evitar');
  assert.equal(d.risedronato.nivel, 'evitar');
  assert.match(d.gabapentina.dose, /^150–600/);
  assert.match(d.pregabalina.dose, /^25–150/);
});

test('sem dados suficientes', () => {
  assert.equal(ajustarDoses({ creatinina: '', idade: 50, peso: 70 }).ok, false);
  assert.equal(ajustarDoses({ creatinina: 1, idade: 50, peso: '' }).ok, false);
  assert.equal(ajustarDoses({ creatinina: 1, idade: 15, peso: 50 }).ok, false);
});
