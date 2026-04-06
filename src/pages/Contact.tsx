import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PaperPlaneTilt, Star } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useLangPath } from '@/hooks/useLangPath'
import Breadcrumb from '@/components/Breadcrumb'
import CTA from '@/components/CTA'

const BASE = import.meta.env.BASE_URL

const recommended = [
  { name: 'Don Bastiano', img: 'burger-1.webp', price: '$30.000' },
  { name: 'Smash', img: 'burger-2.webp', price: '$27.000' },
  { name: 'Sacra Corona', img: 'burger-3.webp', price: '$27.000' },
  { name: 'Cosa Nostra', img: 'burger-4.webp', price: '$25.000' },
]

export default function Contact() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const langPath = useLangPath()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  const [tried, setTried] = useState(false)

  const nameValid = name.trim().length > 0
  const emailValid = email.trim().length > 0 && email.includes('@')
  const reasonValid = reason.length > 0
  const messageValid = message.trim().length > 0
  const allValid = nameValid && emailValid && reasonValid && messageValid

  const reasons = ['franchise', 'supplier', 'collaboration', 'events', 'birthday', 'other']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (!allValid) return

    const subject = `${t(`contact.reasons.${reason}`)} - ${name}`
    const body = `Nombre: ${name}\nEmail: ${email}${phone ? `\nTeléfono: ${phone}` : ''}\nMotivo: ${t(`contact.reasons.${reason}`)}\n\nMensaje:\n${message}`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const inputClass = (valid: boolean) =>
    `w-full px-4 py-3.5 rounded-xl bg-brand/30 border text-base outline-none focus:ring-2 focus:ring-brand ${
      tried && !valid ? 'border-amber-700/40' : 'border-black/10'
    }`

  const labelClass = (valid: boolean) =>
    `block text-xs font-semibold uppercase tracking-wide mb-2 ${tried && !valid ? 'text-amber-800' : 'text-black/60'}`

  return (
    <div className="pt-16">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-10">{t('contact.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-[#e0ccb8] rounded-2xl p-6 md:p-8">
              <form noValidate onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={labelClass(nameValid)}>{t('contact.name')}</label>
                  <input type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)}
                    placeholder={t('contact.namePlaceholder')} className={inputClass(nameValid)} />
                  {tried && !nameValid && <p className="text-amber-800 text-xs mt-1">{t('contact.nameRequired')}</p>}
                </div>

                <div>
                  <label className={labelClass(emailValid)}>{t('contact.email')}</label>
                  <input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={t('contact.emailPlaceholder')} className={inputClass(emailValid)} />
                  {tried && !emailValid && <p className="text-amber-800 text-xs mt-1">{t('contact.emailRequired')}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-2 text-black/60">{t('contact.phone')}</label>
                  <input type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder={t('contact.phonePlaceholder')}
                    className="w-full px-4 py-3.5 rounded-xl bg-brand/30 border border-black/10 text-base outline-none focus:ring-2 focus:ring-brand" />
                </div>

                <div>
                  <label className={labelClass(reasonValid)}>{t('contact.reason')}</label>
                  <select value={reason} onChange={e => setReason(e.target.value)}
                    className={`${inputClass(reasonValid)} ${!reason ? 'text-black/45' : ''}`}>
                    <option value="">{t('contact.reasonPlaceholder')}</option>
                    {reasons.map(r => (
                      <option key={r} value={r}>{t(`contact.reasons.${r}`)}</option>
                    ))}
                  </select>
                  {tried && !reasonValid && <p className="text-amber-800 text-xs mt-1">{t('contact.reasonRequired')}</p>}
                </div>

                <div>
                  <label className={labelClass(messageValid)}>{t('contact.message')}</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)}
                    placeholder={t('contact.messagePlaceholder')} rows={5}
                    className={`${inputClass(messageValid)} resize-none`} />
                  {tried && !messageValid && <p className="text-amber-800 text-xs mt-1">{t('contact.messageRequired')}</p>}
                </div>

                <button type="submit"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-colors ${
                    allValid ? 'bg-black text-brand hover:bg-black/80' : 'bg-black/10 text-black/30 cursor-not-allowed'
                  }`}>
                  <PaperPlaneTilt size={20} />
                  {t('contact.submit')}
                </button>
                {tried && !allValid && <p className="text-amber-800 text-xs text-center">{t('contact.requiredFields')}</p>}
              </form>
            </div>
          </div>

          {/* Recommended burgers - desktop only */}
          <div className="hidden md:flex md:col-span-1 flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-black/50 mb-1 flex items-center gap-1.5">
              <Star size={14} weight="fill" />
              {isEn ? 'Recommended' : 'Recomendadas'}
            </p>
            {recommended.map((burger, idx) => (
              <Link
                key={idx}
                to={langPath('/')}
                onClick={() => {
                  setTimeout(() => {
                    const el = document.querySelector('[data-category="burgers"]')
                    if (el) {
                      const offset = 64 + 60 + 16
                      const y = el.getBoundingClientRect().top + window.scrollY - offset
                      window.scrollTo({ top: y, behavior: 'smooth' })
                    }
                  }, 100)
                }}
                className="group relative rounded-2xl overflow-hidden h-32 flex items-end cursor-pointer"
              >
                <img src={`${BASE}${burger.img}`} alt={burger.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 p-4 w-full">
                  <div className="text-white font-display font-bold text-base">{burger.name}</div>
                  <div className="text-brand text-sm font-semibold">{burger.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <CTA secondaryLabel={t('reservations.title')} secondaryHref="/reservas" />
      </div>
    </div>
  )
}
