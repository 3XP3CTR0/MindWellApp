import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, Play, Pause } from 'lucide-react';
import MindWellSoundManager from '../lib/soundManager';
import type {CalmingSound, SoundType} from '../types';

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

interface SoundsScreenProps {
  setCurrentScreen: (screen: string) => void;
}

const SoundsScreen = ({ setCurrentScreen }: SoundsScreenProps) => {
  const [localPlayingSound, setLocalPlayingSound] = useState<SoundType | ''>('');
  const [volume, setVolume] = useState(0.7);
  const soundManagerRef = useRef(new MindWellSoundManager());

  const toggleSound = async (sound: CalmingSound) => {
    const soundManager = soundManagerRef.current;
    
    if (localPlayingSound === sound.id) {
      soundManager.stopSound();
      setLocalPlayingSound('');
    } else {
      const success = await soundManager.playSound(sound.id);
      if (success) {
        setLocalPlayingSound(sound.id);
      } else {
        alert('Não foi possível reproduzir o som. Tente novamente.');
      }
    }
  };

  useEffect(() => {
    soundManagerRef.current.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    return () => {
      soundManagerRef.current.stopSound();
    };
  }, []);

  return (
    <div className="min-h-screen p-6">
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

export default SoundsScreen;