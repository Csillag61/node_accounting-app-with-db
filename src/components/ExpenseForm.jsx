import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'http://localhost:5001/expenses';

export default function ExpenseForm({ onExpenseCreated }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [spentAt, setSpentAt] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !spentAt || !category) {
      return;
    }

    try {
      const res = await axios.post(API_URL, {
        title,
        amount,
        spentAt,
        category,
        note,
        userId: userId ? parseInt(userId) : undefined,
      });

      onExpenseCreated(res.data);
      setTitle('');
      setAmount('');
      setSpentAt('');
      setCategory('');
      setNote('');
      setUserId('');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating expense:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={spentAt}
        onChange={(e) => setSpentAt(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        type="number"
        placeholder="User ID (optional)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button type="submit">Create Expense</button>
    </form>
  );
}

ExpenseForm.propTypes = {
  onExpenseCreated: PropTypes.func.isRequired,
};
