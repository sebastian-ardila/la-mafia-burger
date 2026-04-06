import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Check } from '@phosphor-icons/react'
import type { Product } from '@/data/menu'
import { drinks } from '@/data/menu'
import { useCart } from '@/context/CartContext'

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CO')}`
}

interface Props {
  product: Product
  onClose: () => void
}

export default function ComboSelector({ product, onClose }: Props) {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const { addItem } = useCart()
  const [step, setStep] = useState<'mode' | 'drink'>('mode')
  const [selectedDrink, setSelectedDrink] = useState<Product | null>(null)

  const handleSolo = () => {
    addItem(product, false)
    onClose()
  }

  const handleCombo = () => {
    setStep('drink')
  }

  const handleDrinkSelect = (drink: Product) => {
    setSelectedDrink(drink)
  }

  const handleConfirmDrink = () => {
    if (selectedDrink) {
      addItem(product, true, selectedDrink)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-sm max-h-[80vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-black/5">
          <h3 className="font-display font-semibold text-lg">
            {isEn ? product.nameEn : product.name}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-black/5 transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          {step === 'mode' && (
            <div className="space-y-3">
              <button
                onClick={handleSolo}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-black/10 hover:border-black/30 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-left">
                  <div className="font-semibold">{t('menu.solo')}</div>
                  <div className="text-sm text-black/50">{isEn ? product.nameEn : product.name}</div>
                </div>
                <span className="font-bold text-lg">{formatPrice(product.price)}</span>
              </button>
              <button
                onClick={handleCombo}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-black bg-black/[0.03] hover:bg-black/[0.06] transition-colors"
              >
                <div className="text-left">
                  <div className="font-semibold">{t('menu.combo')}</div>
                  <div className="text-sm text-black/50">+ {isEn ? 'Drink' : 'Bebida'} + {isEn ? 'Fries' : 'Papas'}</div>
                </div>
                <span className="font-bold text-lg">{formatPrice(product.comboPrice!)}</span>
              </button>
            </div>
          )}

          {step === 'drink' && (
            <div className="space-y-2">
              <p className="font-medium text-sm text-black/60 mb-3">{t('menu.chooseDrink')}</p>
              {drinks.map(drink => (
                <button
                  key={drink.id}
                  onClick={() => handleDrinkSelect(drink)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    selectedDrink?.id === drink.id
                      ? 'border-black bg-black/5'
                      : 'border-black/10 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium text-sm">{isEn ? drink.nameEn : drink.name}</span>
                  {selectedDrink?.id === drink.id && <Check size={18} weight="bold" />}
                </button>
              ))}
              <button
                onClick={handleConfirmDrink}
                disabled={!selectedDrink}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors mt-2 ${
                  selectedDrink
                    ? 'bg-black text-brand hover:bg-black/80'
                    : 'bg-black/10 text-black/30 cursor-not-allowed'
                }`}
              >
                {t('menu.add')} - {formatPrice(product.comboPrice!)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
