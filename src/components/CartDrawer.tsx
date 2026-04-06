import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { X, Plus, Minus, Trash, WhatsappLogo, ArrowLeft, Hamburger, ImageSquare, CreditCard, Money, Bank, MapPin, Truck, ArrowRight, ForkKnife } from '@phosphor-icons/react'
import { useCart } from '@/context/CartContext'
import { useTable } from '@/context/TableContext'
import { useLangPath } from '@/hooks/useLangPath'
import { business } from '@/data/business'

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CO')}`
}

const paymentIcons: Record<string, typeof Money> = {
  transfer: Bank,
  card: CreditCard,
  cash: Money,
}

const orderIcons: Record<string, typeof MapPin> = {
  dineIn: MapPin,
  delivery: Truck,
}

export default function CartDrawer() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const navigate = useNavigate()
  const langPath = useLangPath()
  const { items, updateQuantity, clearCart, totalPrice, isCartOpen, setIsCartOpen, cartStep, setCartStep } = useCart()
  const { tableNumber: urlTable, hasTable: hasUrlTable } = useTable()

  const [customerName, setCustomerName] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderType, setOrderType] = useState('')
  const [address, setAddress] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [tried, setTried] = useState(false)

  const handleOrderType = (type: string) => {
    setOrderType(type)
    if (type === 'dineIn' && hasUrlTable) {
      setTableNumber(urlTable)
    } else if (type !== 'dineIn') {
      setTableNumber('')
    }
  }

  if (!isCartOpen) return null

  const handleClose = () => {
    setIsCartOpen(false)
    setCartStep(1)
    setTried(false)
  }

  const handleContinue = () => {
    setCartStep(2)
    setTried(false)
  }

  const nameValid = customerName.trim().length > 0
  const paymentValid = paymentMethod.length > 0
  const orderTypeValid = orderType.length > 0
  const addressValid = orderType !== 'delivery' || address.trim().length > 0
  const allValid = nameValid && paymentValid && orderTypeValid && addressValid

  const handleSubmit = () => {
    setTried(true)
    if (!allValid) return

    const paymentLabels: Record<string, string> = {
      transfer: isEn ? 'Transfer' : 'Transferencia',
      card: isEn ? 'Card' : 'Tarjeta',
      cash: isEn ? 'Cash' : 'Efectivo',
    }
    const orderLabels: Record<string, string> = {
      dineIn: isEn ? 'Dine in' : 'En mesa',
      delivery: isEn ? 'Delivery' : 'Domicilio',
    }

    let msg = `🍔 ${isEn ? 'New Order' : 'Nuevo Pedido'} - ${business.name}\n\n`
    msg += `👤 ${customerName}\n`
    msg += `💳 ${paymentLabels[paymentMethod]}\n`
    msg += `📍 ${orderLabels[orderType]}\n`
    if (orderType === 'delivery' && address.trim()) msg += `🏠 ${address.trim()}\n`
    if (orderType === 'dineIn' && tableNumber.trim()) msg += `🪑 ${isEn ? 'Table' : 'Mesa'} ${tableNumber.trim()}\n`
    msg += `\n`

    items.forEach(item => {
      const name = isEn ? item.product.nameEn : item.product.name
      const price = item.isCombo && item.product.comboPrice ? item.product.comboPrice : item.product.price
      msg += `🔸 ${item.quantity}x ${name}`
      if (item.isCombo && item.selectedDrink) {
        msg += ` (${t('cart.comboWith')} ${isEn ? item.selectedDrink.nameEn : item.selectedDrink.name})`
      }
      msg += ` ${formatPrice(price * item.quantity)}\n`
    })

    msg += `\n💰 Total: ${formatPrice(totalPrice)}`

    const phone = business.whatsapp.replace('+', '')
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-brand h-full overflow-y-auto shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/10 flex-shrink-0">
          {cartStep === 2 && (
            <button onClick={() => { setCartStep(1); setTried(false) }} className="p-1.5 mr-2 rounded-lg hover:bg-black/5 transition-colors">
              <ArrowLeft size={20} />
            </button>
          )}
          <h2 className="font-display font-semibold text-lg flex-1">
            {cartStep === 1 ? t('cart.title') : t('cart.step2Title')}
          </h2>
          <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartStep === 1 && (
            <div className="space-y-2">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <Hamburger size={48} weight="thin" className="mx-auto text-black/15 mb-4" />
                  <p className="text-black/40 mb-1">{t('cart.empty')}</p>
                  <p className="text-black/30 text-sm mb-6">{isEn ? 'Explore our menu and add your favorites' : 'Explora nuestra carta y agrega tus favoritos'}</p>
                  <button
                    onClick={() => {
                      handleClose()
                      navigate(langPath('/'))
                      setTimeout(() => {
                        const el = document.getElementById('carta')
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 80
                          window.scrollTo({ top: y, behavior: 'smooth' })
                        }
                      }, 100)
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-brand font-semibold rounded-xl hover:bg-black/80 transition-colors text-sm"
                  >
                    <ForkKnife size={18} weight="fill" />
                    {isEn ? 'See menu' : 'Ver carta'}
                  </button>
                </div>
              ) : (
                items.map((item, idx) => {
                  const name = isEn ? item.product.nameEn : item.product.name
                  const price = item.isCombo && item.product.comboPrice ? item.product.comboPrice : item.product.price
                  return (
                    <div key={idx} className="flex items-center gap-3 bg-[#e0ccb8] rounded-xl p-3">
                      <div className="w-10 h-10 rounded-lg bg-stone-200 flex items-center justify-center flex-shrink-0">
                        <ImageSquare size={18} weight="thin" className="text-stone-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{name}</div>
                        {item.isCombo && item.selectedDrink && (
                          <div className="text-xs text-black/50">
                            {t('cart.comboWith')} {isEn ? item.selectedDrink.nameEn : item.selectedDrink.name}
                          </div>
                        )}
                        {!item.isCombo && item.product.comboPrice && (
                          <div className="text-xs text-black/50">{t('cart.unit')}</div>
                        )}
                        <div className="text-sm font-bold mt-0.5">{formatPrice(price * item.quantity)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.isCombo, item.selectedDrink?.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-black/10 hover:bg-black/20 transition-colors"
                        >
                          <Minus size={14} weight="bold" />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.isCombo, item.selectedDrink?.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-black text-brand transition-colors"
                        >
                          <Plus size={14} weight="bold" />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {cartStep === 2 && (
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${tried && !nameValid ? 'text-amber-800' : 'text-black/60'}`}>
                  {t('cart.name')}
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder={t('cart.namePlaceholder')}
                  className={`w-full px-4 py-3.5 rounded-xl bg-brand/30 border text-base outline-none focus:ring-2 focus:ring-brand ${
                    tried && !nameValid ? 'border-amber-700/40' : 'border-black/10'
                  }`}
                />
                {tried && !nameValid && (
                  <p className="text-amber-800 text-xs mt-1">{t('cart.nameRequired')}</p>
                )}
              </div>

              {/* Payment */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${tried && !paymentValid ? 'text-amber-800' : 'text-black/60'}`}>
                  {t('cart.paymentMethod')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['transfer', 'card', 'cash'].map(method => {
                    const Icon = paymentIcons[method]
                    return (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                          paymentMethod === method
                            ? 'bg-black text-brand border-black'
                            : `bg-[#e0ccb8] text-black/70 ${tried && !paymentValid ? 'border-amber-700/40' : 'border-black/10'} hover:border-black/30`
                        }`}
                      >
                        <Icon size={16} weight={paymentMethod === method ? 'fill' : 'regular'} />
                        {t(`cart.${method}`)}
                      </button>
                    )
                  })}
                </div>
                {tried && !paymentValid && (
                  <p className="text-amber-800 text-xs mt-1">{t('cart.paymentRequired')}</p>
                )}
              </div>

              {/* Order type */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${tried && !orderTypeValid ? 'text-amber-800' : 'text-black/60'}`}>
                  {t('cart.orderType')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['dineIn', 'delivery'].map(type => {
                    const Icon = orderIcons[type]
                    return (
                      <button
                        key={type}
                        onClick={() => handleOrderType(type)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                          orderType === type
                            ? 'bg-black text-brand border-black'
                            : `bg-[#e0ccb8] text-black/70 ${tried && !orderTypeValid ? 'border-amber-700/40' : 'border-black/10'} hover:border-black/30`
                        }`}
                      >
                        <Icon size={16} weight={orderType === type ? 'fill' : 'regular'} />
                        {t(`cart.${type}`)}
                      </button>
                    )
                  })}
                </div>
                {tried && !orderTypeValid && (
                  <p className="text-amber-800 text-xs mt-1">{t('cart.orderTypeRequired')}</p>
                )}

                {/* Address input for delivery */}
                {orderType === 'delivery' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      autoComplete="street-address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder={isEn ? 'Delivery address' : 'Dirección de entrega'}
                      className={`w-full px-4 py-3.5 rounded-xl bg-brand/30 border text-base outline-none focus:ring-2 focus:ring-brand ${
                        tried && !addressValid ? 'border-amber-700/40' : 'border-black/10'
                      }`}
                    />
                    {tried && !addressValid && (
                      <p className="text-amber-800 text-xs mt-1">{isEn ? 'Enter your address' : 'Ingresa tu dirección'}</p>
                    )}
                  </div>
                )}

                {/* Table number for dine in */}
                {orderType === 'dineIn' && (
                  <div className="mt-3">
                    {tableNumber ? (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-brand">
                        <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-brand text-black font-bold text-lg flex-shrink-0">
                          {tableNumber}
                        </span>
                        <span className="text-sm font-medium flex-1">
                          {isEn ? 'Table' : 'Mesa'} {tableNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => setTableNumber('')}
                          className="text-xs text-brand/60 hover:text-brand transition-colors"
                        >
                          {isEn ? 'Change' : 'Cambiar'}
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-5 gap-2">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setTableNumber(String(n))}
                            className="h-10 rounded-lg font-bold text-sm bg-brand/30 text-black/70 hover:bg-brand/50 transition-colors"
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Summary card */}
              <div className="bg-[#e0ccb8] rounded-xl p-4">
                <h4 className="font-semibold text-sm mb-2">{t('cart.summary')}</h4>
                {items.map((item, idx) => {
                  const name = isEn ? item.product.nameEn : item.product.name
                  const price = item.isCombo && item.product.comboPrice ? item.product.comboPrice : item.product.price
                  return (
                    <div key={idx} className="flex justify-between text-sm py-1">
                      <span className="text-black/70">
                        {item.quantity}x {name}
                        {item.isCombo && item.selectedDrink ? ` + ${isEn ? item.selectedDrink.nameEn : item.selectedDrink.name}` : ''}
                      </span>
                      <span className="font-medium">{formatPrice(price * item.quantity)}</span>
                    </div>
                  )
                })}
                <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t border-black/10">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-black/10 flex-shrink-0 space-y-2">
          {cartStep === 1 && items.length > 0 && (
            <>
              <div className="flex justify-between font-bold text-lg mb-2">
                <span>{t('cart.total')}</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <button
                onClick={handleContinue}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-black text-brand font-semibold rounded-xl hover:bg-black/80 transition-colors"
              >
                {t('cart.continue')}
                <ArrowRight size={18} weight="bold" />
              </button>
              <button
                onClick={() => { clearCart(); handleClose() }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-black/40 hover:text-black/60 transition-colors"
              >
                <Trash size={14} />
                {t('cart.deleteOrder')}
              </button>
            </>
          )}

          {cartStep === 2 && (
            <>
              <button
                onClick={handleSubmit}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-colors ${
                  allValid
                    ? 'bg-black text-brand hover:bg-black/80'
                    : 'bg-black/10 text-black/30 cursor-not-allowed'
                }`}
              >
                <WhatsappLogo size={22} weight="fill" />
                {t('cart.sendWhatsapp')}
              </button>
              {tried && !allValid && (
                <p className="text-amber-800 text-xs text-center">{t('cart.requiredFields')}</p>
              )}
              <button
                onClick={() => { setCartStep(1); setTried(false) }}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-sm text-black/50 hover:text-black transition-colors"
              >
                <ArrowLeft size={14} />
                {t('cart.back')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
