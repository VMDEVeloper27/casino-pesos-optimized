// Analytics event tracking utilities

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Event types
export type EventCategory = 'engagement' | 'conversion' | 'casino' | 'payment' | 'bonus' | 'navigation';

export interface AnalyticsEvent {
  action: string;
  category: EventCategory;
  label?: string;
  value?: number;
  casino_id?: string;
  casino_name?: string;
  bonus_amount?: number;
  payment_method?: string;
}

// Google Analytics events
export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      casino_id: event.casino_id,
      casino_name: event.casino_name,
      bonus_amount: event.bonus_amount,
      payment_method: event.payment_method,
    });
  }
};

// Facebook Pixel events
export const trackFacebookEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Predefined events
export const analytics = {
  // Page views
  pageView: (path: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_path: path,
      });
    }
  },

  // Casino interactions
  viewCasino: (casinoId: string, casinoName: string) => {
    trackEvent({
      action: 'view_casino',
      category: 'casino',
      label: casinoName,
      casino_id: casinoId,
      casino_name: casinoName,
    });
    trackFacebookEvent('ViewContent', {
      content_type: 'casino',
      content_ids: [casinoId],
      content_name: casinoName,
    });
  },

  clickCasino: (casinoId: string, casinoName: string, position?: number) => {
    trackEvent({
      action: 'click_casino',
      category: 'conversion',
      label: casinoName,
      value: position,
      casino_id: casinoId,
      casino_name: casinoName,
    });
    trackFacebookEvent('InitiateCheckout', {
      content_type: 'casino',
      content_ids: [casinoId],
      content_name: casinoName,
    });
  },

  // Bonus interactions
  viewBonus: (bonusType: string, amount: number, casinoName?: string) => {
    trackEvent({
      action: 'view_bonus',
      category: 'bonus',
      label: bonusType,
      value: amount,
      casino_name: casinoName,
      bonus_amount: amount,
    });
  },

  claimBonus: (bonusType: string, amount: number, casinoId: string, casinoName: string) => {
    trackEvent({
      action: 'claim_bonus',
      category: 'conversion',
      label: bonusType,
      value: amount,
      casino_id: casinoId,
      casino_name: casinoName,
      bonus_amount: amount,
    });
    trackFacebookEvent('AddToCart', {
      content_type: 'bonus',
      content_ids: [casinoId],
      content_name: `${casinoName} - ${bonusType}`,
      value: amount,
      currency: 'MXN',
    });
  },

  // Payment method interactions
  viewPaymentMethod: (method: string) => {
    trackEvent({
      action: 'view_payment_method',
      category: 'payment',
      label: method,
      payment_method: method,
    });
  },

  selectPaymentMethod: (method: string, casinoName?: string) => {
    trackEvent({
      action: 'select_payment_method',
      category: 'payment',
      label: method,
      casino_name: casinoName,
      payment_method: method,
    });
  },

  // Comparison tool
  compareCasinos: (casinoIds: string[], casinoNames: string[]) => {
    trackEvent({
      action: 'compare_casinos',
      category: 'engagement',
      label: casinoNames.join(' vs '),
      value: casinoIds.length,
    });
    trackFacebookEvent('ViewContent', {
      content_type: 'comparison',
      content_ids: casinoIds,
      content_name: 'Casino Comparison',
    });
  },

  // Filter and search
  searchCasinos: (query: string, resultsCount: number) => {
    trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount,
    });
    trackFacebookEvent('Search', {
      search_string: query,
      content_type: 'casino',
    });
  },

  applyFilter: (filterType: string, filterValue: string) => {
    trackEvent({
      action: 'apply_filter',
      category: 'engagement',
      label: `${filterType}: ${filterValue}`,
    });
  },

  // Reviews
  viewReviews: (casinoId: string, casinoName: string) => {
    trackEvent({
      action: 'view_reviews',
      category: 'engagement',
      label: casinoName,
      casino_id: casinoId,
      casino_name: casinoName,
    });
  },

  writeReview: (casinoId: string, casinoName: string, rating: number) => {
    trackEvent({
      action: 'write_review',
      category: 'engagement',
      label: casinoName,
      value: rating,
      casino_id: casinoId,
      casino_name: casinoName,
    });
    trackFacebookEvent('CustomizeProduct', {
      content_type: 'review',
      content_ids: [casinoId],
      content_name: casinoName,
      value: rating,
    });
  },

  // Newsletter
  subscribeNewsletter: (location: string) => {
    trackEvent({
      action: 'newsletter_subscribe',
      category: 'conversion',
      label: location,
    });
    trackFacebookEvent('Lead', {
      content_name: 'Newsletter',
      content_category: location,
    });
  },

  // Blog
  readBlogPost: (slug: string, title: string, readTime: number) => {
    trackEvent({
      action: 'read_blog_post',
      category: 'engagement',
      label: title,
      value: readTime,
    });
    trackFacebookEvent('ViewContent', {
      content_type: 'article',
      content_ids: [slug],
      content_name: title,
    });
  },

  // Share
  share: (platform: string, content: string) => {
    trackEvent({
      action: 'share',
      category: 'engagement',
      label: `${platform}: ${content}`,
    });
  },

  // Scroll depth
  scrollDepth: (percentage: number, page: string) => {
    trackEvent({
      action: 'scroll',
      category: 'engagement',
      label: page,
      value: percentage,
    });
  },

  // Time on page
  timeOnPage: (seconds: number, page: string) => {
    trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      label: page,
      value: seconds,
    });
  },
};

// Scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') { return; }

  let maxScroll = 0;
  const thresholds = [25, 50, 75, 90, 100];
  const trackedThresholds = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;

      thresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          analytics.scrollDepth(threshold, window.location.pathname);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

// Time on page tracking
export const initTimeTracking = () => {
  if (typeof window === 'undefined') { return; }

  const startTime = Date.now();
  let timeSpent = 0;

  const trackTime = () => {
    const currentTime = Date.now();
    timeSpent = Math.round((currentTime - startTime) / 1000);
  };

  const interval = setInterval(trackTime, 10000); // Update every 10 seconds

  const handleUnload = () => {
    trackTime();
    analytics.timeOnPage(timeSpent, window.location.pathname);
  };

  window.addEventListener('beforeunload', handleUnload);

  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', handleUnload);
  };
};

// Initialize all tracking
export const initAnalytics = () => {
  if (typeof window === 'undefined') { return; }

  // Initialize scroll tracking
  initScrollTracking();

  // Initialize time tracking
  initTimeTracking();

  // Track initial page view
  analytics.pageView(window.location.pathname);
};

// Custom hook for analytics
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    analytics.pageView(pathname);
  }, [pathname]);

  return analytics;
};