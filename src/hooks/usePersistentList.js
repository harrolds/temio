import { useEffect, useState } from 'react'

/**
 * usePersistentList
 * Simple helper to persist a list of objects to localStorage under a stable key.
 * Ensures data survives navigation and reloads.
 */
export default function usePersistentList(storageKey) {
  const safeKey = typeof storageKey === 'string' && storageKey ? storageKey : 'rr_list'
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(safeKey)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(safeKey, JSON.stringify(items))
    } catch {}
  }, [safeKey, items])

  const addItem = (obj) => setItems(prev => [...prev, obj])
  const updateAt = (index, obj) => setItems(prev => prev.map((it,i)=> i===index? obj: it))
  const removeAt = (index) => setItems(prev => prev.filter((_,i)=> i!==index))
  const clear = () => setItems([])

  return { items, setItems, addItem, updateAt, removeAt, clear }
}
