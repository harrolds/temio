import React, { useState, useEffect } from "react";
import SectionCard from "@/components/common/SectionCard";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { requestPermission, scheduleReminder, toastReminder } from "@/utils/notifications";
import usePersistentList from "@/hooks/usePersistentList";

/**
 * Overheid Reminders Page – Precision & Pulse (Sprint 2.3)
 * ---------------------------------------------------------
 * - Herinneringen voor officiële zaken (paspoort, ID, belasting, vergunningen)
 * - Zelfde structuur als andere reminderpagina’s
 */
export default function Overheid() {
  const { t } = useTranslation();
  const formName = "overheid";
  const [draft, setDraft] = useState({ naam: "", datum: "", beschrijving: "" });
  const { items, addItem, removeItem, updateItem } = usePersistentList(`rr_reminders_${formName}`);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!draft.naam || !draft.datum) {
      toastReminder(t("overheid.validation.missingFields") || "Vul alle verplichte velden in.");
      return;
    }

    const selectedDate = new Date(draft.datum);
    if (selectedDate < new Date()) {
      toastReminder(t("overheid.validation.datePast") || "Datum mag niet in het verleden liggen.");
      return;
    }

    if (editId) {
      updateItem(editId, draft);
      setEditId(null);
      toastReminder(t("overheid.toast.updated") || "Herinnering bijgewerkt.");
    } else {
      const newItem = { ...draft, id: uuidv4() };
      addItem(newItem);
      scheduleReminder(newItem);
      toastReminder(t("overheid.toast.created") || "Herinnering toegevoegd.");
    }

    setDraft({ naam: "", datum: "", beschrijving: "" });
  };

  const handleEdit = (item) => {
    setDraft(item);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    removeItem(id);
    toastReminder(t("overheid.toast.deleted") || "Herinnering verwijderd.");
  };

  return (
    <SectionCard title={t("pages.overheid.title", "Overheid Herinneringen")}>
      <form onSubmit={handleSubmit}>
        <label>
          {t("overheid.fields.naam") || "Naam"}
          <input
            type="text"
            value={draft.naam}
            onChange={(e) => setDraft({ ...draft, naam: e.target.value })}
            placeholder={t("overheid.placeholders.naam") || "Bijv. Paspoort verlengen"}
            required
          />
        </label>

        <label>
          {t("overheid.fields.datum") || "Datum"}
          <input
            type="date"
            value={draft.datum}
            onChange={(e) => setDraft({ ...draft, datum: e.target.value })}
            required
          />
        </label>

        <label>
          {t("overheid.fields.beschrijving") || "Beschrijving"}
          <textarea
            value={draft.beschrijving}
            onChange={(e) => setDraft({ ...draft, beschrijving: e.target.value })}
            placeholder={t("overheid.placeholders.beschrijving") || "Optionele notitie"}
          />
        </label>

        <button type="submit">
          {editId
            ? t("overheid.buttons.bijwerken") || "Bijwerken"
            : t("overheid.buttons.opslaan") || "Opslaan"}
        </button>
      </form>

      <div className="card-list mt-3">
        {items.length === 0 && (
          <p className="text-muted">
            {t("overheid.noReminders") || "Nog geen herinneringen toegevoegd."}
          </p>
        )}
        {items.map((item) => (
          <div key={item.id} className="card-item">
            <strong>{item.naam}</strong>
            <p>{item.datum}</p>
            {item.beschrijving && <p className="text-muted">{item.beschrijving}</p>}
            <div className="mt-2">
              <button type="button" onClick={() => handleEdit(item)}>
                {t("overheid.buttons.bewerken") || "Bewerken"}
              </button>
              <button type="button" onClick={() => handleDelete(item.id)}>
                {t("overheid.buttons.verwijderen") || "Verwijderen"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
