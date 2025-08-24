import { useState } from 'react';
import MindWellIcon from '../components/MindWellIcon';
import BirthDateSelector from '../components/BirthDateSelector';

interface OnboardingScreenProps {
  completeOnboarding: (name: string, birthDate: Date) => void;
}

const OnboardingScreen = ({ completeOnboarding }: OnboardingScreenProps) => {
  const [tempName, setTempName] = useState('');
  const [tempBirthDate, setTempBirthDate] = useState(new Date(1999, 0, 1));

  const handleComplete = () => {
    if (tempName.trim()) {
      completeOnboarding(tempName.trim(), tempBirthDate);
    } else {
      alert('Por favor, preencha todos os campos para continuar.');
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MindWellIcon className="w-60 h-60 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo ao MindWell!</h1>
          <p className="text-gray-600 text-lg">Vamos conhecer você melhor para personalizar sua experiência</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-white/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="onboarding-name" className="block text-sm font-semibold text-gray-700 mb-3">
                Como podemos te chamar?
              </label>
              <input
                id="onboarding-name"
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={30}
                autoComplete="given-name"
                autoFocus
              />
            </div>

            <BirthDateSelector 
              value={tempBirthDate} 
              onChange={setTempBirthDate} 
              label="Qual sua data de nascimento?"
            />

            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-blue-700 text-sm text-center">
                <span className="font-semibold">🔒 Suas informações são privadas</span><br />
                Não compartilhamos seus dados com terceiros
              </p>
            </div>

            <button
              onClick={handleComplete}
              disabled={!tempName.trim()}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${
                tempName.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg shadow-blue-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Começar minha jornada ✨
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Você pode alterar essas informações a qualquer momento no seu perfil
        </p>
      </div>
    </div>
  );
};

export default OnboardingScreen;