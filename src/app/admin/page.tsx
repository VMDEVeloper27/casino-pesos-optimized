import Link from 'next/link';
import { 
  Gamepad2, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Eye,
  Edit,
  BarChart,
  Settings
} from 'lucide-react';

export default function AdminDashboard() {
  // In production, fetch these from your database
  const stats = {
    totalCasinos: 38,
    activeBonuses: 38,
    totalVisits: '12,543',
    conversionRate: '3.2%'
  };

  const recentCasinos = [
    { id: 'bet365', name: 'Bet365 Casino', status: 'active', rating: 4.9 },
    { id: 'codere', name: 'Codere Casino', status: 'active', rating: 4.8 },
    { id: 'caliente', name: 'Caliente Casino', status: 'active', rating: 4.7 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400">Welcome to CasinosPesos Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded">
              +12%
            </span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalCasinos}</div>
          <div className="text-sm text-neutral-400">Total Casinos</div>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-accent" />
            <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded">
              Active
            </span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.activeBonuses}</div>
          <div className="text-sm text-neutral-400">Active Bonuses</div>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-primary" />
            <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded">
              +23%
            </span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalVisits}</div>
          <div className="text-sm text-neutral-400">Total Visits</div>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-accent" />
            <span className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded">
              +0.5%
            </span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.conversionRate}</div>
          <div className="text-sm text-neutral-400">Conversion Rate</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Casinos */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Casinos</h2>
            <Link
              href="/admin/casinos"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View All →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentCasinos.map((casino) => (
              <div
                key={casino.id}
                className="flex items-center justify-between p-4 bg-neutral-700/50 rounded-lg"
              >
                <div>
                  <div className="font-semibold text-white">{casino.name}</div>
                  <div className="text-sm text-neutral-400">
                    Rating: {casino.rating} | Status: {casino.status}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/casinos/${casino.id}`}
                    className="p-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </Link>
                  <Link
                    href={`/admin/casinos/${casino.id}/edit`}
                    className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 text-primary" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/casinos/new"
              className="flex flex-col items-center justify-center p-6 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors group"
            >
              <Plus className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white">Add Casino</span>
            </Link>
            
            <Link
              href="/admin/bonuses/new"
              className="flex flex-col items-center justify-center p-6 bg-accent/20 hover:bg-accent/30 rounded-lg transition-colors group"
            >
              <Plus className="w-8 h-8 text-accent mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white">Add Bonus</span>
            </Link>
            
            <Link
              href="/admin/analytics"
              className="flex flex-col items-center justify-center p-6 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors group"
            >
              <BarChart className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white">Analytics</span>
            </Link>
            
            <Link
              href="/admin/settings"
              className="flex flex-col items-center justify-center p-6 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors group"
            >
              <Settings className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}