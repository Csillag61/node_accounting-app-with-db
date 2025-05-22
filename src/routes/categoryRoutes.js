const express = require('express');
const Category = require('../models/Category.model');

const router = express.Router();

// GET all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new category
router.post('/categories', async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE category
router.delete('/categories/:id', async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
