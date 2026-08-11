import React from 'react';

export const MissionStatement: React.FC = () => {
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden flex items-center justify-center text-center mt-20 sm:mt-32">
      
      {/* Background Image with Overlay and 3D Rotation Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80"
          alt="3D Interior Mission Statement Background"
          className="w-full h-full object-cover grayscale-[15%] animate-slow-pan origin-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-[11px] sm:text-xs text-white uppercase tracking-[0.3em] font-medium drop-shadow-md">
          THE MISSION STATEMENT:
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light italic leading-tight drop-shadow-lg">
          My passion is designing spaces that move and inspire
        </h2>
      </div>
    </section>
  );
};
