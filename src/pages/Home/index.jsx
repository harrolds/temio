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
 * Home – Definitieve structuur (v2.1.2)
 * - HeroClock + Categorieën-grid + TaskList
 * - Router-links i.p.v. hash anchors
 * - Volgt Precision & Pulse v2.1 tokens
 */
export default function Home() {
  const { t } = useTranslation();

  const tiles = [
    { to: "/auto", icon: <AutoFilled />, label: t("pages.auto.title") },
    { to: "/huur", icon: <HuurFilled />, label: t("pages.huur.title") },
    { to: "/gezondheid", icon: <GezondheidFilled />, label: t("pages.gezondheid.title") },
    { to: "/contracten", icon: <ContractenFilled />, label: t("pages.contracten.title") },
    { to: "/overheid", icon: <OverheidFilled />, label: t("pages.overheid.title") },
    { to: "/diversen", icon: <PlusFilled />, label: t("pages.diversen.title") }
  ];

  return (
    <main id="home-main" className="home-page">
      <div className="home-scroll-wrapper">
        <HeroClock />

        <section aria-labelledby="home-categories-title" className="home-categories">
          <h2 id="home-categories-title" className="home-category-title">
            {t("pages.home.categories")}
          </h2>

          <div className="home-tiles-grid">
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
      </div>
    </main>
  );
}
