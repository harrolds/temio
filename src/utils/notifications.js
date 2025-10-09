/**
 * Notifications Utility – Precision & Pulse (Sprint 2.3)
 * ------------------------------------------------------
 * Bevat alle logica voor browsernotificaties en visuele feedback.
 *  - requestPermission(): vraagt toestemming aan de gebruiker
 *  - scheduleReminder(): plant een eenvoudige browsernotificatie
 *  - toastReminder(): toont een visuele "toast" melding op het scherm
 */

export function requestPermission() {
  try {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  } catch {
    /* Silent fail - niet ondersteunde browser */
  }
}

/**
 * Toont een kleine visuele melding (toast) in het midden van het scherm.
 * Wordt gebruikt voor UX-feedback, ongeacht Notification-permissie.
 */
export function toastReminder(message = "Herinnering opgeslagen.") {
  // Verwijder eventuele oude meldingen
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Automatisch verwijderen na 3 seconden
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/**
 * Plan een lokale notificatie via de Notification API.
 * (Simpele client-side uitvoering – geen achtergrondservice)
 */
export function scheduleReminder(item) {
  try {
    if (typeof Notification === "undefined") return;

    if (Notification.permission !== "granted") {
      toastReminder("Meldingen zijn uitgeschakeld in je browserinstellingen.");
      return;
    }

    const now = new Date();
    const target = new Date(item.datum || item.expiryDate || now);
    const diffMs = target.getTime() - now.getTime();

    // Indien de datum in de toekomst ligt, plan via setTimeout
    if (diffMs > 0 && diffMs < 2147483647) {
      setTimeout(() => {
        new Notification("Herinnering: " + (item.naam || "Reminder"), {
          body: item.beschrijving || "Je geplande herinnering is nu.",
          icon: "/icons/icon-192.png",
        });
      }, diffMs);
    }
  } catch (err) {
    console.warn("Kon notificatie niet plannen:", err);
  }
}
