import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeFilled,
  GridFilled,
  PlusFilled,
  ClockFilled,
  SettingsFilled
} from "@/components/icons/FilledIcons";

/**
 * Footer – IA conform wens:
 * Home | Categorieën | Nieuw | Overzicht (Agenda) | Instellingen
 */
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { icon: <HomeFilled />, label: "Home", path: "/" },
    { icon: <GridFilled />, label: "Categorieën", path: "/categories" },
    { icon: <PlusFilled />, label: "Nieuw", path: "/add" },
    { icon: <ClockFilled />, label: "Overzicht", path: "/agenda" },
    { icon: <SettingsFilled />, label: "Instellingen", path: "/settings" }
  ];

  const go = (p) => p && p !== location.pathname && navigate(p);

  return (
    <footer>
      {buttons.map((b) => (
        <button
          key={b.path}
          onClick={() => go(b.path)}
          aria-label={b.label}
          className={location.pathname === b.path ? "active" : ""}
        >
          {b.icon}
          <span>{b.label}</span>
        </button>
      ))}
    </footer>
  );
}
