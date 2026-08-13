import React from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface BentoGridSectionProps {
  currentLang: Language;
}

export const BentoGridSection: React.FC<BentoGridSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2D2926] mb-4">
          Spaces made to be lived in
        </h2>
        <p className="text-[#2D2926]/70 max-w-2xl text-sm md:text-base font-light leading-relaxed">
          We develop individually thought-out room solutions that bring together aesthetics, function, and atmosphere at the highest level.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
        
        {/* Large Item 1 - Spans 2 columns */}
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
            alt="Interior" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-2xl font-serif font-light mb-2 tracking-wide">Prime internal location</h3>
            <p className="text-sm font-light opacity-90 max-w-sm">
              Discover spaces that blend luxury with absolute tranquility.
            </p>
          </div>
        </div>

        {/* Small Item 1 */}
        <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80" 
            alt="Design" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
          <div className="absolute top-6 left-6 text-white">
            <h3 className="text-xl font-serif font-light tracking-wide">Family layout</h3>
          </div>
        </div>

        {/* Small Item 2 */}
        <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?auto=format&fit=crop&w=600&q=80" 
            alt="Minimalist" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
          <div className="absolute top-6 left-6 text-white">
            <h3 className="text-xl font-serif font-light tracking-wide">Ready to move in?</h3>
          </div>
        </div>

        {/* Large Item 2 - Spans 2 columns */}
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
            alt="Architecture" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-2xl font-serif font-light mb-2 tracking-wide">Landscaped garden and pool</h3>
            <p className="text-sm font-light opacity-90 max-w-sm">
              Your personal oasis awaits in the heart of nature.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
