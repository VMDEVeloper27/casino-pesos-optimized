'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity,
  Filter,
  Download,
  Search,
  Calendar,
  User,
  FileText,
  Plus,
  Edit,
  Trash2,
  LogIn,
  LogOut,
  Upload,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Gamepad2,
  Gift,
  BookOpen
} from 'lucide-react';

interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string | null;
  entityId: string | null;
  entityName: string | null;
  details: any;
  ipAddress: string;
  userAgent: string;
  user: string;
  userId: string;
  createdAt: string;
  severity: 'info' | 'warning' | 'critical';
}

interface AuditStats {
  total: number;
  today: number;
  critical: number;
  users: number;
}

export default function AuditLog() {
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<AuditLogEntry[]>([]);
  const [stats, setStats] = useState<AuditStats>({
    total: 0,
    today: 0,
    critical: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    action: 'all',
    user: 'all',
    dateRange: '7days',
    search: ''
  });
  
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  
  useEffect(() => {
    fetchAuditLog();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [entries, filter]);
  
  const fetchAuditLog = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.action !== 'all') params.append('action', filter.action);
      if (filter.user !== 'all') params.append('user', filter.user);
      if (filter.dateRange !== 'all') params.append('dateRange', filter.dateRange);
      if (filter.search) params.append('search', filter.search);
      
      const response = await fetch(`/api/admin/audit-log?${params}`);
      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching audit log:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...entries];
    
    if (filter.search) {
      filtered = filtered.filter(entry => 
        entry.action?.toLowerCase().includes(filter.search.toLowerCase()) ||
        entry.entityName?.toLowerCase().includes(filter.search.toLowerCase()) ||
        entry.user?.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    
    if (filter.action !== 'all') {
      filtered = filtered.filter(entry => entry.action === filter.action);
    }
    
    if (filter.user !== 'all') {
      filtered = filtered.filter(entry => entry.user === filter.user);
    }
    
    setFilteredEntries(filtered);
  };
  
  const getActionIcon = (action: string) => {
    if (action.includes('LOGIN')) return <LogIn className="w-4 h-4" />;
    if (action.includes('LOGOUT')) return <LogOut className="w-4 h-4" />;
    if (action.includes('CASINO')) return <Gamepad2 className="w-4 h-4" />;
    if (action.includes('BONUS')) return <Gift className="w-4 h-4" />;
    if (action.includes('BLOG')) return <BookOpen className="w-4 h-4" />;
    if (action.includes('CONTENT')) return <FileText className="w-4 h-4" />;
    if (action.includes('MEDIA')) return <Upload className="w-4 h-4" />;
    if (action.includes('CREATED')) return <Plus className="w-4 h-4" />;
    if (action.includes('UPDATED')) return <Edit className="w-4 h-4" />;
    if (action.includes('DELETED')) return <Trash2 className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };
  
  const getActionColor = (action: string, severity: string) => {
    if (severity === 'critical') return 'text-red-500';
    if (severity === 'warning') return 'text-yellow-500';
    if (action.includes('DELETE')) return 'text-red-400';
    if (action.includes('CREATE')) return 'text-green-400';
    if (action.includes('UPDATE')) return 'text-blue-400';
    if (action.includes('LOGIN')) return 'text-purple-400';
    return 'text-neutral-400';
  };
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded-full text-xs flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Critical
        </span>;
      case 'warning':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Warning
        </span>;
      default:
        return <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Info
        </span>;
    }
  };
  
  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };
  
  const exportAuditLog = () => {
    const csv = [
      ['Date', 'Action', 'User', 'Entity', 'IP Address', 'Severity'],
      ...filteredEntries.map(entry => [
        new Date(entry.createdAt).toLocaleString(),
        entry.action,
        entry.user,
        entry.entityName || '',
        entry.ipAddress,
        entry.severity
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Get unique users from entries
  const uniqueUsers = [...new Set(entries.map(e => e.user))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading audit log...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Audit Log</h1>
            <p className="text-neutral-400">Track all system activities and changes</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchAuditLog}
              className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportAuditLog}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xs text-neutral-400">Total</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-neutral-400">Total Events</div>
        </div>
        
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-blue-500" />
            <span className="text-xs text-blue-400">Today</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.today}</div>
          <div className="text-sm text-neutral-400">Today\'s Events</div>
        </div>
        
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <span className="text-xs text-red-400">Critical</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.critical}</div>
          <div className="text-sm text-neutral-400">Critical Events</div>
        </div>
        
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <User className="w-8 h-8 text-green-500" />
            <span className="text-xs text-green-400">Active</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.users}</div>
          <div className="text-sm text-neutral-400">Active Users</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 rounded-xl p-4 mb-6 border border-neutral-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary"
            />
          </div>
          
          <select
            value={filter.action}
            onChange={(e) => setFilter({...filter, action: e.target.value})}
            className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Actions</option>
            <option value="LOGIN">Login</option>
            <option value="LOGOUT">Logout</option>
            <option value="CASINO_CREATED">Casino Created</option>
            <option value="CASINO_UPDATED">Casino Updated</option>
            <option value="CASINO_DELETED">Casino Deleted</option>
            <option value="BONUS_UPDATED">Bonus Updated</option>
            <option value="CONTENT_CREATED">Content Created</option>
            <option value="CONTENT_PUBLISHED">Content Published</option>
            <option value="BLOG_CREATED">Blog Created</option>
            <option value="MEDIA_UPLOADED">Media Uploaded</option>
          </select>
          
          <select
            value={filter.user}
            onChange={(e) => setFilter({...filter, user: e.target.value})}
            className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
          
          <select
            value={filter.dateRange}
            onChange={(e) => setFilter({...filter, dateRange: e.target.value})}
            className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Audit Entries */}
      <div className="space-y-3">
        {filteredEntries.map((entry) => (
          <div 
            key={entry.id}
            className="bg-neutral-800 rounded-xl p-4 border border-neutral-700 hover:border-neutral-600 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 bg-neutral-700 rounded-lg ${getActionColor(entry.action, entry.severity)}`}>
                  {getActionIcon(entry.action)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">
                      {formatAction(entry.action)}
                    </span>
                    {getSeverityBadge(entry.severity)}
                  </div>
                  {entry.entityName && (
                    <div className="text-sm text-neutral-300 mb-1">
                      {entry.entityType && (
                        <span className="text-neutral-500">{entry.entityType}: </span>
                      )}
                      {entry.entityName}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {entry.user}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(entry.createdAt).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      IP: {entry.ipAddress}
                    </span>
                  </div>
                  {entry.details && Object.keys(entry.details).length > 0 && (
                    <div className="mt-2 p-2 bg-neutral-700/50 rounded text-xs text-neutral-400">
                      {Object.entries(entry.details).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-neutral-500">{key}:</span>{' '}
                          <span className="text-neutral-300">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">No audit entries found</p>
          {entries.length === 0 && (
            <p className="text-neutral-500 text-sm mt-2">
              Audit events will appear here as users interact with the admin panel
            </p>
          )}
        </div>
      )}
    </div>
  );
}