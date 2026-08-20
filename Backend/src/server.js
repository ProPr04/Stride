// Exact file path: src/server.js
import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Server and Database
const startServer = async () => {
  try {
    // 1. Connect to PostgreSQL database
    await connectDB();

    // 2. Start the Express server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // 3. Handle unhandled promise rejections globally
    process.on('unhandledRejection', (err) => {
      console.error(`Unhandled Rejection Error: ${err.message}`);
      // Close server & exit process cleanly
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();