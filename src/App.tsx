import React, { useState, useEffect } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import LoginForm from './components/LoginForm';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import CategoryFilter from './components/CategoryFilter';
import { Expense, User, LoginFormData } from './types';
import { addExpense, deleteExpense, filterByCategory } from './utils/calculations';
import { saveExpensesToStorage, loadExpensesFromStorage } from './utils/localStorage';
import { validateLogin, loginUser, saveUserSession, loadUserSession, clearUserSession } from './utils/auth';

/**
 * Main App component for the Expense Tracker
 * Manages all expense data and coordinates between components
 */
function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string>('');

  // Load expenses from localStorage on component mount
  useEffect(() => {
    // Check for existing user session
    const savedUser = loadUserSession();
    if (savedUser) {
      setUser(savedUser);
    }
    
    const savedExpenses = loadExpensesFromStorage();
    setExpenses(savedExpenses);
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    saveExpensesToStorage(expenses);
  }, [expenses]);

  /**
   * Handle user login
   */
  const handleLogin = (formData: LoginFormData) => {
    setLoginError('');
    
    if (!validateLogin(formData)) {
      setLoginError('Invalid email or password. Please check your credentials.');
      return;
    }
    
    const loggedInUser = loginUser(formData);
    if (loggedInUser) {
      setUser(loggedInUser);
      saveUserSession(loggedInUser);
    } else {
      setLoginError('Login failed. Please try again.');
    }
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    setUser(null);
    clearUserSession();
    setExpenses([]);
  };

  /**
   * Handle adding a new expense
   */
  const handleAddExpense = (newExpense: Expense) => {
    setExpenses(prevExpenses => addExpense(prevExpenses, newExpense));
  };

  /**
   * Handle deleting an expense
   */
  const handleDeleteExpense = (id: string) => {
    setExpenses(prevExpenses => deleteExpense(prevExpenses, id));
  };

  /**
   * Handle category filter change
   */
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter expenses based on selected category
  const filteredExpenses = filterByCategory(expenses, selectedCategory);
  
  // Sort expenses by date (newest first)
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Show login form if user is not authenticated
  if (!user) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="mr-3 text-blue-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
                <p className="text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Summary Cards */}
        <ExpenseSummary expenses={expenses} />

        {/* Add Expense Form */}
        <ExpenseForm onAddExpense={handleAddExpense} />

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          expenseCount={filteredExpenses.length}
        />

        {/* Expense List */}
        <ExpenseList 
          expenses={sortedExpenses} 
          onDeleteExpense={handleDeleteExpense} 
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;