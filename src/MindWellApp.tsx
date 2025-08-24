import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import type {MoodEntry} from './types';
import { moods } from './data';

import OnboardingScreen from './pages/OnboardingScreen';
import HomeScreen from './pages/HomeScreen';
import MoodScreen from './pages/MoodScreen';
import MeditationSelectionScreen from './pages/MeditationSelectionScreen';
import BreathingScreen from './pages/BreathingScreen';
import SoundsScreen from './pages/SoundsScreen';
import SupportScreen from './pages/SupportScreen';
import GroundingScreen from './pages/GroundingScreen';
import FavoritesScreen from './pages/FavoritesScreen';
import ProfileScreen from './pages/ProfileScreen';
import MoodHistoryScreen from './pages/MoodHistoryScreen';
import BottomNavBar from './components/BottomNavBar';
import InfoScreen from './pages/InfoScreen';

const MindWellApp = () => {
  const [userName, setUserName] = useLocalStorage('userName', '');
  const [userBirthDate, setUserBirthDate] = useLocalStorage('userBirthDate', '');
  const [moodHistory, setMoodHistory] = useLocalStorage<MoodEntry[]>('moodHistory', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [dailyUsage, setDailyUsage] = useLocalStorage('dailyUsage', { date: new Date().toDateString(), count: 0, lastUsed: 0 });
  
  const [currentScreen, setCurrentScreen] = useState(() => (userName ? 'home' : 'onboarding'));
  const [mood, setMood] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedMeditation, setSelectedMeditation] = useState('');
  const [groundingStep, setGroundingStep] = useState(0);
  const [, setCurrentMoodNote] = useState('');

  const completeOnboarding = (name: string, birthDate: Date) => {
    setUserName(name);
    setUserBirthDate(birthDate.toISOString());
    setCurrentScreen('home');
  };

  const handleMoodSelection = (moodIndex: number, note: string = '') => {
    setMood(moodIndex);
    setCurrentMoodNote(note);
    
    const now = new Date();
    const newEntry: MoodEntry = { 
      date: now.toISOString(), 
      mood: moodIndex, 
      score: moods[moodIndex].score, 
      note,
      timestamp: now.getTime(),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMoodHistory(prev => [...prev, newEntry]);
  };

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
    const moodMessages = moods[mood].messages;
    const randomIndex = Math.floor(Math.random() * moodMessages.length);
    const message = moodMessages[randomIndex];
    setCurrentMessage(message);
    setShowModal(true);
    setDailyUsage(prev => ({ ...prev, lastUsed: now, count: prev.count + 1 }));
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentMessage('');
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

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen completeOnboarding={completeOnboarding} />;
      case 'home':
        return <HomeScreen 
          userName={userName}
          mood={mood}
          moodHistory={moodHistory}
          dailyUsage={dailyUsage}
          favorites={favorites}
          setCurrentScreen={setCurrentScreen}
          handleOpenMessage={handleOpenMessage}
          showModal={showModal}
          closeModal={closeModal}
          currentMessage={currentMessage}
          handleAddToFavorites={handleAddToFavorites}
        />;
      case 'mood':
        return <MoodScreen 
          mood={mood}
          setCurrentScreen={setCurrentScreen}
          handleMoodSelection={handleMoodSelection}
        />;
      case 'meditation-selection':
        return <MeditationSelectionScreen 
          setCurrentScreen={setCurrentScreen}
          setSelectedMeditation={setSelectedMeditation}
        />;
      case 'breathing':
        return <BreathingScreen 
          setCurrentScreen={setCurrentScreen}
          selectedMeditation={selectedMeditation}
        />;
      case 'sounds':
        return <SoundsScreen setCurrentScreen={setCurrentScreen} />;
      case 'support':
        return <SupportScreen 
          setCurrentScreen={setCurrentScreen}
          setGroundingStep={setGroundingStep}
        />;
      case 'grounding':
        return <GroundingScreen 
          setCurrentScreen={setCurrentScreen}
          groundingStep={groundingStep}
          setGroundingStep={setGroundingStep}
        />;
      case 'favorites':
        return <FavoritesScreen 
          setCurrentScreen={setCurrentScreen}
          favorites={favorites}
          handleRemoveFromFavorites={handleRemoveFromFavorites}
        />;
      case 'profile':
        return <ProfileScreen
          setCurrentScreen={setCurrentScreen}
          userName={userName}
          userBirthDate={userBirthDate}
          setUserName={setUserName}
          setUserBirthDate={setUserBirthDate}
          dailyUsage={dailyUsage}
          moodHistory={moodHistory}
          favorites={favorites}
        />;
      case 'mood-history':
        return <MoodHistoryScreen 
          setCurrentScreen={setCurrentScreen}
          moodHistory={moodHistory}
        />;
      case 'info':
        return <InfoScreen setCurrentScreen={setCurrentScreen} />;
      default:
        return <HomeScreen 
          userName={userName}
          mood={mood}
          moodHistory={moodHistory}
          dailyUsage={dailyUsage}
          favorites={favorites}
          setCurrentScreen={setCurrentScreen}
          handleOpenMessage={handleOpenMessage}
          showModal={showModal}
          closeModal={closeModal}
          currentMessage={currentMessage}
          handleAddToFavorites={handleAddToFavorites}
        />;
    }
  };

  const showNavBar = ['home', 'mood-history', 'meditation-selection', 'profile'].includes(currentScreen);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100" style={{ paddingBottom: showNavBar ? '80px' : '0' }}>
      {renderScreen()}
      {showNavBar && <BottomNavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />}
    </div>
  );
};

export default MindWellApp;