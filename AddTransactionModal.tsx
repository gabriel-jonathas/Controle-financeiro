
import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  type: TransactionType;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onAddTransaction, type }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setDescription('');
      setAmount('');
      setError('');
    }
  }, [isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!description.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Por favor, preencha todos os campos com valores válidos.');
      return;
    }
    
    onAddTransaction({
      description,
      amount: numericAmount,
      type,
    });
    onClose();
  };

  if (!isOpen) return null;

  const isIncome = type === TransactionType.INCOME;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
      <div 
        className="bg-base-300 rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all duration-300 scale-95 animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
            @keyframes modal-enter {
                from { opacity: 0; transform: scale(0.95) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-modal-enter { animation: modal-enter 0.2s ease-out forwards; }
        `}</style>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text-main">
            Adicionar {isIncome ? 'Receita' : 'Despesa'}
          </h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-main transition-colors">&times;</button>
        </div>
        
        {error && <p className="bg-danger/20 text-danger text-sm p-3 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Descrição</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isIncome ? 'Ex: Salário' : 'Ex: Almoço'}
              className="w-full bg-base-100 border border-base-100 text-text-main rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-text-secondary mb-1">Valor</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="R$ 0,00"
              className="w-full bg-base-100 border border-base-100 text-text-main rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
            />
          </div>
          <button
            type="submit"
            className={`w-full font-bold py-3 rounded-lg text-white transition-transform duration-200 hover:scale-105 ${isIncome ? 'bg-secondary' : 'bg-danger'}`}
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
