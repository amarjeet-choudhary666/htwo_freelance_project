import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import './App.css';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Partners = lazy(() => import('./pages/Partners'));
const Users = lazy(() => import('./pages/Users'));
const Services = lazy(() => import('./pages/Services'));
const Categories = lazy(() => import('./pages/Categories'));
const Submissions = lazy(() => import('./pages/Submissions'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Please refresh the page or try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch('/api/v1/users/admin/verify', {
          credentials: 'include',
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (isMounted) {
          setIsAuthenticated(response.ok);
        }
      } catch (error: any) {
        if (isMounted && error?.name !== 'AbortError') {
          console.error('Auth check failed:', error);
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Suspense fallback={<LoadingSpinner />}>
                  <Login onLogin={() => setIsAuthenticated(true)} />
                </Suspense>
              } 
            />
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <Layout onLogout={() => setIsAuthenticated(false)}>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/submissions" element={<Submissions />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/partners" element={<Partners />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/settings" element={<Settings />} />
                      </Routes>
                    </Suspense>
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;