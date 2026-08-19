import React from 'react';
import { PORTFOLIO_BRANDS } from '../data/holdingData';
import { BrandCard } from '../components/BrandCard';
import { PartnershipBanner } from '../components/PartnershipBanner';

export const MarcasPage: React.FC = () => {
  return (
    <div id="marcas-page" className="w-full flex flex-col pb-10 sm:pb-16">
      {/* 1. Duolingo Unit Header Banner */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto pt-4 sm:pt-8">
        <div className="bg-[#1cb0f6] border-b-6 border-[#1899d6] rounded-3xl sm:rounded-4xl p-6 sm:p-12 text-white shadow-md">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display leading-[1.1]">
            Marcas especializadas con impacto de mercado.
          </h1>
        </div>
      </section>

      {/* 2. Brands Grid Section */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto mt-8 sm:mt-12">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-4xl font-black text-[#18181b] font-display tracking-tight">
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

        {/* Partnership Banner */}
        <div className="mt-8 sm:mt-12">
          <PartnershipBanner />
        </div>
      </section>
    </div>
  );
};

