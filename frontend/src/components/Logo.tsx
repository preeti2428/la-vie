import React, { useEffect, useState } from 'react';
import { getBrandingSettings, getImageStyle, ImageTransform } from '../lib/brandingStore';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'gold';
  showSubtitle?: boolean;
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = true,
  layout = 'horizontal',
  size = 'md',
}) => {
  const [customLogo, setCustomLogo] = useState<string>('');
  const [logoTransform, setLogoTransform] = useState<ImageTransform | undefined>(undefined);

  useEffect(() => {
    const updateLogo = () => {
      const settings = getBrandingSettings();
      setCustomLogo(settings.logoUrl || '');
      setLogoTransform(settings.logoTransform);
    };

    updateLogo();
    window.addEventListener('lavie_branding_updated', updateLogo);
    return () => window.removeEventListener('lavie_branding_updated', updateLogo);
  }, []);

  const textColor = variant === 'light' ? '#FFFFFF' : variant === 'gold' ? '#9E8963' : '#1A1817';
  const subtitleColor = variant === 'light' ? '#DCD7D0' : variant === 'gold' ? '#8C7B5D' : '#6B6560';
  const ribbonColor = variant === 'light' ? '#FFFFFF' : variant === 'gold' ? '#9E8963' : '#1A1817';

  if (customLogo) {
    return (
      <div className={`inline-flex items-center shrink-0 select-none overflow-hidden ${className}`}>
        <img
          src={customLogo}
          alt="LA VIE Interiors & Feng Shui"
          style={getImageStyle(logoTransform)}
          className={`transition-all ${
            size === 'lg' ? 'h-14 sm:h-16' : size === 'sm' ? 'h-7 sm:h-8' : 'h-9 sm:h-10'
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex shrink-0 ${
        layout === 'vertical' ? 'flex-col items-center text-center' : 'items-center gap-2.5 sm:gap-3'
      } select-none whitespace-nowrap ${className}`}
    >
      {/* Wave / Ribbon Icon - Matching exact sweeping line-art ribbon from image */}
      <div className="shrink-0 flex items-center justify-center">
        <svg
          width={size === 'lg' ? '46' : size === 'sm' ? '30' : '38'}
          height={size === 'lg' ? '40' : size === 'sm' ? '26' : '33'}
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Dense parallel line bundle creating the fluid vertical V-wave */}
          {Array.from({ length: 22 }).map((_, i) => {
            const offset = i * 1.1;
            const opacity = 0.35 + (i / 22) * 0.65;
            return (
              <path
                key={i}
                d={`M ${32 + offset} 6 C ${18 + offset} 32, ${42 + offset} 82, ${72 + offset} 76 C ${88 + offset} 73, ${98 + offset} 52, ${104 + offset} 48`}
                stroke={ribbonColor}
                strokeWidth="1.2"
                strokeOpacity={opacity}
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </svg>
      </div>

      {/* Text Branding */}
      <div className={`flex flex-col justify-center ${layout === 'vertical' ? 'items-center mt-1' : ''}`}>
        {/* Main Title: LA VIE */}
        <div
          className={`font-serif tracking-[0.22em] font-medium uppercase leading-none ${
            size === 'lg' ? 'text-2xl sm:text-3xl' : size === 'sm' ? 'text-base' : 'text-lg sm:text-xl'
          }`}
          style={{ color: textColor, fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          LA VIE
        </div>

        {/* Subtitle: INTERIORS & FENG SHUI */}
        {showSubtitle && (
          <div
            className={`uppercase tracking-[0.2em] font-sans font-medium whitespace-nowrap ${
              size === 'lg' ? 'text-[10px] mt-1.5' : size === 'sm' ? 'text-[8px] mt-0.5' : 'text-[9px] mt-1'
            }`}
            style={{ color: subtitleColor }}
          >
            INTERIORS &amp; FENG SHUI
          </div>
        )}
      </div>
    </div>
  );
};
