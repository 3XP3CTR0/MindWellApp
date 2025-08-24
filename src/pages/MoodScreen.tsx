import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { moods } from '../data';

interface MoodScreenProps {
  mood: number | null;
  setCurrentScreen: (screen: string) => void;
  handleMoodSelection: (moodIndex: number, note?: string) => void;
}

const MoodScreen = ({ mood, setCurrentScreen, handleMoodSelection }: MoodScreenProps) => {
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

export default MoodScreen;
