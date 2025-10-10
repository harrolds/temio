/**
 * Storage Migration Utility – Precision & Pulse (Sprint 2.4)
 * ----------------------------------------------------------
 * Zorgt dat bestaande data uit oudere appversies behouden blijft
 * en wordt overgezet naar de juiste sleutelstructuur + datamodel.
 *
 * Fase 1  → migratie van oude sleutelnamen
 * Fase 2  → aanvullen van ontbrekende velden in reminder-objecten
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
 * Zet foutieve of oude sleutel om naar de nieuwe naam.
 */
function normalizeKey(key) {
  if (key.includes("gezonheid")) return "rr_reminders_gezondheid";
  return key;
}

/**
 * Migreert alle lokale data naar correcte sleutelstructuur (fase 1)
 * en corrigeert legacy keys.
 */
function migrateStorageKeys() {
  const migrated = {};

  LEGACY_KEYS.forEach((key) => {
    const data = localStorage.getItem(key);
    if (!data) return;

    try {
      const parsed = JSON.parse(data);
      const newKey = normalizeKey(key);

      if (Array.isArray(parsed) && parsed.length > 0) {
        // Alleen migreren indien nog niet aanwezig
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
    console.info("✅ Sleutel-migratie voltooid:", migrated);
  }
}

/**
 * Migreert reminder-objecten binnen elke geldige key naar nieuw datamodel.
 * (fase 2)
 */
function migrateReminderFields() {
  const defaults = {
    tijd: "09:00",
    offsets: [1440], // 1 dag vooraf
    repeat: "none"
  };

  VALID_KEYS.forEach((key) => {
    const data = localStorage.getItem(key);
    if (!data) return;

    try {
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return;

      let changed = false;

      const migrated = parsed.map((item) => {
        const updated = { ...item };

        if (!updated.tijd) {
          updated.tijd = defaults.tijd;
          changed = true;
        }

        if (!Array.isArray(updated.offsets)) {
          updated.offsets = defaults.offsets;
          changed = true;
        }

        if (!updated.repeat) {
          updated.repeat = defaults.repeat;
          changed = true;
        }

        return updated;
      });

      if (changed) {
        localStorage.setItem(key, JSON.stringify(migrated));
        console.info(`🔄 ${key} gemigreerd naar nieuw datamodel (${migrated.length} items).`);
      }
    } catch (err) {
      console.warn(`⚠️ Kon reminders in ${key} niet migreren:`, err);
    }
  });
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

/**
 * Publieke migratie-functie (fase 1 + fase 2)
 * Wordt aangeroepen bij app-start of versie-update.
 */
export function migrateStorage() {
  try {
    migrateStorageKeys();     // Fase 1
    migrateReminderFields();  // Fase 2
  } catch (err) {
    console.error("❌ Fout bij migratie van opslag:", err);
  }
}
