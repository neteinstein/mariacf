import { CONDICOES, ENXAQUECA, HTA, POS_PARTO, TABACO, avaliarContracecao, nivelCategoria, significado, textoCategoria } from './contracecao-core.js';
import { $, $$, ligarSteppers, ligarCalculadora } from './calc-ui.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
const visto =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

const chips = (nome, opcoes) =>
  opcoes
    .map(
      (o, i) =>
        `<div class="chip"><input type="radio" name="${nome}" id="${nome}-${i}" value="${o.id}"${i === 0 ? ' checked' : ''}><label for="${nome}-${i}"><strong>${esc(o.texto)}</strong></label></div>`
    )
    .join('');

const caixa = (id, texto) =>
  `<div class="check-item"><input type="checkbox" id="${id}"><label for="${id}"><span class="box" aria-hidden="true">${visto}</span><span class="txt"><strong>${esc(texto)}</strong></span></label></div>`;

// O formulário é desenhado a partir das listas de contracecao-core.js (uma só fonte de verdade).
$('#mec-posparto').innerHTML = chips('mec-pp', POS_PARTO);
$('#mec-tev-wrap').innerHTML = caixa('mec-tev', 'Outros fatores de risco de TEV no pós-parto (imobilização, transfusão, IMC ≥ 30, hemorragia pós-parto, cesariana, pré-eclâmpsia, tabaco)');
$('#mec-tabaco').innerHTML = chips('mec-tab', TABACO);
$('#mec-hta').innerHTML = chips('mec-hta', HTA);
$('#mec-enxaqueca').innerHTML = chips('mec-enx', ENXAQUECA);
const grupos = [...new Set(CONDICOES.map((c) => c.grupo))];
$('#mec-condicoes').innerHTML = grupos
  .map(
    (g) =>
      `<h3 class="mec-grupo">${esc(g)}</h3><div class="checklist">${CONDICOES.filter((c) => c.grupo === g)
        .map((c) => caixa(`mec-c-${c.id}`, c.texto))
        .join('')}</div>`
  )
  .join('');

ligarSteppers();

const escolhido = (nome) => document.querySelector(`input[name="${nome}"]:checked`)?.value || '';

function dados() {
  const posParto = escolhido('mec-pp');
  // A caixa dos fatores de risco de TEV só faz sentido nas primeiras 6 semanas sem amamentar.
  const comTev = POS_PARTO.find((p) => p.id === posParto)?.tev;
  $('#mec-tev-wrap').hidden = !comTev;
  return {
    idade: $('#mec-idade').value,
    posParto,
    tevPosParto: Boolean(comTev) && $('#mec-tev').checked,
    tabaco: escolhido('mec-tab'),
    hta: escolhido('mec-hta'),
    enxaqueca: escolhido('mec-enx'),
    condicoes: CONDICOES.filter((c) => $(`#mec-c-${c.id}`).checked).map((c) => c.id),
  };
}

function cartao(m) {
  const nivel = nivelCategoria(m.pior);
  const razoes = m.razoes.slice(0, 3);
  return `<article class="mec-metodo" data-nivel="${nivel}">
      <div class="mec-cat" aria-hidden="true">${m.inicio === m.continuacao ? m.inicio : `${m.inicio}<small>/${m.continuacao}</small>`}</div>
      <div class="mec-info">
        <h3>${esc(m.nome)}</h3>
        <p class="mec-detalhe">${esc(m.detalhe)}</p>
        <p class="mec-texto"><span class="sr-only">${textoCategoria(m.inicio, m.continuacao)}: </span>${esc(significado(m.inicio))}${m.inicio !== m.continuacao ? ` (início ${m.inicio}, continuação ${m.continuacao})` : ''}</p>
        ${razoes.length ? `<ul class="mec-razoes">${razoes.map((r) => `<li><b>${r.inicio === r.continuacao ? r.inicio : `${r.inicio}/${r.continuacao}`}</b> ${esc(r.texto)}</li>`).join('')}</ul>` : ''}
      </div>
    </article>`;
}

ligarCalculadora({
  prefixo: 'mec',
  calcular: () => avaliarContracecao(dados()),
  escrever: (r) => {
    const livres = r.metodos.filter((m) => m.inicio === 1 || m.inicio === 2).length;
    $('#mec-sub').textContent = `${livres} de ${r.metodos.length} métodos com categoria 1 ou 2 para começar`;
    $('#mec-metodos').innerHTML = r.metodos.map(cartao).join('');
  },
  resumo: (r) => ({
    assunto: 'Contraceção — critérios médicos de elegibilidade da OMS',
    linhas: [
      'Critérios médicos de elegibilidade da OMS (6.ª edição, 2025)',
      '',
      ...r.metodos.map((m) => `${m.nome}: ${textoCategoria(m.inicio, m.continuacao)}${m.razoes[0] ? ` — ${m.razoes[0].texto}` : ''}`),
      '',
      '1 sem restrições · 2 vantagens superam riscos · 3 riscos superam vantagens · 4 risco inaceitável',
    ],
  }),
});

// Mostrar/esconder a caixa dos fatores de TEV assim que se escolhe o pós-parto.
$$('input[name="mec-pp"]').forEach((i) => i.addEventListener('change', dados));
