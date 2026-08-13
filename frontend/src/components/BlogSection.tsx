import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, X, Flower2, Share2, Bookmark, User } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getBrandingSettings, getImageStyle, ImageTransform } from '../lib/brandingStore';

interface BlogSectionProps {
  currentLang: Language;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
  author: string;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].blog;
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [photoBlog, setPhotoBlog] = useState<string>('');
  const [photoTransform, setPhotoTransform] = useState<ImageTransform | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      const b = getBrandingSettings();
      setPhotoBlog(b.photoBlog);
      setPhotoTransform(b.photoBlogTransform);
    };
    update();
    window.addEventListener('lavie_branding_updated', update);
    return () => window.removeEventListener('lavie_branding_updated', update);
  }, []);

  const articles: Article[] = [
    {
      id: 'sheng-qi-energy',
      title: 'Die Kraft von Sheng Qi: Wie Vitalenergie Räume verändert',
      excerpt: 'Warum manche Räume sofort Erschöpfung auslösen, während andere Kreativität und Klarheit schenken – die Geheimnisse der Bagua-Zonen.',
      category: 'Feng Shui Meisterwissen',
      readTime: '6 Min. Lesezeit',
      date: '08. August 2026',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      author: 'Cornelia Schmid',
      content: `
        In der traditionellen chinesischen Raumlehre bezeichnet Sheng Qi (lebendige, nährende Lebensenergie) den Zustand vollkommener Raumharmonie. 
        Wenn Energie ungehindert fließen kann, stellt sich in Wohn- und Arbeitsräumen ein tiefes Gefühl von Geborgenheit und Fokus ein.

        ### Die 3 Säulen der Raumvitalisierung:
        1. **Lichtführung & Spiegelung**: Vermeidung von unbeleuchteten dunklen Ecken, in denen Energie stagniert.
        2. **Botanische Akzente**: Pflanzen wie Lavendel oder Orchideen bringen natürliche Holz- und Feuer-Elemente in perfekte Balance.
        3. **Freie Sichtfelder**: Schreibtische und Betten sollten immer in der "Command Position" stehen – mit fester Wand im Rücken und Blick zur Tür.
      `,
    },
    {
      id: 'color-choreography-lavender',
      title: 'Die 60-30-10 Regel & Lavendel-Farbdramaturgie',
      excerpt: 'Wie sanfte Flieder- und Lavendeltöne in Kombination mit warmen Holzelementen Nervensystem und Schlafqualität beruhigen.',
      category: 'Farbdramaturgie',
      readTime: '5 Min. Lesezeit',
      date: '02. August 2026',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      author: 'Cornelia Schmid',
      content: `
        Farben sind nicht nur visuelle Dekoration, sondern elektro-magnetische Wellen, die direkt auf unser limbisches System im Gehirn wirken.

        Die 60-30-10 Regel garantiert eine optische Balance:
        - **60% Hauptfarbe**: Sanftes Leinen-Weiß oder warmes Greige als ruhiger Hintergrund.
        - **30% Sekundärfarbe**: Naturbelassene Eiche, Travertin-Marmor oder Salbeigrün.
        - **10% Akzentfarbe**: Edles, dezentes Lavendel oder Violett, um geistige Klarheit zu aktivieren.
      `,
    },
    {
      id: 'virtual-staging-roi',
      title: '3D Virtual Staging vs. Physisches Home Staging',
      excerpt: 'Warum Top-Makler in Zürich und München mit photorealistischem Virtual Staging bis zu +85% mehr Besichtigungsanfragen erzielen.',
      category: 'Immobilien & Staging',
      readTime: '7 Min. Lesezeit',
      date: '25. Juli 2026',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      author: 'Cornelia Schmid',
      content: `
        Leere Immobilien lassen 90% aller Interessenten ratlos zurück. Ohne Maßstabsgefühl wirken Räume kleiner und kühler als sie tatsächlich sind.

        Durch photorealistisches 3D Virtual Staging entstehen binnen 24-48 Stunden hochattraktive Visualisierungen, ohne dass physische Möbel transportiert oder angemietet werden müssen.
      `,
    },
  ];

  return (
    <section id="blog" className="py-20 bg-[#F7F5F2] border-b border-[#2D2926]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.2em] bg-[#8A7B9B] text-white px-3 py-1  font-medium inline-block shadow-sm">
              {t.tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light leading-tight">
              {t.title}
            </h2>
            <p className="text-sm text-[#2D2926]/70 font-light">
              {t.subtitle}
            </p>
          </div>

          {/* Author Badge for Blog / Journal */}
          <div className="glass p-3  border border-[#2D2926]/10 flex items-center gap-3 shrink-0">
            <div className="w-12 h-12  overflow-hidden border-2 border-[#8A7B9B] shadow-sm shrink-0">
              <img
                src={photoBlog || 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1000&q=80'}
                alt="Cornelia Schmid - Chefredakteurin & Autorin"
                style={getImageStyle(photoTransform)}
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2D2926]">Cornelia Schmid</div>
              <div className="text-[10px] text-[#2D2926]/60 font-medium">Magazin &amp; Journal Autorin</div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="glass  overflow-hidden border border-[#2D2926]/10 hover:border-[#8A7B9B]/50 transition-all duration-300 shadow-sm hover:-translate-y-1.5 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1  text-[10px] uppercase tracking-widest font-semibold text-[#5B4970]">
                    {art.category}
                  </div>
                </div>

                {/* Article Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#2D2926]/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8A7B9B]" />
                      {art.readTime}
                    </span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#2D2926] font-light group-hover:text-[#8A7B9B] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#2D2926]/75 line-clamp-3 leading-relaxed font-light">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#2D2926]/10 text-xs font-medium text-[#8A7B9B]">
                <span>Von {art.author}</span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {t.readMore} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-[#F7F5F2] w-full max-w-3xl max-h-[90vh]  border border-[#2D2926]/20 shadow-2xl overflow-y-auto relative p-6 sm:p-10 space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 w-10 h-10  bg-white border border-[#2D2926]/10 text-[#2D2926] flex items-center justify-center hover:bg-[#E6E2DC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest bg-[#8A7B9B] text-white px-3 py-1  font-semibold">
                {activeArticle.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2926] font-light leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-[#2D2926]/60 border-b border-[#2D2926]/10 pb-4">
                <span>Von {activeArticle.author}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className=" overflow-hidden aspect-[16/9]">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Content Body */}
            <div className="text-sm sm:text-base text-[#2D2926]/85 font-light leading-relaxed whitespace-pre-line space-y-4">
              {activeArticle.content}
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-[#2D2926]/10 flex items-center justify-between">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5  bg-[#2D2926] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1A1816]"
              >
                {t.close}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

