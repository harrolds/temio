import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './i18n'
import { registerPWA } from './pwa'

const root = document.getElementById('root')
createRoot(root).render(<App />)

registerPWA()
