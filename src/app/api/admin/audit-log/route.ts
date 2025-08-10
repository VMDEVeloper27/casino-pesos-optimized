import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const AUDIT_FILE = path.join(process.cwd(), 'data', 'audit-log.json');

// Ensure audit file exists
async function ensureAuditFile() {
  try {
    await fs.access(AUDIT_FILE);
  } catch {
    await fs.writeFile(AUDIT_FILE, '[]', 'utf-8');
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureAuditFile();
    const data = await fs.readFile(AUDIT_FILE, 'utf-8');
    const auditLog = JSON.parse(data);
    
    // Filter by query parameters
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const user = searchParams.get('user');
    const dateRange = searchParams.get('dateRange');
    const search = searchParams.get('search');
    
    let filtered = auditLog;
    
    if (action && action !== 'all') {
      filtered = filtered.filter((entry: any) => entry.action === action);
    }
    
    if (user && user !== 'all') {
      filtered = filtered.filter((entry: any) => entry.user === user);
    }
    
    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (dateRange) {
        case '24hours':
          startDate.setDate(now.getDate() - 1);
          break;
        case '7days':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          startDate.setDate(now.getDate() - 30);
          break;
      }
      
      filtered = filtered.filter((entry: any) => 
        new Date(entry.createdAt) >= startDate
      );
    }
    
    if (search) {
      filtered = filtered.filter((entry: any) => 
        entry.action?.toLowerCase().includes(search.toLowerCase()) ||
        entry.entityName?.toLowerCase().includes(search.toLowerCase()) ||
        entry.user?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Get stats
    const stats = {
      total: auditLog.length,
      today: auditLog.filter((e: any) => {
        const today = new Date();
        const entryDate = new Date(e.createdAt);
        return entryDate.toDateString() === today.toDateString();
      }).length,
      critical: auditLog.filter((e: any) => e.severity === 'critical').length,
      users: [...new Set(auditLog.map((e: any) => e.user))].length
    };
    
    return NextResponse.json({ entries: filtered, stats });
  } catch (error) {
    console.error('Error fetching audit log:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit log' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureAuditFile();
    const entry = await request.json();
    
    // Add metadata
    const auditEntry = {
      id: `audit-${Date.now()}`,
      ...entry,
      ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
      userAgent: request.headers.get('user-agent') || 'Unknown',
      createdAt: new Date().toISOString(),
      severity: entry.severity || 'info'
    };
    
    const data = await fs.readFile(AUDIT_FILE, 'utf-8');
    const auditLog = JSON.parse(data);
    
    // Add to beginning
    auditLog.unshift(auditEntry);
    
    // Keep only last 1000 entries
    if (auditLog.length > 1000) {
      auditLog.splice(1000);
    }
    
    await fs.writeFile(AUDIT_FILE, JSON.stringify(auditLog, null, 2), 'utf-8');
    
    return NextResponse.json(auditEntry);
  } catch (error) {
    console.error('Error adding audit entry:', error);
    return NextResponse.json(
      { error: 'Failed to add audit entry' },
      { status: 500 }
    );
  }
}