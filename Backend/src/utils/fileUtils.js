import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uploads directory: Backend/uploads
const uploadDir = path.join(__dirname, '../../uploads');

/**
 * Safely deletes a file from the uploads directory if it is a local upload.
 * 
 * @param {string} fileUrlOrPath - The file URL or filename (e.g. 'http://localhost:5000/uploads/image-123.jpeg' or '/uploads/image-123.jpeg')
 * @returns {Promise<boolean>} True if the file was deleted, false otherwise.
 */
export const deleteUploadedFile = async (fileUrlOrPath) => {
  if (!fileUrlOrPath || typeof fileUrlOrPath !== 'string') {
    return false;
  }

  // Only attempt deletion if it references the local /uploads/ directory
  if (!fileUrlOrPath.includes('/uploads/')) {
    return false;
  }

  try {
    // Extract filename from URL (stripping any query parameters)
    const cleanUrl = fileUrlOrPath.split('?')[0].split('#')[0];
    const filename = path.basename(cleanUrl);

    if (!filename || filename === '.' || filename === '..') {
      return false;
    }

    const filePath = path.join(uploadDir, filename);

    // Security check: ensure resolved path is inside the upload directory
    if (!filePath.startsWith(uploadDir)) {
      console.warn(`[Security] Attempted path traversal for file deletion: ${fileUrlOrPath}`);
      return false;
    }

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log(`[Storage] Deleted orphaned uploaded file: ${filename}`);
      return true;
    }
  } catch (error) {
    console.error(`[Storage] Error deleting file ${fileUrlOrPath}:`, error.message);
  }

  return false;
};
