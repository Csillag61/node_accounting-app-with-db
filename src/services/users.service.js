/* eslint-disable @typescript-eslint/no-unused-vars */
const { User } = require('../models/User');

async function getAll() {
  try {
    const users = await User.findAll();

    return users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
}

async function getById(id) {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
}

async function create(userName) {
  try {
    const user = await User.create({ name: userName });

    return user;
  } catch (error) {
    throw new Error('Error creating user');
  }
}

async function deleteById(id) {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    await user.destroy();

    return user;
  } catch (error) {
    throw new Error('Error deleting user');
  }
}

async function update({ id, userName }) {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    user.name = userName;
    await user.save();

    return user;
  } catch (error) {
    throw new Error('Error updating user');
  }
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
