import React, { useState } from "react";

/**
 * ReminderOffsets – preset & custom vooraf-herinneringen
 */
export default function ReminderOffsets({ offsets, onChange }) {
  const presets = [
    { label: "Op tijd", value: 0 },
    { label: "10 minuten vooraf", value: 10 },
    { label: "1 uur vooraf", value: 60 },
    { label: "1 dag vooraf", value: 1440 },
    { label: "1 week vooraf", value: 10080 },
  ];

  const [custom, setCustom] = useState("");

  const toggle = (val) => {
    if (offsets.includes(val)) onChange(offsets.filter((v) => v !== val));
    else onChange([...offsets, val]);
  };

  const addCustom = () => {
    const n = parseInt(custom);
    if (!isNaN(n) && n > 0) onChange([...offsets, n]);
    setCustom("");
  };

  return (
    <div className="offsets">
      <p className="label">Vooraf-herinneringen</p>
      <div className="offset-buttons">
        {presets.map((p) => (
          <button
            type="button"
            key={p.value}
            onClick={() => toggle(p.value)}
            className={offsets.includes(p.value) ? "active" : ""}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="offset-custom">
        <input
          type="number"
          min="1"
          placeholder="Custom (minuten)"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
        <button type="button" onClick={addCustom}>+</button>
      </div>
    </div>
  );
}
