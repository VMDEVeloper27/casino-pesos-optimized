import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Simple password hashing (in production, use bcrypt)
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Generate secure token
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Session management
export async function createSession(userId: string) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  // Store token in cookies
  (await cookies()).set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
  
  return token;
}

export async function getSession() {
  const token = (await cookies()).get('auth-token');
  
  if (!token) {
    return null;
  }
  
  // In a real app, validate token against database
  // For now, just decode it
  try {
    // Simplified session retrieval
    const user = await prisma.user.findFirst({
      where: {
        isActive: true,
      },
    });
    
    return user;
  } catch (error) {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).delete('auth-token');
}

// User authentication
export async function authenticate(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user || !user.isActive) {
      return null;
    }
    
    if (!verifyPassword(password, user.password)) {
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

// Authorization helpers
export function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    SUPER_ADMIN: 5,
    ADMIN: 4,
    EDITOR: 3,
    REVIEWER: 2,
    VIEWER: 1,
  };
  
  return (roleHierarchy[userRole as keyof typeof roleHierarchy] || 0) >= 
         (roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0);
}

// Create default admin user if none exists
export async function ensureAdminUser() {
  try {
    const adminExists = await prisma.user.findFirst({
      where: {
        role: 'SUPER_ADMIN',
      },
    });
    
    if (!adminExists) {
      await prisma.user.create({
        data: {
          email: process.env.ADMIN_EMAIL || 'admin@casinosite.com',
          password: hashPassword(process.env.ADMIN_PASSWORD || 'Admin123!@#'),
          name: 'Admin',
          role: 'SUPER_ADMIN',
          isActive: true,
        },
      });
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error ensuring admin user:', error);
  }
}