import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/mockData';
import { Hotspot, PortfolioItem } from '../types';
import { Sparkles, Info, Check, Filter, Layers, ZoomIn, ArrowUpRight } from 'lucide-react';

interface HotspotPortfolioProps {
  onOpenBooking: () => void;
}

export const HotspotPortfolio: React.FC<HotspotPortfolioProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem>(PORTFOLIO_ITEMS[0]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(PORTFOLIO_ITEMS[0].hotspots[0] || null);

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="portfolio" className="py-20 bg-[#F7F5F2] border-t border-[#2D2926]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.2em] bg-[#7D8471] text-white px-2.5 py-0.5 mb-3 inline-block font-medium">
            3D Portfolio & Hotspots
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light tracking-tight">
            Interaktive Design-Analyse & Feng Shui Regeln
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#2D2926]/75">
            Klicke auf die leuchtenden Hotspots im Raum, um zu erfahren, welche wissenschaftlichen und energetischen Prinzipien für perfekte Raumharmonie angewendet wurden.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'Alle Projekte' },
            { id: 'feng_shui', label: 'Feng Shui Harmonien' },
            { id: 'virtual_staging', label: 'Virtual 3D Staging' },
            { id: 'interior_design', label: 'Interior Design' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#2D2926] text-[#F7F5F2] shadow-sm'
                  : 'bg-white/80 hover:bg-[#E6E2DC] text-[#2D2926] border border-[#2D2926]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Canvas Image with Hotspots (7 cols) */}
          <div className="lg:col-span-7 glass p-3 rounded-3xl shadow-sm border border-[#2D2926]/10">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden group">
              
              <img
                src={selectedItem.afterImage}
                alt={selectedItem.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay for Better Tooltip Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Title Badge */}
              <div className="absolute top-4 left-4 z-10 glass px-3 py-1.5 rounded-full text-[#2D2926] text-xs font-medium uppercase tracking-wider shadow-sm border border-[#2D2926]/10">
                {selectedItem.title} • {selectedItem.roomType}
              </div>

              {/* Hotspots */}
              {selectedItem.hotspots.map((hs) => {
                const isSelected = activeHotspot?.id === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(hs)}
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none group/hs"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                          isSelected ? 'bg-[#7D8471] opacity-80' : 'bg-white opacity-60'
                        }`}
                      />
                      <span
                        className={`relative inline-flex items-center justify-center rounded-full h-6 w-6 text-xs font-bold transition-all shadow-lg border-2 ${
                          isSelected
                            ? 'bg-[#7D8471] text-white border-white scale-125'
                            : 'bg-[#2D2926] text-white border-white hover:scale-110'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                    </span>
                  </button>
                );
              })}

            </div>

            {/* Selector Thumbnails Below */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setActiveHotspot(item.hotspots[0] || null);
                  }}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedItem.id === item.id
                      ? 'border-[#2D2926] ring-2 ring-[#2D2926]/20 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={item.afterImage} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-1 left-1 right-1 text-[10px] text-white font-medium truncate">
                    {item.roomType}
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Right: Active Hotspot Tooltip / Analysis Card (5 cols) */}
          <div className="lg:col-span-5 glass rounded-3xl p-6 shadow-sm border border-[#2D2926]/10 flex flex-col justify-between min-h-[460px]">
            <div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-0.5 rounded-full bg-[#7D8471] text-white text-[10px] font-medium uppercase tracking-wider">
                  {activeHotspot ? activeHotspot.ruleTag : 'Designregel'}
                </span>
                <span className="text-xs text-[#2D2926]/60 uppercase tracking-widest font-medium">Analyse-Hotspot</span>
              </div>

              {activeHotspot ? (
                <div className="space-y-4 animate-fade-in">
                  
                  <h3 className="font-serif text-2xl font-light text-[#2D2926] flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#7D8471]" />
                    {activeHotspot.title}
                  </h3>

                  <p className="text-sm text-[#2D2926]/80 leading-relaxed bg-[#F7F5F2] p-4 rounded-2xl border border-[#2D2926]/10">
                    {activeHotspot.description}
                  </p>

                  <div className="pt-2 space-y-2">
                    <div className="text-[10px] font-bold text-[#2D2926] uppercase tracking-widest">
                      Wirkung auf Raumnutzer:
                    </div>
                    <ul className="text-xs text-[#2D2926]/80 space-y-1.5">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#7D8471]" />
                        <span>Senkung des visuellen Stresslevels im Wohnbereich</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#7D8471]" />
                        <span>Optimierter Energiefluss für mehr Vitalität & Ruhe</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#7D8471]" />
                        <span>Maximale Wertsteigerung bei Immobilienpräsentation</span>
                      </li>
                    </ul>
                  </div>

                </div>
              ) : (
                <div className="text-center py-12 text-[#2D2926]/60 text-sm">
                  Klicke auf einen Hotspot im Bild, um die Detailanalyse zu öffnen.
                </div>
              )}

            </div>

            {/* Call to Action */}
            <div className="mt-8 pt-6 border-t border-[#2D2926]/10">
              <div className="flex items-center justify-between mb-4 text-xs text-[#2D2926]/70">
                <span>Gefällt dir dieses Raumkonzept?</span>
                <span className="font-bold text-[#2D2926]">Cornelia Schmid Beratung</span>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4 rounded-full bg-[#7D8471] hover:bg-[#6C7360] text-white text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all group"
              >
                <span>Call a Designer für deinen Grundriss (€199)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
