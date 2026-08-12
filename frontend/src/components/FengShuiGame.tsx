import React, { useState, useEffect, useRef } from 'react';
import { DoorOpen, LayoutGrid, CheckCircle2, AlertCircle, Lightbulb, Maximize2, Camera as CameraIcon, UploadCloud } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FengShuiGame3DCanvas } from './FengShuiGame3DCanvas';

export type ItemType = 'bed' | 'desk' | 'plant' | 'sofa' | 'rug' | 'custom';

export interface PlacedItem {
  type: ItemType;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  customImage?: string;
}

// ------------------------------------------------------------------
// Real Photo Assets (AI Generated)
// ------------------------------------------------------------------
const ASSETS = {
  bed: '/assets/game/bed_3d_1786515982912.png',
  desk: '/assets/game/desk_3d_1786515998320.png',
  sofa: '/assets/game/sofa_3d_1786516011189.png',
  plant: '/assets/game/plant_3d_1786516044115.png',
  rug: '/assets/game/rug_3d_1786516077097.png'
};

export const THEMES = {
  lightWood: {
    bg: '#d1a783',
    style: { backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.1) 40px, rgba(0,0,0,0.1) 42px)` }
  },
  darkWood: {
    bg: '#4a3b32',
    style: { backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(0,0,0,0.3) 35px, rgba(0,0,0,0.3) 37px)` }
  },
  concrete: {
    bg: '#a9a9a9',
    style: { backgroundImage: `none` }
  },
  carpet: {
    bg: '#e3dfd8',
    style: { backgroundImage: `repeating-radial-gradient(circle, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 100%)`, backgroundSize: '10px 10px' }
  }
};

const RealFurniture = ({ type, isDragging, customImage }: { type: ItemType, isDragging?: boolean, customImage?: string }) => {
  let widthClass = 'w-20'; // Increased base size
  if (type === 'bed') widthClass = 'w-28';
  if (type === 'sofa') widthClass = 'w-32';
  if (type === 'rug') widthClass = 'w-40';
  if (type === 'plant') widthClass = 'w-14';
  if (type === 'custom') widthClass = 'w-24';

  const src = type === 'custom' && customImage ? customImage : ASSETS[type as keyof typeof ASSETS];
  const blendClass = type !== 'custom' ? 'mix-blend-multiply' : 'rounded-lg object-cover';

  return (
    <img 
      src={src} 
      alt={type} 
      draggable={false}
      className={`${widthClass} h-auto ${blendClass} drop-shadow-2xl select-none pointer-events-none transition-transform duration-200 ${isDragging ? 'opacity-50 scale-95' : 'scale-100 hover:scale-105'}`}
    />
  );
};

