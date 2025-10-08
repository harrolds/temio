import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import useScrollDirection from "@/hooks/useScrollDirection";

/**
 * Layout-component
 * - behoudt bestaande structuur met Header en Footer
 * - voegt scroll-aware gedrag toe aan de footer
 */
export default function Layout({ children }) {
  const scrollDir = useScrollDirection(); // "up" | "down"

  return (
    <div className="app-container">
      <Header />
      <main className="app-main">{children}</main>
      {/* doorgeven van de scrollstatus aan de footer */}
      <Footer hidden={scrollDir === "down"} />
    </div>
  );
}
