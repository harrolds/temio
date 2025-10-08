import React from "react";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { Car, FileText, Heart, Home as HomeIcon, Landmark, Building2, Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="rr-page">
      <header className="pp-header-block">
        <h1 className="pp-app-title">temio</h1>
        <p className="pp-subtitle">{t("pages.home.subtitle", "Jouw herinneringen, overzichtelijk")}</p>
      </header>

      <section className="pp-section">
        <h2>{t("pages.home.categories", "Categorieën")}</h2>
        <div className="rr-grid-cards">
          <Link to="/auto" className="pp-card pp-card-link">
            <Car size={32} />
            <span>{t("pages.auto.title", "Auto")}</span>
          </Link>
          <Link to="/huur" className="pp-card pp-card-link">
            <Building2 size={32} />
            <span>{t("pages.huur.title", "Huur")}</span>
          </Link>
          <Link to="/gezondheid" className="pp-card pp-card-link">
            <Heart size={32} />
            <span>{t("pages.health.title", "Gezondheid")}</span>
          </Link>
          <Link to="/contracten" className="pp-card pp-card-link">
            <FileText size={32} />
            <span>{t("pages.contracts.title", "Contracten")}</span>
          </Link>
          <Link to="/overheid" className="pp-card pp-card-link">
            <Landmark size={32} />
            <span>{t("pages.government.title", "Overheid")}</span>
          </Link>
          <Link to="/diversen" className="pp-card pp-card-link">
            <Plus size={32} />
            <span>{t("pages.misc.title", "Diversen")}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
