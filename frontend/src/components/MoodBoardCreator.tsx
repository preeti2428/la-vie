import React, { useState } from 'react';
import { Palette, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface MoodBoardCreatorProps {
  currentLang?: Language;
}

type BoardItem = {
  id: string;
  type: 'color' | 'texture' | 'furniture';
  value: string; // hex code or image url
  label: string;
};

const LIBRARY_ITEMS = {
  colors: [
    { id: 'c1', value: '#2D2926', label: 'Obsidian Black' },
    { id: 'c2', value: '#F7F5F2', label: 'Cashmere White' },
    { id: 'c3', value: '#8A7B9B', label: 'Amethyst' },
    { id: 'c4', value: '#7D8471', label: 'Sage Green' },
    { id: 'c5', value: '#A65E44', label: 'Terracotta' },
    { id: 'c6', value: '#C4A484', label: 'Warm Sand' },
  ],
  textures: [
    { id: 't1', value: 'https://images.unsplash.com/photo-1616423641402-8924b2b2b1a8?auto=format&fit=crop&q=80&w=200', label: 'Linen' },
    { id: 't2', value: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=200', label: 'Dark Wood' },
    { id: 't3', value: 'https://images.unsplash.com/photo-1620577546685-64f33b1e3263?auto=format&fit=crop&q=80&w=200', label: 'Marble' },
    { id: 't4', value: 'https://images.unsplash.com/photo-1611082522765-b77051918451?auto=format&fit=crop&q=80&w=200', label: 'Velvet' },
  ],
  furniture: [
    { id: 'f1', value: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400', label: 'Lounge Sofa' },
    { id: 'f2', value: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400', label: 'Accent Chair' },
    { id: 'f3', value: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&q=80&w=400', label: 'Pendant Light' },
    { id: 'f4', value: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400', label: 'Minimalist Table' },
  ]
};

export const MoodBoardCreator: React.FC<MoodBoardCreatorProps> = () => {
  const [boardItems, setBoardItems] = useState<BoardItem[]>([]);
  const [activeTab, setActiveTab] = useState<'colors' | 'textures' | 'furniture'>('colors');

  const addItemToBoard = (item: Omit<BoardItem, 'id'>) => {
    // Check if it's already on the board based on value to prevent duplicates for simplicity
    if (!boardItems.find(i => i.value === item.value)) {
      setBoardItems([...boardItems, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
    }
  };

  const removeItem = (id: string) => {
    setBoardItems(boardItems.filter(item => item.id !== id));
  };

  const clearBoard = () => {
    setBoardItems([]);
  };

  return (
    <section className="py-24 bg-white text-[#2D2926]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-[#F7F5F2] rounded-full mb-6">
            <Palette className="w-5 h-5 text-[#8A7B9B]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">
            Curate Your <span className="italic text-[#8A7B9B]">Aesthetic</span>
          </h2>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto font-light">
            Build your personalized interior design mood board. Select colors, textures, and key pieces to visualize your dream space.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Library Sidebar */}
          <div className="w-full lg:w-1/3 bg-[#F7F5F2] rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col h-[600px]">
            
            {/* Tabs */}
            <div className="flex space-x-2 mb-6 p-1 bg-white rounded-lg shadow-sm border border-black/5">
              {(['colors', 'textures', 'furniture'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-colors ${
                    activeTab === tab ? 'bg-[#2D2926] text-white' : 'text-[#6B6B6B] hover:text-[#2D2926]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Library Grid (Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                
                {activeTab === 'colors' && LIBRARY_ITEMS.colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => addItemToBoard({ type: 'color', value: color.value, label: color.label })}
                    className="group flex flex-col gap-2 text-left"
                  >
                    <div className="w-full aspect-square rounded-xl shadow-sm border border-black/10 transition-transform group-hover:scale-105" style={{ backgroundColor: color.value }}>
                      {boardItems.some(i => i.value === color.value) && (
                         <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-xl">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                         </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-[#6B6B6B] group-hover:text-[#2D2926]">{color.label}</span>
                  </button>
                ))}

                {activeTab === 'textures' && LIBRARY_ITEMS.textures.map(texture => (
                  <button
                    key={texture.id}
                    onClick={() => addItemToBoard({ type: 'texture', value: texture.value, label: texture.label })}
                    className="group flex flex-col gap-2 text-left"
                  >
                    <div 
                      className="w-full aspect-square rounded-xl shadow-sm border border-black/10 transition-transform group-hover:scale-105 bg-cover bg-center"
                      style={{ backgroundImage: `url(${texture.value})` }}
                    >
                      {boardItems.some(i => i.value === texture.value) && (
                         <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-sm">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                         </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-[#6B6B6B] group-hover:text-[#2D2926]">{texture.label}</span>
                  </button>
                ))}

                {activeTab === 'furniture' && LIBRARY_ITEMS.furniture.map(item => (
                  <button
                    key={item.id}
                    onClick={() => addItemToBoard({ type: 'furniture', value: item.value, label: item.label })}
                    className="group flex flex-col gap-2 text-left col-span-2 sm:col-span-1 lg:col-span-2"
                  >
                    <div 
                      className="w-full h-32 rounded-xl shadow-sm border border-black/10 transition-transform group-hover:scale-[1.02] bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.value})` }}
                    >
                      {boardItems.some(i => i.value === item.value) && (
                         <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-sm">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                         </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-[#6B6B6B] group-hover:text-[#2D2926]">{item.label}</span>
                  </button>
                ))}

              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="w-full lg:w-2/3 flex flex-col h-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest">My Mood Board</h3>
              <div className="flex gap-2">
                <button onClick={clearBoard} className="text-xs text-[#6B6B6B] hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
                <button className="text-xs text-white bg-[#2D2926] px-3 py-1.5 rounded hover:bg-[#8A7B9B] transition-colors uppercase tracking-widest flex items-center gap-1">
                  <Download className="w-3 h-3" /> Save
                </button>
              </div>
            </div>
            
            <div className="flex-1 bg-[#F7F5F2]/50 border-2 border-dashed border-[#DCD7D0] rounded-2xl p-6 relative overflow-y-auto">
              {boardItems.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#6B6B6B] p-6 text-center">
                  <Palette className="w-12 h-12 text-[#DCD7D0] mb-4" />
                  <p className="font-light">Your canvas is empty.</p>
                  <p className="text-sm">Click items from the library to add them to your mood board.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 items-start content-start">
                  {boardItems.map(item => (
                    <div key={item.id} className="relative group animate-fade-in">
                      {item.type === 'color' ? (
                        <div 
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl shadow-md border-4 border-white"
                          style={{ backgroundColor: item.value }}
                        />
                      ) : (
                        <img 
                          src={item.value} 
                          alt={item.label}
                          className="w-32 sm:w-48 h-auto object-cover rounded-xl shadow-md border-4 border-white"
                        />
                      )}
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
