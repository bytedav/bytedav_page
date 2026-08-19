import React from 'react';
import { PortfolioBrand } from '../types';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

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
          {brand.isFlagship && (
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#ffc800] border-b-2 border-[#e5a500] text-[#3c3c3c] text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1 rounded-xl shadow-xs">
              Marca Insignia
            </div>
          )}
        </div>

        {/* Card Header */}
        <div className="mb-2.5 sm:mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#1cb0f6]">
              {brand.category}
            </span>
            <span className="text-[10px] sm:text-xs font-bold font-mono text-[#777777] bg-[#f7f7f7] px-2 py-0.5 rounded-lg border border-[#e5e5e5]">
              {brand.yearFounded}
            </span>
          </div>

          <h4 className="text-lg sm:text-xl font-extrabold text-[#3c3c3c] tracking-tight font-display">
            {brand.name}
          </h4>
          <p className="text-xs text-[#777777] font-semibold leading-relaxed mt-1">
            {brand.description}
          </p>
        </div>

        {/* Features / Highlights */}
        {brand.features && brand.features.length > 0 && (
          <div className="space-y-1.5 my-2.5 sm:my-3">
            {brand.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-[#4b4b4b] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#58cc02] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Actions - Duolingo 3D Button with min 44px touch target */}
      {showActions && (
        <div className="pt-3 border-t-2 border-[#f0f0f0] mt-2 sm:mt-3">
          <a
            id={`visit-website-${brand.id}`}
            href={brand.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl duo-btn-green text-xs cursor-pointer shadow-xs"
            title={`Ir al sitio oficial de ${brand.name}`}
          >
            <span>Visitar Sitio Oficial</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};
