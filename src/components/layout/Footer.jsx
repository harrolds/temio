import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HomeFilled,
  GridFilled,
  PlusFilled,
  ClockFilled,
  SettingsFilled
} from "@/components/icons/FilledIcons";

/**
 * Footer.jsx – Sprint 2.4 / Batch 1 Herstel (100 % regelconform)
 * Wijziging:
 *  • Shadow verwijderd
 *  • Border-top via tokenkleur (--temio-border = #d8e1e4)
 *  • Geen inline-CSS of hardcoded waarden
 */
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const items = [
    { path: "/", label: t("nav.home", "Home"), icon: <HomeFilled /> },
    { path: "/categories", label: t("nav.categories", "Categorieën"), icon: <GridFilled /> },
    { path: "/add", label: t("nav.new", "Nieuw"), icon: <PlusFilled /> },
    { path: "/agenda", label: t("nav.overview", "Overzicht"), icon: <ClockFilled /> },
    { path: "/settings", label: t("nav.settings", "Instellingen"), icon: <SettingsFilled /> }
  ];

  const go = (p) => p && p !== location.pathname && navigate(p);

  return (
    <footer className="footer fixed bottom-0 left-0 right-0 bg-white border-t border-temio-border z-50">
      <nav className="flex justify-around py-2">
        {items.map((it) => (
          <button
            key={it.path}
            onClick={() => go(it.path)}
            aria-label={it.label}
            className={location.pathname === it.path ? "active" : ""}
          >
            {it.icon}
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
    </footer>
  );
}
