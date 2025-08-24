import React from 'react';
import { Filter } from 'lucide-react';
import { EXPENSE_CATEGORIES } from '../types';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  expenseCount: number;
}

/**
 * Component for filtering expenses by category
 * Provides dropdown to select category filter
 */
export default function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange, 
  expenseCount 
}: CategoryFilterProps) {
  const allCategories = ['All', ...EXPENSE_CATEGORIES];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Filter className="mr-2 text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Filter by Category</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Showing {expenseCount} expense{expenseCount !== 1 ? 's' : ''}
          </span>
          
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white min-w-[150px]"
          >
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}