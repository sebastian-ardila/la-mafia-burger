import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '@/data/menu'

export interface CartItem {
  product: Product
  quantity: number
  isCombo: boolean
  selectedDrink?: Product
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, isCombo: boolean, drink?: Product) => void
  removeItem: (productId: string, isCombo: boolean, drinkId?: string) => void
  updateQuantity: (productId: string, isCombo: boolean, drinkId: string | undefined, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  cartStep: number
  setCartStep: (step: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

function getItemKey(item: { product: Product; isCombo: boolean; selectedDrink?: Product }) {
  return `${item.product.id}-${item.isCombo ? 'combo' : 'solo'}-${item.selectedDrink?.id || 'none'}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartStep, setCartStep] = useState(1)

  const addItem = useCallback((product: Product, isCombo: boolean, drink?: Product) => {
    setItems(prev => {
      const key = getItemKey({ product, isCombo, selectedDrink: drink })
      const existing = prev.find(item => getItemKey(item) === key)
      if (existing) {
        return prev.map(item => getItemKey(item) === key ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { product, quantity: 1, isCombo, selectedDrink: drink }]
    })
  }, [])

  const removeItem = useCallback((productId: string, isCombo: boolean, drinkId?: string) => {
    setItems(prev => prev.filter(item => !(item.product.id === productId && item.isCombo === isCombo && (item.selectedDrink?.id || 'none') === (drinkId || 'none'))))
  }, [])

  const updateQuantity = useCallback((productId: string, isCombo: boolean, drinkId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, isCombo, drinkId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.isCombo === isCombo && (item.selectedDrink?.id || undefined) === drinkId
          ? { ...item, quantity }
          : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
    setCartStep(1)
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => {
    const price = item.isCombo && item.product.comboPrice ? item.product.comboPrice : item.product.price
    return sum + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen, cartStep, setCartStep }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
