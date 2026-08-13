import React from 'react';
import { ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { Language } from '../types';

interface ShopSectionProps {
  currentLang?: Language;
}

const PRODUCTS = [
  {
    id: 1,
    title: "LA VIE Academy Masterclass",
    category: "Online Course",
    price: "€499",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800",
    rating: 5,
    tag: "Bestseller"
  },
  {
    id: 2,
    title: "Amethyst Energy Crystal",
    category: "Curated Decor",
    price: "€120",
    image: "https://images.unsplash.com/photo-1598509376180-2a8d3e9cb190?auto=format&fit=crop&q=80&w=800",
    rating: 5,
    tag: "New"
  },
  {
    id: 3,
    title: "Feng Shui Foundation Guide",
    category: "E-Book",
    price: "€45",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
  }
];

export const ShopSection: React.FC<ShopSectionProps> = () => {
  return (
    <section className="py-24 bg-[#F7F5F2] text-[#2D2926]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8A7B9B]/10 rounded-full mb-6">
              <ShoppingBag className="w-4 h-4 text-[#8A7B9B]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A7B9B]">The Boutique</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">
              Curated <span className="italic text-[#8A7B9B]">Collections</span> & Academy
            </h2>
            <p className="text-[#6B6B6B] max-w-xl font-light">
              Elevate your knowledge and your space with our exclusive online courses and hand-picked energetic decor items.
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2D2926] hover:text-[#8A7B9B] transition-colors group">
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-[#2D2926]">
                    {product.tag}
                  </div>
                )}

                {/* Add to Cart Overlay */}
                <div className="absolute inset-x-4 bottom-4 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-full bg-[#2D2926] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#8A7B9B] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A7B9B] mb-2 block">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-serif mb-2 group-hover:text-[#8A7B9B] transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[#C4A484]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
                <div className="text-lg font-light text-[#2D2926]">
                  {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
