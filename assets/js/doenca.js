// Página de uma doença (doencas/<id>/, gerada por scripts/gerar.mjs): separadores por idade,
// email e impressão. O grupo inicial já foi escolhido pelo <script> do <head> (data-idade no <html>,
// a partir de ?idade= ou da última idade escolhida), para a página não piscar ao abrir.

const raiz = document.documentElement;
const vista = document.getElementById('doenca');
const GRUPO_KEY = 'mcf-doencas-idade';

if (vista) {
  const tabs = Array.from(vista.querySelectorAll('[role="tab"]'));
  const grupos = tabs.map((t) => t.dataset.grupo);
  const emails = JSON.parse(document.getElementById('doenca-emails')?.textContent || '{}');

  function marcar(grupoId, { focar = false } = {}) {
    raiz.dataset.idade = grupoId;
    tabs.forEach((t) => {
      const ativo = t.dataset.grupo === grupoId;
      t.setAttribute('aria-selected', String(ativo));
      t.tabIndex = ativo ? 0 : -1;
      if (!ativo) return;
      if (focar) t.focus();
      // Em ecrãs estreitos os separadores deslizam na horizontal: centrar o escolhido.
      const barra = t.parentElement;
      barra.scrollLeft = t.offsetLeft - (barra.clientWidth - t.offsetWidth) / 2;
    });
  }

  function escolher(grupoId, focar = false) {
    try {
      localStorage.setItem(GRUPO_KEY, grupoId);
    } catch {
      /* sem armazenamento: a idade escolhida vale só para esta visita */
    }
    history.replaceState(null, '', `?idade=${encodeURIComponent(grupoId)}`);
    marcar(grupoId, { focar });
  }

  tabs.forEach((t, idx) => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      escolher(t.dataset.grupo);
    });
    t.addEventListener('keydown', (e) => {
      let alvo = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') alvo = tabs[(idx + 1) % tabs.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') alvo = tabs[(idx - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') alvo = tabs[0];
      else if (e.key === 'End') alvo = tabs[tabs.length - 1];
      if (!alvo) return;
      e.preventDefault();
      escolher(alvo.dataset.grupo, true);
    });
  });

  vista.addEventListener('click', (e) => {
    const acao = e.target.closest('[data-acao]')?.dataset.acao;
    if (acao === 'imprimir') window.print();
    if (acao !== 'email') return;
    const resumo = emails[raiz.dataset.idade];
    if (!resumo) return;
    const corpo = [
      ...resumo.linhas,
      'Explicação completa, com imagens:',
      location.href,
      '',
      'Informação de apoio — não substitui aconselhamento médico.',
    ].join('\n');
    location.href = `mailto:?subject=${encodeURIComponent(resumo.assunto)}&body=${encodeURIComponent(corpo)}`;
  });

  marcar(grupos.includes(raiz.dataset.idade) ? raiz.dataset.idade : grupos[0]);
}
