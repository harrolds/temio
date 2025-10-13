import React, { useEffect, useState } from "react";

/**
 * HeroClock – v2 (Temio look)
 * - Card met afgeronde hoeken
 * - Donkerblauw → lichter blauw verticale gradient
 * - Ronde klok met ticks, dikkere wijzers, middenpunt
 * - Digitale tijd + subtitel "Herinnering"
 */
export default function HeroClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();

  // Rotaties (SVG 360°/60 = 6° per minuut/seconde; uur = 30° + 0.5° per minuut)
  const secAngle = s * 6;
  const minAngle = m * 6 + s * 0.1;
  const hourAngle = h * 30 + m * 0.5;

  const pad = (n) => String(n).padStart(2, "0");
  const digital = `${pad(now.getHours())}:${pad(m)}`;

  return (
    <div className="hero-clock-card hero-clock--temio">
      {/* Ronde klok */}
      <div className="hero-clock-face">
        <svg
          className="hero-clock-svg"
          viewBox="0 0 200 200"
          role="img"
          aria-label="Analoge klok"
        >
          <defs>
            {/* zachte glare op de klok */}
            <radialGradient id="faceGlow" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </radialGradient>
          </defs>

          {/* klokschijf */}
          <circle cx="100" cy="100" r="78" className="clock-face" fill="url(#faceGlow)" />

          {/* ticks (12 dikke + 60 dunne) */}
          {Array.from({ length: 60 }).map((_, i) => {
            const isHour = i % 5 === 0;
            const len = isHour ? 10 : 5;
            const strokeWidth = isHour ? 3 : 1.5;
            const angle = (i * Math.PI) / 30;
            const x1 = 100 + Math.sin(angle) * (78 - len);
            const y1 = 100 - Math.cos(angle) * (78 - len);
            const x2 = 100 + Math.sin(angle) * 78;
            const y2 = 100 - Math.cos(angle) * 78;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="tick"
                strokeWidth={strokeWidth}
              />
            );
          })}

          {/* wijzers */}
          <g className="hands">
            <line
              className="hand hour"
              x1="100"
              y1="100"
              x2="100"
              y2="58"
              transform={`rotate(${hourAngle} 100 100)`}
            />
            <line
              className="hand minute"
              x1="100"
              y1="100"
              x2="100"
              y2="38"
              transform={`rotate(${minAngle} 100 100)`}
            />
            <line
              className="hand second"
              x1="100"
              y1="108"
              x2="100"
              y2="26"
              transform={`rotate(${secAngle} 100 100)`}
            />
            <circle className="clock-center" cx="100" cy="100" r="4.5" />
          </g>
        </svg>
      </div>

      {/* Digitale tijd + subtitel */}
      <div className="hero-clock-digital">{digital}</div>
      <div className="hero-clock-subtitle">Herinnering</div>
    </div>
  );
}
