import React from "react";

/**
 * RepeatPicker – herhaalinstellingen
 */
export default function RepeatPicker({ repeat, repeatEnd, onChange }) {
  const options = [
    { value: "none", label: "Geen" },
    { value: "daily", label: "Dagelijks" },
    { value: "weekly", label: "Wekelijks" },
    { value: "monthly", label: "Maandelijks" },
    { value: "yearly", label: "Jaarlijks" },
  ];

  return (
    <div className="repeat-picker">
      <label>
        Herhalen
        <select value={repeat} onChange={(e) => onChange(e.target.value, repeatEnd)}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      {repeat !== "none" && (
        <label>
          Eindigt op
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
