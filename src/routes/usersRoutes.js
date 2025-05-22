const express = require('express');
const User = require('../models/User.model');

const router = express.Router();

// ✅ GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST create a new user
router.post('/users', async (req, res) => {
  try {
    const { name: userName } = req.body;

    if (!userName) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = await User.create({ name: userName });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PATCH update user (partial update)
router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name;
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
