import { ArrowLeft, BookOpen, Shield, Target, Volume2, Mail, BarChart3, Phone } from 'lucide-react';
import MindWellIcon from '../components/MindWellIcon';

interface InfoScreenProps {
  setCurrentScreen: (screen: string) => void;
}

const InfoScreen = ({ setCurrentScreen }: InfoScreenProps) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
    <div className="max-w-md mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={() => setCurrentScreen('home')} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Sobre o MindWell</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MindWellIcon className="w-60 h-60 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">MindWell</h2>
        <p className="text-gray-600">Seu companheiro para bem-estar mental</p>
        <div className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
          <span className="text-sm font-semibold text-blue-800">Versão 1.0</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
          Funcionalidades
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">😊</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Registro de Humor</h4>
              <p className="text-gray-600 text-sm">Acompanhe suas emoções diariamente com 8 opções de humor e adicione notas pessoais.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🧘</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Meditações Guiadas</h4>
              <p className="text-gray-600 text-sm">6 tipos diferentes incluindo respiração 4-4-4, 4-7-8, Box Breathing e Mindfulness.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Apoio Emocional</h4>
              <p className="text-gray-600 text-sm">Técnica 5-4-3-2-1 para ansiedade e contatos de emergência para momentos difíceis.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Sons Relaxantes</h4>
              <p className="text-gray-600 text-sm">8 ambientes sonoros da natureza com controles de reprodução e volume.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Mensagens Motivacionais</h4>
              <p className="text-gray-600 text-sm">Cartas de motivação a cada hora com sistema de favoritos para suas mensagens especiais.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Histórico e Estatísticas</h4>
              <p className="text-gray-600 text-sm">Acompanhe sua evolução emocional com gráficos de tendência e estatísticas pessoais.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-600" />
          Como Usar
        </h3>
        
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
            <p>Registre seu humor diário para acompanhar sua evolução emocional</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
            <p>Use as técnicas de meditação quando precisar relaxar e se centrar</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
            <p>Recorra ao apoio emocional em momentos de ansiedade ou estresse</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-5 h-5 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
            <p>Abra uma carta motivacional a cada hora para inspiração diária</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-2">Privacidade e Segurança</h3>
            <div className="space-y-1 text-sm text-green-700">
              <p>• Todos os dados são armazenados localmente no seu dispositivo</p>
              <p>• Não compartilhamos informações com terceiros</p>
              <p>• Não requeremos cadastro ou login</p>
              <p>• Você tem controle total sobre seus dados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-2">Em Caso de Emergência</h3>
            <p className="text-red-700 text-sm mb-2">
              Se você está em crise emocional, procure ajuda profissional imediatamente.
            </p>
            <button
              onClick={() => setCurrentScreen('support')}
              className="inline-flex items-center text-red-600 text-sm font-semibold hover:underline"
            >
              Ver contatos de emergência
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default InfoScreen;
