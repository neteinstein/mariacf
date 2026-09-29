import { calcularFIB4, calcularNFS, calcularAPRI, calcularChildPugh, calcularMELD } from './hepatica-core.js';
import { $, fmt, valor, ligarSeparadores, ligarSteppers, ligarCalculadora, montarPerguntas, lerPerguntas } from './calc-ui.js';

ligarSeparadores();
ligarSteppers();

function notas(sel, textos) {
  $(sel).replaceChildren(...textos.filter(Boolean).map((t) => {
    const div = document.createElement('div');
    div.className = 'notice';
    div.textContent = t;
    return div;
  }));
}

ligarCalculadora({
  prefixo: 'fib4',
  calcular: () => calcularFIB4(valor('#fib4-idade'), valor('#fib4-ast'), valor('#fib4-alt'), valor('#fib4-plaq')),
  escrever: (r) => {
    $('#fib4-valor').textContent = fmt(r.fib4, 2);
    $('#fib4-sub').textContent = r.descricao;
    notas('#fib4-notas', [`Limiar de baixo risco usado: < ${fmt(r.limiarBaixo, 2)}${r.limiarBaixo === 2 ? ' (≥ 65 anos)' : ''}.`, r.aviso]);
  },
  resumo: (r) => ({
    assunto: `FIB-4 — ${fmt(r.fib4, 2)}`,
    linhas: ['FIB-4', `Idade: ${$('#fib4-idade').value} anos · AST ${$('#fib4-ast').value} U/L · ALT ${$('#fib4-alt').value} U/L · Plaquetas ${$('#fib4-plaq').value} ×10⁹/L`, `FIB-4: ${fmt(r.fib4, 2)}`, r.descricao, r.aviso].filter(Boolean),
  }),
});

ligarCalculadora({
  prefixo: 'nfs',
  calcular: () => calcularNFS({
    idade: valor('#nfs-idade'), imc: valor('#nfs-imc'), diabetes: $('#nfs-diabetes').checked,
    ast: valor('#nfs-ast'), alt: valor('#nfs-alt'), plaquetas: valor('#nfs-plaq'), albumina: valor('#nfs-alb'),
  }),
  escrever: (r) => {
    $('#nfs-valor').textContent = fmt(r.nfs, 2, { signDisplay: 'exceptZero' });
    $('#nfs-sub').textContent = r.descricao;
  },
  resumo: (r) => ({ assunto: `NAFLD fibrosis score — ${fmt(r.nfs, 2)}`, linhas: ['NAFLD fibrosis score', `Resultado: ${fmt(r.nfs, 2)}`, r.descricao] }),
});

ligarCalculadora({
  prefixo: 'apri',
  calcular: () => calcularAPRI(valor('#apri-ast'), valor('#apri-lsn'), valor('#apri-plaq')),
  escrever: (r) => {
    $('#apri-valor').textContent = fmt(r.apri, 2);
    $('#apri-sub').textContent = r.descricao;
  },
  resumo: (r) => ({ assunto: `APRI — ${fmt(r.apri, 2)}`, linhas: ['APRI', `Resultado: ${fmt(r.apri, 2)}`, r.descricao] }),
});

const CHILD_ITENS = [
  ['bilirrubina', 'Bilirrubina total', [['< 2 mg/dL', 1, '< 34 µmol/L · 1 ponto'], ['2–3 mg/dL', 2, '34–50 µmol/L · 2 pontos'], ['> 3 mg/dL', 3, '> 50 µmol/L · 3 pontos']]],
  ['albumina', 'Albumina', [['> 3,5 g/dL', 1], ['2,8–3,5 g/dL', 2], ['< 2,8 g/dL', 3]]],
  ['inr', 'INR', [['< 1,7', 1], ['1,7–2,3', 2], ['> 2,3', 3]]],
  ['ascite', 'Ascite', [['Ausente', 1], ['Ligeira (controlada com diuréticos)', 2], ['Moderada a grave (refratária)', 3]]],
  ['encefalopatia', 'Encefalopatia hepática', [['Ausente', 1], ['Grau 1–2 (ou controlada)', 2], ['Grau 3–4 (ou refratária)', 3]]],
];
const childForm = $('#child-form');
montarPerguntas($('#child-perguntas'), CHILD_ITENS, 'cp');
ligarCalculadora({
  prefixo: 'child',
  calcular: () => calcularChildPugh(lerPerguntas(childForm, CHILD_ITENS, 'cp')),
  escrever: (r) => {
    $('#child-classe').textContent = `Classe ${r.classe}`;
    $('#child-pontos').textContent = `${r.pontos} pontos`;
    $('#child-sub').textContent = r.descricao;
  },
  resumo: (r) => ({ assunto: `Child-Pugh — classe ${r.classe} (${r.pontos} pontos)`, linhas: ['Child-Pugh', `Pontuação: ${r.pontos} (classe ${r.classe})`, r.descricao] }),
});

const dialise = $('#meld-dialise');
dialise.addEventListener('change', () => { $('#meld-creat').disabled = dialise.checked; });
ligarCalculadora({
  prefixo: 'meld',
  calcular: () => calcularMELD({
    bilirrubina: valor('#meld-bili'), inr: valor('#meld-inr'), creatinina: valor('#meld-creat'),
    sodio: valor('#meld-na'), dialise: dialise.checked,
  }),
  escrever: (r) => {
    $('#meld-valor').textContent = r.meldNa ?? r.meld;
    $('#meld-sub').textContent = r.meldNa === null ? 'Sem sódio: mostra o MELD' : 'MELD corrigido para o sódio';
    $('#meld-simples').textContent = r.meld;
    $('#meld-mort').textContent = r.mortalidade90d;
  },
  resumo: (r) => ({
    assunto: `MELD-Na — ${r.meldNa ?? r.meld}`,
    linhas: ['MELD / MELD-Na', `Bilirrubina ${$('#meld-bili').value} mg/dL · INR ${$('#meld-inr').value} · Creatinina ${dialise.checked ? 'diálise' : `${$('#meld-creat').value} mg/dL`} · Na ${$('#meld-na').value} mmol/L`, `MELD: ${r.meld}`, `MELD-Na: ${r.meldNa ?? '—'}`, `Mortalidade estimada a 90 dias: ${r.mortalidade90d}`],
  }),
});
