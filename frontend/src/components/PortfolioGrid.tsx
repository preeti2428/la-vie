import React, { useState, useEffect } from 'react';
import { GridPortfolioItem, Language } from '../types';
import { GRID_PORTFOLIO_ITEMS } from '../data/mockData';

interface PortfolioGridProps {
  currentLang: Language;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ currentLang }) => {
  const [filter, setFilter] = useState<'ALL' | 'BUSINESS' | 'PRIVAT'>('ALL');
  const [items, setItems] = useState<GridPortfolioItem[]>(GRID_PORTFOLIO_ITEMS);

  const t = {
    de: {
      all: "ALLE",
      business: "BUSINESS",
      private: "PRIVAT",
      commercialProj: "Gewerbliches Projekt",
      privateRes: "Privatwohnsitz"
    },
    en: {
      all: "ALL",
      business: "BUSINESS",
      private: "PRIVATE",
      commercialProj: "Commercial Project",
      privateRes: "Private Residence"
    }
  }[currentLang];

  useEffect(() => {
    fetch('http://localhost:3000/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setItems(data);
        }
      })
      .catch(err => console.error("Failed to fetch portfolio grid items", err));
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === 'ALL') return true;
    return item.category.toUpperCase() === filter;
  });

  return (
    <section id="portfolio" className="py-24 bg-[#E5DFD6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filters */}
        <div className="flex justify-center items-center gap-8 mb-12 text-sm font-medium tracking-[0.2em] uppercase text-[#2D2926]/70">
          <button 
            onClick={() => setFilter('ALL')}
            className={`transition-colors hover:text-[#2D2926] ${filter === 'ALL' ? 'text-[#2D2926] border-b border-[#2D2926] pb-1' : ''}`}
          >
            {t.all}
          </button>
          <button 
            onClick={() => setFilter('BUSINESS')}
            className={`transition-colors hover:text-[#2D2926] ${filter === 'BUSINESS' ? 'text-[#2D2926] border-b border-[#2D2926] pb-1' : ''}`}
          >
            {t.business}
          </button>
          <button 
            onClick={() => setFilter('PRIVAT')}
            className={`transition-colors hover:text-[#2D2926] ${filter === 'PRIVAT' ? 'text-[#2D2926] border-b border-[#2D2926] pb-1' : ''}`}
          >
            {t.private}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="aspect-square relative group overflow-hidden bg-gray-100">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              )}
              {/* Professional Luxury Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-white font-serif text-2xl font-light tracking-wide block mb-1">
                    {item.title}
                  </span>
                  <span className="text-white/70 text-[10px] uppercase tracking-widest font-medium">
                    {item.category === 'business' ? t.commercialProj : t.privateRes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
