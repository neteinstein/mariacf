import { calcularAumentoPeso } from './gravidez-peso-core.js';
import { $, fmt, valor, ligarSteppers, ligarCalculadora } from './calc-ui.js';

ligarSteppers();

const ate = (n, casas) => Number(n).toLocaleString('pt-PT', { maximumFractionDigits: casas });
const intervalo = (a, b, casas = 1) => `${ate(a, casas)}–${ate(b, casas)}`;

ligarCalculadora({
  prefixo: 'gp',
  calcular: () => calcularAumentoPeso({
    pesoPre: valor('#gp-pre'),
    alturaCm: valor('#gp-altura'),
    semanas: valor('#gp-semanas'),
    pesoAtual: valor('#gp-atual'),
    gemelar: $('#gp-gemelar').checked,
  }),
  escrever: (r) => {
    $('#gp-intervalo').textContent = intervalo(r.totalMin, r.totalMax);
    $('#gp-sub').textContent = `${r.categoria} antes da gravidez${$('#gp-gemelar').checked ? ' · gravidez gemelar' : ''}`;
    $('#gp-imc').textContent = fmt(r.imc, 1);
    $('#gp-ritmo').textContent = r.semanalMin ? `${intervalo(r.semanalMin, r.semanalMax, 2)} kg/sem.` : '—';

    const stat = $('#gp-ganho-stat');
    const notas = [];
    if (r.avaliacao) {
      const a = r.avaliacao;
      stat.dataset.nivel = a.nivel;
      $('#gp-ganho').textContent = `${fmt(a.ganho, 1, { signDisplay: 'exceptZero' })} kg`;
      notas.push(`${a.texto}: às ${a.semanas} semanas, o esperado é ${intervalo(a.esperadoMin, a.esperadoMax)} kg.`);
      $('#gp-resultado').dataset.nivel = a.nivel;
    } else {
      delete stat.dataset.nivel;
      $('#gp-ganho').textContent = '—';
      $('#gp-resultado').dataset.nivel = 'baixo';
    }
    $('#gp-notas').replaceChildren(...notas.map((t) => {
      const div = document.createElement('div');
      div.className = 'notice';
      div.textContent = t;
      return div;
    }));
  },
  resumo: (r) => ({
    assunto: `Aumento de peso na gravidez — ${intervalo(r.totalMin, r.totalMax)} kg`,
    linhas: [
      'Aumento de peso recomendado na gravidez (IOM 2009)',
      `IMC antes da gravidez: ${fmt(r.imc, 1)} (${r.categoria})`,
      `Aumento total recomendado: ${intervalo(r.totalMin, r.totalMax)} kg`,
      r.avaliacao ? `Às ${r.avaliacao.semanas} semanas: aumento de ${fmt(r.avaliacao.ganho, 1)} kg (esperado ${intervalo(r.avaliacao.esperadoMin, r.avaliacao.esperadoMax)} kg) — ${r.avaliacao.texto.toLowerCase()}` : null,
    ].filter(Boolean),
  }),
});
