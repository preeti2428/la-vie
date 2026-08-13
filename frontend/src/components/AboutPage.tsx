import React from 'react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full bg-[#F7F5F2]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left: Image with offset block */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
          {/* Background Block */}
          <div className="absolute top-0 left-0 w-[80%] h-[90%] bg-[#A8988B] -z-10 translate-x-[-10%] translate-y-[-10%]"></div>
          {/* Image */}
          <div className="relative w-[90%] aspect-[4/5] overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
              alt="Cornelia Schmid" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight text-[#2D2926]">
            Schlichte ELEGANZ <span className="italic font-light">mit</span> HERZ<br/>
            <span className="italic font-light">und</span> LEICHTIGKEIT
          </h1>
          
          <div className="space-y-6 text-[#2D2926]/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
            <p>
              Wir entwickeln individuell durchdachte Raumlösungen, die Ästhetik, Funktion und Atmosphäre auf höchstem Niveau zusammenführen.
            </p>
            <p>
              Ob Office, Familienhaus, Stadtvilla oder auch einzelne Räume, wir begleiten dich von der Vision bis zur Umsetzung.
            </p>
            <p>
              Wobei kein Detail ohne Bedeutung ist und schon gar nicht wenn es um Feng Shui geht.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CREATIVE GURU & BIO SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-16">
        
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2926]">The Creative Guru</h2>
          <p className="text-sm font-medium tracking-widest uppercase text-[#A8988B]">
            Unsere Beratungen finden sowohl Online als auch vor Ort statt.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-[#2D2926]/5 text-left space-y-8 relative">
          <div className="inline-block px-4 py-1.5 bg-[#F7F5F2] text-[#2D2926] text-xs font-bold tracking-widest uppercase mb-4">
            Über die LA VIE ACADEMY GmbH / Gegründet 2018
          </div>
          
          <div className="space-y-6 text-[#2D2926]/80 leading-relaxed text-sm sm:text-base">
            <p className="font-serif text-lg md:text-xl text-[#2D2926] italic">
              "Ich liebe es, jeden Tag die Möglichkeit zu haben, kreative Räume zu schaffen."
            </p>
            <p>
              Cornelia kommt aus der Welt der Naturwissenschaft, die ihr gelehrt hat, wie präzise Elemente miteinander reagieren und harmonieren. Heute überträgt sie dieses Prinzip auf Räume, mit Konzepten, die Klarheit und Wirkung vereinen.
            </p>
            <p>
              Zum ersten Mal bewusst, wie entscheidend Räume für unser Leben sind, wurde ihr als Expat in Indien. Denn wenn das Umfeld einem nicht mehr die gewohnte Geborgenheit gibt und alles fremd ist, merkt man plötzlich, wie Räume Halt und Orientierung schenken.
            </p>
            <p>
              Beim Bau ihres eigenen Hauses hat sie erkannt, dass ein durchdachtes Raumkonzept mehr ist als Dekoration. Es ist Strategie. Ein Raum kann Klarheit, Fokus und Ruhe schenken.
            </p>
            <p>
              Als zweifach Mama schafft sie Räume, die raffiniert, beruhigend und inspirierend sind. Orte, die Menschen prägen und bewegen.
            </p>
          </div>

          <div className="pt-8 text-center sm:text-left">
            <button 
              onClick={onOpenBooking}
              className="bg-[#2D2926] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#8A7B9B] transition-colors duration-300"
            >
              Lass uns gemeinsam starten
            </button>
          </div>
        </div>

      </section>

      {/* 3. WIR MATCHEN PERFEKT WENN SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <h2 className="text-3xl sm:text-4xl font-serif text-center text-[#2D2926]">
            Wir MATCHEN perfekt, wenn ...
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Match 1 */}
            <div className="space-y-4">
              <div className="text-4xl font-serif text-[#A8988B] opacity-50">01</div>
              <h3 className="text-lg font-bold text-[#2D2926]">
                du dir Räume mit Charakter wünschst:
              </h3>
              <p className="text-[#2D2926]/70 leading-relaxed text-sm">
                Wir verwandeln deine Räume in eine Bühne deiner Persönlichkeit. Individuell, luxuriös und mit diesem unverwechselbaren Wow-Effekt.
              </p>
            </div>

            {/* Match 2 */}
            <div className="space-y-4">
              <div className="text-4xl font-serif text-[#A8988B] opacity-50">02</div>
              <h3 className="text-lg font-bold text-[#2D2926]">
                du nach dem gewissen Etwas suchst:
              </h3>
              <p className="text-[#2D2926]/70 leading-relaxed text-sm">
                Denn wir verbinden Interior Design mit Feng Shui, sodass jeder Raum nicht nur schön aussieht, sondern dich auch innerlich ausgleicht und neue Energie schenkt.
              </p>
            </div>

            {/* Match 3 */}
            <div className="space-y-4">
              <div className="text-4xl font-serif text-[#A8988B] opacity-50">03</div>
              <h3 className="text-lg font-bold text-[#2D2926]">
                Du Neu-, Umbaust oder Sanierst:
              </h3>
              <p className="text-[#2D2926]/70 leading-relaxed text-sm">
                Wir planen von Anfang an auch alles Details mit ein wie z.B. Licht, Möbel, Materialien etc. Damit dein Raum von Beginn an perfekt funktioniert. So sparst du Zeit, Geld und jede Menge Nerven.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
