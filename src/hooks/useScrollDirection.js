/* ================================================================
   Hook: useScrollDirection
   Sprint 2.3 – Temio / Reminder App
   ================================================================ */

import { useState, useEffect } from "react";

/**
 * useScrollDirection
 * Detecteert of de gebruiker naar boven of beneden scrolt.
 * Retourneert "up" of "down".
 *
 * @param {number} threshold - aantal pixels verschil voordat update plaatsvindt
 */
export default function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateDirection = () => {
      const scrollY = window.scrollY;
      // negeer kleine schommelingen
      if (Math.abs(scrollY - lastScrollY) < threshold) return;

      const newDirection = scrollY > lastScrollY ? "down" : "up";
      if (newDirection !== direction) setDirection(newDirection);

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateDirection);
    return () => window.removeEventListener("scroll", updateDirection);
  }, [direction, threshold]);

  return direction;
}
