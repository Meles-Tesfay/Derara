import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Logo = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center gap-3">
      {/* Custom SVG Logo Icon - Derara Leaf Style 
          This SVG mimics the 3-leaf plant with the 'D' curve branding.
          Stroke style matches the neon/outline aesthetic.
      */}
      <svg 
        width="50" 
        height="50" 
        viewBox="0 0 60 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-green-500 shrink-0"
      >
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
           {/* Center Stem & Top Leaf */}
           <path d="M30 54V24" />
           <path d="M30 24 C30 24 30 10 30 10 C30 10 36 17 30 24" />
           <path d="M30 24 C30 24 30 10 30 10 C30 10 24 17 30 24" />
           
           {/* Left Leaf */}
           <path d="M30 38 C30 38 18 34 14 26 C14 26 13 34 30 42" />
           
           {/* Right Leaf */}
           <path d="M30 38 C30 38 42 34 46 26 C46 26 47 34 30 42" />

           {/* The 'D' shaped Curve - Starts top-right, wraps around to bottom-left */}
           <path d="M36 6 C50 6 58 16 58 32 C58 48 50 56 36 56 L18 56" />
        </g>
      </svg>
      
      <div className="flex flex-col items-start justify-center leading-none">
        {/* DERARA - Red */}
        <span className="text-3xl font-bold tracking-wide text-red-600 uppercase">
          DERARA
        </span>
        
        {/* BUSINESS - White in Dark, Black in Light */}
        <span 
          className={`text-sm font-bold tracking-[0.3em] uppercase w-full text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          BUSINESS
        </span>
      </div>
    </div>
  );
};

export default Logo;
