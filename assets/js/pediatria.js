import { calcularHollidaySegar, calcularCDS, classificarMCHAT } from './pediatria-core.js';
import { $, fmt, valor, ligarSeparadores, ligarSteppers, ligarCalculadora, montarPerguntas, lerPerguntas } from './calc-ui.js';

ligarSeparadores();
ligarSteppers();

/* ---------- Holliday-Segar: soro a pingar e composição da regra 4-2-1 ---------- */

function desenharSoro(peso, r) {
  const el = $('#hs-soro');
  if (!el.firstElementChild) {
    el.innerHTML = `
      <svg class="hs-svg" viewBox="0 0 120 170" aria-hidden="true">
        <defs><clipPath id="hs-saco"><path d="M30 14h60a8 8 0 0 1 8 8v66q0 14-14 18H36q-14-4-14-18V22a8 8 0 0 1 8-8z"/></clipPath></defs>
        <rect class="hs-gancho" x="56" y="2" width="8" height="12" rx="3"/>
        <path class="hs-saco" d="M30 14h60a8 8 0 0 1 8 8v66q0 14-14 18H36q-14-4-14-18V22a8 8 0 0 1 8-8z"/>
        <g clip-path="url(#hs-saco)"><rect class="hs-liquido" x="20" y="14" width="80" height="94"/><path class="hs-onda" d="M20 30q10-5 20 0t20 0t20 0t20 0v8H20z"/></g>
        <path class="hs-escala" d="M86 30h6M86 46h6M86 62h6M86 78h6"/>
        <rect class="hs-camara" x="52" y="108" width="16" height="26" rx="5"/>
        <circle class="hs-gota" cx="60" cy="114" r="2.6"/>
        <path class="hs-tubo" d="M60 134v12q0 10 10 12h40"/>
      </svg>
      <div class="hs-comp">
        <div class="hs-comp-barra"><span class="hs-c1"></span><span class="hs-c2"></span><span class="hs-c3"></span></div>
        <ul class="hs-comp-legenda">
          <li class="hs-c1"><i></i>Primeiros 10 kg × 100 mL <strong></strong></li>
          <li class="hs-c2"><i></i>10–20 kg × 50 mL <strong></strong></li>
          <li class="hs-c3"><i></i>Acima de 20 kg × 20 mL <strong></strong></li>
        </ul>
      </div>`;
  }
  // Gotas mais rápidas com mais mL/h (só ilustrativo).
  const intervalo = Math.min(Math.max(2.6 - r.mlHora / 45, 0.45), 2.6);
  el.style.setProperty('--gota', `${intervalo.toFixed(2)}s`);
  el.style.setProperty('--cheio', Math.min(r.mlDia / 2400, 1).toFixed(3));
  const partes = [Math.min(peso, 10) * 100, Math.min(Math.max(peso - 10, 0), 10) * 50, Math.max(peso - 20, 0) * 20];
  ['hs-c1', 'hs-c2', 'hs-c3'].forEach((c, i) => {
    el.querySelector(`.hs-comp-barra .${c}`).style.flexGrow = partes[i];
    el.querySelector(`.hs-comp-legenda .${c}`).classList.toggle('zero', partes[i] === 0);
    el.querySelector(`.hs-comp-legenda .${c} strong`).textContent = `${fmt(partes[i])} mL`;
  });
  el.classList.toggle('limitado', r.limitado);
}

ligarCalculadora({
  prefixo: 'hs',
  calcular: () => calcularHollidaySegar(valor('#hs-peso')),
  escrever: (r) => {
    $('#hs-dia').textContent = fmt(r.mlDia);
    $('#hs-hora').innerHTML = `${fmt(r.mlHora, 1)} <small>mL/h</small>`;
    $('#hs-nota').textContent = r.limitado
      ? 'Limitado ao máximo habitual do adulto (2400 mL/dia).'
      : 'Necessidades de manutenção — acrescentar o défice e as perdas em curso, se existirem.';
    desenharSoro(Number(valor('#hs-peso')), r);
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
    $('#mchat-escala').dataset.valor = r.pontos;
    $('#mchat-notas').replaceChildren(...[r.conduta, r.aviso].filter(Boolean).map((t) => {
      const div = document.createElement('div');
      div.className = 'notice';
      div.textContent = t;
      return div;
    }));
  },
  resumo: (r) => ({ assunto: `M-CHAT-R — ${r.risco} (${r.pontos}/20)`, linhas: ['M-CHAT-R/F', `Idade: ${$('#mchat-idade').value} meses`, `Pontuação: ${r.pontos} / 20 — ${r.risco}`, r.conduta, r.aviso].filter(Boolean) }),
});
