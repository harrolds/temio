import React from "react";
import { Link } from "react-router-dom";
import LanguageSelect from "@/components/common/LanguageSelect";

export default function Header() {
  return (
    <header className="pp-header">
      <Link to="/" className="pp-title">Temio</Link>
      <LanguageSelect />
    </header>
  );
}
