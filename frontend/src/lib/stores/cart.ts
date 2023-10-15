import type { z } from "zod";
import type { StorageCartItemResult, ProductResult } from "$lib/schema";
type StorageCartItem = z.infer<typeof StorageCartItemResult>
type Product = z.infer<typeof ProductResult>

import { action, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { MARKETPALCE_NAME } from "$lib/constants";

export const cartItems = persistentAtom<StorageCartItem[]>(`${MARKETPALCE_NAME}:cart_items`, [], {
  encode: JSON.stringify,
  decode: JSON.parse
})

export const addOne = action(cartItems, 'addOne', (cartItems, { id: productID, inStockCount }: Product) => {
  const productInCart = cartItems.get().find(item => item.id === productID)

  if (productInCart) {
    if (productInCart.q + 1 > inStockCount) return productInCart

    cartItems.set(cartItems.get().map(item => {
      if (item.id === productID) {
        return { ...item, q: item.q += 1 }
      }
      return item
    }))

    return productInCart
  }

  const newItem = { id: productID, q: 1 }
  cartItems.set([...cartItems.get(), newItem])
  return newItem
})

export const removeOne = action(cartItems, 'removeOne', (cartItems, { id: productID }: Product) => {
  const productInCart = cartItems.get().find(item => item.id === productID)

  if (productInCart) {
    if (productInCart.q === 1) {
      cartItems.set(cartItems.get().filter(item => item.id !== productID))
    } else {
      cartItems.set(cartItems.get().map(item => {
        if (item.id === productID) {
          return { ...item, q: item.q -= 1 }
        }
        return item
      }))
    }

    return productInCart
  }

  return null
})

export const clear = action(cartItems, 'clear', cartItems => {
  cartItems.set([])
  return cartItems.get()
})

export const queryString = computed(cartItems, store => {
  if (store.length === 0) return ""

  const ids = store.map(item => item.id).join(',')

  return `?items=${ids}`
});

queryString.listen(value => {
  const { origin, pathname } = window.location
  if (pathname === "/cart") {
    window.history.replaceState({}, "", origin + pathname + value);
  }
});
  