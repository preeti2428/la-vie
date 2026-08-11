import React from 'react';
import { Sparkles, ShieldCheck, Box, Palette, Zap, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface WhatMakesUsSpecialProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const WhatMakesUsSpecial: React.FC<WhatMakesUsSpecialProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang].special;

  const pillars = [
    {
      icon: Box,
      title: t.pillar1Title,
      desc: t.pillar1Desc,
      highlight: 'Photorealismus',
    },
    {
      icon: Sparkles,
      title: t.pillar2Title,
      desc: t.pillar2Desc,
      highlight: 'Sheng Qi',
    },
    {
      icon: Palette,
      title: t.pillar3Title,
      desc: t.pillar3Desc,
      highlight: '60-30-10 Rule',
    },
    {
      icon: ShieldCheck,
      title: t.pillar4Title,
      desc: t.pillar4Desc,
      highlight: '100% Quality',
    },
    {
      icon: Zap,
      title: t.pillar5Title,
      desc: t.pillar5Desc,
      highlight: '24h Express',
    },
  ];

  return (
    <section id="special" className="py-20 bg-[#F7F5F2] border-b border-[#2D2926]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
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

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="glass p-7 rounded-3xl border border-[#2D2926]/10 hover:border-[#7D8471]/50 shadow-sm transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#7D8471]/15 text-[#7D8471] group-hover:bg-[#7D8471] group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#2D2926]/50 font-medium bg-[#E6E2DC] px-2.5 py-0.5 rounded-full">
                      {p.highlight}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-light text-[#2D2926] mb-2">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2D2926]/75 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#2D2926]/10 flex items-center gap-1.5 text-[11px] font-medium text-[#7D8471]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>LA VIE Qualitätsversprechen</span>
                </div>
              </div>
            );
          })}

          {/* Call a Designer Feature Box */}
          <div className="bg-[#2D2926] text-[#F7F5F2] p-7 rounded-3xl border border-white/10 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] bg-[#7D8471] text-white px-2.5 py-0.5 rounded-full font-medium inline-block">
                Express Coaching
              </span>
              <h3 className="font-serif text-2xl font-light tracking-tight">
                Call a Designer (€199)
              </h3>
              <p className="text-xs text-[#DCD7D0]/80 leading-relaxed font-light">
                60 Minuten Live-Session mit Cornelia Schmid. Erhalte direkte Lösungen für Farben, Möbel & Feng Shui Grundriss-Optimierung.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-6 w-full py-3 rounded-full bg-[#7D8471] hover:bg-[#6C7360] text-white font-medium text-xs uppercase tracking-widest transition-all shadow-sm"
            >
              Termin Buchen (€199)
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
