import { calcularUMA, calcularConsumoAlcool, BEBIDAS } from './habitos-core.js';
import { $, fmt, valor, ligarSeparadores, ligarSteppers, ligarCalculadora } from './calc-ui.js';

ligarSeparadores();
ligarSteppers();

ligarCalculadora({
  prefixo: 'uma',
  calcular: () => calcularUMA(valor('#uma-cig'), valor('#uma-anos')),
  escrever: (r) => {
    $('#uma-valor').textContent = fmt(r.uma, r.uma % 1 ? 1 : 0);
    $('#uma-sub').textContent = r.descricao;
  },
  resumo: (r) => ({
    assunto: `Carga tabágica — ${fmt(r.uma, 1)} UMA`,
    linhas: ['Unidades maço-ano', `${$('#uma-cig').value} cigarros por dia durante ${$('#uma-anos').value} anos`, `Carga tabágica: ${fmt(r.uma, 1)} UMA`, r.descricao],
  }),
});

const porSemana = () => Object.fromEntries(BEBIDAS.map((b) => [b.id, valor(`#alc-${b.id}`) || 0]));

ligarCalculadora({
  prefixo: 'alc',
  calcular: () => calcularConsumoAlcool(porSemana(), $('#alc-sexo').checked),
  escrever: (r) => {
    $('#alc-gramas').textContent = fmt(r.gramasSemana);
    $('#alc-sub').textContent = r.descricao;
    $('#alc-padrao').innerHTML = `${fmt(r.bebidasPadraoSemana, 1)} <small>/semana</small>`;
    $('#alc-dia').innerHTML = `${fmt(r.gramasDia, 1)} <small>g/dia</small>`;
    $('#alc-limite').innerHTML = `${fmt(r.limiteSemana)} <small>g/semana</small>`;
    // Uma bebida-padrão = 10 g de álcool; o limite semanal marca a mudança de cor.
    $('#alc-copos').dataset.marca = r.limiteSemana / 10;
    $('#alc-copos').dataset.valor = r.bebidasPadraoSemana;
  },
  resumo: (r) => ({
    assunto: `Consumo de álcool — ${fmt(r.gramasSemana)} g/semana`,
    linhas: [
      'Consumo de álcool',
      ...BEBIDAS.filter((b) => Number(porSemana()[b.id]) > 0).map((b) => `${b.nome}: ${porSemana()[b.id]} por semana`),
      `Total: ${fmt(r.gramasSemana)} g/semana (${fmt(r.bebidasPadraoSemana, 1)} bebidas-padrão) · ${fmt(r.gramasDia, 1)} g/dia`,
      r.descricao,
    ],
  }),
});
