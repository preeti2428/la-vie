import React from 'react';
import { PhoneCall, Sparkles, Box, Palette, ArrowRight, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface OurServicesSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const OurServicesSection: React.FC<OurServicesSectionProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang].services;

  const services = [
    {
      id: 'call-a-designer',
      title: t.service1Title,
      desc: t.service1Desc,
      price: '€199',
      duration: '60 Min. Call',
      icon: PhoneCall,
      popular: true,
      features: [
        '1:1 Live Video Coaching mit Cornelia Schmid',
        'Grundriss & Licht-Analyse nach Feng Shui',
        'Farbberatung nach der 60-30-10 Regel',
        'Nachbesprechungs-Summary PDF mit Farbcodes',
      ],
    },
    {
      id: 'virtual-staging',
      title: t.service2Title,
      desc: t.service2Desc,
      price: 'ab €149 / Raum',
      duration: '24-48h Lieferung',
      icon: Box,
      popular: false,
      features: [
        'Photorealistisches 3D Staging in 4K',
        'Auswahl stilvoller Designermöbel',
        'Optimal für leere oder sanierungsbedürftige Objekte',
        'Steigert die Anfragenquote um bis zu +85%',
      ],
    },
    {
      id: 'feng-shui',
      title: t.service3Title,
      desc: t.service3Desc,
      price: 'Auf Anfrage',
      duration: 'Individuell',
      icon: Sparkles,
      popular: false,
      features: [
        'Umfassende Bagua- & Elementen-Analyse',
        'Entstörung von Schlaf- & Arbeitsbereichen',
        'Aktivierung des Sheng Qi Energieflusses',
        'Für Wohnhäuser, Praxen & Firmengebäude',
      ],
    },
    {
      id: 'color-concept',
      title: t.service4Title,
      desc: t.service4Desc,
      price: 'ab €299',
      duration: 'Maßgeschneidert',
      icon: Palette,
      popular: false,
      features: [
        'Exakte Farbdramaturgie (NCS / RAL Töne)',
        'Harmonische Abstimmung von Wand, Stoffen & Holz',
        'Inklusive konkreter Bezugsquellen & Links',
        'Wissenschaftlich fundierter Psychologie-Effekt',
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F7F5F2] border-b border-[#2D2926]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.2em] bg-[#7D8471] text-white px-3 py-1 rounded-full font-medium inline-block shadow-sm">
            {t.tag}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light leading-tight tracking-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-[#2D2926]/70 font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className={`glass p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative ${
                  srv.popular
                    ? 'border-[#7D8471] bg-white shadow-md'
                    : 'border-[#2D2926]/10 hover:border-[#7D8471]/40'
                }`}
              >
                {srv.popular && (
                  <span className="absolute -top-3.5 right-8 bg-[#7D8471] text-white text-[10px] uppercase tracking-widest font-medium px-3.5 py-1 rounded-full shadow-sm">
                    Meistgebucht
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#7D8471]/15 text-[#7D8471] flex items-center justify-center">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-2xl font-light text-[#2D2926]">{srv.price}</div>
                      <div className="text-[10px] text-[#7D8471] uppercase tracking-widest font-medium">{srv.duration}</div>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-light text-[#2D2926] mb-3">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2D2926]/75 leading-relaxed font-light mb-6">
                    {srv.desc}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-2.5 mb-8">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2D2926]/80 font-light">
                        <Check className="w-4 h-4 text-[#7D8471] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 rounded-full font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all ${
                    srv.popular
                      ? 'bg-[#7D8471] text-white hover:bg-[#6C7360]'
                      : 'bg-[#2D2926] text-[#F7F5F2] hover:bg-[#1A1816]'
                  }`}
                >
                  <span>{t.bookNow}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
