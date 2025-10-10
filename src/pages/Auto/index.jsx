import React, { useState, useEffect } from "react";
import SectionCard from "@/components/common/SectionCard";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import {
  requestPermission,
  scheduleReminder,
  toastReminder,
} from "@/utils/notifications";
import usePersistentList from "@/hooks/usePersistentList";
import DateTimeRow from "@/components/common/DateTimeRow";
import ReminderOffsets from "@/components/common/ReminderOffsets";
import RepeatPicker from "@/components/common/RepeatPicker";
import "./auto.css";

/**
 * Auto Reminders Page – Sprint 2.4 (P&P-UX-versie)
 * -------------------------------------------------
 * Behoudt volledige functionaliteit maar met vernieuwde
 * Precision & Pulse-huisstijl en UX-gedrag:
 * - Floating Action Button (FAB)
 * - Overlay-formulier
 * - 2-koloms grid vanaf 400 px
 */
export default function Auto() {
  const { t } = useTranslation();
  const formName = "auto";
  const { items, addItem, removeItem, updateItem } = usePersistentList(
    `rr_reminders_${formName}`
  );

  const [draft, setDraft] = useState({
    naam: "",
    datum: "",
    tijd: "09:00",
    beschrijving: "",
    offsets: [0, 1440],
    repeat: "none",
    repeatEnd: "",
    prioriteit: "normaal",
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const resetDraft = () =>
    setDraft({
      naam: "",
      datum: "",
      tijd: "09:00",
      beschrijving: "",
      offsets: [0, 1440],
      repeat: "none",
      repeatEnd: "",
      prioriteit: "normaal",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!draft.naam || !draft.datum) {
      toastReminder(
        t("auto.validation.missingFields") || "Vul alle verplichte velden in."
      );
      return;
    }
    const selectedDate = new Date(`${draft.datum}T${draft.tijd}`);
    if (selectedDate < new Date()) {
      toastReminder(
        t("auto.validation.datePast") ||
          "Datum/tijd mag niet in het verleden liggen."
      );
      return;
    }

    const newItem = { ...draft, id: editId || uuidv4() };

    if (editId) {
      updateItem(editId, newItem);
      setEditId(null);
      toastReminder(t("auto.toast.updated") || "Herinnering bijgewerkt.");
    } else {
      addItem(newItem);
      scheduleReminder(newItem);
      toastReminder(t("auto.toast.created") || "Herinnering toegevoegd.");
    }

    resetDraft();
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setDraft(item);
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    removeItem(id);
    toastReminder(t("auto.toast.deleted") || "Herinnering verwijderd.");
  };

  return (
    <SectionCard title={t("pages.auto.title", "Auto")}>
      {/* Floating Action Button */}
      <button
        className="fab"
        aria-label={t("auto.buttons.nieuw") || "Nieuwe herinnering"}
        onClick={() => setShowForm(true)}
      >
        ＋
      </button>

      {/* Formulier Overlay */}
      {showForm && (
        <div className="form-overlay" onClick={() => setShowForm(false)}>
          <form
            className="form-card"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h2>
              {editId
                ? t("auto.buttons.bijwerken") || "Herinnering bijwerken"
                : t("auto.buttons.nieuw") || "Nieuwe herinnering"}
            </h2>

            <label>
              {t("auto.fields.naam") || "Naam"}
              <input
                type="text"
                value={draft.naam}
                onChange={(e) => setDraft({ ...draft, naam: e.target.value })}
                placeholder={
                  t("auto.placeholders.naam") || "Bijv. APK keuring"
                }
                required
              />
            </label>

            <DateTimeRow
              date={draft.datum}
              time={draft.tijd}
              onChange={(d, t) => setDraft({ ...draft, datum: d, tijd: t })}
            />

            <ReminderOffsets
              offsets={draft.offsets}
              onChange={(v) => setDraft({ ...draft, offsets: v })}
            />

            <RepeatPicker
              repeat={draft.repeat}
              repeatEnd={draft.repeatEnd}
              onChange={(r, end) =>
                setDraft({ ...draft, repeat: r, repeatEnd: end })
              }
            />

            <label>
              {t("auto.fields.beschrijving") || "Notitie"}
              <textarea
                value={draft.beschrijving}
                onChange={(e) =>
                  setDraft({ ...draft, beschrijving: e.target.value })
                }
                placeholder={
                  t("auto.placeholders.beschrijving") || "Optionele notitie"
                }
              />
            </label>

            <label>
              {t("auto.fields.prioriteit") || "Prioriteit"}
              <select
                value={draft.prioriteit}
                onChange={(e) =>
                  setDraft({ ...draft, prioriteit: e.target.value })
                }
              >
                <option value="laag">
                  {t("auto.priority.low") || "Laag"}
                </option>
                <option value="normaal">
                  {t("auto.priority.normal") || "Normaal"}
                </option>
                <option value="hoog">
                  {t("auto.priority.high") || "Hoog"}
                </option>
              </select>
            </label>

            <div className="form-buttons">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  resetDraft();
                }}
              >
                {t("auto.buttons.annuleren") || "Annuleren"}
              </button>
              <button type="submit" className="btn-primary">
                {t("auto.buttons.opslaan") || "Opslaan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lijstweergave */}
      <div className="reminder-grid">
        {items.length === 0 && (
          <p className="text-muted">
            {t("auto.noReminders") ||
              "Nog geen herinneringen toegevoegd."}
          </p>
        )}
        {items.map((item) => (
          <div key={item.id} className="reminder-card">
            <div className="reminder-header">
              <strong>{item.naam}</strong>
              <p className="reminder-date">
                {item.datum} {item.tijd}
              </p>
            </div>

            {item.beschrijving && (
              <p className="text-muted small">{item.beschrijving}</p>
            )}

            <p className="small">
              {item.repeat !== "none" &&
                `🔁 ${t("repeat." + item.repeat) || item.repeat}`}
              {item.prioriteit === "hoog" && " ⚠️"}
            </p>

            <div className="card-actions">
              <button
                type="button"
                onClick={() => handleEdit(item)}
                className="btn-edit"
              >
                {t("auto.buttons.bewerken") || "Bewerken"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="btn-delete"
              >
                {t("auto.buttons.verwijderen") || "Verwijderen"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
