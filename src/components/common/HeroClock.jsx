import React, { useEffect, useState } from "react";

/**
 * HeroClock – Sprint 2.4 Precision & Pulse v2.1
 * -------------------------------------------------
 * - Themakleur via var(--color-header)
 * - Analoge klok met wijzers (SVG)
 * - Digitale tijd (HH:MM)
 * - Geen datum of label
 */
export default function HeroClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = seconds * 6; // 360 / 60
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = ((hours % 12) / 12) * 360 + minutes * 0.5;

  const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="hero-clock-card fade-in" style={{ backgroundColor: "var(--color-header)" }}>
      <div className="hero-clock-face">
        <svg viewBox="0 0 100 100" className="hero-clock-svg" aria-hidden="true">
          <circle className="clock-bg" cx="50" cy="50" r="48" />
          <line
            className="hand hour"
            x1="50"
            y1="50"
            x2="50"
            y2="30"
            style={{ transform: `rotate(${hourDeg}deg)`, transformOrigin: "50% 50%" }}
          />
          <line
            className="hand minute"
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            style={{ transform: `rotate(${minuteDeg}deg)`, transformOrigin: "50% 50%" }}
          />
          <line
            className="hand second"
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            style={{ transform: `rotate(${secondDeg}deg)`, transformOrigin: "50% 50%" }}
          />
          <circle className="clock-center" cx="50" cy="50" r="2.5" />
        </svg>
      </div>

      <div className="hero-clock-digital">{formattedTime}</div>
    </div>
  );
}
