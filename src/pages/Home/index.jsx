import React from "react";
import { Link } from "react-router-dom";
import SectionCard from "@/components/common/SectionCard";
import { useTranslation } from "react-i18next";
import {
  AutoFilled,
  HuurFilled,
  GezondheidFilled,
  ContractenFilled,
  OverheidFilled,
  PlusFilled
} from "@/components/icons/FilledIcons";

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
    <SectionCard title={t("pages.home.title", "Welkom bij de Reminder App")}>
      <p className="text-muted mb-3">{t("pages.home.subtitle", "Jouw herinneringen, overzichtelijk")}</p>
      <h3 className="mb-2">{t("pages.home.categories", "Categorieën")}</h3>

      <div className="home-grid">
        {tiles.map((tile) => (
          <Link key={tile.to} to={tile.to} className="home-tile">
            <span className="tile-icon">{tile.icon}</span>
            <span>{tile.label}</span>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
}
