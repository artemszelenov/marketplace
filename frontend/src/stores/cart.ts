import { action } from 'nanostores'
import { persistentAtom } from '@nanostores/persistent'
import { MARKETPALCE_NAME } from '../constants'
import type { StorageCartItem } from '@/types/storage'
import type { Product } from '@/types/product'

const $cartItems = persistentAtom<StorageCartItem[]>(`${MARKETPALCE_NAME}:cart_items`, [], {
  encode: JSON.stringify,
  decode: JSON.parse
})

const addOne = action($cartItems, 'addOne', (cartItems, { id: productID, inStockCount }: Product) => {
  const productInCart = cartItems.get().find(item => item.id === productID)

  if (productInCart) {
    if (productInCart.quantity + 1 === inStockCount) return productInCart

    cartItems.set(cartItems.get().map(item => {
      if (item.id === productID) {
        return { ...item, quantity: item.quantity += 1 }
      }
      return item
    }))

    return productInCart
  }

  const newItem = { id: productID, quantity: 1 }
  cartItems.set([...cartItems.get(), newItem])
  return newItem
})

const removeOne = action($cartItems, 'removeOne', (cartItems, { id: productID }: Product) => {
  const productInCart = cartItems.get().find(item => item.id === productID)

  if (productInCart) {
    if (productInCart.quantity === 1) {
      cartItems.set(cartItems.get().filter(item => item.id !== productID))
    } else {
      cartItems.set(cartItems.get().map(item => {
        if (item.id === productID) {
          return { ...item, quantity: item.quantity -= 1 }
        }
        return item
      }))
    }

    return productInCart
  }

  return null
})

const clear = action($cartItems, 'clear', cartItems => {
  cartItems.set([])
  return cartItems.get()
})

const empty = (): boolean => {
  return $cartItems.get().length === 0
}

const currentItem = ({ id: productID }: Product): StorageCartItem | null => {
  return $cartItems.get().find(item => item.id === productID) ?? null
}

export { $cartItems, addOne, removeOne, clear, empty, currentItem }
  