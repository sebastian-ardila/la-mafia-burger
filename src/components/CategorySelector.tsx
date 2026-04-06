import { useTranslation } from 'react-i18next'
import {
  ForkKnife,
  Hamburger,
  PlusCircle,
  BeerStein,
  Plant,
} from '@phosphor-icons/react'
import type { Category } from '@/data/menu'

const iconMap: Record<string, typeof ForkKnife> = {
  ForkKnife,
  Hamburger,
  PlusCircle,
  Beer: BeerStein,
  Plant,
}

interface Props {
  categories: Category[]
  activeCategory: string
  onSelect: (id: string) => void
}

export default function CategorySelector({ categories, activeCategory, onSelect }: Props) {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    <div className="flex flex-wrap justify-start gap-2 py-3 px-2">
      {categories.map(cat => {
        const Icon = iconMap[cat.icon] || ForkKnife
        const active = activeCategory === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border transition-all whitespace-nowrap ${
              active
                ? 'bg-black text-brand border-black'
                : 'bg-white/50 text-black/70 border-black/10 hover:border-black/30'
            }`}
          >
            <Icon size={16} weight={active ? 'fill' : 'regular'} />
            {isEn ? cat.nameEn : cat.name}
          </button>
        )
      })}
    </div>
  )
}
