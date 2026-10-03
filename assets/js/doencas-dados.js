// Conteúdo das páginas de doenças, adaptado a cinco grupos etários.
// Sem DOM: é verificado em tests/doencas.test.mjs e desenhado por doencas.js.
//
// Cada grupo pode ter:
//   intro       — parágrafo de abertura
//   imagens     — [nome da ilustração (doencas-ilustracoes.js), legenda]
//   seccoes     — { ico, titulo, texto?, lista? }
//   curiosidade — «Sabias que…» (crianças)
//   mitos       — [mito, o que é verdade]
//   alerta      — { titulo, lista } — quando procurar ajuda
//   ligacoes    — calculadoras do site relacionadas ({ href, texto })
// As crianças dos 3 aos 5 anos só têm imagens com uma legenda curta.

export const GRUPOS = [
  { id: '3-5', nome: 'Crianças', idade: '3–5 anos', emoji: '🧸' },
  { id: '5-12', nome: 'Crianças', idade: '5–12 anos', emoji: '🎒' },
  { id: '13-17', nome: 'Adolescentes', idade: '13–17 anos', emoji: '🎧' },
  { id: '18-65', nome: 'Adultos', idade: '18–65 anos', emoji: '💼' },
  { id: '65+', nome: 'Séniores', idade: '65+ anos', emoji: '🌿' },
];

// Áreas para filtrar a grelha, pela ordem em que aparecem. Cada doença tem uma
// «categoria» (a etiqueta do cartão) e, às vezes, outras áreas em «tambem».
export const CATEGORIAS = [
  'Coração e vasos',
  'Oncologia',
  'Metabolismo',
  'Respiratório',
  'Cérebro e nervos',
  'Digestivo',
  'Ossos e articulações',
  'Saúde mental',
];

