import React, { useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface LightingSimulatorProps {
  currentLang?: Language;
}

export const LightingSimulator: React.FC<LightingSimulatorProps> = () => {
  const [isNight, setIsNight] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50); // For side-by-side comparison slider

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-24 bg-[#F7F5F2] text-[#2D2926]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-[#8A7B9B]/10 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-[#8A7B9B]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">
            Day to Night <span className="italic text-[#8A7B9B]">Lighting Simulator</span>
          </h2>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto font-light">
            Lighting is the most crucial element in interior design. See how a space transforms from natural daylight to ambient evening mood.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Container */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize group">
            
            {/* Day Image (Background) */}
            <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000")' }}>
              <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Sun className="w-4 h-4 text-[#A65E44]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#2D2926]">Natural Day</span>
              </div>
            </div>

            {/* Night Image (Foreground/Clipped) */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1600210491369-0979e3df631b?auto=format&fit=crop&q=80&w=2000")', // Note: In a real app, use a matched day/night photo pair
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
              }}
            >
              {/* Add a subtle dark overlay to the night image if the photo itself isn't dark enough */}
              <div className="absolute inset-0 bg-[#2D2926]/30 mix-blend-multiply" />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-color" />
              
              <div className="absolute top-6 left-6 bg-[#2D2926]/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Moon className="w-4 h-4 text-[#8A7B9B]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Ambient Night</span>
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center transition-opacity"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center -ml-4 border border-gray-200">
                <div className="flex gap-1">
                  <div className="w-0.5 h-3 bg-gray-400 rounded-full" />
                  <div className="w-0.5 h-3 bg-gray-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Hidden Input for accessibility/sliding */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPosition} 
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              aria-label="Toggle between day and night lighting"
            />
          </div>
          
          <div className="mt-6 flex justify-center items-center gap-4 text-xs font-medium text-[#6B6B6B] uppercase tracking-widest">
            <span>Slide to compare</span>
          </div>
        </div>

      </div>
    </section>
  );
};
