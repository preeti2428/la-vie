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
    { id: 'about' as PageView, label: t.about, icon: User },
    { id: 'contact' as PageView, label: t.contact, icon: Mail },
    { id: 'blog' as PageView, label: t.blog, icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#2D2926]/5 transition-all">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-32 flex items-center justify-between gap-2 lg:gap-4">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group py-2 text-left shrink-0"
        >
          <Logo variant="dark" showSubtitle={true} size="lg" className="group-hover:opacity-90 transition-opacity" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-[13px] xl:text-[14px] uppercase tracking-[0.15em] font-medium text-[#2D2926]">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-all flex items-center gap-1.5 py-1.5 whitespace-nowrap ${
                  isActive
                    ? 'text-[#2D2926] font-semibold'
                    : 'text-[#2D2926]/70 hover:text-[#2D2926]'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'services' && <span className="text-[8px] opacity-60 translate-y-[1px]">▼</span>}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Admin Management Panel Toggle */}
          <button
            onClick={onOpenAdmin}
            className="hidden lg:flex items-center gap-1.5 px-3 xl:px-4 py-2 border border-[#8A7B9B]/30 bg-[#8A7B9B]/10 hover:bg-[#8A7B9B]/20 text-[11px] xl:text-[12px] uppercase tracking-widest font-bold text-[#5B4970] transition-all"
            title="Open Cornelia's Booking Manager & Branding Settings"
          >
            <ShieldCheck className="w-4 h-4 text-[#8A7B9B]" />
            <span>{t.admin}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(currentLang === 'de' ? 'en' : 'de')}
            className="flex items-center gap-1.5 px-3 py-2 border border-[#2D2926]/10 bg-transparent hover:bg-black/5 rounded-full text-[12px] uppercase tracking-widest font-bold text-[#2D2926] transition-all shadow-sm"
            title="Switch Language / Sprache wechseln"
          >
            <Globe className="w-3.5 h-3.5 text-[#7D8471]" />
            <span className={currentLang === 'de' ? 'text-[#2D2926]' : 'text-[#2D2926]/40'}>DE</span>
            <span className="text-[#2D2926]/20">/</span>
            <span className={currentLang === 'en' ? 'text-[#2D2926]' : 'text-[#2D2926]/40'}>EN</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9  bg-[#E6E2DC] text-[#2D2926] flex items-center justify-center hover:bg-[#DCD7D0] transition-colors"
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
                  className={`flex items-center gap-3 p-2.5  text-xs uppercase tracking-widest font-semibold transition-all text-left ${
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
              className="flex items-center justify-center gap-2 p-2.5  bg-[#8A7B9B]/15 text-[#5B4970] text-xs uppercase tracking-widest font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-[#8A7B9B]" />
              <span>{t.admin}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="flex items-center justify-center gap-2 p-2.5  bg-[#E6E2DC] text-[#2D2926] text-xs uppercase tracking-widest font-medium"
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

