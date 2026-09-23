import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db.js';
import { initializeDatabase } from './database/init.js';
import { auth } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import analyticsRoutes from './routes/analytics.js';
import customerRoutes from './routes/customers.js';
import transactionRoutes from './routes/transactions.js';
import offeringRoutes from './routes/offerings.js';
import { collectDefaultMetrics, register } from '@prometheus-io/client';

dotenv.config();
const app = express();
collectDefaultMetrics();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', async (req,res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status:'ok', database:'connected' });
  } catch {
    res.status(500).json({ status:'error', database:'disconnected' });
  }
});

app.get('/api/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.use('/api/auth', authRoutes);
app.use('/api/analytics', auth, analyticsRoutes);
app.use('/api/customers', auth, customerRoutes);
app.use('/api/transactions', auth, transactionRoutes);
app.use('/api/offerings', auth, offeringRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const port = Number(process.env.PORT || 5000);

initializeDatabase()
  .then(() => app.listen(port, () => console.log(`InsightHub API running on http://localhost:${port}`)))
  .catch(err => {
    console.error('Database initialization failed:', err.message);
    process.exit(1);
  });
