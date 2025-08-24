import { User, LoginFormData } from '../types';

const AUTH_STORAGE_KEY = 'expense-tracker-auth';

/**
 * Validate login credentials
 * @param formData - Login form data with email and password
 * @returns Boolean indicating if credentials are valid
 */
export function validateLogin(formData: LoginFormData): boolean {
  // TODO: Implement login validation
  // Input: Object with email and password strings
  // Expected output: Boolean (true if valid, false if invalid)
  // Logic: Check if email and password meet basic requirements
  // For now, accept any email with @ symbol and password length >= 6
  
  return false; // Replace this with your implementation
}

/**
 * Perform user login
 * @param formData - Login form data
 * @returns User object if successful, null if failed
 */
export function loginUser(formData: LoginFormData): User | null {
  // TODO: Implement user login
  // Input: Object with email and password
  // Expected output: User object if successful, null if failed
  // Logic: Validate credentials, then create and return user object
  // Create user with id, email, and name (extract name from email)
  
  return null; // Replace this with your implementation
}

/**
 * Save user session to localStorage
 * @param user - User object to save
 */
export function saveUserSession(user: User): void {
  // TODO: Save user session to localStorage
  // Input: User object
  // Expected output: None (saves to localStorage)
  // Logic: Convert user object to JSON and save with localStorage.setItem()
  
  // Your implementation here
}

/**
 * Load user session from localStorage
 * @returns User object if session exists, null otherwise
 */
export function loadUserSession(): User | null {
  // TODO: Load user session from localStorage
  // Input: None (reads from localStorage)
  // Expected output: User object if session exists, null otherwise
  // Logic: Get data from localStorage, parse JSON, handle errors
  
  return null; // Replace this with your implementation
}

/**
 * Clear user session (logout)
 */
export function clearUserSession(): void {
  // TODO: Clear user session from localStorage
  // Input: None
  // Expected output: None (removes from localStorage)
  // Logic: Remove the auth data from localStorage
  
  // Your implementation here
}