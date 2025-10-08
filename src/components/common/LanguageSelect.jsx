import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSelect() {
  const { i18n } = useTranslation()

  const onChange = (e) => {
    const lng = e.target.value
    i18n.changeLanguage(lng)
    try { localStorage.setItem('rr_lang', lng) } catch {} }
const current = i18n.resolvedLanguage || i18n.language || 'nl'

  return (<select value={current} onChange={onChange} aria-label='Taalkeuze'>
      <option value='nl'>Nederlands</option>
      <option value='de'>Deutsch</option>
      <option value='en'>English</option>
    </select>)
}
