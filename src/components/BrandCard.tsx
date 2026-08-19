import React from 'react';
import { PortfolioBrand } from '../types';
import { ExternalLink } from 'lucide-react';

interface BrandCardProps {
  brand: PortfolioBrand;
  showActions?: boolean;
}

export const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  showActions = true,
}) => {
  return (
    <div
      id={`brand-card-${brand.id}`}
      className="group bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-b-4 border-[#e5e5e5] hover:border-[#1cb0f6] transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Brand Image with nested border and rounded corners */}
        <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 sm:mb-4 bg-slate-100 border-2 border-[#e5e5e5]">
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>

        {/* Card Header */}
        <div className="mb-2.5 sm:mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1cb0f6]">
              {brand.category}
            </span>
            <span className="text-xs sm:text-sm font-bold font-mono text-[#52525b] bg-[#f7f7f7] px-2.5 py-0.5 rounded-lg border border-[#e5e5e5]">
              {brand.yearFounded}
            </span>
          </div>

          <h4 className="text-xl sm:text-2xl font-black text-[#18181b] tracking-tight font-display">
            {brand.name}
          </h4>
          <p className="text-sm sm:text-base text-[#52525b] font-medium leading-relaxed mt-1.5">
            {brand.description}
          </p>
        </div>
      </div>

      {/* Card Actions - Duolingo 3D Button with min 44px touch target */}
      {showActions && (
        <div className="pt-3.5 border-t-2 border-[#f0f0f0] mt-3 sm:mt-4">
          <a
            id={`visit-website-${brand.id}`}
            href={brand.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[46px] flex items-center justify-center gap-2 py-3 px-5 rounded-2xl duo-btn-green text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer shadow-xs"
            title={`Ir al sitio oficial de ${brand.name}`}
          >
            <span>Visitar Sitio Oficial</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};
