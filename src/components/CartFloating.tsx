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
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-black text-brand rounded-full shadow-lg hover:bg-black/90 transition-colors"
    >
      <ShoppingCart size={22} weight="fill" />
      <span className="font-semibold">
        {totalItems} {totalItems === 1 ? t('cart.product') : t('cart.products')}
      </span>
      <span className="w-px h-5 bg-brand/30" />
      <span className="font-bold">{formatPrice(totalPrice)}</span>
    </button>
  )
}
