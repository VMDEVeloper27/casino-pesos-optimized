'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X, Upload, Image } from 'lucide-react';
import ImageSelector from '@/components/admin/ImageSelector';

interface CasinoFormData {
  name: string;
  slug: string;
  logo: string;
  rating: number;
  established: number;
  affiliate_link: string;
  features: string[];
  bonus_type: string;
  bonus_amount: number;
  bonus_percentage: number;
  bonus_free_spins: number;
  bonus_min_deposit: number;
  bonus_wagering: string;
  bonus_code: string;
  games_total: number;
  games_slots: number;
  games_live: number;
  games_table: number;
  payment_methods: string[];
  withdrawal_time: string;
  licenses: string[];
  currencies: string[];
  pros: string[];
  cons: string[];
  status: 'active' | 'inactive' | 'pending';
  is_featured: boolean;
}

export default function AddCasinoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CasinoFormData>({
    name: '',
    slug: '',
    logo: '',
    rating: 4.0,
    established: new Date().getFullYear(),
    affiliate_link: '',
    features: [],
    bonus_type: 'welcome',
    bonus_amount: 10000,
    bonus_percentage: 100,
    bonus_free_spins: 0,
    bonus_min_deposit: 100,
    bonus_wagering: '30x',
    bonus_code: '',
    games_total: 1000,
    games_slots: 800,
    games_live: 150,
    games_table: 50,
    payment_methods: [],
    withdrawal_time: '24-48 horas',
    licenses: [],
    currencies: ['MXN', 'USD'],
    pros: [],
    cons: [],
    status: 'active',
    is_featured: false
  });

  // Input arrays management
  const [newFeature, setNewFeature] = useState('');
  const [newPayment, setNewPayment] = useState('');
  const [newLicense, setNewLicense] = useState('');
  const [newCurrency, setNewCurrency] = useState('');
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  const handleAddItem = (field: keyof CasinoFormData, value: string, setter: (val: string) => void) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] as string[]), value.trim()]
      });
      setter('');
    }
  };

  const handleRemoveItem = (field: keyof CasinoFormData, index: number) => {
    setFormData({
      ...formData,
      [field]: (formData[field] as string[]).filter((_, i) => i !== index)
    });
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Solo el nombre es obligatorio
    if (!formData.name) {
      alert('Por favor ingrese el nombre del casino');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/admin/casinos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create casino');
      }

      alert('Casino creado exitosamente!');
      router.push('/admin/casinos');
    } catch (error) {
      console.error('Error creating casino:', error);
      alert('Error al crear el casino');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/casinos"
            className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Agregar Nuevo Casino</h1>
            <p className="text-neutral-400">Complete la información del casino</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-lg font-semibold text-white mb-4">Información Básica</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Nombre del Casino *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Logo URL
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({...formData, logo: e.target.value})}
                    placeholder="/images/casino-logo.png"
                    className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  />
                  <Link
                    href="/admin/media"
                    target="_blank"
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Image className="w-4 h-4" />
                    Galería
                  </Link>
                </div>
                {formData.logo && (
                  <div className="flex items-center gap-4 p-3 bg-neutral-700/50 rounded-lg">
                    <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={formData.logo}
                        alt="Logo preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                          img.parentElement?.insertAdjacentHTML('afterbegin', 
                            '<div class="text-neutral-500 text-xs text-center">Error al cargar imagen</div>'
                          );
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-neutral-400">Vista previa del logo</p>
                      <p className="text-xs text-neutral-500 truncate">{formData.logo}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Rating (0-5)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Año de Establecimiento
              </label>
              <input
                type="number"
                value={formData.established}
                onChange={(e) => setFormData({...formData, established: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Link de Afiliado
              </label>
              <input
                type="text"
                value={formData.affiliate_link}
                onChange={(e) => setFormData({...formData, affiliate_link: e.target.value})}
                placeholder="https://..."
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="pending">Pendiente</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-neutral-300">
                Casino Destacado
              </label>
            </div>
          </div>
        </div>

        {/* Información del Bono */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-lg font-semibold text-white mb-4">Información del Bono</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Tipo de Bono
              </label>
              <input
                type="text"
                value={formData.bonus_type}
                onChange={(e) => setFormData({...formData, bonus_type: e.target.value})}
                placeholder="welcome, no-deposit, reload..."
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Monto del Bono (MXN)
              </label>
              <input
                type="number"
                value={formData.bonus_amount}
                onChange={(e) => setFormData({...formData, bonus_amount: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Porcentaje del Bono (%)
              </label>
              <input
                type="number"
                value={formData.bonus_percentage}
                onChange={(e) => setFormData({...formData, bonus_percentage: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Giros Gratis
              </label>
              <input
                type="number"
                value={formData.bonus_free_spins}
                onChange={(e) => setFormData({...formData, bonus_free_spins: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Depósito Mínimo (MXN)
              </label>
              <input
                type="number"
                value={formData.bonus_min_deposit}
                onChange={(e) => setFormData({...formData, bonus_min_deposit: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Requisitos de Apuesta
              </label>
              <input
                type="text"
                value={formData.bonus_wagering}
                onChange={(e) => setFormData({...formData, bonus_wagering: e.target.value})}
                placeholder="30x, 40x..."
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Código de Bono
              </label>
              <input
                type="text"
                value={formData.bonus_code}
                onChange={(e) => setFormData({...formData, bonus_code: e.target.value})}
                placeholder="WELCOME100"
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Tiempo de Retiro
              </label>
              <input
                type="text"
                value={formData.withdrawal_time}
                onChange={(e) => setFormData({...formData, withdrawal_time: e.target.value})}
                placeholder="24-48 horas"
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* Información de Juegos */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-lg font-semibold text-white mb-4">Información de Juegos</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Total de Juegos
              </label>
              <input
                type="number"
                value={formData.games_total}
                onChange={(e) => setFormData({...formData, games_total: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Slots
              </label>
              <input
                type="number"
                value={formData.games_slots}
                onChange={(e) => setFormData({...formData, games_slots: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Juegos en Vivo
              </label>
              <input
                type="number"
                value={formData.games_live}
                onChange={(e) => setFormData({...formData, games_live: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Juegos de Mesa
              </label>
              <input
                type="number"
                value={formData.games_table}
                onChange={(e) => setFormData({...formData, games_table: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-lg font-semibold text-white mb-4">Características</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Agregar Característica
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('features', newFeature, setNewFeature))}
                  className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  placeholder="Ej: Depósitos instantáneos"
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('features', newFeature, setNewFeature)}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.features.map((item, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700 rounded-full text-sm text-white">
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('features', index)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-lg font-semibold text-white mb-4">Métodos de Pago</h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newPayment}
              onChange={(e) => setNewPayment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('payment_methods', newPayment, setNewPayment))}
              className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              placeholder="Ej: SPEI, OXXO, Visa..."
            />
            <button
              type="button"
              onClick={() => handleAddItem('payment_methods', newPayment, setNewPayment)}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.payment_methods.map((item, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700 rounded-full text-sm text-white">
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveItem('payment_methods', index)}
                  className="ml-1 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Licencias */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-lg font-semibold text-white mb-4">Licencias</h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newLicense}
              onChange={(e) => setNewLicense(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('licenses', newLicense, setNewLicense))}
              className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              placeholder="Ej: SEGOB, Curacao..."
            />
            <button
              type="button"
              onClick={() => handleAddItem('licenses', newLicense, setNewLicense)}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.licenses.map((item, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700 rounded-full text-sm text-white">
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveItem('licenses', index)}
                  className="ml-1 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Monedas */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-lg font-semibold text-white mb-4">Monedas Aceptadas</h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newCurrency}
              onChange={(e) => setNewCurrency(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('currencies', newCurrency, setNewCurrency))}
              className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              placeholder="Ej: MXN, USD, EUR..."
            />
            <button
              type="button"
              onClick={() => handleAddItem('currencies', newCurrency, setNewCurrency)}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.currencies.map((item, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700 rounded-full text-sm text-white">
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveItem('currencies', index)}
                  className="ml-1 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Pros y Contras */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
            <h2 className="text-lg font-semibold text-white mb-4">Ventajas</h2>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newPro}
                onChange={(e) => setNewPro(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('pros', newPro, setNewPro))}
                className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                placeholder="Agregar ventaja..."
              />
              <button
                type="button"
                onClick={() => handleAddItem('pros', newPro, setNewPro)}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 space-y-1">
              {formData.pros.map((item, index) => (
                <div key={index} className="flex items-center justify-between px-3 py-2 bg-neutral-700 rounded-lg">
                  <span className="text-sm text-white">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('pros', index)}
                    className="hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
            <h2 className="text-lg font-semibold text-white mb-4">Desventajas</h2>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newCon}
                onChange={(e) => setNewCon(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('cons', newCon, setNewCon))}
                className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                placeholder="Agregar desventaja..."
              />
              <button
                type="button"
                onClick={() => handleAddItem('cons', newCon, setNewCon)}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 space-y-1">
              {formData.cons.map((item, index) => (
                <div key={index} className="flex items-center justify-between px-3 py-2 bg-neutral-700 rounded-lg">
                  <span className="text-sm text-white">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('cons', index)}
                    className="hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/casinos"
            className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Guardando...' : 'Guardar Casino'}
          </button>
        </div>
      </form>
    </div>
  );
}