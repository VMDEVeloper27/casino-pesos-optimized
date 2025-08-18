const puppeteer = require('puppeteer');

async function testPerformance() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Enable performance tracking
  await page.evaluateOnNewDocument(() => {
    window.performanceMetrics = [];
  });

  console.log('Testing page load performance for http://localhost:3002...\n');
  
  // Navigate and measure
  const startTime = Date.now();
  
  try {
    // Go to the page
    await page.goto('http://localhost:3002', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    const loadTime = Date.now() - startTime;
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      const paintData = performance.getEntriesByType('paint');
      
      return {
        // Navigation Timing
        domContentLoaded: perfData?.domContentLoadedEventEnd - perfData?.domContentLoadedEventStart,
        loadComplete: perfData?.loadEventEnd - perfData?.loadEventStart,
        domInteractive: perfData?.domInteractive,
        
        // Paint Timing
        firstPaint: paintData.find(p => p.name === 'first-paint')?.startTime,
        firstContentfulPaint: paintData.find(p => p.name === 'first-contentful-paint')?.startTime,
        
        // Resource Timing
        resources: performance.getEntriesByType('resource').length,
        totalResourceSize: performance.getEntriesByType('resource')
          .reduce((acc, r) => acc + (r.transferSize || 0), 0),
          
        // Memory (if available)
        memory: performance.memory ? {
          usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
          totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB'
        } : null
      };
    });
    
    // Get page metrics
    const pageMetrics = await page.metrics();
    
    console.log('=== PERFORMANCE METRICS ===\n');
    console.log(`Page Load Time: ${loadTime}ms`);
    console.log(`DOM Content Loaded: ${metrics.domContentLoaded?.toFixed(2)}ms`);
    console.log(`Load Event: ${metrics.loadComplete?.toFixed(2)}ms`);
    console.log(`DOM Interactive: ${metrics.domInteractive?.toFixed(2)}ms`);
    console.log(`\n=== PAINT METRICS ===\n`);
    console.log(`First Paint: ${metrics.firstPaint?.toFixed(2)}ms`);
    console.log(`First Contentful Paint: ${metrics.firstContentfulPaint?.toFixed(2)}ms`);
    console.log(`\n=== RESOURCE METRICS ===\n`);
    console.log(`Total Resources: ${metrics.resources}`);
    console.log(`Total Resource Size: ${(metrics.totalResourceSize / 1024).toFixed(2)} KB`);
    
    if (metrics.memory) {
      console.log(`\n=== MEMORY USAGE ===\n`);
      console.log(`JS Heap Used: ${metrics.memory.usedJSHeapSize}`);
      console.log(`JS Heap Total: ${metrics.memory.totalJSHeapSize}`);
    }
    
    console.log(`\n=== PAGE METRICS ===\n`);
    console.log(`Documents: ${pageMetrics.Documents}`);
    console.log(`Frames: ${pageMetrics.Frames}`);
    console.log(`JS Event Listeners: ${pageMetrics.JSEventListeners}`);
    console.log(`Nodes: ${pageMetrics.Nodes}`);
    console.log(`Layout Count: ${pageMetrics.LayoutCount}`);
    console.log(`Style Recalc Count: ${pageMetrics.RecalcStyleCount}`);
    
    // Performance recommendations
    console.log(`\n=== PERFORMANCE ANALYSIS ===\n`);
    
    if (metrics.firstContentfulPaint > 2500) {
      console.log('⚠️  First Contentful Paint is slow (>2.5s). Consider:');
      console.log('   - Optimizing server response time');
      console.log('   - Reducing JavaScript bundle size');
      console.log('   - Implementing code splitting');
    } else if (metrics.firstContentfulPaint > 1800) {
      console.log('⚡ First Contentful Paint is moderate (1.8-2.5s)');
    } else {
      console.log('✅ First Contentful Paint is fast (<1.8s)');
    }
    
    if (metrics.resources > 100) {
      console.log('⚠️  Too many resources loaded. Consider:');
      console.log('   - Lazy loading images');
      console.log('   - Bundling CSS/JS files');
      console.log('   - Using a CDN');
    }
    
    if (metrics.totalResourceSize > 2000000) {
      console.log('⚠️  Page size is large (>2MB). Consider:');
      console.log('   - Compressing images');
      console.log('   - Minifying CSS/JS');
      console.log('   - Removing unused code');
    }
    
  } catch (error) {
    console.error('Error testing performance:', error.message);
  } finally {
    await browser.close();
  }
}

testPerformance().catch(console.error);