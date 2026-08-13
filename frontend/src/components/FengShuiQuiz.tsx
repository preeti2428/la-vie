import React, { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCcw, Leaf, Flame, Droplets, Mountain, Diamond } from 'lucide-react';
import { Language } from '../types';

interface FengShuiQuizProps {
  currentLang?: Language;
}

type ElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water' | null;

interface Question {
  id: number;
  question: string;
  options: { text: string; element: ElementType }[];
}

const questions: Question[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    question: "How do you want your home to feel?",
    options: [
      { text: "Fresh, growing, and full of vitality", element: 'Wood' },
      { text: "Energizing, passionate, and inspiring", element: 'Fire' },
      { text: "Cozy, grounded, and welcoming", element: 'Earth' },
      { text: "Minimalist, clean, and structured", element: 'Metal' },
      { text: "Calm, flowing, and deeply relaxing", element: 'Water' }
    ]
  }
];

const elementDetails = {
  Wood: {
    icon: <Leaf className="w-12 h-12 text-[#7D8471]" />,
    title: "Wood Element (Holz)",
    color: "Greens & Browns",
    description: "You thrive in spaces that feel alive and growing. Incorporate plants, wooden furniture, and vertical shapes to enhance your vitality and creativity."
  },
  Fire: {
    icon: <Flame className="w-12 h-12 text-[#A65E44]" />,
    title: "Fire Element (Feuer)",
    color: "Reds, Oranges & Purples",
    description: "You are energetic and passionate. Your space needs vibrant accents, lots of natural light, candles, and triangular patterns to support your inner fire."
  },
  Earth: {
    icon: <Mountain className="w-12 h-12 text-[#C4A484]" />,
    title: "Earth Element (Erde)",
    color: "Yellows, Terracotta & Sand",
    description: "You seek stability and comfort. Grounding colors, pottery, square shapes, and plush textures will make your home a perfect sanctuary."
  },
  Metal: {
    icon: <Diamond className="w-12 h-12 text-[#8A7B9B]" />,
    title: "Metal Element (Metall)",
    color: "Whites, Grays & Metallics",
    description: "You appreciate clarity, focus, and precision. Minimalist design, round shapes, and metallic or glass surfaces bring out your best qualities."
  },
  Water: {
    icon: <Droplets className="w-12 h-12 text-[#4A5D6B]" />,
    title: "Water Element (Wasser)",
    color: "Blues & Blacks",
    description: "You are intuitive and adaptable. Flowing shapes, mirrors, water features, and deep, calming colors will help you find deep relaxation."
  }
};

export const FengShuiQuiz: React.FC<FengShuiQuizProps> = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 });
  const [result, setResult] = useState<ElementType>(null);

  const handleSelect = (element: ElementType) => {
    if (!element) return;
    const newScores = { ...scores, [element]: scores[element] + 1 };
    
    if (currentStep < questions.length - 1) {
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
          Discover Your <span className="italic text-[#8A7B9B]">Feng Shui Element</span>
        </h2>
        <p className="text-[#DCD7D0] max-w-2xl mx-auto mb-12 font-light">
          Find out which of the 5 elements aligns with your energy and learn how to style your space for harmony.
        </p>

        <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-md rounded-2xl shadow-2xl relative min-h-[400px] flex flex-col justify-center transition-all duration-500">
          
          {!result ? (
            <div className="animate-fade-in">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7B9B] font-bold mb-4 block">
                Question {currentStep + 1} of {questions.length}
              </span>
              <h3 className="text-2xl font-serif mb-8 text-white">
                {questions[currentStep].question}
              </h3>
              
              <div className="space-y-4 max-w-lg mx-auto">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option.element)}
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
                {elementDetails[result].icon}
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7B9B] font-bold mb-2 block">
                Your Dominant Element
              </span>
              <h3 className="text-4xl font-serif mb-2 text-white">
                {elementDetails[result].title}
              </h3>
              <p className="text-sm text-[#7D8471] mb-6 font-medium tracking-wide uppercase">
                Ideal Colors: {elementDetails[result].color}
              </p>
              <p className="text-[#DCD7D0] font-light max-w-md mx-auto mb-8 leading-relaxed">
                {elementDetails[result].description}
              </p>
              
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A7B9B] hover:text-white transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
