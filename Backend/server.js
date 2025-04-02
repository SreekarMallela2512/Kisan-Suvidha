const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = require('./config/db');
db.connect();

// Routes
const apiRoutes = require('./routes/api');
const contactRoutes = require('./routes/contact');

app.use('/api', apiRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {  // Explicitly bind to all network interfaces
  console.log(`Server running on port ${PORT}`);
});