import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, CheckCircle2, Send, ExternalLink, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ContactSectionProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang, onOpenBooking }) => {
  const t = translations[currentLang].contact;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#F7F5F2] border-b border-[#2D2926]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.2em] bg-[#8A7B9B] text-white px-3 py-1 rounded-full font-medium inline-block shadow-sm">
            {t.tag}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light leading-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#2D2926]/70 font-light">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info & Smart Calendly Link (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Smart Calendly Booking Card */}
            <div className="glass p-8 rounded-3xl border border-[#8A7B9B]/40 bg-white shadow-md relative overflow-hidden space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#8A7B9B]/15 text-[#5B4970] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-light text-[#2D2926]">{t.directCalendly}</h3>
                  <span className="text-[10px] text-[#8A7B9B] uppercase tracking-widest font-semibold">Calendly Sync</span>
                </div>
              </div>

              <p className="text-xs text-[#2D2926]/75 font-light leading-relaxed">
                {t.calendlySubtitle}
              </p>

              <a
                href="https://calendly.com/lavie-design/call-a-feng-shui-designer"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-[#8A7B9B] hover:bg-[#726282] text-white font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>{t.openCalendly}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Contact Points */}
            <div className="glass p-8 rounded-3xl border border-[#2D2926]/10 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#7D8471]/15 text-[#7D8471] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#2D2926]/50 uppercase tracking-widest font-medium">E-Mail Anfrage</div>
                  <a href="mailto:office@lavie-design.com" className="text-sm font-medium text-[#2D2926] hover:text-[#7D8471]">
                    office@lavie-design.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#7D8471]/15 text-[#7D8471] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-xs text-[#2D2926]/50 uppercase tracking-widest font-medium">WhatsApp Direct Line</div>
                  <a href="https://wa.me/41790000000" target="_blank" rel="noreferrer" className="text-sm font-medium text-[#2D2926] hover:text-emerald-700">
                    +41 (0) 44 200 88 90
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-[#2D2926]/10">
                <div className="w-10 h-10 rounded-2xl bg-[#7D8471]/15 text-[#7D8471] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#2D2926]/50 uppercase tracking-widest font-medium">LA VIE ACADEMY GmbH</div>
                  <p className="text-xs text-[#2D2926]/80 font-light mt-0.5">
                    Zürich • Luzern • München
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass p-8 sm:p-10 rounded-3xl border border-[#2D2926]/10 bg-white shadow-sm">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#2D2926]">
                    Nachricht erfolgreich gesendet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2D2926]/75 max-w-md mx-auto font-light">
                    {t.sentSuccess}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
                    className="px-6 py-2.5 rounded-full bg-[#2D2926] text-white text-xs uppercase tracking-widest"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-serif text-2xl font-light text-[#2D2926] mb-2">
                    Persönliche Anfrage an Cornelia Schmid
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#2D2926]/60 font-semibold mb-1.5">
                        {t.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="z.B. Alexandra Weber"
                        className="w-full px-4 py-3 rounded-xl border border-[#2D2926]/15 bg-[#F7F5F2] text-xs text-[#2D2926] focus:outline-none focus:border-[#8A7B9B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#2D2926]/60 font-semibold mb-1.5">
                        {t.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ihre@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#2D2926]/15 bg-[#F7F5F2] text-xs text-[#2D2926] focus:outline-none focus:border-[#8A7B9B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#2D2926]/60 font-semibold mb-1.5">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+41 79 123 45 67"
                      className="w-full px-4 py-3 rounded-xl border border-[#2D2926]/15 bg-[#F7F5F2] text-xs text-[#2D2926] focus:outline-none focus:border-[#8A7B9B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#2D2926]/60 font-semibold mb-1.5">
                      {t.message} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Beschreiben Sie kurz Ihr Wohnprojekt oder Ihr Staging-Anliegen..."
                      className="w-full px-4 py-3 rounded-xl border border-[#2D2926]/15 bg-[#F7F5F2] text-xs text-[#2D2926] focus:outline-none focus:border-[#8A7B9B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#2D2926] hover:bg-[#1A1816] text-white font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>{t.send}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
