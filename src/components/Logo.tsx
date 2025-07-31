import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Background Circle */}
        <circle cx="60" cy="60" r="55" fill="url(#gradient-bg)" stroke="url(#gradient-stroke)" strokeWidth="2"/>
        
        {/* Calculator Body */}
        <rect x="25" y="35" width="70" height="50" rx="8" fill="url(#gradient-calc)" stroke="url(#gradient-calc-stroke)" strokeWidth="1.5"/>
        
        {/* Calculator Screen */}
        <rect x="30" y="40" width="60" height="12" rx="4" fill="url(#gradient-screen)" stroke="url(#gradient-screen-stroke)" strokeWidth="1"/>
        
        {/* Calculator Buttons */}
        <rect x="30" y="55" width="12" height="8" rx="2" fill="url(#gradient-button)" stroke="url(#gradient-button-stroke)" strokeWidth="0.5"/>
        <rect x="45" y="55" width="12" height="8" rx="2" fill="url(#gradient-button)" stroke="url(#gradient-button-stroke)" strokeWidth="0.5"/>
        <rect x="60" y="55" width="12" height="8" rx="2" fill="url(#gradient-button)" stroke="url(#gradient-button-stroke)" strokeWidth="0.5"/>
        <rect x="75" y="55" width="12" height="8" rx="2" fill="url(#gradient-button)" stroke="url(#gradient-button-stroke)" strokeWidth="0.5"/>
        
        {/* Percentage Symbol */}
        <text x="60" y="75" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle" fill="url(#gradient-text)">%</text>
        
        {/* Mathematical Symbols */}
        <text x="35" y="62" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle" fill="url(#gradient-symbol)">×</text>
        <text x="50" y="62" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle" fill="url(#gradient-symbol)">÷</text>
        <text x="65" y="62" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle" fill="url(#gradient-symbol)">±</text>
        <text x="80" y="62" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle" fill="url(#gradient-symbol)">=</text>
        
        {/* Decorative Elements */}
        <circle cx="25" cy="25" r="3" fill="url(#gradient-accent)" opacity="0.6"/>
        <circle cx="95" cy="25" r="3" fill="url(#gradient-accent)" opacity="0.6"/>
        <circle cx="25" cy="95" r="3" fill="url(#gradient-accent)" opacity="0.6"/>
        <circle cx="95" cy="95" r="3" fill="url(#gradient-accent)" opacity="0.6"/>
        
        {/* Gradients */}
        <defs>
          {/* Background Gradient */}
          <linearGradient id="gradient-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#eff6ff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#dbeafe', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Background Stroke Gradient */}
          <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.3}} />
            <stop offset="100%" style={{stopColor: '#1d4ed8', stopOpacity: 0.3}} />
          </linearGradient>
          
          {/* Calculator Gradient */}
          <linearGradient id="gradient-calc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#f8fafc', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Calculator Stroke Gradient */}
          <linearGradient id="gradient-calc-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#e2e8f0', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#cbd5e1', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Screen Gradient */}
          <linearGradient id="gradient-screen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#1e293b', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#334155', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Screen Stroke Gradient */}
          <linearGradient id="gradient-screen-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#475569', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#64748b', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Button Gradient */}
          <linearGradient id="gradient-button" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#f1f5f9', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#e2e8f0', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Button Stroke Gradient */}
          <linearGradient id="gradient-button-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#cbd5e1', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#94a3b8', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Text Gradient */}
          <linearGradient id="gradient-text" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#1d4ed8', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Symbol Gradient */}
          <linearGradient id="gradient-symbol" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#64748b', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#475569', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Accent Gradient */}
          <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#1d4ed8', stopOpacity: 1}} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo; 