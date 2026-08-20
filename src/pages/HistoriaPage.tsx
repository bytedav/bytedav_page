import React, { useState } from 'react';
import { PageId } from '../types';
import { MILESTONES } from '../data/holdingData';
import { SectionHeader } from '../components/SectionHeader';
import {
  ArrowRight,
  Trophy,
  Star,
  Crown,
  Sparkles,
  Rocket,
  Flame,
  CheckCircle2,
  Flag,
  Zap,
} from 'lucide-react';

interface HistoriaPageProps {
  onNavigate: (page: PageId) => void;
}

export const HistoriaPage: React.FC<HistoriaPageProps> = ({ onNavigate }) => {
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number | null>(0);

  // Icon mapping for Duolingo-style milestone stepping stones
  const getMilestoneIcon = (idx: number, highlight?: boolean) => {
    if (idx === 0) return <Flag className="w-6 h-6 sm:w-7 sm:h-7 text-white" />;
    if (idx === 1) return <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-white" />;
    if (idx === 2) return <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white/20" />;
    if (idx === 3) return <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />;
    if (idx === 4) return <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white/20" />;
    return highlight ? (
      <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white/20" />
    ) : (
      <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white/20" />
    );
  };

  // Duolingo 3D button themes for path nodes
  const nodeThemes = [
    {
      bg: 'bg-[#58cc02] hover:bg-[#61e002]',
      shadow: 'border-b-6 border-[#46a302]',
      badgeBg: 'bg-emerald-50 text-[#46a302] border-emerald-200',
      badgeText: 'text-[#46a302]',
   
    },
  ];

  // Mobile-adapted snake offsets: subtle on small screens, wider on desktop
  const getOffsetClass = (index: number) => {
    const cycle = index % 4;
    switch (cycle) {
      case 0:
        return 'translate-x-0';
      case 1:
        return '-translate-x-6 sm:-translate-x-16 md:-translate-x-24';
      case 2:
        return 'translate-x-0';
      case 3:
        return 'translate-x-6 sm:translate-x-16 md:translate-x-24';
      default:
        return 'translate-x-0';
    }
  };

  return (
    <div id="historia-page" className="w-full flex flex-col pb-10 sm:pb-16">
      {/* 1. Duolingo Unit Header Banner */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto pt-4 sm:pt-8">
        <div className="bg-[#ce82ff] border-b-6 border-[#a557df] rounded-3xl sm:rounded-4xl p-6 sm:p-12 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display leading-[1.1]">
                Construyendo las bases de un holding operador de nueva generación.
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Duolingo-Styled Mobile Snake Timeline Section */}
      <section className="w-full px-3.5 sm:px-8 max-w-3xl mx-auto mt-8 sm:mt-12">
        <div className="relative flex flex-col items-center gap-8 sm:gap-12 py-2">
          {MILESTONES.map((milestone, idx) => {
            const theme = nodeThemes[idx % nodeThemes.length];
            const isSelected = selectedMilestoneIdx === idx;
            const offsetClass = getOffsetClass(idx);

            return (
              <div
                key={idx}
                className="w-full flex flex-col items-center"
              >
                {/* Stepping Node with 3D button effect and snake offset */}
                <div className={`relative flex flex-col items-center z-20 transition-all duration-300 ${offsetClass}`}>
                  {/* Crown on top for highlights */}
                  {milestone.highlight && (
                    <div className="absolute -top-5 sm:-top-6 animate-bounce">
                      <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffc800] fill-[#ffc800] drop-shadow-sm" />
                    </div>
                  )}

                  {/* 3D Round Node Button */}
                  <button
                    id={`duo-milestone-step-${idx}`}
                    onClick={() => setSelectedMilestoneIdx(isSelected ? null : idx)}
                    className={`relative w-18 h-18 sm:w-22 sm:h-22 rounded-full ${theme.bg} ${theme.shadow} active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center cursor-pointer group hover:scale-105 shadow-sm`}
                    aria-label={`Hito ${milestone.year}: ${milestone.title}`}
                  >
                    <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-white/40 flex items-center justify-center">
                      {getMilestoneIcon(idx, milestone.highlight)}
                    </div>

                    {/* Year pill on step */}
                    <span className="absolute -bottom-2.5 bg-[#3c3c3c] text-white text-[9px] sm:text-[10px] font-mono font-bold px-2 sm:px-2.5 py-0.5 rounded-full shadow-xs border-2 border-white">
                      {milestone.year}
                    </span>
                  </button>

                  <span className="mt-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#52525b] font-display">
  {milestone.quarter}
</span>
                </div>

                {/* Duolingo Speech Bubble / Dialog Card */}
                <div
                  className={`mt-3 w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-b-4 border-[#e5e5e5] shadow-xs relative transition-all duration-200 ${
                    isSelected ? 'ring-4 ring-[#58cc02]/30 border-[#58cc02]' : ''
                  }`}
                >
                  <div className="relative z-10">
                    {/* Header with Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 sm:mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#52525b] bg-[#f7f7f7] border border-[#e5e5e5] px-2.5 py-1 rounded-lg">
                          {milestone.year} {milestone.quarter}
                        </span>
                      </div>

                      {milestone.metricsBadge && (
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-black px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                          {milestone.metricsBadge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-lg sm:text-2xl font-black text-[#18181b] mb-2 sm:mb-2.5 tracking-tight">
                      {milestone.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#52525b] font-medium leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Trail Segment */}
                {idx < MILESTONES.length - 1 && (
                  <div className="w-2.5 sm:w-3 h-8 sm:h-10 bg-[#e5e5e5] rounded-full my-1 sm:my-2 relative overflow-hidden">
                    <div className="w-full h-full bg-[#cecece] rounded-full" />
                  </div>
                )}
              </div>
            );
          })}

          {/* End of Path Station */}
          <div className="flex flex-col items-center mt-4 sm:mt-6 z-20">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#ffc800] border-b-6 border-[#e5a500] flex items-center justify-center shadow-md">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white/40" />
            </div>
            <span className="mt-3 text-sm sm:text-base font-black uppercase tracking-wider text-[#18181b] font-display">
              Próximos Horizontes
            </span>
          </div>
        </div>
      </section>

      {/* 3. Principles & Vision Section */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto mt-10 sm:mt-16">
        <div className="bg-white border-2 border-b-4 border-[#e5e5e5] rounded-3xl sm:rounded-4xl p-5 sm:p-10">
          <SectionHeader
            kicker="VALORES FUNDACIONALES"
            title="Lo que permanece inalterable"
            subtitle="Nuestros principios rectores aseguran que cada decisión de expansión mantenga rigor ético y excelencia en la ejecución."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#f7f7f7] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-b-4 border-[#e5e5e5] flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#58cc02] border-b-3 border-[#46a302] text-white font-black text-lg sm:text-xl flex items-center justify-center mb-3.5 sm:mb-4">
                  01
                </span>
                <h3 className="font-display text-lg sm:text-xl font-black text-[#18181b]">
                  Foco en Economía Real y Utilidad
                </h3>
              </div>
            </div>

            <div className="bg-[#f7f7f7] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-b-4 border-[#e5e5e5] flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#1cb0f6] border-b-3 border-[#1899d6] text-white font-black text-lg sm:text-xl flex items-center justify-center mb-3.5 sm:mb-4">
                  02
                </span>
                <h3 className="font-display text-lg sm:text-xl font-black text-[#18181b]">
                  Soberanía Tecnológica
                </h3>
              </div>
            </div>

            <div className="bg-[#f7f7f7] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-b-4 border-[#e5e5e5] flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#ff9600] border-b-3 border-[#e58700] text-white font-black text-lg sm:text-xl flex items-center justify-center mb-3.5 sm:mb-4">
                  03
                </span>
                <h3 className="font-display text-lg sm:text-xl font-black text-[#18181b]">
                  Disciplina de Capital
                </h3>
              </div>
            </div>
          </div>

          {/* Outbound link to brands */}
          <div className="mt-8 sm:mt-10 text-center">
            <button
              onClick={() => onNavigate('marcas')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-4 rounded-2xl duo-btn-green text-sm sm:text-base font-black uppercase tracking-wider cursor-pointer shadow-xs text-center"
            >
              <span>Ver las marcas del holding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
