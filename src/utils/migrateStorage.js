/**
 * Storage Migration Utility – Precision & Pulse (Sprint 2.3)
 * ----------------------------------------------------------
 * Zorgt dat bestaande data uit oudere appversies behouden blijft
 * en wordt overgezet naar de juiste sleutelstructuur.
 *
 * - Corrigeert typefouten (zoals "gezonheid" → "gezondheid")
 * - Converteert oude keys naar nieuwe uniforme namen
 * - Verwijdert verouderde keys na succesvolle migratie
 */

const LEGACY_KEYS = [
  "rr_reminders_auto",
  "rr_reminders_huur",
  "rr_reminders_gezonheid", // foutieve oude key
  "rr_reminders_contracten",
  "rr_reminders_overheid",
  "rr_reminders_gezondheid",
  "rr_reminders_diversen"
];

const VALID_KEYS = [
  "rr_reminders_auto",
  "rr_reminders_huur",
  "rr_reminders_gezondheid",
  "rr_reminders_contracten",
  "rr_reminders_overheid",
  "rr_reminders_diversen"
];

/**
 * Migreert alle lokale data naar correcte sleutelstructuur.
 * Voert tevens sanity checks uit op duplicaten en JSON-validiteit.
 */
export function migrateStorage() {
  try {
    const migrated = {};

    LEGACY_KEYS.forEach((key) => {
      const data = localStorage.getItem(key);
      if (!data) return;

      try {
        const parsed = JSON.parse(data);
        const newKey = normalizeKey(key);

        // Alleen migreren indien nog niet aanwezig of recenter
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (!localStorage.getItem(newKey)) {
            localStorage.setItem(newKey, JSON.stringify(parsed));
            migrated[newKey] = parsed.length;
          }

          // Oude sleutel verwijderen na succesvolle migratie
          if (newKey !== key) {
            localStorage.removeItem(key);
          }
        }
      } catch (err) {
        console.warn(`Kon data van ${key} niet migreren:`, err);
      }
    });

    if (Object.keys(migrated).length > 0) {
      console.info("✅ Storage migratie voltooid:", migrated);
    }
  } catch (err) {
    console.error("❌ Fout bij migratie van opslag:", err);
  }
}

/**
 * Zet foutieve of oude sleutel om naar de nieuwe naam.
 */
function normalizeKey(key) {
  if (key.includes("gezonheid")) return "rr_reminders_gezondheid";
  return key;
}

/**
 * Hulpfunctie om ontbrekende opslag aan te maken indien leeg.
 * (voorkomt runtime errors bij eerste gebruik)
 */
export function ensureStorageDefaults() {
  VALID_KEYS.forEach((key) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  });
}
