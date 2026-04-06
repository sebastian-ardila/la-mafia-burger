import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLangPath } from '@/hooks/useLangPath'

const BASE = import.meta.env.BASE_URL

interface Props {
  secondaryLabel: string
  secondaryHref: string
}

export default function CTA({ secondaryLabel, secondaryHref }: Props) {
  const { t } = useTranslation()
  const langPath = useLangPath()

  return (
    <div className="mt-16 relative overflow-hidden rounded-2xl">
      <img
        src={`${BASE}cta-bg.webp`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-14 md:px-14 md:py-20">
        <div className="text-center md:text-left">
          <p className="text-brand text-xs font-semibold tracking-widest uppercase mb-2">
            La Mafia Burguer
          </p>
          <h3 className="text-white font-display text-3xl md:text-4xl font-bold leading-tight max-w-md">
            {t('cta.text')}
          </h3>
        </div>

        <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
          <Link
            to={langPath('/')}
            className="flex items-center justify-center px-6 py-4 md:px-14 md:py-6 bg-brand text-black font-bold rounded-2xl hover:bg-brand-dark transition-colors text-lg md:text-xl shadow-lg"
          >
            {t('cta.viewMenu')}
          </Link>
          <Link
            to={langPath(secondaryHref)}
            className="flex items-center justify-center px-6 py-4 md:px-14 md:py-6 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-colors text-lg md:text-xl shadow-lg"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
