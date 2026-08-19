import React from 'react';
import { PageId } from '../types';
import { PORTFOLIO_BRANDS } from '../data/holdingData';
import { BrandCard } from '../components/BrandCard';
import { LayoutGrid } from 'lucide-react';

interface MarcasPageProps {
  onNavigate: (page: PageId) => void;
}

export const MarcasPage: React.FC<MarcasPageProps> = () => {
  return (
    <div id="marcas-page" className="w-full flex flex-col pb-10 sm:pb-16">
      {/* 1. Duolingo Unit Header Banner */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto pt-4 sm:pt-8">
        <div className="bg-[#1cb0f6] border-b-6 border-[#1899d6] rounded-3xl sm:rounded-4xl p-5 sm:p-10 text-white shadow-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2">
            <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Portafolio Corporativo</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Marcas especializadas con impacto de mercado.
          </h1>
        </div>
      </section>

      {/* 2. Brands Grid Section */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto mt-6 sm:mt-10">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-3xl font-black text-[#3c3c3c] font-display tracking-tight">
            Nuestras marcas y empresas operativas
          </h2>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PORTFOLIO_BRANDS.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
