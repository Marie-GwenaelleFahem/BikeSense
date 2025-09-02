import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import ReactAuthProvider from 'react-auth-kit/AuthProvider'
import createAuthStore from 'react-auth-kit/store/createAuthStore'

const authStore = createAuthStore('cookie', {
  authName: '_bikesense_auth',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactAuthProvider store={authStore}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ReactAuthProvider>
  </StrictMode>,
)
