import React from "react";

/**
 * Filled icon factory — houdt stijl consistent en vult automatisch met currentColor.
 */
const makeIcon = (d, viewBox = "0 0 24 24") =>
  function Icon(props) {
    const { className = "", ...rest } = props;
    return (
      <svg
        viewBox={viewBox}
        aria-hidden="true"
        focusable="false"
        className={`icon-filled ${className}`}
        {...rest}
      >
        <path d={d} fill="currentColor" />
      </svg>
    );
  };

/* ============================================================
   MAIN HOME CATEGORIES – PRECISION & PULSE DESIGN MATCH
   ============================================================ */

/* 🚗 Auto (licht afgeronde, solide wagen) */
export const AutoFilled = makeIcon(
  "M3 13.5a1.5 1.5 0 0 1 1.4-1.5l1.7-4.6A3 3 0 0 1 9 6h6a3 3 0 0 1 2.9 1.9l1.7 4.1A1.5 1.5 0 0 1 21 13.5V17a1 1 0 0 1-1 1h-.3a1.8 1.8 0 0 1-3.4 0H7.7a1.8 1.8 0 0 1-3.4 0H4a1 1 0 0 1-1-1v-3.5zm3.2-2h11.6l-1-2.3A1.5 1.5 0 0 0 15.5 8h-7a1.5 1.5 0 0 0-1.4.9l-1 2.6z"
);

/* 🏠 Huur (huis met euro) */
export const HuurFilled = makeIcon(
  "M12 3l8 6v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9l8-6zm-2.5 13.5h3a1 1 0 1 0 0-2h-1.5c-.7 0-1-.2-1-.6s.3-.6 1-.6h2a1 1 0 1 0 0-2h-1.4v-.7a1 1 0 1 0-2 0v.8c-1.1.2-1.9 1-1.9 2.2 0 1.4 1 2.4 2.8 2.4z"
);

/* 💙 Gezondheid (vol hart met lichte afronding) */
export const GezondheidFilled = makeIcon(
  "M12 21s-6.3-4.3-8.7-6.8C1.3 12.2 1.2 9.9 2.8 8.3a4.7 4.7 0 0 1 6.6 0L12 10.8l2.6-2.5a4.7 4.7 0 0 1 6.6 0c1.6 1.6 1.5 3.9-.5 5.9C18.3 16.6 12 21 12 21z"
);

/* 📄 Contracten (document met vouwhoek) */
export const ContractenFilled = makeIcon(
  "M7 2h8l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1v5h5l-5-5zm-7 8h9v2H8v-2zm0 4h9v2H8v-2z"
);

/* 🛡️ Overheid (schildvorm) */
export const OverheidFilled = makeIcon(
  "M12 2l7 3v6c0 5.4-3.4 9.2-7 9.5-3.6-.3-7-4.1-7-9.5V5l7-3z"
);

/* ➕ Diversen (plus in cirkel) */
export const PlusFilled = makeIcon(
  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0z"
);

/* ============================================================
   FOOTER NAVIGATION ICONS (consistent filled stijl)
   ============================================================ */

export const GridFilled = makeIcon(
  "M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"
);

export const ClockFilled = makeIcon(
  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5a1 1 0 1 0-2 0v4.1l3.1 1.8a1 1 0 0 0 1-1.7L13 10.3V7z"
);

export const SettingsFilled = makeIcon(
  "M12 2l2 1.2 2.4-.5 1.5 1.6-.5 2.3L19 9l1 3-1 3-1.6 1.4.5 2.3-1.5 1.6-2.4-.5L12 22l-2-1.2-2.4.5-1.5-1.6.5-2.3L5 15l-1-3 1-3 1.6-1.4-.5-2.3L7.6 3l2.4.5L12 2zm0 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
);
