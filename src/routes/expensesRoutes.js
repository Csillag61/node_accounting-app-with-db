const express = require('express');
const Expense = require('../models/Expense.model');

const router = express.Router();

// ✅ GET all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET expense by ID
router.get('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST create a new expense
router.post('/expenses', async (req, res) => {
  try {
    const { title, amount, spentAt, category, note } = req.body;

    if (!title || !amount || !spentAt || !category) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const expense = await Expense.create({
      title,
      amount,
      spentAt,
      category,
      note,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PATCH update an expense (partial update)
router.patch('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    Object.keys(req.body).forEach((key) => {
      if (expense[key] !== undefined) {
        expense[key] = req.body[key];
      }
    });

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE expense by ID
router.delete('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
