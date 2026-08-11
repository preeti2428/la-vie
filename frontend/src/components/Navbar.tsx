import React, { useState } from 'react';
import { PhoneCall, Globe, Box, Star, BookOpen, Mail, ShieldCheck, User, Sparkles, Home, Menu, X } from 'lucide-react';
import { Language, PageView } from '../types';
import { translations } from '../translations';
import { Logo } from './Logo';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: PageView;
  onPageChange: (page: PageView) => void;
  onOpenBooking: () => void;
  onOpenChat: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentPage,
  onPageChange,
  onOpenBooking,
  onOpenChat,
  onOpenAdmin,
}) => {
  const t = translations[currentLang].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView, hash?: string) => {
    onPageChange(page);
    setMobileMenuOpen(false);
    if (page === 'home' && hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home' as PageView, label: t.welcome, icon: Home },
    { id: 'portfolio' as PageView, label: t.portfolio, icon: Box },
    { id: 'services' as PageView, label: t.services, icon: Star },
    { id: 'blog' as PageView, label: t.blog, icon: BookOpen },
    { id: 'about' as PageView, label: t.about, icon: User },
    { id: 'contact' as PageView, label: t.contact, icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F2]/95 backdrop-blur-md border-b border-[#2D2926]/10 transition-all">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 lg:gap-4">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group py-2 text-left shrink-0"
        >
          <Logo variant="dark" showSubtitle={true} size="md" className="group-hover:opacity-90 transition-opacity" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-[10px] xl:text-[11px] uppercase tracking-[0.1em] xl:tracking-[0.18em] font-medium text-[#2D2926]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-all flex items-center gap-1.5 py-1.5 border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'text-[#7D8471] font-bold border-[#7D8471]'
                    : 'text-[#2D2926]/80 hover:text-[#7D8471] border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#7D8471]' : 'text-[#2D2926]/50'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Admin Management Panel Toggle */}
          <button
            onClick={onOpenAdmin}
            className="hidden lg:flex items-center gap-1.5 px-2 xl:px-3 py-1.5 rounded-full border border-[#8A7B9B]/30 bg-[#8A7B9B]/10 hover:bg-[#8A7B9B]/20 text-[9px] xl:text-[10px] uppercase tracking-widest font-bold text-[#5B4970] transition-all"
            title="Open Cornelia's Booking Manager & Branding Settings"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#8A7B9B]" />
            <span>{t.admin}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(currentLang === 'de' ? 'en' : 'de')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2D2926]/15 bg-white hover:bg-[#E6E2DC] text-[10px] uppercase tracking-widest font-bold text-[#2D2926] transition-all shadow-sm"
            title="Switch Language / Sprache wechseln"
          >
            <Globe className="w-3.5 h-3.5 text-[#7D8471]" />
            <span className={currentLang === 'de' ? 'text-[#7D8471]' : 'text-[#2D2926]/40'}>DE</span>
            <span className="text-[#2D2926]/20">/</span>
            <span className={currentLang === 'en' ? 'text-[#7D8471]' : 'text-[#2D2926]/40'}>EN</span>
          </button>

          {/* AI Chat Trigger */}
          <button
            onClick={onOpenChat}
            className="hidden lg:flex items-center gap-1.5 px-2 xl:px-3.5 py-1.5 rounded-full bg-[#E6E2DC] hover:bg-[#DCD7D0] text-[#2D2926] text-[9px] xl:text-[10px] uppercase tracking-widest font-medium transition-colors"
            title="Open LA VIE Assistant Chat"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8A7B9B]" />
            <span>{t.aiConcierge}</span>
          </button>

          {/* Call a Designer CTA Button */}
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-full bg-[#7D8471] hover:bg-[#6C7360] text-white text-[11px] uppercase tracking-widest font-medium flex items-center gap-2 shadow-sm transition-all group shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">{t.callDesigner}</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-[#E6E2DC] text-[#2D2926] flex items-center justify-center hover:bg-[#DCD7D0] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5F2] border-b border-[#2D2926]/10 px-6 py-6 space-y-4 animate-fade-in shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all text-left ${
                    isActive ? 'bg-[#7D8471] text-white' : 'text-[#2D2926] hover:bg-[#E6E2DC]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#2D2926]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#8A7B9B]/15 text-[#5B4970] text-xs uppercase tracking-widest font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-[#8A7B9B]" />
              <span>{t.admin}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#E6E2DC] text-[#2D2926] text-xs uppercase tracking-widest font-medium"
            >
              <Sparkles className="w-4 h-4 text-[#8A7B9B]" />
              <span>{t.aiConcierge}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
