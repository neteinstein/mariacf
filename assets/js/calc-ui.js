// Comportamento partilhado das calculadoras: separadores, botões +/−,
// mostrar/esconder o resultado, perguntas de escolha única e as ações de
// email e impressão.

export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export const fmt = (n, casas = 0, extra = {}) =>
  Number(n).toLocaleString('pt-PT', { minimumFractionDigits: casas, maximumFractionDigits: casas, ...extra });

export const fmtData = new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });
export const fmtDataCurta = new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });

/** Lê um campo numérico aceitando vírgula decimal. */
export const valor = (sel) => $(sel).value.replace(',', '.');

/** Liga os separadores (.tabbtn/[data-painel]) e escolhe o inicial a partir de ?calc=. */
export function ligarSeparadores() {
  const tabs = $$('.tabbtn[data-tab]');
  const paineis = $$('[data-painel]');
  if (!tabs.length) return;
  function selecionar(id) {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
    paineis.forEach((p) => (p.hidden = p.dataset.painel !== id));
    history.replaceState(null, '', `?calc=${id}`);
  }
  tabs.forEach((t) => t.addEventListener('click', () => selecionar(t.dataset.tab)));
  const pedido = new URLSearchParams(location.search).get('calc');
  selecionar(tabs.some((t) => t.dataset.tab === pedido) ? pedido : tabs[0].dataset.tab);
}

export function ligarSteppers() {
  $$('.stepper').forEach((btn) => {
    btn.addEventListener('click', () => {
      const alvo = document.getElementById(btn.dataset.alvo);
      const min = Number(alvo.min) || 0;
      const max = Number(alvo.max) || Infinity;
      const casas = alvo.step && alvo.step.includes('.') ? alvo.step.split('.')[1].length : 0;
      const f = 10 ** casas;
      const novo = Math.round(((Number(alvo.value.replace(',', '.')) || min) + Number(btn.dataset.step)) * f) / f;
      alvo.value = Math.min(Math.max(novo, min), max);
      alvo.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });
}

/**
 * Liga uma calculadora: recalcula a cada alteração do formulário, alterna
 * entre resultado e mensagem de falta de dados, e trata do email/impressão.
 * calcular() devolve { ok, motivo? }; escrever(r) preenche o resultado;
 * resumo(r) devolve { assunto, linhas } para o email.
 */
export function ligarCalculadora({ prefixo, calcular, escrever, resumo }) {
  const form = $(`#${prefixo}-form`);
  const resultado = $(`#${prefixo}-resultado`);
  let atual = null;

  function atualizar() {
    const r = calcular();
    const ok = $(`#${prefixo}-ok`);
    const vazio = $(`#${prefixo}-vazio`);
    const acoes = $(`#result-actions-${prefixo}`);
    if (!r.ok) {
      atual = null;
      ok.hidden = true;
      vazio.hidden = false;
      if (acoes) acoes.hidden = true;
      const motivo = $(`#${prefixo}-motivo`);
      if (motivo) motivo.textContent = r.motivo;
      return;
    }
    atual = r;
    ok.hidden = false;
    vazio.hidden = true;
    if (acoes) acoes.hidden = false;
    if (r.nivel && resultado) resultado.dataset.nivel = r.nivel;
    escrever(r);
  }

  form.addEventListener('input', atualizar);
  form.addEventListener('change', atualizar);

  $(`#btn-email-${prefixo}`)?.addEventListener('click', () => {
    if (!atual) return;
    const { assunto, linhas } = resumo(atual);
    const corpo = [...linhas, '', 'Informação de apoio — não substitui aconselhamento médico.', location.href].join('\n');
    location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  });
  $(`#btn-print-${prefixo}`)?.addEventListener('click', () => window.print());

  atualizar();
  return atualizar;
}

/** Pergunta de escolha única com pontos: opcoes = [[texto, pontos, detalhe?], …]. */
export function criarPergunta(nome, numero, texto, opcoes, { mostrarPontos = true } = {}) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'step qitem';
  const legend = document.createElement('legend');
  legend.className = 'step-label';
  const num = document.createElement('span');
  num.className = 'step-num';
  num.textContent = numero;
  legend.append(num, ` ${texto}`);
  fieldset.appendChild(legend);

  const chips = document.createElement('div');
  chips.className = 'chips';
  opcoes.forEach(([rotulo, pts, detalhe], i) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = nome;
    input.id = `${nome}-${i}`;
    input.value = pts;
    const label = document.createElement('label');
    label.htmlFor = input.id;
    const strong = document.createElement('strong');
    strong.textContent = rotulo;
    label.appendChild(strong);
    const sub = detalhe ?? (mostrarPontos ? `${pts} ${Number(pts) === 1 ? 'ponto' : 'pontos'}` : null);
    if (sub) {
      const span = document.createElement('span');
      span.textContent = sub;
      label.appendChild(span);
    }
    chip.append(input, label);
    chips.appendChild(chip);
  });
  fieldset.appendChild(chips);
  return fieldset;
}

/** Monta uma lista de perguntas [campo, texto, opcoes] num contentor. */
export function montarPerguntas(container, itens, prefixo, opcoesPergunta) {
  itens.forEach(([campo, texto, opcoes], i) => {
    container.appendChild(criarPergunta(`${prefixo}-${campo}`, i + 1, texto, opcoes, opcoesPergunta));
  });
}

/** Lê as respostas escolhidas: { campo: pontos | NaN }. */
export function lerPerguntas(form, itens, prefixo) {
  const valores = {};
  itens.forEach(([campo]) => {
    const marcado = form.querySelector(`input[name="${prefixo}-${campo}"]:checked`);
    valores[campo] = marcado ? Number(marcado.value) : NaN;
  });
  return valores;
}

/** Item de agenda (vacinas, rastreios, marcos da gravidez). */
export function itemAgenda({ quando, titulo, detalhe, estado, etiqueta, link }) {
  const li = document.createElement('li');
  li.className = 'agenda-item';
  if (estado) li.dataset.estado = estado;
  const q = document.createElement('div');
  q.className = 'agenda-quando';
  q.textContent = quando;
  const corpo = document.createElement('div');
  corpo.className = 'agenda-corpo';
  const t = document.createElement('strong');
  t.textContent = titulo;
  corpo.appendChild(t);
  if (detalhe) {
    const d = document.createElement('span');
    d.textContent = detalhe;
    corpo.appendChild(d);
  }
  if (link) {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.texto;
    a.className = 'agenda-link';
    corpo.appendChild(a);
  }
  li.append(q, corpo);
  if (etiqueta) {
    const e = document.createElement('span');
    e.className = 'agenda-etiqueta';
    e.textContent = etiqueta;
    li.appendChild(e);
  }
  return li;
}
