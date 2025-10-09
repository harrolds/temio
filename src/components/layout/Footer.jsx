import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, FileText, Heart, Car, Shield, PlusCircle } from "lucide-react";

/**
 * Footer Component – Precision & Pulse (Sprint 2.3)
 * -------------------------------------------------
 * - Altijd zichtbaar onderaan (vaste positie)
 * - 5 vaste icon-knoppen voor navigatie
 * - Centrale "+"-knop benadrukt het toevoegen van een reminder
 * - Volledig gestyled via tokens (zie styles.extra.css)
 */
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { icon: <Home />, label: "Home", path: "/" },
    { icon: <Car />, label: "Auto", path: "/auto" },
    { icon: <FileText />, label: "Contracten", path: "/contracten" },
    { icon: <Heart />, label: "Gezondheid", path: "/gezondheid" },
    { icon: <Shield />, label: "Overheid", path: "/overheid" },
  ];

  const handleNav = (path) => {
    if (path && path !== location.pathname) navigate(path);
  };

  return (
    <footer>
      {buttons.map((btn) => (
        <button
          key={btn.path}
          onClick={() => handleNav(btn.path)}
          aria-label={btn.label}
          className={location.pathname === btn.path ? "active" : ""}
        >
          {btn.icon}
          <span>{btn.label}</span>
        </button>
      ))}

      <button
        onClick={() => handleNav("/diversen")}
        aria-label="Nieuwe herinnering"
        title="Nieuwe herinnering"
      >
        <PlusCircle />
        <span>Nieuw</span>
      </button>
    </footer>
  );
}
