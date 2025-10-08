import React from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n } = useTranslation();

  return (
    <header className="pp-header">
      <h1 className="pp-title">temio</h1>
      <select
        aria-label="Language"
        value={i18n.language?.startsWith("nl") ? "nl" : "en"}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="nl">Nederlands</option>
        <option value="en">English</option>
      </select>
    </header>
  );
}
