# Saúde em Família · Dra. Maria Cortês Ferreira

Coleção de pequenas ferramentas para médicos e pacientes, publicada com GitHub Pages.
Site 100 % estático (HTML + CSS + JavaScript), sem passo de build.

## Páginas

- `/` — página inicial: apresentação e um cartão por secção, com uma entrada animada
- `/doencas/` — doenças explicadas para cinco grupos etários
- `/ferramentas/` — as calculadoras e questionários clínicos
- `/sns/` — contactos úteis do SNS (112, SNS 24 e outras linhas de ajuda)
- `/sobre/` — percurso da Dra. Maria e artigos no Ponto SJ
- `/usf/` — USF Nova Saúde (São Martinho do Campo): contactos, mapa, serviços, a Dra. Maria, história, notícias e como marcar consulta

## Página inicial

`index.html` apresenta o site e tem um cartão por secção (Doenças, Ferramentas, USF, SNS e Sobre).
A entrada animada (marca, traçado de ECG e um «furo» que revela a página) vive em CSS, na secção
«Página inicial» de `styles.css`; `assets/js/inicio.js` trata dos números que contam, dos cartões que surgem
ao chegar ao ecrã e da inclinação 3D. A entrada só aparece na primeira visita de cada sessão, salta-se com um
clique ou uma tecla e desaparece com «reduzir movimento». As ligações antigas para as doenças na raiz
(`/?d=…`, `/?q=…`, `/?cat=…`) seguem para `/doencas/`. Os números do herói são gerados a partir de `DOENCAS`
e das pastas `calculadora-*`; o teste `tests/site.test.mjs` avisa quando ficam desatualizados.

## Doenças

A página de doenças mostra um cartão animado por doença (41, das mais frequentes em Portugal), com pesquisa e
filtro por área (`/doencas/?q=colesterol`, `/doencas/?cat=Oncologia`). Ao abrir um cartão, a explicação aparece em separadores
por idade (Crianças 3–5, Crianças 5–12, Adolescentes 13–17, Adultos 18–65, Séniores 65+), com os botões
«Enviar por email» e «Imprimir» das ferramentas. O estado fica no URL (`/doencas/?d=diabetes&idade=65+`), por isso
cada separador pode ser partilhado; a impressão sai sempre com as cores do tema claro.

- `assets/js/doencas-dados.js` — o conteúdo (sem DOM, testado em `tests/doencas.test.mjs`).
  Os 3–5 anos só têm imagens com legendas curtas; os mais velhos juntam texto, mitos e quando procurar ajuda.
  `resumoDoenca()` prepara o texto do email de cada separador.
- `assets/js/doencas-ilustracoes.js` — ilustrações SVG animadas só com CSS (classes `an-*` em `styles.css`)
  e as miniaturas animadas dos cartões (classes `deco-*`).
- `assets/js/doencas.js` — a grelha, a pesquisa, os separadores, o email/impressão e a navegação.
- `assets/js/icones.js` — os ícones SVG de linha dos cartões de doenças e de ferramentas (e das etiquetas
  das idades). A página de ferramentas tem os mesmos SVG escritos no HTML, com `data-icone`; o teste
  `tests/icones.test.mjs` confirma que coincidem com a biblioteca.

No estilo, o que se carrega (filtros, botões) é uma pílula com contorno; o que só informa (etiquetas,
factos, tipo de contacto) é texto pequeno em maiúsculas, sem contorno.

Para acrescentar uma doença, basta um novo objeto em `DOENCAS` com os cinco grupos, uma área de `CATEGORIAS`
e uma miniatura; os testes verificam que as ilustrações referidas existem, que cada grupo tem o tipo de
conteúdo esperado e que o email de cada separador cabe num link `mailto:`.

## Ferramentas

Cada calculadora vive em `calculadora-*/index.html`, com a lógica de cálculo em
`assets/js/<nome>-core.js` (sem DOM, testada em `tests/`) e a interface em `assets/js/<nome>.js`.
Os separadores de cada página podem ser abertos diretamente com `?calc=<id>`.

| Ferramenta | Caminho | Inclui |
| --- | --- | --- |
| Calculadora de doses | `/calculadora-doses/` | Paracetamol, ibuprofeno e amoxicilina + ácido clavulânico (4:1, 7:1, 14:1) em xarope, por peso |
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
| CAT e ACT | `/calculadora-respiratoria/` | |
| Epworth e STOP-BANG | `/calculadora-sono/` | |
| Urgência | `/calculadora-urgencia/` | CURB-65, Wells, QTc, Glasgow, HEART, NEWS2, PERC, Ottawa, Alvarado… |
| Regra dos 9 | `/calculadora-queimados/` | |
| Avaliação geriátrica | `/calculadora-geriatria/` | Barthel, Lawton-Brody, CFS, TUG, Morse, Braden, MNA-SF, GDS-15, Charlson, MMSE/MoCA, 6CIT, SPMSQ |
| Plano de rastreios por idade | `/calculadora-plano-rastreios/` | Rastreios do SNS e normas da DGS por idade, sexo e condições |

