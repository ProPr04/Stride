import { resolveToDirectUrl } from '../utils/directUrlResolver.js';

/**
 * Middleware to intercept and resolve cloud storage share links (e.g., Google Drive, Google Photos)
 * or any standard image URLs (e.g., Unsplash) into direct hotlinks.
 * 
 * @param {string[]} fields - Array of fields in req.body to check for URLs (e.g., ['profilePictureUrl', 'documentUrl'])
 * @returns {import('express').RequestHandler}
 */
export const resolveDirectUrls = (fields = []) => {
  return async (req, res, next) => {
    try {
      if (!req.body || fields.length === 0) {
        return next();
      }

      // Process each specified field concurrently
      const resolvePromises = fields.map(async (field) => {
        const urlString = req.body[field];

        if (urlString && typeof urlString === 'string') {
          // resolveToDirectUrl handles Google Drive, Google Photos, 
          // and simply passes through standard URLs like Unsplash.
          const directUrl = await resolveToDirectUrl(urlString);
          req.body[field] = directUrl;
        }
      });

      await Promise.all(resolvePromises);
      next();
    } catch (error) {
      // Pass any resolution errors (e.g., private Google Photos link) to global error handler
      next(error);
    }
  };
};
