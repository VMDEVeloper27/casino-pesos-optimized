const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SVG content with casino chip design
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <!-- Casino Chip Background -->
  <defs>
    <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Outer Ring -->
  <circle cx="16" cy="16" r="15" fill="white" stroke="#86efac" stroke-width="1"/>
  
  <!-- Main Chip Circle -->
  <circle cx="16" cy="16" r="14" fill="url(#chipGradient)"/>
  
  <!-- Inner Dotted Pattern -->
  <circle cx="16" cy="16" r="12" fill="none" stroke="#34d399" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/>
  
  <!-- Center White Circle for Letter -->
  <circle cx="16" cy="16" r="9" fill="rgba(255,255,255,0.1)"/>
  
  <!-- Letter C -->
  <text x="16" y="16" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">C</text>
</svg>`;

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

async function generateFavicons() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  for (const { name, size } of sizes) {
    try {
      await sharp(Buffer.from(svgContent))
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      console.log(`✓ Generated ${name}`);
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }
  
  // Also generate ICO file (32x32)
  try {
    await sharp(Buffer.from(svgContent))
      .resize(32, 32)
      .toFormat('png')
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✓ Generated favicon.ico');
  } catch (error) {
    console.error('✗ Failed to generate favicon.ico:', error.message);
  }
}

generateFavicons().then(() => {
  console.log('Favicon generation complete!');
}).catch(console.error);