import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Auto from '@/pages/Auto'
import Contracten from '@/pages/Contracten'
import Gezondheid from '@/pages/Gezondheid'
import Huur from '@/pages/Huur'
import Overheid from '@/pages/Overheid'
import { migrateAll } from '@/utils/migrateStorage'

// sprint2-final localStorage reset (2025-10-06)
try {
  const VERSION_KEY = 'reminder-app-version';
  const CURRENT_VERSION = 'v11-logic-upgrade';
  const prev = localStorage.getItem(VERSION_KEY);
  if (prev !== CURRENT_VERSION) {
    // Try to only clear app-related keys to avoid nuking unrelated data
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      // Heuristic: remove reminder-related keys and previous versions
      if (k.startsWith('reminders') || k.includes('reminder') || k === VERSION_KEY) {
        toRemove.push(k);
      } } // If nothing matched, perform a full clear to ensure a clean Sprint 2 baseline
    if (toRemove.length === 0) {
      localStorage.clear();
    } else {
      toRemove.forEach(k => localStorage.removeItem(k));
    } localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    try { migrateAll(); } catch {}
  } } catch (e) {
  console.warn('localStorage reset skipped:', e);
} export default function App() {
  return (<BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auto' element={<Auto />} />
          <Route path='/contracten' element={<Contracten />} />
          <Route path='/gezondheid' element={<Gezondheid />} />
          <Route path='/huur' element={<Huur />} />
          <Route path='/overheid' element={<Overheid />} />
        </Routes>
      </Layout>
    </BrowserRouter>)
}
