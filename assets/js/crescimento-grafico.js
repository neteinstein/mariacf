// Gráfico de crescimento: linhas de referência da OMS (−3, −2, 0, +2 e +3 DP)
// com as faixas entre elas, e o ponto da criança. As linhas só são
// redesenhadas quando muda o sexo; o ponto desliza para a nova posição.

import { curvasReferencia } from './crescimento-core.js';

const W = 340;
const H = 214;
const M = { t: 12, r: 30, b: 26, l: 36 };
const ZS = [-3, -2, 0, 2, 3];

const EIXOS = {
  meses: { ticks: [0, 6, 12, 18, 24], rotulo: (x, ultimo) => (ultimo ? `${x} meses` : String(x)) },
  anos: { ticks: [24, 60, 120, 180, 228], rotulo: (x, ultimo) => (ultimo ? `${x / 12} anos` : String(x / 12)) },
  cm: { ticks: [50, 60, 70, 80, 90, 100, 110], rotulo: (x, ultimo) => (ultimo ? `${x} cm` : String(x)) },
};

function passoBonito(amplitude, alvo = 5) {
  const bruto = amplitude / alvo;
  const pot = 10 ** Math.floor(Math.log10(bruto));
  const f = bruto / pot;
  return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * pot;
}

const fmt = (n) => n.toLocaleString('pt-PT', { maximumFractionDigits: 1 });
const sinal = (z) => (z > 0 ? `+${z}` : z < 0 ? `−${-z}` : '0');

/**
 * Prepara o gráfico num contentor. Devolve atualizar({ sexoFeminino, x, valor })
 * para mover o ponto (e redesenhar as linhas se o sexo mudar).
 */
export function criarGraficoCrescimento(contentor, { indicador, eixo, unidade }) {
  let sexoAtual = null;
  let escala = null;

  function desenharBase(sexoFeminino) {
    const c = curvasReferencia(indicador, sexoFeminino, ZS);
    const x0 = c.x[0];
    const x1 = c.x[c.x.length - 1];
    const passo = passoBonito(Math.max(...c.linhas[3]) - Math.min(...c.linhas[-3]));
    const y0 = Math.floor(Math.min(...c.linhas[-3]) / passo) * passo;
    const y1 = Math.ceil(Math.max(...c.linhas[3]) / passo) * passo;
    const px = (x) => M.l + ((x - x0) / (x1 - x0)) * (W - M.l - M.r);
    const py = (y) => H - M.b - ((y - y0) / (y1 - y0)) * (H - M.t - M.b);
    escala = { x0, x1, y0, y1, px, py };

    const linha = (z) => c.x.map((x, i) => `${i ? 'L' : 'M'}${px(x).toFixed(1)} ${py(c.linhas[z][i]).toFixed(1)}`).join(' ');
    const faixa = (za, zb) => {
      const ida = c.x.map((x, i) => `${i ? 'L' : 'M'}${px(x).toFixed(1)} ${py(c.linhas[zb][i]).toFixed(1)}`).join(' ');
      const volta = c.x
        .map((x, i) => [x, i])
        .reverse()
        .map(([x, i]) => `L${px(x).toFixed(1)} ${py(c.linhas[za][i]).toFixed(1)}`)
        .join(' ');
      return `${ida} ${volta} Z`;
    };

    let grelha = '';
    for (let y = y0; y <= y1 + 1e-9; y += passo) {
      grelha += `<line class="cg-grelha" x1="${M.l}" x2="${W - M.r}" y1="${py(y)}" y2="${py(y)}"/><text class="cg-ey" x="${M.l - 6}" y="${py(y) + 3}" text-anchor="end">${fmt(y)}</text>`;
    }
    const ticks = EIXOS[eixo].ticks.filter((t) => t >= x0 && t <= x1);
    ticks.forEach((t, i) => {
      grelha += `<text class="cg-ex" x="${px(t)}" y="${H - M.b + 15}" text-anchor="${i === ticks.length - 1 ? 'end' : i === 0 ? 'start' : 'middle'}">${EIXOS[eixo].rotulo(t, i === ticks.length - 1)}</text>`;
    });

    // Rótulos das linhas à direita, afastados o suficiente para não se sobreporem.
    const ultimo = c.x.length - 1;
    const ys = ZS.map((z) => py(c.linhas[z][ultimo]) + 3);
    for (let i = ys.length - 2; i >= 0; i--) ys[i] = Math.max(ys[i], ys[i + 1] + 9);
    const rotulosZ = ZS.map((z, i) => `<text class="cg-z" data-z="${z}" x="${W - M.r + 5}" y="${ys[i].toFixed(1)}">${sinal(z)}</text>`).join('');

    contentor.innerHTML = `
      <svg class="cg-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Curva de crescimento da OMS com a posição da criança">
        ${grelha}
        <path class="cg-faixa cg-faixa-3" d="${faixa(-3, 3)}"/>
        <path class="cg-faixa cg-faixa-2" d="${faixa(-2, 2)}"/>
        ${ZS.map((z) => `<path class="cg-linha" data-z="${z}" d="${linha(z)}" pathLength="1"/>`).join('')}
        ${rotulosZ}
        <g class="cg-guia-v"><line x1="0" x2="0" y1="${M.t}" y2="${H - M.b}"/></g>
        <g class="cg-guia-h"><line x1="${M.l}" x2="${W - M.r}" y1="0" y2="0"/></g>
        <g class="cg-ponto"><circle class="cg-onda" r="6"/><circle class="cg-bola" r="5.5"/><text class="cg-valor" y="-11" text-anchor="middle"></text></g>
      </svg>`;
  }

  return function atualizar({ sexoFeminino, x, valor }) {
    if (sexoAtual !== sexoFeminino || !escala) {
      sexoAtual = sexoFeminino;
      desenharBase(sexoFeminino);
      contentor.getBoundingClientRect();
    }
    const svg = contentor.querySelector('svg');
    const { x0, x1, y0, y1, px, py } = escala;
    const ok = Number.isFinite(x) && Number.isFinite(valor);
    svg.classList.toggle('cg-sem-ponto', !ok);
    if (!ok) return;
    const cx = px(Math.min(Math.max(x, x0), x1));
    const cy = py(Math.min(Math.max(valor, y0), y1));
    svg.classList.toggle('cg-fora', valor < y0 || valor > y1 || x < x0 || x > x1);
    svg.querySelector('.cg-ponto').style.transform = `translate(${cx}px, ${cy}px)`;
    svg.querySelector('.cg-guia-v').style.transform = `translateX(${cx}px)`;
    svg.querySelector('.cg-guia-h').style.transform = `translateY(${cy}px)`;
    const rotulo = svg.querySelector('.cg-valor');
    rotulo.textContent = `${fmt(valor)} ${unidade}`;
    rotulo.setAttribute('text-anchor', cx > W - M.r - 30 ? 'end' : cx < M.l + 30 ? 'start' : 'middle');
  };
}
