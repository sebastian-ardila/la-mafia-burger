import { useTranslation } from 'react-i18next'
import { InstagramLogo, FacebookLogo, WhatsappLogo, MapPin, NavigationArrow } from '@phosphor-icons/react'
import { business, schedule } from '@/data/business'

const BASE = import.meta.env.BASE_URL

export default function Footer() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    <footer className="bg-black text-white/80 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-10">
          {/* Column 1 - Logo & Info */}
          <div>
            <img src={`${BASE}la-mafia-logo-2.webp`} alt={business.name} className="h-20 w-auto mb-4 brightness-0 invert" />
            <h3 className="font-display font-bold text-xl text-white">{business.name}</h3>
            <p className="text-sm text-white/50 mt-1">{isEn ? business.sloganEn : business.slogan}</p>
            <div className="flex items-start gap-2 mt-4 text-sm">
              <MapPin size={16} className="flex-shrink-0 mt-0.5" />
              <span>{business.address}</span>
            </div>
            <p className="text-sm text-white/50 mt-2">
              {t('footer.deliveryText')}
            </p>
          </div>

          {/* Column 2 - Schedule */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-4">
              {t('footer.schedule')}
            </h3>
            <div className="space-y-3">
              {schedule.map((s, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg px-4 py-3">
                  <div className="font-medium text-sm text-white">
                    {(isEn ? s.daysEn : s.days).join(', ')}
                  </div>
                  <div className="text-sm text-white/50 mt-0.5">
                    {s.closed ? t('footer.closed') : `${s.open} - ${s.close}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 - Social */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-4">
              {t('footer.followUs')}
            </h3>
            <div className="space-y-3">
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <InstagramLogo size={20} />
                <span>{business.instagramHandle}</span>
              </a>
              <a
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <FacebookLogo size={20} />
                <span>{business.facebookName}</span>
              </a>
              {business.googleMaps && (
                <a
                  href={business.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                >
                  <NavigationArrow size={20} />
                  <span>Google Maps</span>
                </a>
              )}
              <a
                href={`https://wa.me/${business.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <WhatsappLogo size={20} />
                <span>{business.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>{business.name} &copy; {new Date().getFullYear()} {t('footer.rights')}.</span>
          <span>
            {t('footer.madeBy')}{' '}
            <a href="https://sebastianardila.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white underline">
              sebastianardila.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
