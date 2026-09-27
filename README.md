# Dra. Maria Cortês Ferreira · Utilitários de Saúde

Coleção de pequenas ferramentas para médicos e pacientes, publicada com GitHub Pages.
Site 100 % estático (HTML + CSS + JavaScript), sem passo de build.

## Ferramentas

| Ferramenta | Caminho | Estado |
| --- | --- | --- |
| Calculadora de doses (paracetamol e ibuprofeno em xarope) | `/calculadora-doses/` | ✅ |
| Risco cardiovascular, IMC, vacinas, data do parto, função renal | — | Em breve |

### Calculadora de doses

- Paracetamol 40 mg/mL: 15 mg/kg por toma, de 6/6 h, máx. 4 tomas/dia (máx. 1 g por toma).
- Ibuprofeno 20 ou 40 mg/mL: 10 mg/kg por toma, de 8/8 h, máx. 3 tomas/dia (máx. 400 mg por toma; ≥ 5 kg).
- Permite concentração personalizada, mostra a seringa com o volume, o horário das próximas tomas
  e guarda os valores no URL para partilhar (ex.: `?peso=12&med=ibuprofeno&c=20`).

A lógica de cálculo está em `assets/js/doses-core.js`, com testes em `tests/`.

## Desenvolvimento

```bash
python3 -m http.server 8000   # abrir http://localhost:8000
npm test                      # testes da lógica de doses (Node 18+)
```

## Publicação (GitHub Pages)

Em **Settings → Pages**, escolher *Deploy from a branch*, ramo `main`, pasta `/ (root)`.

## Aviso

Informação de apoio. Não substitui a avaliação de um profissional de saúde.
