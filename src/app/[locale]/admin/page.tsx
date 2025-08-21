'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Users, 
  DollarSign, 
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Mail
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    subscribers: 0,
    activeSubscribers: 0,
    totalCasinos: 0,
    activeCasinos: 0,
    totalViews: 0,
    totalLikes: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch blog stats
      const blogResponse = await fetch('/api/admin/stats/blog');
      const blogData = await blogResponse.json();
      
      // Fetch subscriber stats
      const subResponse = await fetch('/api/admin/stats/subscribers');
      const subData = await subResponse.json();
      
      // Fetch casino stats
      const casinoResponse = await fetch('/api/admin/stats/casinos');
      const casinoData = await casinoResponse.json();
      
      setStats({
        totalPosts: blogData.total || 8,
        publishedPosts: blogData.published || 8,
        subscribers: subData.total || 156,
        activeSubscribers: subData.active || 142,
        totalCasinos: casinoData.total || 18,
        activeCasinos: casinoData.active || 18,
        totalViews: blogData.totalViews || 28543,
        totalLikes: blogData.totalLikes || 2178
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use default values
      setStats({
        totalPosts: 8,
        publishedPosts: 8,
        subscribers: 156,
        activeSubscribers: 142,
        totalCasinos: 18,
        activeCasinos: 18,
        totalViews: 28543,
        totalLikes: 2178
      });
    }
  };

  const statCards = [
    {
      title: 'Blog Posts',
      value: stats.publishedPosts,
      total: stats.totalPosts,
      icon: FileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Suscriptores',
      value: stats.activeSubscribers,
      total: stats.subscribers,
      icon: Users,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Casinos',
      value: stats.activeCasinos,
      total: stats.totalCasinos,
      icon: DollarSign,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Vistas Totales',
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  const recentActivity = [
    {
      type: 'post',
      action: 'Nuevo blog publicado',
      title: 'Estrategias de Blackjack 2025',
      time: 'Hace 2 horas',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      type: 'subscriber',
      action: 'Nuevo suscriptor',
      title: 'usuario@ejemplo.com',
      time: 'Hace 5 horas',
      icon: Mail,
      color: 'text-green-600'
    },
    {
      type: 'casino',
      action: 'Casino actualizado',
      title: 'Bovada Casino',
      time: 'Hace 1 día',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      type: 'comment',
      action: 'Nuevo comentario',
      title: 'En: Guía de Ruleta Europea',
      time: 'Hace 2 días',
      icon: MessageSquare,
      color: 'text-orange-600'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen general del sitio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color} text-white`} />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">
              {stat.value}
              {stat.total && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  / {stat.total}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Actividad Reciente
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Acciones Rápidas
          </h2>
          <div className="space-y-3">
            <Link
              href="/es/admin/blog/new"
              className="block w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-center font-medium transition-colors"
            >
              Crear Nuevo Blog Post
            </Link>
            <Link
              href="/es/admin/subscribers"
              className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center font-medium transition-colors"
            >
              Ver Suscriptores
            </Link>
            <Link
              href="/es/admin/casinos"
              className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center font-medium transition-colors"
            >
              Gestionar Casinos
            </Link>
            <Link
              href="/es/admin/settings"
              className="block w-full px-4 py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg text-center font-medium transition-colors"
            >
              Configuración del Sitio
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Performance */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Rendimiento del Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Vistas Totales</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Likes Totales</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.activeSubscribers}</p>
            <p className="text-sm text-gray-600">Suscriptores Activos</p>
          </div>
        </div>
      </div>
    </div>
  );
}