import { converterCorticoide } from './corticoides-core.js';
import { $, fmt, valor, ligarSteppers, ligarCalculadora } from './calc-ui.js';

ligarSteppers();

const origem = () => document.querySelector('input[name="ct-origem"]:checked')?.value;
const mg = (n) => fmt(n, n % 1 ? (n < 1 ? 2 : 1) : 0);

function tile(c) {
  const div = document.createElement('div');
  div.className = c.origem ? 'stat origem' : 'stat';
  div.innerHTML = '<div class="k"></div><div class="d"></div><div class="v"></div>';
  div.querySelector('.k').textContent = c.nome;
  div.querySelector('.d').textContent = c.duracao;
  div.querySelector('.v').innerHTML = `${mg(c.equivalente)} <small>mg</small>`;
  div.title = `Potência mineralocorticoide: ${c.mineralo}`;
  return div;
}

ligarCalculadora({
  prefixo: 'ct',
  calcular: () => converterCorticoide(origem(), valor('#ct-dose')),
  escrever: (r) => {
    $('#ct-pred').textContent = mg(r.prednisolona);
    const o = r.equivalentes.find((c) => c.origem);
    $('#ct-sub').textContent = `${mg(Number(valor('#ct-dose')))} mg/dia de ${o.nome.toLowerCase()}`;
    $('#ct-lista').replaceChildren(...r.equivalentes.map(tile));
    $('#ct-nota').textContent = r.nota;
  },
  resumo: (r) => ({
    assunto: `Equivalência de corticosteroides — ${mg(r.prednisolona)} mg de prednisolona`,
    linhas: [
      'Equivalência de corticosteroides (dose diária)',
      ...r.equivalentes.map((c) => `${c.nome}: ${mg(c.equivalente)} mg${c.origem ? ' (dose atual)' : ''}`),
      '',
      r.nota,
    ],
  }),
});
