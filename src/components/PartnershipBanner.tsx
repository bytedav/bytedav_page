import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { HOLDING_CONFIG } from '../data/holdingData';

interface PartnershipBannerProps {
  className?: string;
  onAction?: () => void;
}

export const PartnershipBanner: React.FC<PartnershipBannerProps> = ({
  className = '',
  onAction,
}) => {
  const handleContact = () => {
    if (onAction) {
      onAction();
      return;
    }
    const mailtoUrl = `mailto:${HOLDING_CONFIG.contactEmail || 'bytedav@gmail.com'}?subject=${encodeURIComponent('Propuesta de Inversión / Partnership / Adquisición - Bytedav')}&body=${encodeURIComponent('Hola equipo de Bytedav,\n\nMe pongo en contacto para presentarles una oportunidad de inversión / partnership / adquisición relacionada con nuestra marca:\n\n- Nombre de la marca:\n- Sector / Enfoque:\n- Enlace web / presentación:\n\nSaludos cordiales,')}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div
      id="partnership-banner"
      className={`w-full bg-white border-2 border-b-4 border-[#e5e5e5] hover:border-[#18181b] rounded-2xl sm:rounded-3xl lg:rounded-full p-4 sm:p-5 lg:px-8 lg:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-200 shadow-xs ${className}`}
    >
      {/* Left side text */}
      <div className="flex items-center gap-3.5 text-center sm:text-left">
        <div className="hidden lg:flex w-12 h-12 rounded-2xl bg-[#f4f4f5] border-2 border-[#e5e5e5] items-center justify-center shrink-0">
          <MessageSquare className="w-6 h-6 text-[#18181b]" />
        </div>
        <p className="text-base sm:text-lg md:text-xl font-semibold text-[#18181b] leading-snug">
          ¿Tienes una marca digital y buscas inversión, partnership o adquisición? <span className="font-black text-[#18181b]">Conversemos.</span>
        </p>
      </div>

      {/* Right side CTA Button */}
      <button
        id="partnership-cta-btn"
        onClick={handleContact}
        className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl lg:rounded-full bg-[#18181b] border-b-4 border-[#09090b] text-white font-black text-sm sm:text-base uppercase tracking-wider hover:bg-[#27272a] active:translate-y-1 active:border-b-0 transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
      >
        <span>Hablar con el grupo</span>
        <ArrowRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};
