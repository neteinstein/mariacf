import {
  ABSOLUTAS, RELATIVAS, VIA_TRANSDERMICA, RISCO_CV, RISCO_MAMA, UTERO, FASE, SINTOMAS, ESTROGENIOS, DOSES_NIVEIS,
  avaliarElegibilidade, escolherRegime, equivalentes,
} from './ths-core.js';
import { $, $$, ligarSeparadores, ligarSteppers, ligarCalculadora } from './calc-ui.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
const visto =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

const chips = (nome, opcoes, marcado = 0) =>
  opcoes
    .map(
      (o, i) =>
        `<div class="chip"><input type="radio" name="${nome}" id="${nome}-${i}" value="${o.id}"${i === marcado ? ' checked' : ''}><label for="${nome}-${i}"><strong>${esc(o.texto ?? o.nome)}</strong>${o.detalhe ? `<span>${esc(o.detalhe)}</span>` : ''}</label></div>`
    )
    .join('');

const caixa = (id, texto) =>
  `<div class="check-item"><input type="checkbox" id="${id}"><label for="${id}"><span class="box" aria-hidden="true">${visto}</span><span class="txt"><strong>${esc(texto)}</strong></span></label></div>`;

const cartao = ({ nivel, simbolo, titulo, detalhe, itens = [] }) =>
  `<article class="mec-metodo" data-nivel="${nivel}">
      <div class="mec-cat" aria-hidden="true">${simbolo}</div>
      <div class="mec-info">
        <h3>${esc(titulo)}</h3>
        ${detalhe ? `<p class="mec-detalhe">${esc(detalhe)}</p>` : ''}
        ${itens.length ? `<ul class="mec-razoes">${itens.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      </div>
    </article>`;

const escolhido = (nome) => document.querySelector(`input[name="${nome}"]:checked`)?.value || '';
const marcadas = (lista, prefixo) => lista.filter((c) => $(`#${prefixo}-${c.id}`).checked).map((c) => c.id);

// O formulário é desenhado a partir das listas de ths-core.js (uma só fonte de verdade).
$('#eleg-cv').innerHTML = chips('eleg-cv', RISCO_CV, 3);
$('#eleg-mama').innerHTML = chips('eleg-mama', RISCO_MAMA, 3);
$('#eleg-absolutas').innerHTML = ABSOLUTAS.map((c) => caixa(`eleg-a-${c.id}`, c.texto)).join('');
$('#eleg-relativas').innerHTML = RELATIVAS.map((c) => caixa(`eleg-r-${c.id}`, c.texto)).join('');
$('#eleg-transdermica').innerHTML = VIA_TRANSDERMICA.map((c) => caixa(`eleg-t-${c.id}`, c.texto)).join('');

$('#regime-sintomas').innerHTML = chips('regime-sint', SINTOMAS);
$('#regime-utero').innerHTML = chips('regime-ut', UTERO);
$('#regime-fase').innerHTML = chips('regime-fs', FASE, 1);
$('#regime-siu-wrap').innerHTML = caixa('regime-siu', 'Tem um SIU de levonorgestrel 52 mg colocado');

$('#equiv-prep').innerHTML = chips('equiv-pr', ESTROGENIOS);
$('#equiv-dose').innerHTML = chips('equiv-ds', DOSES_NIVEIS);

ligarSeparadores();
ligarSteppers();

const SIMBOLO = { pode: '✓', precaucao: '!', evitar: '✕', contraindicada: '✕' };

ligarCalculadora({
  prefixo: 'eleg',
  calcular: () =>
    avaliarElegibilidade({
      idade: $('#eleg-idade').value,
      anosMenopausa: $('#eleg-anos').value,
      riscoCV: escolhido('eleg-cv'),
      riscoMama: escolhido('eleg-mama'),
      absolutas: marcadas(ABSOLUTAS, 'eleg-a'),
      relativas: marcadas(RELATIVAS, 'eleg-r'),
      transdermica: marcadas(VIA_TRANSDERMICA, 'eleg-t'),
    }),
  escrever: (r) => {
    $('#eleg-titulo').textContent = r.titulo;
    const blocos = [
      cartao({
        nivel: r.nivel,
        simbolo: SIMBOLO[r.decisao],
        titulo: r.titulo,
        detalhe: r.razoes.length ? 'Pelos seguintes motivos:' : 'Sem contraindicações assinaladas.',
        itens: r.razoes.map((x) => x.texto),
      }),
    ];
    if (r.via) {
      blocos.push(
        cartao({
          nivel: r.via === 'transdermica' ? 'moderado' : 'baixo',
          simbolo: r.via === 'transdermica' ? '🩹' : '✓',
          titulo: r.via === 'transdermica' ? 'Preferir a via transdérmica' : 'Via oral ou transdérmica',
          detalhe: r.via === 'transdermica' ? (r.viaOralContraindicada ? 'A via oral está contraindicada.' : 'Adesivo, gel ou spray de estradiol.') : 'Escolha segundo a preferência da mulher.',
          itens: r.motivosVia,
        })
      );
    }
    $('#eleg-detalhe').innerHTML = blocos.join('');
    const avisos = [];
    if (r.iop) avisos.push('Menos de 40 anos: se for insuficiência ovárica prematura, a TH está recomendada pelo menos até aos 51 anos, em doses mais altas (estradiol transdérmico 75–100 µg/dia).');
    if (r.riscosPorCalcular && r.decisao !== 'contraindicada') avisos.push('Calcule o risco cardiovascular a 10 anos (ACC/AHA) e o risco de cancro da mama a 5 anos (NCI ou IBIS): fazem parte da decisão.');
    $('#eleg-avisos').innerHTML = avisos.map((t) => `<div class="notice"><span class="ni" aria-hidden="true">ℹ️</span><p>${esc(t)}</p></div>`).join('');
  },
  resumo: (r) => ({
    assunto: 'Terapêutica hormonal da menopausa — contraindicações',
    linhas: [
      r.titulo,
      ...r.razoes.map((x) => `• ${x.texto}`),
      '',
      ...(r.via === 'transdermica' ? ['Preferir a via transdérmica:', ...r.motivosVia.map((t) => `• ${t}`)] : r.via ? ['Via oral ou transdérmica.'] : []),
      '',
      'Segundo o Consenso Nacional sobre Menopausa 2021 (SPG).',
    ],
  }),
});

function dadosRegime() {
  const sintomas = escolhido('regime-sint');
  const utero = escolhido('regime-ut');
  // O útero e a fase só contam para a TH sistémica; a fase e o SIU, só com útero.
  $('#regime-sistemica').hidden = sintomas === 'sgum';
  $('#regime-fase-wrap').hidden = sintomas === 'sgum' || utero !== 'sim';
  return { sintomas, utero, fase: escolhido('regime-fs'), siu: $('#regime-siu').checked };
}

ligarCalculadora({
  prefixo: 'regime',
  calcular: () => escolherRegime(dadosRegime()),
  escrever: (r) => {
    $('#regime-sub').textContent = r.opcoes[0].titulo;
    $('#regime-opcoes').innerHTML = r.opcoes
      .map((o, i) => cartao({ nivel: i === 0 ? 'baixo' : 'neutro', simbolo: i === 0 ? '1' : '2', titulo: o.titulo, detalhe: o.detalhe, itens: o.notas }))
      .join('');
  },
  resumo: (r) => ({
    assunto: 'Terapêutica hormonal da menopausa — regime',
    linhas: r.opcoes.flatMap((o, i) => [`${i === 0 ? 'Sugerido' : 'Alternativa'}: ${o.titulo}`, o.detalhe, ...o.notas.map((n) => `• ${n}`), '']),
  }),
});

ligarCalculadora({
  prefixo: 'equiv',
  calcular: () => equivalentes(escolhido('equiv-pr'), escolhido('equiv-ds')),
  escrever: (r) => {
    $('#equiv-sub').textContent = `${r.prep.nome} ${r.dose} — dose ${r.nivel.texto.toLowerCase()}`;
    $('#equiv-lista').innerHTML = r.outras
      .map((o) => cartao({ nivel: o.dose ? 'baixo' : 'neutro', simbolo: '≈', titulo: o.nome, detalhe: o.dose ?? 'Sem dose equivalente neste nível' }))
      .join('');
  },
  resumo: (r) => ({
    assunto: `Doses equivalentes — ${r.prep.nome} ${r.dose}`,
    linhas: [`${r.prep.nome} ${r.dose} (dose ${r.nivel.texto.toLowerCase()}) equivale a:`, ...r.outras.filter((o) => o.dose).map((o) => `• ${o.nome}: ${o.dose}`), '', 'Consenso Nacional sobre Menopausa 2021 (SPG), quadro 2.'],
  }),
});

// Mostrar/esconder as perguntas do regime assim que se muda a resposta.
$$('input[name="regime-sint"], input[name="regime-ut"]').forEach((i) => i.addEventListener('change', dadosRegime));
