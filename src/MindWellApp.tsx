// @ts-nocheck
import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Music, Target, Heart, User, Edit3, Mail, X } from 'lucide-react';

const MindWellApp = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [mood, setMood] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [tempName, setTempName] = useState('');
  const [tempAge, setTempAge] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dailyUsage, setDailyUsage] = useState({ date: new Date().toDateString(), count: 0 });

  // Array com emojis, labels e mensagens de apoio
  const moods = [
    { emoji: '😊', label: 'Feliz', message: 'Que ótimo que você está se sentindo feliz! Continue espalhando essa energia positiva.' },
    { emoji: '🙂', label: 'Bem', message: 'Legal! Que seu dia continue tranquilo e cheio de coisas boas.' },
    { emoji: '😐', label: 'Neutro', message: 'Tudo bem ter dias neutros. Às vezes a calma também é necessária.' },
    { emoji: '😔', label: 'Triste', message: 'Sinto muito que você esteja triste. Lembre-se que isso também vai passar, e você não está sozinho.' },
  ];

  const positiveMessages = [
    "Você é mais forte do que pensa.",
    "Cada dia é uma nova oportunidade.",
    "Acredite em você, sempre!",
    "Coisas boas levam tempo. Confie.",
    "Você já é uma vitória só por tentar.",
    "Sua jornada é única e valiosa.",
    "Pequenos passos levam a grandes conquistas.",
    "Você tem o poder de transformar seu dia.",
    "A vida é feita de momentos especiais.",
    "Você merece todo o amor do mundo."
  ];

  const handleOpenMessage = () => {
    const today = new Date().toDateString();
    
    // Resetar contador se for um novo dia
    if (dailyUsage.date !== today) {
      setDailyUsage({ date: today, count: 0 });
    }
    
    // Verificar se já usou 2 vezes hoje
    if (dailyUsage.count >= 2) {
      alert('Você já abriu 2 cartas hoje! 🌙\nVolte amanhã para mais mensagens especiais.');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * positiveMessages.length);
    const message = positiveMessages[randomIndex];
    setCurrentMessage(message);
    setShowModal(true);
    
    // Incrementar contador de uso
    setDailyUsage(prev => ({ ...prev, count: prev.count + 1 }));
  };

  const handleAddToFavorites = () => {
    if (currentMessage) {
      if (favorites.includes(currentMessage)) {
        // Remove dos favoritos se já estiver favoritado
        setFavorites(favorites.filter(fav => fav !== currentMessage));
      } else {
        // Adiciona aos favoritos se não estiver
        setFavorites([...favorites, currentMessage]);
      }
    }
  };

  const handleRemoveFromFavorites = (message: string) => {
    setFavorites(favorites.filter(fav => fav !== message));
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentMessage('');
  };

  // Função para completar o onboarding
  const completeOnboarding = () => {
    if (tempName.trim() && tempAge.trim()) {
      setUserName(tempName.trim());
      setUserAge(tempAge.trim());
      setIsFirstTime(false);
      setCurrentScreen('home');
      setTempName('');
      setTempAge('');
    } else {
      alert('Por favor, preencha todos os campos para continuar.');
    }
  };

  // Modal Component
  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-blue-100 relative overflow-hidden">
          {/* Decoração de fundo */}
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
            <Heart className="w-10 h-10 text-white" />
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
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
                maxLength={30}
                autoComplete="given-name"
              />
            </div>

            <div>
              <label htmlFor="onboarding-age" className="block text-sm font-semibold text-gray-700 mb-3">
                Qual sua idade?
              </label>
              <input
                id="onboarding-age"
                type="number"
                value={tempAge}
                onChange={(e) => setTempAge(e.target.value)}
                placeholder="Digite sua idade"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
                min="1"
                max="120"
                autoComplete="age"
              />
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-blue-700 text-sm text-center">
                <span className="font-semibold">🔒 Suas informações são privadas</span><br />
                Não compartilhamos seus dados com terceiros
              </p>
            </div>

            <button
              onClick={completeOnboarding}
              disabled={!tempName.trim() || !tempAge.trim()}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${
                tempName.trim() && tempAge.trim()
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

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">MindWell</h1>
        </div>
        
        <h2 className="text-xl text-gray-700 mb-4">Olá, {userName}!<br />Como você está hoje?</h2>

        {mood !== null && (
          <div className="mb-6 p-4 bg-white rounded-xl shadow-sm text-center">
            <span className="text-6xl">{moods[mood].emoji}</span>
            <p className="mt-2 text-gray-700 text-lg font-semibold">{moods[mood].label}</p>
            <p className="mt-1 text-gray-600">{moods[mood].message}</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => setCurrentScreen('mood')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">{mood !== null ? moods[mood].emoji : '😐'}</span>
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-800">Humor de hoje</div>
              <div className="text-gray-500 text-sm">{mood !== null ? moods[mood].label : 'Neutro'}</div>
            </div>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('breathing')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
              <span className="text-blue-600">💨</span>
            </div>
            <span className="font-medium text-gray-800">Meditar agora</span>
          </button>

          <button 
            onClick={() => setCurrentScreen('sos')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <span className="font-medium text-gray-800">Desafio diário</span>
          </button>
        </div>
      </div>
      
      {/* Botão fixo da carta positiva */}
      <button
        onClick={handleOpenMessage}
        className={`fixed right-4 top-[60%] z-40 p-4 rounded-full shadow-xl border-2 transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
          dailyUsage.date === new Date().toDateString() && dailyUsage.count >= 2
            ? 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 border-white hover:shadow-2xl hover:shadow-purple-300'
        }`}
        aria-label="Abrir carta positiva"
        disabled={dailyUsage.date === new Date().toDateString() && dailyUsage.count >= 2}
      >
        <Mail className={`w-7 h-7 ${
          dailyUsage.date === new Date().toDateString() && dailyUsage.count >= 2
            ? 'text-gray-400'
            : 'text-white drop-shadow-lg'
        }`} />
        {/* Indicador de usos restantes */}
        {dailyUsage.date === new Date().toDateString() && dailyUsage.count < 2 && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
            {2 - dailyUsage.count}
          </div>
        )}
        {/* Efeito de brilho */}
        {!(dailyUsage.date === new Date().toDateString() && dailyUsage.count >= 2) && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
        )}
      </button>
    </div>
  );

  const ProfileScreen = () => {
    const handleStartEdit = () => {
      setIsEditing(true);
      setTempName(userName);
      setTempAge(userAge);
    };

    const handleSave = () => {
      if (tempName.trim() && tempAge.trim()) {
        setUserName(tempName.trim());
        setUserAge(tempAge.trim());
        setIsEditing(false);
        setTempName('');
        setTempAge('');
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    };

    const handleCancel = () => {
      setIsEditing(false);
      setTempName('');
      setTempAge('');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => setCurrentScreen('home')} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">MindWell</h1>
          </div>

          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Olá, {userName}!</h2>
            <p className="text-gray-600">Personalize seu perfil</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Suas informações</h3>
              <Edit3 className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {!isEditing ? (
                <>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <span className="text-sm text-gray-500 block">Nome</span>
                      <span className="text-lg text-gray-700 font-medium">{userName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <span className="text-sm text-gray-500 block">Idade</span>
                      <span className="text-lg text-gray-700 font-medium">{userAge} anos</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleStartEdit}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors mt-4"
                  >
                    Editar informações
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                    <input
                      id="profile-name"
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength={30}
                      autoComplete="given-name"
                      autoFocus
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profile-age" className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
                    <input
                      id="profile-age"
                      type="number"
                      value={tempAge}
                      onChange={(e) => setTempAge(e.target.value)}
                      placeholder="Digite sua idade"
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      max="120"
                      autoComplete="age"
                    />
                  </div>
                  
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Seção de Favoritos */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <h3 className="text-lg font-semibold text-gray-800">Mensagens Favoritas</h3>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                  {favorites.length}
                </span>
              </div>
              {/* Contador de cartas do dia */}
              <div className="text-right">
                <div className="text-xs text-gray-500">Cartas hoje</div>
                <div className="text-sm font-semibold text-blue-600">
                  {dailyUsage.date === new Date().toDateString() ? dailyUsage.count : 0}/2
                </div>
              </div>
            </div>
            
            {favorites.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                Nenhuma mensagem favoritada ainda.<br />
                Clique na carta positiva e favorite suas mensagens preferidas!
              </p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {favorites.map((message, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Heart className="w-4 h-4 text-red-500 fill-current mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm flex-1 italic">"{message}"</p>
                    <button
                      onClick={() => handleRemoveFromFavorites(message)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sobre o MindWell</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              O MindWell é seu companheiro de bem-estar mental. Aqui você pode acompanhar seu humor, 
              praticar exercícios de respiração e encontrar apoio emocional quando precisar.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const MoodScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">MindWell</h1>
        </div>

        <h2 className="text-xl text-gray-700 mb-8">Como você está se sentindo hoje?</h2>

        <div className="flex justify-between mb-8">
          {moods.map((m, index) => (
            <button
              key={index}
              onClick={() => setMood(index)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all ${
                mood === index ? 'bg-blue-300 scale-110' : 'bg-white hover:bg-gray-50'
              }`}
              aria-label={m.label}
            >
              {m.emoji}
            </button>
          ))}
        </div>

        <button 
          onClick={() => {
            if (mood !== null) {
              setCurrentScreen('home');
            } else {
              alert('Por favor, selecione um humor para continuar.');
            }
          }}
          className="w-full bg-blue-500 text-white py-4 rounded-2xl font-medium hover:bg-blue-600 transition-colors"
        >
          Confirmar
        </button>
      </div>
    </div>
  );

  const BreathingScreen = () => {
    const [breathing, setBreathing] = useState({ active: false, phase: 'inhale', count: 4 });
    const [breathingTimer, setBreathingTimer] = useState<typeof setInterval | null>(null);

    useEffect(() => {
      if (breathing.active) {
        const timer = setInterval(() => {
          setBreathing(prev => {
            if (prev.count > 1) {
              return { ...prev, count: prev.count - 1 };
            } else {
              const nextPhase = prev.phase === 'inhale' ? 'hold' :
                                prev.phase === 'hold' ? 'exhale' : 'inhale';
              return { ...prev, phase: nextPhase, count: 4 };
            }
          });
        }, 1000);
        setBreathingTimer(timer);
      } else {
        if (breathingTimer) clearInterval(breathingTimer);
      }

      return () => {
        if (breathingTimer) clearInterval(breathingTimer);
      };
    }, [breathing.active]);

    const getPhaseText = () => {
      switch (breathing.phase) {
        case 'inhale': return 'Inspirar';
        case 'hold': return 'Segurar';
        case 'exhale': return 'Expirar';
        default: return 'Inspirar';
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => {
              setBreathing({ active: false, phase: 'inhale', count: 4 });
              setCurrentScreen('home');
            }} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">MindWell</h1>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-8">Técnica 4-4-4</h2>

            <div className="relative mb-8">
              <div className={`w-48 h-48 mx-auto rounded-full bg-blue-300 flex items-center justify-center transition-all duration-1000 ${
                breathing.active ? (breathing.phase === 'inhale' ? 'scale-110' : breathing.phase === 'hold' ? 'scale-105' : 'scale-95') : ''
              }`}>
                <span className="text-6xl font-bold text-white">{breathing.count}</span>
              </div>
            </div>

            <h3 className="text-2xl font-medium text-gray-700 mb-2">{getPhaseText()}</h3>

            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setBreathing(prev => ({ ...prev, active: false }))}
                className="px-6 py-3 bg-white rounded-2xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Pausar
              </button>
              <button
                onClick={() => setBreathing(prev => ({ ...prev, active: !prev.active }))}
                className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-medium hover:bg-blue-600 transition-colors"
              >
                {breathing.active ? 'Pausar' : 'Começar'} exercício
              </button>
            </div>

            <p className="text-gray-600 text-center">
              Você não está sozinho.<br />
              Essa sensação vai passar.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const SOSScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">MindWell</h1>
        </div>

        <h2 className="text-xl text-gray-700 mb-2">Você está em um momento difícil?</h2>
        <p className="text-gray-600 mb-8">Respire, estamos com você.</p>

        <div className="space-y-4">
          <button 
            onClick={() => setCurrentScreen('breathing')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-medium text-gray-800">Respiração de Emergência</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="font-medium text-gray-800">Técnica de Aterramento</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
              <Music className="w-6 h-6 text-green-600" />
            </div>
            <span className="font-medium text-gray-800">Música Calmante</span>
          </button>
        </div>

        <p className="text-gray-600 text-center mt-8">
          Você não está sozinho.<br />
          Essa sensação vai passar.
        </p>
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
          onClick={() => setCurrentScreen('sos')}
          className={`p-3 rounded-full ${currentScreen === 'sos' ? 'bg-red-100' : ''}`}
        >
          <span className={`text-lg font-bold ${currentScreen === 'sos' ? 'text-red-600' : 'text-gray-400'}`}>SOS</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('profile')}
          className={`p-3 rounded-full ${currentScreen === 'profile' ? 'bg-green-100' : ''}`}
        >
          <User className={`w-6 h-6 ${currentScreen === 'profile' ? 'text-green-600' : 'text-gray-400'}`} />
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
      {currentScreen === 'sos' && <SOSScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
      {currentScreen !== 'onboarding' && <BottomNav />}
      <Modal />
    </div>
  );
};

export default MindWellApp;
