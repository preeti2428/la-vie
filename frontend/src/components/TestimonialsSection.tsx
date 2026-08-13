import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    text: "„Ich bin total begeistert!\nCornelia hat mein Haus bereits in der Entstehungsphase ganzheitlich mit großem Feingefühl und Professionalität designed.\nDie Analyse war klar dokumentiert, inklusive Moodboard für meine Handwerker. Schon jetzt spüre ich, wie positive Energie fließt, in meinen Räumen und in mir.\nHerzlichen Dank für deine Arbeit, liebe Cornelia!“",
    author: "Regina Lackner"
  },
  {
    id: 2,
    text: "„Eine wunderbare Erfahrung!\nDie Räume fühlen sich nun viel weiter und harmonischer an. Die Beratung war professionell und sehr auf meine persönlichen Bedürfnisse abgestimmt.\nIch kann LA VIE Design jedem wärmstens empfehlen.“",
    author: "Thomas Meier"
  },
  {
    id: 3,
    text: "„Fantastische Arbeit!\nVon der ersten Konzeption bis zur finalen Umsetzung war alles perfekt. Das Feng Shui Konzept hat mein Home Office in einen Ort der Produktivität und Ruhe verwandelt.“",
    author: "Sarah Weber"
  }
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-32 overflow-hidden flex items-center justify-center min-h-[70vh]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/60" /> {/* Dark Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center justify-center">
        
        <p className="text-[11px] md:text-sm font-medium tracking-[0.3em] uppercase mb-12 text-white/90">
          WHAT MY CLIENTS ARE SAYING:
        </p>

        <div className="relative w-full grid items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`col-start-1 row-start-1 w-full transition-all duration-1000 ease-in-out flex flex-col items-center justify-center ${
                index === currentIndex ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <p className="text-lg md:text-xl lg:text-2xl font-serif font-light leading-snug mb-6 whitespace-pre-line max-w-4xl mx-auto drop-shadow-md">
                {testimonial.text}
              </p>
              
              <p className="text-lg md:text-xl font-serif text-white/90">
                – {testimonial.author} –
              </p>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};
