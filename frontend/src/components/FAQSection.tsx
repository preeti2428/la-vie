import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FAQSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang].faq;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
    { q: t.q5, a: t.a5 },
  ];

  return (
    <section id="faq" className="py-20 bg-[#F7F5F2] border-b border-[#2D2926]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.2em] bg-[#7D8471] text-white px-3 py-1  font-medium inline-block shadow-sm">
            {t.tag}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light leading-tight tracking-tight">
            {t.title}
          </h2>

          <p className="text-sm text-[#2D2926]/70 font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass  border border-[#2D2926]/10 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-white/50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-light text-[#2D2926]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8  bg-[#7D8471]/15 text-[#7D8471] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#7D8471] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#2D2926]/80 leading-relaxed font-light border-t border-[#2D2926]/10 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center p-8 glass  border border-[#2D2926]/10 space-y-4">
          <h3 className="font-serif text-xl font-light text-[#2D2926]">
            Noch Fragen offen?
          </h3>
          <p className="text-xs sm:text-sm text-[#2D2926]/70 font-light max-w-md mx-auto">
            Sprich direkt in einer 1:1 Videosession mit Cornelia Schmid und kläre dein individuelles Raumkonzept.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3  bg-[#7D8471] hover:bg-[#6C7360] text-white font-medium text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white" />
            <span>Persönliches Gespräch buchen (€199)</span>
          </button>
        </div>

      </div>
    </section>
  );
};

