import React from 'react';
import { PageId } from '../types';
import { LEADERS } from '../data/holdingData';
import { LeaderCard } from '../components/LeaderCard';
import { Users } from 'lucide-react';

interface LiderazgoPageProps {
  onNavigate: (page: PageId) => void;
}

export const LiderazgoPage: React.FC<LiderazgoPageProps> = () => {
  return (
    <div id="liderazgo-page" className="w-full flex flex-col pb-10 sm:pb-16">
      {/* 1. Duolingo Unit Header Banner */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto pt-4 sm:pt-8">
        <div className="bg-[#ff9600] border-b-6 border-[#e58700] rounded-3xl sm:rounded-4xl p-5 sm:p-10 text-white shadow-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Liderazgo y Gobernanza</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Quien firma cada decisión.
          </h1>
        </div>
      </section>

      {/* 2. Executive Team Section */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto mt-6 sm:mt-10">
        <div className="w-full flex flex-col gap-6 sm:gap-8">
          {LEADERS.map((leader) => (
            <LeaderCard
              key={leader.id}
              leader={leader}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
