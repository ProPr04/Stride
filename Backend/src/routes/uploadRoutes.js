import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/upload/image
 * @desc    Upload an image file
 * @access  Public (or could be Private, but keeping it simple for now)
 */
router.post('/image', upload.single('image'), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No image file uploaded.'
      });
    }

    // Construct the accessible URL based on the static path setup in app.js
    // Assuming backend is serving on same host/port or via proxy. 
    // We just return the relative path that the frontend can append to its backend URL.
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({
      status: 'success',
      data: {
        url: fileUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
