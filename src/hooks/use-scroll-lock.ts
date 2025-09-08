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
      
      // Check if passive is supported
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          get: function() {
            supportsPassive = true;
            return true;
          }
        });
        window.addEventListener("testPassive", null as any, opts);
        window.removeEventListener("testPassive", null as any, opts);
      } catch (e) {}
      
      // Prevent all scroll-related events on mobile and desktop
      const preventScroll = (e: Event) => {
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();
        return false;
      };
      
      const preventWheel = (e: WheelEvent) => {
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();
        return false;
      };
      
      const preventKeyScroll = (e: KeyboardEvent) => {
        // Prevent scroll keys: arrows, space, page up/down, home, end
        const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        if (scrollKeys.includes(e.keyCode)) {
          if (e.cancelable) {
            e.preventDefault();
          }
          e.stopPropagation();
          return false;
        }
      };
      
      // Add all event listeners to prevent scrolling
      const passiveOption = supportsPassive ? { passive: false } : false;
      document.addEventListener('touchmove', preventScroll, passiveOption);
      document.addEventListener('wheel', preventWheel, passiveOption);
      document.addEventListener('keydown', preventKeyScroll, passiveOption);
      
      // Don't prevent touchstart - it's not needed for scroll prevention
      // document.addEventListener('touchstart', preventScroll, passiveOption);
      
      // Also prevent scrolling on the window
      window.addEventListener('scroll', preventScroll, passiveOption);
      
      // Cleanup function
      return () => {
        // Remove all event listeners
        document.removeEventListener('touchmove', preventScroll);
        document.removeEventListener('wheel', preventWheel);
        document.removeEventListener('keydown', preventKeyScroll);
        window.removeEventListener('scroll', preventScroll);
        
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