const KEYS = ['rr_reminders_auto','rr_reminders_huur','rr_reminders_gezonheid','rr_reminders_contracten','rr_reminders_overheid','rr_reminders_gezondheid'];

function ensure(item) {
  const out = { ...item };
  const expiry = item.einddatum || item.vervaldatum || item.datum;
  if (expiry && !out.expiryDate) {
    out.expiryDate = expiry;
  }
  // defaults
  if (!out.remindFrom && out.expiryDate) {
    const d = new Date(out.expiryDate);
    if (isFinite(d)) { d.setDate(d.getDate()-14); out.remindFrom = d.toISOString().slice(0,10); }
  }
  if (!out.repeat) out.repeat = 'weekly';
  if (!out.notifyTime) out.notifyTime = '09:00';
  if (!out.notifyType) out.notifyType = 'pwa';
  if (typeof out.stopAfterExpiry === 'undefined') out.stopAfterExpiry = true;
  return out;
}

export function migrateAll() {
  try {
    for (const key of KEYS) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      let arr = [];
      try { arr = JSON.parse(raw) || []; } catch { arr = []; }
      const next = arr.map(ensure);
      localStorage.setItem(key, JSON.stringify(next));
    }
  } catch {}
}
