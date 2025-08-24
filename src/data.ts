import { Mood, MeditationType, GroundingStep, EmergencyContact } from '../types';

export const moods: Mood[] = [
  { 
    emoji: '😊', 
    label: 'Feliz', 
    messages: [
      'Que ótimo que você está se sentindo feliz! Continue espalhando essa energia positiva.',
      'A felicidade ilumina não só o seu dia, mas também o de quem está perto de você ✨',
      'Aproveite cada instante e celebre as pequenas vitórias que a vida traz.',
      'Seu sorriso pode ser a razão do dia de alguém ser mais leve hoje.',
      'Estar feliz é um presente, mas também é fruto das suas escolhas e da sua força.',
      'Compartilhe sua alegria e veja como ela se multiplica ao redor.'
    ],
    score: 8
  },
  { 
    emoji: '🙂', 
    label: 'Bem', 
    messages: [
      'Legal! Que seu dia continue tranquilo e cheio de coisas boas.',
      'Estar bem é sinal de equilíbrio — valorize essa sensação.',
      'A paz de hoje pode ser a força para enfrentar os desafios de amanhã.',
      'Quando estamos bem, espalhamos serenidade para todos à volta.',
      'Use esse momento de calma para recarregar suas energias.',
      'Seu estado de bem-estar é uma conquista: mantenha-o com carinho.'
    ],
    score: 7
  },
  { 
    emoji: '😐', 
    label: 'Neutro', 
    messages: [
      'Tudo bem ter dias neutros. Às vezes a calma também é necessária.',
      'Nem todo dia precisa ser extraordinário: dias neutros também são parte da vida.',
      'O silêncio e a neutralidade dão espaço para novas ideias florescerem.',
      'Mesmo dias comuns podem trazer pequenas alegrias escondidas.',
      'Estar neutro é sinal de equilíbrio interno. Permita-se descansar.',
      'Hoje é um ponto de pausa: o próximo passo pode ser incrível.'
    ],
    score: 5 
  },
  { 
    emoji: '😔', 
    label: 'Triste', 
    messages: [
      'Sinto muito que você esteja triste. Lembre-se: isso também vai passar.',
      'A tristeza é válida — acolha seus sentimentos com compaixão.',
      'Mesmo nos dias nublados, o sol sempre retorna. 🌤️',
      'Permita-se sentir, mas lembre-se de que você não está sozinho.',
      'Cada lágrima pode regar uma nova fase de crescimento.',
      'Você é mais forte do que imagina, mesmo quando não sente isso.'
    ],
    score: 3
  },
  { 
    emoji: '😟', 
    label: 'Ansioso', 
    messages: [
      'A ansiedade é desafiadora, mas você pode superá-la. Respire fundo.',
      'Não precisa controlar tudo de uma vez — um passo de cada vez já é vitória.',
      'O agora é o seu refúgio. Concentre-se neste momento.',
      'Sua respiração é uma âncora que pode te trazer calma.',
      'Você não é a sua ansiedade. Ela é apenas uma onda que passa.',
      'Seu coração é forte: confie no processo de encontrar equilíbrio.'
    ],
    score: 2
  },
  { 
    emoji: '😤', 
    label: 'Irritado', 
    messages: [
      'É normal sentir raiva às vezes. Canalize-a de forma saudável.',
      'Respire fundo e permita-se uma pausa antes de reagir.',
      'A irritação mostra que algo importa para você — use isso como energia positiva.',
      'Transforme a raiva em motivação para mudar o que pode ser mudado.',
      'Dar espaço ao silêncio pode trazer clareza antes da ação.',
      'Você tem o controle: a raiva não precisa guiar suas escolhas.'
    ],
    score: 2
  },
  { 
    emoji: '😰', 
    label: 'Estressado', 
    messages: [
      'O estresse faz parte da vida, mas você não precisa carregar tudo sozinho.',
      'Descanse sua mente: pequenas pausas podem trazer grandes alívios.',
      'Você está dando o seu melhor, e isso já é suficiente 🌱',
      'Respirar fundo e se afastar por alguns minutos pode renovar sua energia.',
      'Ser produtivo também inclui saber descansar.',
      'Seja gentil consigo mesmo: você merece equilíbrio e paz.'
    ],
    score: 1
  },
  { 
    emoji: '🤗', 
    label: 'Esperançoso', 
    messages: [
      'Que lindo ver você com esperança! Essa energia transforma vidas.',
      'A esperança é uma chama que nunca se apaga — cuide dela.',
      'Continue acreditando: cada passo te aproxima do que deseja.',
      'O futuro guarda possibilidades incríveis para quem mantém a fé.',
      'Com esperança, até os dias difíceis ficam mais leves.',
      'Sua esperança inspira e fortalece quem caminha ao seu lado.'
    ],
    score: 7
  }
];

