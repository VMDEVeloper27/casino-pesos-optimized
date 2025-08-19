'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X, Image, Globe, Mail, Phone, Clock } from 'lucide-react';
import { CasinoFormData, BonusFormData, defaultCasinoData } from '@/types/casino';
import ImageSelector from '@/components/admin/ImageSelector';

export default function AddCasinoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Main casino form data - matching DB schema exactly
  const [formData, setFormData] = useState<CasinoFormData>(defaultCasinoData);
  
  // Bonus data (will be saved separately)
  const [bonusData, setBonusData] = useState<BonusFormData>({
    type: 'WELCOME',
    name: 'Bono de Bienvenida',
    nameEs: 'Bono de Bienvenida',
    nameEn: 'Welcome Bonus',
    amount: 10000,
    percentage: 100,
    minDeposit: 100,
    wageringRequirement: 30,
    bonusCode: '',
    isExclusive: false,
    isActive: true
  });

  // Input helpers for arrays
  const [newFeature, setNewFeature] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCurrency, setNewCurrency] = useState('');
  const [newLicense, setNewLicense] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newRestrictedCountry, setNewRestrictedCountry] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');

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
      slug: generateSlug(name),
      metaTitle: formData.metaTitle || `${name} - Casino Online México`
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.websiteUrl) {
      alert('Por favor complete los campos obligatorios: Nombre y URL del sitio');
      return;
    }
    
    setLoading(true);

    try {
      // Prepare data matching DB schema
      const dataToSend = {
        ...formData,
        // Include bonus data to be created separately
        bonuses: bonusData.amount || bonusData.percentage ? [bonusData] : [],
        // Pros and cons will be created as related records
        prosData: formData.pros,
        consData: formData.cons
      };

      const response = await fetch('/api/admin/casinos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create casino');
      }

      alert('Casino creado exitosamente!');
      router.push('/admin/casinos');
    } catch (error) {
      console.error('Error creating casino:', error);
      alert('Error al crear el casino: ' + (error as Error).message);
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
            <p className="text-neutral-400">Complete toda la información del casino</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-neutral-700">
        {['basic', 'features', 'support', 'bonus', 'seo', 'status'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab === 'basic' && 'Información Básica'}
            {tab === 'features' && 'Características'}
            {tab === 'support' && 'Soporte'}
            {tab === 'bonus' && 'Bonos'}
            {tab === 'seo' && 'SEO'}
            {tab === 'status' && 'Estado'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Tab */}
        {activeTab === 'basic' && (
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
                  URL del Sitio Web *
                </label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                  placeholder="https://casino.com"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Link de Afiliado
                </label>
                <input
                  type="url"
                  value={formData.affiliateLink}
                  onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
                  placeholder="https://affiliate.link"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <ImageSelector
                  value={formData.logo}
                  onChange={(value) => setFormData({...formData, logo: value})}
                  label="Logo del Casino"
                  placeholder="Selecciona o sube el logo del casino"
                />
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
                  value={formData.rating || 0}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setFormData({...formData, rating: isNaN(value) ? 0 : value});
                  }}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Año de Establecimiento
                </label>
                <input
                  type="number"
                  value={formData.established || new Date().getFullYear()}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setFormData({...formData, established: isNaN(value) ? new Date().getFullYear() : value});
                  }}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Prioridad (orden)
                </label>
                <input
                  type="number"
                  value={formData.priority || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setFormData({...formData, priority: isNaN(value) ? 0 : value});
                  }}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Descripción General
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  placeholder="Descripción general del casino..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Descripción en Español
                </label>
                <textarea
                  value={formData.descriptionEs}
                  onChange={(e) => setFormData({...formData, descriptionEs: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  placeholder="Descripción en español..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Descripción en Inglés
                </label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  placeholder="Description in English..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h2 className="text-lg font-semibold text-white mb-4">Características</h2>
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

            {/* Languages */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h2 className="text-lg font-semibold text-white mb-4">Idiomas Disponibles</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('languages', newLanguage, setNewLanguage))}
                  className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  placeholder="Ej: es, en, pt"
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('languages', newLanguage, setNewLanguage)}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.languages.map((item, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700 rounded-full text-sm text-white">
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('languages', index)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Currencies */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h2 className="text-lg font-semibold text-white mb-4">Monedas Aceptadas</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCurrency}
                  onChange={(e) => setNewCurrency(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('currencies', newCurrency, setNewCurrency))}
                  className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  placeholder="Ej: MXN, USD, EUR, BTC"
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

            {/* Licenses */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h2 className="text-lg font-semibold text-white mb-4">Licencias</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLicense}
                  onChange={(e) => setNewLicense(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('licenses', newLicense, setNewLicense))}
                  className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  placeholder="Ej: SEGOB, Curacao, Malta"
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

            {/* Countries */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
                <h2 className="text-lg font-semibold text-white mb-4">Países Soportados</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('supportedCountries', newCountry, setNewCountry))}
                    className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                    placeholder="Ej: MX, US, CA"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddItem('supportedCountries', newCountry, setNewCountry)}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.supportedCountries.map((item, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/50 rounded-full text-sm text-green-300">
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('supportedCountries', index)}
                        className="ml-1 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
                <h2 className="text-lg font-semibold text-white mb-4">Países Restringidos</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRestrictedCountry}
                    onChange={(e) => setNewRestrictedCountry(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('restrictedCountries', newRestrictedCountry, setNewRestrictedCountry))}
                    className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                    placeholder="Ej: FR, IT, ES"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddItem('restrictedCountries', newRestrictedCountry, setNewRestrictedCountry)}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.restrictedCountries.map((item, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-red-900/50 rounded-full text-sm text-red-300">
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('restrictedCountries', index)}
                        className="ml-1 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h2 className="text-lg font-semibold text-white mb-4">Métodos de Pago</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPaymentMethod}
                  onChange={(e) => setNewPaymentMethod(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('paymentMethods', newPaymentMethod, setNewPaymentMethod))}
                  className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                  placeholder="Ej: SPEI, OXXO, Visa, MasterCard"
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('paymentMethods', newPaymentMethod, setNewPaymentMethod)}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.paymentMethods?.map((item, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700 rounded-full text-sm text-white">
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('paymentMethods', index)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Pros and Cons */}
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
                  {formData.pros?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between px-3 py-2 bg-neutral-700 rounded-lg">
                      <span className="text-sm text-white">✓ {item}</span>
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
                  {formData.cons?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between px-3 py-2 bg-neutral-700 rounded-lg">
                      <span className="text-sm text-white">✗ {item}</span>
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
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
            <h2 className="text-lg font-semibold text-white mb-4">Información de Soporte</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email de Soporte
                </label>
                <input
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => setFormData({...formData, supportEmail: e.target.value})}
                  placeholder="support@casino.com"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Teléfono de Soporte
                </label>
                <input
                  type="text"
                  value={formData.supportPhone}
                  onChange={(e) => setFormData({...formData, supportPhone: e.target.value})}
                  placeholder="+52 55 1234 5678"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Horario de Soporte
                </label>
                <input
                  type="text"
                  value={formData.supportHours}
                  onChange={(e) => setFormData({...formData, supportHours: e.target.value})}
                  placeholder="24/7 o Lun-Vie 9:00-18:00"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="liveChat"
                  checked={formData.liveChatAvailable}
                  onChange={(e) => setFormData({...formData, liveChatAvailable: e.target.checked})}
                  className="w-4 h-4"
                />
                <label htmlFor="liveChat" className="text-neutral-300">
                  Chat en Vivo Disponible
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Bonus Tab */}
        {activeTab === 'bonus' && (
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
            <h2 className="text-lg font-semibold text-white mb-4">Bono Principal</h2>
            <p className="text-sm text-neutral-400 mb-4">
              Configure el bono principal del casino. Puede agregar más bonos después de crear el casino.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Tipo de Bono
                </label>
                <select
                  value={bonusData.type}
                  onChange={(e) => setBonusData({...bonusData, type: e.target.value as any})}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                >
                  <option value="WELCOME">Bienvenida</option>
                  <option value="NO_DEPOSIT">Sin Depósito</option>
                  <option value="RELOAD">Recarga</option>
                  <option value="CASHBACK">Cashback</option>
                  <option value="FREE_SPINS">Giros Gratis</option>
                  <option value="VIP">VIP</option>
                  <option value="HIGH_ROLLER">High Roller</option>
                  <option value="REFERRAL">Referido</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Nombre del Bono
                </label>
                <input
                  type="text"
                  value={bonusData.name}
                  onChange={(e) => setBonusData({...bonusData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Monto del Bono (MXN)
                </label>
                <input
                  type="number"
                  value={bonusData.amount || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setBonusData({...bonusData, amount: isNaN(value) ? 0 : value});
                  }}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Porcentaje del Bono (%)
                </label>
                <input
                  type="number"
                  value={bonusData.percentage || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setBonusData({...bonusData, percentage: isNaN(value) ? 0 : value});
                  }}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Depósito Mínimo (MXN)
                </label>
                <input
                  type="number"
                  value={bonusData.minDeposit || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setBonusData({...bonusData, minDeposit: isNaN(value) ? 0 : value});
                  }}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Requisitos de Apuesta (x)
                </label>
                <input
                  type="number"
                  value={bonusData.wageringRequirement || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setBonusData({...bonusData, wageringRequirement: isNaN(value) ? 0 : value});
                  }}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Giros Gratis
                </label>
                <input
                  type="number"
                  value={bonusData.freeSpins || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setBonusData({...bonusData, freeSpins: isNaN(value) ? 0 : value});
                  }}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Código de Bono
                </label>
                <input
                  type="text"
                  value={bonusData.bonusCode}
                  onChange={(e) => setBonusData({...bonusData, bonusCode: e.target.value})}
                  placeholder="WELCOME100"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={bonusData.isExclusive}
                    onChange={(e) => setBonusData({...bonusData, isExclusive: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-neutral-300">Bono Exclusivo</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={bonusData.isActive}
                    onChange={(e) => setBonusData({...bonusData, isActive: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-neutral-300">Bono Activo</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
            <h2 className="text-lg font-semibold text-white mb-4">Optimización SEO</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Meta Título
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                  placeholder="Casino XYZ - Mejor Casino Online México 2024"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Meta Descripción
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                  rows={3}
                  placeholder="Descubre Casino XYZ, el mejor casino online en México con bonos exclusivos..."
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Palabras Clave
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('metaKeywords', newKeyword, setNewKeyword))}
                    className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                    placeholder="Ej: casino online, bonos casino, slots mexico"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddItem('metaKeywords', newKeyword, setNewKeyword)}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.metaKeywords.map((item, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-700 rounded-full text-sm text-white">
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('metaKeywords', index)}
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
        )}

        {/* Status Tab */}
        {activeTab === 'status' && (
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
            <h2 className="text-lg font-semibold text-white mb-4">Estado y Visibilidad</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Estado de Publicación
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                >
                  <option value="DRAFT">Borrador</option>
                  <option value="PENDING_REVIEW">Pendiente de Revisión</option>
                  <option value="APPROVED">Aprobado</option>
                  <option value="PUBLISHED">Publicado</option>
                  <option value="ARCHIVED">Archivado</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-neutral-300">Casino Activo</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-neutral-300">Casino Destacado</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
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