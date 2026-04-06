import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, Plus, Minus, ShoppingCart, ImageSquare } from '@phosphor-icons/react'
import type { Product } from '@/data/menu'
import { useCart } from '@/context/CartContext'
import ComboSelector from './ComboSelector'
import ProductModal from './ProductModal'

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CO')}`
}

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const { items, addItem, updateQuantity } = useCart()
  const [showCombo, setShowCombo] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const cartItems = items.filter(i => i.product.id === product.id)
  const totalInCart = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  const name = isEn ? product.nameEn : product.name
  const ingredients = product.ingredients

  const handleAdd = () => {
    if (product.comboPrice) {
      setShowCombo(true)
    } else {
      addItem(product, false)
    }
  }

  const handleIncrement = () => {
    if (product.comboPrice) {
      setShowCombo(true)
    } else {
      const item = cartItems[0]
      if (item) updateQuantity(product.id, false, undefined, item.quantity + 1)
      else addItem(product, false)
    }
  }

  const handleDecrement = () => {
    if (cartItems.length === 1) {
      const item = cartItems[0]
      updateQuantity(product.id, item.isCombo, item.selectedDrink?.id, item.quantity - 1)
    } else if (cartItems.length > 1) {
      const last = cartItems[cartItems.length - 1]
      updateQuantity(last.product.id, last.isCombo, last.selectedDrink?.id, last.quantity - 1)
    }
  }

  const ingredientText = ingredients
    .map(ing => `${ing.emoji} ${isEn ? ing.nameEn : ing.name}${ing.quantity ? ` (${ing.quantity})` : ''}`)
    .join(', ')

  return (
    <>
      <div className={`bg-[#e8dace] rounded-2xl border overflow-hidden flex flex-col h-[280px] md:h-[320px] transition-shadow hover:shadow-md ${totalInCart > 0 ? 'border-black/20 ring-1 ring-black/5' : 'border-black/[0.04]'}`}>
        {/* Image placeholder */}
        <div className="h-28 md:h-32 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center flex-shrink-0 relative">
          <ImageSquare size={36} weight="thin" className="text-stone-400" />
          {totalInCart > 0 && (
            <span className="absolute top-2 right-2 bg-black text-brand text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalInCart}
            </span>
          )}
          {/* Quantity badges over image */}
          {ingredients.some(ing => ing.quantity) && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {ingredients.filter(ing => ing.quantity).map((ing, idx) => (
                <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded bg-black/60 text-[9px] md:text-[10px] font-medium text-white/90 backdrop-blur-sm">
                  {ing.quantity}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-3 pt-2 pb-1 md:px-3.5 min-h-0">
          <h3 className="font-semibold text-sm md:text-base leading-tight">{name}</h3>
          <p className="text-[10px] md:text-xs text-black/55 mt-0.5 overflow-hidden line-clamp-3 leading-relaxed">
            {ingredientText}
          </p>
          <div className="mt-auto pt-1">
            {product.comboPrice ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm md:text-base font-bold">{formatPrice(product.price)}</span>
                <span className="text-[10px] md:text-xs text-black/45">{t('menu.combo')} {formatPrice(product.comboPrice)}</span>
              </div>
            ) : (
              <span className="text-sm md:text-base font-bold">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="px-2.5 pb-2.5 md:px-3 md:pb-3 flex gap-1.5 flex-shrink-0">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-1 px-2.5 py-2 md:py-2.5 text-[11px] md:text-xs font-medium text-black/55 hover:text-black bg-black/[0.06] hover:bg-black/[0.1] rounded-lg transition-colors flex-shrink-0"
          >
            <Eye size={14} />
            {t('menu.viewProduct')}
          </button>

          {totalInCart === 0 ? (
            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 md:py-2.5 text-[11px] md:text-xs font-semibold text-brand bg-black hover:bg-black/80 rounded-lg transition-colors"
            >
              <ShoppingCart size={14} weight="fill" />
              {t('menu.add')}
            </button>
          ) : (
            <div className="flex-1 flex items-center justify-between bg-black rounded-lg px-1.5">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center rounded text-brand hover:bg-white/10 transition-colors"
              >
                <Minus size={14} weight="bold" />
              </button>
              <span className="text-sm font-bold text-brand">{totalInCart}</span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center rounded text-brand hover:bg-white/10 transition-colors"
              >
                <Plus size={14} weight="bold" />
              </button>
            </div>
          )}
        </div>
      </div>

      {showCombo && (
        <ComboSelector product={product} onClose={() => setShowCombo(false)} />
      )}

      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
