import React, { useState, useEffect } from "react";
import SectionCard from "@/components/common/SectionCard";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { requestPermission, scheduleReminder, toastReminder } from "@/utils/notifications";
import usePersistentList from "@/hooks/usePersistentList";
import DateTimeRow from "@/components/common/DateTimeRow";
import ReminderOffsets from "@/components/common/ReminderOffsets";
import RepeatPicker from "@/components/common/RepeatPicker";

export default function Contracten() {
  const { t } = useTranslation();
  const formName = "contracten";
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
  const { items, addItem, removeItem, updateItem } = usePersistentList(`rr_reminders_${formName}`);
  const [editId, setEditId] = useState(null);

  useEffect(() => { requestPermission(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!draft.naam || !draft.datum) {
      toastReminder(t("contracten.validation.missingFields") || "Vul alle verplichte velden in.");
      return;
    }
    const selectedDate = new Date(`${draft.datum}T${draft.tijd}`);
    if (selectedDate < new Date()) {
      toastReminder(t("contracten.validation.datePast") || "Datum/tijd mag niet in het verleden liggen.");
      return;
    }
    const newItem = { ...draft, id: editId || uuidv4() };
    if (editId) {
      updateItem(editId, newItem);
      setEditId(null);
      toastReminder(t("contracten.toast.updated") || "Herinnering bijgewerkt.");
    } else {
      addItem(newItem);
      scheduleReminder(newItem);
      toastReminder(t("contracten.toast.created") || "Herinnering toegevoegd.");
    }
    setDraft({
      naam: "", datum: "", tijd: "09:00", beschrijving: "",
      offsets: [0, 1440], repeat: "none", repeatEnd: "", prioriteit: "normaal",
    });
  };

  const handleEdit = (item) => { setDraft(item); setEditId(item.id); };
  const handleDelete = (id) => { removeItem(id); toastReminder(t("contracten.toast.deleted") || "Herinnering verwijderd."); };

  return (
    <SectionCard title={t("pages.contracten.title", "Contracten")}>
      <form onSubmit={handleSubmit} className="reminder-form">
        <label>
          Naam
          <input type="text" value={draft.naam}
            onChange={(e) => setDraft({ ...draft, naam: e.target.value })} required />
        </label>
        <DateTimeRow date={draft.datum} time={draft.tijd}
          onChange={(d, t) => setDraft({ ...draft, datum: d, tijd: t })} />
        <ReminderOffsets offsets={draft.offsets}
          onChange={(v) => setDraft({ ...draft, offsets: v })} />
        <RepeatPicker repeat={draft.repeat} repeatEnd={draft.repeatEnd}
          onChange={(r, end) => setDraft({ ...draft, repeat: r, repeatEnd: end })} />
        <label>
          Notitie
          <textarea value={draft.beschrijving}
            onChange={(e) => setDraft({ ...draft, beschrijving: e.target.value })} />
        </label>
        <label>
          Prioriteit
          <select value={draft.prioriteit}
            onChange={(e) => setDraft({ ...draft, prioriteit: e.target.value })}>
            <option value="laag">Laag</option>
            <option value="normaal">Normaal</option>
            <option value="hoog">Hoog</option>
          </select>
        </label>
        <button type="submit" className="btn-primary">{editId ? "Bijwerken" : "Opslaan"}</button>
      </form>

      <div className="card-list mt-3">
        {items.length === 0 && <p className="text-muted">Nog geen herinneringen toegevoegd.</p>}
        {items.map((item) => (
          <div key={item.id} className="card-item">
            <strong>{item.naam}</strong>
            <p>{item.datum} {item.tijd}</p>
            {item.beschrijving && <p className="text-muted">{item.beschrijving}</p>}
            <div className="mt-2">
              <button type="button" onClick={() => handleEdit(item)}>Bewerken</button>
              <button type="button" onClick={() => handleDelete(item.id)}>Verwijderen</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
