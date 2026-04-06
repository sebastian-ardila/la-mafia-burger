import { useTranslation } from 'react-i18next'
import { Clock, MapPin } from '@phosphor-icons/react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Breadcrumb from '@/components/Breadcrumb'
import CTA from '@/components/CTA'
import { business, schedule } from '@/data/business'

export default function Schedule() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    <div className="pt-16">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-10">{t('schedule.title')}</h1>

        <div className="bg-[#e0ccb8] rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-xs font-semibold flex items-center gap-2 text-black/60 uppercase tracking-wide mb-6">
            <Clock size={14} weight="fill" />
            {t('schedule.scheduleTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {schedule.map((s, idx) => (
              <div key={idx} className={`rounded-xl p-5 ${s.closed ? 'bg-brand/30' : 'bg-brand/20'}`}>
                <div className="text-sm font-medium text-black/60">
                  {(isEn ? s.daysEn : s.days).join(', ')}
                </div>
                <div className={`text-2xl font-bold mt-1 ${s.closed ? 'text-black/25' : 'text-black'}`}>
                  {s.closed ? t('schedule.closed') : `${s.open} - ${s.close}`}
                </div>
              </div>
            ))}
            {/* Holidays */}
            <div className="rounded-xl p-5 bg-brand/30">
              <div className="text-sm font-medium text-black/60">
                {isEn ? 'Holidays' : 'Festivos'}
              </div>
              <div className="text-2xl font-bold mt-1 text-black/25">
                {t('schedule.closed')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#e0ccb8] rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <MapPin size={24} weight="duotone" className="text-black/40 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold mb-1">{t('schedule.location')}</h2>
              <p className="text-black/60">{business.address}</p>
              <p className="text-black/40 text-sm mt-1">{t('schedule.deliveryText')}</p>
            </div>
          </div>

          <div className="ml-0 md:ml-10">
            <h3 className="text-xs font-semibold text-black/40 uppercase tracking-wide mb-3">{t('schedule.howToGet')}</h3>
            <div className="flex flex-wrap gap-3">
              {business.googleMaps && (
                <a href={business.googleMaps} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand/30 hover:bg-brand/50 text-sm font-medium text-black/60 hover:text-black transition-colors">
                  <FaMapMarkerAlt size={14} className="text-red-500" />
                  Google Maps
                </a>
              )}
            </div>
          </div>
        </div>

        <CTA secondaryLabel={t('reservations.title')} secondaryHref="/reservas" />
      </div>
    </div>
  )
}
