import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export interface ConversionOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Convert an image to WebP format
 * @param inputPath - Path to the input image
 * @param outputPath - Path where the WebP image will be saved
 * @param options - Conversion options
 * @returns Path to the converted WebP image
 */
export async function convertToWebP(
  inputPath: string,
  outputPath?: string,
  options: ConversionOptions = {}
): Promise<string> {
  const {
    width = 200, // Default width for casino logos
    height = 120, // Default height for casino logos
    quality = 85,
    fit = 'contain'
  } = options;

  // Generate output path if not provided
  if (!outputPath) {
    const dir = path.dirname(inputPath);
    const basename = path.basename(inputPath, path.extname(inputPath));
    outputPath = path.join(dir, `${basename}.webp`);
  }

  try {
    await sharp(inputPath)
      .resize(width, height, {
        fit,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .webp({ quality })
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error('Error converting image to WebP:', error);
    throw new Error(`Failed to convert image: ${error}`);
  }
}

/**
 * Convert an uploaded file buffer to WebP
 * @param buffer - File buffer
 * @param filename - Original filename (used to generate output name)
 * @param uploadDir - Directory to save the file
 * @param options - Conversion options
 * @returns URL path to the converted WebP image
 */
export async function convertUploadToWebP(
  buffer: Buffer,
  filename: string,
  uploadDir: string = path.join(process.cwd(), 'public', 'uploads'),
  options: ConversionOptions = {}
): Promise<string> {
  const {
    width = 200,
    height = 120,
    quality = 85,
    fit = 'contain'
  } = options;

  // Generate unique filename
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const basename = path.basename(filename, path.extname(filename));
  const webpFilename = `${basename}-${timestamp}-${random}.webp`;
  const outputPath = path.join(uploadDir, webpFilename);

  try {
    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Convert and save
    await sharp(buffer)
      .resize(width, height, {
        fit,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality })
      .toFile(outputPath);

    // Return the public URL path
    return `/uploads/${webpFilename}`;
  } catch (error) {
    console.error('Error converting upload to WebP:', error);
    throw new Error(`Failed to convert upload: ${error}`);
  }
}

/**
 * Delete an image file
 * @param imagePath - Path to the image (can be relative to public folder)
 */
export async function deleteImage(imagePath: string): Promise<void> {
  try {
    // If it's a URL path, convert to filesystem path
    if (imagePath.startsWith('/')) {
      imagePath = path.join(process.cwd(), 'public', imagePath);
    }

    await fs.unlink(imagePath);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error if file doesn't exist
    if ((error as any).code !== 'ENOENT') {
      throw error;
    }
  }
}

/**
 * Get image metadata
 * @param imagePath - Path to the image
 */
export async function getImageMetadata(imagePath: string) {
  try {
    const metadata = await sharp(imagePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: metadata.size
    };
  } catch (error) {
    console.error('Error getting image metadata:', error);
    throw new Error(`Failed to get image metadata: ${error}`);
  }
}