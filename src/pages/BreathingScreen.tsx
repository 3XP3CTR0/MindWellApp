import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, Play, Pause, Settings, RotateCcw, Timer, Heart } from 'lucide-react';
import { meditationTypes } from '../data';

interface BreathingScreenProps {
  setCurrentScreen: (screen: string) => void;
  selectedMeditation: string;
}

const BreathingScreen = ({ setCurrentScreen, selectedMeditation }: BreathingScreenProps) => {
  const [breathing, setBreathing] = useState({ 
    active: false, 
    phase: 'prepare', 
    count: 3,
    cycle: 0 
  });
  const [sessionSettings, setSessionSettings] = useState({
    duration: 5, // minutos
    voiceGuidance: true,
    visualStyle: 'circle', // circle, wave, flower
    showProgress: true
  });
  const [sessionProgress, setSessionProgress] = useState({
    elapsed: 0,
    totalCycles: 0,
    currentCycle: 0
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [, setSessionStartTime] = useState<Date | null>(null);
  
  const breathingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  const selectedMeditationType = meditationTypes.find(m => m.id === selectedMeditation) || meditationTypes[0];

  // Função para criar sons de respiração suaves
  const playBreathingSound = (frequency: number, duration: number) => {
    if (!sessionSettings.voiceGuidance) return;
    
    try {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContext.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  interface BreathingPattern {
    prepare: number;
    inhale: number;
    exhale: number;
    hold: number;
    hold1: number;
    hold2: number;
  }

  const getBreathingPattern = (): BreathingPattern => {
    switch (selectedMeditation) {
      case 'breathing-478':
        return { prepare: 3, inhale: 4, hold: 7, exhale: 8, hold1: 0, hold2: 0 };
      case 'box-breathing':
        return { prepare: 3, inhale: 4, hold: 0, exhale: 4, hold1: 4, hold2: 4 };
      default:
        return { prepare: 3, inhale: 4, hold: 4, exhale: 4, hold1: 0, hold2: 0 };
    }
  };

  const startSession = () => {
    setSessionStartTime(new Date());
    setBreathing({ active: true, phase: 'prepare', count: 3, cycle: 0 });
    setSessionProgress({ elapsed: 0, totalCycles: 0, currentCycle: 0 });
    setIsSessionComplete(false);

    // Timer da sessão
    sessionTimer.current = setInterval(() => {
      setSessionProgress(prev => {
        const newElapsed = prev.elapsed + 1;
        if (newElapsed >= sessionSettings.duration * 60) {
          completeSession();
          return prev;
        }
        return { ...prev, elapsed: newElapsed };
      });
    }, 1000);
  };

  const completeSession = () => {
    if (breathingTimer.current) clearInterval(breathingTimer.current);
    if (sessionTimer.current) clearInterval(sessionTimer.current);
    
    setBreathing(prev => ({ ...prev, active: false }));
    setIsSessionComplete(true);
    
    // Som de conclusão
    playBreathingSound(523, 1); // C5 note
  };

  const resetSession = () => {
    if (breathingTimer.current) clearInterval(breathingTimer.current);
    if (sessionTimer.current) clearInterval(sessionTimer.current);
    
    setBreathing({ active: false, phase: 'prepare', count: 3, cycle: 0 });
    setSessionProgress({ elapsed: 0, totalCycles: 0, currentCycle: 0 });
    setIsSessionComplete(false);
    setSessionStartTime(null);
  };

  useEffect(() => {
    if (!breathing.active) return;

    const pattern = getBreathingPattern();
    
    breathingTimer.current = setInterval(() => {
      setBreathing(prev => {
        if (prev.count > 1) {
          return { ...prev, count: prev.count - 1 };
        }

        // Transição de fase
        let nextPhase = '';
        let nextCount = 1;
        let newCycle = prev.cycle;

        if (prev.phase === 'prepare') {
          nextPhase = 'inhale';
          nextCount = pattern.inhale;
          playBreathingSound(220, 0.3); // Som suave para início
        } else if (selectedMeditation === 'box-breathing') {
          if (prev.phase === 'inhale') { 
            nextPhase = 'hold1'; 
            nextCount = pattern.hold1; 
            playBreathingSound(330, 0.2);
          }
          else if (prev.phase === 'hold1') { 
            nextPhase = 'exhale'; 
            nextCount = pattern.exhale; 
            playBreathingSound(220, 0.3);
          }
          else if (prev.phase === 'exhale') { 
            nextPhase = 'hold2'; 
            nextCount = pattern.hold2; 
          }
          else { 
            nextPhase = 'inhale'; 
            nextCount = pattern.inhale; 
            newCycle = prev.cycle + 1;
            playBreathingSound(440, 0.2);
          }
        } else if (selectedMeditation === 'breathing-478') {
          if (prev.phase === 'inhale') { 
            nextPhase = 'hold'; 
            nextCount = pattern.hold; 
            playBreathingSound(330, 0.2);
          }
          else if (prev.phase === 'hold') { 
            nextPhase = 'exhale'; 
            nextCount = pattern.exhale; 
            playBreathingSound(220, 0.4);
          }
          else { 
            nextPhase = 'inhale'; 
            nextCount = pattern.inhale; 
            newCycle = prev.cycle + 1;
            playBreathingSound(440, 0.2);
          }
        } else { // basic breathing
          if (prev.phase === 'inhale') { 
            nextPhase = 'hold'; 
            nextCount = pattern.hold; 
            playBreathingSound(330, 0.2);
          }
          else if (prev.phase === 'hold') { 
            nextPhase = 'exhale'; 
            nextCount = pattern.exhale; 
            playBreathingSound(220, 0.3);
          }
          else { 
            nextPhase = 'inhale'; 
            nextCount = pattern.inhale; 
            newCycle = prev.cycle + 1;
            playBreathingSound(440, 0.2);
          }
        }

        // Atualizar progresso do ciclo
        if (newCycle !== prev.cycle) {
          setSessionProgress(p => ({ 
            ...p, 
            totalCycles: p.totalCycles + 1,
            currentCycle: newCycle 
          }));
        }

        return { ...prev, phase: nextPhase, count: nextCount, cycle: newCycle };
      });
    }, 1000);

    return () => {
      if (breathingTimer.current) clearInterval(breathingTimer.current);
    };
  }, [breathing.active, selectedMeditation, sessionSettings.voiceGuidance]);

  const getPhaseText = () => {
    switch (breathing.phase) {
      case 'prepare': return 'Prepare-se';
      case 'inhale': return 'Inspire';
      case 'hold':
      case 'hold1': return 'Segure';
      case 'hold2': return 'Pause';
      case 'exhale': return 'Expire';
      default: return 'Relaxe';
    }
  };

  const getPhaseInstruction = () => {
    switch (breathing.phase) {
      case 'prepare': return 'Posicione-se confortavelmente';
      case 'inhale': return 'Inspire lenta e profundamente pelo nariz';
      case 'hold':
      case 'hold1': return 'Mantenha o ar nos pulmões';
      case 'hold2': return 'Pause antes da próxima respiração';
      case 'exhale': return 'Expire lentamente pela boca';
      default: return 'Concentre-se na sua respiração';
    }
  };

  const getVisualization = () => {
    const baseSize = 192; // w-48 h-48
    let scale = 1;
    
    if (breathing.active) {
      if (breathing.phase === 'inhale') scale = 1.2;
      else if (breathing.phase.includes('hold')) scale = 1.1;
      else if (breathing.phase === 'exhale') scale = 0.9;
    }

    const size = baseSize * scale;
    const opacity = breathing.phase === 'prepare' ? 0.7 : 1;

    if (sessionSettings.visualStyle === 'circle') {
      return (
        <div 
          className={`mx-auto rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center transition-all duration-1000 shadow-2xl relative`}
          style={{ width: `${size}px`, height: `${size}px`, opacity }}
        >
          <span className="text-6xl font-bold text-white drop-shadow-lg">{breathing.count}</span>
          {breathing.active && (
            <div className="absolute inset-0 rounded-full border-4 border-white opacity-40 animate-pulse"></div>
          )}
        </div>
      );
    } else if (sessionSettings.visualStyle === 'wave') {
      return (
        <div className="relative">
          <div 
            className={`mx-auto rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 flex items-center justify-center transition-all duration-1000 shadow-2xl`}
            style={{ width: `${size}px`, height: `${size}px`, opacity }}
          >
            <span className="text-6xl font-bold text-white drop-shadow-lg">{breathing.count}</span>
          </div>
          {breathing.active && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-teal-300 opacity-30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-2 border-cyan-300 opacity-20 animate-ping animation-delay-1000"></div>
            </>
          )}
        </div>
      );
    } else { // flower
      return (
        <div className="relative">
          <div 
            className={`mx-auto rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 flex items-center justify-center transition-all duration-1000 shadow-2xl relative overflow-hidden`}
            style={{ width: `${size}px`, height: `${size}px`, opacity }}
          >
            <span className="text-6xl font-bold text-white drop-shadow-lg z-10 relative">{breathing.count}</span>
            {breathing.active && (
              <div className="absolute inset-4 rounded-full bg-white opacity-10 animate-pulse"></div>
            )}
          </div>
        </div>
      );
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = sessionSettings.duration > 0 
    ? (sessionProgress.elapsed / (sessionSettings.duration * 60)) * 100 
    : 0;

  if (isSessionComplete) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-blue-50">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sessão Concluída!</h2>
            <p className="text-gray-600">Parabéns por dedicar tempo ao seu bem-estar</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{formatTime(sessionProgress.elapsed)}</div>
                <div className="text-sm text-gray-500">Tempo meditado</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{sessionProgress.totalCycles}</div>
                <div className="text-sm text-gray-500">Ciclos respiratórios</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={resetSession}
              className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Nova Sessão</span>
            </button>
            
            <button
              onClick={() => setCurrentScreen('meditation-selection')}
              className="w-full px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button onClick={() => {
              resetSession();
              setCurrentScreen('meditation-selection');
            }} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">MindWell</h1>
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-50 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <h3 className="font-medium text-gray-800 mb-4">Configurações da Sessão</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Duração (minutos)</label>
                <select 
                  value={sessionSettings.duration}
                  onChange={(e) => setSessionSettings(prev => ({...prev, duration: Number(e.target.value)}))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                >
                  <option value={2}>2 minutos</option>
                  <option value={5}>5 minutos</option>
                  <option value={10}>10 minutos</option>
                  <option value={15}>15 minutos</option>
                  <option value={20}>20 minutos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Estilo Visual</label>
                <select 
                  value={sessionSettings.visualStyle}
                  onChange={(e) => setSessionSettings(prev => ({...prev, visualStyle: e.target.value as any}))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                >
                  <option value="circle">Círculo Clássico</option>
                  <option value="wave">Ondas Zen</option>
                  <option value="flower">Flor de Lótus</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sons guia</span>
                <button
                  onClick={() => setSessionSettings(prev => ({...prev, voiceGuidance: !prev.voiceGuidance}))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    sessionSettings.voiceGuidance ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    sessionSettings.voiceGuidance ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mostrar progresso</span>
                <button
                  onClick={() => setSessionSettings(prev => ({...prev, showProgress: !prev.showProgress}))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    sessionSettings.showProgress ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    sessionSettings.showProgress ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {sessionSettings.showProgress && breathing.active && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progresso da sessão</span>
              <span className="text-sm text-gray-600">
                {formatTime(sessionProgress.elapsed)} / {formatTime(sessionSettings.duration * 60)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-700 mb-2">{selectedMeditationType.name}</h2>
          <p className="text-gray-600 text-sm mb-8">{getPhaseInstruction()}</p>

          {/* Visualization */}
          <div className="relative mb-8">
            {getVisualization()}
          </div>

          <h3 className="text-3xl font-medium text-gray-700 mb-2">{getPhaseText()}</h3>
          
          {/* Cycle Counter */}
          {breathing.active && sessionProgress.totalCycles > 0 && (
            <p className="text-sm text-gray-500 mb-6">
              Ciclo {sessionProgress.totalCycles} • {sessionProgress.currentCycle} respirações neste ciclo
            </p>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            {!breathing.active && !isSessionComplete ? (
              <button
                onClick={startSession}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg transform hover:scale-105"
              >
                <Play className="w-5 h-5" />
                <span>Iniciar Sessão</span>
              </button>
            ) : breathing.active ? (
              <>
                <button
                  onClick={() => setBreathing(prev => ({ ...prev, active: false }))}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pausar</span>
                </button>
                <button
                  onClick={resetSession}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reiniciar</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setBreathing(prev => ({ ...prev, active: true }))}
                className="flex items-center space-x-2 px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span>Continuar</span>
              </button>
            )}
          </div>

          {/* Additional Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentScreen('sounds')}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Sons relaxantes</span>
            </button>
            
            {breathing.active && (
              <button
                onClick={() => setCurrentScreen('meditation-selection')}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Timer className="w-4 h-4" />
                <span>Trocar técnica</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingScreen;