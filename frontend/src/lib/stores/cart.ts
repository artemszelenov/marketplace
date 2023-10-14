import type { z } from "zod"
import { action } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { MARKETPALCE_NAME } from "$lib/constants";
import type { StorageCartItemResult, ProductResult } from "$lib/schema";

type StorageCartItem = z.infer<typeof StorageCartItemResult>
type Product = z.infer<typeof ProductResult>

export const cartItemsStore = persistentAtom<StorageCartItem[]>(`${MARKETPALCE_NAME}:cart_items`, [], {
  encode: JSON.stringify,
  decode: JSON.parse
})

export const addOne = action(cartItemsStore, 'addOne', (cartItems, { id: productID, inStockCount }: Product) => {
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

export const removeOne = action(cartItemsStore, 'removeOne', (cartItems, { id: productID }: Product) => {
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

export const clear = action(cartItemsStore, 'clear', cartItems => {
  cartItems.set([])
  return cartItems.get()
})
  