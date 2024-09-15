import listingRouter from './routes/listing.route.js';
import userRouter from './routes/user.route.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // In-built body parser in Express
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  bufferCommands: false, // Disable buffering
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// API Routes
app.use('/api/listing', listingRouter);
app.use('/api/user', userRouter);

// Catch-all route for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Error handling middleware (Ensure this is after your routes)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
