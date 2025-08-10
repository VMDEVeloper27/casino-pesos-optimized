'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  Filter,
  Star
} from 'lucide-react';

interface Casino {
  id: string;
  name: string;
  logo: string;
  rating: number;
  established: number;
  licenses?: string[];
  license?: string;
  bonus: {
    type: string;
    amount: number;
    percentage: number;
    freeSpins?: number;
    minDeposit: number;
    wageringRequirement: number;
    code?: string;
  } | string;
  games: {
    total: number;
    slots: number;
    live: number;
    table: number;
  } | number;
  status: 'active' | 'inactive' | 'pending';
  lastModified: string;
  features?: string[];
  paymentMethods?: string[];
  currencies?: string[];
}

export default function AdminCasinosList() {
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCasinos();
  }, []);

  const fetchCasinos = async () => {
    try {
      const response = await fetch('/api/admin/casinos');
      const data = await response.json();
      setCasinos(data);
    } catch (error) {
      console.error('Error fetching casinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this casino?')) return;
    
    try {
      const response = await fetch(`/api/admin/casinos/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setCasinos(casinos.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting casino:', error);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(casinos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `casinos-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const filteredCasinos = casinos.filter(casino => {
    const matchesSearch = casino.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || casino.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading casinos...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Casinos</h1>
          <p className="text-neutral-400">Total: {casinos.length} casinos</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          <Link
            href="/admin/casinos/import"
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import
          </Link>
          
          <Link
            href="/admin/casinos/new"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Casino
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 rounded-xl p-4 mb-6 border border-neutral-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search casinos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Casinos Table */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="text-left p-4 text-neutral-400 font-medium">Casino</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Rating</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Bonus</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Games</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Status</th>
                <th className="text-left p-4 text-neutral-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCasinos.map((casino) => (
                <tr key={casino.id} className="border-b border-neutral-700 hover:bg-neutral-700/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {casino.logo}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{casino.name}</div>
                        <div className="text-xs text-neutral-400">ID: {casino.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-white">{casino.rating}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white text-sm">
                      {typeof casino.bonus === 'string' 
                        ? casino.bonus 
                        : `${casino.bonus.percentage}% up to $${casino.bonus.amount.toLocaleString()} MXN`}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">
                      {typeof casino.games === 'number' 
                        ? `${casino.games}+` 
                        : `${casino.games.total}+`}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      casino.status === 'active' 
                        ? 'bg-green-400/20 text-green-400'
                        : casino.status === 'inactive'
                        ? 'bg-red-400/20 text-red-400'
                        : 'bg-yellow-400/20 text-yellow-400'
                    }`}>
                      {casino.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/casinos/${casino.id}`}
                        target="_blank"
                        className="p-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg transition-colors"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </Link>
                      <Link
                        href={`/admin/casinos/${casino.id}/edit`}
                        className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-primary" />
                      </Link>
                      <button
                        onClick={() => handleDelete(casino.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCasinos.length === 0 && (
            <div className="p-8 text-center text-neutral-400">
              No casinos found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}