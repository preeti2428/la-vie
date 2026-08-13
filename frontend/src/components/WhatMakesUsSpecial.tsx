import React from 'react';
import { Language } from '../types';

interface WhatMakesUsSpecialProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const WhatMakesUsSpecial: React.FC<WhatMakesUsSpecialProps> = ({ onOpenBooking }) => {
  return (
    <section id="special" className="py-24 bg-[#F7F5F2] border-b border-[#2D2926]/10 relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="max-w-xl mx-auto lg:ml-auto lg:mr-16 text-center space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2D2926] font-light leading-tight">
              Was uns <span className="italic uppercase">BESONDERS</span> macht?
            </h2>
            
            <div className="space-y-4 text-[#2D2926]/80 font-light text-[15px] sm:text-[16px] leading-relaxed tracking-wide">
              <p>
                Wir vereinen Naturwissenschaft, Design und Struktur zu einem Ganzen.<br/>
                Mit analytischem Denken, Sinn für Ästhetik und einem tiefen Verständnis für Materialien, Licht und Raumwirkung gestalten wir Räume mit Substanz.
              </p>
              <p>
                Unser Hintergrund in Chemie und Projektmanagement prägt unsere Arbeitsweise: präzise, organisiert und lösungsorientiert.<br/>
                Gleichzeitig sind wir kreativ, handwerklich verwurzelt und sensibel für Atmosphäre.
              </p>
              <p>
                So entstehen Raumkonzepte, die klar, durchdacht und zugleich inspirierend sind – wo Zahlen und Fakten auf Gefühl und Stil treffen.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={onOpenBooking}
                className="px-10 py-4 bg-[#000000] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#3E3A35] transition-colors shadow-lg"
              >
                ERSTGESPRÄCH VEREINBAREN
              </button>
            </div>
          </div>

          {/* Right Image Content - Collage over Black Box */}
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-end pr-4 sm:pr-8 lg:pr-12">
            {/* The Black Box extending to the right */}
            <div className="absolute top-12 bottom-12 lg:top-20 lg:bottom-20 left-[10%] lg:left-[20%] right-[-50vw] bg-[#000000] z-0" />
            
            {/* Image container fully inside the black box */}
            <div className="relative z-10 w-[85%] sm:w-[75%] h-[90%] flex items-center justify-center">
              <img 
                src="/assets/game/what%20makes%20special.png"
                alt="Was uns BESONDERS macht"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
