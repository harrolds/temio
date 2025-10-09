import React from "react";

/**
 * SectionCard Component – Precision & Pulse (Sprint 2.3)
 * ------------------------------------------------------
 * - Gestandaardiseerd kaartlayout voor alle reminder-secties
 * - Styling volledig via CSS-klasse `.section-card`
 * - Ondersteunt optionele titel en children
 */
export default function SectionCard({ title, children }) {
  return (
    <section className="section-card">
      {title && <h2>{title}</h2>}
      <div>{children}</div>
    </section>
  );
}
