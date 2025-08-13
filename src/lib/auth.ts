import { cookies } from 'next/headers';
import crypto from 'crypto';

// Simple in-memory user store (in production, use a database)
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  isActive: boolean;
}

// In-memory storage for demo purposes
const users: User[] = [
  {
    id: '1',
    email: process.env.ADMIN_EMAIL || 'admin@casinosite.com',
    password: crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD || 'Admin123!@#').digest('hex'),
    name: 'Admin',
    role: 'SUPER_ADMIN',
    isActive: true,
  }
];

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
  // For now, return the admin user if token exists
  try {
    return users.find(u => u.isActive);
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
    const user = users.find(u => u.email === email);
    
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
  // Admin user is already in the users array
  console.log('Admin user available:', process.env.ADMIN_EMAIL || 'admin@casinosite.com');
}