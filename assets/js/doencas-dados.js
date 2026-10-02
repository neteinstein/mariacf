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

export const DOENCAS = [
  {
    id: 'diabetes',
    nome: 'Diabetes',
    emoji: '🩸',
    categoria: 'Metabolismo',
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
    categoria: 'Nervos e músculos',
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
];

export const encontrarDoenca = (id) => DOENCAS.find((d) => d.id === id) || null;
export const grupoValido = (id) => GRUPOS.some((g) => g.id === id);
