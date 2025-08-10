// Debug script to check if styles are loading
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Check for Tailwind classes
    const tailwindClasses = [
      'bg-neutral-900',
      'text-white',
      'bg-gradient-to-r',
      'from-primary',
      'to-accent',
      'rounded-lg',
      'px-4',
      'py-16'
    ];

    console.log('Checking for Tailwind classes in HTML:');
    console.log('=====================================');
    
    tailwindClasses.forEach(className => {
      const found = data.includes(className);
      console.log(`${found ? '✅' : '❌'} ${className}: ${found ? 'Found' : 'Not found'}`);
    });

    // Check for CSS link tags
    const cssLinks = data.match(/<link[^>]*stylesheet[^>]*>/g) || [];
    console.log('\nCSS Files Loaded:');
    console.log('=================');
    cssLinks.forEach(link => {
      const href = link.match(/href="([^"]*)"/);
      if (href) {
        console.log(`✅ ${href[1]}`);
      }
    });

    // Check for inline styles
    const hasInlineStyles = data.includes('<style');
    console.log(`\nInline Styles: ${hasInlineStyles ? '✅ Found' : '❌ Not found'}`);

    // Check for specific color values
    console.log('\nColor Values:');
    console.log('=============');
    const colors = {
      '#FFD700': 'Gold (Primary)',
      '#10B981': 'Green (Accent)',
      '#171717': 'Dark Background',
      'bg-primary': 'Primary class',
      'bg-accent': 'Accent class'
    };

    Object.entries(colors).forEach(([color, name]) => {
      const found = data.includes(color);
      console.log(`${found ? '✅' : '❌'} ${name} (${color}): ${found ? 'Found' : 'Not found'}`);
    });
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();