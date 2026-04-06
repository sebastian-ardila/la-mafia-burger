import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { List, X, ForkKnife, CalendarBlank, Clock, BookOpen, EnvelopeSimple, ShoppingCart, Translate } from '@phosphor-icons/react'
import { MdTableRestaurant } from 'react-icons/md'
import { useCart } from '@/context/CartContext'
import { useTable } from '@/context/TableContext'
import TableModal from './TableModal'

const BASE = import.meta.env.BASE_URL

const navItems = [
  { path: '/', labelKey: 'nav.menu', icon: ForkKnife, isHome: true },
  { path: '/reservas', labelKey: 'nav.reservations', icon: CalendarBlank },
  { path: '/horarios', labelKey: 'nav.schedule', icon: Clock },
  { path: '/historia', labelKey: 'nav.history', icon: BookOpen },
  { path: '/contacto', labelKey: 'nav.contact', icon: EnvelopeSimple },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const { totalItems, setIsCartOpen } = useCart()
  const { tableNumber, hasTable } = useTable()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tableModalOpen, setTableModalOpen] = useState(false)
  const [logoRevealed, setLogoRevealed] = useState(false)
  const logoTimerRef = useState<ReturnType<typeof setTimeout> | null>(null)

  const handleLogoClick = () => {
    setLogoRevealed(true)
    if (logoTimerRef[0]) clearTimeout(logoTimerRef[0])
    logoTimerRef[0] = setTimeout(() => setLogoRevealed(false), 2000)
  }

  const logoClass = `h-10 w-auto transition-all duration-300 ${logoRevealed ? '' : 'brightness-0 hover:[filter:none]'}`

  const lang = i18n.language
  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es'
    i18n.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)
  }

  const langPath = (path: string) => `/${lang}${path}`

  const isActive = (path: string) => {
    const stripped = location.pathname.replace(/^\/(es|en)/, '')
    if (path === '/') return stripped === '/' || stripped === ''
    return stripped.startsWith(path)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand/95 backdrop-blur-sm border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to={langPath('/')} className="flex-shrink-0" onClick={(e) => {
            handleLogoClick()
            const stripped = location.pathname.replace(/^\/(es|en)/, '')
            if (stripped === '/' || stripped === '') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}>
            <img src={`${BASE}la-mafia-logo-mini.webp`} alt="La Mafia Burguer" className={logoClass} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={langPath(item.path)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'text-black border-b-2 border-black font-semibold'
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  <Icon size={18} weight={active ? 'fill' : 'regular'} />
                  {t(item.labelKey)}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTableModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                hasTable
                  ? 'bg-black text-brand hover:bg-black/80'
                  : 'text-black/50 hover:text-black hover:bg-black/5'
              }`}
            >
              <MdTableRestaurant size={16} />
              <span>
                {hasTable
                  ? `${lang === 'en' ? 'Table' : 'Mesa'} ${tableNumber}`
                  : lang === 'en' ? 'Table' : 'Mesa'
                }
              </span>
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-black/60 hover:text-black transition-colors"
              aria-label="Toggle language"
            >
              <Translate size={18} />
              <span>{i18n.language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-black/60 hover:text-black transition-colors"
              aria-label={t('nav.cart')}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-brand text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-black/60 hover:text-black"
              aria-label="Open menu"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-brand flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-black/10">
            <Link to={langPath('/')} onClick={() => setMobileOpen(false)}>
              <img src={`${BASE}la-mafia-logo-mini.webp`} alt="La Mafia Burguer" className={logoClass} />
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-2" aria-label="Close menu">
              <X size={28} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            {navItems.map(item => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={langPath(item.path)}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 text-2xl font-medium transition-colors ${
                    active ? 'text-black font-bold border-b-2 border-black' : 'text-black/60'
                  }`}
                >
                  <Icon size={28} weight={active ? 'fill' : 'regular'} />
                  {t(item.labelKey)}
                </Link>
              )
            })}
            <button
              onClick={() => { setIsCartOpen(true); setMobileOpen(false) }}
              className="flex items-center gap-3 text-2xl font-medium text-black/60"
            >
              <ShoppingCart size={28} />
              {t('nav.cart')}
              {totalItems > 0 && (
                <span className="bg-black text-brand text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-3 text-xl font-medium text-black/60 mt-4"
            >
              <Translate size={24} />
              {i18n.language === 'es' ? 'English' : 'Español'}
            </button>
          </div>
        </div>
      )}

      {tableModalOpen && <TableModal onClose={() => setTableModalOpen(false)} />}
    </>
  )
}
