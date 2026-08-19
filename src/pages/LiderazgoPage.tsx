import React from 'react';
import { LEADERS } from '../data/holdingData';
import { LeaderCard } from '../components/LeaderCard';

export const LiderazgoPage: React.FC = () => {
  return (
    <div id="liderazgo-page" className="w-full flex flex-col pb-10 sm:pb-16">
      {/* 1. Duolingo Unit Header Banner */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto pt-4 sm:pt-8">
        <div className="bg-[#ff9600] border-b-6 border-[#e58700] rounded-3xl sm:rounded-4xl p-6 sm:p-12 text-white shadow-md">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display leading-[1.1]">
            Quien firma cada decisión.
          </h1>
        </div>
      </section>

      {/* 2. Executive Team Section */}
      <section className="w-full px-3.5 sm:px-8 max-w-7xl mx-auto mt-8 sm:mt-12">
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
