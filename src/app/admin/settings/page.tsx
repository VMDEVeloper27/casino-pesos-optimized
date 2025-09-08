'use client';

import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon,
  Globe,
  Mail,
  Bell,
  Shield,
  Database,
  Palette,
  Search,
  Save,
  RefreshCw,
  Key,
  Link2,
  DollarSign,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';

interface SiteSettings {
  general: {
    siteName: string;
    siteUrl: string;
    adminEmail: string;
    timezone: string;
    dateFormat: string;
    language: string;
  };
  seo: {
    defaultTitle: string;
    titleSeparator: string;
    defaultDescription: string;
    defaultKeywords: string;
    googleAnalyticsId: string;
    googleTagManagerId: string;
    facebookPixelId: string;
    siteVerification: {
      google: string;
      bing: string;
      yandex: string;
    };
  };
  email: {
    smtpHost: string;
    smtpPort: string;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  api: {
    supabaseUrl: string;
    supabaseAnonKey: string;
    nextAuthSecret: string;
    nextAuthUrl: string;
  };
  features: {
    enableRegistration: boolean;
    enableComments: boolean;
    enableNewsletter: boolean;
    enableAffiliateLinks: boolean;
    maintenanceMode: boolean;
  };
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    faviconUrl: string;
  };
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    general: {
      siteName: 'CasinosPesos',
      siteUrl: 'https://casinospesos.com',
      adminEmail: 'admin@casinospesos.com',
      timezone: 'America/Mexico_City',
      dateFormat: 'DD/MM/YYYY',
      language: 'es'
    },
    seo: {
      defaultTitle: 'Mejores Casinos Online México 2025',
      titleSeparator: '|',
      defaultDescription: 'Descubre los mejores casinos online en México',
      defaultKeywords: 'casinos, online, méxico, bonos, juegos',
      googleAnalyticsId: '',
      googleTagManagerId: '',
      facebookPixelId: '',
      siteVerification: {
        google: '',
        bing: '',
        yandex: ''
      }
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'noreply@casinospesos.com',
      fromName: 'CasinosPesos'
    },
    api: {
      supabaseUrl: '',
      supabaseAnonKey: '',
      nextAuthSecret: '',
      nextAuthUrl: 'https://localhost:3000'
    },
    features: {
      enableRegistration: true,
      enableComments: true,
      enableNewsletter: true,
      enableAffiliateLinks: true,
      maintenanceMode: false
    },
    appearance: {
      primaryColor: '#10b981',
      secondaryColor: '#f59e0b',
      logoUrl: '/logo.png',
      faviconUrl: '/favicon.ico'
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        alert('Настройки успешно сохранены!');
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Ошибка при сохранении настроек');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'Общие', icon: SettingsIcon },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'features', label: 'Функции', icon: Shield },
    { id: 'appearance', label: 'Внешний вид', icon: Palette }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Настройки</h1>
          <p className="text-neutral-400">Управление настройками сайта</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-black rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Сохранить изменения
            </>
          )}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Общие настройки</h2>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Название сайта
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteName: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    URL сайта
                  </label>
                  <input
                    type="url"
                    value={settings.general.siteUrl}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Email администратора
                  </label>
                  <input
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, adminEmail: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Часовой пояс
                    </label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, timezone: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    >
                      <option value="America/Mexico_City">Mexico City</option>
                      <option value="America/New_York">New York</option>
                      <option value="Europe/Madrid">Madrid</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Язык по умолчанию
                    </label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, language: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Настройки SEO</h2>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Заголовок по умолчанию
                  </label>
                  <input
                    type="text"
                    value={settings.seo.defaultTitle}
                    onChange={(e) => setSettings({
                      ...settings,
                      seo: { ...settings.seo, defaultTitle: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Мета-описание по умолчанию
                  </label>
                  <textarea
                    value={settings.seo.defaultDescription}
                    onChange={(e) => setSettings({
                      ...settings,
                      seo: { ...settings.seo, defaultDescription: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Ключевые слова по умолчанию
                  </label>
                  <input
                    type="text"
                    value={settings.seo.defaultKeywords}
                    onChange={(e) => setSettings({
                      ...settings,
                      seo: { ...settings.seo, defaultKeywords: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      value={settings.seo.googleAnalyticsId}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: { ...settings.seo, googleAnalyticsId: e.target.value }
                      })}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Facebook Pixel ID
                    </label>
                    <input
                      type="text"
                      value={settings.seo.facebookPixelId}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: { ...settings.seo, facebookPixelId: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Настройки Email</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      SMTP Хост
                    </label>
                    <input
                      type="text"
                      value={settings.email.smtpHost}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, smtpHost: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      SMTP Порт
                    </label>
                    <input
                      type="text"
                      value={settings.email.smtpPort}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, smtpPort: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    SMTP Пользователь
                  </label>
                  <input
                    type="text"
                    value={settings.email.smtpUser}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpUser: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    SMTP Пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={settings.email.smtpPassword}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, smtpPassword: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* API Settings */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">API Ключи</h2>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Supabase URL
                  </label>
                  <input
                    type="text"
                    value={settings.api.supabaseUrl}
                    onChange={(e) => setSettings({
                      ...settings,
                      api: { ...settings.api, supabaseUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary font-mono text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Supabase Anon Key
                  </label>
                  <textarea
                    value={settings.api.supabaseAnonKey}
                    onChange={(e) => setSettings({
                      ...settings,
                      api: { ...settings.api, supabaseAnonKey: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary font-mono text-sm"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    NextAuth Secret
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={settings.api.nextAuthSecret}
                      onChange={(e) => setSettings({
                        ...settings,
                        api: { ...settings.api, nextAuthSecret: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary font-mono text-sm pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Features Settings */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Функции сайта</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Регистрация пользователей</div>
                      <div className="text-sm text-neutral-400">Разрешить новым пользователям регистрироваться</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.features.enableRegistration}
                      onChange={(e) => setSettings({
                        ...settings,
                        features: { ...settings.features, enableRegistration: e.target.checked }
                      })}
                      className="w-5 h-5 text-primary rounded"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Комментарии</div>
                      <div className="text-sm text-neutral-400">Включить систему комментариев</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.features.enableComments}
                      onChange={(e) => setSettings({
                        ...settings,
                        features: { ...settings.features, enableComments: e.target.checked }
                      })}
                      className="w-5 h-5 text-primary rounded"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Newsletter</div>
                      <div className="text-sm text-neutral-400">Включить подписку на рассылку</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.features.enableNewsletter}
                      onChange={(e) => setSettings({
                        ...settings,
                        features: { ...settings.features, enableNewsletter: e.target.checked }
                      })}
                      className="w-5 h-5 text-primary rounded"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Партнерские ссылки</div>
                      <div className="text-sm text-neutral-400">Показывать партнерские ссылки на казино</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.features.enableAffiliateLinks}
                      onChange={(e) => setSettings({
                        ...settings,
                        features: { ...settings.features, enableAffiliateLinks: e.target.checked }
                      })}
                      className="w-5 h-5 text-primary rounded"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div>
                      <div className="font-medium text-red-400">Режим обслуживания</div>
                      <div className="text-sm text-neutral-400">Временно закрыть сайт для посетителей</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.features.maintenanceMode}
                      onChange={(e) => setSettings({
                        ...settings,
                        features: { ...settings.features, maintenanceMode: e.target.checked }
                      })}
                      className="w-5 h-5 text-red-500 rounded"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Внешний вид</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Основной цвет
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.appearance.primaryColor}
                        onChange={(e) => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, primaryColor: e.target.value }
                        })}
                        className="w-12 h-10 bg-neutral-700 border border-neutral-600 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.appearance.primaryColor}
                        onChange={(e) => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, primaryColor: e.target.value }
                        })}
                        className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Дополнительный цвет
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, secondaryColor: e.target.value }
                        })}
                        className="w-12 h-10 bg-neutral-700 border border-neutral-600 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, secondaryColor: e.target.value }
                        })}
                        className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    URL логотипа
                  </label>
                  <input
                    type="text"
                    value={settings.appearance.logoUrl}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, logoUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    URL favicon
                  </label>
                  <input
                    type="text"
                    value={settings.appearance.faviconUrl}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, faviconUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}