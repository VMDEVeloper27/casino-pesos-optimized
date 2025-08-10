const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const https = require('https');
const http = require('http');

// Casino logos from various sources (these are publicly available logos)
const casinoLogos = {
  'caliente': 'https://seeklogo.com/images/C/caliente-casino-logo-5B5E9C9E7E-seeklogo.com.png',
  'winpot': 'https://winpot.mx/images/logo.png',
  'betano': 'https://seeklogo.com/images/B/betano-logo-9EE2B91BB2-seeklogo.com.png',
  '1xbet': 'https://seeklogo.com/images/1/1xbet-logo-0809CA7294-seeklogo.com.png',
  'parimatch': 'https://seeklogo.com/images/P/parimatch-logo-80A60CBCE5-seeklogo.com.png',
  'novibet': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Novibet_Logo.png/640px-Novibet_Logo.png',
  'megapari': 'https://megapari.com/img/logo.png',
  'leon': 'https://leon.bet/design/leonbets/img/leon-logo.svg',
  'melbet': 'https://melbet.com/img/logo_head.svg',
  'vulkanbet': 'https://vulkanbet.com/images/logo.svg',
  'pin-up': 'https://pin-up.casino/img/logo-red.svg'
};

// Create output directory
const outputDir = path.join(process.cwd(), 'public', 'uploads', 'casino-logos');

// Function to download image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        return downloadImage(response.headers.location).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

// Function to convert image to WebP
async function convertToWebP(inputBuffer, outputPath, casinoName) {
  try {
    // Determine if it's SVG
    const isSvg = outputPath.includes('.svg') || inputBuffer.toString().includes('<svg');
    
    if (isSvg) {
      // For SVG, we'll save as-is since it's already optimized
      const svgPath = outputPath.replace('.webp', '.svg');
      await fs.writeFile(svgPath, inputBuffer);
      console.log(`✓ Saved SVG for ${casinoName}: ${path.basename(svgPath)}`);
      return svgPath;
    }
    
    // Convert to WebP with optimization
    await sharp(inputBuffer)
      .resize(300, 150, {
        fit: 'contain',
        background: { r: 0, g: 0, h: 0, alpha: 0 }
      })
      .webp({ quality: 90 })
      .toFile(outputPath);
    
    console.log(`✓ Converted to WebP: ${casinoName} -> ${path.basename(outputPath)}`);
    return outputPath;
  } catch (error) {
    console.error(`✗ Error converting ${casinoName}:`, error.message);
    throw error;
  }
}

// Main function
async function downloadAndConvertLogos() {
  console.log('Starting casino logo download and conversion...\n');
  
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  const results = [];
  
  for (const [casinoId, logoUrl] of Object.entries(casinoLogos)) {
    console.log(`Processing ${casinoId}...`);
    
    try {
      // Download the image
      console.log(`  Downloading from: ${logoUrl}`);
      const imageBuffer = await downloadImage(logoUrl);
      
      // Determine file extension
      const ext = logoUrl.endsWith('.svg') ? '.svg' : '.webp';
      const outputPath = path.join(outputDir, `${casinoId}-logo${ext}`);
      
      // Convert and save
      const savedPath = await convertToWebP(imageBuffer, outputPath, casinoId);
      
      results.push({
        casino: casinoId,
        originalUrl: logoUrl,
        savedPath: savedPath.replace(process.cwd() + '/public', ''),
        success: true
      });
      
    } catch (error) {
      console.error(`  ✗ Failed to process ${casinoId}:`, error.message);
      results.push({
        casino: casinoId,
        originalUrl: logoUrl,
        error: error.message,
        success: false
      });
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Summary
  console.log('\n=== Summary ===');
  console.log(`Total: ${results.length} casinos`);
  console.log(`Success: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);
  
  // Save results to JSON for reference
  const resultsPath = path.join(outputDir, 'download-results.json');
  await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${resultsPath}`);
  
  return results;
}

// Run the script
if (require.main === module) {
  downloadAndConvertLogos()
    .then(() => {
      console.log('\n✅ Logo download and conversion complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { downloadAndConvertLogos };