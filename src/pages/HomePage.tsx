import React from 'react';
import { PageId } from '../types';
import { PORTFOLIO_BRANDS, HOLDING_PILLARS } from '../data/holdingData';
import { SectionHeader } from '../components/SectionHeader';
import { BrandCard } from '../components/BrandCard';
import { PartnershipBanner } from '../components/PartnershipBanner';
import { ArrowRight, ShieldCheck, Layers, Cpu, TrendingUp, Sparkles, BookOpen } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const getPillarIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#58cc02]" />;
      case 1:
        return <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#1cb0f6]" />;
      case 2:
        return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#ce82ff]" />;
      case 3:
        return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff9600]" />;
      default:
        return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#58cc02]" />;
    }
  };

  return (
    <div id="home-page" className="w-full flex flex-col pb-10 sm:pb-16">
      {/* 1. HERO SECTION: Duolingo Unit Banner Style in Sophisticated Onyx/Black matching logo */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto pt-4 sm:pt-8">
        <div className="relative bg-[#18181b] border-b-6 border-[#09090b] rounded-3xl sm:rounded-4xl p-5 sm:p-10 lg:p-14 text-white overflow-hidden shadow-md">
          {/* Subtle playful circles */}
          <div className="absolute -top-12 -right-12 w-40 sm:w-48 h-40 sm:h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Duolingo Guidebook Button on Mobile */}
            <div className="flex items-center justify-end gap-2 mb-3 sm:mb-4">
              <button
                onClick={() => onNavigate('historia')}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider border border-white/20 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Guía</span>
              </button>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6 sm:mb-8 font-display">
              Impulsando el futuro del comercio especializado.
            </h1>

            <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-4">
              <button
                id="hero-cta-portfolio"
                onClick={() => onNavigate('marcas')}
                className="w-full xs:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white border-b-4 border-[#e5e5e5] text-[#18181b] font-black text-sm sm:text-base uppercase tracking-wider hover:bg-[#f4f4f5] active:translate-y-1 active:border-b-0 transition-all shadow-xs cursor-pointer text-center"
              >
                Nuestras Marcas
              </button>
              <button
                id="hero-cta-historia"
                onClick={() => onNavigate('historia')}
                className="w-full xs:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#27272a] border-b-4 border-[#18181b] text-white font-black text-sm sm:text-base uppercase tracking-wider hover:bg-[#3f3f46] active:translate-y-1 active:border-b-0 transition-all shadow-xs cursor-pointer text-center"
              >
                Nuestra Historia
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PORTFOLIO PREVIEW SECTION */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto mt-10 sm:mt-14">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <div className="inline-block px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#e5f6ff] text-[#1cb0f6] border border-[#84d8ff] text-xs sm:text-sm font-black uppercase tracking-wider mb-1.5 sm:mb-2">
              Marcas
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#18181b] font-display tracking-tight">
              Marcas que lideran
            </h2>
          </div>

          <button
            id="view-all-brands-btn"
            onClick={() => onNavigate('marcas')}
            className="px-3.5 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl duo-btn-white text-xs sm:text-sm font-extrabold flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-4 h-4 text-[#18181b]" />
          </button>
        </div>

        {/* Portfolio Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PORTFOLIO_BRANDS.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {/* Partnership / Deal Flow CTA Banner */}
        <div className="mt-6 sm:mt-8">
          <PartnershipBanner />
        </div>
      </section>

      {/* 3. THE HOLDING MODEL SECTION */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto mt-10 sm:mt-16">
        <div className="bg-white border-2 border-b-4 border-[#e5e5e5] rounded-3xl sm:rounded-4xl p-5 sm:p-10">
          <SectionHeader
            kicker="MODELO DE GOBERNANZA"
            title="La arquitectura del holding Bytedav"
            subtitle="Diseñamos una estructura corporativa que combina la agilidad de marcas verticales independientes con el respaldo financiero y tecnológico de la matriz."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mt-4 sm:mt-6">
            {HOLDING_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#f7f7f7] rounded-2xl p-4 sm:p-6 border-2 border-b-4 border-[#e5e5e5] hover:border-[#18181b] transition-all flex flex-col items-start"
              >
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border-2 border-[#e5e5e5] flex items-center justify-center mb-3 sm:mb-4">
                  {getPillarIcon(idx)}
                </div>

                <h3 className="font-display text-base sm:text-lg font-black text-[#18181b] leading-snug">
                  {pillar.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Duolingo Style Achievement Banner */}
          <div className="mt-6 sm:mt-8 bg-[#18181b] border-b-6 border-[#09090b] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
              <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Generamos valor a largo plazo a través de ventajas estructurales sostenibles.
              </h3>
              <div className="pt-2">
                <button
                  id="home-explore-holding-btn"
                  onClick={() => onNavigate('historia')}
                  className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl bg-white border-b-4 border-[#e5e5e5] text-[#18181b] font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#f4f4f5] active:translate-y-1 active:border-b-0 transition-all cursor-pointer shadow-xs text-center"
                >
                  Conocer Nuestra Trayectoria
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
