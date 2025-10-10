import React from "react";
import { useTranslation } from "react-i18next";

/**
 * RepeatPicker – herhaalinstellingen
 * → Volledige i18n-ondersteuning
 */
export default function RepeatPicker({ repeat, repeatEnd, onChange }) {
  const { t } = useTranslation();

  const options = [
    { value: "none", label: t("repeat.none") },
    { value: "daily", label: t("repeat.daily") },
    { value: "weekly", label: t("repeat.weekly") },
    { value: "monthly", label: t("repeat.monthly") },
    { value: "yearly", label: t("repeat.yearly") },
  ];

  return (
    <div className="repeat-picker">
      <label>
        {t("fields.herhalen")}
        <select
          value={repeat}
          onChange={(e) => onChange(e.target.value, repeatEnd)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      {repeat !== "none" && (
        <label>
          {t("fields.eindigtOp")}
          <input
            type="date"
            value={repeatEnd}
            onChange={(e) => onChange(repeat, e.target.value)}
          />
        </label>
      )}
    </div>
  );
}
