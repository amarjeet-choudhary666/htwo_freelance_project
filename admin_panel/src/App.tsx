import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
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
const Layout = lazy(() => import('./components/Layout'));

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
                  <Suspense fallback={<LoadingSpinner />}>
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
                  </Suspense>
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
