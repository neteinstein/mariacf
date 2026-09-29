import { calcularCalendarioPNV } from './vacinas-core.js';
import { $, fmtData, fmtDataCurta, ligarCalculadora, itemAgenda } from './calc-ui.js';

const ETIQUETAS = { passada: 'Idade já passou', agora: 'Para já', proxima: 'Em breve', futura: null };

function idadeTexto(r) {
  if (r.idadeAnos >= 2) return `${r.idadeAnos} anos`;
  return `${r.idadeMeses} ${r.idadeMeses === 1 ? 'mês' : 'meses'}`;
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
