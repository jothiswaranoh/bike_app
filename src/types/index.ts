export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface ExpenseFormData {
  title: string;
  amount: string;
  category: string;
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Bills',
  'Healthcare',
  'Education',
  'Other'
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}