export const meditationTypes: MeditationType[] = [
  { 
    id: 'breathing-444', 
    name: 'Respiração 4-4-4', 
    description: 'Inspire 4, segure 4, expire 4',
    icon: '💨',
    duration: '5-10 min'
  },
  { 
    id: 'breathing-478', 
    name: 'Respiração 4-7-8', 
    description: 'Inspire 4, segure 7, expire 8',
    icon: '🌙',
    duration: '3-5 min'
  },
  { 
    id: 'box-breathing', 
    name: 'Box Breathing', 
    description: 'Inspire 4, segure 4, expire 4, segure 4',
    icon: '📦',
    duration: '5-10 min'
  },
  { 
    id: 'mindfulness', 
    name: 'Mindfulness Básico', 
    description: 'Foco no presente momento',
    icon: '🧘',
    duration: '10-15 min'
  },
  { 
    id: 'body-scan', 
    name: 'Scan Corporal', 
    description: 'Relaxamento progressivo do corpo',
    icon: '🌊',
    duration: '15-20 min'
  },
  { 
    id: 'loving-kindness', 
    name: 'Meditação da Compaixão', 
    description: 'Cultive amor e bondade',
    icon: '💚',
    duration: '12-18 min'
  }
];

export const SOUND_FILES = {
  rain: '/audio/rain.mp3',
  ocean: '/audio/ocean.mp3',
  wind: '/audio/wind.mp3',
  forest: '/audio/forest.mp3',
  thunder: '/audio/thunder.mp3',
  fireplace: '/audio/fireplace.mp3',
} as const;

export const groundingSteps: GroundingStep[] = [
  { title: '5 coisas que você VÊ', description: 'Olhe ao redor e identifique 5 coisas que você pode ver', emoji: '👀' },
  { title: '4 coisas que você SENTE', description: 'Toque em 4 objetos diferentes ao seu redor', emoji: '✋' },
  { title: '3 coisas que você OUVE', description: 'Pare e escute 3 sons diferentes', emoji: '👂' },
  { title: '2 coisas que você CHEIRA', description: 'Identifique 2 aromas ao seu redor', emoji: '👃' },
  { title: '1 coisa que você SABOREIA', description: 'Concentre-se no sabor em sua boca', emoji: '👅' }
];

export const emergencyContacts: EmergencyContact[] = [
  // Cabo Verde
  {
    name: 'Hospital Dr. Agostinho Neto',
    phone: '2614400',
    description: 'Hospital principal de Cabo Verde - Praia',
    website: 'https://www.minsaude.gov.cv',
    country: 'CV',
    location: 'Praia'
  },
  {
    name: 'Cruz Vermelha de Cabo Verde',
    phone: '2614573',
    description: 'Apoio humanitário e assistência social',
    website: 'https://cruzvermelha.cv',
    country: 'CV',
    location: 'Nacional'
  },
  {
    name: 'Centro de Saúde Mental - Praia',
    phone: '2612345',
    description: 'Atendimento especializado em saúde mental',
    website: 'https://www.minsaude.gov.cv',
    country: 'CV',
    location: 'Praia'
  },
  {
    name: 'SOS Telefone Amigo CV',
    phone: '800 2020',
    description: 'Linha de apoio emocional gratuita 24h',
    website: null,
    country: 'CV',
    location: 'Nacional'
  },
  // Recursos Internacionais
  {
    name: 'International Association for Suicide Prevention',
    phone: 'Varia por país',
    description: 'Recursos globais de prevenção ao suicídio',
    website: 'https://www.iasp.info/resources/Crisis_Centres',
    country: 'INTL',
    location: 'Internacional'
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: 'Apoio por mensagem de texto 24/7',
    website: 'https://www.crisistextline.org',
    country: 'INTL',
    location: 'Internacional'
  },
  {
    name: 'WHO Mental Health',
    phone: 'Consulte recursos locais',
    description: 'Recursos da OMS para saúde mental',
    website: 'https://www.who.int/health-topics/mental-health',
    country: 'INTL',
    location: 'Internacional'
  }
];
