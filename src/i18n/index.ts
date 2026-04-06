import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './es.json'
import en from './en.json'

function getSystemLang(): string {
  const browserLang = navigator.language.split('-')[0]
  return browserLang === 'en' ? 'en' : 'es'
}

function getLangFromUrl(): string | null {
  const hash = window.location.hash || ''
  const match = hash.match(/^#\/(es|en)(\/|$|\?)/)
  return match ? match[1] : null
}

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: getLangFromUrl() || localStorage.getItem('lang') || getSystemLang(),
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
})

export default i18n
