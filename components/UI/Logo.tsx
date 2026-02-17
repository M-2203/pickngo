import React from 'react';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12", animate = false }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00BCD4" />
          <stop offset="100%" stopColor="#2C3E50" />
        </linearGradient>
      </defs>
      {/* Abstract Compass Ring */}
      <circle cx="50" cy="50" r="45" stroke="url(#brandGradient)" strokeWidth="2" strokeOpacity="0.5" />
      <circle cx="50" cy="50" r="35" stroke="#FF9800" strokeWidth="1" strokeDasharray="4 4" className={animate ? "animate-spin-slow" : ""} />

      {/* Stylized P and G / Arrow */}
      <path 
        d="M35 75 L35 35 L65 35 C75 35 75 55 65 55 L35 55" 
        stroke="#00BCD4" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "animate-pulse" : ""}
      />
      <path 
        d="M60 55 L75 75" 
        stroke="#FF9800" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />
      
      {/* Central Node */}
      <circle cx="35" cy="35" r="4" fill="#FFFFFF" />
    </svg>
  );
};