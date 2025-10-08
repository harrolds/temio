import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import { requestPermission, scheduleReminder } from '@/utils/notifications';
import { v4 as uuidv4 } from 'uuid';

export default function Overheid() {
  const formName = 'overheid';
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

    let updated = [...items];
    if (editIndex !== null) updated[editIndex] = obj;
    else updated.push(obj);

    setItems(updated);
    setEditIndex(null);
    setDraft(null);
    e.target.reset();
    requestPermission();
    scheduleReminder(obj);
  };

  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setDraft(items[index]);
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
      <h2>{t('pages.overheid.title', 'Overheidszaken')}</h2>

      {/* ✅ FORMULIER */}
      <form onSubmit={handleSubmit} className="rr-form-grid">
        <div className="field-group">
          <div className="field">
            <label>{t('pages.overheid.name', 'Naam')}</label>
            <input
              name="naam"
              type="text"
              required
              defaultValue={draft?.naam || ''}
              placeholder={t('pages.overheid.name.placeholder', 'Bijv. Paspoortvernieuwing')}
            />
          </div>

          <div className="field">
            <label>{t('pages.overheid.datum', 'Vervaldatum')}</label>
            <input
              name="datum"
              type="date"
              required
              defaultValue={draft?.datum || ''}
            />
          </div>

          <div className="field">
            <label>{t('common.remindfrom', 'Herinner vanaf')}</label>
            <select name="herinner_vanaf" defaultValue={draft?.herinner_vanaf || '14'}>
              <option value="7">7 dagen vóór</option>
              <option value="14">14 dagen vóór</option>
              <option value="30">30 dagen vóór</option>
            </select>
          </div>

          <div className="field">
            <label>{t('common.repeat', 'Herhaling')}</label>
            <select name="repeat" defaultValue={draft?.repeat || 'none'}>
              <option value="none">Geen</option>
              <option value="weekly">Wekelijks</option>
              <option value="monthly">Maandelijks</option>
            </select>
          </div>

          <div className="field">
            <label>{t('common.notifytime', 'Herinner om')}</label>
            <input name="notifyTime" type="time" defaultValue={draft?.notifyTime || '09:00'} />
          </div>

          <div className="field">
            <label>{t('common.notifytype', 'Notificatie')}</label>
            <select name="notifyType" defaultValue={draft?.notifyType || 'pwa'}>
              <option value="pwa">Browser / PWA</option>
              <option value="email">E-mail</option>
              <option value="both">Beide</option>
            </select>
          </div>

          <div className="field">
            <label>
              <input
                type="checkbox"
                name="stopAfterExpiry"
                defaultChecked={draft?.stopAfterExpiry ?? true}
              />
              {t('common.stopafterexpiry', 'Stop na vervaldatum')}
            </label>
          </div>
        </div>

        <div className="field actions">
          <button type="submit">
            {editIndex !== null ? t('common.save', 'Opslaan') : t('common.add', 'Toevoegen')}
          </button>
          {editIndex !== null && (
            <button type="button" onClick={cancelEdit}>
              {t('common.cancel', 'Annuleren')}
            </button>
          )}
        </div>
      </form>

      {/* ✅ LIJST */}
      <ul className="rr-list">
        {items.map((item, i) => (
          <li key={item.id}>
            <div className="rr-item">
              <strong>{item.naam}</strong> — {item.datum}
              <div className="item-actions">
                <button onClick={() => handleEdit(i)}>✏️</button>
                <button onClick={() => handleDelete(i)}>🗑️</button>
              </div>
              {editIndex === i && (
                <div className="inline-editor">
                  <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={item.id} />
                    <input name="naam" defaultValue={item.naam} />
                    <input name="datum" type="date" defaultValue={item.datum} />
                    <button type="submit">{t('common.save', 'Opslaan')}</button>
                    <button type="button" onClick={cancelEdit}>
                      {t('common.cancel', 'Annuleren')}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="clear-row">
        <button type="button" onClick={clearAll} className="btn-clear">
          {t('common.clear', 'Alles wissen')}
        </button>
      </div>
    </div>
  );
}
