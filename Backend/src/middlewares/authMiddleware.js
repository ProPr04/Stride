import { verifyToken } from '../utils/tokenUtils.js';

/**
 * Middleware to protect routes by ensuring a valid JWT is present.
 */
export const protect = (req, res, next) => {
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
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired token. Please log in again.',
    });
  }
};

/**
 * Middleware to restrict access based on user roles.
 * @param {...string} roles - The roles allowed to access the route (e.g., 'athlete', 'academy').
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
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