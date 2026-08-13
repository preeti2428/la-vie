import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroLuxuryProps {
  currentLang: Language;
}

export const HeroLuxury: React.FC<HeroLuxuryProps> = ({ currentLang }) => {
  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#2D2926]">
      {/* Background Image / Video Simulation */}
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
        alt="Luxury Interior"
        className="absolute inset-0 w-full h-full object-cover opacity-80 animate-slow-pan"
      />
      <div className="absolute inset-0 bg-black/40 transition-colors duration-1000 hover:bg-black/20"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-wide mb-6 opacity-0 animate-slide-up drop-shadow-xl" style={{ animationDelay: '0.2s' }}>
          Spaces made to be lived in
        </h1>
        <p className="text-white/90 text-xs md:text-sm font-medium tracking-[0.3em] uppercase max-w-2xl opacity-0 animate-slide-up drop-shadow-md" style={{ animationDelay: '0.4s' }}>
          LA VIE ACADEMY • INTERIOR DESIGN & FENG SHUI
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <span className="text-white/80 text-[10px] uppercase tracking-[0.2em] mb-3">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[slideDown_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
};
