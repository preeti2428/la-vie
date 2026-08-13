import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLuxury } from './components/HeroLuxury';
import { Hero3D } from './components/Hero3D';
import { WelcomeGreetingSection } from './components/WelcomeGreetingSection';
import { WhatMakesUsSpecial } from './components/WhatMakesUsSpecial';
import { BentoGridSection } from './components/BentoGridSection';
import { OurServicesSection } from './components/OurServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PortfolioGrid } from './components/PortfolioGrid';
import { AboutPage } from './components/AboutPage';
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
import { BeforeAfterStaging } from './components/BeforeAfterStaging';
import { FengShuiQuiz } from './components/FengShuiQuiz';
import { ShopSection } from './components/ShopSection';
import { Language, PageView } from './types';
import { ArrowLeft, Home, Sparkles, Box, BookOpen, Star, User, Mail, ShieldCheck } from 'lucide-react';
import { syncGlobalBranding } from './lib/brandingStore';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('de');
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isStagingOpen, setIsStagingOpen] = useState<boolean>(false);
  const [heroTheme, setHeroTheme] = useState<'luxury' | 'classic'>('classic');
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Fetch global branding config on startup
  useEffect(() => {
    syncGlobalBranding();
  }, []);

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
    const handleScroll = () => {
      // Hide hero toggle button when scrolled past the hero section
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsHeroVisible(false);
      } else {
        setIsHeroVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('hashchange', syncPageFromHash);
      window.removeEventListener('scroll', handleScroll);
    };
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

  const t = {
    de: {
      backToHome: "Zurück zur Startseite",
      home: "Home",
      portfolioLabel: "Showroom & Interactive Gallery",
      portfolioTitle: "Portfolio &",
      portfolioTitleItalic: "Spatial Hotspots",
      portfolioDesc: "Erleben Sie interaktive Feng Shui Hotspots und Vorher/Nachher 3D Staging Vergleiche realer Luxus-Objekte.",
      servicesLabel: "Ganzheitliche Beratung",
      servicesTitle: "Unsere",
      servicesTitleItalic: "Design & Feng Shui Services",
      servicesDesc: "Vom 1-stündigen \"Call a Designer\" Express-Call bis zum schlüsselfertigen 3D Virtual Staging für Immobilien.",
      blogLabel: "Journal & Social Editorial",
      blogTitle: "Magazin &",
      blogTitleItalic: "Instagram Reels",
      blogDesc: "Wertvolles Wissen über die 60-30-10 Farbdramaturgie, Bagua-Energieflüsse und virtuelle Staging-Trends.",
      aboutLabel: "Gründerin & Philosophie",
      aboutTitle: "Über",
      aboutTitleItalic: "Cornelia Schmid",
      aboutDesc: "Pionierin für energetische Raumgestaltung, Feng Shui Expertin und Gründerin der LA VIE ACADEMY.",
      contactLabel: "Direct Contact & Booking",
      contactTitle: "Kontakt &",
      contactTitleItalic: "Terminvereinbarung",
      contactDesc: "Treten Sie direkt mit uns in Verbindung oder buchen Sie Ihren 1:1 Beratungstermin per Kalender."
    },
    en: {
      backToHome: "Back to Home",
      home: "Home",
      portfolioLabel: "Showroom & Interactive Gallery",
      portfolioTitle: "Portfolio &",
      portfolioTitleItalic: "Spatial Hotspots",
      portfolioDesc: "Experience interactive Feng Shui hotspots and Before/After 3D staging comparisons of real luxury properties.",
      servicesLabel: "Holistic Consulting",
      servicesTitle: "Our",
      servicesTitleItalic: "Design & Feng Shui Services",
      servicesDesc: "From a 1-hour 'Call a Designer' express call to turnkey 3D virtual staging for real estate.",
      blogLabel: "Journal & Social Editorial",
      blogTitle: "Magazine &",
      blogTitleItalic: "Instagram Reels",
      blogDesc: "Valuable knowledge about the 60-30-10 color dramaturgy, Bagua energy flows, and virtual staging trends.",
      aboutLabel: "Founder & Philosophy",
      aboutTitle: "About",
      aboutTitleItalic: "Cornelia Schmid",
      aboutDesc: "Pioneer in energetic interior design, Feng Shui expert, and founder of the LA VIE ACADEMY.",
      contactLabel: "Direct Contact & Booking",
      contactTitle: "Contact &",
      contactTitleItalic: "Appointments",
      contactDesc: "Get in touch directly or book your 1:1 consultation appointment via calendar."
    }
  }[currentLang];

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
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#8A7B9B]/20  blur-3xl pointer-events-none" />
            
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
                  <span>{t.backToHome}</span>
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
                    <span>{t.home}</span>
                  </button>
                  <span>/</span>
                  <span className="text-white font-bold uppercase">{currentPage}</span>
                </div>
              </div>

              {/* Page Titles */}
              {currentPage === 'portfolio' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#8A7B9B] text-white px-3 py-1 inline-block font-medium mb-3 ">
                    {t.portfolioLabel}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    {t.portfolioTitle} <span className="italic text-[#8A7B9B]">{t.portfolioTitleItalic}</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    {t.portfolioDesc}
                  </p>
                </div>
              )}

              {currentPage === 'services' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#7D8471] text-white px-3 py-1 inline-block font-medium mb-3 ">
                    {t.servicesLabel}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    {t.servicesTitle} <span className="italic text-[#8A7B9B]">{t.servicesTitleItalic}</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    {t.servicesDesc}
                  </p>
                </div>
              )}

              {currentPage === 'blog' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#8A7B9B] text-white px-3 py-1 inline-block font-medium mb-3 ">
                    {t.blogLabel}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    {t.blogTitle} <span className="italic text-[#8A7B9B]">{t.blogTitleItalic}</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    {t.blogDesc}
                  </p>
                </div>
              )}

              {currentPage === 'about' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#8A7B9B] text-white px-3 py-1 inline-block font-medium mb-3 ">
                    {t.aboutLabel}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    {t.aboutTitle} <span className="italic text-[#8A7B9B]">{t.aboutTitleItalic}</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    {t.aboutDesc}
                  </p>
                </div>
              )}

              {currentPage === 'contact' && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-[#7D8471] text-white px-3 py-1 inline-block font-medium mb-3 ">
                    {t.contactLabel}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-2">
                    {t.contactTitle} <span className="italic text-[#8A7B9B]">{t.contactTitleItalic}</span>
                  </h1>
                  <p className="text-sm text-[#DCD7D0] max-w-xl font-light">
                    {t.contactDesc}
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <>
            {heroTheme === 'luxury' ? (
              <>
                <HeroLuxury currentLang={currentLang} />
                <BentoGridSection currentLang={currentLang} />
              </>
            ) : (
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
                <WhatMakesUsSpecial
                  currentLang={currentLang}
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
              </>
            )}

            <BeforeAfterStaging currentLang={currentLang} onOpenBooking={() => setIsBookingOpen(true)} />

            <OurServicesSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />

            <TestimonialsSection currentLang={currentLang} />

            <FengShuiGame currentLang={currentLang} />

            <FengShuiQuiz currentLang={currentLang} />

            <CallADesignerSection currentLang={currentLang} onOpenBooking={() => setIsBookingOpen(true)} />

            <PortfolioGrid currentLang={currentLang} />

            <InstagramReelsGrid currentLang={currentLang} />
            
            <ShopSection currentLang={currentLang} />

            <ContactSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </>
        )}

        {/* DEDICATED PORTFOLIO PAGE */}
        {currentPage === 'portfolio' && (
          <div className="space-y-16 py-8">
            <PortfolioGrid currentLang={currentLang} />
          </div>
        )}

        {/* DEDICATED BLOG & JOURNAL PAGE */}
        {currentPage === 'blog' && (
          <div className="space-y-16 py-8">
            <BlogSection currentLang={currentLang} />
            <InstagramReelsGrid currentLang={currentLang} />
          </div>
        )}

        {/* DEDICATED SERVICES PAGE */}
        {currentPage === 'services' && (
          <div className="space-y-16 py-8">
            <OurServicesSection
              currentLang={currentLang}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
            <CallADesignerSection currentLang={currentLang} onOpenBooking={() => setIsBookingOpen(true)} />
            <BentoGridSection
              currentLang={currentLang}
            />
          </div>
        )}

        {/* DEDICATED ABOUT PAGE */}
        {currentPage === 'about' && (
          <AboutPage currentLang={currentLang} onOpenBooking={() => setIsBookingOpen(true)} />
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
      <Footer currentLang={currentLang} onPageChange={setCurrentPage} />

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
        currentLang={currentLang}
      />

      {/* Admin Booking & Appointment Dashboard */}
      <AdminBookingManager
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentLang={currentLang}
      />

      {/* AI Virtual Staging Modal */}
      {isStagingOpen && <AIVirtualStagingTool currentLang={currentLang} isOpen={isStagingOpen} onClose={() => setIsStagingOpen(false)} />}

      {/* Floating AI Staging Trigger Button - Prominent & Descriptive */}
      <button
        onClick={() => setIsStagingOpen(true)}
        className="fixed top-40 right-6 z-40 bg-gradient-to-r from-[#2D2926]/95 to-[#3D3834]/95 backdrop-blur-md rounded-full text-white px-2 py-1.5 shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center gap-1.5 group border border-white/20 hover:border-white/40 hover:shadow-[0_10px_40px_rgba(138,123,155,0.3)] origin-top-right"
      >
        <span className="font-bold text-[8px] uppercase tracking-widest text-white whitespace-nowrap pl-0.5">
          {currentLang === 'de' ? 'AI Virtual Staging (Live)' : 'AI Virtual Staging (Live)'}
        </span>
        <div className="bg-[#8A7B9B] p-0.5 rounded-full shadow-inner group-hover:bg-[#9b8bad] transition-colors">
          <Sparkles className="w-2.5 h-2.5 text-white animate-pulse" />
        </div>
      </button>

      {/* Hero Theme Switcher (Floating Button) */}
      {currentPage === 'home' && isHeroVisible && (
        <button
          onClick={() => setHeroTheme(prev => prev === 'luxury' ? 'classic' : 'luxury')}
          className="fixed bottom-6 left-6 z-50 bg-[#2D2926] text-white px-4 py-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold shadow-lg hover:bg-[#8A7B9B] transition-colors rounded-sm animate-fade-in"
        >
          {heroTheme === 'luxury' 
            ? (currentLang === 'de' ? 'Wechsel zu Classic 3D Hero' : 'Switch to Classic 3D Hero')
            : (currentLang === 'de' ? 'Wechsel zu AVARIA Luxury Hero' : 'Switch to AVARIA Luxury Hero')}
        </button>
      )}

    </div>
  );
}
