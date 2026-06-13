const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // 1. Add this built-in Node module

// Import your routes
const authRoutes = require('./routes/authRoutes');
const surplusRoutes = require('./routes/surplusRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI not defined in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    console.error('Make sure MongoDB is running at:', process.env.MONGO_URI);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/surplus', surplusRoutes);

// 2. Serve the Frontend Files
// Ensure the static directory references the client folder at the workspace root
// __dirname is "server", so go up one level to reach the top-level client directory
app.use(express.static(path.join(__dirname, '..', 'client')));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`\nFrontend is live at http://localhost:${PORT}`);
});