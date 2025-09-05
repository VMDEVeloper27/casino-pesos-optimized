import Script from 'next/script';

interface GoogleMobileOptimizationProps {
  locale?: string;
  pageType?: 'home' | 'casino' | 'game' | 'bonus' | 'guide' | 'other';
}

export function GoogleMobileOptimization({ 
  locale = 'es',
  pageType = 'other' 
}: GoogleMobileOptimizationProps) {
  
  // Structured data for mobile optimization
  const getMobileStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "CasinosPesos",
      "url": "https://www.casinospesos.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `https://www.casinospesos.com/${locale}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "CasinosPesos",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.casinospesos.com/logo.png",
          "width": 600,
          "height": 60
        }
      }
    };

    // Add mobile-specific data
    const mobileData = {
      ...baseData,
      "mobileWebsite": {
        "@type": "MobileApplication",
        "name": "CasinosPesos Mobile",
        "operatingSystem": "Any",
        "applicationCategory": "GameApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    };

    return mobileData;
  };

  // Page-specific breadcrumbs for mobile navigation
  const getBreadcrumbData = () => {
    const items = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'es' ? "Inicio" : "Home",
        "item": `https://www.casinospesos.com/${locale}`
      }
    ];

    switch(pageType) {
      case 'casino':
        items.push({
          "@type": "ListItem",
          "position": 2,
          "name": locale === 'es' ? "Casinos" : "Casinos",
          "item": `https://www.casinospesos.com/${locale}/casinos`
        });
        break;
      case 'game':
        items.push({
          "@type": "ListItem",
          "position": 2,
          "name": locale === 'es' ? "Juegos" : "Games",
          "item": `https://www.casinospesos.com/${locale}/juegos`
        });
        break;
      case 'bonus':
        items.push({
          "@type": "ListItem",
          "position": 2,
          "name": locale === 'es' ? "Bonos" : "Bonuses",
          "item": `https://www.casinospesos.com/${locale}/bonos`
        });
        break;
      case 'guide':
        items.push({
          "@type": "ListItem",
          "position": 2,
          "name": locale === 'es' ? "Guías" : "Guides",
          "item": `https://www.casinospesos.com/${locale}/guias`
        });
        break;
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };
  };

  return (
    <>
      {/* Mobile Web App Capable */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="CasinosPesos" />
      
      {/* Format Detection */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
      
      {/* Android Chrome */}
      <meta name="theme-color" content="#059669" />
      <meta name="application-name" content="CasinosPesos" />
      
      {/* Windows Phone */}
      <meta name="msapplication-TileColor" content="#059669" />
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* UC Mobile Browser */}
      <meta name="screen-orientation" content="portrait" />
      <meta name="x5-orientation" content="portrait" />
      <meta name="full-screen" content="yes" />
      <meta name="x5-fullscreen" content="true" />
      <meta name="browsermode" content="application" />
      <meta name="x5-page-mode" content="app" />
      
      {/* Disable night mode */}
      <meta name="nightmode" content="disable" />
      <meta name="color-scheme" content="light dark" />
      
      {/* Layout mode */}
      <meta name="layoutmode" content="fitscreen" />
      <meta name="imagemode" content="force" />
      
      {/* QQ Mobile Browser */}
      <meta name="x5-orientation" content="portrait" />
      <meta name="x5-fullscreen" content="true" />
      <meta name="x5-page-mode" content="app" />
      
      {/* Structured Data for Mobile */}
      <Script
        id="mobile-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getMobileStructuredData())
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbData())
        }}
      />
      
      {/* Mobile-specific performance hints */}
      <Script
        id="mobile-performance"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Detect if mobile
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
              document.documentElement.classList.add('touch-device');
              
              // Disable hover effects on touch devices
              try {
                for (const sheet of document.styleSheets) {
                  if (!sheet.href || sheet.href.startsWith(window.location.origin)) {
                    for (const rule of sheet.cssRules) {
                      if (rule.selectorText && rule.selectorText.includes(':hover')) {
                        rule.style.cssText = rule.style.cssText.replace(/hover:[^;]+;?/g, '');
                      }
                    }
                  }
                }
              } catch (e) {}
              
              // Add fastclick behavior
              document.addEventListener('touchstart', function() {}, {passive: true});
              
              // Prevent double-tap zoom
              let lastTouchEnd = 0;
              document.addEventListener('touchend', function(event) {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                  event.preventDefault();
                }
                lastTouchEnd = now;
              }, false);
              
              // Smooth scrolling for internal links
              document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                  e.preventDefault();
                  const target = document.querySelector(this.getAttribute('href'));
                  if (target) {
                    target.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                });
              });
            }
            
            // Lazy load images
            if ('loading' in HTMLImageElement.prototype) {
              const images = document.querySelectorAll('img[loading="lazy"]');
              images.forEach(img => {
                img.src = img.dataset.src || img.src;
              });
            } else {
              // Fallback for browsers that don't support lazy loading
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
              script.async = true;
              document.body.appendChild(script);
            }
            
            // Optimize for Google's Mobile-Friendly Test
            // Ensure all content is visible
            document.addEventListener('DOMContentLoaded', function() {
              // Check for content wider than viewport
              const docWidth = document.documentElement.offsetWidth;
              const elements = document.querySelectorAll('*');
              elements.forEach(el => {
                if (el.offsetWidth > docWidth) {
                  console.warn('Element wider than viewport:', el);
                  el.style.maxWidth = '100%';
                  el.style.overflowX = 'auto';
                }
              });
              
              // Ensure tap targets are large enough
              const clickables = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
              clickables.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width < 48 || rect.height < 48) {
                  el.style.minWidth = '48px';
                  el.style.minHeight = '48px';
                  el.style.padding = '12px';
                }
              });
              
              // Fix font sizes
              const textElements = document.querySelectorAll('p, li, td, th, div, span');
              textElements.forEach(el => {
                const fontSize = parseInt(window.getComputedStyle(el).fontSize);
                if (fontSize < 14) {
                  el.style.fontSize = '14px';
                }
              });
            });
          `
        }}
      />
    </>
  );
}