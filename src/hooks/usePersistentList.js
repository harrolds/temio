import { useState, useEffect } from "react";

/**
 * usePersistentList – bewaart een array in localStorage en
 * biedt bewerkingen om items toe te voegen, te updaten of te verwijderen.
 * 
 * Uitgebreid in Sprint 2.4:
 * - Aliassen `updateItem` en `removeItem` toegevoegd
 *   (compatibiliteit met bestaande pagina’s)
 */
export default function usePersistentList(key, initialValue = []) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Synchroniseer wijzigingen naar localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.error(`[Temio] Fout bij opslaan van ${key}:`, err);
    }
  }, [key, items]);

  // --- CRUD-functies -------------------------------------------------------

  const addItem = (item) => setItems((prev) => [...prev, item]);

  const updateAt = (index, newItem) =>
    setItems((prev) =>
      prev.map((item, i) => (i === index ? newItem : item))
    );

  const removeAt = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const clear = () => setItems([]);

  // --- Aliassen (Sprint 2.4 compat) ---------------------------------------
  // Hiermee blijven bestaande pagina’s die updateItem/removeItem gebruiken gewoon werken.
  const updateItem = (index, newItem) => updateAt(index, newItem);
  const removeItem = (index) => removeAt(index);

  // ------------------------------------------------------------------------

  return {
  items,
  addItem,
  updateAt,
  removeAt,
  clear,
  updateItem,
  removeItem,
};
}
