import React from 'react';

interface AestheticFrameProps {
  children: React.ReactNode;
  text?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export const AestheticFrame: React.FC<AestheticFrameProps> = ({
  children,
  text,
  bgColor = '#9e8b82', // A sophisticated warm taupe/brown from the screenshots
  textColor = '#2D2926',
  className = ''
}) => {
  return (
    <div className={`relative ${className} mt-8 ml-8 sm:mt-12 sm:ml-12`}>
      {/* The offset background block */}
      <div 
        className="absolute inset-0 z-0 -translate-x-6 -translate-y-6 sm:-translate-x-10 sm:-translate-y-10"
        style={{ backgroundColor: bgColor }}
      >
        {/* Vertical Text along the left edge */}
        {text && (
          <div 
            className="absolute bottom-4 -left-6 origin-bottom-left -rotate-90 whitespace-nowrap uppercase tracking-[0.3em] text-[9px] sm:text-[10px] font-semibold"
            style={{ color: textColor }}
          >
            {text}
          </div>
        )}
      </div>

      {/* The Image (Content) */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
