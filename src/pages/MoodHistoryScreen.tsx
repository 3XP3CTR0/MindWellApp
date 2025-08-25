import { ArrowLeft, BarChart3, TrendingUp, Calendar } from 'lucide-react';
import MoodChart from '../components/MoodChart';
import type {MoodEntry} from '../types';
import { moods } from '../data';

interface MoodHistoryScreenProps {
  setCurrentScreen: (screen: string) => void;
  moodHistory: MoodEntry[];
}

const MoodHistoryScreen = ({ setCurrentScreen, moodHistory }: MoodHistoryScreenProps) => {


  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Histórico de Humor</h1>
        </div>

        {moodHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum registro ainda</h3>
            <p className="text-gray-500">
              Comece registrando seu humor diariamente para ver sua evolução
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Tendência (últimos 14 dias)
                </h3>
                <div className="text-sm text-gray-500">
                  {moodHistory.length} registro{moodHistory.length !== 1 ? 's' : ''}
                </div>
              </div>
              <MoodChart moodHistory={moodHistory} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                Registros Recentes
              </h3>
              {[...moodHistory].reverse().slice(0, 20).map((entry, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{moods[entry.mood].emoji}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{moods[entry.mood].label}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(entry.date).toLocaleDateString('pt-BR', { 
                            weekday: 'short', 
                            day: '2-digit', 
                            month: 'short' 
                          })}
                          {entry.time && ` às ${entry.time}`}
                        </div>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      entry.score >= 5 ? 'bg-green-500' : 
                      entry.score >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  {entry.note && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 text-sm italic">"{entry.note}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodHistoryScreen;