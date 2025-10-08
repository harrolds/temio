import React, { useState, useEffect } from "react";
import { t } from "i18next";
import { requestPermission, scheduleReminder } from "@/utils/notifications";
import { v4 as uuidv4 } from "uuid";

export default function Huur() {
  const formName = "huur";
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(formName)) || [];
    setItems(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(formName, JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const obj = { form: formName };
    for (let [k, v] of form.entries()) obj[k] = v;
    obj.id = draft?.id || uuidv4();

    const expiry = new Date(obj.datum);
    const offset = parseInt(obj.herinner_vanaf || 14);
    const remindFrom = new Date(expiry.getTime() - offset * 24 * 60 * 60 * 1000);
    obj.remindFrom = remindFrom.toISOString();
    obj.created = new Date().toISOString();

    const updated = [...items];
    if (editIndex !== null) updated[editIndex] = obj;
    else updated.push(obj);

    setItems(updated);
    setEditIndex(null);
    setDraft(null);
    e.target.reset();
    requestPermission();
    scheduleReminder(obj);
  };

  const handleDelete = (i) => setItems(items.filter((_, idx) => idx !== i));
  const handleEdit = (i) => {
    setEditIndex(i);
    setDraft(items[i]);
  };
  const cancelEdit = () => {
    setEditIndex(null);
    setDraft(null);
  };
  const clearAll = () => {
    localStorage.removeItem(formName);
    setItems([]);
  };

  return (
    <div className="rr-page">
      <h2>{t("pages.huur.title", "Huur")}</h2>

      <form onSubmit={handleSubmit} className="rr-form-grid">
        <div className="field-group">
          <div className="field">
            <label>{t("common.name", "Naam huurobject")}</label>
            <input
              name="naam"
              type="text"
              required
              defaultValue={draft?.naam || ""}
            />
          </div>

          <div className="field">
            <label>{t("common.expiry", "Vervaldatum huurcontract")}</label>
            <input
              name="datum"
              type="date"
              required
              defaultValue={draft?.datum || ""}
            />
          </div>

          <div className="field">
            <label>{t("common.remindfrom", "Herinner vanaf")}</label>
            <select
              name="herinner_vanaf"
              defaultValue={draft?.herinner_vanaf || "14"}
            >
              <option value="7">7 dagen vóór</option>
              <option value="14">14 dagen vóór</option>
              <option value="30">30 dagen vóór</option>
            </select>
          </div>
        </div>

        <div className="field actions">
          <button type="submit" className="pp-btn">
            {editIndex !== null
              ? t("common.save", "Opslaan")
              : t("common.add", "Toevoegen")}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              className="pp-btn-outline"
              onClick={cancelEdit}
            >
              {t("common.cancel", "Annuleren")}
            </button>
          )}
        </div>
      </form>

      <ul className="rr-list">
        {items.map((item, i) => (
          <li key={item.id} className="pp-card">
            <div className="rr-item">
              <strong>{item.naam}</strong> — {item.datum}
              <div className="item-actions">
                <button
                  type="button"
                  className="pp-btn-subtle"
                  onClick={() => handleEdit(i)}
                >
                  ✏️
                </button>
                <button
                  type="button"
                  className="pp-btn-subtle"
                  onClick={() => handleDelete(i)}
                >
                  🗑️
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="clear-row">
        <button
          type="button"
          onClick={clearAll}
          className="btn-clear pp-btn-outline"
        >
          {t("common.clear", "Alles wissen")}
        </button>
      </div>
    </div>
  );
}
