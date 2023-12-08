import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CookiesProvider } from 'react-cookie'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </CookiesProvider>
  </React.StrictMode>
)
