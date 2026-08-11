import React, { useEffect, useState } from 'react';
import { Award, CheckCircle, Quote, PhoneCall } from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../data/mockData';
import { getBrandingSettings, getImageStyle, ImageTransform } from '../lib/brandingStore';
import { AestheticFrame } from './AestheticFrame';

interface AboutCorneliaProps {
  onOpenBooking: () => void;
}

export const AboutCornelia: React.FC<AboutCorneliaProps> = ({ onOpenBooking }) => {
  const [photoAbout, setPhotoAbout] = useState<string>('');
  const [photoTransform, setPhotoTransform] = useState<ImageTransform | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const b = getBrandingSettings();
      setPhotoAbout(b.photoAbout);
      setPhotoTransform(b.photoAboutTransform);
    };
    update();
    window.addEventListener('lavie_branding_updated', update);
    return () => window.removeEventListener('lavie_branding_updated', update);
  }, []);

  return (
    <section id="about" className="py-20 bg-[#F7F5F2] border-t border-[#2D2926]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Portrait Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <AestheticFrame text="DER KREATIVE KOPF">
              <div className="relative aspect-[4/5] overflow-hidden shadow-sm border border-[#2D2926]/10">
                <img
                  src={photoAbout || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80'}
                  alt="Cornelia Schmid - LA VIE Academy GmbH"
                  style={getImageStyle(photoTransform)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="font-serif text-2xl font-light">Cornelia Schmid</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#DCD7D0] font-medium mt-0.5">
                    Gründerin &amp; Spatial Design Expertin | LA VIE Academy GmbH
                  </div>
                </div>
              </div>
            </AestheticFrame>

            {/* Floating Credentials Badge */}
            <div className="absolute -bottom-6 -right-4 glass p-4 rounded-2xl shadow-lg border border-[#2D2926]/10 max-w-xs hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7D8471] text-white flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#2D2926]">Zertifizierte Feng Shui Meisterin</div>
                <div className="text-[10px] uppercase tracking-wider text-[#2D2926]/60">Pionierin für 3D Virtual Staging</div>
              </div>
            </div>
          </div>

          {/* Philosophy Copy (7 cols) */}
          <div className="lg:col-span-7">
            
            <span className="text-[10px] uppercase tracking-[0.2em] bg-[#7D8471] text-white px-2.5 py-0.5 mb-4 inline-block font-medium">
              Über Cornelia Schmid &amp; LA VIE Academy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light leading-tight tracking-tight mb-6">
              "Ein Raum ist nicht nur Deko. <br />
              <span className="italic opacity-80 text-[#7D8471]">Er ist der Spiegel deiner Lebensenergie."</span>
            </h2>

            <p className="text-sm sm:text-base text-[#2D2926]/80 leading-relaxed mb-6 font-light">
              Mit über 15 Jahren Erfahrung in der Raumgestaltung verbindet Cornelia Schmid traditionelles östliches Feng Shui Wissen mit modernstem 3D Virtual Staging und Farbdramaturgie. Die LA VIE Academy GmbH unterstützt Immobilieneigentümer, Makler und Architekten dabei, Räume nicht nur ästhetisch zu gestalten, sondern emotional erlebbar zu machen.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#2D2926]/80">
                <CheckCircle className="w-4 h-4 text-[#7D8471] shrink-0 mt-0.5" />
                <span><strong>Feng Shui Raumharmonisierung:</strong> Gezielte Balancierung der 5 Elemente (Holz, Feuer, Erde, Metall, Wasser).</span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#2D2926]/80">
                <CheckCircle className="w-4 h-4 text-[#7D8471] shrink-0 mt-0.5" />
                <span><strong>60-30-10 Farbdramaturgie:</strong> Wissenschaftlich begründete Farbkonzepte für beruhigende oder fokussierende Atmosphäre.</span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#2D2926]/80">
                <CheckCircle className="w-4 h-4 text-[#7D8471] shrink-0 mt-0.5" />
                <span><strong>Photorealistisches 3D Staging:</strong> Digitale Möblierung mit Millimeterpräzision für maximale Verkaufsquote.</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-full bg-[#7D8471] hover:bg-[#6C7360] text-white font-medium text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Persönliche Beratung buchen (€199)</span>
            </button>

          </div>

        </div>

        {/* Client Testimonials Carousel / Grid */}
        <div className="pt-12 border-t border-[#2D2926]/10">
          <h3 className="font-serif text-2xl font-light text-[#2D2926] text-center mb-8">
            Was Kunden über Cornelia Schmid sagen
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl shadow-sm border border-[#2D2926]/10 flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-[#7D8471]/40 mb-3" />
                  <p className="text-xs sm:text-sm text-[#2D2926]/80 italic leading-relaxed mb-6 font-light">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#2D2926]/10">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#2D2926]/10" />
                  <div>
                    <div className="text-xs font-bold text-[#2D2926]">{t.name}</div>
                    <div className="text-[11px] text-[#2D2926]/60">{t.role} • {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
