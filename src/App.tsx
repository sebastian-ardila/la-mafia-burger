import { useEffect } from 'react'
import { Routes, Route, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CartFloating from './components/CartFloating'
import Home from './pages/Home'
import Reservations from './pages/Reservations'
import Schedule from './pages/Schedule'
import History from './pages/History'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'
import ScrollButtons from './components/ScrollButtons'

function LangSync() {
  const { lang } = useParams<{ lang: string }>()
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (lang && (lang === 'es' || lang === 'en') && lang !== i18n.language) {
      i18n.changeLanguage(lang)
      localStorage.setItem('lang', lang)
    }
  }, [lang, i18n])

  // Redirect if lang in URL doesn't match current language (user toggled)
  useEffect(() => {
    const handleLangChange = (newLang: string) => {
      const currentPath = location.pathname.replace(/^\/(es|en)/, '')
      navigate(`/${newLang}${currentPath || '/'}${location.search}`, { replace: true })
    }

    i18n.on('languageChanged', handleLangChange)
    return () => { i18n.off('languageChanged', handleLangChange) }
  }, [i18n, navigate, location.pathname, location.search])

  return null
}

function LangRoutes() {
  return (
    <>
      <LangSync />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<Reservations />} />
        <Route path="/horarios" element={<Schedule />} />
        <Route path="/historia" element={<History />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </>
  )
}

export default function App() {
  const { i18n } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/:lang/*" element={<LangRoutes />} />
          <Route path="*" element={<Navigate to={`/${i18n.language}/`} replace />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <CartFloating />
      <ScrollButtons />
    </div>
  )
}
