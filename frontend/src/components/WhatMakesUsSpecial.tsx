import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { getBrandingSettings, getImageStyle, ImageTransform } from '../lib/brandingStore';

interface WhatMakesUsSpecialProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const WhatMakesUsSpecial: React.FC<WhatMakesUsSpecialProps> = ({ currentLang, onOpenBooking }) => {
  const [photoSpecial, setPhotoSpecial] = useState<string>('');
  const [photoTransform, setPhotoTransform] = useState<ImageTransform | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const b = getBrandingSettings();
      setPhotoSpecial(b.photoSpecial || '/lavie.png');
      setPhotoTransform(b.photoSpecialTransform);
    };
    update();
    window.addEventListener('lavie_branding_updated', update);
    return () => window.removeEventListener('lavie_branding_updated', update);
  }, []);

  const t = {
    de: {
      title1: "Was uns",
      title2: "BESONDERS",
      title3: "macht?",
      para1a: "Wir vereinen Naturwissenschaft, Design und Struktur zu einem Ganzen.",
      para1b: "Mit analytischem Denken, Sinn für Ästhetik und einem tiefen Verständnis für Materialien, Licht und Raumwirkung gestalten wir Räume mit Substanz.",
      para2a: "Unser Hintergrund in Chemie und Projektmanagement prägt unsere Arbeitsweise: präzise, organisiert und lösungsorientiert.",
      para2b: "Gleichzeitig sind wir kreativ, handwerklich verwurzelt und sensibel für Atmosphäre.",
      para3: "So entstehen Raumkonzepte, die klar, durchdacht und zugleich inspirierend sind – wo Zahlen und Fakten auf Gefühl und Stil treffen.",
      btn: "ERSTGESPRÄCH VEREINBAREN",
      altText: "Was uns BESONDERS macht"
    },
    en: {
      title1: "What makes us",
      title2: "SPECIAL",
      title3: "?",
      para1a: "We unite natural science, design, and structure into a whole.",
      para1b: "With analytical thinking, a sense of aesthetics, and a deep understanding of materials, light, and spatial effect, we design spaces with substance.",
      para2a: "Our background in chemistry and project management shapes our way of working: precise, organized, and solution-oriented.",
      para2b: "At the same time, we are creative, rooted in craftsmanship, and sensitive to atmosphere.",
      para3: "This is how spatial concepts are created that are clear, well-thought-out, and inspiring at the same time – where facts and figures meet feeling and style.",
      btn: "BOOK INITIAL CONSULTATION",
      altText: "What makes us SPECIAL"
    }
  }[currentLang];

  return (
    <section id="special" className="py-24 bg-[#F7F5F2] border-b border-[#2D2926]/10 relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="max-w-xl mx-auto lg:ml-auto lg:mr-16 text-center space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2D2926] font-light leading-tight">
              {t.title1} <span className="italic uppercase">{t.title2}</span> {t.title3}
            </h2>
            
            <div className="space-y-4 text-[#2D2926]/80 font-light text-[15px] sm:text-[16px] leading-relaxed tracking-wide">
              <p>
                {t.para1a}<br/>
                {t.para1b}
              </p>
              <p>
                {t.para2a}<br/>
                {t.para2b}
              </p>
              <p>
                {t.para3}
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={onOpenBooking}
                className="px-10 py-4 bg-[#000000] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#3E3A35] transition-colors shadow-lg"
              >
                {t.btn}
              </button>
            </div>
          </div>

          {/* Right Image Content - Collage over Black Box */}
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-end pr-4 sm:pr-8 lg:pr-12">
            {/* The Black Box extending to the right */}
            <div className="absolute top-12 bottom-12 lg:top-20 lg:bottom-20 left-[10%] lg:left-[20%] right-[-50vw] bg-[#000000] z-0" />
            
            {/* Image container fully inside the black box */}
            <div className="relative z-10 w-[85%] sm:w-[75%] h-[90%] flex items-center justify-center overflow-hidden">
              <img 
                src={photoSpecial}
                alt={t.altText}
                style={getImageStyle(photoTransform)}
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
