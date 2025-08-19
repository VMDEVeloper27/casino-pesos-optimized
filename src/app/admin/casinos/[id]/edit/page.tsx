'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import ImageSelector from '@/components/admin/ImageSelector';

interface CasinoFormData {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  established: number;
  license: string;
  bonus: string;
  bonusExtra: string;
  promoCode: string;
  rollover: string;
  minDeposit: number;
  games: number;
  providers: string[];
  withdrawal: string;
  paymentMethods: string[];
  support: string[];
  languages: string[];
  pros: string[];
  cons: string[];
  description: string;
  features: {
    liveCasino: boolean;
    mobileApp: boolean;
    crypto: boolean;
    sportsbook: boolean;
    vipProgram: boolean;
  };
  status: 'active' | 'inactive' | 'pending';
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditCasinoPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<CasinoFormData>({
    id: '',
    name: '',
    logo: '',
    rating: 4.0,
    reviewCount: 0,
    established: new Date().getFullYear(),
    license: '',
    bonus: '',
    bonusExtra: '',
    promoCode: '',
    rollover: '30x',
    minDeposit: 100,
    games: 1000,
    providers: [],
    withdrawal: '24-48 horas',
    paymentMethods: [],
    support: [],
    languages: ['Español'],
    pros: [],
    cons: [],
    description: '',
    features: {
      liveCasino: false,
      mobileApp: false,
      crypto: false,
      sportsbook: false,
      vipProgram: false,
    },
    status: 'pending'
  });

  useEffect(() => {
    fetchCasino();
  }, [id]);

  const fetchCasino = async () => {
    try {
      const response = await fetch(`/api/admin/casinos/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        alert('Casino not found');
        router.push('/admin/casinos');
      }
    } catch (error) {
      console.error('Error fetching casino:', error);
      alert('Error loading casino');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/casinos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/casinos');
      } else {
        alert('Error updating casino');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating casino');
    } finally {
      setLoading(false);
    }
  };

  const addArrayItem = (field: 'pros' | 'cons' | 'providers' | 'paymentMethods' | 'support' | 'languages') => {
    const newItem = prompt(`Add new ${field.slice(0, -1)}:`);
    if (newItem) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] as string[]), newItem]
      });
    }
  };

  const removeArrayItem = (field: 'pros' | 'cons' | 'providers' | 'paymentMethods' | 'support' | 'languages', index: number) => {
    setFormData({
      ...formData,
      [field]: (formData[field] as string[]).filter((_, i) => i !== index)
    });
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading casino...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/casinos"
            className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Casino</h1>
            <p className="text-neutral-400">Editing: {formData.name}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Casino ID (URL slug)
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="bet365"
                required
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Casino Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Bet365 Casino"
                required
              />
            </div>

            <div className="col-span-2">
              <ImageSelector
                value={formData.logo}
                onChange={(value) => setFormData({ ...formData, logo: value })}
                label="Casino Logo"
                placeholder="Select or upload casino logo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
                max="5"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Established Year
              </label>
              <input
                type="number"
                value={formData.established}
                onChange={(e) => setFormData({ ...formData, established: parseInt(e.target.value) })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                License
              </label>
              <input
                type="text"
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Malta, Gibraltar, UK"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' | 'pending' })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Total Games
              </label>
              <input
                type="number"
                value={formData.games}
                onChange={(e) => setFormData({ ...formData, games: parseInt(e.target.value) })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Bonus Information */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-xl font-bold text-white mb-6">Bonus Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Main Bonus
              </label>
              <input
                type="text"
                value={formData.bonus}
                onChange={(e) => setFormData({ ...formData, bonus: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="100% hasta $30,000 MXN"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Bonus Extra
              </label>
              <input
                type="text"
                value={formData.bonusExtra || ''}
                onChange={(e) => setFormData({ ...formData, bonusExtra: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+ 200 Giros Gratis"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Promo Code
              </label>
              <input
                type="text"
                value={formData.promoCode || ''}
                onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="WELCOME100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Rollover
              </label>
              <input
                type="text"
                value={formData.rollover}
                onChange={(e) => setFormData({ ...formData, rollover: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="30x"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Minimum Deposit (MXN)
              </label>
              <input
                type="number"
                value={formData.minDeposit}
                onChange={(e) => setFormData({ ...formData, minDeposit: parseInt(e.target.value) })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Withdrawal Time
              </label>
              <input
                type="text"
                value={formData.withdrawal}
                onChange={(e) => setFormData({ ...formData, withdrawal: e.target.value })}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="24-48 horas"
                required
              />
            </div>
          </div>
        </div>

        {/* Arrays Section */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-xl font-bold text-white mb-6">Additional Information</h2>
          
          {/* Payment Methods */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Payment Methods
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(formData.paymentMethods || []).map((method, index) => (
                <span
                  key={index}
                  className="bg-neutral-700 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                >
                  {method}
                  <button
                    type="button"
                    onClick={() => removeArrayItem('paymentMethods', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('paymentMethods')}
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
          </div>

          {/* Pros */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Pros
            </label>
            <div className="space-y-2">
              {(formData.pros || []).map((pro, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 bg-neutral-700 text-white px-3 py-1 rounded-lg">
                    {pro}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('pros', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('pros')}
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add Pro
              </button>
            </div>
          </div>

          {/* Cons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Cons
            </label>
            <div className="space-y-2">
              {(formData.cons || []).map((con, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 bg-neutral-700 text-white px-3 py-1 rounded-lg">
                    {con}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('cons', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('cons')}
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add Con
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Detailed description of the casino..."
              required
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-xl font-bold text-white mb-6">Features</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.features?.liveCasino || false}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, liveCasino: e.target.checked }
                })}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-white">Live Casino</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.features?.mobileApp || false}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, mobileApp: e.target.checked }
                })}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-white">Mobile App</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.features?.crypto || false}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, crypto: e.target.checked }
                })}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-white">Crypto</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.features?.sportsbook || false}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, sportsbook: e.target.checked }
                })}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-white">Sportsbook</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.features?.vipProgram || false}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, vipProgram: e.target.checked }
                })}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-white">VIP Program</span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'Update Casino'}
          </button>
          
          <Link
            href="/admin/casinos"
            className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}