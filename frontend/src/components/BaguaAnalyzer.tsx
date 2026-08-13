import React, { useState } from 'react';
import { Compass, Info } from 'lucide-react';
import { Language } from '../types';

interface BaguaAnalyzerProps {
  currentLang?: Language;
}

const BAGUA_SECTIONS = [
  { id: 'wealth', label: 'Wealth & Prosperity', area: 'Top Left', color: 'bg-[#7D8471]/80', hover: 'hover:bg-[#7D8471]', element: 'Wood', desc: 'Represents abundance, wealth, and gratitude. Enhance with healthy plants, water features, and purple/green colors.' },
  { id: 'fame', label: 'Fame & Reputation', area: 'Top Center', color: 'bg-[#A65E44]/80', hover: 'hover:bg-[#A65E44]', element: 'Fire', desc: 'How the world sees you. Enhance with bright lights, candles, and red colors. Display awards or vision boards here.' },
  { id: 'love', label: 'Love & Marriage', area: 'Top Right', color: 'bg-[#D4A373]/80', hover: 'hover:bg-[#D4A373]', element: 'Earth', desc: 'Relationships and self-love. Enhance with pairs of objects (two candles, two nightstands) and pink/earth tones.' },
  { id: 'family', label: 'Family & Health', area: 'Middle Left', color: 'bg-[#6B8E23]/80', hover: 'hover:bg-[#6B8E23]', element: 'Wood', desc: 'Ancestry, family harmony, and physical health. Enhance with family photos, heirloom furniture, and strong wooden elements.' },
  { id: 'center', label: 'Health (Tai Qi)', area: 'Center', color: 'bg-[#C4A484]/80', hover: 'hover:bg-[#C4A484]', element: 'Earth', desc: 'The center of your home affects all other areas. Keep this space clear, open, and grounded with square shapes or rugs.' },
  { id: 'children', label: 'Children & Creativity', area: 'Middle Right', color: 'bg-[#8A7B9B]/80', hover: 'hover:bg-[#8A7B9B]', element: 'Metal', desc: 'Joy, creation, and projects. Enhance with metallic objects, circular shapes, and pastel or white colors.' },
  { id: 'knowledge', label: 'Knowledge & Wisdom', area: 'Bottom Left', color: 'bg-[#4A5D6B]/80', hover: 'hover:bg-[#4A5D6B]', element: 'Earth', desc: 'Self-cultivation and learning. Ideal location for a library or meditation space. Use blue, black, or earthy colors.' },
  { id: 'career', label: 'Career & Life Path', area: 'Bottom Center', color: 'bg-[#2D2926]/80', hover: 'hover:bg-[#2D2926]', element: 'Water', desc: 'Your journey through life. Usually aligns with the front door. Enhance with water features, mirrors, and dark colors.' },
  { id: 'helpful', label: 'Helpful People & Travel', area: 'Bottom Right', color: 'bg-[#BDBDBD]/80', hover: 'hover:bg-[#BDBDBD]', element: 'Metal', desc: 'Synchronicity and networking. Enhance with silver/grey/white, travel souvenirs, or spiritual/mentor figures.' },
];

export const BaguaAnalyzer: React.FC<BaguaAnalyzerProps> = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const activeData = BAGUA_SECTIONS.find(s => s.id === activeSection);

  return (
    <section className="py-24 bg-[#2D2926] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
            <Compass className="w-5 h-5 text-[#8A7B9B]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">
            Interactive <span className="italic text-[#8A7B9B]">Bagua Map</span> Analyzer
          </h2>
          <p className="text-[#DCD7D0] max-w-2xl mx-auto font-light">
            Discover the energy blueprint of your home. The Bagua map divides your space into 9 areas, each corresponding to a different aspect of your life.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Interactive Grid Map */}
          <div className="w-full md:w-1/2 relative aspect-square max-w-md mx-auto bg-white/5 border border-white/20 p-4 rounded-xl">
            {/* Background Floor Plan silhouette */}
            <div className="absolute inset-4 opacity-20 bg-[url('https://images.unsplash.com/photo-1594246960786-0775d7132a0d?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center rounded" />
            
            <div className="relative w-full h-full grid grid-cols-3 grid-rows-3 gap-2">
              {BAGUA_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onMouseEnter={() => setActiveSection(section.id)}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex flex-col items-center justify-center text-center p-2 rounded-lg backdrop-blur-sm transition-all duration-300
                    ${section.color} ${section.hover} text-white/90 shadow-lg border border-white/20
                    ${activeSection === section.id ? 'scale-95 ring-2 ring-white' : 'hover:scale-105'}
                  `}
                >
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{section.label}</span>
                </button>
              ))}
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#8A7B9B] font-bold">
              Front Door / Entrance (Usually Bottom Row)
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-full md:w-1/2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm min-h-[300px] flex flex-col justify-center transition-all duration-300">
              {activeData ? (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] bg-[#8A7B9B] text-white px-2 py-0.5 rounded-sm font-bold">
                      {activeData.area}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] border border-white/20 text-[#DCD7D0] px-2 py-0.5 rounded-sm font-bold">
                      Element: {activeData.element}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-serif text-white mb-4">
                    {activeData.label}
                  </h3>
                  
                  <p className="text-[#DCD7D0] font-light leading-relaxed mb-6">
                    {activeData.desc}
                  </p>
                </div>
              ) : (
                <div className="text-center text-[#6B6B6B] flex flex-col items-center">
                  <Info className="w-8 h-8 mb-4 opacity-50" />
                  <p className="font-light">Hover or click on any section of the Bagua Map to reveal its meaning and Feng Shui remedies.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
