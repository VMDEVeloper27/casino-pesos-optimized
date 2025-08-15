import { NextRequest, NextResponse } from 'next/server';

// In-memory store for rate limiting (in production, use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  windowMs?: number;  // Time window in milliseconds
  max?: number;       // Max requests per window
  message?: string;   // Error message
}

export function rateLimitMiddleware(options: RateLimitOptions = {}) {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100,                  // 100 requests per window
    message = 'Too many requests, please try again later.'
  } = options;

  return async function middleware(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    const key = `${ip}:${req.nextUrl.pathname}`;
    const now = Date.now();
    
    // Get or create rate limit entry
    let entry = rateLimit.get(key);
    
    if (!entry || now > entry.resetTime) {
      entry = {
        count: 0,
        resetTime: now + windowMs
      };
    }
    
    entry.count++;
    rateLimit.set(key, entry);
    
    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance to clean up
      for (const [k, v] of rateLimit.entries()) {
        if (now > v.resetTime) {
          rateLimit.delete(k);
        }
      }
    }
    
    // Check if limit exceeded
    if (entry.count > max) {
      return NextResponse.json(
        { error: message },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': max.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': entry.resetTime.toString(),
            'Retry-After': Math.ceil((entry.resetTime - now) / 1000).toString()
          }
        }
      );
    }
    
    // Add rate limit headers to response
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', max.toString());
    response.headers.set('X-RateLimit-Remaining', (max - entry.count).toString());
    response.headers.set('X-RateLimit-Reset', entry.resetTime.toString());
    
    return response;
  };
}

// Specific rate limiters for different endpoints
export const authRateLimit = rateLimitMiddleware({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per 15 minutes
  message: 'Too many login attempts, please try again later.'
});

export const apiRateLimit = rateLimitMiddleware({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: 'Too many API requests, please try again later.'
});

export const registrationRateLimit = rateLimitMiddleware({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 registration attempts per hour
  message: 'Too many registration attempts, please try again later.'
});