import { ArrowLeft } from 'lucide-react';
import { meditationTypes } from '../data';

interface MeditationSelectionScreenProps {
  setCurrentScreen: (screen: string) => void;
  setSelectedMeditation: (meditationId: string) => void;
}

const MeditationSelectionScreen = ({ setCurrentScreen, setSelectedMeditation }: MeditationSelectionScreenProps) => (
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

export default MeditationSelectionScreen;
