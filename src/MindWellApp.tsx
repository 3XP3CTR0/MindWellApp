import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, HelpCircle, Volume2, Target, Heart, User, Edit3, Mail, X, Play, Menu, Pause, BookOpenIcon, Shield, Minus, Plus, BarChart3, Phone, ExternalLink, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';


type MoodEntry = {
  date: string;
  mood: number;
  note: string;
  score: number;
  time?: string;
  timestamp?: number;
};

const MindWellApp = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [mood, setMood] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [tempName, setTempName] = useState('');
  const [userBirthDate, setUserBirthDate] = useState('');
  const [tempBirthDate, setTempBirthDate] = useState(new Date(1999, 0, 1)); // 1º de janeiro de 1999
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dailyUsage, setDailyUsage] = useState({ date: new Date().toDateString(), count: 0, lastUsed: 0 });
  const [selectedMeditation, setSelectedMeditation] = useState('');
  const [groundingStep, setGroundingStep] = useState(0);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [, setIsFirstTime] = useState(true);
  const [, setCurrentMoodNote] = useState('');


  // Ícone personalizado MindWell
  // Ícone personalizado MindWell usando seu PNG da pasta public
  const MindWellIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <img 
      src="public/mindwell_app_icon.png" 
      alt="MindWell Icon" 
      className={`${className} object-contain`}
    />
  );

  // ADICIONAR esta função:
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const calculateAverageMood = () => {
    if (moodHistory.length === 0) return 0;
    const average = moodHistory.reduce((sum, entry) => sum + entry.score, 0) / moodHistory.length;
    return Math.round((average / 8) * 100); // transforma para porcentagem (0–100%)
  };


  // Array com emojis, labels e mensagens de apoio
  const moods = [
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

  const meditationTypes = [
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

  // Classe para gerenciar os sons (usando arquivos MP3 reais)
  const SOUND_FILES = {
    rain: 'public/audio/rain.mp3',
    ocean: 'public/audio/ocean.mp3',
    wind: 'public/audio/wind.mp3',
    forest: 'public/audio/forest.mp3',
    thunder: 'public/audio/thunder.mp3',
    fireplace: 'public/audio/fireplace.mp3',
  } as const;
  type SoundType = keyof typeof SOUND_FILES;

  class MindWellSoundManager {
    private currentAudio: HTMLAudioElement | null = null;
    public isPlaying: boolean = false;
    public currentSoundType: SoundType | '' = '';
    public volume: number = 0.7;

    async playSound(soundType: SoundType): Promise<boolean> {
      this.stopSound();
      try {
        const audioFile = SOUND_FILES[soundType];
        if (!audioFile) return false;

        this.currentAudio = new Audio(audioFile);
        this.currentAudio.loop = true;
        this.currentAudio.volume = this.volume;

        await new Promise<void>((resolve, reject) => {
          this.currentAudio!.addEventListener('canplaythrough', () => resolve(), { once: true });
          this.currentAudio!.addEventListener('error', () => reject(new Error('Erro no áudio')), { once: true });
          this.currentAudio!.load();
        });

        await this.currentAudio.play();
        this.isPlaying = true;
        this.currentSoundType = soundType;
        return true;
      } catch {
        return false;
      }
    }

    stopSound(): void {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
      }
      this.isPlaying = false;
      this.currentSoundType = '';
    }

    setVolume(volume: number): void {
      this.volume = volume;
      if (this.currentAudio) this.currentAudio.volume = volume;
    }
  }


  const groundingSteps = [
    { title: '5 coisas que você VÊ', description: 'Olhe ao redor e identifique 5 coisas que você pode ver', emoji: '👀' },
    { title: '4 coisas que você SENTE', description: 'Toque em 4 objetos diferentes ao seu redor', emoji: '✋' },
    { title: '3 coisas que você OUVE', description: 'Pare e escute 3 sons diferentes', emoji: '👂' },
    { title: '2 coisas que você CHEIRA', description: 'Identifique 2 aromas ao seu redor', emoji: '👃' },
    { title: '1 coisa que você SABOREIA', description: 'Concentre-se no sabor em sua boca', emoji: '👅' }
  ];

  // Função para preparar dados do gráfico
  const getChartData = () => {
    if (moodHistory.length === 0) return [];
    
    return moodHistory.slice(-14).map((entry) => ({
      day: new Date(entry.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      mood: entry.score, // Normalizar de 1-8 para melhor visualização
    label: moods[entry.mood]?.label,
    emoji: moods[entry.mood]?.emoji,
      note: entry.note || ''
    }));
  };

  // Componente do gráfico
  const MoodChart = () => {
    const data = getChartData();
    
    if (data.length === 0) {
      return (
        <div className="text-center py-8">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Registre seu humor por alguns dias para ver o gráfico</p>
        </div>
      );
    }

    return (
      <div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              domain={[1, 8]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8]}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow-lg">
                      <p className="font-semibold">{label}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{data.emoji}</span>
                        <span className="text-sm font-medium">{data.label}</span>
                      </div>
                      {data.note && (
                        <p className="text-xs text-gray-600 mt-1 italic">"{data.note}"</p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="mood" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fill="url(#moodGradient)"
            />
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className="w-4 h-2 bg-green-400 rounded mx-auto mb-1"></div>
            <span className="text-gray-600">Ótimo (7-8)</span>
          </div>
          <div className="text-center">
            <div className="w-4 h-2 bg-blue-400 rounded mx-auto mb-1"></div>
            <span className="text-gray-600">Bom (5-6)</span>
          </div>
          <div className="text-center">
            <div className="w-4 h-2 bg-yellow-400 rounded mx-auto mb-1"></div>
            <span className="text-gray-600">Regular (3-4)</span>
          </div>
          <div className="text-center">
            <div className="w-4 h-2 bg-red-400 rounded mx-auto mb-1"></div>
            <span className="text-gray-600">Baixo (1-2)</span>
          </div>
        </div>
      </div>
    );
  };

  const emergencyContacts = [
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

  const handleOpenMessage = () => {
    if (mood === null || typeof mood !== 'number' || !moods[mood]) {
      alert('Por favor, registre seu humor antes de abrir a carta! 🙂');
      return;
    }
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    if (dailyUsage.lastUsed && (now - dailyUsage.lastUsed) < oneHour) {
      const timeLeft = Math.ceil((oneHour - (now - dailyUsage.lastUsed)) / (60 * 1000));
      alert(`Aguarde mais ${timeLeft} minutos para abrir uma nova carta! ⏰`);
      return;
    }
    // Sorteia uma mensagem entre as disponíveis do humor atual
    const moodMessages = moods[mood].messages;
    const randomIndex = Math.floor(Math.random() * moodMessages.length);
    const message = moodMessages[randomIndex];
    setCurrentMessage(message);
    setShowModal(true);
    setDailyUsage(prev => ({ ...prev, lastUsed: now, count: prev.count + 1 }));
  };

  const handleAddToFavorites = () => {
    if (currentMessage) {
      if (favorites.includes(currentMessage)) {
        setFavorites(favorites.filter(fav => fav !== currentMessage));
      } else {
        setFavorites([...favorites, currentMessage]);
      }
    }
  };

  const handleRemoveFromFavorites = (message: string) => {
    setFavorites(favorites.filter(fav => fav !== message));
  };

  const handleMoodSelection = (moodIndex: number, note: string = '') => {
    setMood(moodIndex);
    setCurrentMoodNote(note);
    
    // Salvar no histórico - cada entrada com timestamp único
    const now = new Date();
    const newEntry = { 
      date: now.toISOString(), 
      mood: moodIndex, 
      score: moods[moodIndex].score, 
      note,
      timestamp: now.getTime(),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    // Adiciona ao histórico sem remover entradas anteriores
    setMoodHistory(prev => [...prev, newEntry]);
  };

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return null;
    
    const recent = moodHistory.slice(-7); // Últimos 7 dias
    const average = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    
    if (average >= 5.5) return 'positive';
    if (average >= 3.5) return 'neutral';
    return 'negative';
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentMessage('');
  };

  // SUBSTITUIR a função completeOnboarding por:
  const completeOnboarding = () => {
    if (tempName.trim() && tempBirthDate) {
      setUserName(tempName.trim());
      setUserBirthDate(tempBirthDate.toISOString());
      setIsFirstTime(false);
      setCurrentScreen('mood');
      setTempName('');
      setTempBirthDate(new Date(1999, 0, 1));
    } else {
      alert('Por favor, preencha todos os campos para continuar.');
    }
  };

  // REMOVER todo o componente AgeSelector e SUBSTITUIR por:
  const BirthDateSelector = ({ value, onChange, label }: { value: Date, onChange: (date: Date) => void, label: string }) => {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 100;
    const maxYear = currentYear - 1;

    const adjustDate = (type: 'day' | 'month' | 'year', increment: number) => {
      const newDate = new Date(value);
      
      if (type === 'day') {
        newDate.setDate(newDate.getDate() + increment);
      } else if (type === 'month') {
        newDate.setMonth(newDate.getMonth() + increment);
      } else if (type === 'year') {
        newDate.setFullYear(newDate.getFullYear() + increment);
      }
      
      // Limitar os anos
      if (newDate.getFullYear() < minYear) newDate.setFullYear(minYear);
      if (newDate.getFullYear() > maxYear) newDate.setFullYear(maxYear);
      
      onChange(newDate);
    };

    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
        <div className="bg-gray-50 rounded-2xl p-4">
          {/* Controles de data */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Dia */}
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">Dia</div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => adjustDate('day', -1)}
                  className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors text-sm"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <div className="text-xl font-bold text-gray-800 px-2">
                  {value.getDate().toString().padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={() => adjustDate('day', 1)}
                  className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors text-sm"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Mês */}
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">Mês</div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => adjustDate('month', -1)}
                  className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors text-sm"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <div className="text-xl font-bold text-gray-800 px-2">
                  {(value.getMonth() + 1).toString().padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={() => adjustDate('month', 1)}
                  className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors text-sm"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Ano */}
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-2">Ano</div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => adjustDate('year', -1)}
                  className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors text-sm"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <div className="text-lg font-bold text-gray-800 px-1">
                  {value.getFullYear()}
                </div>
                <button
                  type="button"
                  onClick={() => adjustDate('year', 1)}
                  className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors text-sm"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Data formatada e idade */}
          <div className="text-center p-3 bg-white rounded-xl">
            <div className="text-lg font-semibold text-gray-800">
              {value.toLocaleDateString('pt-BR')}
            </div>
            <div className="text-sm text-gray-600">
              {calculateAge(value)} anos
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal Component
  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-transparent opacity-30 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200 to-transparent opacity-30 rounded-full translate-y-6 -translate-x-6"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mensagem Especial
                  </h3>
                  <p className="text-sm text-gray-500">Para você ❤️</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-inner border border-white/50">
              <div className="text-center">
                <span className="text-4xl mb-4 block">💝</span>
                <p className="text-gray-700 text-lg leading-relaxed font-medium italic relative">
                  <span className="text-blue-500 text-2xl absolute -top-2 -left-2">"</span>
                  {currentMessage}
                  <span className="text-blue-500 text-2xl absolute -bottom-4 -right-2">"</span>
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleAddToFavorites}
                className={`flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  favorites.includes(currentMessage) 
                    ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-red-200' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-red-50 hover:to-pink-50 hover:text-red-600 shadow-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 transition-all ${favorites.includes(currentMessage) ? 'fill-current scale-110' : ''}`} />
                <span className="text-sm font-semibold">
                  {favorites.includes(currentMessage) ? 'Favoritado' : 'Favoritar'}
                </span>
              </button>
              
              <button
                onClick={closeModal}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Tela de Onboarding
  const OnboardingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MindWellIcon className="w-60 h-60 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo ao MindWell!</h1>
          <p className="text-gray-600 text-lg">Vamos conhecer você melhor para personalizar sua experiência</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="onboarding-name" className="block text-sm font-semibold text-gray-700 mb-3">
                Como podemos te chamar?
              </label>
              <input
                id="onboarding-name"
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={30}
                autoComplete="given-name"
                autoFocus
              />
            </div>

            <BirthDateSelector 
              value={tempBirthDate} 
              onChange={setTempBirthDate} 
              label="Qual sua data de nascimento?"
            />

            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-blue-700 text-sm text-center">
                <span className="font-semibold">🔒 Suas informações são privadas</span><br />
                Não compartilhamos seus dados com terceiros
              </p>
            </div>

            <button
              onClick={completeOnboarding}
              disabled={!tempName.trim()}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${
                tempName.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg shadow-blue-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Começar minha jornada ✨
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Você pode alterar essas informações a qualquer momento no seu perfil
        </p>
      </div>
    </div>
  );

  const HomeScreen = () => {
    const canOpenCard = () => {
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;
      return !dailyUsage.lastUsed || (now - dailyUsage.lastUsed) >= oneHour;
    };

    const getTimeUntilNextCard = () => {
      if (!dailyUsage.lastUsed) return 0;
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;
      const timeLeft = oneHour - (now - dailyUsage.lastUsed);
      return Math.max(0, Math.ceil(timeLeft / (60 * 1000)));
    };

    const moodTrend = getMoodTrend();
    const currentHour = new Date().getHours();
    
    const getGreeting = () => {
      if (currentHour < 12) return "Bom dia";
      if (currentHour < 18) return "Boa tarde";
      return "Boa noite";
    };

    const getMotivationalQuote = () => {
      const quotes = [
        "Cada dia é uma nova oportunidade para cuidar de si mesmo 🌱",
        "Pequenos passos todos os dias levam a grandes mudanças ✨",
        "Sua jornada de bem-estar é única e valiosa 💙",
        "Respire fundo. Você está fazendo o seu melhor 🌸",
        "O autocuidado não é luxo, é necessidade 🤗"
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
        <div className="max-w-md mx-auto">
{showMenu && (
            <>
              {/* Overlay invisível para capturar cliques e bloquear interações */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowMenu(false)}
              />
              
              {/* Menu animado */}
              <div 
                className={`absolute top-16 right-4 w-72 bg-white rounded-2xl shadow-2xl z-50 
                          transform transition-all duration-300 ease-out border border-gray-100
                          ${showMenu ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-2'}`}
              >
                {/* Header do menu com botão de fechar */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Menu</h3>
                  <button 
                    onClick={() => setShowMenu(false)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Fechar menu"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Items do menu */}
                <div className="p-2 space-y-1">
                  
                  <button 
                    onClick={() => { setCurrentScreen('meditation-selection'); setShowMenu(false); }} 
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">🧘</span>
                    </div>
                    <span className="text-gray-800 font-medium">Meditar agora</span>
                  </button>
                  
                  <button 
                    onClick={() => { setCurrentScreen('support'); setShowMenu(false); }} 
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-800 font-medium">Apoio Emocional</span>
                  </button>
                  
                  <button 
                    onClick={() => { setCurrentScreen('sounds'); setShowMenu(false); }} 
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Volume2 className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-gray-800 font-medium">Sons Relaxantes</span>
                  </button>
                  
                  <button 
                    onClick={() => { setCurrentScreen('favorites'); setShowMenu(false); }} 
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-gray-800 font-medium">Mensagens Favoritas</span>
                  </button>
                  
                  {/* Separador */}
                  <div className="my-2 border-t border-gray-100"></div>
                  
                  <button 
                    onClick={() => { setCurrentScreen('info'); setShowMenu(false); }} 
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-gray-500" />
                    </div>
                    <span className="text-gray-800 font-medium">Ajuda</span>
                  </button>
                </div>
              </div>
            </>
          )}
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MindWellIcon className="w-16 h-16 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">MindWell</h1>
                <p className="text-sm text-gray-600">{getGreeting()}, {userName}!</p>
              </div>
            </div>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Status do Humor Atual */}
          {mood !== null ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="text-center">
                <div className="text-6xl mb-3">{moods[mood].emoji}</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Humor atual: {moods[mood].label}</h2>
                <p className="text-gray-600 text-sm mb-4">Registrado hoje</p>
                
                {moodTrend && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center justify-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Tendência: 
                        <span className={`ml-1 font-semibold ${
                          moodTrend === 'positive' ? 'text-green-600' : 
                          moodTrend === 'neutral' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {moodTrend === 'positive' ? '📈 Melhorando' : 
                           moodTrend === 'neutral' ? '➡️ Estável' : '📉 Precisa atenção'}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 shadow-lg mb-6">
              <div className="text-center text-white">
                <div className="text-4xl mb-3">🤔</div>
                <h2 className="text-xl font-semibold mb-2">Como você está se sentindo?</h2>
                <p className="text-blue-100 text-sm mb-4">Registre seu humor para começar sua jornada</p>
                <button
                  onClick={() => setCurrentScreen('mood')}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Registrar agora
                </button>
              </div>
            </div>
          )}

          {/* Ações Rápidas */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentScreen('mood')}
                className="w-full bg-blue-50 hover:bg-blue-100 rounded-xl p-4 text-left transition-colors flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-lg">{mood !== null ? moods[mood].emoji : '😐'}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">
                    {mood !== null ? 'Atualizar Humor' : 'Registrar Humor'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {mood !== null ? `Atual: ${moods[mood].label}` : 'Como você se sente?'}
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setCurrentScreen('meditation-selection')}
                className="w-full bg-purple-50 hover:bg-purple-100 rounded-xl p-4 text-left transition-colors flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-lg">🧘</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Meditar</div>
                  <div className="text-sm text-gray-600">Respire e relaxe</div>
                </div>
              </button>
            </div>
          </div>

          {/* Citação Motivacional */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
            <div className="text-center">
              <div className="text-2xl mb-3">💫</div>
              <p className="text-gray-700 font-medium italic leading-relaxed">
                {getMotivationalQuote()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Botão fixo da carta positiva */}
        <button
          onClick={handleOpenMessage}
          className={`fixed right-4 top-[60%] z-40 p-4 rounded-full shadow-xl border-2 transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
            !canOpenCard()
              ? 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 border-white hover:shadow-2xl hover:shadow-purple-300'
          }`}
          aria-label="Abrir carta positiva"
          disabled={!canOpenCard()}
        >
          <Mail className={`w-7 h-7 ${
            !canOpenCard()
              ? 'text-gray-400'
              : 'text-white drop-shadow-lg'
          }`} />
          {!canOpenCard() && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
              {getTimeUntilNextCard()}m
            </div>
          )}
          {canOpenCard() && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          )}
        </button>

        <Modal />
      </div>
    );
  };

  const MoodScreen = () => {
    const [selectedMood, setSelectedMood] = useState<number | null>(mood);
    const [moodNote, setMoodNote] = useState('');

    const saveMood = () => {
      if (selectedMood !== null) {
        handleMoodSelection(selectedMood, moodNote);
        setCurrentScreen('home');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => setCurrentScreen('home')} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Como você está?</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {moods.map((moodOption, index) => (
              <button
                key={index}
                onClick={() => setSelectedMood(index)}
                className={`p-4 rounded-2xl transition-all duration-200 ${
                  selectedMood === index 
                    ? 'bg-blue-500 text-white shadow-lg scale-105' 
                    : 'bg-white hover:bg-gray-50 shadow-sm'
                }`}
              >
                <div className="text-4xl mb-2">{moodOption.emoji}</div>
                <div className={`text-sm font-medium ${
                  selectedMood === index ? 'text-white' : 'text-gray-700'
                }`}>
                  {moodOption.label}
                </div>
              </button>
            ))}
          </div>

          {selectedMood !== null && (
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Conte mais sobre como está se sentindo
              </h3>
              <textarea
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="O que aconteceu hoje? Como você gostaria de se sentir? (opcional)"
                className="w-full h-24 p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={200}
              />
              <div className="text-right text-xs text-gray-400 mt-1">
                {moodNote.length}/200
              </div>
            </div>
          )}

          <button
            onClick={saveMood}
            disabled={selectedMood === null}
            className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
              selectedMood !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Salvar
          </button>
        </div>
      </div>
    );
  };

  const MeditationSelectionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">MindWell</h1>
        </div>

        <h2 className="text-xl text-gray-700 mb-2">Escolha seu tipo de meditação</h2>
        <p className="text-gray-600 mb-8">Selecione a prática que mais te conecta</p>

        <div className="space-y-4">
          {meditationTypes.map((meditation) => (
            <button
              key={meditation.id}
              onClick={() => {
                setSelectedMeditation(meditation.id);
                setCurrentScreen('breathing');
              }}
              className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">{meditation.icon}</span>
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-800">{meditation.name}</div>
                <div className="text-gray-600 text-sm">{meditation.description}</div>
                <div className="text-purple-600 text-xs mt-1">{meditation.duration}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const BreathingScreen = () => {
    const [breathing, setBreathing] = useState({ active: false, phase: 'inhale', count: 4 });
    const [breathingTimer, setBreathingTimer] = useState<ReturnType<typeof setInterval> | null>(null);

    const selectedMeditationType = meditationTypes.find(m => m.id === selectedMeditation) || meditationTypes[0];

    useEffect(() => {
      let timer: ReturnType<typeof setInterval> | null = null;
      if (breathing.active) {
        timer = setInterval(() => {
          setBreathing(prev => {
            if (prev.count > 1) {
              return { ...prev, count: prev.count - 1 };
            } else {
              let nextPhase = '';
              let nextCount = 4;
              if (selectedMeditation === 'breathing-478') {
                if (prev.phase === 'inhale') { nextPhase = 'hold'; nextCount = 7; }
                else if (prev.phase === 'hold') { nextPhase = 'exhale'; nextCount = 8; }
                else { nextPhase = 'inhale'; nextCount = 4; }
              } else if (selectedMeditation === 'box-breathing') {
                if (prev.phase === 'inhale') { nextPhase = 'hold1'; nextCount = 4; }
                else if (prev.phase === 'hold1') { nextPhase = 'exhale'; nextCount = 4; }
                else if (prev.phase === 'exhale') { nextPhase = 'hold2'; nextCount = 4; }
                else { nextPhase = 'inhale'; nextCount = 4; }
              } else {
                if (prev.phase === 'inhale') { nextPhase = 'hold'; nextCount = 4; }
                else if (prev.phase === 'hold') { nextPhase = 'exhale'; nextCount = 4; }
                else { nextPhase = 'inhale'; nextCount = 4; }
              }
              return { ...prev, phase: nextPhase, count: nextCount };
            }
          });
        }, 1000);
        setBreathingTimer(timer);
      } else {
        if (breathingTimer) clearInterval(breathingTimer);
      }
      return () => {
        if (timer) clearInterval(timer);
      };
    }, [breathing.active, selectedMeditation]);

    const getPhaseText = () => {
      switch (breathing.phase) {
        case 'inhale': return 'Inspire';
        case 'hold':
        case 'hold1': return 'Segure';
        case 'hold2': return 'Pause';
        case 'exhale': return 'Expire';
        default: return 'Inspire';
      }
    };

    const getInstructions = () => {
      if (selectedMeditation === 'mindfulness') {
        return 'Concentre-se no momento presente. Observe sua respiração naturalmente, sem forçar.';
      }
      return 'Siga o ritmo da respiração. Respire lenta e profundamente.';
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => {
              setBreathing({ active: false, phase: 'inhale', count: 4 });
              setCurrentScreen('meditation-selection');
            }} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">MindWell</h1>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-2">{selectedMeditationType.name}</h2>
            <p className="text-gray-600 text-sm mb-8">{getInstructions()}</p>

            <div className="relative mb-8">
              <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center transition-all duration-1000 shadow-lg ${
                breathing.active ? (breathing.phase === 'inhale' ? 'scale-110' : breathing.phase.includes('hold') ? 'scale-105' : 'scale-95') : ''
              }`}>
                <span className="text-6xl font-bold text-white">{breathing.count}</span>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-30"></div>
            </div>

            <h3 className="text-2xl font-medium text-gray-700 mb-6">{getPhaseText()}</h3>

            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setBreathing(prev => ({ ...prev, active: !prev.active }))}
                className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-medium transition-colors shadow-lg ${
                  breathing.active 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {breathing.active ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{breathing.active ? 'Pausar' : 'Começar'}</span>
              </button>
            </div>

            <button
              onClick={() => setCurrentScreen('sounds')}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Sons relaxantes</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SoundsScreen = () => {
    const [localPlayingSound, setLocalPlayingSound] = useState('');
    const [volume, setVolume] = useState(0.7);
    const soundManagerRef = useRef(new MindWellSoundManager());

    type CalmingSound = { id: SoundType; name: string; description: string; icon: string };
    const calmingSounds: CalmingSound[] = [
      {
        id: 'rain',
        name: 'Chuva Suave',
        description: 'Som relaxante de chuva (artificial)',
        icon: '🌧️'
      },
      {
        id: 'ocean',
        name: 'Ondas do Oceano',
        description: 'Ondas suaves do mar (artificial)',
        icon: '🌊'
      },
      {
        id: 'wind',
        name: 'Vento Suave',
        description: 'Brisa relaxante (artificial)',
        icon: '💨'
      },
      {
        id: 'forest',
        name: 'Floresta Tropical',
        description: 'Sons de pássaros e folhas',
        icon: '🌲'
      },
      {
        id: 'thunder',
        name: 'Trovoada Distante',
        description: 'Trovões suaves e chuva',
        icon: '⛈️'
      },
      {
        id: 'fireplace',
        name: 'Lareira Crepitante',
        description: 'Som de lenha queimando',
        icon: '🔥'
      }
    ];
   

    // Função para tocar/parar som
    const toggleSound = async (sound:CalmingSound) => {
      const soundManager = soundManagerRef.current;
      
      if (localPlayingSound === sound.id) {
        // Se o mesmo som está tocando, para
        soundManager.stopSound();
        setLocalPlayingSound('');
      } else {
        // Toca o novo som
        const success = await soundManager.playSound(sound.id);
        if (success) {
          setLocalPlayingSound(sound.id);
        } else {
          alert('Não foi possível reproduzir o som. Tente novamente.');
        }
      }
    };

    // Atualiza o volume quando o slider muda
    useEffect(() => {
      soundManagerRef.current.setVolume(volume);
    }, [volume]);

    // Limpa o áudio quando o componente desmonta
    useEffect(() => {
      return () => {
        soundManagerRef.current.stopSound();
      };
    }, []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => {
                soundManagerRef.current.stopSound();
                setLocalPlayingSound('');
                setCurrentScreen('home');
              }} 
              className="mr-4"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Sons Relaxantes</h1>
          </div>

          <p className="text-gray-600 mb-6">Escolha um som para relaxar e focar</p>

          {/* Controle de Volume */}
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-gray-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600 w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* Lista de Sons */}
          <div className="space-y-4">
            {calmingSounds.map((sound) => (
              <button
                key={sound.id}
                onClick={() => toggleSound(sound)}
                className={`w-full p-4 rounded-2xl transition-all duration-200 flex items-center space-x-4 ${
                  localPlayingSound === sound.id
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-gray-50 shadow-sm hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  localPlayingSound === sound.id 
                    ? 'bg-green-400' 
                    : 'bg-green-100'
                }`}>
                  <span className="text-2xl">{sound.icon}</span>
                </div>
                
                <div className="flex-1 text-left">
                  <div className={`font-semibold ${
                    localPlayingSound === sound.id ? 'text-white' : 'text-gray-800'
                  }`}>
                    {sound.name}
                  </div>
                  <div className={`text-sm ${
                    localPlayingSound === sound.id ? 'text-green-100' : 'text-gray-600'
                  }`}>
                    {sound.description}
                    {localPlayingSound === sound.id && ' • Tocando...'}
                  </div>
                </div>
                
                <div className={`p-2 rounded-full ${
                  localPlayingSound === sound.id 
                    ? 'bg-green-400' 
                    : 'bg-gray-100'
                }`}>
                  {localPlayingSound === sound.id ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Botão para parar todos os sons */}
          {localPlayingSound && (
            <button
              onClick={() => {
                soundManagerRef.current.stopSound();
                setLocalPlayingSound('');
              }}
              className="w-full mt-6 bg-red-500 text-white p-3 rounded-2xl font-semibold hover:bg-red-600 transition-colors"
            >
              ⏹️ Parar Som
            </button>
          )}
        </div>
      </div>
    );
  };

  const SupportScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Apoio Emocional</h1>
        </div>

        <div className="space-y-6">
          <button
            onClick={() => {
              setGroundingStep(0);
              setCurrentScreen('grounding');
            }}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-800">Técnica 5-4-3-2-1</div>
              <div className="text-gray-600 text-sm">Para momentos de ansiedade</div>
            </div>
          </button>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-green-600" />
              Contatos de Emergência
            </h3>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <div className="font-semibold text-gray-800">{contact.name}</div>
                  <div className="text-green-600 font-mono text-lg">{contact.phone}</div>
                  <div className="text-gray-600 text-sm">{contact.description}</div>
                  {contact.website && (
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 text-sm hover:underline mt-1"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Site oficial
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Importante</h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Se você está passando por uma crise emocional ou tendo pensamentos de autolesão, 
                  procure ajuda profissional imediatamente. Você não está sozinho e sempre há esperança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const GroundingScreen = () => {
    const currentStep = groundingSteps[groundingStep];
    
    const nextStep = () => {
      if (groundingStep < groundingSteps.length - 1) {
        setGroundingStep(groundingStep + 1);
      } else {
        setCurrentScreen('support');
      }
    };

    const prevStep = () => {
      if (groundingStep > 0) {
        setGroundingStep(groundingStep - 1);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => setCurrentScreen('support')} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Técnica 5-4-3-2-1</h1>
          </div>

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">{currentStep.emoji}</span>
            </div>
            <div className="text-sm text-gray-500 mb-2">
              Passo {groundingStep + 1} de {groundingSteps.length}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentStep.title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{currentStep.description}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((groundingStep + 1) / groundingSteps.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-center text-sm text-gray-600">
              Reserve seu tempo. Não há pressa. Respire fundo e se concentre no presente.
            </div>
          </div>

          <div className="flex space-x-4">
            {groundingStep > 0 && (
              <button
                onClick={prevStep}
                className="px-6 py-4 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Anterior
              </button>
            )}
            <button
              onClick={nextStep}
              className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all shadow-lg"
            >
              {groundingStep === groundingSteps.length - 1 ? 'Concluir' : 'Próximo'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const FavoritesScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Mensagens Favoritas</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma mensagem favorita</h3>
            <p className="text-gray-500">
              Quando você favoritar mensagens especiais, elas aparecerão aqui
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((message, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm relative">
                <button
                  onClick={() => handleRemoveFromFavorites(message)}
                  className="absolute top-4 right-4 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
                <div className="pr-12">
                  <div className="flex items-center mb-3">
                    <Heart className="w-5 h-5 text-red-500 fill-current mr-2" />
                    <span className="text-sm text-gray-500">Mensagem {index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{message}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Perfil</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white font-bold">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
            <p className="text-gray-600">{userBirthDate ? calculateAge(new Date(userBirthDate)) : 0} anos</p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Editar perfil</span>
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={userName}
                  autoFocus
                />
              </div>
              
              <BirthDateSelector 
                value={tempBirthDate} 
                onChange={setTempBirthDate} 
                label="Data de nascimento"
              />

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setTempName('');
                    setTempBirthDate(userBirthDate ? new Date(userBirthDate) : new Date(1999, 0, 1));
                  }}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (tempName.trim()) {
                      setUserName(tempName.trim());
                      setUserBirthDate(tempBirthDate.toISOString());
                      setIsEditing(false);
                      setTempName('');
                    }
                  }}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{dailyUsage.count}</div>
              <div className="text-sm text-gray-600">Cartas abertas hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{moodHistory.length}</div>
              <div className="text-sm text-gray-600">Registros de humor</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{favorites.length}</div>
              <div className="text-sm text-gray-600">Mensagens favoritas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {calculateAverageMood()}%
              </div>
              <div className="text-sm text-gray-600">Humor médio</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  const MoodHistoryScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Histórico de Humor</h1>
        </div>

        {moodHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum registro ainda</h3>
            <p className="text-gray-500">
              Comece registrando seu humor diariamente para ver sua evolução
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Gráfico de Tendência */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Tendência (últimos 14 dias)
                </h3>
                <div className="text-sm text-gray-500">
                  {moodHistory.length} registro{moodHistory.length !== 1 ? 's' : ''}
                </div>
              </div>
              <MoodChart />
            </div>

            {/* Estatísticas Rápidas */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                Resumo
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {calculateAverageMood()}%
                  </div>
                  <div className="text-sm text-gray-600">Humor Médio</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {moodHistory.filter(entry => entry.mood >= 4).length}
                  </div>
                  <div className="text-sm text-gray-600">Dias Bons</div>
                </div>
              </div>
            </div>

            {/* Lista de Registros */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                Registros Recentes
              </h3>
              {[...moodHistory].reverse().slice(0, 20).map((entry, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{moods[entry.mood].emoji}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{moods[entry.mood].label}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(entry.date).toLocaleDateString('pt-BR', { 
                            weekday: 'short', 
                            day: '2-digit', 
                            month: 'short' 
                          })}
                          {entry.time && ` às ${entry.time}`}
                        </div>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      entry.score >= 5 ? 'bg-green-500' : 
                      entry.score >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  {entry.note && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 text-sm italic">"{entry.note}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const InfoScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Sobre o MindWell</h1>
        </div>

        {/* Header da aplicação */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MindWellIcon className="w-60 h-60 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">MindWell</h2>
          <p className="text-gray-600">Seu companheiro para bem-estar mental</p>
          <div className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
            <span className="text-sm font-semibold text-blue-800">Versão 1.0</span>
          </div>
        </div>

        {/* Funcionalidades */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Funcionalidades
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">😊</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Registro de Humor</h4>
                <p className="text-gray-600 text-sm">Acompanhe suas emoções diariamente com 8 opções de humor e adicione notas pessoais.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🧘</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Meditações Guiadas</h4>
                <p className="text-gray-600 text-sm">6 tipos diferentes incluindo respiração 4-4-4, 4-7-8, Box Breathing e Mindfulness.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Apoio Emocional</h4>
                <p className="text-gray-600 text-sm">Técnica 5-4-3-2-1 para ansiedade e contatos de emergência para momentos difíceis.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Volume2 className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Sons Relaxantes</h4>
                <p className="text-gray-600 text-sm">8 ambientes sonoros da natureza com controles de reprodução e volume.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Mensagens Motivacionais</h4>
                <p className="text-gray-600 text-sm">Cartas de motivação a cada hora com sistema de favoritos para suas mensagens especiais.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Histórico e Estatísticas</h4>
                <p className="text-gray-600 text-sm">Acompanhe sua evolução emocional com gráficos de tendência e estatísticas pessoais.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Como usar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            Como Usar
          </h3>
          
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <p>Registre seu humor diário para acompanhar sua evolução emocional</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <p>Use as técnicas de meditação quando precisar relaxar e se centrar</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <p>Recorra ao apoio emocional em momentos de ansiedade ou estresse</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
              <p>Abra uma carta motivacional a cada hora para inspiração diária</p>
            </div>
          </div>
        </div>

        {/* Privacidade */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Privacidade e Segurança</h3>
              <div className="space-y-1 text-sm text-green-700">
                <p>• Todos os dados são armazenados localmente no seu dispositivo</p>
                <p>• Não compartilhamos informações com terceiros</p>
                <p>• Não requeremos cadastro ou login</p>
                <p>• Você tem controle total sobre seus dados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recursos de Emergência */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-red-800 mb-2">Em Caso de Emergência</h3>
              <p className="text-red-700 text-sm mb-2">
                Se você está em crise emocional, procure ajuda profissional imediatamente.
              </p>
              <button
                onClick={() => setCurrentScreen('support')}
                className="inline-flex items-center text-red-600 text-sm font-semibold hover:underline"
              >
                Ver contatos de emergência
                <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
      <div className="max-w-md mx-auto flex justify-around">
        <button 
          onClick={() => setCurrentScreen('home')}
          className={`p-3 rounded-full ${currentScreen === 'home' ? 'bg-blue-100' : ''}`}
        >
          <Heart className={`w-6 h-6 ${currentScreen === 'home' ? 'text-blue-600' : 'text-gray-400'}`} />
        </button>
        
        <button 
          onClick={() => setCurrentScreen('profile')}
          className={`p-3 rounded-full ${currentScreen === 'profile' ? 'bg-green-100' : ''}`}
        >
          <User className={`w-6 h-6 ${currentScreen === 'profile' ? 'text-green-600' : 'text-gray-400'}`} />
        </button>

        <button 
          onClick={() => setCurrentScreen('mood-history')}
          className={`p-3 rounded-full ${currentScreen === 'mood-history' ? 'bg-blue-100' : ''}`}
        >
          <BookOpenIcon className={`w-6 h-6 ${currentScreen === 'mood-history' ? 'text-blue-600' : 'text-gray-400'}`} />
        </button>
      </div>
    </div>
  );


    return (
      <div className="relative pb-20">
        {currentScreen === 'onboarding' && <OnboardingScreen />}
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'mood' && <MoodScreen />}
        {currentScreen === 'breathing' && <BreathingScreen />}
        {currentScreen === 'support' && <SupportScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
        {currentScreen !== 'onboarding' && <BottomNav />}
        {currentScreen === 'sounds' && <SoundsScreen />}
        {currentScreen === 'favorites' && <FavoritesScreen />}
        {currentScreen === 'mood-history' && <MoodHistoryScreen />}
        {currentScreen === 'grounding' && <GroundingScreen />}
        {currentScreen === 'meditation-selection' && <MeditationSelectionScreen />}
        {currentScreen === 'info' && <InfoScreen />}
        <Modal />
      </div>
    );
 };

export default MindWellApp;