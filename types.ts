
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
}
