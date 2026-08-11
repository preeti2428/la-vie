import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, Wand2, Image as ImageIcon, Sliders, CheckCircle2, X } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AIVirtualStagingTool: React.FC<Props> = ({ isOpen, onClose }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [roomType, setRoomType] = useState<string>('Living Room');
  const [designStyle, setDesignStyle] = useState<string>('Modern Feng Shui');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultReady, setResultReady] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [apiResultImage, setApiResultImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setResultReady(false);
        setProgress(0);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setResultReady(false);
        setProgress(0);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateDesign = async () => {
    if (!uploadedImage) return;
    setIsGenerating(true);
    setProgress(10);
    setResultReady(false);
    setErrorMsg(null);

    // Simulate progress while waiting for API
    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + (Math.random() * 8), 85));
    }, 1000);

    try {
      // Mock Version: Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setApiResultImage(mockAfterImage);
        setIsGenerating(false);
        setResultReady(true);
        setSliderPos(50);
      }, 500);

    } catch (err: any) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setErrorMsg(err.message || 'An error occurred during generation.');
    }
  };

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    setSliderPos(percentage);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // For demonstration, use a pre-existing "after" image from our mock data
  const mockAfterImage = PORTFOLIO_ITEMS[0].afterImage; 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-[#2D2926]/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 transform transition-all">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-[#F7F5F2] hover:bg-[#E6E2DC] text-[#2D2926] rounded-full flex items-center justify-center shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <section className="py-12 bg-white" id="ai-tool">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A7B9B]/10 text-[#5B4970] text-xs font-bold tracking-widest uppercase mb-4">
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI Design Concept</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2D2926] font-light tracking-tight mb-4">
            Visualize Your Space
          </h2>
          <p className="text-sm sm:text-base text-[#2D2926]/70 leading-relaxed">
            Upload a photo of your empty or unfurnished room. Our AI will instantly generate a breathtaking interior design concept tailored to your selected style.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#F7F5F2] rounded-3xl p-6 border border-[#2D2926]/5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#2D2926] mb-5">1. Setup Room Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2D2926]/80 mb-2 uppercase tracking-wide">Room Type</label>
                  <select 
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full bg-white border border-[#2D2926]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7D8471] focus:ring-1 focus:ring-[#7D8471] transition-all"
                  >
                    <option>Living Room</option>
                    <option>Bedroom</option>
                    <option>Home Office</option>
                    <option>Dining Area</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2926]/80 mb-2 uppercase tracking-wide">Design Style</label>
                  <select 
                    value={designStyle}
                    onChange={(e) => setDesignStyle(e.target.value)}
                    className="w-full bg-white border border-[#2D2926]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7D8471] focus:ring-1 focus:ring-[#7D8471] transition-all"
                  >
                    <option>Modern Feng Shui</option>
                    <option>Scandinavian Minimalist</option>
                    <option>Warm Luxury</option>
                    <option>Japandi Zen</option>
                  </select>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-medium border border-red-100 flex items-start gap-2">
                <span className="shrink-0 mt-0.5">⚠️</span>
                <p>{errorMsg}</p>
              </div>
            )}

            <button
              onClick={generateDesign}
              disabled={!uploadedImage || isGenerating}
              className={`w-full py-4 rounded-2xl text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                !uploadedImage 
                  ? 'bg-[#2D2926]/20 cursor-not-allowed' 
                  : isGenerating 
                    ? 'bg-[#8A7B9B]' 
                    : 'bg-[#7D8471] hover:bg-[#6C7360] shadow-md hover:shadow-lg'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : resultReady ? (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Regenerate Design</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Magic</span>
                </>
              )}
            </button>

            {/* AI Generation Status Steps */}
            {isGenerating && (
              <div className="bg-white rounded-2xl p-5 border border-[#2D2926]/10 shadow-sm animate-fade-in">
                <div className="h-1.5 w-full bg-[#F7F5F2] rounded-full mb-4 overflow-hidden">
                  <div 
                    className="h-full bg-[#8A7B9B] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#2D2926]">
                    <CheckCircle2 className={`w-4 h-4 ${progress > 10 ? 'text-[#7D8471]' : 'text-gray-300'}`} />
                    <span className={progress > 10 ? 'opacity-100' : 'opacity-40'}>Analyzing room geometry...</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#2D2926]">
                    <CheckCircle2 className={`w-4 h-4 ${progress > 45 ? 'text-[#7D8471]' : 'text-gray-300'}`} />
                    <span className={progress > 45 ? 'opacity-100' : 'opacity-40'}>Applying {designStyle} concepts...</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#2D2926]">
                    <CheckCircle2 className={`w-4 h-4 ${progress > 85 ? 'text-[#7D8471]' : 'text-gray-300'}`} />
                    <span className={progress > 85 ? 'opacity-100' : 'opacity-40'}>Rendering photorealistic lighting...</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-8">
            <div className="bg-[#F7F5F2] rounded-[2rem] p-3 border border-[#2D2926]/10 shadow-inner h-[500px] lg:h-[600px] relative overflow-hidden flex items-center justify-center">
              
              {!uploadedImage ? (
                // Upload State
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="w-full h-full border-2 border-dashed border-[#2D2926]/20 rounded-3xl flex flex-col items-center justify-center bg-white/50 hover:bg-white/80 transition-colors cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <div className="w-16 h-16 rounded-full bg-[#F7F5F2] text-[#8A7B9B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-[#2D2926] mb-1">Upload Room Image</h4>
                  <p className="text-xs text-[#2D2926]/50 max-w-xs text-center">
                    Drag and drop your photo here, or click to browse files. JPG or PNG up to 10MB.
                  </p>
                </div>
              ) : resultReady ? (
                // Result State (Before/After Slider)
                <div 
                  ref={containerRef}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  className="w-full h-full relative rounded-3xl overflow-hidden cursor-ew-resize select-none"
                >
                  {/* Close / Remove Button */}
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setResultReady(false);
                    }}
                    className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#2D2926] flex items-center justify-center shadow-md backdrop-blur-sm transition-all"
                    title="Upload new photo"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* After Image */}
                  <img 
                    src={apiResultImage || mockAfterImage} 
                    alt="AI Generated Design" 
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                  
                  {/* Before Image (Original) */}
                  <div 
                    className="absolute inset-y-0 left-0 overflow-hidden z-10"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img 
                      src={uploadedImage} 
                      alt="Original Room" 
                      className="absolute inset-0 w-full h-full object-cover max-w-none grayscale-[20%]"
                      style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                      draggable={false}
                    />
                  </div>

                  {/* Slider Handle */}
                  <div 
                    className="absolute inset-y-0 z-30 w-[2px] bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#2D2926] flex items-center justify-center shadow-xl border border-[#2D2926]/10">
                      <Sliders className="w-4 h-4 text-[#8A7B9B]" />
                    </div>
                  </div>
                </div>
              ) : (
                // Processing or Initial Image State
                <div className="w-full h-full relative rounded-3xl overflow-hidden group">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded Room" 
                    className={`w-full h-full object-cover transition-all duration-700 ${isGenerating ? 'blur-sm scale-105 opacity-80' : ''}`}
                  />
                  
                  {!isGenerating && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => setUploadedImage(null)}
                        className="px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-widest text-[#2D2926] hover:bg-[#E6E2DC] transition-colors"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="absolute inset-0 bg-[#2D2926]/60 flex flex-col items-center justify-center text-white p-6 text-center backdrop-blur-sm">
                      <div className="w-16 h-16 border-4 border-white/20 border-t-[#8A7B9B] rounded-full animate-spin mb-6" />
                      <h4 className="font-serif text-2xl mb-2">Transforming Space</h4>
                      <p className="text-xs text-white/70 uppercase tracking-widest">Please wait while AI works its magic...</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
      </div>
    </div>
  );
};
