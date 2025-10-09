import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

/* 1) Styles: basis eerst, dan extra (overrides & components) */
import "./styles.css";
import "./styles.extra.css";

/* 2) i18n & PWA bootstrap */
import "./i18n";
import "./pwa";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
