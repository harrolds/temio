/**
 * SlideContainer.jsx
 * Herbruikbaar slide-framework (Sprint 2.4 Batch A v2)
 *
 * Props:
 *  - listContent   → React-node voor de linkerzijde
 *  - formContent   → React-node voor de rechterzijde
 *  - view          → "list" | "form"
 *  - setView       → state-setter om te wisselen
 *  - className     → optioneel extra styling
 */
import React from "react";
import "@/styles.extra.css";

export default function SlideContainer({
  listContent,
  formContent,
  view = "list",
  setView = () => {},
  className = "",
}) {
  return (
    <div
      className={`slide-wrapper ${
        view === "form" ? "form-active" : "list-active"
      } ${className}`}
    >
      <div className="slide-page">{listContent}</div>
      <div className="slide-form">{formContent}</div>
    </div>
  );
}
