import React from 'react';
import { PhoneCall, Mail, MapPin, Instagram, Calendar } from 'lucide-react';
import { Logo } from './Logo';
import { PageView } from '../types';

interface FooterProps {
  onPageChange?: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const handleNav = (page: PageView) => {
    if (onPageChange) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2D2926] text-[#F7F5F2] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleNav('home')} className="inline-block text-left">
              <Logo variant="light" showSubtitle={true} className="scale-95" />
            </button>

            <p className="text-xs leading-relaxed text-[#DCD7D0]/70 max-w-sm font-light">
              LA VIE ACADEMY GmbH • Cornelia Schmid. <br />
              Spezialisiert auf energetische Raumtransformation, Feng Shui Farbkonzepte und photorealistisches 3D Virtual Staging.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9  bg-white/10 hover:bg-[#8A7B9B] text-white flex items-center justify-center transition-colors"
                title="Instagram @cornelia.lavie"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:office@lavie-design.com"
                className="w-9 h-9  bg-white/10 hover:bg-[#8A7B9B] text-white flex items-center justify-center transition-colors"
                title="E-Mail senden"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/lavie-design/call-a-feng-shui-designer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9  bg-white/10 hover:bg-[#8A7B9B] text-white flex items-center justify-center transition-colors"
                title="Calendly Kalender"
              >
                <Calendar className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#8A7B9B]">Leistungen</div>
            <ul className="space-y-2 text-xs text-[#DCD7D0]/70 font-light">
              <li><button onClick={() => handleNav('services')} className="hover:text-white transition-colors">Call a Designer</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-white transition-colors">3D Virtual Staging</button></li>
              <li><button onClick={() => handleNav('portfolio')} className="hover:text-white transition-colors">Feng Shui Raumkonzepte</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-white transition-colors">60-30-10 Farbdramaturgie</button></li>
            </ul>
          </div>

          {/* Column 2: Journal & Content */}
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#8A7B9B]">Journal & Media</div>
            <ul className="space-y-2 text-xs text-[#DCD7D0]/70 font-light">
              <li><button onClick={() => handleNav('blog')} className="hover:text-white transition-colors">Feng Shui Magazin Artikel</button></li>
              <li><button onClick={() => handleNav('blog')} className="hover:text-white transition-colors">Instagram Editorial Reels</button></li>
              <li><button onClick={() => handleNav('about')} className="hover:text-white transition-colors">Über Cornelia Schmid</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">Häufig gestellte Fragen (FAQ)</button></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#8A7B9B]">Kontakt & Firmensitz</div>
            <div className="text-xs text-[#DCD7D0]/70 font-light space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8A7B9B]" />
                <span>Zürich, Luzern & München</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#8A7B9B]" />
                <span>+41 (0) 44 200 88 90</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8A7B9B]" />
                <span>office@lavie-design.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#DCD7D0]/50 font-light gap-4">
          <div>
            © {new Date().getFullYear()} LA VIE ACADEMY GmbH • Cornelia Schmid. Alle Rechte vorbehalten.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('contact')} className="hover:underline">Impressum</button>
            <button onClick={() => handleNav('contact')} className="hover:underline">Datenschutz</button>
            <button onClick={() => handleNav('contact')} className="hover:underline">AGB</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

