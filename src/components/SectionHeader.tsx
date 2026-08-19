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
        <div className={`flex items-center gap-2 mb-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider ${
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
        className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-[#3c3c3c]'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-2 text-sm sm:text-base max-w-3xl font-semibold leading-relaxed ${
            dark ? 'text-white/80' : 'text-[#777777]'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
