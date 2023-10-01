import { action, atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { MARKETPALCE_NAME } from "../constants";
import type { StorageCartItem } from "@/types/storage";
import type { Product } from "@/types/product";

const cartItemsStore = persistentAtom<StorageCartItem[]>(`${MARKETPALCE_NAME}:cart_items`, [], {
  encode: JSON.stringify,
  decode: JSON.parse
})

cartItemsStore.subscribe(value => {
  console.log('value', value)
})

const addOne = action(cartItemsStore, 'addOne', (cartItems, { id: productID, inStockCount }: Product) => {
  const productInCart = cartItems.get().find(item => item.id === productID)

  if (productInCart) {
    if (productInCart.quantity + 1 > inStockCount) return productInCart

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

const removeOne = action(cartItemsStore, 'removeOne', (cartItems, { id: productID }: Product) => {
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

const clear = action(cartItemsStore, 'clear', cartItems => {
  cartItems.set([])
  return cartItems.get()
})

const empty = (): boolean => {
  return cartItemsStore.get().length === 0
}

const currentItem = ({ id: productID }: Product): StorageCartItem | null => {
  return cartItemsStore.get().find(item => item.id === productID) ?? null
}

export { cartItemsStore, addOne, removeOne, clear, empty, currentItem }
  