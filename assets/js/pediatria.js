import { calcularHollidaySegar, calcularCDS, classificarMCHAT } from './pediatria-core.js';
import { $, fmt, valor, ligarSeparadores, ligarSteppers, ligarCalculadora, montarPerguntas, lerPerguntas } from './calc-ui.js';

ligarSeparadores();
ligarSteppers();

ligarCalculadora({
  prefixo: 'hs',
  calcular: () => calcularHollidaySegar(valor('#hs-peso')),
  escrever: (r) => {
    $('#hs-dia').textContent = fmt(r.mlDia);
    $('#hs-hora').innerHTML = `${fmt(r.mlHora, 1)} <small>mL/h</small>`;
    $('#hs-nota').textContent = r.limitado
      ? 'Limitado ao máximo habitual do adulto (2400 mL/dia).'
      : 'Necessidades de manutenção — acrescentar o défice e as perdas em curso, se existirem.';
  },
  resumo: (r) => ({
    assunto: `Fluidos de manutenção — ${fmt(r.mlDia)} mL/dia`,
    linhas: ['Fluidos de manutenção (Holliday-Segar)', `Peso: ${$('#hs-peso').value} kg`, `${fmt(r.mlDia)} mL/dia · ${fmt(r.mlHora, 1)} mL/h`],
  }),
});

const CDS_ITENS = [
  ['aspeto', 'Aspeto geral', [['Normal', 0], ['Sede, inquieto ou letárgico mas irritável ao toque', 1], ['Sonolento, mole, frio ou suado; pode estar comatoso', 2]]],
  ['olhos', 'Olhos', [['Normais', 0], ['Ligeiramente encovados', 1], ['Muito encovados', 2]]],
  ['mucosas', 'Mucosas (língua)', [['Húmidas', 0], ['Pegajosas', 1], ['Secas', 2]]],
  ['lagrimas', 'Lágrimas', [['Presentes', 0], ['Diminuídas', 1], ['Ausentes', 2]]],
];
const cdsForm = $('#cds-form');
montarPerguntas($('#cds-perguntas'), CDS_ITENS, 'cds');
ligarCalculadora({
  prefixo: 'cds',
  calcular: () => calcularCDS(lerPerguntas(cdsForm, CDS_ITENS, 'cds')),
  escrever: (r) => {
    $('#cds-pontos').textContent = r.pontos;
    $('#cds-sub').textContent = r.grau;
    $('#cds-conduta').textContent = r.conduta;
  },
  resumo: (r) => ({ assunto: `Desidratação (CDS) — ${r.pontos}/8`, linhas: ['Clinical Dehydration Scale', `Pontuação: ${r.pontos} / 8`, r.grau, r.conduta] }),
});

ligarCalculadora({
  prefixo: 'mchat',
  calcular: () => classificarMCHAT($('#mchat-pontos').value === '' ? '' : Number($('#mchat-pontos').value), $('#mchat-idade').value),
  escrever: (r) => {
    $('#mchat-risco').textContent = r.risco;
    $('#mchat-sub').textContent = `${r.pontos} / 20 respostas de risco`;
    $('#mchat-notas').replaceChildren(...[r.conduta, r.aviso].filter(Boolean).map((t) => {
      const div = document.createElement('div');
      div.className = 'notice';
      div.textContent = t;
      return div;
    }));
  },
  resumo: (r) => ({ assunto: `M-CHAT-R — ${r.risco} (${r.pontos}/20)`, linhas: ['M-CHAT-R/F', `Idade: ${$('#mchat-idade').value} meses`, `Pontuação: ${r.pontos} / 20 — ${r.risco}`, r.conduta, r.aviso].filter(Boolean) }),
});
