import { useState } from 'react';
import { ArrowLeft, Edit3 } from 'lucide-react';
import BirthDateSelector from '../components/BirthDateSelector';
import type {MoodEntry} from '../types';

interface ProfileScreenProps {
  setCurrentScreen: (screen: string) => void;
  userName: string;
  userBirthDate: string;
  setUserName: (name: string) => void;
  setUserBirthDate: (date: string) => void;
  dailyUsage: { count: number };
  moodHistory: MoodEntry[];
  favorites: string[];
}

const ProfileScreen = ({
  setCurrentScreen,
  userName,
  userBirthDate,
  setUserName,
  setUserBirthDate,
  dailyUsage,
  moodHistory,
  favorites,
}: ProfileScreenProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempBirthDate, setTempBirthDate] = useState(userBirthDate ? new Date(userBirthDate) : new Date(1999, 0, 1));

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const calculateAverageMood = () => {
    if (moodHistory.length === 0) return 0;
    const average = moodHistory.reduce((sum, entry) => sum + entry.score, 0) / moodHistory.length;
    return Math.round((average / 8) * 100);
  };

  const handleSave = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setUserBirthDate(tempBirthDate.toISOString());
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Perfil</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white font-bold">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
            <p className="text-gray-600">{userBirthDate ? calculateAge(new Date(userBirthDate)) : 0} anos</p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Editar perfil</span>
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={userName}
                  autoFocus
                />
              </div>
              
              <BirthDateSelector 
                value={tempBirthDate} 
                onChange={setTempBirthDate} 
                label="Data de nascimento"
              />

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setTempName(userName);
                    setTempBirthDate(userBirthDate ? new Date(userBirthDate) : new Date(1999, 0, 1));
                  }}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{dailyUsage.count}</div>
              <div className="text-sm text-gray-600">Cartas abertas hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{moodHistory.length}</div>
              <div className="text-sm text-gray-600">Registros de humor</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{favorites.length}</div>
              <div className="text-sm text-gray-600">Mensagens favoritas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {calculateAverageMood()}%
              </div>
              <div className="text-sm text-gray-600">Humor médio</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;