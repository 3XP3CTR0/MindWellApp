import { useState } from 'react';
import { Menu, X, HelpCircle, Shield, Volume2, Heart, BarChart3, Mail } from 'lucide-react';
import MindWellIcon from '../components/MindWellIcon';
import Modal from '../components/Modal';
import type {MoodEntry} from '../types';
import { moods } from '../data';

interface HomeScreenProps {
  userName: string;
  mood: number | null;
  moodHistory: MoodEntry[];
  dailyUsage: { date: string; count: number; lastUsed: number; };
  favorites: string[];
  setCurrentScreen: (screen: string) => void;
  handleOpenMessage: () => void;
  showModal: boolean;
  closeModal: () => void;
  currentMessage: string;
  handleAddToFavorites: () => void;
}

const HomeScreen = ({
  userName,
  mood,
  moodHistory,
  dailyUsage,
  setCurrentScreen,
  handleOpenMessage,
  showModal,
  closeModal,
  currentMessage,
  handleAddToFavorites,
  favorites
}: HomeScreenProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const calculateAverageMood = () => {
    if (moodHistory.length === 0) return 0;
    const average = moodHistory.reduce((sum, entry) => sum + entry.score, 0) / moodHistory.length;
    return Math.round((average / 8) * 100);
  };

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return null;
    
    const recent = moodHistory.slice(-7); // Últimos 7 dias
    const average = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    
    if (average >= 5.5) return 'positive';
    if (average >= 3.5) return 'neutral';
    return 'negative';
  };

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
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            <div 
              className={`absolute top-16 right-4 w-72 bg-white rounded-2xl shadow-2xl z-50 
                        transform transition-all duration-300 ease-out border border-gray-100
                        ${showMenu ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-2'}`}
            >
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

              <button
                onClick={() => setCurrentScreen('mood')}
                className="w-full bg-blue-50 hover:bg-blue-100 rounded-xl p-4 text-left transition-colors flex items-center space-x-3 mt-4"
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
                {moodHistory.filter(entry => entry.score >= 5).length}
              </div>
              <div className="text-sm text-gray-600">Dias Bons</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100 mt-4">
          <div className="text-center">
            <div className="text-2xl mb-3">💫</div>
            <p className="text-gray-700 font-medium italic leading-relaxed">
              {getMotivationalQuote()}
            </p>
          </div>
        </div>

        
      </div>
      
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

      <Modal 
        showModal={showModal}
        closeModal={closeModal}
        currentMessage={currentMessage}
        handleAddToFavorites={handleAddToFavorites}
        favorites={favorites}
      />
    </div>
  );
};

export default HomeScreen;