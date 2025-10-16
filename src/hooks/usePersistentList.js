import { useState, useEffect } from "react";

/**
 * usePersistentList – bewaart een array in localStorage en
 * biedt bewerkingen om items toe te voegen, te updaten of te verwijderen.
 *
 * Hybride return:
 *  - Array-vorm  : [items, addItem, updateItem, removeItem]  (voor oudere pagina's)
 *  - Object-vorm : { items, addItem, updateAt, removeAt, clear, updateItem, removeItem }
 *    -> Hiermee werken zowel `[a, b, c, d] = hook()` als `{ items } = hook()`
 */
export default function usePersistentList(key, initialValue = []) {
  // Lazy init: nooit undefined; voorkomt render-crashes bij lege storage
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Sync naar localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.error(`[Temio] Fout bij opslaan van ${key}:`, err);
    }
  }, [key, items]);

  // --- CRUD ---------------------------------------------------------------
  const addItem = (item) => setItems((prev) => [...prev, item]);

  const updateAt = (index, newItem) =>
    setItems((prev) => prev.map((item, i) => (i === index ? newItem : item)));

  const removeAt = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const clear = () => setItems([]);

  // Aliassen (back-compat)
  const updateItem = (index, newItem) => updateAt(index, newItem);
  const removeItem = (index) => removeAt(index);

  // --- Hybride return -----------------------------------------------------
  // 1) Basis-array voor `[items, addItem, updateItem, removeItem]`
  const arr = [items, addItem, updateItem, removeItem];

  // 2) Maak de array óók bruikbaar als object voor `{ items, addItem, ... }`
  return Object.assign(arr, {
    items,
    addItem,
    updateAt,
    removeAt,
    clear,
    updateItem,
    removeItem,
  });
}
