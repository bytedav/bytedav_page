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
      {/* 3D container with the official bytedav image */}
      <div
        className={`${iconSizes[size]} bg-white border-2 border-b-4 border-[#e5e5e5] group-hover:border-[#18181b] rounded-2xl flex items-center justify-center p-1 shadow-xs transition-all overflow-hidden`}
      >
        <img
          src="/bytedav.png"
          alt="Bytedav Logo"
          className="w-full h-full object-contain rounded-xl"
        />
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
