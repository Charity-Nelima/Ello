import cover1 from './assets/image1.webp';
import cover2 from './assets/image2.webp';
import cover3 from './assets/image3.webp';
import cover4 from './assets/image4.webp';
import cover5 from './assets/image5.webp';
import cover6 from './assets/image6.webp';
import cover7 from './assets/image7.webp';
import cover8 from './assets/image8.webp';
import cover9 from './assets/image9.webp';
import cover10 from './assets/image10.webp';

const coverPhotosData = {
  '1': cover1,
  '2': cover2,
  '3': cover3,
  '4': cover4,
  '5': cover5,
  '6': cover6,
  '7': cover7,
  '8': cover8,
  '9': cover9,
  '10': cover10,
  // Add more cover photo data...
};

/**
 * Function to generate a URL for a cover photo based on book ID.
 * @param {string} bookId The ID of the book.
 * @returns {string|null} The URL of the cover photo for the book, or null if not found.
 */
export function getCoverPhotoURL(bookId) {
  const photoURL = coverPhotosData[bookId];
  if (!photoURL) {
    return null; // No cover photo found for the given bookId
  }
  return photoURL;
}
