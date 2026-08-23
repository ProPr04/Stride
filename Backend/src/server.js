import 'dotenv/config'; // ← Must be first: loads .env before any other module reads process.env
import app from './app.js';
import { connectDB } from './config/db.js';
import { createUsersTable } from './models/userModel.js';
import { createProfileTables } from './models/profileModel.js';
import { createOpportunityTable } from './models/opportunityModel.js';
import { createAgreementTable } from './models/agreementModel.js';
import { createSavedTable } from './models/savedModel.js';
import { createVerificationTable } from './models/verificationModel.js';

const PORT = process.env.PORT || 5000;

// Initialize Server and Database
const startServer = async () => {
  try {
    // 1. Connect to PostgreSQL database
    await connectDB();

    // 2. Initialize database schema/tables automatically
    await createUsersTable();
    await createProfileTables();
    await createOpportunityTable();
    await createAgreementTable();
    await createSavedTable();
    await createVerificationTable();
    console.log('✅ All database tables initialized/verified.');


    // 3. Start the Express server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Auth verification enabled: ${process.env.ENABLE_AUTH !== 'false'}`);
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