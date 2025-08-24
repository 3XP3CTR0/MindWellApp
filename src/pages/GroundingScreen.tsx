import { ArrowLeft } from 'lucide-react';
import { groundingSteps } from '../data';

interface GroundingScreenProps {
  setCurrentScreen: (screen: string) => void;
  groundingStep: number;
  setGroundingStep: (step: number) => void;
}

const GroundingScreen = ({ setCurrentScreen, groundingStep, setGroundingStep }: GroundingScreenProps) => {
  const currentStep = groundingSteps[groundingStep];
  
  const nextStep = () => {
    if (groundingStep < groundingSteps.length - 1) {
      setGroundingStep(groundingStep + 1);
    } else {
      setCurrentScreen('support');
    }
  };

  const prevStep = () => {
    if (groundingStep > 0) {
      setGroundingStep(groundingStep - 1);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => setCurrentScreen('support')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Técnica 5-4-3-2-1</h1>
        </div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">{currentStep.emoji}</span>
          </div>
          <div className="text-sm text-gray-500 mb-2">
            Passo {groundingStep + 1} de {groundingSteps.length}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentStep.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{currentStep.description}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((groundingStep + 1) / groundingSteps.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            Reserve seu tempo. Não há pressa. Respire fundo e se concentre no presente.
          </div>
        </div>

        <div className="flex space-x-4">
          {groundingStep > 0 && (
            <button
              onClick={prevStep}
              className="px-6 py-4 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Anterior
            </button>
          )}
          <button
            onClick={nextStep}
            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all shadow-lg"
          >
            {groundingStep === groundingSteps.length - 1 ? 'Concluir' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroundingScreen;