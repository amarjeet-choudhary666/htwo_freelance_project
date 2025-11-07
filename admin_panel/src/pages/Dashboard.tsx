import { useState, useEffect } from 'react';
import { Users, Handshake, Server, TrendingUp, Activity, Clock, FileText, MessageSquare, Phone } from 'lucide-react';
import { dashboardAPI } from '../api/admin';
import type { DashboardStats } from '../types/admin';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPartners: 0,
    approvedPartners: 0,
    pendingPartners: 0,
    totalServices: 0,
    activeServices: 0,
    totalSubmissions: 0,
    demoRequests: 0,
    contactForms: 0,
    getInTouch: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Partners',
      value: stats.totalPartners,
      icon: Handshake,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Approved Partners',
      value: stats.approvedPartners,
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Pending Partners',
      value: stats.pendingPartners,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Total Services',
      value: stats.totalServices,
      icon: Server,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
    },
    {
      title: 'Active Services',
      value: stats.activeServices,
      icon: Activity,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      title: 'Total Submissions',
      value: stats.totalSubmissions,
      icon: FileText,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      title: 'Demo Requests',
      value: stats.demoRequests,
      icon: MessageSquare,
      color: 'bg-teal-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
    },
    {
      title: 'Contact Forms',
      value: stats.contactForms,
      icon: Phone,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
    },
    {
      title: 'Get In Touch',
      value: stats.getInTouch,
      icon: MessageSquare,
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome Back, Admin! 👋</h1>
          <p className="text-blue-100 text-lg">Here's what's happening with your platform today</p>
        </div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-soft border border-gray-100 p-6 hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {card.value.toLocaleString()}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
              </div>
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[
                { icon: Handshake, color: 'green', title: 'New partner application received', time: '2 hours ago', bg: 'bg-green-50' },
                { icon: Users, color: 'blue', title: 'New user registered', time: '4 hours ago', bg: 'bg-blue-50' },
                { icon: Server, color: 'purple', title: 'Service updated', time: '6 hours ago', bg: 'bg-purple-50' },
                { icon: FileText, color: 'orange', title: 'New submission received', time: '8 hours ago', bg: 'bg-orange-50' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className={`p-3 ${activity.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                    <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: 'Add New Partner', color: 'blue', icon: Handshake },
                { label: 'Create Service', color: 'green', icon: Server },
                { label: 'View Analytics', color: 'purple', icon: TrendingUp },
              ].map((action, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 hover:text-${action.color}-800 transition-all duration-200 group`}
                >
                  <action.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              {[
                { label: 'Server Status', status: 'Online', color: 'green' },
                { label: 'Database', status: 'Healthy', color: 'green' },
                { label: 'API Response', status: '< 100ms', color: 'blue' },
                { label: 'Uptime', status: '99.9%', color: 'green' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 bg-${item.color}-500 rounded-full animate-pulse`}></div>
                    <span className={`text-sm font-medium text-${item.color}-600`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;