
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-base-200/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto max-w-3xl p-4">
        <h1 className="text-2xl font-bold text-center text-text-main">
          Orçamento <span className="text-primary">Zen</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
