import type { StorageCartItem } from "$lib/schema";

type Payload = StorageCartItem

import { action, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const cartItems = persistentAtom<StorageCartItem[]>("cart_items", [], {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const addOne = action(cartItems, 'addOne', (cartItems, payload: Payload) => {
  const currentCartItem = cartItems.get().find(item => item.id === payload.id);

  if (currentCartItem) {
    if (currentCartItem.count + 1 > payload.count) return currentCartItem;

    cartItems.set(cartItems.get().map(item => {
      if (item.id === payload.id) {
        return { ...item, count: item.count += 1 }
      }
      return item;
    }))

    return currentCartItem;
  }

  const newItem = {
    id: payload.id,
    product_id: payload.product_id,
    count: 1
  }

  cartItems.set([...cartItems.get(), newItem]);

  return newItem;
});

export const removeOne = action(cartItems, 'removeOne', (cartItems, payload: Payload) => {
  const currentCartItem = cartItems.get().find(item => item.id === payload.id);

  if (currentCartItem) {
    if (currentCartItem.count === 1) {
      cartItems.set(cartItems.get().filter(item => item.id !== payload.id));
    } else {
      cartItems.set(cartItems.get().map(item => {
        if (item.id === payload.id) {
          return { ...item, count: item.count -= 1 }
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

  const ids = store.map(item => item.id).join(',');

  return `?items=${ids}`;
});

queryString.listen(value => {
  const { origin, pathname } = window.location
  if (pathname === "/cart") {
    window.history.replaceState({}, "", origin + pathname + value);
  }
});
  