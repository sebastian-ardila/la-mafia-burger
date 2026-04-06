export const business = {
  name: 'La Mafia Burguer',
  slogan: 'Un crimen que vale la pena comerte',
  sloganEn: 'A crime worth eating',
  whatsapp: '+573045297102',
  whatsappDisplay: '+57 304 529 7102',
  email: '',
  address: 'Villa del Prado, Mz 41 Cs 1, Pereira',
  city: 'Pereira',
  instagram: 'https://www.instagram.com/lamafiapereira/',
  instagramHandle: '@lamafiapereira',
  facebook: 'https://www.facebook.com/p/La-Mafia-Burguer-61565571939174/',
  facebookName: 'La Mafia Burguer',
  googleReviews: 'https://www.google.com/search?q=la+mafie+burguer+opiniones+pereira&rlz=1C5CHFA_enCO1060CO1060&oq=la+mafie+burguer+opiniones+pereira&gs_lcrp=EgZjaHJvbWUyCwgAEEUYChg5GKABMgkIARAhGAoYoAEyCQgCECEYChigATIJCAMQIRgKGKABMgkIBBAhGAoYoAHSAQg2Mzk4ajBqOagCBrACAfEFMXLcpbDquIc&sourceid=chrome&ie=UTF-8#lrd=0x8e3887002e363c55:0x9bf2a7d7a892647f,3,,,,',
  googleMaps: 'https://google.com/maps?sca_esv=a5ad54a154ad8b44&rlz=1C5CHFA_enCO1060CO1060&biw=1799&bih=1008&output=search&q=la+mafia+burger+pereira&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpaEWjvZ2Py1XXV8d8KvlI3jljrY5CkLlk8Dq3IvwBz-TQd_NQw4mbt3svWnS3z6wTknZy0fkpkyaX2SruQ368DHJqonGGb1OMuj2MAVB0RybAkX6UvzSMLN579mpf9re9Bz_95jjqnFxWi2DZmM7vzkFX6ER4s6Dq2aENZK97JCgT8oODluldLq-6OHthvk_GCpj0dg&entry=mc&ved=1t:200715&ictx=111',
  appleMaps: 'https://maps.apple.com/?q=La+Mafia+Burguer+Pereira',
  repo: 'https://github.com/sebastian-ardila/la-mafia-burguer',
}

export interface ScheduleDay {
  days: string[]
  daysEn: string[]
  open: string
  close: string
  closed?: boolean
}

export const schedule: ScheduleDay[] = [
  {
    days: ['Martes', 'Miércoles', 'Jueves', 'Domingo'],
    daysEn: ['Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
    open: '17:30',
    close: '22:00',
  },
  {
    days: ['Viernes', 'Sábado'],
    daysEn: ['Friday', 'Saturday'],
    open: '17:30',
    close: '23:00',
  },
  {
    days: ['Lunes'],
    daysEn: ['Monday'],
    open: '',
    close: '',
    closed: true,
  },
]

export function getScheduleForDay(dayIndex: number): ScheduleDay | undefined {
  const dayMap: Record<number, string> = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
  }
  const dayName = dayMap[dayIndex]
  return schedule.find(s => s.days.includes(dayName))
}

export function generateTimeSlots(open: string, close: string): string[] {
  const slots: string[] = []
  const [openH, openM] = open.split(':').map(Number)
  const [closeH, closeM] = close.split(':').map(Number)
  let currentH = openH
  let currentM = openM

  while (currentH < closeH || (currentH === closeH && currentM <= closeM)) {
    slots.push(`${currentH.toString().padStart(2, '0')}:${currentM.toString().padStart(2, '0')}`)
    currentM += 30
    if (currentM >= 60) {
      currentM = 0
      currentH++
    }
  }
  return slots
}
