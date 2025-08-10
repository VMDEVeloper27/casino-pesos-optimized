'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Gift, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Copy,
  DollarSign,
  Percent,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Bonus {
  id: string;
  casinoId: string;
  casinoName: string;
  type: string;
  amount: number;
  percentage: number;
  freeSpins?: number;
  minDeposit: number;
  wageringRequirement: number;
  code?: string;
  validUntil?: string;
  isActive: boolean;
}

interface EditModalProps {
  bonus: Bonus | null;
  onClose: () => void;
  onSave: (bonus: Bonus) => void;
}

export default function BonusesManagement() {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBonus, setEditingBonus] = useState<Bonus | null>(null);
  const [loading, setLoading] = useState(true);
  const [casinos, setCasinos] = useState<any[]>([]);

  useEffect(() => {
    fetchBonuses();
  }, []);

  const fetchBonuses = async () => {
    try {
      // Get all casinos and extract their bonuses
      const response = await fetch('/api/admin/casinos');
      const casinosData = await response.json();
      setCasinos(casinosData);
      
      const allBonuses: Bonus[] = [];
      casinosData.forEach((casino: any) => {
        if (casino.bonus && typeof casino.bonus === 'object') {
          allBonuses.push({
            id: `${casino.id}-bonus`,
            casinoId: casino.id,
            casinoName: casino.name,
            type: casino.bonus.type || 'welcome',
            amount: casino.bonus.amount || 0,
            percentage: casino.bonus.percentage || 100,
            freeSpins: casino.bonus.freeSpins,
            minDeposit: casino.bonus.minDeposit || 0,
            wageringRequirement: casino.bonus.wageringRequirement || 0,
            code: casino.bonus.code,
            isActive: true,
          });
        }
      });
      
      setBonuses(allBonuses);
    } catch (error) {
      console.error('Error fetching bonuses:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (bonus: Bonus) => {
    setEditingBonus(bonus);
  };
  
  const handleDelete = async (bonusId: string) => {
    if (!confirm('Are you sure you want to delete this bonus?')) return;
    
    try {
      // Find the casino that has this bonus
      const bonus = bonuses.find(b => b.id === bonusId);
      if (!bonus) return;
      
      const casino = casinos.find(c => c.id === bonus.casinoId);
      if (!casino) return;
      
      // Remove bonus from casino
      const updatedCasino = {
        ...casino,
        bonus: null
      };
      
      // Update casino via API
      const response = await fetch(`/api/admin/casinos/${casino.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCasino)
      });
      
      if (response.ok) {
        // Refresh bonuses
        await fetchBonuses();
        alert('Bonus deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting bonus:', error);
      alert('Failed to delete bonus');
    }
  };
  
  const handleSaveBonus = async (bonus: Bonus) => {
    try {
      const casino = casinos.find(c => c.id === bonus.casinoId);
      if (!casino) {
        alert('Casino not found');
        return;
      }
      
      // Update casino with new bonus data
      const updatedCasino = {
        ...casino,
        bonus: {
          type: bonus.type,
          amount: bonus.amount,
          percentage: bonus.percentage,
          freeSpins: bonus.freeSpins,
          minDeposit: bonus.minDeposit,
          wageringRequirement: bonus.wageringRequirement,
          code: bonus.code
        }
      };
      
      // Update casino via API
      const response = await fetch(`/api/admin/casinos/${casino.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCasino)
      });
      
      if (response.ok) {
        // Refresh bonuses
        await fetchBonuses();
        setEditingBonus(null);
        setShowAddModal(false);
        alert('Bonus saved successfully!');
      }
    } catch (error) {
      console.error('Error saving bonus:', error);
      alert('Failed to save bonus');
    }
  };
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Bonus code copied to clipboard!');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'welcome': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'no_deposit': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'reload': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'cashback': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'free_spins': return 'bg-pink-500/20 text-pink-500 border-pink-500/30';
      default: return 'bg-neutral-500/20 text-neutral-500 border-neutral-500/30';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'welcome': return 'Welcome Bonus';
      case 'no_deposit': return 'No Deposit';
      case 'reload': return 'Reload';
      case 'cashback': return 'Cashback';
      case 'free_spins': return 'Free Spins';
      default: return type;
    }
  };

  const filteredBonuses = bonuses.filter(bonus => {
    const matchesSearch = bonus.casinoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (bonus.code && bonus.code.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || bonus.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: bonuses.length,
    active: bonuses.filter(b => b.isActive).length,
    welcomeBonuses: bonuses.filter(b => b.type === 'welcome').length,
    avgWagering: bonuses.length > 0 
      ? Math.round(bonuses.reduce((acc, b) => acc + b.wageringRequirement, 0) / bonuses.length)
      : 0,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading bonuses...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Bonus Management</h1>
            <p className="text-neutral-400">Manage casino bonuses and promotions</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Bonus
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <Gift className="w-5 h-5 text-primary" />
            <span className="text-xs text-neutral-400">Total</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-neutral-400">Total Bonuses</div>
        </div>
        
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-xs text-green-400">Active</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.active}</div>
          <div className="text-sm text-neutral-400">Active Bonuses</div>
        </div>
        
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-neutral-400">Welcome</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.welcomeBonuses}</div>
          <div className="text-sm text-neutral-400">Welcome Bonuses</div>
        </div>
        
        <div className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <Percent className="w-5 h-5 text-purple-500" />
            <span className="text-xs text-neutral-400">Avg</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.avgWagering}x</div>
          <div className="text-sm text-neutral-400">Avg Wagering</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 rounded-xl p-4 mb-6 border border-neutral-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by casino or bonus code..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Types</option>
            <option value="welcome">Welcome Bonus</option>
            <option value="no_deposit">No Deposit</option>
            <option value="reload">Reload</option>
            <option value="cashback">Cashback</option>
            <option value="free_spins">Free Spins</option>
          </select>
        </div>
      </div>

      {/* Bonuses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBonuses.map((bonus) => (
          <div key={bonus.id} className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-white font-semibold">{bonus.casinoName}</div>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border mt-2 ${getTypeColor(bonus.type)}`}>
                  <Gift className="w-3 h-3" />
                  {getTypeLabel(bonus.type)}
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${bonus.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-neutral-400 text-sm">Amount:</span>
                <span className="text-white font-medium">${bonus.amount.toLocaleString()} MXN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 text-sm">Percentage:</span>
                <span className="text-white font-medium">{bonus.percentage}%</span>
              </div>
              {bonus.freeSpins && (
                <div className="flex justify-between">
                  <span className="text-neutral-400 text-sm">Free Spins:</span>
                  <span className="text-white font-medium">{bonus.freeSpins}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-400 text-sm">Min Deposit:</span>
                <span className="text-white font-medium">${bonus.minDeposit} MXN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 text-sm">Wagering:</span>
                <span className="text-white font-medium">{bonus.wageringRequirement}x</span>
              </div>
              {bonus.code && (
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 text-sm">Code:</span>
                  <div className="flex items-center gap-1">
                    <code className="bg-neutral-700 px-2 py-1 rounded text-primary text-xs">
                      {bonus.code}
                    </code>
                    <button 
                      onClick={() => handleCopyCode(bonus.code!)}
                      className="p-1 text-neutral-400 hover:text-white"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleEdit(bonus)}
                className="flex-1 px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors text-sm flex items-center justify-center gap-1"
              >
                <Edit className="w-3 h-3" />
                Edit
              </button>
              <button 
                onClick={() => handleDelete(bonus.id)}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredBonuses.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">No bonuses found</p>
        </div>
      )}
      
      {/* Edit Modal */}
      {editingBonus && (
        <BonusEditModal 
          bonus={editingBonus}
          casinos={casinos}
          onClose={() => setEditingBonus(null)}
          onSave={handleSaveBonus}
        />
      )}
      
      {/* Add Modal */}
      {showAddModal && (
        <BonusAddModal
          casinos={casinos.filter(c => !c.bonus || typeof c.bonus === 'string')}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveBonus}
        />
      )}
    </div>
  );
}