export const FengShuiGame: React.FC = () => {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [doorPosition, setDoorPosition] = useState({ x: 10, y: 100 }); 
  const [windowPosition, setWindowPosition] = useState({ x: 80, y: 0 }); 
  
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [score, setScore] = useState<{ points: number; hints: string[] }>({ points: 0, hints: ["Drag furniture into the room to start!"] });
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const roomRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<'lightWood' | 'darkWood' | 'concrete' | 'carpet'>('lightWood');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera.");
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        const filtered = placedItems.filter(item => item.type !== 'custom');
        setPlacedItems([...filtered, { type: 'custom', x: 50, y: 50, rotation: 0, scale: 1, customImage: dataUrl }]);
        setSelectedItem('custom');
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const filtered = placedItems.filter(item => item.type !== 'custom');
        setPlacedItems([...filtered, { type: 'custom', x: 50, y: 50, rotation: 0, scale: 1, customImage: reader.result as string }]);
        setSelectedItem('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    let points = 0;
    const hints: string[] = [];
    
    if (placedItems.length === 0) {
      setScore({ points: 0, hints: ["Drag the bed and desk into the room to start checking your Feng Shui."] });
      setHasCelebrated(false);
      return;
    }

    const bed = placedItems.find(i => i.type === 'bed');
    const desk = placedItems.find(i => i.type === 'desk');
    const sofa = placedItems.find(i => i.type === 'sofa');
    const plant = placedItems.find(i => i.type === 'plant');
    const rug = placedItems.find(i => i.type === 'rug');

    if (bed) {
      const dx = doorPosition.x - bed.x;
      const dy = doorPosition.y - bed.y;
      const distanceFromDoor = Math.sqrt(dx * dx + dy * dy);
      
      const inLineOfDoor = Math.abs(dx) < 15 || Math.abs(dy) < 15;
      const isDiagonal = distanceFromDoor > 60 && !inLineOfDoor;

      if (isDiagonal) {
        points += 30;
        if (bed.rotation === 0 || bed.rotation === 270) points += 10;
        else hints.push("Your bed is in the Command Position, but try rotating it for better energy flow.");
      } else if (inLineOfDoor) {
        points -= 20;
        hints.push("CRITICAL: Your bed is in direct line with the door! Move it diagonally away.");
      } else {
        points += 10;
        hints.push("Move your bed further from the door to reach the true Command Position.");
      }
    } else {
      hints.push("You need a Bed to properly evaluate bedroom Feng Shui.");
    }

    if (desk) {
      const nearWall = desk.y < 20 || desk.x > 80 || desk.x < 20;
      if (nearWall) {
        points += 30;
        if (desk.rotation === 0 || desk.rotation === 180) points += 5;
      } else {
        points += 10;
        hints.push("Your desk is floating in the room. Place it near a wall for solid backing.");
      }
    } else {
      hints.push("Add a Desk to evaluate your career energy.");
    }

    if (sofa) points += 15;
    if (plant) points += 5;
    if (rug) points += 5;

    const finalPoints = Math.max(0, Math.min(100, points));
    if (finalPoints === 100) hints.push("Perfect! Optimal Feng Shui achieved.");

    setScore({ points: finalPoints, hints });

    if (finalPoints >= 90 && !hasCelebrated) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#7D8471', '#D1CCC3', '#2D2926', '#E5E0D8'] });
      setHasCelebrated(true);
    }
  }, [placedItems, doorPosition, windowPosition, hasCelebrated]);

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    if (!type || !roomRef.current) return;

    const rect = roomRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left - 40) / rect.width) * 100;
    let y = ((e.clientY - rect.top - 40) / rect.height) * 100;
    
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    if (type === 'door') {
      setDoorPosition({ x, y });
      return;
    }
    if (type === 'window') {
      setWindowPosition({ x, y });
      return;
    }

    const itemType = type as ItemType;
    const existingItem = placedItems.find(item => item.type === itemType);
    const rotation = existingItem ? existingItem.rotation : 0;
    const scale = existingItem ? existingItem.scale : 1;
    const customImage = existingItem ? existingItem.customImage : undefined;

    const filtered = placedItems.filter(item => item.type !== itemType);
    setPlacedItems([...filtered, { type: itemType, x, y, rotation, scale, customImage }]);
    setSelectedItem(itemType); 
  };

  const handleItemClick = (type: ItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItem === type) {
      setPlacedItems(items => items.map(item => 
        item.type === type ? { ...item, rotation: (item.rotation + 90) % 360 } : item
      ));
    } else {
      setSelectedItem(type);
    }
  };

  const updateSelectedScale = (newScale: number) => {
    if (!selectedItem) return;
    setPlacedItems(items => items.map(item => 
      item.type === selectedItem ? { ...item, scale: newScale } : item
    ));
  };

  const handleUpdateItem = (type: ItemType, pos: { x: number, y: number }, rotation: number) => {
    setPlacedItems(items => items.map(item => 
      item.type === type ? { ...item, x: pos.x, y: pos.y, rotation } : item
    ));
  };

  const resetGame = () => {
    setPlacedItems([]);
    setSelectedItem(null);
    setDoorPosition({ x: 10, y: 100 });
    setWindowPosition({ x: 80, y: 0 });
    setHasCelebrated(false);
  };

  return (
    <section className="py-10 bg-white border-y border-[#2D2926]/10" onClick={() => setSelectedItem(null)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[9px] uppercase tracking-[0.2em] bg-[#2D2926] text-white px-2 py-0.5 rounded-full font-medium inline-block shadow-sm mb-2">
            Ultimate Realism Features
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2926] font-light leading-tight">
            Advanced <span className="italic text-[#7D8471]">Room Planner</span>
          </h2>
          <p className="mt-2 text-[#2D2926]/70 font-light text-sm">
            You can now <strong>drag the Door and Window</strong> anywhere! Click items to resize or double-click to rotate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Inventory & Inspector Sidebar */}
          <div className="lg:col-span-1 bg-[#F9F8F6] p-3 rounded-lg shadow-inner flex flex-col border border-[#2D2926]/5" onClick={(e) => e.stopPropagation()}>
            
            <div className="flex-1 space-y-3 flex flex-col">
              {/* Live Scorecard */}
              <div className="bg-white -mx-3 -mt-3 p-3 rounded-t-lg border-b border-[#2D2926]/5 text-center shadow-sm">
                <span className="text-[8px] uppercase tracking-widest text-[#7D8471] font-bold">Energy Score</span>
                <div className="flex items-center justify-center gap-1 my-0.5 transition-all duration-500">
                  <div className={`text-4xl font-serif ${score.points >= 80 ? 'text-[#7D8471]' : score.points >= 50 ? 'text-amber-600' : 'text-[#2D2926]'}`}>
                    {score.points}
                  </div>
                  <div className="text-sm text-[#2D2926]/40 mt-2">/100</div>
                </div>
              </div>

              {/* Smart Hints UI */}
              <div className="bg-amber-50 border border-amber-200/50 rounded p-2 flex-shrink-0">
                <div className="flex items-center gap-1 mb-1.5">
                  <Lightbulb className="w-3 h-3 text-amber-600" />
                  <span className="text-[9px] uppercase tracking-widest text-amber-800 font-bold">Consultant Hints</span>
                </div>
                <ul className="space-y-1">
                  {score.hints.map((hint, i) => (
                    <li key={i} className="text-[9px] leading-relaxed text-amber-900/80 pl-2 border-l border-amber-300">
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Item Inspector (Resize) */}
              {selectedItem && (
                <div className="bg-[#2D2926] text-white rounded p-2 animate-fade-in shadow-sm flex-shrink-0">
                  <div className="flex items-center gap-1 mb-2">
                    <Maximize2 className="w-3 h-3 text-[#7D8471]" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Resize: {selectedItem}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2" 
                    step="0.05" 
                    value={placedItems.find(i => i.type === selectedItem)?.scale || 1}
                    onChange={(e) => updateSelectedScale(parseFloat(e.target.value))}
                    className="w-full h-1 accent-[#7D8471]"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1 flex-shrink-0">
                {(['bed', 'desk', 'sofa', 'rug', 'plant'] as ItemType[]).map((type) => {
                  const isPlaced = placedItems.some(i => i.type === type);
                  return (
                    <div
                      key={type}
                      draggable={!isPlaced}
                      onDragStart={(e) => handleDragStart(e, type)}
                      className={`relative p-1.5 rounded-lg transition-all flex flex-col items-center justify-center min-h-[60px] bg-white shadow-sm border ${
                        isPlaced 
                          ? 'opacity-30 cursor-not-allowed border-transparent' 
                          : 'cursor-grab active:cursor-grabbing hover:border-[#7D8471] border-[#2D2926]/10'
                      }`}
                    >
                      <div className="scale-[0.35] origin-center pointer-events-none absolute">
                        <RealFurniture type={type} />
                      </div>
                      <span className="absolute bottom-1 capitalize text-[8px] uppercase tracking-widest font-bold text-[#2D2926] bg-white/90 px-1.5 rounded">{type}</span>
                    </div>
                  );
                })}
              </div>

              {/* Custom Item Upload Area */}
              <div className="bg-white border border-[#2D2926]/10 rounded p-2 shadow-sm text-center flex-shrink-0">
                <span className="text-[9px] uppercase tracking-widest text-[#2D2926] font-bold block mb-2">Custom Photo</span>
                <div className="flex gap-2 justify-center">
                   <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-[#F7F5F2] rounded-full hover:bg-gray-200 transition-colors" title="Upload Photo">
                     <UploadCloud className="w-4 h-4 text-[#7D8471]" />
                   </button>
                   <button onClick={startCamera} className="p-2 bg-[#F7F5F2] rounded-full hover:bg-gray-200 transition-colors" title="Take Photo">
                     <CameraIcon className="w-4 h-4 text-[#7D8471]" />
                   </button>
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
              </div>

              {/* Theme Picker */}
              <div className="bg-white border border-[#2D2926]/10 rounded p-2 shadow-sm flex-shrink-0">
                <span className="text-[9px] uppercase tracking-widest text-[#2D2926] font-bold block mb-2 text-center">Room Theme</span>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-full text-xs p-1.5 border border-[#2D2926]/10 rounded bg-[#F9F8F6] focus:outline-none focus:ring-1 focus:ring-[#7D8471]"
                >
                  <option value="lightWood">Light Oak Wood</option>
                  <option value="darkWood">Dark Walnut</option>
                  <option value="concrete">Modern Concrete</option>
                  <option value="carpet">Soft Carpet</option>
                </select>
              </div>
            </div>
            
            <div className="pt-2 mt-auto">
              <button onClick={resetGame} className="w-full py-2 bg-white border border-[#2D2926]/20 text-[#2D2926] text-[8px] uppercase tracking-widest font-bold hover:bg-gray-50 rounded transition-colors">
                Clear Room
              </button>
            </div>
          </div>

          {/* Game Area - 3D Free Form Room */}
          <div className="lg:col-span-3 relative">
            <div 
              ref={roomRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="aspect-[16/10] bg-white shadow-xl overflow-hidden relative border-[12px] border-[#3E3A35] rounded-sm"
            >
              
              <FengShuiGame3DCanvas 
                placedItems={placedItems} 
                theme={theme} 
                onUpdateItem={handleUpdateItem} 
              />

              {/* Camera Overlay */}
              {isCameraActive && (
                <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
                  <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg rounded-xl shadow-2xl mb-6" />
                  <div className="flex gap-4">
                    <button onClick={stopCamera} className="px-6 py-2 bg-white text-[#2D2926] text-xs font-bold uppercase tracking-widest rounded-full">Cancel</button>
                    <button onClick={capturePhoto} className="px-6 py-2 bg-[#7D8471] text-white text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
                      <CameraIcon className="w-4 h-4" /> Take Photo
                    </button>
                  </div>
                </div>
              )}

              {/* Dynamic Door (Draggable over 3D Canvas) */}
              <div 
                draggable
                onDragStart={(e) => handleDragStart(e, 'door')}
                className="absolute w-24 h-24 flex items-end opacity-80 cursor-grab active:cursor-grabbing hover:ring-2 ring-amber-500/50 transition-all z-40"
                style={{ 
                  left: `${doorPosition.x}%`, 
                  top: `${doorPosition.y}%`, 
                  transform: 'translate(-50%, -100%)' 
                }}
              >
                 <div className="absolute bottom-0 left-0 w-full h-full border-b-8 border-l-8 border-[#3E3A35] pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-[150%] h-[150%] border-t-2 border-r-2 border-white/40 rounded-tr-full pointer-events-none" />
                 <span className="bg-white/90 px-1.5 py-0.5 m-1 rounded shadow text-[8px] font-bold text-gray-800 flex items-center gap-1">
                   <DoorOpen className="w-2.5 h-2.5" /> ENTRANCE
                 </span>
              </div>
              
              {/* Dynamic Window (Draggable over 3D Canvas) */}
              <div 
                draggable
                onDragStart={(e) => handleDragStart(e, 'window')}
                className="absolute w-32 h-6 cursor-grab active:cursor-grabbing hover:ring-2 ring-blue-400/50 transition-all z-40 flex items-center justify-center"
                style={{ 
                  left: `${windowPosition.x}%`, 
                  top: `${windowPosition.y}%`, 
                  transform: 'translate(-50%, -50%)'
                }}
              >
                 <div className="absolute top-0 left-0 w-full h-3 bg-blue-200/60 border-b-2 border-blue-400/40 shadow-sm pointer-events-none" />
                 <span className="bg-white/90 px-1.5 py-0.5 mt-1 rounded shadow text-[8px] font-bold text-blue-800 flex items-center gap-1">
                   <LayoutGrid className="w-2.5 h-2.5" /> WINDOW
                 </span>
              </div>

            </div>
            
            <div className="absolute inset-0 shadow-[inset_0_10px_20px_rgba(0,0,0,0.15)] pointer-events-none rounded-sm" />
          </div>

        </div>
      </div>
    </section>
  );
};

