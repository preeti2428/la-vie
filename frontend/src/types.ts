export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  ruleTag: string; // e.g. "60-30-10 Color Rule", "Sheng Qi Flow"
  description: string;
  icon?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'virtual_staging' | 'feng_shui' | 'interior_design' | 'architecture';
  beforeImage: string;
  afterImage: string;
  roomType: string;
  location: string;
  description: string;
  keyChanges: string[];
  hotspots: Hotspot[];
  roiMetric?: string;
}

export interface GridPortfolioItem {
  id: string;
  title: string;
  category: 'business' | 'privat';
  imageUrl: string;
}

export interface InstagramReel {
  id: string;
  title: string;
  handle: string;
  thumbnail: string;
  views: string;
  likes: string;
  duration: string;
  tags: string[];
  summary: string;
  videoUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
}

export interface BookingSlot {
  date: string;
  time: string;
  available: boolean;
}

export type Language = 'de' | 'en';

export type PageView = 'home' | 'portfolio' | 'blog' | 'services' | 'about' | 'contact';
