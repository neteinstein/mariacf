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
//
// Cada doença pode ainda ter:
//   eviccao     — regra de afastamento da escola, se for doença de evicção
//                 escolar obrigatória (Decreto Regulamentar n.º 3/95);
//                 aparece em todos os grupos etários, com a EVICCAO_NOTA.

export const EVICCAO_NOTA =
  'Doença de evicção escolar obrigatória (Decreto Regulamentar n.º 3/95): aplica-se a crianças, alunos, professores e funcionários de creches, jardins de infância e escolas. Quem determina a evicção, e as medidas para os contactos, é o médico ou a autoridade de saúde. As faltas são justificadas e, para regressar, pode ser pedida uma declaração médica.';

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
  'Infeções',
  'Cérebro e nervos',
  'Digestivo',
  'Ossos e articulações',
  'Saúde mental',
  'Rins e urologia',
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
    tambem: ['Infeções'],
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
    tambem: ['Infeções'],
    palavras: 'TB bacilo de Koch tosse BCG Mantoux IGRA CDP infeção',
    resumo: 'Infeção causada por uma bactéria que se transmite pelo ar e atinge sobretudo os pulmões. Cura-se com o tratamento completo, e Portugal tem mais casos do que a média europeia.',
    heroi: 'pulmoes-bacilos',
    deco: 'bacilo',
    eviccao: 'Só a tuberculose pulmonar: afastamento até o médico declarar que deixou de ser contagiosa, o que costuma acontecer ao fim de algumas semanas de tratamento.',
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

  {
    id: 'asma',
    nome: 'Asma',
    emoji: '🌬️',
    categoria: 'Respiratório',
    palavras: 'pieira chiadeira bronquite falta de ar inalador bombinha alergia pólen ácaros',
    resumo: 'Os brônquios ficam inflamados e apertam-se em crises, com tosse, pieira e falta de ar. Com o inalador certo, faz-se uma vida normal.',
    heroi: 'bronquio-asma',
    deco: 'bronquio',
    grupos: {
      '3-5': {
        imagens: [
          ['pulmoes', 'Os pulmões enchem-se de ar'],
          ['bronquio-asma', 'Na asma, os tubinhos do ar ficam apertados'],
          ['alergenos', 'Pó, pólen e pelo de animais podem fazer tossir'],
          ['inalador', 'A bombinha abre os tubinhos do ar'],
          ['correr', 'Com a asma tratada, podes correr e brincar'],
          ['abraco', 'Avisa um adulto se custar a respirar'],
        ],
      },
      '5-12': {
        intro: 'A asma é quando os tubinhos que levam o ar aos pulmões — os brônquios — ficam irritados e se apertam. Não se pega, e com o tratamento certo dá para fazer tudo o que os amigos fazem.',
        imagens: [
          ['bronquio-asma', 'Numa crise, os brônquios apertam-se'],
          ['alergenos', 'Pólen, ácaros do pó e pelo de animais'],
          ['inalador', 'O inalador leva o remédio diretamente aos pulmões'],
          ['nadar', 'Nadar e fazer desporto faz bem'],
        ],
        seccoes: [
          { ico: '🌬️', titulo: 'O que é?', texto: 'O ar entra pelo nariz e pela boca e desce por tubinhos até aos pulmões. Na asma, esses tubinhos estão sensíveis: quando encontram uma coisa que os irrita, incham, fazem muco e apertam. O ar passa com dificuldade e ouve-se um assobio a respirar, a pieira.' },
          { ico: '🤧', titulo: 'O que pode causar uma crise?', lista: ['Constipações e gripe', 'Pó da casa, pólen e pelo de animais', 'Fumo do tabaco', 'Ar muito frio ou poluído', 'Às vezes, correr muito sem o inalador'] },
          { ico: '💨', titulo: 'Como se trata?', texto: 'Com inaladores (as «bombinhas»). Há o de todos os dias, que acalma os brônquios, e o de alívio, para as crises. As crianças mais pequenas usam uma câmara expansora, um tubo que ajuda o remédio a chegar aos pulmões.' },
          { ico: '🙋', titulo: 'Numa crise', lista: ['Pára, senta-te e tenta respirar devagar', 'Usa o inalador de alívio como o médico explicou', 'Avisa logo um adulto — na escola também'] },
        ],
        curiosidade: 'Há muitos atletas olímpicos com asma — alguns até ganharam medalhas na natação, no ciclismo e no atletismo!',
      },
      '13-17': {
        intro: 'A asma é uma das doenças crónicas mais frequentes na tua idade. Bem controlada, não deve impedir-te de fazer desporto, sair ou dormir bem — se impede, é sinal de que o tratamento precisa de ser revisto.',
        imagens: [
          ['bronquio-asma', 'Inflamação e aperto dos brônquios'],
          ['inalador', 'O inalador certo, com a técnica certa'],
          ['cigarro', 'Tabaco e vape pioram a asma'],
        ],
        seccoes: [
          { ico: '🫁', titulo: 'O que se passa nos brônquios', texto: 'Na asma, os brônquios estão inflamados mesmo quando te sentes bem. Perante um gatilho — infeções, alergias, fumo, exercício, stress — apertam-se e enchem-se de muco: aparecem tosse (sobretudo à noite), pieira, aperto no peito e falta de ar.' },
          { ico: '💨', titulo: 'Os inaladores', lista: ['O inalador com corticoide trata a inflamação: é o que previne as crises', 'Usar só o inalador de alívio, sem corticoide, não chega e aumenta o risco de crises graves', 'A técnica conta: pede ao médico ou ao farmacêutico para ver como o usas', 'Bochecha com água depois do inalador com corticoide'] },
          { ico: '✅', titulo: 'Asma controlada é…', lista: ['Quase sem sintomas durante o dia', 'Sem acordar à noite com tosse ou falta de ar', 'Fazer desporto sem limitações', 'Precisar do alívio, no máximo, duas vezes por semana'] },
        ],
        mitos: [
          ['Quem tem asma não deve fazer desporto.', 'Deve! Com a asma controlada, o exercício melhora a respiração. Às vezes basta o inalador antes do treino.'],
          ['Os inaladores com corticoide viciam ou fazem engordar.', 'Não viciam, e a dose é tão pequena que, na maioria das pessoas, não tem os efeitos dos corticoides em comprimidos.'],
          ['O vape não faz mal a quem tem asma.', 'O vapor irrita os brônquios e pode provocar crises, tal como o tabaco.'],
        ],
        alerta: { titulo: 'Vai à urgência se…', lista: ['O inalador de alívio não fizer efeito ou precisares dele a toda a hora', 'Não conseguires falar frases inteiras por falta de ar', 'Os lábios ou as unhas ficarem azulados'] },
        ligacoes: [{ href: 'calculadora-respiratoria/?calc=act', texto: 'Teste de controlo da asma (ACT)' }],
      },
      '18-65': {
        intro: 'A asma afeta cerca de 1 em cada 15 adultos em Portugal e pode começar em qualquer idade. É uma inflamação crónica dos brônquios: o objetivo do tratamento é viver sem sintomas e sem crises, não apenas aliviá-las.',
        imagens: [
          ['bronquio-asma', 'Inflamação, muco e aperto dos brônquios'],
          ['inalador', 'Inalador com corticoide: a base do tratamento'],
          ['alergenos', 'Conhecer e reduzir os gatilhos'],
        ],
        seccoes: [
          { ico: '🩺', titulo: 'Sintomas', lista: ['Pieira (chiadeira)', 'Falta de ar e aperto no peito', 'Tosse, sobretudo à noite ou de madrugada', 'Sintomas que vão e vêm, pioram com constipações, alergénios, frio ou esforço'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'Faz-se com a história clínica e a espirometria (prova de função respiratória), que mostra a obstrução e a melhoria depois de um broncodilatador. Testes de alergia ajudam a identificar gatilhos. Asma que começa no trabalho pode ser profissional.' },
          { ico: '💨', titulo: 'Tratamento', lista: ['Todos os adultos com asma devem ter um inalador com corticoide — usar só o broncodilatador de alívio é perigoso', 'Em muitos casos, o mesmo inalador (corticoide com formoterol) serve para todos os dias e para as crises', 'Rever a técnica inalatória em cada consulta', 'Plano de ação escrito: o que fazer quando piora', 'Vacina da gripe todos os anos'] },
          { ico: '🚭', titulo: 'Ajuda muito', lista: ['Deixar de fumar e evitar o fumo dos outros', 'Reduzir os ácaros: arejar, aspirar, lavar a roupa de cama a 60 °C', 'Tratar a rinite alérgica', 'Manter um peso saudável e fazer exercício'] },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['O inalador de alívio não resolver ou o efeito durar pouco', 'Não conseguir falar frases completas', 'Lábios azulados, sonolência ou confusão'] },
        ligacoes: [{ href: 'calculadora-respiratoria/?calc=act', texto: 'Teste de controlo da asma (ACT)' }],
      },
      '65+': {
        intro: 'A asma também existe depois dos 65 anos — às vezes começa nesta idade — e é fácil confundi-la com a DPOC ou com problemas do coração. Com o tratamento certo, respira-se melhor e evitam-se idas à urgência.',
        imagens: [
          ['inalador', 'O inalador certo para as suas mãos'],
          ['medico', 'Mostrar ao médico como usa o inalador'],
          ['vacina', 'Vacinas da gripe e da pneumonia'],
          ['janela', 'Arejar a casa e evitar o fumo'],
        ],
        seccoes: [
          { ico: '💨', titulo: 'O inalador', lista: ['Há vários tipos: se tiver pouca força nas mãos ou dificuldade em coordenar, peça outro', 'A câmara expansora ajuda muito com os inaladores pressurizados', 'Bocheche com água depois do inalador com corticoide', 'Leve os inaladores às consultas'] },
          { ico: '🛡️', titulo: 'Prevenir crises', lista: ['Vacina da gripe todos os anos, da COVID-19 e da pneumonia como indicado', 'Evitar o fumo e a poeira', 'Cuidado com alguns medicamentos (como certos comprimidos para a tensão ou colírios para o glaucoma): diga sempre que tem asma'] },
          { ico: '🫀', titulo: 'Será asma, DPOC ou coração?', texto: 'Falta de ar e pieira nos mais velhos podem ter várias causas, às vezes juntas. A espirometria e a avaliação do coração ajudam a perceber o que é, para tratar bem.' },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['O inalador de alívio não fizer efeito', 'Tiver falta de ar em repouso ou não conseguir falar', 'Ficar com os lábios azulados ou muito sonolento'] },
      },
    },
  },

  {
    id: 'enfarte',
    nome: 'Enfarte do miocárdio',
    alias: 'Ataque cardíaco e angina de peito',
    emoji: '💔',
    categoria: 'Coração e vasos',
    palavras: 'ataque cardíaco angina dor no peito coronária cateterismo stent 112 via verde',
    resumo: 'Uma artéria do coração entope e parte do músculo fica sem sangue. É uma emergência: ligar logo 112.',
    heroi: 'coracao-enfarte',
    deco: 'enfarte',
    grupos: {
      '3-5': {
        imagens: [
          ['coracao', 'O coração é um músculo que bate sem parar'],
          ['coracao-enfarte', 'Às vezes um caninho do coração entope'],
          ['dor-peito', 'Dói muito no peito'],
          ['ligar-112', 'Liga-se 112 para pedir ajuda'],
          ['prato', 'Comer legumes e fruta ajuda o coração'],
          ['correr', 'Correr e brincar dá força ao coração'],
        ],
      },
      '5-12': {
        intro: 'O coração é um músculo que bombeia sangue para o corpo todo. Ele próprio também precisa de sangue, que lhe chega por uns tubinhos chamados artérias coronárias. Quando um deles entope, acontece um enfarte.',
        imagens: [
          ['coracao-enfarte', 'Uma artéria entupida deixa parte do coração sem sangue'],
          ['dor-peito', 'Dor forte no peito'],
          ['ligar-112', 'Ligar 112 logo, sem esperar'],
          ['correr', 'Mexer o corpo protege o coração'],
        ],
        seccoes: [
          { ico: '❤️', titulo: 'O que é?', texto: 'Com os anos, pode juntar-se gordura nas paredes das artérias, como calcário num cano. Se uma artéria do coração entope de vez, essa parte do músculo fica sem oxigénio e começa a estragar-se. Por isso é preciso ir depressa para o hospital.' },
          { ico: '🚑', titulo: 'Se um adulto se queixar de dor no peito', lista: ['Não o deixes sozinho', 'Chama outro adulto', 'Liga 112 e diz a morada', 'Responde com calma às perguntas'] },
          { ico: '💪', titulo: 'Como se protege o coração?', lista: ['Brincar e fazer desporto', 'Comer fruta, legumes e pouco sal', 'Nunca começar a fumar', 'Dormir bem'] },
        ],
        curiosidade: 'O teu coração bate cerca de 100 mil vezes por dia, e numa vida inteira mais de 2,5 mil milhões de vezes!',
      },
      '13-17': {
        intro: 'As doenças do coração e dos vasos são a principal causa de morte em Portugal. O enfarte costuma surgir em adultos, mas os hábitos que o preparam — tabaco, sedentarismo, má alimentação — começam muitas vezes na adolescência.',
        imagens: [
          ['coracao-enfarte', 'Uma placa de gordura rompe e forma um coágulo'],
          ['ligar-112', 'Dor no peito: 112, sem esperar'],
          ['cigarro', 'O tabaco é o maior inimigo das artérias'],
        ],
        seccoes: [
          { ico: '🫀', titulo: 'Como acontece', texto: 'Ao longo dos anos formam-se placas de gordura (aterosclerose) nas artérias do coração. Se uma placa se rompe, forma-se um coágulo que tapa a artéria. Quanto mais tempo passa até a desentupir, mais músculo se perde.' },
          { ico: '🚨', titulo: 'Reconhecer', lista: ['Dor ou aperto no peito que dura mais de alguns minutos', 'Dor que passa para o braço, o pescoço, o maxilar ou as costas', 'Suores frios, náuseas, falta de ar', 'Liga 112 — não vás de carro nem esperes que passe'] },
          { ico: '🛡️', titulo: 'Proteger o coração já', lista: ['Não fumar nem vaporizar', 'Mexer-te pelo menos 1 hora por dia', 'Menos fast food, sal e refrigerantes', 'Bebidas energéticas e drogas como a cocaína podem provocar problemas cardíacos mesmo em jovens'] },
        ],
        mitos: [
          ['Enfartes só acontecem a velhos.', 'São mais frequentes depois dos 50, mas podem acontecer a adultos jovens, sobretudo fumadores ou com colesterol muito alto de família.'],
          ['Se a dor passar sozinha, não era nada.', 'Uma dor no peito que vai e vem pode ser angina, um aviso de que o coração recebe pouco sangue. Deve ser vista pelo médico.'],
          ['O enfarte é sempre uma dor fortíssima, como nos filmes.', 'Muitas vezes é um aperto, um peso ou um desconforto, com suores e enjoo.'],
        ],
        alerta: { titulo: 'Liga 112 se alguém tiver…', lista: ['Dor ou aperto no peito com mais de alguns minutos', 'Dor no peito com suores, falta de ar ou desmaio', 'Perda de consciência — e começa o suporte básico de vida se souberes'] },
      },
      '18-65': {
        intro: 'O enfarte agudo do miocárdio é uma das principais causas de morte em Portugal, mas a sobrevivência melhorou muito: ligar cedo para o 112 ativa a Via Verde Coronária e leva o doente diretamente ao hospital que pode desentupir a artéria.',
        imagens: [
          ['coracao-enfarte', 'Artéria coronária entupida por um coágulo'],
          ['dor-peito', 'Dor no peito: cada minuto conta'],
          ['tensiometro', 'Tensão, colesterol e açúcar controlados'],
        ],
        seccoes: [
          { ico: '🚨', titulo: 'Sinais de enfarte', lista: ['Dor, aperto ou peso no peito durante mais de 10 minutos, em repouso ou com esforço', 'Irradiação para o braço esquerdo, o pescoço, o maxilar, as costas ou o estômago', 'Suores frios, náuseas, falta de ar, tonturas', 'Nas mulheres, nas pessoas com diabetes e nos mais velhos pode haver só cansaço, falta de ar ou mal-estar'] },
          { ico: '📞', titulo: 'O que fazer', lista: ['Ligar 112 de imediato — não conduzir até ao hospital', 'Parar o que está a fazer e ficar sentado', 'Seguir as indicações do 112', 'Se a pessoa perder a consciência e não respirar normalmente, iniciar compressões torácicas'] },
          { ico: '⚖️', titulo: 'Fatores de risco', lista: ['Tabaco', 'Hipertensão arterial, colesterol elevado e diabetes', 'Obesidade e sedentarismo', 'Familiares diretos com enfarte em idade jovem', 'Stress crónico e pouco sono'] },
          { ico: '💊', titulo: 'Depois do enfarte', texto: 'O tratamento continua para a vida: medicamentos que evitam coágulos e protegem o coração, estatinas para baixar o colesterol, reabilitação cardíaca com exercício orientado e, sobretudo, mudança de hábitos. Deixar de fumar reduz muito o risco de um novo enfarte.' },
        ],
        alerta: { titulo: 'Ligue 112 se…', lista: ['Dor ou aperto no peito com mais de 10 minutos', 'Dor no peito com suores, náuseas ou falta de ar', 'Desmaio ou palpitações com mal-estar'] },
        ligacoes: [
          { href: 'calculadora-risco-cardiovascular/', texto: 'Calcular o risco cardiovascular (SCORE2)' },
          { href: 'calculadora-laboratorial/?calc=ldl', texto: 'Calcular o colesterol LDL' },
        ],
      },
      '65+': {
        intro: 'Depois dos 65 anos, o enfarte é mais frequente e nem sempre dá a dor típica: pode surgir como falta de ar, cansaço súbito, confusão ou desmaio. Na dúvida, ligue 112.',
        imagens: [
          ['dor-peito', 'Dor, aperto ou mal-estar no peito'],
          ['ligar-112', 'Ligar 112 e não ir pelo próprio pé'],
          ['pastilheiro', 'Tomar a medicação todos os dias'],
          ['bengala', 'Caminhar um pouco todos os dias'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais a não ignorar', lista: ['Dor ou aperto no peito, mesmo que ligeiro', 'Falta de ar de repente', 'Cansaço intenso sem explicação', 'Suores frios, enjoo, tonturas ou desmaio', 'Dor de peito com esforço que alivia em repouso (angina): fale com o médico'] },
          { ico: '💊', titulo: 'Se já teve um enfarte', lista: ['Não pare os medicamentos por sua conta, sobretudo os que evitam coágulos', 'Leve a lista de medicamentos a todas as consultas', 'Faça a reabilitação cardíaca se lhe for proposta', 'Se lhe receitaram nitroglicerina para debaixo da língua, saiba quando a usar'] },
          { ico: '🌿', titulo: 'Proteger o coração', lista: ['Caminhar, com o ritmo que conseguir', 'Pouco sal, mais legumes, fruta e peixe', 'Controlar a tensão, o colesterol e o açúcar', 'Vacina da gripe todos os anos'] },
        ],
        alerta: { titulo: 'Ligue 112 se…', lista: ['Tiver dor ou aperto no peito que não passa', 'A dor de angina não aliviar com repouso e nitroglicerina', 'Tiver falta de ar súbita ou desmaiar'] },
      },
    },
  },

  {
    id: 'fibrilhacao-auricular',
    nome: 'Fibrilhação auricular',
    alias: 'Arritmia do coração',
    emoji: '💓',
    categoria: 'Coração e vasos',
    tambem: ['Cérebro e nervos'],
    palavras: 'arritmia palpitações coração acelerado pulso irregular anticoagulante AVC',
    resumo: 'O coração bate de forma irregular e, muitas vezes, rápida. É a arritmia mais frequente e aumenta muito o risco de AVC.',
    heroi: 'ecg-irregular',
    deco: 'ritmo',
    grupos: {
      '3-5': {
        imagens: [
          ['coracao', 'O coração bate tum-tum, tum-tum'],
          ['ecg-irregular', 'Às vezes bate aos saltinhos'],
          ['pulso', 'Pode sentir-se o coração no pulso'],
          ['medico', 'O médico ouve o coração'],
          ['comprimido', 'Os avós tomam remédios para o coração'],
          ['abraco', 'Os avós ficam bem com o tratamento'],
        ],
      },
      '5-12': {
        intro: 'O coração tem um «maestro» que lhe diz quando bater, sempre ao mesmo ritmo. Na fibrilhação auricular, a parte de cima do coração fica baralhada, e o coração bate de forma desarrumada. É mais comum nos avós.',
        imagens: [
          ['ecg-irregular', 'Um coração que bate sem ritmo certo'],
          ['pulso', 'Contar os batimentos no pulso'],
          ['comprimido', 'Remédios que evitam coágulos'],
          ['medico', 'Consultas para ver o coração'],
        ],
        seccoes: [
          { ico: '🎵', titulo: 'O que é?', texto: 'Normalmente, um sinal elétrico parte sempre do mesmo sítio e o coração bate certinho, como um tambor numa marcha. Na fibrilhação auricular, a parte de cima do coração recebe muitos sinais ao mesmo tempo e treme em vez de bater. O ritmo fica irregular.' },
          { ico: '🩸', titulo: 'Porque é importante?', texto: 'Quando o coração treme, o sangue pode ficar parado em cantinhos e formar pequenos coágulos. Se um coágulo for até ao cérebro, causa um AVC. Por isso, muitos avós com esta doença tomam remédios que deixam o sangue mais fluido.' },
          { ico: '🖐️', titulo: 'Experimenta!', lista: ['Põe dois dedos no pulso, do lado do polegar', 'Conta os batimentos durante 1 minuto', 'Nas crianças, o coração bate entre 70 e 110 vezes por minuto em repouso', 'Depois de correr, bate mais depressa'] },
        ],
        curiosidade: 'O coração tem a sua própria eletricidade: é por isso que um eletrocardiograma consegue desenhar cada batimento numa folha!',
      },
      '13-17': {
        intro: 'A fibrilhação auricular é a arritmia mais comum. É rara na tua idade, mas é muito frequente nos avós. Conhecê-la ajuda a reconhecer os sinais e a perceber porque é tão importante tomar a medicação.',
        imagens: [
          ['ecg-irregular', 'No eletrocardiograma, o ritmo é irregular'],
          ['pulso', 'Pulso irregular, às vezes muito rápido'],
          ['cerebro-avc', 'Sem tratamento, aumenta o risco de AVC'],
        ],
        seccoes: [
          { ico: '⚡', titulo: 'O que acontece', texto: 'As aurículas, as cavidades de cima do coração, recebem impulsos elétricos desorganizados e tremem (fibrilham). Os ventrículos batem de forma irregular e, muitas vezes, rápida. O sangue que fica parado nas aurículas pode formar coágulos.' },
          { ico: '🫀', titulo: 'Sintomas', lista: ['Palpitações: coração acelerado ou «aos saltos»', 'Cansaço e falta de ar', 'Tonturas', 'Muitas pessoas não sentem nada — é descoberta numa consulta'] },
          { ico: '⚠️', titulo: 'Em jovens', texto: 'Palpitações em adolescentes são quase sempre benignas, mas álcool em excesso («coração de fim de semana»), bebidas energéticas, cafeína e drogas estimulantes podem provocar arritmias, incluindo fibrilhação auricular.' },
        ],
        mitos: [
          ['Se não sinto nada, não é grave.', 'Mesmo sem sintomas, o risco de AVC existe. É a prevenção do AVC que mais protege.'],
          ['Os anticoagulantes «afinam» o sangue e são perigosos.', 'Têm risco de hemorragia, mas, na maioria das pessoas com fibrilhação auricular, evitam muitos mais AVC do que as hemorragias que causam.'],
          ['Arritmia é sinal de que o coração está a parar.', 'Na fibrilhação auricular, o coração continua a bombear — de forma menos eficiente, mas continua.'],
        ],
        alerta: { titulo: 'Fala com um adulto ou liga 112 se…', lista: ['Tiveres palpitações com desmaio, dor no peito ou muita falta de ar', 'Alguém com fibrilhação auricular ficar com a boca ao lado, sem força num braço ou com dificuldade em falar (AVC)'] },
      },
      '18-65': {
        intro: 'A fibrilhação auricular é a arritmia mais frequente e torna-se mais comum com a idade. Multiplica por cinco o risco de AVC, mas a anticoagulação reduz esse risco em cerca de dois terços. Muitas vezes não dá sintomas: medir o pulso pode descobri-la.',
        imagens: [
          ['ecg-irregular', 'O eletrocardiograma confirma o diagnóstico'],
          ['pulso', 'Pulso irregular: conte durante 1 minuto'],
          ['comprimido', 'Anticoagulação para prevenir o AVC'],
        ],
        seccoes: [
          { ico: '🩺', titulo: 'Sintomas e diagnóstico', texto: 'Palpitações, cansaço, falta de ar, tonturas ou menor capacidade para o esforço — ou nenhum sintoma. O diagnóstico faz-se com um eletrocardiograma; às vezes é preciso um registo de 24 horas ou mais (Holter). Relógios inteligentes podem dar o alerta, mas o diagnóstico exige confirmação.' },
          { ico: '⚖️', titulo: 'Causas e fatores de risco', lista: ['Idade', 'Hipertensão arterial e insuficiência cardíaca', 'Obesidade, diabetes e apneia do sono', 'Álcool em excesso', 'Doença da tiroide e doenças das válvulas'] },
          { ico: '💊', titulo: 'Tratamento', lista: ['Prevenir o AVC: anticoagulante, conforme o risco (escala CHA₂DS₂-VASc)', 'Controlar a frequência cardíaca ou recuperar o ritmo normal (medicamentos, cardioversão ou ablação)', 'Tratar os fatores de risco: tensão, peso, apneia do sono, álcool', 'Exercício regular, adaptado'] },
        ],
        alerta: { titulo: 'Ligue 112 se…', lista: ['Tiver sinais de AVC: boca ao lado, falta de força num braço, dificuldade em falar', 'Palpitações com dor no peito, desmaio ou falta de ar intensa', 'Hemorragia que não para, se toma anticoagulante'] },
        ligacoes: [
          { href: 'calculadora-anticoagulacao/?calc=chadsvasc', texto: 'Risco de AVC na fibrilhação auricular (CHA₂DS₂-VASc)' },
          { href: 'calculadora-anticoagulacao/?calc=hasbled', texto: 'Risco de hemorragia (HAS-BLED)' },
        ],
      },
      '65+': {
        intro: 'Cerca de 1 em cada 10 pessoas com mais de 65 anos tem fibrilhação auricular, e muitas não sabem. Medir o pulso de vez em quando e tomar o anticoagulante todos os dias são as melhores formas de evitar um AVC.',
        imagens: [
          ['pulso', 'Medir o pulso: regular ou irregular?'],
          ['pastilheiro', 'O anticoagulante não se pode esquecer'],
          ['cerebro-avc', 'O tratamento evita o AVC'],
          ['medico', 'Consultas e análises de controlo'],
        ],
        seccoes: [
          { ico: '🖐️', titulo: 'Medir o pulso', lista: ['Sentado e em repouso, dois dedos no pulso, do lado do polegar', 'Contar durante 1 minuto inteiro', 'Se os batimentos forem irregulares, desarrumados, fale com o médico', 'Muitos aparelhos de medir a tensão também avisam de pulso irregular'] },
          { ico: '💊', titulo: 'Se toma anticoagulante', lista: ['Tome-o todos os dias, sempre à mesma hora', 'Não pare por sua conta, nem antes de exames ou de tratamentos dentários: pergunte primeiro', 'Avise sempre que toma anticoagulante (dentista, farmácia, hospital)', 'Cuidado com anti-inflamatórios e alguns produtos naturais, que aumentam o risco de hemorragia'] },
          { ico: '🩸', titulo: 'Sinais de hemorragia', lista: ['Fezes pretas ou com sangue', 'Urina vermelha ou escura', 'Nódoas negras grandes sem razão', 'Sangrar do nariz ou das gengivas durante muito tempo'] },
        ],
        alerta: { titulo: 'Ligue 112 se…', lista: ['Tiver sinais de AVC: boca ao lado, falta de força, dificuldade em falar', 'Bater com a cabeça enquanto toma anticoagulante', 'Tiver uma hemorragia que não para'] },
        ligacoes: [{ href: 'calculadora-anticoagulacao/', texto: 'CHA₂DS₂-VASc e HAS-BLED' }],
      },
    },
  },

  {
    id: 'insuficiencia-cardiaca',
    nome: 'Insuficiência cardíaca',
    emoji: '🫀',
    categoria: 'Coração e vasos',
    palavras: 'coração fraco cansaço falta de ar pernas inchadas edema água nos pulmões',
    resumo: 'O coração não consegue bombear o sangue de que o corpo precisa. Dá cansaço, falta de ar e pernas inchadas, e trata-se cada vez melhor.',
    heroi: 'coracao-cansado',
    deco: 'bateria',
    grupos: {
      '3-5': {
        imagens: [
          ['coracao', 'O coração é uma bomba que leva o sangue'],
          ['coracao-cansado', 'Às vezes o coração fica cansado'],
          ['pernas-inchadas', 'As pernas podem ficar inchadas'],
          ['balanca', 'Os avós pesam-se todos os dias'],
          ['sal', 'Pouco sal na comida'],
          ['abraco', 'Passear devagarinho com os avós'],
        ],
      },
      '5-12': {
        intro: 'O coração é uma bomba que empurra o sangue para o corpo todo. Na insuficiência cardíaca, essa bomba fica fraca ou rígida e não consegue bombear tudo o que é preciso. O coração não parou: só trabalha com mais dificuldade.',
        imagens: [
          ['coracao-cansado', 'Um coração que bombeia com menos força'],
          ['pernas-inchadas', 'A água acumula-se nas pernas'],
          ['balanca', 'Pesar todos os dias mostra se há água a mais'],
          ['sal', 'O sal faz o corpo guardar água'],
        ],
        seccoes: [
          { ico: '🫀', titulo: 'O que é?', texto: 'Quando o coração não bombeia bem, o sangue anda mais devagar e o corpo guarda água. Essa água vai para as pernas, que incham, e às vezes para os pulmões, o que dá falta de ar. A pessoa cansa-se depressa.' },
          { ico: '❓', titulo: 'Porque acontece?', texto: 'Muitas vezes depois de um enfarte, ou por tensão alta durante muitos anos, que obriga o coração a fazer mais força. Também pode acontecer por problemas nas válvulas do coração, que são como portinhas.' },
          { ico: '💛', titulo: 'Como posso ajudar o avô ou a avó?', lista: ['Lembrar os remédios e a pesagem da manhã', 'Passear devagar, ao ritmo deles', 'Pôr pouco sal na comida', 'Avisar um adulto se ficarem com muita falta de ar'] },
        ],
        curiosidade: 'Num só dia, o coração bombeia cerca de 7 mil litros de sangue — dava para encher 40 banheiras!',
      },
      '13-17': {
        intro: 'A insuficiência cardíaca é muito frequente nos mais velhos e é uma das principais causas de internamento depois dos 65 anos. Não quer dizer que o coração vá parar: quer dizer que não bombeia tão bem como devia.',
        imagens: [
          ['coracao-cansado', 'O coração bombeia menos do que o corpo precisa'],
          ['pernas-inchadas', 'Inchaço nos tornozelos e nas pernas'],
          ['balanca', 'Subir de peso depressa pode ser água'],
        ],
        seccoes: [
          { ico: '🫀', titulo: 'O que é', texto: 'É uma síndrome: o coração, enfraquecido ou rígido, não consegue encher-se ou esvaziar-se bem. As causas mais comuns são o enfarte, a hipertensão arterial de longa data, as doenças das válvulas e as arritmias.' },
          { ico: '🩺', titulo: 'Sintomas', lista: ['Falta de ar com o esforço, e depois em repouso', 'Precisar de várias almofadas para dormir', 'Pernas e tornozelos inchados', 'Cansaço e menor capacidade para o exercício', 'Aumento de peso rápido, por retenção de líquidos'] },
          { ico: '💊', titulo: 'Tratamento', texto: 'Hoje existem vários medicamentos que fazem viver mais e melhor, além dos diuréticos que tiram a água a mais. Juntam-se exercício adaptado, pouco sal, a pesagem diária e, nalguns casos, dispositivos como pacemakers.' },
        ],
        mitos: [
          ['Insuficiência cardíaca é o coração a parar.', 'O coração continua a bater; só não bombeia tão bem como devia.'],
          ['Quem tem o coração fraco deve ficar quieto.', 'O exercício adaptado e orientado melhora os sintomas e a qualidade de vida.'],
          ['Beber muita água faz sempre bem.', 'Na insuficiência cardíaca, às vezes é preciso limitar os líquidos — conforme indicação médica.'],
        ],
        alerta: { titulo: 'Liga 112 se um familiar…', lista: ['Tiver falta de ar intensa, sobretudo deitado', 'Tiver dor no peito ou desmaiar', 'Ficar confuso ou com os lábios azulados'] },
      },
      '18-65': {
        intro: 'Um estudo recente estimou que cerca de 1 em cada 6 pessoas com mais de 50 anos em Portugal tem insuficiência cardíaca — e a maioria não sabe. Reconhecer os sintomas cedo permite começar tratamentos que mudam o prognóstico.',
        imagens: [
          ['coracao-cansado', 'Fraqueza ou rigidez do músculo cardíaco'],
          ['pernas-inchadas', 'Edema: a água acumula-se nas pernas'],
          ['tensiometro', 'Controlar a tensão protege o coração'],
        ],
        seccoes: [
          { ico: '🩺', titulo: 'Sintomas', lista: ['Falta de ar com esforços que antes fazia bem', 'Falta de ar deitado ou acordar à noite sem ar', 'Inchaço dos tornozelos e das pernas', 'Cansaço, perda de apetite, aumento de peso rápido'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'Uma análise ao sangue (BNP ou NT-proBNP) ajuda a excluir ou a suspeitar da doença; o ecocardiograma confirma e mostra a força do coração (fração de ejeção). Procura-se também a causa: doença coronária, hipertensão, válvulas, arritmias, álcool.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Vários medicamentos, em conjunto, que reduzem internamentos e mortalidade — não deixe de os tomar se se sentir melhor', 'Diuréticos para tirar a água a mais', 'Tratar a causa e a fibrilhação auricular, se existir', 'Nalguns casos, pacemaker ou desfibrilhador'] },
          { ico: '🥗', titulo: 'No dia a dia', lista: ['Pouco sal (menos de 5 g por dia) e nada de comida muito salgada', 'Pesar-se todas as manhãs', 'Exercício regular, adaptado — idealmente reabilitação cardíaca', 'Não fumar e evitar o álcool', 'Vacinas da gripe e da pneumonia'] },
        ],
        alerta: { titulo: 'Contacte o médico se…', lista: ['Aumentar mais de 2 kg em 3 dias', 'A falta de ar ou o inchaço piorarem', 'Precisar de mais almofadas para dormir', 'Falta de ar intensa, dor no peito ou desmaio: ligue 112'] },
      },
      '65+': {
        intro: 'Depois dos 65 anos, a insuficiência cardíaca é muito frequente e é uma das primeiras causas de internamento. O cansaço e a falta de ar não são «da idade»: tratados, permitem fazer muito mais.',
        imagens: [
          ['balanca', 'Pesar-se todas as manhãs, à mesma hora'],
          ['pernas-inchadas', 'Ver se as pernas estão mais inchadas'],
          ['sal', 'Comida com pouco sal'],
          ['pastilheiro', 'Os medicamentos todos os dias'],
        ],
        seccoes: [
          { ico: '⚖️', titulo: 'A pesagem diária', lista: ['Todas as manhãs, depois de urinar e antes do pequeno-almoço', 'Com roupa semelhante e na mesma balança', 'Aponte o peso num caderno', 'Mais de 2 kg em 3 dias: fale com o médico ou com o enfermeiro'] },
          { ico: '🍲', titulo: 'Comer bem com pouco sal', lista: ['Tempere com ervas, alho, limão e especiarias', 'Evite enchidos, bacalhau mal demolhado, queijos curados, sopas e refeições prontas', 'Beba os líquidos que o médico indicar — nem a mais, nem a menos'] },
          { ico: '💊', titulo: 'Medicamentos', lista: ['Tome-os todos os dias, mesmo quando se sente bem', 'Os diuréticos fazem urinar mais: tome-os de manhã', 'Evite anti-inflamatórios (para as dores das articulações): pioram o coração e os rins', 'Leve a lista de medicamentos a todas as consultas'] },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Aumentar mais de 2 kg em 3 dias', 'Tiver mais falta de ar ou precisar de dormir sentado', 'Falta de ar em repouso, dor no peito ou desmaio: ligue 112'] },
      },
    },
  },

  {
    id: 'doenca-renal',
    nome: 'Doença renal crónica',
    emoji: '🫘',
    categoria: 'Rins e urologia',
    tambem: ['Metabolismo'],
    palavras: 'rins insuficiência renal creatinina albumina diálise hemodiálise transplante TFG',
    resumo: 'Os rins vão perdendo, devagar, a capacidade de limpar o sangue. É silenciosa no início, mas uma análise ao sangue e à urina deteta-a cedo.',
    heroi: 'rins',
    deco: 'rim',
    grupos: {
      '3-5': {
        imagens: [
          ['rins', 'Temos dois rins que limpam o sangue'],
          ['agua', 'Beber água faz bem aos rins'],
          ['prato', 'Comida com pouco sal'],
          ['analise', 'Uma análise mostra se os rins estão bem'],
          ['medico', 'O médico cuida dos rins'],
          ['correr', 'Brincar e correr faz bem ao corpo'],
        ],
      },
      '5-12': {
        intro: 'Temos dois rins, do tamanho de um punho, nas costas, um de cada lado. São o filtro do corpo: limpam o sangue e fazem o xixi. Na doença renal crónica, este filtro vai ficando estragado devagarinho.',
        imagens: [
          ['rins', 'Os rins filtram o sangue e fazem a urina'],
          ['agua', 'Água é a melhor bebida'],
          ['sal', 'Sal a mais cansa os rins'],
          ['analise', 'Análises ao sangue e ao xixi'],
        ],
        seccoes: [
          { ico: '🫘', titulo: 'O que fazem os rins?', lista: ['Limpam o sangue do lixo que o corpo produz', 'Tiram a água a mais, que sai no xixi', 'Ajudam a controlar a tensão arterial', 'Ajudam a fazer sangue e ossos fortes'] },
          { ico: '❓', titulo: 'Porque se estragam?', texto: 'Nos adultos, as causas mais comuns são a diabetes e a tensão alta, que vão estragando os filtros pequeninos dos rins. Nas crianças é raro, e quase sempre por problemas com que se nasce.' },
          { ico: '🏥', titulo: 'E quando os rins deixam de trabalhar?', texto: 'Uma máquina pode fazer o trabalho dos rins: chama-se diálise. Também se pode receber um rim novo, oferecido por outra pessoa — um transplante. Basta um rim para viver bem!' },
        ],
        curiosidade: 'Os rins filtram cerca de 180 litros de líquido por dia, mas só 1 a 2 litros saem em xixi — o resto volta para o sangue!',
      },
      '13-17': {
        intro: 'A doença renal crónica é muito mais frequente do que se pensa, e Portugal é dos países europeus com mais pessoas em diálise. É silenciosa: quase sempre só dá sintomas quando já está avançada.',
        imagens: [
          ['rins', 'Cerca de um milhão de pequenos filtros em cada rim'],
          ['glucometro', 'Diabetes e tensão alta são as causas mais comuns'],
          ['agua', 'Água em vez de refrigerantes'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'O que é', texto: 'É a perda progressiva e permanente da função dos rins, durante meses ou anos. Mede-se pela taxa de filtração glomerular (calculada a partir da creatinina no sangue) e pela albumina na urina, um sinal precoce de lesão.' },
          { ico: '⚠️', titulo: 'Riscos que começam cedo', lista: ['Obesidade e diabetes tipo 2 em jovens', 'Tensão alta não tratada', 'Abuso de anti-inflamatórios (para dores de cabeça ou menstruais) sem indicação', 'Suplementos «para ganhar músculo» e esteroides anabolizantes', 'Desidratação repetida'] },
          { ico: '🎁', titulo: 'Doação e transplante', texto: 'Em Portugal, todas as pessoas são consideradas dadoras de órgãos após a morte, a não ser que se inscrevam no registo de não dadores (RENNDA). O transplante renal permite a muitas pessoas deixar a diálise.' },
        ],
        mitos: [
          ['Beber muita água cura os rins.', 'Beber o suficiente é importante, mas água a mais não trata a doença renal e pode até fazer mal em fases avançadas.'],
          ['Se urino bem, os rins estão bem.', 'Muitas pessoas com doença renal urinam normalmente. Só as análises dizem como estão os rins.'],
          ['Os anti-inflamatórios são inofensivos porque se compram sem receita.', 'Usados com frequência, podem lesar os rins, sobretudo com desidratação.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Tiveres urina com espuma persistente ou cor de chá', 'Inchaço nos olhos ou nas pernas', 'Tensão alta numa medição'] },
      },
      '18-65': {
        intro: 'Cerca de 1 em cada 10 adultos tem doença renal crónica, e a maioria não sabe. Portugal está entre os países da Europa com mais pessoas em diálise. Detetada cedo, é possível travá-la.',
        imagens: [
          ['rins', 'A função renal perde-se em silêncio'],
          ['analise', 'Creatinina no sangue e albumina na urina'],
          ['tensiometro', 'Tensão controlada protege os rins'],
        ],
        seccoes: [
          { ico: '⚖️', titulo: 'Quem deve fazer análises', lista: ['Pessoas com diabetes ou hipertensão (pelo menos uma vez por ano)', 'Doença cardiovascular ou obesidade', 'Familiares com doença renal', 'Pedras nos rins frequentes, ou uso prolongado de anti-inflamatórios ou de lítio'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'São precisas duas análises simples: a creatinina no sangue, para calcular a taxa de filtração glomerular (TFG), e a relação albumina/creatinina na urina. Fala-se de doença renal crónica quando a TFG está abaixo de 60 ou há albumina na urina durante mais de 3 meses.' },
          { ico: '💊', titulo: 'Travar a progressão', lista: ['Controlar a tensão arterial e a diabetes', 'Medicamentos que protegem os rins (alguns da tensão e da diabetes)', 'Pouco sal e proteína com moderação', 'Evitar anti-inflamatórios e rever as doses dos medicamentos', 'Não fumar'] },
          { ico: '🏥', titulo: 'Nas fases avançadas', texto: 'Quando os rins quase deixam de funcionar, as opções são a hemodiálise, a diálise peritoneal (feita em casa) e o transplante renal. A escolha prepara-se com tempo, numa consulta de nefrologia.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Inchaço nas pernas ou à volta dos olhos', 'Urina com espuma, escura ou com sangue', 'Cansaço, náuseas, comichão ou perda de apetite persistentes', 'Urinar muito menos do que o habitual'] },
        ligacoes: [{ href: 'calculadora-funcao-renal/?calc=ckdepi', texto: 'Calcular a taxa de filtração glomerular (CKD-EPI)' }],
      },
      '65+': {
        intro: 'Com a idade, os rins perdem alguma função, e a doença renal crónica é muito frequente depois dos 65 anos. Saber como estão os rins é importante para ajustar os medicamentos e evitar problemas.',
        imagens: [
          ['analise', 'Análises ao sangue e à urina, pelo menos uma vez por ano'],
          ['comprimido', 'Doses de medicamentos ajustadas aos rins'],
          ['agua', 'Beber o que o médico indicar'],
          ['tensiometro', 'Tensão e açúcar controlados'],
        ],
        seccoes: [
          { ico: '💊', titulo: 'Cuidado com os medicamentos', lista: ['Evite anti-inflamatórios (ibuprofeno, diclofenac, naproxeno…), também em pomada ou sem receita', 'Para as dores, o paracetamol é geralmente mais seguro — pergunte ao médico', 'Diga sempre que tem doença renal: muitas doses têm de ser ajustadas', 'Antes de exames com contraste, avise'] },
          { ico: '💧', titulo: 'Desidratação', texto: 'Com vómitos, diarreia ou muito calor, os rins podem piorar de repente. Beba líquidos e fale com o médico: às vezes é preciso suspender por uns dias alguns medicamentos da tensão, da diabetes ou diuréticos.' },
          { ico: '🍲', titulo: 'Alimentação', lista: ['Pouco sal', 'Proteína com moderação, sem exageros', 'Nas fases avançadas, pode ser preciso controlar o potássio (algumas frutas e legumes) e o fósforo — siga a orientação da equipa de saúde'] },
        ],
        alerta: { titulo: 'Procure o médico se…', lista: ['Urinar muito pouco ou nada', 'Inchaço ou falta de ar a piorar', 'Vómitos ou diarreia que não deixam beber'] },
        ligacoes: [{ href: 'calculadora-funcao-renal/', texto: 'Calcular a função renal (CKD-EPI e Cockcroft-Gault)' }],
      },
    },
  },

  {
    id: 'cancro-prostata',
    nome: 'Cancro da próstata',
    emoji: '🥸',
    categoria: 'Oncologia',
    tambem: ['Rins e urologia'],
    palavras: 'próstata PSA toque retal urinar homens hiperplasia benigna Movember',
    resumo: 'O cancro mais frequente nos homens em Portugal. Costuma crescer devagar e, descoberto cedo, tem muito boas hipóteses de cura.',
    heroi: 'prostata',
    deco: 'bigode',
    grupos: {
      '3-5': {
        imagens: [
          ['bigode', 'Em novembro, muitos homens deixam crescer o bigode'],
          ['medico', 'Os avôs e os pais vão ao médico'],
          ['analise', 'Uma análise ao sangue ajuda a cuidar deles'],
          ['prato', 'Legumes e fruta dão saúde'],
          ['correr', 'Mexer o corpo faz bem a todos'],
          ['abraco', 'Cuidar da família com carinho'],
        ],
      },
      '5-12': {
        intro: 'Só os rapazes e os homens têm próstata: é uma glândula pequena, do tamanho de uma noz, por baixo da bexiga. Às vezes, nos homens mais velhos, aparece lá um cancro. Não se pega!',
        imagens: [
          ['prostata', 'A próstata fica logo por baixo da bexiga'],
          ['bigode', 'O bigode de novembro lembra a saúde dos homens'],
          ['medico', 'Ir ao médico mesmo sem estar doente'],
        ],
        seccoes: [
          { ico: '🌰', titulo: 'O que é a próstata?', texto: 'É uma glândula que só os homens têm. Fica à volta do tubo por onde sai o xixi, logo por baixo da bexiga. Nos homens mais velhos, a próstata cresce muitas vezes, e isso pode fazer o xixi sair mais devagar.' },
          { ico: '🔬', titulo: 'O que é o cancro da próstata?', texto: 'É quando algumas células da próstata começam a crescer sem parar. Quase sempre acontece depois dos 50 anos e cresce muito devagar. Quando é descoberto cedo, quase sempre se cura.' },
          { ico: '🥸', titulo: 'Porquê os bigodes?', texto: 'Em novembro, muitos homens deixam crescer o bigode para lembrar que é importante cuidar da saúde e ir ao médico. Podes desafiar o teu pai ou o teu avô!' },
        ],
        curiosidade: 'O movimento dos bigodes de novembro começou em 2003, na Austrália, com apenas 30 amigos — hoje participam milhões de pessoas em todo o mundo!',
      },
      '13-17': {
        intro: 'O cancro da próstata é o mais frequente nos homens em Portugal, mas quase nunca aparece antes dos 50 anos. Falar dele ajuda os homens da tua família a não terem vergonha de ir ao médico.',
        imagens: [
          ['prostata', 'A próstata envolve a uretra, por baixo da bexiga'],
          ['analise', 'O PSA é uma análise ao sangue'],
          ['bigode', 'Novembro azul: a saúde dos homens'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'O que é', texto: 'A próstata produz parte do líquido do sémen. O cancro da próstata surge quando as suas células crescem de forma descontrolada. Na maioria dos casos cresce devagar; alguns, menos frequentes, são agressivos.' },
          { ico: '⚖️', titulo: 'Fatores de risco', lista: ['Idade (sobretudo depois dos 50)', 'Pai ou irmão com cancro da próstata', 'Ascendência africana', 'Algumas alterações genéticas, como as do gene BRCA2'] },
          { ico: '🙋', titulo: 'Saúde masculina', texto: 'Os homens vão menos ao médico do que as mulheres, muitas vezes por vergonha ou por acharem que não é preciso. Incentivar o pai ou o avô a ir às consultas pode fazer a diferença.' },
        ],
        mitos: [
          ['O cancro da próstata dá sempre sintomas.', 'No início, quase nunca dá. Os problemas a urinar são, na maioria das vezes, por crescimento benigno da próstata.'],
          ['Quem tem o cancro da próstata fica sempre impotente ou incontinente.', 'Nem sempre. Muitos casos são só vigiados, e os tratamentos atuais tentam preservar estas funções.'],
          ['É uma doença que só aparece em velhos, não há nada a fazer.', 'Descoberto cedo, a taxa de cura é muito elevada.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Tiveres dor ou inchaço num testículo (outro tipo de cancro, mais frequente em jovens)', 'Tiveres sangue na urina', 'Dor ou ardor persistente a urinar'] },
      },
      '18-65': {
        intro: 'É o cancro mais frequente nos homens em Portugal. A maioria cresce devagar, e muitos homens morrem com ele e não por causa dele. A partir dos 50 anos — ou dos 45 com familiares afetados — vale a pena falar com o médico sobre a análise do PSA.',
        imagens: [
          ['prostata', 'A próstata fica por baixo da bexiga'],
          ['analise', 'PSA: uma decisão partilhada com o médico'],
          ['conversa', 'Falar sem tabus sobre a saúde masculina'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sintomas', texto: 'Na fase inicial, quase nunca há sintomas. Jato fraco, urinar muitas vezes ou acordar à noite para urinar são, na maior parte dos casos, sinais de hiperplasia benigna da próstata, muito frequente com a idade — mas devem ser avaliados.' },
          { ico: '🧪', titulo: 'O PSA', lista: ['É uma análise ao sangue; um valor alto não significa cancro (pode subir com infeções ou com o crescimento benigno)', 'Pode detetar o cancro cedo, mas também cancros que nunca fariam mal', 'A decisão de o fazer deve ser informada e partilhada com o médico, a partir dos 50 anos', 'Mais cedo (45 anos) se tiver pai ou irmão com cancro da próstata, ascendência africana ou alteração do gene BRCA2'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'Se o PSA ou o toque retal levantarem suspeita, faz-se habitualmente uma ressonância magnética da próstata e, se indicado, biópsia. A agressividade do tumor (escala de Gleason) ajuda a decidir o tratamento.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Vigilância ativa, nos tumores de baixo risco', 'Cirurgia (prostatectomia) ou radioterapia', 'Terapêutica hormonal e outros tratamentos nas fases avançadas'] },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Dificuldade em urinar, jato fraco ou urinar muitas vezes', 'Sangue na urina ou no sémen', 'Dor óssea persistente, sobretudo nas costas ou nas ancas'] },
        ligacoes: [
          { href: 'calculadora-urologia/', texto: 'Avaliar os sintomas urinários (IPSS)' },
          { href: 'calculadora-plano-rastreios/', texto: 'Plano de rastreios por idade' },
        ],
      },
      '65+': {
        intro: 'Depois dos 65 anos, quase todos os homens têm a próstata aumentada, e o cancro da próstata é frequente. Na maioria dos casos cresce devagar: o tratamento adapta-se à saúde e às preferências de cada um.',
        imagens: [
          ['prostata', 'Próstata aumentada: benigna ou não?'],
          ['medico', 'Falar com o médico sobre os sintomas'],
          ['analise', 'O PSA ajuda a vigiar'],
          ['luz-noite', 'Levantar-se à noite para urinar: cuidado com as quedas'],
        ],
        seccoes: [
          { ico: '🚽', titulo: 'Urinar mal é normal?', texto: 'É muito frequente, sobretudo pelo crescimento benigno da próstata, mas não tem de ser aceite. Há medicamentos e tratamentos que melhoram muito o jato, a urgência e o número de vezes que se levanta à noite.' },
          { ico: '🔍', titulo: 'Rastreio nesta idade', texto: 'Depois dos 70 anos, o PSA sem sintomas raramente traz benefício e pode levar a exames e tratamentos desnecessários. Converse com o médico sobre o que faz sentido no seu caso.' },
          { ico: '💊', titulo: 'Se tem cancro da próstata', lista: ['Muitos homens fazem apenas vigilância', 'A terapêutica hormonal pode causar afrontamentos, cansaço e perda de massa óssea e muscular — o exercício ajuda', 'Fale abertamente sobre os efeitos na vida sexual e na continência: há soluções'] },
        ],
        alerta: { titulo: 'Procure o médico se…', lista: ['Não conseguir urinar (retenção urinária — é urgente)', 'Sangue na urina', 'Dores nos ossos que não passam ou perda de peso'] },
        ligacoes: [{ href: 'calculadora-urologia/', texto: 'Avaliar os sintomas urinários (IPSS)' }],
      },
    },
  },

  {
    id: 'cancro-pele',
    nome: 'Cancro da pele',
    alias: 'Melanoma e outros',
    emoji: '☀️',
    categoria: 'Oncologia',
    palavras: 'melanoma sinal pele sol protetor solar escaldão queimadura solar basocelular ABCDE',
    resumo: 'O cancro mais frequente de todos, ligado sobretudo ao sol. O melanoma é o mais grave, e a proteção solar e a vigilância dos sinais salvam vidas.',
    heroi: 'sinal-pele',
    deco: 'sol',
    grupos: {
      '3-5': {
        imagens: [
          ['nuvem-sol', 'O sol é bom, mas queima a pele'],
          ['protetor', 'Pôr protetor antes de ir para a praia'],
          ['calor', 'Ficar à sombra quando o sol está forte'],
          ['agua', 'Beber água quando está calor'],
          ['sinal-pele', 'Os sinais da pele mostram-se ao médico'],
          ['abraco', 'Os pais ajudam a pôr o protetor'],
        ],
      },
      '5-12': {
        intro: 'O sol dá-nos luz, calor e vitamina D, mas tem uns raios invisíveis, os ultravioleta, que queimam a pele. Muitos escaldões ao longo da vida podem causar cancro da pele. A boa notícia: proteger-se é fácil!',
        imagens: [
          ['protetor', 'Protetor solar com fator 50'],
          ['calor', 'Sombra nas horas de mais calor'],
          ['sinal-pele', 'Olhar para os sinais com atenção'],
          ['nuvem-sol', 'Mesmo com nuvens, o sol queima'],
        ],
        seccoes: [
          { ico: '☀️', titulo: 'Porque é que o sol queima?', texto: 'Os raios ultravioleta entram na pele e estragam as células. A pele fica vermelha e dói: é um escaldão. A pele lembra-se de todos os escaldões, e alguns podem, muitos anos depois, transformar-se em cancro.' },
          { ico: '🧴', titulo: 'Como me protejo?', lista: ['Protetor solar 30 minutos antes de sair, e outra vez de 2 em 2 horas e depois de cada banho', 'Chapéu, óculos de sol e t-shirt', 'Brincar à sombra entre o meio-dia e as 4 da tarde', 'Beber água'] },
          { ico: '🔍', titulo: 'E os sinais?', texto: 'Quase todos temos sinais na pele, e são normais. Se um sinal mudar de tamanho, de forma ou de cor, ou sangrar, mostra-o aos teus pais para irem ao médico.' },
        ],
        curiosidade: 'Truque da sombra: se a tua sombra for mais curta do que tu, o sol está forte — é hora de ir para a sombra!',
      },
      '13-17': {
        intro: 'O cancro da pele é o cancro mais frequente, e a maior parte do risco constrói-se antes dos 20 anos, com escaldões e bronzeados intensos. Os solários também aumentam muito o risco de melanoma.',
        imagens: [
          ['sinal-pele', 'A regra ABCDE ajuda a vigiar os sinais'],
          ['protetor', 'Protetor solar, chapéu e sombra'],
          ['calor', 'Evitar o sol entre as 12 e as 16 horas'],
        ],
        seccoes: [
          { ico: '🔬', titulo: 'Tipos de cancro da pele', lista: ['Carcinoma basocelular: o mais frequente, cresce devagar e quase nunca se espalha', 'Carcinoma espinocelular: nas zonas mais expostas ao sol, como a cara e as orelhas', 'Melanoma: menos frequente, mas o mais grave, porque se pode espalhar — mesmo em jovens'] },
          { ico: '🔍', titulo: 'A regra ABCDE', lista: ['A — Assimetria: uma metade diferente da outra', 'B — Bordos irregulares ou mal definidos', 'C — Cor: várias cores ou muito escura', 'D — Diâmetro maior do que 6 mm', 'E — Evolução: um sinal que muda'] },
          { ico: '🧴', titulo: 'Proteger-se a sério', lista: ['Protetor FPS 30 ou mais, em quantidade generosa', 'Reaplicar de 2 em 2 horas e depois de nadar ou transpirar', 'Nada de solários', 'O bronzeado já é um sinal de lesão da pele'] },
        ],
        mitos: [
          ['Um bronzeado protege do sol.', 'Um bronzeado equivale, no máximo, a um fator de proteção muito baixo — e é sinal de que a pele já foi lesada.'],
          ['Em dias nublados não é preciso protetor.', 'Grande parte dos raios ultravioleta atravessa as nuvens.'],
          ['Os solários são mais seguros do que o sol.', 'Usar solários antes dos 35 anos aumenta muito o risco de melanoma.'],
        ],
        alerta: { titulo: 'Mostra a um médico se…', lista: ['Um sinal mudar de tamanho, forma ou cor', 'Um sinal sangrar, fizer comichão ou ferida', 'Aparecer um sinal novo muito diferente dos outros'] },
      },
      '18-65': {
        intro: 'Portugal tem muitas horas de sol, e o cancro da pele é o cancro mais frequente. O melanoma é o mais grave e atinge com frequência adultos jovens. Detetado cedo, cura-se quase sempre com uma pequena cirurgia.',
        imagens: [
          ['sinal-pele', 'Autoexame da pele uma vez por mês'],
          ['protetor', 'Proteção solar todos os dias de exposição'],
          ['calor', 'Sombra nas horas de maior radiação'],
        ],
        seccoes: [
          { ico: '⚖️', titulo: 'Fatores de risco', lista: ['Pele clara, cabelo ruivo ou loiro, olhos claros, sardas', 'Escaldões, sobretudo na infância', 'Mais de 50 sinais ou sinais atípicos', 'Familiares com melanoma', 'Trabalho ao ar livre e uso de solários', 'Imunossupressão (por exemplo, depois de um transplante)'] },
          { ico: '🔍', titulo: 'Autoexame', texto: 'Uma vez por mês, com boa luz e um espelho, observe toda a pele, incluindo o couro cabeludo, as plantas dos pés, entre os dedos e as unhas. Use a regra ABCDE e procure o «patinho feio»: o sinal diferente de todos os outros. Feridas que não cicatrizam também merecem atenção.' },
          { ico: '🧴', titulo: 'Proteção solar', lista: ['Evitar o sol entre as 12 e as 16 horas', 'Roupa, chapéu de abas largas e óculos de sol', 'Protetor FPS 30 ou mais, reaplicado de 2 em 2 horas', 'Consultar o índice UV na previsão do tempo', 'Bebés com menos de 6 meses não devem estar ao sol direto'] },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Um sinal mudar, sangrar ou fizer comichão', 'Aparecer um sinal novo e diferente, sobretudo depois dos 30 anos', 'Uma ferida na pele não cicatrizar em 4 semanas'] },
      },
      '65+': {
        intro: 'Depois dos 65 anos, o cancro da pele é muito frequente, sobretudo em quem trabalhou ao sol — no campo, no mar ou nas obras. Nos séniores aparecem muitas vezes feridas ou crostas que não saram, na cara, nas orelhas, no couro cabeludo e nas mãos.',
        imagens: [
          ['sinal-pele', 'Manchas, sinais ou feridas que mudam'],
          ['protetor', 'Protetor solar, também nas mãos e nas orelhas'],
          ['calor', 'Chapéu e sombra'],
          ['medico', 'Mostrar a pele ao médico'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Esteja atento a', lista: ['Feridas ou crostas que não cicatrizam ou que sangram', 'Pequenos «caroços» brilhantes, rosados ou perolados', 'Manchas ásperas que voltam sempre (queratoses actínicas)', 'Sinais escuros que crescem ou mudam'] },
          { ico: '🧴', titulo: 'Proteger a pele', lista: ['Chapéu de abas largas e roupa a cobrir os braços', 'Protetor nas zonas destapadas: cara, orelhas, pescoço, mãos e careca', 'Evitar o sol nas horas de mais calor', 'Alguns medicamentos tornam a pele mais sensível ao sol — pergunte ao farmacêutico'] },
          { ico: '👀', titulo: 'Peça ajuda para ver', texto: 'As costas, o couro cabeludo e a parte de trás das pernas são difíceis de ver sozinho. Peça a um familiar que olhe, ou mostre ao médico nas consultas.' },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Uma ferida não cicatrizar em 4 semanas', 'Um sinal ou mancha crescer, mudar de cor ou sangrar', 'Aparecer um caroço novo na pele'] },
      },
    },
  },

  {
    id: 'ansiedade',
    nome: 'Ansiedade',
    alias: 'Perturbações de ansiedade e ataques de pânico',
    emoji: '🌀',
    categoria: 'Saúde mental',
    palavras: 'nervos stress preocupação pânico medo fobia nervosismo angústia calmantes benzodiazepinas',
    resumo: 'Preocupação e medo intensos, que não passam e atrapalham o dia a dia. É das doenças mentais mais frequentes em Portugal, e trata-se bem.',
    heroi: 'respirar-calmo',
    deco: 'respiro',
    grupos: {
      '3-5': {
        imagens: [
          ['pensamentos', 'Às vezes temos medo e o coração bate depressa'],
          ['respirar-calmo', 'Encher a barriga de ar, devagarinho'],
          ['abraco', 'Um abraço ajuda a acalmar'],
          ['conversa', 'Contar o que sentimos a um adulto'],
          ['musica', 'Música calminha antes de dormir'],
          ['sono', 'Dormir bem ajuda a ficar tranquilo'],
        ],
      },
      '5-12': {
        intro: 'Todos sentimos medo e nervos às vezes — antes de um teste, de um jogo ou de ir ao médico. É normal e até ajuda a estar atento. A ansiedade passa a ser um problema quando os medos são muitos, duram muito e não deixam fazer as coisas de que gostamos.',
        imagens: [
          ['pensamentos', 'Pensamentos de «e se…?» que não param'],
          ['respirar-calmo', 'Respirar devagar acalma o corpo'],
          ['conversa', 'Falar com quem gosta de nós'],
          ['correr', 'Brincar e mexer o corpo'],
        ],
        seccoes: [
          { ico: '🦋', titulo: 'O que se sente?', lista: ['Borboletas na barriga ou dor de barriga', 'Coração a bater depressa', 'Mãos a suar ou a tremer', 'Dificuldade em adormecer', 'Vontade de fugir ou de não ir à escola'] },
          { ico: '🧠', titulo: 'Porque acontece?', texto: 'O cérebro tem um alarme que nos protege do perigo. Na ansiedade, esse alarme fica muito sensível e toca mesmo quando não há perigo nenhum. O corpo prepara-se para fugir, e é por isso que o coração acelera.' },
          { ico: '🎈', titulo: 'Truques para acalmar', lista: ['Respiração do balão: encher a barriga de ar a contar até 4 e deitar fora a contar até 6', 'Dizer o nome de 5 coisas que vês à tua volta', 'Desenhar ou escrever o que te preocupa', 'Contar a um adulto de confiança'] },
        ],
        curiosidade: 'Quando expiras devagar, ativas um nervo chamado nervo vago, que diz ao coração para abrandar — é como um travão natural!',
      },
      '13-17': {
        intro: 'A ansiedade é muito comum na adolescência: escola, exames, redes sociais, amigos, futuro. Um pouco de nervos é normal. Mas se a preocupação não te larga, te tira o sono ou te faz evitar coisas, merece ajuda — e trata-se bem.',
        imagens: [
          ['pensamentos', 'Preocupação constante e pensamentos acelerados'],
          ['respirar-calmo', 'Técnicas de respiração e relaxamento'],
          ['ecra', 'Menos ecrã, sobretudo à noite'],
        ],
        seccoes: [
          { ico: '🌀', titulo: 'Formas de ansiedade', lista: ['Ansiedade generalizada: preocupação com quase tudo, quase todos os dias', 'Ansiedade social: medo intenso de ser avaliado ou envergonhado', 'Ataques de pânico: crises súbitas de medo, coração acelerado, falta de ar, sensação de desmaio', 'Fobias: medo intenso de uma coisa ou situação concreta'] },
          { ico: '🧰', titulo: 'O que ajuda', lista: ['Dormir 8 a 10 horas e ter horários regulares', 'Exercício físico', 'Reduzir a cafeína e as bebidas energéticas', 'Fazer pausas nas redes sociais', 'Enfrentar os medos aos poucos, em vez de os evitar'] },
          { ico: '💬', titulo: 'Pedir ajuda', texto: 'Fala com os teus pais, um professor, o psicólogo da escola ou o médico de família. A psicoterapia (sobretudo a terapia cognitivo-comportamental) funciona muito bem. Pedir ajuda é um sinal de força, não de fraqueza.' },
        ],
        mitos: [
          ['Ansiedade é só nervos, passa sozinha.', 'A perturbação de ansiedade é uma doença real e, sem tratamento, pode durar anos.'],
          ['Um ataque de pânico pode matar.', 'É muito assustador, mas não é perigoso e passa em minutos. Ainda assim, uma primeira crise deve ser avaliada.'],
          ['Evitar o que nos assusta resolve.', 'Evitar alivia no momento, mas faz o medo crescer. Enfrentar aos poucos, com apoio, é o que funciona.'],
        ],
        alerta: { titulo: 'Pede ajuda já se…', lista: ['Pensares em fazer-te mal ou em morrer (liga 112 ou SNS 24: 808 24 24 24)', 'Deixares de ir à escola ou de sair por causa do medo', 'Usares álcool ou outras substâncias para acalmar'] },
        ligacoes: [{ href: 'calculadora-saude-mental/?calc=gad7', texto: 'Questionário de ansiedade (GAD-7)' }],
      },
      '18-65': {
        intro: 'Portugal está entre os países europeus com mais perturbações de ansiedade: perto de 1 em cada 6 adultos tem uma, num ano. É muito tratável, mas muitas pessoas esperam anos até pedir ajuda.',
        imagens: [
          ['pensamentos', 'Preocupação excessiva, difícil de controlar'],
          ['respirar-calmo', 'Respiração lenta e relaxamento'],
          ['conversa', 'A psicoterapia é um tratamento eficaz'],
        ],
        seccoes: [
          { ico: '🩺', titulo: 'Sintomas', lista: ['Preocupação excessiva e difícil de controlar', 'Inquietação, irritabilidade, dificuldade de concentração', 'Tensão muscular, cansaço, insónia', 'Palpitações, falta de ar, tonturas, aperto no peito, problemas digestivos', 'Evitar situações por medo'] },
          { ico: '💬', titulo: 'Tratamento', lista: ['Psicoterapia, sobretudo terapia cognitivo-comportamental', 'Antidepressivos, que também tratam a ansiedade (fazem efeito em 2 a 6 semanas)', 'Exercício regular, sono regular, menos cafeína e álcool', 'Técnicas de relaxamento e de atenção plena (mindfulness)'] },
          { ico: '💊', titulo: 'E os calmantes?', texto: 'Portugal é dos países europeus que mais consome benzodiazepinas (calmantes como o alprazolam ou o diazepam). Aliviam depressa, mas causam dependência e sonolência e não tratam a causa. Devem ser usados só por pouco tempo, com indicação médica.' },
          { ico: '📞', titulo: 'Onde pedir ajuda', texto: 'Comece pelo médico de família. A linha SNS 24 (808 24 24 24) tem aconselhamento psicológico. Uma dor no peito nunca deve ser assumida como ansiedade sem avaliação médica.' },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Tiver pensamentos de suicídio (ligue 112)', 'Tiver dor no peito, falta de ar ou desmaio — pode não ser ansiedade', 'A ansiedade o impedir de trabalhar ou de sair de casa'] },
        ligacoes: [{ href: 'calculadora-saude-mental/?calc=gad7', texto: 'Questionário de ansiedade (GAD-7)' }],
      },
      '65+': {
        intro: 'A ansiedade também é frequente depois dos 65 anos, muitas vezes junto com doenças físicas, perdas ou solidão. É frequente aparecer como queixas do corpo — insónia, tonturas, dores — e pode ser tratada com segurança.',
        imagens: [
          ['pensamentos', 'Preocupações que não deixam descansar'],
          ['conversa', 'Conviver e falar com alguém'],
          ['bengala', 'Caminhar acalma'],
          ['respirar-calmo', 'Respirar devagar antes de dormir'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais', lista: ['Preocupação constante com a saúde, a família ou o dinheiro', 'Insónia, tensão, inquietação', 'Medo de sair de casa ou de cair', 'Queixas físicas sem causa encontrada'] },
          { ico: '💊', titulo: 'Cuidado com os calmantes', lista: ['As benzodiazepinas aumentam o risco de quedas, fraturas, confusão e problemas de memória', 'Não as pare de repente: a redução deve ser gradual, com o médico', 'Há tratamentos mais seguros para a ansiedade e para a insónia'] },
          { ico: '🌿', titulo: 'O que ajuda', lista: ['Rotinas diárias e atividade física', 'Convívio: família, amigos, universidade sénior, centro de dia', 'Psicoterapia — funciona em qualquer idade', 'Menos café e chá à tarde'] },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Pensar em morrer ou em fazer mal a si próprio (ligue 112)', 'Dor no peito ou falta de ar: ligue 112 — pode não ser ansiedade', 'Sentir que já não consegue lidar com as preocupações'] },
        ligacoes: [{ href: 'calculadora-saude-mental/?calc=gad7', texto: 'Questionário de ansiedade (GAD-7)' }],
      },
    },
  },

  {
    id: 'parkinson',
    nome: 'Doença de Parkinson',
    emoji: '🤲',
    categoria: 'Cérebro e nervos',
    palavras: 'tremor tremura lentidão rigidez dopamina levodopa marcha quedas',
    resumo: 'O cérebro produz pouca dopamina, e os movimentos ficam lentos, rígidos e com tremor. Não tem cura, mas o tratamento e o exercício melhoram muito a vida.',
    heroi: 'mao-tremor',
    deco: 'mao',
    grupos: {
      '3-5': {
        imagens: [
          ['cerebro', 'O cérebro manda o corpo mexer-se'],
          ['mao-tremor', 'Às vezes a mão dos avós treme'],
          ['bengala', 'Os avós andam mais devagar'],
          ['musica', 'Dançar faz bem aos avós'],
          ['comprimido', 'Os remédios ajudam a mexer melhor'],
          ['abraco', 'Ter paciência e dar a mão'],
        ],
      },
      '5-12': {
        intro: 'A doença de Parkinson é uma doença do cérebro que torna os movimentos mais lentos e, muitas vezes, faz tremer as mãos. Aparece sobretudo nos avós, não se pega e não é culpa de ninguém.',
        imagens: [
          ['mao-tremor', 'Tremor nas mãos quando estão paradas'],
          ['cerebro', 'Falta um mensageiro no cérebro: a dopamina'],
          ['musica', 'Música, dança e exercício ajudam'],
          ['comprimido', 'Remédios a horas certas'],
        ],
        seccoes: [
          { ico: '🧠', titulo: 'O que é?', texto: 'Para nos mexermos, o cérebro usa um mensageiro chamado dopamina. Na doença de Parkinson, as células que fazem dopamina vão desaparecendo, e as ordens para o corpo chegam mais devagar. Os movimentos ficam lentos, os músculos rígidos e as mãos podem tremer.' },
          { ico: '👀', titulo: 'O que se pode notar?', lista: ['Tremor nas mãos quando estão paradas', 'Andar devagar, com passos curtinhos', 'Cara com menos expressão — não quer dizer que esteja triste!', 'Letra pequenina e voz baixa'] },
          { ico: '💛', titulo: 'Como posso ajudar?', lista: ['Ter paciência quando o avô demora', 'Lembrar os remédios à hora certa', 'Dançar, fazer exercício ou jogar com ele', 'Tirar tapetes e brinquedos do chão, para evitar quedas'] },
        ],
        curiosidade: 'O Dia Mundial da Doença de Parkinson é a 11 de abril, dia em que nasceu James Parkinson, o médico inglês que a descreveu em 1817. O seu símbolo é uma tulipa vermelha!',
      },
      '13-17': {
        intro: 'A doença de Parkinson é a segunda doença neurodegenerativa mais frequente, depois da doença de Alzheimer, e afeta cerca de 20 mil pessoas em Portugal. Quase sempre começa depois dos 60 anos, mas há casos mais cedo.',
        imagens: [
          ['mao-tremor', 'Tremor de repouso, lentidão e rigidez'],
          ['cerebro', 'Perda de neurónios que produzem dopamina'],
          ['bicicleta', 'O exercício é parte do tratamento'],
        ],
        seccoes: [
          { ico: '🧠', titulo: 'O que se passa no cérebro', texto: 'Numa zona chamada substância negra, os neurónios que produzem dopamina vão-se perdendo. A dopamina é essencial para controlar os movimentos. A causa exata não se conhece: há fatores genéticos e ambientais.' },
          { ico: '🩺', titulo: 'Sintomas', lista: ['Lentidão dos movimentos', 'Tremor de repouso, muitas vezes de um só lado no início', 'Rigidez muscular', 'Alterações da marcha e do equilíbrio', 'Sintomas não motores: perda do olfato, obstipação, sono agitado, tristeza'] },
          { ico: '💊', titulo: 'Tratamento', texto: 'Os medicamentos substituem ou imitam a dopamina e melhoram muito os sintomas. Juntam-se fisioterapia, terapia da fala e exercício — dança, boxe adaptado, bicicleta, tai chi. Em alguns casos, faz-se cirurgia de estimulação cerebral profunda.' },
        ],
        mitos: [
          ['Parkinson é só tremer.', 'A lentidão é o sintoma principal, e há pessoas que nunca tremem.'],
          ['Só acontece a pessoas muito velhas.', 'É mais frequente depois dos 60, mas cerca de 1 em cada 10 casos começa antes dos 50.'],
          ['Quem tem Parkinson deve evitar o esforço.', 'O exercício regular é um dos tratamentos mais eficazes.'],
        ],
        alerta: { titulo: 'Avisa um adulto se um familiar…', lista: ['Cair ou ficar «colado» ao chão sem conseguir andar', 'Engasgar-se com frequência ao comer', 'Ficar confuso ou ver coisas que não existem'] },
      },
      '18-65': {
        intro: 'A doença de Parkinson afeta cerca de 20 mil pessoas em Portugal. Embora seja mais frequente depois dos 60, pode começar antes, em idade ativa. O diagnóstico é clínico, e o tratamento precoce permite manter uma vida ativa durante muitos anos.',
        imagens: [
          ['mao-tremor', 'Tremor de repouso e lentidão'],
          ['comprimido', 'Medicamentos a horas certas'],
          ['bicicleta', 'Exercício regular e intenso'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais precoces', lista: ['Tremor numa mão em repouso', 'Lentidão e menos destreza (abotoar, escrever)', 'Letra cada vez mais pequena', 'Menos balanço de um braço ao andar', 'Anos antes: perda do olfato, obstipação, sonhos «vividos» com movimentos durante o sono, depressão'] },
          { ico: '🔬', titulo: 'Diagnóstico', texto: 'Faz-se pela observação de um neurologista. Exames como a ressonância ou o DaTSCAN ajudam em casos duvidosos. Alguns medicamentos (para os enjoos, as tonturas ou psiquiátricos) podem causar sintomas parecidos.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Levodopa e outros medicamentos dopaminérgicos', 'Horários rigorosos: atrasos causam bloqueios', 'Tomar a levodopa 30 a 60 minutos antes das refeições, porque a proteína reduz a absorção', 'Fisioterapia, terapia da fala e terapia ocupacional', 'Estimulação cerebral profunda em casos selecionados'] },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Quedas frequentes ou bloqueios ao andar', 'Engasgamentos ao comer ou beber', 'Alucinações, confusão ou comportamentos impulsivos (jogo, compras) com a medicação'] },
      },
      '65+': {
        intro: 'Depois dos 65 anos, a doença de Parkinson é mais frequente. O tratamento certo, o exercício e uma casa segura ajudam a manter a autonomia e a prevenir quedas.',
        imagens: [
          ['pastilheiro', 'Medicamentos sempre à mesma hora'],
          ['musica', 'Música e dança: dar ritmo aos passos'],
          ['luz-noite', 'Luz de presença para evitar quedas'],
          ['halteres', 'Exercício todos os dias'],
        ],
        seccoes: [
          { ico: '⏰', titulo: 'Medicação', lista: ['Use alarmes para não atrasar as tomas', 'Leve os medicamentos se for para o hospital e avise dos horários', 'Não pare a levodopa de repente', 'Fale com o médico se o efeito durar cada vez menos ou tiver movimentos involuntários'] },
          { ico: '🚶', titulo: 'Andar com segurança', lista: ['Passos largos e contar ou marcar o ritmo ajuda a desbloquear', 'Calçado fechado e antiderrapante', 'Tirar tapetes, pôr barras de apoio na casa de banho', 'Levantar-se devagar, por causa das tonturas'] },
          { ico: '🍽️', titulo: 'Outros cuidados', lista: ['Comer devagar, sentado direito, em pequenas porções', 'Fibras e água para a obstipação', 'Falar alto e devagar — a terapia da fala ajuda', 'Tratar a tristeza e a ansiedade, que são frequentes'] },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Cair ou tiver bloqueios frequentes', 'Engasgar-se muitas vezes', 'Ficar confuso, com alucinações ou muito sonolento'] },
        ligacoes: [{ href: 'calculadora-geriatria/', texto: 'Escalas de avaliação geriátrica (quedas, autonomia)' }],
      },
    },
  },

  {
    id: 'lombalgia',
    nome: 'Dor lombar',
    alias: 'Lombalgia e dor nas costas',
    emoji: '🦴',
    categoria: 'Ossos e articulações',
    palavras: 'lombalgia dor nas costas ciática hérnia discal coluna postura mochila',
    resumo: 'Dor na parte de baixo das costas, a principal causa de incapacidade no mundo. Quase sempre melhora em poucas semanas, mantendo-se ativo.',
    heroi: 'coluna',
    deco: 'coluna',
    grupos: {
      '3-5': {
        imagens: [
          ['coluna', 'A coluna segura o nosso corpo direito'],
          ['levantar-peso', 'Dobrar os joelhos para levantar coisas'],
          ['correr', 'Brincar e correr deixa as costas fortes'],
          ['nadar', 'Nadar faz bem às costas'],
          ['cama', 'Dormir bem descansa o corpo'],
          ['abraco', 'Ajudar os avós com os sacos pesados'],
        ],
      },
      '5-12': {
        intro: 'A coluna é feita de muitos ossinhos empilhados, as vértebras, com almofadas no meio. Segura o corpo e deixa-nos dobrar e rodar. Às vezes, a parte de baixo das costas dói: chama-se dor lombar.',
        imagens: [
          ['coluna', 'As vértebras e as almofadas da coluna'],
          ['levantar-peso', 'Levantar pesos com os joelhos dobrados'],
          ['nadar', 'Desporto deixa os músculos fortes'],
        ],
        seccoes: [
          { ico: '🦴', titulo: 'Como é a coluna?', texto: 'A coluna tem 33 ossinhos, as vértebras. Entre elas há discos, umas almofadas que amortecem os saltos. À volta, há músculos fortes que seguram tudo. Na zona lombar, a parte de baixo das costas, a coluna aguenta o peso de quase todo o corpo.' },
          { ico: '🎒', titulo: 'A mochila da escola', lista: ['Não deve pesar mais do que 10 % do teu peso', 'Usa as duas alças, bem ajustadas', 'Leva só o que precisas nesse dia', 'Os livros mais pesados encostados às costas'] },
          { ico: '💪', titulo: 'Costas fortes', lista: ['Brincar, correr e fazer desporto', 'Mudar de posição quando estás muito tempo sentado', 'Sentar com as costas apoiadas e os pés no chão', 'Menos tempo agarrado ao telemóvel ou ao tablet'] },
        ],
        curiosidade: 'Os bebés nascem com cerca de 300 ossos, mas, ao crescer, alguns juntam-se. Os adultos têm 206 — e os da coluna estão entre os mais fortes!',
      },
      '13-17': {
        intro: 'A dor nas costas é cada vez mais comum na adolescência, ligada a muitas horas sentado, a ecrãs, a mochilas pesadas e a pouco exercício — ou a desportos com muito impacto. Quase sempre é benigna e melhora em pouco tempo.',
        imagens: [
          ['coluna', 'Dor na zona lombar'],
          ['ecra', 'Muitas horas de ecrã e má postura'],
          ['nadar', 'Exercício: o melhor remédio'],
        ],
        seccoes: [
          { ico: '❓', titulo: 'Porque dói', texto: 'Na maioria dos casos, não há lesão grave: são os músculos e os ligamentos que se queixam do excesso de carga, da má postura ou da falta de exercício. Chama-se dor lombar inespecífica.' },
          { ico: '🧰', titulo: 'O que ajuda', lista: ['Manter-se ativo: o repouso na cama atrasa a recuperação', 'Calor local', 'Fazer pausas e levantar-se a cada 30 a 45 minutos', 'Fortalecer os músculos do abdómen e das costas (natação, pilates)', 'Dormir bem'] },
          { ico: '⚽', titulo: 'No desporto', texto: 'Ginástica, dança, futebol ou levantamento de pesos podem sobrecarregar a coluna. Uma dor que piora quando dobras as costas para trás e não passa em 2 a 3 semanas deve ser vista por um médico.' },
        ],
        mitos: [
          ['Com dor nas costas, o melhor é ficar deitado.', 'Ficar ativo, dentro do possível, faz recuperar mais depressa.'],
          ['É preciso fazer um raio-X ou uma ressonância.', 'Na maioria dos casos, os exames não são necessários e não mudam o tratamento.'],
          ['Mochilas pesadas entortam a coluna para sempre.', 'Não causam escoliose, mas cansam os músculos e provocam dor.'],
        ],
        alerta: { titulo: 'Vai ao médico se…', lista: ['A dor te acordar à noite ou vier com febre', 'Sentires fraqueza ou dormência nas pernas', 'A dor começar depois de uma queda ou pancada forte'] },
      },
      '18-65': {
        intro: 'A dor lombar é a principal causa de incapacidade no mundo: cerca de 8 em cada 10 pessoas vão tê-la em algum momento. Na grande maioria dos casos não há uma causa grave e melhora em 4 a 6 semanas.',
        imagens: [
          ['coluna', 'Dor lombar: quase sempre mecânica e benigna'],
          ['levantar-peso', 'Levantar pesos junto ao corpo, com os joelhos dobrados'],
          ['nadar', 'Exercício regular previne recaídas'],
        ],
        seccoes: [
          { ico: '🩺', titulo: 'Tipos de dor', lista: ['Dor lombar inespecífica: a mais comum, muscular e ligamentar', 'Ciática: dor que desce pela perna até abaixo do joelho, por irritação de um nervo (por exemplo, hérnia discal)', 'Causas específicas, raras: fraturas, infeções, tumores, doenças inflamatórias'] },
          { ico: '🧰', titulo: 'Tratamento', lista: ['Manter-se ativo e voltar ao trabalho logo que possível', 'Calor local', 'Analgésicos ou anti-inflamatórios por pouco tempo, se necessário', 'Fisioterapia e exercício orientado, sobretudo se a dor durar', 'Os exames de imagem só são necessários perante sinais de alarme ou dor persistente'] },
          { ico: '🛡️', titulo: 'Prevenir', lista: ['Exercício regular: caminhar, nadar, pilates, reforço muscular', 'Pausas no trabalho sentado; ajustar a cadeira e o ecrã', 'Levantar pesos junto ao corpo, com os joelhos dobrados e sem rodar', 'Manter um peso saudável e não fumar'] },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Dormência na zona genital ou entre as pernas', 'Perder o controlo da urina ou das fezes', 'Perder força nas pernas', 'Dor com febre, depois de uma queda, ou com perda de peso sem explicação'] },
      },
      '65+': {
        intro: 'A dor nas costas é muito frequente depois dos 65 anos, muitas vezes por desgaste da coluna (artrose). Também pode ser uma fratura de uma vértebra por osteoporose, mesmo sem queda. Manter-se ativo é o melhor remédio.',
        imagens: [
          ['coluna', 'Artrose e desgaste da coluna'],
          ['ossos', 'Fraturas das vértebras por osteoporose'],
          ['bengala', 'Caminhar todos os dias'],
          ['nadar', 'Hidroginástica e exercício suave'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Causas frequentes', lista: ['Artrose da coluna', 'Estenose do canal lombar: dor nas pernas ao andar, que alivia ao sentar ou ao inclinar-se para a frente', 'Fratura vertebral por osteoporose: dor súbita, às vezes depois de um esforço pequeno', 'Perda de altura ou costas mais curvadas'] },
          { ico: '💊', titulo: 'Tratar a dor com segurança', lista: ['O paracetamol é geralmente o primeiro passo', 'Os anti-inflamatórios podem fazer mal ao estômago, aos rins e ao coração: só com indicação médica', 'Calor local e exercício orientado', 'Alguns medicamentos para a dor causam sonolência e quedas'] },
          { ico: '🌿', titulo: 'No dia a dia', lista: ['Caminhar e fazer exercício suave todos os dias', 'Cadeiras firmes, com braços, e cama nem mole nem dura', 'Pedir ajuda para pegar em pesos', 'Tratar a osteoporose, se existir'] },
        ],
        alerta: { titulo: 'Procure o médico se…', lista: ['Dor súbita e forte nas costas, mesmo sem queda', 'Perda de força nas pernas ou dificuldade em urinar', 'Dor com febre ou perda de peso sem explicação'] },
        ligacoes: [{ href: 'calculadora-rastreio/', texto: 'Calcular o risco de fratura' }],
      },
    },
  },

  {
    id: 'gripe',
    nome: 'Gripe',
    emoji: '🤧',
    categoria: 'Infeções',
    tambem: ['Respiratório'],
    palavras: 'influenza vírus febre inverno vacina contágio infeciosa contagiosa',
    resumo: 'Infeção pelo vírus influenza, que começa de repente com febre alta, dores no corpo e muito cansaço. A vacina anual protege das formas graves.',
    heroi: 'virus',
    deco: 'virus',
    grupos: {
      '3-5': {
        imagens: [
          ['virus', 'A gripe é causada por um vírus pequenino'],
          ['termometro', 'Dá febre e o corpo fica quente'],
          ['cama', 'Descansar na cama ajuda a ficar bom'],
          ['agua', 'Beber muita água'],
          ['cotovelo', 'Tossir para o cotovelo'],
          ['lavar-maos', 'Lavar as mãos com sabão'],
        ],
      },
      '5-12': {
        intro: 'A gripe é uma infeção causada por um vírus chamado influenza. Passa de pessoa para pessoa quando alguém tosse, espirra ou toca com as mãos sujas na boca, no nariz ou nos olhos.',
        imagens: [
          ['virus', 'O vírus da gripe muda um bocadinho todos os anos'],
          ['termometro', 'Febre alta, dores no corpo e cansaço'],
          ['cama', 'Ficar em casa até a febre passar'],
          ['vacina', 'A vacina ajuda a proteger'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'O que é?', texto: 'É uma infeção do nariz, da garganta e dos pulmões. Aparece sobretudo no inverno, quando passamos mais tempo em sítios fechados, perto uns dos outros.' },
          { ico: '🤒', titulo: 'Como se sente?', lista: ['Febre alta que começa de repente', 'Dores no corpo e na cabeça', 'Muito cansaço', 'Tosse e dor de garganta', 'Às vezes, vómitos ou dor de barriga'] },
          { ico: '🛌', titulo: 'Como se trata?', lista: ['Descansar e ficar em casa', 'Beber muitos líquidos: água, chá, sopa', 'Medicamento para a febre, dado por um adulto', 'Os antibióticos não matam vírus, por isso não ajudam'] },
          { ico: '🛡️', titulo: 'Como não passar aos outros?', lista: ['Tossir e espirrar para o cotovelo ou para um lenço de papel', 'Deitar o lenço fora logo a seguir', 'Lavar as mãos muitas vezes', 'Não ir à escola enquanto houver febre'] },
        ],
        curiosidade: 'O vírus da gripe muda um pouco todos os anos — é por isso que a vacina é renovada a cada outono!',
      },
      '13-17': {
        intro: 'A gripe não é «uma constipação forte»: é uma infeção pelo vírus influenza que deita qualquer pessoa abaixo durante vários dias. Na maioria dos jovens passa sozinha em cerca de uma semana.',
        imagens: [
          ['virus', 'Influenza A e B circulam sobretudo entre novembro e março'],
          ['termometro', 'Começa de repente: febre, arrepios, dores musculares'],
          ['lenco', 'Espirros e tosse espalham o vírus'],
        ],
        seccoes: [
          { ico: '⚖️', titulo: 'Gripe ou constipação?', texto: 'A constipação começa devagar, com nariz entupido e espirros, e raramente dá febre alta. A gripe começa de repente, com febre, arrepios, dores no corpo e um cansaço que obriga a ficar na cama.' },
          { ico: '🌬️', titulo: 'Como se transmite', texto: 'Através das gotículas que saem quando se tosse, espirra ou fala, e das mãos que tocam em superfícies contaminadas. Quem tem gripe pode contagiar desde um dia antes dos sintomas até cerca de uma semana depois.' },
          { ico: '🛌', titulo: 'O que fazer', lista: ['Ficar em casa até estar 24 horas sem febre (sem medicamentos)', 'Beber muitos líquidos', 'Paracetamol ou ibuprofeno para a febre e as dores', 'Nunca tomar aspirina com menos de 18 anos', 'Voltar ao desporto só quando a energia regressar'] },
        ],
        mitos: [
          ['A vacina da gripe dá gripe.', 'Não. A vacina não tem vírus vivo capaz de causar a doença. Pode dar dor no braço ou um pouco de febre durante um dia.'],
          ['Um antibiótico ajuda a passar mais depressa.', 'Os antibióticos não atuam nos vírus. Só são precisos se aparecer uma complicação por bactérias.'],
          ['Gripe e constipação são a mesma coisa.', 'São causadas por vírus diferentes. A gripe é mais intensa e pode ter complicações como a pneumonia.'],
        ],
        alerta: { titulo: 'Liga para o SNS 24 (808 24 24 24) ou vai à urgência se…', lista: ['Tiveres falta de ar ou dor no peito', 'A febre durar mais de 3 dias ou voltar depois de ter melhorado', 'Ficares confuso ou muito sonolento', 'Vomitares tudo o que bebes'] },
      },
      '18-65': {
        intro: 'A gripe sazonal afeta todos os invernos centenas de milhares de pessoas em Portugal e enche os serviços de saúde. Na maioria dos adultos saudáveis cura-se em casa, mas pode descompensar doenças crónicas e causar pneumonia.',
        imagens: [
          ['virus', 'O vírus influenza muda de ano para ano'],
          ['cama', 'Repouso e líquidos são o principal tratamento'],
          ['vacina', 'Vacina anual, de preferência no outono'],
        ],
        seccoes: [
          { ico: '🤒', titulo: 'Sintomas', lista: ['Início súbito de febre e arrepios', 'Dores musculares e de cabeça', 'Cansaço intenso', 'Tosse seca e dor de garganta', 'A tosse e o cansaço podem durar 2 semanas'] },
          { ico: '⚠️', titulo: 'Maior risco de complicações', lista: ['Grávidas', 'Doenças crónicas: diabetes, asma, DPOC, doenças do coração, dos rins ou do fígado', 'Imunossupressão', 'Obesidade', 'Pessoas com 60 ou mais anos'] },
          { ico: '🏠', titulo: 'Tratar em casa', lista: ['Repouso e bastantes líquidos', 'Paracetamol para a febre e as dores', 'Ficar em casa até 24 horas sem febre, para não contagiar colegas', 'Nos grupos de risco, o médico pode receitar um antiviral — funciona melhor nas primeiras 48 horas', 'Antibiótico só se houver complicação bacteriana'] },
          { ico: '💉', titulo: 'Prevenção', lista: ['Vacina todos os anos, gratuita no SNS para as pessoas com 60 ou mais anos, grávidas, doentes crónicos e outros grupos definidos pela DGS', 'Lavar as mãos com frequência', 'Tossir e espirrar para o cotovelo', 'Usar máscara se tiver sintomas e precisar de estar com outras pessoas'] },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Falta de ar ou dor no peito', 'Febre que dura mais de 3 dias ou que volta depois de melhorar', 'Confusão ou sonolência excessiva', 'Agravamento de uma doença crónica (asma, diabetes, coração)'] },
        ligacoes: [
          { href: 'calculadora-vacinas/', texto: 'Calendário de vacinas (PNV)' },
          { href: 'calculadora-doses/', texto: 'Doses de paracetamol e ibuprofeno nas crianças' },
        ],
      },
      '65+': {
        intro: 'Depois dos 65 anos, a gripe é mais grave: é uma causa frequente de pneumonia, de internamento e de descompensação de doenças do coração e dos pulmões. A vacina anual é a melhor proteção, e é gratuita no SNS.',
        imagens: [
          ['vacina', 'Vacina da gripe todos os outonos'],
          ['termometro', 'Às vezes há pouca febre — atenção ao cansaço'],
          ['agua', 'Beber água mesmo sem sede'],
          ['lavar-maos', 'Lavar as mãos com frequência'],
          ['telefone', 'Em caso de dúvida, ligar para o SNS 24'],
        ],
        seccoes: [
          { ico: '💉', titulo: 'A vacina', texto: 'É gratuita no SNS a partir dos 60 anos e toma-se todos os anos, no outono, no centro de saúde ou em muitas farmácias. Pode ser dada no mesmo dia que a vacina contra a COVID-19. Demora cerca de duas semanas a proteger.' },
          { ico: '🔍', titulo: 'Sinais a vigiar', lista: ['Febre, ou temperatura baixa e mal-estar', 'Cansaço e fraqueza fora do habitual', 'Falta de apetite e de sede', 'Confusão ou quedas', 'Falta de ar ou tosse com expetoração'] },
          { ico: '🏠', titulo: 'Durante a doença', lista: ['Beber líquidos com frequência, em pequenas quantidades', 'Manter a medicação habitual e medir a glicose ou a tensão, se for o caso', 'Ligar ao médico ou ao SNS 24 logo no início: um antiviral pode ser útil nas primeiras 48 horas', 'Evitar visitas de crianças e de pessoas doentes'] },
        ],
        alerta: { titulo: 'Ligue 112 ou vá à urgência se…', lista: ['Falta de ar em repouso ou lábios arroxeados', 'Confusão súbita ou sonolência difícil de despertar', 'Dor no peito', 'Não conseguir beber nem comer'] },
      },
    },
  },

  {
    id: 'constipacao',
    nome: 'Constipação',
    emoji: '👃',
    categoria: 'Infeções',
    tambem: ['Respiratório'],
    palavras: 'resfriado nariz entupido ranho espirros rinovírus garganta vírus contágio infeciosa contagiosa',
    resumo: 'Infeção ligeira do nariz e da garganta, causada por vírus, que passa sozinha em cerca de uma semana. Não precisa de antibiótico.',
    heroi: 'lenco',
    deco: 'virus',
    grupos: {
      '3-5': {
        imagens: [
          ['lenco', 'Atchim! O nariz fica a pingar'],
          ['tosse', 'Às vezes dá tosse'],
          ['lavar-maos', 'Lavar as mãos depois de assoar'],
          ['agua', 'Beber água ajuda'],
          ['cama', 'Dormir bem para ficar bom'],
          ['brincar', 'Passado uns dias, volta-se a brincar'],
        ],
      },
      '5-12': {
        intro: 'A constipação é a doença mais comum de todas! É causada por vírus que entram pelo nariz e pela garganta. O nariz pinga ou fica entupido, espirramos muito e, ao fim de alguns dias, passa.',
        imagens: [
          ['lenco', 'Assoar o nariz com um lenço de papel'],
          ['virus', 'Há mais de 200 vírus diferentes que causam constipações'],
          ['lavar-maos', 'Lavar as mãos afasta os vírus'],
          ['sopa', 'Uma sopa quentinha sabe bem'],
        ],
        seccoes: [
          { ico: '🤧', titulo: 'O que é?', texto: 'É uma infeção ligeira do nariz e da garganta. As crianças apanham várias por ano — é assim que o sistema de defesa do corpo vai aprendendo a lutar contra os vírus.' },
          { ico: '😷', titulo: 'Como se sente?', lista: ['Nariz a pingar ou entupido', 'Espirros', 'Garganta a arranhar', 'Tosse', 'Às vezes, um pouco de febre'] },
          { ico: '🍵', titulo: 'O que ajuda?', lista: ['Lavar o nariz com soro', 'Beber muitos líquidos', 'Descansar', 'Os antibióticos não servem para as constipações'] },
          { ico: '🧼', titulo: 'Para não passar aos outros', lista: ['Espirrar para o cotovelo', 'Usar lenços de papel e deitá-los fora', 'Lavar as mãos muitas vezes', 'Não partilhar copos nem garrafas'] },
        ],
        curiosidade: 'Um espirro pode lançar gotinhas a mais de 100 quilómetros por hora!',
      },
      '13-17': {
        intro: 'A constipação é uma infeção viral das vias respiratórias superiores. É chata, mas benigna: dura em média 7 a 10 dias e trata-se aliviando os sintomas.',
        imagens: [
          ['lenco', 'Nariz entupido, espirros e garganta irritada'],
          ['virus', 'Rinovírus e outros vírus respiratórios'],
          ['sono', 'Dormir bem ajuda as defesas'],
        ],
        seccoes: [
          { ico: '📅', titulo: 'Como evolui', texto: 'Começa com a garganta a arranhar, seguem-se o nariz a pingar e os espirros, e o ranho pode ficar espesso, amarelo ou verde — o que não quer dizer que haja uma bactéria. A tosse pode durar até 3 semanas.' },
          { ico: '💊', titulo: 'O que ajuda', lista: ['Lavagens nasais com soro fisiológico', 'Paracetamol ou ibuprofeno se houver dores ou febre', 'Mel para a tosse', 'Muitos líquidos e dormir bem', 'Os descongestionantes nasais em spray não devem ser usados mais de 3 a 5 dias'] },
          { ico: '🚭', titulo: 'Fumar e vapear', texto: 'O fumo e o vapor irritam o nariz e a garganta, fazem as constipações durar mais e aumentam o risco de complicações como a sinusite e a bronquite.' },
        ],
        mitos: [
          ['Apanha-se uma constipação por apanhar frio.', 'São os vírus que causam a constipação. No inverno circulam mais, porque estamos mais tempo juntos em sítios fechados.'],
          ['Ranho verde quer dizer que é preciso antibiótico.', 'A cor do ranho muda naturalmente durante uma constipação e não indica infeção por bactérias.'],
          ['A vitamina C cura a constipação.', 'Não há provas de que trate ou previna as constipações na maioria das pessoas.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Tiveres febre alta ou durante mais de 3 dias', 'Sentires dor forte nos ouvidos ou na cara', 'Tiveres falta de ar ou pieira', 'Os sintomas piorarem depois de começarem a melhorar'] },
      },
      '18-65': {
        intro: 'Um adulto apanha, em média, 2 a 3 constipações por ano. São causadas por mais de 200 vírus diferentes, sobretudo rinovírus, e passam sozinhas em 7 a 10 dias.',
        imagens: [
          ['lenco', 'Rinorreia, espirros e obstrução nasal'],
          ['agua', 'Hidratação e lavagens nasais'],
          ['lavar-maos', 'As mãos são a principal via de contágio'],
        ],
        seccoes: [
          { ico: '🤧', titulo: 'Sintomas', lista: ['Nariz a pingar ou entupido', 'Espirros', 'Dor de garganta', 'Tosse', 'Febre baixa ou ausente', 'Mal-estar ligeiro'] },
          { ico: '💊', titulo: 'Alívio dos sintomas', lista: ['Lavagens nasais com soro fisiológico ou água do mar', 'Paracetamol ou ibuprofeno para as dores', 'Descongestionante nasal só durante 3 a 5 dias (pode causar efeito ricochete)', 'Mel ou rebuçados para a tosse e a garganta', 'Os antibióticos não têm efeito e podem causar efeitos secundários'] },
          { ico: '👶', titulo: 'Nas crianças', texto: 'É normal uma criança ter 6 a 8 constipações por ano, sobretudo nos primeiros anos de creche. Não se devem dar xaropes para a tosse a menores de 6 anos sem indicação médica, nem mel antes de 1 ano de idade.' },
          { ico: '🧼', titulo: 'Prevenção', lista: ['Lavar as mãos com frequência', 'Tossir e espirrar para o cotovelo', 'Arejar a casa e o local de trabalho', 'Não fumar'] },
        ],
        alerta: { titulo: 'Fale com o médico se…', lista: ['Febre acima de 38,5 °C durante mais de 3 dias', 'Dor na cara ou nos dentes, com ranho espesso, durante mais de 10 dias', 'Falta de ar ou pieira', 'Agravamento depois de uma melhoria inicial'] },
        ligacoes: [{ href: 'calculadora-doses/', texto: 'Doses de paracetamol e ibuprofeno nas crianças' }],
      },
      '65+': {
        intro: 'Também depois dos 65 anos a constipação é, quase sempre, uma doença ligeira. Mas pode agravar uma bronquite crónica, a asma ou a insuficiência cardíaca, e alguns medicamentos de venda livre não são seguros para todos.',
        imagens: [
          ['lenco', 'Usar lenços de papel e deitá-los fora'],
          ['agua', 'Beber líquidos ao longo do dia'],
          ['sopa', 'Uma sopa quente alivia a garganta'],
          ['comprimido', 'Perguntar ao farmacêutico antes de tomar xaropes ou comprimidos'],
          ['lavar-maos', 'Lavar as mãos com frequência'],
        ],
        seccoes: [
          { ico: '💊', titulo: 'Cuidado com os medicamentos', lista: ['Os descongestionantes (em comprimidos ou spray) podem subir a tensão arterial e acelerar o coração', 'Alguns antigripais têm paracetamol: não juntar com outro paracetamol', 'Os xaropes para a tosse podem dar sonolência e aumentar o risco de quedas', 'Na dúvida, pergunte ao farmacêutico ou ao médico'] },
          { ico: '🏠', titulo: 'O que ajuda', lista: ['Lavar o nariz com soro', 'Beber líquidos e manter a alimentação', 'Descansar, sem ficar todo o dia deitado', 'Manter a casa arejada e aquecida'] },
          { ico: '🔍', titulo: 'Quando pode não ser só uma constipação', texto: 'Febre alta, falta de ar, cansaço intenso ou confusão podem indicar gripe, COVID-19 ou pneumonia. Nesse caso, ligue para o SNS 24 (808 24 24 24) ou para o seu centro de saúde.' },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Falta de ar ou pieira', 'Febre durante mais de 3 dias', 'Confusão ou muito cansaço', 'Agravamento da asma, da DPOC ou do coração'] },
      },
    },
  },

  {
    id: 'covid-19',
    nome: 'COVID-19',
    emoji: '😷',
    categoria: 'Infeções',
    tambem: ['Respiratório'],
    palavras: 'coronavírus SARS-CoV-2 covid teste máscara vacina pandemia contágio infeciosa contagiosa',
    resumo: 'Infeção pelo coronavírus SARS-CoV-2. Na maioria das pessoas é ligeira, mas pode ser grave nos mais velhos e nos doentes crónicos.',
    heroi: 'mascara',
    deco: 'virus',
    grupos: {
      '3-5': {
        imagens: [
          ['virus', 'A COVID é causada por um vírus'],
          ['tosse', 'Pode dar tosse'],
          ['termometro', 'E febre'],
          ['lavar-maos', 'Lavar as mãos a cantar uma canção'],
          ['cotovelo', 'Espirrar para o cotovelo'],
          ['cama', 'Descansar em casa até ficar bom'],
        ],
      },
      '5-12': {
        intro: 'A COVID-19 é uma infeção causada por um coronavírus. Nas crianças costuma ser ligeira, parecida com uma constipação, mas é importante não a passar aos avós e a outras pessoas mais frágeis.',
        imagens: [
          ['virus', 'O coronavírus tem uma «coroa» de picos'],
          ['termometro', 'Febre, tosse ou dor de garganta'],
          ['mascara', 'A máscara trava as gotinhas'],
          ['lavar-maos', 'Mãos bem lavadas, durante 20 segundos'],
        ],
        seccoes: [
          { ico: '👑', titulo: 'O que é?', texto: 'O nome «coronavírus» vem de «coroa», porque visto ao microscópio o vírus tem picos à volta, como uma coroa. Entra pelo nariz e pela boca e pode infetar a garganta e os pulmões.' },
          { ico: '🤒', titulo: 'Como se sente?', lista: ['Febre', 'Tosse', 'Dor de garganta', 'Nariz entupido', 'Cansaço ou dores de cabeça', 'Às vezes, não se sente nada'] },
          { ico: '🏠', titulo: 'O que fazer?', lista: ['Ficar em casa enquanto houver febre', 'Descansar e beber muitos líquidos', 'Usar máscara perto dos avós ou de bebés', 'Avisar um adulto se custar a respirar'] },
          { ico: '🛡️', titulo: 'Como proteger os outros?', lista: ['Lavar as mãos muitas vezes', 'Tossir para o cotovelo', 'Abrir as janelas para o ar circular', 'Não visitar os avós quando se está doente'] },
        ],
        curiosidade: 'Lavar as mãos durante o tempo de cantar duas vezes os «Parabéns» chega para tirar a maior parte dos vírus!',
      },
      '13-17': {
        intro: 'A COVID-19 deixou de ser uma emergência mundial, mas o vírus continua a circular, com picos sobretudo no outono e no inverno. Nos jovens saudáveis costuma ser ligeira; o mais importante é não a transmitir a quem é frágil.',
        imagens: [
          ['virus', 'O SARS-CoV-2 vai mudando: surgem novas variantes'],
          ['mascara', 'Máscara quando há sintomas e se está com outras pessoas'],
          ['janela', 'Espaços arejados reduzem o contágio'],
        ],
        seccoes: [
          { ico: '🤒', titulo: 'Sintomas', lista: ['Febre e arrepios', 'Tosse e dor de garganta', 'Nariz entupido ou a pingar', 'Cansaço e dores musculares', 'Perda do olfato ou do paladar (menos frequente com as variantes atuais)'] },
          { ico: '🧪', titulo: 'Testes', texto: 'Os autotestes vendidos nas farmácias detetam a infeção, sobretudo quando há sintomas. Um teste negativo no primeiro dia não exclui a COVID-19: se os sintomas continuarem, repete-se ao fim de 1 a 2 dias.' },
          { ico: '🏠', titulo: 'Se estiveres infetado', lista: ['Ficar em casa enquanto tiveres febre ou te sentires mal', 'Usar máscara durante cerca de 10 dias perto de pessoas idosas ou doentes', 'Arejar o quarto e lavar as mãos com frequência', 'Voltar ao desporto aos poucos, quando estiveres bem'] },
        ],
        mitos: [
          ['A COVID-19 já não existe.', 'O vírus continua a circular e ainda causa internamentos, sobretudo em pessoas idosas e doentes crónicos.'],
          ['Os jovens não transmitem a COVID-19.', 'Transmitem, mesmo com sintomas ligeiros ou sem sintomas.'],
          ['Os antibióticos tratam a COVID-19.', 'A COVID-19 é causada por um vírus: os antibióticos não têm efeito.'],
        ],
        alerta: { titulo: 'Liga para o SNS 24 (808 24 24 24) ou vai à urgência se…', lista: ['Tiveres falta de ar', 'Sentires dor ou aperto no peito', 'Ficares confuso ou muito sonolento', 'Os lábios ficarem arroxeados'] },
      },
      '18-65': {
        intro: 'A COVID-19 é causada pelo coronavírus SARS-CoV-2 e transmite-se pelo ar, sobretudo em espaços fechados. A maioria dos adultos tem uma doença ligeira, mas os sintomas podem prolongar-se e há quem fique com «COVID longa».',
        imagens: [
          ['virus', 'Transmissão por gotículas e aerossóis'],
          ['mascara', 'Máscara para proteger os mais frágeis'],
          ['vacina', 'Reforço sazonal para os grupos de risco'],
        ],
        seccoes: [
          { ico: '🤒', titulo: 'Sintomas', lista: ['Febre, tosse e dor de garganta', 'Cansaço e dores musculares', 'Dores de cabeça', 'Nariz entupido', 'Perda do olfato ou do paladar', 'Diarreia ou náuseas'] },
          { ico: '🏠', titulo: 'O que fazer', lista: ['Fazer um teste se tiver sintomas', 'Ficar em casa enquanto houver febre ou mal-estar', 'Usar máscara e evitar contacto com pessoas vulneráveis durante cerca de 10 dias', 'Paracetamol para a febre e as dores; repouso e líquidos', 'Nas pessoas de risco, existe um antiviral oral que deve começar nos primeiros 5 dias — contacte o médico cedo'] },
          { ico: '⚠️', titulo: 'Maior risco de doença grave', lista: ['Idade avançada', 'Doenças crónicas do coração, dos pulmões, dos rins ou diabetes', 'Obesidade', 'Imunossupressão', 'Gravidez'] },
          { ico: '🕰️', titulo: 'COVID longa', texto: 'Cansaço, falta de ar, dificuldade de concentração («nevoeiro mental») ou palpitações que duram mais de 3 meses depois da infeção. Fale com o seu médico de família: há estratégias para recuperar aos poucos.' },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Falta de ar ou respiração muito rápida', 'Dor ou pressão persistente no peito', 'Confusão ou dificuldade em manter-se acordado', 'Lábios ou unhas arroxeados'] },
        ligacoes: [{ href: 'calculadora-vacinas/', texto: 'Calendário de vacinas (PNV)' }],
      },
      '65+': {
        intro: 'Depois dos 65 anos, a COVID-19 continua a ser uma causa importante de internamento. A vacina sazonal, o diagnóstico precoce e o tratamento antiviral nos primeiros dias reduzem muito o risco de doença grave.',
        imagens: [
          ['vacina', 'Vacina contra a COVID-19 todos os outonos'],
          ['virus', 'Fazer o teste logo aos primeiros sintomas'],
          ['telefone', 'Ligar ao médico ou ao SNS 24 no início'],
          ['agua', 'Beber água ao longo do dia'],
          ['janela', 'Arejar a casa todos os dias'],
        ],
        seccoes: [
          { ico: '💉', titulo: 'A vacina', texto: 'É gratuita no SNS nas idades e situações definidas pela DGS e é dada no outono, ao mesmo tempo que a vacina da gripe. Protege sobretudo contra a doença grave e o internamento.' },
          { ico: '⏱️', titulo: 'Agir cedo', lista: ['Faça um autoteste se tiver febre, tosse, dor de garganta ou cansaço fora do habitual', 'Se der positivo, contacte o médico ou o SNS 24 no mesmo dia', 'O antiviral funciona nos primeiros 5 dias, mas interage com vários medicamentos: leve a lista dos que toma', 'Mantenha a medicação habitual, salvo indicação em contrário'] },
          { ico: '🔍', titulo: 'Sinais a vigiar', lista: ['Falta de ar ou cansaço ao mínimo esforço', 'Confusão ou sonolência', 'Falta de apetite e de sede', 'Quedas'] },
        ],
        alerta: { titulo: 'Ligue 112 ou vá à urgência se…', lista: ['Falta de ar em repouso', 'Dor no peito', 'Confusão súbita', 'Lábios arroxeados ou desmaio'] },
      },
    },
  },

  {
    id: 'gastroenterite',
    nome: 'Gastroenterite',
    emoji: '🤢',
    categoria: 'Infeções',
    tambem: ['Digestivo'],
    palavras: 'diarreia vómitos virose norovírus rotavírus desidratação soro barriga contágio infeciosa contagiosa',
    resumo: 'Infeção do estômago e do intestino que causa vómitos e diarreia. O mais importante é beber para evitar a desidratação.',
    heroi: 'estomago',
    deco: 'estomago',
    grupos: {
      '3-5': {
        imagens: [
          ['estomago', 'A barriga fica doente e dói'],
          ['agua', 'Beber goles pequeninos, muitas vezes'],
          ['cama', 'Descansar até a barriga ficar boa'],
          ['lavar-maos', 'Lavar as mãos depois de ir à casa de banho'],
          ['sopa', 'Depois, comer comida leve'],
          ['abraco', 'Em poucos dias passa'],
        ],
      },
      '5-12': {
        intro: 'A gastroenterite é uma infeção na barriga — no estômago e no intestino. Dá vómitos e diarreia e, normalmente, passa em poucos dias. O mais importante é ir bebendo líquidos.',
        imagens: [
          ['estomago', 'Os micróbios irritam o estômago e o intestino'],
          ['agua', 'Pequenos goles de água ou soro, muitas vezes'],
          ['lavar-maos', 'Lavar bem as mãos com água e sabão'],
          ['sopa', 'Sopa, arroz e fruta cozida quando a fome voltar'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'O que é?', texto: 'Quase sempre é causada por vírus, que passam de pessoa para pessoa pelas mãos sujas, pela comida ou pelos brinquedos. Por isso é tão comum na escola e na creche.' },
          { ico: '🤢', titulo: 'Como se sente?', lista: ['Vómitos', 'Diarreia (cocó líquido)', 'Dores de barriga', 'Às vezes, febre', 'Cansaço'] },
          { ico: '🥤', titulo: 'Como se trata?', lista: ['Beber soro de reidratação aos golinhos, mesmo depois de vomitar', 'Não beber refrigerantes nem sumos com muito açúcar', 'Voltar a comer quando a fome voltar', 'Descansar em casa'] },
          { ico: '🧼', titulo: 'Para não passar aos outros', lista: ['Lavar as mãos depois de ir à casa de banho e antes de comer', 'Não partilhar toalhas nem copos', 'Ficar em casa até 48 horas depois do último vómito ou diarreia'] },
        ],
        curiosidade: 'O norovírus, que causa muitas gastroenterites, é tão resistente que o gel de álcool não chega — o melhor é água e sabão!',
      },
      '13-17': {
        intro: 'A gastroenterite aguda é muito frequente e, na maioria dos casos, é causada por vírus. Dura 1 a 3 dias e trata-se sobretudo com hidratação.',
        imagens: [
          ['estomago', 'Norovírus, rotavírus e algumas bactérias'],
          ['agua', 'Repor a água e os sais perdidos'],
          ['lavar-maos', 'Água e sabão — o gel não chega'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'Causas', texto: 'Vírus como o norovírus (muito contagioso, em surtos em escolas, campos de férias e navios), bactérias em alimentos mal conservados ou mal cozinhados (por exemplo, Salmonella) e, menos vezes, parasitas.' },
          { ico: '🥤', titulo: 'O que fazer', lista: ['Soro de reidratação oral, comprado na farmácia, em pequenos goles frequentes', 'Bebidas para desportistas e refrigerantes não são adequados: têm açúcar a mais e sais a menos', 'Comer refeições leves assim que houver apetite', 'Paracetamol se houver febre ou dores', 'Não tomar medicamentos para parar a diarreia sem falar com um médico'] },
          { ico: '🍗', titulo: 'Segurança alimentar', lista: ['Lavar as mãos antes de cozinhar e de comer', 'Cozinhar bem a carne, o frango e os ovos', 'Guardar as sobras no frigorífico rapidamente', 'Cuidado com maionese e natas fora do frio no verão'] },
        ],
        mitos: [
          ['É preciso ficar em jejum para a barriga descansar.', 'Não. Deve-se beber desde o início e voltar a comer assim que houver vontade.'],
          ['Coca-Cola ajuda a curar a diarreia.', 'Tem muito açúcar e poucos sais, e pode piorar a diarreia. O soro de reidratação é a melhor opção.'],
          ['Os antibióticos curam a gastroenterite.', 'A maioria é causada por vírus. Os antibióticos raramente são necessários.'],
        ],
        alerta: { titulo: 'Vai ao médico se…', lista: ['Não conseguires beber nem manter os líquidos', 'Tiveres sangue nas fezes ou no vómito', 'Ficares muito tonto ou urinares muito pouco', 'Tiveres dor de barriga forte e contínua', 'A diarreia durar mais de uma semana'] },
      },
      '18-65': {
        intro: 'A gastroenterite aguda é uma das razões mais comuns de ida ao médico. Na maioria dos casos é viral e passa em 1 a 3 dias. O tratamento essencial é repor os líquidos e os sais perdidos.',
        imagens: [
          ['estomago', 'Inflamação do estômago e do intestino'],
          ['agua', 'Soro de reidratação oral'],
          ['lavar-maos', 'Higiene das mãos e das superfícies'],
        ],
        seccoes: [
          { ico: '🤢', titulo: 'Sintomas', lista: ['Diarreia', 'Náuseas e vómitos', 'Cólicas abdominais', 'Febre baixa', 'Dores musculares e cansaço'] },
          { ico: '🥤', titulo: 'Tratamento', lista: ['Soro de reidratação oral, em pequenas quantidades e com frequência', 'Alimentação ligeira assim que tolerar (arroz, massa, sopa, pão, fruta cozida)', 'Evitar álcool, café e alimentos muito gordos nos primeiros dias', 'Antidiarreicos só sem febre e sem sangue nas fezes', 'Antibiótico raramente, por indicação médica'] },
          { ico: '👶', titulo: 'Nas crianças pequenas', texto: 'Os bebés e as crianças pequenas desidratam mais depressa. Devem continuar a mamar ou a comer, com soro de reidratação entre as refeições. Sinais de alarme: fraldas secas, choro sem lágrimas, boca seca, sonolência ou irritabilidade. Existe uma vacina contra o rotavírus para os bebés — pergunte ao seu médico.' },
          { ico: '🧼', titulo: 'Evitar o contágio', lista: ['Lavar as mãos com água e sabão (o gel de álcool é pouco eficaz contra o norovírus)', 'Limpar a casa de banho e as superfícies com lixívia diluída', 'Não preparar comida para outras pessoas até 48 horas depois de melhorar', 'Lavar a roupa suja a temperatura alta'] },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Não conseguir manter os líquidos durante mais de 24 horas', 'Sangue nas fezes ou fezes negras', 'Febre alta ou dor abdominal intensa', 'Sinais de desidratação: tonturas, boca seca, urinar muito pouco', 'Diarreia que dura mais de 7 dias'] },
        ligacoes: [{ href: 'calculadora-pediatria/', texto: 'Fluidos e desidratação nas crianças' }],
      },
      '65+': {
        intro: 'Depois dos 65 anos, a gastroenterite pode causar desidratação muito depressa, com tonturas, quedas e problemas nos rins. Alguns medicamentos habituais podem precisar de ser ajustados durante a doença.',
        imagens: [
          ['agua', 'Beber soro aos poucos, mesmo sem sede'],
          ['estomago', 'Vómitos e diarreia fazem perder água e sais'],
          ['comprimido', 'Perguntar ao médico sobre os medicamentos habituais'],
          ['lavar-maos', 'Lavar as mãos com água e sabão'],
          ['sopa', 'Refeições leves e frequentes'],
        ],
        seccoes: [
          { ico: '💧', titulo: 'Evitar a desidratação', lista: ['Beber soro de reidratação oral em pequenos goles, várias vezes por hora', 'Não esperar pela sede: nesta idade aparece tarde', 'Vigiar a urina: se for pouca e escura, beba mais e peça ajuda', 'Levantar-se devagar, para evitar tonturas e quedas'] },
          { ico: '💊', titulo: 'Medicamentos habituais', texto: 'Com vómitos ou diarreia, alguns medicamentos — como os diuréticos, alguns para a tensão arterial e a metformina para a diabetes — podem ter de ser suspensos durante um ou dois dias. Não pare nada por conta própria: ligue ao médico ou ao SNS 24 (808 24 24 24).' },
          { ico: '🏠', titulo: 'Em lares e famílias', texto: 'O norovírus espalha-se depressa em lares e hospitais. Lavar bem as mãos, limpar a casa de banho com lixívia e evitar visitas durante a doença protege os outros.' },
        ],
        alerta: { titulo: 'Ligue 112 ou vá à urgência se…', lista: ['Confusão, sonolência ou desmaio', 'Não conseguir beber nem manter os líquidos', 'Sangue nas fezes ou no vómito', 'Quase não urinar durante 12 horas'] },
      },
    },
  },

  {
    id: 'varicela',
    nome: 'Varicela',
    emoji: '🔴',
    categoria: 'Infeções',
    palavras: 'catapora borbulhas vesículas comichão zona herpes zóster vírus contágio infeciosa contagiosa',
    resumo: 'Infeção muito contagiosa que causa febre e borbulhas com comichão em todo o corpo. Nas crianças costuma ser ligeira; nos adultos pode ser mais grave.',
    heroi: 'borbulhas',
    deco: 'pintas',
    eviccao: 'Afastamento durante, pelo menos, 5 dias depois de aparecerem as primeiras borbulhas e, idealmente, até todas estarem em crosta.',
    grupos: {
      '3-5': {
        imagens: [
          ['borbulhas', 'Aparecem borbulhas por todo o corpo'],
          ['termometro', 'Pode dar um pouco de febre'],
          ['lavar-maos', 'Unhas curtinhas e mãos limpas'],
          ['agua', 'Um banho fresco alivia a comichão'],
          ['cama', 'Ficar em casa uns dias'],
          ['brincar', 'Quando as borbulhas secam, volta-se à escola'],
        ],
      },
      '5-12': {
        intro: 'A varicela é uma infeção causada por um vírus que faz aparecer muitas borbulhas com comichão. Passa muito facilmente de pessoa para pessoa e, na maioria das crianças, cura-se sozinha em uma ou duas semanas.',
        imagens: [
          ['borbulhas', 'Borbulhas que viram bolhinhas e depois crostas'],
          ['termometro', 'Febre e cansaço nos primeiros dias'],
          ['agua', 'Banhos frescos acalmam a comichão'],
          ['calendario', 'Fica-se em casa até todas as borbulhas secarem'],
        ],
        seccoes: [
          { ico: '🔴', titulo: 'O que é?', texto: 'É causada pelo vírus varicela-zóster. Passa pelo ar e pelo contacto com as bolhinhas. Depois de se ter varicela, quase nunca se volta a ter.' },
          { ico: '🤒', titulo: 'Como se sente?', lista: ['Febre e cansaço', 'Borbulhas vermelhas que se transformam em bolhinhas com líquido', 'Muita comichão', 'As bolhinhas secam e ficam crostas'] },
          { ico: '🛁', titulo: 'O que ajuda?', lista: ['Não coçar — usar as unhas cortadas e, à noite, luvas de algodão', 'Banhos de água morna ou fresca', 'Roupa leve de algodão', 'Medicamento para a febre que o médico indicar'] },
          { ico: '🏡', titulo: 'Quando voltar à escola?', texto: 'Só quando todas as borbulhas tiverem crosta — normalmente 5 a 7 dias depois de aparecerem. Até lá, é melhor não estar perto de bebés, grávidas e pessoas doentes.' },
        ],
        curiosidade: 'O vírus da varicela fica a «dormir» no corpo durante muitos anos. Às vezes, nos avós, acorda e causa outra doença: a zona!',
      },
      '13-17': {
        intro: 'A maioria das pessoas tem varicela em criança. Quem não teve e a apanha na adolescência pode ter uma doença mais intensa, com mais borbulhas e mais febre.',
        imagens: [
          ['borbulhas', 'Borbulhas em vários estágios ao mesmo tempo'],
          ['termometro', 'Febre e mal-estar'],
          ['vacina', 'Existe vacina para quem nunca teve varicela'],
        ],
        seccoes: [
          { ico: '🌬️', titulo: 'Como se transmite', texto: 'Pelo ar e pelo contacto com o líquido das bolhinhas. É contagiosa desde 1 a 2 dias antes de aparecerem as borbulhas até todas terem crosta. Os sintomas surgem 10 a 21 dias depois do contacto.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Paracetamol para a febre', 'Não tomar aspirina (risco de uma doença grave do fígado e do cérebro)', 'Evitar o ibuprofeno, que aumenta o risco de infeção da pele', 'Anti-histamínicos para a comichão, se o médico indicar', 'Nos adolescentes, o médico pode receitar um antiviral se for visto cedo'] },
          { ico: '💉', titulo: 'Vacina', texto: 'A vacina contra a varicela não faz parte do Programa Nacional de Vacinação, mas está disponível: quem nunca teve a doença pode ponderar tomar a vacina. Fala com o teu médico de família.' },
        ],
        mitos: [
          ['É melhor apanhar varicela em criança para ficar logo despachado.', 'Embora seja geralmente ligeira, pode ter complicações. A vacina protege sem os riscos da doença.'],
          ['Coçar as borbulhas não faz mal.', 'Coçar pode infetar a pele e deixar cicatrizes para sempre.'],
          ['Quem já teve varicela pode voltar a tê-la várias vezes.', 'É muito raro. Mas o vírus fica no corpo e pode, mais tarde, causar zona.'],
        ],
        alerta: { titulo: 'Vai ao médico se…', lista: ['A febre for alta ou durar mais de 4 dias', 'Uma borbulha ficar muito vermelha, quente, inchada ou com pus', 'Tiveres tosse ou falta de ar', 'Tiveres dor de cabeça forte, confusão ou dificuldade em andar'] },
      },
      '18-65': {
        intro: 'Nos adultos, a varicela é menos frequente mas mais grave do que nas crianças, com maior risco de pneumonia. Na gravidez, pode afetar o bebé. Quem nunca teve a doença pode ponderar tomar a vacina.',
        imagens: [
          ['borbulhas', 'Vesículas com comichão, em vários estágios'],
          ['vacina', 'Vacina para adultos sem varicela prévia'],
          ['medico', 'Antiviral nos primeiros dias, se indicado'],
        ],
        seccoes: [
          { ico: '🔴', titulo: 'Sintomas', lista: ['Febre, dores de cabeça e mal-estar', 'Manchas vermelhas que passam a vesículas e depois a crostas', 'Lesões em vários estágios ao mesmo tempo, também no couro cabeludo e na boca', 'Comichão intensa'] },
          { ico: '⚠️', titulo: 'Situações de risco', lista: ['Grávidas sem varicela prévia em contacto com um doente: falar com o médico com urgência', 'Pessoas com imunidade diminuída', 'Recém-nascidos', 'Fumadores (mais risco de pneumonia)'] },
          { ico: '💊', titulo: 'Tratamento', lista: ['Nos adultos, o antiviral é útil se começar nas primeiras 24 a 72 horas', 'Paracetamol para a febre; evitar a aspirina e o ibuprofeno', 'Anti-histamínico para a comichão', 'Unhas curtas e higiene da pele para evitar infeções', 'Ficar em casa até todas as lesões terem crosta'] },
          { ico: '💉', titulo: 'Prevenção', texto: 'Quem nunca teve varicela pode ponderar tomar a vacina (duas doses), sobretudo profissionais de saúde, educadores e mulheres que planeiam engravidar. Não é dada durante a gravidez.' },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Tosse, falta de ar ou dor no peito', 'Febre alta que dura mais de 4 dias', 'Lesões com sinais de infeção (pus, vermelhidão a alastrar, dor intensa)', 'Dor de cabeça forte, rigidez do pescoço ou confusão', 'Gravidez e contacto com alguém com varicela'] },
        ligacoes: [{ href: 'calculadora-vacinas/', texto: 'Calendário de vacinas (PNV)' }],
      },
      '65+': {
        intro: 'Quase todas as pessoas com mais de 65 anos já tiveram varicela. O vírus fica escondido nos nervos e pode «acordar» mais tarde, causando a zona (herpes zóster). Quem tem zona pode passar varicela a crianças que nunca a tiveram.',
        imagens: [
          ['borbulhas', 'A zona dá bolhinhas numa faixa, só de um lado'],
          ['nervo', 'O vírus esconde-se nos nervos durante anos'],
          ['medico', 'Ir ao médico logo nos primeiros dias'],
          ['vacina', 'Existe vacina contra a zona'],
          ['familia', 'Cuidado com os netos e as grávidas da família'],
        ],
        seccoes: [
          { ico: '⚡', titulo: 'A zona', texto: 'Começa com dor, ardor ou formigueiro numa zona da pele, só de um lado do corpo. Dias depois aparecem bolhinhas numa faixa. A dor pode continuar durante meses depois de as bolhas secarem (nevralgia pós-herpética).' },
          { ico: '⏱️', titulo: 'Tratar cedo', lista: ['O antiviral deve começar nas primeiras 72 horas depois das bolhas', 'Zona perto do olho: ir ao médico no mesmo dia', 'Tratar a dor desde o início', 'Manter as bolhas tapadas até secarem'] },
          { ico: '💉', titulo: 'Prevenção', texto: 'Existe uma vacina contra a zona para adultos a partir dos 50 anos, que reduz o risco da doença e da dor prolongada. Pergunte ao seu médico de família se está indicada no seu caso.' },
        ],
        alerta: { titulo: 'Procure o médico se…', lista: ['Bolhas ou dor perto do olho ou na ponta do nariz', 'Dor forte de um só lado do corpo, com ou sem bolhas', 'Febre, confusão ou bolhas espalhadas por todo o corpo', 'Imunidade diminuída (quimioterapia, corticoides, outros medicamentos)'] },
      },
    },
  },

  {
    id: 'sarampo',
    nome: 'Sarampo',
    emoji: '🌡️',
    categoria: 'Infeções',
    palavras: 'manchas exantema VASPR vacina surto febre conjuntivite vírus contágio infeciosa contagiosa',
    resumo: 'Uma das doenças mais contagiosas que existem: febre alta, tosse, olhos vermelhos e manchas na pele. As duas doses da vacina protegem quase sempre.',
    heroi: 'borbulhas',
    deco: 'pintas',
    eviccao: 'Afastamento durante o período que a autoridade de saúde determinar, contado a partir do aparecimento das manchas. Só se aplica a casos confirmados.',
    grupos: {
      '3-5': {
        imagens: [
          ['virus', 'O sarampo é causado por um vírus'],
          ['termometro', 'Dá febre alta'],
          ['borbulhas', 'E manchas vermelhas na pele'],
          ['vacina', 'A vacina protege as crianças'],
          ['cama', 'Descansar em casa'],
          ['abraco', 'Vacinados, ficamos todos protegidos'],
        ],
      },
      '5-12': {
        intro: 'O sarampo é uma infeção causada por um vírus. É uma das doenças que passa mais facilmente de pessoa para pessoa! Felizmente, há uma vacina que protege muito bem, e que as crianças em Portugal levam aos 12 meses e aos 5 anos.',
        imagens: [
          ['virus', 'O vírus do sarampo viaja pelo ar'],
          ['termometro', 'Febre alta, tosse e olhos vermelhos'],
          ['borbulhas', 'Manchas que começam na cara e descem pelo corpo'],
          ['vacina', 'Duas doses da vacina protegem quase sempre'],
        ],
        seccoes: [
          { ico: '🌬️', titulo: 'O que é?', texto: 'O vírus do sarampo passa pelo ar quando um doente tosse ou espirra, e consegue ficar no ar de uma sala durante duas horas. Quase todas as pessoas não vacinadas que estão perto de um doente apanham a doença.' },
          { ico: '🤒', titulo: 'Como se sente?', lista: ['Febre alta', 'Tosse, nariz a pingar e olhos vermelhos', 'Manchas vermelhas na pele, que começam atrás das orelhas e na cara', 'Muito cansaço'] },
          { ico: '💉', titulo: 'Como se previne?', texto: 'Com a vacina VASPR, que protege contra o sarampo, a papeira e a rubéola. É gratuita e faz parte do Programa Nacional de Vacinação: uma dose aos 12 meses e outra aos 5 anos.' },
          { ico: '🏠', titulo: 'Se alguém tiver sarampo', lista: ['Fica em casa, longe de bebés e de pessoas não vacinadas', 'Antes de ir ao centro de saúde, liga-se primeiro para o SNS 24', 'Descansar e beber muitos líquidos'] },
        ],
        curiosidade: 'Uma pessoa com sarampo pode contagiar 12 a 18 outras pessoas não vacinadas — muito mais do que a gripe!',
      },
      '13-17': {
        intro: 'Portugal eliminou o sarampo graças à vacinação, mas continuam a aparecer surtos a partir de casos vindos de outros países. Quem tem as duas doses da vacina está protegido; quem não tem corre risco.',
        imagens: [
          ['borbulhas', 'Exantema que começa na cara e desce pelo corpo'],
          ['vacina', 'Confirma no boletim que tens as duas doses'],
          ['telefone', 'Suspeita de sarampo? Liga primeiro para o SNS 24'],
        ],
        seccoes: [
          { ico: '📅', titulo: 'Como evolui', texto: 'Os sintomas aparecem 7 a 21 dias depois do contacto: primeiro febre alta, tosse, nariz a pingar e conjuntivite; 3 a 4 dias depois surgem as manchas na pele. É contagioso desde 4 dias antes até 4 dias depois de aparecerem as manchas.' },
          { ico: '⚠️', titulo: 'Complicações', lista: ['Otite e pneumonia', 'Diarreia', 'Encefalite (inflamação do cérebro), rara mas grave', 'O sarampo «apaga» parte da memória do sistema imunitário, deixando a pessoa mais vulnerável a outras infeções durante meses'] },
          { ico: '💉', titulo: 'A vacina', texto: 'A VASPR (sarampo, papeira e rubéola) dá-se aos 12 meses e aos 5 anos. Se te faltar uma dose, nunca é tarde: pede ao centro de saúde para vacinar. É gratuita.' },
        ],
        mitos: [
          ['A vacina do sarampo causa autismo.', 'Falso. Esta ideia veio de um estudo fraudulento, e dezenas de estudos com milhões de crianças mostraram que não há qualquer relação.'],
          ['O sarampo é uma doença ligeira de criança.', 'Pode causar pneumonia, encefalite e morte, mesmo em pessoas saudáveis.'],
          ['O sarampo já não existe em Portugal.', 'Continua a haver casos e surtos a partir de casos importados. A vacinação mantém-nos protegidos.'],
        ],
        alerta: { titulo: 'Liga para o SNS 24 (808 24 24 24) se…', lista: ['Tiveres febre e manchas na pele', 'Tiveres febre, tosse e olhos vermelhos depois de contacto com um caso de sarampo', 'Antes de ires a um centro de saúde ou à urgência, para não contagiares outras pessoas'] },
      },
      '18-65': {
        intro: 'O sarampo é uma das doenças infeciosas mais contagiosas. Portugal tem elevadas taxas de vacinação, mas surgem surtos a partir de casos importados. Os adultos nascidos depois de 1970 sem duas doses da vacina devem vacinar-se.',
        imagens: [
          ['virus', 'Transmissão pelo ar, mesmo depois de o doente sair'],
          ['borbulhas', 'Febre, tosse, conjuntivite e exantema'],
          ['vacina', 'VASPR: duas doses ao longo da vida'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Suspeitar de sarampo', lista: ['Febre alta', 'Tosse, corrimento nasal e conjuntivite', 'Manchas vermelhas que começam na cara e atrás das orelhas e alastram ao corpo', 'Viagem recente ou contacto com um caso', 'Não vacinado ou vacinação incompleta'] },
          { ico: '📞', titulo: 'O que fazer', texto: 'Se suspeitar de sarampo, não vá diretamente ao centro de saúde ou à urgência: ligue primeiro para o SNS 24 (808 24 24 24), para ser encaminhado sem contagiar outras pessoas nas salas de espera. É uma doença de declaração obrigatória.' },
          { ico: '💉', titulo: 'Quem deve vacinar-se', lista: ['Adultos nascidos a partir de 1970 sem registo de duas doses de VASPR', 'Profissionais de saúde e educadores', 'Quem vai viajar para países com surtos', 'Mulheres que planeiam engravidar e não estão protegidas (a vacina não se dá na gravidez)'] },
          { ico: '⚠️', titulo: 'Maior risco de complicações', lista: ['Bebés com menos de 1 ano', 'Grávidas', 'Pessoas com imunidade diminuída', 'Adultos'] },
        ],
        alerta: { titulo: 'Procure ajuda (ligando antes) se…', lista: ['Febre e manchas na pele', 'Falta de ar ou tosse a agravar', 'Dor de cabeça forte, sonolência ou convulsões', 'Gravidez ou bebé em contacto com um caso de sarampo'] },
        ligacoes: [{ href: 'calculadora-vacinas/', texto: 'Calendário de vacinas (PNV)' }],
      },
      '65+': {
        intro: 'A maioria das pessoas nascidas antes de 1970 teve sarampo em criança e está protegida para toda a vida. Mas os netos pequenos, as grávidas e as pessoas com doenças que baixam as defesas podem estar em risco, e cabe a todos ajudar a protegê-los.',
        imagens: [
          ['familia', 'Proteger os netos: vacinas em dia'],
          ['vacina', 'VASPR aos 12 meses e aos 5 anos'],
          ['borbulhas', 'Febre e manchas na pele: pensar em sarampo'],
          ['telefone', 'Ligar para o SNS 24 antes de sair de casa'],
          ['calendario', 'Ver o boletim de vacinas de quem nasceu depois de 1970'],
        ],
        seccoes: [
          { ico: '🛡️', titulo: 'Estou protegido?', texto: 'Quem nasceu antes de 1970 considera-se protegido, porque nessa época quase todas as pessoas tiveram sarampo. Quem nasceu depois deve ter duas doses de vacina registadas no boletim.' },
          { ico: '👶', titulo: 'Proteger os netos', lista: ['Os bebés só levam a primeira dose aos 12 meses: até lá, dependem das pessoas à volta estarem vacinadas', 'Confirme com os pais que as vacinas estão em dia', 'Em viagens a países com surtos, o médico pode antecipar a vacina'] },
          { ico: '⚠️', titulo: 'Se tiver as defesas baixas', texto: 'Quimioterapia, corticoides em dose alta e outros medicamentos que baixam a imunidade aumentam o risco de sarampo grave. Se estiver em contacto com um caso, fale com o médico no mesmo dia.' },
        ],
        alerta: { titulo: 'Ligue para o SNS 24 (808 24 24 24) se…', lista: ['Alguém em casa tiver febre e manchas na pele', 'Tiver estado em contacto com um caso de sarampo e tiver defesas baixas', 'Falta de ar, confusão ou febre que não baixa'] },
      },
    },
  },

  {
    id: 'mao-pe-boca',
    nome: 'Doença mão-pé-boca',
    emoji: '🖐️',
    categoria: 'Infeções',
    palavras: 'enterovírus coxsackie aftas boca bolhas mãos pés creche contágio infeciosa contagiosa',
    resumo: 'Infeção viral muito comum nas creches, com febre, aftas na boca e pintas nas mãos e nos pés. Passa sozinha em cerca de uma semana.',
    heroi: 'mao-pintas',
    deco: 'pintas',
    grupos: {
      '3-5': {
        imagens: [
          ['mao-pintas', 'Aparecem pintinhas nas mãos e nos pés'],
          ['garganta', 'A boca fica dorida'],
          ['termometro', 'Pode dar febre'],
          ['agua', 'Beber água fresquinha ajuda'],
          ['lavar-maos', 'Lavar as mãos depois do bacio'],
          ['brincar', 'Em poucos dias, volta-se a brincar'],
        ],
      },
      '5-12': {
        intro: 'A doença mão-pé-boca tem um nome que diz tudo: aparecem pintas e bolhinhas nas mãos, nos pés e dentro da boca. É causada por um vírus, é muito comum nas crianças pequenas e passa sozinha.',
        imagens: [
          ['mao-pintas', 'Pintas nas palmas das mãos e nas plantas dos pés'],
          ['garganta', 'Aftas na boca que custam a engolir'],
          ['agua', 'Beber muitas vezes, mesmo que doa um bocadinho'],
          ['lavar-maos', 'Lavar bem as mãos com água e sabão'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'O que é?', texto: 'É uma infeção causada por um grupo de vírus chamados enterovírus. Passa pela saliva, pela tosse, pelo líquido das bolhinhas e pelo cocó, sobretudo quando não se lavam bem as mãos.' },
          { ico: '🤒', titulo: 'Como se sente?', lista: ['Febre e cansaço no início', 'Dor de garganta e aftas na boca', 'Pintas vermelhas ou bolhinhas nas mãos, nos pés e às vezes no rabiosque', 'Pouca vontade de comer'] },
          { ico: '🍦', titulo: 'O que ajuda?', lista: ['Beber água e leite frescos', 'Comida mole e fria: iogurtes, sopa morna, gelados', 'Evitar comidas ácidas ou salgadas, que ardem nas aftas', 'Medicamento para a dor e a febre, dado por um adulto'] },
          { ico: '🧼', titulo: 'Para não passar aos outros', lista: ['Lavar as mãos muitas vezes, sobretudo depois da casa de banho', 'Não partilhar copos, talheres nem escovas de dentes', 'Ficar em casa enquanto houver febre'] },
        ],
        curiosidade: 'Umas semanas depois da doença, algumas crianças perdem uma ou outra unha. Parece estranho, mas não dói e a unha volta a crescer!',
      },
      '13-17': {
        intro: 'A doença mão-pé-boca é mais frequente nas crianças pequenas, mas também pode aparecer em adolescentes e adultos — muitas vezes apanhada de um irmão mais novo. Costuma ser ligeira e cura-se sozinha em 7 a 10 dias.',
        imagens: [
          ['mao-pintas', 'Pintas e pequenas bolhas nas mãos e nos pés'],
          ['garganta', 'Aftas dolorosas na boca'],
          ['lavar-maos', 'As mãos são a principal via de contágio'],
        ],
        seccoes: [
          { ico: '📅', titulo: 'Como evolui', texto: 'Começa com febre, dor de garganta e mal-estar. Um ou dois dias depois surgem aftas na boca e pintas ou bolhinhas nas palmas das mãos e nas plantas dos pés. Melhora ao fim de uma semana.' },
          { ico: '💊', titulo: 'O que ajuda', lista: ['Paracetamol ou ibuprofeno para a dor e a febre', 'Bebidas frescas e comida mole', 'Bochechos com água fria para aliviar as aftas', 'Não rebentar as bolhas'] },
          { ico: '🧼', titulo: 'Contágio', texto: 'É mais contagiosa na primeira semana, mas o vírus pode continuar nas fezes durante várias semanas. Lavar bem as mãos é a melhor forma de proteger a família, sobretudo se houver bebés em casa.' },
        ],
        mitos: [
          ['É a mesma doença que a febre aftosa dos animais.', 'Não. São vírus diferentes: a doença mão-pé-boca não passa de nem para os animais.'],
          ['Precisa de antibiótico.', 'É causada por um vírus. Os antibióticos não ajudam.'],
          ['Só se apanha uma vez.', 'Há vários vírus que a causam, por isso é possível tê-la mais do que uma vez.'],
        ],
        alerta: { titulo: 'Vai ao médico se…', lista: ['Não conseguires beber por causa das dores', 'Urinares muito pouco ou estiveres muito tonto', 'A febre durar mais de 3 dias', 'Tiveres dor de cabeça forte, rigidez no pescoço ou muita sonolência'] },
      },
      '18-65': {
        intro: 'A doença mão-pé-boca é uma infeção por enterovírus muito comum nas creches e jardins de infância, sobretudo no verão e no outono. Nos adultos é geralmente ligeira ou passa despercebida, mas pode ser transmitida aos filhos e vice-versa.',
        imagens: [
          ['mao-pintas', 'Exantema nas palmas das mãos e plantas dos pés'],
          ['garganta', 'Aftas na boca e na garganta'],
          ['agua', 'Hidratação: o principal cuidado nas crianças'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sintomas', lista: ['Febre, dor de garganta e mal-estar', 'Aftas na boca, na língua e na garganta', 'Pintas ou vesículas nas mãos, nos pés e nas nádegas', 'Nas crianças: recusa alimentar e irritabilidade', 'Semanas depois, pode haver descamação da pele ou queda de unhas'] },
          { ico: '🏠', titulo: 'Cuidados em casa', lista: ['Oferecer líquidos frescos com frequência', 'Alimentos moles e frios', 'Paracetamol ou ibuprofeno para a dor e a febre', 'A criança pode voltar à creche quando estiver sem febre e bem-disposta', 'Lavar as mãos depois de mudar fraldas'] },
          { ico: '🤰', titulo: 'Gravidez', texto: 'A maioria das grávidas que contacta com a doença não tem problemas. Se tiver sintomas perto da data do parto, informe o médico ou a equipa da maternidade, porque o vírus pode passar ao recém-nascido.' },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Sinais de desidratação: fraldas secas, boca seca, choro sem lágrimas, sonolência', 'Febre acima de 39 °C ou durante mais de 3 dias', 'Rigidez do pescoço, convulsões, sonolência ou fraqueza', 'Bebé com menos de 3 meses com febre'] },
        ligacoes: [{ href: 'calculadora-pediatria/', texto: 'Fluidos e desidratação nas crianças' }],
      },
      '65+': {
        intro: 'É rara nesta idade, mas os avós que cuidam de netos pequenos podem apanhá-la. Costuma ser ligeira; o mais importante é proteger-se lavando bem as mãos e saber quando a criança precisa de ser vista.',
        imagens: [
          ['familia', 'Doença frequente nos netos que andam na creche'],
          ['mao-pintas', 'Pintas nas mãos e nos pés da criança'],
          ['lavar-maos', 'Lavar as mãos depois de mudar a fralda'],
          ['agua', 'Dar de beber à criança muitas vezes'],
          ['telefone', 'Em caso de dúvida, ligar para o SNS 24'],
        ],
        seccoes: [
          { ico: '👶', titulo: 'Quando cuida dos netos', lista: ['Ofereça líquidos frescos aos poucos e muitas vezes', 'Comida mole e fria: iogurtes, sopa morna, papas', 'Observe se a criança urina como habitualmente', 'Não partilhe copos nem talheres com a criança'] },
          { ico: '🧼', titulo: 'Proteger-se', lista: ['Lavar as mãos com água e sabão depois de mudar fraldas e antes de comer', 'Limpar brinquedos e superfícies', 'Se tiver as defesas baixas, peça a outra pessoa para cuidar da criança durante a doença'] },
          { ico: '🔍', titulo: 'Se ficar doente', texto: 'Pode ter febre, dor de garganta, aftas e pintas nas mãos e nos pés. Beba bastantes líquidos e, se tiver dificuldade em comer ou beber, fale com o médico.' },
        ],
        alerta: { titulo: 'Ligue para o SNS 24 (808 24 24 24) se…', lista: ['A criança não beber ou urinar muito pouco', 'A criança estiver muito sonolenta ou com o pescoço rígido', 'Não conseguir beber por causa das dores na boca'] },
      },
    },
  },

  {
    id: 'amigdalite',
    nome: 'Amigdalite',
    emoji: '😮',
    categoria: 'Infeções',
    tambem: ['Respiratório'],
    palavras: 'garganta dor de garganta faringite angina amígdalas estreptococo mononucleose contágio infeciosa contagiosa',
    resumo: 'Inflamação da garganta e das amígdalas, quase sempre causada por vírus. Só as amigdalites por bactéria (estreptococo) precisam de antibiótico.',
    heroi: 'garganta',
    deco: 'cocos',
    eviccao: 'Só a amigdalite por estreptococo do grupo A: afastamento até à cura clínica ou, com declaração médica, até 24 horas depois de começar o antibiótico. As amigdalites por vírus não obrigam a ficar em casa.',
    grupos: {
      '3-5': {
        imagens: [
          ['garganta', 'A garganta fica vermelha e dói'],
          ['termometro', 'Pode dar febre'],
          ['agua', 'Beber água ajuda a garganta'],
          ['sopa', 'Comida mole e morna'],
          ['cama', 'Descansar para ficar bom'],
          ['medico', 'O médico vê a garganta com uma luz'],
        ],
      },
      '5-12': {
        intro: 'As amígdalas são duas «bolinhas» no fundo da garganta que ajudam a defender o corpo dos micróbios. Quando ficam inflamadas, a garganta dói e é difícil engolir — é a amigdalite.',
        imagens: [
          ['garganta', 'Amígdalas vermelhas e inchadas'],
          ['termometro', 'Febre e dor ao engolir'],
          ['medico', 'O médico decide se é preciso antibiótico'],
          ['agua', 'Beber muitas vezes'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'O que é?', texto: 'Na maioria das vezes, a amigdalite é causada por vírus, como os das constipações. Às vezes é causada por uma bactéria chamada estreptococo, mais frequente nas crianças em idade escolar.' },
          { ico: '🤒', titulo: 'Como se sente?', lista: ['Dor de garganta, sobretudo ao engolir', 'Febre', 'Dores de cabeça ou de barriga', 'Mau hálito', 'Caroços no pescoço (gânglios) a doer'] },
          { ico: '💊', titulo: 'Como se trata?', lista: ['Medicamento para a dor e a febre', 'Beber água, leite ou chá morno', 'Comida mole: sopa, iogurte, papas', 'Se for estreptococo, antibiótico até ao fim, mesmo quando já estiveres bem'] },
          { ico: '🛡️', titulo: 'Para não passar aos outros', lista: ['Não partilhar copos, garrafas nem talheres', 'Tossir para o cotovelo', 'Lavar as mãos'] },
        ],
        curiosidade: 'Para saber se a amigdalite é causada pelo estreptococo, o médico pode fazer um teste rápido com uma zaragatoa na garganta — o resultado sai em poucos minutos!',
      },
      '13-17': {
        intro: 'A dor de garganta é uma das razões mais frequentes para ir ao médico. Quase sempre é viral e passa em 3 a 7 dias. Nos adolescentes, uma amigdalite arrastada e com muito cansaço pode ser mononucleose, a «doença do beijo».',
        imagens: [
          ['garganta', 'Amígdalas inchadas, às vezes com placas brancas'],
          ['medico', 'Um teste rápido distingue a bactéria dos vírus'],
          ['cama', 'Na mononucleose, o cansaço pode durar semanas'],
        ],
        seccoes: [
          { ico: '⚖️', titulo: 'Vírus ou bactéria?', texto: 'Tosse, nariz entupido e rouquidão apontam para vírus. Febre alta, gânglios dolorosos no pescoço e placas nas amígdalas, sem tosse, fazem pensar no estreptococo. O médico pode usar uma pontuação (Centor/McIsaac) e um teste rápido para decidir.' },
          { ico: '💋', titulo: 'Mononucleose', texto: 'Causada pelo vírus Epstein-Barr, transmite-se pela saliva. Dá febre, amígdalas muito inchadas, gânglios no pescoço e um cansaço que pode durar semanas. Não há antibiótico que a trate, e deve evitar-se desporto de contacto durante 3 a 4 semanas, porque o baço pode estar aumentado.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Paracetamol ou ibuprofeno para a dor e a febre', 'Pastilhas e bebidas mornas ou frias', 'Antibiótico só quando é estreptococo, durante 10 dias', 'Com antibiótico, deixa de se ser contagioso ao fim de 24 horas'] },
        ],
        mitos: [
          ['Placas brancas na garganta querem dizer que é preciso antibiótico.', 'Também aparecem em infeções por vírus, como a mononucleose.'],
          ['Gelados fazem mal à garganta inflamada.', 'O frio até alivia a dor e ajuda a comer.'],
          ['Se já me sinto bem, posso parar o antibiótico.', 'O tratamento do estreptococo deve ser cumprido até ao fim, para evitar complicações.'],
        ],
        alerta: { titulo: 'Vai à urgência se…', lista: ['Tiveres dificuldade em respirar ou em engolir a saliva', 'Não conseguires abrir bem a boca ou a voz ficar abafada', 'A dor for muito forte só de um lado', 'Ficares muito prostrado ou desidratado'] },
      },
      '18-65': {
        intro: 'A amigdalite (ou faringoamigdalite) é muito frequente. Nos adultos, cerca de 9 em cada 10 são causadas por vírus e curam sozinhas. O antibiótico só é útil nas causadas pelo estreptococo do grupo A.',
        imagens: [
          ['garganta', 'Amígdalas inflamadas, com ou sem placas'],
          ['medico', 'Pontuação clínica e teste rápido orientam a decisão'],
          ['comprimido', 'Antibiótico só quando há indicação'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sintomas', lista: ['Dor de garganta e dor ao engolir', 'Febre', 'Gânglios dolorosos no pescoço', 'Amígdalas vermelhas, inchadas ou com placas', 'Tosse e corrimento nasal sugerem causa viral'] },
          { ico: '💊', titulo: 'Tratamento', lista: ['Paracetamol ou ibuprofeno', 'Líquidos, pastilhas e alimentos moles', 'Na amigdalite estreptocócica: penicilina ou amoxicilina durante 10 dias', 'O antibiótico desnecessário causa efeitos secundários e resistências'] },
          { ico: '⚠️', titulo: 'Complicações', texto: 'São raras: abcesso junto à amígdala (dor forte de um lado, dificuldade em abrir a boca, voz abafada), otite ou sinusite. Muito raramente, o estreptococo não tratado pode afetar o coração ou os rins.' },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Dificuldade em respirar ou em engolir a saliva', 'Incapacidade de abrir a boca ou voz abafada', 'Dor forte de um só lado com inchaço', 'Febre alta que não melhora em 3 dias'] },
        ligacoes: [{ href: 'calculadora-respiratoria/?calc=centor', texto: 'Pontuação de Centor/McIsaac' }],
      },
      '65+': {
        intro: 'Depois dos 65 anos, as amigdalites por estreptococo são pouco frequentes e a dor de garganta é quase sempre viral. Uma dor de garganta que não passa, ou com rouquidão persistente, merece ser observada.',
        imagens: [
          ['garganta', 'Dor ao engolir, quase sempre por vírus'],
          ['agua', 'Beber água mesmo quando custa engolir'],
          ['sopa', 'Sopas e alimentos moles'],
          ['comprimido', 'Cuidado com o ibuprofeno — pergunte ao médico'],
          ['medico', 'Rouquidão com mais de 3 semanas: ir ao médico'],
        ],
        seccoes: [
          { ico: '💧', titulo: 'Cuidados em casa', lista: ['Beber líquidos com frequência, para não desidratar', 'Comer alimentos moles e mornos', 'Paracetamol para a dor', 'Os anti-inflamatórios podem fazer mal ao estômago, aos rins e à tensão: só com indicação médica'] },
          { ico: '🦷', titulo: 'Próteses dentárias', texto: 'Uma prótese que magoa ou mal higienizada pode causar feridas e infeções na boca, como os fungos (sapinhos). Lave a prótese todos os dias e retire-a à noite.' },
          { ico: '🔍', titulo: 'Quando investigar', lista: ['Dor de garganta ou rouquidão que dura mais de 3 semanas', 'Dificuldade em engolir que vai piorando', 'Caroço no pescoço que não desaparece', 'Sobretudo em fumadores ou ex-fumadores'] },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Dificuldade em respirar ou em engolir a saliva', 'Não conseguir beber', 'Febre alta ou confusão', 'Rouquidão ou dor de garganta com mais de 3 semanas'] },
      },
    },
  },

  {
    id: 'escarlatina',
    nome: 'Escarlatina',
    emoji: '🍓',
    categoria: 'Infeções',
    palavras: 'estreptococo garganta manchas língua framboesa exantema amigdalite contágio infeciosa contagiosa',
    resumo: 'Infeção pelo estreptococo que causa dor de garganta, febre e uma erupção vermelha e áspera na pele. Trata-se com antibiótico.',
    heroi: 'lingua',
    deco: 'cocos',
    eviccao: 'Afastamento até à cura clínica ou, com declaração médica, até 24 horas depois de começar o antibiótico.',
    grupos: {
      '3-5': {
        imagens: [
          ['garganta', 'Dói a garganta'],
          ['termometro', 'Dá febre'],
          ['borbulhas', 'A pele fica vermelha e áspera'],
          ['lingua', 'A língua fica vermelha como um morango'],
          ['comprimido', 'O remédio do médico cura'],
          ['lavar-maos', 'Lavar as mãos protege os amigos'],
        ],
      },
      '5-12': {
        intro: 'A escarlatina é uma infeção causada por uma bactéria, o estreptococo. Começa com dor de garganta e febre e, depois, aparecem pintinhas vermelhas na pele que parecem uma lixa. Com o antibiótico, fica-se bom.',
        imagens: [
          ['garganta', 'Começa com dor de garganta e febre'],
          ['borbulhas', 'Pintinhas vermelhas e ásperas, como lixa'],
          ['lingua', 'A língua parece uma framboesa'],
          ['comprimido', 'Antibiótico até ao fim'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'O que é?', texto: 'É causada pela mesma bactéria de algumas amigdalites. Essa bactéria produz uma substância que faz a pele ficar vermelha. É mais comum entre os 5 e os 15 anos, sobretudo no inverno e na primavera.' },
          { ico: '🤒', titulo: 'Como se sente?', lista: ['Dor de garganta e febre', 'Dores de cabeça ou de barriga, às vezes vómitos', 'Pele vermelha e áspera, a começar no pescoço e no peito', 'Língua muito vermelha, com pontinhos', 'Cara corada, mas com uma zona branca à volta da boca'] },
          { ico: '💊', titulo: 'Como se trata?', lista: ['Antibiótico durante 10 dias, sem falhar', 'Medicamento para a febre', 'Beber muitos líquidos', 'Descansar em casa'] },
          { ico: '🏫', titulo: 'Quando voltar à escola?', texto: 'Depois de, pelo menos, 24 horas de antibiótico e sem febre. Uma ou duas semanas depois, a pele dos dedos das mãos e dos pés pode descascar — é normal.' },
        ],
        curiosidade: 'Antigamente, a escarlatina era uma doença muito perigosa. Hoje, graças aos antibióticos, cura-se em poucos dias!',
      },
      '13-17': {
        intro: 'A escarlatina é uma amigdalite pelo estreptococo do grupo A acompanhada de uma erupção na pele. É mais comum em crianças, mas também aparece em adolescentes, e trata-se facilmente com antibiótico.',
        imagens: [
          ['borbulhas', 'Erupção áspera que começa no tronco'],
          ['lingua', 'Língua em framboesa'],
          ['comprimido', '10 dias de antibiótico'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Sinais típicos', lista: ['Febre e dor de garganta', 'Erupção vermelha, áspera ao toque, mais intensa nas pregas (cotovelos, axilas, virilhas)', 'Língua vermelha com pontinhos salientes', 'Cara corada com palidez à volta da boca'] },
          { ico: '🌬️', titulo: 'Contágio', texto: 'Transmite-se por gotículas de saliva e pelas mãos. Ao fim de 24 horas de antibiótico, a pessoa deixa de ser contagiosa e pode voltar às aulas se estiver sem febre.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Penicilina ou amoxicilina durante 10 dias', 'Paracetamol ou ibuprofeno para a febre e a dor', 'Cumprir o antibiótico até ao fim evita complicações raras no coração e nos rins'] },
        ],
        mitos: [
          ['A escarlatina é uma doença do passado.', 'Continua a existir e tem tido surtos em vários países europeus.'],
          ['Só se apanha uma vez.', 'É possível ter escarlatina mais do que uma vez.'],
          ['A pele a descascar depois da doença é sinal de que voltou.', 'É uma fase normal da recuperação.'],
        ],
        alerta: { titulo: 'Vai à urgência se…', lista: ['Tiveres dificuldade em respirar', 'A febre continuar 48 horas depois de começar o antibiótico', 'Ficares muito prostrado ou confuso', 'Uma zona da pele ficar inchada, quente e muito dolorosa'] },
      },
      '18-65': {
        intro: 'A escarlatina é uma infeção pelo estreptococo do grupo A, com amigdalite e exantema característico. Afeta sobretudo crianças em idade escolar; nos adultos é rara, mas os pais podem ser contagiados pelos filhos.',
        imagens: [
          ['borbulhas', 'Exantema áspero, «em lixa»'],
          ['garganta', 'Faringoamigdalite com febre'],
          ['lingua', 'Língua em framboesa'],
        ],
        seccoes: [
          { ico: '🔍', titulo: 'Diagnóstico', texto: 'É clínico e pode ser confirmado com um teste rápido ou cultura da zaragatoa da garganta. O exantema surge 12 a 48 horas depois da febre, começa no pescoço e no tronco e poupa a zona à volta da boca.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Penicilina ou amoxicilina durante 10 dias (alternativas em caso de alergia)', 'Antipiréticos e hidratação', 'Exclusão da escola ou do trabalho até 24 horas depois do início do antibiótico'] },
          { ico: '⚠️', titulo: 'Infeção invasiva', texto: 'Muito raramente, o estreptococo do grupo A causa infeções graves (pneumonia, infeção da pele profunda, sépsis). São sinais de alarme a febre persistente, a dor desproporcionada num membro, a dificuldade respiratória e a prostração.' },
        ],
        alerta: { titulo: 'Procure ajuda urgente se…', lista: ['Dificuldade respiratória', 'Febre que persiste 48 horas depois do antibiótico', 'Dor intensa, inchaço ou vermelhidão a alastrar na pele', 'Prostração, confusão ou sinais de desidratação'] },
        ligacoes: [{ href: 'calculadora-respiratoria/?calc=centor', texto: 'Pontuação de Centor/McIsaac' }],
      },
      '65+': {
        intro: 'A escarlatina é rara depois dos 65 anos, mas os avós podem contactar com netos doentes. Conhecer os sinais ajuda a levar a criança ao médico a tempo — e a proteger-se.',
        imagens: [
          ['familia', 'Doença mais comum nos netos em idade escolar'],
          ['borbulhas', 'Pele vermelha e áspera, com febre'],
          ['lingua', 'Língua vermelha como um morango'],
          ['comprimido', 'Antibiótico durante 10 dias, sem falhar'],
          ['lavar-maos', 'Lavar as mãos e não partilhar copos'],
        ],
        seccoes: [
          { ico: '👶', titulo: 'Se o neto tiver escarlatina', lista: ['Ajude a cumprir o antibiótico até ao fim', 'Dê-lhe líquidos e comida mole', 'Pode voltar à escola 24 horas depois de começar o antibiótico, se estiver sem febre', 'A descamação da pele, semanas depois, é normal'] },
          { ico: '🧼', titulo: 'Proteger-se', lista: ['Lavar as mãos com frequência', 'Não partilhar copos, talheres nem toalhas', 'Se tiver dor de garganta e febre, fale com o médico'] },
          { ico: '⚠️', titulo: 'Sinais de infeção grave', texto: 'Nos mais velhos, o estreptococo pode causar infeções da pele (erisipela, celulite) e, raramente, infeções graves. Uma zona da perna vermelha, quente e inchada, com febre, deve ser vista pelo médico no mesmo dia.' },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Febre com pele vermelha, quente e inchada numa perna ou num braço', 'Falta de ar ou confusão', 'Não conseguir beber'] },
      },
    },
  },

  {
    id: 'hepatites',
    nome: 'Hepatites virais',
    emoji: '🟡',
    categoria: 'Infeções',
    tambem: ['Digestivo'],
    palavras: 'hepatite A B C fígado icterícia amarelo vírus vacina sangue análise contágio infeciosa contagiosa',
    resumo: 'Infeções do fígado causadas por vírus (A, B, C e outros). A hepatite A e a B evitam-se com vacinas; a hepatite C tem cura.',
    heroi: 'figado',
    deco: 'figado',
    eviccao: 'Hepatite A: afastamento durante, pelo menos, 7 dias desde o início da doença ou até desaparecer a icterícia (pele amarela). A hepatite B aguda também consta da lista: o regresso é decidido pelo médico. A hepatite C não obriga a evicção.',
    grupos: {
      '3-5': {
        imagens: [
          ['figado', 'O fígado é uma fábrica dentro da barriga'],
          ['lavar-maos', 'Lavar as mãos antes de comer'],
          ['prato', 'Comer comida bem lavada'],
          ['vacina', 'As vacinas protegem o fígado'],
          ['medico', 'O médico ajuda a tratar'],
          ['abraco', 'Abraçar não passa a hepatite'],
        ],
      },
      '5-12': {
        intro: 'O fígado é um órgão muito trabalhador: limpa o sangue, guarda energia e ajuda a digerir a comida. Hepatite quer dizer «fígado inflamado». Quando é causada por um vírus, chama-se hepatite viral.',
        imagens: [
          ['figado', 'O fígado trabalha como uma fábrica'],
          ['lavar-maos', 'Mãos limpas evitam a hepatite A'],
          ['vacina', 'As vacinas protegem contra a hepatite B'],
          ['analise', 'Uma análise ao sangue mostra se o fígado está bem'],
        ],
        seccoes: [
          { ico: '🔤', titulo: 'Hepatites com letras', texto: 'Há vários vírus, com nomes de letras: A, B, C, D e E. A hepatite A apanha-se pela comida ou água sujas. A B e a C passam pelo sangue, por isso nunca se deve tocar no sangue de outra pessoa sem luvas.' },
          { ico: '🟡', titulo: 'Como se sente?', lista: ['Às vezes, nada', 'Cansaço e falta de apetite', 'Dor de barriga e enjoos', 'Pele e olhos amarelos', 'Xixi escuro'] },
          { ico: '🛡️', titulo: 'Como se previne?', lista: ['Lavar as mãos antes de comer e depois da casa de banho', 'Lavar bem a fruta e os legumes', 'Ter as vacinas em dia — a da hepatite B dá-se logo ao nascer', 'Não partilhar escovas de dentes nem lâminas'] },
          { ico: '🤝', titulo: 'Amigos com hepatite', texto: 'A hepatite B e a C não passam por abraços, beijinhos, brincar ou partilhar a comida. Uma criança com hepatite B ou C crónica pode ir à escola e brincar com todos.' },
        ],
        curiosidade: 'O fígado é o único órgão capaz de voltar a crescer: mesmo que se tire um bocado, ele regenera-se!',
      },
      '13-17': {
        intro: 'As hepatites virais atacam o fígado e muitas vezes não dão sintomas durante anos. As boas notícias: as hepatites A e B previnem-se com vacinas, e a hepatite C cura-se com comprimidos.',
        imagens: [
          ['figado', 'Hepatite = inflamação do fígado'],
          ['vacina', 'A vacina da hepatite B faz parte do PNV'],
          ['preservativo', 'O preservativo protege da hepatite B'],
        ],
        seccoes: [
          { ico: '🔤', titulo: 'As principais', lista: ['Hepatite A: comida ou água contaminadas; cura-se sozinha', 'Hepatite B: sangue, relações sexuais e da mãe para o bebé; pode ficar crónica', 'Hepatite C: sobretudo sangue (seringas, tatuagens ou piercings sem material esterilizado); tem cura', 'Hepatite E: carne de porco mal cozinhada e água'] },
          { ico: '🛡️', titulo: 'Proteger-te', lista: ['Confirma no boletim que tens a vacina da hepatite B (3 doses)', 'Usa preservativo', 'Tatuagens e piercings só em sítios licenciados, com material descartável', 'Nunca partilhes seringas, lâminas, escovas de dentes ou palhinhas para snifar'] },
          { ico: '🍺', titulo: 'Álcool e fígado', texto: 'O álcool é tóxico para o fígado. Num fígado com hepatite, o álcool acelera os danos e aumenta o risco de cirrose.' },
        ],
        mitos: [
          ['A hepatite passa por beijos e abraços.', 'A B e a C não. Passam pelo sangue e, a B, também por relações sexuais.'],
          ['A hepatite C não tem cura.', 'Os tratamentos atuais curam mais de 95 % das pessoas em 8 a 12 semanas.'],
          ['Quem tem hepatite fica sempre amarelo.', 'A maioria das pessoas com hepatite B ou C não tem sintomas durante anos.'],
        ],
        alerta: { titulo: 'Fala com o médico se…', lista: ['Ficares com a pele ou os olhos amarelos', 'Tiveres urina escura e fezes claras', 'Tiveres tido contacto com sangue de outra pessoa ou uma relação sexual sem preservativo', 'Não souberes se tens a vacina da hepatite B'] },
      },
      '18-65': {
        intro: 'Em Portugal, dezenas de milhares de pessoas vivem com hepatite B ou C crónica, muitas sem o saber. Sem tratamento, podem evoluir para cirrose e cancro do fígado. Um simples teste ao sangue faz o diagnóstico.',
        imagens: [
          ['analise', 'Uma análise ao sangue deteta as hepatites B e C'],
          ['figado-doente', 'Sem tratamento, pode evoluir para cirrose'],
          ['vacina', 'Vacinas contra as hepatites A e B'],
        ],
        seccoes: [
          { ico: '🔤', titulo: 'Tipos e transmissão', lista: ['A: via fecal-oral (alimentos, água, marisco cru); não fica crónica', 'B: sangue, relações sexuais e da mãe para o bebé; pode ficar crónica', 'C: sangue — transfusões antes de 1992, drogas injetáveis, material não esterilizado; fica crónica em muitos casos', 'D: só em quem tem hepatite B', 'E: carne de porco e caça mal cozinhadas'] },
          { ico: '🧪', titulo: 'Fazer o teste', texto: 'Muitas pessoas infetadas não têm sintomas. Peça ao seu médico de família as análises para as hepatites B e C (e para o VIH), sobretudo se alguma vez tiver tido um comportamento de risco, uma transfusão antes de 1992, ou se nasceu num país onde estas infeções são frequentes. Nas grávidas, o rastreio é feito em todas as gestações.' },
          { ico: '💊', titulo: 'Tratamento', lista: ['Hepatite C: comprimidos durante 8 a 12 semanas, com cura em mais de 95 % dos casos, gratuitos no SNS', 'Hepatite B crónica: antivirais que controlam o vírus e protegem o fígado', 'Vigilância regular com análises e ecografia', 'Evitar o álcool e vacinar-se contra a hepatite A'] },
          { ico: '💉', titulo: 'Prevenção', lista: ['Vacina da hepatite B: no PNV desde o nascimento; adultos não vacinados com risco devem vacinar-se', 'Vacina da hepatite A antes de viajar para países com saneamento deficiente', 'Preservativo', 'Não partilhar lâminas, escovas de dentes nem material de consumo de drogas'] },
        ],
        alerta: { titulo: 'Procure o médico se…', lista: ['Pele ou olhos amarelos', 'Urina escura, fezes claras ou comichão intensa', 'Cansaço persistente e falta de apetite sem explicação', 'Picada acidental com agulha ou exposição a sangue (no mesmo dia)'] },
        ligacoes: [{ href: 'calculadora-hepatica/', texto: 'Calculadoras de função hepática' }],
      },
      '65+': {
        intro: 'Muitas pessoas que hoje têm mais de 65 anos foram infetadas pela hepatite C ou B há décadas — em transfusões, cirurgias ou tratamentos com material reutilizado — e nunca o souberam. Nunca é tarde para fazer o teste: a hepatite C cura-se em qualquer idade.',
        imagens: [
          ['analise', 'Pedir ao médico as análises das hepatites'],
          ['figado', 'Cuidar do fígado em qualquer idade'],
          ['comprimido', 'Hepatite C: 8 a 12 semanas de comprimidos'],
          ['vacina', 'Vacina da hepatite B, se tiver indicação'],
          ['alcool', 'Menos álcool, menos esforço para o fígado'],
        ],
        seccoes: [
          { ico: '🧪', titulo: 'Deve fazer o teste se…', lista: ['Recebeu sangue antes de 1992', 'Fez cirurgias, tratamentos dentários ou injeções com material reutilizado', 'Esteve no serviço militar ou em zonas de guerra com cuidados de saúde precários', 'Tem análises do fígado alteradas sem explicação'] },
          { ico: '💊', titulo: 'Tratar em qualquer idade', texto: 'O tratamento da hepatite C é feito com comprimidos bem tolerados, durante 8 a 12 semanas, e é gratuito. Leve a lista dos seus medicamentos: alguns podem interagir com o tratamento.' },
          { ico: '🌿', titulo: 'Proteger o fígado', lista: ['Evitar o álcool', 'Não tomar mais de 3 g de paracetamol por dia (ou menos, se o médico indicar)', 'Cuidado com chás e suplementos «naturais»: alguns fazem mal ao fígado', 'Fazer as análises e ecografias de vigilância'] },
        ],
        alerta: { titulo: 'Procure o médico se…', lista: ['Pele ou olhos amarelos', 'Barriga a inchar ou pernas inchadas', 'Confusão ou sonolência fora do habitual', 'Vómitos com sangue ou fezes negras (urgência)'] },
      },
    },
  },

  {
    id: 'vih',
    nome: 'VIH e sida',
    emoji: '❤️',
    categoria: 'Infeções',
    palavras: 'HIV sida aids vírus da imunodeficiência humana PrEP PEP teste preservativo indetetável intransmissível IST sexual contágio infeciosa contagiosa',
    resumo: 'Vírus que enfraquece as defesas do corpo. Com o tratamento atual, as pessoas com VIH vivem uma vida longa e, com o vírus indetetável, não o transmitem.',
    heroi: 'laco-vermelho',
    deco: 'laco',
    grupos: {
      '3-5': {
        imagens: [
          ['laco-vermelho', 'O laço vermelho lembra quem vive com VIH'],
          ['abraco', 'Abraçar e brincar não passa o VIH'],
          ['brincar', 'Todos podemos brincar juntos'],
          ['medico', 'Os médicos têm medicamentos que ajudam'],
          ['lavar-maos', 'Se vires sangue, chama um adulto'],
          ['coracao', 'Somos todos amigos'],
        ],
      },
      '5-12': {
        intro: 'O VIH é um vírus que ataca as células de defesa do corpo — as que nos protegem dos micróbios. Hoje há medicamentos muito bons: as pessoas com VIH podem ir à escola, trabalhar, fazer desporto e ter filhos saudáveis.',
        imagens: [
          ['laco-vermelho', 'O laço vermelho é o símbolo da luta contra o VIH'],
          ['abraco', 'Abraços, beijinhos e brincadeiras não passam o VIH'],
          ['comprimido', 'Um comprimido por dia controla o vírus'],
          ['medico', 'Os médicos acompanham as pessoas com VIH'],
        ],
        seccoes: [
          { ico: '🛡️', titulo: 'O que é?', texto: 'VIH quer dizer vírus da imunodeficiência humana. Sem tratamento, o vírus vai enfraquecendo as defesas e o corpo fica sem forças para combater outras infeções — a isso chama-se sida.' },
          { ico: '✅', titulo: 'O VIH não passa por…', lista: ['Abraços e beijinhos', 'Brincar, dar as mãos ou fazer desporto', 'Partilhar a comida, os copos ou a casa de banho', 'Picadas de mosquitos', 'Tosse ou espirros'] },
          { ico: '🩸', titulo: 'Como passa?', texto: 'Passa pelo sangue e por algumas formas de contacto entre adultos de que vais aprender mais quando fores mais velho. Por isso, nunca se toca no sangue de outra pessoa: chama-se um adulto para ajudar.' },
          { ico: '💊', titulo: 'Como se trata?', texto: 'Com medicamentos tomados todos os dias. Eles não deixam o vírus multiplicar-se, e a pessoa fica com as defesas fortes. Quando o tratamento resulta, o vírus nem sequer passa para os outros.' },
        ],
        curiosidade: 'O Dia Mundial da Luta contra a Sida é a 1 de dezembro. Nesse dia, muitas pessoas usam um laço vermelho ao peito!',
      },
      '13-17': {
        intro: 'O VIH transmite-se sobretudo por relações sexuais sem preservativo e pela partilha de seringas. Não há cura, mas o tratamento permite uma vida longa e saudável — e quem tem o vírus indetetável não o transmite.',
        imagens: [
          ['preservativo', 'O preservativo protege do VIH e de outras IST'],
          ['analise', 'O teste é rápido, confidencial e gratuito'],
          ['laco-vermelho', 'Combater o estigma também é prevenção'],
        ],
        seccoes: [
          { ico: '🔄', titulo: 'Como se transmite', lista: ['Relações sexuais vaginais ou anais sem preservativo', 'Partilha de seringas ou de outro material com sangue', 'Da mãe para o bebé, na gravidez, no parto ou na amamentação (evitável com tratamento)', 'Não se transmite por beijos, abraços, saliva, suor, piscinas ou mosquitos'] },
          { ico: '🛡️', titulo: 'Prevenção', lista: ['Preservativo em todas as relações', 'PrEP: um medicamento preventivo para quem tem maior risco, gratuito no SNS', 'PEP: tratamento de emergência depois de uma situação de risco — tem de começar nas primeiras 72 horas, quanto antes melhor, numa urgência hospitalar', 'Fazer o teste e saber o próprio estado'] },
          { ico: '🧪', titulo: 'Fazer o teste', texto: 'É confidencial e gratuito no centro de saúde e nos Centros de Aconselhamento e Deteção (CAD), e também há autotestes nas farmácias. Se tiveres dúvidas, podes falar com o teu médico de família, com a enfermeira da escola ou ligar para o SNS 24.' },
        ],
        mitos: [
          ['O VIH passa por beijos ou por partilhar copos.', 'Não. A saliva não transmite o VIH.'],
          ['O VIH é uma sentença de morte.', 'Com o tratamento atual, a esperança de vida é praticamente igual à das outras pessoas.'],
          ['Só acontece a certos grupos de pessoas.', 'Qualquer pessoa sexualmente ativa pode ser infetada. O risco depende do que se faz, não de quem se é.'],
        ],
        alerta: { titulo: 'Procura ajuda se…', lista: ['Tiveres tido uma relação sem preservativo ou com o preservativo rompido: vai a uma urgência hospitalar nas primeiras 72 horas para a PEP', 'Tiveres sintomas parecidos com uma gripe 2 a 4 semanas depois de uma situação de risco', 'Precisares de falar com alguém: o médico de família e o SNS 24 guardam sigilo'] },
      },
      '18-65': {
        intro: 'Portugal continua a ter das taxas de novos diagnósticos de VIH mais altas da Europa ocidental, e muitos são feitos tarde. Todos os adultos devem fazer o teste pelo menos uma vez; com o diagnóstico precoce e o tratamento, o VIH é uma doença crónica controlável.',
        imagens: [
          ['analise', 'Teste gratuito e confidencial'],
          ['comprimido', 'Tratamento diário e gratuito'],
          ['preservativo', 'Preservativo, PrEP e PEP'],
        ],
        seccoes: [
          { ico: '🧪', titulo: 'Fazer o teste', lista: ['Pelo menos uma vez na vida, a todos os adultos', 'Anualmente ou mais vezes, se houver comportamentos de risco', 'Em todas as gravidezes', 'Sempre que se diagnostica outra IST, tuberculose ou hepatite', 'Disponível nos centros de saúde, nos CAD, em organizações comunitárias e em autotestes nas farmácias'] },
          { ico: '🔁', titulo: 'Indetetável = Intransmissível', texto: 'Uma pessoa com VIH em tratamento, com a carga viral indetetável de forma mantida, não transmite o vírus por via sexual. O tratamento é gratuito no SNS e, hoje, muitas vezes resume-se a um comprimido por dia.' },
          { ico: '🛡️', titulo: 'Prevenção', lista: ['Preservativo (externo ou interno)', 'PrEP (profilaxia pré-exposição): gratuita no SNS para quem tem maior risco, através do médico de família ou de consultas hospitalares', 'PEP (profilaxia pós-exposição): depois de uma exposição de risco, até 72 horas, numa urgência hospitalar', 'Material de injeção esterilizado e nunca partilhado'] },
          { ico: '🤒', titulo: 'Sintomas', texto: '2 a 4 semanas depois da infeção pode haver febre, dor de garganta, manchas na pele e gânglios — parecido com uma gripe. Depois, o vírus pode ficar anos sem sintomas, enquanto vai enfraquecendo as defesas.' },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Exposição de risco (relação sem preservativo, preservativo rompido, partilha de seringas, picada acidental): urgência hospitalar nas primeiras 72 horas', 'Sintomas tipo gripe com manchas na pele depois de uma situação de risco', 'Infeções repetidas, perda de peso, diarreia ou febre prolongadas sem explicação'] },
      },
      '65+': {
        intro: 'O VIH também diz respeito aos mais velhos: há cada vez mais pessoas a envelhecer com VIH, e cada vez mais diagnósticos depois dos 50 anos — muitas vezes tardios, porque ninguém pensou em fazer o teste.',
        imagens: [
          ['analise', 'Nunca é tarde para fazer o teste'],
          ['conversa', 'Falar de saúde sexual com o médico'],
          ['preservativo', 'O preservativo protege em qualquer idade'],
          ['comprimido', 'Tratamento diário, com atenção às interações'],
          ['laco-vermelho', 'Viver bem com VIH é possível'],
        ],
        seccoes: [
          { ico: '💬', titulo: 'Saúde sexual não tem idade', lista: ['Depois da menopausa, já não há risco de gravidez, mas continua a haver risco de VIH e de outras IST', 'Medicamentos para a disfunção erétil e novas relações aumentaram a vida sexual depois dos 60', 'O preservativo continua a ser a melhor proteção', 'Peça o teste ao seu médico de família — é um pedido normal e confidencial'] },
          { ico: '🔍', titulo: 'Pensar no VIH', texto: 'Nos mais velhos, o VIH pode ser confundido com o envelhecimento: cansaço, perda de peso, infeções repetidas, zona ou alterações da memória. Um teste simples esclarece.' },
          { ico: '💊', titulo: 'Envelhecer com VIH', lista: ['Tomar a medicação todos os dias, sem falhas', 'Informar todos os médicos e o farmacêutico: há interações com medicamentos do coração, do colesterol e outros', 'Vigiar o coração, os ossos, os rins e a memória', 'Manter as vacinas em dia (gripe, pneumococo, zona)'] },
        ],
        alerta: { titulo: 'Procure ajuda se…', lista: ['Tiver tido uma exposição de risco: urgência hospitalar nas primeiras 72 horas', 'Perda de peso, febre, diarreia ou infeções repetidas sem explicação', 'Falhou várias doses da medicação para o VIH'] },
      },
    },
  },

  {
    id: 'ist',
    nome: 'Infeções sexualmente transmissíveis',
    emoji: '🛡️',
    categoria: 'Infeções',
    palavras: 'IST DST clamídia gonorreia sífilis HPV herpes genital tricomonas verrugas preservativo vacina sexual contágio infeciosa contagiosa',
    resumo: 'Infeções que passam nas relações sexuais, como a clamídia, a gonorreia, a sífilis, o HPV e o herpes. Muitas não dão sintomas, mas quase todas se tratam.',
    heroi: 'preservativo',
    deco: 'escudo',
    grupos: {
      '3-5': {
        imagens: [
          ['abraco', 'O nosso corpo é só nosso'],
          ['conversa', 'Se algo te deixar triste, conta a um adulto'],
          ['lavar-maos', 'Tomar banho e lavar as mãos'],
          ['vacina', 'As vacinas protegem o corpo'],
          ['medico', 'O médico ajuda a cuidar do corpo'],
          ['coracao', 'Gostar de nós e cuidar de nós'],
        ],
      },
      '5-12': {
        intro: 'O corpo muda quando crescemos, e é importante aprender a cuidar dele. Há infeções que passam entre pessoas mais velhas em momentos de contacto íntimo. Vais aprender mais sobre elas quando chegares à adolescência — e já há uma vacina que te protege.',
        imagens: [
          ['vacina', 'Aos 10 anos, a vacina contra o HPV'],
          ['conversa', 'Podes fazer perguntas aos teus pais ou ao médico'],
          ['abraco', 'O teu corpo é teu'],
          ['medico', 'O médico e a enfermeira guardam segredo'],
        ],
        seccoes: [
          { ico: '💉', titulo: 'A vacina do HPV', texto: 'O HPV é um vírus muito comum que, anos mais tarde, pode causar alguns tipos de cancro. A vacina dá-se aos 10 anos, a raparigas e rapazes, no centro de saúde. Protege melhor quando é dada antes da adolescência.' },
          { ico: '🙋', titulo: 'Fazer perguntas', lista: ['É normal ter curiosidade sobre o corpo', 'Os pais, os professores e o médico de família podem ajudar', 'Na internet há muita informação errada: confirma com um adulto de confiança'] },
          { ico: '🛑', titulo: 'O teu corpo é teu', lista: ['Ninguém deve tocar nas tuas partes íntimas, nem pedir-te para tocares nas de outra pessoa', 'Se alguém o fizer, ou se te pedirem segredos que te deixam desconfortável, conta a um adulto de confiança', 'Não é culpa tua', 'Podes também ligar para a Linha SOS Criança: 116 111'] },
        ],
        curiosidade: 'Desde que se começou a dar a vacina contra o HPV, os casos de lesões pré-cancerosas do colo do útero diminuíram muito nos países que vacinam!',
      },
      '13-17': {
        intro: 'As infeções sexualmente transmissíveis (IST) são muito frequentes entre jovens. Muitas não dão sintomas, por isso a única forma de saber é fazer o teste. Quase todas se tratam, e o preservativo protege da maioria.',
        imagens: [
          ['preservativo', 'Preservativo em todas as relações'],
          ['vacina', 'Vacinas contra o HPV e a hepatite B'],
          ['analise', 'Testes confidenciais e gratuitos'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'As mais comuns', lista: ['Clamídia: a mais frequente; muitas vezes sem sintomas; pode causar infertilidade', 'Gonorreia: ardor a urinar e corrimento', 'Sífilis: uma ferida indolor, que desaparece, mas a infeção continua', 'HPV: verrugas genitais e, anos depois, alguns cancros', 'Herpes genital: pequenas bolhas dolorosas que voltam de vez em quando', 'VIH e hepatite B'] },
          { ico: '🔍', titulo: 'Sinais de alerta', lista: ['Corrimento diferente do habitual', 'Ardor ou dor ao urinar', 'Feridas, bolhas ou verrugas nos genitais, no ânus ou na boca', 'Dor durante as relações ou na barriga', 'Muitas vezes, nenhum sintoma'] },
          { ico: '🛡️', titulo: 'Proteger-te', lista: ['Preservativo do início ao fim, em todas as relações (também orais e anais)', 'Vacinas contra o HPV e a hepatite B', 'Fazer testes se tiveres novos parceiros', 'Avisar os parceiros se tiveres uma IST, para também serem tratados', 'Consultas de planeamento familiar e de saúde juvenil: confidenciais e gratuitas'] },
        ],
        mitos: [
          ['Se não tenho sintomas, não tenho uma IST.', 'A maioria das infeções por clamídia e muitas outras não dão sintomas.'],
          ['A pílula protege das IST.', 'A pílula só evita a gravidez. O preservativo é o único método que protege da maioria das IST.'],
          ['O sexo oral não tem riscos.', 'Pode transmitir gonorreia, sífilis, herpes e HPV.'],
        ],
        alerta: { titulo: 'Fala com um médico se…', lista: ['Tiveres corrimento, ardor, feridas ou verrugas', 'Tiveres tido uma relação sem preservativo (para o VIH, a PEP tem de começar nas primeiras 72 horas)', 'Um parceiro te disser que tem uma IST', 'Precisares de contraceção de emergência'] },
      },
      '18-65': {
        intro: 'As IST são muito frequentes e, em Portugal, os casos de sífilis, gonorreia e clamídia têm aumentado. Muitas são silenciosas, mas quase todas têm tratamento — e testar, tratar e avisar os parceiros interrompe a transmissão.',
        imagens: [
          ['preservativo', 'O preservativo protege da maioria das IST'],
          ['analise', 'Testes de urina, zaragatoas e análises ao sangue'],
          ['vacina', 'Vacinas contra o HPV e as hepatites'],
        ],
        seccoes: [
          { ico: '🦠', titulo: 'Principais IST', lista: ['Clamídia e gonorreia: tratam-se com antibiótico; sem tratamento podem causar doença inflamatória pélvica e infertilidade', 'Sífilis: ferida indolor, depois manchas na pele (também nas palmas e plantas); trata-se com penicilina', 'HPV: verrugas e lesões que podem evoluir para cancro do colo do útero, do ânus ou da orofaringe', 'Herpes genital: crónico, com crises tratáveis', 'Tricomoníase, VIH e hepatites B e C'] },
          { ico: '🧪', titulo: 'Quando testar', lista: ['Novo parceiro sexual ou vários parceiros', 'Sintomas ou parceiro com uma IST', 'Gravidez (rastreio de sífilis, VIH e hepatites)', 'Antes de deixar de usar preservativo numa relação nova', 'Pelo menos uma vez por ano, se houver risco'] },
          { ico: '💊', titulo: 'Tratamento', texto: 'A maioria das IST bacterianas cura-se com antibiótico. É importante tratar também os parceiros, não ter relações até ao fim do tratamento e repetir os testes quando indicado. O diagnóstico de uma IST deve levar a testar as outras, incluindo o VIH.' },
          { ico: '🌸', titulo: 'Rastreio do cancro do colo do útero', texto: 'O teste do HPV é feito no centro de saúde às mulheres entre os 25 e os 64 anos, de 5 em 5 anos. Mesmo vacinadas, as mulheres devem fazer o rastreio.' },
        ],
        alerta: { titulo: 'Procure o médico se…', lista: ['Corrimento, ardor, feridas, bolhas ou verrugas genitais', 'Dor na parte baixa da barriga, sobretudo com febre', 'Manchas na pele das palmas das mãos ou das plantas dos pés', 'Relação de risco: urgência hospitalar nas primeiras 72 horas para avaliar a PEP do VIH'] },
        ligacoes: [{ href: 'calculadora-plano-rastreios/', texto: 'Plano de rastreios recomendados' }],
      },
      '65+': {
        intro: 'A vida sexual pode continuar ao longo de toda a vida — e as IST também. Os casos em pessoas com mais de 60 anos estão a aumentar, muitas vezes porque se deixou de usar preservativo depois da menopausa.',
        imagens: [
          ['preservativo', 'Sem risco de gravidez, mas com risco de IST'],
          ['conversa', 'Falar abertamente com o médico de família'],
          ['analise', 'Pedir os testes é normal e confidencial'],
          ['comprimido', 'Quase todas as IST têm tratamento'],
          ['abraco', 'Viver a intimidade com saúde'],
        ],
        seccoes: [
          { ico: '💬', titulo: 'Porque é importante', lista: ['Depois da menopausa, a mucosa vaginal fica mais fina e frágil, o que facilita as infeções', 'Novas relações depois da viuvez ou do divórcio', 'Muitas pessoas desta geração nunca tiveram educação sexual', 'Os sintomas podem ser confundidos com outras doenças'] },
          { ico: '🛡️', titulo: 'Proteger-se', lista: ['Usar preservativo com novos parceiros', 'Lubrificante à base de água reduz as pequenas feridas', 'Fazer testes antes de deixar o preservativo numa nova relação', 'Vacina contra a zona e outras vacinas recomendadas — pergunte ao seu médico'] },
          { ico: '🔍', titulo: 'Estar atento a', lista: ['Feridas ou bolhas genitais', 'Corrimento ou ardor ao urinar', 'Manchas na pele sem explicação', 'Comichão genital persistente'] },
        ],
        alerta: { titulo: 'Procure o médico se…', lista: ['Feridas, bolhas, verrugas ou corrimento', 'Ardor ao urinar que não passa', 'Sangramento vaginal depois da menopausa (sempre deve ser avaliado)', 'Relação de risco: urgência hospitalar nas primeiras 72 horas'] },
      },
    },
  },
];

export const encontrarDoenca = (id) => DOENCAS.find((d) => d.id === id) || null;
export const grupoValido = (id) => GRUPOS.some((g) => g.id === id);

/**
 * Resumo em texto de um separador, para o email (como nas ferramentas):
 * a introdução — ou, para os mais pequenos, as legendas das imagens —, a
 * curiosidade, quando procurar ajuda e, se for o caso, a evicção escolar. A explicação completa fica na ligação.
 */
export function resumoDoenca(d, grupoId) {
  const g = d.grupos[grupoId];
  const grupo = GRUPOS.find((x) => x.id === grupoId);
  const linhas = [`${d.nome} — ${grupo.nome} (${grupo.idade})`, ''];
  if (g.intro) linhas.push(g.intro, '');
  else linhas.push(...g.imagens.map(([, legenda]) => `• ${legenda}`), '');
  if (g.curiosidade) linhas.push(`Sabias que… ${g.curiosidade}`, '');
  if (g.alerta) linhas.push(g.alerta.titulo, ...g.alerta.lista.map((l) => `• ${l}`), '');
  if (d.eviccao) linhas.push('Evicção escolar obrigatória', d.eviccao, '');
  return { assunto: `${d.nome}: explicação para ${grupo.nome.toLowerCase()} (${grupo.idade})`, linhas };
}
