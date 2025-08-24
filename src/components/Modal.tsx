import { X, Heart } from 'lucide-react';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  currentMessage: string;
  handleAddToFavorites: () => void;
  favorites: string[];
}

const Modal = ({ showModal, closeModal, currentMessage, handleAddToFavorites, favorites }: ModalProps) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-transparent opacity-30 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200 to-transparent opacity-30 rounded-full translate-y-6 -translate-x-6"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mensagem Especial
                </h3>
                <p className="text-sm text-gray-500">Para você ❤️</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-inner border border-white/50">
            <div className="text-center">
              <span className="text-4xl mb-4 block">💝</span>
              <p className="text-gray-700 text-lg leading-relaxed font-medium italic relative">
                <span className="text-blue-500 text-2xl absolute -top-2 -left-2">"</span>
                {currentMessage}
                <span className="text-blue-500 text-2xl absolute -bottom-4 -right-2">"</span>
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleAddToFavorites}
              className={`flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                favorites.includes(currentMessage) 
                  ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-red-200' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-red-50 hover:to-pink-50 hover:text-red-600 shadow-gray-200'
              }`}
            >
              <Heart className={`w-5 h-5 transition-all ${favorites.includes(currentMessage) ? 'fill-current scale-110' : ''}`} />
              <span className="text-sm font-semibold">
                {favorites.includes(currentMessage) ? 'Favoritado' : 'Favoritar'}
              </span>
            </button>
            
            <button
              onClick={closeModal}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-200"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
