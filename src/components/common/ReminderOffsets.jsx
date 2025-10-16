import React, { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * ReminderOffsets – preset & custom vooraf-herinneringen
 * → Volledige i18n-ondersteuning
 * ✅ Veiliger gemaakt tegen undefined offsets (Sprint 2.4 fix)
 */
export default function ReminderOffsets({ offsets = [], onChange = () => {} }) {
  const { t } = useTranslation();

  const presets = [
    { label: t("offsets.presets.ontime"), value: 0 },
    { label: t("offsets.presets.10m"), value: 10 },
    { label: t("offsets.presets.1h"), value: 60 },
    { label: t("offsets.presets.1d"), value: 1440 },
    { label: t("offsets.presets.1w"), value: 10080 },
  ];

  const [custom, setCustom] = useState("");

  const toggle = (val) => {
    const safe = Array.isArray(offsets) ? offsets : [];
    if (safe.includes(val)) onChange(safe.filter((v) => v !== val));
    else onChange([...safe, val]);
  };

  const addCustom = () => {
    const n = parseInt(custom);
    if (!isNaN(n) && n > 0) {
      const safe = Array.isArray(offsets) ? offsets : [];
      onChange([...safe, n]);
    }
    setCustom("");
  };

  return (
    <div className="offsets">
      <p className="label">{t("offsets.title")}</p>
      <div className="offset-buttons">
        {presets.map((p) => (
          <button
            type="button"
            key={p.value}
            onClick={() => toggle(p.value)}
            className={
              Array.isArray(offsets) && offsets.includes(p.value)
                ? "active"
                : ""
            }
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="offset-custom">
        <input
          type="number"
          min="1"
          placeholder={t("offsets.custom")}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
        <button type="button" onClick={addCustom}>+</button>
      </div>
    </div>
  );
}
