# Dra. Maria Cortês Ferreira · Utilitários de Saúde

Coleção de pequenas ferramentas para médicos e pacientes, publicada com GitHub Pages.
Site 100 % estático (HTML + CSS + JavaScript), sem passo de build.

## Páginas

- `/` — página inicial com as ferramentas
- `/sobre/` — percurso da Dra. Maria, trabalhos científicos publicados e artigos no Ponto SJ

## Ferramentas

| Ferramenta | Caminho | Estado |
| --- | --- | --- |
| Calculadora de doses (paracetamol e ibuprofeno em xarope) | `/calculadora-doses/` | ✅ |
| Calculadora de IMC e área de superfície corporal | `/calculadora-imc-asc/` | ✅ |
| Calculadora da data provável de parto | `/calculadora-dpp/` | ✅ |

### Calculadora de doses

- Paracetamol 40 mg/mL: 15 mg/kg por toma, de 6/6 h, máx. 4 tomas/dia (máx. 1 g por toma).
- Ibuprofeno 20 ou 40 mg/mL: 10 mg/kg por toma, de 8/8 h, máx. 3 tomas/dia (máx. 400 mg por toma; ≥ 5 kg).
- Permite concentração personalizada, mostra a seringa com o volume, o horário das próximas tomas
  e guarda os valores no URL para partilhar (ex.: `?peso=12&med=ibuprofeno&c=20`).

A lógica de cálculo está em `assets/js/doses-core.js`, com testes em `tests/`.

### Calculadora de IMC e área de superfície corporal

- IMC = peso (kg) / altura (m)², com a categoria segundo a Organização Mundial de Saúde.
- Área de superfície corporal pelas fórmulas de Mosteller e de Du Bois & Du Bois.
- Válida para adultos (peso 20–300 kg, altura 100–250 cm).

A lógica de cálculo está em `assets/js/imc-asc-core.js`, com testes em `tests/`.

### Calculadora da data provável de parto

- Método da última menstruação: regra de Naegele (DUM + 280 dias), ajustada à duração real do ciclo.
- Método da ecografia: reconstrói a data equivalente de início da gravidez a partir da idade
  gestacional medida no exame (5–42 semanas).
- Mostra a idade gestacional atual, o trimestre e os dias em falta para a DPP.

A lógica de cálculo está em `assets/js/dpp-core.js`, com testes em `tests/`.

## Desenvolvimento

```bash
python3 -m http.server 8000   # abrir http://localhost:8000
npm test                      # testes da lógica de doses (Node 18+)
```

## Publicação (GitHub Pages)

O site é publicado pelo workflow `.github/workflows/pages.yml` a cada push para `main`
(também pode ser corrido à mão em *Actions → Deploy GitHub Pages → Run workflow*).
O workflow corre os testes e publica todo o repositório (página inicial, `sobre/`, todas as pastas
`calculadora-*/` e `assets/`), exceto `tests/`, `.github/`, `package.json` e este README.
Nos pull requests corre só os testes e a preparação do site, sem publicar.

Configuração única: em **Settings → Pages → Build and deployment**, escolher *Source: GitHub Actions*.

## Aviso

Informação de apoio. Não substitui a avaliação de um profissional de saúde.
