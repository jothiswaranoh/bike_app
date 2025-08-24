````markdown
# Expense Tracker – Frontend Only (React.js)

## 🚀 Project Overview
This is a simple **Expense Tracker** built with **React.js**.  
The app lets users:

- Add an expense (title, amount, category)  
- View a list of all expenses  
- See total expenses  
- Optionally filter by category  
- Persist data in **localStorage**  

> Your task is to **complete the project by filling in the functions** provided.  
> The UI is already set up, but the logic inside functions is empty.  

---

## 🛠 Project Setup

1. Clone this repo  
2. Install dependencies:

```bash
npm install
````

3. Start the app:

```bash
npm start
```

---



## ✍ Functions to Implement

All placeholder functions are inside `src/utils/calculations.js` and components:

```js
// utils/calculations.js
export function calculateTotal(expenses) {
  // TODO: return sum of all expense amounts
}

export function filterByCategory(expenses, category) {
  // TODO: return expenses that match the category
}

// components/ExpenseForm.jsx
function addExpense(expenses, newExpense) {
  // TODO: add newExpense to the list of expenses
  // Remember to update state and localStorage
}

// components/ExpenseList.jsx
function deleteExpense(expenses, id) {
  // TODO: remove expense with given id from expenses
}
```

> 💡 Tip: Use **useState** for state management and **useEffect** to sync with `localStorage`.

---

## 🎯 UI Overview

* **ExpenseForm**: Input fields for title, amount, category + Add button
* **ExpenseList**: Shows all expenses in a table/list with Delete button
* **ExpenseSummary**: Shows total expenses at the top or bottom

> Your task: implement **all the empty functions**. The UI is already wired, so when the functions work, the app works.

---

## ✅ Submission Guidelines

1. Complete all functions
2. Push your code to GitHub
3. Share your repo link in the group

---

## 💡 Learning Goals

* React functional components (Props, State, Event Handling)
* Form handling and validation
* Rendering lists and conditional UI
* Working with `localStorage` for persistence
* Writing clean, modular functions

```
