import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Auto-fill demo credentials for easier testing
  useEffect(() => {
    setEmail('amarjeetchoudhary647@gmail.com');
    setPassword('Manish');
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, nextField?: string) => {
    if (e.key === 'Tab' && nextField) {
      e.preventDefault();
      const nextElement = document.getElementById(nextField);
      nextElement?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/v1/users/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-300 text-lg">Access your admin dashboard</p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
              <Shield className="h-4 w-4" />
              <span>Secure Authentication Required</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-200">
                <Mail className="h-4 w-4 mr-2" />
                Email Address
              </label>
              <div className="relative group">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={(e) => handleKeyDown(e, 'password')}
                  className={`w-full px-4 py-4 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 backdrop-blur-sm transition-all duration-300 ${
                    focusedField === 'email' ? 'transform scale-105 shadow-lg' : ''
                  }`}
                  placeholder="Enter your admin email"
                />
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                  focusedField === 'email' ? 'text-blue-400' : 'text-gray-400'
                }`} />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-200">
                <Lock className="h-4 w-4 mr-2" />
                Password
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e as any);
                    }
                  }}
                  className={`w-full px-4 py-4 pl-12 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 backdrop-blur-sm transition-all duration-300 ${
                    focusedField === 'password' ? 'transform scale-105 shadow-lg' : ''
                  }`}
                  placeholder="Enter your password"
                />
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                  focusedField === 'password' ? 'text-blue-400' : 'text-gray-400'
                }`} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Demo Credentials Info */}
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-blue-500/30 rounded-lg">
                  <Shield className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-200">Demo Credentials</p>
                  <p className="text-xs text-blue-300 mt-1">
                    Email: amarjeetchoudhary647@gmail.com<br />
                    Password: Manish
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Access Dashboard</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </button>
          </form>

          {/* Enhanced Footer */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              <p className="text-sm font-medium">Secure Admin Access</p>
            </div>
            
            {/* Security Features */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                <Shield className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-gray-300">Encrypted</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                <Lock className="h-5 w-5 text-green-400 mx-auto mb-1" />
                <p className="text-xs text-gray-300">Secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Security Info */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-400 text-xs">
            Protected by enterprise-grade security
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span>SSL Encrypted</span>
            <span>•</span>
            <span>2FA Ready</span>
            <span>•</span>
            <span>Audit Logged</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;