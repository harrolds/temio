import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Grid, PlusCircle, Clock, Settings } from "lucide-react";

/**
 * Definitieve Footer-component volgens Precision & Pulse design
 * - 5 vaste iconbuttons
 * - centrale "+" knop benadrukt toevoegen
 * - scroll-aware via prop `hidden`
 */
export default function Footer({ hidden = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const classes = ["pp-footer", hidden ? "hidden" : ""].join(" ");

  return (
    <footer className={classes}>
      <nav className="pp-footer-nav">
        <button
          onClick={() => navigate("/")}
          className={isActive("/") ? "active" : ""}
          aria-label="Home"
        >
          <Home />
        </button>
        <button
          onClick={() => navigate("/categories")}
          className={isActive("/categories") ? "active" : ""}
          aria-label="Categorieën"
        >
          <Grid />
        </button>
        <button
          onClick={() => navigate("/add")}
          className="pp-footer-add"
          aria-label="Nieuwe herinnering"
        >
          <PlusCircle />
        </button>
        <button
          onClick={() => navigate("/agenda")}
          className={isActive("/agenda") ? "active" : ""}
          aria-label="Agenda"
        >
          <Clock />
        </button>
        <button
          onClick={() => navigate("/settings")}
          className={isActive("/settings") ? "active" : ""}
          aria-label="Instellingen"
        >
          <Settings />
        </button>
      </nav>
    </footer>
  );
}
