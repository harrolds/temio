import React from "react";
import { useTranslation } from "react-i18next";

/**
 * DateTimeRow – gecombineerde invoer voor datum + tijd
 * → Volledige i18n-ondersteuning
 */
export default function DateTimeRow({ date, time, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="row date-time-row">
      <label>
        {t("fields.datum")}
        <input
          type="date"
          value={date}
          onChange={(e) => onChange(e.target.value, time)}
          required
        />
      </label>
      <label>
        {t("fields.tijd")}
        <input
          type="time"
          value={time}
          onChange={(e) => onChange(date, e.target.value)}
          required
        />
      </label>
    </div>
  );
}
