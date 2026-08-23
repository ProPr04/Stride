import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// 1. Import Routes
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import agreementRoutes from './routes/agreementRoutes.js';
import savedRoutes from './routes/savedRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize Express app
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // allow images to be loaded cross-origin
})); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev')); 

// Serve static files from the uploads directory (Backend/uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); 

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

app.use('/api/opportunities', opportunityRoutes);

app.use('/api/agreements', agreementRoutes);

app.use('/api/saved', savedRoutes);

app.use('/api/upload', uploadRoutes);

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