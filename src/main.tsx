import React from 'react'
import ReactDOM from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import { HelmetProvider } from 'react-helmet-async'

import App from './App.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </CookiesProvider>
  </React.StrictMode>
)
