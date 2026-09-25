import React from 'react';

export type LogoVariant = 'full' | 'compact' | 'icon' | 'badge' | 'print';
export type LogoTheme = 'dark' | 'light' | 'monochrome';
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  className?: string;
  showTagline?: boolean;
  taglineText?: string;
  onClick?: () => void;
  asLink?: boolean;
}

/**
 * Official SAFRA Logo Component.
 * Pixel-accurate vector replica of the user's brand identity:
 * - Upper Sage Green circular arch (top loop of the S)
 * - Terracotta Brown horizontal soil line and bottom curved bowl
 * - Two organic leaves sprouting from the soil bed
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'compact',
  theme = 'light',
  size = 'md',
  className = '',
  showTagline = false,
  taglineText = 'Sistema de Acompanhamento Fácil de Rotinas Agrícolas',
  onClick,
  asLink = false
}) => {
  // Sizing tokens
  const iconDimensions: Record<LogoSize, { box: string; svg: string }> = {
    xs: { box: 'w-6 h-6', svg: 'w-6 h-6' },
    sm: { box: 'w-8 h-8', svg: 'w-8 h-8' },
    md: { box: 'w-10 h-10', svg: 'w-10 h-10' },
    lg: { box: 'w-12 h-12', svg: 'w-12 h-12' },
    xl: { box: 'w-16 h-16', svg: 'w-16 h-16' }
  };

  const titleSizes: Record<LogoSize, string> = {
    xs: 'text-sm tracking-wider font-extrabold',
    sm: 'text-base tracking-wider font-black',
    md: 'text-xl tracking-wider font-black',
    lg: 'text-2xl tracking-wider font-black',
    xl: 'text-3xl tracking-widest font-black'
  };

  const taglineSizes: Record<LogoSize, string> = {
    xs: 'text-[8px] leading-tight',
    sm: 'text-[9px] leading-tight',
    md: 'text-[10px] leading-tight',
    lg: 'text-[11px] leading-tight',
    xl: 'text-xs leading-tight'
  };

  // Color tokens
  const getColors = () => {
    if (theme === 'monochrome') {
      return {
        topArch: '#000000',
        soilLine: '#000000',
        leafFill: 'transparent',
        leafStroke: '#000000',
        leafVein: '#000000',
        mainStrokeWidth: 7.2
      };
    }
    if (theme === 'dark') {
      return {
        topArch: '#A7C9A1',
        soilLine: '#8D4322',
        leafFill: '#38632C',
        leafStroke: '#193910',
        leafVein: '#193910',
        mainStrokeWidth: 7.2
      };
    }
    // Default light theme (matching the user's image exactly)
    return {
      topArch: '#9DC297',
      soilLine: '#793A1E',
      leafFill: '#325B27',
      leafStroke: '#1A3B12',
      leafVein: '#1A3B12',
      mainStrokeWidth: 7.2
    };
  };

  const colors = getColors();

  // Vector SVG reproduction of the exact logo
  const renderOfficialMark = (customClass?: string) => (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${customClass || iconDimensions[size].svg} transition-transform duration-200 group-hover:scale-105 shrink-0`}
    >
      {/* 1. Sprouting Leaves from behind the soil line (y = 48.5) */}
      <g>
        {/* Left Leaf (smaller, pointed ~10:30) */}
        <path
          d="M 43 48.5 C 38 43 32.5 39 34.5 33.5 C 37 32 42.5 37 46 43 C 46.8 44.8 47.2 46.8 47.5 48.5 Z"
          fill={colors.leafFill}
          stroke={colors.leafStroke}
          strokeWidth="2.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Left Leaf central vein */}
        <path
          d="M 44.5 48.5 C 42 43.5 38 38 35.5 34"
          stroke={colors.leafVein}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Right Leaf (larger, pointed ~1:30) */}
        <path
          d="M 47.5 48.5 C 46.5 39 54 27.5 69.5 24.5 C 69 34 62.5 42.5 51 48.5 Z"
          fill={colors.leafFill}
          stroke={colors.leafStroke}
          strokeWidth="3.0"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Right Leaf central vein */}
        <path
          d="M 48.5 48 C 53 40.5 59.5 32 68 25.5"
          stroke={colors.leafVein}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* 2. Top Arch (Light Sage Green)
          Starts on right at (84.5, 41), sweeps counterclockwise over the top to (15.5, 48.5) */}
      <path
        d="M 84.5 41 A 35.5 35.5 0 0 0 15.5 48.5"
        stroke={colors.topArch}
        strokeWidth={colors.mainStrokeWidth}
        strokeLinecap="round"
      />

      {/* 3. Soil Divider & Bottom Bowl (Terracotta Brown)
          Starts at (15.5, 48.5), goes straight across to (84.5, 48.5),
          then curves down and around the circle to (16.5, 61.5) */}
      <path
        d="M 15.5 48.5 L 84.5 48.5 A 35.5 35.5 0 0 1 16.5 61.5"
        stroke={colors.soilLine}
        strokeWidth={colors.mainStrokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Variant: Print (for high-contrast black & white forms)
  if (variant === 'print') {
    return (
      <div className={`flex items-center gap-2.5 text-black font-sans ${className}`}>
        <div className="w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center p-1 shrink-0 bg-white">
          <svg viewBox="0 0 100 100" fill="none" className="w-7 h-7 text-black">
            {/* Left Leaf */}
            <path
              d="M 43 48.5 C 38 43 32.5 39 34.5 33.5 C 37 32 42.5 37 46 43 C 46.8 44.8 47.2 46.8 47.5 48.5 Z"
              fill="none"
              stroke="#000"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path d="M 44.5 48.5 C 42 43.5 38 38 35.5 34" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Right Leaf */}
            <path
              d="M 47.5 48.5 C 46.5 39 54 27.5 69.5 24.5 C 69 34 62.5 42.5 51 48.5 Z"
              fill="none"
              stroke="#000"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path d="M 48.5 48 C 53 40.5 59.5 32 68 25.5" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />

            {/* Top Arch */}
            <path d="M 84.5 41 A 35.5 35.5 0 0 0 15.5 48.5" stroke="#000" strokeWidth="7.5" strokeLinecap="round" />
            {/* Bottom Bowl */}
            <path d="M 15.5 48.5 L 84.5 48.5 A 35.5 35.5 0 0 1 16.5 61.5" stroke="#000" strokeWidth="7.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="leading-tight">
          <span className="block font-black text-xl tracking-wider text-black">
            SAFRA
          </span>
          <span className="block text-[9px] font-semibold uppercase tracking-wider text-gray-800">
            Sistema Agropecuário
          </span>
        </div>
      </div>
    );
  }

  // Variant: Icon only
  if (variant === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center shrink-0 ${iconDimensions[size].box} ${
          onClick ? 'cursor-pointer hover:opacity-90' : ''
        } ${className}`}
        title="SAFRA - Sistema de Acompanhamento Fácil de Rotinas Agrícolas"
      >
        {renderOfficialMark()}
      </div>
    );
  }

  // Variant: Badge (Pill with emblem)
  if (variant === 'badge') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border ${
          theme === 'dark'
            ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-200'
            : 'bg-emerald-50 border-emerald-200/80 text-emerald-900'
        } ${onClick ? 'cursor-pointer hover:bg-emerald-100 transition-colors' : ''} ${className}`}
      >
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {renderOfficialMark('w-4 h-4')}
        </div>
        <span className="text-xs font-black tracking-wider uppercase">SAFRA</span>
      </div>
    );
  }

  // Variant: Full or Compact
  return (
    <div
      onClick={onClick}
      className={`group inline-flex items-center gap-2 sm:gap-2.5 transition-opacity select-none ${
        onClick || asLink ? 'cursor-pointer hover:opacity-90' : ''
      } ${className}`}
    >
      {/* Clean Emblem with no artificial square box */}
      <div className={`shrink-0 flex items-center justify-center ${iconDimensions[size].box}`}>
        {renderOfficialMark()}
      </div>

      {/* Typography Lockup: Appears exactly ONCE */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className={`block leading-none ${titleSizes[size]} ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            SAFRA
          </span>
          {variant === 'full' && (
            <span
              className={`hidden sm:inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${
                theme === 'dark'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              Agro
            </span>
          )}
        </div>

        {(showTagline || variant === 'full') && (
          <span
            className={`block truncate mt-0.5 font-medium ${taglineSizes[size]} ${
              theme === 'dark' ? 'text-emerald-300/80' : 'text-emerald-800/80'
            }`}
          >
            {taglineText}
          </span>
        )}
      </div>
    </div>
  );
};
