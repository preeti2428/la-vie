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
    <div className={`relative ${className} pt-8 pl-8 sm:pt-12 sm:pl-12 lg:pt-16 lg:pl-16`}>
      {/* The offset background block */}
      <div 
        className="absolute top-0 left-0 bottom-[10%] right-[10%] z-0"
        style={{ backgroundColor: bgColor }}
      >
        {/* Vertical Text along the left edge */}
        {text && (
          <div 
            className="absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap uppercase tracking-[0.3em] text-[9px] sm:text-[10px] font-semibold"
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
