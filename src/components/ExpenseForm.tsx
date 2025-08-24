import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Expense, ExpenseFormData, EXPENSE_CATEGORIES } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

/**
 * Form component for adding new expenses
 * Handles form validation and submission
 */
export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    title: '',
    amount: '',
    category: 'Food'
  });
  
  const [errors, setErrors] = useState<Partial<ExpenseFormData>>({});

  /**
   * Validate form data and return validation errors
   */
  const validateForm = (): Partial<ExpenseFormData> => {
    const newErrors: Partial<ExpenseFormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    return newErrors;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create new expense object
    const newExpense: Expense = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: new Date().toISOString()
    };

    onAddExpense(newExpense);
    
    // Reset form
    setFormData({ title: '', amount: '', category: 'Food' });
    setErrors({});
  };

  /**
   * Handle input changes and clear related errors
   */
  const handleInputChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Plus className="mr-2 text-blue-600" size={24} />
        Add New Expense
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expense Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g., Lunch at restaurant"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              errors.title 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            placeholder="0.00"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              errors.amount 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white"
          >
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}