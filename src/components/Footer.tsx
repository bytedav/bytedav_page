import React from 'react';
import { PageId } from '../types';
import { HOLDING_CONFIG } from '../data/holdingData';
import { BytedavLogo } from './BytedavLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="corporate-footer" className="bg-[#18181b] text-white py-8 sm:py-10 border-t-4 border-[#09090b] mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo & Tagline with official black bd monogram in a white frame */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center cursor-pointer group"
            >
              <BytedavLogo size="sm" textColor="text-white" />
            </button>
            <span className="hidden sm:inline text-zinc-600 font-bold">•</span>
            <p className="text-zinc-400 text-xs font-semibold">
              {HOLDING_CONFIG.tagline}
            </p>
          </div>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(['home', 'historia', 'liderazgo', 'marcas'] as PageId[]).map((page) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className="px-3 py-1.5 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] text-zinc-300 hover:text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