Os dados de crescimento dos 2 aos 19 anos (`assets/js/crescimento-dados-2-19.js`) são as tabelas
LMS oficiais da OMS (padrões 2006 até aos 60 meses, referência 2007 dos 61 aos 228 meses).

### Novas calculadoras: como acrescentar

1. Criar `calculadora-<nome>/index.html`, `assets/js/<nome>-core.js` e `assets/js/<nome>.js`
   (as páginas novas usam `assets/js/calc-ui.js` para separadores, botões +/−, resultado e email/impressão).
2. Acrescentar os testes em `tests/<nome>.test.mjs`.
   Para o resultado ganhar vida, basta HTML — `assets/js/fx.js` (carregado por `site.js`) trata do resto:
   - números do `.dose-big` e das `.stat` contam até ao valor; pontuações «x / N» ganham um anel;
   - questionários com perguntas `.qitem` ganham progresso, marcação das respondidas e gráfico por pergunta
     (`data-fx-opcional` exclui perguntas; `data-fx-grafico-titulo` muda o título do gráfico);
   - `<div class="fx-escala" data-src="#id-do-numero" data-min data-max data-faixas="0~7:baixo:Normal|8~9:moderado:…">`
     desenha uma escala por faixas (`data-continuo` para valores contínuos; `data-valor` em vez de `data-src`
     quando o valor vem do código);
   - também há `.fx-pessoas` (100 pessoas, risco em %), `.fx-icones` (um ícone por unidade), `.fx-gauss`
     (curva normal para Z-scores), `.fx-degraus` (níveis em escada) e `.fx-acronimo` (letras que acendem
     com os campos `data-campo`).
3. Acrescentar o cartão em `ferramentas/index.html` e os ficheiros novos à lista `PRECACHE` de `sw.js`
   — o teste `tests/site.test.mjs` falha se faltar algum.

### Funcionamento sem rede

O site é instalável (`manifest.webmanifest`) e funciona sem ligação graças ao service worker
`sw.js` («rede primeiro»: com ligação serve sempre a versão mais recente e atualiza a cache).

### Cores e paletas

As paletas seguem as combinações recomendadas para sites de saúde: tons suaves de azul e verde sobre neutros, que
transmitem confiança, calma e higiene.

| Paleta | Combinação | Pensada para |
| --- | --- | --- |
| Azul sereno (`azul`, predefinida) | azul com branco e cinza claro | clínica geral |
| Verde natural (`verde`) | verde com bege e off-white | medicina geral e familiar, bem-estar |
| Azul-petróleo (`petroleo`) | petróleo com verde-água e fundo neutro | análises, aplicações de saúde |
| Pastel (`pastel`) | rosa suave e amarelo claro com branco | pediatria, saúde da mulher |

As cores vivem em tokens CSS no início de `assets/css/styles.css`: a predefinida em `:root` e nos blocos escuros, as
outras em `:root[data-palette=…]`, escolhidas nos círculos do rodapé (`assets/js/site.js`); o `<script>` no `<head>` de
cada página aplica a paleta guardada antes de a página aparecer. Os gradientes são misturados em OKLCH, com uma linha
antes para os navegadores que ainda não o suportam. Os cartões em destaque usam os tokens `--cartao-*`: pastel com texto
escuro no tema claro, tons fundos com texto a branco no escuro. O texto cumpre WCAG AA (≥ 4,5:1) em todas as paletas,
nos dois temas; as cores dos níveis de risco (`--sun`, `--coral`, `--danger`) são as mesmas em todas.

## Desenvolvimento

```bash
python3 -m http.server 8000   # abrir http://localhost:8000
npm test                      # testes da lógica e da integridade do site (Node 18+)
```

## Publicação (GitHub Pages)

O site é publicado pelo workflow `.github/workflows/pages.yml` a cada push para `main`
(também pode ser corrido à mão em *Actions → Deploy GitHub Pages → Run workflow*).
O workflow corre os testes e publica todo o repositório (página inicial, `sns/`, `sobre/`, `usf/`, todas as pastas
`calculadora-*/` e `assets/`), exceto `tests/`, `.github/`, `package.json` e este README.
Nos pull requests corre só os testes e a preparação do site, sem publicar.

Configuração única: em **Settings → Pages → Build and deployment**, escolher *Source: GitHub Actions*.

## Aviso

Informação de apoio. Não substitui a avaliação de um profissional de saúde.
