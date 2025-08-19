'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Camera,
  Save,
  AlertCircle,
  Check,
  Upload,
  X
} from 'lucide-react';

export default function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { data: session, status, update } = useSession();
  const [locale, setLocale] = useState('es');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    country: '',
    preferredLanguage: 'es'
  });

  useEffect(() => {
    params.then(p => setLocale(p.locale));
  }, [params]);

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: '',
        birthDate: '',
        country: '',
        preferredLanguage: locale
      });
    }
  }, [session, locale]);

  // Load avatar from localStorage on mount
  useEffect(() => {
    if (session?.user?.email) {
      const savedAvatar = localStorage.getItem(`avatar_${session.user.email}`);
      if (savedAvatar) {
        setAvatar(savedAvatar);
      }
    }
  }, [session]);

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect(`/${locale}/auth/signin`);
  }

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, avatar })
      });

      if (response.ok) {
        await update();
        setMessage({ 
          type: 'success', 
          text: locale === 'es' ? 'Perfil actualizado exitosamente' : 'Profile updated successfully' 
        });
        setIsEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: locale === 'es' ? 'Error al actualizar el perfil' : 'Error updating profile' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({
        type: 'error',
        text: locale === 'es' ? 'Por favor selecciona una imagen' : 'Please select an image file'
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: 'error',
        text: locale === 'es' ? 'La imagen debe ser menor a 5MB' : 'Image must be less than 5MB'
      });
      return;
    }

    setIsUploadingAvatar(true);
    setMessage(null);

    try {
      // Convert to base64 for simplicity (in production, you'd upload to a storage service)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        localStorage.setItem(`avatar_${session?.user?.email}`, base64String);
        setMessage({
          type: 'success',
          text: locale === 'es' ? 'Avatar actualizado' : 'Avatar updated'
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setMessage({
        type: 'error',
        text: locale === 'es' ? 'Error al cargar la imagen' : 'Error uploading image'
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    localStorage.removeItem(`avatar_${session?.user?.email}`);
    setMessage({
      type: 'success',
      text: locale === 'es' ? 'Avatar eliminado' : 'Avatar removed'
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return locale === 'es' ? 'Administrador' : 'Administrator';
      case 'editor':
        return 'Editor';
      default:
        return locale === 'es' ? 'Usuario' : 'User';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {locale === 'es' ? 'Mi Perfil' : 'My Profile'}
          </h1>
          <p className="text-gray-600">
            {locale === 'es' ? 'Gestiona tu información personal y preferencias' : 'Manage your personal information and preferences'}
          </p>
        </motion.div>

        {/* Message Alert */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p>{message.text}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  {avatar ? (
                    <div className="relative">
                      <Image
                        src={avatar}
                        alt="Avatar"
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-full object-cover mx-auto"
                      />
                      <button
                        onClick={removeAvatar}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                        title={locale === 'es' ? 'Eliminar avatar' : 'Remove avatar'}
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto">
                      {session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploadingAvatar ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-600"></div>
                    ) : (
                      <Camera className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {session?.user?.name || session?.user?.email?.split('@')[0]}
                </h2>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
                
                {/* Role Badge */}
                {session?.user?.role && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-3 ${getRoleBadgeColor(session.user.role)}`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {getRoleLabel(session.user.role)}
                  </span>
                )}
              </div>

              {/* Account Stats */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {locale === 'es' ? 'Miembro desde' : 'Member since'}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(session?.user?.created_at || Date.now()).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {locale === 'es' ? 'Estado' : 'Status'}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {locale === 'es' ? 'Activo' : 'Active'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {locale === 'es' ? 'Verificado' : 'Verified'}
                  </span>
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {locale === 'es' ? 'Información Personal' : 'Personal Information'}
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    {locale === 'es' ? 'Editar' : 'Edit'}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setMessage(null);
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
                      disabled={isSaving}
                    >
                      {locale === 'es' ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSaving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {locale === 'es' ? 'Guardar' : 'Save'}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === 'es' ? 'Nombre completo' : 'Full name'}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === 'es' ? 'Correo electrónico' : 'Email address'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {locale === 'es' ? 'El email no puede ser cambiado' : 'Email cannot be changed'}
                  </p>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === 'es' ? 'Teléfono' : 'Phone number'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder={locale === 'es' ? '+52 123 456 7890' : '+1 234 567 8900'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Birth Date Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === 'es' ? 'Fecha de nacimiento' : 'Date of birth'}
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Country Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === 'es' ? 'País' : 'Country'}
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="">{locale === 'es' ? 'Selecciona un país' : 'Select a country'}</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CL">Chile</option>
                    <option value="PE">Perú</option>
                    <option value="ES">España</option>
                  </select>
                </div>

                {/* Language Preference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === 'es' ? 'Idioma preferido' : 'Preferred language'}
                  </label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {locale === 'es' ? 'Seguridad' : 'Security'}
              </h3>
              
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {locale === 'es' ? 'Cambiar contraseña' : 'Change password'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {locale === 'es' ? 'Actualiza tu contraseña regularmente' : 'Update your password regularly'}
                      </p>
                    </div>
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                </button>

                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {locale === 'es' ? 'Autenticación de dos factores' : 'Two-factor authentication'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {locale === 'es' ? 'Añade una capa extra de seguridad' : 'Add an extra layer of security'}
                      </p>
                    </div>
                    <span className="text-sm text-amber-600 font-medium">
                      {locale === 'es' ? 'Configurar' : 'Setup'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}