import React, { useState } from 'react';
import { INSTAGRAM_REELS } from '../data/mockData';
import { InstagramReel } from '../types';
import { Instagram, Play, Heart, Eye, Sparkles, X, Share2, ExternalLink } from 'lucide-react';

export const InstagramReelsGrid: React.FC = () => {
  const [activeReelModal, setActiveReelModal] = useState<InstagramReel | null>(null);

  return (
    <section id="reels" className="py-20 bg-[#F7F5F2] border-t border-[#2D2926]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] bg-[#7D8471] text-white px-2.5 py-0.5 mb-3 inline-block font-medium">
              Instagram Reels • @cornelia.lavie
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light tracking-tight">
              Design Impulsen auf Instagram folgen
            </h2>
            <p className="mt-2 text-sm text-[#2D2926]/75 max-w-xl">
              Tägliche Inspirationen zu Feng Shui Hacks, Virtual Staging Geheimnissen und Farbdramaturgie direkt von Cornelia Schmid.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-5 py-2.5 rounded-full bg-white/80 hover:bg-[#E6E2DC] border border-[#2D2926]/10 text-[11px] font-medium uppercase tracking-widest text-[#2D2926] flex items-center gap-2 shadow-sm transition-all"
          >
            <Instagram className="w-4 h-4 text-[#7D8471]" />
            <span>@cornelia.lavie folgen</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#2D2926]/60" />
          </a>
        </div>

        {/* Asymmetrical 3D Hover Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_REELS.map((reel, index) => {
            // Asymmetrical heights for dynamic feel
            const isTall = index % 2 === 1;

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReelModal(reel)}
                className={`group relative bg-white/80 rounded-2xl overflow-hidden border border-[#2D2926]/10 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer hover:-translate-y-2 transform perspective-1000 ${
                  isTall ? 'lg:translate-y-4' : ''
                }`}
              >
                
                {/* Thumbnail Image Container */}
                <div className="relative aspect-[9/14] w-full overflow-hidden bg-black">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Subtle Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full glass border border-white/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    </div>
                  </div>

                  {/* Top Stats Bar */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-medium uppercase tracking-wider">
                    <span className="px-2.5 py-1 rounded-full glass-dark border border-white/20">
                      {reel.handle}
                    </span>
                    <span className="px-2 py-1 rounded-full glass-dark">
                      {reel.duration}
                    </span>
                  </div>

                  {/* Bottom Reel Details */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-3 text-xs mb-1 text-gray-300 font-medium">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {reel.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> {reel.likes}
                      </span>
                    </div>

                    <h3 className="font-serif text-sm font-light line-clamp-2 leading-snug">
                      {reel.title}
                    </h3>
                  </div>

                </div>

                {/* Tags Bar */}
                <div className="p-3 bg-white/90 flex flex-wrap gap-1 border-t border-[#2D2926]/10">
                  {reel.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-medium text-[#7D8471] bg-[#F7F5F2] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Video & Tip Preview */}
        {activeReelModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <div className="relative bg-white max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-[#2D2926]/10">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveReelModal(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Reel Header / Video Placeholder */}
              <div className="relative aspect-[9/12] bg-black">
                <img
                  src={activeReelModal.thumbnail}
                  alt={activeReelModal.title}
                  className="w-full h-full object-cover opacity-80"
                />
                
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/90 via-black/30 to-black/40 text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#7D8471] text-white font-bold text-xs flex items-center justify-center">
                      LV
                    </div>
                    <div>
                      <div className="text-xs font-bold">{activeReelModal.handle}</div>
                      <div className="text-[10px] text-gray-300">Cornelia Schmid • LA VIE Academy</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-light mb-2">{activeReelModal.title}</h3>
                    <p className="text-xs text-gray-200 leading-relaxed glass-dark p-3 rounded-2xl border border-white/10">
                      {activeReelModal.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="p-4 bg-[#F7F5F2] flex items-center justify-between border-t border-[#2D2926]/10">
                <div className="text-xs text-[#2D2926]/70">
                  {activeReelModal.views} Aufrufe • {activeReelModal.likes} Likes
                </div>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#7D8471] text-white text-xs font-medium uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#6C7360] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-white" />
                  <span>Auf Instagram ansehen</span>
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
