import { Expense } from '../types';

const STORAGE_KEY = 'expense-tracker-data';

/**
 * Save expenses to localStorage
 * @param expenses - Array of expenses to save
 */
export function saveExpensesToStorage(expenses: Expense[]): void {
  // TODO: Save expenses array to localStorage
  // Input: Array of expense objects
  // Expected output: Data saved to localStorage (no return value)
  // Logic: Convert expenses to JSON string and save with localStorage.setItem()
  // Remember to handle potential errors with try/catch
  
  // Your implementation here
}

/**
 * Load expenses from localStorage
 * @returns Array of expenses from storage or empty array
 */
export function loadExpensesFromStorage(): Expense[] {
  // TODO: Load expenses from localStorage
  // Input: None (reads from localStorage)
  // Expected output: Array of expense objects, or empty array if nothing stored
  // Logic: Get data from localStorage, parse JSON, handle errors
  // Return empty array if no data exists or if parsing fails
  
  return []; // Replace this with your implementation
}