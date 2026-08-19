import React from 'react';

interface BytedavLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: string;
}

export const BytedavLogo: React.FC<BytedavLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-[#18181b]',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 3D Duolingo-styled container with the official black "bd" continuous ligature */}
      <div
        className={`${iconSizes[size]} bg-white border-2 border-b-4 border-[#e5e5e5] group-hover:border-[#18181b] rounded-2xl flex items-center justify-center p-1 shadow-xs transition-all`}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Continuous bd infinity ligature */}
          <g stroke="#141414" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Left ascender (b) */}
            <path d="M54 38 V118" />
            {/* Left loop (b) */}
            <circle cx="80" cy="118" r="26" />
            {/* Right loop (d) */}
            <circle cx="120" cy="118" r="26" />
            {/* Right ascender (d) */}
            <path d="M146 38 V118" />
          </g>
        </svg>
      </div>

      {showText && (
        <span
          className={`${textSizes[size]} font-black tracking-tight ${textColor} leading-none font-display lowercase`}
        >
          bytedav
        </span>
      )}
    </div>
  );
};
