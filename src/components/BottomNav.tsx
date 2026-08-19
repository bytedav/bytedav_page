import React from 'react';
import { PageId } from '../types';
import { Home, BookOpen, Users, LayoutGrid } from 'lucide-react';

interface BottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const navTabs: { id: PageId; label: string; icon: React.ReactNode; activeColor: string }[] = [
    {
      id: 'home',
      label: 'Inicio',
      icon: <Home className="w-6 h-6" />,
      activeColor: 'text-[#18181b]',
    },
    {
      id: 'historia',
      label: 'Historia',
      icon: <BookOpen className="w-6 h-6" />,
      activeColor: 'text-[#ce82ff]',
    },
    {
      id: 'liderazgo',
      label: 'Liderazgo',
      icon: <Users className="w-6 h-6" />,
      activeColor: 'text-[#ff9600]',
    },
    {
      id: 'marcas',
      label: 'Marcas',
      icon: <LayoutGrid className="w-6 h-6" />,
      activeColor: 'text-[#1cb0f6]',
    },
  ];

  return (
    <nav
      id="duolingo-bottom-nav"
      aria-label="Navegación principal móvil"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#e5e5e5] px-2 py-1.5 safe-area-pb shadow-lg"
    >
      <div className="grid grid-cols-4 items-center justify-around max-w-md mx-auto">
        {navTabs.map((tab) => {
          const isActive = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-tab-${tab.id}`}
              onClick={() => {
                onNavigate(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-150 relative cursor-pointer active:scale-95 ${
                isActive
                  ? `${tab.activeColor} font-black`
                  : 'text-[#a1a1aa] hover:text-[#18181b] font-extrabold'
              }`}
            >
              {/* Active Tab Background indicator */}
              {isActive && (
                <span className="absolute inset-0 bg-[#f4f4f5] border border-[#e5e5e5] rounded-2xl -z-10" />
              )}

              <div className="relative">
                {tab.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-current" />
                )}
              </div>

              <span className="text-[10px] uppercase tracking-wider mt-1 font-display">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
