import React from 'react';
import { Leader } from '../types';
import { Mail, Linkedin, Award } from 'lucide-react';

interface LeaderCardProps {
  leader: Leader;
  onSelect?: (leader: Leader) => void;
  variant?: 'detailed' | 'compact';
}

export const LeaderCard: React.FC<LeaderCardProps> = ({
  leader,
  onSelect,
  variant = 'detailed',
}) => {
  if (variant === 'compact') {
    return (
      <div
        id={`leader-card-${leader.id}`}
        className="group bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-b-4 border-[#e5e5e5] hover:border-[#1cb0f6] transition-all duration-200 flex flex-col justify-between"
      >
        <div>
          {/* Photo with Duolingo border */}
          <div className="aspect-[4/3] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#e5e5e5] relative mb-3 sm:mb-4">
            <img
              src={leader.image}
              alt={leader.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#1cb0f6] bg-[#e5f6ff] px-2 py-0.5 rounded-lg border border-[#84d8ff]">
                {leader.area}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-[#3c3c3c] tracking-tight font-display">
              {leader.name}
            </h4>
            <p className="text-xs font-bold text-[#58cc02] mb-1.5">
              {leader.role}
            </p>
            <p className="text-xs text-[#777777] font-semibold leading-relaxed line-clamp-2">
              {leader.bio}
            </p>
          </div>
        </div>

        {onSelect && (
          <div className="pt-3 border-t-2 border-[#f0f0f0] mt-3 sm:mt-4">
            <button
              onClick={() => onSelect(leader)}
              className="w-full min-h-[44px] py-2 px-4 rounded-xl duo-btn-white text-xs cursor-pointer"
            >
              Ver Perfil
            </button>
          </div>
        )}
      </div>
    );
  }

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
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#58cc02] border-b-2 border-[#46a302] text-white text-[9px] sm:text-[10px] font-black uppercase px-2.5 sm:px-3 py-1 rounded-xl shadow-xs flex items-center gap-1">
          <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>{leader.experienceYears} Años Exp.</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="mb-3 sm:mb-4">
            <div className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl bg-[#e5f6ff] text-[#1cb0f6] border border-[#84d8ff] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1.5 sm:mb-2">
              {leader.area}
            </div>
            <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-[#3c3c3c] tracking-tight">
              {leader.name}
            </h3>
            <p className="text-xs sm:text-base font-extrabold text-[#58cc02] mt-0.5 sm:mt-1">
              {leader.role}
            </p>
          </div>

          <p className="text-xs sm:text-base text-[#4b4b4b] font-medium leading-relaxed max-w-3xl mb-3 sm:mb-4">
            {leader.bio}
          </p>

          {leader.fullBio && (
            <p className="text-xs sm:text-sm text-[#777777] font-medium leading-relaxed max-w-3xl mb-3 sm:mb-4">
              {leader.fullBio}
            </p>
          )}

          {/* Specialties Tiles (Duolingo style word chips) */}
          {leader.specialties && (
            <div className="mt-3 sm:mt-4">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#777777] block mb-1.5 sm:mb-2 font-display">
                Especialidades
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {leader.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-[#f7f7f7] border-2 border-b-3 border-[#e5e5e5] text-[11px] sm:text-xs font-bold text-[#4b4b4b]"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 sm:pt-6 border-t-2 border-[#f0f0f0] mt-4 sm:mt-6 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
          <span className="text-[10px] sm:text-xs font-extrabold text-[#777777] uppercase tracking-wider">
            Directivo Corporativo
          </span>

          <div className="w-full xs:w-auto flex items-center gap-2 sm:gap-3">
            {leader.email && (
              <a
                href={`mailto:${leader.email}`}
                className="flex-1 xs:flex-initial min-h-[42px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl duo-btn-white text-xs cursor-pointer shadow-xs"
                title="Contacto directo"
              >
                <Mail className="w-3.5 h-3.5 text-[#1cb0f6]" />
                <span>Correo</span>
              </a>
            )}
            {leader.linkedin && (
              <a
                href={leader.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 xs:flex-initial min-h-[42px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl duo-btn-blue text-xs cursor-pointer shadow-xs"
                title="Perfil en LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
