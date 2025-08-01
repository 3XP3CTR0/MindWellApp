import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Music, Target, Heart, User, Edit3 } from 'lucide-react';

const MindWellApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [mood, setMood] = useState<number | null>(null);
  const [userName, setUserName] = useState('João');
  const [tempName, setTempName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Array com emojis, labels e mensagens de apoio
  const moods = [
    { emoji: '😊', label: 'Feliz', message: 'Que ótimo que você está se sentindo feliz! Continue espalhando essa energia positiva.' },
    { emoji: '🙂', label: 'Bem', message: 'Legal! Que seu dia continue tranquilo e cheio de coisas boas.' },
    { emoji: '😐', label: 'Neutro', message: 'Tudo bem ter dias neutros. Às vezes a calma também é necessária.' },
    { emoji: '😔', label: 'Triste', message: 'Sinto muito que você esteja triste. Lembre-se que isso também vai passar, e você não está sozinho.' },
  ];

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">MindWell</h1>
          <button 
            onClick={() => setCurrentScreen('profile')}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-50 transition-colors"
          >
            <User className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <h2 className="text-xl text-gray-700 mb-4">Olá, {userName}<br />Como você está hoje?</h2>

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
            <span className="font-medium text-gray-800">SOS Emocional</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <span className="font-medium text-gray-800">Abrir carta positiva</span>
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileScreen = () => {
    const handleStartEdit = () => {
      setIsEditing(true);
      setTempName(userName);
    };

    const handleSave = () => {
      if (tempName.trim()) {
        setUserName(tempName.trim());
        setIsEditing(false);
        setTempName('');
        setCurrentScreen('home');
      }
    };

    const handleCancel = () => {
      setIsEditing(false);
      setTempName('');
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
              <h3 className="text-lg font-semibold text-gray-800">Seu nome</h3>
              <Edit3 className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {!isEditing ? (
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-700">{userName}</span>
                  <button
                    onClick={handleStartEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    Editar
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Digite seu nome"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                  
                  <div className="flex space-x-3">
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
    const [breathingTimer, setBreathingTimer] = useState<NodeJS.Timeout | null>(null);

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
          onClick={() => setCurrentScreen('breathing')}
          className={`p-3 rounded-full ${currentScreen === 'breathing' ? 'bg-blue-100' : ''}`}
        >
          <Target className={`w-6 h-6 ${currentScreen === 'breathing' ? 'text-blue-600' : 'text-gray-400'}`} />
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
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'mood' && <MoodScreen />}
      {currentScreen === 'breathing' && <BreathingScreen />}
      {currentScreen === 'sos' && <SOSScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
      <BottomNav />
    </div>
  );
};

export default MindWellApp;