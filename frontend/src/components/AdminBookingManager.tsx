import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Clock, Calendar, Search, Filter, ShieldCheck, FileText, Check, Image, RefreshCw, Upload, Sparkles, FolderPlus, Info, ZoomIn, ZoomOut, Sliders, RotateCw, Move, Play, Link, Video } from 'lucide-react';
import { Language, InstagramReel, GridPortfolioItem } from '../types';
import { translations } from '../translations';
import { INSTAGRAM_REELS, GRID_PORTFOLIO_ITEMS } from '../data/mockData';
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
    <div className="p-6  border border-[#2D2926]/10 bg-[#F7F5F2] space-y-5">
      {/* Header & Main Live Badge Preview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className={`text-[10px] uppercase tracking-widest ${badgeBg} text-white px-2.5 py-0.5  font-bold`}>
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

          <div className="w-16 h-16  overflow-hidden border-2 border-[#8A7B9B] bg-white shadow-sm flex items-center justify-center relative">
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
            className="w-full py-2.5 px-3  border border-dashed border-[#8A7B9B] bg-white text-xs text-[#5B4970] font-medium flex items-center justify-center gap-2 hover:bg-[#F0EBF5] transition-colors"
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
            className="w-full text-xs p-2.5  border border-[#2D2926]/15 bg-white text-[#2D2926]"
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
                className={`p-2  text-left border flex items-center gap-2.5 transition-all text-xs ${
                  imageUrl === p.url ? 'bg-white border-[#8A7B9B] shadow-sm font-semibold' : 'bg-white/60 border-transparent hover:bg-white'
                }`}
              >
                <img src={p.url} alt={p.name} className="w-8 h-8  object-cover shrink-0" />
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
          className="w-full py-2 px-3  bg-white border border-[#2D2926]/15 text-xs font-semibold text-[#2D2926] flex items-center justify-between hover:bg-[#E6E2DC] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#8A7B9B]" />
            <span>Foto Anpassen: Zoom, Ausschnitt, Position &amp; Filter</span>
            <span className="text-[10px] bg-[#8A7B9B] text-white px-2 py-0.5  font-normal">
              {t.zoom}% Zoom
            </span>
          </span>
          <span className="text-[#8A7B9B] text-xs underline font-normal">
            {showControls ? 'Schließen ▲' : 'Anpassen / Zoomen ▼'}
          </span>
        </button>

        {/* Expanded Controls Drawer */}
        {showControls && (
          <div className="mt-3 p-4  bg-white border border-[#2D2926]/10 space-y-4 animate-fade-in">
            
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
                  className="w-full accent-[#8A7B9B] h-1.5 bg-[#E6E2DC]  cursor-pointer"
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
                    className={`py-1.5 px-2  text-[11px] font-medium border transition-all ${
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
                    className={`py-1.5 px-2  text-[11px] font-medium border transition-all ${
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
                      className={`px-2.5 py-1  text-[11px] border font-mono ${
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
                  className="px-3 py-1.5  border border-[#2D2926]/20 bg-[#F7F5F2] hover:bg-[#E6E2DC] text-xs font-medium text-[#2D2926] flex items-center gap-1.5"
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
  const [activeTab, setActiveTab] = useState<'bookings' | 'branding' | 'reels' | 'portfolio'>('bookings');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Reels state
  const [reels, setReels] = useState<InstagramReel[]>(INSTAGRAM_REELS);

  // Portfolio state
  const [portfolio, setPortfolio] = useState<GridPortfolioItem[]>(GRID_PORTFOLIO_ITEMS);

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

  // Load from localStorage or use defaults
  const getInitialBookings = (): BookingRecord[] => {
    const saved = localStorage.getItem('laVieBookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse bookings from localStorage');
      }
    }
    return [
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
    ];
  };

  const [bookings, setBookings] = useState<BookingRecord[]>(getInitialBookings);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 7)); // Default to August 2026 based on mock data

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [bookingsRes, reelsRes, portfolioRes] = await Promise.all([
          fetch('http://localhost:3000/api/bookings'),
          fetch('http://localhost:3000/api/reels'),
          fetch('http://localhost:3000/api/portfolio')
        ]);
        if (bookingsRes.ok) {
          const bData = await bookingsRes.json();
          if (bData && bData.length > 0) setBookings(bData);
        }
        if (reelsRes.ok) {
          const rData = await reelsRes.json();
          if (rData && rData.length > 0) setReels(rData);
        }
        if (portfolioRes.ok) {
          const pData = await portfolioRes.json();
          if (pData && pData.length > 0) setPortfolio(pData);
        }
      } catch (e) {
        console.error('Failed to fetch data from backend', e);
      }
    };
    fetchInitialData();
  }, []);

  const [newBooking, setNewBooking] = useState<Partial<BookingRecord>>({
    clientName: '',
    email: '',
    phone: '',
    service: 'Call a Designer',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('laVieBookings', JSON.stringify(bookings));
    if (bookings.length > 0) {
      fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookings)
      }).catch(e => console.error('Failed to sync bookings', e));
    }
  }, [bookings]);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, newStatus: 'pending' | 'confirmed' | 'completed') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Möchten Sie diese Buchung wirklich löschen?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.clientName || !newBooking.date) return;
    
    const newId = `BK-${Math.floor(Math.random() * 900) + 100}`;
    const bookingToAdd: BookingRecord = {
      id: newId,
      clientName: newBooking.clientName || '',
      email: newBooking.email || '',
      phone: newBooking.phone || '',
      service: newBooking.service || 'Call a Designer',
      date: newBooking.date || '',
      time: newBooking.time || '',
      status: 'pending',
      notes: newBooking.notes || '',
      floorplanUploaded: false
    };

    setBookings([bookingToAdd, ...bookings]);
    setShowAddForm(false);
    setNewBooking({ clientName: '', email: '', phone: '', service: 'Call a Designer', date: '', time: '', notes: '' });
  };

  const handleSaveBranding = () => {
    saveBrandingSettings(branding);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Helper to read local uploaded files as Data URLs
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: keyof BrandingSettings) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setBranding(prev => ({ ...prev, [key]: data.url }));
        }
      }
    } catch (err) {
      console.error('File upload failed', err);
    }
  };

  const handleSaveReels = async () => {
    try {
      await fetch('http://localhost:3000/api/reels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reels)
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save reels', e);
    }
  };

  const handleReelUpload = async (e: React.ChangeEvent<HTMLInputElement>, reelId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setReels(prev => prev.map(r => r.id === reelId ? { ...r, thumbnail: data.url } : r));
        }
      }
    } catch (err) {
      console.error('Reel upload failed', err);
    }
  };

  const handleSavePortfolio = async () => {
    try {
      await fetch('http://localhost:3000/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolio)
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save portfolio', e);
    }
  };

  const handlePortfolioUpload = async (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setPortfolio(prev => prev.map(p => p.id === itemId ? { ...p, imageUrl: data.url } : p));
        }
      }
    } catch (err) {
      console.error('Portfolio upload failed', err);
    }
  };

  const addPortfolioItem = () => {
    const newItem: GridPortfolioItem = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'privat',
      imageUrl: ''
    };
    setPortfolio([...portfolio, newItem]);
  };

  const removePortfolioItem = (id: string) => {
    setPortfolio(portfolio.filter(p => p.id !== id));
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
      <div className="bg-[#F7F5F2] w-full max-w-5xl max-h-[92vh]  border border-[#2D2926]/20 shadow-2xl overflow-hidden flex flex-col">
        
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
            <div className="flex bg-white/10 p-1  border border-white/15">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-1.5  text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'bookings' ? 'bg-[#8A7B9B] text-white shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Buchungen</span>
              </button>
              <button
                onClick={() => setActiveTab('branding')}
                className={`px-4 py-1.5  text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'branding' ? 'bg-[#8A7B9B] text-white shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                <Image className="w-3.5 h-3.5" />
                <span>Logo & Fotos</span>
              </button>
              <button
                onClick={() => setActiveTab('reels')}
                className={`px-4 py-1.5  text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'reels' ? 'bg-[#8A7B9B] text-white shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Instagram Reels</span>
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-1.5  text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'portfolio' ? 'bg-[#8A7B9B] text-white shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                <Image className="w-3.5 h-3.5" />
                <span>Portfolio Grid</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10  bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
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
              <div 
                onClick={() => { setFilterStatus('all'); setViewMode('calendar'); }}
                className={`p-4 bg-[#F7F5F2] border flex items-center justify-between cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md ${filterStatus === 'all' && viewMode === 'calendar' ? 'border-[#2D2926] shadow-sm' : 'border-[#2D2926]/10'}`}
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#2D2926]/60 font-semibold">{t.totalBookings}</div>
                  <div className="font-serif text-2xl font-light text-[#2D2926] mt-1">{totalCount}</div>
                </div>
                <div className="w-10 h-10 bg-[#2D2926]/10 text-[#2D2926] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>

              <div 
                onClick={() => { setFilterStatus('pending'); setViewMode('list'); }}
                className={`p-4 bg-amber-50 border flex items-center justify-between cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md ${filterStatus === 'pending' && viewMode === 'list' ? 'border-amber-500 shadow-sm' : 'border-amber-200'}`}
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold">{t.pendingBookings}</div>
                  <div className="font-serif text-2xl font-light text-amber-900 mt-1">{pendingCount}</div>
                </div>
                <div className="w-10 h-10 bg-amber-200/50 text-amber-800 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div 
                onClick={() => { setFilterStatus('confirmed'); setViewMode('list'); }}
                className={`p-4 bg-emerald-50 border flex items-center justify-between cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md ${filterStatus === 'confirmed' && viewMode === 'list' ? 'border-emerald-500 shadow-sm' : 'border-emerald-200'}`}
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-800 font-semibold">{t.confirmedBookings}</div>
                  <div className="font-serif text-2xl font-light text-emerald-900 mt-1">{confirmedCount}</div>
                </div>
                <div className="w-10 h-10 bg-emerald-200/50 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 sm:p-6 bg-[#F7F5F2] border-b border-[#2D2926]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-2 bg-white px-3 py-2 border border-[#2D2926]/15 w-full sm:w-72 shadow-sm">
                <Search className="w-4 h-4 text-[#2D2926]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kunde oder E-Mail suchen..."
                  className="w-full text-xs text-[#2D2926] bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#2D2926]/50" />
                  <div className="flex bg-white p-1 border border-[#2D2926]/15 shadow-sm">
                    <button
                      onClick={() => { setFilterStatus('all'); setViewMode('list'); }}
                      className={`px-3 py-1 text-[10px] uppercase tracking-widest font-semibold transition-all ${
                        filterStatus === 'all' && viewMode === 'list' ? 'bg-[#2D2926] text-white' : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'
                      }`}
                    >
                      Alle
                    </button>
                    <button
                      onClick={() => { setFilterStatus('pending'); setViewMode('list'); }}
                      className={`px-3 py-1 text-[10px] uppercase tracking-widest font-semibold transition-all ${
                        filterStatus === 'pending' && viewMode === 'list' ? 'bg-amber-700 text-white' : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'
                      }`}
                    >
                      Offen
                    </button>
                    <button
                      onClick={() => { setFilterStatus('confirmed'); setViewMode('list'); }}
                      className={`px-3 py-1 text-[10px] uppercase tracking-widest font-semibold transition-all ${
                        filterStatus === 'confirmed' && viewMode === 'list' ? 'bg-emerald-700 text-white' : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'
                      }`}
                    >
                      Bestätigt
                    </button>
                  </div>
                </div>

                <div className="flex bg-white p-1 border border-[#2D2926]/15 shadow-sm">
                  <button onClick={() => setViewMode('list')} className={`px-2 py-1 ${viewMode === 'list' ? 'bg-[#2D2926] text-white' : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'}`}>
                    <FileText className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('calendar')} className={`px-2 py-1 ${viewMode === 'calendar' ? 'bg-[#2D2926] text-white' : 'text-[#2D2926]/70 hover:bg-[#E6E2DC]'}`}>
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-4 py-2 bg-[#7D8471] hover:bg-[#6C7360] text-white text-xs font-semibold uppercase tracking-widest shadow-sm flex items-center gap-2"
                >
                  {showAddForm ? 'Schließen' : 'Neue Buchung'}
                </button>
              </div>

            </div>

            {/* Booking Table / Calendar */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {showAddForm && (
                <form onSubmit={handleAddBooking} className="bg-white p-5 border-2 border-[#7D8471] shadow-md mb-6 space-y-4">
                  <h4 className="font-serif text-lg font-medium text-[#2D2926]">Neue Buchung erstellen</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Kundenname *" required value={newBooking.clientName} onChange={e => setNewBooking({...newBooking, clientName: e.target.value})} className="border p-2 text-xs" />
                    <input type="email" placeholder="E-Mail" value={newBooking.email} onChange={e => setNewBooking({...newBooking, email: e.target.value})} className="border p-2 text-xs" />
                    <input type="text" placeholder="Service / Format" value={newBooking.service} onChange={e => setNewBooking({...newBooking, service: e.target.value})} className="border p-2 text-xs" />
                    <input type="date" required value={newBooking.date} onChange={e => setNewBooking({...newBooking, date: e.target.value})} className="border p-2 text-xs" />
                    <input type="text" placeholder="Uhrzeit (z.B. 14:00 - 15:00)" value={newBooking.time} onChange={e => setNewBooking({...newBooking, time: e.target.value})} className="border p-2 text-xs" />
                    <input type="text" placeholder="Notizen" value={newBooking.notes} onChange={e => setNewBooking({...newBooking, notes: e.target.value})} className="border p-2 text-xs" />
                  </div>
                  <button type="submit" className="w-full sm:w-auto px-6 py-2 bg-[#2D2926] hover:bg-[#1A1816] text-white text-xs uppercase font-bold">Speichern</button>
                </form>
              )}

              {viewMode === 'calendar' ? (
                <div className="bg-white border border-[#2D2926]/10 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-gray-100">
                      &larr; Vorheriger
                    </button>
                    <h3 className="font-serif text-xl font-light">
                      {currentMonth.toLocaleString('de-DE', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-gray-100">
                      Nächster &rarr;
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
                      <div key={day} className="bg-gray-50 text-center text-xs font-semibold py-2">
                        {day}
                      </div>
                    ))}
                    
                    {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() === 0 ? 6 : new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() - 1 }).map((_, i) => (
                      <div key={`empty-${i}`} className="bg-white min-h-[100px]" />
                    ))}
                    
                    {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() }).map((_, i) => {
                      const dateNum = i + 1;
                      const monthStr = currentMonth.toLocaleString('de-DE', { month: 'long' });
                      const mm = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
                      const dd = dateNum.toString().padStart(2, '0');
                      const yyyy = currentMonth.getFullYear();
                      
                      const dateBookings = filteredBookings.filter(b => 
                        b.date.includes(`${dateNum}. ${monthStr} ${yyyy}`) || 
                        b.date === `${yyyy}-${mm}-${dd}`
                      );

                      return (
                        <div key={dateNum} className="bg-white min-h-[100px] p-2 border-t-2 border-transparent hover:border-[#8A7B9B]/50 transition-colors">
                          <span className="text-xs font-medium text-gray-500">{dateNum}</span>
                          <div className="mt-1 space-y-1">
                            {dateBookings.map(b => (
                              <div key={b.id} className={`text-[9px] p-1 truncate cursor-help ${
                                b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                b.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                'bg-gray-100 text-gray-800'
                              }`} title={`${b.clientName} - ${b.time}`}>
                                {b.time.split(' ')[0]} {b.clientName}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                filteredBookings.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#2D2926]/50">
                  Keine entsprechenden Buchungen gefunden.
                </div>
              ) : (
                filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white p-5 border border-[#2D2926]/10 shadow-sm space-y-3 hover:border-[#8A7B9B]/50 transition-colors relative group"
                  >
                    <button onClick={() => handleDeleteBooking(b.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" title="Buchung löschen">
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2D2926]/10 pb-3 pr-6">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest bg-[#2D2926]/10 text-[#2D2926] font-bold px-2.5 py-1">
                          {b.id}
                        </span>
                        <h3 className="font-serif text-lg font-light text-[#2D2926]">
                          {b.clientName}
                        </h3>
                      </div>

                      <span
                        className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 w-fit ${
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

                    <div className="bg-[#F7F5F2] p-3 text-xs text-[#2D2926]/80 font-light flex items-start gap-2">
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
                            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3 h-3" />
                            <span>Bestätigen</span>
                          </button>
                        )}

                        {b.status !== 'completed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            className="px-3.5 py-1.5 bg-[#2D2926] hover:bg-[#1A1816] text-white text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1"
                          >
                            <span>Als Erledigt markieren</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))
              )
              )}
            </div>
          </>
        )}

        {/* TAB 2: BRANDING & CORNELIA SCHMID PHOTOS MANAGER */}
        {activeTab === 'branding' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
            
            {/* Top notification bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F5F2] p-4  border border-[#2D2926]/10">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#8A7B9B] shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-[#2D2926]">Marken- &amp; Profilbild-Manager</h3>
                  <p className="text-[11px] text-[#2D2926]/70">Laden Sie lokale Dateien direkt hoch oder tragen Sie Bild-URLs ein.</p>
                </div>
              </div>

              <button
                onClick={handleSaveBranding}
                className={`px-5 py-2.5  text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shrink-0 ${
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
                className="px-8 py-3  bg-[#7D8471] hover:bg-[#6C7360] text-white font-medium text-xs uppercase tracking-widest shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Branding Speichern</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: INSTAGRAM REELS MANAGER */}
        {activeTab === 'reels' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F5F2] p-4 border border-[#2D2926]/10 mb-6">
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-[#8A7B9B] shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-[#2D2926]">Instagram Reels Setup</h3>
                  <p className="text-[11px] text-[#2D2926]/70">Wählen Sie 4 Instagram Reels aus, die auf der Startseite angezeigt werden sollen.</p>
                </div>
              </div>
              <button
                onClick={handleSaveReels}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shrink-0 ${
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
                    <span>Reels Speichern</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reels.map((reel, index) => (
                <div key={reel.id} className="border border-[#2D2926]/10 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#2D2926]/10 pb-3 mb-2">
                    <h4 className="font-bold text-sm">Reel Slot {index + 1}</h4>
                    <span className="text-[10px] bg-[#F7F5F2] px-2 py-0.5 text-[#2D2926]/70">@{reel.handle}</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-24 h-40 bg-gray-100 shrink-0 relative border border-[#2D2926]/10 flex flex-col items-center justify-center overflow-hidden">
                      {reel.thumbnail ? (
                        <img src={reel.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                      ) : (
                        <Image className="w-6 h-6 text-gray-400 mb-2" />
                      )}
                      <label className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-[9px] text-center py-1 cursor-pointer hover:bg-black transition-colors uppercase">
                        Upload
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleReelUpload(e, reel.id)} 
                        />
                      </label>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-[#2D2926] uppercase tracking-wider mb-1 block">Reel Titel</label>
                        <input
                          type="text"
                          value={reel.title}
                          onChange={(e) => setReels(prev => prev.map(r => r.id === reel.id ? { ...r, title: e.target.value } : r))}
                          className="w-full border border-[#2D2926]/20 px-3 py-2 text-xs focus:outline-none focus:border-[#7D8471]"
                          placeholder="z.B. 5 Crucial Feng Shui Rules"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#2D2926] uppercase tracking-wider mb-1 block">Instagram Link (URL)</label>
                        <input
                          type="text"
                          value={reel.videoUrl || ''}
                          onChange={(e) => setReels(prev => prev.map(r => r.id === reel.id ? { ...r, videoUrl: e.target.value } : r))}
                          className="w-full border border-[#2D2926]/20 px-3 py-2 text-xs focus:outline-none focus:border-[#7D8471]"
                          placeholder="https://instagram.com/reel/..."
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold text-[#2D2926] uppercase mb-1 block">Views</label>
                          <input type="text" value={reel.views} onChange={(e) => setReels(prev => prev.map(r => r.id === reel.id ? { ...r, views: e.target.value } : r))} className="w-full border border-[#2D2926]/20 px-2 py-1.5 text-xs" />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-[#2D2926] uppercase mb-1 block">Likes</label>
                          <input type="text" value={reel.likes} onChange={(e) => setReels(prev => prev.map(r => r.id === reel.id ? { ...r, likes: e.target.value } : r))} className="w-full border border-[#2D2926]/20 px-2 py-1.5 text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: PORTFOLIO GRID MANAGER */}
        {activeTab === 'portfolio' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F5F2] p-4 border border-[#2D2926]/10 mb-6">
              <div className="flex items-center gap-3">
                <Image className="w-5 h-5 text-[#8A7B9B] shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-[#2D2926]">Portfolio Grid Setup</h3>
                  <p className="text-[11px] text-[#2D2926]/70">Verwalten Sie Ihre Portfolio Bilder und weisen Sie Kategorien zu.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={addPortfolioItem}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-widest border border-[#2D2926]/20 hover:bg-black/5 transition-all"
                >
                  + Neues Projekt
                </button>
                <button
                  onClick={handleSavePortfolio}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shrink-0 ${
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
                      <span>Portfolio Speichern</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div key={item.id} className="border border-[#2D2926]/10 p-4 space-y-4 relative group">
                  <button
                    onClick={() => removePortfolioItem(item.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Löschen"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  
                  <div className="relative aspect-square w-full bg-gray-100 border border-[#2D2926]/10 flex flex-col items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="Portfolio" className="w-full h-full object-cover" />
                    ) : (
                      <Image className="w-8 h-8 text-gray-400 mb-2" />
                    )}
                    <label className="absolute bottom-3 left-3 right-3 bg-black/60 text-white text-[10px] text-center py-2 cursor-pointer hover:bg-black transition-colors uppercase font-medium">
                      Bild Hochladen
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handlePortfolioUpload(e, item.id)} 
                      />
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-[#2D2926] uppercase tracking-wider mb-1 block">Titel</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => setPortfolio(prev => prev.map(p => p.id === item.id ? { ...p, title: e.target.value } : p))}
                        className="w-full border border-[#2D2926]/20 px-3 py-2 text-xs focus:outline-none focus:border-[#7D8471]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#2D2926] uppercase tracking-wider mb-1 block">Kategorie</label>
                      <select
                        value={item.category}
                        onChange={(e) => setPortfolio(prev => prev.map(p => p.id === item.id ? { ...p, category: e.target.value as 'business' | 'privat' } : p))}
                        className="w-full border border-[#2D2926]/20 px-3 py-2 text-xs focus:outline-none focus:border-[#7D8471] bg-white"
                      >
                        <option value="privat">PRIVAT</option>
                        <option value="business">BUSINESS</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

