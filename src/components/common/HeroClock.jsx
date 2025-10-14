import React, { useEffect, useState } from "react";

/**
 * HeroClock – Temio v3 (volledig volgens ontwerp)
 * Witte klok met dikke blauwe rand, blauwe wijzers en 5-minuten indicators.
 * Versie 2.5 fix: klok schaalt automatisch met viewport-breedte/hoogte (class .responsive).
 */
export default function HeroClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();

  // hoeken t.o.v. 12-uurspositie
  const hourAngle = (h + m / 60) * 30; // 360/12
  const minuteAngle = (m + s / 60) * 6;
  const secondAngle = s * 6;

  const pad = (n) => String(n).padStart(2, "0");
  const digital = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  return (
    <div className="hero-clock-card hero-clock--temio responsive">
      <div className="hero-clock-face">
        <svg
          className="hero-clock-svg"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* klokachtergrond */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="#ffffff"
            stroke="var(--color-header-bg)"
            strokeWidth="10"
          />

          {/* 5-minuten indicators */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * Math.PI) / 6; // 30°
            const inner = 74;
            const outer = 84;
            const x1 = 100 + Math.sin(angle) * inner;
            const y1 = 100 - Math.cos(angle) * inner;
            const x2 = 100 + Math.sin(angle) * outer;
            const y2 = 100 - Math.cos(angle) * outer;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-header-bg)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            );
          })}

          {/* wijzers */}
          <g className="hands">
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="55"
              stroke="var(--color-header-bg)"
              strokeWidth="7"
              strokeLinecap="round"
              transform={`rotate(${hourAngle} 100 100)`}
            />
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="35"
              stroke="var(--color-header-bg)"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${minuteAngle} 100 100)`}
            />
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="25"
              stroke="var(--color-header-bg)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
              transform={`rotate(${secondAngle} 100 100)`}
            />
            <circle cx="100" cy="100" r="5" fill="var(--color-header-bg)" />
          </g>
        </svg>
      </div>

      <div className="hero-clock-digital">{digital}</div>
      <div className="hero-clock-subtitle">Herinnering</div>
    </div>
  );
}
