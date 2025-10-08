import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import nl from './locales/nl.json'
import en from './locales/en.json'
import de from './locales/de.json'

const saved = (() => {
  try { return localStorage.getItem('rr_lang') } catch { return null }
})()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      nl: { translation: nl },
      en: { translation: en },
      de: { translation: de }
    },
    lng: saved || 'nl',
    fallbackLng: 'nl',
    interpolation: { escapeValue: false }
  })

export default i18n
