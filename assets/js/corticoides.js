import { converterCorticoide } from './corticoides-core.js';
import { $, fmt, valor, ligarSteppers, ligarCalculadora } from './calc-ui.js';

ligarSteppers();

const origem = () => document.querySelector('input[name="ct-origem"]:checked')?.value;
const mg = (n) => fmt(n, n % 1 ? (n < 1 ? 2 : 1) : 0);

// Duração da ação biológica em três níveis, para o pequeno medidor de cada cartão.
const nivelDuracao = (d) => (d.startsWith('Curta') ? 1 : d.startsWith('Longa') ? 3 : 2);

function tile(c, i) {
  const div = document.createElement('div');
  div.style.setProperty('--k', i);
  div.innerHTML = '<div class="k"></div><div class="d"><span class="ct-dur" aria-hidden="true"><i></i><i></i><i></i></span><span></span></div><div class="v"></div>';
  preencher(div, c);
  return div;
}

function preencher(div, c) {
  div.className = c.origem ? 'stat origem' : 'stat';
  div.querySelector('.k').textContent = c.nome;
  div.querySelector('.d span:last-child').textContent = c.duracao;
  div.querySelector('.ct-dur').dataset.n = nivelDuracao(c.duracao);
  div.querySelector('.v').innerHTML = `${mg(c.equivalente)} <small>mg</small>`;
  div.title = `Potência mineralocorticoide: ${c.mineralo}`;
}

// Reaproveita os cartões já desenhados para que os valores possam contar até ao novo número.
function desenharLista(lista, equivalentes) {
  if (lista.children.length === equivalentes.length) {
    equivalentes.forEach((c, i) => preencher(lista.children[i], c));
  } else {
    lista.replaceChildren(...equivalentes.map(tile));
  }
}

ligarCalculadora({
  prefixo: 'ct',
  calcular: () => converterCorticoide(origem(), valor('#ct-dose')),
  escrever: (r) => {
    $('#ct-pred').textContent = mg(r.prednisolona);
    const o = r.equivalentes.find((c) => c.origem);
    $('#ct-sub').textContent = `${mg(Number(valor('#ct-dose')))} mg/dia de ${o.nome.toLowerCase()}`;
    desenharLista($('#ct-lista'), r.equivalentes);
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
