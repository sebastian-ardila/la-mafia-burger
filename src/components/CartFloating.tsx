import { useTranslation } from 'react-i18next'
import { ShoppingCart } from '@phosphor-icons/react'
import { useCart } from '@/context/CartContext'

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CO')}`
}

export default function CartFloating() {
  const { t } = useTranslation()
  const { totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart()

  if (totalItems === 0 || isCartOpen) return null

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:bottom-6 sm:-translate-x-1/2 sm:w-auto z-50 flex items-center justify-between gap-3 px-5 py-3.5 bg-black text-brand rounded-2xl shadow-xl hover:bg-black/90 transition-colors whitespace-nowrap"
    >
      <ShoppingCart size={20} weight="fill" className="flex-shrink-0" />
      <span className="font-semibold text-sm">
        {totalItems} {totalItems === 1 ? t('cart.product') : t('cart.products')}
      </span>
      <span className="w-px h-4 bg-brand/30 flex-shrink-0" />
      <span className="font-bold text-sm">{formatPrice(totalPrice)}</span>
    </button>
  )
}
