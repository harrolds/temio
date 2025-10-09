import React from "react";
import LanguageSelect from "@/components/common/LanguageSelect";

/**
 * Header Component – Precision & Pulse (Sprint 2.3)
 * -------------------------------------------------
 * - Altijd zichtbaar bovenaan (fixed)
 * - Gebruikt kleur- en typografietokens uit styles.extra.css
 * - Bevat app-titel + taalkeuze via <LanguageSelect />
 */
export default function Header() {
  return (
    <header className="pp-header">
      <h1 className="pp-title">Temio</h1>
      <LanguageSelect />
    </header>
  );
}
