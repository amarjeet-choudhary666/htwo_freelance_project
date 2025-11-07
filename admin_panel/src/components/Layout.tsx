import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authAPI } from '../api/admin';
import {
  Shield,
  Handshake,
  Users,
  Server,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  FolderTree,
  FileText,
  TrendingUp,
  Bell,
  Search,
  User,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const Layout = ({ children, onLogout }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; name?: string } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();

  // Fetch admin user info
  useEffect(() => {
    const fetchAdminUser = async () => {
      try {
        const response = await fetch('/api/v1/users/admin/verify', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setAdminUser({
            email: data.data?.user?.email || 'admin@example.com',
            name: data.data?.user?.firstname || data.data?.user?.email?.split('@')[0] || 'Admin User'
          });
        }
      } catch (error) {
        console.error('Error fetching admin user:', error);
        // Fallback to default
        setAdminUser({
          email: 'admin@example.com',
          name: 'Admin User'
        });
      }
    };

    fetchAdminUser();
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, color: 'text-blue-500' },
    { name: 'Submissions', href: '/submissions', icon: FileText, color: 'text-green-500' },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp, color: 'text-purple-500' },
    { name: 'Partners', href: '/partners', icon: Handshake, color: 'text-orange-500' },
    { name: 'Users', href: '/users', icon: Users, color: 'text-indigo-500' },
    { name: 'Services', href: '/services', icon: Server, color: 'text-cyan-500' },
    { name: 'Categories', href: '/categories', icon: FolderTree, color: 'text-pink-500' },
    { name: 'Settings', href: '/settings', icon: Settings, color: 'text-gray-500' },
  ];

  const handleLogout = async () => {
    if (loggingOut) return; // Prevent multiple logout attempts
    
    setLoggingOut(true);
    
    try {
      // Try to call the server logout endpoint
      try {
        await authAPI.logout();
        console.log('Server logout successful');
      } catch (serverError) {
        console.warn('Server logout failed, proceeding with client-side logout:', serverError);
      }

      // Clear any local storage or session storage
      localStorage.clear();
      sessionStorage.clear();

      // Update the authentication state
      if (onLogout) {
        onLogout();
      }
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        window.location.replace('/login');
      }, 100);
      
    } catch (error) {
      console.error('Logout error:', error);
      
      // Force logout even if everything fails
      localStorage.clear();
      sessionStorage.clear();
      
      if (onLogout) {
        onLogout();
      }
      
      window.location.replace('/login');
    } finally {
      setLoggingOut(false);
    }
  };

  const getPageTitle = () => {
    const currentPage = navigation.find(item => item.href === location.pathname);
    return currentPage?.name || 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold text-white">Admin Panel</span>
              <p className="text-xs text-blue-100">Management System</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-blue-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon
                    className={`
                      mr-4 h-5 w-5 transition-all duration-200
                      ${isActive ? 'text-white' : item.color}
                    `}
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center mb-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {adminUser?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 truncate" title={adminUser?.email}>
                {adminUser?.email || 'Loading...'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loggingOut ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600 mr-3"></div>
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-3 h-5 w-5 group-hover:transform group-hover:translate-x-1 transition-transform" />
                Logout
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Enhanced Top bar */}
        <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
                <p className="text-sm text-gray-500">Manage your application efficiently</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm w-64"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Admin User Info */}
              <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {adminUser?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {adminUser?.email || 'Loading...'}
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content with enhanced styling */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
