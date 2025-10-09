import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClockFilled } from "@/components/icons/FilledIcons";

/**
 * HeroClock
 * - Toont huidige tijd en datum, automatisch geüpdatet
 * - Respecteert i18n taal voor datum/tijd opmaak
 * - Subtiele animatie bij tik en bij mount
 */
export default function HeroClock() {
  const { i18n } = useTranslation();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const lang = i18n?.language || "nl";
  const time = new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(now);
  const date = new Intl.DateTimeFormat(lang, { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(now);

  return (
    <div className="hero-clock fade-in" aria-live="polite">
      <div className="hero-clock__icon" aria-hidden="true"><ClockFilled /></div>
      <div className="hero-clock__meta">
        <div className="hero-clock__time">{time}</div>
        <div className="hero-clock__date microtype-subtle">{date}</div>
      </div>
    </div>
  );
}
