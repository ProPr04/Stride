import pkg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Destructure Pool from the pg package (required when using ES6 imports with the pg library)
const { Pool } = pkg;

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Global error handler for idle clients in the pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle database client:', err.message);
  process.exit(-1);
});

/**
 * Utility function to test the database connection on server startup.
 * Can be called in server.js to verify connectivity before accepting requests.
 */
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log(`📦 Successfully connected to PostgreSQL database: ${process.env.DB_NAME}`);
    client.release();
  } catch (err) {
    console.error('Database connection error:', err.message);
    console.error('Please verify your database credentials in the .env file.');
    process.exit(1);
  }
};

export default pool;