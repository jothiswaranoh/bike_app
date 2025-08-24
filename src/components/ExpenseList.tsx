import React from 'react';
import { Trash2, Calendar, Tag } from 'lucide-react';
import { Expense } from '../types';
import { formatCurrency, formatDate } from '../utils/calculations';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

/**
 * Component to display a list of expenses
 * Shows each expense with delete functionality
 */
export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  /**
   * Get color for expense category
   */
  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      Food: 'bg-orange-100 text-orange-800 border-orange-200',
      Transport: 'bg-blue-100 text-blue-800 border-blue-200',
      Shopping: 'bg-purple-100 text-purple-800 border-purple-200',
      Entertainment: 'bg-pink-100 text-pink-800 border-pink-200',
      Bills: 'bg-red-100 text-red-800 border-red-200',
      Healthcare: 'bg-green-100 text-green-800 border-green-200',
      Education: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      Other: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category] || colors.Other;
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
        <div className="text-gray-400 mb-4">
          <Tag size={48} className="mx-auto mb-4" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No expenses yet</h3>
        <p className="text-gray-500">Add your first expense using the form above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Tag className="mr-2 text-blue-600" size={24} />
          Recent Expenses
        </h2>
        <p className="text-gray-600 mt-1">{expenses.length} expense{expenses.length !== 1 ? 's' : ''} total</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {expense.title}
                  </h3>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Tag size={14} className="mr-1" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(expense.category)}`}>
                      {expense.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(expense.date)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Delete expense"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}