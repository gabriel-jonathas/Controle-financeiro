
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Transaction, TransactionType } from './types';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import Header from './components/Header';
import FloatingActionButtons from './components/FloatingActionButtons';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TransactionType>(TransactionType.EXPENSE);

  useEffect(() => {
    try {
      const storedTransactions = localStorage.getItem('transactions');
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    } catch (error) {
      console.error("Failed to load transactions from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error("Failed to save transactions to localStorage", error);
    }
  }, [transactions]);

  const handleAddTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().toISOString() + Math.random(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }, []);
  
  const handleDeleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const openModal = (type: TransactionType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      <Header />
      <main className="container mx-auto max-w-3xl p-4 pb-28">
        <Dashboard 
          balance={balance} 
          totalIncome={totalIncome} 
          totalExpenses={totalExpenses}
        />
        <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
      </main>
      <FloatingActionButtons onAddExpense={() => openModal(TransactionType.EXPENSE)} onAddIncome={() => openModal(TransactionType.INCOME)} />
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTransaction={handleAddTransaction}
        type={modalType}
      />
    </div>
  );
};

export default App;
