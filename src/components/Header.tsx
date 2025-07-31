import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="text-center animate-fade-in">
      <div className="mb-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-3">
          <Logo size="lg" className="animate-fade-in mb-2 md:mb-0" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2">
            Percentage Calculator
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header; 