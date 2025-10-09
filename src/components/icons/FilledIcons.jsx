import React from "react";

const makeIcon = (d, viewBox = "0 0 24 24") =>
  function Icon(props) {
    const { className = "", ...rest } = props;
    return (
      <svg viewBox={viewBox} aria-hidden="true" focusable="false" className={`icon-filled ${className}`} {...rest}>
        <path d={d} fill="currentColor" />
      </svg>
    );
  };

export const HomeFilled = makeIcon("M12 3.172l8 6V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1V9.172l8-6z");
export const AutoFilled = makeIcon("M5 16a2 2 0 1 0 0 4h1a2 2 0 1 0 0-4H5zm13 0a2 2 0 1 0 0 4h1a2 2 0 1 0 0-4h-1zM4.6 14l1.2-4.2A3 3 0 0 1 8.7 8h6.6a3 3 0 0 1 2.9 1.8L19.4 14H4.6zM6 12h12l-.6-1.5A1.5 1.5 0 0 0 16 9.5H8A1.5 1.5 0 0 0 6.6 10.5L6 12z");
export const HuurFilled = makeIcon("M12 3l8 6v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9l8-6zm-1.2 13.8h2.7a1 1 0 1 0 0-2h-1.3c-.8 0-1.2-.2-1.2-.7 0-.5.4-.7 1.1-.7h2.2a1 1 0 0 0 0-2h-1.6v-.8a1 1 0 1 0-2 0v.9c-1.3.3-2.2 1.2-2.2 2.5 0 1.6 1.2 2.8 3 2.8z");
export const GezondheidFilled = makeIcon("M12 21s-6.7-4.6-9.1-7.1C1.1 12 1 9.5 2.6 7.9a4.8 4.8 0 0 1 6.8 0L12 10.5l2.6-2.6a4.8 4.8 0 0 1 6.8 0c1.6 1.6 1.5 4.1-.3 6C18.7 16.4 12 21 12 21z");
export const ContractenFilled = makeIcon("M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 1v4h4l-4-4zm-6 7h8v2H8v-2zm0 4h8v2H8v-2z");
export const OverheidFilled = makeIcon("M12 3l7 3v6c0 5.2-3.2 8.7-7 9-3.8-.3-7-3.8-7-9V6l7-3z");
export const PlusFilled = makeIcon("M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0z");
export const ClockFilled = makeIcon("M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5a1 1 0 1 0-2 0v4.3l3.2 1.9a1 1 0 0 0 1-1.7L13 10.1V7z");
export const GridFilled = makeIcon("M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z");
