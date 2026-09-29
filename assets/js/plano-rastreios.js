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

/* ---------- Linha da vida: janelas de cada rastreio e a idade atual ---------- */

const IDADE_MIN = 18;
const IDADE_MAX = 90;
const pct = (idade) => `${((Math.min(Math.max(idade, IDADE_MIN), IDADE_MAX) - IDADE_MIN) / (IDADE_MAX - IDADE_MIN)) * 100}%`;

function desenharLinhaVida(r, idade, sx) {
  const el = $('#pr-linha');
  const linhas = [
    ...r.agora.map((x) => [x, 'agora']),
    ...r.futuros.map((x) => [x, 'futura']),
    ...r.terminados.map((x) => [x, 'terminado']),
  ]
    .map(([x, estado]) => {
      const de = x.idadeMinPorSexo ? x.idadeMinPorSexo[sx] : x.idadeMin;
      const ate = x.idadeMax ?? IDADE_MAX;
      return { x, estado, de, ate, aberto: x.idadeMax == null };
    })
    .sort((a, b) => a.de - b.de || a.ate - b.ate);
  const marcas = [18, 30, 40, 50, 60, 70, 80, 90];
  el.style.setProperty('--hoje', pct(idade));
  // Só redesenha (e reanima) as barras quando muda a lista ou o estado de algum rastreio.
  const chave = linhas.map((l) => `${l.x.id}:${l.estado}`).join('|');
  if (el.dataset.chave === chave) {
    el.querySelector('.pr-hoje').textContent = `${idade} anos`;
    return;
  }
  el.dataset.chave = chave;
  el.innerHTML = `
    ${linhas
      .map(
        ({ x, estado, de, ate, aberto }, i) => `
      <div class="pr-l" data-estado="${estado}" style="--k:${i}">
        <span class="pr-l-nome">${x.titulo}</span>
        <span class="pr-l-pista"><i class="pr-l-barra${aberto ? ' aberto' : ''}" style="left:${pct(de)};width:calc(${pct(ate)} - ${pct(de)})" title="${de}${aberto ? '+' : `–${ate}`} anos"><em>${de}${aberto ? '+' : `–${ate}`}</em></i></span>
      </div>`
      )
      .join('')}
    <div class="pr-l pr-eixo">
      <span class="pr-l-nome"></span>
      <span class="pr-l-pista">${marcas.map((m) => `<b style="left:${pct(m)}">${m}</b>`).join('')}<strong class="pr-hoje">${idade} anos</strong></span>
    </div>`;
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
    desenharLinhaVida(r, Number($('#pr-idade').value), sexo());
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
