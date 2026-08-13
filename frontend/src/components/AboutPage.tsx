import React from 'react';
import { Language } from '../types';

interface AboutPageProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ currentLang, onOpenBooking }) => {
  const t = {
    de: {
      heroTitle1: "Schlichte ELEGANZ",
      heroTitle2: "mit",
      heroTitle3: "HERZ",
      heroTitle4: "und",
      heroTitle5: "LEICHTIGKEIT",
      heroDesc1: "Wir entwickeln individuell durchdachte Raumlösungen, die Ästhetik, Funktion und Atmosphäre auf höchstem Niveau zusammenführen.",
      heroDesc2: "Ob Office, Familienhaus, Stadtvilla oder auch einzelne Räume, wir begleiten dich von der Vision bis zur Umsetzung.",
      heroDesc3: "Wobei kein Detail ohne Bedeutung ist und schon gar nicht wenn es um Feng Shui geht.",
      guruTitle: "The Creative Guru",
      guruSubtitle: "Unsere Beratungen finden sowohl Online als auch vor Ort statt.",
      bioTag: "Über die LA VIE ACADEMY GmbH / Gegründet 2018",
      bioQuote: "\"Ich liebe es, jeden Tag die Möglichkeit zu haben, kreative Räume zu schaffen.\"",
      bio1: "Cornelia kommt aus der Welt der Naturwissenschaft, die ihr gelehrt hat, wie präzise Elemente miteinander reagieren und harmonieren. Heute überträgt sie dieses Prinzip auf Räume, mit Konzepten, die Klarheit und Wirkung vereinen.",
      bio2: "Zum ersten Mal bewusst, wie entscheidend Räume für unser Leben sind, wurde ihr als Expat in Indien. Denn wenn das Umfeld einem nicht mehr die gewohnte Geborgenheit gibt und alles fremd ist, merkt man plötzlich, wie Räume Halt und Orientierung schenken.",
      bio3: "Beim Bau ihres eigenen Hauses hat sie erkannt, dass ein durchdachtes Raumkonzept mehr ist als Dekoration. Es ist Strategie. Ein Raum kann Klarheit, Fokus und Ruhe schenken.",
      bio4: "Als zweifach Mama schafft sie Räume, die raffiniert, beruhigend und inspirierend sind. Orte, die Menschen prägen und bewegen.",
      startBtn: "Lass uns gemeinsam starten",
      matchTitle: "Wir MATCHEN perfekt, wenn ...",
      match1Title: "du dir Räume mit Charakter wünschst:",
      match1Desc: "Wir verwandeln deine Räume in eine Bühne deiner Persönlichkeit. Individuell, luxuriös und mit diesem unverwechselbaren Wow-Effekt.",
      match2Title: "du nach dem gewissen Etwas suchst:",
      match2Desc: "Denn wir verbinden Interior Design mit Feng Shui, sodass jeder Raum nicht nur schön aussieht, sondern dich auch innerlich ausgleicht und neue Energie schenkt.",
      match3Title: "Du Neu-, Umbaust oder Sanierst:",
      match3Desc: "Wir planen von Anfang an auch alles Details mit ein wie z.B. Licht, Möbel, Materialien etc. Damit dein Raum von Beginn an perfekt funktioniert. So sparst du Zeit, Geld und jede Menge Nerven."
    },
    en: {
      heroTitle1: "Simple ELEGANCE",
      heroTitle2: "with",
      heroTitle3: "HEART",
      heroTitle4: "and",
      heroTitle5: "LIGHTNESS",
      heroDesc1: "We develop individually thought-out spatial solutions that bring together aesthetics, function, and atmosphere at the highest level.",
      heroDesc2: "Whether an office, family home, city villa, or single rooms, we guide you from vision to execution.",
      heroDesc3: "Where no detail is without meaning, especially when it comes to Feng Shui.",
      guruTitle: "The Creative Guru",
      guruSubtitle: "Our consultations take place both online and on-site.",
      bioTag: "About LA VIE ACADEMY GmbH / Founded 2018",
      bioQuote: "\"I love having the opportunity every day to create creative spaces.\"",
      bio1: "Cornelia comes from the world of natural sciences, which taught her how precise elements react and harmonize with each other. Today, she transfers this principle to spaces, with concepts that combine clarity and impact.",
      bio2: "She first became aware of how crucial spaces are for our lives as an expat in India. Because when your environment no longer gives you the usual sense of security and everything is foreign, you suddenly realize how spaces provide support and orientation.",
      bio3: "While building her own house, she realized that a well-thought-out spatial concept is more than decoration. It's strategy. A room can provide clarity, focus, and calm.",
      bio4: "As a mother of two, she creates spaces that are refined, calming, and inspiring. Places that shape and move people.",
      startBtn: "Let's start together",
      matchTitle: "We MATCH perfectly when ...",
      match1Title: "you desire spaces with character:",
      match1Desc: "We transform your rooms into a stage for your personality. Individual, luxurious, and with that unmistakable wow effect.",
      match2Title: "you are looking for that certain something:",
      match2Desc: "Because we combine interior design with Feng Shui, so that every room not only looks beautiful but also balances you internally and gives you new energy.",
      match3Title: "You are building new, renovating, or refurbishing:",
      match3Desc: "We plan all details right from the start, such as light, furniture, materials, etc. So that your room works perfectly from the beginning. This saves you time, money, and a lot of nerves."
    }
  }[currentLang];

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
            {t.heroTitle1} <span className="italic font-light">{t.heroTitle2}</span> {t.heroTitle3}<br/>
            <span className="italic font-light">{t.heroTitle4}</span> {t.heroTitle5}
          </h1>
          
