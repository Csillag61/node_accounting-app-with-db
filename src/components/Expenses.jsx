import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';

const API_URL = 'http://localhost:5001/expenses';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setExpenses(res.data));
  }, []);

  const handleExpenseCreated = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <div>
      <h2>Expenses</h2>
      <ExpenseForm onExpenseCreated={handleExpenseCreated} />
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
