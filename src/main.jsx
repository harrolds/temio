import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './styles.extra.css'   // ✅ Precision & Pulse design tokens + layout
import './i18n'
import { registerPWA } from './pwa'

const root = document.getElementById('root')
createRoot(root).render(<App />)

registerPWA()
