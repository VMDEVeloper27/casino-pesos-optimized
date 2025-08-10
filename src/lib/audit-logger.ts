export type AuditAction = 
  | 'LOGIN'
  | 'LOGOUT'
  | 'CASINO_CREATED'
  | 'CASINO_UPDATED'
  | 'CASINO_DELETED'
  | 'BONUS_CREATED'
  | 'BONUS_UPDATED'
  | 'BONUS_DELETED'
  | 'CONTENT_CREATED'
  | 'CONTENT_UPDATED'
  | 'CONTENT_DELETED'
  | 'CONTENT_PUBLISHED'
  | 'CONTENT_ARCHIVED'
  | 'BLOG_CREATED'
  | 'BLOG_UPDATED'
  | 'BLOG_DELETED'
  | 'BLOG_PUBLISHED'
  | 'MEDIA_UPLOADED'
  | 'MEDIA_DELETED'
  | 'SETTINGS_UPDATED';

export type AuditSeverity = 'info' | 'warning' | 'critical';

interface AuditEntry {
  action: AuditAction;
  entityType?: string;
  entityId?: string;
  entityName?: string;
  details?: any;
  user: string;
  userId?: string;
  severity?: AuditSeverity;
}

export async function logAuditEvent(entry: AuditEntry) {
  try {
    // Send to API endpoint
    const response = await fetch('/api/admin/audit-log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    
    if (!response.ok) {
      console.error('Failed to log audit event');
    }
    
    return response.ok;
  } catch (error) {
    console.error('Error logging audit event:', error);
    return false;
  }
}

// Helper functions for common actions
export const auditLog = {
  async casinoCreated(casino: any, user: string) {
    return logAuditEvent({
      action: 'CASINO_CREATED',
      entityType: 'casino',
      entityId: casino.id,
      entityName: casino.name,
      details: { rating: casino.rating },
      user,
      severity: 'info'
    });
  },
  
  async casinoUpdated(casino: any, changes: string[], user: string) {
    return logAuditEvent({
      action: 'CASINO_UPDATED',
      entityType: 'casino',
      entityId: casino.id,
      entityName: casino.name,
      details: { changes },
      user,
      severity: 'info'
    });
  },
  
  async casinoDeleted(casino: any, user: string) {
    return logAuditEvent({
      action: 'CASINO_DELETED',
      entityType: 'casino',
      entityId: casino.id,
      entityName: casino.name,
      user,
      severity: 'warning'
    });
  },
  
  async bonusUpdated(bonus: any, casino: string, user: string) {
    return logAuditEvent({
      action: 'BONUS_UPDATED',
      entityType: 'bonus',
      entityId: bonus.id,
      entityName: `${casino} - ${bonus.type}`,
      details: { amount: bonus.amount, percentage: bonus.percentage },
      user,
      severity: 'info'
    });
  },
  
  async contentPublished(content: any, user: string) {
    return logAuditEvent({
      action: 'CONTENT_PUBLISHED',
      entityType: 'content',
      entityId: content.id,
      entityName: content.title,
      details: { type: content.type, locale: content.locale },
      user,
      severity: 'info'
    });
  },
  
  async blogCreated(post: any, user: string) {
    return logAuditEvent({
      action: 'BLOG_CREATED',
      entityType: 'blog',
      entityId: post.id,
      entityName: post.title,
      details: { category: post.category, tags: post.tags },
      user,
      severity: 'info'
    });
  },
  
  async mediaUploaded(fileName: string, fileSize: number, user: string) {
    return logAuditEvent({
      action: 'MEDIA_UPLOADED',
      entityType: 'media',
      entityName: fileName,
      details: { size: fileSize },
      user,
      severity: 'info'
    });
  },
  
  async login(user: string) {
    return logAuditEvent({
      action: 'LOGIN',
      user,
      severity: 'info'
    });
  },
  
  async logout(user: string) {
    return logAuditEvent({
      action: 'LOGOUT',
      user,
      severity: 'info'
    });
  }
};