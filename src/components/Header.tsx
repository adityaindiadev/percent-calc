import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center animate-fade-in">
      <div className="mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
          Percentage Calculator
        </h1>
      </div>
    </header>
  );
};

export default Header; 