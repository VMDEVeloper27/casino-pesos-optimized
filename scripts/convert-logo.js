const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertSvgToWebp() {
  const inputPath = path.join(__dirname, '..', 'public', 'uploads', 'Bet365-Logo.wine-1754816771324.svg');
  const outputPath = path.join(__dirname, '..', 'public', 'uploads', 'bet365-logo.webp');
  
  try {
    await sharp(inputPath)
      .resize(200, 120, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log('✅ Successfully converted SVG to WebP:', outputPath);
    console.log('📁 Public path: /uploads/bet365-logo.webp');
  } catch (error) {
    console.error('❌ Error converting image:', error);
  }
}

convertSvgToWebp();