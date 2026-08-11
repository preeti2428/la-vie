import React, { useEffect, useState } from 'react';
import { Sparkles, Award, CheckCircle, HelpCircle, Briefcase, User } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getBrandingSettings, getImageStyle, ImageTransform } from '../lib/brandingStore';
import { AestheticFrame } from './AestheticFrame';

interface WelcomeGreetingProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const WelcomeGreetingSection: React.FC<WelcomeGreetingProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang].welcome;
  const [photoHero, setPhotoHero] = useState<string>('');
  const [photoTransform, setPhotoTransform] = useState<ImageTransform | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const b = getBrandingSettings();
      setPhotoHero(b.photoHero);
      setPhotoTransform(b.photoHeroTransform);
    };
    update();
    window.addEventListener('lavie_branding_updated', update);
    return () => window.removeEventListener('lavie_branding_updated', update);
  }, []);

  return (
    <section id="welcome" className="py-16 sm:py-20 bg-[#F7F5F2] border-b border-[#2D2926]/10 relative overflow-hidden">
      
      {/* Background Subtle Organic Lighting */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-80 h-80 bg-[#7D8471]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Portrait Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <AestheticFrame text="INTERIOR DESIGN + FENG SHUI">
              <div className="relative aspect-[4/5] overflow-hidden shadow-md border border-[#2D2926]/10 group">
                <img
                  src={photoHero || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80'}
                  alt="Cornelia Schmid - Owner LA VIE ACADEMY GmbH"
                  style={getImageStyle(photoTransform)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="font-serif text-2xl font-light tracking-wide">Cornelia Schmid</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#DCD7D0] font-medium mt-1">
                    Owner &amp; Founder | LA VIE ACADEMY GmbH
                  </div>
                </div>
              </div>
            </AestheticFrame>

            {/* Corner Experience Pill */}
            <div className="absolute -bottom-4 -right-2 glass px-4 py-3 rounded-2xl border border-[#2D2926]/10 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7D8471] text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#2D2926]">15+ Jahre Erfahrung</div>
                <div className="text-[10px] uppercase tracking-wider text-[#2D2926]/60">Feng Shui &amp; Staging</div>
              </div>
            </div>
          </div>

          {/* Text & Actions Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center flex flex-col items-center">
            


            <div className="space-y-4 max-w-xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light leading-tight tracking-tight">
                {t.greeting}
              </h2>
              <p className="font-serif text-2xl sm:text-3xl text-[#7D8471] italic font-light">
                {t.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#2D2926]/80 leading-relaxed font-light max-w-2xl mx-auto mb-8">
              {t.description}
            </p>

            {/* Portfolio Action Button */}
            <div className="pt-4 flex justify-center w-full">
              <a
                href="#portfolio"
                className="inline-block px-10 py-3.5 bg-black text-white text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-black/80 transition-colors"
              >
                TO THE PORTFOLIO
              </a>
            </div>




          </div>

        </div>
      </div>
    </section>
  );
};
