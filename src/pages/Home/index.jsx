import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AutoFilled,
  HuurFilled,
  GezondheidFilled,
  ContractenFilled,
  OverheidFilled,
  PlusFilled
} from "@/components/icons/FilledIcons";

/**
 * Home – platte sectie (géén achtergrond/shadow) + tegels in P&P-stijl
 */
export default function Home() {
  const { t } = useTranslation();

  const tiles = [
    { to: "/auto", icon: <AutoFilled />, label: t("pages.auto.title", "Auto") },
    { to: "/huur", icon: <HuurFilled />, label: t("pages.huur.title", "Huur") },
    { to: "/gezondheid", icon: <GezondheidFilled />, label: t("pages.gezondheid.title", "Gezondheid") },
    { to: "/contracten", icon: <ContractenFilled />, label: t("pages.contracten.title", "Contracten") },
    { to: "/overheid", icon: <OverheidFilled />, label: t("pages.overheid.title", "Overheid") },
    { to: "/diversen", icon: <PlusFilled />, label: t("pages.diversen.title", "Diversen") }
  ];

  return (
    <section className="home-section">
      <h1 className="home-title">{t("pages.home.title", "Welkom bij de Reminder App")}</h1>
      <p className="home-subtitle">{t("pages.home.subtitle", "Jouw herinneringen, overzichtelijk")}</p>

      <h3 className="home-categories-heading">{t("pages.home.categories", "Categorieën")}</h3>

      <div className="home-grid">
        {tiles.map((tile) => (
          <Link key={tile.to} to={tile.to} className="home-tile">
            <span className="tile-icon">{tile.icon}</span>
            <span className="tile-label">{tile.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
