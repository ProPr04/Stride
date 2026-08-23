import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { deleteUploadedFile } from '../utils/fileUtils.js';

const router = express.Router();

/**
 * @route   POST /api/upload/image
 * @desc    Upload an image file
 * @access  Public (or Private)
 */
router.post('/image', upload.single('image'), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No image file uploaded.'
      });
    }

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

/**
 * @route   DELETE /api/upload/image
 * @desc    Delete an uploaded image file from the server
 * @access  Public (or Private)
 */
router.delete('/image', async (req, res, next) => {
  try {
    const url = req.body?.url || req.query?.url;
    if (!url) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide the file url to delete.'
      });
    }

    const deleted = await deleteUploadedFile(url);

    res.status(200).json({
      status: 'success',
      message: deleted ? 'File deleted successfully from disk.' : 'File not found or already removed.'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
