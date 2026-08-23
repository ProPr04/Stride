/**
 * Utility to detect and transform cloud storage share links into direct hotlinks.
 */

/**
 * Checks if a string is a valid URL.
 * @param {string} str 
 * @returns {boolean}
 */
const isUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Resolves a shareable URL to a direct file/image URL if applicable.
 * Handles Google Drive and Google Photos.
 * 
 * @param {string} originalUrl 
 * @returns {Promise<string>} The resolved direct URL or the original URL if no transformation is needed.
 */
export const resolveToDirectUrl = async (originalUrl) => {
  if (!originalUrl || typeof originalUrl !== 'string' || !isUrl(originalUrl)) {
    return originalUrl;
  }

  const urlObj = new URL(originalUrl);
  const hostname = urlObj.hostname;

  // 1. Google Drive Link Handling
  // Formats: 
  // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // https://drive.google.com/open?id=FILE_ID
  if (hostname === 'drive.google.com' || hostname === 'docs.google.com') {
    let fileId = null;

    // Check for /file/d/FILE_ID
    const pathParts = urlObj.pathname.split('/');
    const dIndex = pathParts.indexOf('d');
    if (dIndex !== -1 && pathParts.length > dIndex + 1) {
      fileId = pathParts[dIndex + 1];
    } else {
      // Check for ?id=FILE_ID
      fileId = urlObj.searchParams.get('id');
    }

    if (fileId) {
      // Return a direct download/view link
      // 'uc' endpoint allows direct viewing/downloading for images
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }

  // 2. Google Photos Link Handling
  // Formats:
  // https://photos.app.goo.gl/SHORT_ID
  // https://photos.google.com/share/LONG_ID...
  if (hostname === 'photos.app.goo.gl' || hostname === 'photos.google.com') {
    try {
      // Fetch the page content. Native fetch will automatically follow redirects.
      const response = await fetch(originalUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to resolve Google Photos link, status: ${response.status}`);
      }

      const html = await response.text();

      // Extract the direct image URL from the Open Graph meta tag
      // <meta property="og:image" content="https://lh3.googleusercontent.com/pw/...">
      const ogImageRegex = /<meta\s+property="og:image"\s+content="([^"]+)"\s*\/?>/i;
      const match = html.match(ogImageRegex);

      if (match && match[1]) {
        return match[1]; // This is the direct lh3.googleusercontent.com image URL
      } else {
        throw new Error('Could not extract direct image URL from Google Photos page.');
      }
    } catch (error) {
      console.error('Error resolving Google Photos link:', error.message);
      // Depending on requirements, we can throw the error or return the original URL.
      // Throwing is safer so the middleware can catch it and reject the invalid input.
      throw new Error(`Invalid or private Google Photos link: ${error.message}`);
    }
  }

  // 3. Fallback for other URLs
  return originalUrl;
};
