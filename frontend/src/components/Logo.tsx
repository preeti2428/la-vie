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

  return (
    <div
      className={`inline-flex shrink-0 ${
        layout === 'vertical' ? 'flex-col items-center text-center' : 'items-center gap-2.5 sm:gap-3'
      } select-none whitespace-nowrap ${className}`}
    >
      <img
        src="/logo.png"
        alt="LA VIE Interiors & Feng Shui"
        className={`transition-all ${
          size === 'lg' ? 'h-24 sm:h-28' : size === 'sm' ? 'h-8 sm:h-10' : 'h-12 sm:h-14'
        } ${variant === 'light' ? 'invert opacity-90' : ''} ${variant === 'gold' ? 'sepia hue-rotate-15' : ''}`}
      />
    </div>
  );
};