export const DOENCAS = [
  {
    id: 'diabetes',
    nome: 'Diabetes',
    emoji: '🩸',
    categoria: 'Metabolismo',
    palavras: 'açúcar glicemia insulina hipoglicemia',
    resumo: 'Quando há açúcar a mais no sangue, porque a insulina falta ou não funciona bem.',
    heroi: 'chave-celula',
    deco: 'gota',
    grupos: {
      '3-5': {
        imagens: [
          ['acucar-sangue', 'O sangue leva açúcar a todo o corpo'],
          ['chave-celula', 'A insulina é a chave que deixa entrar o açúcar'],
          ['glucometro', 'Uma picadinha no dedo mede o açúcar'],
          ['caneta', 'Algumas crianças precisam de insulina todos os dias'],
          ['prato', 'Fruta e legumes dão energia boa'],
          ['correr', 'Correr e brincar faz bem ao corpo'],
        ],
      },
      '5-12': {
        intro: 'A diabetes é quando fica açúcar a mais no sangue. Não se pega e não é culpa de ninguém!',
        imagens: [
          ['chave-celula', 'A insulina funciona como uma chave'],
          ['glucometro', 'Medir o açúcar no dedo ou com um sensor'],
          ['caneta', 'A insulina dá-se com uma caneta ou uma bomba'],
          ['prato', 'Comer a horas e de forma variada'],
        ],
        seccoes: [
          { ico: '🔑', titulo: 'O que é?', texto: 'A comida que comemos transforma-se em açúcar (glicose), que é a energia das nossas células. Para o açúcar entrar nas células é preciso uma chave: a insulina, feita por um órgão chamado pâncreas. Na diabetes, a chave falta ou não funciona bem, e o açúcar fica a passear no sangue.' },
          { ico: '❓', titulo: 'Porque acontece?', texto: 'Nas crianças, a mais comum é a diabetes tipo 1: o sistema de defesa do corpo engana-se e estraga as células que fazem insulina. Não acontece por comer doces e não se pega.' },
          { ico: '💪', titulo: 'Como se trata?', lista: ['Medir o açúcar várias vezes por dia', 'Dar insulina com caneta ou bomba', 'Comer a horas e contar os hidratos de carbono (pão, massa, arroz, fruta)', 'Fazer desporto e brincar como os amigos'] },
          { ico: '🧃', titulo: 'Açúcar baixo: o que fazer?', texto: 'Se te sentires a tremer, com suores, muita fome ou tonto, avisa logo um adulto. Um sumo ou um pacote de açúcar ajuda a ficar bem depressa.' },
        ],
        curiosidade: 'Há futebolistas profissionais e atletas olímpicos com diabetes tipo 1 — treinam e competem todos os dias!',
      },
      '13-17': {
        intro: 'A diabetes é uma doença crónica em que a glicose (açúcar) no sangue fica elevada. Com as ferramentas de hoje, dá para fazer praticamente tudo: desporto, viagens, saídas com os amigos.',
        imagens: [
          ['glucometro', 'Sensores e glucómetros mostram a glicose a cada momento'],
          ['prato', 'Contar hidratos ajuda a acertar a insulina'],
          ['correr', 'O exercício baixa a glicose — planeia antes'],
        ],
        seccoes: [
          { ico: '🧬', titulo: 'Tipo 1 e tipo 2', texto: 'Na tipo 1, o sistema imunitário destrói as células do pâncreas que produzem insulina, por isso é sempre preciso insulina. Na tipo 2, a insulina existe mas funciona mal (resistência à insulina); está ligada à genética, ao excesso de peso e ao sedentarismo e é cada vez mais frequente em jovens.' },
          { ico: '🚩', titulo: 'Sinais de alerta', lista: ['Muita sede e boca seca', 'Urinar muitas vezes, também à noite', 'Cansaço fora do normal', 'Perder peso sem razão', 'Visão turva'] },
          { ico: '🎒', titulo: 'No dia a dia', lista: ['Leva sempre açúcar de absorção rápida (pacotes de açúcar, sumo)', 'Diz aos amigos e professores o que fazer numa hipoglicemia', 'O álcool pode baixar a glicose várias horas depois: nunca bebas em jejum e mede antes de dormir', 'Stress, doença e crescimento mexem com a glicose — ajusta com a tua equipa de saúde'] },
        ],
        mitos: [
          ['Quem tem diabetes não pode comer doces.', 'Pode, com planeamento: o que conta é o total de hidratos e o ajuste da insulina.'],
          ['Comer muito açúcar causa diabetes tipo 1.', 'Não. A tipo 1 é autoimune. O excesso de peso aumenta o risco de tipo 2.'],
          ['A diabetes tipo 2 só aparece em adultos.', 'Aparece cada vez mais em adolescentes, sobretudo com excesso de peso e pouca atividade física.'],
        ],
        alerta: { titulo: 'Vai à urgência se…', lista: ['Vómitos ou dor de barriga com a glicose alta', 'Respiração rápida ou hálito com cheiro a fruta (pode ser cetoacidose)', 'Confusão, sonolência extrema ou desmaio'] },
      },
      '18-65': {
        intro: 'A diabetes afeta mais de 1 em cada 10 adultos em Portugal, e muitos ainda não sabem que a têm. Detetada cedo e bem controlada, evita complicações nos olhos, nos rins, nos nervos, no coração e no cérebro.',
        imagens: [
          ['chave-celula', 'Na tipo 2, a insulina existe, mas o corpo responde-lhe mal'],
          ['prato', 'Metade do prato com legumes'],
          ['correr', '150 minutos de atividade física por semana'],
        ],
        seccoes: [
          { ico: '🩸', titulo: 'O que é', texto: 'Doença crónica em que a glicose no sangue se mantém elevada. A tipo 2 é a mais comum (cerca de 9 em cada 10 casos) e resulta da resistência à insulina e da sua produção insuficiente. Existem também a tipo 1, a diabetes gestacional e a pré-diabetes, um estado intermédio em que ainda é possível evitar a doença.' },
          { ico: '⚖️', titulo: 'Fatores de risco', lista: ['Excesso de peso, sobretudo gordura na barriga', 'Sedentarismo', 'Pais ou irmãos com diabetes', 'Diabetes na gravidez ou bebé com mais de 4 kg', 'Hipertensão ou colesterol elevado', 'Idade acima dos 45 anos'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'Glicemia em jejum igual ou superior a 126 mg/dL, hemoglobina glicada (HbA1c) igual ou superior a 6,5 % ou glicemia ocasional igual ou superior a 200 mg/dL com sintomas. Sem sintomas, o resultado confirma-se numa segunda análise.' },
          { ico: '🥗', titulo: 'Tratamento', lista: ['Alimentação equilibrada, com menos açúcares e farinhas refinadas', 'Atividade física regular (pelo menos 150 minutos por semana)', 'Perder 5 a 10 % do peso, se houver excesso', 'Medicamentos orais ou injetáveis e, quando necessário, insulina', 'Deixar de fumar'] },
          { ico: '📋', titulo: 'Vigilância', lista: ['HbA1c de 3 em 3 ou de 6 em 6 meses', 'Exame aos olhos (retinografia) e análise à urina (rins) todos os anos', 'Observação dos pés nas consultas', 'Controlo da tensão arterial e do colesterol'] },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Sede intensa, urinar muito ou perda de peso sem explicação', 'Hipoglicemias frequentes', 'Feridas nos pés que não cicatrizam', 'Formigueiro ou dormência nos pés'] },
        ligacoes: [
          { href: 'calculadora-rastreio/?calc=findrisc', texto: 'Calcular o risco de diabetes (FINDRISC)' },
          { href: 'calculadora-laboratorial/', texto: 'Converter a HbA1c em glicemia média' },
        ],
      },
      '65+': {
        intro: 'Depois dos 65 anos, a diabetes é muito frequente — cerca de 1 em cada 4 pessoas. O objetivo é viver bem: evitar açúcares muito altos e, sobretudo, os baixos.',
        imagens: [
          ['glucometro', 'Medir a glicose como o médico indicou'],
          ['pes', 'Ver os pés todos os dias'],
          ['comprimido', 'Medicação sempre à mesma hora'],
          ['bengala', 'Caminhar um pouco todos os dias'],
        ],
        seccoes: [
          { ico: '🎯', titulo: 'O essencial', texto: 'Nesta idade, as metas são ajustadas a cada pessoa. Uma hipoglicemia (açúcar baixo) pode causar quedas, confusão e problemas no coração, por isso o tratamento procura ser seguro, mais do que perfeito.' },
          { ico: '🗓️', titulo: 'Cuidados diários', lista: ['Não saltar refeições', 'Tomar a medicação à hora certa — uma caixa organizadora ajuda', 'Ver os pés todos os dias, com um espelho ou com ajuda', 'Usar meias sem costuras e sapatos confortáveis', 'Beber água ao longo do dia, mesmo sem sede'] },
          { ico: '🍬', titulo: 'Hipoglicemia: o que fazer', texto: 'Suores, tremores, fraqueza, confusão ou comportamento estranho podem ser açúcar baixo. Tome 15 g de açúcar (3 pacotes de açúcar dissolvidos em água ou meio copo de sumo), espere 15 minutos e volte a medir. Se não melhorar, repita e peça ajuda.' },
        ],
        alerta: { titulo: 'Peça ajuda se…', lista: ['Confusão ou sonolência súbitas', 'Quedas ou tonturas frequentes', 'Ferida, bolha ou mudança de cor num pé', 'Glicemias repetidamente acima de 300 mg/dL'] },
      },
    },
  },

  {
    id: 'cancro-mama',
    nome: 'Cancro da mama',
    emoji: '🎗️',
    categoria: 'Oncologia',
    palavras: 'mamografia nódulo caroço mama rastreio',
    resumo: 'Células da mama que crescem sem controlo. Descoberto cedo, a grande maioria das mulheres fica curada.',
    heroi: 'fita',
    deco: 'laco',
    grupos: {
      '3-5': {
        imagens: [
          ['celulas', 'Às vezes umas células crescem demais'],
          ['medico', 'Os médicos sabem tratar'],
          ['cama', 'Quem está a tratar fica cansado e descansa'],
          ['cabelo', 'O cabelo pode cair… e volta a crescer'],
          ['brincar', 'Não se pega: podes dar beijinhos e brincar'],
          ['abraco', 'Os teus abraços ajudam muito'],
        ],
      },
      '5-12': {
        intro: 'O cancro da mama é uma doença em que algumas células da mama começam a crescer de forma desarrumada. Acontece sobretudo em mulheres adultas.',
        imagens: [
          ['celulas', 'As células são os tijolos do corpo'],
          ['medico', 'Uma equipa de médicos trata a doença'],
          ['cabelo', 'Alguns tratamentos fazem cair o cabelo, que depois volta a crescer'],
          ['abraco', 'O carinho da família ajuda'],
        ],
        seccoes: [
          { ico: '🧱', titulo: 'O que é?', texto: 'O corpo é feito de milhões de células, como pequenos tijolos. Normalmente crescem e são substituídas com ordem. No cancro, algumas células crescem sem parar e formam um caroço, a que os médicos chamam tumor.' },
          { ico: '👩', titulo: 'Quem pode ter?', texto: 'Acontece sobretudo em mulheres adultas e mais velhas. Os homens também podem ter, mas é raro. Nas crianças é raríssimo.' },
          { ico: '🏥', titulo: 'Como se trata?', lista: ['Uma operação para tirar o caroço', 'Quimioterapia: medicamentos fortes que podem fazer cair o cabelo e cansar', 'Radioterapia: raios invisíveis que não doem', 'Comprimidos durante algum tempo'] },
          { ico: '💛', titulo: 'Como posso ajudar?', lista: ['Fazer desenhos e dar abraços', 'Fazer perguntas — não há perguntas parvas', 'Saber que não é culpa de ninguém, nem tua', 'Continuar a ir à escola e a brincar'] },
        ],
        curiosidade: 'Hoje, a grande maioria das mulheres a quem o cancro da mama é descoberto cedo fica curada.',
      },
      '13-17': {
        intro: 'É o cancro mais frequente nas mulheres em Portugal. Na tua idade é muito raro, mas os hábitos que crias agora contam para o futuro — e é possível que alguém próximo de ti passe por isto.',
        imagens: [
          ['celulas', 'Um tumor maligno é um conjunto de células que cresce sem controlo'],
          ['fita', 'O laço cor-de-rosa é o símbolo da luta contra o cancro da mama'],
          ['abraco', 'Falar sobre o que sentes ajuda'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'O que é', texto: 'Um tumor maligno que começa nas células da mama e que, se não for tratado, se pode espalhar a outras partes do corpo. Na adolescência, os caroços na mama são quase sempre benignos (como os fibroadenomas) ou alterações normais do crescimento.' },
          { ico: '🧬', titulo: 'Fatores de risco', lista: ['Idade (a maioria dos casos surge depois dos 50 anos)', 'Familiares próximos com cancro da mama ou do ovário (genes como o BRCA1 e o BRCA2)', 'Álcool e tabaco', 'Sedentarismo e excesso de peso'] },
          { ico: '🏃', titulo: 'O que protege desde já', lista: ['Mexer-te todos os dias', 'Não fumar e evitar o álcool', 'Comer de forma variada, com fruta e legumes', 'Conhecer o teu corpo e falar com o médico se notares algo diferente'] },
          { ico: '🫂', titulo: 'Se alguém da família tem', texto: 'É normal sentir medo, raiva, tristeza ou até nada. Falar ajuda — com a família, os amigos, um professor ou o médico de família. Podes perguntar o que quiseres sobre a doença e o tratamento.' },
        ],
        mitos: [
          ['Os desodorizantes e os soutiens com aros causam cancro.', 'Não há evidência científica disso.'],
          ['Só acontece a quem tem casos na família.', 'A maioria das mulheres com cancro da mama não tem história familiar.'],
          ['Os homens não têm cancro da mama.', 'É raro, mas acontece — cerca de 1 em cada 100 casos.'],
        ],
        alerta: { titulo: 'Fala com um adulto ou com o médico se…', lista: ['Notares um caroço que não desaparece depois da menstruação', 'A pele da mama ficar vermelha, quente ou repuxada', 'Sair líquido do mamilo sem o estares a apertar'] },
      },
      '18-65': {
        intro: 'O cancro da mama é o cancro mais frequente na mulher em Portugal. Quando é detetado cedo, mais de 9 em cada 10 mulheres estão vivas 5 anos depois. O rastreio e a atenção às mudanças fazem a diferença.',
        imagens: [
          ['autoexame', 'Conhecer as mamas e reparar em mudanças'],
          ['mamografia', 'Mamografia de 2 em 2 anos, dos 45 aos 74 anos'],
          ['celulas', 'Tratamento à medida de cada tumor'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais a vigiar', lista: ['Caroço ou endurecimento na mama ou na axila', 'Mudança no tamanho ou na forma da mama', 'Pele repuxada, com covinhas ou com aspeto de casca de laranja', 'Mamilo que se retrai ou deita líquido, sobretudo com sangue', 'Vermelhidão ou ferida que não passa'] },
          { ico: '🩻', titulo: 'Rastreio', texto: 'O SNS convida as mulheres dos 45 aos 74 anos a fazer mamografia de 2 em 2 anos (o programa foi alargado a partir dos 50–69 anos e o convite pode ainda não ter chegado a todas as regiões). Com familiares próximos afetados, fale com o médico: pode ter indicação para começar mais cedo ou para fazer testes genéticos.' },
          { ico: '⚖️', titulo: 'Fatores de risco', lista: ['Idade', 'História familiar e alterações genéticas (BRCA1, BRCA2)', 'Primeira menstruação precoce e menopausa tardia', 'Não ter filhos ou tê-los depois dos 30 anos', 'Álcool, sedentarismo e excesso de peso depois da menopausa', 'Terapêutica hormonal da menopausa prolongada'] },
          { ico: '🏥', titulo: 'Tratamento', texto: 'É decidido por uma equipa multidisciplinar e depende do tipo e do estádio do tumor: cirurgia (muitas vezes conservando a mama), radioterapia, quimioterapia, hormonoterapia e terapêuticas dirigidas. O apoio psicológico e a reabilitação fazem parte do tratamento.' },
          { ico: '🛡️', titulo: 'Prevenção', lista: ['Atividade física regular', 'Peso saudável', 'Pouco ou nenhum álcool', 'Amamentar, quando possível, também protege'] },
        ],
        alerta: { titulo: 'Marque consulta se…', lista: ['Notar um caroço novo, mesmo sem dor', 'A pele ou o mamilo mudarem de aspeto', 'Sair líquido com sangue pelo mamilo'] },
        ligacoes: [{ href: 'calculadora-plano-rastreios/', texto: 'Ver os rastreios recomendados para a sua idade' }],
      },
      '65+': {
        intro: 'O risco de cancro da mama aumenta com a idade — a maioria dos casos surge depois dos 50 anos. Continuar atenta e fazer o rastreio até aos 74 anos é importante.',
        imagens: [
          ['mamografia', 'Mamografia de 2 em 2 anos até aos 74 anos'],
          ['medico', 'Qualquer mudança na mama deve ser vista pelo médico'],
          ['comprimido', 'Muitas vezes o tratamento inclui comprimidos durante anos'],
          ['abraco', 'Não precisa de passar por isto sozinha'],
        ],
        seccoes: [
          { ico: '🩻', titulo: 'Rastreio', texto: 'Até aos 74 anos, o SNS convida para mamografia de 2 em 2 anos. Depois dessa idade, a decisão de continuar é tomada com o médico de família, conforme a saúde de cada pessoa.' },
          { ico: '🔍', titulo: 'Esteja atenta a', lista: ['Caroço na mama ou na axila', 'Pele da mama repuxada ou com aspeto diferente', 'Mamilo que se retrai ou deita líquido', 'Ferida na mama que não cicatriza'] },
          { ico: '💊', titulo: 'Tratamento', texto: 'O tratamento é adaptado à saúde geral e às preferências de cada mulher. Nos tumores mais comuns nesta idade (sensíveis às hormonas), a hormonoterapia em comprimidos é muito eficaz e costuma ser bem tolerada.' },
          { ico: '🤝', titulo: 'Apoio', texto: 'A família, o médico de família, a equipa de oncologia e as associações de doentes podem ajudar nas consultas, nos transportes e no dia a dia. Peça ajuda sempre que precisar.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Notar qualquer caroço novo', 'A mama mudar de forma, de cor ou de textura', 'Tiver dores nos ossos persistentes depois de um cancro da mama'] },
      },
    },
  },

  {
    id: 'hipertensao',
    nome: 'Hipertensão arterial',
    emoji: '❤️',
    categoria: 'Coração e vasos',
    palavras: 'tensão alta pressão arterial sal',
    resumo: 'Quando o sangue faz força a mais nas paredes das artérias. Não dá sintomas, por isso é preciso medir.',
    heroi: 'tensiometro',
    deco: 'manometro',
    grupos: {
      '3-5': {
        imagens: [
          ['coracao', 'O coração é uma bomba que empurra o sangue'],
          ['tensiometro', 'Uma braçadeira aperta o braço e mede a força'],
          ['sal', 'Menos sal na comida'],
          ['prato', 'Fruta e legumes todos os dias'],
          ['correr', 'Brincar e correr'],
          ['sono', 'Dormir bem'],
        ],
      },
      '5-12': {
        intro: 'A pressão arterial é a força com que o sangue empurra as paredes dos tubos por onde passa — as artérias. Quando essa força está sempre alta, chama-se hipertensão.',
        imagens: [
          ['coracao', 'O coração bate cerca de 100 mil vezes por dia'],
          ['tensiometro', 'Medir a tensão não dói: só aperta um bocadinho'],
          ['sal', 'O sal escondido nas batatas fritas e nas bolachas também conta'],
          ['correr', 'Mexer o corpo mantém o coração forte'],
        ],
        seccoes: [
          { ico: '🚿', titulo: 'O que é?', texto: 'Imagina uma mangueira: se a água passar com muita força durante muito tempo, a mangueira estraga-se. Com as artérias é igual. A tensão alta obriga o coração a trabalhar mais e pode cansar o coração, o cérebro, os rins e os olhos.' },
          { ico: '🤫', titulo: 'Uma doença silenciosa', texto: 'Quase sempre não dói nem se sente nada. Por isso os médicos medem a tensão nas consultas — também às crianças, a partir dos 3 anos.' },
          { ico: '🥦', titulo: 'Como manter a tensão boa', lista: ['Comer pouco sal e poucos snacks salgados', 'Comer fruta e legumes', 'Brincar ao ar livre e fazer desporto', 'Dormir bem', 'Beber água em vez de refrigerantes'] },
        ],
        curiosidade: 'Se juntássemos todas as artérias, veias e vasos pequeninos de um adulto, davam mais de duas voltas à Terra!',
      },
      '13-17': {
        intro: 'A hipertensão não é só coisa de avós: 3 a 4 em cada 100 adolescentes têm tensão alta, sobretudo quem tem excesso de peso. A boa notícia é que os hábitos fazem muita diferença.',
        imagens: [
          ['tensiometro', 'A tensão tem dois números: a máxima e a mínima'],
          ['sal', 'A maior parte do sal vem de alimentos processados'],
          ['correr', '60 minutos de atividade física por dia'],
        ],
        seccoes: [
          { ico: '🔢', titulo: 'Os dois números', texto: 'A máxima (sistólica) é a pressão quando o coração contrai; a mínima (diastólica), quando relaxa. A partir dos 13 anos, considera-se hipertensão a partir de 130/80 mmHg, confirmada em várias medições.' },
          { ico: '⚠️', titulo: 'O que a faz subir', lista: ['Excesso de peso', 'Muito sal (snacks, fast food, enlatados)', 'Bebidas energéticas e muita cafeína', 'Sedentarismo e poucas horas de sono', 'Tabaco, vape e álcool', 'Alguns medicamentos, como a pílula ou os descongestionantes nasais'] },
          { ico: '✅', titulo: 'O que ajuda', lista: ['Pelo menos 60 minutos de atividade por dia', 'Trocar snacks salgados por fruta ou frutos secos sem sal', 'Água em vez de refrigerantes e energéticas', 'Dormir 8 a 10 horas'] },
        ],
        mitos: [
          ['Se tivesse a tensão alta, sentia.', 'Quase nunca dá sintomas. A única forma de saber é medir.'],
          ['Os jovens não têm tensão alta.', 'Têm, sobretudo com excesso de peso, e a tensão alta na adolescência tende a continuar na idade adulta.'],
          ['O sal marinho ou o sal dos Himalaias é mais saudável.', 'Todos têm praticamente o mesmo sódio. O que conta é a quantidade.'],
        ],
        alerta: { titulo: 'Procura ajuda urgente se…', lista: ['Dor de cabeça muito forte e súbita', 'Visão turva, confusão ou dificuldade em falar', 'Dor no peito ou falta de ar'] },
      },
      '18-65': {
        intro: 'Em Portugal, mais de 1 em cada 3 adultos tem hipertensão, e muitos não sabem. É o principal fator de risco para o AVC, que continua a ser uma das primeiras causas de morte no país.',
        imagens: [
          ['tensiometro', 'Medir em repouso, sentado, com o braço apoiado'],
          ['sal', 'Menos de 5 g de sal por dia — uma colher de chá'],
          ['correr', '30 minutos de caminhada, 5 dias por semana'],
        ],
        seccoes: [
          { ico: '🩺', titulo: 'Valores', texto: 'Há hipertensão quando a tensão medida na consulta é igual ou superior a 140/90 mmHg em várias ocasiões (ou 135/85 mmHg na média das medições em casa). Valores entre 120/70 e 139/89 mmHg já merecem atenção.' },
          { ico: '⚠️', titulo: 'Fatores de risco', lista: ['Sal em excesso', 'Excesso de peso e sedentarismo', 'Álcool e tabaco', 'Familiares com hipertensão', 'Stress e pouco sono', 'Apneia do sono, doença renal ou alguns medicamentos (anti-inflamatórios, descongestionantes)'] },
          { ico: '🏠', titulo: 'Medir em casa', lista: ['Use um aparelho de braço validado', 'Descanse 5 minutos, sentado, com as costas apoiadas e as pernas descruzadas', 'Faça 2 medições de manhã e 2 à noite, durante 7 dias, e leve os registos à consulta', 'Não meça logo depois de café, tabaco ou exercício'] },
          { ico: '💊', titulo: 'Tratamento', texto: 'As mudanças no estilo de vida baixam a tensão de forma significativa: menos sal, mais fruta e legumes, atividade física, perder peso e moderar o álcool. Quando não chega, há medicamentos eficazes e seguros — muitas vezes dois num só comprimido. Não devem ser parados sem falar com o médico.' },
        ],
        alerta: { titulo: 'Ligue 112 se…', lista: ['Boca ao lado, fraqueza num braço ou dificuldade em falar (sinais de AVC)', 'Dor no peito forte ou falta de ar', 'Tensão acima de 180/120 mmHg com dor de cabeça intensa, visão turva ou confusão'] },
        ligacoes: [{ href: 'calculadora-risco-cardiovascular/', texto: 'Calcular o risco cardiovascular (SCORE2)' }],
      },
      '65+': {
        intro: 'Depois dos 65 anos, cerca de 7 em cada 10 pessoas têm hipertensão. Tratá-la protege do AVC, do enfarte, da demência e da insuficiência cardíaca.',
        imagens: [
          ['tensiometro', 'Medir a tensão com regularidade'],
          ['comprimido', 'Os comprimidos tomam-se todos os dias, mesmo sem sintomas'],
          ['sal', 'Ervas aromáticas em vez de sal'],
          ['bengala', 'Caminhar todos os dias'],
        ],
        seccoes: [
          { ico: '💊', titulo: 'A medicação', lista: ['Tome-a à mesma hora todos os dias', 'Não pare nem altere a dose sem falar com o médico', 'Leve a lista de todos os medicamentos às consultas', 'Evite anti-inflamatórios sem indicação médica: sobem a tensão e cansam os rins'] },
          { ico: '😵‍💫', titulo: 'Cuidado com as tonturas', texto: 'Alguns medicamentos podem baixar a tensão ao levantar. Levante-se devagar: primeiro sente-se na cama, espere um pouco e só depois se ponha de pé. Se tiver tonturas frequentes, fale com o médico.' },
          { ico: '🧂', titulo: 'Menos sal, mais sabor', texto: 'Use alho, cebola, limão, louro, salsa e coentros para temperar. Atenção ao sal escondido no pão, nos enchidos, no bacalhau mal demolhado, nas sopas de pacote e nos queijos.' },
        ],
        alerta: { titulo: 'Ligue 112 se…', lista: ['Boca ao lado, fraqueza de um lado do corpo ou dificuldade em falar', 'Dor no peito ou falta de ar súbita', 'Dor de cabeça muito forte e diferente do habitual'] },
      },
    },
  },

  {
    id: 'artroses',
    nome: 'Artroses',
    emoji: '🦴',
    categoria: 'Ossos e articulações',
    palavras: 'artrose joelho anca mãos dor articulações cartilagem',
    resumo: 'Desgaste da cartilagem das articulações, que causa dor e rigidez. O movimento faz parte do tratamento.',
    heroi: 'joelho',
    deco: 'joelho',
    grupos: {
      '3-5': {
        imagens: [
          ['joelho', 'Os joelhos dobram como uma dobradiça'],
          ['cartilagem', 'Lá dentro há uma almofadinha que se pode gastar'],
          ['bengala', 'Alguns avós têm dores nos joelhos ou nas mãos'],
          ['calor', 'O calor ajuda a aliviar a dor'],
          ['nadar', 'Nadar e mexer faz bem às articulações'],
          ['abraco', 'Podes ajudar o avô ou a avó com carinho'],
        ],
      },
      '5-12': {
        intro: 'As articulações são os sítios onde os ossos se juntam e dobram, como os joelhos, as ancas e os dedos. A artrose acontece quando a «almofada» entre os ossos se vai gastando.',
        imagens: [
          ['joelho', 'As articulações deixam dobrar e esticar'],
          ['cartilagem', 'A cartilagem é uma almofada lisa e escorregadia'],
          ['nadar', 'Nadar e andar de bicicleta são ótimos para as articulações'],
          ['calor', 'Um saco de água quente alivia a rigidez'],
        ],
        seccoes: [
          { ico: '🦴', titulo: 'O que é?', texto: 'As pontas dos ossos estão cobertas por cartilagem, uma camada lisa que funciona como almofada e deixa os ossos deslizar sem raspar. Com os anos e o uso, a cartilagem fica mais fina e a articulação pode doer, inchar e ficar perra.' },
          { ico: '👵', titulo: 'Quem tem?', texto: 'É muito comum nos avós. Não se pega e as crianças quase nunca têm artrose. Os joelhos, as ancas, as mãos e a coluna são os sítios mais afetados.' },
          { ico: '🚲', titulo: 'O que ajuda?', lista: ['Mexer o corpo: caminhar, nadar, pedalar', 'Fazer exercícios para os músculos ficarem fortes e protegerem a articulação', 'Manter um peso saudável', 'Calor, descanso quando dói e, às vezes, medicamentos'] },
          { ico: '🤝', titulo: 'Como posso ajudar?', lista: ['Ir passear com os avós ao ritmo deles', 'Ajudar a carregar coisas pesadas', 'Jogar às cartas e a jogos de mãos — também são exercício para os dedos'] },
        ],
        curiosidade: 'A cartilagem não tem vasos sanguíneos: alimenta-se do líquido da articulação, que entra e sai quando nos mexemos, como numa esponja. Por isso o movimento é tão importante!',
      },
      '13-17': {
        intro: 'A artrose é rara na tua idade, mas as articulações que tens hoje são as que vais usar a vida toda. Lesões no desporto mal tratadas e o excesso de peso são os maiores riscos para o futuro.',
        imagens: [
          ['cartilagem', 'Cartilagem saudável e cartilagem gasta'],
          ['joelho', 'Joelhos e ancas suportam o peso do corpo'],
          ['correr', 'Músculos fortes protegem as articulações'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'O que é', texto: 'Uma doença de toda a articulação: a cartilagem fica mais fina, o osso por baixo reage e forma pequenos bicos (osteófitos), e a membrana que reveste a articulação pode inflamar. O resultado é dor, rigidez e menos movimento.' },
          { ico: '⚽', titulo: 'Protege as tuas articulações', lista: ['Aquece antes do desporto e aprende a técnica correta', 'Leva a sério as entorses e as lesões do joelho (como as dos ligamentos e dos meniscos) e faz a reabilitação até ao fim', 'Treina força e equilíbrio', 'Mantém um peso saudável'] },
          { ico: '🦵', titulo: 'Dor nas articulações nesta idade', texto: 'As dores nos joelhos em adolescentes desportistas são geralmente de sobrecarga ou do crescimento, não de artrose. Se uma articulação inchar sem razão, ficar quente ou estiver rígida de manhã durante muito tempo, fala com o médico — pode ser outra doença, como uma artrite.' },
        ],
        mitos: [
          ['Estalar os dedos dá artrose.', 'Os estudos não mostram essa relação. O estalido é só uma bolha de gás no líquido da articulação.'],
          ['Correr estraga os joelhos.', 'Em quem corre por lazer, a corrida não aumenta o risco de artrose e até fortalece a articulação.'],
          ['A artrose é só desgaste da idade.', 'A idade conta, mas as lesões, o peso, a genética e a falta de força muscular também.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Uma articulação inchar sem teres batido', 'Coxeares ou tiveres uma dor na anca ou no joelho que não passa', 'Tiveres rigidez de manhã que dura mais de meia hora'] },
      },
      '18-65': {
        intro: 'A artrose é a doença das articulações mais comum e uma das principais causas de dor e incapacidade. Começa geralmente depois dos 40–50 anos e afeta sobretudo joelhos, ancas, mãos e coluna.',
        imagens: [
          ['cartilagem', 'A cartilagem perde espessura e a articulação inflama'],
          ['halteres', 'O exercício de fortalecimento é o tratamento mais eficaz'],
          ['balanca', 'Cada quilo a menos alivia os joelhos'],
        ],
        seccoes: [
          { ico: '🦵', titulo: 'Sintomas', lista: ['Dor que piora com o uso e alivia com o repouso', 'Rigidez ao acordar ou depois de estar parado, que passa em menos de 30 minutos', 'Estalidos e sensação de areia na articulação', 'Inchaço e deformação (nos dedos, os nódulos de Heberden)', 'Menos amplitude de movimento'] },
          { ico: '⚠️', titulo: 'Fatores de risco', lista: ['Idade e sexo feminino', 'Excesso de peso', 'Lesões e cirurgias anteriores', 'Trabalhos com cargas ou de joelhos', 'Genética', 'Fraqueza muscular'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'É sobretudo clínico: a história e o exame da articulação chegam na maioria dos casos. A radiografia ajuda, mas o que se vê nem sempre corresponde à dor que se sente.' },
          { ico: '🏋️', titulo: 'Tratamento', lista: ['Exercício: fortalecimento muscular e atividade aeróbia (caminhar, bicicleta, hidroginástica)', 'Perder peso: perder 5 a 10 % já reduz a dor nos joelhos', 'Calor local e fisioterapia', 'Anti-inflamatórios em gel; em comprimido, só por pouco tempo e com indicação médica', 'Infiltrações e, em casos avançados, prótese'] },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Articulação muito inchada, quente e vermelha, ou com febre', 'Rigidez matinal superior a uma hora (pode ser uma artrite inflamatória)', 'Dor que não deixa dormir ou que impede de caminhar'] },
        ligacoes: [{ href: 'calculadora-imc-asc/', texto: 'Calcular o IMC' }],
      },
      '65+': {
        intro: 'A maioria das pessoas com mais de 65 anos tem sinais de artrose em pelo menos uma articulação. A dor pode ser controlada e o movimento é o melhor remédio.',
        imagens: [
          ['bengala', 'A bengala vai na mão do lado contrário à perna que dói'],
          ['nadar', 'Hidroginástica: exercício sem peso nas articulações'],
          ['calor', 'Calor para a rigidez da manhã'],
          ['halteres', 'Exercícios de força e equilíbrio previnem quedas'],
        ],
        seccoes: [
          { ico: '🚶', titulo: 'Manter-se em movimento', lista: ['Caminhar todos os dias, ao seu ritmo', 'Hidroginástica, bicicleta estática, tai chi', 'Exercícios de força para as pernas (por exemplo, sentar e levantar da cadeira)', 'Alternar períodos de atividade com descanso'] },
          { ico: '🏠', titulo: 'Facilitar o dia a dia', lista: ['Cadeiras e sanita mais altas', 'Barras de apoio na casa de banho', 'Sapatos confortáveis com sola antiderrapante', 'Utensílios de cabo grosso para as mãos'] },
          { ico: '💊', titulo: 'Medicamentos com cuidado', texto: 'Os anti-inflamatórios em comprimido podem fazer mal ao estômago, aos rins e ao coração, sobretudo nesta idade. Prefira os géis aplicados na pele e fale sempre com o médico ou o farmacêutico antes de tomar algo novo.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Uma articulação ficar de repente muito inchada, quente ou vermelha', 'A dor não o deixar dormir', 'Tiver quedas ou medo de cair'] },
      },
    },
  },

  {
    id: 'depressao',
    nome: 'Depressão',
    emoji: '🌦️',
    categoria: 'Saúde mental',
    palavras: 'tristeza humor ansiedade suicídio pós-parto',
    resumo: 'Uma tristeza que não passa e tira a vontade de fazer as coisas. É uma doença, tem tratamento e pedir ajuda é um ato de coragem.',
    heroi: 'nuvem-sol',
    deco: 'nuvem',
    grupos: {
      '3-5': {
        imagens: [
          ['nuvem-sol', 'Às vezes os crescidos ficam tristes muito tempo'],
          ['conversa', 'Falar sobre o que sentimos ajuda'],
          ['medico', 'Os médicos ajudam a ficar melhor'],
          ['abraco', 'Um abraço faz bem'],
          ['coracao', 'Não é culpa tua — gostam muito de ti'],
          ['sono', 'Dormir bem ajuda a ficar alegre'],
        ],
      },
      '5-12': {
        intro: 'Todos ficamos tristes às vezes, e isso é normal. A depressão é diferente: é uma tristeza que dura muito tempo, tira a vontade de brincar e deixa o corpo e a cabeça cansados.',
        imagens: [
          ['nuvem-sol', 'A depressão é como uma nuvem que não sai do lugar'],
          ['conversa', 'Contar a alguém de confiança'],
          ['correr', 'Brincar ao ar livre ajuda o humor'],
          ['sono', 'Dormir bem é importante para o cérebro'],
        ],
        seccoes: [
          { ico: '🌧️', titulo: 'O que é?', texto: 'É uma doença que afeta a forma como pensamos e sentimos. Quem tem depressão pode andar triste ou irritado, deixar de gostar das coisas de que gostava, ter dificuldade em dormir ou em concentrar-se na escola.' },
          { ico: '🧠', titulo: 'Porque acontece?', texto: 'Pode acontecer por muitas razões juntas: coisas difíceis (como uma perda ou problemas em casa ou na escola), a forma como o cérebro funciona e até a família de onde vimos. Nunca é culpa de quem a tem.' },
          { ico: '🗣️', titulo: 'O que fazer?', lista: ['Contar a um adulto de confiança: pais, avós, professor ou médico', 'Fazer coisas de que gostas, mesmo que te apeteça pouco', 'Brincar e mexer o corpo', 'Lembrar que a depressão tem tratamento e passa'] },
          { ico: '👨‍👩‍👧', titulo: 'Se for alguém da família', texto: 'Quando um adulto da família está com depressão, pode parecer distante ou sem paciência. Não é culpa tua e não deixou de gostar de ti. Os médicos estão a ajudar.' },
        ],
        curiosidade: 'Rir, brincar e fazer exercício fazem o cérebro libertar substâncias que nos ajudam a sentir bem, como as endorfinas.',
      },
      '13-17': {
        intro: 'A depressão é comum na adolescência — afeta cerca de 1 em cada 10 jovens até aos 18 anos. Não é fraqueza nem «fase»: é uma doença, e tem tratamento.',
        imagens: [
          ['nuvem-sol', 'Os sintomas duram semanas, não são só dias maus'],
          ['conversa', 'Falar com alguém é o primeiro passo'],
          ['telefone', 'Há linhas de apoio gratuitas e confidenciais'],
        ],
        seccoes: [
          { ico: '🧩', titulo: 'Sinais', lista: ['Tristeza, vazio ou irritabilidade quase todos os dias', 'Perder o interesse pelas coisas de que gostavas', 'Dormir muito mais ou muito menos', 'Alterações do apetite', 'Cansaço, dificuldade de concentração, notas a descer', 'Isolar-te dos amigos', 'Pensamentos de que não vales nada ou de morte'] },
          { ico: '📱', titulo: 'O que pode ajudar', lista: ['Falar com alguém de confiança ou com o médico de família', 'Rotinas de sono regulares, com o telemóvel longe da cama', 'Exercício físico: tem efeito comprovado no humor', 'Evitar álcool e drogas, que pioram a depressão', 'Psicoterapia e, em alguns casos, medicação'] },
          { ico: '🫶', titulo: 'Se um amigo não está bem', texto: 'Ouve sem julgar, diz que estás preocupado e incentiva-o a falar com um adulto. Se falar em fazer mal a si próprio, não guardes segredo: conta logo a um adulto.' },
        ],
        mitos: [
          ['Falar sobre suicídio dá a ideia a alguém.', 'Falar abertamente reduz o risco e ajuda a pessoa a procurar ajuda.'],
          ['Depressão é falta de força de vontade.', 'É uma doença com causas biológicas, psicológicas e sociais.'],
          ['Os antidepressivos mudam a personalidade.', 'Bem indicados e acompanhados, ajudam a pessoa a voltar a sentir-se ela própria.'],
        ],
        alerta: { titulo: 'Pede ajuda já', lista: ['Se pensares em fazer mal a ti próprio ou em morrer: liga 112', 'SNS 24 (808 24 24 24): opção de aconselhamento psicológico', 'SOS Criança (116 111): linha gratuita para crianças e jovens'] },
      },
      '18-65': {
        intro: 'A depressão é uma das doenças mais frequentes e uma das principais causas de incapacidade, e Portugal está entre os países europeus com mais casos. Tem tratamento eficaz — e quanto mais cedo começar, melhor.',
        imagens: [
          ['nuvem-sol', 'Humor deprimido ou perda de interesse durante pelo menos 2 semanas'],
          ['conversa', 'A psicoterapia é tão eficaz como a medicação nos casos ligeiros a moderados'],
          ['correr', 'O exercício regular melhora os sintomas'],
        ],
        seccoes: [
          { ico: '🧩', titulo: 'Sintomas', texto: 'Diagnostica-se quando vários destes sintomas duram pelo menos duas semanas e interferem com o dia a dia:', lista: ['Tristeza ou vazio a maior parte do dia', 'Perda de interesse ou de prazer', 'Cansaço e falta de energia', 'Alterações do sono e do apetite', 'Dificuldade de concentração e em tomar decisões', 'Sentimentos de culpa ou de inutilidade', 'Pensamentos de morte'] },
          { ico: '⚠️', titulo: 'Fatores de risco', lista: ['Episódios anteriores ou familiares com depressão', 'Acontecimentos difíceis: luto, desemprego, separação, dívidas', 'Doenças crónicas e dor', 'Pós-parto', 'Álcool e outras substâncias', 'Isolamento social'] },
          { ico: '💬', titulo: 'Tratamento', lista: ['Psicoterapia (por exemplo, terapia cognitivo-comportamental)', 'Antidepressivos: demoram 2 a 4 semanas a fazer efeito e mantêm-se pelo menos 6 meses depois da melhoria', 'Atividade física, sono regular e contacto social', 'Não parar a medicação de repente — reduzir sempre com o médico'] },
          { ico: '🤱', titulo: 'Depressão pós-parto', texto: 'Até 1 em cada 7 mães tem depressão nos meses a seguir ao parto. Não é o mesmo que a «tristeza pós-parto» dos primeiros dias, que passa sozinha. Se durar mais de duas semanas, fale com o médico ou com o enfermeiro de família.' },
        ],
        alerta: { titulo: 'Peça ajuda já', lista: ['Pensamentos de suicídio ou de se fazer mal: ligue 112', 'Apoio psicológico SNS 24: 808 24 24 24', 'SOS Voz Amiga: 213 544 545'] },
        ligacoes: [
          { href: 'calculadora-saude-mental/', texto: 'Questionário PHQ-9 (depressão)' },
          { href: 'calculadora-familia/', texto: 'Escala de Edimburgo (depressão pós-parto)' },
        ],
      },
      '65+': {
        intro: 'A depressão não é uma parte normal do envelhecimento. Nos mais velhos aparece muitas vezes disfarçada de cansaço, dores ou esquecimentos — e por isso passa despercebida.',
        imagens: [
          ['nuvem-sol', 'A tristeza que não passa merece atenção'],
          ['conversa', 'Conversar e conviver protege'],
          ['telefone', 'Telefonar a alguém todos os dias'],
          ['bengala', 'Sair de casa e caminhar'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Como se pode manifestar', lista: ['Desânimo e perda de interesse', 'Queixas de dores ou cansaço sem explicação', 'Esquecimentos e dificuldade de concentração', 'Dormir mal, perder o apetite e peso', 'Isolamento e deixar de sair de casa', 'Irritabilidade'] },
          { ico: '⚠️', titulo: 'Situações de risco', lista: ['Viuvez e solidão', 'Reforma e perda de papel social', 'Doenças crónicas, dor e perda de autonomia', 'Cuidar de um familiar doente'] },
          { ico: '💛', titulo: 'O que ajuda', lista: ['Manter rotinas e horários', 'Conviver: família, vizinhos, centro de dia, universidade sénior', 'Atividade física adaptada', 'Psicoterapia e/ou medicação, ajustada à idade'] },
        ],
        alerta: { titulo: 'Peça ajuda', lista: ['Se a pessoa falar em morrer ou em ser um peso: ligue 112', 'Conversa Amiga: 808 237 327 — escuta e companhia', 'Apoio psicológico SNS 24: 808 24 24 24'] },
        ligacoes: [{ href: 'calculadora-geriatria/', texto: 'Escala de depressão geriátrica (GDS-15)' }],
      },
    },
  },

  {
    id: 'dislipidemia',
    nome: 'Dislipidemia',
    alias: 'Colesterol elevado',
    emoji: '🫀',
    categoria: 'Coração e vasos',
    palavras: 'colesterol triglicerídeos LDL HDL gordura estatina',
    resumo: 'Gorduras a mais no sangue (colesterol e triglicerídeos) que se vão acumulando nas artérias, sem dar sinais.',
    heroi: 'arteria',
    deco: 'arteria',
    grupos: {
      '3-5': {
        imagens: [
          ['arteria', 'O sangue corre por tubinhos'],
          ['batatas', 'Fritos só de vez em quando'],
          ['prato', 'Fruta, legumes e peixe dão força'],
          ['correr', 'Correr e saltar ajuda o coração'],
          ['coracao', 'Assim o coração fica feliz'],
          ['agua', 'Água em vez de refrigerantes'],
        ],
      },
      '5-12': {
        intro: 'O colesterol é uma gordura de que o corpo precisa, mas na quantidade certa. Quando há colesterol a mais no sangue, ele vai-se colando às paredes das artérias, como o calcário nos canos.',
        imagens: [
          ['arteria', 'O colesterol a mais cola-se às paredes das artérias'],
          ['analise', 'Uma análise ao sangue mede o colesterol'],
          ['batatas', 'Menos fritos, bolos e salgados'],
          ['prato', 'Mais fruta, legumes, peixe e leguminosas'],
        ],
        seccoes: [
          { ico: '🧈', titulo: 'O que é o colesterol?', texto: 'É uma gordura que o fígado fabrica e que também vem de alguns alimentos. Serve para construir as células e fazer hormonas. Há o colesterol «mau» (LDL), que se cola às artérias, e o «bom» (HDL), que ajuda a limpá-las.' },
          { ico: '🧬', titulo: 'Porque fica alto?', texto: 'Por comer muitos alimentos gordos e açucarados e mexer pouco, mas também por herança da família. Há crianças que nascem com tendência para o colesterol alto, mesmo comendo bem: chama-se hipercolesterolemia familiar.' },
          { ico: '🔬', titulo: 'Como se descobre?', texto: 'Não se sente nada. Só uma análise ao sangue mostra o valor. Os médicos pedem esta análise às crianças sobretudo quando há pais ou avós com colesterol muito alto ou com problemas de coração cedo.' },
          { ico: '🥗', titulo: 'O que ajuda?', lista: ['Comer fruta, legumes, sopa, peixe, feijão e grão', 'Trocar fritos e bolos por lanches caseiros', 'Beber água em vez de refrigerantes', 'Brincar e fazer desporto todos os dias'] },
        ],
        curiosidade: 'O cérebro é o órgão com mais colesterol do corpo — cerca de um quarto de todo o colesterol está lá!',
      },
      '13-17': {
        intro: 'O colesterol alto não se sente, mas começa a deixar marcas nas artérias desde cedo. Cerca de 1 em cada 250 pessoas nasce com hipercolesterolemia familiar, e muitas não sabem.',
        imagens: [
          ['arteria', 'As placas de gordura estreitam as artérias'],
          ['analise', 'Análise ao sangue: colesterol total, LDL, HDL e triglicerídeos'],
          ['batatas', 'Fast food e snacks: muita gordura saturada'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'Os números', texto: 'Valores desejáveis em crianças e adolescentes:', lista: ['Colesterol total: abaixo de 170 mg/dL', 'LDL («mau»): abaixo de 110 mg/dL', 'HDL («bom»): acima de 45 mg/dL', 'Triglicerídeos: abaixo de 90 mg/dL'] },
          { ico: '🧬', titulo: 'Hipercolesterolemia familiar', texto: 'É uma doença genética em que o fígado não consegue retirar o LDL do sangue. O colesterol fica muito alto desde o nascimento e, sem tratamento, pode causar um enfarte antes dos 50 anos. Se um dos teus pais a tem, há 50 % de probabilidade de também a teres — e o tratamento desde a infância funciona muito bem.' },
          { ico: '🥗', titulo: 'Hábitos que contam', lista: ['Menos fast food, fritos, bolos e bolachas', 'Mais fibra: fruta, legumes, leguminosas, aveia', 'Frutos secos sem sal e azeite como gordura principal', 'Mexer-te pelo menos 60 minutos por dia', 'Não fumar nem vapear: baixa o HDL e estraga as artérias'] },
        ],
        mitos: [
          ['Quem é magro não tem colesterol alto.', 'Tem: a genética conta muito. A hipercolesterolemia familiar aparece em pessoas de todos os pesos.'],
          ['Os ovos são proibidos.', 'Para a maioria das pessoas, um ovo por dia num padrão alimentar saudável não é problema.'],
          ['O colesterol é sempre mau.', 'O corpo precisa dele. O problema é o excesso de LDL.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Os teus pais ou avós tiveram enfarte ou AVC cedo (antes dos 55 anos nos homens ou dos 65 nas mulheres)', 'Alguém na família tem colesterol muito alto', 'Notares pequenos altos amarelados na pele dos cotovelos, dos joelhos ou nos tendões'] },
      },
      '18-65': {
        intro: 'Mais de metade dos adultos portugueses tem o colesterol acima do recomendado. Não dá sintomas, mas é um dos principais fatores de risco para o enfarte e o AVC.',
        imagens: [
          ['arteria', 'O LDL acumula-se nas artérias e forma placas'],
          ['prato', 'Padrão alimentar mediterrânico'],
          ['correr', 'O exercício sobe o HDL e baixa os triglicerídeos'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'O que medir', texto: 'Uma análise ao sangue (perfil lipídico) mede o colesterol total, o LDL, o HDL e os triglicerídeos. O valor-alvo de LDL não é igual para todos: depende do risco cardiovascular de cada pessoa — quanto maior o risco, mais baixo deve ser o LDL.' },
          { ico: '🎯', titulo: 'Metas de LDL', lista: ['Risco baixo: abaixo de 116 mg/dL', 'Risco moderado: abaixo de 100 mg/dL', 'Risco alto: abaixo de 70 mg/dL', 'Risco muito alto (por exemplo, depois de um enfarte ou AVC): abaixo de 55 mg/dL'] },
          { ico: '⚠️', titulo: 'Causas e fatores', lista: ['Alimentação rica em gorduras saturadas (enchidos, carnes gordas, manteiga, bolos)', 'Sedentarismo e excesso de peso', 'Genética (hipercolesterolemia familiar)', 'Diabetes, hipotiroidismo e doença renal', 'Álcool em excesso (sobe os triglicerídeos)', 'Alguns medicamentos'] },
          { ico: '💊', titulo: 'Tratamento', texto: 'Primeiro, o estilo de vida: alimentação mediterrânica com azeite, peixe, leguminosas, fruta e legumes; menos gorduras saturadas e açúcares; exercício; deixar de fumar. Se o risco for elevado ou o LDL não baixar o suficiente, as estatinas são o tratamento de primeira linha — seguras e com benefício comprovado na prevenção do enfarte e do AVC.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['LDL igual ou superior a 190 mg/dL (pode ser hipercolesterolemia familiar)', 'Familiares com enfarte ou AVC precoces', 'Dores musculares intensas depois de começar uma estatina'] },
        ligacoes: [
          { href: 'calculadora-risco-cardiovascular/', texto: 'Calcular o risco cardiovascular (SCORE2)' },
          { href: 'calculadora-laboratorial/', texto: 'Calcular o LDL (fórmula de Friedewald)' },
        ],
      },
      '65+': {
        intro: 'Com a idade, o risco cardiovascular aumenta, e controlar o colesterol continua a proteger o coração e o cérebro. O tratamento é decidido caso a caso, com o médico.',
        imagens: [
          ['analise', 'Análises regulares, como o médico indicar'],
          ['comprimido', 'A estatina toma-se todos os dias'],
          ['prato', 'Azeite, peixe, legumes e leguminosas'],
          ['bengala', 'Caminhar todos os dias'],
        ],
        seccoes: [
          { ico: '💊', titulo: 'A medicação', lista: ['Tome a estatina todos os dias, à mesma hora', 'Não pare por conta própria: o benefício perde-se ao fim de pouco tempo', 'Avise o médico se tiver dores musculares fortes ou urina escura', 'Leve a lista de medicamentos às consultas — há interações a ter em conta'] },
          { ico: '🍽️', titulo: 'À mesa', lista: ['Azeite em vez de manteiga e banha', 'Peixe 2 a 3 vezes por semana (sardinha, cavala, carapau)', 'Sopa de legumes e leguminosas (feijão, grão, lentilhas)', 'Menos enchidos, queijos gordos e doces'] },
          { ico: '⚖️', titulo: 'Bom senso', texto: 'Nesta idade é importante não perder peso nem músculo sem querer. A alimentação deve ser variada e suficiente; as dietas muito restritivas podem fazer mais mal do que bem.' },
        ],
        alerta: { titulo: 'Ligue 112 se…', lista: ['Dor ou aperto no peito que não passa', 'Boca ao lado, fraqueza de um lado do corpo ou dificuldade em falar', 'Falta de ar súbita'] },
      },
    },
  },

  {
    id: 'amiotrofia',
    nome: 'Amiotrofia',
    emoji: '💪',
    categoria: 'Cérebro e nervos',
    palavras: 'músculos fraqueza sarcopenia atrofia ELA AME',
    resumo: 'Perda de volume e de força dos músculos, por falta de uso, pela idade ou por doenças dos nervos e dos músculos.',
    heroi: 'musculo',
    deco: 'braco',
    grupos: {
      '3-5': {
        imagens: [
          ['musculo', 'Os músculos dão força para brincar'],
          ['nervo', 'O cérebro manda recados aos músculos'],
          ['cama', 'Ficar muito tempo deitado deixa os músculos fraquinhos'],
          ['halteres', 'Os exercícios ajudam os músculos a ficar fortes'],
          ['cadeira-rodas', 'Alguns amigos andam de cadeira de rodas'],
          ['brincar', 'Todos podemos brincar juntos'],
        ],
      },
      '5-12': {
        intro: 'Amiotrofia quer dizer que os músculos ficaram mais pequenos e mais fracos. Pode acontecer por não se usarem — por exemplo, depois de uma perna engessada — ou por doenças dos nervos e dos músculos.',
        imagens: [
          ['musculo', 'Os músculos crescem quando trabalham'],
          ['nervo', 'Os nervos são os fios que levam as mensagens do cérebro'],
          ['halteres', 'A fisioterapia ajuda a recuperar a força'],
          ['cadeira-rodas', 'A cadeira de rodas ajuda a ir a todo o lado'],
        ],
        seccoes: [
          { ico: '💪', titulo: 'O que é?', texto: 'Temos mais de 600 músculos. Para funcionarem bem, precisam de ser usados e de receber mensagens do cérebro através dos nervos. Se ficam muito tempo parados, ou se os nervos não conseguem levar as mensagens, os músculos encolhem e perdem força.' },
          { ico: '❓', titulo: 'Porque acontece?', lista: ['Ficar muito tempo sem mexer uma parte do corpo (um gesso, uma doença que obriga a estar na cama)', 'Doenças dos nervos, como a atrofia muscular espinhal (AME)', 'Doenças dos próprios músculos, como as distrofias musculares'] },
          { ico: '🏊', titulo: 'O que ajuda?', lista: ['Fisioterapia e exercícios todos os dias', 'Natação e brincadeiras adaptadas', 'Comer bem, com proteína (peixe, carne, ovos, leguminosas, leite)', 'Hoje há medicamentos novos para algumas destas doenças, como a AME'] },
          { ico: '🤝', titulo: 'Colegas com doenças dos músculos', texto: 'Alguns colegas podem precisar de ajuda para andar, subir escadas ou usar uma cadeira de rodas. Não se pega! Podem brincar, aprender e ser teus amigos como toda a gente — às vezes só é preciso adaptar a brincadeira.' },
        ],
        curiosidade: 'Para o seu tamanho, um dos músculos mais fortes do corpo é o masséter — o músculo que usamos para mastigar!',
      },
      '13-17': {
        intro: 'Os músculos adaptam-se ao que lhes pedimos: crescem com o treino e encolhem com a inatividade. A amiotrofia é essa perda de massa muscular, que pode ter causas simples ou doenças que precisam de acompanhamento.',
        imagens: [
          ['musculo', 'Massa muscular: usa-a ou perde-a'],
          ['nervo', 'Nervo e músculo trabalham em equipa'],
          ['halteres', 'O treino de força adequado à idade é seguro'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'Causas', lista: ['Desuso: imobilização, lesões, longos períodos na cama — nota-se ao fim de poucas semanas', 'Doenças neuromusculares: atrofia muscular espinhal, distrofias musculares (como a de Duchenne)', 'Lesões de nervos', 'Alimentação insuficiente, incluindo nas perturbações do comportamento alimentar'] },
          { ico: '🏋️', titulo: 'Treino de força na adolescência', texto: 'Bem orientado, o treino de força é seguro e não «trava o crescimento». Melhora a força e os ossos e previne lesões. Começa com o peso do corpo e uma boa técnica, aumenta a carga aos poucos e descansa entre treinos.' },
          { ico: '🍳', titulo: 'Proteína sem exageros', texto: 'Uma alimentação variada chega para a maioria dos jovens que treinam. Os suplementos de proteína raramente são necessários e os anabolizantes são perigosos para o coração, o fígado e as hormonas.' },
        ],
        mitos: [
          ['O treino de força faz parar o crescimento.', 'Não há evidência disso quando é feito com supervisão e técnica correta.'],
          ['Quem anda de cadeira de rodas não pode fazer desporto.', 'Existe desporto adaptado de alta competição — e Portugal tem das melhores equipas do mundo de boccia!'],
          ['Músculo parado transforma-se em gordura.', 'São tecidos diferentes: o músculo encolhe e a gordura pode aumentar, mas um não se transforma no outro.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Perderes força sem razão, caíres muitas vezes ou tiveres dificuldade em subir escadas', 'Um músculo diminuir de tamanho só de um lado', 'Tiveres contrações musculares contínuas, com fraqueza'] },
      },
      '18-65': {
        intro: 'Amiotrofia é a diminuição do volume e da força dos músculos. A causa mais frequente é a falta de uso, mas pode ser o primeiro sinal de uma doença dos nervos ou dos músculos — por isso merece ser avaliada.',
        imagens: [
          ['musculo', 'Perde-se massa muscular em poucas semanas de inatividade'],
          ['nervo', 'As doenças dos nervos e do neurónio motor podem causar atrofia'],
          ['halteres', 'Exercício de força e proteína suficiente'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'Causas principais', lista: ['Desuso: imobilização, internamento, sedentarismo', 'Lesões de nervos (por exemplo, compressão de raízes na coluna ou síndrome do túnel cárpico avançada)', 'Doenças do neurónio motor, como a esclerose lateral amiotrófica (ELA)', 'Polineuropatias, incluindo a polineuropatia amiloidótica familiar (paramiloidose ou «doença dos pezinhos»), mais frequente no Norte, sobretudo na Póvoa de Varzim e em Vila do Conde', 'Miopatias e distrofias musculares', 'Desnutrição, doenças crónicas e corticoides em doses altas'] },
          { ico: '🩺', titulo: 'Sinais que pedem avaliação', lista: ['Fraqueza progressiva (deixar cair objetos, tropeçar, dificuldade em levantar-se)', 'Atrofia num só membro ou só de um lado', 'Fasciculações (pequenas contrações sob a pele) com fraqueza', 'Alterações da sensibilidade, formigueiros', 'Dificuldade em engolir ou em falar'] },
          { ico: '🔍', titulo: 'Diagnóstico', texto: 'Começa pela consulta e pelo exame neurológico. Conforme a suspeita, podem ser pedidas análises (incluindo a enzima muscular CK), eletromiografia, ressonância magnética, testes genéticos ou biópsia muscular.' },
          { ico: '🏋️', titulo: 'Tratamento', texto: 'Depende da causa. Em todos os casos, a reabilitação (fisioterapia e exercício de força progressivo) e uma alimentação com proteína suficiente ajudam a preservar o músculo. Algumas doenças, como a paramiloidose e a atrofia muscular espinhal, têm hoje tratamentos que travam a progressão.' },
        ],
        alerta: { titulo: 'Procure o médico rapidamente se…', lista: ['Fraqueza que agrava em dias ou semanas', 'Dificuldade em engolir, falar ou respirar', 'Fraqueza súbita de um lado do corpo: ligue 112 (pode ser um AVC)'] },
      },
      '65+': {
        intro: 'A partir dos 50 anos perde-se, em média, cerca de 1 % de massa muscular por ano. Quando essa perda é grande e tira força, chama-se sarcopenia — e aumenta o risco de quedas e de perda de autonomia. A boa notícia: os músculos respondem ao exercício em qualquer idade.',
        imagens: [
          ['halteres', 'Exercícios de força 2 a 3 vezes por semana'],
          ['prato', 'Proteína em todas as refeições'],
          ['bengala', 'Caminhar todos os dias'],
          ['cama', 'Depois de um internamento, levantar cedo e mexer'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais de alerta', lista: ['Dificuldade em levantar-se da cadeira sem a ajuda dos braços', 'Andar mais devagar', 'Dificuldade em abrir frascos ou carregar sacos', 'Quedas ou desequilíbrios', 'Perda de peso sem querer'] },
          { ico: '🏋️', titulo: 'Exercícios simples em casa', lista: ['Sentar e levantar da cadeira, 10 vezes', 'Pôr-se em bicos de pés, apoiado numa bancada', 'Levantar garrafas de água como pesos', 'Marchar no lugar', 'Sempre com um apoio por perto — e parar se houver dor ou falta de ar'] },
          { ico: '🍳', titulo: 'Comer para ter força', lista: ['Proteína em todas as refeições: ovos, peixe, carne, leguminosas, leite, iogurte, queijo', 'Não saltar refeições', 'Vitamina D: um pouco de sol e, se o médico indicar, suplemento', 'Se o apetite for pouco, refeições pequenas e mais vezes'] },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['A força diminuir depressa', 'Tiver quedas repetidas', 'Tiver dificuldade em engolir', 'Perder peso sem explicação'] },
        ligacoes: [{ href: 'calculadora-geriatria/', texto: 'Avaliação geriátrica (TUG, MNA-SF e outras escalas)' }],
      },
    },
  },

  {
    id: 'pneumonia',
    nome: 'Pneumonia',
    emoji: '🫁',
    categoria: 'Respiratório',
    palavras: 'infeção pulmões febre tosse pneumococo',
    resumo: 'Infeção dos pulmões por vírus ou bactérias, que causa febre, tosse e dificuldade em respirar. As vacinas ajudam a prevenir.',
    heroi: 'germes-pulmoes',
    deco: 'pulmoes',
    grupos: {
      '3-5': {
        imagens: [
          ['germes-pulmoes', 'Os micróbios podem entrar nos pulmões'],
          ['tosse', 'A pneumonia dá tosse'],
          ['termometro', 'E febre'],
          ['cama', 'Descansar ajuda a ficar bom'],
          ['lavar-maos', 'Lavar as mãos afasta os micróbios'],
          ['vacina', 'As vacinas protegem'],
        ],
      },
      '5-12': {
        intro: 'A pneumonia é uma infeção nos pulmões, os órgãos que usamos para respirar. Acontece quando micróbios — vírus ou bactérias — chegam lá e os pulmões ficam inflamados.',
        imagens: [
          ['pulmoes', 'Os pulmões enchem-se de ar como balões'],
          ['germes-pulmoes', 'Os micróbios inflamam os pulmões'],
          ['termometro', 'Febre, tosse e cansaço'],
          ['cotovelo', 'Tossir para o cotovelo protege os outros'],
        ],
        seccoes: [
          { ico: '🫁', titulo: 'O que é?', texto: 'Dentro dos pulmões há milhões de saquinhos de ar, os alvéolos, onde o oxigénio passa para o sangue. Na pneumonia, alguns destes saquinhos enchem-se de líquido por causa da infeção, e fica mais difícil respirar.' },
          { ico: '🤒', titulo: 'Como se sente?', lista: ['Febre e arrepios', 'Tosse, às vezes com expetoração', 'Respirar depressa ou com dificuldade', 'Dor no peito ou na barriga', 'Muito cansaço e pouca fome'] },
          { ico: '💊', titulo: 'Como se trata?', lista: ['Descansar e beber muitos líquidos', 'Medicamento para a febre', 'Antibiótico, quando é causada por bactérias — toma-se até ao fim', 'Às vezes é preciso ir ao hospital para ajudar a respirar'] },
          { ico: '🛡️', titulo: 'Como prevenir?', lista: ['Lavar as mãos muitas vezes', 'Tossir e espirrar para o cotovelo', 'Ter as vacinas em dia', 'Ar puro em casa: ninguém deve fumar perto das crianças'] },
        ],
        curiosidade: 'Se abríssemos todos os alvéolos dos pulmões e os estendêssemos no chão, cobriam uma área maior do que uma sala de aula!',
      },
      '13-17': {
        intro: 'A pneumonia é uma infeção do tecido dos pulmões. Nos adolescentes saudáveis costuma tratar-se bem em casa, mas é importante reconhecer os sinais de gravidade.',
        imagens: [
          ['germes-pulmoes', 'Vírus e bactérias são as causas mais comuns'],
          ['tosse', 'Tosse, febre e falta de ar'],
          ['cigarro', 'Fumar e vapear deixam os pulmões mais frágeis'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'Causas', texto: 'Nos jovens, são comuns o pneumococo e o Mycoplasma pneumoniae (que causa a «pneumonia atípica», mais arrastada, com tosse seca e cansaço), além de vírus como os da gripe e da COVID-19.' },
          { ico: '🚬', titulo: 'Pulmões mais vulneráveis', lista: ['Tabaco e vape irritam as vias respiratórias e enfraquecem as defesas', 'Asma mal controlada', 'Gripe recente', 'Álcool em excesso'] },
          { ico: '💊', titulo: 'Tratamento', lista: ['Antibiótico quando a causa provável é uma bactéria: toma-o até ao fim, mesmo que te sintas melhor', 'Descanso e muitos líquidos', 'Paracetamol ou ibuprofeno para a febre e as dores', 'Regressar ao desporto aos poucos, só quando estiveres sem febre e com energia'] },
        ],
        mitos: [
          ['Apanha-se pneumonia por andar de cabelo molhado ou ao frio.', 'A pneumonia é causada por micróbios. O frio não a provoca, embora no inverno circulem mais vírus.'],
          ['Os antibióticos curam qualquer pneumonia.', 'Só atuam nas bactérias. As pneumonias causadas por vírus não melhoram com antibiótico.'],
          ['Vapear é inofensivo para os pulmões.', 'O vapor tem substâncias que irritam e inflamam os pulmões.'],
        ],
        alerta: { titulo: 'Vai à urgência se…', lista: ['Tiveres falta de ar em repouso ou os lábios arroxeados', 'Sentires uma dor forte no peito ao respirar', 'Ficares confuso ou muito sonolento', 'A febre não baixar ao fim de 48 a 72 horas de antibiótico'] },
      },
      '18-65': {
        intro: 'A pneumonia é uma das infeções mais frequentes e uma importante causa de internamento em Portugal, sobretudo no inverno. Em adultos saudáveis, a maioria trata-se em casa.',
        imagens: [
          ['germes-pulmoes', 'O pneumococo é a bactéria mais frequente'],
          ['termometro', 'Febre, tosse, expetoração e dor ao respirar'],
          ['vacina', 'Vacinas contra a gripe, a COVID-19 e o pneumococo'],
        ],
        seccoes: [
          { ico: '🤒', titulo: 'Sintomas', lista: ['Febre e arrepios', 'Tosse com expetoração', 'Falta de ar', 'Dor no peito que agrava ao respirar fundo ou ao tossir', 'Cansaço e dores musculares'] },
          { ico: '⚠️', titulo: 'Maior risco', lista: ['Tabaco e álcool', 'Doenças crónicas: DPOC, asma, diabetes, doenças do coração, dos rins ou do fígado', 'Imunossupressão', 'Gripe recente', 'Dificuldade em engolir'] },
          { ico: '🩺', titulo: 'Diagnóstico e tratamento', texto: 'O diagnóstico baseia-se na observação e, muitas vezes, numa radiografia do tórax. A pontuação CURB-65 ajuda a decidir se o tratamento pode ser feito em casa. O antibiótico toma-se como prescrito; a melhoria costuma notar-se em 48 a 72 horas, mas o cansaço e a tosse podem durar semanas.' },
          { ico: '💉', titulo: 'Prevenção', lista: ['Vacina da gripe todos os anos, se tiver indicação', 'Vacina contra o pneumococo nas doenças crónicas, nos fumadores e a partir dos 65 anos', 'Deixar de fumar', 'Lavar as mãos e arejar a casa'] },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Falta de ar em repouso', 'Confusão', 'Lábios ou unhas arroxeados', 'Tensão baixa ou tonturas ao levantar', 'Febre que não melhora depois de 2 a 3 dias de antibiótico'] },
        ligacoes: [{ href: 'calculadora-urgencia/', texto: 'CURB-65 e outras escalas de urgência' }],
      },
      '65+': {
        intro: 'Depois dos 65 anos, a pneumonia é mais frequente e mais grave. Muitas vezes não dá febre alta: pode aparecer só como cansaço, falta de apetite, confusão ou quedas.',
        imagens: [
          ['vacina', 'Vacinas da gripe, da COVID-19 e do pneumococo'],
          ['termometro', 'Atenção, mesmo sem febre alta'],
          ['lavar-maos', 'Lavar as mãos com frequência'],
          ['agua', 'Beber água durante a doença'],
        ],
        seccoes: [
          { ico: '💉', titulo: 'Vacinas que protegem', lista: ['Gripe: todos os anos, no outono', 'COVID-19: conforme a campanha sazonal', 'Pneumococo: recomendada a partir dos 65 anos — pergunte no centro de saúde', 'Gratuitas no SNS nas idades e situações previstas pela DGS'] },
          { ico: '🔍', titulo: 'Sinais de alerta', lista: ['Confusão ou sonolência fora do habitual', 'Respiração rápida ou falta de ar', 'Tosse com expetoração', 'Perda de apetite, fraqueza, quedas', 'Febre ou, pelo contrário, temperatura baixa'] },
          { ico: '🏠', titulo: 'Recuperar em casa', lista: ['Tomar o antibiótico até ao fim, nas horas certas', 'Beber líquidos com frequência', 'Levantar-se e caminhar um pouco, mesmo cansado, para os pulmões trabalharem', 'Não fumar e evitar ambientes com fumo'] },
        ],
        alerta: { titulo: 'Ligue 112 ou vá à urgência se…', lista: ['Falta de ar em repouso ou lábios arroxeados', 'Confusão súbita', 'Não conseguir beber nem comer', 'Tensão baixa ou desmaio'] },
      },
    },
  },

  {
    id: 'avc',
    nome: 'AVC',
    alias: 'Acidente vascular cerebral',
    emoji: '🧠',
    categoria: 'Coração e vasos',
    tambem: ['Cérebro e nervos'],
    palavras: 'acidente vascular cerebral trombose derrame isquemia hemorragia via verde face força fala',
    resumo: 'Quando o sangue deixa de chegar a uma parte do cérebro. É uma emergência: ao primeiro sinal, ligue 112.',
    heroi: 'cerebro-avc',
    deco: 'cerebro',
    grupos: {
      '3-5': {
        imagens: [
          ['cerebro', 'O cérebro manda no corpo todo'],
          ['cerebro-avc', 'Às vezes o sangue não chega ao cérebro'],
          ['cara-torta', 'Se a boca do avô ficar torta…'],
          ['braco-cai', '…ou um braço ficar sem força…'],
          ['ligar-112', 'Pede ajuda a um adulto e liga 112'],
          ['abraco', 'Depois, os médicos e a família ajudam'],
        ],
      },
      '5-12': {
        intro: 'O AVC acontece quando uma parte do cérebro fica sem sangue — por um tubinho entupido ou por um tubinho que rebentou. É uma emergência, e tu podes ajudar a reconhecê-la!',
        imagens: [
          ['cerebro-avc', 'Sem sangue, as células do cérebro sofrem em minutos'],
          ['cara-torta', 'Face: a boca fica ao lado'],
          ['braco-cai', 'Força: um braço fica fraco'],
          ['fala', 'Fala: as palavras saem trocadas'],
          ['ligar-112', 'Ligar 112 logo!'],
        ],
        seccoes: [
          { ico: '🧠', titulo: 'O que é?', texto: 'O cérebro precisa de sangue o tempo todo, porque é o sangue que lhe leva oxigénio. Se um vaso sanguíneo fica entupido por um coágulo, ou se rebenta, uma parte do cérebro fica sem sangue e deixa de funcionar bem. A isso chama-se acidente vascular cerebral (AVC).' },
          { ico: '🚨', titulo: 'Os 3 F: face, força e fala', lista: ['Face: a boca fica ao lado e o sorriso torto', 'Força: um braço ou uma perna fica fraco ou dormente', 'Fala: a pessoa fala de forma estranha ou não consegue falar'] },
          { ico: '📞', titulo: 'O que fazer?', texto: 'Liga logo 112, ou pede a um adulto para ligar, e diz que a pessoa pode estar a ter um AVC. Diz também a que horas os sinais começaram. Não dês comida nem bebida à pessoa.' },
          { ico: '⏱️', titulo: 'Porque é tão urgente?', texto: 'Há tratamentos que desentopem o vaso, mas só funcionam nas primeiras horas. Quanto mais depressa a pessoa chegar ao hospital, mais cérebro se salva.' },
        ],
        curiosidade: 'O cérebro pesa cerca de 1,4 kg — pouco mais do que um pacote de arroz — mas gasta cerca de um quinto de todo o oxigénio que respiramos!',
      },
      '13-17': {
        intro: 'O AVC é uma das principais causas de morte e de incapacidade em Portugal. Raramente acontece a jovens, mas saber reconhecê-lo pode salvar a vida de alguém da tua família.',
        imagens: [
          ['cerebro-avc', 'Isquémico (entupimento) ou hemorrágico (rotura)'],
          ['cara-torta', 'Face, força, fala: os 3 F'],
          ['ligar-112', '112 — o tempo é cérebro'],
        ],
        seccoes: [
          { ico: '🧠', titulo: 'Dois tipos', texto: 'Cerca de 8 em cada 10 AVC são isquémicos: um coágulo entope uma artéria do cérebro. Os restantes são hemorrágicos: uma artéria rompe e há sangramento dentro ou à volta do cérebro.' },
          { ico: '🚨', titulo: 'Reconhecer: os 3 F', lista: ['Face: boca ao lado, sorriso torto', 'Força: fraqueza ou dormência de um braço ou de uma perna, sobretudo de um lado', 'Fala: palavras arrastadas ou trocadas, ou incapacidade de falar', 'Outros sinais: perda súbita de visão, desequilíbrio, dor de cabeça súbita e muito forte'] },
          { ico: '🛡️', titulo: 'Prevenir começa cedo', lista: ['Não fumar nem vapear', 'Mexer-te todos os dias', 'Comer pouco sal e poucos ultraprocessados', 'Evitar o álcool e as drogas — a cocaína e as anfetaminas podem causar AVC em jovens', 'Medir a tensão arterial'] },
        ],
        mitos: [
          ['O AVC só acontece a velhos.', 'É muito mais frequente depois dos 65 anos, mas pode acontecer em qualquer idade — até em crianças.'],
          ['Se os sinais passarem sozinhos, não é preciso ir ao hospital.', 'Sinais que desaparecem podem ser um AIT («mini-AVC»), um aviso sério de que um AVC pode estar para vir. Deve ligar-se 112 na mesma.'],
          ['Deve dar-se uma aspirina enquanto se espera.', 'Não: se o AVC for hemorrágico, a aspirina pode piorar. O tratamento só se decide no hospital.'],
        ],
        alerta: { titulo: 'Liga 112 se alguém…', lista: ['Ficar de repente com a boca ao lado, sem força num braço ou com dificuldade em falar', 'Tiver uma dor de cabeça súbita, a mais forte da vida', 'Perder a visão ou o equilíbrio de repente'] },
      },
      '18-65': {
        intro: 'Em Portugal, o AVC é uma das primeiras causas de morte e a principal causa de incapacidade. Grande parte dos AVC pode ser evitada controlando os fatores de risco — e, quando acontece, cada minuto conta.',
        imagens: [
          ['cerebro-avc', 'Um coágulo ou uma rotura deixam parte do cérebro sem sangue'],
          ['relogio', 'Via Verde AVC: tratar nas primeiras horas'],
          ['tensiometro', 'A hipertensão é o principal fator de risco'],
        ],
        seccoes: [
          { ico: '🚨', titulo: 'Sinais de alarme (3 F)', texto: 'Perante qualquer um destes sinais, ligue 112 de imediato e anote a hora de início — é isso que ativa a Via Verde AVC.', lista: ['Face: boca ao lado', 'Força: falta de força num braço ou numa perna', 'Fala: dificuldade em falar ou em perceber', 'Também: perda súbita de visão, desequilíbrio ou dor de cabeça súbita e muito intensa'] },
          { ico: '⏱️', titulo: 'Tratamento urgente', texto: 'No AVC isquémico, a trombólise (um medicamento que dissolve o coágulo) pode ser feita até 4,5 horas depois do início, e a trombectomia (remoção do coágulo por cateterismo), em casos selecionados, até 24 horas. Por isso a hora em que os sinais começaram é essencial.' },
          { ico: '⚠️', titulo: 'Fatores de risco', lista: ['Hipertensão arterial', 'Fibrilhação auricular (pulso irregular)', 'Tabaco', 'Diabetes e colesterol elevado', 'Sedentarismo, excesso de peso e excesso de sal', 'Álcool em excesso'] },
          { ico: '🛡️', titulo: 'Prevenção', lista: ['Medir e controlar a tensão arterial', 'Tomar a medicação como prescrito, incluindo os anticoagulantes na fibrilhação auricular', 'Deixar de fumar', 'Alimentação mediterrânica, com pouco sal', 'Atividade física regular'] },
        ],
        alerta: { titulo: 'Ligue 112 se…', lista: ['Boca ao lado, falta de força ou dificuldade em falar — mesmo que passe', 'Dor de cabeça súbita, a pior da vida', 'Perda súbita de visão ou de equilíbrio'] },
        ligacoes: [
          { href: 'calculadora-anticoagulacao/', texto: 'Risco de AVC na fibrilhação auricular (CHA₂DS₂-VASc)' },
          { href: 'calculadora-risco-cardiovascular/', texto: 'Calcular o risco cardiovascular (SCORE2)' },
        ],
      },
      '65+': {
        intro: 'O risco de AVC aumenta muito com a idade. Conhecer os sinais e ligar 112 depressa faz a diferença entre recuperar ou ficar com sequelas.',
        imagens: [
          ['cara-torta', 'Boca ao lado'],
          ['braco-cai', 'Falta de força num braço'],
          ['fala', 'Dificuldade em falar'],
          ['ligar-112', 'Ligue 112 e diga a hora em que começou'],
        ],
        seccoes: [
          { ico: '🚨', titulo: 'Os 3 F', texto: 'Face, força e fala. Se notar algum destes sinais em si ou em alguém, não espere que passe: ligue logo 112. Não tome nem dê medicamentos, comida ou bebida.' },
          { ico: '💓', titulo: 'Pulso irregular', texto: 'A fibrilhação auricular, um ritmo do coração irregular, é muito frequente nesta idade e aumenta várias vezes o risco de AVC. Pode não dar sintomas. Os anticoagulantes reduzem muito esse risco — não os deixe de tomar sem falar com o médico.' },
          { ico: '🏥', titulo: 'Depois do AVC', lista: ['A reabilitação (fisioterapia, terapia da fala, terapia ocupacional) deve começar cedo', 'Adaptar a casa para evitar quedas', 'Tomar a medicação que previne um novo AVC', 'Estar atento à tristeza: a depressão é frequente depois de um AVC'] },
        ],
        alerta: { titulo: 'Ligue 112 se…', lista: ['Boca ao lado', 'Falta de força num braço ou numa perna', 'Dificuldade em falar ou em perceber', 'Tonturas com desequilíbrio ou perda súbita de visão'] },
      },
    },
  },

  {
    id: 'cancro-estomago',
    nome: 'Cancro do estômago',
    emoji: '🍲',
    categoria: 'Oncologia',
    tambem: ['Digestivo'],
    palavras: 'gástrico helicobacter pylori azia úlcera gastrite endoscopia sal fumados',
    resumo: 'Um tumor que começa na parede do estômago. É mais frequente no Norte do país, e a bactéria Helicobacter pylori e o excesso de sal são as principais causas.',
    heroi: 'estomago-bacteria',
    deco: 'estomago',
    grupos: {
      '3-5': {
        imagens: [
          ['estomago', 'O estômago é um saco que desfaz a comida'],
          ['estomago-bacteria', 'Há micróbios que fazem dói-dói no estômago'],
          ['prato', 'Fruta e legumes fazem bem à barriga'],
          ['sal', 'Menos sal na comida'],
          ['lavar-maos', 'Lavar as mãos antes de comer'],
          ['medico', 'Se a barriga doer muito, vamos ao médico'],
        ],
      },
      '5-12': {
        intro: 'O estômago é o saco onde a comida é desfeita depois de a engolirmos. O cancro do estômago acontece quando algumas células da parede do estômago começam a crescer sem controlo. É muito raro em crianças.',
        imagens: [
          ['estomago', 'O estômago mistura a comida com sucos ácidos'],
          ['estomago-bacteria', 'A bactéria Helicobacter pylori vive no estômago de muitas pessoas'],
          ['enchidos', 'Enchidos, fumados e salgados, só de vez em quando'],
          ['prato', 'Fruta e legumes frescos protegem'],
        ],
        seccoes: [
          { ico: '🫙', titulo: 'Como funciona o estômago?', texto: 'O estômago é um saco feito de músculo. Aperta e mistura a comida com um suco muito ácido, até a transformar numa papa que segue para o intestino.' },
          { ico: '🦠', titulo: 'Porque aparece o cancro?', texto: 'Uma bactéria chamada Helicobacter pylori pode viver no estômago durante muitos anos e irritá-lo. Comer muito sal e muitos alimentos fumados também faz mal. Juntos, ao fim de muitos anos, podem levar ao cancro — por isso aparece sobretudo em adultos mais velhos.' },
          { ico: '💊', titulo: 'Pode tratar-se?', texto: 'A bactéria trata-se com antibióticos. O cancro, quando é descoberto cedo, pode ser retirado com uma operação ou até por dentro, com um tubo com uma câmara chamado endoscópio.' },
          { ico: '🥗', titulo: 'O que protege?', lista: ['Comer fruta e legumes frescos todos os dias', 'Menos sal, enchidos e fumados', 'Lavar as mãos e beber água segura', 'Nunca fumar'] },
        ],
        curiosidade: 'O estômago produz cerca de um litro e meio de suco gástrico por dia e renova a camada que o protege a cada poucos dias!',
      },
      '13-17': {
        intro: 'Portugal tem uma das taxas de cancro do estômago mais altas da Europa Ocidental, sobretudo no Norte. A maior parte dos casos está ligada a uma bactéria que se pode tratar e a hábitos alimentares que se podem mudar.',
        imagens: [
          ['estomago-bacteria', 'A Helicobacter pylori é a principal causa'],
          ['enchidos', 'Sal e fumados aumentam o risco'],
          ['cigarro', 'O tabaco também'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'Helicobacter pylori', texto: 'É uma bactéria muito comum, que se apanha geralmente na infância, dentro da família. Muitas vezes não dá sintomas, mas pode causar gastrite e úlceras e, ao fim de décadas, aumentar o risco de cancro. Trata-se com uma combinação de antibióticos e um protetor do estômago.' },
          { ico: '⚠️', titulo: 'Fatores de risco', lista: ['Infeção por Helicobacter pylori', 'Dieta rica em sal e em alimentos salgados, fumados ou de conserva', 'Pouca fruta e poucos legumes frescos', 'Tabaco e álcool', 'Familiares próximos com cancro do estômago'] },
          { ico: '🍳', titulo: 'Hábitos que protegem', lista: ['Fruta e legumes frescos todos os dias', 'Provar antes de pôr sal', 'Enchidos e fumados só de vez em quando', 'Não fumar'] },
        ],
        mitos: [
          ['O stress causa úlceras.', 'A maioria das úlceras é causada pela Helicobacter pylori ou por anti-inflamatórios, não pelo stress.'],
          ['O cancro do estômago pega-se.', 'O cancro não se pega. O que se transmite, sobretudo na infância, é a bactéria Helicobacter pylori.'],
          ['Só os mais velhos têm de se preocupar.', 'O cancro aparece sobretudo depois dos 50 anos, mas a bactéria apanha-se na infância e os hábitos formam-se cedo.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Tiveres dor de estômago frequente que não passa', 'Vomitares sangue ou as fezes ficarem negras', 'Perderes peso sem razão'] },
      },
      '18-65': {
        intro: 'Em Portugal, o cancro do estômago é mais frequente do que na maioria dos países europeus, e as taxas mais altas estão no Norte. Muitas vezes não dá sinais no início, por isso alguns sintomas persistentes merecem ser investigados.',
        imagens: [
          ['estomago-bacteria', 'Tratar a Helicobacter pylori reduz o risco'],
          ['endoscopia', 'A endoscopia digestiva alta faz o diagnóstico'],
          ['enchidos', 'Menos sal, enchidos e fumados'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais de alarme', lista: ['Dor ou desconforto na parte de cima da barriga que não passa', 'Enfartamento rápido e perda de apetite', 'Perda de peso sem explicação', 'Náuseas e vómitos persistentes', 'Anemia, fezes negras ou vómitos com sangue', 'Dificuldade em engolir'] },
          { ico: '⚠️', titulo: 'Fatores de risco', lista: ['Infeção por Helicobacter pylori', 'Sal em excesso e alimentos salgados ou fumados', 'Tabaco e álcool', 'Familiares de primeiro grau com cancro do estômago', 'Gastrite atrófica e metaplasia intestinal', 'Idade acima dos 50 anos'] },
          { ico: '🦠', titulo: 'Helicobacter pylori', texto: 'Pesquisa-se com um teste respiratório, nas fezes ou na endoscopia. Se estiver presente, trata-se com antibióticos e um protetor gástrico durante 10 a 14 dias, e confirma-se depois que foi eliminada. Erradicá-la reduz o risco de cancro do estômago.' },
          { ico: '🏥', titulo: 'Diagnóstico e tratamento', texto: 'O diagnóstico faz-se por endoscopia com biópsia. Os tumores muito precoces podem ser removidos por via endoscópica; os restantes tratam-se com cirurgia, muitas vezes associada a quimioterapia.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Sintomas digestivos novos depois dos 50 anos', 'Perda de peso ou anemia sem explicação', 'Fezes negras ou vómitos com sangue (vá à urgência)', 'Dificuldade em engolir'] },
        ligacoes: [{ href: 'calculadora-digestivo/', texto: 'Hemorragia digestiva: escala de Glasgow-Blatchford' }],
      },
      '65+': {
        intro: 'O cancro do estômago é mais frequente depois dos 65 anos. Sintomas que antes não existiam — perda de apetite, enfartamento, cansaço ou perda de peso — não devem ser postos na conta da idade.',
        imagens: [
          ['estomago', 'Enfartamento e falta de apetite merecem atenção'],
          ['balanca', 'Perder peso sem querer é um sinal de alerta'],
          ['endoscopia', 'A endoscopia faz-se com anestesia local ou sedação'],
          ['sopa', 'Sopa de legumes, todos os dias'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Esteja atento a', lista: ['Enfartamento rápido ou falta de apetite', 'Perda de peso sem querer', 'Cansaço e palidez (anemia)', 'Fezes negras', 'Vómitos persistentes'] },
          { ico: '💊', titulo: 'Cuidado com os medicamentos', texto: 'Os anti-inflamatórios e a aspirina podem causar úlceras e hemorragias do estômago, sobretudo nesta idade. Não os tome sem indicação médica e diga ao médico se tiver dor de estômago ou fezes negras.' },
          { ico: '🥣', titulo: 'À mesa', lista: ['Sopa de legumes e fruta fresca todos os dias', 'Temperar com ervas, alho e limão em vez de sal', 'Enchidos e fumados só de vez em quando', 'Refeições pequenas e frequentes se tiver pouco apetite'] },
        ],
        alerta: { titulo: 'Vá à urgência se…', lista: ['Vomitar sangue ou algo parecido com borra de café', 'Tiver fezes negras e pegajosas', 'Tiver tonturas ou desmaiar, com dor de estômago'] },
      },
    },
  },

  {
    id: 'cancro-colorretal',
    nome: 'Cancro colorretal',
    alias: 'Cancro do intestino',
    emoji: '🧪',
    categoria: 'Oncologia',
    tambem: ['Digestivo'],
    palavras: 'intestino cólon reto pólipos colonoscopia sangue oculto fezes rastreio',
    resumo: 'Um dos cancros mais frequentes em Portugal. Começa quase sempre num pólipo que pode ser retirado antes de se transformar — por isso o rastreio salva vidas.',
    heroi: 'intestino',
    deco: 'intestino',
    grupos: {
      '3-5': {
        imagens: [
          ['intestino', 'A comida faz uma longa viagem pela barriga'],
          ['fibra', 'Fruta, legumes e pão escuro ajudam a fazer cocó'],
          ['agua', 'Beber água'],
          ['correr', 'Mexer o corpo ajuda a barriga'],
          ['enchidos', 'Salsichas e enchidos, só às vezes'],
          ['medico', 'Se houver sangue no cocó, diz a um adulto'],
        ],
      },
      '5-12': {
        intro: 'Depois do estômago, a comida passa pelo intestino, um tubo muito comprido. O cancro colorretal aparece na última parte, o intestino grosso. Quase sempre começa num pequeno «altinho», o pólipo, que os médicos conseguem tirar a tempo.',
        imagens: [
          ['intestino', 'O intestino grosso forma as fezes'],
          ['polipo', 'Um pólipo cresce devagarinho durante muitos anos'],
          ['fibra', 'A fibra dos vegetais ajuda o intestino'],
          ['teste-fezes', 'Os adultos fazem um teste ao cocó para o descobrir cedo'],
        ],
        seccoes: [
          { ico: '🛤️', titulo: 'Uma longa viagem', texto: 'Num adulto, o intestino delgado mede cerca de 6 metros e o intestino grosso cerca de 1,5 metros. O intestino grosso absorve a água e forma as fezes.' },
          { ico: '🍄', titulo: 'O que são pólipos?', texto: 'São pequenos crescimentos na parede do intestino. A maioria não faz mal, mas alguns, ao fim de muitos anos, podem transformar-se em cancro. Se forem encontrados, os médicos tiram-nos com um tubo com uma câmara, sem cortar a barriga.' },
          { ico: '🥦', titulo: 'O que ajuda o intestino?', lista: ['Fruta, legumes, sopa e leguminosas (feijão, grão, lentilhas)', 'Pão e cereais integrais', 'Beber água', 'Mexer o corpo todos os dias', 'Menos salsichas, fiambre e enchidos'] },
          { ico: '👵', titulo: 'Quem tem?', texto: 'É quase sempre uma doença de adultos com mais de 50 anos. Por isso, o SNS convida as pessoas dos 50 aos 74 anos a fazer um teste simples às fezes, de 2 em 2 anos.' },
        ],
        curiosidade: 'No intestino vivem triliões de bactérias boas — a microbiota — que ajudam a digerir a fibra e a proteger o corpo!',
      },
      '13-17': {
        intro: 'O cancro colorretal é um dos cancros mais frequentes em Portugal. Na tua idade é muito raro, mas tem aparecido mais cedo em adultos jovens — e os hábitos que o previnem começam agora.',
        imagens: [
          ['polipo', 'Quase todos começam num pólipo'],
          ['fibra', 'Fibra, fruta e legumes protegem'],
          ['enchidos', 'As carnes processadas aumentam o risco'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'O que é', texto: 'Um tumor maligno do cólon ou do reto. Desenvolve-se, quase sempre, a partir de pólipos benignos que crescem lentamente durante 10 anos ou mais — tempo suficiente para serem encontrados e retirados.' },
          { ico: '⚠️', titulo: 'O que aumenta o risco', lista: ['Carnes processadas (salsichas, fiambre, enchidos) e muita carne vermelha', 'Pouca fibra', 'Sedentarismo e excesso de peso', 'Tabaco e álcool', 'Familiares próximos com cancro colorretal', 'Doença inflamatória do intestino (doença de Crohn, colite ulcerosa)'] },
          { ico: '🥦', titulo: 'O que protege', lista: ['Fruta, legumes e leguminosas todos os dias', 'Cereais integrais', 'Atividade física regular', 'Peso saudável', 'Não fumar e evitar o álcool'] },
        ],
        mitos: [
          ['Sangue nas fezes é sempre das hemorroidas.', 'Muitas vezes é, mas deve ser sempre visto por um médico, em qualquer idade.'],
          ['É uma doença só de velhos.', 'É mais frequente depois dos 50 anos, mas tem aumentado em adultos jovens.'],
          ['Falar de cocó é vergonhoso.', 'Mudanças nas fezes são informação importante para o médico. Falar disso salva vidas.'],
        ],
        alerta: { titulo: 'Fala com um adulto ou com o médico se…', lista: ['Vires sangue nas fezes', 'Tiveres dor de barriga ou diarreia que não passam', 'Perderes peso ou te sentires sempre cansado sem razão'] },
      },
      '18-65': {
        intro: 'O cancro colorretal é um dos cancros mais frequentes em Portugal e uma das principais causas de morte por cancro. Detetado cedo, cura-se na grande maioria dos casos — e o rastreio permite até evitá-lo, retirando os pólipos antes de se transformarem.',
        imagens: [
          ['teste-fezes', 'Teste de sangue oculto nas fezes, de 2 em 2 anos, dos 50 aos 74 anos'],
          ['endoscopia', 'Se o teste for positivo, faz-se uma colonoscopia'],
          ['fibra', 'Fibra, atividade física e menos carnes processadas'],
        ],
        seccoes: [
          { ico: '🧪', titulo: 'Rastreio', texto: 'O SNS convida as pessoas dos 50 aos 74 anos a fazer, de 2 em 2 anos, um teste imunoquímico de sangue oculto nas fezes, feito em casa. Se for positivo, segue-se uma colonoscopia. Com familiares de primeiro grau afetados, ou com doença inflamatória do intestino, o rastreio começa mais cedo e faz-se por colonoscopia.' },
          { ico: '🔍', titulo: 'Sinais de alarme', lista: ['Sangue nas fezes ou fezes escuras', 'Alteração persistente do ritmo intestinal (prisão de ventre ou diarreia)', 'Dor abdominal persistente', 'Sensação de evacuação incompleta', 'Anemia por falta de ferro', 'Perda de peso sem explicação'] },
          { ico: '⚠️', titulo: 'Fatores de risco', lista: ['Idade acima dos 50 anos', 'Familiares próximos com cancro colorretal ou pólipos', 'Doença inflamatória do intestino', 'Carnes processadas e muita carne vermelha', 'Sedentarismo, obesidade, tabaco e álcool'] },
          { ico: '🏥', titulo: 'Tratamento', texto: 'Os pólipos e alguns tumores muito precoces retiram-se durante a colonoscopia. Os restantes tratam-se com cirurgia e, conforme o estádio, quimioterapia e/ou radioterapia (sobretudo no cancro do reto).' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Sangue nas fezes, em qualquer idade', 'Mudança do ritmo intestinal que dura mais de algumas semanas', 'Anemia ou perda de peso sem explicação'] },
        ligacoes: [{ href: 'calculadora-plano-rastreios/', texto: 'Ver os rastreios recomendados para a sua idade' }],
      },
      '65+': {
        intro: 'O risco de cancro colorretal aumenta com a idade. Até aos 74 anos, o teste de rastreio do SNS é simples, faz-se em casa e pode salvar-lhe a vida.',
        imagens: [
          ['teste-fezes', 'O teste faz-se em casa, com um kit simples'],
          ['intestino', 'Mudanças no intestino merecem atenção'],
          ['fibra', 'Fibra e água ajudam na prisão de ventre'],
          ['bengala', 'Caminhar ajuda o intestino'],
        ],
        seccoes: [
          { ico: '🧪', titulo: 'O rastreio', texto: 'Dos 50 aos 74 anos, o SNS convida para o teste de sangue oculto nas fezes de 2 em 2 anos. Depois dos 75, a decisão de continuar é tomada com o médico de família, conforme a saúde de cada pessoa.' },
          { ico: '🔍', titulo: 'Esteja atento a', lista: ['Sangue nas fezes', 'Prisão de ventre ou diarreia novas, que não passam', 'Cansaço e palidez (anemia)', 'Perda de peso sem querer'] },
          { ico: '🏥', titulo: 'Se precisar de colonoscopia', texto: 'Na véspera é preciso fazer uma preparação para limpar o intestino. Se toma anticoagulantes, antiagregantes ou medicamentos para a diabetes, fale antes com o médico: pode ser preciso ajustá-los.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Vir sangue nas fezes', 'O intestino mudar de ritmo sem razão', 'Sentir cansaço e falta de ar novos (pode ser anemia)'] },
      },
    },
  },

  {
    id: 'paramiloidose',
    nome: 'Paramiloidose',
    alias: 'Doença dos pezinhos',
    emoji: '🦶',
    categoria: 'Cérebro e nervos',
    palavras: 'PAF polineuropatia amiloidótica familiar amiloidose hereditária transtirretina TTR Corino de Andrade Póvoa de Varzim Vila do Conde',
    resumo: 'Doença hereditária que começa nos pés, descrita pela primeira vez no Porto e mais frequente no Norte de Portugal. Hoje há tratamentos que travam a sua progressão.',
    heroi: 'pes-formigueiro',
    deco: 'adn',
    grupos: {
      '3-5': {
        imagens: [
          ['pes-formigueiro', 'Às vezes os pés deixam de sentir bem'],
          ['nervo', 'Os nervos levam recados até aos pés'],
          ['adn', 'Há coisas que passam dos pais para os filhos'],
          ['medico', 'Os médicos têm remédios que ajudam'],
          ['pes', 'Ver os pés todos os dias'],
          ['abraco', 'Não se pega: podes dar abraços'],
        ],
      },
      '5-12': {
        intro: 'A paramiloidose, também chamada «doença dos pezinhos», é uma doença que passa de pais para filhos. Foi descrita pela primeira vez por um médico português, no Porto, e é mais frequente em algumas terras do Norte, como a Póvoa de Varzim e Vila do Conde.',
        imagens: [
          ['adn', 'Os genes são as instruções do corpo, herdadas dos pais'],
          ['proteina', 'Uma proteína dobra-se mal e acumula-se nos nervos'],
          ['pes-formigueiro', 'Os pés começam a perder a sensibilidade'],
          ['barco', 'É mais frequente em famílias da Póvoa de Varzim e de Vila do Conde'],
        ],
        seccoes: [
          { ico: '🧬', titulo: 'O que é?', texto: 'O nosso corpo é construído a partir de instruções, os genes, que recebemos metade da mãe e metade do pai. Na paramiloidose, uma instrução tem um pequeno erro: o fígado fabrica uma proteína que se dobra mal e se vai acumulando nos nervos, no coração, nos olhos e nos rins.' },
          { ico: '🦶', titulo: 'Porque se chama «doença dos pezinhos»?', texto: 'Porque os primeiros sinais aparecem quase sempre nos pés: formigueiros, dormência e dificuldade em sentir o quente e o frio. Com os anos, sem tratamento, a fraqueza sobe pelas pernas e chega às mãos.' },
          { ico: '👨‍⚕️', titulo: 'Um médico português', texto: 'Em 1952, o neurologista Corino de Andrade descreveu esta doença pela primeira vez no mundo, a partir de doentes da Póvoa de Varzim. Por isso, em muitos países, ela é conhecida como «doença de Andrade».' },
          { ico: '💊', titulo: 'Tem tratamento?', texto: 'Sim! Hoje há medicamentos que impedem a proteína de se acumular e travam a doença. Os sinais costumam aparecer só nos adultos, e não se pega.' },
        ],
        curiosidade: 'Os nervos que vão até aos pés são os mais compridos do corpo, com mais de um metro num adulto — por isso são os primeiros a sofrer nesta doença!',
      },
      '13-17': {
        intro: 'A paramiloidose (polineuropatia amiloidótica familiar, PAF) é uma doença genética rara no mundo, mas frequente no Norte de Portugal. Se há casos na tua família, é natural teres perguntas — e há respostas e apoio.',
        imagens: [
          ['adn', 'Herança dominante: 50 % de probabilidade em cada filho'],
          ['proteina', 'A transtirretina deforma-se e forma depósitos (amiloide)'],
          ['familia', 'Aconselhamento genético para toda a família'],
        ],
        seccoes: [
          { ico: '🧬', titulo: 'Como se herda', texto: 'Basta um dos pais ter a alteração genética para cada filho, rapaz ou rapariga, ter 50 % de probabilidade de a herdar. Nem todos os portadores ficam doentes, e a idade em que os sintomas aparecem varia — em Portugal, surgem muitas vezes entre os 25 e os 35 anos.' },
          { ico: '🔬', titulo: 'O teste genético', texto: 'Existe um teste que mostra se a pessoa herdou a alteração. Fazê-lo é uma decisão pessoal, normalmente a partir dos 18 anos e com consultas de aconselhamento genético antes e depois. Ninguém deve ser pressionado a fazer o teste.' },
          { ico: '💊', titulo: 'Tratamentos', texto: 'Durante anos, o principal tratamento foi o transplante de fígado, o órgão que fabrica a proteína. Hoje há medicamentos que a estabilizam ou que reduzem a sua produção e travam a progressão da doença, sobretudo quando começam cedo.' },
        ],
        mitos: [
          ['Quem tem um pai com paramiloidose vai ficar doente de certeza.', 'Não: a probabilidade de herdar é de 50 %, e mesmo quem herda pode nunca ter sintomas, ou tê-los tarde.'],
          ['É uma doença contagiosa.', 'Não se pega. É genética: passa de pais para filhos.'],
          ['Não há nada a fazer.', 'Hoje há tratamentos eficazes, e é possível ter filhos sem a alteração, com diagnóstico genético pré-implantação.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Tiveres familiares com paramiloidose e quiseres saber mais', 'Sentires formigueiros ou dormência nos pés que não passam', 'Tiveres diarreia e prisão de ventre alternadas, ou tonturas ao levantar, sem razão'] },
      },
      '18-65': {
        intro: 'A polineuropatia amiloidótica familiar (PAF), ou paramiloidose, é uma amiloidose hereditária por transtirretina, descrita por Corino de Andrade em 1952. Portugal tem o maior foco mundial, sobretudo na Póvoa de Varzim e em Vila do Conde. O diagnóstico precoce é decisivo, porque os tratamentos atuais travam a doença.',
        imagens: [
          ['pes-formigueiro', 'Começa geralmente pela perda da sensibilidade nos pés'],
          ['proteina', 'A transtirretina mal dobrada deposita-se nos nervos e no coração'],
          ['comprimido', 'Estabilizadores e silenciadores da transtirretina'],
        ],
        seccoes: [
          { ico: '🦶', titulo: 'Sintomas', lista: ['Formigueiros, dormência e perda da sensibilidade à dor e à temperatura nos pés, que sobem pelas pernas', 'Feridas e queimaduras nos pés que não se sentem', 'Diarreia e prisão de ventre alternadas, perda de peso', 'Tonturas ao levantar (tensão baixa)', 'Disfunção sexual e alterações urinárias', 'Alterações do ritmo do coração, dos olhos e dos rins'] },
          { ico: '🧬', titulo: 'Diagnóstico', texto: 'Confirma-se com um teste genético. Na família de um doente, o teste preditivo faz-se com aconselhamento genético. Os portadores devem ser seguidos numa consulta especializada, para começar o tratamento ao primeiro sinal da doença.' },
          { ico: '💊', titulo: 'Tratamento', texto: 'Existem estabilizadores da transtirretina, em comprimidos, e medicamentos que «silenciam» o gene e reduzem a produção da proteína no fígado. O transplante de fígado, usado durante décadas, é hoje menos frequente. A fisioterapia, os cuidados com os pés e o tratamento dos sintomas completam o acompanhamento.' },
          { ico: '👪', titulo: 'Planear a família', texto: 'Os casais em que um dos membros é portador podem recorrer ao diagnóstico genético pré-implantação para ter filhos sem a alteração. A Associação Portuguesa de Paramiloidose, na Póvoa de Varzim, apoia doentes e famílias.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Tiver familiares com paramiloidose, mesmo sem sintomas', 'Sentir formigueiros ou dormência nos pés que persistem', 'Perder peso com alterações intestinais sem explicação'] },
      },
      '65+': {
        intro: 'A paramiloidose começa muitas vezes entre os 25 e os 35 anos, mas também pode surgir depois dos 50 — e nessa idade é frequentemente confundida com outras doenças. Uma outra forma de amiloidose por transtirretina, não hereditária, afeta sobretudo o coração dos mais velhos.',
        imagens: [
          ['pes-formigueiro', 'Formigueiros e dormência que sobem pelas pernas'],
          ['coracao', 'Falta de ar e inchaço das pernas podem vir do coração'],
          ['pes', 'Ver os pés todos os dias'],
          ['halteres', 'Fisioterapia para manter a força'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais a não desvalorizar', lista: ['Formigueiros e dormência nos pés', 'Tonturas ao levantar', 'Diarreia ou prisão de ventre persistentes', 'Falta de ar, cansaço e pernas inchadas', 'Síndrome do túnel cárpico nas duas mãos'] },
          { ico: '🦶', titulo: 'Cuidar dos pés', lista: ['Ver os pés todos os dias, com um espelho ou com ajuda', 'Testar a água do banho com o cotovelo, e não com os pés', 'Usar calçado confortável e meias sem costuras', 'Tratar logo qualquer ferida'] },
          { ico: '🤝', titulo: 'Apoio', texto: 'O seguimento faz-se em consultas especializadas, como a Unidade Corino de Andrade, no Porto. A Associação Portuguesa de Paramiloidose apoia doentes e famílias.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Formigueiros ou dormência nos pés que não passam', 'Desmaios ou tonturas frequentes ao levantar', 'Falta de ar e inchaço das pernas novos'] },
      },
    },
  },

  {
    id: 'dpoc',
    nome: 'DPOC',
    alias: 'Doença pulmonar obstrutiva crónica',
    emoji: '🚭',
    categoria: 'Respiratório',
    palavras: 'bronquite crónica enfisema tabaco falta de ar inalador bombinha espirometria lareira',
    resumo: 'Doença dos pulmões que dificulta a saída do ar, causada sobretudo pelo tabaco. Não tem cura, mas trata-se — e o melhor é nunca começar a fumar.',
    heroi: 'pulmoes-cinza',
    deco: 'inalador',
    grupos: {
      '3-5': {
        imagens: [
          ['pulmoes', 'Os pulmões enchem-se de ar como balões'],
          ['pulmoes-cinza', 'O fumo do tabaco faz mal aos pulmões'],
          ['cigarro', 'Ninguém deve fumar perto das crianças'],
          ['janela', 'Abrir a janela deixa entrar ar limpo'],
          ['correr', 'Correr e brincar ao ar livre'],
          ['inalador', 'Alguns avós usam uma bombinha para respirar melhor'],
        ],
      },
      '5-12': {
        intro: 'DPOC são as iniciais de doença pulmonar obstrutiva crónica. É uma doença dos pulmões que faz com que o ar tenha dificuldade em sair e as pessoas fiquem com falta de ar. A causa principal é o fumo do tabaco.',
        imagens: [
          ['pulmoes', 'Pulmões saudáveis são elásticos como balões'],
          ['pulmoes-cinza', 'O fumo estraga os tubos e os saquinhos de ar'],
          ['inalador', 'As bombinhas abrem os tubos do ar'],
          ['escadas', 'Subir escadas pode deixar sem fôlego'],
        ],
        seccoes: [
          { ico: '🎈', titulo: 'O que é?', texto: 'Dentro dos pulmões há tubos, os brônquios, que terminam em milhões de saquinhos de ar. Na DPOC, os tubos ficam inflamados e estreitos e os saquinhos perdem a elasticidade, como balões velhos. O ar entra, mas custa a sair.' },
          { ico: '🚬', titulo: 'Porque acontece?', texto: 'Na maioria das pessoas, por fumar durante muitos anos. Respirar o fumo de lareiras e de fogões a lenha em casas pouco arejadas, ou poeiras no trabalho, também pode causar DPOC.' },
          { ico: '💨', titulo: 'Como se trata?', lista: ['Deixar de fumar é o mais importante', 'Bombinhas (inaladores) que abrem os brônquios', 'Exercício e fisioterapia respiratória', 'Vacinas para evitar infeções'] },
          { ico: '🛡️', titulo: 'Como posso proteger os meus pulmões?', lista: ['Nunca começar a fumar nem a vapear', 'Pedir para não fumarem em casa nem no carro', 'Abrir as janelas todos os dias', 'Brincar e fazer desporto ao ar livre'] },
        ],
        curiosidade: 'Respiramos mais de 20 mil vezes por dia, sem precisar de pensar nisso!',
      },
      '13-17': {
        intro: 'A DPOC aparece geralmente depois dos 40 anos, mas começa muitas vezes na adolescência — com o primeiro cigarro. A grande maioria dos fumadores começou antes dos 18 anos.',
        imagens: [
          ['pulmoes-cinza', 'O tabaco inflama e destrói o pulmão aos poucos'],
          ['cigarro', 'Cigarros, tabaco aquecido e vape: todos fazem mal'],
          ['correr', 'Pulmões saudáveis para o desporto'],
        ],
        seccoes: [
          { ico: '🫁', titulo: 'O que é', texto: 'Uma doença crónica em que os brônquios ficam inflamados e estreitos (bronquite crónica) e os alvéolos se destroem (enfisema). O ar fica preso nos pulmões e aparece falta de ar, primeiro com esforço e depois em repouso. Os danos não voltam atrás, mas deixar de fumar trava a doença.' },
          { ico: '🧪', titulo: 'Tabaco, aquecido e vape', texto: 'O fumo do tabaco tem milhares de substâncias químicas, muitas delas tóxicas para os pulmões. O tabaco aquecido e os cigarros eletrónicos também libertam substâncias irritantes e nicotina, que vicia muito depressa.' },
          { ico: '💪', titulo: 'Se já fumas', lista: ['Quanto mais cedo deixares, mais os pulmões recuperam', 'O médico de família pode ajudar — há consultas de cessação tabágica no SNS', 'Exercício e o apoio dos amigos ajudam a resistir à vontade'] },
        ],
        mitos: [
          ['Fumar só ao fim de semana não faz mal.', 'Não há uma quantidade segura de tabaco, e a nicotina cria dependência mesmo em quem fuma pouco.'],
          ['O vape é só vapor de água.', 'Tem nicotina e outras substâncias que irritam e inflamam os pulmões.'],
          ['A DPOC é só tosse de fumador.', 'A tosse com expetoração é muitas vezes o primeiro sinal de uma doença que vai piorar se não se deixar de fumar.'],
        ],
        alerta: { titulo: 'Procura ajuda se…', lista: ['Tiveres tosse com expetoração quase todos os dias', 'Ficares com falta de ar em esforços que antes fazias bem', 'Quiseres deixar de fumar e não conseguires sozinho'] },
      },
      '18-65': {
        intro: 'A DPOC afeta mais de 1 em cada 10 portugueses com mais de 40 anos, e a maioria não sabe que a tem. Falta de ar, tosse e expetoração num fumador ou ex-fumador devem levar a fazer uma espirometria.',
        imagens: [
          ['pulmoes-cinza', 'Os brônquios estreitam e os alvéolos destroem-se'],
          ['inalador', 'Os inaladores aliviam a falta de ar e previnem crises'],
          ['correr', 'A reabilitação respiratória melhora a capacidade de esforço'],
        ],
        seccoes: [
          { ico: '🩺', titulo: 'Sintomas', lista: ['Falta de ar, primeiro com esforço', 'Tosse persistente, muitas vezes com expetoração', 'Pieira e aperto no peito', 'Infeções respiratórias frequentes («bronquites» todos os invernos)'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'Faz-se com uma espirometria, um exame simples de sopro que mede a saída do ar. Deve ser feita a quem tem sintomas e fatores de risco, sobretudo a fumadores ou ex-fumadores com mais de 40 anos.' },
          { ico: '⚠️', titulo: 'Causas', lista: ['Tabaco (a principal)', 'Fumo de lareiras e de fogões a lenha em casas mal ventiladas', 'Poeiras, fumos e químicos no trabalho', 'Poluição do ar', 'Défice de alfa-1 antitripsina (genético e raro)'] },
          { ico: '💨', titulo: 'Tratamento', lista: ['Deixar de fumar: é a medida que mais muda a evolução da doença', 'Inaladores broncodilatadores, usados com a técnica correta', 'Reabilitação respiratória e atividade física', 'Vacinas: gripe, COVID-19, pneumococo e outras recomendadas', 'Oxigénio em casa, nos casos graves'] },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Falta de ar muito maior do que o habitual', 'Lábios ou unhas arroxeados', 'Sonolência ou confusão', 'Febre com expetoração amarela ou esverdeada e mais falta de ar'] },
        ligacoes: [
          { href: 'calculadora-respiratoria/', texto: 'Questionário CAT (impacto da DPOC)' },
          { href: 'calculadora-habitos/', texto: 'Calcular as unidades maço-ano' },
        ],
      },
      '65+': {
        intro: 'A DPOC é muito frequente depois dos 65 anos, sobretudo em antigos fumadores. Com o tratamento certo, é possível respirar melhor, ter menos crises e manter a autonomia.',
        imagens: [
          ['inalador', 'Usar o inalador todos os dias, com a técnica certa'],
          ['vacina', 'Vacinas que evitam as crises'],
          ['bengala', 'Caminhar todos os dias, ao seu ritmo'],
          ['oxigenio', 'Oxigénio em casa, se o médico indicar'],
        ],
        seccoes: [
          { ico: '💨', titulo: 'O inalador', lista: ['Use-o todos os dias, mesmo quando se sente bem', 'Peça ao médico, ao enfermeiro ou ao farmacêutico para rever a técnica', 'Bocheche com água depois dos inaladores com corticoide', 'Tenha sempre o inalador de alívio por perto'] },
          { ico: '🏃', titulo: 'Mexer-se ajuda', texto: 'A falta de ar leva a mexer menos, o que enfraquece os músculos e aumenta a falta de ar. Caminhar todos os dias e a reabilitação respiratória quebram este ciclo.' },
          { ico: '🔥', titulo: 'Cuidados em casa', lista: ['Nada de fumo em casa', 'Lareiras e braseiras só com boa ventilação', 'Nunca fumar nem acender lume perto do oxigénio', 'No inverno, agasalhar-se e evitar mudanças bruscas de temperatura'] },
        ],
        alerta: { titulo: 'Ligue 112 ou vá à urgência se…', lista: ['Falta de ar que não alivia com o inalador', 'Lábios arroxeados', 'Confusão ou sonolência', 'Dor no peito'] },
      },
    },
  },

  {
    id: 'cancro-pulmao',
    nome: 'Cancro do pulmão',
    emoji: '🩻',
    categoria: 'Oncologia',
    tambem: ['Respiratório'],
    palavras: 'pulmão tabaco radão granito nódulo TAC tosse sangue',
    resumo: 'O cancro que mais mata em Portugal. O tabaco causa a grande maioria dos casos, e o radão, um gás natural das zonas de granito do Norte e do Centro, é a segunda causa.',
    heroi: 'pulmao-mancha',
    deco: 'mancha',
    grupos: {
      '3-5': {
        imagens: [
          ['pulmoes', 'Os pulmões ajudam-nos a respirar'],
          ['cigarro', 'O fumo do cigarro faz muito mal'],
          ['janela', 'Abrir as janelas deixa sair o ar mau'],
          ['correr', 'Brincar ao ar livre faz bem'],
          ['medico', 'Os médicos tratam os pulmões doentes'],
          ['abraco', 'Os abraços ajudam quem está doente'],
        ],
      },
      '5-12': {
        intro: 'O cancro do pulmão acontece quando algumas células dos pulmões começam a crescer sem controlo. A causa mais comum é o tabaco. Há também um gás invisível que sai de algumas rochas, o radão, que se pode acumular dentro das casas.',
        imagens: [
          ['pulmao-mancha', 'Um caroço que cresce no pulmão'],
          ['cigarro', 'O tabaco causa a maioria dos casos'],
          ['casa-radao', 'O radão sai do chão de granito e entra nas casas'],
          ['janela', 'Arejar a casa todos os dias ajuda a mandá-lo embora'],
        ],
        seccoes: [
          { ico: '🫁', titulo: 'O que é?', texto: 'Os pulmões são feitos de milhões de células. Às vezes, depois de muitos anos a respirar substâncias que fazem mal, algumas células estragam-se e crescem sem parar, formando um caroço chamado tumor.' },
          { ico: '🚬', titulo: 'O tabaco', texto: 'O fumo do tabaco tem dezenas de substâncias que causam cancro. Mesmo quem não fuma, mas respira o fumo dos outros, corre mais risco. Por isso ninguém deve fumar perto de ti.' },
          { ico: '🪨', titulo: 'O radão', texto: 'É um gás natural, sem cor e sem cheiro, que sai do granito — uma rocha muito comum no Norte e no Centro de Portugal. Ao ar livre não faz mal, mas pode acumular-se dentro das casas, sobretudo nas caves e nos rés-do-chão. Arejar a casa ajuda.' },
          { ico: '🛡️', titulo: 'Como proteger os pulmões?', lista: ['Nunca começar a fumar', 'Casa e carro sem fumo', 'Abrir as janelas todos os dias', 'Fazer desporto ao ar livre'] },
        ],
        curiosidade: 'Os pulmões não são iguais: o direito tem três partes, os lobos, e o esquerdo só tem duas — para deixar espaço para o coração!',
      },
      '13-17': {
        intro: 'O cancro do pulmão é o cancro que mais mata em Portugal. Quase todos os casos estão ligados ao tabaco, e a maioria dos fumadores começou a fumar na adolescência.',
        imagens: [
          ['cigarro', 'Cerca de 8 em cada 10 casos são causados pelo tabaco'],
          ['casa-radao', 'O radão é a segunda causa'],
          ['pulmao-mancha', 'Muitas vezes só dá sintomas tarde'],
        ],
        seccoes: [
          { ico: '🚬', titulo: 'Tabaco e vape', texto: 'O fumo do tabaco tem cerca de 70 substâncias que causam cancro. O tabaco aquecido e os cigarros eletrónicos são mais recentes e os seus efeitos a longo prazo ainda não são bem conhecidos, mas libertam substâncias tóxicas e nicotina, que vicia muito.' },
          { ico: '🪨', titulo: 'Radão', texto: 'É um gás radioativo natural, libertado pelo granito, frequente no Norte e no Centro do país. Acumula-se em espaços fechados e pouco arejados. Junto com o tabaco, o risco multiplica-se.' },
          { ico: '🛡️', titulo: 'Proteger-te', lista: ['Não começar a fumar nem a vapear', 'Evitar ambientes com fumo', 'Arejar a casa e o quarto todos os dias', 'Se já fumas, pedir ajuda para deixar — quanto mais cedo, melhor'] },
        ],
        mitos: [
          ['Só os fumadores têm cancro do pulmão.', 'Entre 1 e 2 em cada 10 casos surgem em pessoas que nunca fumaram — por radão, poluição, fumo passivo ou outras causas.'],
          ['Os cigarros «light» ou com filtro são seguros.', 'Não há tabaco seguro. Quem fuma «light» costuma inspirar com mais força, e o risco mantém-se.'],
          ['Já não vale a pena deixar de fumar.', 'Vale sempre: o risco começa a descer a partir do momento em que se deixa.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Quiseres deixar de fumar ou de vapear', 'Tiveres tosse que dura mais de 3 semanas', 'Tossires sangue'] },
      },
      '18-65': {
        intro: 'O cancro do pulmão é a principal causa de morte por cancro em Portugal. O tabaco é responsável pela grande maioria dos casos; o radão, abundante nas zonas graníticas do Norte e do Centro, é a segunda causa. Deixar de fumar é a medida mais eficaz, em qualquer idade.',
        imagens: [
          ['cigarro', 'Deixar de fumar reduz o risco em qualquer idade'],
          ['casa-radao', 'Medir e reduzir o radão em casa'],
          ['tac', 'A TAC de baixa dose pode detetá-lo cedo em grandes fumadores'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais de alerta', lista: ['Tosse nova, ou diferente, que dura mais de 3 semanas', 'Sangue na expetoração', 'Falta de ar ou pieira novas', 'Dor no peito persistente', 'Rouquidão que não passa', 'Perda de peso e cansaço sem explicação', 'Pneumonias repetidas no mesmo sítio'] },
          { ico: '⚠️', titulo: 'Fatores de risco', lista: ['Tabaco, incluindo o fumo passivo', 'Radão em casa ou no trabalho', 'Exposição profissional (amianto, sílica, fumos de gasóleo)', 'Poluição do ar', 'Familiares próximos com cancro do pulmão', 'DPOC e fibrose pulmonar'] },
          { ico: '🪨', titulo: 'Radão em casa', texto: 'Nas zonas de granito, é possível medir o radão com um detetor colocado durante alguns meses. Se os valores forem altos, ventilar, selar as fissuras do chão e instalar sistemas de extração reduzem muito a exposição.' },
          { ico: '🩻', titulo: 'Rastreio', texto: 'Em pessoas com muitos anos de tabaco, a TAC de baixa dose anual reduz a mortalidade. Em Portugal, o rastreio organizado está ainda a dar os primeiros passos — fale com o médico de família sobre o seu caso.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Tosse que dura mais de 3 semanas, sobretudo se fuma ou fumou', 'Sangue na expetoração (com urgência)', 'Rouquidão ou perda de peso sem explicação'] },
        ligacoes: [{ href: 'calculadora-habitos/', texto: 'Calcular as unidades maço-ano' }],
      },
      '65+': {
        intro: 'A maioria dos casos de cancro do pulmão é diagnosticada depois dos 65 anos. Uma tosse que muda, sangue na expetoração ou perda de peso não são «coisas da idade» — e deixar de fumar continua a valer a pena.',
        imagens: [
          ['pulmao-mancha', 'Sintomas novos merecem atenção'],
          ['cigarro', 'Nunca é tarde para deixar de fumar'],
          ['janela', 'Arejar a casa todos os dias'],
          ['raio-x', 'Um raio-X ou uma TAC ajudam a esclarecer'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Esteja atento a', lista: ['Tosse que não passa ou que mudou', 'Sangue na expetoração', 'Falta de ar ou cansaço novos', 'Rouquidão persistente', 'Perda de peso e de apetite'] },
          { ico: '🚭', titulo: 'Deixar de fumar', texto: 'Em qualquer idade, deixar de fumar melhora a respiração, reduz as infeções e ajuda os tratamentos a resultar melhor. Os centros de saúde têm consultas de apoio, e há medicamentos que ajudam.' },
          { ico: '🏥', titulo: 'Tratamento', texto: 'Hoje há mais opções do que nunca: cirurgia, radioterapia de alta precisão, quimioterapia, imunoterapia e terapêuticas dirigidas a alterações específicas do tumor. O plano é adaptado à saúde e às preferências de cada pessoa.' },
        ],
        alerta: { titulo: 'Vá à urgência se…', lista: ['Tossir sangue em quantidade', 'Tiver falta de ar súbita ou intensa', 'Tiver uma dor forte no peito'] },
      },
    },
  },

  {
    id: 'figado-alcool',
    nome: 'Doença hepática alcoólica',
    alias: 'Fígado, álcool e cirrose',
    emoji: '🍷',
    categoria: 'Digestivo',
    palavras: 'cirrose fígado álcool hepatite esteatose fígado gordo icterícia bebidas',
    resumo: 'O excesso de álcool inflama o fígado e enche-o de cicatrizes, até à cirrose. Portugal está entre os países europeus que mais álcool bebem — e o fígado só dá sinais tarde.',
    heroi: 'figado',
    deco: 'figado',
    grupos: {
      '3-5': {
        imagens: [
          ['figado', 'O fígado é uma fábrica que limpa o corpo'],
          ['agua', 'A água é a melhor bebida'],
          ['alcool', 'As crianças nunca bebem álcool'],
          ['prato', 'Comer bem ajuda o fígado'],
          ['correr', 'Brincar e correr todos os dias'],
          ['medico', 'Os médicos cuidam do fígado doente'],
        ],
      },
      '5-12': {
        intro: 'O fígado é um órgão grande, do lado direito da barriga, que trabalha como uma fábrica: limpa o sangue, guarda energia e ajuda a digerir a comida. O álcool em excesso, ao fim de muitos anos, pode estragá-lo.',
        imagens: [
          ['figado', 'O fígado faz mais de 500 trabalhos diferentes'],
          ['alcool', 'O álcool faz mal ao fígado, sobretudo em excesso'],
          ['figado-doente', 'Um fígado muito cansado fica duro e cheio de cicatrizes'],
          ['agua', 'Água em vez de refrigerantes'],
        ],
        seccoes: [
          { ico: '🏭', titulo: 'Uma fábrica no corpo', texto: 'O fígado limpa o sangue de substâncias que fazem mal, fabrica proteínas, guarda açúcar para quando precisamos de energia e produz a bílis, que ajuda a digerir as gorduras.' },
          { ico: '🍷', titulo: 'O que faz o álcool?', texto: 'É o fígado que tem de desfazer o álcool. Quando alguém bebe demasiado durante muitos anos, o fígado inflama, enche-se de gordura e vai ficando com cicatrizes. Quando as cicatrizes são muitas, chama-se cirrose.' },
          { ico: '🚫', titulo: 'Porque é que as crianças não bebem álcool?', texto: 'O corpo e o cérebro das crianças e dos jovens ainda estão a crescer, e o álcool faz-lhes mais mal. Por isso, em Portugal, é proibido vender álcool a menores de 18 anos.' },
          { ico: '💚', titulo: 'Como cuidar do fígado?', lista: ['Comer fruta e legumes e pouca comida gordurosa', 'Mexer o corpo todos os dias', 'Ter as vacinas em dia (há uma vacina contra a hepatite B)', 'Nunca tomar medicamentos sem um adulto'] },
        ],
        curiosidade: 'O fígado é o único órgão que consegue voltar a crescer: mesmo que se retire uma parte, o que fica pode regenerar-se!',
      },
      '13-17': {
        intro: 'Na adolescência, o cérebro e o fígado ainda estão em desenvolvimento, e o álcool faz mais mal do que nos adultos. Beber muito numa só ocasião é comum entre jovens — e tem riscos imediatos, além dos de longo prazo.',
        imagens: [
          ['alcool', 'Não há quantidade segura de álcool na adolescência'],
          ['figado', 'O fígado só elimina cerca de uma bebida por hora'],
          ['conversa', 'Saber dizer «não» e cuidar dos amigos'],
        ],
        seccoes: [
          { ico: '🧠', titulo: 'Álcool e adolescência', lista: ['Prejudica a memória, a atenção e o desenvolvimento do cérebro', 'Começar cedo aumenta o risco de dependência no futuro', 'Associa-se a acidentes, violência e relações sexuais sem proteção', 'É proibida a venda a menores de 18 anos'] },
          { ico: '🍺', titulo: 'Intoxicação alcoólica', texto: 'Beber muito em pouco tempo pode causar vómitos, perda de consciência e até coma. Uma pessoa muito embriagada nunca deve ficar sozinha: deita-se de lado (posição lateral de segurança) e liga-se 112 se não acordar, respirar mal ou tiver convulsões.' },
          { ico: '🫶', titulo: 'O que podes fazer', lista: ['Dizer «não» sem ter de dar explicações', 'Combinar com os amigos cuidarem uns dos outros', 'Nunca entrar num carro com um condutor que bebeu', 'Pedir ajuda se o álcool estiver a causar problemas em casa'] },
        ],
        mitos: [
          ['Misturar bebidas é que faz mal.', 'O que conta é a quantidade total de álcool, não a mistura.'],
          ['Um café ou um duche frio passam a bebedeira.', 'Só o tempo elimina o álcool — o fígado demora cerca de uma hora por bebida.'],
          ['A cerveja e o vinho fazem menos mal do que as bebidas brancas.', 'Uma imperial, um copo de vinho e um shot têm quantidades de álcool parecidas.'],
        ],
        alerta: { titulo: 'Liga 112 se um amigo…', lista: ['Não acordar ou não responder', 'Respirar devagar ou de forma irregular', 'Vomitar inconsciente ou tiver convulsões'] },
      },
      '18-65': {
        intro: 'O consumo excessivo de álcool é a principal causa de cirrose em Portugal. A doença evolui em silêncio: primeiro o fígado gordo, depois a hepatite alcoólica e a fibrose e, por fim, a cirrose. Parar de beber permite ao fígado recuperar nas fases iniciais.',
        imagens: [
          ['figado-doente', 'Do fígado gordo à cirrose'],
          ['alcool', 'Reduzir ou parar: o fígado agradece'],
          ['analise', 'Análises e ecografia avaliam o fígado'],
        ],
        seccoes: [
          { ico: '🍷', titulo: 'Quanto é demais?', texto: 'Uma bebida-padrão (uma imperial, um copo de vinho ou uma dose de bebida destilada) tem cerca de 10 g de álcool. Não há um consumo totalmente seguro: o risco para o fígado e para vários cancros aumenta com a quantidade. Beber todos os dias e beber muito numa só ocasião são os padrões mais perigosos.' },
          { ico: '🩺', titulo: 'Sinais', lista: ['No início, geralmente nenhum', 'Cansaço, perda de apetite e de peso', 'Pele e olhos amarelos (icterícia)', 'Barriga inchada (ascite) e pernas inchadas', 'Nódoas negras fáceis e vasinhos em aranha na pele', 'Confusão e sonolência (encefalopatia)'] },
          { ico: '🔬', titulo: 'Avaliação', texto: 'As análises ao sangue, a ecografia e, cada vez mais, a elastografia (um exame semelhante à ecografia que mede a rigidez do fígado) permitem avaliar a fibrose sem biópsia. Devem procurar-se sempre outras causas, como as hepatites virais e o fígado gordo associado ao excesso de peso.' },
          { ico: '💪', titulo: 'Tratamento', lista: ['Parar de beber é o tratamento mais eficaz — há consultas e medicamentos que ajudam', 'Alimentação adequada, com proteína suficiente', 'Vacinas contra as hepatites A e B', 'Na cirrose: vigilância regular, incluindo ecografia de 6 em 6 meses para detetar cedo o cancro do fígado', 'Em casos selecionados, transplante hepático'] },
        ],
        alerta: { titulo: 'Vá à urgência se…', lista: ['Vomitar sangue ou tiver fezes negras', 'Ficar confuso ou muito sonolento', 'Tiver a barriga muito inchada, com febre ou dor', 'Ficar com a pele e os olhos amarelos'] },
        ligacoes: [
          { href: 'calculadora-saude-mental/', texto: 'Questionário AUDIT (consumo de álcool)' },
          { href: 'calculadora-habitos/', texto: 'Calcular os gramas de álcool por semana' },
          { href: 'calculadora-hepatica/', texto: 'FIB-4, Child-Pugh e MELD' },
        ],
      },
      '65+': {
        intro: 'Com a idade, o corpo tolera pior o álcool: a mesma quantidade faz subir mais a alcoolemia, interage com medicamentos e aumenta o risco de quedas. O fígado também agradece que se beba menos.',
        imagens: [
          ['alcool', 'Com a idade, o mesmo copo faz mais efeito'],
          ['comprimido', 'O álcool interage com muitos medicamentos'],
          ['figado', 'Um fígado bem cuidado trabalha melhor'],
          ['agua', 'Água ao longo do dia'],
        ],
        seccoes: [
          { ico: '💊', titulo: 'Álcool e medicamentos', texto: 'O álcool interage com os medicamentos para dormir, para a ansiedade e para a dor, com os anticoagulantes e com os antidiabéticos, entre outros. Pergunte ao médico ou ao farmacêutico se pode beber com a medicação que toma.' },
          { ico: '⚠️', titulo: 'Riscos a ter em conta', lista: ['Quedas e fraturas', 'Confusão e problemas de memória', 'Tensão arterial e açúcar descontrolados', 'Interações com medicamentos', 'Solidão e tristeza escondidas atrás do copo'] },
          { ico: '🩺', titulo: 'Se já tem doença do fígado', lista: ['Não beba álcool nenhum', 'Vá às consultas e faça as ecografias marcadas', 'Cuidado com o paracetamol em doses altas e com os produtos «naturais»', 'Avise o médico se ficar confuso, com a barriga inchada ou amarelo'] },
        ],
        alerta: { titulo: 'Vá à urgência se…', lista: ['Vomitar sangue ou tiver fezes negras', 'Tiver confusão ou sonolência fora do habitual', 'Tiver a barriga muito inchada, com febre'] },
      },
    },
  },

  {
    id: 'obesidade-infantil',
    nome: 'Obesidade infantil',
    emoji: '🍎',
    categoria: 'Metabolismo',
    palavras: 'excesso de peso crianças alimentação ecrãs IMC refrigerantes sopa atividade física',
    resumo: 'Portugal tem das taxas de excesso de peso infantil mais altas da Europa. A solução está nos hábitos de toda a família — sem dietas nem culpas.',
    heroi: 'bicicleta',
    deco: 'bicicleta',
    grupos: {
      '3-5': {
        imagens: [
          ['agua', 'A água é a melhor bebida'],
          ['prato', 'Fruta e legumes em todas as refeições'],
          ['sopa', 'Sopa ao almoço e ao jantar'],
          ['bicicleta', 'Brincar e mexer todos os dias'],
          ['ecra', 'Menos tempo em frente aos ecrãs'],
          ['sono', 'Dormir bem ajuda a crescer'],
        ],
      },
      '5-12': {
        intro: 'Cada corpo é diferente, e todos merecem respeito! Comer bem, mexer muito e dormir o suficiente ajuda o corpo a crescer forte e saudável. Estes hábitos são para toda a família, não só para ti.',
        imagens: [
          ['prato', 'O prato ideal: metade legumes, um quarto proteína, um quarto hidratos'],
          ['refrigerante', 'Refrigerantes e sumos de pacote têm muito açúcar'],
          ['bicicleta', 'Pelo menos 60 minutos de brincadeira ativa por dia'],
          ['ecra', 'Ecrãs: no máximo 2 horas por dia, e nunca às refeições'],
        ],
        seccoes: [
          { ico: '⚖️', titulo: 'O que é?', texto: 'Acontece quando o corpo guarda mais gordura do que precisa, porque recebe mais energia da comida do que gasta a brincar e a crescer. Pode acontecer a qualquer pessoa e não é culpa de ninguém. Com o tempo, pode causar problemas no coração, nos ossos e no açúcar do sangue.' },
          { ico: '🥗', titulo: 'Comer bem', lista: ['Pequeno-almoço todos os dias', 'Sopa, fruta e legumes nas refeições principais', 'Água em vez de refrigerantes e sumos', 'Doces e bolos só em dias de festa', 'Comer devagar, à mesa e em família'] },
          { ico: '⚽', titulo: 'Mexer e dormir', lista: ['Brincar ao ar livre, andar de bicicleta, saltar à corda, dançar', 'Ir a pé para a escola, quando for possível', 'Dormir 9 a 12 horas por noite', 'Desligar os ecrãs uma hora antes de dormir'] },
          { ico: '💛', titulo: 'Respeito por todos', texto: 'Ninguém deve ser gozado por causa do corpo. Se alguém goza contigo ou com um colega, conta a um adulto. Dietas só com o médico — a ideia é ter hábitos saudáveis, não passar fome.' },
        ],
        curiosidade: 'Uma lata de refrigerante pode ter o equivalente a 6 ou 7 pacotes de açúcar!',
      },
      '13-17': {
        intro: 'Na adolescência, o corpo muda muito, e é normal ter dúvidas sobre o peso e a imagem. O excesso de peso nesta idade tende a continuar na idade adulta, mas são os hábitos — e não as dietas restritivas — que fazem a diferença.',
        imagens: [
          ['refrigerante', 'Bebidas açucaradas e energéticas: muito açúcar escondido'],
          ['bicicleta', '60 minutos de atividade física por dia'],
          ['sono', 'Dormir pouco aumenta a fome no dia seguinte'],
        ],
        seccoes: [
          { ico: '📏', titulo: 'Como se avalia', texto: 'Nos jovens, o IMC (o peso a dividir pela altura ao quadrado) compara-se com as curvas de crescimento da OMS para a idade e o sexo. O médico de família avalia também o perímetro da cintura, a tensão arterial e, se for preciso, pede análises.' },
          { ico: '🍽️', titulo: 'Hábitos que funcionam', lista: ['Não saltar o pequeno-almoço', 'Água como bebida principal', 'Fruta e frutos secos como snack', 'Menos fast food e ultraprocessados', 'Um desporto que te dê prazer, com amigos'] },
          { ico: '🧠', titulo: 'Corpo e cabeça', texto: 'As dietas muito restritivas, os jejuns prolongados e os conselhos «milagrosos» das redes sociais podem fazer mal e levar a perturbações do comportamento alimentar. Se a comida, o peso ou o corpo te preocupam muito, fala com alguém de confiança ou com o médico.' },
        ],
        mitos: [
          ['Para emagrecer é preciso deixar de comer.', 'Saltar refeições aumenta a fome e o petiscar. O que resulta são refeições regulares e equilibradas.'],
          ['Os sumos naturais podem beber-se à vontade.', 'Têm o açúcar da fruta e pouca fibra. Mais vale comer a fruta inteira.'],
          ['Quem tem excesso de peso é preguiçoso.', 'O peso depende da genética, do ambiente, do sono, do stress e de muito mais. Julgar não ajuda ninguém.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Te sentires tão mal com o teu corpo que evitas comer ou vomitas', 'Ressonares muito ou acordares sempre cansado', 'Tiveres manchas escuras e grossas no pescoço ou nas axilas (podem indicar resistência à insulina)'] },
      },
      '18-65': {
        intro: 'Este separador é para pais e cuidadores. Em Portugal, cerca de 3 em cada 10 crianças em idade escolar têm excesso de peso. O papel da família é decisivo: as crianças comem o que há em casa e fazem o que veem fazer.',
        imagens: [
          ['sopa', 'Refeições em família, à mesa e sem ecrãs'],
          ['refrigerante', 'Em casa, água em vez de refrigerantes'],
          ['bicicleta', 'Atividade física em família'],
        ],
        seccoes: [
          { ico: '📏', titulo: 'Como saber', texto: 'Nas crianças, o peso avalia-se pelo IMC nas curvas de crescimento da OMS: entre os percentis 85 e 97 há excesso de peso e, acima do percentil 97, obesidade. As consultas de saúde infantil do centro de saúde fazem esta avaliação.' },
          { ico: '🏠', titulo: 'O que os pais podem fazer', lista: ['Ter fruta e legumes à vista e os doces fora de casa', 'Água como bebida habitual; refrigerantes e sumos só como exceção', 'Os pais decidem o que se come e quando; a criança decide quanto', 'Não usar a comida como prémio nem como castigo', 'Ecrãs fora do quarto e das refeições', 'Rotinas de sono regulares'] },
          { ico: '⚠️', titulo: 'Porque importa', lista: ['Tensão alta, colesterol e fígado gordo já na infância', 'Risco de diabetes tipo 2', 'Apneia do sono e dores nas articulações', 'Baixa autoestima e bullying', 'Tendência para manter o excesso de peso em adulto'] },
          { ico: '💬', titulo: 'Como falar sobre o tema', texto: 'Fale de saúde, de energia e de força — não de peso nem de aparência. Evite comentários sobre o corpo da criança ou de outras pessoas. As mudanças devem ser para toda a família, nunca só para a criança.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['A criança ressonar muito ou fizer pausas a respirar durante o sono', 'Tiver manchas escuras e grossas no pescoço ou nas axilas', 'Se isolar, for alvo de gozo ou mostrar sinais de tristeza', 'Houver um aumento rápido de peso'] },
        ligacoes: [{ href: 'calculadora-crescimento/', texto: 'Ver o IMC nas curvas de crescimento da OMS' }],
      },
      '65+': {
        intro: 'Este separador é para os avós. Os avós passam muito tempo com os netos e têm um papel enorme nos hábitos que eles levam para a vida. Mimar não tem de ser com doces.',
        imagens: [
          ['sopa', 'A sopa da avó é das melhores tradições'],
          ['bicicleta', 'Passear e brincar ao ar livre com os netos'],
          ['prato', 'Lanches de fruta, pão e iogurte'],
          ['abraco', 'O carinho não precisa de vir em doces'],
        ],
        seccoes: [
          { ico: '💛', titulo: 'Mimar de outra maneira', lista: ['Histórias, jogos, jardinagem e passeios em vez de guloseimas', 'Cozinhar juntos, com legumes e fruta', 'Doces só em dias especiais, combinados com os pais', 'Água para matar a sede'] },
          { ico: '🤝', titulo: 'Combinar com os pais', texto: 'As regras funcionam melhor quando são as mesmas em casa dos pais e em casa dos avós. Combinem os horários das refeições, dos lanches, dos ecrãs e do sono.' },
          { ico: '🚶', titulo: 'Bom para os dois', texto: 'Caminhar, ir ao parque ou à horta com os netos é exercício para a criança e para os avós. Mexer juntos é dos melhores remédios para ambos.' },
        ],
        alerta: { titulo: 'Fale com os pais e com o médico se…', lista: ['Notar que a criança ressona muito ou parece sempre cansada', 'A criança comer às escondidas ou mostrar tristeza com o corpo', 'For alvo de gozo na escola'] },
      },
    },
  },

  {
    id: 'osteoporose',
    nome: 'Osteoporose',
    alias: 'Ossos frágeis e fraturas',
    emoji: '🩼',
    categoria: 'Ossos e articulações',
    palavras: 'fraturas anca punho coluna densitometria cálcio vitamina D quedas ossos',
    resumo: 'Os ossos ficam porosos e frágeis e partem-se com quedas pequenas. Constrói-se osso até aos 30 anos e protege-se a vida toda.',
    heroi: 'ossos',
    deco: 'osso',
    grupos: {
      '3-5': {
        imagens: [
          ['ossos', 'Os ossos são a estrutura do corpo'],
          ['leite', 'Leite, iogurte e queijo dão força aos ossos'],
          ['sol-vitamina', 'Brincar ao sol, com cuidado'],
          ['brincar', 'Saltar e correr deixa os ossos fortes'],
          ['bengala', 'Os avós têm de ter cuidado para não cair'],
          ['luz-noite', 'Uma luz acesa à noite ajuda a não cair'],
        ],
      },
      '5-12': {
        intro: 'Os ossos estão vivos e crescem contigo! Até aos 30 anos, o corpo vai guardando osso, como num mealheiro. A osteoporose acontece mais tarde, quando os ossos perdem força e ficam como uma esponja com buracos grandes.',
        imagens: [
          ['ossos', 'Por dentro, o osso parece uma esponja'],
          ['leite', 'O cálcio constrói os ossos'],
          ['sol-vitamina', 'O sol ajuda o corpo a fazer vitamina D'],
          ['brincar', 'Saltar e correr fortalecem os ossos'],
        ],
        seccoes: [
          { ico: '🦴', titulo: 'Ossos vivos', texto: 'Um bebé nasce com cerca de 300 ossos, que se vão juntando até ficarem 206 num adulto. Os ossos estão sempre a ser desfeitos e refeitos e, enquanto crescemos, fazemos mais osso do que gastamos.' },
          { ico: '🕳️', titulo: 'O que é a osteoporose?', texto: 'Com a idade, sobretudo nas mulheres depois da menopausa, os ossos perdem mais do que ganham. Ficam porosos e frágeis e podem partir-se com uma queda pequena — por exemplo, o pulso ou a anca dos avós.' },
          { ico: '🥛', titulo: 'Encher o mealheiro de osso', lista: ['Leite, iogurte e queijo, ou outros alimentos com cálcio (sardinhas, brócolos, feijão)', 'Brincar ao ar livre: o sol ajuda a fazer vitamina D', 'Saltar, correr, dançar e jogar à bola', 'Água e leite em vez de refrigerantes'] },
          { ico: '👵', titulo: 'Ajudar os avós', texto: 'Ajuda-os a ter a casa arrumada, sem coisas no chão onde possam tropeçar, e acompanha-os nos passeios. Uma queda pode partir um osso fraco.' },
        ],
        curiosidade: 'O fémur, o osso da coxa, é o maior e o mais forte do corpo — consegue aguentar várias vezes o peso de uma pessoa!',
      },
      '13-17': {
        intro: 'A adolescência é a melhor altura para construir osso: cerca de metade da massa óssea de um adulto forma-se nestes anos. O que fizeres agora vai proteger-te das fraturas daqui a muitas décadas.',
        imagens: [
          ['ossos', 'O pico de massa óssea atinge-se por volta dos 25–30 anos'],
          ['brincar', 'Os desportos com saltos constroem mais osso'],
          ['leite', 'Cálcio e vitamina D suficientes'],
        ],
        seccoes: [
          { ico: '🏗️', titulo: 'Construir osso', lista: ['Desportos com saltos e impacto (basquetebol, voleibol, corrida, dança)', '3 porções por dia de lacticínios, ou alternativas ricas em cálcio', 'Tempo ao ar livre, com proteção solar adequada', 'Proteína suficiente na alimentação'] },
          { ico: '⚠️', titulo: 'O que tira osso', lista: ['Tabaco e álcool', 'Dietas muito restritivas e baixo peso', 'Falta de menstruação, por exemplo por exercício excessivo com pouca alimentação', 'Alguns medicamentos, como os corticoides tomados durante muito tempo'] },
          { ico: '💡', titulo: 'Porque importa já', texto: 'Quanto mais osso tiveres aos 30 anos, mais tempo levarás a chegar à osteoporose. É como um mealheiro: o que poupas agora é o que vais ter para gastar mais tarde.' },
        ],
        mitos: [
          ['A osteoporose é só uma doença de mulheres idosas.', 'Também atinge homens, e a sua prevenção começa na infância e na adolescência.'],
          ['Partir um osso numa queda pequena é normal com a idade.', 'Uma fratura com uma queda da própria altura pode ser o primeiro sinal de osteoporose.'],
          ['Basta beber leite para ter ossos fortes.', 'O cálcio é importante, mas o exercício com impacto é igualmente essencial.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Partires um osso com uma queda pequena', 'A menstruação parar durante vários meses', 'Fizeres dietas muito restritivas ou estiveres muito abaixo do peso'] },
      },
      '18-65': {
        intro: 'A partir dos 50 anos, cerca de 1 em cada 3 mulheres e 1 em cada 5 homens vão ter uma fratura por osteoporose. A doença não dói até um osso partir — por isso é importante conhecer o risco e preveni-la.',
        imagens: [
          ['ossos', 'Osso normal e osso com osteoporose'],
          ['densitometria', 'A densitometria óssea mede a densidade do osso'],
          ['halteres', 'Exercício de força e de impacto protege o osso'],
        ],
        seccoes: [
          { ico: '⚠️', titulo: 'Fatores de risco', lista: ['Sexo feminino e menopausa, sobretudo se precoce', 'Idade', 'Fratura anterior com pouco trauma', 'Pais com fratura da anca', 'Baixo peso', 'Tabaco e álcool em excesso', 'Corticoides prolongados, artrite reumatoide e outras doenças'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'A densitometria óssea (DEXA) mede a densidade mineral do osso; um T-score igual ou inferior a −2,5 define osteoporose. O risco de fratura a 10 anos calcula-se com ferramentas como o FRAX, que ajudam a decidir quem tratar.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Cálcio na alimentação e vitamina D, se houver falta', 'Exercício de força, equilíbrio e impacto adaptado', 'Prevenir as quedas', 'Medicamentos que travam a perda de osso (como os bifosfonatos) ou que estimulam a sua formação, quando o risco é elevado'] },
          { ico: '🦴', titulo: 'Fraturas típicas', texto: 'Punho, vértebras (que podem «abater» sem queda, causando dor nas costas e perda de altura) e anca. A fratura da anca é a mais grave: exige quase sempre cirurgia, e muitas pessoas não recuperam a autonomia que tinham.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Tiver uma fratura com uma queda da própria altura', 'Perder mais de 3 cm de altura ou ficar mais curvado', 'Tiver uma dor nas costas súbita e intensa, sem causa'] },
        ligacoes: [{ href: 'calculadora-rastreio/', texto: 'Avaliar o risco de fratura' }],
      },
      '65+': {
        intro: 'Depois dos 65 anos, a maior parte das fraturas acontece por quedas. Proteger os ossos é também evitar cair: casa segura, músculos fortes, boa visão e medicação revista.',
        imagens: [
          ['quedas', 'A maioria das fraturas acontece em casa, numa queda'],
          ['luz-noite', 'Luz de presença no caminho para a casa de banho'],
          ['halteres', 'Força e equilíbrio: tai chi e exercícios em casa'],
          ['leite', 'Lacticínios, sardinhas e vitamina D'],
        ],
        seccoes: [
          { ico: '🏠', titulo: 'Casa sem quedas', lista: ['Tirar tapetes soltos e fios do chão', 'Luz de presença à noite', 'Barras de apoio e tapete antiderrapante na casa de banho', 'Calçado fechado e com sola antiderrapante', 'Objetos de uso diário ao alcance, sem subir a bancos'] },
          { ico: '💊', titulo: 'Medicamentos', texto: 'Alguns medicamentos para dormir, para a tensão ou para o humor aumentam o risco de quedas. Peça ao médico para rever a medicação todos os anos. Se lhe foi receitado um medicamento para a osteoporose, não o pare sem falar com ele.' },
          { ico: '🦴', titulo: 'Depois de uma fratura', texto: 'Uma primeira fratura aumenta muito o risco de outra. É o momento certo para avaliar a osteoporose, começar o tratamento e fazer reabilitação — e voltar a caminhar o mais cedo possível.' },
        ],
        alerta: { titulo: 'Peça ajuda se…', lista: ['Cair e não conseguir pôr-se de pé ou apoiar a perna (ligue 112)', 'Tiver uma dor forte na anca ou na virilha depois de uma queda', 'Tiver medo de cair ou quedas repetidas'] },
        ligacoes: [{ href: 'calculadora-geriatria/', texto: 'Avaliação geriátrica (Timed Up and Go, escala de Morse)' }],
      },
    },
  },

  {
    id: 'demencia',
    nome: 'Demência',
    alias: 'Doença de Alzheimer e outras',
    emoji: '🧩',
    categoria: 'Cérebro e nervos',
    tambem: ['Saúde mental'],
    palavras: 'Alzheimer memória esquecimento demência vascular cuidador confusão',
    resumo: 'Perda progressiva da memória e de outras capacidades, que afeta a vida diária. A doença de Alzheimer é a causa mais comum.',
    heroi: 'puzzle-cerebro',
    deco: 'puzzle',
    grupos: {
      '3-5': {
        imagens: [
          ['cerebro', 'O cérebro guarda as nossas memórias'],
          ['puzzle-cerebro', 'Às vezes os avós esquecem-se de coisas'],
          ['conversa', 'Podes contar-lhes histórias muitas vezes'],
          ['musica', 'Cantar juntos faz bem'],
          ['abraco', 'Mesmo que se esqueçam, sentem o teu carinho'],
          ['cuidar', 'Dar a mão e passear juntos'],
        ],
      },
      '5-12': {
        intro: 'A demência é uma doença do cérebro que faz as pessoas esquecerem-se de coisas e terem dificuldade no dia a dia. Acontece sobretudo a pessoas idosas. A mais comum chama-se doença de Alzheimer.',
        imagens: [
          ['puzzle-cerebro', 'A memória vai perdendo peças, como um puzzle'],
          ['calendario', 'Calendários e listas ajudam a lembrar'],
          ['musica', 'As músicas antigas ficam guardadas muito tempo'],
          ['cuidar', 'Paciência e carinho ajudam muito'],
        ],
        seccoes: [
          { ico: '🧠', titulo: 'O que é?', texto: 'O cérebro é feito de milhões de células, os neurónios, que falam umas com as outras. Na demência, algumas destas células vão deixando de funcionar. Primeiro custa lembrar coisas recentes; com o tempo, fica difícil vestir-se, cozinhar ou reconhecer lugares.' },
          { ico: '❓', titulo: 'Porque é que o avô repete as mesmas perguntas?', texto: 'Porque não se lembra de já ter perguntado. Não está a fazer de propósito nem a brincar contigo. Responder com calma, outra vez, é uma grande ajuda.' },
          { ico: '💛', titulo: 'Como posso ajudar?', lista: ['Falar devagar e dizer uma coisa de cada vez', 'Ver fotografias antigas e ouvir as histórias de antigamente', 'Cantar, desenhar e jogar jogos simples juntos', 'Não corrigir sempre: às vezes é melhor só ouvir'] },
          { ico: '🤗', titulo: 'E o que eu sinto?', texto: 'É normal ficares triste, confuso ou até zangado. Fala com os teus pais sobre isso. O avô ou a avó continuam a precisar do teu carinho — e o carinho sente-se mesmo quando as palavras se esquecem.' },
        ],
        curiosidade: 'O cérebro tem cerca de 86 mil milhões de neurónios, e as ligações entre eles são mais do que as estrelas da nossa galáxia!',
      },
      '13-17': {
        intro: 'Muitos jovens têm um avô ou uma avó com demência. Perceber a doença ajuda a lidar com ela — e alguns hábitos que começam na tua idade protegem o teu cérebro no futuro.',
        imagens: [
          ['puzzle-cerebro', 'A doença de Alzheimer é a causa mais comum'],
          ['cuidar', 'Cuidar de quem cuida também é importante'],
          ['correr', 'Exercício, sono e aprender protegem o cérebro'],
        ],
        seccoes: [
          { ico: '🧠', titulo: 'O que é', texto: 'Demência é um conjunto de sintomas — perda de memória, de orientação, de linguagem e da capacidade de decidir — que tornam a pessoa dependente. A causa mais frequente é a doença de Alzheimer; seguem-se a demência vascular, ligada a AVC e a vasos doentes, e outras.' },
          { ico: '🛡️', titulo: 'Proteger o cérebro desde já', lista: ['Estudar e aprender coisas novas', 'Proteger a cabeça: capacete na bicicleta e na trotinete', 'Proteger a audição: volume baixo nos auscultadores', 'Não fumar e evitar o álcool', 'Mexer-te e dormir bem'] },
          { ico: '🫶', titulo: 'Quando é na família', texto: 'Cuidar de alguém com demência é exigente e pode mudar a rotina da casa. É normal sentires frustração ou tristeza. Pequenos gestos — uma visita, uma música, um passeio — fazem diferença para todos.' },
        ],
        mitos: [
          ['Perder a memória faz parte de envelhecer.', 'Esquecimentos leves são normais, mas a demência é uma doença — não uma consequência inevitável da idade.'],
          ['A demência é sempre hereditária.', 'A grande maioria dos casos não é herdada diretamente; só formas raras passam de pais para filhos.'],
          ['Não há nada que se possa fazer.', 'Cerca de 4 em cada 10 casos estão ligados a fatores que se podem prevenir, como a hipertensão, o tabaco, a surdez não tratada e o isolamento.'],
        ],
        alerta: { titulo: 'Fala com um adulto se…', lista: ['Um familiar se perder em sítios que conhece bem', 'Notares que alguém mais velho deixou de conseguir tratar das contas, da comida ou dos medicamentos', 'Te sentires sobrecarregado a ajudar em casa'] },
      },
      '18-65': {
        intro: 'Portugal está entre os países europeus com mais pessoas com demência por habitante, e o número vai aumentar com o envelhecimento. Reconhecer os sinais cedo permite tratar causas reversíveis, planear o futuro e apoiar quem cuida.',
        imagens: [
          ['puzzle-cerebro', 'Memória, linguagem, orientação e decisões'],
          ['tensiometro', 'O que faz bem ao coração faz bem ao cérebro'],
          ['cuidar', 'Apoiar quem cuida'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais de alerta', lista: ['Esquecer acontecimentos recentes e repetir perguntas', 'Perder-se em locais conhecidos', 'Dificuldade em gerir o dinheiro, os medicamentos ou as tarefas habituais', 'Dificuldade em encontrar as palavras', 'Mudanças de personalidade, desconfiança, apatia'] },
          { ico: '🛡️', titulo: 'Prevenção', texto: 'Cerca de 4 em cada 10 casos de demência estão associados a fatores que se podem modificar:', lista: ['Hipertensão, diabetes, colesterol elevado e obesidade', 'Tabaco e álcool em excesso', 'Sedentarismo', 'Perda de audição e de visão não corrigidas', 'Depressão e isolamento social', 'Traumatismos cranianos'] },
          { ico: '🔬', titulo: 'Avaliação', texto: 'Começa no médico de família, com testes de memória (como o MMSE ou o MoCA) e análises para excluir causas tratáveis, como a falta de vitamina B12, problemas da tiroide, a depressão ou efeitos de medicamentos. Pode ser necessária imagem cerebral e uma consulta de neurologia.' },
          { ico: '🤝', titulo: 'Cuidar de quem cuida', lista: ['Pedir ajuda cedo: centro de saúde, assistente social, associações', 'Conhecer o Estatuto do Cuidador Informal', 'Tirar tempo para descansar (descanso do cuidador)', 'Tratar das questões legais e financeiras enquanto a pessoa ainda pode decidir'] },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Aparecer confusão de repente, em horas ou dias (pode ser um delírio por infeção ou por medicamentos)', 'Houver sinais de AVC: boca ao lado, falta de força, dificuldade em falar', 'A pessoa se perder e não for encontrada'] },
        ligacoes: [
          { href: 'calculadora-geriatria/', texto: 'Testes de rastreio cognitivo (MMSE, MoCA)' },
          { href: 'calculadora-familia/', texto: 'Escala de sobrecarga do cuidador (Zarit)' },
        ],
      },
      '65+': {
        intro: 'Esquecer um nome de vez em quando é normal. Esquecer conversas recentes, perder-se ou ter dificuldade em tratar das coisas do dia a dia não é — e merece uma conversa com o médico.',
        imagens: [
          ['puzzle-cerebro', 'Esquecimentos que atrapalham o dia a dia'],
          ['conversa', 'Conviver é exercício para o cérebro'],
          ['musica', 'Música, leitura, jogos e aprender coisas novas'],
          ['bengala', 'Caminhar todos os dias'],
        ],
        seccoes: [
          { ico: '🧩', titulo: 'Esquecimento normal ou não?', lista: ['Normal: esquecer onde pôs as chaves e lembrar-se depois', 'Não é normal: esquecer conversas recentes inteiras', 'Normal: demorar a encontrar uma palavra', 'Não é normal: perder-se em sítios conhecidos ou deixar de conseguir pagar as contas como antes'] },
          { ico: '🛡️', titulo: 'Proteger o cérebro', lista: ['Controlar a tensão, o açúcar e o colesterol', 'Usar aparelho auditivo se ouvir mal, e óculos se vir mal', 'Manter-se ativo: caminhar, ler, jogar, aprender', 'Conviver: família, amigos, universidade sénior', 'Dormir bem e tratar a tristeza'] },
          { ico: '🗓️', titulo: 'Truques para o dia a dia', lista: ['Calendário e lista de tarefas à vista', 'Caixa de medicamentos semanal', 'Um sítio fixo para as chaves e os óculos', 'Rotinas com horários regulares'] },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Os esquecimentos estiverem a piorar ou a atrapalhar o dia a dia', 'Os familiares notarem mudanças na sua memória ou no seu feitio', 'Aparecer confusão de repente (pode ser uma infeção ou um efeito de medicamentos — é urgente)'] },
        ligacoes: [{ href: 'calculadora-geriatria/', texto: 'Escalas de avaliação geriátrica' }],
      },
    },
  },

  {
    id: 'tuberculose',
    nome: 'Tuberculose',
    emoji: '🦠',
    categoria: 'Respiratório',
    palavras: 'TB bacilo de Koch tosse BCG Mantoux IGRA CDP infeção',
    resumo: 'Infeção causada por uma bactéria que se transmite pelo ar e atinge sobretudo os pulmões. Cura-se com o tratamento completo, e Portugal tem mais casos do que a média europeia.',
    heroi: 'pulmoes-bacilos',
    deco: 'bacilo',
    grupos: {
      '3-5': {
        imagens: [
          ['pulmoes-bacilos', 'Há um micróbio que pode morar nos pulmões'],
          ['tosse', 'Faz tossir durante muito tempo'],
          ['cotovelo', 'Tossir para o cotovelo'],
          ['janela', 'Abrir as janelas deixa entrar ar limpo'],
          ['comprimido', 'Os remédios tomam-se todos os dias'],
          ['abraco', 'Com o tratamento, fica-se bom'],
        ],
      },
      '5-12': {
        intro: 'A tuberculose é uma infeção causada por uma bactéria muito pequenina, o bacilo de Koch. Vive sobretudo nos pulmões e passa de pessoa para pessoa pelo ar, quando alguém doente tosse. Tem cura!',
        imagens: [
          ['pulmoes-bacilos', 'Ao microscópio, o bacilo de Koch parece um pauzinho'],
          ['tosse', 'Tosse que dura mais de 3 semanas'],
          ['janela', 'Casas e salas bem arejadas'],
          ['pastilheiro', 'Tratamento todos os dias, durante pelo menos 6 meses'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'O que é?', texto: 'É uma doença causada por uma bactéria descoberta em 1882 por um médico chamado Robert Koch. Quando uma pessoa com tuberculose nos pulmões tosse ou fala, solta bactérias para o ar, que outras pessoas podem respirar.' },
          { ico: '🤒', titulo: 'Como se sente?', lista: ['Tosse que não passa', 'Febre, sobretudo ao fim do dia', 'Suores à noite', 'Cansaço e perda de peso'] },
          { ico: '💊', titulo: 'Como se trata?', texto: 'Com vários medicamentos ao mesmo tempo, todos os dias, durante pelo menos 6 meses. É muito importante não falhar nenhum dia, mesmo quando já se está bem. O tratamento é gratuito no SNS.' },
          { ico: '🛡️', titulo: 'Como se previne?', lista: ['Arejar bem as casas e as salas de aula', 'Tossir e espirrar para o cotovelo', 'Quem esteve perto de um doente faz exames, mesmo sem sintomas', 'Algumas crianças com mais risco levam a vacina BCG'] },
        ],
        curiosidade: 'O Dia Mundial da Tuberculose é a 24 de março: foi nesse dia, em 1882, que Robert Koch anunciou a descoberta da bactéria!',
      },
      '13-17': {
        intro: 'Portugal tem mais casos de tuberculose do que a média da União Europeia, sobretudo nas áreas metropolitanas de Lisboa e do Porto. A tuberculose cura-se, mas só com o tratamento completo.',
        imagens: [
          ['pulmoes-bacilos', 'Transmite-se pelo ar, em contactos próximos e prolongados'],
          ['raio-x', 'Raio-X e análise da expetoração fazem o diagnóstico'],
          ['pastilheiro', 'Tratamento de 6 meses, sem falhas'],
        ],
        seccoes: [
          { ico: '🌬️', titulo: 'Como se apanha', texto: 'Só a tuberculose dos pulmões ou da garganta é contagiosa. Apanha-se ao respirar o ar de espaços fechados onde esteve, durante muito tempo, uma pessoa doente — e não por partilhar copos, talheres ou roupa.' },
          { ico: '😴', titulo: 'Infeção latente', texto: 'Muitas pessoas infetadas não ficam doentes: a bactéria fica «adormecida» e não se transmite. Mas pode acordar anos depois, sobretudo se as defesas baixarem. Por isso, quem esteve em contacto com um doente faz testes e, às vezes, um tratamento preventivo.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Vários antibióticos durante pelo menos 6 meses', 'Tomas diárias, muitas vezes observadas por um profissional de saúde', 'Ao fim de algumas semanas de tratamento correto, a pessoa deixa geralmente de ser contagiosa', 'Falhar tomas pode criar bactérias resistentes, muito mais difíceis de tratar'] },
        ],
        mitos: [
          ['A tuberculose é uma doença do passado.', 'Ainda é uma das doenças infeciosas que mais matam no mundo, e Portugal tem mais de mil casos por ano.'],
          ['Apanha-se ao partilhar copos ou talheres.', 'Transmite-se pelo ar, ao tossir, falar ou espirrar, em contactos próximos e prolongados.'],
          ['Só acontece a pessoas pobres.', 'Pode afetar qualquer pessoa, embora a pobreza, a má alimentação e as casas sobrelotadas aumentem o risco.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Tiveres tosse durante mais de 3 semanas', 'Tiveres febre e suores à noite e perderes peso', 'Tossires sangue', 'Alguém próximo de ti tiver tuberculose'] },
      },
      '18-65': {
        intro: 'Portugal tem uma incidência de tuberculose acima da média europeia, com mais casos nas áreas metropolitanas de Lisboa e do Porto. O diagnóstico precoce interrompe a transmissão, e o tratamento completo cura.',
        imagens: [
          ['tosse', 'Tosse com mais de 3 semanas: pensar em tuberculose'],
          ['raio-x', 'Radiografia do tórax e análise da expetoração'],
          ['pastilheiro', 'Tratamento gratuito, observado e completo'],
        ],
        seccoes: [
          { ico: '🩺', titulo: 'Sintomas', lista: ['Tosse persistente (mais de 2 a 3 semanas), às vezes com sangue', 'Febre baixa ao fim do dia e suores noturnos', 'Perda de peso e de apetite', 'Cansaço', 'Pode também atingir gânglios, ossos, rins ou meninges'] },
          { ico: '⚠️', titulo: 'Maior risco', lista: ['Contacto próximo com um doente', 'Infeção por VIH e outras imunossupressões, incluindo medicamentos biológicos', 'Diabetes, doença renal, tabaco e consumo excessivo de álcool', 'Desnutrição, situação de sem-abrigo e prisões', 'Pessoas vindas de países com muita tuberculose'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'Na doença ativa: radiografia do tórax e pesquisa da bactéria na expetoração (exame direto, testes moleculares e cultura). Na infeção latente: teste tuberculínico (Mantoux) ou teste no sangue (IGRA). O teste do VIH é recomendado a todas as pessoas com tuberculose.' },
          { ico: '💊', titulo: 'Tratamento', texto: 'É gratuito no SNS, nos Centros de Diagnóstico Pneumológico e nos centros de saúde. Dura pelo menos 6 meses e não deve ser interrompido. Os contactos próximos são rastreados, para detetar e tratar outras infeções.' },
        ],
        alerta: { titulo: 'Procure o médico se…', lista: ['Tosse durante mais de 3 semanas', 'Febre, suores noturnos e perda de peso', 'Sangue na expetoração (com urgência)', 'Contacto com alguém com tuberculose'] },
      },
      '65+': {
        intro: 'Nos mais velhos, a tuberculose é muitas vezes uma infeção antiga que «acorda» quando as defesas diminuem. Os sintomas podem ser discretos — cansaço, perda de apetite e de peso — e a tosse pode ser confundida com a de fumador.',
        imagens: [
          ['tosse', 'Uma tosse que não passa merece ser investigada'],
          ['balanca', 'Perda de peso sem explicação'],
          ['pastilheiro', 'Caixa semanal para não falhar nenhuma toma'],
          ['janela', 'Arejar a casa todos os dias'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Esteja atento a', lista: ['Tosse com mais de 3 semanas', 'Cansaço e falta de apetite', 'Perda de peso', 'Febre ou suores à noite', 'Falta de ar'] },
          { ico: '💊', titulo: 'Durante o tratamento', lista: ['Tomar todos os comprimidos, todos os dias, até ao fim', 'Fazer as análises de controlo: alguns medicamentos podem afetar o fígado', 'Avisar o médico se ficar com a pele ou os olhos amarelos, com náuseas ou com alterações da visão', 'Não beber álcool'] },
          { ico: '🏠', titulo: 'Proteger a família', texto: 'Nas primeiras semanas de tratamento, areje bem a casa e tape a boca ao tossir. Os familiares e as pessoas próximas devem ser avaliados no centro de saúde ou no Centro de Diagnóstico Pneumológico.' },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Tossir sangue', 'Tiver falta de ar intensa', 'Ficar com a pele ou os olhos amarelos durante o tratamento'] },
      },
    },
  },
];

export const encontrarDoenca = (id) => DOENCAS.find((d) => d.id === id) || null;
export const grupoValido = (id) => GRUPOS.some((g) => g.id === id);

/**
 * Resumo em texto de um separador, para o email (como nas ferramentas):
 * a introdução — ou, para os mais pequenos, as legendas das imagens —, a
 * curiosidade e quando procurar ajuda. A explicação completa fica na ligação.
 */
export function resumoDoenca(d, grupoId) {
  const g = d.grupos[grupoId];
  const grupo = GRUPOS.find((x) => x.id === grupoId);
  const linhas = [`${d.nome} — ${grupo.nome} (${grupo.idade})`, ''];
  if (g.intro) linhas.push(g.intro, '');
  else linhas.push(...g.imagens.map(([, legenda]) => `• ${legenda}`), '');
  if (g.curiosidade) linhas.push(`Sabias que… ${g.curiosidade}`, '');
  if (g.alerta) linhas.push(g.alerta.titulo, ...g.alerta.lista.map((l) => `• ${l}`), '');
  return { assunto: `${d.nome}: explicação para ${grupo.nome.toLowerCase()} (${grupo.idade})`, linhas };
}
