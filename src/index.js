/* eslint-disable no-console */

'use strict';

const express = require('express');
const { sequelize } = require('./db');

const expensesRoutes = require('./routes/expensesRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();

app.use(express.json());

// Attach routes AFTER initializing `app`
app.use(usersRoutes);
app.use(categoryRoutes);
app.use(expensesRoutes);

sequelize.sync().then(() => {
  console.log('✅ Connected to PostgreSQL Database synced');
});

app.listen(5001, () => {
  console.log('🚀 Server running on port 5001');
});
