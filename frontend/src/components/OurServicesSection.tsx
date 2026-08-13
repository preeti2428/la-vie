import React from 'react';
import { Language } from '../types';

interface OurServicesSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const OurServicesSection: React.FC<OurServicesSectionProps> = ({ currentLang, onOpenBooking }) => {
  return (
    <section id="services" className="py-16 sm:py-20 bg-[#F9F8F6] border-b border-[#2D2926]/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2D2926] font-light tracking-tight">
            <span className="italic">Unser</span> SERVICE
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2D2926]/15">
          
          {/* Column 1: Raumkonzepte */}
          <div className="flex flex-col items-center text-center p-8 lg:p-12">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2926] italic font-light mb-6">
              Raumkonzepte
            </h3>
            <p className="text-[#2D2926]/80 font-light text-sm sm:text-base leading-relaxed mb-10 min-h-[100px]">
              Von 2D-Skizzen über 3D-Pläne und Shoppinglisten bis zu
              fotorealistischen Visualisierungen nach Feng Shui - wir bringen dein
              Raumkonzept zum Leben.
            </p>
            <a
              href="#portfolio"
              className="px-8 py-3 bg-[#A38D82] text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#8B776D] transition-colors"
            >
              ZUM PAKET
            </a>
          </div>

          {/* Column 2: Call a Designer */}
          <div className="flex flex-col items-center text-center p-8 lg:p-12">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2926] italic font-light mb-6">
              Call a Designer
            </h3>
            <p className="text-[#2D2926]/80 font-light text-sm sm:text-base leading-relaxed mb-10 min-h-[100px]">
              Eine Stunde individuelle Beratung, genau auf deine aktuellen Fragen
              zu Interiors &amp; Feng Shui zugeschnitten. Hol dir Klarheit, Ideen und
              Lösungen für deinen Raum.
            </p>
            <button
              onClick={onOpenBooking}
              className="px-8 py-3 bg-[#A38D82] text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#8B776D] transition-colors"
            >
              TERMIN VEREINBAREN
            </button>
          </div>

          {/* Column 3: Virtuelles Staging */}
          <div className="flex flex-col items-center text-center p-8 lg:p-12">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2926] italic font-light mb-6">
              Virtuelles Staging
            </h3>
            <p className="text-[#2D2926]/80 font-light text-sm sm:text-base leading-relaxed mb-10 min-h-[100px]">
              Für Immobilienmakler &amp; Architekten.
              Räume fotorealistisch visualisieren, schneller verkaufen und
              Designentscheidungen sicher treffen.
            </p>
            <a
              href="#portfolio"
              className="px-8 py-3 bg-[#A38D82] text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#8B776D] transition-colors"
            >
              MEHR INFOS
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
