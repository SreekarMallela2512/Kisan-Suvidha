const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-production-domain.com'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Database connection
const db = require('./config/db');
db.connect();

// Routes
const apiRoutes = require('./routes/api');
const contactRoutes = require('./routes/contact');

app.use('/api', apiRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// Fallback to frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});