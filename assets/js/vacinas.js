import { calcularCalendarioPNV } from './vacinas-core.js';
import { $, fmtData, fmtDataCurta, ligarCalculadora, itemAgenda } from './calc-ui.js';

const ETIQUETAS = { passada: 'Idade já passou', agora: 'Para já', proxima: 'Em breve', futura: null };

function idadeTexto(r) {
  if (r.idadeAnos >= 2) return `${r.idadeAnos} anos`;
  return `${r.idadeMeses} ${r.idadeMeses === 1 ? 'mês' : 'meses'}`;
}

// Marcos do calendário em cartões: o atual/próximo destaca-se; cada ponto é uma vacina.
const ESTADO_CURTO = { passada: 'Passou', agora: 'Agora', proxima: 'Em breve', futura: '' };

function desenharMarcos(doses, proxima) {
  const el = $('#vac-marcos');
  el.replaceChildren(...doses.map((d, i) => {
    const li = document.createElement('li');
    li.className = 'vm';
    li.dataset.estado = d.estado;
    li.style.setProperty('--k', i);
    if (d === proxima) li.classList.add('vm-proxima');
    li.title = `${d.idade}: ${d.vacinas.join(', ')}`;
    li.innerHTML = '<b></b><span class="vm-doses"></span><em></em>';
    li.querySelector('b').textContent = d.idade.replace(' e 6 meses', '½').replace('Nascimento', 'Nasc.');
    li.querySelector('.vm-doses').innerHTML = d.vacinas.map(() => '<i></i>').join('');
    li.querySelector('em').textContent = ESTADO_CURTO[d.estado];
    return li;
  }));
}

const campo = $('#vac-nascimento');
const params = new URLSearchParams(location.search);
if (params.get('nasc')) campo.value = params.get('nasc');

ligarCalculadora({
  prefixo: 'vac',
  calcular: () => calcularCalendarioPNV(campo.value),
  escrever: (r) => {
    const p = r.proxima;
    $('#vac-proxima').textContent = p ? p.idade : 'Esquema concluído';
    $('#vac-sub').textContent = p ? p.vacinas.join(' · ') : '';
    $('#vac-idade').textContent = idadeTexto(r);
    $('#vac-data').textContent = p ? fmtDataCurta.format(p.data) : '—';
    desenharMarcos(r.doses, p);
    const lista = $('#vac-agenda');
    lista.replaceChildren(...r.doses.map((d) => itemAgenda({
      quando: d.idade,
      titulo: d.vacinas.join(' · '),
      detalhe: fmtData.format(d.data),
      estado: d.estado,
      etiqueta: ETIQUETAS[d.estado],
    })));
    history.replaceState(null, '', `?nasc=${campo.value}`);
  },
  resumo: (r) => ({
    assunto: `Calendário de vacinas (PNV) — ${r.proxima ? `próxima: ${r.proxima.idade}` : 'esquema concluído'}`,
    linhas: [
      'Calendário de vacinas (PNV)',
      `Data de nascimento: ${fmtData.format(new Date(`${campo.value}T00:00`))}`,
      `Idade atual: ${idadeTexto(r)}`,
      '',
      ...r.doses.map((d) => `${fmtDataCurta.format(d.data)} · ${d.idade}: ${d.vacinas.join(', ')}${d.estado === 'passada' ? ' (idade já passou — confirmar no boletim)' : ''}`),
    ],
  }),
});
