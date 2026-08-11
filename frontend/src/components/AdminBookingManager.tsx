import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Clock, Calendar, Search, Filter, ShieldCheck, FileText, Check, Image, RefreshCw, Upload, Sparkles, FolderPlus, Info, ZoomIn, ZoomOut, Sliders, RotateCw, Move } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getBrandingSettings, saveBrandingSettings, PRESET_PHOTOS, BrandingSettings, ImageTransform, DEFAULT_TRANSFORM, DEFAULT_LOGO_TRANSFORM, getImageStyle } from '../lib/brandingStore';

interface AdminBookingManagerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

interface ImageControlBoxProps {
  badgeText: string;
  badgeBg: string;
  title: string;
  description: string;
  imageUrl: string;
  transform?: ImageTransform;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlChange: (newUrl: string) => void;
  onTransformChange: (newTransform: ImageTransform) => void;
  presets?: { name: string; url: string }[];
  isLogo?: boolean;
}

const ImageControlBox: React.FC<ImageControlBoxProps> = ({
  badgeText,
  badgeBg,
  title,
  description,
  imageUrl,
  transform = DEFAULT_TRANSFORM,
  fileInputRef,
  onFileUpload,
  onUrlChange,
  onTransformChange,
  presets,
  isLogo = false,
}) => {
  const [showControls, setShowControls] = useState(false);
  const t = { ...(isLogo ? DEFAULT_LOGO_TRANSFORM : DEFAULT_TRANSFORM), ...transform };

  const updateT = (field: keyof ImageTransform, value: any) => {
    onTransformChange({ ...t, [field]: value });
  };

  const resetTransform = () => {
    onTransformChange(isLogo ? { ...DEFAULT_LOGO_TRANSFORM } : { ...DEFAULT_TRANSFORM });
  };

  return (
    <div className="p-6 rounded-2xl border border-[#2D2926]/10 bg-[#F7F5F2] space-y-5">
      {/* Header & Main Live Badge Preview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className={`text-[10px] uppercase tracking-widest ${badgeBg} text-white px-2.5 py-0.5 rounded font-bold`}>
            {badgeText}
          </span>
          <h5 className="font-serif text-base text-[#2D2926] mt-1">{title}</h5>
          <p className="text-xs text-[#2D2926]/60">{description}</p>
        </div>

        {/* Live Preview Circle/Square Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] uppercase tracking-widest text-[#2D2926]/50 font-bold block">Live Vorschau</span>
            <span className="text-[11px] text-[#8A7B9B] font-semibold">Zoom: {t.zoom}% • {t.fit}</span>
          </div>

          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#8A7B9B] bg-white shadow-sm flex items-center justify-center relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                style={getImageStyle(t)}
                className="w-full h-full transition-all"
              />
            ) : (
              <span className="text-[10px] text-[#2D2926]/40 font-bold">Kein Bild</span>
            )}
          </div>
        </div>
      </div>

      {/* File Upload & URL Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-[#2D2926]/70 font-semibold block mb-1">
            1. Datei vom PC hochladen
          </label>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={onFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#8A7B9B] bg-white text-xs text-[#5B4970] font-medium flex items-center justify-center gap-2 hover:bg-[#F0EBF5] transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-[#8A7B9B]" />
            <span>Neues Foto vom PC Auswählen</span>
          </button>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-widest text-[#2D2926]/70 font-semibold block mb-1">
            2. Oder Foto-URL / Webpfad eintragen
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="z.B. /cornelia.jpg oder https://..."
            className="w-full text-xs p-2.5 rounded-xl border border-[#2D2926]/15 bg-white text-[#2D2926]"
          />
        </div>
      </div>

      {/* Preset Selectors */}
      {presets && presets.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] uppercase tracking-widest text-[#2D2926]/50 font-bold block">Beispiel Vorlagen:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onUrlChange(p.url)}
                className={`p-2 rounded-xl text-left border flex items-center gap-2.5 transition-all text-xs ${
                  imageUrl === p.url ? 'bg-white border-[#8A7B9B] shadow-sm font-semibold' : 'bg-white/60 border-transparent hover:bg-white'
                }`}
              >
                <img src={p.url} alt={p.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                <span className="text-[11px] text-[#2D2926] line-clamp-1">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Fine-Tuning Toggle Header */}
      <div className="pt-2 border-t border-[#2D2926]/10">
        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="w-full py-2 px-3 rounded-xl bg-white border border-[#2D2926]/15 text-xs font-semibold text-[#2D2926] flex items-center justify-between hover:bg-[#E6E2DC] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#8A7B9B]" />
            <span>Foto Anpassen: Zoom, Ausschnitt, Position &amp; Filter</span>
            <span className="text-[10px] bg-[#8A7B9B] text-white px-2 py-0.5 rounded-full font-normal">
              {t.zoom}% Zoom
            </span>
          </span>
          <span className="text-[#8A7B9B] text-xs underline font-normal">
            {showControls ? 'Schließen ▲' : 'Anpassen / Zoomen ▼'}
          </span>
        </button>

        {/* Expanded Controls Drawer */}
        {showControls && (
          <div className="mt-3 p-4 rounded-xl bg-white border border-[#2D2926]/10 space-y-4 animate-fade-in">
            
            {/* Control 1: ZOOM / SCALIERUNG */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2D2926] flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-[#8A7B9B]" />
                  <span>Zoom / Vergrößerung:</span>
                </span>
                <span className="font-mono text-[#8A7B9B] font-bold">{t.zoom}%</span>
              </div>
              <div className="flex items-center gap-3">
                <ZoomOut className="w-4 h-4 text-[#2D2926]/40 cursor-pointer" onClick={() => updateT('zoom', Math.max(50, t.zoom - 10))} />
                <input
                  type="range"
                  min="50"
                  max="250"
                  step="5"
                  value={t.zoom}
                  onChange={(e) => updateT('zoom', Number(e.target.value))}
                  className="w-full accent-[#8A7B9B] h-1.5 bg-[#E6E2DC] rounded-lg cursor-pointer"
                />
                <ZoomIn className="w-4 h-4 text-[#2D2926]/40 cursor-pointer" onClick={() => updateT('zoom', Math.min(250, t.zoom + 10))} />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#2D2926]/40">
                <span>50% (Rauszoomen)</span>
                <span>100% (Normal)</span>
                <span>250% (Heranzoomen)</span>
              </div>
            </div>

            {/* Control 2: OBJECT FIT MODE */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#2D2926] block">Anpassungs-Modus (Object Fit):</span>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {(['cover', 'contain', 'fill', 'scale-down'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateT('fit', mode)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border transition-all ${
                      t.fit === mode
                        ? 'bg-[#8A7B9B] text-white border-[#8A7B9B] font-bold shadow-sm'
                        : 'bg-[#F7F5F2] text-[#2D2926]/80 border-[#2D2926]/10 hover:bg-[#E6E2DC]'
                    }`}
                  >
                    {mode === 'cover' ? 'Füllen (Cover)' : mode === 'contain' ? 'Einpassen (Contain)' : mode === 'fill' ? 'Strecken' : 'Skalieren'}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: FOKUS POSITION */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#2D2926] flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-[#8A7B9B]" />
                <span>Bildausschnitt Focus (Ausrichtung):</span>
              </span>
              <div className="grid grid-cols-5 gap-1.5 text-xs">
                {(['center', 'top', 'bottom', 'left', 'right'] as const).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => updateT('position', pos)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border transition-all ${
                      t.position === pos
                        ? 'bg-[#7D8471] text-white border-[#7D8471] font-bold shadow-sm'
                        : 'bg-[#F7F5F2] text-[#2D2926]/80 border-[#2D2926]/10 hover:bg-[#E6E2DC]'
                    }`}
                  >
                    {pos === 'center' ? 'Zentriert' : pos === 'top' ? 'Oben' : pos === 'bottom' ? 'Unten' : pos === 'left' ? 'Links' : 'Rechts'}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: ROTATION & RESET */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#2D2926]/10">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#2D2926] flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 text-[#8A7B9B]" />
                  <span>Drehung (Rotation):</span>
                </span>
                <div className="flex items-center gap-2">
                  {[0, 90, 180, 270].map((deg) => (
                    <button
                      key={deg}
                      type="button"
                      onClick={() => updateT('rotate', deg)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] border font-mono ${
                        t.rotate === deg ? 'bg-[#2D2926] text-white border-[#2D2926]' : 'bg-[#F7F5F2] text-[#2D2926]/70 border-[#2D2926]/10'
                      }`}
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={resetTransform}
                  className="px-3 py-1.5 rounded-lg border border-[#2D2926]/20 bg-[#F7F5F2] hover:bg-[#E6E2DC] text-xs font-medium text-[#2D2926] flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#8A7B9B]" />
                  <span>Standard Zurücksetzen</span>
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

interface AdminBookingManagerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

interface BookingRecord {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed';
  notes: string;
  floorplanUploaded: boolean;
}

export const AdminBookingManager: React.FC<AdminBookingManagerProps> = ({ isOpen, onClose, currentLang }) => {
  const t = translations[currentLang].admin;
  const [activeTab, setActiveTab] = useState<'bookings' | 'branding'>('bookings');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Branding state
  const [branding, setBranding] = useState<BrandingSettings>(getBrandingSettings());
  const [saveSuccess, setSaveSuccess] = useState(false);

  // File input refs for uploading from local filesystem
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const aboutFileInputRef = useRef<HTMLInputElement>(null);
  const blogFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setBranding(getBrandingSettings());
    }
  }, [isOpen]);

  // Sample seed booking state
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'BK-101',
      clientName: 'Dr. Marc Obermeier',
      email: 'm.obermeier@zurich-clinic.ch',
      phone: '+41 79 444 12 88',
      service: 'Feng Shui Call a Designer',
      date: '14. August 2026',
      time: '10:00 - 11:00 Uhr',
      status: 'pending',
      notes: 'Penthouse Neugestaltung Zürich Enge. Möchte Sheng Qi Fluss im Arbeitszimmer maximieren.',
      floorplanUploaded: true,
    },
    {
      id: 'BK-102',
      clientName: 'Sabine & Peter Frei',
      email: 'sabine.frei@bluewin.ch',
      phone: '+41 78 910 22 33',
      service: '3D Virtual Staging (4 Räume)',
      date: '15. August 2026',
      time: '14:30 - 15:30 Uhr',
      status: 'confirmed',
      notes: 'Villa in Luzern für Verkauf vorbereiten. Vorab renderings gewünscht.',
      floorplanUploaded: true,
    },
    {
      id: 'BK-103',
      clientName: 'Elena Vaspari',
      email: 'elena@vaspari-interiors.de',
      phone: '+49 89 2020 4040',
      service: 'Farb- & Materialkonzept 60-30-10',
      date: '18. August 2026',
      time: '11:00 - 12:00 Uhr',
      status: 'completed',
      notes: 'Atelier München. Farbcodes für NCS Wandfarben geliefert.',
      floorplanUploaded: false,
    },
  ]);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, newStatus: 'pending' | 'confirmed' | 'completed') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleSaveBranding = () => {
    saveBrandingSettings(branding);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Helper to read local uploaded files as Data URLs
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, key: keyof BrandingSettings) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setBranding(prev => ({ ...prev, [key]: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch = b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || b.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#F7F5F2] w-full max-w-5xl max-h-[92vh] rounded-3xl border border-[#2D2926]/20 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Admin Header */}
        <div className="bg-[#2D2926] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8A7B9B]" />
              <span className="text-[10px] uppercase tracking-widest text-[#DCD7D0] font-semibold">
                {t.tag}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs text-[#DCD7D0]/70 font-light">
              Verwaltung von Buchungen, Markenlogo &amp; Cornelia Schmid Profilfotos
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab Switcher */}
            <div className="flex bg-white/10 p-1 rounded-full border border-white/15">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'bookings' ? 'bg-[#8A7B9B] text-white shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Buchungen</span>
              </button>

              <button
                onClick={() => setActiveTab('branding')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'branding' ? 'bg-[#8A7B9B] text-white shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                <Image className="w-3.5 h-3.5" />
                <span>Logo &amp; Fotos</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TAB 1: BOOKINGS MANAGER */}
        {activeTab === 'bookings' && (
          <>
            {/* Admin Metric Cards */}
            <div className="p-6 bg-white border-b border-[#2D2926]/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F7F5F2] border border-[#2D2926]/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#2D2926]/60 font-semibold">{t.totalBookings}</div>
                  <div className="font-serif text-2xl font-light text-[#2D2926] mt-1">{totalCount}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#2D2926]/10 text-[#2D2926] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold">{t.pendingBookings}</div>
                  <div className="font-serif text-2xl font-light text-amber-900 mt-1">{pendingCount}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-200/50 text-amber-800 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-800 font-semibold">{t.confirmedBookings}</div>
                  <div className="font-serif text-2xl font-light text-emerald-900 mt-1">{confirmedCount}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-200/50 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 sm:p-6 bg-[#F7F5F2] border-b border-[#2D2926]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#2D2926]/15 w-full sm:w-72 shadow-sm">
                <Search className="w-4 h-4 text-[#2D2926]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kunde oder E-Mail suchen..."
                  className="w-full text-xs text-[#2D2926] bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#2D2926]/50" />
                <div className="flex bg-white p-1 rounded-xl border border-[#2D2926]/15 shadow-sm">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest font-semibold transition-all ${
                      filterStatus === 'all' ? 'bg-[#2D2926] text-white' : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'
                    }`}
                  >
                    Alle
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest font-semibold transition-all ${
                      filterStatus === 'pending' ? 'bg-amber-700 text-white' : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'
                    }`}
                  >
                    Offen
                  </button>
                  <button
                    onClick={() => setFilterStatus('confirmed')}
                    className={`px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest font-semibold transition-all ${
                      filterStatus === 'confirmed' ? 'bg-emerald-700 text-white' : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'
                    }`}
                  >
                    Bestätigt
                  </button>
                </div>
              </div>

            </div>

            {/* Booking Table / List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {filteredBookings.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#2D2926]/50">
                  Keine entsprechenden Buchungen gefunden.
                </div>
              ) : (
                filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white p-5 rounded-2xl border border-[#2D2926]/10 shadow-sm space-y-3 hover:border-[#8A7B9B]/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2D2926]/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest bg-[#2D2926]/10 text-[#2D2926] font-bold px-2.5 py-1 rounded-md">
                          {b.id}
                        </span>
                        <h3 className="font-serif text-lg font-light text-[#2D2926]">
                          {b.clientName}
                        </h3>
                      </div>

                      <span
                        className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full w-fit ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {b.status === 'confirmed' && '✓ Bestätigt'}
                        {b.status === 'pending' && '⏱ Offen'}
                        {b.status === 'completed' && '★ Abgeschlossen'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[#2D2926]/50 font-medium block uppercase text-[9px] tracking-widest">Format</span>
                        <span className="font-medium text-[#2D2926]">{b.service}</span>
                      </div>

                      <div>
                        <span className="text-[#2D2926]/50 font-medium block uppercase text-[9px] tracking-widest">Datum &amp; Zeit</span>
                        <span className="text-[#2D2926]">{b.date} • {b.time}</span>
                      </div>

                      <div>
                        <span className="text-[#2D2926]/50 font-medium block uppercase text-[9px] tracking-widest">Kontakt</span>
                        <span className="text-[#2D2926]">{b.email}</span>
                      </div>
                    </div>

                    <div className="bg-[#F7F5F2] p-3 rounded-xl text-xs text-[#2D2926]/80 font-light flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#8A7B9B] shrink-0 mt-0.5" />
                      <span>{b.notes}</span>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#2D2926]/10">
                      <div className="text-[11px] text-[#2D2926]/60 flex items-center gap-1.5">
                        {b.floorplanUploaded ? (
                          <span className="text-emerald-700 font-medium flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Grundriss vorhanden
                          </span>
                        ) : (
                          <span>Kein Grundriss angehängt</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {b.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'confirmed')}
                            className="px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3 h-3" />
                            <span>Bestätigen</span>
                          </button>
                        )}

                        {b.status !== 'completed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            className="px-3.5 py-1.5 rounded-full bg-[#2D2926] hover:bg-[#1A1816] text-white text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1"
                          >
                            <span>Als Erledigt markieren</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* TAB 2: BRANDING & CORNELIA SCHMID PHOTOS MANAGER */}
        {activeTab === 'branding' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
            
            {/* Top notification bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F5F2] p-4 rounded-2xl border border-[#2D2926]/10">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#8A7B9B] shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-[#2D2926]">Marken- &amp; Profilbild-Manager</h3>
                  <p className="text-[11px] text-[#2D2926]/70">Laden Sie lokale Dateien direkt hoch oder tragen Sie Bild-URLs ein.</p>
                </div>
              </div>

              <button
                onClick={handleSaveBranding}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shrink-0 ${
                  saveSuccess ? 'bg-emerald-700 text-white' : 'bg-[#7D8471] hover:bg-[#6C7360] text-white'
                }`}
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Gespeichert!</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Änderungen Speichern</span>
                  </>
                )}
              </button>
            </div>

            {/* HELPER BOX: LOCAL FOLDER PATH INSTRUCTIONS */}
            <div className="p-4 rounded-2xl bg-[#8A7B9B]/10 border border-[#8A7B9B]/30 flex items-start gap-3">
              <FolderPlus className="w-5 h-5 text-[#5B4970] shrink-0 mt-0.5" />
              <div className="text-xs text-[#2D2926]/80 leading-relaxed">
                <span className="font-bold text-[#5B4970] block mb-1">📁 Lokaler Ordner-Pfad für eigene Bildelement-Dateien:</span>
                Sie können eigene Bilder direkt vom PC hochladen (über den Button <strong>"Lokale Datei Auswählen"</strong> below). Wenn Sie die Bilder dauerhaft im Projektordner ablegen möchten, speichern Sie Ihre Bilder im Ordner <code className="bg-white px-2 py-0.5 rounded font-mono text-[#2D2926] border border-[#2D2926]/10">/public/</code> (z.B. <code className="bg-white px-2 py-0.5 rounded font-mono text-[#2D2926] border border-[#2D2926]/10">/public/logo.png</code> oder <code className="bg-white px-2 py-0.5 rounded font-mono text-[#2D2926] border border-[#2D2926]/10">/public/cornelia.jpg</code>).
              </div>
            </div>

            {/* SECTION 1: LOGO SETTINGS */}
            <ImageControlBox
              badgeText="Markenlogo"
              badgeBg="bg-[#2D2926]"
              title="1. Markenlogo Einstellungen"
              description="Laden Sie Ihr exaktes Markenlogo hoch. Falls ein Bild zu groß oder rausgezoomt erscheint, nutzen Sie die Zoom & Einpassungs-Regler unten."
              imageUrl={branding.logoUrl}
              transform={branding.logoTransform}
              fileInputRef={logoFileInputRef}
              onFileUpload={(e) => handleFileUpload(e, 'logoUrl')}
              onUrlChange={(url) => setBranding(prev => ({ ...prev, logoUrl: url }))}
              onTransformChange={(tf) => setBranding(prev => ({ ...prev, logoTransform: tf }))}
              isLogo={true}
            />

            {/* SECTION 2: CORNELIA SCHMID PROFILE PHOTOS (3 PLACEHOLDERS) */}
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-xl text-[#2D2926] font-light">2. Cornelia Schmid Profilfotos (3 Platzhalter &amp; Bildeditor)</h4>
                <p className="text-xs text-[#2D2926]/60">Laden Sie hier direkt Ihre eigenen hochauflösenden Porträtfotos hoch und passen Sie Zoom, Bildausschnitt und Position individuell an.</p>
              </div>

              {/* PHOTO 1: MAIN HERO & WELCOME GREETING */}
              <ImageControlBox
                badgeText="Platzhalter 1"
                badgeBg="bg-[#7D8471]"
                title="Hero & Willkommens-Begrüßungs-Foto"
                description="Wird im ersten Abschnitt der Startseite als Hauptporträt von Cornelia Schmid verwendet."
                imageUrl={branding.photoHero}
                transform={branding.photoHeroTransform}
                fileInputRef={heroFileInputRef}
                onFileUpload={(e) => handleFileUpload(e, 'photoHero')}
                onUrlChange={(url) => setBranding(prev => ({ ...prev, photoHero: url }))}
                onTransformChange={(tf) => setBranding(prev => ({ ...prev, photoHeroTransform: tf }))}
                presets={PRESET_PHOTOS.hero}
              />

              {/* PHOTO 2: ABOUT CORNELIA & LA VIE ACADEMY */}
              <ImageControlBox
                badgeText="Platzhalter 2"
                badgeBg="bg-[#8A7B9B]"
                title="Über Cornelia Schmid & Akademie Seite"
                description="Wird auf der 'Über Cornelia' Biografie-Seite und dem Akademie-Abschnitt verwendet."
                imageUrl={branding.photoAbout}
                transform={branding.photoAboutTransform}
                fileInputRef={aboutFileInputRef}
                onFileUpload={(e) => handleFileUpload(e, 'photoAbout')}
                onUrlChange={(url) => setBranding(prev => ({ ...prev, photoAbout: url }))}
                onTransformChange={(tf) => setBranding(prev => ({ ...prev, photoAboutTransform: tf }))}
                presets={PRESET_PHOTOS.about}
              />

              {/* PHOTO 3: BLOG JOURNAL & PORTFOLIO EDITORIAL */}
              <ImageControlBox
                badgeText="Platzhalter 3"
                badgeBg="bg-[#2D2926]"
                title="Magazin, Portfolio & Journal Autorin"
                description="Wird als Autorinnen-Badge im LA VIE Magazin, Blog & Journal verwendet."
                imageUrl={branding.photoBlog}
                transform={branding.photoBlogTransform}
                fileInputRef={blogFileInputRef}
                onFileUpload={(e) => handleFileUpload(e, 'photoBlog')}
                onUrlChange={(url) => setBranding(prev => ({ ...prev, photoBlog: url }))}
                onTransformChange={(tf) => setBranding(prev => ({ ...prev, photoBlogTransform: tf }))}
                presets={PRESET_PHOTOS.blog}
              />

            </div>

            {/* Bottom save button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveBranding}
                className="px-8 py-3 rounded-full bg-[#7D8471] hover:bg-[#6C7360] text-white font-medium text-xs uppercase tracking-widest shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Branding Speichern</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
