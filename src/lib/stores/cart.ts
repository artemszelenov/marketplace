import type { StorageCartItem } from "$lib/schema";

type Payload = {
  stock_item_id: string
  count: number
}

import { action, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const cartItems = persistentAtom<StorageCartItem[]>('cart_items', [], {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const addOne = action(cartItems, 'addOne', (cartItems, payload: Payload) => {
  const currentCartItem = cartItems.get().find(item => item.stock_item_id === payload.stock_item_id);

  if (currentCartItem) {
    if (currentCartItem.quantity + 1 > payload.count) return currentCartItem;

    cartItems.set(cartItems.get().map(item => {
      if (item.stock_item_id === payload.stock_item_id) {
        return { ...item, quantity: item.quantity += 1 }
      }
      return item;
    }))

    return currentCartItem;
  }

  const newItem = { stock_item_id: payload.stock_item_id, quantity: 1 }

  cartItems.set([...cartItems.get(), newItem]);

  return newItem;
});

export const removeOne = action(cartItems, 'removeOne', (cartItems, payload: Payload) => {
  const currentCartItem = cartItems.get().find(item => item.stock_item_id === payload.stock_item_id);

  if (currentCartItem) {
    if (currentCartItem.quantity === 1) {
      cartItems.set(cartItems.get().filter(item => item.stock_item_id !== payload.stock_item_id));
    } else {
      cartItems.set(cartItems.get().map(item => {
        if (item.stock_item_id === payload.stock_item_id) {
          return { ...item, quantity: item.quantity -= 1 }
        }
        return item;
      }))
    }

    return currentCartItem;
  }

  return null;
});

export const clear = action(cartItems, 'clear', cartItems => {
  cartItems.set([]);
  return cartItems.get();
});

export const queryString = computed(cartItems, store => {
  if (store.length === 0) return "";

  const ids = store.map(item => item.stock_item_id).join(',');

  return `?items=${ids}`;
});

queryString.listen(value => {
  const { origin, pathname } = window.location
  if (pathname === "/cart") {
    window.history.replaceState({}, "", origin + pathname + value);
  }
});
  