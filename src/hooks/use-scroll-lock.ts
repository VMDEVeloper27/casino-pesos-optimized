import { useEffect, useRef } from 'react';

/**
 * Custom hook to lock/unlock body scroll
 * Preserves scroll position when locked and restores it when unlocked
 * @param isLocked - Whether scroll should be locked
 */
export function useScrollLock(isLocked: boolean) {
  const scrollPositionRef = useRef<number>(0);
  const originalStylesRef = useRef<any>(null);

  useEffect(() => {
    if (isLocked) {
      // Store current scroll position before locking
      scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Save original styles
      originalStylesRef.current = {
        bodyOverflow: document.body.style.overflow,
        bodyPosition: document.body.style.position,
        bodyTop: document.body.style.top,
        bodyWidth: document.body.style.width,
        bodyHeight: document.body.style.height,
        bodyPaddingRight: document.body.style.paddingRight,
        htmlOverflow: document.documentElement.style.overflow,
        htmlHeight: document.documentElement.style.height,
        htmlPosition: document.documentElement.style.position,
      };
      
      // Apply lock styles to both body and html
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      document.documentElement.style.position = 'relative';
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      // Compensate for scrollbar width to prevent layout shift
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Add class for CSS targeting
      document.body.classList.add('scroll-locked', 'menu-open');
      document.documentElement.classList.add('scroll-locked', 'menu-open');
      
      // Prevent touchmove events on mobile
      const preventScroll = (e: TouchEvent) => {
        e.preventDefault();
      };
      
      document.addEventListener('touchmove', preventScroll, { passive: false });
      
      // Cleanup function
      return () => {
        // Remove event listener
        document.removeEventListener('touchmove', preventScroll);
        
        // Restore original styles
        if (originalStylesRef.current) {
          document.body.style.overflow = originalStylesRef.current.bodyOverflow;
          document.body.style.position = originalStylesRef.current.bodyPosition;
          document.body.style.top = originalStylesRef.current.bodyTop;
          document.body.style.width = originalStylesRef.current.bodyWidth;
          document.body.style.height = originalStylesRef.current.bodyHeight;
          document.body.style.paddingRight = originalStylesRef.current.bodyPaddingRight;
          document.body.style.left = '';
          document.body.style.right = '';
          
          document.documentElement.style.overflow = originalStylesRef.current.htmlOverflow;
          document.documentElement.style.height = originalStylesRef.current.htmlHeight;
          document.documentElement.style.position = originalStylesRef.current.htmlPosition;
        }
        
        // Remove classes
        document.body.classList.remove('scroll-locked', 'menu-open');
        document.documentElement.classList.remove('scroll-locked', 'menu-open');
        
        // Restore scroll position
        window.scrollTo({
          top: scrollPositionRef.current,
          left: 0,
          behavior: 'instant' as ScrollBehavior
        });
      };
    } else {
      // If isLocked becomes false, ensure cleanup
      document.body.classList.remove('scroll-locked', 'menu-open');
      document.documentElement.classList.remove('scroll-locked', 'menu-open');
    }
  }, [isLocked]);
}

/**
 * Alternative implementation using a callback approach
 * Useful when you need more control over when to lock/unlock
 */
export function useScrollLockCallback() {
  const scrollPositionRef = useRef<number>(0);
  const originalStylesRef = useRef<any>(null);
  
  const lockScroll = () => {
    // Store current scroll position
    scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
    
    // Calculate scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Save original styles
    originalStylesRef.current = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
    };
    
    // Apply lock styles
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = '100%';
    
    // Compensate for scrollbar width
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    // Add classes
    document.body.classList.add('scroll-locked', 'menu-open');
  };
  
  const unlockScroll = () => {
    if (originalStylesRef.current) {
      // Restore original styles
      document.body.style.overflow = originalStylesRef.current.overflow;
      document.body.style.position = originalStylesRef.current.position;
      document.body.style.top = originalStylesRef.current.top;
      document.body.style.width = originalStylesRef.current.width;
      document.body.style.paddingRight = originalStylesRef.current.paddingRight;
      
      // Remove classes
      document.body.classList.remove('scroll-locked', 'menu-open');
      
      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);
      
      // Clear refs
      originalStylesRef.current = null;
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);
  
  return { lockScroll, unlockScroll };
}