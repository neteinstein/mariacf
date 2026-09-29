import { calcularAumentoPeso, corredorAumentoPeso } from './gravidez-peso-core.js';
import { $, fmt, valor, ligarSteppers, ligarCalculadora } from './calc-ui.js';

ligarSteppers();

const ate = (n, casas) => Number(n).toLocaleString('pt-PT', { maximumFractionDigits: casas });
const intervalo = (a, b, casas = 1) => `${ate(a, casas)}–${ate(b, casas)}`;

/* ---------- Gráfico: corredor recomendado semana a semana ---------- */

const W = 340;
const H = 200;
const M = { t: 14, r: 14, b: 26, l: 30 };
let chaveCorredor = '';

function desenharCorredor(r) {
  const el = $('#gp-grafico');
  const corredor = corredorAumentoPeso(r);
  el.closest('.fx-ilustracao').hidden = !corredor;
  if (!corredor) return;
  const a = r.avaliacao;
  const yMax = Math.ceil(Math.max(r.totalMax, a ? a.ganho : 0, 2) / 4) * 4 + 2;
  const yMin = a && a.ganho < 0 ? Math.floor(a.ganho / 2) * 2 : 0;
  const px = (s) => M.l + (s / 40) * (W - M.l - M.r);
  const py = (kg) => H - M.b - ((kg - yMin) / (yMax - yMin)) * (H - M.t - M.b);

  // O corredor só se redesenha quando muda a categoria (ou a escala do eixo).
  const chave = `${r.categoriaId}|${yMin}|${yMax}`;
  if (chave !== chaveCorredor) {
    chaveCorredor = chave;
    const cima = corredor.map((c, i) => `${i ? 'L' : 'M'}${px(c.semanas).toFixed(1)} ${py(c.max).toFixed(1)}`).join(' ');
    const baixo = [...corredor].reverse().map((c) => `L${px(c.semanas).toFixed(1)} ${py(c.min).toFixed(1)}`).join(' ');
    let grelha = '';
    for (let kg = yMin; kg <= yMax; kg += 4) {
      grelha += `<line class="cg-grelha" x1="${M.l}" x2="${W - M.r}" y1="${py(kg)}" y2="${py(kg)}"/><text x="${M.l - 6}" y="${py(kg) + 3}" text-anchor="end">${kg}</text>`;
    }
    [0, 13, 27, 40].forEach((sem, i) => {
      grelha += `<text x="${px(sem)}" y="${H - M.b + 15}" text-anchor="${i === 0 ? 'start' : i === 3 ? 'end' : 'middle'}">${i === 3 ? '40 semanas' : sem}</text>`;
    });
    el.innerHTML = `
      <svg class="cg-svg gp-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Aumento de peso recomendado ao longo da gravidez">
        ${grelha}
        <rect class="gp-tri" x="${px(0)}" y="${M.t}" width="${px(13) - px(0)}" height="${H - M.t - M.b}"/>
        <path class="gp-corredor" d="${cima} ${baixo} Z"/>
        <path class="gp-borda" d="${cima}" pathLength="1"/>
        <path class="gp-borda" d="${corredor.map((c, i) => `${i ? 'L' : 'M'}${px(c.semanas).toFixed(1)} ${py(c.min).toFixed(1)}`).join(' ')}" pathLength="1"/>
        <text class="gp-alvo" x="${px(40) - 4}" y="${py(r.totalMax) - 6}" text-anchor="end">${fmt(r.totalMin, 1)}–${fmt(r.totalMax, 1)} kg</text>
        <g class="cg-guia-v"><line x1="0" x2="0" y1="${M.t}" y2="${H - M.b}"/></g>
        <g class="cg-ponto"><circle class="cg-onda" r="6"/><circle class="cg-bola" r="5.5"/><text class="cg-valor" y="-11" text-anchor="middle"></text></g>
      </svg>`;
    el.getBoundingClientRect();
  }
  const svg = el.querySelector('svg');
  svg.classList.toggle('cg-sem-ponto', !a);
  if (!a) return;
  const cx = px(Math.min(Math.max(a.semanas, 0), 40));
  const cy = py(a.ganho);
  svg.querySelector('.cg-ponto').style.transform = `translate(${cx}px, ${cy}px)`;
  svg.querySelector('.cg-guia-v').style.transform = `translateX(${cx}px)`;
  const t = svg.querySelector('.cg-valor');
  t.textContent = `${fmt(a.ganho, 1, { signDisplay: 'exceptZero' })} kg`;
  t.setAttribute('text-anchor', cx > W - 50 ? 'end' : cx < 60 ? 'start' : 'middle');
}

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
    desenharCorredor(r);
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
