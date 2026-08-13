import React from 'react';
import { PhoneCall, Check, Clock, Video, FileText, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { CONSULTATION_TYPES } from '../data/mockData';

interface CallADesignerSectionProps {
  onOpenBooking: () => void;
}

export const CallADesignerSection: React.FC<CallADesignerSectionProps> = ({ onOpenBooking }) => {
  const callADesignerService = CONSULTATION_TYPES[0];

  return (
    <section id="call-a-designer" className="py-20 bg-[#23201D] text-[#F7F5F2] relative overflow-hidden">
      
      {/* Top Divider for visual separation from previous dark section */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8A7B9B]/40 to-transparent" />
      
      {/* Background Subtle Organic Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7D8471]/15  blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5  blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7">
            
            <span className="text-[10px] uppercase tracking-[0.2em] bg-[#7D8471] text-white px-2.5 py-0.5 mb-4 inline-block font-medium">
              Call a Designer • 1 Hour Consultation
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-light leading-tight text-white mb-6 tracking-tight">
              1 Stunde mit Cornelia Schmid. <br />
              <span className="italic opacity-85 text-[#E6E2DC]">Sofortige Klarheit für deine Räume.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#DCD7D0] leading-relaxed mb-8 font-light">
              Kein monatelanges Warten, keine unkalkulierbaren Agenturkosten. In einer gezielten 60-minütigen Live-Videosession analysiert Cornelia Schmid deinen Grundriss, wählt Farbpaletten nach der 60-30-10 Regel aus und löst deine Design-Dilemmas.
            </p>

          </div>

          {/* Right Card Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#F7F5F2] text-[#2D2926]  p-8 shadow-2xl border border-white/20 relative">
            
            <div className="absolute -top-3 right-6 px-3.5 py-0.5  bg-[#7D8471] text-white text-[10px] uppercase tracking-widest font-bold shadow-sm">
              Empfohlenes Express-Format
            </div>

            <div className="text-[10px] uppercase tracking-widest font-bold text-[#7D8471] mb-1">
              Direct Booking • Cornelia Schmid
            </div>

            <h3 className="font-serif text-2xl font-light mb-2 text-[#2D2926]">
              Call a Designer Session
            </h3>

            <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#2D2926]/10">
              <span className="font-serif text-2xl font-light text-[#2D2926]">Personalized Consultation</span>
              <span className="text-xs text-[#2D2926]/60 uppercase tracking-widest">/ 60 Min 1:1 Live</span>
            </div>

            <div className="space-y-3 mb-8">
              {callADesignerService.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-[#2D2926]/80">
                  <Check className="w-4 h-4 text-[#7D8471] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-4 px-6  bg-[#7D8471] hover:bg-[#6C7360] text-white font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all group"
            >
              <PhoneCall className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>Jetzt Wunschtermin buchen</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-4 text-center text-[11px] text-[#2D2926]/60 flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Direkte Kalender-Synchronisation • Termine verfügbar</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

