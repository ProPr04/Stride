import { verifyToken } from '../utils/tokenUtils.js';

/**
 * Middleware to protect routes by ensuring a valid JWT is present.
 * Can be temporarily bypassed in development by setting ENABLE_AUTH=false in .env.
 */
export const protect = (req, res, next) => {
  // Check if authentication is disabled via environment variable (e.g. ENABLE_AUTH=false)
  if (process.env.ENABLE_AUTH === 'false' || process.env.DISABLE_AUTH === 'true') {
    // If a valid token is sent, decode it
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        req.user = verifyToken(token);
        return next();
      } catch (e) {
        // Fall back to dev mock user
      }
    }

    // Default development mock user
    const mockRole = req.headers['x-mock-role'] || 'academy';
    const mockId = parseInt(req.headers['x-mock-user-id'] || '1', 10);
    req.user = { id: mockId, role: mockRole };
    return next();
  }

  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in. Please log in to get access.',
    });
  }

  try {
    // Verify the token
    const decoded = verifyToken(token);

    // Attach the decoded user payload (id, role) to the request object
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'fail',
        message: 'Your session has expired. Please log in again.',
      });
    }
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid authorization token. Please log in again.',
    });
  }
};


/**
 * Middleware to restrict access based on user roles.
 * Can be temporarily bypassed in development by setting ENABLE_AUTH=false in .env.
 * @param {...string} roles - The roles allowed to access the route (e.g., 'athlete', 'academy').
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Bypass authorization check if auth is disabled in development
    if (process.env.ENABLE_AUTH === 'false' || process.env.DISABLE_AUTH === 'true') {
      return next();
    }

    // Ensure the protect middleware has already run
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        status: 'fail',
        message: 'Role authorization failed. User identity not found.',
      });
    }

    // Check if the user's role is in the list of allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action.',
      });
    }

    next();
  };
};