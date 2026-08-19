import React from 'react';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  subtitle,
  align = 'left',
  className = '',
  dark = false,
}) => {
  return (
    <div className={`mb-8 md:mb-10 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {/* Duolingo Pill Kicker */}
      {kicker && (
        <div className={`flex items-center gap-2 mb-2 sm:mb-3 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
          <span
            className={`inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider ${
              dark
                ? 'bg-white/10 text-white border border-white/20'
                : 'bg-[#e5f6ff] text-[#1cb0f6] border border-[#84d8ff]'
            }`}
          >
            {kicker}
          </span>
        </div>
      )}

      <h2
        className={`font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-[#3c3c3c]'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-2.5 sm:mt-3 text-sm sm:text-lg md:text-xl max-w-3xl font-semibold leading-relaxed ${
            dark ? 'text-white/80' : 'text-[#52525b]'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
