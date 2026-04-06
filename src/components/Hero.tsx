import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowDown } from '@phosphor-icons/react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useLangPath } from '@/hooks/useLangPath'
import { business } from '@/data/business'

const BASE = import.meta.env.BASE_URL

export default function Hero() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const langPath = useLangPath()

  const scrollToMenu = () => {
    const el = document.getElementById('carta')
    if (el) {
      const navbar = document.querySelector('nav')
      const offset = navbar ? navbar.offsetHeight : 64
      const y = el.getBoundingClientRect().top + window.scrollY - offset - 16
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${BASE}hero-video-1.webm`} type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Dark circle backdrop */}
      <div className="absolute z-[5] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] md:w-[1300px] md:h-[1300px] rounded-full bg-black/50 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <img
          src={`${BASE}la-mafia-logo-4.webp`}
          alt="La Mafia Burguer"
          className="w-72 md:w-[28rem] mx-auto mb-2 animate-neon-pulse"
        />
        {/* Separator with stars */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-8 h-px bg-white/20" />
          <span className="text-white/40 text-[10px] tracking-[0.3em] animate-neon-pulse">&#9733; &#9733; &#9733;</span>
          <span className="w-8 h-px bg-white/20" />
        </div>
        <p className="text-lg md:text-2xl text-white/80 font-sans font-light tracking-widest uppercase mb-8">
          {t('hero.tagline')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-row items-center justify-center gap-3 mb-6">
          <button
            onClick={scrollToMenu}
            className="flex items-center gap-1.5 px-5 py-2.5 sm:px-8 sm:py-3 bg-brand text-black font-semibold rounded-lg hover:bg-brand-dark transition-colors text-sm sm:text-base"
          >
            <ArrowDown size={18} weight="bold" />
            {t('hero.viewMenu')}
          </button>
          <Link
            to={langPath('/reservas')}
            className="flex items-center gap-1.5 px-5 py-2.5 sm:px-8 sm:py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm sm:text-base"
          >
            {t('hero.reserve')}
          </Link>
        </div>

        {/* Subtle links */}
        <div className="flex items-center justify-center gap-6">
          {business.googleMaps && (
            <a
              href={business.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              <FaMapMarkerAlt size={14} className="text-white/40" />
              {isEn ? 'How to get there' : 'Cómo llegar'}
            </a>
          )}
          <span className="w-px h-3 bg-white/20" />
          {business.googleReviews && (
            <a
              href={business.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              <FcGoogle size={14} className="opacity-50" />
              {isEn ? 'Review us' : 'Opinar en Google'}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
