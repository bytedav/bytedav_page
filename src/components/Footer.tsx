import React from 'react';
import { PageId } from '../types';
import { BytedavLogo } from './BytedavLogo';
import { HOLDING_CONFIG } from '../data/holdingData';
import { Facebook, Instagram, Youtube } from 'lucide-react';

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

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href={HOLDING_CONFIG.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook oficial de Bytedav"
              className="w-9 h-9 rounded-xl bg-[#27272a] hover:bg-[#1877f2] text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-[#3f3f46]"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={HOLDING_CONFIG.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok oficial de Bytedav"
              className="w-9 h-9 rounded-xl bg-[#27272a] hover:bg-black text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-[#3f3f46]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.48c1.3-1.25 1.99-2.9 1.99-5V8.82a8.27 8.27 0 0 0 4.84 1.55v-3.5c-.41-.01-.81-.07-1.2-.18z" />
              </svg>
            </a>
            <a
              href={HOLDING_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram oficial de Bytedav"
              className="w-9 h-9 rounded-xl bg-[#27272a] hover:bg-[#e4405f] text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-[#3f3f46]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={HOLDING_CONFIG.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube oficial de Bytedav"
              className="w-9 h-9 rounded-xl bg-[#27272a] hover:bg-[#ff0000] text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-[#3f3f46]"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
