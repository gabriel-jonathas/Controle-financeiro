
import React from 'react';

interface FloatingActionButtonsProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
);

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ onAddIncome, onAddExpense }) => {
  return (
    <div className="fixed bottom-4 right-4 z-20 flex flex-col items-center gap-4">
      <button
        onClick={onAddIncome}
        className="w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-secondary"
        aria-label="Adicionar receita"
      >
        <PlusIcon />
      </button>
      <button
        onClick={onAddExpense}
        className="w-14 h-14 rounded-full bg-danger text-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-danger"
        aria-label="Adicionar despesa"
      >
        <MinusIcon />
      </button>
    </div>
  );
};

export default FloatingActionButtons;
