import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

function BodyPortal({ children }) {
  return createPortal(children, document.body);
}

export default function Auto() {
  const { t } = useTranslation();
  const storageKey = "rr_reminders_auto";
  const { items, addItem, removeItem, updateItem } = usePersistentList(storageKey, []);

  // Form state
  const [draft, setDraft] = useState({
    id: "",
    naam: "",
    datum: "",
    tijd: "09:00",
    beschrijving: "",
    offsets: [0, 1440],
    repeat: "none",
    repeatEnd: "",
    prioriteit: "normaal",
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (showForm && firstFieldRef.current) {
      // focus het eerste veld bij openen
      firstFieldRef.current.focus();
    }
  }, [showForm]);

  const resetDraft = () =>
    setDraft({
      id: "",
      naam: "",
      datum: "",
      tijd: "09:00",
      beschrijving: "",
      offsets: [0, 1440],
      repeat: "none",
      repeatEnd: "",
      prioriteit: "normaal",
    });

  const handleOpenCreate = () => {
    resetDraft();
    setEditId(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setDraft({ ...item });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const idx = items.findIndex((x) => x.id === id);
    if (idx > -1) {
      removeItem(idx);
      toastReminder(t("auto.toast.deleted") || "Herinnering verwijderd.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!draft.naam || !draft.datum) {
      toastReminder(t("auto.validation.missingFields") || "Vul alle verplichte velden in.");
      return;
    }
    const dt = new Date(`${draft.datum}T${draft.tijd}`);
    if (isNaN(dt.getTime()) || dt < new Date()) {
      toastReminder(t("auto.validation.datePast") || "Datum/tijd mag niet in het verleden liggen.");
      return;
    }

    if (editId) {
      const idx = items.findIndex((x) => x.id === editId);
      if (idx > -1) {
        updateItem(idx, { ...draft, id: editId });
        toastReminder(t("auto.toast.updated") || "Herinnering bijgewerkt.");
      }
    } else {
      const newItem = { ...draft, id: uuidv4() };
      addItem(newItem);
      scheduleReminder(newItem);
      toastReminder(t("auto.toast.created") || "Herinnering toegevoegd.");
    }

    setShowForm(false);
    setEditId(null);
    resetDraft();
  };

  // Overlay sluiten bij Escape
  useEffect(() => {
    if (!showForm) return;
    const onKey = (ev) => ev.key === "Escape" && setShowForm(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

  return (
    <div className="page-auto">
      <SectionCard title={t("pages.auto.title", "Auto")}>
        {/* Lijst */}
        <div className="reminder-grid">
          {items.length === 0 ? (
            <p className="text-muted">
              {t("auto.noReminders") || "Nog geen herinneringen toegevoegd."}
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="reminder-card">
                <div className="reminder-header">
                  <strong className="reminder-name">{item.naam}</strong>
                  <p className="reminder-date">
                    {item.datum} • {item.tijd}
                  </p>
                </div>
                {item.beschrijving && (
                  <p className="text-muted small">{item.beschrijving}</p>
                )}
                <p className="small meta">
                  {item.offsets?.includes(1440) ? t("auto.meta.dayBefore", { defaultValue: "1 dag vooraf" }) : ""}
                  {item.repeat !== "none" ? ` • ${t("repeat." + item.repeat) || item.repeat}` : ""}
                  {item.prioriteit === "hoog" ? " • ⚠️" : ""}
                </p>
                <div className="card-actions">
                  <button type="button" className="btn-edit" onClick={() => handleEdit(item)}>
                    {t("auto.buttons.bewerken") || "Bewerken"}
                  </button>
                  <button type="button" className="btn-delete" onClick={() => handleDelete(item.id)}>
                    {t("auto.buttons.verwijderen") || "Verwijderen"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>

      {/* FAB als portal buiten <main>/<section> zodat z-index/overflow geen rol speelt */}
      <BodyPortal>
        <button
          className="fab"
          aria-label={t("auto.buttons.nieuw", "Nieuwe herinnering")}
          onClick={handleOpenCreate}
          type="button"
        >
          +
        </button>
      </BodyPortal>

      {/* Overlay + formulier via portal, altijd boven alles */}
      {showForm && (
        <BodyPortal>
          <div className="form-overlay" role="dialog" aria-modal="true" onClick={() => setShowForm(false)}>
            <form className="form-card" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
              <h2>
                {editId
                  ? t("auto.buttons.bijwerken") || "Herinnering bijwerken"
                  : t("auto.buttons.nieuw") || "Nieuwe herinnering"}
              </h2>

              <label>
                {t("auto.fields.naam") || "Naam"}
                <input
                  ref={firstFieldRef}
                  type="text"
                  value={draft.naam}
                  onChange={(e) => setDraft({ ...draft, naam: e.target.value })}
                  placeholder={t("auto.placeholders.naam") || "Bijv. APK keuring"}
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
                onChange={(r, end) => setDraft({ ...draft, repeat: r, repeatEnd: end })}
              />

              <label>
                {t("auto.fields.beschrijving") || "Notitie"}
                <textarea
                  value={draft.beschrijving}
                  onChange={(e) => setDraft({ ...draft, beschrijving: e.target.value })}
                  placeholder={t("auto.placeholders.beschrijving") || "Optionele notitie"}
                />
              </label>

              <label>
                {t("auto.fields.prioriteit") || "Prioriteit"}
                <select
                  value={draft.prioriteit}
                  onChange={(e) => setDraft({ ...draft, prioriteit: e.target.value })}
                >
                  <option value="laag">{t("auto.priority.low") || "Laag"}</option>
                  <option value="normaal">{t("auto.priority.normal") || "Normaal"}</option>
                  <option value="hoog">{t("auto.priority.high") || "Hoog"}</option>
                </select>
              </label>

              <div className="form-buttons">
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                  {t("auto.buttons.annuleren") || "Annuleren"}
                </button>
                <button type="submit" className="btn-primary">
                  {t("auto.buttons.opslaan") || "Opslaan"}
                </button>
              </div>
            </form>
          </div>
        </BodyPortal>
      )}
    </div>
  );
}
