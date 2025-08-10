const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const logosDir = path.join(process.cwd(), 'public', 'uploads', 'casino-logos');

async function convertToWebP() {
  console.log('Converting logos to WebP format...\n');
  
  try {
    // Read all files in the directory
    const files = await fs.readdir(logosDir);
    
    // Filter for image files (ico, png, jpg, etc.)
    const imageFiles = files.filter(file => 
      /\.(ico|png|jpg|jpeg|gif)$/i.test(file) && !file.includes('.webp')
    );
    
    console.log(`Found ${imageFiles.length} images to convert`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(logosDir, file);
      const baseName = path.basename(file, path.extname(file));
      const outputPath = path.join(logosDir, `${baseName}.webp`);
      
      try {
        console.log(`Converting ${file}...`);
        
        // Read the input file
        const inputBuffer = await fs.readFile(inputPath);
        
        // Convert to WebP
        await sharp(inputBuffer)
          .resize(200, 100, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .webp({ 
            quality: 90,
            effort: 6
          })
          .toFile(outputPath);
        
        console.log(`  ✓ Converted to ${baseName}.webp`);
        
        // Delete original file after successful conversion
        await fs.unlink(inputPath);
        console.log(`  ✓ Removed original ${file}`);
        
      } catch (error) {
        console.error(`  ✗ Failed to convert ${file}:`, error.message);
        
        // If ICO file fails, try a different approach
        if (file.endsWith('.ico')) {
          try {
            console.log(`  Retrying ${file} with PNG conversion first...`);
            
            // First convert ICO to PNG, then to WebP
            const pngBuffer = await sharp(inputPath)
              .png()
              .toBuffer();
            
            await sharp(pngBuffer)
              .resize(200, 100, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
              })
              .webp({ 
                quality: 90,
                effort: 6
              })
              .toFile(outputPath);
            
            console.log(`  ✓ Successfully converted ${file} to WebP`);
            await fs.unlink(inputPath);
            
          } catch (retryError) {
            console.error(`  ✗ Retry also failed for ${file}:`, retryError.message);
          }
        }
      }
    }
    
    // List all WebP files
    console.log('\n=== WebP Files Created ===');
    const webpFiles = await fs.readdir(logosDir);
    const webpOnly = webpFiles.filter(file => file.endsWith('.webp'));
    
    for (const file of webpOnly) {
      const stats = await fs.stat(path.join(logosDir, file));
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`  ${file} (${sizeKB} KB)`);
    }
    
    console.log(`\nTotal WebP files: ${webpOnly.length}`);
    
    // Update the casinos data
    return webpOnly.map(file => {
      const casinoId = file.replace('-logo.webp', '');
      return {
        id: casinoId,
        logoPath: `/uploads/casino-logos/${file}`
      };
    });
    
  } catch (error) {
    console.error('Error during conversion:', error);
    throw error;
  }
}

// Run the conversion
if (require.main === module) {
  convertToWebP()
    .then((results) => {
      console.log('\n✅ Conversion complete!');
      console.log('\nLogo paths for casinos.json update:');
      results.forEach(r => {
        console.log(`  "${r.id}": "${r.logoPath}"`);
      });
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Conversion failed:', error);
      process.exit(1);
    });
}

module.exports = { convertToWebP };