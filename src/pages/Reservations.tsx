import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarBlank, Clock, Plus, Minus, WhatsappLogo, MapPin, Sun, Moon, CloudSun, Users } from '@phosphor-icons/react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Breadcrumb from '@/components/Breadcrumb'
import CTA from '@/components/CTA'
import { business, schedule, getScheduleForDay, generateTimeSlots } from '@/data/business'

export default function Reservations() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const [name, setName] = useState('')
  const [people, setPeople] = useState(2)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [comments, setComments] = useState('')
  const [tried, setTried] = useState(false)
  const dateInputRef = useRef<HTMLInputElement>(null)

  const today = new Date().toISOString().split('T')[0]

  const selectedDate = date ? new Date(date + 'T12:00:00') : null
  const daySchedule = selectedDate ? getScheduleForDay(selectedDate.getDay()) : null
  const isClosed = daySchedule?.closed === true
  const timeSlots = daySchedule && !isClosed ? generateTimeSlots(daySchedule.open, daySchedule.close) : []

  const morning = timeSlots.filter(s => parseInt(s) < 12)
  const afternoon = timeSlots.filter(s => parseInt(s) >= 12 && parseInt(s) < 18)
  const evening = timeSlots.filter(s => parseInt(s) >= 18)

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00')
    const opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' }
    const formatted = d.toLocaleDateString(isEn ? 'en-US' : 'es-CO', opts)
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }

  const nameValid = name.trim().length > 0
  const dateValid = date.length > 0 && !isClosed
  const timeValid = time.length > 0
  const allValid = nameValid && dateValid && timeValid

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDate(newDate)
    const newD = new Date(newDate + 'T12:00:00')
    const newSchedule = getScheduleForDay(newD.getDay())
    if (newSchedule?.closed || !newSchedule) {
      setTime('')
    } else {
      const newSlots = generateTimeSlots(newSchedule.open, newSchedule.close)
      if (!newSlots.includes(time)) setTime('')
    }
  }

  const handleSubmit = () => {
    setTried(true)
    if (!allValid) return

    let msg = `📋 ${isEn ? 'Table Reservation' : 'Reserva de Mesa'} - ${business.name}\n\n`
    msg += `👤 ${name}\n`
    msg += `👥 ${people} ${isEn ? 'guests' : 'personas'}\n`
    msg += `📅 ${formatDateDisplay(date)}\n`
    msg += `🕐 ${time}\n`
    if (comments.trim()) msg += `💬 ${comments}\n`

    const phone = business.whatsapp.replace('+', '')
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const timeChipClass = (slot: string) =>
    time === slot
      ? 'bg-black text-brand border-black font-semibold'
      : 'bg-white text-black border-black/10 hover:border-black/30'

  return (
    <div className="pt-16">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-10">{t('reservations.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-4 order-2 md:order-1">
            {/* Schedule card */}
            <div className="bg-[#e0ccb8] rounded-2xl p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-black/60 flex items-center gap-2 mb-4">
                <Clock size={14} weight="fill" />
                {t('reservations.scheduleTitle')}
              </h3>
              <div className="space-y-3">
                {schedule.map((s, idx) => (
                  <div key={idx} className="border-b border-black/5 last:border-0 pb-2 last:pb-0">
                    <div className="text-sm text-black/70">{(isEn ? s.daysEn : s.days).join(', ')}</div>
                    <div className={`text-lg font-bold ${s.closed ? 'text-black/30' : 'text-black'}`}>
                      {s.closed ? t('schedule.closed') : `${s.open} - ${s.close}`}
                    </div>
                  </div>
                ))}
                <div className="border-t border-black/5 pt-2">
                  <div className="text-sm text-black/70">{isEn ? 'Holidays' : 'Festivos'}</div>
                  <div className="text-lg font-bold text-black/30">{t('schedule.closed')}</div>
                </div>
              </div>
            </div>

            {/* Location card */}
            <div className="bg-[#e0ccb8] rounded-2xl p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-black/60 flex items-center gap-2 mb-4">
                <MapPin size={14} weight="fill" />
                {t('reservations.locationTitle')}
              </h3>
              <p className="text-sm text-black/70 mb-4">{business.address}</p>
              <div className="space-y-2">
                {business.googleMaps && (
                  <a href={business.googleMaps} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-black/70 hover:text-black transition-colors px-3 py-2 rounded-lg bg-black/[0.03] hover:bg-black/[0.06]">
                    <FaMapMarkerAlt size={12} className="text-red-500" />
                    {t('reservations.googleMaps')}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 order-1 md:order-2">
            <form noValidate onSubmit={e => { e.preventDefault(); handleSubmit() }} className="bg-[#e0ccb8] rounded-2xl p-6 md:p-8 space-y-6">
              {/* Name */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${tried && !nameValid ? 'text-amber-800' : 'text-black/60'}`}>
                  {t('reservations.name')}
                </label>
                <input
                  type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)}
                  placeholder={t('reservations.namePlaceholder')}
                  className={`w-full px-4 py-3.5 rounded-xl bg-brand/30 border text-base outline-none focus:ring-2 focus:ring-brand ${
                    tried && !nameValid ? 'border-amber-700/40' : 'border-black/10'
                  }`}
                />
                {tried && !nameValid && <p className="text-amber-800 text-xs mt-1">{t('reservations.nameRequired')}</p>}
              </div>

              {/* People */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-2 text-black/60">
                  <span className="flex items-center gap-1.5"><Users size={13} /> {t('reservations.people')}</span>
                </label>
                <div className="flex items-center gap-3 bg-brand/30 rounded-xl px-4 py-2 w-fit">
                  <button type="button" onClick={() => setPeople(Math.max(1, people - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-black/10 hover:bg-gray-100 transition-colors">
                    <Minus size={16} weight="bold" />
                  </button>
                  <span className="text-3xl font-bold w-10 text-center">{people}</span>
                  <button type="button" onClick={() => setPeople(people + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-black text-brand hover:bg-black/80 transition-colors">
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${tried && !dateValid ? 'text-amber-800' : 'text-black/60'}`}>
                  {t('reservations.date')}
                </label>
                <input ref={dateInputRef} type="date" min={today} value={date} onChange={handleDateChange} className="sr-only" tabIndex={-1} />
                <button type="button" onClick={() => dateInputRef.current?.showPicker()}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl bg-brand/30 border text-base w-full text-left transition-colors ${
                    tried && !dateValid ? 'border-amber-700/40' : date ? 'border-black/20' : 'border-black/10'
                  }`}>
                  <CalendarBlank size={20} className={date ? 'text-black' : 'text-black/45'} />
                  <span className={date ? 'text-black font-medium' : 'text-black/45'}>
                    {date ? formatDateDisplay(date) : t('reservations.selectDate')}
                  </span>
                </button>
                {tried && !date && <p className="text-amber-800 text-xs mt-1">{t('reservations.dateRequired')}</p>}
                {date && isClosed && <p className="text-amber-800 text-xs mt-1">{t('reservations.closedDayBorder')}</p>}
              </div>

              {/* Time chips */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${tried && !timeValid ? 'text-amber-800' : 'text-black/60'}`}>
                  {t('reservations.time')}
                </label>
                {!date ? (
                  <button type="button" onClick={() => dateInputRef.current?.showPicker()}
                    className="px-4 py-3.5 rounded-xl bg-brand/30 border border-black/10 text-sm text-black/45 w-full text-left">
                    {t('reservations.selectDateFirst')}
                  </button>
                ) : isClosed ? (
                  <p className="text-amber-800 text-sm px-4 py-3 bg-amber-100/50 rounded-xl border border-amber-700/20">{t('reservations.closedDay')}</p>
                ) : (
                  <div className="space-y-4">
                    {morning.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black/50 uppercase mb-2">
                          <Sun size={13} className="text-amber-500" /> {t('reservations.morning')}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {morning.map(slot => (
                            <button key={slot} type="button" onClick={() => setTime(slot)}
                              className={`px-4 py-2 rounded-xl text-sm border transition-colors ${timeChipClass(slot)}`}>{slot}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {afternoon.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black/50 uppercase mb-2">
                          <CloudSun size={13} className="text-orange-400" /> {t('reservations.afternoon')}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {afternoon.map(slot => (
                            <button key={slot} type="button" onClick={() => setTime(slot)}
                              className={`px-4 py-2 rounded-xl text-sm border transition-colors ${timeChipClass(slot)}`}>{slot}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {evening.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black/50 uppercase mb-2">
                          <Moon size={13} className="text-indigo-400" /> {t('reservations.evening')}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {evening.map(slot => (
                            <button key={slot} type="button" onClick={() => setTime(slot)}
                              className={`px-4 py-2 rounded-xl text-sm border transition-colors ${timeChipClass(slot)}`}>{slot}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {tried && !timeValid && date && !isClosed && <p className="text-amber-800 text-xs mt-1">{t('reservations.timeRequired')}</p>}
              </div>

              {/* Comments */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-2 text-black/60">{t('reservations.comments')}</label>
                <textarea value={comments} onChange={e => setComments(e.target.value)}
                  placeholder={t('reservations.commentsPlaceholder')} rows={3}
                  className="w-full px-4 py-3.5 rounded-xl bg-brand/30 border border-black/10 text-base outline-none focus:ring-2 focus:ring-brand resize-none"
                />
              </div>

              {/* Submit */}
              <button type="submit"
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-colors ${
                  allValid ? 'bg-black text-brand hover:bg-black/80' : 'bg-black/10 text-black/20 cursor-not-allowed'
                }`}>
                <WhatsappLogo size={22} weight="fill" />
                {t('reservations.submit')}
              </button>
              {tried && !allValid && <p className="text-amber-800 text-xs text-center">{t('reservations.requiredFields')}</p>}
            </form>
          </div>
        </div>

        <CTA secondaryLabel={t('contact.title')} secondaryHref="/contacto" />
      </div>
    </div>
  )
}
