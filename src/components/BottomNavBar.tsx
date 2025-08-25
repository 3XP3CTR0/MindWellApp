import { Home, BarChart3, User } from 'lucide-react';

interface BottomNavBarProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

const BottomNavBar = ({ currentScreen, setCurrentScreen }: BottomNavBarProps) => {
  const navItems = [
    { screen: 'home', label: 'Início', icon: <Home className="w-6 h-6" /> },
    { screen: 'mood-history', label: 'Histórico', icon: <BarChart3 className="w-6 h-6" /> },
    { screen: 'profile', label: 'Perfil', icon: <User className="w-6 h-6" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-t-lg border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => setCurrentScreen(item.screen)}
            className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
              currentScreen === item.screen
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {item.icon}
            <span className="text-xs font-medium mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
