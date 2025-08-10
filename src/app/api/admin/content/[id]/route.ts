import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await fs.readFile(CONTENT_FILE, 'utf-8');
    const content = JSON.parse(data);
    
    const item = content.find((c: any) => c.id === id);
    
    if (!item) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedContent = await request.json();
    
    const data = await fs.readFile(CONTENT_FILE, 'utf-8');
    const content = JSON.parse(data);
    
    const index = content.findIndex((c: any) => c.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }
    
    // Update metadata
    updatedContent.lastModified = new Date().toISOString();
    content[index] = { ...content[index], ...updatedContent };
    
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
    
    // Log to audit log
    await logAuditEvent({
      action: 'CONTENT_UPDATED',
      entityType: 'content',
      entityId: id,
      entityName: content[index].title,
      details: { 
        type: content[index].type,
        status: content[index].status,
        changes: Object.keys(updatedContent)
      },
      user: updatedContent.author || 'admin@casinospesos.com'
    });
    
    return NextResponse.json(content[index]);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await fs.readFile(CONTENT_FILE, 'utf-8');
    const content = JSON.parse(data);
    
    const index = content.findIndex((c: any) => c.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }
    
    const deletedItem = content[index];
    content.splice(index, 1);
    
    await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
    
    // Log to audit log
    await logAuditEvent({
      action: 'CONTENT_DELETED',
      entityType: 'content',
      entityId: id,
      entityName: deletedItem.title,
      details: { type: deletedItem.type },
      user: 'admin@casinospesos.com',
      severity: 'warning'
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: 'Failed to delete content' },
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
      ipAddress: '127.0.0.1',
      userAgent: 'Admin Panel',
      userId: 'admin-1',
      ...event,
      createdAt: new Date().toISOString(),
      severity: event.severity || 'info'
    };
    
    auditLog.unshift(auditEntry);
    
    // Keep only last 1000 entries
    if (auditLog.length > 1000) {
      auditLog.splice(1000);
    }
    
    await fs.writeFile(auditFile, JSON.stringify(auditLog, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
}