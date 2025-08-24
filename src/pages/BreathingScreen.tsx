import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Play, Pause } from 'lucide-react';
import { meditationTypes } from '../data';

interface BreathingScreenProps {
  setCurrentScreen: (screen: string) => void;
  selectedMeditation: string;
}

const BreathingScreen = ({ setCurrentScreen, selectedMeditation }: BreathingScreenProps) => {
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
    <div className="min-h-screen p-6">
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

export default BreathingScreen;