// Edit Modal Component
function BonusEditModal({ bonus, casinos, onClose, onSave }: { 
  bonus: Bonus; 
  casinos: any[];
  onClose: () => void; 
  onSave: (bonus: Bonus) => void;
}) {
  const [formData, setFormData] = useState<Bonus>(bonus);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">Edit Bonus</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Casino</label>
            <input
              type="text"
              value={formData.casinoName}
              disabled
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white disabled:opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
            >
              <option value="welcome">Welcome Bonus</option>
              <option value="no_deposit">No Deposit</option>
              <option value="reload">Reload</option>
              <option value="cashback">Cashback</option>
              <option value="free_spins">Free Spins</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Amount (MXN)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Percentage (%)</label>
              <input
                type="number"
                value={formData.percentage}
                onChange={(e) => setFormData({...formData, percentage: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Free Spins</label>
              <input
                type="number"
                value={formData.freeSpins || ''}
                onChange={(e) => setFormData({...formData, freeSpins: e.target.value ? parseInt(e.target.value) : undefined})}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Min Deposit (MXN)</label>
              <input
                type="number"
                value={formData.minDeposit}
                onChange={(e) => setFormData({...formData, minDeposit: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Wagering Requirement</label>
            <input
              type="number"
              value={formData.wageringRequirement}
              onChange={(e) => setFormData({...formData, wageringRequirement: parseInt(e.target.value)})}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Bonus Code</label>
            <input
              type="text"
              value={formData.code || ''}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              placeholder="e.g., WELCOME100"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Add Modal Component
function BonusAddModal({ casinos, onClose, onSave }: {
  casinos: any[];
  onClose: () => void;
  onSave: (bonus: Bonus) => void;
}) {
  const [formData, setFormData] = useState<Partial<Bonus>>({
    type: 'welcome',
    amount: 10000,
    percentage: 100,
    minDeposit: 200,
    wageringRequirement: 30,
    isActive: true
  });
  const [selectedCasinoId, setSelectedCasinoId] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCasinoId) {
      alert('Please select a casino');
      return;
    }
    
    const casino = casinos.find(c => c.id === selectedCasinoId);
    if (!casino) return;
    
    const newBonus: Bonus = {
      id: `${selectedCasinoId}-bonus`,
      casinoId: selectedCasinoId,
      casinoName: casino.name,
      type: formData.type || 'welcome',
      amount: formData.amount || 0,
      percentage: formData.percentage || 100,
      freeSpins: formData.freeSpins,
      minDeposit: formData.minDeposit || 0,
      wageringRequirement: formData.wageringRequirement || 30,
      code: formData.code,
      isActive: true
    };
    
    onSave(newBonus);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">Add New Bonus</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Select Casino</label>
            <select
              value={selectedCasinoId}
              onChange={(e) => setSelectedCasinoId(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              required
            >
              <option value="">Choose a casino...</option>
              {casinos.map(casino => (
                <option key={casino.id} value={casino.id}>{casino.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
            >
              <option value="welcome">Welcome Bonus</option>
              <option value="no_deposit">No Deposit</option>
              <option value="reload">Reload</option>
              <option value="cashback">Cashback</option>
              <option value="free_spins">Free Spins</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Amount (MXN)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Percentage (%)</label>
              <input
                type="number"
                value={formData.percentage}
                onChange={(e) => setFormData({...formData, percentage: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Free Spins</label>
              <input
                type="number"
                value={formData.freeSpins || ''}
                onChange={(e) => setFormData({...formData, freeSpins: e.target.value ? parseInt(e.target.value) : undefined})}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Min Deposit (MXN)</label>
              <input
                type="number"
                value={formData.minDeposit}
                onChange={(e) => setFormData({...formData, minDeposit: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Wagering Requirement</label>
            <input
              type="number"
              value={formData.wageringRequirement}
              onChange={(e) => setFormData({...formData, wageringRequirement: parseInt(e.target.value)})}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Bonus Code</label>
            <input
              type="text"
              value={formData.code || ''}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              placeholder="e.g., WELCOME100"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
            >
              Add Bonus
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}