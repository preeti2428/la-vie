import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { WelcomeGreetingSection } from './components/WelcomeGreetingSection';
import { WhatMakesUsSpecial } from './components/WhatMakesUsSpecial';
import { OurServicesSection } from './components/OurServicesSection';
import { BeforeAfterStaging } from './components/BeforeAfterStaging';
import { FengShuiGame } from './components/FengShuiGame';
import { CallADesignerSection } from './components/CallADesignerSection';
import { InstagramReelsGrid } from './components/InstagramReelsGrid';
import { BlogSection } from './components/BlogSection';
import { AboutCornelia } from './components/AboutCornelia';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { AIChatbotWidget } from './components/AIChatbotWidget';
import { BookingModal } from './components/BookingModal';
import { AdminBookingManager } from './components/AdminBookingManager';
import { Footer } from './components/Footer';
import { AIVirtualStagingTool } from './components/AIVirtualStagingTool';
import { Language, PageView } from './types';
import { ArrowLeft, Home, Sparkles, Box, BookOpen, Star, User, Mail, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('de');
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isStagingOpen, setIsStagingOpen] = useState<boolean>(false);

  // Sync state with URL hash (/#/portfolio, /#/about, /#/services, /#/blog, /#/contact)
  useEffect(() => {
    const syncPageFromHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages: PageView[] = ['home', 'portfolio', 'services', 'blog', 'about', 'contact'];
      if (validPages.includes(hash as PageView)) {
        setCurrentPage(hash as PageView);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    syncPageFromHash();
    window.addEventListener('hashchange', syncPageFromHash);
    return () => window.removeEventListener('hashchange', syncPageFromHash);
  }, []);

  // Update URL hash and document title when page changes
  const navigateToPage = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    
    const pageTitles: Record<PageView, string> = {
      home: 'LA VIE Interiors & Feng Shui | Cornelia Schmid',
      portfolio: 'Portfolio & Spatial Hotspots | LA VIE Interiors',
      services: 'Unsere Design & Feng Shui Services | LA VIE Interiors',
      blog: 'Magazin, Journal & Instagram Reels | LA VIE Interiors',
      about: 'Über Cornelia Schmid & LA VIE Academy | LA VIE Interiors',
      contact: 'Kontakt & Terminvereinbarung | LA VIE Interiors',
    };
    document.title = pageTitles[page] || 'LA VIE Interiors';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#2D2926] font-sans selection:bg-[#8A7B9B] selection:text-white flex flex-col">
      
      {/* Sticky Editorial Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Page Content View Router */}
      <main className="flex-grow">
        
        {/* Sub-Page Header & Breadcrumb Banner */}
        {currentPage !== 'home' && (
          <div className="bg-[#2D2926] text-[#F7F5F2] py-12 border-b border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#8A7B9B]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              {/* Breadcrumbs */}
              <div className="flex items-center justify-between text-xs mb-6">
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 text-[#8A7B9B] hover:text-white font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Zurück zur Startseite</span>
                </button>

                <div className="flex items-center gap-2 text-white/50 font-light uppercase tracking-widest text-[10px]">
                  <button
                    onClick={() => {
                      setCurrentPage('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:underline flex items-center gap-1"
                  >
                    <Home className="w-3 h-3 text-[#8A7B9B]" />
                    <span>Home</span>
                  </button>
                  <span>/</span>
                  <span className="text-white font-bold uppercase">{currentPage}</span>
                </div>
              </div>

              {/* Page Titles */}
              {currentPage === 'portfolio' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#8A7B9B] text-white px-3 py-1 inline-block font-medium mb-3 rounded-full">
                    Showroom & Interactive Gallery
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    Portfolio & <span className="italic text-[#8A7B9B]">Spatial Hotspots</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    Erleben Sie interaktive Feng Shui Hotspots und Vorher/Nachher 3D Staging Vergleiche realer Luxus-Objekte.
                  </p>
                </div>
              )}

              {currentPage === 'services' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#7D8471] text-white px-3 py-1 inline-block font-medium mb-3 rounded-full">
                    Ganzheitliche Beratung
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    Unsere <span className="italic text-[#8A7B9B]">Design & Feng Shui Services</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    Vom 1-stündigen "Call a Designer" Express-Call bis zum schlüsselfertigen 3D Virtual Staging für Immobilien.
                  </p>
                </div>
              )}

              {currentPage === 'blog' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#8A7B9B] text-white px-3 py-1 inline-block font-medium mb-3 rounded-full">
                    Journal & Social Editorial
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    Magazin & <span className="italic text-[#8A7B9B]">Instagram Reels</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    Wertvolles Wissen über die 60-30-10 Farbdramaturgie, Bagua-Energieflüsse und virtuelle Staging-Trends.
                  </p>
                </div>
              )}

              {currentPage === 'about' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#8A7B9B] text-white px-3 py-1 inline-block font-medium mb-3 rounded-full">
                    Gründerin & Philosophie
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    Über <span className="italic text-[#8A7B9B]">Cornelia Schmid</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    Pionierin für energetische Raumgestaltung, Feng Shui Expertin und Gründerin der LA VIE ACADEMY.
                  </p>
                </div>
              )}

              {currentPage === 'contact' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#7D8471] text-white px-3 py-1 inline-block font-medium mb-3 rounded-full">
                    Direct Contact & Booking
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    Kontakt & <span className="italic text-[#8A7B9B]">Terminvereinbarung</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    Treten Sie direkt mit uns in Verbindung oder buchen Sie Ihren 1:1 Beratungstermin per Kalender.
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <>
            <Hero3D
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenChat={() => setIsChatOpen(true)}
              onOpenStaging={() => setIsStagingOpen(true)}
            />

            <WelcomeGreetingSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />

            <OurServicesSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />

            <FengShuiGame />

            <CallADesignerSection onOpenBooking={() => setIsBookingOpen(true)} />

            <BeforeAfterStaging onOpenBooking={() => setIsBookingOpen(true)} />

            <InstagramReelsGrid />

            <ContactSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </>
        )}

        {/* DEDICATED PORTFOLIO PAGE */}
        {currentPage === 'portfolio' && (
          <div className="space-y-16 py-8">
            <FengShuiGame />
            <BeforeAfterStaging onOpenBooking={() => setIsBookingOpen(true)} />
          </div>
        )}

        {/* DEDICATED BLOG & JOURNAL PAGE */}
        {currentPage === 'blog' && (
          <div className="space-y-16 py-8">
            <BlogSection currentLang={currentLang} />
            <InstagramReelsGrid />
          </div>
        )}

        {/* DEDICATED SERVICES PAGE */}
        {currentPage === 'services' && (
          <div className="space-y-16 py-8">
            <OurServicesSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
            <CallADesignerSection onOpenBooking={() => setIsBookingOpen(true)} />
            <WhatMakesUsSpecial
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </div>
        )}

        {/* DEDICATED ABOUT CORNELIA PAGE */}
        {currentPage === 'about' && (
          <div className="space-y-16 py-8">
            <AboutCornelia onOpenBooking={() => setIsBookingOpen(true)} />
            <WelcomeGreetingSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </div>
        )}

        {/* DEDICATED CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="space-y-16 py-8">
            <ContactSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
            <FAQSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onPageChange={setCurrentPage} />

      {/* Persistent AI Chatbot Assistant Widget */}
      <AIChatbotWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onOpenBooking={() => setIsBookingOpen(true)}
        currentLang={currentLang}
      />

      {/* Booking Drawer / Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Admin Booking & Appointment Dashboard */}
      <AdminBookingManager
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentLang={currentLang}
      />

      {/* AI Virtual Staging Modal */}
      <AIVirtualStagingTool 
        isOpen={isStagingOpen}
        onClose={() => setIsStagingOpen(false)}
      />

      {/* Floating AI Staging Trigger Button - Prominent & Descriptive */}
      <button
        onClick={() => setIsStagingOpen(true)}
        className="fixed bottom-28 right-6 z-40 bg-gradient-to-r from-[#2D2926] to-[#3D3834] text-white p-4 sm:px-5 sm:py-4 rounded-2xl shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-1.5 group border border-white/10 hover:border-white/30 hover:shadow-[0_10px_40px_rgba(138,123,155,0.3)] origin-bottom-right"
      >
        <div className="flex items-center gap-2.5">
          <div className="bg-[#8A7B9B] p-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="font-bold text-sm uppercase tracking-widest text-white">AI Virtual Staging</span>
          <span className="bg-[#7D8471] text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ml-1">Free</span>
        </div>
        <span className="text-[11px] text-[#DCD7D0] max-w-[220px] text-left leading-tight hidden sm:block font-light">
          Upload a photo of your empty room and see it transformed instantly by our AI!
        </span>
      </button>

    </div>
  );
}
