  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import { BrowserRouter } from 'react-router-dom'
  import './index.css'
  import App from './App.tsx'
  import { ClerkProvider } from '@clerk/clerk-react'

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key")
  }

  const appearance = {
    baseTheme: undefined,
    variables: {
      colorPrimary: '#3b82f6',
      colorInputBackground: '#374151',
      colorInputText: '#f9fafb',
      colorText: '#343434',
      borderRadius: '1rem',
    },
    elements: {
      formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors',
      card: 'shadow-lg border border-gray-700 bg-gray-800',
      headerTitle: 'text-2xl font-bold text-white',
      headerSubtitle: 'text-gray-300',
      socialButtonsBlockButton: 'border border-gray-600 hover:border-gray-500 transition-colors bg-gray-700',
      dividerLine: 'bg-gray-600',
      dividerText: 'text-gray-400',
      formFieldInput: 'border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white',
      formFieldLabel: 'text-gray-300 font-medium',
      footerActionLink: 'text-blue-400 hover:text-blue-300',
    },
  };

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={appearance}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </StrictMode>,
  )
