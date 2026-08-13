import React, { useState, useRef, useCallback } from 'react';
import { PORTFOLIO_ITEMS } from '../data/mockData';
import { Sliders, Sparkles, CheckCircle, ArrowRight, Shield, Maximize2, Moon, Sun } from 'lucide-react';

interface BeforeAfterStagingProps {
  onOpenBooking: () => void;
}

export const BeforeAfterStaging: React.FC<BeforeAfterStagingProps> = ({ onOpenBooking }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showHotspotsOverlay, setShowHotspotsOverlay] = useState<boolean>(true);
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentItem = PORTFOLIO_ITEMS[selectedItemIndex];

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section id="before-after" className="py-20 bg-[#F7F5F2] border-t border-[#2D2926]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.2em] bg-[#7D8471] text-white px-2.5 py-0.5 mb-3 inline-block font-medium">
            Virtual Staging & Before/After
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light tracking-tight">
            Virtual Staging & Feng Shui Transformation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#2D2926]/75">
            Ziehe den Schieberegler, um zu sehen, wie leere oder unruhige Räume durch Cornelia Schmids Raumdramaturgie in harmonische Wohnträume verwandelt werden.
          </p>
        </div>

        {/* Room Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItemIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2  text-[11px] uppercase tracking-widest font-medium transition-all ${
                selectedItemIndex === idx
                  ? 'bg-[#2D2926] text-[#F7F5F2] shadow-sm'
                  : 'bg-white/80 hover:bg-[#E6E2DC] text-[#2D2926] border border-[#2D2926]/10'
              }`}
            >
              <span>{item.roomType}</span>
              <span className="text-[10px] opacity-60 pl-1.5 font-normal">({item.location.split(',')[0]})</span>
            </button>
          ))}
        </div>

        {/* Main Slider Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Slider Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-white/70  p-3 shadow-sm border border-[#2D2926]/10">
            
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] w-full overflow-hidden  select-none cursor-ew-resize touch-none"
            >
              
              {/* "AFTER" Image (Full Base) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={currentItem.afterImage}
                  alt={`${currentItem.title} - Nachher Staging`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {isNightMode && (
                  <>
                    <div className="absolute inset-0 bg-[#2D2926]/40 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-color pointer-events-none" />
                  </>
                )}
              </div>
              <div className="absolute top-4 right-4 z-20 glass px-3 py-1.5  text-[#2D2926] text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 shadow-sm border border-[#2D2926]/10">
                <Sparkles className="w-3.5 h-3.5 text-[#7D8471]" />
                <span>AFTER: Living Room Harmonization</span>
              </div>

              {/* "BEFORE" Image (Clipped Overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden z-10"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentItem.beforeImage}
                  alt={`${currentItem.title} - Vorher Zustand`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none grayscale brightness-75"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                />
                {isNightMode && (
                  <>
                    <div className="absolute inset-0 bg-[#2D2926]/40 mix-blend-multiply pointer-events-none" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }} />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-color pointer-events-none" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }} />
                  </>
                )}
                <div className="absolute top-4 left-4 z-20 glass-dark text-white px-3 py-1.5  text-xs font-medium uppercase tracking-wider shadow-sm border border-white/20">
                  <span>BEFORE: Raw Structure</span>
                </div>
              </div>

              {/* Slider Handle Divider Line */}
              <div
                className="absolute inset-y-0 z-30 w-[2px] bg-white cursor-ew-resize shadow-xl"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10  bg-white text-[#2D2926] flex items-center justify-center shadow-lg border border-[#2D2926]/10">
                  <Sliders className="w-4 h-4 text-[#2D2926]" />
                </div>
              </div>

              {/* Hotspot Indicators on After Image */}
              {showHotspotsOverlay &&
                currentItem.hotspots.map((hs) => (
                  <div
                    key={hs.id}
                    className="absolute z-20 group"
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  >
                    <div className="relative">
                      <span className="flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full  bg-[#7D8471] opacity-75" />
                        <span className="relative inline-flex  h-3.5 w-3.5 bg-[#2D2926] border-2 border-white" />
                      </span>

                      {/* Hover Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 p-3  bg-[#2D2926] text-white text-xs shadow-xl z-40">
                        <div className="font-bold text-[#E6E2DC] mb-1">{hs.title}</div>
                        <div className="text-gray-300 leading-tight text-[11px]">{hs.description}</div>
                      </div>
                    </div>
                  </div>
                ))}

            </div>

            {/* Sub-bar Controls */}
            <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-[#2D2926]/60">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2  bg-[#7D8471]" />
                Schieberegler bewegen
              </span>

              <button
                onClick={() => setShowHotspotsOverlay(!showHotspotsOverlay)}
                className="px-3 py-1  bg-[#E6E2DC] hover:bg-[#DCD7D0] text-[#2D2926] font-medium transition-colors uppercase text-[10px] tracking-wider"
              >
                {showHotspotsOverlay ? 'Hotspots ausblenden' : 'Feng Shui Hotspots anzeigen'}
              </button>
            </div>

            {/* Day/Night Toggle Toggle */}
            <div className="absolute bottom-4 right-4 z-40">
              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className="glass-dark hover:bg-[#2D2926]/90 transition-colors px-3 py-2 text-white flex items-center gap-2 shadow-sm rounded-md border border-white/20"
              >
                {isNightMode ? (
                  <>
                    <Sun className="w-4 h-4 text-[#E6E2DC]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Day Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#8A7B9B]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Night Mode</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Details & ROI Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white/80 backdrop-blur-md  p-6 shadow-sm border border-[#2D2926]/10 flex flex-col justify-between">
            <div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#7D8471]">
                  {currentItem.category.replace('_', ' ')}
                </span>
                {currentItem.roiMetric && (
                  <span className="px-2.5 py-0.5  bg-[#7D8471]/15 text-[#7D8471] text-[10px] font-bold uppercase tracking-wider">
                    {currentItem.roiMetric}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl font-light text-[#2D2926] mb-6">
                {currentItem.title}
              </h3>

              {/* Key Transformation Factors */}
              <div className="space-y-3 mb-6">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]">
                  Schlüsselaspekte der Transformation:
                </h4>
                {currentItem.keyChanges.map((change, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#2D2926]/80">
                    <CheckCircle className="w-4 h-4 text-[#7D8471] shrink-0 mt-0.5" />
                    <span>{change}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Call to Action */}
            <div className="pt-6 border-t border-[#2D2926]/10">

              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4  bg-[#7D8471] hover:bg-[#6C7360] text-white text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all group"
              >
                <span>Call a Designer buchen (€199)</span>
                <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

