import { useEffect, useRef } from 'react';

/**
 * Custom hook to lock/unlock body scroll
 * Preserves scroll position when locked and restores it when unlocked
 * @param isLocked - Whether scroll should be locked
 */
export function useScrollLock(isLocked: boolean) {
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    if (isLocked) {
      // Store current scroll position
      scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
      
      // Apply scroll lock styles
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Save original styles
      const originalStyles = {
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
      
      // Compensate for scrollbar width to prevent layout shift
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Add class for CSS targeting
      document.body.classList.add('scroll-locked', 'menu-open');
      
      // Cleanup function
      return () => {
        // Restore original styles
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.position = originalStyles.position;
        document.body.style.top = originalStyles.top;
        document.body.style.width = originalStyles.width;
        document.body.style.paddingRight = originalStyles.paddingRight;
        
        // Remove classes
        document.body.classList.remove('scroll-locked', 'menu-open');
        
        // Restore scroll position
        window.scrollTo(0, scrollPositionRef.current);
      };
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