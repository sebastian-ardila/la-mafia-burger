import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { House, ForkKnife, CalendarBlank, Clock, BookOpen, EnvelopeSimple, CaretRight } from '@phosphor-icons/react'
import { useLangPath } from '@/hooks/useLangPath'

const routes: Record<string, { labelKey: string; icon: typeof House }> = {
  '/reservas': { labelKey: 'nav.reservations', icon: CalendarBlank },
  '/horarios': { labelKey: 'nav.schedule', icon: Clock },
  '/historia': { labelKey: 'nav.history', icon: BookOpen },
  '/contacto': { labelKey: 'nav.contact', icon: EnvelopeSimple },
}

export default function Breadcrumb() {
  const { t } = useTranslation()
  const location = useLocation()
  const langPath = useLangPath()

  const stripped = location.pathname.replace(/^\/(es|en)/, '')
  if (!stripped || stripped === '/') return null

  const current = routes[stripped]
  if (!current) return null

  const Icon = current.icon

  return (
    <div className="sticky top-16 z-40 bg-brand/95 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 text-sm">
        <Link to={langPath('/')} className="flex items-center gap-1 text-black/50 hover:text-black transition-colors">
          <House size={16} />
          <span>{t('breadcrumb.home')}</span>
        </Link>
        <CaretRight size={12} className="text-black/30" />
        <span className="flex items-center gap-1 text-black font-medium">
          <Icon size={16} />
          {t(current.labelKey)}
        </span>
      </div>
    </div>
  )
}
