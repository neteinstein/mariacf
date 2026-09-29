# Dra. Maria Cortês Ferreira · Utilitários de Saúde

Coleção de pequenas ferramentas para médicos e pacientes, publicada com GitHub Pages.
Site 100 % estático (HTML + CSS + JavaScript), sem passo de build.

## Páginas

- `/` — página inicial com as ferramentas
- `/sns/` — contactos úteis do SNS (112, SNS 24 e outras linhas de ajuda)
- `/sobre/` — percurso da Dra. Maria, trabalhos científicos publicados e artigos no Ponto SJ

## Ferramentas

Cada calculadora vive em `calculadora-*/index.html`, com a lógica de cálculo em
`assets/js/<nome>-core.js` (sem DOM, testada em `tests/`) e a interface em `assets/js/<nome>.js`.
Os separadores de cada página podem ser abertos diretamente com `?calc=<id>`.

| Ferramenta | Caminho | Inclui |
| --- | --- | --- |
| Calculadora de doses | `/calculadora-doses/` | Paracetamol e ibuprofeno em xarope, por peso |
| Crescimento infantil (OMS) | `/calculadora-crescimento/` | Peso, comprimento, PC e peso-comprimento (0–24 m); IMC e altura (2–19 anos); idade corrigida; altura-alvo |
| Fluidos, desidratação e M-CHAT-R/F | `/calculadora-pediatria/` | Holliday-Segar, Clinical Dehydration Scale, interpretação do M-CHAT-R/F |
| Calendário de vacinas (PNV) | `/calculadora-vacinas/` | Esquema recomendado do PNV a partir da data de nascimento |
| Bishop, Apgar e Glasgow pediátrico | `/calculadora-parto-neonatal/` | |
| Data provável de parto | `/calculadora-dpp/` | DUM ou ecografia, com calendário da vigilância da gravidez |
| Aumento de peso na gravidez | `/calculadora-gravidez-peso/` | Recomendações IOM 2009 por IMC pré-gravidez |
| SCORE2 e SCORE2-Diabetes | `/calculadora-risco-cardiovascular/` | |
| CHA₂DS₂-VASc e HAS-BLED | `/calculadora-anticoagulacao/` | |
| ITB e peso ideal/ajustado | `/calculadora-vascular/` | |
| IMC e ASC | `/calculadora-imc-asc/` | IMC, ASC (Mosteller, Du Bois) e perímetro abdominal |
| FINDRISC, MUST e risco de fratura | `/calculadora-rastreio/` | |
| CKD-EPI, Cockcroft-Gault e KDIGO | `/calculadora-funcao-renal/` | eTFG, CrCl e estadiamento G/A |
| IPSS | `/calculadora-urologia/` | |
| Fórmulas laboratoriais | `/calculadora-laboratorial/` | LDL, Na e Ca corrigidos, eAG, anion gap, osmolaridade, água livre, HOMA-IR, conversão de unidades |
| FIB-4, Child-Pugh e MELD | `/calculadora-hepatica/` | FIB-4, NAFLD fibrosis score, APRI, Child-Pugh, MELD-Na |
| Blatchford, Rockall e BISAP | `/calculadora-digestivo/` | |
| Equivalência de corticosteroides | `/calculadora-corticoides/` | Doses equivalentes de 9 corticosteroides sistémicos |
| PHQ-9, GAD-7, AUDIT e ASRS | `/calculadora-saude-mental/` | |
| APGAR familiar, EPDS, Zarit, Fagerström e Morisky | `/calculadora-familia/` | |
| Unidades maço-ano e gramas de álcool | `/calculadora-habitos/` | |
| CAT, ACT e Centor/McIsaac | `/calculadora-respiratoria/` | |
| Epworth e STOP-BANG | `/calculadora-sono/` | |
| Urgência | `/calculadora-urgencia/` | CURB-65, Wells, QTc, Glasgow, HEART, NEWS2, PERC, Ottawa, Alvarado… |
| Regra dos 9 | `/calculadora-queimados/` | |
| Avaliação geriátrica | `/calculadora-geriatria/` | Barthel, Lawton-Brody, CFS, TUG, Morse, Braden, MNA-SF, GDS-15, Charlson, MMSE/MoCA |
| Plano de rastreios por idade | `/calculadora-plano-rastreios/` | Rastreios do SNS e normas da DGS por idade, sexo e condições |

Os dados de crescimento dos 2 aos 19 anos (`assets/js/crescimento-dados-2-19.js`) são as tabelas
LMS oficiais da OMS (padrões 2006 até aos 60 meses, referência 2007 dos 61 aos 228 meses).

### Novas calculadoras: como acrescentar

1. Criar `calculadora-<nome>/index.html`, `assets/js/<nome>-core.js` e `assets/js/<nome>.js`
   (as páginas novas usam `assets/js/calc-ui.js` para separadores, botões +/−, resultado e email/impressão).
2. Acrescentar os testes em `tests/<nome>.test.mjs`.
3. Acrescentar o cartão na página inicial e os ficheiros novos à lista `PRECACHE` de `sw.js`
   — o teste `tests/site.test.mjs` falha se faltar algum.

### Funcionamento sem rede

O site é instalável (`manifest.webmanifest`) e funciona sem ligação graças ao service worker
`sw.js` («rede primeiro»: com ligação serve sempre a versão mais recente e atualiza a cache).

## Desenvolvimento

```bash
python3 -m http.server 8000   # abrir http://localhost:8000
npm test                      # testes da lógica e da integridade do site (Node 18+)
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
