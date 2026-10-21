import React from 'react';
import { PageId } from '../types';
import { BytedavLogo } from './BytedavLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="corporate-footer" className="bg-[#18181b] text-white py-8 sm:py-10 border-t-4 border-[#09090b] mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center text-center sm:text-left">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center cursor-pointer group"
            >
              <BytedavLogo size="sm" textColor="text-white" />
            </button>
          </div>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'home' as const, label: 'Inicio' },
              { id: 'historia' as const, label: 'Historia' },
              { id: 'liderazgo' as const, label: 'Liderazgo' },
              { id: 'marcas' as const, label: 'Marcas' },
              { id: 'blog' as const, label: 'Blog' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="px-3.5 py-1.5 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-zinc-200 hover:text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
