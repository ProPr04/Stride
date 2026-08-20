import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// 1. Import Routes
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

// Initialize Express app
const app = express();

// Global Middleware
app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev')); 

// Base Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Sports Career Platform Backend is running smoothly.' 
  });
});

// 2. Mount Routes
app.use('/api/auth', authRoutes);

app.use('/api/profiles', profileRoutes);
// --- Future Routes (Leave commented out for now) ---

// import opportunityRoutes from './routes/opportunityRoutes.js';
// app.use('/api/opportunities', opportunityRoutes);


// 3. Unhandled Route 404 Catcher (Updated Fix)
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server.`
  });
});

// 4. Global Error Handling Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
});

export default app;