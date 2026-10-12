// Separador «Ajuste de dose» da página da função renal. Os steppers e os separadores
// são ligados por funcao-renal.js; aqui só se calcula e desenha o resultado.
import { ajustarDoses } from './ajuste-renal-core.js';
import { $, valor, ligarCalculadora } from './calc-ui.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
const ROTULO = { normal: 'Dose habitual', ajustar: 'Ajustar', evitar: 'Evitar' };
const MEDIDA = { egfr: 'eTFG', crcl: 'CrCl' };

ligarCalculadora({
  prefixo: 'aj',
  calcular: () =>
    ajustarDoses({
      creatinina: valor('#aj-creatinina'),
      idade: $('#aj-idade').value,
      peso: valor('#aj-peso'),
      sexoFeminino: $('#aj-sexo-f').checked,
    }),
  escrever: (r) => {
    $('#aj-egfr').textContent = r.egfr;
    $('#aj-crcl').textContent = r.crcl;
    $('#aj-lista').innerHTML = r.farmacos
      .map(
        (f) => `<li class="aj-item" data-nivel="${f.nivel}">
          <div class="aj-cab"><strong>${esc(f.nome)}</strong><span class="aj-estado">${ROTULO[f.nivel]}</span></div>
          <p class="aj-dose">${esc(f.dose)}</p>
          <p class="aj-base">Segundo a ${MEDIDA[f.usa]} (${f.valor})${f.nota ? ` · ${esc(f.nota)}` : ''}</p>
        </li>`
      )
      .join('');
  },
  resumo: (r) => ({
    assunto: `Ajuste de dose à função renal — eTFG ${r.egfr}, CrCl ${r.crcl}`,
    linhas: [
      `eTFG (CKD-EPI 2021): ${r.egfr} mL/min/1,73 m² · CrCl (Cockcroft-Gault): ${r.crcl} mL/min`,
      '',
      ...r.farmacos.map((f) => `${f.nome}: ${f.dose}`),
      '',
      'Confirmar sempre no RCM de cada medicamento.',
    ],
  }),
});
