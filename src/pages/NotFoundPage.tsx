import React from 'react';
import { PageId } from '../types';
import { Home, ArrowLeft, BookOpen, Users, LayoutGrid } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: PageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div id="not-found-page" className="w-full flex flex-col items-center justify-center py-12 sm:py-20 px-4 max-w-4xl mx-auto">
      {/* 404 Hero Unit Card */}
      <div className="w-full bg-white border-2 border-b-6 border-[#e5e5e5] rounded-3xl sm:rounded-4xl p-6 sm:p-12 text-center shadow-sm">
        <div className="inline-block px-4 py-1.5 rounded-xl bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7] text-xs sm:text-sm font-black uppercase tracking-wider mb-4">
          Error 404 — Ruta Inexistente
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#18181b] font-display tracking-tight mb-4">
          Página no encontrada
        </h1>

        <p className="text-base sm:text-xl text-[#52525b] font-semibold max-w-xl mx-auto mb-8 leading-relaxed">
          La dirección a la que intentas acceder no existe, ha sido reubicada o la URL contiene algún error tipográfico.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl duo-btn-green text-sm sm:text-base font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Home className="w-5 h-5" />
            <span>Volver al Inicio</span>
          </button>

          <button
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                onNavigate('home');
              }
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl duo-btn-white text-sm sm:text-base font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-5 h-5 text-[#18181b]" />
            <span>Regresar</span>
          </button>
        </div>

        {/* Suggested Quick Links */}
        <div className="pt-8 border-t-2 border-[#f0f0f0]">
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#71717a] block mb-4 font-display">
            Secciones recomendadas
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onNavigate('historia')}
              className="p-3.5 rounded-2xl bg-[#f7f7f7] border-2 border-b-3 border-[#e5e5e5] hover:border-[#18181b] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-[#18181b] cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#18181b]" />
              <span>Nuestra Historia</span>
            </button>

            <button
              onClick={() => onNavigate('liderazgo')}
              className="p-3.5 rounded-2xl bg-[#f7f7f7] border-2 border-b-3 border-[#e5e5e5] hover:border-[#18181b] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-[#18181b] cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#18181b]" />
              <span>Equipo y Liderazgo</span>
            </button>

            <button
              onClick={() => onNavigate('marcas')}
              className="p-3.5 rounded-2xl bg-[#f7f7f7] border-2 border-b-3 border-[#e5e5e5] hover:border-[#18181b] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-[#18181b] cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 text-[#18181b]" />
              <span>Marcas del Holding</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
