import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { HOLDING_CONFIG } from '../data/holdingData';
import { BytedavLogo } from './BytedavLogo';
import { Flame, Gem, Zap, Home, BookOpen, Users, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isHome: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
    { id: 'historia', label: 'Historia', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'liderazgo', label: 'Liderazgo', icon: <Users className="w-4 h-4" /> },
    { id: 'marcas', label: 'Marcas', icon: <LayoutGrid className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 h-16 sm:h-18 w-full bg-white border-b-2 border-[#e5e5e5] transition-all duration-200 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="w-full max-w-7xl mx-auto h-full px-3.5 sm:px-8 flex items-center justify-between gap-2">
        {/* Brand Logo - Official Black "bd" Monogram with Duolingo 3D frame */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left group focus:outline-none cursor-pointer shrink-0"
        >
          <BytedavLogo size="md" textColor="text-[#18181b]" />
        </button>

        {/* Desktop Navigation Links - Duolingo Tabs Style with elegant dark active state */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#18181b] text-white border-2 border-[#18181b] border-b-4 shadow-xs'
                    : 'text-[#777777] hover:bg-[#f7f7f7] hover:text-[#18181b]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
