'use client';

import { useEffect } from 'react';

export function PerformanceOptimizations() {
  useEffect(() => {
    // Preload critical images after initial load
    const preloadImages = () => {
      const imagesToPreload = [
        '/logo.png',
        '/apple-touch-icon.png',
      ];
      
      imagesToPreload.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Defer non-critical scripts
    const deferScripts = () => {
      // Move analytics to after page load
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          preloadImages();
        });
      } else {
        setTimeout(preloadImages, 1);
      }
    };

    deferScripts();
  }, []);

  return null;
}

// Component for lazy loading heavy components
export function LazyLoadWrapper({ children, rootMargin = '100px' }: { children: React.ReactNode; rootMargin?: string }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? children : <div style={{ minHeight: '200px' }} />}
    </div>
  );
}