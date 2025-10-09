import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeFilled,
  AutoFilled,
  ContractenFilled,
  GezondheidFilled,
  OverheidFilled,
  HuurFilled,
  PlusFilled
} from "@/components/icons/FilledIcons";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { icon: <HomeFilled />, label: "Home", path: "/" },
    { icon: <AutoFilled />, label: "Auto", path: "/auto" },
    { icon: <HuurFilled />, label: "Huur", path: "/huur" },
    { icon: <ContractenFilled />, label: "Contracten", path: "/contracten" },
    { icon: <GezondheidFilled />, label: "Gezondheid", path: "/gezondheid" },
    { icon: <OverheidFilled />, label: "Overheid", path: "/overheid" }
  ];

  const go = (p) => p && p !== location.pathname && navigate(p);

  return (
    <footer>
      {buttons.map((b) => (
        <button
          key={b.path}
          onClick={() => go(b.path)}
          aria-label={b.label}
          className={location.pathname === b.path ? "active" : ""}
        >
          {b.icon}
          <span>{b.label}</span>
        </button>
      ))}

      <button onClick={() => go("/diversen")} aria-label="Nieuwe herinnering" title="Nieuwe herinnering">
        <PlusFilled />
        <span>Nieuw</span>
      </button>
    </footer>
  );
}
