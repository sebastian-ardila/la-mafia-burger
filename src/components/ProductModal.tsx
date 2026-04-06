import { useTranslation } from 'react-i18next'
import { X, ImageSquare } from '@phosphor-icons/react'
import type { Product } from '@/data/menu'

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CO')}`
}

interface Props {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[#e8dace] rounded-t-2xl md:rounded-2xl w-full md:max-w-md max-h-[85vh] overflow-y-auto shadow-xl">
        {/* Image placeholder */}
        <div className="h-48 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center relative">
          <ImageSquare size={48} weight="thin" className="text-stone-400" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors" aria-label={t('menu.close')}>
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Name & Price */}
          <div>
            <h3 className="font-display font-bold text-xl mb-1">
              {isEn ? product.nameEn : product.name}
            </h3>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
              {product.comboPrice && (
                <span className="text-sm text-black/50">
                  {t('menu.combo')} {formatPrice(product.comboPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Ingredients - full list with emojis */}
          <div>
            <h4 className="text-xs font-semibold text-black/50 uppercase tracking-wide mb-3">{t('menu.ingredients')}</h4>
            <div className="space-y-2">
              {product.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-black/80">
                  <span className="text-base">{ing.emoji}</span>
                  <span>{isEn ? ing.nameEn : ing.name}</span>
                  {ing.quantity && (
                    <span className="text-black/40 text-xs">({ing.quantity})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
