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
import { migrateStorage, ensureStorageDefaults } from "@/utils/migrateStorage";

/**
 * Tijdelijke placeholders voor toekomstige Precision & Pulse-modules
 */
function Categories() {
  return (
    <div className="rr-page">
      <h2>Categorieën</h2>
      <p>Overzicht van alle categorieën (in ontwikkeling)</p>
    </div>
  );
}
function Add() {
  return (
    <div className="rr-page">
      <h2>Nieuwe herinnering</h2>
      <p>Formulier voor directe toevoeging (in ontwikkeling)</p>
    </div>
  );
}
function Agenda() {
  return (
    <div className="rr-page">
      <h2>Agenda</h2>
      <p>Weergave van geplande herinneringen (in ontwikkeling)</p>
    </div>
  );
}
function Settings() {
  return (
    <div className="rr-page">
      <h2>Instellingen</h2>
      <p>Profiel, thema en voorkeuren (in ontwikkeling)</p>
    </div>
  );
}

/**
 * Sprint 2.3 – gecontroleerde localStorage-reset en migratie
 * -----------------------------------------------------------
 * - Verwijdert oude keys uit eerdere builds
 * - Voert migratie & default-initialisatie uit via migrateStorage()
 */
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
      migrateStorage();
      ensureStorageDefaults();
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

          {/* Nieuwe Precision & Pulse-footer routes */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/add" element={<Add />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
