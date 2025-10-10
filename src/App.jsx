import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auto from "./pages/Auto";
import Huur from "./pages/Huur";
import Gezondheid from "./pages/Gezondheid";
import Contracten from "./pages/Contracten";
import Overheid from "./pages/Overheid";
import Diversen from "./pages/Diversen";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// ✅ Nieuw toegevoegd
import { migrateStorage, ensureStorageDefaults } from "./utils/migrateStorage";

const CURRENT_VERSION = "2.4.0"; // verhoogd om migratie voor iedereen te forceren

export default function App() {
  // ---------------------------------------------------------------------------
  // MIGRATIE – Wordt uitgevoerd bij elke app-start (of bij versie-update)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    try {
      const storedVersion = localStorage.getItem("temio_version");

      // Altijd storage defaults garanderen
      ensureStorageDefaults();

      // Fase 1 + 2 migratie uitvoeren
      migrateStorage();

      // Versie opslaan (voor toekomstige conditionele logica)
      if (storedVersion !== CURRENT_VERSION) {
        localStorage.setItem("temio_version", CURRENT_VERSION);
        console.info(`[Temio] App-versie bijgewerkt naar ${CURRENT_VERSION}`);
      }
    } catch (err) {
      console.error("[Temio] Fout tijdens initiële migratie:", err);
    }
  }, []);

  // ---------------------------------------------------------------------------
  // ROUTING STRUCTUUR
  // ---------------------------------------------------------------------------
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auto" element={<Auto />} />
            <Route path="/huur" element={<Huur />} />
            <Route path="/gezondheid" element={<Gezondheid />} />
            <Route path="/contracten" element={<Contracten />} />
            <Route path="/overheid" element={<Overheid />} />
            <Route path="/diversen" element={<Diversen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
