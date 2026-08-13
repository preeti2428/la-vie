import React from 'react';

export interface ImageTransform {
  zoom: number; // 50 - 250%
  fit: 'cover' | 'contain' | 'fill' | 'scale-down';
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  brightness: number; // 50 - 150%
  contrast: number; // 50 - 150%
  rotate: number; // 0, 90, 180, 270
}

export interface BrandingSettings {
  logoUrl: string;
  logoTransform?: ImageTransform;
  photoHero: string;
  photoHeroTransform?: ImageTransform;
  photoAbout: string;
  photoAboutTransform?: ImageTransform;
  photoBlog: string;
  photoBlogTransform?: ImageTransform;
  photoSpecial: string;
  photoSpecialTransform?: ImageTransform;
}

export const DEFAULT_TRANSFORM: ImageTransform = {
  zoom: 100,
  fit: 'cover',
  position: 'center',
  brightness: 100,
  contrast: 100,
  rotate: 0,
};

export const DEFAULT_LOGO_TRANSFORM: ImageTransform = {
  zoom: 100,
  fit: 'contain',
  position: 'center',
  brightness: 100,
  contrast: 100,
  rotate: 0,
};

export const DEFAULT_BRANDING: BrandingSettings = {
  logoUrl: '',
  logoTransform: { ...DEFAULT_LOGO_TRANSFORM },
  photoHero: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
  photoHeroTransform: { ...DEFAULT_TRANSFORM },
  photoAbout: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80',
  photoAboutTransform: { ...DEFAULT_TRANSFORM },
  photoBlog: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1000&q=80',
  photoBlogTransform: { ...DEFAULT_TRANSFORM },
  photoSpecial: '/lavie1.png',
  photoSpecialTransform: { ...DEFAULT_TRANSFORM, fit: 'contain' },
};

export const getImageStyle = (transform?: ImageTransform): React.CSSProperties => {
  const t = { ...DEFAULT_TRANSFORM, ...transform };
  const scale = t.zoom / 100;
  return {
    objectFit: t.fit,
    objectPosition: t.position,
    transform: `scale(${scale}) rotate(${t.rotate}deg)`,
    filter: `brightness(${t.brightness}%) contrast(${t.contrast}%)`,
    transition: 'transform 0.2s ease, filter 0.2s ease',
  };
};

export const PRESET_PHOTOS = {
  hero: [
    { name: 'Executive Portrait (Default)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Studio Atelier Light', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Warm Editorial Natural', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80' },
  ],
  about: [
    { name: 'Architectural Designer (Default)', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Master Consultation Portrait', url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Minimalist Interior Focus', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80' },
  ],
  blog: [
    { name: 'Editorial Journal (Default)', url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Creative Studio Portrait', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Warm Lighting Editorial', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80' },
  ],
  special: [
    { name: 'Special Collage (Default)', url: '/lavie1.png' },
    { name: 'Minimalist Office', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Luxury Interior', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80' },
  ],
};

let globalBrandingCache: BrandingSettings | null = null;

export const getBrandingSettings = (): BrandingSettings => {
  if (globalBrandingCache) {
    return globalBrandingCache;
  }
  try {
    const saved = localStorage.getItem('lavie_branding_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_BRANDING,
        ...parsed,
        logoTransform: { ...DEFAULT_LOGO_TRANSFORM, ...(parsed.logoTransform || {}) },
        photoHeroTransform: { ...DEFAULT_TRANSFORM, ...(parsed.photoHeroTransform || {}) },
        photoAboutTransform: { ...DEFAULT_TRANSFORM, ...(parsed.photoAboutTransform || {}) },
        photoBlogTransform: { ...DEFAULT_TRANSFORM, ...(parsed.photoBlogTransform || {}) },
        photoSpecialTransform: { ...DEFAULT_TRANSFORM, ...(parsed.photoSpecialTransform || {}) },
      };
    }
  } catch (e) {
    console.warn('Failed to load branding from localStorage', e);
  }
  return DEFAULT_BRANDING;
};

export const syncGlobalBranding = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/settings/branding');
    if (res.ok) {
      const parsed = await res.json();
      if (Object.keys(parsed).length > 0) {
        globalBrandingCache = {
          ...DEFAULT_BRANDING,
          ...parsed,
          logoTransform: { ...DEFAULT_LOGO_TRANSFORM, ...(parsed.logoTransform || {}) },
          photoHeroTransform: { ...DEFAULT_TRANSFORM, ...(parsed.photoHeroTransform || {}) },
          photoAboutTransform: { ...DEFAULT_TRANSFORM, ...(parsed.photoAboutTransform || {}) },
          photoBlogTransform: { ...DEFAULT_TRANSFORM, ...(parsed.photoBlogTransform || {}) },
          photoSpecialTransform: { ...DEFAULT_TRANSFORM, ...(parsed.photoSpecialTransform || {}) },
        };
        // fallback to localStorage cache
        localStorage.setItem('lavie_branding_settings', JSON.stringify(globalBrandingCache));
        window.dispatchEvent(new Event('lavie_branding_updated'));
      }
    }
  } catch (e) {
    console.error('Failed to sync global branding', e);
  }
};

export const saveBrandingSettings = async (settings: BrandingSettings) => {
  try {
    globalBrandingCache = settings;
    localStorage.setItem('lavie_branding_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('lavie_branding_updated'));
    
    // Save to backend
    await fetch('http://localhost:3000/api/settings/branding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
  } catch (e) {
    console.error('Failed to save global branding settings', e);
  }
};

