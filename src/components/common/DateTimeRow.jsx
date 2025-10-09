import React from "react";

/**
 * DateTimeRow – gecombineerde invoer voor datum + tijd
 */
export default function DateTimeRow({ date, time, onChange }) {
  return (
    <div className="row date-time-row">
      <label>
        Datum
        <input
          type="date"
          value={date}
          onChange={(e) => onChange(e.target.value, time)}
          required
        />
      </label>
      <label>
        Tijd
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
