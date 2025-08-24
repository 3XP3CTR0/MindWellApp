import { ArrowLeft, Target, Phone, ExternalLink } from 'lucide-react';
import { emergencyContacts } from '../data';

interface SupportScreenProps {
  setCurrentScreen: (screen: string) => void;
  setGroundingStep: (step: number) => void;
}

const SupportScreen = ({ setCurrentScreen, setGroundingStep }: SupportScreenProps) => (
  <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
    <div className="max-w-md mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={() => setCurrentScreen('home')} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Apoio Emocional</h1>
      </div>

      <div className="space-y-6">
        <button
          onClick={() => {
            setGroundingStep(0);
            setCurrentScreen('grounding');
          }}
          className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-gray-800">Técnica 5-4-3-2-1</div>
            <div className="text-gray-600 text-sm">Para momentos de ansiedade</div>
          </div>
        </button>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-green-600" />
            Contatos de Emergência
          </h3>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <div className="font-semibold text-gray-800">{contact.name}</div>
                <div className="text-green-600 font-mono text-lg">{contact.phone}</div>
                <div className="text-gray-600 text-sm">{contact.description}</div>
                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 text-sm hover:underline mt-1"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Site oficial
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Importante</h3>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Se você está passando por uma crise emocional ou tendo pensamentos de autolesão, 
                procure ajuda profissional imediatamente. Você não está sozinho e sempre há esperança.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SupportScreen;
