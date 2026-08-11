import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CONSULTATION_TYPES } from '../data/mockData';
import { X, Calendar, Clock, Check, Upload, PhoneCall, ArrowRight, ExternalLink } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'calendly' | 'direct'>('calendly');
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>('call_a_designer');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-14');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 Uhr');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [roomNotes, setRoomNotes] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirmBooking = () => {
    setStep(4);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D2926', '#8A7B9B', '#7D8471', '#FFFFFF'],
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  const dates = [
    { label: 'Fr, 14. Aug', value: '2026-08-14' },
    { label: 'Mo, 17. Aug', value: '2026-08-17' },
    { label: 'Di, 18. Aug', value: '2026-08-18' },
    { label: 'Mi, 19. Aug', value: '2026-08-19' },
  ];

  const times = ['09:00 Uhr', '10:30 Uhr', '14:00 Uhr', '16:00 Uhr', '18:00 Uhr'];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="relative bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#2D2926]/10 my-8">
        
        {/* Header */}
        <div className="bg-[#2D2926] text-[#F7F5F2] p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8A7B9B] text-white flex items-center justify-center font-light font-serif text-lg">
              LV
            </div>
            <div>
              <h3 className="font-serif text-lg font-light tracking-wide">Terminbuchung • Cornelia Schmid</h3>
              <p className="text-xs text-[#DCD7D0]/70 font-light">1:1 Express-Beratung & Feng Shui Virtual Staging</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Smart Calendly vs Custom Form */}
        <div className="bg-[#F7F5F2] p-2 border-b border-[#2D2926]/10 flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('calendly')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-1.5 ${
              activeTab === 'calendly'
                ? 'bg-[#8A7B9B] text-white shadow-sm'
                : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Smart Calendly Kalender</span>
          </button>

          <button
            onClick={() => setActiveTab('direct')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-1.5 ${
              activeTab === 'direct'
                ? 'bg-[#2D2926] text-white shadow-sm'
                : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Manuelle Anfragen</span>
          </button>
        </div>

        {/* Calendly Tab */}
        {activeTab === 'calendly' && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#8A7B9B]/15 text-[#5B4970] rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif text-2xl font-light text-[#2D2926]">
                Smart Calendly Kalender-Buchung
              </h4>
              <p className="text-xs sm:text-sm text-[#2D2926]/75 mt-2 font-light max-w-md mx-auto">
                Wähle deinen Wunschtermin für die 1:1 Feng Shui & Virtual Staging Beratung direkt in Cornelia Schmids Calendly Kalender.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F5F2] border border-[#2D2926]/10 text-xs text-[#2D2926]/80 text-left max-w-md mx-auto space-y-1">
              <div>✓ Sofortige Terminbestätigung & Zoom-Link</div>
              <div>✓ Vorab optional Grundriss & Fotoübermittlung</div>
              <div>✓ 1:1 Beratung mit Cornelia Schmid</div>
            </div>

            <a
              href="https://calendly.com/lavie-design/call-a-feng-shui-designer"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#8A7B9B] hover:bg-[#726282] text-white font-medium text-xs uppercase tracking-widest shadow-md transition-all"
            >
              <span>Calendly Kalender in neuem Tab öffnen</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Custom Form Tab */}
        {activeTab === 'direct' && (
          <div>
            {/* Step 1: Format */}
            {step === 1 && (
              <div className="p-6 space-y-4">
                <h4 className="font-serif text-xl font-light text-[#2D2926] mb-2">
                  Wähle dein bevorzugtes Format:
                </h4>

                <div className="space-y-3">
                  {CONSULTATION_TYPES.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSelectedService(type.id)}
                      className={`p-4 rounded-2xl border transition-all flex items-start justify-between cursor-pointer ${
                        selectedService === type.id
                          ? 'border-[#2D2926] bg-[#F7F5F2] shadow-sm'
                          : 'border-[#2D2926]/10 hover:border-[#7D8471] bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-[#2D2926] text-sm flex items-center gap-2">
                          {type.title}
                          {type.popular && (
                            <span className="px-2 py-0.5 rounded-full bg-[#8A7B9B] text-white text-[10px] uppercase font-medium tracking-wider">
                              Empfohlen
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#2D2926]/70">{type.description}</div>
                      </div>

                      <div className="text-right shrink-0 pl-4">
                        <div className="text-[10px] text-[#8A7B9B] uppercase font-semibold tracking-wider">{type.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full bg-[#7D8471] hover:bg-[#6C7360] text-white text-xs font-medium uppercase tracking-widest flex items-center gap-2 shadow-sm"
                  >
                    <span>Weiter zu Datum & Uhrzeit</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="p-6 space-y-6">
                <h4 className="font-serif text-xl font-light text-[#2D2926]">
                  Wähle deinen Wunschtermin:
                </h4>

                <div>
                  <label className="block text-[10px] font-bold text-[#2D2926] uppercase tracking-widest mb-2">
                    Verfügbare Tage:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {dates.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setSelectedDate(d.value)}
                        className={`py-3 px-2 rounded-xl text-xs font-medium border transition-all ${
                          selectedDate === d.value
                            ? 'bg-[#2D2926] text-[#F7F5F2] border-[#2D2926]'
                            : 'bg-white text-[#2D2926] border-[#2D2926]/10 hover:bg-[#F7F5F2]'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#2D2926] uppercase tracking-widest mb-2">
                    Uhrzeit:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                          selectedTime === t
                            ? 'bg-[#8A7B9B] text-white border-[#8A7B9B]'
                            : 'bg-white text-[#2D2926] border-[#2D2926]/10 hover:bg-[#F7F5F2]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#2D2926]/10">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-[#2D2926]/70 hover:underline font-medium uppercase text-[10px] tracking-wider"
                  >
                    ← Zurück
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-full bg-[#7D8471] hover:bg-[#6C7360] text-white text-xs font-medium uppercase tracking-widest flex items-center gap-2 shadow-sm"
                  >
                    <span>Weiter zu deinen Angaben</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="p-6 space-y-4">
                <h4 className="font-serif text-xl font-light text-[#2D2926]">
                  Deine Kontaktdaten & Raumdetails:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D2926] mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="z.B. Beatrix von Stauffenberg"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D2926]/15 text-xs focus:ring-2 focus:ring-[#8A7B9B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2926] mb-1">E-Mail Adresse *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@beispiel.ch"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D2926]/15 text-xs focus:ring-2 focus:ring-[#8A7B9B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2926] mb-1">Telefonnummer</label>
                  <input
                    type="tel"
                    placeholder="+41 79 123 45 67"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D2926]/15 text-xs focus:ring-2 focus:ring-[#8A7B9B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2926] mb-1">Projektnotiz / Anliegen</label>
                  <textarea
                    rows={2}
                    placeholder="z.B. Wohnzimmer Grundriss soll nach Feng Shui optimiert werden..."
                    value={roomNotes}
                    onChange={(e) => setRoomNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D2926]/15 text-xs focus:ring-2 focus:ring-[#8A7B9B] focus:outline-none"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F5F2] border-2 border-dashed border-[#2D2926]/20 text-center">
                  <Upload className="w-6 h-6 text-[#8A7B9B] mx-auto mb-1" />
                  <div className="text-xs font-bold text-[#2D2D2D]">Grundriss oder Raumfoto hochladen (Optional)</div>
                  {uploadedFile ? (
                    <div className="mt-2 text-xs font-semibold text-[#8A7B9B] bg-[#8A7B9B]/15 py-1 px-3 rounded-full inline-block">
                      ✓ Datei geladen: {uploadedFile}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setUploadedFile('Grundriss_Wohnbereich_Zuerich.pdf')}
                      className="mt-2 text-xs text-[#8A7B9B] hover:underline font-semibold"
                    >
                      [Beispiel-Grundriss anhängen]
                    </button>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#2D2926]/10">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-[#2D2926]/70 hover:underline font-medium uppercase text-[10px] tracking-wider"
                  >
                    ← Zurück
                  </button>

                  <button
                    onClick={handleConfirmBooking}
                    disabled={!clientName || !clientEmail}
                    className="px-6 py-3.5 rounded-full bg-[#7D8471] hover:bg-[#6C7360] text-white text-xs font-medium uppercase tracking-widest flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <PhoneCall className="w-4 h-4 text-white" />
                    <span>Termin anfragen</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-[#7D8471]/15 text-[#7D8471] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <h4 className="font-serif text-3xl font-light text-[#2D2926]">
                    Terminanfrage gesendet!
                  </h4>
                  <p className="text-sm text-[#2D2926]/80 mt-2 font-light">
                    Anfrage erhalten. Eine Bestätigung wurde an <strong>{clientEmail}</strong> gesendet.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-[#7D8471] text-white text-xs font-medium uppercase tracking-widest shadow-sm hover:bg-[#6C7360] transition-colors"
                >
                  Schließen & Zurück
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
