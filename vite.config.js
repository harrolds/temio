import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ============================================================
// Vite Config – Precision & Pulse (Sprint 2.3)
// ------------------------------------------------------------
// - Alias '@/…' verwijst naar ./src
// - Service-worker en manifest blijven in public/
// ============================================================

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "esnext"
  },
  server: {
    port: 5173,
    open: true
  }
});
