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
import HeroClock from "@/components/common/HeroClock";
import TaskList from "@/components/common/TaskList";

/**
 * Home – Sprint 2.4 Visual Refinement
 * - Nieuwe HeroClock met wijzers + digitale tijd
 * - Categorieën bovenaan, TaskList eronder
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
    <section className="home-section fade-in">
      <header className="home-hero">
        <h1 className="home-title microtype-tight">{t("pages.home.title", "Welkom bij de Reminder App")}</h1>
        <p className="home-subtitle microtype-subtle">
          {t("pages.home.subtitle", "Jouw herinneringen, overzichtelijk")}
        </p>
      </header>

      {/* HeroClock Card */}
      <HeroClock />

      {/* Categorieën */}
      <h3 className="home-categories-heading microtype-caps">
        {t("pages.home.categories", "Categorieën")}
      </h3>
      <div className="home-grid">
        {tiles.map((tile) => (
          <Link key={tile.to} to={tile.to} className="home-tile hover-raise">
            <span className="tile-icon">{tile.icon}</span>
            <span className="tile-label">{tile.label}</span>
          </Link>
        ))}
      </div>

      {/* TaskList onder de categorieën */}
      <TaskList limit={6} />
    </section>
  );
}
