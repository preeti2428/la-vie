import React, { useState, useEffect } from 'react';
import { GridPortfolioItem } from '../types';
import { GRID_PORTFOLIO_ITEMS } from '../data/mockData';

export const PortfolioGrid: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'BUSINESS' | 'PRIVAT'>('ALL');
  const [items, setItems] = useState<GridPortfolioItem[]>(GRID_PORTFOLIO_ITEMS);

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
            ALL
          </button>
          <button 
            onClick={() => setFilter('BUSINESS')}
            className={`transition-colors hover:text-[#2D2926] ${filter === 'BUSINESS' ? 'text-[#2D2926] border-b border-[#2D2926] pb-1' : ''}`}
          >
            BUSINESS
          </button>
          <button 
            onClick={() => setFilter('PRIVAT')}
            className={`transition-colors hover:text-[#2D2926] ${filter === 'PRIVAT' ? 'text-[#2D2926] border-b border-[#2D2926] pb-1' : ''}`}
          >
            PRIVAT
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {/* Optional overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-serif text-xl font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
