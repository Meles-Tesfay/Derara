const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const operationRoutes = require('./routes/operationRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for local testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Body parser

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// app.use(helmet()); // Security headers (Commented out for local debug)

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ops', operationRoutes);

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is reachable!' });
});

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 404 Handler (JSON)
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found on this server` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
