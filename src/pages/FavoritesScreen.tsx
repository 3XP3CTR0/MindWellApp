import { ArrowLeft, Heart, X } from 'lucide-react';

interface FavoritesScreenProps {
  setCurrentScreen: (screen: string) => void;
  favorites: string[];
  handleRemoveFromFavorites: (message: string) => void;
}

const FavoritesScreen = ({ setCurrentScreen, favorites, handleRemoveFromFavorites }: FavoritesScreenProps) => (
  <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
    <div className="max-w-md mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={() => setCurrentScreen('home')} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Mensagens Favoritas</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma mensagem favorita</h3>
          <p className="text-gray-500">
            Quando você favoritar mensagens especiais, elas aparecerão aqui
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((message, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm relative">
              <button
                onClick={() => handleRemoveFromFavorites(message)}
                className="absolute top-4 right-4 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
              <div className="pr-12">
                <div className="flex items-center mb-3">
                  <Heart className="w-5 h-5 text-red-500 fill-current mr-2" />
                  <span className="text-sm text-gray-500">Mensagem {index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{message}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default FavoritesScreen;
