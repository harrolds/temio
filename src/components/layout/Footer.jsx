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
 * Footer IA – Home · Categorieën · Nieuw · Overzicht · Instellingen
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
    <footer>
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
    </footer>
  );
}
