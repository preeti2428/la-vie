import React from 'react';
import { Language } from '../types';

interface OurServicesSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const OurServicesSection: React.FC<OurServicesSectionProps> = ({ currentLang, onOpenBooking }) => {
  const t = {
    de: {
      title1: "Unser",
      title2: "SERVICE",
      service1Title: "Raumkonzepte",
      service1Desc: "Von 2D-Skizzen über 3D-Pläne und Shoppinglisten bis zu fotorealistischen Visualisierungen nach Feng Shui - wir bringen dein Raumkonzept zum Leben.",
      service1Btn: "ZUM PAKET",
      service2Title: "Call a Designer",
      service2Desc: "Eine Stunde individuelle Beratung, genau auf deine aktuellen Fragen zu Interiors & Feng Shui zugeschnitten. Hol dir Klarheit, Ideen und Lösungen für deinen Raum.",
      service2Btn: "TERMIN VEREINBAREN",
      service3Title: "Virtuelles Staging",
      service3Desc: "Für Immobilienmakler & Architekten. Räume fotorealistisch visualisieren, schneller verkaufen und Designentscheidungen sicher treffen.",
      service3Btn: "MEHR INFOS"
    },
    en: {
      title1: "Our",
      title2: "SERVICES",
      service1Title: "Space Concepts",
      service1Desc: "From 2D sketches to 3D plans and shopping lists, down to photorealistic Feng Shui visualizations - we bring your space concept to life.",
      service1Btn: "TO THE PACKAGE",
      service2Title: "Call a Designer",
      service2Desc: "One hour of personalized advice, tailored exactly to your current interior & Feng Shui questions. Get clarity, ideas, and solutions for your space.",
      service2Btn: "BOOK APPOINTMENT",
      service3Title: "Virtual Staging",
      service3Desc: "For real estate agents & architects. Visualize spaces photorealistically, sell faster, and make design decisions with confidence.",
      service3Btn: "MORE INFO"
    }
  }[currentLang];

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#F9F8F6] border-b border-[#2D2926]/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2D2926] font-light tracking-tight">
            <span className="italic">{t.title1}</span> {t.title2}
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2D2926]/15">
          
          {/* Column 1: Raumkonzepte */}
          <div className="flex flex-col items-center text-center p-8 lg:p-12">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2926] italic font-light mb-6">
              {t.service1Title}
            </h3>
            <p className="text-[#2D2926]/80 font-light text-sm sm:text-base leading-relaxed mb-10 min-h-[100px]">
              {t.service1Desc}
            </p>
            <a
              href="#portfolio"
              className="px-8 py-3 bg-[#A38D82] text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#8B776D] transition-colors"
            >
              {t.service1Btn}
            </a>
          </div>

          {/* Column 2: Call a Designer */}
          <div className="flex flex-col items-center text-center p-8 lg:p-12">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2926] italic font-light mb-6">
              {t.service2Title}
            </h3>
            <p className="text-[#2D2926]/80 font-light text-sm sm:text-base leading-relaxed mb-10 min-h-[100px]">
              {t.service2Desc}
            </p>
            <button
              onClick={onOpenBooking}
              className="px-8 py-3 bg-[#A38D82] text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#8B776D] transition-colors"
            >
              {t.service2Btn}
            </button>
          </div>

          {/* Column 3: Virtuelles Staging */}
          <div className="flex flex-col items-center text-center p-8 lg:p-12">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2926] italic font-light mb-6">
              {t.service3Title}
            </h3>
            <p className="text-[#2D2926]/80 font-light text-sm sm:text-base leading-relaxed mb-10 min-h-[100px]">
              {t.service3Desc}
            </p>
            <a
              href="#portfolio"
              className="px-8 py-3 bg-[#A38D82] text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#8B776D] transition-colors"
            >
              {t.service3Btn}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
