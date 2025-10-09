import React from "react";
import { useTranslation } from "react-i18next";

/**
 * LanguageSelect Component – Precision & Pulse (Sprint 2.3)
 * ---------------------------------------------------------
 * - Toont een taalselectie dropdown in de header
 * - Styling via `.lang-select` klasse (styles.extra.css)
 * - Slaat voorkeurstaal op in localStorage (rr_lang)
 * - Toegankelijk via aria-label en standaardwaarden
 */
export default function LanguageSelect() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || "nl";

  const handleChange = (e) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("rr_lang", lng);
    } catch {
      /* storage fallback */
    }
  };

  return (
    <select
      className="lang-select"
      value={current}
      onChange={handleChange}
      aria-label="Taal selecteren"
    >
      <option value="nl">Nederlands</option>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
    </select>
  );
}
