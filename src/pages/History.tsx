import { useTranslation } from 'react-i18next'
import Breadcrumb from '@/components/Breadcrumb'
import CTA from '@/components/CTA'

const BASE = import.meta.env.BASE_URL

export default function History() {
  const { t } = useTranslation()

  return (
    <div className="pt-16">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">{t('history.title')}</h1>

        <div className="flex justify-center mb-8 bg-black rounded-2xl py-8">
          <img
            src={`${BASE}la-mafia-logo-2.webp`}
            alt="La Mafia Burguer"
            className="w-32 md:w-40 brightness-0 invert"
          />
        </div>

        <div className="prose prose-lg max-w-none space-y-6 text-black/70">
          <p className="text-lg leading-relaxed">{t('history.p1')}</p>
          <p className="text-lg leading-relaxed">{t('history.p2')}</p>
          <p className="text-lg leading-relaxed">{t('history.p3')}</p>
        </div>

        <CTA
          secondaryLabel={t('reservations.title')}
          secondaryHref="/reservas"
        />
      </div>
    </div>
  )
}
