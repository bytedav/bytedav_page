import React from 'react';
import { Leader } from '../types';
import { Mail, Linkedin } from 'lucide-react';

interface LeaderCardProps {
  leader: Leader;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({ leader }) => {
  return (
    <div
      id={`leader-card-${leader.id}`}
      className="group w-full bg-white rounded-3xl p-4 sm:p-8 lg:p-10 border-2 border-b-4 border-[#e5e5e5] hover:border-[#58cc02] transition-all duration-200 flex flex-col md:flex-row gap-5 sm:gap-8 lg:gap-10 items-stretch justify-between"
    >
      <div className="w-full md:w-80 lg:w-96 shrink-0 aspect-[4/3] md:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 relative border-2 border-[#e5e5e5]">
        <img
          src={leader.image}
          alt={leader.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="mb-3.5 sm:mb-5">
            <div className="inline-block px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#e5f6ff] text-[#1cb0f6] border border-[#84d8ff] text-xs sm:text-sm font-black uppercase tracking-wider mb-2 sm:mb-2.5">
              {leader.area}
            </div>
            <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight">
              {leader.name}
            </h3>
          </div>

          <p className="text-sm sm:text-lg md:text-xl text-[#3f3f46] font-semibold leading-relaxed max-w-3xl mb-3.5 sm:mb-5">
            {leader.bio}
          </p>

          {/* Specialties Tiles (Duolingo style word chips) */}
          {leader.specialties && leader.specialties.length > 0 && (
            <div className="mt-3.5 sm:mt-5">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#71717a] block mb-2 font-display">
                Especialidades
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {leader.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#f7f7f7] border-2 border-b-3 border-[#e5e5e5] text-xs sm:text-sm font-bold text-[#3f3f46]"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 sm:pt-6 border-t-2 border-[#f0f0f0] mt-4 sm:mt-6 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
          <span className="text-xs sm:text-sm font-black text-[#71717a] uppercase tracking-wider">
            Directivo Corporativo
          </span>

          <div className="w-full xs:w-auto flex items-center gap-2 sm:gap-3">
            {leader.email && (
              <a
                href={`mailto:${leader.email}`}
                className="flex-1 xs:flex-initial min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl duo-btn-white text-xs sm:text-sm font-black cursor-pointer shadow-xs"
                title="Contacto directo"
              >
                <Mail className="w-4 h-4 text-[#1cb0f6]" />
                <span>Correo</span>
              </a>
            )}
            {leader.linkedin && (
              <a
                href={leader.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 xs:flex-initial min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl duo-btn-blue text-xs sm:text-sm font-black cursor-pointer shadow-xs"
                title="Perfil en LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
