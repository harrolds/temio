import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../../styles.css";
import "../../styles.extra.css";

/**
 * Layout – uniforme pagina-omhulling
 * Fix voor header/footer overlap bij slide-pages
 */
export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-content" id="rr-app">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
