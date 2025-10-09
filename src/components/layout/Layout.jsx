import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import useScrollDirection from "@/hooks/useScrollDirection";

/**
 * Layout Component – Precision & Pulse (Sprint 2.3)
 * -------------------------------------------------
 * - Omhult alle pagina's met vaste Header en Footer
 * - Voegt automatische spacing toe zodat content nooit overlapt
 * - ScrollDirection hook behouden voor toekomstige header-animaties
 */
export default function Layout({ children }) {
  // Scroll direction hook wordt alleen gebruikt voor optionele header-effecten
  const scrollDir = useScrollDirection();

  return (
    <div className="app-layout">
      <Header scrollDir={scrollDir} />
      <main className="has-fixed-footer">{children}</main>
      <Footer />
    </div>
  );
}