          <div className="space-y-6 text-[#2D2926]/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
            <p>{t.heroDesc1}</p>
            <p>{t.heroDesc2}</p>
            <p>{t.heroDesc3}</p>
          </div>
        </div>
      </section>

      {/* 2. CREATIVE GURU & BIO SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-16">
        
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2926]">{t.guruTitle}</h2>
          <p className="text-sm font-medium tracking-widest uppercase text-[#A8988B]">
            {t.guruSubtitle}
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-[#2D2926]/5 text-left space-y-8 relative">
          <div className="inline-block px-4 py-1.5 bg-[#F7F5F2] text-[#2D2926] text-xs font-bold tracking-widest uppercase mb-4">
            {t.bioTag}
          </div>
          
          <div className="space-y-6 text-[#2D2926]/80 leading-relaxed text-sm sm:text-base">
            <p className="font-serif text-lg md:text-xl text-[#2D2926] italic">
              {t.bioQuote}
            </p>
            <p>{t.bio1}</p>
            <p>{t.bio2}</p>
            <p>{t.bio3}</p>
            <p>{t.bio4}</p>
          </div>

          <div className="pt-8 text-center sm:text-left">
            <button 
              onClick={onOpenBooking}
              className="bg-[#2D2926] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#8A7B9B] transition-colors duration-300"
            >
              {t.startBtn}
            </button>
          </div>
        </div>

      </section>

      {/* 3. WIR MATCHEN PERFEKT WENN SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <h2 className="text-3xl sm:text-4xl font-serif text-center text-[#2D2926]">
            {t.matchTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Match 1 */}
            <div className="space-y-4">
              <div className="text-4xl font-serif text-[#A8988B] opacity-50">01</div>
              <h3 className="text-lg font-bold text-[#2D2926]">{t.match1Title}</h3>
              <p className="text-[#2D2926]/70 leading-relaxed text-sm">{t.match1Desc}</p>
            </div>

            {/* Match 2 */}
            <div className="space-y-4">
              <div className="text-4xl font-serif text-[#A8988B] opacity-50">02</div>
              <h3 className="text-lg font-bold text-[#2D2926]">{t.match2Title}</h3>
              <p className="text-[#2D2926]/70 leading-relaxed text-sm">{t.match2Desc}</p>
            </div>

            {/* Match 3 */}
            <div className="space-y-4">
              <div className="text-4xl font-serif text-[#A8988B] opacity-50">03</div>
              <h3 className="text-lg font-bold text-[#2D2926]">{t.match3Title}</h3>
              <p className="text-[#2D2926]/70 leading-relaxed text-sm">{t.match3Desc}</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
