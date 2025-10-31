
import React from 'react';
import BalanceFace from './BalanceFace';

interface DashboardProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const Dashboard: React.FC<DashboardProps> = ({ balance, totalIncome, totalExpenses }) => {
  return (
    <section className="mb-8">
      <div className="bg-base-200 rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full filter blur-3xl opacity-50"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-lg font-medium text-text-secondary mb-1">Balanço Atual</h2>
            <p className="text-4xl lg:text-5xl font-extrabold tracking-tight text-text-main">
              {formatCurrency(balance)}
            </p>
            <div className="mt-4 flex justify-center md:justify-start space-x-6 text-sm">
              <div>
                <span className="text-text-secondary block">Receitas</span>
                <span className="font-semibold text-secondary">{formatCurrency(totalIncome)}</span>
              </div>
              <div>
                <span className="text-text-secondary block">Despesas</span>
                <span className="font-semibold text-danger">{formatCurrency(totalExpenses)}</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <BalanceFace balance={balance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
