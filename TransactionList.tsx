
import React from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const IncomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const ExpenseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-base-200 rounded-2xl">
        <h3 className="text-xl font-semibold mb-2 text-text-main">Nenhuma transação ainda</h3>
        <p className="text-text-secondary">Adicione uma receita ou despesa para começar!</p>
      </div>
    );
  }

  return (
    <section>
        <h2 className="text-xl font-bold mb-4 text-text-main">Últimas Transações</h2>
        <ul className="space-y-3">
        {transactions.map((transaction) => {
            const isIncome = transaction.type === TransactionType.INCOME;
            return (
            <li key={transaction.id} className="bg-base-200 p-4 rounded-xl flex items-center justify-between shadow-md transition-transform duration-200 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                <div className={`rounded-full p-2 ${isIncome ? 'bg-secondary/20 text-secondary' : 'bg-danger/20 text-danger'}`}>
                    {isIncome ? <IncomeIcon/> : <ExpenseIcon/>}
                </div>
                <div>
                    <p className="font-semibold text-text-main">{transaction.description}</p>
                    <p className="text-sm text-text-secondary">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className={`font-bold text-lg ${isIncome ? 'text-secondary' : 'text-danger'}`}>
                        {isIncome ? '+' : '-'} {transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <button 
                        onClick={() => onDelete(transaction.id)}
                        className="text-text-secondary hover:text-danger transition-colors p-2 rounded-full hover:bg-danger/10"
                        aria-label="Deletar transação"
                    >
                        <TrashIcon />
                    </button>
                </div>
            </li>
            );
        })}
        </ul>
    </section>
  );
};

export default TransactionList;
