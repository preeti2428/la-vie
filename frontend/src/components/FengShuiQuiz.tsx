import React, { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCcw, Leaf, Flame, Droplets, Mountain, Diamond } from 'lucide-react';
import { Language } from '../types';

interface FengShuiQuizProps {
  currentLang?: Language;
}

type ElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water' | null;

import React, { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCcw, Leaf, Flame, Droplets, Mountain, Diamond } from 'lucide-react';
import { Language } from '../types';

interface FengShuiQuizProps {
  currentLang: Language;
}

type ElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water' | null;

export const FengShuiQuiz: React.FC<FengShuiQuizProps> = ({ currentLang }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 });
  const [result, setResult] = useState<ElementType>(null);

  const t = {
    de: {
      title1: "Entdecke dein",
      title2: "Feng Shui Element",
      desc: "Finde heraus, welches der 5 Elemente zu deiner Energie passt, und lerne, wie du deine Räume harmonisch gestaltest.",
      questionPrefix: "Frage",
      of: "von",
      dominantElement: "Dein dominantes Element",
      idealColors: "Ideale Farben:",
      retake: "Quiz wiederholen",
      elements: {
        Wood: {
          title: "Holzelement (Wood)",
          color: "Grün & Braun",
          description: "Du blühst in Räumen auf, die lebendig und wachsend wirken. Integriere Pflanzen, Holzmöbel und vertikale Formen, um deine Vitalität und Kreativität zu stärken."
        },
        Fire: {
          title: "Feuerelement (Fire)",
          color: "Rot, Orange & Lila",
          description: "Du bist energisch und leidenschaftlich. Dein Raum braucht lebendige Akzente, viel natürliches Licht, Kerzen und dreieckige Muster, um dein inneres Feuer zu unterstützen."
        },
        Earth: {
          title: "Erdelement (Earth)",
          color: "Gelb, Terrakotta & Sand",
          description: "Du suchst Stabilität und Komfort. Erdende Farben, Keramik, quadratische Formen und weiche Texturen machen dein Zuhause zu einem perfekten Rückzugsort."
        },
        Metal: {
          title: "Metallelement (Metal)",
          color: "Weiß, Grau & Metallic",
          description: "Du schätzt Klarheit, Fokus und Präzision. Minimalistisches Design, runde Formen und Metall- oder Glasflächen bringen deine besten Eigenschaften zur Geltung."
        },
        Water: {
          title: "Wasserelement (Water)",
          color: "Blau & Schwarz",
          description: "Du bist intuitiv und anpassungsfähig. Fließende Formen, Spiegel, Wasserelemente und tiefe, beruhigende Farben helfen dir, tiefe Entspannung zu finden."
        }
      },
      questions: [
        {
          question: "Was beschreibt dein ideales Wochenende am besten?",
          options: [
            { text: "Wandern oder Zeit in der Natur verbringen", element: 'Wood' },
            { text: "Auf einer lebhaften Party oder Veranstaltung sein", element: 'Fire' },
            { text: "Zuhause entspannen mit einem guten Buch und Tee", element: 'Earth' },
            { text: "Aufräumen und meinen Raum strukturieren", element: 'Metal' },
            { text: "Ein Spa, den Strand besuchen oder ein langes Bad nehmen", element: 'Water' }
          ]
        },
        {
          question: "Zu welcher Farbpalette fühlst du dich natürlich hingezogen?",
          options: [
            { text: "Grün, Blaugrün und natürliche Brauntöne", element: 'Wood' },
            { text: "Rot, Orange und warmes Lila", element: 'Fire' },
            { text: "Gelb, Terrakotta und Sandtöne", element: 'Earth' },
            { text: "Weiß, Grau und metallische Akzente", element: 'Metal' },
            { text: "Tiefblau, Schwarz und Aquamarin", element: 'Water' }
          ]
        },
        {
          question: "Wie soll sich dein Zuhause anfühlen?",
          options: [
            { text: "Frisch, wachsend und voller Vitalität", element: 'Wood' },
            { text: "Energetisierend, leidenschaftlich und inspirierend", element: 'Fire' },
            { text: "Gemütlich, geerdet und einladend", element: 'Earth' },
            { text: "Minimalistisch, sauber und strukturiert", element: 'Metal' },
            { text: "Ruhig, fließend und tief entspannend", element: 'Water' }
          ]
        }
      ]
    },
    en: {
      title1: "Discover Your",
      title2: "Feng Shui Element",
      desc: "Find out which of the 5 elements aligns with your energy and learn how to style your space for harmony.",
      questionPrefix: "Question",
      of: "of",
      dominantElement: "Your Dominant Element",
      idealColors: "Ideal Colors:",
      retake: "Retake Quiz",
      elements: {
        Wood: {
          title: "Wood Element (Holz)",
          color: "Greens & Browns",
          description: "You thrive in spaces that feel alive and growing. Incorporate plants, wooden furniture, and vertical shapes to enhance your vitality and creativity."
        },
        Fire: {
          title: "Fire Element (Feuer)",
          color: "Reds, Oranges & Purples",
          description: "You are energetic and passionate. Your space needs vibrant accents, lots of natural light, candles, and triangular patterns to support your inner fire."
        },
        Earth: {
          title: "Earth Element (Erde)",
          color: "Yellows, Terracotta & Sand",
          description: "You seek stability and comfort. Grounding colors, pottery, square shapes, and plush textures will make your home a perfect sanctuary."
        },
        Metal: {
          title: "Metal Element (Metall)",
          color: "Whites, Grays & Metallics",
          description: "You appreciate clarity, focus, and precision. Minimalist design, round shapes, and metallic or glass surfaces bring out your best qualities."
        },
        Water: {
          title: "Water Element (Wasser)",
          color: "Blues & Blacks",
          description: "You are intuitive and adaptable. Flowing shapes, mirrors, water features, and deep, calming colors will help you find deep relaxation."
        }
      },
      questions: [
        {
          question: "What best describes your ideal weekend?",
          options: [
            { text: "Hiking or spending time in nature", element: 'Wood' },
            { text: "Socializing at a vibrant party or event", element: 'Fire' },
            { text: "Relaxing at home with a good book and tea", element: 'Earth' },
            { text: "Organizing and decluttering my space", element: 'Metal' },
            { text: "Visiting a spa, beach, or taking a long bath", element: 'Water' }
          ]
        },
        {
          question: "Which color palette are you naturally drawn to?",
          options: [
            { text: "Greens, teals, and natural browns", element: 'Wood' },
            { text: "Reds, oranges, and warm purples", element: 'Fire' },
            { text: "Yellows, terracottas, and sandy tones", element: 'Earth' },
            { text: "Whites, grays, and metallic accents", element: 'Metal' },
            { text: "Deep blues, blacks, and aquamarines", element: 'Water' }
          ]
        },
        {
          question: "How do you want your home to feel?",
          options: [
            { text: "Fresh, growing, and full of vitality", element: 'Wood' },
            { text: "Energizing, passionate, and inspiring", element: 'Fire' },
            { text: "Cozy, grounded, and welcoming", element: 'Earth' },
            { text: "Minimalist, clean, and structured", element: 'Metal' },
            { text: "Calm, flowing, and deeply relaxing", element: 'Water' }
          ]
        }
      ]
    }
  }[currentLang];

  const handleSelect = (element: ElementType) => {
    if (!element) return;
    const newScores = { ...scores, [element as string]: scores[element as string] + 1 };
    
    if (currentStep < t.questions.length - 1) {
      setScores(newScores);
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner
      const highest = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b) as ElementType;
      setResult(highest);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({ Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 });
    setResult(null);
  };

  const getIcon = (element: ElementType) => {
    switch (element) {
      case 'Wood': return <Leaf className="w-12 h-12 text-[#7D8471]" />;
      case 'Fire': return <Flame className="w-12 h-12 text-[#A65E44]" />;
      case 'Earth': return <Mountain className="w-12 h-12 text-[#C4A484]" />;
      case 'Metal': return <Diamond className="w-12 h-12 text-[#8A7B9B]" />;
      case 'Water': return <Droplets className="w-12 h-12 text-[#4A5D6B]" />;
      default: return null;
    }
  };

  return (
    <section className="py-24 bg-[#2D2926] text-[#F7F5F2] relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8A7B9B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7D8471]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6 border border-white/10">
          <Sparkles className="w-5 h-5 text-[#8A7B9B]" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">
          {t.title1} <span className="italic text-[#8A7B9B]">{t.title2}</span>
        </h2>
        <p className="text-[#DCD7D0] max-w-2xl mx-auto mb-12 font-light">
          {t.desc}
        </p>

        <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-md rounded-2xl shadow-2xl relative min-h-[400px] flex flex-col justify-center transition-all duration-500">
          
          {!result ? (
            <div className="animate-fade-in">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7B9B] font-bold mb-4 block">
                {t.questionPrefix} {currentStep + 1} {t.of} {t.questions.length}
              </span>
              <h3 className="text-2xl font-serif mb-8 text-white">
                {t.questions[currentStep].question}
              </h3>
              
              <div className="space-y-4 max-w-lg mx-auto">
                {t.questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option.element as ElementType)}
                    className="w-full text-left px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8A7B9B]/50 rounded-xl transition-all duration-300 flex items-center justify-between group"
                  >
                    <span className="text-sm font-light text-[#DCD7D0] group-hover:text-white">
                      {option.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-transparent group-hover:text-[#8A7B9B] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in flex flex-col items-center text-center">
              <div className="mb-6 p-6 bg-white/5 rounded-full border border-white/10">
                {getIcon(result)}
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7B9B] font-bold mb-2 block">
                {t.dominantElement}
              </span>
              <h3 className="text-4xl font-serif mb-2 text-white">
                {t.elements[result as keyof typeof t.elements].title}
              </h3>
              <p className="text-sm text-[#7D8471] mb-6 font-medium tracking-wide uppercase">
                {t.idealColors} {t.elements[result as keyof typeof t.elements].color}
              </p>
              <p className="text-[#DCD7D0] font-light max-w-md mx-auto mb-8 leading-relaxed">
                {t.elements[result as keyof typeof t.elements].description}
              </p>
              
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A7B9B] hover:text-white transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                {t.retake}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
