import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Music, Target, Heart, BookOpen, Edit3 } from 'lucide-react';

const MindWellApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [mood, setMood] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">MindWell</h1>
        <h2 className="text-xl text-gray-700 mb-8">Olá, João<br />Como você está hoje?</h2>
        
        <div className="space-y-4">
          <button 
            onClick={() => setCurrentScreen('mood')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">😐</span>
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-800">Humor de hoje</div>
              <div className="text-gray-500 text-sm">Neutro</div>
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
            onClick={() => setCurrentScreen('journal')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-medium text-gray-800">Ver diário</span>
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
          {['😊', '🙂', '😐', '😔'].map((emoji, index) => (
            <button
              key={index}
              onClick={() => setMood(index)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all ${
                mood === index ? 'bg-blue-300 scale-110' : 'bg-white hover:bg-gray-50'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-medium text-gray-700 mb-4">Quer escrever algo?</h3>
        
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Hoje me sinto mais cansado que o normal..."
            className="w-full h-20 bg-transparent resize-none outline-none text-gray-700"
          />
        </div>

        <button 
          onClick={() => setCurrentScreen('home')}
          className="w-full bg-blue-500 text-white py-4 rounded-2xl font-medium hover:bg-blue-600 transition-colors"
        >
          Salvar
        </button>
      </div>
    </div>
  );

  const BreathingScreen = () => {
    const [breathing, setBreathing] = useState({ active: false, phase: 'inhale', count: 4 });
    const [breathingTimer, setBreathingTimer] = useState(null);

    // Técnica 4-4-4 de respiração
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
            <span className="font-medium text-gray-800">Respiracao de Emergencia</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="font-medium text-gray-800">Tecnica de Aterramento</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
              <Music className="w-6 h-6 text-green-600" />
            </div>
            <span className="font-medium text-gray-800">Musica Calmante</span>
          </button>
        </div>

        <p className="text-gray-600 text-center mt-8">
          Você não está sozinho.<br />
          Essa sensação vai passar.
        </p>
      </div>
    </div>
  );

  const JournalScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">MindWell</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-700">Meu Diário</h2>
          <button 
            onClick={() => setCurrentScreen('mood')}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">26 Jul 2025</span>
              <span className="text-2xl">😐</span>
            </div>
            <p className="text-gray-700">
              {journalEntry || "Hoje me sinto mais cansado que o normal. Preciso cuidar melhor do meu sono e talvez fazer mais exercícios."}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">25 Jul 2025</span>
              <span className="text-2xl">🙂</span>
            </div>
            <p className="text-gray-700">
              Dia produtivo no trabalho. Consegui terminar o projeto que estava me preocupando. Me sinto mais confiante.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">24 Jul 2025</span>
              <span className="text-2xl">😔</span>
            </div>
            <p className="text-gray-700">
              Dia difícil. Muita ansiedade sobre o futuro. Usei a técnica de respiração 4-4-4 e ajudou um pouco.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Menu inferior com navegação
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
          onClick={() => setCurrentScreen('journal')}
          className={`p-3 rounded-full ${currentScreen === 'journal' ? 'bg-blue-100' : ''}`}
        >
          <BookOpen className={`w-6 h-6 ${currentScreen === 'journal' ? 'text-blue-600' : 'text-gray-400'}`} />
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
      </div>
    </div>
  );

  return (
    <div className="relative pb-20">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'mood' && <MoodScreen />}
      {currentScreen === 'breathing' && <BreathingScreen />}
      {currentScreen === 'sos' && <SOSScreen />}
      {currentScreen === 'journal' && <JournalScreen />}
      <BottomNav />
    </div>
  );
};

export default MindWellApp;