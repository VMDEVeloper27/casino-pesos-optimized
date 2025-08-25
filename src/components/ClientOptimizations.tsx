'use client';

import { useEffect } from 'react';

export function ClientOptimizations() {
  useEffect(() => {
    // Remove unnecessary polyfills for modern browsers
    if (typeof window !== 'undefined') {
      // Check if browser supports modern features
      const supportsModernFeatures = 
        'IntersectionObserver' in window &&
        'Promise' in window &&
        'fetch' in window &&
        'includes' in Array.prototype &&
        'assign' in Object &&
        'startsWith' in String.prototype &&
        'endsWith' in String.prototype &&
        'padStart' in String.prototype &&
        'padEnd' in String.prototype &&
        'trimStart' in String.prototype &&
        'trimEnd' in String.prototype;
      
      if (supportsModernFeatures) {
        // Remove polyfills if they exist
        const removePolyfill = (obj: any, method: string) => {
          if (obj && obj[method] && obj[method].toString().includes('polyfill')) {
            delete obj[method];
          }
        };
        
        // Clean up String prototype polyfills
        removePolyfill(String.prototype, 'trimStart');
        removePolyfill(String.prototype, 'trimEnd');
        removePolyfill(String.prototype, 'trimLeft');
        removePolyfill(String.prototype, 'trimRight');
      }
      
      // Optimize third-party scripts loading
      const optimizeScripts = () => {
        // Find all script tags
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
          const src = script.getAttribute('src');
          if (src && (src.includes('googletagmanager') || src.includes('google-analytics'))) {
            // Already handled by GoogleAnalyticsScript component
            return;
          }
        });
      };
      
      // Run optimizations after page load
      if (document.readyState === 'complete') {
        optimizeScripts();
      } else {
        window.addEventListener('load', optimizeScripts);
      }
      
      // Preload critical fonts
      const preloadFont = (href: string) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      };
      
      // Prefetch DNS for external resources
      const prefetchDNS = (hostname: string) => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${hostname}`;
        document.head.appendChild(link);
      };
      
      // Add resource hints
      prefetchDNS('fonts.googleapis.com');
      prefetchDNS('fonts.gstatic.com');
      
      // Enable passive event listeners for better scroll performance
      const supportsPassive = (() => {
        let passiveSupported = false;
        try {
          const options = {
            get passive() {
              passiveSupported = true;
              return false;
            }
          };
          window.addEventListener('test', null as any, options);
          window.removeEventListener('test', null as any);
        } catch (err) {}
        return passiveSupported;
      })();
      
      if (supportsPassive) {
        // Override addEventListener for touch and wheel events
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
          if (['touchstart', 'touchmove', 'wheel', 'mousewheel'].includes(type)) {
            if (typeof options === 'boolean') {
              options = { capture: options, passive: true };
            } else if (typeof options === 'object') {
              options = { ...options, passive: true };
            } else {
              options = { passive: true };
            }
          }
          return originalAddEventListener.call(this, type, listener, options);
        };
      }
    }
  }, []);
  
  return null;
}