'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save,
  X,
  Plus,
  Gamepad2,
  Loader2
} from 'lucide-react';

interface GameFormData {
  name: string;
  slug: string;
  provider: string;
  type: 'slot' | 'live' | 'table' | 'crash' | 'instant' | 'video-poker' | 'card' | 'jackpot';
  category?: string;
  rtp?: number;
  volatility?: 'low' | 'medium' | 'high' | 'very-high';
  maxWin?: number;
  minBet?: number;
  maxBet?: number;
  paylines?: number;
  reels?: number;
  rows?: number;
  features: string[];
  theme?: string;
  releaseDate?: string;
  popularity: number;
  image: string;
  demoUrl?: string;
  embedUrl?: string;
  fullscreenMode?: boolean;
  mobileOptimized?: boolean;
  availableAt: string[];
  description?: string;
  instructions?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isHot?: boolean;
}

export default function EditGamePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [newFeature, setNewFeature] = useState('');
  const [newCasino, setNewCasino] = useState('');
  
  const [formData, setFormData] = useState<GameFormData>({
    name: '',
    slug: '',
    provider: '',
    type: 'slot',
    rtp: undefined,
    volatility: undefined,
    maxWin: undefined,
    minBet: undefined,
    maxBet: undefined,
    paylines: undefined,
    reels: undefined,
    rows: undefined,
    features: [],
    theme: '',
    releaseDate: '',
    popularity: 50,
    image: '',
    demoUrl: '',
    embedUrl: '',
    fullscreenMode: true,
    mobileOptimized: true,
    availableAt: [],
    description: '',
    instructions: '',
    isNew: false,
    isFeatured: false,
    isHot: false,
  });

  useEffect(() => {
    fetchGame();
  }, [params.id]);

  const fetchGame = async () => {
    try {
      const response = await fetch(`/api/admin/games/${params.id}`);
      if (response.ok) {
        const game = await response.json();
        setFormData({
          name: game.name || '',
          slug: game.slug || '',
          provider: game.provider || '',
          type: game.type || 'slot',
          category: game.category || '',
          rtp: game.rtp,
          volatility: game.volatility,
          maxWin: game.maxWin,
          minBet: game.minBet,
          maxBet: game.maxBet,
          paylines: game.paylines,
          reels: game.reels,
          rows: game.rows,
          features: game.features || [],
          theme: game.theme || '',
          releaseDate: game.releaseDate || '',
          popularity: game.popularity || 50,
          image: game.image || '',
          demoUrl: game.demoUrl || '',
          embedUrl: game.embedUrl || '',
          fullscreenMode: game.fullscreenMode ?? true,
          mobileOptimized: game.mobileOptimized ?? true,
          availableAt: game.availableAt || [],
          description: game.description || '',
          instructions: game.instructions || '',
          isNew: game.isNew || false,
          isFeatured: game.isFeatured || false,
          isHot: game.isHot || false,
        });
      } else {
        alert('Game not found');
        router.push('/admin/games');
      }
    } catch (error) {
      console.error('Error fetching game:', error);
      alert('Failed to load game');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data, removing undefined values
      const dataToSend = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
          acc[key as keyof GameFormData] = value;
        }
        return acc;
      }, {} as any);

      const response = await fetch(`/api/admin/games/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        router.push('/admin/games');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to update game'}`);
      }
    } catch (error) {
      console.error('Error updating game:', error);
      alert('Failed to update game');
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addCasino = () => {
    if (newCasino.trim() && !formData.availableAt.includes(newCasino.trim())) {
      setFormData({
        ...formData,
        availableAt: [...formData.availableAt, newCasino.trim()],
      });
      setNewCasino('');
    }
  };

  const removeCasino = (index: number) => {
    setFormData({
      ...formData,
      availableAt: formData.availableAt.filter((_, i) => i !== index),
    });
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading game...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/games"
            className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Game</h1>
            <p className="text-neutral-400 mt-1">Update game details</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Game Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Provider *
              </label>
              <input
                type="text"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Pragmatic Play"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="slot">Slot</option>
                <option value="live">Live Casino</option>
                <option value="table">Table Game</option>
                <option value="crash">Crash Game</option>
                <option value="instant">Instant Game</option>
                <option value="video-poker">Video Poker</option>
                <option value="card">Card Game</option>
                <option value="jackpot">Jackpot</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Category
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value || undefined })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">None</option>
                <option value="new">New</option>
                <option value="hot">Hot</option>
                <option value="classic">Classic</option>
                <option value="tournament">Tournament</option>
                <option value="game-show">Game Show</option>
                <option value="jackpot">Jackpot</option>
                <option value="megaways">Megaways</option>
                <option value="bonus-buy">Bonus Buy</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Theme
              </label>
              <input
                type="text"
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Egyptian, Adventure"
              />
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Game Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                RTP (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.rtp || ''}
                onChange={(e) => setFormData({ ...formData, rtp: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="96.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Volatility
              </label>
              <select
                value={formData.volatility || ''}
                onChange={(e) => setFormData({ ...formData, volatility: e.target.value as any || undefined })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="very-high">Very High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Max Win (x)
              </label>
              <input
                type="number"
                min="0"
                value={formData.maxWin || ''}
                onChange={(e) => setFormData({ ...formData, maxWin: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="5000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Min Bet
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.minBet || ''}
                onChange={(e) => setFormData({ ...formData, minBet: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="0.10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Max Bet
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.maxBet || ''}
                onChange={(e) => setFormData({ ...formData, maxBet: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Popularity (0-100) *
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.popularity}
                onChange={(e) => setFormData({ ...formData, popularity: parseInt(e.target.value) || 0 })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>
          
          {formData.type === 'slot' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Reels
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.reels || ''}
                  onChange={(e) => setFormData({ ...formData, reels: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Rows
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.rows || ''}
                  onChange={(e) => setFormData({ ...formData, rows: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Paylines
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.paylines || ''}
                  onChange={(e) => setFormData({ ...formData, paylines: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="20"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Media & Links</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/game-image.jpg"
                required
              />
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Game preview" 
                    className="h-20 w-20 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Demo URL
              </label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/demo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Embed URL (for iframe)
              </label>
              <input
                type="url"
                value={formData.embedUrl}
                onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/embed/game"
              />
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              className="flex-1 bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Add a feature (e.g., Free Spins)"
            />
            <button
              type="button"
              onClick={addFeature}
              className="p-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 text-black" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700 text-white rounded-lg"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-1 hover:bg-neutral-600 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Available At Casinos</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCasino}
              onChange={(e) => setNewCasino(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCasino())}
              className="flex-1 bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Add casino ID (e.g., bet365)"
            />
            <button
              type="button"
              onClick={addCasino}
              className="p-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 text-black" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.availableAt.map((casino, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700 text-white rounded-lg"
              >
                {casino}
                <button
                  type="button"
                  onClick={() => removeCasino(index)}
                  className="p-1 hover:bg-neutral-600 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Game Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe the game..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Instructions
              </label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                rows={4}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="How to play..."
              />
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Options</h2>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="w-5 h-5 bg-neutral-700 rounded"
              />
              <span className="text-white">Mark as New</span>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.isHot}
                onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                className="w-5 h-5 bg-neutral-700 rounded"
              />
              <span className="text-white">Mark as Hot</span>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-5 h-5 bg-neutral-700 rounded"
              />
              <span className="text-white">Mark as Featured</span>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.fullscreenMode}
                onChange={(e) => setFormData({ ...formData, fullscreenMode: e.target.checked })}
                className="w-5 h-5 bg-neutral-700 rounded"
              />
              <span className="text-white">Supports Fullscreen Mode</span>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.mobileOptimized}
                onChange={(e) => setFormData({ ...formData, mobileOptimized: e.target.checked })}
                className="w-5 h-5 bg-neutral-700 rounded"
              />
              <span className="text-white">Mobile Optimized</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          
          <Link
            href="/admin/games"
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}