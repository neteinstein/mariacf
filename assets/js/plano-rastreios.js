import { planoRastreios } from './plano-rastreios-core.js';
import { $, ligarSteppers, ligarCalculadora, itemAgenda } from './calc-ui.js';

ligarSteppers();

const sexo = () => document.querySelector('input[name="pr-sexo"]:checked')?.value ?? '';
const condicoes = () => ({
  diabetes: $('#pr-diabetes').checked,
  hipertensao: $('#pr-hipertensao').checked,
  fumador: $('#pr-fumador').checked,
});

function item(r, estado) {
  const quando = estado === 'futura' ? `Aos ${r.aPartirDe} anos` : r.periodicidade.split(' (')[0];
  const detalhe = [r.exame, estado === 'futura' ? r.periodicidade : null, r.nota].filter(Boolean).join(' · ');
  return itemAgenda({
    quando,
    titulo: r.titulo,
    detalhe,
    estado,
    etiqueta: r.fonte === 'Programa de rastreio do SNS' ? 'SNS' : null,
    link: r.calculadora ? { href: `../${r.calculadora}`, texto: 'Abrir calculadora →' } : null,
  });
}

function preencher(lista, titulo, itens, estado) {
  $(lista).replaceChildren(...itens.map((r) => item(r, estado)));
  $(lista).hidden = itens.length === 0;
  if (titulo) $(titulo).hidden = itens.length === 0;
}

ligarCalculadora({
  prefixo: 'pr',
  calcular: () => planoRastreios($('#pr-idade').value, sexo(), condicoes()),
  escrever: (r) => {
    $('#pr-numero').textContent = r.agora.length;
    $('#pr-numero-u').textContent = r.agora.length === 1 ? 'recomendado agora' : 'recomendados agora';
    preencher('#pr-agora', null, r.agora, 'agora');
    preencher('#pr-futuros', '#pr-futuros-titulo', r.futuros, 'futura');
    preencher('#pr-terminados', '#pr-terminados-titulo', r.terminados, 'terminado');
  },
  resumo: (r) => ({
    assunto: `Plano de rastreios — ${$('#pr-idade').value} anos`,
    linhas: [
      'Plano de rastreios',
      `Idade: ${$('#pr-idade').value} anos · Sexo: ${sexo() === 'f' ? 'feminino' : 'masculino'}`,
      '',
      'Recomendados agora:',
      ...r.agora.map((x) => `- ${x.titulo}: ${x.exame} (${x.periodicidade})`),
      ...(r.futuros.length ? ['', 'Nos próximos anos:', ...r.futuros.map((x) => `- ${x.titulo}: a partir dos ${x.aPartirDe} anos`)] : []),
    ],
  }),
});
