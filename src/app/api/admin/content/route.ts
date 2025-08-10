import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');

// Ensure content file exists
async function ensureContentFile() {
  try {
    await fs.access(CONTENT_FILE);
  } catch {
    await fs.writeFile(CONTENT_FILE, '[]', 'utf-8');
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureContentFile();
    const data = await fs.readFile(CONTENT_FILE, 'utf-8');
    const content = JSON.parse(data);
    
    // Filter by query parameters
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const locale = searchParams.get('locale');
    
    let filtered = content;
    
    if (type && type !== 'all') {
      filtered = filtered.filter((item: any) => item.type === type);
    }
    
    if (status && status !== 'all') {
      filtered = filtered.filter((item: any) => item.status === status);
    }
    
    if (locale && locale !== 'all') {
      filtered = filtered.filter((item: any) => item.locale === locale);
    }
    
    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureContentFile();
    const newContent = await request.json();
    
    // Add metadata
    newContent.id = `${newContent.type}-${Date.now()}`;
    newContent.lastModified = new Date().toISOString();
    
    const data = await fs.readFile(CONTENT_FILE, 'utf-8');
    const content = JSON.parse(data);
    
    content.push(newContent);
    
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
    
    // Log to audit log
    await logAuditEvent({
      action: 'CONTENT_CREATED',
      entityType: 'content',
      entityId: newContent.id,
      entityName: newContent.title,
      details: { type: newContent.type, status: newContent.status },
      user: newContent.author
    });
    
    return NextResponse.json(newContent);
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    );
  }
}

// Helper function to log audit events
async function logAuditEvent(event: any) {
  try {
    const auditFile = path.join(process.cwd(), 'data', 'audit-log.json');
    
    // Ensure audit file exists
    try {
      await fs.access(auditFile);
    } catch {
      await fs.writeFile(auditFile, '[]', 'utf-8');
    }
    
    const data = await fs.readFile(auditFile, 'utf-8');
    const auditLog = JSON.parse(data);
    
    const auditEntry = {
      id: `audit-${Date.now()}`,
      ...event,
      createdAt: new Date().toISOString(),
      severity: 'info'
    };
    
    auditLog.unshift(auditEntry); // Add to beginning
    
    // Keep only last 1000 entries
    if (auditLog.length > 1000) {
      auditLog.splice(1000);
    }
    
    await fs.writeFile(auditFile, JSON.stringify(auditLog, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
}