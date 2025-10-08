import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Auto from "@/pages/Auto";
import Contracten from "@/pages/Contracten";
import Gezondheid from "@/pages/Gezondheid";
import Huur from "@/pages/Huur";
import Overheid from "@/pages/Overheid";
import Diversen from "@/pages/Diversen";
import { migrateAll } from "@/utils/migrateStorage";

// Sprint 2.3 — logica: gecontroleerde localStorage reset en migratie
try {
  const VERSION_KEY = "reminder-app-version";
  const CURRENT_VERSION = "v12-precision-pulse";
  const prev = localStorage.getItem(VERSION_KEY);

  if (prev !== CURRENT_VERSION) {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      if (k.startsWith("reminders") || k.includes("reminder") || k === VERSION_KEY) {
        toRemove.push(k);
      }
    }
    if (toRemove.length === 0) {
      localStorage.clear();
    } else {
      toRemove.forEach((k) => localStorage.removeItem(k));
    }
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    try {
      migrateAll();
    } catch (e) {
      console.warn("Migration error:", e);
    }
  }
} catch (e) {
  console.warn("localStorage reset skipped:", e);
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auto" element={<Auto />} />
          <Route path="/huur" element={<Huur />} />
          <Route path="/gezondheid" element={<Gezondheid />} />
          <Route path="/contracten" element={<Contracten />} />
          <Route path="/overheid" element={<Overheid />} />
          <Route path="/diversen" element={<Diversen />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
