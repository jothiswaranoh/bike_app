import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Expense } from '../types';
import { calculateTotal, formatCurrency } from '../utils/calculations';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

/**
 * Component to display expense summary and statistics
 * Shows total amount, expense count, and category breakdown
 */
export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalAmount = calculateTotal(expenses);
  const expenseCount = expenses.length;
  
  // Calculate average expense amount
  const averageAmount = expenseCount > 0 ? totalAmount / expenseCount : 0;
  
  // Get current month expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const thisMonthTotal = calculateTotal(thisMonthExpenses);

  // Calculate category totals
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as { [category: string]: number });

  const topCategory = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Expenses */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Expenses</p>
            <p className="text-3xl font-bold mt-2">{formatCurrency(totalAmount)}</p>
          </div>
          <div className="bg-blue-500/30 p-3 rounded-lg">
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      {/* Expense Count */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl shadow-lg p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Total Transactions</p>
            <p className="text-3xl font-bold mt-2">{expenseCount}</p>
          </div>
          <div className="bg-green-500/30 p-3 rounded-lg">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* This Month */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-xl shadow-lg p-6 border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium">This Month</p>
            <p className="text-3xl font-bold mt-2">{formatCurrency(thisMonthTotal)}</p>
          </div>
          <div className="bg-orange-500/30 p-3 rounded-lg">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      {/* Average Expense */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl shadow-lg p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Average Expense</p>
            <p className="text-3xl font-bold mt-2">{formatCurrency(averageAmount)}</p>
            {topCategory && (
              <p className="text-purple-100 text-xs mt-1">
                Top: {topCategory[0]} ({formatCurrency(topCategory[1])})
              </p>
            )}
          </div>
          <div className="bg-purple-500/30 p-3 rounded-lg">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}